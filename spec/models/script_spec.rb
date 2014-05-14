require "spec_helper"

describe Script do

	describe "#script contribution calculator" do

		before(:each) do
		@user_1 = User.create(email: "test_1@test.com", password: "qwerty1234", password_confirmation: "qwerty1234")
		@user_2 = User.create(email: "test_2@test.com", password: "qwerty1234", password_confirmation: "qwerty1234")
		@script = Script.create(title: "Awesome Test Script")
		@authorship = Authorship.create(script: @script, user: @user_1, color: "lightpink")
		@authorship_2 = Authorship.create(script: @script, user: @user_2, color: "lightgreen")
		@line_0 = Line.create(user: @user_1, script: @script, content: "INT. GA - DAY", position: 0)
		@line_1 = Line.create(user: @user_1, script: @script, content: "", position: 1)
		@line_2 = Line.create(user: @user_2, script: @script, content: "Some action description.", position: 2)
		@line_3 = Line.create(user: @user_1, script: @script, content: "STEPHEN", position: 3)
		@line_4 = Line.create(user: @user_1, script: @script, content: "(Writes Tests)", position: 4)
		@line_5 = Line.create(user: @user_1, script: @script, content: "It's gonna work.", position: 5)
		@line_6 = Line.create(user: @user_1, script: @script, content: "CUT TO:", position: 6)
	end

	  it "should do nothing" do
	    expect("nothing").to eq("nothing");
	  end

	  it "should tell you who contributed what percentage to a script" do

	  end

	end

end