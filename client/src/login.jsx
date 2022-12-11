import React from "react";
import  axios from 'axios';
import "./css/login.css";
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { actions } from "./redux/Slicer";
 export default function Login(){
 const dispatcher = useDispatch();
  const Navigates=useNavigate();
    function submit(e){

    
        e.preventDefault();
    const inputs= document.body.querySelectorAll("input");

 
        let obj={
            phone:"",
            password:"",
            login:true
        }
        
        for(let inp of inputs){
            obj[inp.name]=inp.value;
        }
       
        console.log(obj);
        axios.post("http://localhost:2000/data",obj).then((res)=>{
   console.log(res)
           if(res.data.found===true){
           
            localStorage.setItem("phone",`${obj.phone}`)
            localStorage.setItem("image",`${res.data.image}`)
      Navigates("/messages")
  }

           
          else{
            alert("wrong password");
          }
        
          }).catch(()=>{console.log("errror")});
          
          
    }
return(

    <form className="login_header"  onSubmit={submit}>   
    <div className="signup_button">login</div>
        <input name="phone"type="tel" placeholder="phone number"/>
        <input name="password" type="text" placeholder="password"/> 
        <button className="powerbutton_cover">
  <svg height="3vw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>
  </button>
        </form>)
}
