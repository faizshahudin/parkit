/*global google*/

import React, { Component, Fragment } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {BrowserRouter as Router, Route} from "react-router-dom"
import { NavLink } from 'react-router-dom'
import * as Api from "./Api"
import one from "../images/1.png"
import Modal from 'react-modal';
import { withRouter } from "react-router-dom";
import {connect} from "react-redux"
import {handleGetParkings, handleBookParking, bookParking} from "../actions/parkings"
import parkingImg from "../images/parking-placeholder.png"
import {handleShowModal, handleHideModal} from "../actions/modal"


class FindParking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submit: false,
      login: true,
      modalIsOpen: props.isOpen,
    }
  }

  render() {
    const {dispatch, parkings, modal, AuthedUser, match, loading} = this.props
    return (
      <div className="find-parking-container main-container">
        <Route path={`${match.path}/search`} render={(props) => <Search {...props} parkings={parkings} dispatch={dispatch} modal={modal} AuthedUser={AuthedUser} loading={loading}/>} />
        <Route path={`${match.path}/search/:id`} render={(props) => <RentParking {...props} parkings={parkings} dispatch={dispatch} AuthedUser={AuthedUser} modal={modal} loading={loading}/>}/>
        <Route exact path={`/find-parking/no-parking`} component={NoParking}/>
      </div>
    )
  }
}

class Search extends Component {
  state = {
    initialize: false,
    currentLocation: "none",
    none: {
      center: {
        lat: 3.0721369,
        lng: 101.6047011,
      }
    },
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
    modalIsOpen: false,
    locations: [],
    currentPage: 1,
  }

  handleChange = (e) => {

   let value = e.target.value
   this.filterParking(value)
   this.setState({
     currentLocation: value,
     currentPage: 1,
   })
 }

 openModal = (e) => {
  const {history, AuthedUser, dispatch, modal, match} = this.props
  if (AuthedUser) {
    history.push(`${match.url}/${e.target.name}`)
    dispatch(bookParking())
  } else {
    history.push(`${match.url}/${e.target.name}`)
    dispatch(handleShowModal("Login"))
  }
  // if (!modal.type) {
  //   dispatch(handleHideModal())
  // }

  console.log(this.location)
 }

 afterOpenModal = () => {
   this.setState({modalIsOpen: true});
 }

 closeModal = () => {
   this.setState({modalIsOpen: false});
 }

 filterParking = (currentLocation) => {
   const {parkings} = this.props
   let filteredParkings = Object.values(parkings)
    .filter((parking) => parking.db_area === currentLocation)
   // this.displayMarkers(filteredParkings)
   this.setState({filteredParkings: filteredParkings})
   // this.forceUpdate()
   console.log(this.state)
   // this.displayMarkers()
   // this.setState({parkings})
 }

 // Filters markers to 5 per page, and determines which markers to display on what page. Returns an array of markersToShow
   displayMarkers = (filteredParkings) => {
     let markers = filteredParkings
     let resultsPerPage = 4
     let markersToShow = []
     // sets an index for each marker starting from 0 and ending with 20
     for (let i = 0; i < markers.length; i++) {
       markers[i].i = i
     }
     // loops through each marker, and determines which page to display the marker, based on the marker's index
     markers.map(marker => {
       if (marker.i >= resultsPerPage * this.state.currentPage - 4 && marker.i < resultsPerPage * this.state.currentPage) {
         markersToShow.push(marker)

       } else {
         null
       }
     })
     return markersToShow
   }

   // handles nextPage toggling
     nextPage = () => {
       this.setState({
         currentPage: this.state.currentPage + 1
       })
     }

