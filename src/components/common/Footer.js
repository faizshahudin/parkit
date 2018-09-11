import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import "./Footer.css";
import logo from "../../images/parkit-logo.png";
import inLogo from "../../images/in-logo.png";
import twtLogo from "../../images/twt-logo.png";
import instaLogo from "../../images/insta-logo.png";
import fbLogo from "../../images/fb-logo.png";

class Footer extends Component {
  render() {
    return(
      <div className="footer">
        {/* <hr />
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
                <NavLink to='/parkers' activeClassName='active'>
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
        </div> */}
        <div className="top-content">
          <div className="logo-container">
            <img src={logo} />
          </div>
          <div className="parkit">
            <div className="title">ParkIt</div>
            <div className="subtitle">
              ParkIt aims to solve this problem by connecting drivers
              to unused parking spaces in KL.
            </div>
          </div>
          <div className="contact">
            <div className="title">Contact Us</div>
            <div className="subtitle">
              <span>+6010 222 8432</span>
              <span>www.parkitmy.com</span>
            </div>
          </div>
          <div className="address">
            <div className="title">ParkIt Solutions Sdn Bhd</div>
            <div className="subtitle">
              B-06-02, Sunway Geo Avenue, Jalan Lagoon Selatan,
              Bandar Sunway 47500, Subang Jaya,
              Selangor, Malaysia
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <ul>
            <li>
              <NavLink to='/owners' exact activeClassName='active'>
                Owners
              </NavLink>
            </li>
            <li>
              <NavLink to='/parkers' activeClassName='active'>
                Parkers
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' activeClassName='active'>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to='/blog' activeClassName='active'>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to='/faq' activeClassName='active'>
                FAQs
              </NavLink>
            </li>
          </ul>
        </div>
        
        <div className="social-link">
          <img src={inLogo} />
          <img src={twtLogo} />
          <img src={instaLogo} />
          <img src={fbLogo} />
        </div>
      </div>
    )
  }
}

export default Footer
