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
  state = {
    currentPage: 1,
    submit: false,
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
    Api.addParking(this.state, localStorage.auth).then(res => console.log(res))
    console.log(this.state)
  }

  isDisabled = () => {
    const {currentPage, propertyName, address, bayNumber, carparkType, carparkOwnership,
          dedicated, leasePeriod, rentalValue
          } = this.state

    if (currentPage === 1) {
      return !propertyName
        || !address
    }

    if (currentPage === 2) {
      return !bayNumber
        || !carparkType
        || !carparkOwnership
        || !dedicated
    }

    if (currentPage === 3) {
      return !leasePeriod
        || !rentalValue
    }
  }
  render() {
    const { match } = this.props

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
                    <input name="condo" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Property Name"></input>
                  </div>
                  <div className="add-listing-form-input">
                    <select name="area" value={this.state.value} onChange={this.handleChange}>
                      <option value="damansara">Damansara</option>
                      <option value="KL_Sental">KL Sentral</option>
                    </select>

                  </div>
                </div>
              }
              {/* Page 2 */}
              {this.state.currentPage == 2 &&
                <div className="add-listing-form-input-container">
                  <div className="add-listing-form-input">
                    <input type="text" name="bay" value={this.state.value} onChange={this.handleChange} placeholder="Bay No."></input>
                    <select name="type_select" value={this.state.value} onChange={this.handleChange} style={this.state.carparkType ? {color: "black"} : {color: "#8a8888"}}>
                      <option value="">Type of carpark</option>
                      <option value="Landed">Landed</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                    <select name="carparkOwnership" value={this.state.value} onChange={this.handleChange} style={this.state.carparkOwnership ? {color: "black"} : {color: "#8a8888"}}>
                      <option>Ownership of carpark</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                  <div className="add-listing-form-input">
                    <div className="label-container">
                      <label>Is the carpark a dedicated space at all times?</label>
                    </div>
                    <div className="checkbox-container">
                      <div className="checkbox">
                        <input name="dedicated" onChange={this.handleChange} type="checkbox" value="yes" />Yes, this is an extra carpark.
                      </div>
                      <div className="checkbox">
                        <input name="dedicated" onChange={this.handleChange} type="checkbox" value="no" />No, I park here after working hours.
                      </div>
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
                      <div className="checkbox">
                        <input name="time" onChange={this.handleChange} type="checkbox" value="12" />12 months
                      </div>
                      <div className="checkbox">
                        <input name="time" onChange={this.handleChange} type="checkbox" value="6" />6 months
                      </div>
                      <div className="checkbox">
                        <input name="time" onChange={this.handleChange} type="checkbox" value="3" />3 months
                      </div>
                      <div className="checkbox">
                        <input type="checkbox" />Any
                        <input type="text" name="time" onChange={this.handleChange} value={this.state.value} placeholder="Specify here"></input>
                      </div>
                    </div>
                  </div>
                  <div className="add-listing-form-input">
                    <div className="label-container">
                      <label>Minimum rental</label>
                    </div>
                    <div className="checkbox-container step3">
                      <div className="checkbox">
                        <input name="price" onChange={this.handleChange} type="checkbox" value="300" />RM300
                      </div>
                      <div className="checkbox">
                        <input name="price" onChange={this.handleChange} type="checkbox" value="250" />RM250
                      </div>
                      <div className="checkbox">
                        <input name="price" onChange={this.handleChange} type="checkbox" value="150" />RM150
                      </div>
                      <div className="checkbox">
                        <input type="checkbox" value="" />Any
                        <input name="price" onChange={this.handleChange} value={this.state.value} type="text" placeholder="Specify here"></input>
                      </div>
                    </div>
                  </div>
                </div>
              }
                <div>
                  {this.state.currentPage > 1 &&
                  <button onClick={this.handlePrevious} className="btn add-listing-form-button previous">Previous</button>
                  }
                  {this.state.currentPage < 3
                    ? <button onClick={this.handleNext} className="btn add-listing-form-button next">Next</button>
                    : <button onClick={this.handleSubmit} className="btn add-listing-form-button">Submit</button>
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
