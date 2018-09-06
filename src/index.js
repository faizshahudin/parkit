import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import reducer from "./reducers"
import middleware from "./middleware"
import {loginSuccess, handleLogin} from "./actions/AuthedUser"
import jwt from "jsonwebtoken"
import {handleGetParkings} from "./actions/parkings"
import {handleInitialData} from "./actions/shared"


const store = createStore(reducer, middleware)

// if (localStorage.auth) {
//   if (localStorage.auth) {
//     store.dispatch(handleInitialData())
//   }
// }

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
