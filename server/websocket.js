const express=require("express");
const {signup_model,contacts,chats_collection}=require("./schema");
let dotenv=require("dotenv");
const fs=require("fs")
const cors=require("cors");
const multer= require("multer");
const app=express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
const upload=multer({dest:"uploadss"})
app.use('/uploadss',express.static('uploadss'))

function updater(admin,contacts){
   let result= chats_collection.updateOne({admin},{
        $set:{
            contacts:contacts
        }
    } ).then(res=>{console.log("succes")
console.log(result)}).catch(err=>console.log("err occur in save"))

}
function  saveMessagesatAdminSide(admin_id,reciver_id,message){
    chats_collection.find({admin:admin_id}).then(data =>{
        if(data.length>=1){
            let Data=data[0].contacts;
            let reciever= Data.find(reciever_obj=>reciever_obj.receiver_contact===reciver_id);
          let new_contacts=  Data.filter(receiver_obj=>{
                return receiver_obj.receiver_contact!==reciver_id;
            })
            if(reciever){
                reciever.messages.push(message);
                new_contacts.push(reciever)
                updater(admin_id,new_contacts);
            }
            else{
                let new_reciever={
                    receiver_contact:reciver_id,
                    messages:[message]
                }
                new_contacts.push(new_reciever)
                updater(admin_id,new_contacts);
            }
          
             
         
        }
        else{
            let chat = new chats_collection({admin:admin_id,contacts:[{receiver_contact:reciver_id,messages:[message]}]});
            chat.save();
        }
    })

}
 const updateDocument = async (phone,new_contactlist) =>{
    try{
    const result = await contacts.updateOne({phone},{
        $set:{
            contacts:new_contactlist
        }
    })
console.log(result)}
    catch (err){
        console.log(err)
    }
 }

 app.get("/state/:admin",(req,res)=>{
    console.log(req.params.admin)
  contacts.find({phone:`${req.params.admin}`}).then(data =>{
      
        if(data.length>=1){
         console.log("not at all")
        let send_list=data[0].contacts
        console.log("contacts",data[0].contacts)
        console.log(send_list)
       res.json({send_list})}
       
    }
       ).catch(err=>{
     console.log("err")
    })
        
            
 
    
 })

 // message getting ::::

 function getting_messages(req,res){
   chats_collection.find({admin:req.params.admin}).then(
    (data)=>{
        console.log('this is messages data',data)
        if(data.length===0){
            res.json({messages:[]})
        }
        else{
            let  messages=data[0].contacts;
            console.log("all contacts chats",messages)
           let filt_receiver=  messages.find(objs=>{
                return objs.receiver_contact===req.params.receiver_Num;
             })  
    console.log(filt_receiver)
    if(filt_receiver===undefined)
    res.json({messages:[]});
             else
            res.json({messages:filt_receiver.messages});
        }
    }
   )
 }

 app.get(`/messages/:admin/:receiver_Num`,getting_messages);
  
 app.post('/list/:admin',(req,res)=>{
    console.log(req.body)
    console.log(req.params)
  contacts.find({phone:`${req.params.admin}`}).then(data =>{
        console.log("the data of admin",data)
        if(data.length>=1){
         let matched_data=  data[0].contacts.find((list)=>{return list.phone===req.body.phone })
         console.log("datamatched",matched_data)
            if(!matched_data){
           
            let new_contactlist = data[0].contacts;
            console.log("the new list",new_contactlist)
        
            new_contactlist.push(req.body)
            console.log(data[0].id)
            console.log('new data after push',new_contactlist)
      updateDocument(req.params.admin,new_contactlist)
      res.json({user:"notalready"})
    }

      else{
        res.json({user:"already"})
      }
        }
        else{
            const list= new contacts({phone:req.params.admin,contacts:[req.body] })
            list.save();
            res.json({user:"not already"})
            
        }
      } ).catch(errr=>{console.log("error in ffetching list")})
 })


