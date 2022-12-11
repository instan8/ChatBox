import {createSlice} from '@reduxjs/toolkit'

const initialState=[
    
]


const Slicer= createSlice({
    name:"slicer",
    initialState,
    reducers:{
        adder(state,option){
            console.log(option.payload)
            state.push(option.payload);
        },
        changer(state,option){
            console.log("pY",option.payload)
             return option.payload}
        
        ,admin(state,option){
            console.log(option.payload)
            state={admin:option.payload.send_list}
        }

    }
});



export default  Slicer.reducer;
export let {actions}=Slicer;
  