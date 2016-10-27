class HomesController < ApplicationController

  def index
    @photo = Photo.new
  end
end
