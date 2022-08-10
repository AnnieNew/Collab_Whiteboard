const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const http = app.listen(port, () => {
  console.log("started on " + port);
});

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("User Online");

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
});