require "date"
require "sinatra"
require "mongoid"
require "pg"
require 'sinatra/activerecord'
require './environments'
require_relative "lib/letter.rb"
require_relative "lib/tabulaticate.rb"
require_relative "lib/person.rb"

Mongoid.load!("db/mongoid.yml", :production)

  set :kindred, {}
  set :chump, nil

  helpers do 
    def set_kin(data)
      settings.kindred = data
    end

    def post_data(db)
      if db == :pg
        settings.chump = process_for_pg(params["nameinput"], params["dateinput"])
      else
        settings.chump = process_for_mongo
      end
      settings.chump[:ip] = request.ip.to_s + ":" + request.port.to_s
      settings.chump[:user_agent] = request.user_agent
      settings.chump[:post_data] = request.POST.to_s
      save_to_db(settings.chump, db)
      settings.kindred = find_kindred(settings.chump, db)
    end

    def find_kindred(data, db)
      kin = {}
      if db == :pg
        [:whole_name, :vowel, :consonant, :birthdate].each do |k|
          kin[k] = Numnut.where("#{data[k].last} = ANY(#{k.to_s})").limit(10)
        end
      elsif db == :mongo
        [:whole_name, :vowel, :consonant, :birthdate].each do |k|
          kin[k] = MongoNumnut.where(k => data[k].last).limit(10)
        end
      end
      # puts "kin: #{kin}"
      kin
    end

    def process_for_mongo
      chump = Person.new("","").create_profile(:mongo)
      data = JSON.parse(request.body.string)
      data.each do |key, data|
        chump[key] = data
      end
      chump
    end

    def process_for_pg(name, date)
      chump = Person.new(name, date).create_profile(:pg)
      chump
    end

    def save_to_db(data, db)
      if db == :pg
        if Numnut.find_by_name_and_birthday(data.name, data.birthday).nil?
          data.save!
        else
          puts "Not saved."
        end
      elsif db == :mongo
        if MongoNumnut.where(name: data.name, birthday: data.birthday).nil?
          data.save!
        else
          puts "Not saved."
        end
      end 
    end

    def more_results(db)
      if db == :pg
        # puts "params['key']: #{params["key"]}"
        # puts "params['qty']: #{params["qty"]}"
        # puts "params['number']: #{params["number"]}"
        more = Numnut.where("#{params['number'].to_s} = ANY(#{params['key'].to_s})")
                      .offset(settings.kindred[params["key"].to_sym].count)
                      .limit(params["qty"].to_i)
        # puts more
        settings.kindred[params["key"].to_sym] += more
      elsif db == :mongo
        data = JSON.parse(request.body.string)
        more = MongoNumnut.where(data["key"] => data["number"])
                          .skip(data["index"])
                          .limit(data["limit"])
      end
      more
    end

    def mongo_query(q)

    end

    def pg_query(q)

    end
  end

  get '/' do
    erb :index
  end

  get '/v2' do
    erb :index2
  end

  post '/v2' do
    settings.kindred = {}
    settings.chump = nil
    post_data(:pg)
    erb :index2
  end

  post '/v2/more' do
    @more = more_results(:pg)
    puts "kindred count: #{settings.kindred[params['key'].to_sym].count}"
    erb :more_names
  end

  post '/' do
    post_data(:pg)
    erb :index
  end

  post "/json/more" do
    @more = more_results(:mongo)
    @more.to_json
  end

  post '/json' do
    post_data(:mongo)
    settings.kindred.to_json
  end