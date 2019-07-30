import React, { setGlobal } from "reactn";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

setGlobal({
  boardData: {},
  turn: 1,
  boardSize: 9,
  position: {
    row: 0,
    col: 0
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
