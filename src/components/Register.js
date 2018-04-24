import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import LoginRegisterHeader from "./LoginRegisterHeader"
import { Link } from 'react-router-dom'
import * as Api from "./Api"



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
    e.preventDefault()
    let data = this.state
    console.log(data)
    Api.register(data)
  }

  render() {
    return(
      <div className="login-register-container container">
        <LoginRegisterHeader />
        <div className="login-register-form-container">
          <h3 className="login-register-form-header">Register</h3>
          <form className="login-register-form-content" onSubmit={this.handleSubmit}>
            <label>
              Username
            </label>
            <input
              name="username"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label>
              First Name:
            </label>
            <input
              name="first_name"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label>
              Last Name:
            </label>
            <input
              name="last_name"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label>
              Email:
            </label>
            <input
              name="email"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label>
              Confirm Email:
            </label>
            <input
              name="email2"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label>
              Password:
            </label>
            <input
              name="password"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <button className="btn login-register-button">Register</button>
            <p className="footer-text">Already have an account? <Link to="/login">Login</Link> here.</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Register