app.post('/data',(req,res)=>{
   
 if(req.body.login){
    signup_model.find({phone:`${req.body.phone}`}).then( (data)=>{
        console.log(data)
        if(data[0].password===req.body.password){
       res.json({image:data[0].img,found:true})
    }
        else{
           res.json({found:false})
        }
   
    }  ).catch(()=>{console.log("error")});
    
 }
 else if(req.body.details){
    signup_model.find({phone:`${req.body.phone}`}).then( (data)=>{
        console.log("this is details send",req.body)
    
        if(data.length>=1){
            console.log(data[0].img);
            let image=data[0].img;
        res.json({image,found:true});}
        else
        res.json({found:false})
    }).catch(err=>{console.log(" err in list")})


}



    }  )
    
  
app.post('/signup',upload.single("image"),(req,res)=>{
    console.log(req.file,req.body)
    signup_model.find({phone:`${req.body.phone}`}).then( (data)=>{
        if(data.length>=1)
        res.json({found:true} )
        else{
            let user= new signup_model({...req.body,img:req.file.path})
            user.save().then(()=>{console.log("saved"); res.json({saved:true,image:req.file.path})}).catch(()=>{console.log("Not")});

            }})
            
})
dotenv.config({ path: "./config.env" });
require("./conn");


console.log(process.env.PORT)
const server = app.listen(process.env.PORT,()=>{
    console.log("listening")
})

const io= require("socket.io")(server,{
    cors:"*"
})

let keypair=[];
console.log(keypair)
io.on("connection",(socket)=>{
       console.log("connected");
      socket.on("active_user",
      ({userid})=>{
       let initi_keypair=  keypair.filter((obj)=>{
            return obj.userid!==userid;
         })
         keypair = initi_keypair;
              keypair.push({userid,socket_id:socket.id})
        console.log("keypair1",keypair)
    });
    socket.on("message",({receiver_id,message,currentUser})=>{
        console.log( "message",message)
        let present=false;
        let presentReciverId=""
         for(let obj of keypair){
            if(obj.userid===receiver_id){
            present=true;
        presentReciverId=obj.socket_id
         console.log(present,"present")}
         }
         if(present===true){
            console.log(true)
   io.to(presentReciverId).emit("messagefromserver",[message,"r"])
         }
           let sendmessage=[message,"s"]
           let recivemessage=[message,"r"]
           let image=""
           contacts.find({phone:receiver_id}).then(data=>{
            signup_model.find({phone:currentUser}).then((datas)=>{
                let {img}=datas[0];
                console.log(img)
                console.log("receiver_data",datas[0])
              image=img
              
              if(data.length>=1){
                let matched_data=  data[0].contacts.find((list)=>{return list.phone===currentUser })
                console.log("datamatched",matched_data)
                   if(!matched_data){
                  
                   let new_contactlist = data[0].contacts;
                   console.log("the new list",new_contactlist)
               
                   new_contactlist.push({name:currentUser,image,phone:currentUser})
                   console.log(data[0].id)
                   console.log('new data after push',new_contactlist)
             updateDocument(receiver_id,new_contactlist)}}
            else{
                let new_contact= new contacts({phone:receiver_id,contacts:[{name:currentUser,image,phone:currentUser}]})
                new_contact.save().then(res=>{console.log("savedddd success contacts")}).catch(err=>{
                    console.log("error while adding")
                })
            }

                     }) .catch(err=>{console.log("error")})

                   })
          
            
            saveMessagesatAdminSide(currentUser,receiver_id,sendmessage);
            saveMessagesatAdminSide(receiver_id,currentUser,recivemessage);
          
      
    })
      
    socket.on("disconnect", () => {
              let filtered_array=keypair.filter((val)=>{
                return val.socket_id!== socket.id;
              })
               keypair=filtered_array;
               console.log("thie is keypair",keypair)
      
        console.log("disconnect")
      });
})
