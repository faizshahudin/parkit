import React, { Component } from 'react';

class AddListing extends Component {
  state = {
    currentPage: 2
  }
  render() {
    return(
      <div className="add-listing-container container">
        <div className="add-listing-form-container">
          <div className="add-listing-form-content">
            <div>
              <h1>
                Hi, Jao Ern!
              </h1>
              <p>
                Let's get you started with listing your car park
              </p>
            </div>
            <hr />
            <form className="add-listing-form-fields">
              <div className="add-listing-form-fields-header">
                <h3>Step 1</h3>
              </div>
              {/* Page 1 */}
              {this.state.currentPage === 1 &&
                <div className="add-listing-form-input-container">
                  <div className="add-listing-form-input">
                    <div className="label-container">
                      <label>Location of parking space?</label>
                    </div>
                    <input type="text" placeholder="Property Name"></input>
                  </div>
                  <div className="add-listing-form-input">
                    <input type="text" placeholder="Location/Address"></input>
                    <input type="text" placeholder="Address Line 2"></input>
                  </div>
                </div>
              }

              {/* Page 2 */}
              {this.state.currentPage === 2 &&
                <div className="add-listing-form-input-container">
                  <div className="add-listing-form-input">
                    <div className="label-container">
                      <label>Details of carpark</label>
                    </div>
                    <input type="text" placeholder="Bay No."></input>
                    <select>
                      <option>Type of carpark</option>
                    </select>
                    <select>
                      <option>Ownership of carpark</option>
                    </select>
                  </div>
                  <div className="add-listing-form-input">
                    <div className="label-container">
                      <label>Is the carpark a dedicated space at all times?</label>
                    </div>
                    <div className="checkbox-container">
                      <div className="checkbox">
                        <input type="checkbox" value="" />Yes, this is an extra carpark.
                      </div>
                      <div className="checkbox">
                        <input type="checkbox" value="" />No, I park here after working hours.
                      </div>
                    </div>
                  </div>
                </div>
              }
              <button className="btn add-listing-form-button">Next</button>
            </form>
          </div>
        </div>
        <div className="add-listing-message-container">
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
