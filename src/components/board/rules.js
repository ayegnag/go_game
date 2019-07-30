const findNeighbours = (xy, boardState) => {
  const coord = xy.split("_");
  const X = parseInt(coord[0]);
  const Y = parseInt(coord[1]);
  console.log("TCL: findNeighbours -> coord", coord);
  const N = X + "_" + (Y - 1);
  const neighbourN = boardState[N];
  const S = X + "_" + (Y + 1);
  const neighbourS = boardState[S];
  const W = X - 1 + "_" + Y;
  const neighbourW = boardState[W];
  const E = X + 1 + "_" + Y;
  const neighbourE = boardState[E];
  console.log("TCL: findNeighbours -> neighbours", N, S, W, E);
  console.log(
    "TCL: findNeighbours -> neighbours",
    neighbourN,
    neighbourS,
    neighbourW,
    neighbourE
  );
  return [neighbourN, neighbourS, neighbourW, neighbourE];
};

export default function rules(position, stoneType, boardState) {
  let result = true;
  if (boardState[position] !== undefined) {
    result = false;
  }
  findNeighbours(position, boardState);
  console.log("TCL: rules -> result", result);
  return result;
}
