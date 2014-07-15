require "mongoid"
require "json"
require_relative "lib/letter.rb"
require_relative "lib/tabulaticate.rb"
require_relative "lib/person.rb"

Mongoid.load!("db/mongoid.yml", :development)

def process(name, date)
	chump = Person.new(name, date)
	puts chump.numbers
	chump
end

print "Input full name: "
name = gets.chomp
print "Input birthday: "
date = gets.chomp
process(name, date)
