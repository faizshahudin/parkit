import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class AddListing extends Component {
  state = {
    currentPage: 1,
    submit: false,
  }

  handleChange = (event) => {
   let value = event.target.value
   let name = event.target.name
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
    if (this.state.submit === true) {
     return <Redirect to='/add-listing/thank-you' />
   }

    let {currentPage} = this.state
    return (
      <div className="add-listing-container container">
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
                    <input name="propertyName" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Property Name"></input>
                  </div>
                  <div className="add-listing-form-input">
                    <input type="text" name="address" value={this.state.value} onChange={this.handleChange} placeholder="Location/Address"></input>
                    <input type="text" placeholder="Address Line 2"></input>
                  </div>
                </div>
              }
              {/* Page 2 */}
              {this.state.currentPage == 2 &&
                <div className="add-listing-form-input-container">
                  <div className="add-listing-form-input">
                    <input type="text" name="bayNumber" value={this.state.value} onChange={this.handleChange} placeholder="Bay No."></input>
                    <select name="carparkType" value={this.state.value} onChange={this.handleChange} style={this.state.carparkType ? {color: "black"} : {color: "#8a8888"}}>
                      <option value="">Type of carpark</option>
                      <option value="landed">Landed</option>
                      <option value="apartment">Apartment</option>
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
                        <input name="leasePeriod" onChange={this.handleChange} type="checkbox" value="12 months" />12 months
                      </div>
                      <div className="checkbox">
                        <input name="leasePeriod" onChange={this.handleChange} type="checkbox" value="6 months" />6 months
                      </div>
                      <div className="checkbox">
                        <input name="leasePeriod" onChange={this.handleChange} type="checkbox" value="3 months" />3 months
                      </div>
                      <div className="checkbox">
                        <input type="checkbox" />Any
                        <input type="text" name="leasePeriod" onChange={this.handleChange} value={this.state.value} placeholder="Specify here"></input>
                      </div>
                    </div>
                  </div>
                  <div className="add-listing-form-input">
                    <div className="label-container">
                      <label>Minimum rental</label>
                    </div>
                    <div className="checkbox-container step3">
                      <div className="checkbox">
                        <input name="rentalValue" onChange={this.handleChange} type="checkbox" value="RM300" />RM300
                      </div>
                      <div className="checkbox">
                        <input name="rentalValue" onChange={this.handleChange} type="checkbox" value="RM250" />RM250
                      </div>
                      <div className="checkbox">
                        <input name="rentalValue" onChange={this.handleChange} type="checkbox" value="RM150" />RM150
                      </div>
                      <div className="checkbox">
                        <input type="checkbox" value="" />Any
                        <input name="rentalValue" onChange={this.handleChange} value={this.state.value} type="text" placeholder="Specify here"></input>
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


export default AddListing
