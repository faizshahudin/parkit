import * as Api from "../components/Api"
import {handleInitialData} from "./shared"
import jwt from "jsonwebtoken"
import { showLoading, hideLoading } from 'react-redux-loading'
import { showError } from "./error"



export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGOUT = "LOGOUT"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_ERROR = "REGISTER_ERROR"
export const GET_USER_DETAILS = "GET_USER_DETAILS"

export const EDIT_PROFILE = "EDIT_PROFILE"
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS"
export const UPLOAD_IMAGE = "UPLOAD_IMAGE"
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS"

export function editProfile() {
  return {
    type: EDIT_PROFILE
  }
}

export function editProfileSuccess(data) {
  return {
    type: EDIT_PROFILE_SUCCESS,
    data
  }
}

export function uploadImage() {
  return {
    type: UPLOAD_IMAGE
  }
}

export function uploadImageSuccess(data) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    data
  }
}

export function login() {
  return {
    type: LOGIN,
  }
}

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

export function getUserDetails(data) {
  return {
    type: GET_USER_DETAILS,
    data,
  }
}


export function handleRegister(data) {
  return (dispatch) => {
    dispatch(showLoading())
    return Api.register(data)
    .then(res => {
      if(!res.ok) {
        res.json()
          .then(res => {
            if (res.email) {
              throw Error(res.email[0])
            } else {
              throw Error("There was an error processing your request")
            }
          })
          .catch(e => dispatch(showError(e)))
        return null
      } else {
        return res.json()
      }
    })
    .then(res => {
      if (res) {
        localStorage.setItem("auth", res.token)
        dispatch(registerSuccess(res.token))
        dispatch(handleInitialData())
      } else {
        dispatch(showError(res))
      }
    })
    .then(() => dispatch(hideLoading()))
    .catch(e => {
      dispatch(registerError())
      dispatch(showError(e))
      dispatch(hideLoading())
    })
  }
}

export function handleLogin(data) {
  return (dispatch) => {
    return Api.login(data)
      .then(response => {
        if (!response.non_field_errors) {
          const token = response.token
          localStorage.setItem("auth", token)
          const user = (jwt.decode(localStorage.auth))
          dispatch(handleInitialData())
        }
        else {
          dispatch(showError(response.non_field_errors[0]))
          dispatch(loginError())
        }
      })
      .catch(e => {
        dispatch(hideLoading())
        dispatch(showError("There was an error processing your request"))
      })
  }
}

export function handleEditProfile(data, id) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(editProfile())
    return Api.updateProfile(localStorage.auth, data, id)
      .then(res => dispatch(editProfileSuccess(res)))
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        dispatch(hideLoading())
        dispatch(showError("There was an error processing your request"))
      })
  }
}

export function handleUploadImage(data, id) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(uploadImage())
    return Api.uploadPhoto(localStorage.auth, data, id)
      .then(res => dispatch(uploadImageSuccess(res)))
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        dispatch(hideLoading())
        dispatch(showError(e))
      })
  }
}

export function handleLogout () {
  return (dispatch) => {
    localStorage.removeItem("auth")
    dispatch(logout())
  }
}

export function handleGetUserDetails () {
  return (dispatch) => {
    dispatch(showLoading())
    return Api.getUserInfo(localStorage.auth)
      .then(res => {dispatch(getUserDetails(res))})
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        dispatch(hideLoading())
        dispatch(showError(e))
      })
  }
}
