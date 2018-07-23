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
import logos from "../images/logos.png"
import MetaTags from 'react-meta-tags'



class Owners extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return(
      <div className="landing owners white-background">
        <MetaTags>
          <title>List a Parking</title>
          <meta name="description" content="Have a parking space to rent out? Rent it out with ParkIt, we will connect you to drivers who need parking spaces and will manage the rental services end to end. 
            Available to all parking space owners across all of Klang Valley." />
          <meta property="og:title" content="Parking Owner | ParkIt | Parking rental services" />
          <meta property="og:image" />
        </MetaTags>
        <section className="hero one background-grey container main-container">
          <div className="content">
            <p className="header">Not using your parking space?</p>
            <h1>Rent it out!</h1>
            <p className="text">
              Enjoy passive income and hassle-free management by renting with ParkIt!
              We ensure security by renting only to reliable tenants, providing you with all their relevant information and collecting payments timely.
            </p>
            <Link to="/add-listing"><button className="btn">RENT MY PARKING SPACE</button></Link>
          </div>
          <div className="image-container">
            <img src={owners1}></img>
          </div>
        </section>
        <section className="hero two">
          <div className="image">
            <img src={owners2}></img>
          </div>
          <div className="content">
            <h1>How does it work?</h1>
            <ol>
              <div className="bullet-points one"><img src={one}></img><li>Provide your unused parking location details.</li></div>
              <div className="bullet-points two"><img src={two}></img><li>Agree to terms and conditions when we get in contact.</li></div>
              <div className="bullet-points three"><img src={three}></img><li>Sit back and watch your bank account grow.</li></div>
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
        <section className="hero signup container">
          <div className="container content">
            <p>What are you waiting for?</p>
            <p>Rent out your parking space today!</p>
            <Link to="/add-listing"><button className="btn">RENT MY PARKING SPACE</button></Link>
          </div>
        </section>
        <section className="partners">
          <div className="logo-container">
            <img className="logo" src={logos}></img>
          </div>
        </section>
      </div>
    )
  }
}

export default Owners
