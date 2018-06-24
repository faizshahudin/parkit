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

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth })
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  render() {
    const {AuthedUser, dispatch, history} = this.props
    return (
      <Fragment>
        {this.state.width < 500
          ? <MobileNav {...this.props} history={history} openModal={this.openModal} openModalRegister={this.openModalRegister} logout={this.logout}/>
          : <DesktopNav {...this.props} history={history} openModal={this.openModal} openModalRegister={this.openModalRegister} logout={this.logout}/>
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


  render() {
    const {AuthedUser, logout} = this.props

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
                    <UserAvatar AuthedUser={AuthedUser} logout={logout}/>
                  </Fragment>
            : <Fragment>
              {AuthedUser === false
                ? <div></div>
                :
                <Fragment>
                  <li>
                    <a onClick={this.props.openModal}>
                      Log in
                    </a>
                  </li>
                  <li>
                    <a onClick={this.props.openModalRegister} className="btn-transparent">
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

const UserAvatar = (props) => {
  return (
    <Fragment>
      <li className="user-container dropdown">
        <div className="user-avatar-container">
          {props.AuthedUser.image
            ? <img className="user-avatar" src={props.AuthedUser.image}></img>
            : <img className="user-avatar" src={avatar}></img>
          }
          <div className="user-name">
            <a>{props.AuthedUser.first_name}</a>
            <i className="fa fa-angle-down dropbtn"/>
          </div>
        </div>
        <div className="dropdown-content">
          <NavLink to="/dashboard">My Profile</NavLink>
            <hr/>
          <a onClick={props.logout}>Logout</a>
        </div>
      </li>
    </Fragment>
  )
}

class MobileNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayMenu: false,
    }
  }

  toggleMenu = () => {
    this.setState({ displayMenu: !this.state.displayMenu })
    console.log(this.state)
  }

  render() {
    const {AuthedUser, logout} = this.props
    return (
      <Fragment>
        {this.state.displayMenu
          ? <MobileMenu toggleMenu={this.toggleMenu}/>
          :
          <nav className="nav">
            <ul className="nav-container">
              <li onClick={this.toggleMenu}>
                <img className="nav-logo" src={Logo}></img>
              </li>
              {AuthedUser
                ? <UserAvatar AuthedUser={AuthedUser} logout={logout}/>
                :
                <Fragment>
                  <li>
                    <a onClick={this.props.openModal}>
                      Login
                    </a>
                  </li>
                  <li>
                    <a onClick={this.props.openModalRegister}>
                      Register
                    </a>
                  </li>
                </Fragment>
              }

            </ul>
          </nav>
        }

      </Fragment>
    )
  }
}

const MobileMenu = (props) => {
  return (
    <div className="mobile-menu">
      <div className="close-modal">
        <div></div>
        <div></div>
        <div className="close-button" onClick={props.toggleMenu}>X</div>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/' activeClassName='active' onClick={props.toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/owners' activeClassName='active' onClick={props.toggleMenu}>
              Owners
            </NavLink>
          </li>
          <li>
            <NavLink to='/parkers' activeClassName='active' onClick={props.toggleMenu}>
              Parkers
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}



export default withRouter(Nav)
