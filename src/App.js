import React, { Component } from "reactn";
import Board from "./components/board/board";
import StoneGrid from "./components/board/stoneGrid";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header" />
        <div>
          <Board size={9} />
          <StoneGrid stoneData={1} size={9} />
        </div>
      </div>
    );
  }
}

export default App;
