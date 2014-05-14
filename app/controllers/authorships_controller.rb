class AuthorshipsController < ApplicationController

	def create
		if @user = User.find_by(email: params[:email])
			@script = Script.find(params[:script_id])
			authorship = Authorship.new(script: @script, user: @user)
			if authorship.save! 
				redirect_to edit_script_path(@script)
			end
		else
			#error
		end
	end

	def update
	end

	def destroy
	end

	private
	def authorship_params
		params.require(:authorship).permit(:email, :script_id)
	end

end