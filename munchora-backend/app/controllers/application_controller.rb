class ApplicationController < ActionController::API
  
  attr_reader :current_user

  def authenticate_user!
    token = cookies[:jwt_auth]
    return @current_user = nil unless token

    decoded = JsonWebToken.decode(token)
    @current_user = User.find(decoded[:user_id])
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    @current_user = nil
  end
end