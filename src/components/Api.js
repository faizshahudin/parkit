export const register = (data) =>
    fetch(`http://127.0.0.1:8000/register/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "mode": 'no-cors',
      },
      body: {
        "username": "dsaaaa",
        "first_name": "dsfs",
        "last_name": "dsafdsa",
        "email": "sndjfnsaa@gmail.com",
        "email2": "sndjfnsaa@gmail.com",
        "password": "test123"
      }
    })
    .then(res => res)
    .then(res => console.log(res))
    // .catch(e => console.log(e))
