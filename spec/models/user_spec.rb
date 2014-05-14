require "spec_helper"

describe User do
  it "should do nothing" do
    expect("nothing").to eq("nothing");
  end

  describe "it can calculate a users' particular contribution to a script" do

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

	  it "should tell you the length (in words) of a users' lines per script" do
	  	expect(@user_1.lines.length).to eq(6)
	  	expect(@user_2.lines.length).to eq(1)
	  	expect(@user_1.calculate_lines_length(@script)).to eq(12)
	  	expect(@user_2.calculate_lines_length(@script)).to eq(3)
	  end

	  it "should tell you the percentage of the script they contributed" do
	  	expect(@user_1.calculate_script_contribution(@script)).to eq(80)
	  	expect(@user_2.calculate_script_contribution(@script)).to eq(20)
	  end


  end
end