class Api::TransactionsController < ApplicationController
  before_action :require_logged_in

  def create
    transaction_parameters = transaction_params.merge({from_user_id: current_user.id})
    @transaction = Transaction.new(transaction_parameters)
    @transaction.with_lock do
      if !@transaction.save
        render json: @transaction.errors.full_messages, status: 422
      end
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:to_user_id, :num_credits)
  end
end
