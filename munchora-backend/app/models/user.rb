class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, if: -> { provider.blank? }

  validates :fullname, presence: true

  # If provider is present, uid must be present (for OAuth)
  validates :uid, presence: true, if: -> { provider.present? }
  validates :provider, presence: true, if: -> { uid.present? }

  # For manual signup (no provider), password must be present on create
  has_secure_password validations: false
  validates :password, presence: true, length: { minimum: 6 }, if: -> { provider.blank? }, on: :create

  validates :image_src, format: URI::regexp(%w[http https]), allow_blank: true

  # Dont want to return password_digest
  def as_json(options = {})
    super({ except: [:password_digest] }.merge(options))
  end
end