   // handles prevPage toggling
     prevPage = () => {
       this.setState({
         currentPage: this.state.currentPage - 1
       })
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

   clickEvent = (e) => {
     const lat = e.latLng.lat()
     const lng = e.latLng.lng()
     console.log(e)
   }

 componentDidMount = () => {
   this.initialize()
 }

  render() {
    let markersToShow
    if (this.state.filteredParkings) {
      markersToShow = this.displayMarkers(this.state.filteredParkings)
    }
    // if (this.state.filteredParkings) {
    //   this.displayMarkers()
    // }
    let {currentLocation} = this.state
    const {parkings} = this.props
    return (
      <div>
        <div className="body">
            <div className="grey-background">
              <div className="listing container">
                <h3>ParkIt Locations</h3>
                <form className="search-body">
                  <select onChange={this.handleChange}>
                    <option value="none">Select an area</option>
                    <option value="bangsar">Bangsar</option>
                    <option value="bangsar_south">Bangsar South</option>
                  </select>
                  <i className="fas fa-ellipsis-v"></i>
                  <input placeholder="Distance from your location" type="text" id="autocomplete"></input>
                </form>
                <div className="listings">
                  {markersToShow &&
                    <ul>
                      {markersToShow.map(location =>
                        <li key={location.id}>
                          <div className="individual-listing">
                            <img src={location.image}></img>
                            <div className="details">
                              <h3>{location.db_property}</h3>
                              <h5>Level 2</h5>
                              <p>RM{location.db_price}</p>
                              <button className="btn" name={location.id} onClick={this.openModal}>Park Here</button>
                              <p>Posted: 28/7/18</p>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  }
                </div>
                <div className="pagination">
                  {this.state.currentPage > 1 && (
                    <button onClick={this.prevPage}>Previous</button>
                  )}
                  {this.state.currentPage < 4 && (
                    <button onClick={this.nextPage}>Next</button>
                  )
                  }
                  <p>{this.state.currentPage}</p>
                </div>
              </div>
            </div>
            <div>
              {this.state.initialize &&
                <div className="map">
                    <Map
                      googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyApjld64g85YeINEMm2JPBLz_OKkONqcJs&libraries=places,geometry,drawing&v=3"
                      loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
                      containerElement={<div style={{ height: "1000px"}} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      currentLocation={this.state.currentLocation}
                      locations={markersToShow}
                      userLocation={this.state.userLocation}
                      state={this.state}
                      clickEvent={this.clickEvent}
                    />
                </div>
              }
            </div>
          <div>
            <NavLink to="/find-parking/no-parking">
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

class RentParking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IsAuthenticated: null,
      modalIsOpen: false,
      thankYou: true,
      submit: false,
    }
  }
  handleChange = (e) => {
    this.setState({
      occupied_by: this.props.match.params.id,
      user: this.props.AuthedUser.pk
    })
    let value = e.target.value
    let name = e.target.name
    this.setState((state) => ({
      [name]: value
    }))
    console.log(this.state)
  }

  handleSubmit = (e) => {
    const {dispatch} = this.props
    e.preventDefault()
    this.setState({submit: true})
    dispatch(handleBookParking(this.state))
  }

  closeModal = () => {
    const {history} = this.props
    history.push(`/find-parking/search`)
  }

  render() {
    const id = this.props.match.params.id
    const {parkings, AuthedUser, dispatch, loading} = this.props
    const parking = parkings[id]


    return (
      <Fragment>
        {AuthedUser
          ?       <Modal
                      // overlayClassName="ReactModal__Overlay"
                      isOpen={true}
                      onRequestClose={this.closeModal}
                      tabIndex="1"
                      className="Modal"
                      style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.4)'
                        },
                      }}
                    >
                      {parking &&
                        <div className="rent-parking container">
                          <div className="white-background container">
                            {loading === true
                              ?   <div>
                                    <div className="parking-information">
                                      <div className="header">
                                        <h3>Want to park here?</h3>
                                      </div>
                                      <div className="listing">
                                        <div>
                                          <img src={parkingImg}></img>
                                        </div>
                                        <div className="details">
                                          <div>
                                            <h3>{parking.db_property}</h3>
                                            <h5>Level 2</h5>
                                            <p>RM{parking.db_price}</p>
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
                                            <input name="start_date" type="datetime-local"></input>
                                          </div>
                                          <div>
                                            <label>Vehicle Registered</label>
                                            <div className="vehicle-registered">
                                              <input type="text" onChange={this.handleChange} name="car_model"></input>
                                              <input type="text" onChange={this.handleChange} name="car_registery"></input>
                                            </div>
                                          </div>
                                          {/* <a>+ Add Vehicle</a> */}
                                          <button className="btn">Submit</button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                : <ThankYou />
                            }
                          </div>
                        </div>
                      }
                  </Modal>
                  : null
        }
      </Fragment>
    )
  }
}


const ThankYou = (props) => (
  <Fragment>
      <div className="thankyou">
        <div className="image">
          <img></img>
        </div>
        <div className="text">
          <h3>Thank you for parking with us!</h3>
          <p>We have sent your request to the Parkit team.</p>
          <p>The team will get in touch shortly.</p>
          <p>In the meantime, if you have any enquiries, do not hesitate to ask Ken.</p>
          <p>He'll get to the bottom of it :)</p>
        </div>
      </div>
  </Fragment>

)

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    center={props.state[props.currentLocation].center}
  >
    {props.locations ?
      props.locations.map((place, index) => (
        <Marker
          key={index}
          position={{lat: Number(place.db_latitude), lng: Number(place.db_longitude)}}
          onClick={props.clickEvent}
        />
      ))
      : null
    }
    <Marker
      position={props.userLocation}
      icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
      >
    </Marker>
  </GoogleMap>
))

function mapStateToProps({AuthedUser, parkings, modal}) {
  return {
    AuthedUser,
    parkings,
    modal,
    loading: parkings.loading,
  }
}

export default connect(mapStateToProps)(FindParking)
