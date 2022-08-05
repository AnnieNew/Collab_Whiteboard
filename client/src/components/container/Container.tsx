import React, { useState } from "react";
import Board from "../board/Board";
import "./style.css";

export default function Container() {
  const [penColor, setPenColor] = useState("blue");
  const [penSize, setPenSize] = useState(5);
  const selectPenColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const color = event.target.value;
    setPenColor(color);
  };

  function changePenSize(event: React.ChangeEvent<HTMLSelectElement>) {
    const size = event.target.value;
    setPenSize(Number(size));
  }

  return (
    <div className="container">
      <div className="tools-bar">
        <div className="color-picker-container">Select Pen Color: &nbsp;</div>
        <select
          value={penColor}
          onChange={selectPenColor}
          style={styles.select}
        >
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
        </select>
        <div className="brushsize-container">
          Select Brush Size: &nbsp;
          <select
            value={penSize}
            onChange={changePenSize}
            style={styles.select}
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <div className="board-container">
        <Board color={penColor} size={penSize}></Board>
      </div>
    </div>
  );
}

const styles: { [name: string]: React.CSSProperties } = {
  select: {
    padding: 5,
    width: 200,
  },
};
