class Transaction < ApplicationRecord
  validates :from_user_id, presence: true
  validates :to_user_id, presence: true
  validates :num_credits, numericality: { greater_than: 0 }
end
