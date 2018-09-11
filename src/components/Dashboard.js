import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import jwt from "jsonwebtoken"
import avatar from "../images/avatar-placeholder.jpeg"
import parkingAvatar from "../images/parking-placeholder.png"
import noParkingImage from "../images/no-parking.png"
import {handleShowModal, handleHideModal} from "../actions/modal"
import {handleGetUserDetails} from "../actions/AuthedUser"
import {handleGetParkings} from "../actions/parkings"
import {loginSuccess, handleLogin, handleEditProfile, handleUploadImage} from "../actions/AuthedUser"
import * as Api from "../components/Api"
import Button from "./common/Button";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listedParking: true,
    }
  }

  testEvent = (e) => {
    e.preventDefault()
    console.log(e)
  }

  componentWillMount() {
    const {dispatch} = this.props
    dispatch(handleHideModal())
  }

  componentDidMount() {
    const {dispatch} = this.props
    const user = (jwt.decode(localStorage.auth))
  }

  handleChange = (e) => {
   let value = document.getElementById("contact").textContent
   let name = e.target.name
   this.setState((state) => ({
     contact: value,
   }))
 }

 toggleNav = () => {
   this.setState({
     listedParking: !this.state.listedParking,
   })
 }

 handleSubmit = (e) => {
   const {dispatch} = this.props
   e.preventDefault()
   dispatch(handleEditProfile(this.state, this.props.AuthedUser.pk))
   this.setState({edit: false})
 }

 handleChange = (e) => {
   const {AuthedUser} = this.props
   let value = e.target.value
   let name = e.target.name
   this.setState((state) => ({
     [name]: value,
     username: AuthedUser.email
   }))
 }

 handleChangePhoto = (e) => {
  const {AuthedUser, dispatch} = this.props
  let value = e.target.value
  let name = e.target.name
  let file = e.target.files[0]

  // let myForm = document.getElementById('form');
  let formData = new FormData()
  formData.append('username', AuthedUser.email)
  formData.append('image', file)

  dispatch(handleUploadImage(formData, AuthedUser.pk))
}

  render() {
    const {AuthedUser, listedParkings, bookedParkings, parkings} = this.props

    return (
      <Fragment>
        {AuthedUser &&
          <div className="grey-background">
            <div className="dashboard main-container">
              <div className="user white-background">
                <div className="avatar main-container">
                  <form id="form">
                    <input type="file" id="profile_pic" name="image"
                          onChange={this.handleChangePhoto} accept=".jpg, .jpeg, .png" style={{display: "none"}} />
                  </form>
                  <label htmlFor="profile_pic">
                    {/* if no user logged in, render user placeholder */}
                    {AuthedUser.image
                      ? <img className="user-avatar" src={AuthedUser.image}></img>
                      : <img className="user-avatar" src={avatar}></img>
                    }
                  </label>
                  <h3>{AuthedUser.first_name}</h3>
                </div>
                <div className="contact container">
                  <div className="edit">
                    <h5>Contact Information</h5>
                    <i className="fa fa-pencil" onClick={() => this.setState({edit: !this.state.edit})} aria-hidden="true" />
                  </div>
                  {this.state.edit
                    ? <form>
                        <input name="contact" defaultValue={AuthedUser.contact} onChange={this.handleChange}></input>
                        <input name="email" defaultValue={AuthedUser.email} onChange={this.handleChange}></input>
                        <button onClick={this.handleSubmit}>Save</button>
                        <button onClick={() => this.setState({edit: false})}>Cancel</button>
                      </form>
                    : <div className="contact-info-container">
                        <div className="contact-info"><i className="fas fa-phone"></i><span name="contact" id="contact">{AuthedUser.contact}</span></div>
                        <div className="contact-info"><i className="far fa-envelope"></i><span>{AuthedUser.email}</span></div>
                      </div>
                  }

                </div>
              </div>
              {/* render list of user parkings */}
              <div className="parking">
                <div className="white-background navigation-container">
                  <div className="navigation container">
                    <button onClick={this.toggleNav} disabled={this.state.listedParking}>Listed Parking</button>
                    <button onClick={this.toggleNav} disabled={!this.state.listedParking}>Rented Parking</button>
                  </div>
                </div>
                {AuthedUser.parkings &&
                  <div className="listing">
                    {this.state.listedParking
                      ? <ListedParking listedParkings={listedParkings}/>
                      : <RentedParking AuthedUser={AuthedUser} bookedParkings={bookedParkings} parkings={parkings}/>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </Fragment>
    )
  }
}

const ListedParking = (props) => {
  // if there is no listed parkings, render:
  return props.listedParkings.length ? (
    <ul>
      {props.listedParkings.map((parking, index) =>
        <li key={index}>
          <div className="listing-container white-background">
            <div className="thumbnail">
              <img src={parking.image}></img>
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
  ) : <NoParkings 
        content="Looks like you don't have any listed parking yet."
        buttonText="I HAVE A PARKING"
        pageLink="/add-listing"
      />
}

const NoParkings = (props) => (
  <div className="no-listed-container">
    <div className="no-listed-image">
      <img src={noParkingImage}/>
    </div>
    <div className="no-listed-title">
      <h2>Honk! Honk!</h2>
    </div>
    <div className="no-listed-subtitle">
      <span>{props.content}</span>
    </div>
    <div className="no-listed-button">
      <Link to={props.pageLink}>
        <Button className="btn" buttonText={props.buttonText} />
      </Link>
    </div>
  </div>
)

const RentedParking = (props) => {
  return props.bookedParkings.length ? (
    <ul>
      {props.bookedParkings.map(car =>
        <li key={car.id}>
          <div className="listing-container white-background">
            <div className="thumbnail">
              {/* <img src={props.parkings[car.parked_at].image}></img> */}
            </div>
            <div className="details-container">
              <div className="name">
                <h3>{props.parkings[car.parked_at].db_property}</h3>
                <p>Lot B 13-1</p>
              </div>
              <div className="details">
                <div>
                  <h5>Vehicle Registered</h5>
                  <p>{car.car_registery}</p>
                </div>
                <div>
                  <h5>Rental</h5>
                  <p>RM{props.parkings[car.parked_at].db_price}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      )}
    </ul> ) : <NoParkings
                content="Looks like you have not rented any parking spaces yet."
                buttonText="I NEED A PARKING"
                pageLink="/find-parking/search"
              />
}

function mapStateToProps({AuthedUser, modal, parkings}) {
  let listedParkings
  let bookedParkings
  if (AuthedUser.parkings) {
    listedParkings = AuthedUser.parkings
      .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
  }

  if (parkings.loading === false && AuthedUser.cars) {
    bookedParkings = AuthedUser.cars
      .filter(car => car.parked_at !== null)
      .sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date))
  }


  return {
    modal,
    AuthedUser,
    parkings,
    listedParkings,
    bookedParkings,
  }
}
export default connect(mapStateToProps)(Dashboard)
