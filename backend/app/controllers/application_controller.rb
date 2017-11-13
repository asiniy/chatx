class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  before_action :authenticate

  def authenticate
    return if current_user
    render json: { errors: ["not authorized"] }, status: 401
  end

  def current_user
    @current_user ||= get_current_user()
  end

  private

  def get_current_user
    return false unless header_token

    user = User.find_by(token: header_token)

    return false unless user

    user
  end

  def header_token
    @header_token ||= request.headers["TOKEN"]
  end
end
