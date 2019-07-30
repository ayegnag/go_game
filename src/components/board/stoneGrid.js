import React, { useGlobal } from "reactn";
import StonePit from "./stone";
import "./board.scss";

const GenerateStones = ({ boardData, size }) => {
  let grid = [];
  for (let rows = 0; rows < size; rows++) {
    let stones = [];
    for (let column = 0; column < size; column++) {
      const xy = column + "_" + rows;
      const { type, key } = boardData[xy];
      // console.log("TCL: GenerateStones -> xy", xy);
      stones.push(
        <StonePit stone={type} key={key} xy={xy} row={rows} col={column} />
      );
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
  const [boardData] = useGlobal("boardData");
  const { size } = props;
  return (
    <div className={`grid sizeg${size}`}>
      {GenerateStones({ boardData, size })}
    </div>
  );
}
