class Script < ActiveRecord::Base

	has_many :authorships
	has_many :users, through: :authorships
	has_many :lines
	
end