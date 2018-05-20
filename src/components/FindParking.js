/*global google*/

import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {BrowserRouter as Router, Route} from "react-router-dom"
import { NavLink } from 'react-router-dom'
import * as Api from "./Api"
import one from "../images/1.png"

class FindParking extends Component {
  render() {
    return(
      <div className="find-parking-container main-container grey-background">
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
    currentLocation: "bangsar",
    bangsar: {
      center: {
        lat: 3.1290099,
        lng: 101.6710076,
      }
    },
    bangsar_south: {
      center: {
        lat: 3.1105194,
        lng: 101.663241,
      }
    },
    locations: [],
  }

  handleChange = (e) => {
   let value = e.target.value
   this.setState((state) => ({
     currentLocation: value
   }))
   this.handleInitialData(value)
 }

 handleInitialData = (area) => {
   Api.getLocations(area).then(res => {
     let locations = res

     let array = []
     locations.map(l => {
       array.push(l.db_property)
     })
     let newArray = [...new Set(array.map(a => a))]
     let objArray = []
     let obj = {}
     newArray.map((key) => {
       obj = locations.filter(l => l.db_property === key)
      objArray.push(obj)
     })

     this.setState({
       locations: objArray
     })
   })
   // console.log(this.state)
 }

 initialize = () => {
   let self = this
   var defaultBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(3.1385035, 101.6167771),
     new google.maps.LatLng(3.2020728, 100.7790663)
   );
   var options = {
     bounds: defaultBounds,
   };
   let autocomplete = new google.maps.places.Autocomplete(
     (document.getElementById('autocomplete')),
     { types: ['geocode'], bounds: defaultBounds, componentRestrictions: {country: 'my'}});


     google.maps.event.addListener(autocomplete, 'place_changed', function() {
       var place = autocomplete.getPlace()
       // let location = {
       //   lat: place.geometry.location.lat(),
       //   lng: place.geometry.location.lng(),
       //   name: place.name,
       //   address: place.formatted_address
       // }
       self.setState({
         userLocation: {
           lat: place.geometry.location.lat(),
           lng: place.geometry.location.lng(),
         }
       })
       // if (self.state.userLocation !== {}) {
       //   console.log(self.state.userLocation)
       //   self.createUserMarker()
       // }
       // console.log(this.state)
 });
}

// createUserMarker() {
//   let image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
//   let marker = new google.maps.Marker({
//     position: this.state.userLocation,
//     title: "Your Location",
//     map: this.map,
//     icon: {
//       path: google.maps.SymbolPath.CIRCLE,
//       scale: 6,
//       strokeColor: '#fbfbfb',
//       strokeOpacity: 0.4,
//       fillOpacity: 1.0,
//       fillColor: '#0096d7'
//     }
//   })
// }

 componentDidMount = () => {
   const refs = {}
   this.handleInitialData(this.state.currentLocation)
   this.initialize()
 }

  render() {
    console.log(this.state)
    let {currentLocation} = this.state
    this.state.locations.map((location => {
      console.log(location[0].db_latitude)
    }))
    return (
      <div>
        <div className="body box">
          <div className="header">
            <h3>ParkIt Locations</h3>
            <p>Let's make parking great together</p>
          </div>
          {this.state.locations.length !== 0 &&
            <div className="map">
              <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyApjld64g85YeINEMm2JPBLz_OKkONqcJs&libraries=places,geometry,drawing&v=3"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                currentLocation={this.state.currentLocation}
                locations={this.state.locations}
                userLocation={this.state.userLocation}
                state={this.state}
              />
            </div>
          }

          <div className="search">
            <div>
              <p>Find us here:</p>
            </div>
            <form className="search-body">
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="bangsar">Bangsar</option>
                <option value="bangsar_south">Bangsar South</option>
              </select>
              <button>Search</button>
              <input type="text" id="autocomplete"></input>
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
    defaultZoom={12}
    center={props.state[props.currentLocation].center}
    // center={props.state[props.currentLocation].center}
  >
    {props.locations.map((place, index) => (
      <Marker
        key={index}
        position={{lat: Number(place[0].db_latitude), lng: Number(place[0].db_longitude)}}
      />
    ))}

    <Marker
      position={props.userLocation}
      icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
      >

    </Marker>

  </GoogleMap>
))

export default FindParking
