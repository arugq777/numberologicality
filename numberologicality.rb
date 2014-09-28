require "date"
require "sinatra"
require "mongoid"
require "pg"
require 'sinatra/activerecord'
require './environments'
require_relative "lib/letter.rb"
require_relative "lib/tabulaticate.rb"
require_relative "lib/person.rb"
#require "activerecord"
#require "slim"
#require "sass"

Mongoid.load!("db/mongoid.yml", :production)
#class Numberologicality < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/v2' do
    erb :index2
  end

  post '/v2' do
    @chump = Person.new(params[:nameinput], params[:dateinput]).create_profile(:pg)
    @chump[:ip] = request.ip.to_s + ":" + request.port.to_s
    @chump[:user_agent] = request.user_agent
    @chump[:post_data] = request.POST.to_s
    [:whole_name, :vowel, :consonant, :birthdate].each do |k|
      puts "chump: #{@chump[k]}"
    end

    if Numnut.find_by_name_and_birthday(@chump.name, @chump.birthday).nil?
      @chump.save!
    else
      puts "Not saved."
    end 

    @kindred = {}
    [:whole_name, :vowel, :consonant, :birthdate].each do |k|
      @kindred[k] = Numnut.where("#{@chump[k].last} = ANY(#{k.to_s})").limit(10)
    end
    
    erb :index2
  end


  post '/' do
    @chump = Person.new(params[:nameinput], params[:dateinput]).create_profile(:pg)
    @chump[:ip] = request.ip.to_s + ":" + request.port.to_s
    @chump[:user_agent] = request.user_agent
    @chump[:post_data] = request.POST.to_s
    [:whole_name, :vowel, :consonant, :birthdate].each do |k|
      puts "chump: #{@chump[k]}"
    end

    if Numnut.find_by_name_and_birthday(@chump.name, @chump.birthday).nil?
      @chump.save!
    else
      puts "Not saved."
    end 

    @kindred = {}
    [:whole_name, :vowel, :consonant, :birthdate].each do |k|
      @kindred[k] = Numnut.where("#{@chump[k].last} = ANY(#{k.to_s})").limit(10)
    end

    # @sample_kin = {}
    # 10.times do
    #   [:whole_name, :vowel, :consonant, :birthdate].each do |k|
    #     @sample_kin[k] << @kindred[k].sample
    #   end
    # end

    erb :index
  end

  post "/json/more" do
    puts "/more JSON parse: #{JSON.parse(request.body.string)}"
    data = JSON.parse(request.body.string)
    @more = MongoNumnut.where(data["key"] => data["number"]).skip(data["index"]).limit(data["limit"])
    @more.to_json
  end

  post '/json' do
    # params.each { |k,v| puts "params: #{k}, #{v}"}
    # puts "request params: #{request.params}"
    # puts "JSON parse: #{JSON.parse(request.body.string)}"
    data = JSON.parse(request.body.string)
    @chump = Person.new("","").create_profile(:mongo)
    data.each do |key, data|
      @chump[key] = data
    end
    @chump[:ip] = request.ip.to_s + ":" + request.port.to_s
    @chump[:user_agent] = request.user_agent
    @chump[:post_data] = request.POST.to_s
    @chump.save!
    data.each_key do |k|
      puts "chump #{k}: #{@chump[k]}"
    end
    @kindred = {}
    [:whole_name, :vowel, :consonant, :birthdate].each do |k|
      @kindred[k] = MongoNumnut.where(k => @chump[k].last).limit(10)
    end
    @kindred.to_json
  end
#end

