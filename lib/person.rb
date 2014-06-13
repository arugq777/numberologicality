class Person
  #include Mongoid::Document
  attr_accessor :name, :birthday, :numbers
  def initialize(name, birthday)
    @name, @numbers = name, {}
    require "date"
    begin
    	@birthday = Date.parse(birthday)
    rescue ArgumentError
      @birthday = Date.today
    end
    Tabulaticate.process(self)
  end
end
