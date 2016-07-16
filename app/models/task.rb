class Task < ActiveRecord::Base
  belongs_to :user
  has_many :sessions
  attr_accessible :completed, :name, :goal, :time_period, :description
  attr_accessor :period_days, :period_hours, :period_mins, :goal_hours, :goal_mins, :has_goal, :has_period, :recurring
  # attr_accessible :title, :body
 
  scope :ending_by, lambda {|time| where("end_date < ?", time)}


  def self.test(id)
  	puts "id: "
  	puts id
  end
  
  def self.update_completed
  	return completed
  end
end
