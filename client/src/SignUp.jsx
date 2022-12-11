import React, { useState } from 'react'
import  axios from 'axios';
import "./css/signup.css";
import { Route,Routes,Link, BrowserRouter as Router,useNavigate, } from 'react-router-dom';
import nft1 from './images/nft1.png'
import { useDispatch } from 'react-redux';
import {actions} from "./redux/Slicer"
import unknown from "./images/unknown.jpg"

function image(e){
  console.log(e.target.files)
}
function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}
function uploader(e){
  console.log( e.target.files[0])
  let url =  URL.createObjectURL(e.target.files[0]);
  document.querySelector(".user_image").src=url
}
function SignUp(){
 

  const navigate=useNavigate();
  console.log(navigate)


function submit(e){
    console.log(e.currentTarget)
    e.preventDefault();
    console.log("hi")
  const inputs= document.body.querySelectorAll("input");
  console.log(inputs)
   console.log(inputs[0].files)
   let image=inputs[0].files[0];
let formData= new FormData();
   formData.append('name',inputs[1].value);
   formData.append('phone',inputs[2].value);
   formData.append('password',inputs[3].value);
   formData.append('image',image);
   
       for(let key of formData.keys()) {
        console.log(key)
       }

 
  if(inputs[1].value && inputs[2].value && inputs[3].value ){
    
      if(containsOnlyNumbers(inputs[2].value) && inputs[2].value.length===10){
        alert (" valid number")
      
      // else{
      //   alert("enter valid number")
      // }


  axios.post("http://localhost:2000/signup",formData).then((res)=>{
  
    if(res.data.found===true){
       alert("you were already login ")
    navigate("/login");
    
    }

    else{
    if(res.data.saved===true){
    localStorage.setItem("phone",`${inputs[2].value}`)
    localStorage.setItem("image",`${res.data.image}`);
    navigate("/messages");
  console.log("user saved")}
    }
  }).catch(()=>{console.log("errror")});
}
else{
  alert("enter valid number")
}
  }

  else{
    alert("field is empty")
  }
 }
document.body.onresize=()=>{
    let jotaro=document.body.querySelector(".images_coverUp");
    let Text=document.body.querySelector(".chatbox_text");
    let Text_Style=Text.getBoundingClientRect();
   
   let jotaro_Height=parseInt(getComputedStyle(jotaro).getPropertyValue("height"));
    jotaro.style.setProperty("top",`${Text_Style.top-(jotaro_Height/2-3)}px`);
    
}
  
 


 React.useEffect(()=>{
    let jotaro=document.body.querySelector(".images_coverUp");
    let Text=document.body.querySelector(".chatbox_text");
    let Text_Style=Text.getBoundingClientRect();
   
   let jotaro_Height=parseInt(getComputedStyle(jotaro).getPropertyValue("height"));
    jotaro.style.setProperty("top",`${Text_Style.top-(jotaro_Height/2-3)}px`);
    
}
  ,[])



  return( 
   
  <div className='signUp_head'>
<div className='images_coverUp'>
<img src="https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20469ccc7929_hero-image11.svg" loading="lazy" width="132" data-w-id="1ff3cada-648a-84a7-34ec-4b5aecf06982" alt="" class="image cr1" />
    
<img className="jotaro image" src="https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20c04acc792a_hero-image02.svg" width="132" loading="lazy"  ></img>
<img src="https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20761fcc792b_hero-image01.svg" loading="lazy" width="132" alt="" className="image cl1"></img>

<img src="https://uploads-ssl.webflow.com/626babf7ab0a2031facc7901/626babf7ab0a20e1a7cc7928_hero-image08.svg" loading="lazy" width="132" alt="" className="image cl1"></img>

</div>
       <header className='chatbox_text'>
  <span>c</span>
<span>h</span>
  <span>a</span>
  <span>t</span>
  <span>b</span>
  <span>o</span>
  <span>x</span>
 </header>


<form  onSubmit={submit}className='signup_form'>


<div className='image-container'>
  <img className="user_image"src={unknown}></img>
  <input onChange={uploader}className="file_input" type="file" accept="image/*"/> </div>

  <input name="name " type="text" placeholder='Enter Your name'/>
  <input name="phone " type="text" placeholder='Enter Your phone_no'/>
  <input name="password" type="password" placeholder='Enter Your password'/>
 <button className="powerbutton_cover">
  <svg height="3vw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>
  </button>

 
</form>
</div>
  
  )
}
export default SignUp;

