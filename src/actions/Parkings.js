import * as Api from "../components/Api"
import { showLoading, hideLoading } from 'react-redux-loading'
import jwt from "jsonwebtoken"

export const GET_PARKINGS = "GET_PARKINGS"
export const LIST_PARKING = "LIST_PARKING"
export const LIST_PARKING_SUCCESS = "LIST_PARKING_SUCCESS"
export const BOOK_PARKING = "BOOK_PARKING"
export const BOOK_PARKING_SUCCESS = "BOOK_PARKING_SUCCESS"
export const GET_USER_PARKINGS = "GET_USER_PARKINGS"



export function getParkings(parkings) {
  return {
    type: GET_PARKINGS,
    parkings,
  }
}

export function getUserParkings(parkings) {
  return {
    type: GET_USER_PARKINGS,
    parkings,
  }
}

export function listParking() {
  return {
    type: LIST_PARKING,
  }
}

export function listParkingSuccess(parking) {
  return {
    type: LIST_PARKING_SUCCESS,
    parking
  }
}

export function bookParking() {
  return {
    type: BOOK_PARKING,
  }
}

export function bookParkingSuccess(parking) {
  return {
    type: BOOK_PARKING_SUCCESS,
    parking
  }
}



export function handleListParking(parkings) {
  return (dispatch) => {
    dispatch(listParking())
    dispatch(showLoading())
    return Api.addParking(parkings, localStorage.auth)
      .then(res => dispatch(listParkingSuccess(res)))
      .then(() => dispatch(hideLoading()))
      .catch("There was an error processing your request.")
  }
}

export function handleGetUserParkings(parkings) {
  return (dispatch) => {
    let parkingsArray = []
    if (localStorage.auth) {
      const id = jwt.decode(localStorage.auth).pk
      const newParkings = parkings.filter(parking =>
        parking.user === id
      )
      dispatch(getUserParkings(newParkings))
    }
  }
}

export function handleGetParkings() {
  return (dispatch) => {
    dispatch(showLoading())
    return Api.getParkings()
    .then(res => {
      let parkings = res
      let parkingObject = {}
      parkings.map(parking => {
      parkingObject[parking.id] = parking
    })
    dispatch(getParkings(parkingObject))
    })
    .then(() => dispatch(hideLoading()))
    .catch(e => {
      alert("There was an error processing your request")
    })
  }
}

export function handleBookParking(parking) {
  return (dispatch) => {
    dispatch(bookParking())
    dispatch(showLoading())
    Api.bookParking(parking, localStorage.auth)
      .then(res => dispatch(bookParkingSuccess(res)))
      .then(() => dispatch(hideLoading()))
      .catch("There was an error processing your request.")
  }
}
