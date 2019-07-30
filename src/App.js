import React, { Component } from "reactn";
import Board from "./components/board/board";
import StoneGrid from "./components/board/stoneGrid";
import TurnBox from "./components/turnBox/turnBox";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.generateBoardMatrix();
  }
  generateBoardMatrix() {
    const boardData = {};
    const { boardSize } = this.global;
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize; c++) {
        const id = c + "_" + r;
        boardData[id] = {
          type: 0,
          row: r,
          col: c,
          key: id
        };
      }
    }
    this.setGlobal({
      boardData
    });
  }
  componentDidMount() {}
  render() {
    const { boardSize } = this.global;
    return (
      <div className="App">
        <div className="App-header" />
        <div className="mainContainer">
          <div className={`container size${boardSize}`}>
            <Board size={boardSize} />
            <StoneGrid stoneData={1} size={boardSize} />
          </div>
          <TurnBox />
        </div>
      </div>
    );
  }
}

export default App;
