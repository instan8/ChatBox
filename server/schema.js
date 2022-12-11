const mongoose=require("mongoose");
const userSChema1=new mongoose.Schema({
   name:String,
   phone:String,
   password:String,
   img:String,
  
    
})
const userSchema2 = new mongoose.Schema({
    phone:String,
    contacts:Array
})
const userSchema3 = new mongoose.Schema({
 admin:String,
  contacts:Array
}) 

const signup_model=mongoose.model('users',userSChema1);

const contacts= mongoose.model('contacts',userSchema2) ;
const chats_collection = mongoose.model("messsage",userSchema3)

module.exports={signup_model,contacts,chats_collection};