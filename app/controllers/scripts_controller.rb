class ScriptsController < ApplicationController

	before_action :ensure_authorized_writer, only: [:show]

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

	def ensure_authorized_writer
		@script = Script.find(params[:id])
		if !@script.users.include?(current_user)
			redirect_to root_path
		end
	end

end