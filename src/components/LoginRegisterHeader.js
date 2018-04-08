import React, {Component} from "react"
import logo from "../images/parkit-logo-outline.png"

const LoginRegisterHeader = () => {
  return (
    <div className="login-register-header-container">
      <img className="login-register-logo" src={logo}></img>
      <h1 className="login-register-header">ParkIt</h1>
      <p className="login-register-tagline">Let's make parking great together</p>
    </div>
  )
}

export default LoginRegisterHeader
