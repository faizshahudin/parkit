import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import hero1 from "../images/hero-image1.png"
import hero2 from "../images/hero-image2.png"
import hero3 from "../images/hero-image3.png"
import hero4 from "../images/hero-image4.png"
import logos from "../images/logos.png"
import cloud from "../images/clouds.png"


class Home extends Component {
  render() {
    return(
      <div className="landing home white-background ">
        <section className="hero one background-grey">
          <div className="content main-container">
            <h1><span>Connecting</span> drivers to unused parking spaces</h1>
            <p>It's easier than building new ones. Park with ParkIt for all your parking needs.</p>
          </div>
          <div className="container">
            <img className="hero-img" src={hero1}></img>
          </div>
        </section>
        <section className="partners container">
          <div>
            <h4>SPECIAL THANKS TO</h4>
          </div>
          <div className="logo-container">
            <img className="logo" src={logos}></img>
          </div>
          <div>
            <p>READ ALL ABOUT PARKIT HERE</p>
          </div>
        </section>
        <section className="hero two container">
          <div>
            <img className="hero-img" src={hero2}></img>
          </div>
          <div>
            <h1>Your dedicated parking buddy</h1>
            <p>
              Parking in our city has always been difficult; either time consuming,
              expensive or both.
            </p>
            <p>
              ParkIt aims to solve this problem by connecting drivers to unused parking spaces
              that are available for rent all around Klang Valley.
            </p>
          </div>
        </section>
        <section className="hero three container">
          <div className="content">
            <img className="cloud" src={cloud}></img>
            <h1>Looking for a season parking space?</h1>
            <p>
              Send us an enquiry and we will connect you to our available parking spaces
              in the city. Our parkings are convenient, safe, and reliable.
            </p>
            <button className="btn">I NEED A PARKING</button>
          </div>
          <div>
            <img className="hero-img" src={hero3}></img>
          </div>
        </section>
        <section className="hero four container">
          <div>
            <img className="hero-img" src={hero4}></img>
          </div>
          <div className="content">
            <img className="cloud" src={cloud}></img>
            <h1>Do you have a parking space you do not use?</h1>
            <p>
              Sign up here and put it up for rent on ParkIt! We'll rent it out to a driver
              in need; helping them with their parking problems and getting you a new
              source of passive income. It's a win-win!
            </p>
            <button className="btn">I HAVE A PARKING</button>
          </div>
        </section>
        <section className="signup">
          <div className="container">
            <h3>We're here for all your parking needs. Sign up now!</h3>
            <Link to="/register"><button className="btn">GET STARTED</button></Link>
          </div>
        </section>
      </div>

    )
  }
}

export default Home
