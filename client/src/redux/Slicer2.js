
 import {createSlice} from '@reduxjs/toolkit';
 let initialState=  null
const Slicer2 =createSlice(
    { name:"chats",
        initialState,
        reducers:{
            adder(state,option){
                console.log("this is option",option.payload)
                if(state==null){
                    return option.payload
                }
                else
                return[...state,option.payload]
            },
            Changer(state,option){
                return option.payload
            }
        }
    }
)

export default Slicer2.reducer;
export let {actions:action}= Slicer2;