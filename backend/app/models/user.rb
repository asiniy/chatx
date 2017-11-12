class User < ApplicationRecord
  has_secure_password

  def self.find_and_authenticate(username, password)
    user = User.find_by(username: username)

    return false unless user

    user.authenticate(password)
  end

  def to_json
    {
      id: self.id,
      username: self.username,
      first_name: self.first_name,
      last_name: self.last_name,
      token: self.token,
    }
  end
end
