require 'rails_helper'

RSpec.describe "sessions/index", :type => :view do
  before(:each) do
    assign(:sessions, [
      Session.create!(
        :duration => 1,
        :task => nil
      ),
      Session.create!(
        :duration => 1,
        :task => nil
      )
    ])
  end

  it "renders a list of sessions" do
    render
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
