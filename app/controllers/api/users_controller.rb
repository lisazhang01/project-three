class API::UsersController < ApplicationController

  before_action :authenticate_user!
  before_action :set_users, only: [:index]
  before_action :set_user, only: [:show, :update]

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

  def user_params
    params.permit(:name, :nickname, :bio)
  end
end
