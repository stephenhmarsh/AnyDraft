json.array!(@lines) do |line|
  json.extract! line, :id, :content	
  json.url url_for(line, format: :json)
end
