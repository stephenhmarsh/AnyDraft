class LinesController < ApplicationController

	def index
		@script = Script.find(params[:script_id])
		@lines = @script.lines
	end

	def show
		@script = Script.find(params[:script_id])
		@lines = @script.lines.find(params[:id])
	end

	def new
		@script = Script.find(params[:script_id])
	end

	def create
		@script = Script.find(params[:script_id])
	end

	def edit
		@script = Script.find(params[:script_id])
	end

	def update
		@script = Script.find(params[:script_id])
	end

	def destroy
		@script = Script.find(params[:script_id])
	end

end