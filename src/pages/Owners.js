import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import owners1 from "../images/rent-parking.png"
import owners2 from "../images/owner-section2-car.png"
import list1 from "../images/listwithus-1.png"
import list2 from "../images/listwithus-2.png"
import list3 from "../images/listwithus-3.png"
import one from "../images/owner-section2-1.png"
import two from "../images/owner-section2-2.png"
import three from "../images/owner-section2-3.png"
import item1 from "../images/owner-section4-1.png";
import item2 from "../images/owner-section4-2.png";
import item3 from "../images/owner-section4-3.png";
import video from "../images/owner-section5-1.png";
import dropdown from '../images/dropdown.png';  
import logos from "../images/logos.png"
import Button from '../components/common/Button';
import Partner from '../components/common/Partner';
import './Owner.css';

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

        <section className="owner-section1">
          <div className="content">
            <div className="cta">
              <h1>Rent it out!</h1>
              <p className="text">
                Enjoy passive income and hassle-free management by renting with ParkIt!
                We ensure security by renting only to reliable tenants, providing you with all their relevant information and collecting payments timely.
              </p>
              <Link to="/add-listing">
                <Button className="btn" buttonText="RENT MY PARKING SPACE" />
              </Link>
            </div>
            <div className="image-container">
              <img src={owners1}></img>
            </div>
          </div>
        </section>

        <section className="owner-section2">
          <div className="container">
            <div className="image">
              <img src={owners2}></img>
            </div>
            <div className="content">
              <h1>How does it work?</h1>
              <ol>
                <div className="bullet-points">
                  <div>
                    <img src={one} />
                    <img src={dropdown} className="dropdown" />
                  </div>
                  <li>Provide your unused parking location details.</li>
                </div>
                <div className="bullet-points">
                  <div>
                    <img src={two} />
                    <img src={dropdown} className="dropdown" />
                  </div>
                  <li>Agree to terms and conditions when we get in contact.</li>
                </div>
                <div className="bullet-points">
                  <div>
                    <img src={three} />
                  </div>
                  <li>Sit back and watch your bank account grow.</li>
                </div>
                <div className="bullet-points">
                  <div>
                  </div>
                  <li>What are you waiting for?<br/>Rent out your parking space today!</li>
                </div>
              </ol>
            </div>
          </div>
        </section>

        <section className="owner-section3">
          <div className="container">
            <div className="content">
              <h1>Why list with us?</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="button-container">
              <Link to="/add-listing">
                <Button className="btn" buttonText="RENT MY PARKING SPACE" />
              </Link>
            </div>
          </div>
        </section>

        <section className="owner-section4">
          <div className="container">
            <div className="item">
              <img src={item1} />
              <div>Help Others</div>
            </div>
            <div className="item">
              <img src={item2} />
              <div>It's Easy</div>
            </div>
            <div className="item">
              <img src={item3} />
              <div>We Settle The Rest</div>
            </div>
          </div>
        </section>

        <section className="owner-section5">
          <div className="container">
            <img src={video}/>
            <div className="content">
              <h1>Lorem ipsum dolor sit amet</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </section>

        <Partner />
      </div>
    )
  }
}

export default Owners
