Rails.application.routes.draw do
  scope '/api' do
    post '/session', to: 'session#create'

    get '/messages', to: 'messages#index'
    post '/messages', to: 'messages#create'

    get '/users/me', to: 'users#me'
  end
end
