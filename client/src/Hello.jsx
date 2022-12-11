import React from "react";
import img1 from './images/nft1.png'
import img2 from './images/nft2.png'
import img3 from './images/nft3.png'
import img4 from './images/nft4.png'
import './css/hello.css'
export default function Hello(){
    return (<div className="hello_header">
         <header  className="first_wrapper"style={{color:"white"}}>
         <img src={img1} className="img1"/>
         <img src={img4}/>
         
         <img src={img2} className="img2"/>
         <img src={img3}/>

         </header>
         <section className="section">
         <h1 className="h1" >chatbox</h1>
         <div  className="_1y6Yk">Send and receive messages without keeping your phone online.
         <p>  Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
         </div>
         <div>End-to-end encrypted</div>
         </section>

    </div>
    )}