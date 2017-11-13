class UsersController < ApplicationController
  def me
    render json: current_user.to_json
  end
end
