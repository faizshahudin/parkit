import * as Api from "../components/Api"

export const SET_AUTHED_USER = "SET_AUTHED_USER"

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function login(data) {
  return (dispatch) => {
    return Api.login(data)
      .then(response => {
        const key = response.key
        localStorage.setItem("auth", key)
        dispatch(setAuthedUser(key))
      })
  }
}

export function logout () {
  return (dispatch) => {
    localStorage.removeItem("auth")
    dispatch(setAuthedUser(null))
  }
}
