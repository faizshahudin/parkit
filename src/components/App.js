import React, { Component } from 'react';
import Login from "./Login"
import Register from "./Register"
import AddListing from "./AddListing"
import ThankYou from "./ThankYou"
import Nav from "./Nav"
import FindParking from "./FindParking"
import {BrowserRouter as Router, Route} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main">
          <Nav />
          <Route exact path="/add-listing" component={AddListing} />
          <Route path="/add-listing/thank-you" component={ThankYou} />
        </div>
        <div className="non-main">
          <Route path="/find-parking" component={FindParking} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </div>
    );
  }
}

export default App;
