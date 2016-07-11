class AddNotToSession < ActiveRecord::Migration
  def change
    add_column :sessions, :note, :string
  end
end
