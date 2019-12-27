class FarmersController < ApplicationController

  #no need for serialization, not complicated enough

  def index
    farmers = Farmer.all
    # render json: farmers, include: :deliveries
    render json: FarmerSerializer.new(farmers)
  end

  def show
    farmer = Farmer.find_by_id(params[:id])
    # render json: farmer, include: :deliveries
    render json: FarmerSerializer.new(farmer)
  end

  def create
    farmer = Farmer.find_or_create_by(name: params[:name])
    # render json: farmer, include: :deliveries
    render json: FarmerSerializer.new(farmer)
  end

  def update
  end

  def destroy
  end

end
