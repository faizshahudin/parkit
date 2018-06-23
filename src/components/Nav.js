import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../images/parkit-logo.png"
import MenuIcon from "../images/menu-icon.png"
import { connect } from 'react-redux'
import { logout } from "../actions/AuthedUser"
import {handleLogout} from "../actions/AuthedUser"
import { withRouter } from "react-router-dom";
import Modal from 'react-modal';
import LoginRegister from "./Login"
import {handleShowModal} from "../actions/modal"
import avatar from "../images/avatar-placeholder.jpeg"

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: null,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth })
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  render() {
    const {AuthedUser} = this.props
    console.log(window.innerWidth)
    return (
      <Fragment>
        {this.state.width < 500
          ? <MobileNav AuthedUser={AuthedUser}/>
          : <DesktopNav AuthedUser={AuthedUser}/>
        }
      </Fragment>
    )
  }
}

class DesktopNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IsAuthenticated: null,
      modalIsOpen: false,
    }
  }

  openModal = () => {
    const {dispatch} = this.props
    dispatch(handleShowModal("Login"))
  }

  openModalRegister = () => {
    const {dispatch} = this.props
    dispatch(handleShowModal("Register"))
  }

  logout = () => {
    const {dispatch, history} = this.props
    dispatch(handleLogout())
    history.push("/")
  }


  render() {
    const {AuthedUser} = this.props

    return (
      <div>
        <nav className="nav">
          <ul className="nav-container one">
            <li>
              <NavLink exact to="/"
                activeClassName="null"
                >
              <img className="nav-logo" src={Logo}></img>
              </NavLink>
            </li>
            <li>
              <NavLink to='/owners' activeClassName='active'>
                Owners
              </NavLink>
            </li>
            <li>
              <NavLink to='/parkers' activeClassName='active'>
                Parkers
              </NavLink>
            </li>
          </ul>
          <ul className="nav-container two">
            <li>
              <NavLink to='/find-parking/search' activeClassName='active'>
                Find a Parking
              </NavLink>
            </li>
            {AuthedUser
              ?
                  <Fragment>
                    <li>
                      <NavLink to='/add-listing' activeClassName='active'>
                        List a Parking
                      </NavLink>
                    </li>
                    <li className="user-container dropdown">
                      <div className="user-avatar-container">
                        {AuthedUser.image
                          ? <img className="user-avatar" src={AuthedUser.image}></img>
                          : <img className="user-avatar" src={avatar}></img>
                        }
                        <div className="user-name">
                          <a>{AuthedUser.first_name}</a>
                          <i className="fa fa-angle-down dropbtn"/>
                        </div>
                      </div>
                      <div className="dropdown-content">
                        <NavLink to="/dashboard">My Profile</NavLink>
                          <hr/>
                        <a onClick={this.logout}>Logout</a>
                      </div>
                    </li>
                  </Fragment>

            : <Fragment>
              {AuthedUser === false
                ? <div></div>
                :
                <Fragment>
                  <li>
                    <a onClick={this.openModal}>
                      Log in
                    </a>
                  </li>
                  <li>
                    <a onClick={this.openModalRegister} className="btn-transparent">
                      Sign Up
                    </a>
                  </li>
                </Fragment>
              }
            </Fragment>
            }
          </ul>
        </nav>
      </div>
    )
  }
}

class MobileNav extends Component {
  render() {
    return (
      <Fragment>
        <nav className="nav">
          <ul className="nav-container">
            <li>
              <NavLink exact to="/"
                activeClassName="null"
                >
              <img className="nav-logo" src={Logo}></img>
              </NavLink>
            </li>
            <li>
              <a onClick={this.openModalRegister}>
                Login
              </a>
            </li>
            <li>
              <a onClick={this.openModalRegister}>
                Register
              </a>
            </li>
          </ul>
        </nav>
      </Fragment>
    )
  }
}



export default withRouter(Nav)
