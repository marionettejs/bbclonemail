# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'compass' do
  watch(/^src\/(.*)\.s[ac]ss/)
end

# This is an example with all options that you can specify for guard-process
guard 'process', :name => 'Sinatra', :command => 'ruby app.rb', :stop_signal => "TERM"  do
  watch('Gemfile.lock')
end

