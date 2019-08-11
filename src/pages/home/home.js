import React, { Component } from "reactn";
import "./home.scss";
import logo from "./goLogo.svg";

export default class Home extends Component {
  state = {
    screen: "mainScreen",
    selectedSize: 9,
    selectedStone: 2,
    code: null
  };

  generateCode = () => {
    let r = Math.random()
      .toString(36)
      .substring(7);
    console.log("Game Code Generated: ", r);
    return r;
  };

  sizeHandler = value => {
    this.setState({
      selectedSize: value
    });
  };

  stoneHandler = value => {
    this.setState({
      selectedStone: value
    });
  };

  codeHandler = event => {
    const code = event.target.value;
    if (code.length >= 4) {
      console.log("Join Code: ", code);
      this.setState({
        code: code
      });
    }
  };

  screenCreate = () => {
    this.setState({
      code: this.generateCode(),
      screen: "createScreen"
    });
  };

  screenSolo = () => {
    this.setState({
      screen: "soloScreen"
    });
  };

  screenMain = () => {
    this.setState({
      screen: "mainScreen"
    });
  };
  // screenJoin = () => {
  //   this.setState({
  //     screen: "joinScreen"
  //   });
  // };
  render() {
    const { screen, selectedSize, selectedStone, code } = this.state;
    const { createGame, joinGame, playSolo } = this.props;
    const svgPath = `${logo}#svgView(preserveAspectRatio(xMidYMin slice))`;
    return (
      <div>
        <div className="pageTitle">
          <div className="titleContainer">
            {/* <div className="balls">
              <div className="whiteBall">Go</div>
              <div className="blackBall" />
              <div className="ballText">By Gangeya</div>
            </div> */}
            <img
              className="logo"
              src={svgPath}
              onClick={this.screenMain}
              alt="Go: by Gangeya"
            />
          </div>
        </div>
        {screen === "mainScreen" && (
          <div className="menu">
            <div className="sub">Strategize. Capture. Win.</div>
            <div className="menuBar">
              <div className="menuButton large" onClick={this.screenSolo}>
                Play SOLO
              </div>
            </div>
            <div className="menuBar">
              <div className="menuButton large" onClick={this.screenCreate}>
                Create Game
              </div>
            </div>
            <div className="menuBar input">
              <input
                className="quickInput"
                placeholder="Code"
                maxLength="6"
                onChange={this.codeHandler}
              />
              <div className="menuButton" onClick={() => joinGame(code)}>
                Quick Join
              </div>
            </div>
          </div>
        )}
        {screen === "soloScreen" && (
          <div className="menu">
            <div className="text">Chose board size.</div>
            <div className="menuBar">
              <div
                className={
                  this.state.selectedSize === 9
                    ? "sizeButton active"
                    : "sizeButton"
                }
                onClick={() => this.sizeHandler(9)}
              >
                9
              </div>
              <div
                className={
                  this.state.selectedSize === 13
                    ? "sizeButton active"
                    : "sizeButton"
                }
                onClick={() => this.sizeHandler(13)}
              >
                13
              </div>
              <div
                className={
                  this.state.selectedSize === 19
                    ? "sizeButton active"
                    : "sizeButton"
                }
                onClick={() => this.sizeHandler(19)}
              >
                19
              </div>
            </div>
            <div className="menuBar">
              <div
                className="menuButton dark"
                onClick={() => playSolo(selectedSize)}
              >
                Start Game
              </div>
            </div>
          </div>
        )}
        {screen === "createScreen" && (
          <div className="menu">
            <div className="text">Share invite code.</div>
            <div className="menuBar">
              <span className="codeBox">{code}</span>
            </div>

            <div className="text">Chose board size.</div>
            <div className="menuBar">
              <div
                className={
                  this.state.selectedSize === 9
                    ? "sizeButton active"
                    : "sizeButton"
                }
                onClick={() => this.sizeHandler(9)}
              >
                9
              </div>
              <div
                className={
                  this.state.selectedSize === 13
                    ? "sizeButton active"
                    : "sizeButton"
                }
                onClick={() => this.sizeHandler(13)}
              >
                13
              </div>
              <div
                className={
                  this.state.selectedSize === 19
                    ? "sizeButton active"
                    : "sizeButton"
                }
                onClick={() => this.sizeHandler(19)}
              >
                19
              </div>
            </div>
            <div className="text">Chose your stone color.</div>
            <div className="menuBar">
              <div
                className={
                  this.state.selectedStone === 2
                    ? "stoneButton black active"
                    : "stoneButton black"
                }
                onClick={() => this.stoneHandler(2)}
              />
              <div
                className={
                  this.state.selectedStone === 1
                    ? "stoneButton white active"
                    : "stoneButton white"
                }
                onClick={() => this.stoneHandler(1)}
              />
            </div>
            <div className="menuBar">
              <div
                className="menuButton dark"
                onClick={() => createGame(selectedSize, selectedStone, code)}
              >
                Start Game
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
