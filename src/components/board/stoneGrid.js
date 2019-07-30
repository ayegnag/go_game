import React, { useGlobal } from "reactn";
import StonePit from "./stone";
import "./board.scss";

const GenerateStones = ({ getStones, size }) => {
  let grid = [];
  for (let rows = 0; rows < size; rows++) {
    let stones = [];
    for (let stone = 0; stone < size; stone++) {
      const xy = stone + "_" + rows;
      let type = 0;
      let key = xy;
      const thisStone = getStones[xy];
      if (thisStone !== undefined) {
        type = thisStone.type;
        key = xy + "placed";
      }
      stones.push(<StonePit stone={type} key={key} xy={xy} />);
    }
    grid.push(
      <div className="row" key={"r" + rows}>
        {stones}
      </div>
    );
  }
  return grid;
};

export default function StoneGrid(props) {
  const [getStones] = useGlobal("stoneMatrix");
  const { stone, size } = props;
  return (
    <div className={`grid sizeg${size}`}>
      {GenerateStones({ getStones, size })}
    </div>
  );
}
