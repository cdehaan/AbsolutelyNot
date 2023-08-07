def resolve_node(js_code)
  node_path = "/usr/local/bin/node"  # Use your own node path

  if js_code
    arg = js_code.gsub("\"", "\\\"")  # escape any quotes in the argument string
    `#{node_path} -p "#{arg}"`
  else
    puts 'No argument provided'
    exit!
  end
end
