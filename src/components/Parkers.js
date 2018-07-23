import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, showArrows, onChange, onClickItem, onClickThumb, showThumbs, showStatus, width} from 'react-responsive-carousel'
import parkers1 from "../images/parkers1.png"
import parkersSlider from "../images/parkers-slider.png"
import list1 from "../images/listwithus-1.png"
import list2 from "../images/listwithus-2.png"
import list3 from "../images/listwithus-3.png"
import list4 from "../images/listwithus-4.png"
import one from "../images/1.png"
import two from "../images/2.png"
import three from "../images/3.png"
import MetaTags from 'react-meta-tags'


class Parkers extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div className="landing parkers white-background">
        <MetaTags>
          <title>Find Parking</title>
          <meta name="description" content="Looking for a reserved parking space? Rent from ParkIt! Multiple affordable, 
            monthly reserved parking spaces are available all across Klang Valley." />
          <meta property="og:title" content="Driver | ParkIt | Parking rental services" />
          <meta property="og:image" />
        </MetaTags>
        <section className="hero one background-grey container main-container">
          <div className="content">
            <p className="header">Do you need a parking space?</p>
            <h1>Rent it out!</h1>
            <p className="text">
              Does parking drive you up the wall? Life's too short to waste it hunting
              for parking. You can now drive straight up to your own parking spots where ever
              you choose to rent. We belive parking should be easier
            </p>
            <Link to="/find-parking/search"><button className="btn">I NEED A PARKING</button></Link>
          </div>
          <div className="image-container">
            <img src={parkers1}></img>
          </div>
        </section>
        <section className="hero two">
          <Carousel className="carousel-container" showArrows={true} onChange={onChange} showThumbs={false} showStatus={false}>
            <div>
              <img src={parkersSlider}></img>
            </div>
            <div>
              <img src={parkersSlider}></img>
            </div>
          </Carousel>
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
          <div className="content-container">
            <div></div>
            <div className="content">
              <h1>Why you'll love renting with us</h1>
              <p>Forget about fighting for parking and that parking meter - your space is 100% yours at no extra charge.</p>
            </div>
            <div></div>
          </div>
            <img src={list4}></img>
        </section>
        <section className="signup container">
          <div className="container content">
            <p>Save others from the pain of parking.</p>
            <p>It takes less than 2 minutes to list your parking with us.</p>
            <Link to="/find-parking/search"><button className="btn">I NEED A PARKING</button></Link>
          </div>
        </section>
      </div>
    )
  }
}

export default Parkers
