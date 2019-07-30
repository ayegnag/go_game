import React, { Component } from "reactn";
import "./turn.scss";
import "../../styles/stone.scss";

export default class TurnBox extends Component {
  passTurn(turn) {
    this.setGlobal({ turn: turn === 1 ? 2 : 1 });
  }
  render() {
    const { turn } = this.global;

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
      </div>
    );
  }
}
