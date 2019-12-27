class FarmerCard {
  constructor (name, id, deliveries) {
    this.name = name;
    this.id = id;
    this.deliveries = deliveries;
  }

  createFarmerCard() {
    let card = document.getElementById("farmer-card");
    card.innerHTML =`<div></div><div></div>`;
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
        // console.log(this)
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
    const deliveryCard = document.getElementById('farmer-card');
    const deliveryCardId = deliveryCard.getAttribute('farmer-id')
    // console.log(deliveryCardId)
    // farmer needs to be added here because this bugs out, referring to another object.
    let formData = {
      address: address,
      farmer_id: deliveryCardId,
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
        let newDelivery = new DeliveryCard(delivery.id, delivery.delivery_address, deliveryCardId, delivery.eggs, delivery.vegetables, delivery.fruits, delivery.delivered);
        newDelivery.populateDeliveryCard();
      })
  }
}
