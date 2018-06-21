import {GET_PARKINGS, LIST_PARKING_COMPLETE, LIST_PARKING, LIST_PARKING_SUCCESS, BOOK_PARKING_COMPLETE, BOOK_PARKING, BOOK_PARKING_SUCCESS} from "../actions/parkings"

export default function parkings(state = {loading: true, listParking: true, bookParking: true,}, action) {
  switch(action.type) {
    case GET_PARKINGS :
      return {
        ...state,
        ...action.parkings,
        loading: false,
      }
    case LIST_PARKING_COMPLETE :
      return {
        ...state,
        listParking: true,
      }
    case LIST_PARKING :
      return {
        ...state,
        listParking: true,
      }
    case LIST_PARKING_SUCCESS :
      return {
        ...state,
        listParking: false,
      }
    case BOOK_PARKING_COMPLETE :
      return {
        ...state,
        bookParking: true
      }
    case BOOK_PARKING :
      return {
        ...state,
        bookParking: true
      }
    case BOOK_PARKING_SUCCESS :
      return {
        ...state,
        bookParking: false
      }
    default :
      return state
  }
}
