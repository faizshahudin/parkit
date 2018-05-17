import React, { Component } from 'react'
import avatar from "../images/profile-image.png"
import parking from "../images/parking-placeholder.png"

class Dashboard extends Component {
  render() {
    return(
      <div className="grey-background">
        <div className="dashboard main-container">
          <div className="user white-background">
            <div className="avatar main-container">
              <img src={avatar}></img>
              <h3>Reevas Parker</h3>
              <p>Serdang, Selangor</p>
            </div>
            <div className="contact container">
              <h5>Contact Information</h5>
              <div><img></img><span>+6012 345 6789</span></div>
              <div><img></img><span>email@company.com</span></div>
            </div>
          </div>
          <div className="parking">
            <div className="white-background">
              <div className="navigation container">
                <a>Listed Parking</a>
                <a>Rented Parking</a>
              </div>
            </div>
            <div className="listing">
              <div className="listing-container white-background">
                <div className="thumbnail">
                  <img src={parking}></img>
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
                    <div>
                      <h5>User Registered</h5>
                      <p>Clamone Parkinson</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
