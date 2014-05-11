class CreateScriptsUsers < ActiveRecord::Migration
  def change
    create_table :scripts_users do |t|
    	t.belongs_to :script
    	t.belongs_to :user
    end
  end
end
