require 'rails_helper'

RSpec.describe "sessions/edit", :type => :view do
  before(:each) do
    @session = assign(:session, Session.create!(
      :duration => 1,
      :task => nil
    ))
  end

  it "renders the edit session form" do
    render

    assert_select "form[action=?][method=?]", session_path(@session), "post" do

      assert_select "input#session_duration[name=?]", "session[duration]"

      assert_select "input#session_task[name=?]", "session[task]"
    end
  end
end
