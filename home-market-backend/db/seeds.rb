# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


farmers = [
  ["Jack Ma"],
  ["Larry Page"],
  ["Mark Zuckerberg"],
  ["Ray Dalio"],
  ["Mark Delgado"]
]


delivery = [
  ["123 Fake Address", 5, 0, 4],
  ["231 Fake Address", 4, 3, 2],
  ["447 Fake Address", 2, 4, 5],
  ["567 Fake Address", 5, 1, 2],
  ["777 Fake Address", 1, 5, 1]
]
farmers.each do |farmer|
  Farmer.create(name: farmer[0])
end

delivery.each do |delivery|
  Delivery.create(delivery_address: delivery[0], eggs: delivery[1], fruits: delivery[2], vegetables: delivery[3], farmer_id: rand(1...5))
end
