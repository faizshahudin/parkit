import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import * as Api from "./Api"

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.location
    }
  }
  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState((state) => ({
      [name]: value
    }))
    console.log(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    Api.resetPassword(this.state)
      .then(res => console.log(res))
      .catch("There was an error processing your request.")
    console.log(this.state)
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    let token = params.get("authtoken")
    let uid = params.get("uid")
    this.setState({
      token: token,
      uid: uid,
    })
  }
  render() {
    return (
      <div>
        <form className="login-register-form-content">
          <label>Password</label>
          <input className="login-register-form-input" name="new_password" type="password" value={this.state.value} onChange={this.handleChange}></input>
          <label>Confirm Password</label>
          <input className="login-register-form-input" name="re_new_password" type="password" value={this.state.value} onChange={this.handleChange}></input>
          <button onClick={this.handleSubmit} className="btn add-listing-form-button">Submit</button>
        </form>

      </div>
    )
  }
}

export default ResetPassword
