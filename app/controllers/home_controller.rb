class HomeController < ApplicationController
	include HomeHelper
  def home
  	@cur_user = current_user
  	@tasks = case params[:sort]
  	when "name"
  		@cur_user.tasks.order("name")
  	when "ending_in"
  		@cur_user.tasks.order("end_date ASC")
  	when "percentage"
  		sort_percentage(@cur_user.tasks)
  	when "hours_until_goal"
  		sort_hours_until_goal(@cur_user.tasks)
  	else
      @cur_user.tasks if @cur_user
  	end


  end

  def task_table
    puts "TASK _ TABLE"
    @cur_user = current_user
    @tasks = @cur_user.tasks
    render :partial => "table"
  end

  def show

  end
end
