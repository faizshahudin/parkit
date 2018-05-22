import * as Api from "../components/Api"
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_PARKINGS = "GET_PARKINGS"
export const ADD_PARKING = "ADD_PARKING"

export function getParkings(parkings) {
  return {
    type: GET_PARKINGS,
    parkings,
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
      dispatch(getParkings(parkingObject))
    })
    .then(() => dispatch(hideLoading()))
    .catch(e => {
      alert("There was an error processing your request")
    })
  }
}
