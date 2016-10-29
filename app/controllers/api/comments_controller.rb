class API::CommentsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_photo
  before_action :set_comments
  before_action :set_comment, only: [:update, :destroy]

  def index
    render json: @comments.order(created_at: :desc).limit(5).offset(0)
  end

  def create
    @comment = @comments.new(comment_params)
    @comment.assign_attributes(user_id: current_user.id)
    @comment.assign_attributes(photo_id: @photo.id)

    if @comment.save
      head 201
    else
      render json: { message: "400 Bad Request" }, status: :bad_request
    end
  end

  def update
    @comment.assign_attributes(comment_params)

    if @comment.save
      head 201
    else
      render json: { message: "400 Bad Request" }, status: :bad_request
    end
  end

private

# The command below finds the photo based on the ID that you put through the browser

  def set_photo
    @photo = Photo.find_by(id: params[:photo_id])
    if @photo.nil?
      render json: {message: "Photo with id #{params[:photo_id]} not found"}, status: 404
    end
  end

  def set_comment
    @comment = @photo.comments.find_by(id: params[:id])
    if @comment.nil?
      render json: {message: "Comment with id #{params[:id]} not found"}, status: 404
    end
  end

# The command below sets the index function so that it knows its looking for comments that are connected to certain photo

  def set_comments
    @comments = @photo.comments
  end

  def comment_params
    params.permit(:text)
  end
end
