class TasksController < ApplicationController
  before_filter :set_task, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @tasks = Task.all
    respond_with(@tasks)
  end

  def show
    @task = Task.find(params[:id])
    @duration = 1
    respond_with(@task)

  end

  def new
    @task = Task.new
    @cur_user = current_user
    puts "\n\n\n\n\n\n"
    puts "TASK - NEW"
    puts "\n\n\n\n\n\n"
        puts "-"
    puts current_user
    puts "-"
    render :partial => "home/new_task_modal"
  end

  def edit
  end

  def create
    puts "\n\n\n\n\n\n\n\n"
    puts params
    puts "\n\n\n\n\n\n\n\n"

    @task = create_task(params[:task])
    current_user.tasks << @task

    @tasks = current_user.tasks
    render :layout => false
  end

  def update
    @task.update_attributes(params[:task])
    respond_with(@task)
  end

  def destroy
    @task.destroy
    respond_with(@task)
  end


  def start_timer
    @duration = @duration
    @start = params[:start]
    @end = params[:end]
  end

  def create_session
    puts params
    puts "\n\n\n\n\nCREATE SESSION \n\n\n\n"
    @task = Task.find(params[:task_id])
    @session = Session.new(start: Time.at(params[:start].to_i), duration: params[:duration], end: Time.at(params[:end].to_i), note: params[:note])
    Task.find(params[:task_id]).sessions << @session
  end

  def show_sessions
    puts "\n\n\n\n\n\n\n SHOW SESSIONS \n\n\n\n\n\n"
    @task = Task.find(params[:id])
    render :partial => "sessions", :layout => false
  end


  private
    def set_task
      @task = Task.find(params[:id])
    end



    def create_task(params) 
      t = Task.new
      t.completed = 0
      t.name = params[:name]
      t.recurring = params[:recurring]
      t.description = params[:description]
      t.start_date = DateTime.now
      if (params[:has_goal])
        puts "HAS GOAL"
        puts "mins:"
        puts params[:goal_mins]
        puts "\nhours"
        puts params[:goal_hours]
        t.goal = params[:goal_mins].to_i + (params[:goal_hours].to_i * 60)
        puts "goal = "
        puts t.goal
      else
        puts "NO GOAL"
        t.goal = 0
      end

      if (params[:has_period])
        t.end_date = DateTime.now + params[:period_days].to_i.days + params[:period_hours].to_i.hours + params[:period_mins].to_i.minutes
      else          
        t.end_date = 0
      end
      puts "returning goal"
      puts t.goal
      return t
    end
end
