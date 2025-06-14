# Munchora 👩‍🍳 🧑‍🍳

`Munchora – munch + aura; sounds premium and unique`

<br>

---

## Tech Stack

This full stack webapp is builded in the following way:

### Client

[React Router v7](https://reactrouter.com/start/framework/installation)

### Backend

`Ruby` with `Ruby on Rails` as webframework.

Using _dot-env_ for secrets -> add `gem 'dotenv-rails', groups: [:development, :test]` to `Gemfile` and run `bin/bundle install`.

And since not relying on default dot-env name but `.env.dev` add this to `config/application.rb`:

```ruby
require 'dotenv'

Dotenv.load('.env.dev') if Rails.env.development?

```

<br>

---

### Configuring Postgresql

Add _pg_ to `Gemfile`

```ruby
# Use PostgreSQL in dev and prod
gem "pg", group: [:development, :production]

# Use SQLite only for testing
gem "sqlite3", group: [:test]
```

After updating `Gemfile` run `bin/bundle install`

To create the _postgresdb_ execute following: `bin/rails db:create db:migrate`
Which should output the following:

```bash
bin/rails db:create db:migrate
Created database 'munchora'
Created database 'db/test.sqlite3'
```

<br>

---

### Active Records

**User**
_Users_ can either signup manually or by _OAuth_

```bash
bin/rails generate model User fullname:string email:string provider:string uid:string password_digest:string image_src:string --primary_key_type=uuid
```

Ensure to add the following to make the UUID work:

```ruby
# Add this to createUsers migration
enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
```

Using Gem `bcrypt` -> when you assign to `user.password`, it automatically hashes the password using bcrypt and stores it in the password_digest column.

---

**Recipe**

```bash
bin/rails generate model Recipe title:string instructions:text created_by:references
```

Edit the generated migration file to reference the _users_table_:

```ruby
t.references :created_by, null: false, foreign_key: { to_table: :users }
```

**UserRecipe**

```bash
bin/rails generate model UserRecipe user:references recipe:references
```

**Ingredient**

```bash
bin/rails generate model Ingredient name:string unit:string
```

**GroceryList**

```bash
bin/rails generate model GroceryList name:string user:references
```

<br>

---

### Authentication / Authorization JWT

Using _JWT_ and Auth helpers as middlewares

Add `jwt` to `Gemfile`

Add the needed files

```bash
# auth_controller for login
touch app/controllers/api/v1/auth_controller.rb
touch app/services/json_web_token.rb
```

<br>

Add _login post_ route to `confi/routes.rb`

```ruby
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :update, :destroy]
      post '/login', to: 'auth#login'
    end
  end
```

<br>

**Add JWT helper logic service**

```ruby
# Add this to /app/services/json_web_token.rb
class JsonWebToken
  SECRET_KEY = Rails.application.secret_key_base

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError
    nil
  end
end
```

<br>

**Add to ApplicationController authenticate_user!**
This works as a middleware everytime its called requests needs to habe auth header with valid JWT.

```ruby
# Add this to /app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  def authenticate_user!
    header = request.headers['Authorization']
    token = header.split(' ').last if header.present?

    decoded = JsonWebToken.decode(token)
    @current_user = User.find_by(id: decoded[:user_id]) if decoded

    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
  end
end
```

<br>

**AuthController with login endpoint**

```ruby
# Add this to /app/controllers/api/v1/auth_controller.rb
class Api::V1::AuthController < ApplicationController
  include ActionController::Cookies

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      puts token
      # Set JWT as HttpOnly cookie
      cookies[:jwt_auth] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax,
        expires: 24.hours.from_now
      }

      render json: { user: user }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
end
```

<br>

**UsersController example (authenticated route)**

```ruby
class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show, :update, :destroy]

# .....
```
