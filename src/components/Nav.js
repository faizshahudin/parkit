import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../images/parkit-logo.png"
import MenuIcon from "../images/menu-icon.png"

export default function Nav () {
  return (
    <nav className="nav">
      <ul className="nav-container one">
        <li>
          <NavLink to='/' activeClassName='active'>
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
    </nav>
  )
}
