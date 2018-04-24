export const register = (data) =>
    fetch(`https://cors-anywhere.herokuapp.com/http://127.0.0.1:8000/register/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => res)
    .then(res => console.log(res))
    // .catch(e => console.log(e))
