import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../images/parkit-logo.png"
import MenuIcon from "../images/menu-icon.png"
import { connect } from 'react-redux'
import { logout } from "../actions/AuthedUser"
import {handleLogout} from "../actions/AuthedUser"
import { withRouter } from "react-router-dom";


class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IsAuthenticated: null
    }
  }

  logout = () => {
    const {dispatch, history} = this.props
    dispatch(handleLogout())
    history.push("/")
  }

  render() {
    const {AutherUser} = this.props
    return (
      <nav className="nav">
        <ul className="nav-container one">
          <li>
            <NavLink exact to='/' activeClassName="active">
            <img className="nav-logo" src={Logo}></img>
            </NavLink>
          </li>
          <li>
            <NavLink to='/owners' activeClassName='active'>
              Owners
            </NavLink>
          </li>
          <li>
            <NavLink to='/parkers/search' activeClassName='active'>
              Parkers
            </NavLink>
          </li>
        </ul>
        <ul className="nav-container two">
          <li>
            <NavLink to='/help' activeClassName='active'>
              Help
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' activeClassName='active'>
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink to='/add-listing' className="btn-transparent" activeClassName='active'>
              Rent My Parking
            </NavLink>
          </li>
          <li>
            <img className="nav-menu-icon" src={MenuIcon}></img>
          </li>
        </ul>
        {(localStorage.getItem("auth")?
          <div onClick={this.logout}>Logout</div>
          : <div>No</div>
        )}
      </nav>
    )
  }
}

export default withRouter(Nav)
