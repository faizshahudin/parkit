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

const store = createStore(reducer, middleware)

if (localStorage.auth) {
  console.log(jwt.decode(localStorage.auth))
  store.dispatch(loginSuccess(localStorage.auth))
}

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
