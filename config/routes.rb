Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  get "/api/v1/users/current", to: "api/users#show"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :index]
    resource :session, only: [:create, :destroy]
    resources :transactions, only: [:new, :create]
  end
end
