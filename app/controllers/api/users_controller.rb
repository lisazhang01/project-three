class API::UsersController < ApplicationController

  before_action :authenticate_user!
  before_action :set_users, only: [:index]
  before_action :set_user, only: [:show]

  def index
    render json: @users
  end

  def show
    render json: @user
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
end
