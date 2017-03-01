class SessionsController < ApplicationController
  before_filter :set_session, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @sessions = Session.all

    respond_with(@sessions)
  end

  def show
    respond_with(@session)
    @task = Task.find(params[:id])
    render :layout => false
  end

  def new
    @session = Session.new
    respond_with(@session)
  end

  def edit
  end

  def create
    @session = Session.new(params[:session])
    respond_with(@session)
  end

  def update
    @session.update_attributes(params[:session])
    respond_with(@session)
  end

  def destroy
    @session.destroy
    respond_with(@session)
  end

  private
    def set_session
      @session = Session.find(params[:id])
    end
end
