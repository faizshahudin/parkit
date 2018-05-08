import React, { Component } from 'react';
import Home from "./Home"
import Owners from "./Owners"
import Login from "./Login"
import Register from "./Register"
import AddListing from "./AddListing"
import ThankYou from "./ThankYou"
import Nav from "./Nav"
import FindParking from "./FindParking"
import Footer from "./Footer"
import {BrowserRouter as Router, Route} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="white-background">
          <Route exact path="/" component={Home} />
          <Route path="/owners" component={Owners} />
        </div>
        <div className="grey-background">
          <Route path="/parkers" component={FindParking} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
        <div className="main">
          <Route exact path="/add-listing" component={AddListing} />
          <Route path="/add-listing/thank-you" component={ThankYou} />
        </div>
        <Footer />

      </div>
    );
  }
}

export default App;
