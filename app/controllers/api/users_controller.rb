class Api::UsersController < ApplicationController
  # Not sure if this SQL query will work correct later if its wrong
  def show
    from = Transaction.where("from_user_id = ?", current_user.id.to_s).sum(:num_credits)
    to = Transaction.where("to_user_id = ?", current_user.id.to_s).sum(:num_credits)
    total = to - from + 1000
    # I AM JUST ADDING 1000 HERE SO THAT THE NUMBERS WILL STAY POSITIVE
    # THIS IS ASSSUMING THAT ALL USERS START WITH 1000 OF SEED MONEY
    # lock the current user to prevent race conditions in making transactions is very
    # very important to prevent money loss.
    current_user.with_lock do
      if current_user.update_attribute(:balance, total)
        @user = current_user
        render :show
      else
        render json: current_user.errors.full_messages
      end
    end
  end

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
