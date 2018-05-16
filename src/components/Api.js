export const register = (data) =>
    fetch(`http://127.0.0.1:8000/register/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => res)
    // .catch(e => console.log(e))

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
    .then(res => res)

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
.then(res => res)
