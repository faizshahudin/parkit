export const SHOW_MODAL = "SHOW_MODAL"
export const HIDE_MODAL = "HIDE_MODAL"

export const showModal = (id) => ({
  type: SHOW_MODAL,
  id
})

export const hideModal = () => ({
  type: HIDE_MODAL
})

export function handleShowModal(id) {
  return (dispatch) => {
    dispatch(showModal(id))
  }
}

export function handleHideModal() {
  return (dispatch) => {
    dispatch(hideModal())
  }
}
