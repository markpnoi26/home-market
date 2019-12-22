// code goes here
// more comments on this

document.addEventListener("DOMContentLoaded", () =>{
  console.log("DOM Loaded!")
  addAllFarmers()
})

// event listeners


let newFarmer = document.getElementById("new-farmer")
newFarmer.addEventListener("click", (e) => {
  e.preventDefault();
  let inputs = newFarmer.querySelectorAll("input");
  if (e.target.value ===  "Add New Farmer" &&
      inputs[0].value != "" &&
      inputs[1].value != "") {
    addFarmerToDb(inputs[0].value, inputs[1].value)
    inputs[0].value = "";
    inputs[1].value = "";
  } else if (e.target.innerHTML === "Farmer"){
    let form = e.target.parentNode.querySelector("form");
    if (form.hidden === false) {
      form.hidden = true
    } else {
      form.hidden = false
    }
  }
})


// Populators

function addAllFarmers() {
  fetch("http://localhost:3000/farmers")
    .then(response => {
      return response.json()
    })
    .then(json => {
      let farmerOptions = document.getElementById("farmers-options")
      json.forEach(farmer => {
        let option = document.createElement("option");
        option.value = `${farmer.id}`
        option.innerHTML = `${farmer.name}`
        farmerOptions.appendChild(option)
      })
    })
}

// add new Farmer to DB

function addFarmerToDb(farmer, farm) {
  let formData = {
    name: farmer,
    farm_name: farm
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  return fetch('http://localhost:3000/farmers', configObj)
    .then(response => {
      return response.json()
    })
    .then(farmer => {
      let farmerOptions = document.getElementById("farmers-options")
      let option = document.createElement("option");
      option.value = `${farmer.id}`
      option.innerHTML = `${farmer.name}`
      farmerOptions.appendChild(option)
    })
}


// on load, load all selection for farmer selection
// on farmer select, add form for Delivery
// on farmer select, display all farmer's delivery
