import React from "react";
import { io } from "socket.io-client";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import{action} from './redux/Slicer2'
import { actions } from "./redux/Slicer";
import ghost from './images/traing.jpg'
import send_music from './images/whatsapp.mp3'
import { minWidth } from "@mui/system";
import recive_sound from './images/reciever.mp3'
import EmojiPicker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import MoodIcon from '@mui/icons-material/Mood';
import Hello from "./Hello";

  export default function Chats(){
   let[clicked,changer]= React.useState(false);
   const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
    console.log("handle mouse event")
      setIsHover(true);
   };

        
    function emoji(e){
      console.log(e)
     let inbox = document.querySelector(".typedmessage").value
     document.querySelector(".typedmessage").value=inbox+e.emoji;
    }

  let send_style={
    display:"flex",
    justifyContent:"flex-end",
   minHeight:"5vh",
 
  
   marginBottom:"6vh",
  
  }
  let recieved_style={
   
    display:"flex",
    justifyContent:"flex-start",
    minHeight:"5vh",
  
   marginBottom:"6vh",

    
 
  }
  let dispatch= useDispatch()
  let receiver_id = useSelector(state=>state.receiver_reducer)
  console.log("clicked contact",receiver_id)
    const message= useSelector(state=>state.message_reducer);
    console.log("init message",message)
    console.log("initaial message",message)
 const socket =  io("ws://localhost:2000");
 let admin=localStorage.getItem("phone");
socket.on("connect",()=>{
   console.log("chat",socket.id)

})
socket.emit("active_user",{userid:`${admin}`})



 socket.on('messagefromserver',(mess)=>{
  console.log("the recieve message",mess)
  let audioe=document.querySelector(".recive_audio")
  audioe.play();
  dispatch(action.adder(mess))
  dispatch(actions)


 })

function SendMessage(e){  
   e.preventDefault();
  let input= document.querySelector(".typedmessage");
  console.log(input.value)
  document.querySelector(".send_audio").play()
    dispatch(action.adder([input.value,"s"]))
  console.log("sender_id",receiver_id);
  socket.emit('message',{receiver_id,message:input.value,currentUser:admin})
  let typer= document.querySelector(".inbox");
  typer.value="";
  
}
if(message==null){
  console.log('if')
return <Hello></Hello>

}
   
   else{
    console.log('else')
return (
  <div style={{background:"black"}}>    
 {message.map(arr=>{
    console.log(arr)
    return(<div style={arr[1]==='r'?recieved_style:send_style}>
    <div  style={{minWidth:"20%",background:`${arr[1]==='r'?"#878D93":"#9370DB"}`,maxWidth:"80%",borderRadius:"6px",display:"flex",flexWrap:"wrap"}}>{arr[0]}</div> 
    </div>
  ) })}
 <audio className="send_audio" src={send_music}></audio>
  <audio className="recive_audio" src={recive_sound}></audio>
  <div style={{position:"absolute" ,top:"30%",display:`${clicked?"block":"none"}`}}> 
  <EmojiPicker onEmojiClick={emoji} autoFocusSearch='false'></EmojiPicker>
  </div>
<form  className="chat_input"style={{position:"fixed",top:"93vh",width:"100%",background:'#B4C3D5'}}onSubmit={SendMessage}>
  {/* <EmojiPicker/> */}
  <MoodIcon style={{ width:"2vw",height:"60%",translate:"0 50%",cursor:"pointer" ,color:`${isHover?"":"black"}`}} onClick={()=>{changer(!clicked)}} onMouseOver={handleMouseEnter}/>
 
 <input className="typedmessage inbox" style={{width:"45%",borderRadius:"5px",height:"6vh",fontSize:"100%",background:"whilte"}}type="text" placeholder="type"></input>
 <button style={{width:"5%",height:"6vh",translate:"0 10%" ,background:"#B4C3D5"}}>
  <SendIcon style={{translate:"-50% 0%",cursor:"pointer"}}/>
 </button>
 </form>
 </div>

  
  )}
  }
