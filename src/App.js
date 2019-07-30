import React, { Component } from "reactn";
import Board from "./components/board/board";
import StoneGrid from "./components/board/stoneGrid";
import TurnBox from "./components/turnBox/turnBox";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header" />
        <div className="mainContainer">
          <div className={`container size${19}`}>
            <Board size={19} />
            <StoneGrid stoneData={1} size={19} />
          </div>
          <TurnBox />
        </div>
      </div>
    );
  }
}

export default App;
