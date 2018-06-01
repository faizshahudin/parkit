import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR, GET_USER_DETAILS} from "../actions/AuthedUser"
import {GET_USER_PARKINGS, LIST_PARKING, LIST_PARKING_SUCCESS, BOOK_PARKING} from "../actions/parkings"
import jwt from "jsonwebtoken"

export default function users(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS :
      return {
        ...action.id
      }
    case LOGIN_ERROR :
      return null
    case LOGOUT :
      return null
    case REGISTER_SUCCESS :
      return jwt.decode(action.id)
    case REGISTER_ERROR :
      return null
    case GET_USER_PARKINGS :
      return {
        ...state,
        parkings: action.parkings
      }
    case GET_USER_DETAILS :
      return {
        ...state,
        parkings: action.data.ParkingForRent,
        cars: action.data.CarDatabase,
        ...action.data.User[0]
      }
    case LIST_PARKING_SUCCESS :
      return {
        ...state,
        parkings: state.parkings.concat(action.parking),
      }
    case BOOK_PARKING :
      return {
        ...state,
        cars: state.cars.concat(action.parking),
      }
    default :
      return state
  }
}
