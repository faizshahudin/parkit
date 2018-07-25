import { combineReducers } from "redux"
import AuthedUser from "./AuthedUser"
import parkings from "./parkings"
import modal from "./modal"
import error from "./error"
import loading from "./loading"
import {loadingBarReducer} from "react-redux-loading"



export default combineReducers({
  AuthedUser,
  parkings,
  modal,
  error,
  loadingBar: loadingBarReducer,
  loading,
})
