import React, { Component } from "reactn";
// import Board from "./components/board/board";
// import StoneGrid from "./components/board/stoneGrid";
// import TurnBox from "./components/turnBox/turnBox";
// import ErrorBox from "./components/errorBox/errorBox";
// import Splash from "./components/splashScreen/splash";
import Home from "./pages/home/home";
import Game from "./pages/game/game";
import "./App.scss";
import loading from "./pages/home/loading.gif";
import openSocket from "socket.io-client";

const baseUrl = window.location.origin.split(":")[1];
console.log(baseUrl + ":8000");
const socket = openSocket(baseUrl + ":8000");

class App extends Component {
  state = {
    page: "home",
    wait: false
  };

  showWaiting = show => {
    this.setState({ wait: show });
  };

  gamePage = () => {
    this.setState({ page: "game" });
  };

  playSolo = selectedSize => {
    this.setGlobal({
      boardSize: selectedSize,
      remoteGame: false
    });
    this.gamePage();
  };

  createGame = (selectedSize, selectedStone, code) => {
    console.log("createGame:", selectedSize, selectedStone, code);
    socket.emit("joinRoom", code);
    this.setGlobal({
      gameCode: code,
      thisPlayerStone: selectedStone,
      boardSize: selectedSize,
      remoteGame: true,
      creator: true
    });
    this.gamePage();
  };

  joinGame = code => {
    console.log("joinGame:", code);
    socket.emit("joinGame", code);
    this.showWaiting(true);
    this.setState({
      wait: true
    });
    this.setGlobal({
      remoteGame: true,
      gameCode: code,
      creator: false
    });
  };

  remoteUpdate = () => {
    const { boardData, turn, moveCount, gameCode } = this.global;
    socket.emit("gameMove", {
      data: { boardData, turn, moveCount },
      room: gameCode
    });
  };

  clearStorage = () => {
    localStorage.removeItem("board");
    localStorage.removeItem("history");
    localStorage.removeItem("moveCount");
    localStorage.removeItem("turn");
  };

  componentDidMount() {
    socket.on("requestGame", data => {
      console.log("TCL: App -> componentDidMount -> requestGame");
      const { boardSize, thisPlayerStone, gameCode } = this.global;
      socket.emit("sendSetup", {
        boardSize,
        otherPlayer: thisPlayerStone,
        gameCode
      });
    });

    socket.on("wrongCode", () => {});

    socket.on("setupGame", data => {
      console.log("TCL: App -> componentDidMount -> setupGame");
      const { boardSize, otherPlayer } = data;
      this.setGlobal({
        boardSize,
        thisPlayerStone: otherPlayer === 2 ? 1 : 2
      });
      this.setState({ wait: false });
      this.gamePage();
    });

    socket.on("turnData", data => {
      console.log("Received turnData:", data);
      const { boardData, turn, moveCount } = data;
      if (Object.keys(boardData).length > 1) {
        this.setGlobal({
          boardData,
          turn,
          moveCount
        });
      }
    });
  }

  render() {
    const { boardSize, splash, gameCode } = this.global;
    const { page, wait } = this.state;
    return (
      <div className="App">
        {wait && (
          <div className="loading">
            <img src={loading} alt="Loading..." />
          </div>
        )}
        {page === "home" && (
          <Home
            createGame={this.createGame}
            joinGame={this.joinGame}
            playSolo={this.playSolo}
          />
        )}
        {page === "game" && (
          <Game sendUpdate={this.remoteUpdate} code={gameCode} />
        )}
      </div>
    );
  }
}

export default App;
