import React, { Component } from 'react';
import Login from "./Login"
import Register from "./Register"
import AddListing from "./AddListing"
import ThankYou from "./ThankYou"
import {BrowserRouter as Router, Route} from "react-router-dom"


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/add-listing" component={AddListing} />
        <Route path="/add-listing/thank-you" component={ThankYou} />
      </div>
    );
  }
}

export default App;
