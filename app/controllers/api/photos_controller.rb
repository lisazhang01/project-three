class API::PhotosController < ApplicationController
  before_action :set_photo, only: [:show, :update, :destroy]
  before_action :set_photos, only: [:index]
  before_action :photo_params, only: [:create, :update]

#Show all photos
  def index
    render json: @photos
  end

#Show one photo
  def show
    render json: @photo
  end

#Upload a new photo
  def create
    @photo = Photo.new(photo_params)

    if @photo.save
      render json: @photo, status: 201, location: [:api, photos_path]
    else
      render json: @photo.errors.messages, status: 400
    end
  end

#Update the description of a photo
  def update
    @photo.assign_attributes(photo_params)

    if @photo.save
      render json: @photo, status: 201, location: [:api, photos_path]
    else
      render json: @photo.errors.messages, status: 400
    end

  end

#Delete a photo and corresponding comments, likes etc
  def destroy
    @photo.destroy
  end

private

  def set_photos
    @photos = Photo.all
    if @photos.nil?
      render json: "No Photos Found"
    end
  end

  def set_photo
    @photo = Photo.find_by(id: params[:id])
    if @photo.nil?
      render json: "Photo with id #{params.id} not found"
    end
  end

  def photo_params
    params.permit(:avatar, :description)
  end

end

