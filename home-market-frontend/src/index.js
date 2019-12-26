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
      // console.log(farmer.data.attributes)
      let farmerOptions = document.getElementById("farmers-options")
      let option = document.createElement("option");
      option.value = `${farmer.id}`
      option.innerHTML = `${farmer.data.attributes.name}`
      farmerOptions.appendChild(option)
    })
}

/* CLASSES USED TO CREATE */

class FarmerCard {
  constructor (name, id, deliveries) {
    this.name = name;
    this.id = id;
    this.deliveries = deliveries;
  }

  createFarmerCard() {
    let card = document.getElementById("farmer-card");
    card.innerHTML =`<div></div><div></div>`;
    // console.log(card.childNodes)
    card.childNodes[0].innerHTML =
    `
    <h2>${this.name}</h2>
    <div id="new-delivery">
      <form>
        <label>Address:</label>
        <input type="text">
        <input type="submit" value="Add New Delivery">
      </form>
    </div>
    `;
    card.setAttribute('farmer-id', this.id);
    card.childNodes[1].id = "deliveries";

    card.addEventListener("click", e => {
      e.preventDefault();
      if (e.target === card.querySelectorAll("input")[1] && card.querySelector("input").value != "") {
        this.addNewDelivery(card.querySelector("input").value);
        card.querySelector("input").value = "";
      }
    })
  }

  populateFarmerDelivery() {
    document.getElementById("deliveries").innerHTML = `<h5>Deliveries by ${this.name}</h5>`;
    this.deliveries.forEach(delivery => {
      let newDelivery = new DeliveryCard(delivery.id, delivery.delivery_address, this.id, delivery.eggs, delivery.vegetables, delivery.fruits, delivery.delivered);
      newDelivery.populateDeliveryCard();
    })
  }

  addNewDelivery(address) {
    let formData = {
      address: address,
      farmer_id: this.id,
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    fetch("http://localhost:3000/deliveries", configObj)
      .then(response => response.json())
      .then(delivery => {
        let newDelivery = new DeliveryCard(delivery.id, delivery.delivery_address, this.id, delivery.eggs, delivery.vegetables, delivery.fruits, delivery.delivered);
        newDelivery.populateDeliveryCard();
      })
  }
}


class DeliveryCard {
  constructor(id, address, farmer_id, eggs, vegetables, fruits, delivered) {
    this.id = id,
    this.delivery_address = address,
    this.farmer_id = farmer_id,
    this.eggs = eggs,
    this.vegetables = vegetables,
    this.fruits = fruits
    this.delivered = delivered
  }

  set egg_count(egg_count) {
    this.eggs = egg_count
  }

  set veg_count(veg_count) {
    this.vegetables = veg_count
  }

  set fruit_count(fruit_count) {
    this.fruits = fruit_count
  }

  get egg_count() {
    return this.eggs
  }

  get veg_count() {
    return this.vegetables
  }

  get fruit_count() {
    return this.fruits
  }

  populateDeliveryCard() {
    let delivered = document.getElementById("deliveries");
    let deliveryDiv = document.createElement("div")
    deliveryDiv.setAttribute('delivery-id', this.id)
    deliveryDiv.innerHTML =
    ` Delivery to: ${this.delivery_address}
      <ul>
        <li>eggs: <span>${this.egg_count}</span> <button>+</button><button>-</button></li>
        <li>vegetables: <span>${this.veg_count}</span> <button>+</button><button>-</button></li>
        <li>fruits: <span>${this.fruit_count}</span> <button>+</button><button>-</button></li>
        <li>delivered?  <strong><span>${this.delivered}</span></strong> </li>
      </ul>
      <button>Toggle Deliver</button><button>Delete</button>`
    delivered.appendChild(deliveryDiv)
    deliveryDiv.addEventListener("click", e => {
      if (e.target === deliveryDiv.querySelectorAll("button")[0]) {
        this.addItem(this.id, "eggs")
          .then(value => {
            deliveryDiv.querySelectorAll("button")[0].parentNode.querySelector("span").innerHTML = `${value}`
          })
      } else if (e.target === deliveryDiv.querySelectorAll("button")[2]) {
        this.addItem(this.id, "vegetables")
          .then(value => {
            deliveryDiv.querySelectorAll("button")[2].parentNode.querySelector("span").innerHTML = `${value}`
          })
      } else if (e.target === deliveryDiv.querySelectorAll("button")[4]) {
        this.addItem(this.id, "fruits")
          .then(value => {
            deliveryDiv.querySelectorAll("button")[4].parentNode.querySelector("span").innerHTML = `${value}`
          })
      } else if (e.target === deliveryDiv.querySelectorAll("button")[1] && deliveryDiv.querySelectorAll("span")[0].innerHTML > 0) {
        this.subtractItem(this.id, "eggs")
          .then(value => {
            deliveryDiv.querySelectorAll("button")[1].parentNode.querySelector("span").innerHTML = `${value}`
          })
      } else if (e.target === deliveryDiv.querySelectorAll("button")[3] && deliveryDiv.querySelectorAll("span")[1].innerHTML > 0) {
        this.subtractItem(this.id, "vegetables")
          .then(value => {
            deliveryDiv.querySelectorAll("button")[3].parentNode.querySelector("span").innerHTML = `${value}`
          })
      } else if (e.target === deliveryDiv.querySelectorAll("button")[5] && deliveryDiv.querySelectorAll("span")[2].innerHTML > 0) {
        this.subtractItem(this.id, "fruits")
          .then(value => {
            deliveryDiv.querySelectorAll("button")[5].parentNode.querySelector("span").innerHTML = `${value}`
          })
      } else if (e.target === deliveryDiv.querySelectorAll("button")[6]) {
        this.deliver(this.id)
          .then(value => {
            deliveryDiv.querySelectorAll("span")[3].innerHTML = `${value}`
          })
      } else if (e.target === deliveryDiv.querySelectorAll("button")[7]) {
        this.destroyDelivery(this.id)
          .then(value => {
            deliveryDiv.innerHTML = `${value.message}`
          })
      }
    })
  }

  addItem(delivery_id, item) {
    let formData = {
      item: item,
      patch_value: "add"
    };
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    return fetch(`http://localhost:3000/deliveries/${delivery_id}`, configObj)
      .then(response => response.json())
  }

  subtractItem(delivery_id, item) {
    let formData = {
      item: item,
      patch_value: "sub"
    };
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    return fetch(`http://localhost:3000/deliveries/${delivery_id}`, configObj)
      .then(response => response.json())
  }

  deliver(delivery_id) {
    let formData = {
      patch_value: "toggle"
    };
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    return fetch(`http://localhost:3000/deliveries/${delivery_id}`, configObj)
      .then(response => response.json())
  }

  destroyDelivery(delivery_id) {
    return fetch(`http://localhost:3000/deliveries/${delivery_id}`, {method: "DELETE"})
      .then(response => response.json())
  }
}
