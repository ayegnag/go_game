import React from "reactn";
import { useSpring, animated, config } from "react-spring";
import { rules, isPitOccipied } from "./rules";
import "./board.scss";
import "../../styles/stone.scss";

function Stone(prop) {
  const { stone } = prop;
  console.log("TCL: Stone -> stone", stone);
  const putDown = useSpring({
    from: {
      opacity: 0,
      top: "200%",
      width: "150%",
      height: "150%",
      zIndex: "999"
    },
    to: { opacity: 1, top: "12%", width: "75%", height: "75%", zIndex: "9" },
    config: config.slow
  });
  const pullBack = useSpring({
    from: { opacity: 1, top: "12%", width: "75%", height: "75%", zIndex: "9" },
    to: {
      opacity: 0.3
    },
    config: config.slow
  });
  return (
    <>
      {stone === 1 && <animated.div style={putDown} className="stone white" />}
      {stone === 2 && <animated.div style={putDown} className="stone black" />}
      {stone === 3 && <animated.div style={pullBack} className="stone white" />}
      {stone === 4 && <animated.div style={pullBack} className="stone black" />}
    </>
  );
}

export default class StonePit extends React.Component {
  ToggleTurn = () => {
    const { turn } = this.global;
    console.log("TCL: ToggleTurn -> getTurn", turn);
    this.setGlobal({ turn: turn === 1 ? 2 : 1 });
  };

  updateBoard = board => {
    this.setGlobal({
      boardData: board
    });
  };

  PlaceStone = (xy, row, col) => {
    console.log("TCL: xy", xy);
    const { boardData, turn, boardSize } = this.global;
    const preStones = { ...boardData };
    const newStone = {
      row,
      col,
      key: col + "_" + row + "placed",
      type: turn,
      group: "",
      liberties: 4
    };
    // Use Game Rule Check here----------------------------------------
    const validMove = isPitOccipied(boardData[xy]);
    if (validMove) {
      preStones[xy] = newStone;
      console.log(
        "TCL: StonePit -> PlaceStone -> preStones[xy]",
        preStones[xy]
      );
      const abidesRules = rules(
        newStone,
        xy,
        preStones,
        boardSize,
        this.showError
      );
      if (abidesRules) {
        console.log("TCL: StonePit -> validMove", validMove);
        // ------------ Rules End
        const backup = this.global.backupBoards;
        backup.push(preStones);
        this.setGlobal({
          boardData: { ...preStones },
          backupBoards: backup,
          passed: false
        });
        this.ToggleTurn();
      }
    }
  };
  state = {
    id: this.props.xy
    // type: this.props.stone.type
  };

  showPitPosition = (row, col) => {
    console.log("TCL: StonePit -> showPitPosition -> showPitPosition");
    this.setGlobal({
      position: {
        row,
        col
      }
    });
  };

  // static getDerivedStateFromProps(props, state) {
  //   console.log("TCL: StonePit -> getDerivedStateFromProps");
  //   const { stone } = props;
  //   const prevStone = state.type;
  //   if (prevStone === 1 && stone === 0) {
  //     return {
  //       type: 3
  //     };
  //   } else if (prevStone === 2 && stone === 0) {
  //     return {
  //       type: 4
  //     };
  //   } else {
  //     return {
  //       type: stone
  //     };
  //   }
  // }
  showError = errName => {
    const err = { show: true, message: "" };
    switch (errName) {
      case "suicide":
        err.message = "Invalid move: this move will result in a Suicide!";
        break;
      case "ko":
        err.message = "Invalid move: the previous moves can not be repeated!";
        break;
      default:
        break;
    }
    this.setGlobal({ showError: err });
  };

  render() {
    const { stone, xy, row, col, mark } = this.props;
    const markPit = mark === 1 ? " markWhite" : mark === 2 ? " markBlack" : "";
    // const { type } = this.state;
    return (
      <div
        className={`pit${markPit}`}
        onClick={() => this.PlaceStone(xy, row, col)}
        onMouseOver={() => this.showPitPosition(row, col)}
      >
        <Stone stone={stone} />
      </div>
    );
  }
}
