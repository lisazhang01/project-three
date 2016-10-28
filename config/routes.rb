Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    resources :photos, only: [:index, :show, :create, :update, :destroy] do
      resources :comments, only: [:index, :create, :update, :delete]
    end
    resources :friendships, only: [:index, :create, :destroy]
    resources :users, only: [:index, :show]
    resources :photolikes, only: [:index, :show, :create, :destroy]
    resources :categories, only: [:index]
    resources :photo_categories, only: [:index, :create]
  end

  root "home#index"
  resources :photos, only: [:index, :show, :create, :update, :destroy]
end

