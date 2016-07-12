module ApplicationHelper
	def hours_in_words(hours)
		distance_of_time_in_words(Time.at(0), Time.at(hours) * 3600)
	end

	def format_minutes(minutes)
		hours = minutes / 60
		mins = minutes % 60

		return format("%02d:%02d", hours, mins)
	end

	def time_completed(task)
		string = ""
		string = string + format("%02d:%02d", (task.goal - task.completed) / 60, (task.goal - task.completed) % 60);
		string = string + " Hours to go"
		return string
	end
end
