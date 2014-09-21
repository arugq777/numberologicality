# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140909202410) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "numnuts", force: true do |t|
    t.date    "birthday"
    t.string  "raw_date_input"
    t.string  "name"
    t.string  "raw_name_input"
    t.integer "whole_name",     array: true
    t.integer "vowel",          array: true
    t.integer "consonant",      array: true
    t.integer "birthdate",      array: true
    t.string  "ip"
    t.string  "user_agent"
    t.string  "post_data"
  end

end
