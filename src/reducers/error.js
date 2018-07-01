import {SHOW_ERROR} from "../actions/error"

export default function error(state = null, action) {
  switch (action.type) {
    case SHOW_ERROR :
      return action.message
    default :
      return state
  }
}
