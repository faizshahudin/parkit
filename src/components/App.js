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
import {Switch} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/owners" component={Owners} />
          <Route path="/parkers" component={FindParking} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/add-listing" component={AddListing} />
          <Route path="/add-listing/thank-you" component={ThankYou} />
          <Route render={function() {
            return <p>Not Found</p>
          }} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
