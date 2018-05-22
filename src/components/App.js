import React, { Component, Fragment } from 'react';
import Home from "./Home"
import Owners from "./Owners"
import LoginRegister from "./Login"
import Register from "./Register"
import AddListing from "./AddListing"
import Dashboard from "./Dashboard"
import ResetPassword from "./ResetPassword"
import Nav from "./Nav"
import FindParking from "./FindParking"
import Footer from "./Footer"
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Switch} from "react-router-dom"
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import {handleGetParkings} from "../actions/parkings"

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("auth")
    ? <Component {...props} />
    : <Redirect to={{
        pathname: "/login",
        state: { from: props.location }
      }} />
  )}>
  </Route>
)

class App extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(handleGetParkings())
  }
  render() {
    const { AuthedUser, dispatch } = this.props

    return (
      <div className="App">
        <Router>
          <Fragment>
            <Nav dispatch={dispatch}/>
            {/* {this.props.loading === true
              ? null
              :
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/owners" component={Owners} />
              <Route path="/parkers" component={FindParking} />
              <Route path="/register" component={Register} />
              <Route path="/add-listing" component={AddListing} />
              <Route path="/auth/password/reset/confirm" component={ResetPassword} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route render={function() {
                return <p>Not Found</p>
              }} />
            </Switch>
          } */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/owners" component={Owners} />
              <Route path="/find-parking" component={FindParking} />
              <Route path="/register" component={Register} />
              <Route path="/add-listing" component={AddListing} />
              <Route path="/auth/password/reset/confirm" component={ResetPassword} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route render={function() {
                return <p>Not Found</p>
              }} />
            </Switch>

            <Footer />
          </Fragment>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({AuthedUser}) {
  return {
    loading: AuthedUser === null
  }
}

export default connect(mapStateToProps)(App);
