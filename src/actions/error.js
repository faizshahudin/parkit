export const SHOW_ERROR = "SHOW_ERROR"
export const HIDE_ERROR = "HIDE_ERROR"

export const showError = (message) => ({
  type: SHOW_ERROR,
  message
})

export const hideError = () => ({
  type: HIDE_ERROR,
})
