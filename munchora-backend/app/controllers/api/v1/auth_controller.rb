class Api::V1::AuthController < ApplicationController
  include ActionController::Cookies

  def me
    authenticate_user!
  
    if current_user
      render json: { user: current_user }
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      puts token
      # Set JWT as HttpOnly cookie
      cookies[:jwt_auth] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax,
        expires: 24.hours.from_now
      }

      render json: { user: user }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def logout
    cookies.delete(:jwt_auth, same_site: :lax)

    render json: { message: 'Logged out successfully' }, status: :ok
  end
end