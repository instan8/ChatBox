import React from "react";
import {useSelector} from 'react-redux';
import axios from 'axios'
import { actions } from "./redux/Slicer";
import{action} from './redux/Slicer2';
import { useDispatch } from "react-redux";
import Welcome from "./welcom";
import { height } from "@mui/system";

import{action3} from './redux/slicer3'
 export default function Lister(){
   let mess= useSelector(state=>state.message_reducer)
    let dispatch=useDispatch();
    function get_messages(e){
        let receiver_Num=(e.currentTarget.getAttribute("my_attr"));
     dispatch(action3.receiver_details(receiver_Num))
  
    let  admin=("admin",localStorage.getItem("phone"))
    console.log("receiver_Num "+receiver_Num+"admin"+admin)
 axios.get(`http://localhost:2000/messages/${admin}/${receiver_Num}`).then((res)=>{
    console.log("recieved message server",res.data.messages)
dispatch(action.Changer(res.data.messages));
 console.log("this is message state",mess)
 } )

    }
  
    let style={
        color:"white",
        display:'flex',
        flexDirection:"row",
       
        alignItems:"center",
        height:"10vh",
        border:"2px solid #B4C3D5",
        position:"relative"

 
    }
    let style2={
        width:"10%",
        height:"70%",
        borderRadius:"80%"
    }
    let image_style={
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius:"80%"
    }
    console.log("lister",global.admin)
     

    const state= useSelector(state=>state.list);
      let  admin=("admin",localStorage.getItem("phone"))
     React.useEffect( ()=>{
        axios.get(`http://localhost:2000/state/${admin}`).then((res)=>{
            console.log("list getting",res.data.send_list)
        dispatch(actions.changer(res.data.send_list))
         
        })
   console.log('in effect')
     },[])



if(state.length==0)
return<Welcome></Welcome>
    
  
    else{
    const list= state.map(list_obj=>{
        return(<div style={style} my_attr={`${list_obj.phone}`} key={`${list_obj.phone}`} onClick={get_messages}>
           
            <div style={style2}>
                <img  style={image_style}src = {`http://localhost:2000/${list_obj.image}`}/>
            </div>
            <div style={{position:"absolute",left:"20%",textTransform:"uppercase"}}>{list_obj.name}</div>
        </div>)
    })
    return (list)}
        
 }