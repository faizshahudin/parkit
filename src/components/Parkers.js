import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import parkers1 from "../images/parkers1.png"
import parkersSlider from "../images/parkers-slider.png"
import list1 from "../images/listwithus-1.png"
import list2 from "../images/listwithus-2.png"
import list3 from "../images/listwithus-3.png"
import one from "../images/1.png"
import two from "../images/2.png"
import three from "../images/3.png"

class Parkers extends Component {
  render() {
    return (
      <div className="landing parkers white-background">
        <section className="hero one background-grey container main-container">
          <div className="content">
            <p className="header">Do you need a parking space?</p>
            <h1>Rent it out!</h1>
            <p className="text">
              Does parking drive you up the wall? Life's too short to waste it hunting
              for parking. You can now drive straight up to your own parking spots where ever
              you choose to rent. We belive parking should be easier
            </p>
            <button className="btn">RENT A PARKING</button>
          </div>
          <div>
            <img src={parkers1}></img>
          </div>
        </section>
        <section className="hero two">
          <div className="image">
            <img src={parkersSlider}></img>
          </div>
          <div className="content-container">
            <div></div>
            <div className="content">
              <h1>How can I get started?</h1>
              <p>Find the perfect space that you intend to park and leave the rest to us.</p>
            </div>
            <div></div>
          </div>
        </section>
        <section className="hero three container">
          <div className="content">
            <h1>Why you'll love renting with us</h1>
          </div>
          <div className="image">
            <img></img>
          </div>
        </section>
        <section className="signup container">
          <div className="container content">
            <h1>Save others from the pain of parking.</h1>
            <p>It takes less than 2 minutes to list your parking with us.</p>
            <Link to="/register"><button className="btn">LIST MY PARKING</button></Link>
          </div>
        </section>
      </div>
    )
  }
}

export default Parkers
