class ScriptsController < ApplicationController

	def index
	end

	def show
		@script = Script.find(params[:id])
		@writers = @script.users
	end

	def new 
	end

	def create
		@user = current_user
		@script = Script.new(script_params)
		@script.save!
		authorship = Authorship.new(user_id: @user.id, script_id: @script.id)
		authorship.save!
		redirect_to @script
	end

	def edit
	end

	def update
	end

	def destroy
	end

	private
	def script_params
		params.require(:script).permit(:title)
	end

end