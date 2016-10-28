class API::PhotolikesController < ApplicationController

  before_action :authenticate_user!
  before_action :set_photolikes, only: [:index]
  before_action :set_photolike, only: [:show, :destroy]
  before_action :photolike_params, only: [:create]

  def index
    render json: @photolikes
  end

  def create
    @photolike = current_user.photolikes.new(photolike_params)

    if @photolike.save
      head 201
    else
      render json: {message: 'Like cannot be saved'}, status: 404
    end
  end

  def destroy
    if @photolike.destroy
      head 201
    else
      render json:  {message: 'Like cannot be found'}, status: 404
    end
  end

private
  def set_photolikes
    @photolikes = Photolike.where(photo_id: params[:id])

    if @photolikes.nil?
      render json: "No likes", status: 404
    end
  end

  def set_photolike
    @photolike = Photolike.find_by(id: params[:id])

    if @photolike.nil?
      render json: "No like", status: 404
    end
  end

  def photolike_params
    params.require(:photolike).permit(:photo_id)
  end
end