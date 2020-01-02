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

  populateDeliveryCard = () => {
    let delivered = document.getElementById("deliveries");
    let deliveryDiv = document.createElement("div")
    deliveryDiv.setAttribute('delivery-id', this.id)
    deliveryDiv.innerHTML =
    `Delivery to: ${this.delivery_address}
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
            deliveryDiv.querySelectorAll("span")[3].innerHTML = `${value}`;
          })
      } else if (e.target === deliveryDiv.querySelectorAll("button")[7]) {
        this.destroyDelivery(this.id)
          .then(value => {
            deliveryDiv.innerHTML = `${value.message}`
          })
      }
    })
  }

  addItem = (delivery_id, item) => {
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

  subtractItem = (delivery_id, item) => {
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

  deliver = (delivery_id) => {
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

  destroyDelivery = (delivery_id) => {
    return fetch(`http://localhost:3000/deliveries/${delivery_id}`, {method: "DELETE"})
      .then(response => response.json())
  }
}
