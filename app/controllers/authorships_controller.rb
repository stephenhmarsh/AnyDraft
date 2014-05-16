class AuthorshipsController < ApplicationController

	def create
		if @user = User.find_by(email: params[:email])
			@script = Script.find(params[:script_id])
			authorship = Authorship.new(script: @script, user: @user, color: "lightgreen")
			if authorship.save! 
				redirect_to edit_script_path(@script)
			end
		else
			#error
		end
	end

	def update
		@authorship = Authorship.find(params[:id])
		@authorship.color = params[:color]
		if @authorship.save
				redirect_to edit_script_path(@authorship.script)
		end
	end

	def destroy
	end

	private
	def authorship_params
		params.require(:authorship).permit(:email, :script_id, :color)
	end

end