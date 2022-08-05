import React, { useEffect } from "react";
import "./style.css";

interface BoardProps {
  size: number;
  color: string;
}
export default function Board(props: BoardProps) {
  useEffect(() => {
    drawOnCanvas();
  });

  function drawOnCanvas() {
    var canvas = document.getElementById("board") as HTMLCanvasElement;
    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

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

    ctx.lineWidth = props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = props.color;

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

    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();
    };
  }

  return (
    <div className="sketch" id="sketch">
      <canvas className="board" id="board"></canvas>
    </div>
  );
}
