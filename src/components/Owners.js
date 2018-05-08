import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import owners1 from "../images/owners-overview1.png"
import owners2 from "../images/owners-overview2.png"
import list1 from "../images/listwithus-1.png"
import list2 from "../images/listwithus-2.png"
import list3 from "../images/listwithus-3.png"
import one from "../images/1.png"
import two from "../images/2.png"
import three from "../images/3.png"


class Owners extends Component {
  render() {
    return(
      <div className="home owners">
        <section className="hero one background-grey container">
          <div className="content">
            <p className="header">Not using your parking space?</p>
            <h1>Rent it out!</h1>
            <p className="text">Why not rent out unused parking spaces to drivers that are
              really in need of them. Usually these are professionals working
              in office buildings nearby. We work with you to ensure all
              drivers details are registered with the management,
              and you are always in control of your parking space.
            </p>
            <button className="btn">LIST MY PARKING</button>
          </div>
          <div>
            <img src={owners1}></img>
          </div>
        </section>
        <section className="hero two container">
          <div className="image">
            <img src={owners2}></img>
          </div>
          <div className="content">
            <h1>How does it work?</h1>
            <ol>
              <div className="bullet-points"><img src={one}></img><li>Provide your unused parking location details.</li></div>
              <div className="bullet-points"><img src={two}></img><li>Agree to terms and conditions when we get in contact.</li></div>
              <div className="bullet-points"><img src={three}></img><li>Sit back and watch your bank account grow.</li></div>
            </ol>
          </div>
        </section>
        <section className="list">
          <div className="content">
            <h1>Why list with us?</h1>
          </div>
          <div className="images">
            <img src={list1}></img>
            <img src={list2}></img>
            <img src={list3}></img>
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

export default Owners
