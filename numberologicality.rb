require_relative "lib/letter.rb"
require_relative "lib/tabulaticate.rb"
require_relative "lib/person.rb"
require "date"
require "sinatra"
require "mongoid"
#require "slim"
#require "sass"

Mongoid.load!("db/mongoid.yml", :development)
#class Numberologicality < Sinatra::Base
  get '/' do
    erb :index
  end

  post '/' do
    @chump = Person.new(params[:nameinput], params[:dateinput]).create_profile
    @chump[:ip] = request.ip.to_s + ":" + request.port.to_s
    @chump[:user_agent] = request.user_agent
    @chump[:post_data] = request.POST.to_s
    @chump.save!
    @kindred = {}
    [:whole_name, :vowel, :consonant, :birthdate].each do |k|
      @kindred[k] = Profile.where(k => @chump[k].last).limit(10)
    end

    # @sample_kin = {}
    # 10.times do
    #   [:whole_name, :vowel, :consonant, :birthdate].each do |k|
    #     @sample_kin[k] << @kindred[k].sample
    #   end
    # end

    erb :index
  end

  post '/json' do
    #puts "params: #{params}"
    #puts "request body: #{request.body.string}"
    puts "JSON parse: #{JSON.parse(request.body.string)}"
    data = JSON.parse(request.body.string)
    @chump = Person.new("","").create_profile
    data.each do |key, data|
      @chump[key] = data
    end
    @chump[:ip] = request.ip.to_s + ":" + request.port.to_s
    @chump[:user_agent] = request.user_agent
    @chump[:post_data] = request.POST.to_s
    #@chump.save!
    data.each_key do |k|
      puts "chump #{k}: #{@chump[k]}"
    end
    @kindred = {}
    [:whole_name, :vowel, :consonant, :birthdate].each do |k|
      @kindred[k] = Profile.where(k => @chump[k].last).limit(10)
    end
    @kindred.to_json
  end
#end

