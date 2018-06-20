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
import {fields} from "../utils/data"
import AriaModal from "react-aria-modal"



class FindParking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submit: false,
      login: true,
      modalIsOpen: props.isOpen,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const {dispatch, parkings, modal, AuthedUser, match, loading} = this.props
    return (
      <div className="find-parking-container main-container">
        <Route path={`${match.path}/search`} render={(props) => <Search {...props} parkings={parkings} dispatch={dispatch} modal={modal} AuthedUser={AuthedUser} loading={loading}/>} />
        <Route path={`${match.path}/search/:id`} render={(props) => <RentParking {...props} parkings={parkings} dispatch={dispatch} AuthedUser={AuthedUser} modal={modal} loading={loading}/>}/>
        {/* <Route exact path={`${match.path}/no-parking`} render={(props) => <NoParking {...props} parkings={parkings} dispatch={dispatch} AuthedUser={AuthedUser} modal={modal} loading={loading}/>}/> */}
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
    modalIsOpen: false,
    locations: [],
    currentPage: 1,
    infowindowOpen: false,
  }

  setCenter = () => {
    const {area} = fields
    area.options.map(a => {
      this.setState({
        [a.value]: {
          center: a.center
        }
      })
    })
  }

  handleChange = (e) => {
   const {AuthedUser} = this.props
   let value = e.target.value

   this.setState({
     currentLocation: value,
     currentPage: 1,
   })
   this.filterParking(value)
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
  window.scrollTo(0, 0)
 }

 afterOpenModal = () => {
   this.setState({modalIsOpen: true});
 }

 closeModal = () => {
   this.setState({modalIsOpen: false});
 }

 filterParking = (currentLocation) => {
   const {parkings, AuthedUser} = this.props
   let filteredParkings = Object.values(parkings)
    .filter((parking) => parking.db_area === currentLocation).sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    filteredParkings.map(parking => {
      parking.highlight = false
      let date = new Date(parking.timestamp)
      parking.date = (`${date.getDay()}/${date.getDate()}/${date.getFullYear()}`)
    })
   this.setState({
     filteredParkings: filteredParkings,
     markersToShow: this.displayMarkers(filteredParkings),
   })
   this.initialize()
 }

 // Filters markers to 5 per page, and determines which markers to display on what page. Returns an array of markersToShow
   displayMarkers = (filteredParkings) => {
     let markers = filteredParkings
     let resultsPerPage = 20
     let markersToShow = []
     // sets an index for each marker starting from 0 and ending with 20
     for (let i = 0; i < markers.length; i++) {
       markers[i].i = i
     }
     // loops through each marker, and determines which page to display the marker, based on the marker's index
     markers.map(marker => {
       if (marker.i >= resultsPerPage * this.state.currentPage - 20 && marker.i < resultsPerPage * this.state.currentPage) {
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

   clickEvent = (e, location, marker) => {
     // const lat = `${e.latLng.lat()}`
     // const lng = e.latLng.lng()
     const lat = location.db_latitude
     const lng = location.db_longitude
     // console.log(this.state.filteredParkings)
     const highlight = this.state.filteredParkings.map(parking => {
       parking.highlight = false
       if (parking.db_latitude == lat) {
         parking.highlight = true
       }
     }

     )
      this.setState(this.state)
      if (marker) {
        let test = document.getElementsByClassName("focus")[0]
        // const tesNode = ReactDOM.findDOMNode(this.refs.focus)
        var topPos = test.offsetTop
        document.getElementsByClassName('listing-container')[0].scrollTop = topPos - 200
      }
   }

   secondClickEvent = (e, location) => {
     console.log(location)
   }

 componentDidMount = () => {
   this.setCenter()
   this.initialize()
 }

  render() {
    const {area} = fields
    let {currentLocation} = this.state
    const {parkings} = this.props
    console.log(this.state.markersToShow)
    return (
      <div>
        <div className="body">
            <div className="listing-container grey-background">
              <div className="listing container">
                <h3>Our Parking Spaces</h3>
                <form className="search-body">
                  <select onChange={this.handleChange}>
                    <option value="none">Select an area</option>
                    {area.options.map(a =>
                      <option key={a.value} value={a.value}>{a.title}</option>
                    )}
                  </select>
                  <i className="fas fa-ellipsis-v" style={this.state.filteredParkings ? null : {display: "none"}}></i>
                  <input placeholder="Distance from your location" type="text" id="autocomplete" style={this.state.filteredParkings ? null : {display: "none"}}></input>
                </form>
                {currentLocation !== "none" &&
                  <div className="listings">
                    {this.state.markersToShow.length !== 0
                      ?
                      <ul>
                        {this.state.markersToShow.map(location =>
                          <li onClick={(e) => this.clickEvent(e, location, false)} value={location}>
                            <div className={"individual-listing " + (location.highlight ? "highlight focus" : null)}>
                              <img src={location.image}></img>
                              <div className="details">
                                <h3>{location.db_property}</h3>
                                <h5>Level 2</h5>
                                <p>RM{location.db_price}</p>
                                <button className="btn" name={location.id} onClick={this.openModal}>Park Here</button>
                                <p>Posted: {location.date}</p>
                              </div>
                            </div>
                          </li>
                        )}
                      </ul>
                      : <div>No locations found.</div>
                    }
                  </div>
                }

                {this.state.filteredParkings &&
                  <div className="pagination">
                    {this.state.currentPage > 1 && (
                      <button className="btn" onClick={this.prevPage}>Previous</button>
                    )}
                    {this.state.currentPage < this.state.filteredParkings.length/20 && (
                      <button className="btn" onClick={this.nextPage}>Next</button>
                    )
                    }
                  </div>
                }

              </div>
            </div>
            <div>
              {this.state.initialize &&
                <div className="map">
                    <Map
                      googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyApjld64g85YeINEMm2JPBLz_OKkONqcJs&libraries=places,geometry,drawing&v=3"
                      loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
                      containerElement={<div style={{ height: "80vh"}} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      currentLocation={this.state.currentLocation}
                      locations={this.state.markersToShow}
                      userLocation={this.state.userLocation}
                      state={this.state}
                      clickEvent={this.clickEvent}
                      infowindowOpen={this.state.infowindowOpen}
                      area={area}
                    />
                </div>
              }
            </div>
          <div>
            <NavLink to="/find-parking/search/no-parking">
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

   initialize = () => {
     console.log("yes")
     let self = this
     var defaultBounds = new google.maps.LatLngBounds(
       new google.maps.LatLng(3.1385035, 101.6167771),
       new google.maps.LatLng(3.2020728, 100.7790663)
     );
     var options = {
       bounds: defaultBounds,
     };
     let autocomplete = new google.maps.places.Autocomplete(
       (document.getElementById('carparkLocation')),
       { types: ['geocode'], bounds: defaultBounds, componentRestrictions: {country: 'my'}});

       google.maps.event.addListener(autocomplete, 'place_changed', function() {
         var place = autocomplete.getPlace()
         self.setState({
           db_latitude: place.geometry.location.lat(),
           db_longitude: place.geometry.location.lng(),
         })
       })
     }

  componentDidMount = () => {
    this.initialize()
  }

  render() {
    let {submit} = this.state

    return (
        <div className="rent-parking container no-parking">
          {!submit &&
            <div className="white-background container">
              <div className="close-modal">
                <div></div>
                <div></div>
                <div className="close-button" onClick={this.props.closeModal}>X</div>
              </div>
              <div className="header">
                <h3>Can't find what you're looking for? Let us know and we'll search for it!</h3>
              </div>
              <form className="form">
                <div>
                  <label>Where do you need parking space?</label>
                  <div className="input">
                    <input id="carparkLocation" name="carparkLocation" type="text" placeholder="Area/Location"></input>
                  </div>
                </div>
                <div>
                  <label>When do you intend to start parking</label>
                  <div className="input">
                    <input name="startDate" value={this.state.value} onChange={this.handleChange} type="date" style={this.state.startDate ? {color: "black"} : {color: "#8a8888"}}></input>
                  </div>
                </div>
                <div>
                  <label>What is your estimated budget?</label>
                  <select name="budget" value={this.state.value} onChange={this.handleChange} style={this.state.budget ? {color: "black"} : {color: "#8a8888"}}>
                    <option value="">Select</option>
                    <option value="RM300">RM300</option>
                    <option value="RM500">RM500</option>
                  </select>
                </div>
                <div className="button-container">
                  <button className="btn" onClick={this.handleSubmit} className="btn" disabled={this.isDisabled()}>Send Enquiry</button>
                </div>
              </form>
            </div>
          }
          {submit &&
            <div className="white-background container">
              <div className="header">
                <h3>Thank you for reaching out to us!</h3>
              </div>
              <div className="message">
                <p>We've received your enquiry!</p>
                <p>A confirmation email has been sent to parkitmsia@gmail.com</p>
                <p>Our friendly parking buddies will get in touch with you soon.</p>
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
          ?
          <AriaModal
            titleText="demo one"
            focusDialog={true}
            getApplicationNode={this.getApplicationNode}
            verticallyCenter={true}
            onExit={this.closeModal}
            >
            {parking &&
              <div className="rent-parking container">
                <div className="white-background container">
                  {loading === true
                    ?   <div>
                          <div className="close-modal">
                            <div></div>
                            <div></div>
                            <div className="close-button" onClick={this.closeModal}>X</div>
                          </div>
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
                          <hr/>
                          <div className="tenure-information">
                            <div>
                              <h3>Tenure Information</h3>
                            </div>
                            <div>
                              <form onSubmit={this.handleSubmit}>
                                <div>
                                  <label>Start date</label>
                                  <input required name="start_date" type="datetime-local"></input>
                                </div>
                                <div>
                                  <label>Vehicle Registered</label>
                                  <div className="vehicle-registered">
                                    <input required type="text" onChange={this.handleChange} name="car_model" placeholder="Model i.e. Honda City"></input>
                                    <input required type="text" onChange={this.handleChange} name="car_registery" placeholder="Number Plate i.e. ABC1234"></input>
                                  </div>
                                </div>
                                <div className="button">
                                  <button className="btn">Park Here</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      : <ThankYou closeModal={this.closeModal}/>
                  }
                </div>
              </div>
            }
            {id === "no-parking" &&
              <NoParking closeModal={this.closeModal}/>
            }
              </AriaModal>
              : null
        }
      </Fragment>
    )
  }
}


const ThankYou = (props) => (
      <div className="thankyou">
        <div className="grid">
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
        <div className="button">
          <button className="btn" onClick={props.closeModal}>Close</button>
        </div>
      </div>

)

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={props.state[props.currentLocation].center}
  >
    {props.locations ?
      props.locations.map((place, index) => (
        <Marker
          key={index}
          animation={place.highlight ? google.maps.Animation.BOUNCE : null}
          position={{lat: Number(place.db_latitude), lng: Number(place.db_longitude)}}
          onClick={(e) => props.clickEvent(e, place, true)}
        >
        </Marker>
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
