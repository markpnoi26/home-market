
document.addEventListener("DOMContentLoaded", () =>{
  console.log("DOM Loaded!")
  addAllFarmers()
})

/* EVENT LISTENERS */

// to unhide adding new farmer
let newFarmer = document.getElementById("new-farmer")
newFarmer.addEventListener("click", (e) => {
  e.preventDefault();
  let inputs = newFarmer.querySelectorAll("input");
  if (e.target ===  newFarmer.querySelectorAll("input")[1] &&
      inputs[0].value != "") {
    addFarmerToDb(inputs[0].value)
    inputs[0].value = "";
  } else if (e.target === newFarmer.querySelectorAll("button")[0]){
    let form = e.target.parentNode.querySelector("form");
    if (form.hidden === false) {
      form.hidden = true
    } else {
      form.hidden = false
    }
  }
})

// to fetch the farmer on View Farmer
let collection = document.getElementById("farmers-collection")
collection.addEventListener("click", e => {
  e.preventDefault();
  if (e.target === collection.querySelector("input")) {
    let farmers = document.getElementById("farmers-options");
    fetch(`http://localhost:3000/farmers/${farmers.options[farmers.selectedIndex].value}`)
      .then(response => {
        return response.json()
      })
      .then(farmer => {
        console.log(farmer.deliveries);
        console.dir(farmer.deliveries)
      })
  }
})

/* PAGE POPULATOR FUNCTIONS */

// add all farmer options
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
function addFarmerToDb(farmer) {
  let formData = {
    name: farmer
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  fetch('http://localhost:3000/farmers', configObj)
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

/* CLASSES USED TO CREATE */

class FarmerCard {
  constructor(name){

  }
}

class DeliveryCard {
  constructor(delivery) {

  }
}
