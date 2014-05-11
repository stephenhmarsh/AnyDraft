class UsersController < ApplicationController

	def index
		@users = User.all
	end

	def show
		@user = User.find(params[:id])
		@scripts = @user.scripts
		@script = Script.new
	end

	def new
	end

	def create
	end

	def edit
	end

	def update
	end

	def destroy
	end

end