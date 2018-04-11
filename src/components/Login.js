import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import LoginRegisterHeader from "./LoginRegisterHeader"
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return(
      <div className="login-register-container container">
        <LoginRegisterHeader />
        <div className="login-register-form-container">
          <h3 className="login-register-form-header">Log In</h3>
          <form className="login-register-form-content">
            <label>
              Email:
            </label>
            <input className="login-register-form-input" type="text"></input>
            <label>
              Password:
            </label>
            <input className="login-register-form-input" type="text"></input>
            <p><a>Forgot Password?</a></p>
            <button className="btn login-register-button">Log In</button>
            <p>Don't have an account? <Link to="/register">Sign up</Link> here.</p>
          </form>
        </div>
      </div>
    )
  }
}

class Register extends Component {
  render() {
    return(
      <div className="login-register-form-container">
        <h3 className="login-register-form-header">Register</h3>
        <form>
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

export default Login
