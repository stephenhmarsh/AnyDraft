class Line < ActiveRecord::Base
	belongs_to :script
	belongs_to :user

	def fountain_type
		if /^(INT|EXT|EST|(I|INT)\\.?\\\/(E|EXT)\\.?)[\\.\\-\\s][^\\n]+$/.match(self.content)
			return "scene_heading"
		elsif /[^a-z]*TO:$/.match(self.content)
			return "transition"
		elsif /^[^a-z]+(\\(cont'd\\))?$/.match(self.content)
			return "character"
		end
		# we now have to do a query
		last_line_type = Line.find_by(position: (self.position-1)).content_type

		if last_line_type == "character" || last_line_type == "paranthetical"
			# last line character?
			if /[(].*[)]$/.match(self.content)
				return "paranthetical"
			else
				return "dialogue"
			end
		elsif /^$/.match(self.content) 
			return "blank_line"
		else
			return "action"
		end
	end

end