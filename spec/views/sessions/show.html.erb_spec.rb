require 'rails_helper'

RSpec.describe "sessions/show", :type => :view do
  before(:each) do
    @session = assign(:session, Session.create!(
      :duration => 1,
      :task => nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/1/)
    expect(rendered).to match(//)
  end
end
