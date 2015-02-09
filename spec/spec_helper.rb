require "simplecov"
SimpleCov.start
require 'capybara/rspec'
require 'capybara/webkit'
require 'capybara/angular'
#require 'rack/test'
require_relative "../numberologicality"

Capybara.app = NumberologicalityApp.new
Capybara.javascript_driver = :webkit
