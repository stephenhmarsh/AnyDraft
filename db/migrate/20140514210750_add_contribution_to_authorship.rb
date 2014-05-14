class AddContributionToAuthorship < ActiveRecord::Migration
  def change
  	add_column :authorships, :contribution, :integer
  end
end
