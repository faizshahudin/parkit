import * as Api from "../components/Api"

export const GET_PARKINGS = "GET_PARKINGS"
export const ADD_PARKING = "ADD_PARKING"

export function getParkings(parkings) {
  return {
    type: GET_PARKINGS,
    parkings,
  }
}

export function handleGetParkings(area) {
  return (dispatch) => {
    return Api.getParkings(area)
    .then(res => {
      let parkings = res
      let parkingObject = {}
      parkings.map(parking => {
      parkingObject[parking.id] = parking
    })
      dispatch(getParkings(parkingObject))
    })
    .catch(e => {
      alert("There was an error processing your request")
    })
  }
}
