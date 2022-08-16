import React, { useState } from "react";
import { io } from "socket.io-client";
import Board from "../board/Board";
import "./style.css";

type ContainerProps = {};
type ContainerState = {
  penColor: string;
  penSize: number;
};

class Container extends React.Component<ContainerProps, ContainerState> {
  socket = io("http://localhost:3000");
  constructor(props: string) {
    super(props);
    this.state = {
      penColor: "black",
      penSize: 5,
    };
  }
  changePenColor(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ penColor: event.target.value });
  }
  changePenSize(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ penSize: Number(event.target.value) });
  }


  render() {
    return (
      <div className="container">
        <div className="tools-bar">
          <div className="color-picker-container">
            Select Pen Color: &nbsp;
            <input
              type="color"
              value={this.state.penColor}
              onChange={this.changePenColor.bind(this)}
            />
          </div>
		  {/* <button onClick={() =>this.changePenColor.bind("white")}>Eraser</button> */}
          <div className="brushsize-container">
            Select Brush Size: &nbsp;
            <select
              value={this.state.penSize}
              onChange={this.changePenSize.bind(this)}
              style={styles.select}
            >
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
		  <div className="eraser">
            <button type = "button"
			  onClick={() =>{this.setState({penColor: "white"})}}
            >Eraser</button>
          </div>
        </div>
        <div className="board-container">
          <Board
            penColor={this.state.penColor}
            penSize={this.state.penSize}
          ></Board>
        </div>
      </div>
    );
  }
}

const styles: { [name: string]: React.CSSProperties } = {
  select: {
    padding: 5,
    width: 200,
  },
};
export default Container;
