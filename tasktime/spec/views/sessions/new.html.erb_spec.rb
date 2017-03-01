require 'rails_helper'

RSpec.describe "sessions/new", :type => :view do
  before(:each) do
    assign(:session, Session.new(
      :duration => 1,
      :task => nil
    ))
  end

  it "renders new session form" do
    render

    assert_select "form[action=?][method=?]", sessions_path, "post" do

      assert_select "input#session_duration[name=?]", "session[duration]"

      assert_select "input#session_task[name=?]", "session[task]"
    end
  end
end
