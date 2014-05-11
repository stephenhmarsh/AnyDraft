class RenameScriptsUsersToAuthorships < ActiveRecord::Migration
  def change
  	rename_table :scripts_users, :authorships
  end
end
