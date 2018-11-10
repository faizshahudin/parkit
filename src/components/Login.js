import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom"
import LoginRegisterHeader from "./LoginRegisterHeader"
import { Link } from 'react-router-dom'
import * as Api from "./Api"
import { connect } from "react-redux"
import {handleLogin, handleLogout} from "../actions/AuthedUser"
import { Redirect } from 'react-router-dom'
import { handleRegister } from "../actions/AuthedUser"
import Modal from 'react-modal';
import {handleShowModal, handleHideModal} from "../actions/modal"
import {handleGetParkings} from "../actions/parkings"
import AriaModal from "react-aria-modal"

class LoginRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submit: false,
      login: true,
      modalIsOpen: props.isOpen,
    }
  }

  toggleNav = () => {
    this.setState({
      login: !this.state.login,
      submit: !this.state.submit
    })
  }

  closeModal = () => {
    const {dispatch} = this.props
    dispatch(handleHideModal())
  }

  componentDidMount() {
    const {modal} = this.props
    modal.type === "Login"
      ? this.setState({login: true})
      : this.setState({login: false})
   }

  render() {
    const {dispatch, AuthedUser, modal, history} = this.props;
    console.log('insideLoginRegister: ', modal);

    return (
      <Fragment>
        {modal.type &&
          <AriaModal
            titleText="demo one"
            focusDialog={true}
            getApplicationNode={this.getApplicationNode}
            verticallyCenter={true}
            onExit={this.closeModal}
            >
            <div className="login-register">
              <div className="header">
               <h1>ParkIt</h1>
               <p>Creating parking opportunities through the shared economy.</p>
             </div>
              <div className="form-container">
                <div className="close-modal">
                  <div></div>
                  <div></div>
                  <div className="close-button" onClick={this.closeModal}>X</div>
                </div>
                <div className="header">
                  <button onClick={this.toggleNav} disabled={this.state.login}>Log In</button>
                  <button onClick={this.toggleNav} disabled={!this.state.login}>Sign Up</button>
                </div>
                {this.state.login
                  ? <Login
                    dispatch={dispatch}
                    AuthedUser={AuthedUser}
                    showAlert={this.showAlert}
                    toggleNav={this.toggleNav}
                    modal={modal}
                  />
                  : <Register
                    dispatch={dispatch}
                    AuthedUser={AuthedUser}
                    showAlert={this.showAlert}
                    toggleNav={this.toggleNav}
                    modal={modal}
                  />
                }
              </div>
            </div>
          </AriaModal>
        }
      </Fragment>
    )
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState((state) => ({
      [name]: value
    }))
  }

  login = (e) => {
    const {dispatch, AuthedUser, history} = this.props
    e.preventDefault()
    let data = this.state
    dispatch(handleLogin(data))
  }

  logout = () => {
    const {dispatch} = this.props
    dispatch(handleLogout())
  }

  render() {
    const {dispatch, AuthedUser, modal, history, showAlert} = this.props;
    console.log('modal: ',modal);
    /*--------------------------------------------------------------------/
      AuthedUser=true means that the user has successfully login/register
      if already authenticate, check current location, if the user 
      already on find-parking/search/ page or add-listing page, hide the
      modal, if the modal.path have values redirect to that path, else 
      redirect to dashboard
    /--------------------------------------------------------------------*/
    if (AuthedUser) {
      let currentLocation =  window.location.href;
      if (currentLocation.includes("find-parking/search/") || currentLocation.includes("add-listing") ) {
        dispatch(handleHideModal())
        return null
      } else {
        if (modal.path) {
          return (
            <Redirect to={modal.path} />
          );
        } else {
          return (
            <Redirect to="/dashboard" />
          );
        }
      }
    }

    return (
      <Fragment>
        <form className="form" onSubmit={this.login}>
          <div className="input full">
            <input
              required
              id="email"
              name="email"
              type="email"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Username"
              >
            </input>
            <i className="far fa-user"></i>
          </div>

          <div className="input">
            <input
              required
              id="password"
              name="password"
              type="password"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Password"
              >
            </input>
            <i className="fas fa-unlock"></i>
          </div>
          <p><a>Forgot Password?</a></p>
          <button className="btn submit">Log In</button>
          <p>Don't have an account? <a onClick={this.props.toggleNav}>Sign up</a> here.</p>
        </form>

      </Fragment>

    )
  }
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    name === "email"
      ? this.setState({
          email: value,
          username: value,
        })
      : this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    const {dispatch, modal} = this.props
    e.preventDefault()
    // this.setState({username: this.state.email})
    let data = this.state

    dispatch(handleRegister(data, modal.path));
  }

  render() {
    const {dispatch, AuthedUser, modal, history, showAlert} = this.props

    if (AuthedUser) {
      let currentLocation =  window.location.href
      if (currentLocation.includes("find-parking/search/") || currentLocation.includes("add-listing") ) {
        dispatch(handleHideModal())
        return null;
      } else {
        if (modal.path) {
          return (
            <Redirect to={modal.path} />
          );
        } else {
          return (
            <Redirect to="/dashboard" />
          );
        }
        
      }
    }

    return(
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="name-container">
            <div className="input half">
              <input
                required
                id="fName"
                name="first_name"
                autoComplete="fname"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="First Name"
                >
              </input>
              <i class="far fa-user"></i>
            </div>
            <div className="input half">
              <input
                required
                id="lName"
                name="last_name"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Last Name"
                >
              </input>
              <i className="far fa-user"></i>
            </div>
          </div>
          <div className="input">
            <input
              required
              id="email"
              name="email"
              type="email"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Email"
              >
            </input>
            <i class="far fa-envelope"></i>
          </div>
          <div className="input">
            <input
              required
              id="contact"
              name="contact"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Contact Number"
              >
            </input>
            <i className="fas fa-mobile-alt"></i>
          </div>
          <div className="input">
            <input
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain a combination of numbers, uppercase and lowercase letters, and at least 6 or more characters"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <i className="fas fa-key"></i>
          </div>
          <button className="btn submit">Register</button>
          <p className="footer-text">Already have an account? <a onClick={this.props.toggleNav}>Login</a> here.</p>
        </form>
    )
  }
}

function mapStateToProps({AuthedUser, modal}) {
  return {AuthedUser, modal}
}

export default connect(mapStateToProps)(LoginRegister)
