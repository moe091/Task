module HomeHelper

	def format_due_date(task) 
		if (task.end_date)
			return task.end_date.strftime("Due on %m/%d/%y")
		else
			return task.start_date.strftime("Started on %m/%d/%y")
		end
	end

	def format_date(date) 
		return date.strftime("%m/%d/%y")
	end







	def task_percentage(task)
		if (task.goal && task.goal > 0)
			percent = ((task.completed.to_f / task.goal) * 100).to_i
			if percent > 100
				percent = 100
			end
			return percent
		else 
			return "N/A"
		end

	end

	def ending(task)
		if (task.end_date)
			hours = (((task.end_date - DateTime.now) / 1.hour).round)
			days = ((task.end_date - DateTime.now) / 1.day).round


			if hours < 24
				return hours.to_s + " Hours"
			else
				return days.to_s + " Days, " + (hours % 24).to_s + " Hours"
			end
		else
			return "None"
		end
	end



	def format_minutes(minutes)
		hours = minutes / 60
		mins = minutes % 60

		return format("%02d:%02d", hours, mins)
	end

	def format_elapsed(start, end_time) 
		puts "\n\n\n\n\n\n------------------"
		puts "start - " + start.to_s;
		puts "end - " + end_time.to_s;
		minutes = (end_time - start) / 1.minute
		days = minutes / 1440
		hours = (minutes % days) / 60
		mins = minutes % 60
		return format("%2d Days, %02d Hours, %02d Minutes", days, hours, mins)
	end

	def sort_percentage(tasks) 
		tasks.sort{|a, b| task_percentage(a) <=> task_percentage(b)}
	end

	def sort_hours_until_goal(tasks) 
		tasks.sort{|a, b| (a.goal - a.completed) <=> (b.goal - b.completed)}
	end

	def sort_timeleft(tasks)
		
	end

end




def sort_ending(tasks)
	tasks.sort{|a, b| a.end_date <=> b.end_date}
end

def sort_created(tasks)
	tasks.sort{|a, b| b.created_at <=> a.created_at}
end






