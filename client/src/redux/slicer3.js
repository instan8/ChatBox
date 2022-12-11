
 import {createSlice} from '@reduxjs/toolkit';
 let initialState=null
const Slicer3 =createSlice(
    { name:"receiver",
        initialState,
        reducers:{
            receiver_details(state,option){
                console.log("this is selected contact",option.payload)
                  return option.payload
            }
        }
    }
)

export default Slicer3.reducer;
export let {actions:action3}= Slicer3;