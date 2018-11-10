import {SHOW_MODAL, HIDE_MODAL} from "../actions/modal"

const initialState = {
  type: null, path: null
}

function modalReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        type: action.id,
        path: action.path
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modalReducer;
