import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, showArrows, onChange, onClickItem, onClickThumb, showThumbs, showStatus, width} from 'react-responsive-carousel'
import MetaTags from 'react-meta-tags'

import './Parkers.css';
import Button from '../components/common/Button';
import Partner from '../components/common/Partner';
import video from '../images/owner-section5-1.png';
import parkers1 from '../images/parkers-1.png';
import parkers2 from '../images/parkers-2.png';
import parkers3 from '../images/parkers-3.png';
import parkers4 from '../images/parkers-4.png';
import parkers5 from '../images/parkers-5.png';

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

        <section className="parker-section1">
          <div className="content">
            <div className="cta">
              <p>Do you need a parking space?</p>
              <h1>Rent it now!</h1>
              <p className="text">
                Does parking drive you up the wall? Life's too short to
                waste it hunting for parking. You can now drive straight
                up to your own parking spots where ever you choose
                to rent. We believe parking should be easier.
              </p>
              <Link to="/find-parking/search">
                <Button className="btn" buttonText="RENT A PARKING SPACE" />
              </Link>
            </div>
            <div className="image-container">
              <img src={parkers1} />
            </div>
          </div>
        </section>

        <section className="parker-section2">
          <div className="container">
            <div className="image">
              <img src={parkers2} />
            </div>
            <div className="content">
              <h1>How can I get started?</h1>
              <p>
                Find the perfect space that you intend to park
                and leave the rest to us.
              </p>
              <div>
                <SearchBar />
              </div>
              <p>
                Save others from the pain of parking.<br/>
                It takes less than 2 minutes to list your parking
                with us.
              </p>
            </div>
          </div>
        </section>

        <section className="parker-section3">
          <div className="container">
            <div className="content">
              <h1>Why you'll love renting with us</h1>
              <p>
                Forget about fighting for parking and that parking
                meter - your space is 100% yours at no extra charge.
              </p>
            </div>
            <div className="button-container">
              <Link to="/find-parking/search">
                <Button className="btn" buttonText="I NEED A PARKING SPACE" />
              </Link>
            </div>
          </div>
        </section>

        <section className="parker-section4">
          <div className="container">
            <div className="item">
              <img src={parkers3} />
              <div>Affordable</div>
            </div>
            <div className="item">
              <img src={parkers4} />
              <div>Convenient</div>
            </div>
            <div className="item">
              <img src={parkers5} />
              <div>Secure</div>
            </div>
          </div>
        </section>

        <section className="parker-section5">
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

const SearchBar = (props) => {
  return (
    <React.Fragment>
      <form className="search-form">
        <input 
          placeholder="Search nearest available parking"
        />
      </form>
    </React.Fragment>
  )
}

export default Parkers
