class CreateDeliveries < ActiveRecord::Migration[6.0]
  def change
    create_table :deliveries do |t|

      t.string :delivery_address
      t.integer :eggs
      t.integer :fruits
      t.integer :vegetables
      t.integer :farmer_id
      t.boolean :delivered, default: false

      t.timestamps
    end
  end
end
