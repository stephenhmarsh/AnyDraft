class LinesController < ApplicationController

	respond_to :json

	def index
		@script = Script.find(params[:script_id])
		@lines = @script.lines.sort_by &:position
		respond_with @lines
	end

	def show
		@script = Script.find(params[:script_id])
		@lines = @script.lines.find(params[:id])
	end

	def new
		@script = Script.find(params[:script_id])
	end

	def create
		@user = current_user
		@script = Script.find(params[:script_id])
		@line = Line.new(line_params)
		@line.user = @user
		@line.script = @script

		@line.user_color = @line.get_user_line_color
		@line.content_type = @line.fountain_type

		if @line.save!
			respond_to do |format|
				format.json {render :show}
			end
		end
	end

	def update
		@user = current_user
		@line = Line.find(params[:id])
		@line.user = current_user
		@line.save
		@line.user_color = @line.get_user_line_color

		@line.content_type = @line.fountain_type
		@line.save
		if @line.update(line_params)
			respond_with @line
		end
	end

	def destroy
		@script = Script.find(params[:script_id])
	end

	private
	def line_params
	params.require(:line).permit(:content, :id, :position)
	end
end