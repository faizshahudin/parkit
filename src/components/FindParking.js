/*global google*/

import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {BrowserRouter as Router, Route} from "react-router-dom"
import { NavLink } from 'react-router-dom'
import * as Api from "./Api"
import one from "../images/1.png"
import Modal from 'react-modal';
import { withRouter } from "react-router-dom";
import {connect} from "react-redux"
import {handleGetParkings} from "../actions/Parkings"


class FindParking extends Component {
  render() {
    const {dispatch} = this.props
    return(
      <div className="find-parking-container main-container">
        <Route path={`/parkers/search`} render={(props) => <Search {...props} dispatch={dispatch}/>} />
        <Route path={`/parkers/search/rent/:id`} component={RentParking}/>
        <Route exact path={`/parkers/no-parking`} component={NoParking}/>
      </div>
    )
  }
}

class Search extends Component {
  state = {
    initialize: false,
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
    modalIsOpen: false,
  }

  handleChange = (e) => {
   let value = e.target.value
   this.setState((state) => ({
     currentLocation: value
   }))
   // this.handleInitialData(value)
 }

 openModal = (e) => {
  const {history} = this.props
  console.log(e.target.name)
  history.push(`/parkers/search/rent/${e.target.name}`)
  this.setState({
    modalIsOpen: true
  });
  console.log(this.location)
 }

 afterOpenModal = () => {
   this.setState({modalIsOpen: true});
 }

 closeModal = () => {
   this.setState({modalIsOpen: false});
 }

 handleInitialData = (area) => {
   const {dispatch} = this.props
   dispatch(handleGetParkings(area))
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
       self.setState({
         userLocation: {
           lat: place.geometry.location.lat(),
           lng: place.geometry.location.lng(),
         }
       })
     });
     this.setState({
       initialize: true
     })
   }

 componentDidMount = () => {
   this.handleInitialData(this.state.currentLocation)
   this.initialize()
 }

  render() {
    let {currentLocation} = this.state
    return (
      <div>

        <div className="body">
            <div className="grey-background">
              <div className="listing container">
                <h3>ParkIt Locations</h3>
                <form className="search-body">
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option value="bangsar">Bangsar</option>
                    <option value="bangsar_south">Bangsar South</option>
                  </select>
                  <i class="fas fa-ellipsis-v"></i>
                  <input placeholder="Distance from your location" type="text" id="autocomplete"></input>
                </form>
                {/* <div className="listings">
                  {this.state.locations.length > 0 &&
                    <ul>
                      {this.state.locations.map(location =>
                        <li key={location[0].id}>
                          <div className="individual-listing">
                            <img></img>
                            <div className="details">
                              <h3>{location[0].db_property}</h3>
                              <h5>Level 2</h5>
                              <p>RM{location[0].db_price}</p>
                              <button className="btn" name={location[0].id} onClick={this.openModal}>Park Here</button>
                              <p>AHB2786</p>
                              <p>Posted: 28/7/18</p>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  }

                </div> */}
              </div>
            </div>
            <div>
              Map
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
            </div>


          {/* <div className="search">
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
          </div> */}
          {/* <div>
            <NavLink to="/parkers/no-parking">
              <p>Can't find the location? Let us know.</p>
            </NavLink>
          </div> */}
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

class RentParking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IsAuthenticated: null,
      modalIsOpen: false,
    }
  }
  handleChange = (e) => {
    this.setState({
      occupied_by: this.props.match.params.id,
      user: "3"
    })
    let value = e.target.value
    let name = e.target.name
    this.setState((state) => ({
      [name]: value
    }))
    console.log(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({submit: true})
    Api.bookParking(this.state, localStorage.auth)
      .then(res => console.log(res))
      .catch("There was an error processing your request.")
    console.log(this.state)
  }

  render() {
    console.log(this.props.match.params.id)
    return(
      <Modal
        // overlayClassName="ReactModal__Overlay"
        isOpen={true}
        tabindex="1"
        className="Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          },
        }}
      >
      <div className="rent-parking container">
        <div className="white-background container">
          <div className="parking-information">
            <div className="header">
              <h3>Want to park here?</h3>
            </div>
            <div className="listing">
              <div>
                <img></img>
              </div>
              <div className="details">
                <div>
                  <h3>Suasana Loft</h3>
                  <h5>Level 2</h5>
                  <p>Starting from RM500</p>
                </div>
                <div>
                  <p>AHB2786</p>
                  <p>Posted: 28/7/18</p>
                </div>
              </div>
            </div>
          </div>
          <div className="tenure-information">
            <div>
              <h3>Tenure Information</h3>
            </div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>Start date</label>
                  <input type="text"></input>
                </div>
                <div>
                  <label>Vehicle Registered</label>
                  <div className="vehicle-registered">
                    <input type="text" onChange={this.handleChange} name="car_model"></input>
                    <input type="text" onChange={this.handleChange} name="car_registery"></input>
                  </div>
                </div>
                <a>+ Add Vehicle</a>
                <button className="btn" >Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    )
  }

}

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat: 4.1278584, lng: 105.1083212}}
    center={props.state[props.currentLocation].center}
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

function mapStateToProps({parkings}) {
  return parkings
}

export default connect(mapStateToProps)(FindParking)
