class FarmersController < ApplicationController

  #no need for serialization, not complicated enough
  
  def index
    farmers = Farmer.all
    render json: farmers, include: :deliveries
  end

  def show
    farmer = Farmer.find_by_id(params[:id])
    render json: farmer, include: :deliveries
  end

  def create
    farmer = Farmer.create(name: params[:name])
    render json: farmer, include: :deliveries
  end

  def update
  end

  def destroy
  end

end
