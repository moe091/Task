class AddTimePeriodToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :time_period, :integer
  end
end
