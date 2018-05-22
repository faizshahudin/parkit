import {GET_PARKINGS, ADD_PARKING} from "../actions/Parkings"

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
