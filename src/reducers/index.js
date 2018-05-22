import { combineReducers } from "redux"
import AuthedUser from "./AuthedUser"
import parkings from "./parkings"
import {loadingBarReducer} from "react-redux-loading"


export default combineReducers({
  AuthedUser,
  parkings,
  loadingBar: loadingBarReducer,
})
