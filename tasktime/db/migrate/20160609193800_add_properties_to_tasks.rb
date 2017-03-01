class AddPropertiesToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :name, :string
    add_column :tasks, :description, :text
  end
end
