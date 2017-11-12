Rails.application.routes.draw do
  scope '/api' do
    post '/session', to: 'session#create'
  end
end
