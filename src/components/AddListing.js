/*global google*/

import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import {BrowserRouter as Router, Route} from "react-router-dom"
import * as Api from "./Api"
import { connect } from 'react-redux'
import { handleListParking, listParking, listParkingComplete } from "../actions/parkings"
import jwt from "jsonwebtoken"
import {fields} from "../utils/data"
import {handleShowModal} from "../actions/modal"


class AddListing extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { match, AuthedUser, dispatch } = this.props
    return (
      <div>
        <Route exact path="/add-listing" render={(props) => <Add {...props} AuthedUser={AuthedUser} dispatch={dispatch} loading={this.props.loading}/>}/>
        { this.props.loading === true
          ? null
          : <Route path={`${match.path}/thank-you`} render={(props) => <ThankYou {...props} dispatch={dispatch} AuthedUser={AuthedUser}/>}/>
        }
      </div>
    )
  }
}

class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      submit: false,
    }
    this.fields = {
      property: {
        name: "db_property",
      },
      area: {
        name: "db_area",
        options: [
          {
            title: "Bangsar",
            value: "bangsar",
          },
          {
            title: "Bangsar South",
            value: "bangsar_south",
          },
          {
            title: "Bukit Jalil",
            value: "bukit_jalil",
          },
          {
            title: "Damansara",
            value: "damansara",
          },
          {
            title: "Damansara Heights",
            value: "damansara_heights",
          },
          {
            title: "Hampshire Park",
            value: "hampshire_park",
          },
          {
            title: "Jalan Tun Razak",
            value: "jalan_tun_razak",
          },
          {
            title: "KL Sentral",
            value: "kl_sentral",
          },
          {
            title: "KLCC",
            value: "klcc",
          },
          {
            title: "Laman Scenaria Kiara",
            value: "laman_scenaria_kiara",
          },
          {
            title: "Mid Valley",
            value: "midvalley",
          },
          {
            title: "Mont Kiara",
            value: "mont_kiara",
          },
          {
            title: "Mutiara Damansara",
            value: "mutiara_damansara",
          },
          {
            title: "Publika",
            value: "publika",
          },
          {
            title: "Pusat Bandar Damansara",
            value: "pusat_bandar_damansara",
          },
          {
            title: "TREC",
            value: "trec",
          },
          {
            title: "Sentul",
            value: "sentul",
          },
          {
            title: "Setapak",
            value: "setapak",
          },
          {
            title: "Shah Alam",
            value: "shah_alam",
          },
          {
            title: "TTDI",
            value: "ttdi",
          },
        ]
      },
      carparkType: {
        name: "db_type",
        options: [
          {
            title: "Landed",
            value: "landed",
          },
          {
            title: "Apartment",
            value: "apartment",
          },
        ]
      },
      dedicated: {
        name: "db_reserved",
        options: [
          {
            title: "Yes, this is an extra carpark.",
            value: "yes",
          },
          {
            title: "No, I park here after working hours.",
            value: "no",
          }
        ]
      },
      leasePeriod: {
        name: "db_period",
        options: [
          {
            title: "12 months",
            value: "12"
          },
          {
            title: "6 months",
            value: "6"
          },
          {
            title: "3 months",
            value: "3"
          },
          {
            title: "Any",
            value: "any"
          }
        ]
      },
      rental: {
        name: "db_price",
        options: [
          {
            title: "RM300",
            value: "300"
          },
          {
            title: "RM250",
            value: "250"
          },
          {
            title: "RM150",
            value: "150"
          },
          {
            title: "Any",
            value: "any"
          }
        ]
      }
    }
  }

  handleChange = (e) => {
   const {AuthedUser} = this.props
   let value = e.target.value
   let name = e.target.name

   if (name === "image") {
     let file = e.target.files[0]
     this.setState({image: file})
   } else {
     this.setState(state => ({
       [name]: value
     }))
   }
   this.setState((state) => ({
     user: AuthedUser.pk
   }))

   if (e.target.value === "") {
     this.setState({
       ["o" + name]: value,
     })
   }
 }

  handleNext = (e) => {
    e.preventDefault()
    this.setState({currentPage: this.state.currentPage + 1})
  }

  handlePrevious = (e) => {
    e.preventDefault()
    this.setState({currentPage: this.state.currentPage - 1})
  }

  handleSubmit = (e) => {
    const {dispatch} = this.props
    e.preventDefault()
    let formData = new FormData()
    for (const key of Object.keys(this.state)) {
      formData.append(key, this.state[key])
    }

    this.setState({
      submit: true,
    })
    dispatch(handleListParking(formData))
  }

  isDisabled = () => {
    const {currentPage, sel_area, db_area, db_type, db_reserved, db_period,
          db_price
          } = this.state

    if (currentPage === 1) {
      return  !db_area
    }

    if (currentPage === 2) {
      return !db_type
        || !db_reserved
    }

    if (currentPage === 3) {
      return !db_period
        || !db_price
    }
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
      { types: ['geocode', 'establishment'], bounds: defaultBounds, componentRestrictions: {country: 'my'}});


      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace()
        self.setState({
          db_latitude: `${place.geometry.location.lat()}`,
          db_longitude: `${place.geometry.location.lng()}`,
          db_property: place.name,
          db_address: place.formatted_address
        })
  });
}

  componentDidMount() {
    const { AuthedUser, dispatch } = this.props
    this.initialize()
    if (!AuthedUser) {
      dispatch(handleShowModal("Login"))
    }
  }

  componentDidUpdate() {
    this.initialize()
  }

  render() {
    const { match, AuthedUser, dispatch } = this.props
    const {property, area, carparkType, dedicated, leasePeriod, rental} = fields

    if (this.props.loading === false) {
     return <Redirect to={`${match.url}/thank-you`} />
   }


    let {currentPage} = this.state
    return (
      <Fragment>
        {AuthedUser && 
          <div className="add-listing-container container image-background">
            <div className="add-listing-form-container">
              <div className="add-listing-form-content">
                <div className="add-listing-form-header">
                  <h1>
                    {currentPage === 1 ? `Hi ${AuthedUser.first_name}!`
                      : currentPage === 2 ? "Now let's see."
                      : "Imagine this."
                    }
                  </h1>
                  <p>
                    {currentPage === 1 ? "Let's get you started with listing your car park"
                      : currentPage === 2 ? "What kind of car park are you listing?"
                      : "How much rent are you looking to gain, and for how long?"
                  }
                  </p>
                </div>
                <hr />
                <form className="add-listing-form-fields form">
                  <div className="add-listing-form-fields-header">
                    <h3>Step {currentPage}</h3>
                    <p>
                      {currentPage === 1 ? "Location of parking space"
                        : currentPage === 2 ? "Details of car park"
                        : "Payment details and lease period"
                      }

                    </p>
                  </div>
                  {/* Page 1 */}
                  {this.state.currentPage === 1 &&
                    <div className="add-listing-form-input-container">
                      <div>
                        {/* <input name={property.name} value={this.state[property.name]} onChange={this.handleChange} type="text" placeholder="Property name i.e. KL Avenue"></input> */}
                        <input type="text" id="autocomplete" defaultValue={this.state.db_address}></input>
                      </div>
                      <div className="add-listing-form-input">
                        <select name={area.name} value={this.state[area.name]} onChange={this.handleChange} style={this.state[area.name] ? {color: "black"} : {color: "#8a8888"}}>
                          <option>Select an area</option>
                          {area.options.map(a =>
                            <option key={a.value} value={a.value}>{a.title}</option>
                          )}
                          <option value="">Other</option>
                        </select>
                        {this.state["o" + area.name] === "" &&
                         <input name={area.name} onChange={this.handleChange} type="text" placeholder="Let us know the name of the area." value={this.state[area.name]}></input>
                        }
                      </div>
                    </div>
                  }
                  {/* Page 2 */}
                  {this.state.currentPage == 2 &&
                    <div className="add-listing-form-input-container">
                      <div className="add-listing-form-input">
                        {/* <input type="text" name="bay" value={this.state.value} onChange={this.handleChange} placeholder="Bay No."></input> */}
                        <select name={carparkType.name} value={this.state[carparkType.name]} onChange={this.handleChange} style={this.state[carparkType.name] ? {color: "black"} : {color: "#8a8888"}}>
                          <option value="">Type of carpark</option>
                          {carparkType.options.map(c =>
                            <option key={c.value} value={c.value}>{c.title}</option>
                          )}
                        </select>
                      </div>
                      <div className="add-listing-form-input">
                        <div className="label-container">
                          <label>Is the carpark a dedicated space at all times?</label>
                        </div>
                        <div className="checkbox-container">
                          {dedicated.options.map((d, index) =>
                            <div className="checkbox">
                              <input key={index} name={dedicated.name} onChange={this.handleChange} type="checkbox" value={d.value} checked={this.state.db_reserved === d.value ? true : false}/><span>{d.title}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="add-listing-form-input">
                        <div className="label-container">
                          <label>Upload a photo of the carpark (optional).</label>
                        </div>
                        <input type="file" id="profile_pic" name="image"
                              onChange={this.handleChange} accept=".jpg, .jpeg, .png"/>
                      </div>
                    </div>
                  }
                  {/* Page 3 */}
                  {this.state.currentPage == 3 &&
                    <div className="add-listing-form-input-container">
                      <div className="add-listing-form-input">
                        <div className="label-container">
                          <label>Lease Period</label>
                        </div>
                        <div className="checkbox-container step3">
                          {leasePeriod.options.map(l =>
                            <div className="checkbox">
                              <input key={leasePeriod.name} name={leasePeriod.name} onChange={this.handleChange} type="checkbox" value={l.value} checked={this.state.db_period === l.value ? true : false} /><span>{l.title}</span>
                            </div>
                          )}
                          {this.state.db_period && this.state.db_period !== "12" && this.state.db_period !== "6" && this.state.db_period !== "3" &&
                            <input type="text" name={leasePeriod.name} onChange={this.handleChange} value={this.state.value} placeholder="Specify here"></input>
                          }
                        </div>
                      </div>
                      <div className="add-listing-form-input">
                        <div className="label-container">
                          <label>Minimum rental</label>
                        </div>
                        <div className="checkbox-container step3">
                          {rental.options.map(r =>
                            <div className="checkbox">
                              <input key={rental.name} name={rental.name} onChange={this.handleChange} type="checkbox" value={r.value} checked={this.state.db_price === r.value ? true : false}/><span>{r.title}</span>
                            </div>
                          )}
                          {this.state.db_price && this.state.db_price !== "300" && this.state.db_price !== "250" && this.state.db_price !== "150" &&
                            <input type="text" name={rental.name} onChange={this.handleChange} value={this.state.value} placeholder="Specify here"></input>
                          }
                        </div>
                      </div>
                    </div>
                  }
                    <div>
                      {this.state.currentPage > 1 &&
                      <button onClick={this.handlePrevious} className="btn add-listing-form-button previous">Previous</button>
                      }
                      {this.state.currentPage < 3
                        ? <button onClick={this.handleNext} className="btn add-listing-form-button next" disabled={this.isDisabled()}>Next</button>
                        : <button onClick={this.handleSubmit} className="btn add-listing-form-button" disabled={this.isDisabled()}>Submit</button>
                      }
                    </div>
                </form>
              </div>
            </div>
            <div className="add-listing-message-container">
              <div className="empty-div"></div>
              <div className="add-listing-message-content">
                <h1>Do you know how many parking spaces go to waste in Malaysia?</h1>
                <p>
                  ParkIt offers the best service to find empty parking spaces a new owner,
                  one parker at a time.
                </p>
              </div>
            </div>
          </div>
        }
      </Fragment>

    )
  }
}

class ThankYou extends Component {
  componentWillUnmount() {
    this.props.dispatch(listParkingComplete())
  }
  render() {
    const {AuthedUser} = this.props
    return (
      <div className="add-listing-container thank-you container image-background">
        <div className="add-listing-form-container thank-you">
          <div className="add-listing-form-content thank-you">
            <div className="add-listing-form-header thank-you">
              <h1>
                Much Appreciated!
              </h1>
            </div>
            <div className="add-listing-form-body thank-you">
              <div>
                <h4>Thank you {AuthedUser.first_name} for leasing out your carpark with ParkIt.</h4>
              </div>
            </div>
            <div className="add-listing-form-body thank-you">
              <div>
                <p>A confirmation email has been sent to to {AuthedUser.email}</p>
                <p>Our team will be in touch.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="add-listing-message-container">
          <div className="empty-div"></div>
          <div className="add-listing-message-content">
            <h1>You have just helped one driver find a parking.</h1>
            <p>
              Congratulations. Join the ParkIt community to make parking great together!
            </p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({AuthedUser, parkings}) {

  return {
    loading: parkings.listParking,
    AuthedUser,
  }
}


export default connect(mapStateToProps)(AddListing)
