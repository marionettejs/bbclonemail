require 'compass' #must be loaded before sinatra
require 'sinatra'
require 'sinatra/reloader' if development?
require 'haml'
require 'json'

get "/" do
  haml :layout
end
