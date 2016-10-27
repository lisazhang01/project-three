class PhotosController < ApplicationController

    def index
      @photo = Photo.new
    end

end
