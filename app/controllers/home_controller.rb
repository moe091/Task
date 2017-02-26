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

  def start_timer
    @duration = @duration
    @start = params[:start]
    @end = params[:end]
  end


  def end_session
    20.times do |t|
      puts ("-" * t)
    end
    @task_id = params[:task_id]
    @duration = params[:duration]
    @start = params[:start]
    @end = params[:end]
    task = Task.find(params[:task_id])
    puts "completed - before " + task.completed.to_s
    task.completed = task.completed + (@duration.to_i)
    task.save
    puts "completed - after " + task.completed.to_s
    puts params
    puts " "
    puts @task_id
    puts @duration
    puts @start
    puts @end
    puts ((@end.to_i - @start.to_i))
    puts "\n-----"
    puts "completed - find " + Task.find(params[:task_id]).completed.to_s
    @t = Task.find(@task_id)
    puts @t.get_percentage
    @percent = @t.get_percentage

    respond_to do |format|
      format.json {render json: {:task => @t, :percent => @percent}}
    end

  end

  def show

  end
end
