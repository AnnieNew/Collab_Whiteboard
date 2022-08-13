var app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
io.on("connection", function (socket) {
  console.log("a suer connected");
  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
});

var server_port = 5500;
http.listen(server_port, function () {
  console.log("listening on: " + server_port);
});
