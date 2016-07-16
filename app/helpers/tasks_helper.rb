module TasksHelper
	def hours_in_words(hours)
		puts "\n\n\n\n\n\n\n\n\n"
		puts "hours"
		puts hours
		puts "\n\n\n\n\n\n\n\n\n"
		if (hours == nil)
			return "None"
		else
			return distance_of_time_in_words(Time.at(0), Time.at(hours * 3600))
		end
	end

	def longest_session(sessions)
		longest = 0
		sessions.each do |session|
			if session.duration > longest
				longest = session.duration
			end
		end
		longest
	end

	def percent_of_longest(session, longest) #instead use % of average session times 2
		#longest = sessions
		total = 0
		longest.each do |l|
			total = total + l.duration
		end
		total = total / longest.size
		#(session.duration.to_f / longest) * 100
		(session.duration.to_f / (total * 2)) * 100
	end

	def seconds_in_time(seconds)
		hours = seconds / 3600
		mins = (seconds / 60) % 60

		return format("%02d:%02d:%02d", hours, mins, seconds % 60)
	end

end
