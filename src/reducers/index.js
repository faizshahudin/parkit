import { combineReducers } from "redux"
import AuthedUser from "./AuthedUser"
import Parkings from "./Parkings"

export default combineReducers({
  AuthedUser,
  Parkings
})
