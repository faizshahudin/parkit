export const SHOW_MODAL = "SHOW_MODAL"
export const HIDE_MODAL = "HIDE_MODAL"

export const showModal = (id, path) => ({
  type: SHOW_MODAL,
  id,
  path
})

export const hideModal = () => ({
  type: HIDE_MODAL
})

export function handleShowModal(id, path) {
  return (dispatch) => {
    dispatch(showModal(id, path))
  }
}

export function handleHideModal() {
  return (dispatch) => {
    dispatch(hideModal())
  }
}
