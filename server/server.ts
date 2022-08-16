// var app = require("express")();
// let http = require("http").createServer(app);
// let io = require("socket.io")(http);
const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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

server.listen(PORT, function () {
  console.log("listening on: " + PORT);
});

app.get("/hello", (req, res) => {
  res.send("hello world");
});
