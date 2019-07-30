import React, { Component } from "reactn";
import Cell from "./cell";
import "./board.scss";
import short from "short-uuid";

export class Board extends Component {
  generateBoard = size => {
    let board = [];
    for (let rows = 0; rows < size; rows++) {
      let cells = [];
      for (let cell = 0; cell < size; cell++) {
        let cName = "cross";
        if (rows === 0) {
          cName = cName + " top";
        } else if (rows === size - 1) {
          cName = cName + " bottom";
        } else if (cell % size > 0) {
          cName = cName + " regular";
        }

        if (cell % size === 0) {
          cName = cName + " left";
        }
        if (cell === size - 1) {
          cName = cName + " right";
        }
        cells.push(<Cell styleName={cName} key={short.uuid()} />);
      }
      board.push(
        <div className="row" key={short.uuid()}>
          {cells}
        </div>
      );
    }
    return board;
  };
  render() {
    const { size } = this.props;
    return (
      <div className={`board size${size}`}>{this.generateBoard(size)}</div>
      // <div className={`board size${size}`} />
    );
  }
}
export default Board;
