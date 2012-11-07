class User < ActiveRecord::Base
  attr_accessible :auth_secret, :name
end
