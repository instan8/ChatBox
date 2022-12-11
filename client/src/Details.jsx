import React from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import axios from 'axios'
import Chats from "./chats";
import "./css/Details.css"
import { List } from "@mui/material";
import {actions} from './redux/Slicer'
import {useDispatch} from 'react-redux';
import Lister from "./Lister";
import { useSelector } from "react-redux";




export default function Details(){
  let admin_image=localStorage.getItem("image")
  console.log(admin_image,"admin_image")
   
    const dispatcher=useDispatch();
   
      useSelector(state=>{console.log(state.list)})


    function add_form(){
        document.body.querySelector(".add_form").style.display="flex";
     
    }
    function remove_form(){
        document.body.querySelector(".add_form").style.display="none";

     
    }
    function list_adder(e){
        e.preventDefault();
      let input=document.querySelectorAll(".add_query");
      let phone=input[1].value;

      let name= input[0].value;
      console.log(phone,name)
        
      
     
        axios.post("http://localhost:2000/data",{phone,details:true}).then(res=>{
          let found=res.data.found;
          console.log(found)
          if(res.data.found){
            console.log(res.data.image)
             let image=res.data.image;
            console.log("is image",image)
             let admin= localStorage.getItem("phone")
            axios.post(`http://localhost:2000/list/${admin}`,{name,image,phone}).then((rese)=>{
              console.log("hii",rese.data.user)
                console.log("hii")
                    if(rese.data.user !== "already"){
                      dispatcher(actions.adder({name,image,phone}))
                    }
                    else{
                      alert("user already in your list");
                    }
            }).catch(err=>{console.log(err)})


          }
        
         else{
          alert("user not use chatbox::")
         }
        
        }) //firstaxios end
          
          
         
         
   
        .catch(err=>{console.log(err,"error in adding")})
    }

return(
    <div className="details_head" >
      <div className="list_part">
        <form className="add_form" onSubmit={list_adder} >
            <div className="diver"><span style={{display:"inline",color:"white"}}>close</span>
     <CloseFullscreenIcon  onClick={remove_form}className="close_btn" style={{color:"white"}}/>   </div>
    
            <input  className="add_query" placeholder="enter name"type="text"/> 
            <input  className="add_query" placeholder="enter mobile number" type="text"/> 
            <button className="list_add_button">add</button>
             </form>
    <header className="detail_head">

        <div className="admin_photo_coverUp">
          <img src={`http://localhost:2000/${admin_image}`}/>
        </div>
        <section className="details_icons">
      <AddIcon onClick={add_form} style={{marginRight:"3vw"}} className="addicon" />
   <SearchIcon style={{marginRight:"2vw"}}/>
        </section>
    </header>

    <Lister ></Lister>
     
    </div>
    <section className="chat_part">
      <Chats></Chats>
    </section>

    </div>
)
}
