import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router';
import MetaTags from 'react-meta-tags';

import { handleShowModal } from "../actions/modal";
import { handleRegister } from "../actions/AuthedUser";
import Button from "../components/common/Button";
import Partner from "../components/common/Partner";
import CustomCarousel from '../components/home/CustomCarousel';
import './Home.css';
import hero1 from "../images/hero-image1.png";
import parkers1 from "../images/parkers-1.png";
import rentParking from "../images/rent-parking.png";
import registerBanner from "../images/register-banner.png";

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};  
  }

  componentDidMount() {
    const { AuthedUser, modal } = this.props;

    if (AuthedUser && modal.path) {
      this.props.history.push({
        pathname: modal.path
      });
    }
  }

  openModal = () => {
    console.log('test');
    const { dispatch } = this.props;
    dispatch(handleShowModal("Login"));
  }

  openModalRegister = () => {
    console.log("yes")
    const {dispatch} = this.props
    dispatch(handleShowModal("Register"))
  }

  handleListing = () => {
    const { AuthedUser, dispatch, match } = this.props;

    if (AuthedUser) {
      this.props.history.push({
        pathname: '/add-listing',
      })
    } else {
      dispatch(handleShowModal("Login", '/add-listing'));
    }
  }

  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    name === "email"
      ? this.setState({
        email: value,
        username: value,
      })
      : this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    let data = this.state;
    dispatch(handleRegister(data));
  }

  render() {
    const { AuthedUser } = this.props
    // if (AuthedUser) {
    //   return <Redirect to={"/dashboard"} />
    // }

    return (
      <div className="landing home white-background ">
        <MetaTags>
          <title>Parkit</title>
          <meta name="description" content="In the business of solving Malaysia's parking problem. 
            We help home owners rent out and manage their empty parking spaces to drivers who are in need. 
            Available all across Klang Valley." />
          <meta property="og:title" content="Home | ParkIt | Parking rental services" />
          <meta property="og:image" />
        </MetaTags>

        <section className="hero one background-grey">
          <div className="content full-width">
            <div className="top-content">
              <h1><span className="white">Connecting <br/>drivers to unused <br/>parking spaces.</span></h1>
            </div>
            <div className="bottom-content">
              <p>It's easier than building new ones. <br/>Park with <span>ParkIt</span> for all your parking needs.</p>
            </div>
            <div>
              <img src={hero1} />
            </div>
          </div>
          <div className="content full-width">
            <form onSubmit={this.handleSubmit}>
              <div className="row-input">
                <input
                  className="input-name" 
                  placeholder="First Name"
                  required 
                  id="fName"
                  name="first_name"
                  autoComplete="fname"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <input
                  className="input-name" 
                  placeholder="Last Name" 
                  required
                  id="lName"
                  name="last_name"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
              <input 
                className="input-email"
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                value={this.state.value}
                onChange={this.handleChange} 
              />
              <input
                className="input-contact" 
                placeholder="Contact Number"
                id="contact"
                name="contact"
                type="text"
                value={this.state.value}
                onChange={this.handleChange} 
              />
              <input 
                className="input-password"
                placeholder="Password" 
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain a combination of numbers, uppercase and lowercase letters, and at least 6 or more characters"
                id="password"
                name="password"
                type="password"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <Button 
                className="btn-white" 
                buttonText="Register" 
              /> 
              <div className="link">
                Already have an account? <a onClick={this.openModal}>Login</a> here.
              </div>
            </form>
          </div>
        </section>

        <section className="pitch">
          <div className="full-width">
            <div className="title">Why ParkIt?</div>
            <div className="problems">
              Parking in our city has always been difficult: 
              either time consuming, expensive or both..
            </div>
            <div className="solutions">
              Parkit solves this by providing you affordable 
              and convenient parking spaces <br/>in residential
              and commercial hot spots
            </div> 
          </div>
        </section>

        <section className="hero two">
          <div className="content full-width">
            <img src={parkers1} />
            <div className="title">Looking for a parking space?</div>
            <div className="subtitle">Search and book from our available parking spaces now!</div>
            <Link to="/find-parking/search">  
              <Button className="btn-transparent" buttonText="I NEED A PARKING" />
            </Link>
          </div>
          <div className="content full-width">
            <img src={rentParking} />
            <div className="title">Want to rent out your parking space?</div>
            <div className="subtitle">Fill up our form and rent your parking space on ParkIt today!</div>
              <Button 
                className="btn-transparent rounded" 
                buttonText="I HAVE A PARKING"
                onClick={this.handleListing} 
              />
          </div>
        </section>

        {/* Carousel KIV */}
        <CustomCarousel />

        <section className="signup">
          <div className="full-width">
            <div className="content">
              <div className="img-container">
                <img src={registerBanner} />
              </div>
              <div className="cta">
                <div className="subtitle white">We're here for all your parking needs.</div>
                <div className="title white">Sign up now!</div>
                <Button 
                  className="btn-white rounded" 
                  buttonText="GET STARTED" 
                  onClick={this.openModal}
                />
              </div>
            </div>
          </div>
        </section>

        <Partner />
      </div>

    )
  }
}

function mapStateToProps({modal, AuthedUser}) {
  return {
    modal,
    AuthedUser
  }
}

export default withRouter(connect(mapStateToProps)(Home));
