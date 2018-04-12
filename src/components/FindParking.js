import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {BrowserRouter as Router, Route} from "react-router-dom"
import { NavLink } from 'react-router-dom'


class FindParking extends Component {
  render() {
    return(
      <div className="find-parking-container container">
        <div className="header">
          <h1>Find Us Where You Are</h1>
          <hr />
        </div>
        <Route path={`/parkers/search`} component={Search}/>
        <Route exact path={`/parkers/no-parking`} component={NoParking}/>
      </div>
    )
  }
}

class Search extends Component {
  state = {
    currentLocation: "klSentral",
    klSentral: {
      center: { lat: 3.1342819, lng: 101.6839707 },
      markers: [
        {
          name: "Suasana Loft",
          lat: 3.131425,
          lng: 101.6818833
        },
        {
          name: "Suasana Sentral",
          lat: 3.1315919,
          lng: 101.6830183
        }
      ]
    },
    sunway: {
      center: {lat: 3.073659, lng: 101.6038753},
      markers: [
        {
          name: "Shell",
          lat: 3.0743554,
          lng: 101.6059031
        },
        {
          name: "Ah Foong",
          lat: 3.076633,
          lng: 101.6020203
        }
      ]
    }
  }

  handleChange = (e) => {
   let value = e.target.value
   this.setState((state) => ({
     currentLocation: value
   }))
   const location = this.state.klSentral.markers.map((place) => place)
   console.log(location)
 }
  render() {
    let {currentLocation} = this.state
    return (
      <div>
        <div className="body box">
          <div className="header">
            <h3>ParkIt Locations</h3>
            <p>Let's make parking great together</p>
          </div>
          <div className="map">
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyApjld64g85YeINEMm2JPBLz_OKkONqcJs&libraries=places,geometry,drawing&v=3"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              currentLocation={this.state[currentLocation]}
            />
          </div>
          <div className="search">
            <div>
              <p>Find us here:</p>
            </div>
            <form className="search-body">
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="klSentral">KL Sentral</option>
                <option value="sunway">Sunway</option>
              </select>
              <button>Search</button>
            </form>
          </div>
          <div>
            <NavLink to="/parkers/no-parking">
              <p>Can't find the location? Let us know.</p>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}

class NoParking extends Component {
  state = {
    submit: false
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState((state) => ({
      [name]: value
    }))
  }

   handleSubmit = (e) => {
     e.preventDefault()
     this.setState({submit: true})
   }

   isDisabled = () => {
     const {carparkLocation, startDate, budget} = this.state

     return !carparkLocation
      || !startDate
      || !budget
   }

  render() {
    let {submit} = this.state
    return(
      <div className="enquire body box">
        {!submit &&
          <div>
            <div className="header">
              <h3>ParkIt Locations</h3>
              <p>No parking available? Let us sort you out</p>
            </div>
            <form className="form">
              <div>
                <label>Where do you require carpark?</label>
                <input name="carparkLocation" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Area/Location"></input>
              </div>
              <div>
                <label>When do you want to start parking</label>
                <input name="startDate" value={this.state.value} onChange={this.handleChange} type="date" style={this.state.startDate ? {color: "black"} : {color: "#8a8888"}}></input>
              </div>
              <div>
                <label>What is your expected budget?</label>
                <select name="budget" value={this.state.value} onChange={this.handleChange} style={this.state.budget ? {color: "black"} : {color: "#8a8888"}}>
                  <option value="">Select</option>
                  <option value="RM300">RM300</option>
                  <option value="RM500">RM500</option>
                </select>
              </div>
              <div className="button">
                <button onClick={this.handleSubmit} className="btn" disabled={this.isDisabled()}>Send Enquiry</button>
              </div>
            </form>
          </div>
        }
        {submit &&
          <div className="thank-you">
            <div className="header">
              <h3>Thank You, Jao Ern!</h3>
            </div>
            <div className="message">
              <p>Your enquiry has been sent to ParkIt.</p>
              <p>A confirmation email has been sent to parkitmsia@gmail.com</p>
              <p>Our team will be in touch with you.</p>
            </div>
            <div className="redirect">
              <p>Redirecting you to the homepage</p>
              <p>in 10 seconds.</p>
            </div>
            <div className="button">
              <button className="btn">Go To Homepage</button>
            </div>
          </div>
        }
      </div>
    )
  }
}



const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={props.currentLocation.center}
  >
    {props.currentLocation.markers.map((place, index) => (
      <Marker
        key={index}
        position={{lat: place.lat, lng: place.lng}}
      />
    ))}



  </GoogleMap>
))

export default FindParking
