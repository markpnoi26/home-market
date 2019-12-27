/* Document Load*/
document.addEventListener("DOMContentLoaded", () =>{
  console.log("DOM Loaded!")
  addAllFarmers()
})

/* EVENT LISTENERS */

// To add new Farmer to DB
const newFarmer = document.getElementById("new-farmer")
newFarmer.addEventListener("click", (e) => {
  e.preventDefault();
  let inputs = newFarmer.querySelectorAll("input");
  if (e.target ===  newFarmer.querySelectorAll("input")[1] &&
      inputs[0].value != "") {
    addFarmerToDb(inputs[0].value)
    inputs[0].value = "";
  }
})

// to fetch the farmer on View Farmer and all its deliveries
const collection = document.getElementById("farmers-collection")
collection.addEventListener("click", e => {
  e.preventDefault();
  if (e.target === collection.querySelector("input")) {
    let farmers = document.getElementById("farmers-options");
    fetch(`http://localhost:3000/farmers/${farmers.options[farmers.selectedIndex].value}`)
      .then(response => {
        return response.json()
      })
      .then(farmer => {
        let farmerData = farmer.data;
        if (farmerData.attributes.name != undefined) {
          let newFarmer = new FarmerCard(farmerData.attributes.name, farmerData.id, farmerData.attributes.deliveries)
          newFarmer.createFarmerCard()
          newFarmer.populateFarmerDelivery()
        }
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
      json.data.forEach(farmer => {
        let option = document.createElement("option");
        option.value = `${farmer.id}`
        option.innerHTML = `${farmer.attributes.name}`
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
      option.value = `${farmer.data.id}`
      option.innerHTML = `${farmer.data.attributes.name}`
      farmerOptions.appendChild(option)
      let newFarmer = new FarmerCard(farmer.data.attributes.name, farmer.data.id, farmer.data.attributes.deliveries)
      newFarmer.createFarmerCard()
      newFarmer.populateFarmerDelivery()
    })
}
