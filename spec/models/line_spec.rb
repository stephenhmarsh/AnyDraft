require "spec_helper"

describe Line do

	before(:each) do
		@user_1 = User.create(email: "test_1@test.com", password: "qwerty1234", password_confirmation: "qwerty1234")
		@user_2 = User.create(email: "test_2@test.com", password: "qwerty1234", password_confirmation: "qwerty1234")
		@script = Script.create(title: "Awesome Test Script")
		@authorship = Authorship.create(script: @script, user: @user_1, color: "lightpink")
		@authorship_2 = Authorship.create(script: @script, user: @user_2, color: "lightgreen")
		@line_0 = Line.create(user: @user_1, script: @script, content: "INT. GA - DAY", position: 0)
		@line_1 = Line.create(user: @user_1, script: @script, content: "", position: @line_0.id)
		@line_2 = Line.create(user: @user_2, script: @script, content: "Some action description.", position: @line_1.id)
		@line_3 = Line.create(user: @user_1, script: @script, content: "STEPHEN", position: @line_2.id)
		@line_4 = Line.create(user: @user_1, script: @script, content: "(Writes Tests)", position: @line_3.id)
		@line_5 = Line.create(user: @user_1, script: @script, content: "It's gonna work.", position: @line_4.id)
		@line_6 = Line.create(user: @user_1, script: @script, content: "CUT TO:", position: @line_5.id)
		@line_7 = Line.create(user: @user_1, script: @script, content: "CUT TO:", position: @line_6.id)
		@line_8 = Line.create(user: @user_1, script: @script, content: "CUT TO:", position: @line_7.id)


		@line_7.update(position: @line_8.id)
		@line_8.update(position: @line_6.id)
	end

	describe "initialized in before(:each)" do
		it ("has been a position") do
			expect(@line_2.position).to eq(@line_1.id)
		end
	end

	describe "#can set an appropriate line color based on authorship)" do
		it ("should correctly set the right color") do
			expect(@line_0.get_user_line_color).to eq("lightpink")
			expect(@line_2.get_user_line_color).to eq("lightgreen")
		end
	end

	describe "#can interpret line content types" do
	  it "should correclty recognize and a SCENE HEADING" do
	    expect(@line_0.fountain_type).to eq("scene_heading");
	  end
	  it "should correclty recognize and a BLANK LINE" do
	    expect(@line_1.fountain_type).to eq("blank_line");
	  end
	  it "should correclty recognize ACTION" do
	    expect(@line_2.fountain_type).to eq("action");
	  end
	  it "should correclty recognizes a CHARACTER" do
	    expect(@line_3.fountain_type).to eq("character");
	  end
	  it "should correclty recognizes a TRANSITION" do
	    expect(@line_6.fountain_type).to eq("transition");
	  end
	  it "should correclty recognizes a PARANTHETICAL" do
	  	@line_3.content_type = @line_3.fountain_type
	  	@line_3.save()
	    expect(@line_4.fountain_type).to eq("paranthetical");
	  end
	  it "should correclty recognizes a DIALOGUE" do
	  	@line_3.content_type = @line_3.fountain_type
	  	@line_3.save()
	  	@line_4.content_type = @line_3.fountain_type
	  	@line_4.save()
	    expect(@line_5.fountain_type).to eq("dialogue");
	  end
	end

	 describe "parent position mapping" do
		it ("has a position") do
			expect(@line_2.position).to eq(@line_1.id)
		end
		it ("can find the position of the line before it - aka parent's parent") do
			expect(@line_8.parents_parent).to eq(@line_5.id)
		end

	end
end

