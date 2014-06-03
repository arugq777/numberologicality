
require_relative "lib/letter.rb"
require_relative "lib/tabulaticate.rb"
require_relative "lib/person.rb"

print "Input full name: "
name = gets.chomp
print "Input birthday: "
date = gets.chomp
chump = Person.new(name, date)
Tabulaticate.process(chump)
puts chump.numbers