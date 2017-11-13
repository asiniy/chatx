class Message < ApplicationRecord
  belongs_to :user

  validates :body, presence: true

  def to_json()
    {
      id: self.id,
      body: self.body,
      user: self.user.to_json,
      created_at: self.created_at,
    }
  end
end
