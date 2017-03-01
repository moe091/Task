class AddTimeToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :start_date, :datetime
    add_column :tasks, :end_date, :datetime
    add_column :tasks, :goal, :integer
    add_column :tasks, :completed, :integer
  end
end
