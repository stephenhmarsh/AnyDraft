class Line < ActiveRecord::Base
	belongs_to :script
	belongs_to :user

	def fountain_type
		if /^(INT|EXT|EST|(I|INT)\\.?\\\/(E|EXT)\\.?)[\\.\\-\\s][^\\n]+$/.match(self.content) 
			return "scene_heading"
		elsif /^$/.match(self.content) 
			return "blank_line"
		elsif /^[^a-z]+(\\(cont'd\\))?$/.match(self.content)
			return "character"
		else
			return "unknown_type"
		end
	end

end