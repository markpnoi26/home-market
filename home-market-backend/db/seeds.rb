# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


farmers = [
  ["Jack Ma", "Alibaba"],
  ["Larry Page", "Google"],
  ["Mark Zuckerberg", "Facebook"],
  ["Ray Dalio", "Bridgewater Associates"],
  ["Mark Delgado", "The Next Big Thing"]
]


delivery = [
  ["123 Fake Address", "Not Delivered", 5, 0, 4],
  ["231 Fake Address", "Not Delivered", 4, 3, 2],
  ["447 Fake Address", "Not Delivered", 2, 4, 5],
  ["567 Fake Address", "Not Delivered", 5, 1, 2],
  ["777 Fake Address", "Not Delivered", 1, 5, 1]
]
farmers.each do |farmer|
  Farmer.create(name: farmer[0], farm_name: farmer[1])
end

delivery.each do |delivery|
  Delivery.create(delivery_address: delivery[0], status: delivery[1], eggs: delivery[2], fruits: delivery[3], vegetables: delivery[4], farmer_id: rand(1...5))
end
