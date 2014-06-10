class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

	has_many :authorships
	has_many :scripts, through: :authorships
	has_many :lines

	def calculate_lines_length(script)
		relevant_lines = Line.where("script_id = ? AND user_id = ?", script.id, self.id)
		total_length = 0
		relevant_lines.each do |line|
			words = line.content.split(' ')
			total_length += words.length
		end
		return total_length
	end

	def calculate_script_contribution(script)
		total_script_words = 0
		script.users.each do |writer|
			total_script_words += writer.calculate_lines_length(script)
		end
		given_user_words = self.calculate_lines_length(script)
		result = ((given_user_words.to_f / total_script_words.to_f) * 10000.0).round / 100.0
		return result
	end

end
