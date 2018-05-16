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
      <div className="login-register-container container grey-background">
        <LoginRegisterHeader />
        <div className="login-register-form-container">
          <h3 className="login-register-form-header">Register</h3>
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
            <label htmlFor="fName">
              First Name:
            </label>
            <input
              required
              id="fName"
              name="first_name"
              autoComplete="fname"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label htmlFor="lName">
              Last Name:
            </label>
            <input
              required
              id="lName"
              name="last_name"
              className="login-register-form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              >
            </input>
            <label htmlFor="email">
              Email:
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
            <label htmlFor="email2">
              Confirm Email:
            </label>
            <input
              required
              id="email2"
              name="email2"
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
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain a combination of numbers, uppercase and lowercase letters, and at least 6 or more characters"
              id="password"
              name="password"
              className="login-register-form-input"
              type="password"
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
