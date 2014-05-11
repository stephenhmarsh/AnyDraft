# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

test_script_1 = Script.create(title: "Test Script 1")
test_script_2 = Script.create(title: "Test Script 1")
authorship_test_1 = Authorship.create(user_id: 1, script_id: test_script_1.id)
authorship_test_2 = Authorship.create(user_id: 1, script_id: test_script_2.id)