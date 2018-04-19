import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import logo from "../images/parkit-logo-outline.png"

class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <hr />
        <div className="container">
          <div className="logo">
            <img src={logo}></img>
          </div>
          <div>
            <div>
              <h3>ParkIt</h3>
            </div>
            <div>
              <p>ParkIt aims to solve this problem by connecting drivers to unused parking
                spaces in KL
              </p>
            </div>
            <div>
              <p>Contact us</p>
              <p>+6010 222 8432</p>
            </div>
            <div>
              <p>Email Us</p>
              <p>parkitmsia@gmail.com</p>
            </div>
          </div>

          <div>
            <p>Parkit Solutions Sdn Bhd</p>
            <p>B-06-02, Sunway Geo Avenue</p>
            <p>Jalan Lagoon Selatan, Bandar Sunway</p>
            <p>47500, Subang Jaya</p>
            <p>Selangor, Malaysia</p>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to='/owners' exact activeClassName='active'>
                  Owners
                </NavLink>
              </li>
              <li>
                <NavLink to='/parkers/search' activeClassName='active'>
                  Parkers
                </NavLink>
              </li>
              <li>
                <NavLink to='/blog' activeClassName='active'>
                  Blog
                </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to='/faq' activeClassName='active'>
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink to='/contact' activeClassName='active'>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default Footer
