class SessionController < ApplicationController
  skip_before_action :authenticate

  def create
    auth_user = User.find_and_authenticate(params[:username], params[:password])

    if auth_user
      render json: auth_user.to_json.merge({ token: auth_user.token }), status: 201
    else
      render json: { errors: ["Wrong username/password combination"] }, status: 422
    end
  end
end
