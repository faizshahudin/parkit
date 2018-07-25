import {login, loginSuccess, getUserDetails} from "./AuthedUser"
import {getInitialData} from "../components/Api"
import {getParkings} from "./parkings"
import { showLoading, hideLoading } from 'react-redux-loading'
import { loadingTrue, loadingFalse } from "./loading"
import jwt from "jsonwebtoken"
import { showError } from "./error"



export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(loadingTrue())
    dispatch(login())
    return getInitialData()
      .then(({user, parkings}) => {
        if (localStorage.auth) {
          const auth = (jwt.decode(localStorage.auth))
          dispatch(loginSuccess(auth))
          dispatch(getUserDetails(user))
        }
        let parkingObject = {}
        parkings.map(parking => {
        parkingObject[parking.id] = parking
      })
        dispatch(getParkings(parkingObject))
        dispatch(hideLoading())
        dispatch(loadingFalse())
      })
      .catch(e => {
        dispatch(hideLoading())
        dispatch(showError(e))
      })
  }
}
