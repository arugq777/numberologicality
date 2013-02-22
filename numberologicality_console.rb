load "./lib/letter.rb"
load "./lib/tabulaticate.rb"
load "./lib/person.rb"

print "Input full name: "
name = gets.chomp
print "Input birthday: "
date = gets.chomp
chump = Person.new(name, date)
Tabulaticate.process(chump)
puts chump.numbers