class API::CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_photo, only: [:index]
  before_action :set_comments, only: [:index]

  def index
    render json: @comments.order(created_at: :desc).limit(5).offset(0)
  end

  def create
    @comment = current_user.photos.comments.new(comment_params)

    if @comment.save
      render json: { message: "201 Created" }, status: :created
    else
      render json: { message: "400 Bad Request" }, status: :bad_request
    end
  end

private

# The command below finds the photo based on the ID that you put through the browser

  def set_photo
    @photo = Photo.find_by(id: params[:photo_id])
    if @photo.nil?
      render json: "Photo with id #{params[:photo_id]} not found", status: 404
    end
  end

# The command below sets the index function so that it knows its looking for comments that are connected to certain photo

  def set_comments
    @comments = @photo.comments
  end

  def comment_params
    params.require(:comment).permit(:text)
  end
end
