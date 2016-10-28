class API::PhotoCategoriesController < ApplicationController

  before_action :set_photo, only: [:index, :create]

  def index
    render json: @photo.categories.pluck(:name)
  end

  def create
    @photo.photo_categories.destroy_all

    params[:categories].each do |category_id|
      @photo.photo_categories.create(category_id: category_id)
    end

    if !@photo.photo_categories.nil?
      head 201
    else
      render json: "Error", status: 404
    end
  end

private
  def set_photo
    @photo = Photo.find_by(id: params[:photo_id])
  end
end
