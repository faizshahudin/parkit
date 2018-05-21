import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import LoginRegisterHeader from "./LoginRegisterHeader"
import { Link } from 'react-router-dom'
import * as Api from "./Api"
import { handleRegister } from "../actions/AuthedUser"
import { connect } from "react-redux"
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom'


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
    const { AuthedUser } = this.props
    return(
      <div className="black-background">
        <div className="login-register register">
          <div className="header">
            <h1>ParkIt</h1>
            <p>Let's make parking great together</p>
          </div>
          <div className="form-container">
            <div className="header">
              <p>Login</p>
              <p>Register</p>
            </div>
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
              <button className="btn">Register</button>
              <p className="footer-text">Already have an account? <Link to="/login">Login</Link> here.</p>
            </form>
          </div>
          {(AuthedUser ?
            <div onClick={this.logout}>Logout</div>
            : <div>No</div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({AuthedUser}) {
  return {AuthedUser}
}

export default connect(mapStateToProps)(Register)
