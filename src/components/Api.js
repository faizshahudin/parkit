export const register = (data) =>
    fetch(`http://127.0.0.1:8000/register/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())

export const login = (data) =>
    fetch(`http://127.0.0.1:8000/login/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": "LOC6OT0kz8DTLslDdykg0hidSAWThx9bKoz31KFCQo7TrAdIEEZXSGo8QSXk0T6Y",
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())

export const addParking = (data, auth) =>
fetch(`http://127.0.0.1:8000/rent/`, {
  method: 'POST',
  headers: {
    "Authorization": `Token ${auth}`,
    "Content-Type": "application/json",
    "X-CSRFTOKEN": "LOC6OT0kz8DTLslDdykg0hidSAWThx9bKoz31KFCQo7TrAdIEEZXSGo8QSXk0T6Y",
  },
  body: JSON.stringify(data)
})
.then(res => res.json())

export const getLocations = (area) =>
    fetch(`http://127.0.0.1:8000/search/?db_status=Pending&db_area=${area}`)
    .then(res => res.json())
