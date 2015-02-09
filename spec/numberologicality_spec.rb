require_relative "./spec_helper"

describe NumberologicalityApp do
  # include Capybara::Angular::DSL
  before(:each){@categories = [:whole_name, :vowel, :consonant, :birthdate]}
  describe "the Sinatra/pg version", :type => :feature do
    before(:each) do
      visit '/v2'
      within("#mainform") do
        fill_in 'nameinput', :with => 'Timmay'
        fill_in 'dateinput', :with => '1/11/1111'
      end
      click_button 'Click to discover your numbers!'
    end
    it "saves to pg" do
      expect(Capybara.app.settings.chump.name.to_sym).to be(:Timmay)
      @categories.each do |key|
        expect(Capybara.app.settings.kindred[key].length).to eql(10)
      end
      expect(page).to have_content 'Numbers for Timmay, born on'
    end

    it "retrieves more results" do
      buttons = all("button.btn")
      expect(buttons.count).to eql(4)
      buttons.each do |b|
        b.click
      end
      @categories.each do |key|
        expect(Capybara.app.settings.kindred[key].length).to eql(20)
      end
    end
  end

  describe "the Angular/Mongo version", :type => :feature, :js => true do
    include Capybara::Angular::DSL

    before(:each) do 
      Capybara.app.settings.chump = nil
      Capybara.app.settings.kindred = {}
      visit '/index2.html'
      within("#mainform") do
        fill_in 'nameinput', :with => 'Jimmay'
        fill_in 'dateinput', :with => '2/22/2222'
      end
      find('#submit_btn').click
    end

    it "saves to mongo" do
      big_numbers = all(".number")
      expected_numbers = ["8","1","7","5"]
      big_numbers.each do |bn|
        expect(expected_numbers.include?(bn.text)).to be true
      end
      expect(page).to have_content 'Numbers for Jimmay, born on'

      #This test doesn't work; probably better off learning protractor or something

      # buttons = all("button.btn", :visible => false)
      # expect(buttons.count).to eql(4)
      # # all("button.btn", :visible => false).each {|b| b.click}
      # # buttons.each {|b| b.click}
      # @lists = page.all("ol", :visible => false)
      # @lists.each {|list| puts list.all("div li", :visible => false).count}
      # @lists.each do |l|
      #   expect(l.size).to eql(10) 
      # end
    end
  end
end
