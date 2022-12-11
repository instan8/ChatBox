import { red } from '@mui/material/colors';
import {configureStore} from '@reduxjs/toolkit';
import list_reducer from './Slicer'
import message_reducer from './Slicer2';
import receiver_reducer from './slicer3'
let store= configureStore({
    reducer:{
        list: list_reducer,
         message_reducer,
         receiver_reducer }

})
export default store;