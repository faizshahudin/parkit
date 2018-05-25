import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR} from "../actions/AuthedUser"
import {GET_USER_PARKINGS} from "../actions/parkings"
import jwt from "jsonwebtoken"

export default function users(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS :
      return {
        ...action.id,
        parkings: []
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
    default :
      return state
  }
}
