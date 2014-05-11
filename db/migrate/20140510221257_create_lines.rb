class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
    	t.integer :user_id
    	t.integer :script_id
    	t.text :content
    	t.string :content_type
    	t.integer :character_name
    	t.integer :character_id
    	t.integer :scene_id
    	t.integer :position
    end
  end
end
