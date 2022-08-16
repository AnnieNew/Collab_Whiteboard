import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { io } from "socket.io-client";
type BoardProps = {
  penSize: number;
  penColor: string;
};
type BoardStates = {};
class Board extends React.Component<BoardProps, BoardStates> {
  timeout: NodeJS.Timeout;
  // socket = io("http://localhost:3000", { transports: ["websocket"] });
  socket = io("http://localhost:3000");
  isDrawing = false;
  ctx: CanvasRenderingContext2D;

  constructor(props: BoardProps) {
    super(props);
    const initData = (data: string) => {
      var root: Board = this;
      var interval = setInterval(function () {
        if (root.isDrawing) {
          return;
        }
        root.isDrawing = true;
        clearInterval(interval);
        var image = new Image();
        var canvas = document.getElementById("board") as HTMLCanvasElement;
        var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
      return initData;
    };

    const clearBoard = () => {
      const canvas = document.getElementById("board") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    this.socket.on("canvas-data", (data) => initData(data));
    this.socket.on("clear", () => clearBoard());
  }
  componentDidMount() {
    this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps: BoardProps) {
    this.ctx.strokeStyle = newProps.penColor;
    this.ctx.lineWidth = newProps.penSize;
  }
  // var socket = io.connect
  // var socket = io.connect("http://localhost:5000");
  // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
  // const socket: Socket<ServerTo

  handleClearBoard() {
    const canvas = document.getElementById("board") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.socket.emit("clear", "clear");
  }

  drawOnCanvas() {
    var canvas = document.getElementById("board") as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    var ctx = this.ctx;
    var sketch = document.getElementById("sketch") as HTMLElement;
    var sketch_size = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_size.getPropertyValue("width"));
    canvas.height = parseInt(sketch_size.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );
    console.log("in drawOnCanvas" + this.props);
    ctx.lineWidth = this.props.penSize;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = this.props.penColor;
    canvas.addEventListener("mousedown", function (e) {
      canvas.addEventListener("mousemove", onPaint, false);
    });

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );
    var root = this;
    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();
      if (root.timeout !== undefined) {
        clearTimeout(root.timeout);
      }
      root.timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("image/png");
        root.socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  }

  render() {
    return (
      <div className="sketch" id="sketch">
        <button onClick={() => this.handleClearBoard()}>Clear board</button>
        <canvas className="board" id="board"></canvas>
      </div>
    );
  }
}

export default Board;
