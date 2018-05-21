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
  this.setState({modalIsOpen: true});
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
    const {AutherUser} = this.props
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          // overlayClassName="ReactModal__Overlay"
          tabindex="1"
          className="Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            },
          }}
        >
          <LoginRegister />
        </Modal>
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
              <button onClick={this.openModal} className="btn-transparent" activeClassName='active'>
                Sign Up
              </button>
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
      </div>

    )
  }
}

export default withRouter(Nav)
