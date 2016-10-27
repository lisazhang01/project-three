class HomesController < ApplicationController

  def index
    # @photo = Photo.new
    # @photos = Photo.all
    render '/homes/index'
  end
end
