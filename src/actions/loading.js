export const LOADING_TRUE = "LOADING_TRUE"
export const LOADING_FALSE = "LOADING_FALSE"


export function loadingTrue() {
  return {
    type: LOADING_TRUE
  }
}

export function loadingFalse() {
  return {
    type: LOADING_FALSE
  }
}
