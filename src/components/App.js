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
import {handleGetUserDetails} from "../actions/AuthedUser"
import Modal from 'react-modal';
import {handleHideModal} from "../actions/modal"
import Parkers from "./Parkers"
import {handleInitialData} from "../actions/shared"
import LoadingBar from 'react-redux-loading'



const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("auth")
    ? <Component {...props} />
    : <Redirect to={{
        pathname: "/",
        state: { from: props.location }
      }} />
  )}>
  </Route>
)

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('root'))

class App extends Component {
  componentDidMount() {
    const {dispatch} = this.props

    if (localStorage.auth) {
      dispatch(handleInitialData())
    } else {
      dispatch(handleGetParkings())
    }
    window.scrollTo(0, 0)
  }
  closeModal = () => {
    const {dispatch} = this.props
    dispatch(handleHideModal())
  }
  render() {
    const { AuthedUser, dispatch, modal } = this.props
    console.log(AuthedUser)


    return (
      <div className="App">
        <Router>
          <Fragment>
            <LoadingBar />
            <Nav dispatch={dispatch} AuthedUser={AuthedUser} />
            {modal.type &&
              <LoginRegister />
            }

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
              <Route path="/parkers" component={Parkers} />
              <Route path="/auth/password/reset/confirm" component={ResetPassword} />

              {this.props.parkings.length !== 0 &&
                <Route path="/find-parking" component={FindParking} />
              }

              {this.props.loading === true
                ? null
                : <div>
                  <PrivateRoute path="/dashboard" component={Dashboard} dispatch={dispatch}/>
                  <Route path="/add-listing" component={AddListing} />
                </div>
              }
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({AuthedUser, modal, parkings}) {
  return {
    loading: AuthedUser === null,
    AuthedUser,
    parkings,
    modal,
  }
}

export default connect(mapStateToProps)(App);
