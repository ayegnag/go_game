import React from "reactn";
import { useSpring, animated, config } from "react-spring";
import { rules, isPitOccipied } from "./rules";
import "./board.scss";
import "../../styles/stone.scss";

function Stone(prop) {
  const { stone } = prop;
  const spring = useSpring({
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
  return (
    <>
      {stone === 1 && <animated.div style={spring} className="stone white" />}
      {stone === 2 && <animated.div style={spring} className="stone black" />}
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
    const preStones = boardData;
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
    preStones[xy] = newStone;
    rules(newStone, xy, preStones, boardSize, this.updateBoard);
    console.log("TCL: StonePit -> validMove", validMove);
    // ------------ Rules End
    if (validMove) {
      this.setGlobal({
        boardData: { ...preStones }
      });
      this.ToggleTurn();
    }
  };
  state = {
    id: this.props.xy
  };

  showPitPosition(row, col) {
    console.log("TCL: StonePit -> showPitPosition -> showPitPosition");
    this.setGlobal({
      position: {
        row,
        col
      }
    });
  }

  render() {
    const { stone, xy, row, col } = this.props;
    return (
      <div
        className="pit"
        onClick={() => this.PlaceStone(xy, row, col)}
        onMouseOver={() => this.showPitPosition(row, col)}
      >
        <Stone stone={stone} />
      </div>
    );
  }
}
