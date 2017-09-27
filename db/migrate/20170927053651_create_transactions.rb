class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.string :from_user_id, null: false
      t.string :to_user_id, null: false
      t.integer :num_credits, null: false
      t.timestamps null: false
    end
    add_index :transactions, :from_user_id
    add_index :transactions, :to_user_id
  end
end
