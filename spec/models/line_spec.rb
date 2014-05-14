require "spec_helper"

describe Line do

	before(:all)do
		@user_1 = User.create(email: "test_1@test.com", password: "qwerty1234", password_confirmation: "qwerty1234")
		@script = Script.create(title: "Awesome Test Script")
		@authorship = Authorship.create(script: @script, user: @user_1)
	end

	before(:each) do
		@line_0 = Line.create(user: @user_1, script: @script, content: "INT. GA - DAY", position: 0)
		@line_1 = Line.create(user: @user_1, script: @script, content: "", position: 0)
		@line_2 = Line.create(user: @user_1, script: @script, content: "Some action description.", position: 2)
		@line_3 = Line.create(user: @user_1, script: @script, content: "STEPHEN", position: 3)
		@line_4 = Line.create(user: @user_1, script: @script, content: "Dialogue.", position: 4)
	end

	describe "initialized in before(:each)" do
		it ("has been a position") do
			expect(@line_2.position).to eq(2)
		end
	end

	describe "#can interpret line content types" do
	  it "should correclty recognize and a SCENE HEADING" do
	    expect(@line_0.fountain_type).to eq("scene_heading");
	  end
	  it "should correclty recognize and a BLANK LINE" do
	    expect(@line_1.fountain_type).to eq("blank_line");
	  end
	end
end

