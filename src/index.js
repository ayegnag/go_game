import React, { setGlobal } from "reactn";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

setGlobal({
  boardHistory: [],
  boardData: {},
  turn: 2,
  moveCount: 0,
  boardSize: 9,
  showError: {
    message: "",
    show: false
  },
  position: {
    row: 0,
    col: 0
  },
  passed: false,
  gameOver: false
});

ReactDOM.render(<App />, document.getElementById("root"));
