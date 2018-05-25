import * as Api from "../components/Api"
import { showLoading, hideLoading } from 'react-redux-loading'
import jwt from "jsonwebtoken"

export const GET_PARKINGS = "GET_PARKINGS"
export const ADD_PARKING = "ADD_PARKING"
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
    dispatch(handleGetUserParkings(parkings))
    dispatch(getParkings(parkingObject))
    })
    .then(() => dispatch(hideLoading()))
    .catch(e => {
      alert("There was an error processing your request")
    })
  }
}
