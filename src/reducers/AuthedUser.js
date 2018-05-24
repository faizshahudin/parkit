import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR} from "../actions/AuthedUser"
import jwt from "jsonwebtoken"

export default function users(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS :
      return action.id
    case LOGIN_ERROR :
      return null
    case LOGOUT :
      return null
    case REGISTER_SUCCESS :
      return jwt.decode(action.id)
    case REGISTER_ERROR :
      return null
    default :
      return state
  }
}
