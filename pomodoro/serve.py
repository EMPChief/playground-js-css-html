from livereload import Server

server = Server()
server.watch(".", delay=1)  # watch all files in current directory
server.serve(root=".", port=8000)
