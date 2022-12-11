
const io= require("socket.io")(server,{
    cors:"*"
})
let keypair=[];
console.log(keypair)
io.on("connection",(socket)=>{
       console.log("connected");
      socket.on("active_user",
      ({userid})=>{
              keypair.push({userid,socket_id:socket.id})
        console.log("keypair1",keypair)
    });
    socket.on("message",(sender_id,message)=>{
        let present=false;
        let receiver_id=""
         for(let obj of keypair){
            if(obj.userid===sender_id){
            present=true;
        receiver_id=obj.socket_id}
         }
         if(present===true){
   io.to(receiver_id).emit("messagefromserver",message)
         }
          console.log(sender_id,message);
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
