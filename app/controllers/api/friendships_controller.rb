class API::FriendshipsController < ApplicationController

  before_action :authenticate_user!
  before_action :friend_params, only: [:create]
  before_action :set_friendship, only: [:destroy]

  def index
    render json: current_user.friends
  end

  def create
    @friendship = current_user.friendships.new(friend_params)

    if @friendship.save
      head 201
    else
      render json: {message: 'Friendship cannot be saved'}, status: 404
    end
  end

  def destroy
    if @friendship.destroy
      head 201
    else
      render json:  {message: 'Friend cannot be found'}, status: 404
    end
  end

private
  def set_friendships
    @friendships = current_user.friends
    if @friendships.nil?
      render json: "You have no friends =(", status: 404
    end
  end

  def set_friendship
    @friendship = Friendship.find_by(id: params[:id])

    if @friendship.nil?
      render json: "Friend cannot be found", status: 404
    end
  end

  def friend_params
    params.require(:friendship).permit(:friend_id)
  end

end
