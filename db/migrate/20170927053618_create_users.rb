class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.integer :balance, default: 1000
      t.timestamps null: false
    end
    add_index :users, :email
  end
end
