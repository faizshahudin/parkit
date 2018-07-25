export const register = (data) =>
    fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => res)

export const resetPassword = (data) =>
    fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/auth/password/reset/confirm/`, {
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
    fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/login/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())

export const addParking = (data, auth) =>
fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/rent/`, {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${auth}`,
  },
  body: data
})
.then(handleErrors)
.then(res => res.json())

export const bookParking = (data, auth) =>
fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/vehicle/`, {
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
    fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/search/`)
    .then(handleErrors)
    .then(res => res.json())

export const getUserInfo = () =>
  fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/profile/`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.auth}`
    },
  })
  .then(handleUserDataError)
  .then(res => res.json())

export const uploadPhoto = (auth, data, id) =>
fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/profile/update/${id}`, {
  method: 'PUT',
  headers: {
    "Authorization": `Bearer ${auth}`,
  },
  body: data
})
.then(handleErrors)
.then(res => res.json())

export const updateProfile = (auth, data, id) =>
fetch(`http://elastic-parkit.ug7zfpdc2v.ap-southeast-1.elasticbeanstalk.com/profile/update/${id}`, {
  method: 'PUT',
  headers: {
    "Authorization": `Bearer ${auth}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data)
})
.then(handleErrors)
.then(res => res.json())

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

function handleUserDataError(response) {
    if (!response.ok) {
      localStorage.removeItem("auth")
      window.location.reload()
    }
    return response;
}
