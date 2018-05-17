import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return(
      <div className="dashboard container">
        <div className="user">
          <div className="avatar">
            <img></img>
            <h3>Reevas Parker</h3>
            <p>Serdang, Selangor</p>
          </div>
          <div className="contact">
            <h5>Contact Information</h5>
            <div><img></img><span>+6012 345 6789</span></div>
            <div><img></img><span>email@company.com</span></div>
          </div>
        </div>
        <div className="parking">
          <div className="navigation">
            <p>Listed Parking</p>
            <p>Rented Parking</p>
          </div>
          <div className="listing">
            <div className="thumbnail">
              <img></img>
            </div>
            <div className="details-container">
              <div className="name">
                <h3>Suasana Loft</h3>
                <p>Lot B 13-1</p>
              </div>
              <div className="details">
                <div>
                  <h5>Vehicle Registered</h5>
                  <p>ABC 7364</p>
                </div>
                <div>
                  <h5>Rental</h5>
                  <p>RM300</p>
                </div>
              </div>
              <div>
                <h5>User Registered</h5>
                <p>Clamone Parkinson</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
