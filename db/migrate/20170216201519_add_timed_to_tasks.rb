class AddTimedToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :timed, :boolean
  end
end
