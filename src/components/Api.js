export const register = (data) =>
    fetch(`http://127.0.0.1:8000/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => res)

export const resetPassword = (data) =>
    fetch(`http://127.0.0.1:8000/auth/password/reset/confirm/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(res => console.log(res))
    .catch(e => console.log(e))

export const login = (data) =>
    fetch(`http://127.0.0.1:8000/login/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(res => res.json())

export const addParking = (data, auth) =>
fetch(`http://127.0.0.1:8000/rent/`, {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${auth}`,
  },
  body: data
})
.then(handleErrors)
.then(res => res.json())

export const bookParking = (data, auth) =>
fetch(`http://127.0.0.1:8000/vehicle/`, {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${auth}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data)
})
.then(handleErrors)
.then(res => res.json())

export const getParkings = () =>
    fetch(`http://127.0.0.1:8000/search/?db_status=Pending`)
    .then(handleErrors)
    .then(res => res.json())

export const getUserInfo = () =>
  fetch(`http://127.0.0.1:8000/profile/`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.auth}`,
    },
  })
  .then(handleErrors)
  .then(res => res.json())

export const uploadPhoto = (auth, data, id) =>
fetch(`http://127.0.0.1:8000/profile/update/${id}`, {
  method: 'PUT',
  headers: {
    "Authorization": `Bearer ${auth}`,
    // "Content-Type": "multipart/form-data"
  },
  body: data
})
.then(handleErrors)
.then(res => res.json())

export const updateProfile = (auth, data) =>
fetch(`http://127.0.0.1:8000/profile/update/3/`, {
  method: 'PUT',
  headers: {
    "Authorization": `Bearer ${auth}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data)
})
.then(handleErrors)
.then(res => res.json())
// .then(res => console.log(res))

export function getInitialData() {
  return Promise.all([
    getUserInfo(),
    getParkings(),
  ])
  .then(([user, parkings]) => ({ user, parkings })
)}

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}
