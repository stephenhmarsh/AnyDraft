class ChangeParentBackToPosition < ActiveRecord::Migration
  def change
  		rename_column :lines, :parent, :position
  end
end
