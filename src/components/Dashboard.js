import React, { Component } from 'react'
import avatar from "../images/profile-image.png"
import parkingAvatar from "../images/parking-placeholder.png"
import {handleShowModal, handleHideModal} from "../actions/modal"
import { connect } from 'react-redux'
import {handleGetParkings} from "../actions/parkings"



class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: this.props.AuthedUser.parkings.length > 0
    }
  }
  componentWillMount() {
    const {dispatch} = this.props
    dispatch(handleHideModal())
  }
  render() {
    const {AuthedUser} = this.props
    console.log(AuthedUser.parkings)
    return (
      <div className="grey-background">
        <div className="dashboard main-container">
          <div className="user white-background">
            <div className="avatar main-container">
              <img src={avatar}></img>
              <h3>{AuthedUser.first_name}</h3>
              <p>Serdang, Selangor</p>
            </div>
            <div className="contact container">
              <h5>Contact Information</h5>
              <div><img></img><span>+6012 345 6789</span></div>
              <div><img></img><span>{AuthedUser.username}</span></div>
            </div>
          </div>
          <div className="parking">
            <div className="white-background">
              <div className="navigation container">
                <a>Listed Parking</a>
                <a>Rented Parking</a>
              </div>
            </div>
            {AuthedUser.parkings.length > 0 &&
              <div className="listing">
                <ul>
                  {AuthedUser.parkings.map(parking =>
                    <li>
                      <div className="listing-container white-background">
                        <div className="thumbnail">
                          <img src={parkingAvatar}></img>
                        </div>
                        <div className="details-container">
                          <div className="name">
                            <h3>{parking.db_property}</h3>
                            <p>Lot B 13-1</p>
                          </div>
                          <div className="details">
                            <div>
                              <h5>Vehicle Registered</h5>
                              <p>ABC 7364</p>
                            </div>
                            <div>
                              <h5>Rental</h5>
                              <p>RM{parking.db_price}</p>
                            </div>
                            <div>
                              <h5>User Registered</h5>
                              <p>Clamone Parkinson</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({AuthedUser, modal, parkings}) {
  return {
    modal,
    AuthedUser,
    parkings
  }
}
export default connect(mapStateToProps)(Dashboard)
