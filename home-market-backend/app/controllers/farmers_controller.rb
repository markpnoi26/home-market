class FarmersController < ApplicationController

  def index
    farmers = Farmer.all
    render json: farmers
  end

  def show
    farmer = Farmer.find_by_id(params[:id])
    render json: farmer
  end

  def create
  end

  def update
  end

  def update
  end

end
