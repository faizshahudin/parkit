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
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => res)
