class AddRecurringToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :recurring, :boolean, :default => false
  end
end
