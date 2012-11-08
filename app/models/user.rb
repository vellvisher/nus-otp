class User < ActiveRecord::Base
  attr_accessible :auth_secret, :name, :token
  before_validation :assignAuthSecret, :on => :create
  def assignAuthSecret
      self.auth_secret = ROTP::Base32.random_base32
  end
end
