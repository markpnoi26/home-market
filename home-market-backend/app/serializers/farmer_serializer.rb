class FarmerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :deliveries
end
