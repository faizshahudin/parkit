import {GET_PARKINGS, LIST_PARKING, LIST_PARKING_SUCCESS, BOOK_PARKING, BOOK_PARKING_SUCCESS} from "../actions/parkings"
import { showLoading, hideLoading } from 'react-redux-loading'

export default function parkings(state = {loading: true}, action) {
  switch(action.type) {
    case GET_PARKINGS :
      return {
        ...state,
        ...action.parkings,
        loading: false,
      }
    case LIST_PARKING :
      return {
        ...state,
        loading: true,
      }
    case LIST_PARKING_SUCCESS :
      return {
        ...state,
        loading: false,
      }
    case BOOK_PARKING :
      return {
        ...state,
        loading: true
      }
    case BOOK_PARKING_SUCCESS :
      return {
        ...state,
        loading: false
      }
    default :
      return state
  }
}
