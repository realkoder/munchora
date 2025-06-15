class AddBioToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :bio, :string, limit: 2000, null: true
  end
end
