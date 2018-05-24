import * as Api from "../components/Api"

export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGOUT = "LOGOUT"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_ERROR = "REGISTER_ERROR"


export function loginSuccess(id) {
  return {
    type: LOGIN_SUCCESS,
    id,
  }
}

export function loginError() {
  return {
    type: LOGIN_ERROR,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function registerSuccess(id) {
  return {
    type: REGISTER_SUCCESS,
    id,
  }
}

export function registerError() {
  return {
    type: REGISTER_ERROR,
  }
}

export function handleRegister(data) {
  return (dispatch) => {
    return Api.register(data).then(res => {
      localStorage.setItem("auth", res.token)
      dispatch(registerSuccess(res.token))

      // else if (res.username[0] === "A user with that username already exists.") {
      //   alert(res.username[0])
      // }
      // else if (res.email[0] === "This user has already registered.") {
      //   alert(res.email[0])
      // }
    })
    .catch(e => {
      dispatch(registerError())
      console.log(e)
    })
  }
}

export function handleLogin(data) {
  return (dispatch) => {
    return Api.login(data)
      .then(response => {
        if (!response.non_field_errors) {
          const userId = response.user.pk
          localStorage.setItem("userId", userId)
          const token = response.token
          localStorage.setItem("auth", token)
          dispatch(loginSuccess(response))
        }
        else {
          alert(response.non_field_errors[0])
          dispatch(loginError())
        }
      })
      .catch(e => {
        alert("There was an error processing your request")
      })
  }
}

export function handleLogout () {
  return (dispatch) => {
    localStorage.removeItem("auth")
    dispatch(logout())
  }
}
