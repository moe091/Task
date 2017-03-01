class Session < ActiveRecord::Base
  belongs_to :task
  attr_accessible :duration, :end, :start, :note

  after_save :update_completed

  def update_completed
  	complete = 0
  	task.sessions.each do |session|
  		puts "duration:"
  		puts session.duration
  		complete+= session.duration
  	end
  	task.completed = complete / 60
  	puts ""
  	puts ""
  	puts ""
  	puts "\n\n\n\n\n\n\n\n\n\n"
  	puts "completed: "
  	puts task.completed
  	puts task.name
  	task.save
  end
end
