class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :fullname
      t.string :email
      t.string :provider
      t.string :uid
      t.string :password_digest
      t.string :image_src

      t.timestamps
    end
  end
end
