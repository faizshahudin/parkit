import React, { Component } from 'react';
import Login from "./Login"
import Register from "./Register"
import AddListing from "./AddListing"
import {BrowserRouter as Router, Route} from "react-router-dom"


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/add-listing" component={AddListing} />
      </div>
    );
  }
}

export default App;
