import React ,{component} from "react";
import { Route,Routes,Link, BrowserRouter as Router } from 'react-router-dom';

import SignUp from "./SignUp";
import Login from "./login";
import {io} from 'socket.io-client';
import Hello from "./Hello";
import Details from './Details'
import Welcome from "./welcom";
import Chats from "./chats";
export default function App(){

    return( 
           <Router>

           
            <Routes >
                
                 <Route path="/signup" element={<SignUp/>} />
                 <Route path="/welcome" element={<Welcome/>} />
             <Route path="/login" element={ <Login/>} />
             <Route path="/messages" element={ <Details/>} />
             <Route path="/chats" element={<Chats/>}></Route>
             </Routes>
        </Router>
    
    )
}