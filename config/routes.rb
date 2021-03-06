Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    #gets current_user's photo
    get '/myphotos' => "users#show_my_photos"
    get '/myself' => "users#show_me"

    resources :photos, only: [:index, :show, :create, :update, :destroy] do
      # comments for photo
      resources :comments, only: [:index, :create, :update, :delete]
      # like or dislike photo
      resources :photolikes, only: [:create, :destroy]
      # search/show public accessable users
      resources :users, only: [:index, :show]
    end
    # index/add/delete current_user's friends
    resources :friendships, only: [:index, :create, :destroy]
    # search/show public accessable users
    resources :users, only: [:index, :show, :update]
      # search function to find other users
      get "/users/find_user" => "users#find_user"
    # list of all available categories
    resources :categories, only: [:index]
  end

  root "starts#index"

  resources :homes, only: [:index]
  resources :logins, only: [:index]
  resources :signups, only: [:index]

end
