require_relative "lib/letter.rb"
require_relative "lib/tabulaticate.rb"
require_relative "lib/person.rb"
require "date"
require "sinatra"
#require "slim"
#require "sass"

get '/' do
  erb :index
end

post '/' do
  @chump = Person.new(params[:name], params[:birthdate])
  Tabulaticate.process(@chump)
  erb :index
end
