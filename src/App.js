import React, { Component } from "reactn";
import Board from "./components/board/board";
import StoneGrid from "./components/board/stoneGrid";
import TurnBox from "./components/turnBox/turnBox";
import ErrorBox from "./components/errorBox/errorBox";
import Splash from "./components/splashScreen/splash";
// import * as Constants from "../src/config/constants";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.clearStorage();
  }
  clearStorage() {
    localStorage.removeItem("board");
    localStorage.removeItem("history");
    localStorage.removeItem("moveCount");
    localStorage.removeItem("turn");
  }
  componentDidMount() {}
  render() {
    const { boardSize, splash } = this.global;
    return (
      <div className="App">
        {splash && <Splash />}
        {!splash && (
          <>
            <ErrorBox />
            <div className="mainContainer">
              <div className={`container size${boardSize}`}>
                <Board size={boardSize} />
                <StoneGrid stoneData={1} size={boardSize} />
              </div>
              <TurnBox />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
