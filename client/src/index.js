import react from 'react';
import {createRoot} from 'react-dom/client';
import App from './app'
import store from './redux/store';
import { Provider } from 'react-redux';
const root=createRoot(document.getElementById('root'));
let i=2;
if(i==2)
root.render(
    <Provider store={store}>  
    <div>
    <App></App>
    </div>
    </Provider>
)

// root.render(
//     <div>helllo</div>
    
    
// )

