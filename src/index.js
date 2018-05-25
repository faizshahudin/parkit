import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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


const store = createStore(reducer, middleware)

if (localStorage.auth) {
  const user = (jwt.decode(localStorage.auth))
  store.dispatch(loginSuccess(user))
  store.dispatch(handleGetParkings())
}

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
