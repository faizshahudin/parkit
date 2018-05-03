import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from "react-router-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import reducer from "./reducers"
import middleware from "./middleware"
import {setAuthedUser} from "./actions/AuthedUser"

const store = createStore(reducer, middleware)

if (localStorage.auth) {
  store.dispatch(setAuthedUser(localStorage.auth))
}

ReactDOM.render(<Provider store={store}>
  <Router><App /></Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
