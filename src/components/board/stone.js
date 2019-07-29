import React, { useGlobal } from "reactn";
import { useSpring, animated, config } from "react-spring";
import "./board.scss";

function Stone(prop) {
  const { stone } = prop;
  const spring = useSpring({
    from: { opacity: 0, top: "-40%", width: "150%", height: "150%" },
    to: { opacity: 1, top: "12%", width: "75%", height: "75%" },
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

  PlaceStone = xy => {
    console.log("TCL: xy", xy);
    const { stoneMatrix, turn } = this.global;
    const preStones = stoneMatrix;
    // Use Game Rule Check here----------------------------------------

    // ------------ Rules End
    preStones[xy] = {
      type: turn,
      group: "",
      liberties: 4
    };
    this.setGlobal({
      stoneMatrix: { ...preStones }
    });
    this.ToggleTurn();
  };
  state = {
    id: this.props.xy
  };

  render() {
    const { stone, xy } = this.props;
    return (
      <div className="pit" onClick={() => this.PlaceStone(xy)}>
        <Stone stone={stone} />
      </div>
    );
  }
}
