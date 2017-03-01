class Task < ActiveRecord::Base
  belongs_to :user
  has_many :sessions
  attr_accessible :completed, :name, :goal, :time_period, :description
  attr_accessor :period_days, :period_hours, :period_mins, :goal_hours, :goal_mins, :has_goal, :has_period, :recurring, :hours, :minutes, :has_due_date, :timed
  # attr_accessible :title, :body
 
  scope :ending_by, lambda {|time| where("end_date < ?", time)}


  def self.test(id)
  	puts "id: "
  	puts id
  end
  
  def self.update_completed
  	return completed
  end

  def get_percentage
    if (goal && goal > 0)
      return ((completed.to_f / goal) * 100).to_i
    else
      return -1
    end
  end

end
