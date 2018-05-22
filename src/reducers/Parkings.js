import {GET_PARKINGS, ADD_PARKING} from "../actions/parkings"

export default function parkings(state = {}, action) {
  switch(action.type) {
    case GET_PARKINGS :
      return {
        ...state,
        ...action.parkings
      }
    default :
      return state
  }
}
