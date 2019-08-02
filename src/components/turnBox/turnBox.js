import React, { Component } from "reactn";
import { getScores } from "../board/rules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

import "./turn.scss";
import "../../styles/stone.scss";

export default class TurnBox extends Component {
  passTurn(turn) {
    const { passed } = this.global;
    if (passed) {
      this.setGlobal({ gameOver: true });
      this.endGame();
    }
    this.setGlobal({ turn: turn === 1 ? 2 : 1, passed: true });
  }

  endGame() {
    const { boardData } = this.global;
    console.log("TCL: TurnBox -> endGame -> boardState", boardData);
    // Do the calculation and find winner.
    const { board, message } = getScores(boardData);
    this.setGlobal({
      boardData: board,
      showError: { show: true, message }
    });
    console.log("GameOver");
  }

  resetGame = () => {
    const { backupBoards } = this.global;
    const firstState = backupBoards[0];
    console.log("TCL: TurnBox -> resetGame -> backupBoards", backupBoards[0]);
    this.setGlobal({
      boardData: firstState,
      backupBoards: [{ ...firstState }]
    });
    console.log("Game Resetted");
  };

  render() {
    const { turn, position } = this.global;

    return (
      <div className="Turn">
        <div className="topContainer">
          <span className="title">Next Turn</span>
          <div className="big">
            {turn === 1 && <div className="big stone white" />}
            {turn === 2 && <div className="big stone black" />}
          </div>
        </div>
        <button className="button" onClick={() => this.passTurn(turn)}>
          Pass Turn
        </button>
        <span className="info">
          {position.row}, {position.col}
        </span>
        <div className="bottomTools">
          <FontAwesomeIcon
            icon={faRedoAlt}
            className="reset"
            onClick={() => this.resetGame()}
          />
        </div>
      </div>
    );
  }
}
