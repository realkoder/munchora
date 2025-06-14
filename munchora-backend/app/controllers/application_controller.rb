class ApplicationController < ActionController::API
  def authenticate_user!
    token = cookies.signed[:jwt_auth]
    decoded = JsonWebToken.decode(token)
    @current_user = User.find(decoded[:user_id])
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end