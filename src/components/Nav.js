import React, { Component } from 'react'
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



// const customStyles = {
//   content : {
//     top                   : '100%',
//     left                  : '100%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IsAuthenticated: null,
      modalIsOpen: false,
    }
  }

  openModal = () => {
    const {dispatch} = this.props
    this.setState({modalIsOpen: true});
    dispatch(handleShowModal("Login"))
  }

  afterOpenModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  logout = () => {
    const {dispatch, history} = this.props
    dispatch(handleLogout())
    history.push("/")
  }


  render() {
    // const {AutherUser, match} = this.props

    return (
      <div>
        <nav className="nav">
          <ul className="nav-container one">
            <li>
              <NavLink exact to='/' activeClassName="null">
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
            <li>
              <a onClick={this.openModal}>
                Log in
              </a>
            </li>
            <li>
              <a onClick={this.openModal} className="btn-transparent">
                Sign Up
              </a>
            </li>
          </ul>
          {(localStorage.getItem("auth")?
            <div onClick={this.logout}>Logout</div>
            : <div>No</div>
          )}
        </nav>
      </div>

    )
  }
}


function mapStateToProps({authedUser, modal}) {
  return {
    modal
  }
}

export default withRouter(Nav)
