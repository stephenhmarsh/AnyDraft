class AddColorToAuthorships < ActiveRecord::Migration
  def change
  	add_column :authorships, :color, :string
  end
end
