import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import LoginRegisterHeader from "./LoginRegisterHeader"
import { Link } from 'react-router-dom'
import * as Api from "./Api"
import { connect } from "react-redux"
import {login} from "../actions/AuthedUser"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IsAuthenticated: null
    }
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState((state) => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
    const {dispatch, AuthedUser} = this.props
    e.preventDefault()
    let data = this.state
    dispatch(login(data))
    this.setState({IsAuthenticated: AuthedUser})
  }

  logout = () => {
    localStorage.removeItem("auth")
    this.setState({ IsAuthenticated: null })
  }

  render() {
    const { AuthedUser } = this.props
    return(
      <div className="login-register-container container grey-background">
        <LoginRegisterHeader />
        <div className="login-register-form-container">
          <h3 className="login-register-form-header">Log In</h3>
          <form className="login-register-form-content" onSubmit={this.handleSubmit}>
            <label htmlFor="username">
              Username
            </label>
            <input
              required
              id="username"
              name="username"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label htmlFor="email">
              Email
            </label>
            <input
              required
              id="email"
              name="email"
              className="login-register-form-input"
              type="email"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label htmlFor="password">
              Password:
            </label>
            <input
              required
              id="password"
              name="password"
              className="login-register-form-input"
              type="password"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <p><a>Forgot Password?</a></p>
            <button className="btn login-register-button">Log In</button>
            <p>Don't have an account? <Link to="/register">Sign up</Link> here.</p>
          </form>
        </div>
        {(AuthedUser ?
          <div onClick={this.logout}>Logout</div>
          : <div>No</div>
        )}
      </div>
    )
  }
}

class Register extends Component {
  render() {
    return(
      <div className="login-register-form-container">
        <h3 className="login-register-form-header">Register</h3>
        <form className="login-register-form-content">
          <label>
            First Name:
          </label>
          <input className="login-register-form-input" type="text"></input>
          <label>
            Last Name:
          </label>
          <input className="login-register-form-input" type="text"></input>
          <label>
            Email:
          </label>
          <input className="login-register-form-input" type="text"></input>
          <label>
            Contact No:
          </label>
          <input className="login-register-form-input" type="text"></input>
          <label>
            Password:
          </label>
          <input className="login-register-form-input" type="text"></input>
          <label>
            Confirm Password:
          </label>
          <input className="login-register-form-input" type="text"></input>
          <button className="btn">Register</button>
          <p className="footer-text">Already have an account? <a>Login</a> here.</p>
        </form>
      </div>
    )
  }
}

function mapStateToProps({AuthedUser}) {
  return {AuthedUser}
}


export default connect(mapStateToProps)(Login)
