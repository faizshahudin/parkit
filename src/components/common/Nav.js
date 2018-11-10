import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import {handleShowModal} from "../../actions/modal"
import { handleLogout, logout } from "../../actions/AuthedUser"
import './Nav.css';
import LoginRegister from "../Login"
import avatar from "../../images/avatar-placeholder.jpeg"
import Logo from "../../images/parkit-logo.png"
import MenuIcon from "../../images/menu-icon.png"
import parkitFull from '../../images/parkitFull.png';
import searchIcon from '../../images/search-icon.png';
import { fields } from '../../utils/data';

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
    const {AuthedUser, logout} = this.props;
    const { area } = fields;

    return (
      <div className="outer">
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
              <div className="full-title">
                <span className="full-title-divider">|</span>
                <span className="full-title--title">Parkit Malaysia</span>
              </div>
            </li>
          </ul>
          <ul className="nav-container">
            <div>
                <SearchBar 
                  area={area.options} 
                  onChange={(e) => this.props.history.push({
                    pathname: '/find-parking/search',
                    state: e.target.value
                  })}
                />
              </div>
          </ul>
          <ul className="nav-container">
            <li>
              <NavLink to='/owners' activeClassName='active'>
                <span className="grey">Owners</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/parkers' activeClassName='active'>
                <span className="grey">Parkers</span>
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
                      <span className="primary-color">
                        Log in
                      </span>
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

// functional component for search bar
const SearchBar = (props) => {
  return (
    <Fragment>
      <form className="search-form">
        <select onChange={props.onChange}>
          <option value="none">Search nearest available parking</option>
          {props.area.map(a => 
            <option key={a.value} value={a.value}>{a.title}</option>
          )}
        </select>
      </form>
    </Fragment>
  )
}

// below functional component is for rendering user avatar
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

// below codes is for navigation in mobile
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
          <nav className="nav mobile">
            <ul className="nav-container" style={{cursor: "pointer"}}>
              <li onClick={this.toggleMenu}>
                <img className="nav-logo" src={Logo}></img>
                <i className="fa fa-angle-down dropbtn"/>
              </li>

            </ul>
            <ul className="nav-container">
              {AuthedUser
                ? <UserAvatar AuthedUser={AuthedUser} logout={logout}/>
                :
                <Fragment>
                  {AuthedUser === false
                    ? <div></div>
                    : <div className="nav-links">
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
                      </div>
                  }

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
            <li>
              <NavLink to='/find-parking/search' activeClassName='active' onClick={props.toggleMenu}>
                Find a Parking
              </NavLink>
            </li>
            <li>
              <NavLink to='/add-listing' activeClassName='active' onClick={props.toggleMenu}>
                List a Parking
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
  )
}



export default withRouter(Nav)
