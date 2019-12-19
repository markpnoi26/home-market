class CreateDeliveries < ActiveRecord::Migration[6.0]
  def change
    create_table :deliveries do |t|

      t.string :delivery_address
      t.string :status
      t.integer :eggs
      t.integer :fruits
      t.integer :vegetables
      t.integer :farmer_id

      t.timestamps
    end
  end
end
