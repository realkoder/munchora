class Api::V1::AuthController < ApplicationController
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token:, user: }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
end