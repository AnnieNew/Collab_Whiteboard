var app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });

  socket.on("clear", () => {
    socket.broadcast.emit("clear", "clear");
    console.log("clear");
  });
});

var server_port = 5500;
http.listen(server_port, function () {
  console.log("listening on: " + server_port);
});
