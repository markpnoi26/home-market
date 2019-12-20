// code goes here
// more comments on this

let jsonData;
fetch("http://localhost:3000/farmers")
  .then(response => {
    return response.json()
  })
  .then(json => {
    jsonData = json
  })
