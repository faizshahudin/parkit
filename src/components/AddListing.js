import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {BrowserRouter as Router, Route} from "react-router-dom"
import * as Api from "./Api"

class AddListing extends Component {
  render() {
    const { match } = this.props
    return (
      <div>
        <Route exact path="/add-listing" component={Add}/>
        <Route path={`${match.path}/thank-you`} component={ThankYou}/>
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
            title: "Damansara",
            value: "damansara",
          },
          {
            title: "KL Sentral",
            value: "kl_sentral",
          },
          {
            title: "Other",
            value: "other"
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
   let value = e.target.value
   let name = e.target.name
   this.setState((state) => ({
     [name]: value
   }))
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
    e.preventDefault()
    this.setState({submit: true})
    Api.addParking(this.state, localStorage.auth)
      .then(res => console.log(res))
      .catch("There was an error processing your request.")
  }

  isDisabled = () => {
    const {currentPage, db_property, sel_area, db_area, db_type, db_reserved, db_period,
          db_price
          } = this.state

    if (currentPage === 1) {
      return !db_property
        || !db_area
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

  render() {
    const { match } = this.props
    const {property, area, carparkType, dedicated, leasePeriod, rental} = this.fields

    if (this.state.submit === true) {
     return <Redirect to={`${match.url}/thank-you`} />
   }

    let {currentPage} = this.state
    return (
      <div className="add-listing-container container image-background">
        <div className="add-listing-form-container">
          <div className="add-listing-form-content">
            <div className="add-listing-form-header">
              <h1>
                {currentPage === 1 ? "Hi, Jao Ern!"
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
                  <div className="add-listing-form-input">
                    <input name={property.name} value={this.state[property.name]} onChange={this.handleChange} type="text" placeholder="Property name i.e. KL Avenue"></input>
                  </div>
                  <div className="add-listing-form-input">
                    <select name={area.name} value={this.state[area.name]} onChange={this.handleChange} style={this.state[area.name] ? {color: "black"} : {color: "#8a8888"}}>
                      <option>Select an area</option>
                      {area.options.map(a =>
                        <option value={a.value}>{a.title}</option>
                      )}
                    </select>
                    {(this.state.db_area && this.state.db_area !== "kl_sentral" && this.state.db_area !== "damansara" &&
                    <input name={area.name} value={this.state[area.name]} onChange={this.handleChange} type="text" placeholder="Let us know the name of the area."></input>
                    )}
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
                        <option value={c.value}>{c.title}</option>
                      )}
                    </select>
                  </div>
                  <div className="add-listing-form-input">
                    <div className="label-container">
                      <label>Is the carpark a dedicated space at all times?</label>
                    </div>
                    <div className="checkbox-container">
                      {dedicated.options.map(d =>
                        <div className="checkbox">
                          <input name={dedicated.name} onChange={this.handleChange} type="checkbox" value={d.value} />{d.title}
                        </div>
                      )}
                    </div>
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
                          <input name={leasePeriod.name} onChange={this.handleChange} type="checkbox" value={l.value} />{l.title}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="add-listing-form-input">
                    <div className="label-container">
                      <label>Minimum rental</label>
                    </div>
                    <div className="checkbox-container step3">
                      {rental.options.map(r =>
                        <div className="checkbox">
                          <input name={rental.name} onChange={this.handleChange} type="checkbox" value={r.value} />{r.title}
                        </div>
                      )}
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
    )
  }
}

const ThankYou = () => (
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
            <h4>Thank you Jao Ern for leasing out your carpark with ParkIt.</h4>
          </div>
        </div>
        <div className="add-listing-form-body thank-you">
          <div>
            <p>A confirmation email has been sent to to parkitmsia@gmail.com</p>
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


export default AddListing
