import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR, GET_USER_DETAILS, EDIT_PROFILE, EDIT_PROFILE_SUCCESS, UPLOAD_IMAGE_SUCCESS} from "../actions/AuthedUser"
import {GET_USER_PARKINGS, LIST_PARKING, LIST_PARKING_SUCCESS, BOOK_PARKING, BOOK_PARKING_SUCCESS} from "../actions/parkings"
import jwt from "jsonwebtoken"

export default function users(state = null, action) {
  switch (action.type) {
    case LOGIN :
      return false
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
    case BOOK_PARKING_SUCCESS :
      return {
        ...state,
        cars: state.cars.concat(action.parking),
      }
    case EDIT_PROFILE_SUCCESS :
      return {
        ...state,
        ...action.data
      }
    case UPLOAD_IMAGE_SUCCESS :
      return {
        ...state,
        image: action.data.image
      }
    default :
      return state
  }
}
