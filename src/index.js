import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import jwt from "jsonwebtoken";


import { loginSuccess, handleLogin } from "./actions/AuthedUser"
import { handleGetParkings } from "./actions/parkings"
import { handleInitialData } from "./actions/shared"
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from "./reducers";
import middleware from "./middleware";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
