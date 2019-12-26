class DeliveriesController < ApplicationController

  def create
    delivery = Delivery.create(delivery_address: params[:address], farmer_id: params[:farmer_id])
    render json: delivery
  end

  def update
    delivery = Delivery.find_by_id(params[:id])
    if params[:patch_value] == "add"
      delivery[params[:item]] = delivery[params[:item]] + 1
      delivery.save
      render json: delivery[params[:item]]
    end

    if params[:patch_value] == "sub"
      delivery[params[:item]] = delivery[params[:item]] - 1
      delivery.save
      render json: delivery[params[:item]]
    end

    if params[:patch_value] == "toggle"
      if delivery[:delivered] == true
        delivery[:delivered] = false
      else
        delivery[:delivered] = true
      end
      delivery.save
      render json: delivery[:delivered]
    end
  end

  def destroy
    delivery = Delivery.find_by_id(params[:id])
    delivery.destroy
    render json: {message: "Delivery Has Been Successfully Deleted."}
  end

end
