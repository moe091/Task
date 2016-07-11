class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.datetime :start
      t.datetime :end
      t.integer :duration
      t.belongs_to :task

      t.timestamps
    end
    add_index :sessions, :task_id
  end
end
