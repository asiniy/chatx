class MessagesController < ApplicationController
  def index
    messages_list = Message.limit(100).includes(:user)
    render json: messages_list.map(&:to_json)
  end

  def create
    message = current_user.messages.build(body: params[:message][:body])

    if message.valid?
      message.save!
      render json: message.to_json, status: 201
    else
      render json: { errors: message.errors }, status: 422
    end
  end
end
