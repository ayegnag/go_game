import React, { setGlobal } from "reactn";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

setGlobal({
  stoneMatrix: {},
  turn: 1
});

ReactDOM.render(<App />, document.getElementById("root"));
