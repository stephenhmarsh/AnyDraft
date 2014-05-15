class ChangePositionToParentOnLinesTable < ActiveRecord::Migration
  def change
  	rename_column :lines, :position, :parent
  end
end
