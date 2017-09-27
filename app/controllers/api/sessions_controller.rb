class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login_user!(@user)
      # After the user session is created we go to see his transactions
      redirect_to api_v1_users_current_url
    else
      render(
        json: ["Invalid email/password combination"],
        status: 401
      )
    end
  end

  def destroy
    @user = current_user
    if @user
      logout_user!
      render "api/users/show"
    else
      render(
        json: ["No one is signed in"],
        status: 404
      )
    end
  end
end
