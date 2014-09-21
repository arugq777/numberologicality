require 'date'
require 'mongoid'
require 'sinatra/activerecord'

class Person
  attr_accessor :name, :birthday, :numbers
  attr_reader :raw_date_input, :raw_name_input

  def initialize(name, birthday)
    @numbers = {}
    @raw_name_input = name
    @raw_date_input = birthday
    @name = @raw_name_input.gsub(/[^![:alpha:]\s]/, "").gsub(/\s+/, " ").gsub(/!+/, "!")
    begin
    	@birthday = Date.parse(birthday)
    rescue ArgumentError
      @birthday = Date.today
    end
    Tabulaticate.process(self)
  end

  def to_hash
    hashed = {}
    keys = [:name, :raw_name_input, :birthday, :raw_date_input, 
            :whole_name, :vowel, :consonant, :birthdate]
    values = [@name, @raw_name_input, @birthday, @raw_date_input, 
              @numbers[:whole_name], @numbers[:vowel], @numbers[:consonant], @numbers[:birthdate]]
    keys.each_with_index do |k, i|
      hashed[k] = values[i]
    end
    # hashed[:name] = @name
    # hashed[:raw_name_input] = @raw_name_input
    # hashed[:birthday] = @birthday
    # hashed[:raw_date_input] = @raw_date_input 
    # hashed[:whole_name] = @numbers[:whole_name]
    # hashed[:vowel] = @numbers[:vowel]
    # hashed[:consonant] = @numbers[:consonant]
    # hashed[:birthdate] = @numbers[:birthdate]
    hashed
  end

  # def process_view_strings
  #   date = @birthday.strftime("%A, %B %-d %Y")
  # end

  def create_profile(db)
    if db == :mongo
      profile = MongoNumnut.new() 
      self.to_hash.each do |k, v|
        profile[k] = v
      end
    end

    if db == :pg
      profile = Numnut.new( self.to_hash )
    end      
    profile
  end
end

class MongoNumnut
  include Mongoid::Document
  store_in collection: "people", database: "numnuts"
  field :name, type: String 
  field :birthday, type: Date
  field :raw_date_input, type: String
  field :raw_name_input, type: String
  field :whole_name, type: Array 
  field :vowel, type: Array
  field :consonant, type: Array
  field :birthdate, type: Array
  field :ip, type: String
end

class Numnut < ActiveRecord::Base

end