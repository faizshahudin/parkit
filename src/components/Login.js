import React, { Component } from 'react';
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

  render() {
    const {dispatch, AuthedUser, modal, history} = this.props
    return (
      <Modal
        isOpen={modal.type ? true : false}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        shouldCloseOnOverlayClick={true}
        // overlayClassName="ReactModal__Overlay"
        tabindex="1"
        className="Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          },
        }}
      >
        <div className="login-register">
          <div className="header">
            <h1>ParkIt</h1>
            <p>Creating parking opportunities through the shared economy.</p>
          </div>
          <div className="form-container">
            <div className="header">
              <button onClick={this.toggleNav} disabled={this.state.login}>Log In</button>
              <button onClick={this.toggleNav} disabled={!this.state.login}>Sign Up</button>
            </div>
            {this.state.login
              ? <Login
                dispatch={dispatch}
                AuthedUser={AuthedUser}
                tanduk={history}
              />
              : <Register
                dispatch={dispatch}
                AuthedUser={AuthedUser}/>
            }
          </div>
        </div>
      </Modal>
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

  getCookie = (name) => {
  	var value = "; " + document.cookie;
  	var parts = value.split("; " + name + "=");
  	if (parts.length == 2) return parts.pop().split(";").shift();
  }


  login = (e) => {
    const {dispatch, AuthedUser, history, tanduk} = this.props
    e.preventDefault()
    let data = this.state
    dispatch(handleLogin(data))
    // dispatch(handleHideModal())

    // return(
    //   <Redirect to="/dashboard" />
    // )
  }

  logout = () => {
    const {dispatch} = this.props
    dispatch(handleLogout())
  }

  render() {

    // console.log(this.props.history)
    // const { from } = this.props.location.state || { from: { pathname: "/dashboard" } }
    const {AuthedUser, dispatch} = this.props

    if (AuthedUser) {
      let currentLocation =  window.location.href
      if (currentLocation.includes("find-parking/search/")) {
        dispatch(handleHideModal())
        return null
      } else {
        return (
          <Redirect to="/dashboard" />
        )
      }
    }
    // console.log(this.state.redirect)

    return (
        <form className="form" onSubmit={this.login}>
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
          <p><a>Forgot Password?</a></p>
          <button className="btn submit">Log In</button>
          <p>Don't have an account? <Link to="/register">Sign up</Link> here.</p>
        </form>
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
    this.setState((state) => ({
      [name]: value
    }))
    this.setState({
      username: this.state.email
    })
  }

  handleSubmit = (e) => {
    const {dispatch} = this.props
    e.preventDefault()
    let data = this.state
    console.log(data)
    dispatch(handleRegister(data))
  }

  render() {
    return(
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="name-container">
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
          </div>
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
          <button className="btn submit">Register</button>
          <p className="footer-text">Already have an account? <Link to="/login">Login</Link> here.</p>
        </form>
    )
  }
}

function mapStateToProps({AuthedUser, modal}) {
  return {AuthedUser, modal}
}

export default connect(mapStateToProps)(LoginRegister)
