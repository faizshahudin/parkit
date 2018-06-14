import {loginSuccess, getUserDetails} from "./AuthedUser"
import {getInitialData} from "../components/Api"
import {getParkings} from "./parkings"
import { showLoading, hideLoading } from 'react-redux-loading'
import jwt from "jsonwebtoken"


export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
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
      })
      .catch(res => {
        dispatch(hideLoading())
        alert(res)
      })

  }
}
