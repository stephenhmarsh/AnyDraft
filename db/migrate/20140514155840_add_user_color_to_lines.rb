class AddUserColorToLines < ActiveRecord::Migration
  def change
  	add_column :lines, :user_color, :string
  end
end
