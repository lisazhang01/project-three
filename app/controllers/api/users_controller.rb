class API::UsersController < ApplicationController

  before_action :authenticate_user!
  before_action :set_users, only: [:index]
  before_action :set_user, only: [:show, :update]
  before_action :set_my_photos, only: [:show_my_photos]

  def index
    render json: @users
  end

  def show
    render json: @user
  end

  def update
    @user.assign_attributes(user_params)

    if @user.save
      head 201
    else
      render json: { message: "User doesn't exist" }, status: 404
    end
  end

  def show_my_photos
    render "show_my_photos"
  end

  def show_me
    render json: current_user
  end

private
  def set_users
    @users = User.all

    if @users.nil?
      render json: "No users found", status: 404
    end
  end

  def set_user
    @user = User.find_by(id: params[:id])

    if @user.nil?
      render json: "User not found", status: 404
    end
  end

  def set_my_photos
    @my_photos = current_user.photos

    if @my_photos.nil?
      render json: "User not found", status: 404
    end
  end

  def user_params
    params.permit(:name, :nickname, :bio, :image)
  end
end
