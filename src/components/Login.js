import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import LoginRegisterHeader from "./LoginRegisterHeader"
import { Link } from 'react-router-dom'
import * as Api from "./Api"
import { connect } from "react-redux"
import {handleLogin, handleLogout} from "../actions/AuthedUser"
import { Redirect } from 'react-router-dom'
import { handleRegister } from "../actions/AuthedUser"
import Modal from 'react-modal';




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

  render() {
    const {dispatch, AuthedUser} = this.props

    return (
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
              />
              : <Register />
            }
          </div>
        </div>


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
    const {dispatch, AuthedUser} = this.props
    e.preventDefault()
    let data = this.state
    dispatch(handleLogin(data))
  }

  logout = () => {
    const {dispatch} = this.props
    dispatch(handleLogout())
  }

  render() {

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
  }

  handleSubmit = (e) => {
    const {dispatch} = this.props
    e.preventDefault()
    let data = this.state
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

function mapStateToProps({AuthedUser}) {
  return {AuthedUser}
}

export default connect(mapStateToProps)(LoginRegister)
