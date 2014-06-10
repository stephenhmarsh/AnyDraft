class ScriptsController < ApplicationController

	before_action :ensure_authorized_writer, only: [:show, :destroy]

	def home
		if user_signed_in?
			@user = current_user
			redirect_to @user
		else
			render :home
		end
	end

	def show
		@script = Script.find(params[:id])
		@authorships = Authorship.where("script_id = ?", @script.id)
		@writers = @script.users
		render layout: "script_show"
	end

	def create
		@user = current_user
		@script = Script.new(script_params)
		@script.save!
		authorship = Authorship.new(user_id: @user.id, script_id: @script.id, color: "lightpink")
		authorship.save!
		redirect_to @script
	end

	def edit
		@script = Script.find(params[:id])
		@authorships = Authorship.where("script_id = ?", @script.id)
	end

	def update
		@script = Script.find(params[:id])
		@script.update(script_params)
			redirect_to @script
	end

	def destroy
		@script = Script.find(params[:id])
		@user = current_user
		if @script.destroy!
			redirect_to @user
		end
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