class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')


    create_table :users, id: :uuid do |t|
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
