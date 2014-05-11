class CreateScripts < ActiveRecord::Migration
  def change
    create_table :scripts do |t|
    	t.string :title
    end
  end
end
