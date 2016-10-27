Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    resources :photos, only: [:index, :show, :create, :update, :destroy] do
      resources :comments, only: [:index, :create, :update, :delete]
    end
  end

  resources :homes, only: [:index]

  resources :photos, only: [:index, :show, :create, :update, :destroy]
end

