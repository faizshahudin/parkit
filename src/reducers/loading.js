import {LOADING_TRUE, LOADING_FALSE} from "../actions/loading"

export default function error(state = null, action) {
  switch (action.type) {
    case LOADING_TRUE :
      return true
    case LOADING_FALSE :
      return false
    default :
      return state
  }
}