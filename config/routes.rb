Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    resources :photos, only: [:index, :show, :create, :update, :destroy]
  end

  resources :homes

  resources :photos, only: [:index, :show, :create, :update, :destroy]
end

