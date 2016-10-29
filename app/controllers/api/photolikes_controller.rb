class API::PhotolikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_photo
  before_action :set_photolike

  def create
    if @photolike.nil?
      @photolike = @photo.photolikes.new(user_id: current_user.id)
      if @photolike.save
        head 201
      else
        render json: {message: 'Like cannot be saved'}, status: 404
      end
    else
      if @photolike.destroy
        head 201
      else
        render json:  {message: 'Like cannot be found'}, status: 404
      end
    end
  end

private
  def set_photo
    @photo = Photo.find_by(id: params[:photo_id])
    if @photo.nil?
      render json: {message: "Photo with id #{params[:photo_id]} not found"}, status: 404
    end
  end

  def set_photolike
    @photolike = @photo.photolikes.find_by(user_id: current_user.id)
  end
end