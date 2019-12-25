
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

// to fetch the farmer on View Farmer and all its deliveries
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
        if (farmer.name != undefined) {
          FarmerCard.createFarmerCard(farmer);
          farmer.deliveries.forEach(delivery => {
            if (delivery.delivered === false) {
              FarmerCard.populateFarmerDelivery(delivery)
            }
            console.log(delivery)
          });
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
  static createFarmerCard(farmer) {
    let card = document.getElementById("farmer-card");
    for (let i = 0; i < 2; i++) {
      card.appendChild(document.createElement("div"));
    }
    card.childNodes[1].innerHTML =
    `
    <h2>${farmer.name}</h2>
    <div id="new-delivery">
      <form>
        <label>Address:</label>
        <input type="text">
        <input type="submit" value="Add New Delivery">
      </form>
    </div>
    `;
    card.setAttribute('farmer-id', farmer.id)
    card.childNodes[2].id = "deliveries";
    card.childNodes[2].innerHTML = `<h5>Deliveries by ${farmer.name}</h5>`;
  }

  static populateFarmerDelivery(delivery) {
    let delivered = document.getElementById("deliveries");
    let deliveryDiv = document.createElement("div")
    deliveryDiv.setAttribute('delivery-id', delivery.id)
    deliveryDiv.innerHTML =
    ` Delivery to: ${delivery.delivery_address}
      <ul>
        <li>eggs: ${delivery.eggs} <button>+</button><button>-</button></li>
        <li>vegetables: ${delivery.vegetables} <button>+</button><button>-</button></li>
        <li>fruits: ${delivery.fruits} <button>+</button><button>-</button></li>
      </ul>
      <button>Delivered</button>`
    delivered.appendChild(deliveryDiv)
  }

  static addNewDelivery(farmer) {

  }

  static addItem(delivery, item) {

  }

  static subtractItem(delivery, item) {

  }
}
