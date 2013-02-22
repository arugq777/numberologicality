load "./lib/letter.rb"
load "./lib/tabulaticate.rb"
load "./lib/person.rb"
require "date"
require "sinatra"
require "sinatra/partial"
#require "slim"
#require "sass"

get '/' do
  erb :index
end

post '/' do
  @chump = Person.new(params[:name], params[:birthday])
  Tabulaticate.process(@chump)
  erb :index
end
