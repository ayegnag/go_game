function isPitOccipied(stone) {
  // const pit = boardState[xy];
  return stone.type !== 0 ? false : true;
}

function rules(newStone, xy, boardState, size, showError) {
  const isWithinBounds = stone => {
    return (
      stone &&
      stone.row < size &&
      stone.row >= 0 &&
      stone.col < size &&
      stone.col >= 0
    );
  };

  const findNeighbours = stone => {
    const neighbours = [];
    const { row, col } = stone;
    // console.log("TCL: findNeighbours for -> coord", col, row);
    const N = col + "_" + (row - 1);
    const S = col + "_" + (row + 1);
    const W = col - 1 + "_" + row;
    const E = col + 1 + "_" + row;
    const directions = [N, S, W, E];
    // console.log("TCL: findNeighbours -> directions", N, S, W, E);
    directions.forEach(side => {
      const n = boardState[side];
      if (n) neighbours.push(n);
    });
    // console.log("TCL: findNeighbours -> neighbours", neighbours);
    return neighbours;
  };

  const isEqual = (stone, neighbour) => {
    return stone.row === neighbour.row && stone.col === neighbour.col;
  };

  const isInArray = (stone, array) => {
    for (let i = 0; i < array.length; i++) {
      if (isEqual(stone, array[i])) {
        return true;
      }
    }
    return false;
  };

  const calcLiberties = (stone, chainStones, libStones) => {
    chainStones = chainStones || [];
    libStones = libStones || [];
    const nStones = findNeighbours(stone, boardState);
    nStones.forEach(nstone => {
      console.log("TCL: calcLiberties -> nstone", nstone);
      if (isWithinBounds(nstone, size)) {
        if (stone.type === nstone.type) {
          chainStones.push(stone);
          if (!isInArray(nstone, chainStones)) {
            calcLiberties(nstone, chainStones, libStones);
          }
        } else if (nstone.type === 0) {
          if (!isInArray(nstone, libStones)) {
            libStones.push(nstone);
          }
        }
      }
    });
    console.log("TCL: libStones", libStones);
    return libStones;
  };

  const calcChains = (stone, chainStones) => {
    chainStones = chainStones || [];
    chainStones.push(stone);
    const nStones = findNeighbours(stone, boardState);
    nStones.forEach(nstone => {
      // Note: boundary check might not be required.
      if (isWithinBounds(nstone, size)) {
        if (stone.type === nstone.type) {
          if (!isInArray(nstone, chainStones)) {
            calcChains(nstone, chainStones, boardState, size);
          }
        }
      }
    });
    // console.log("TCL: chainStones", chainStones);
    return chainStones;
  };

  const calcCapturedStones = stone => {
    let captured = [];
    const nStones = findNeighbours(stone, boardState);
    nStones.forEach(nstone => {
      // Note: boundary check might not be required.
      if (isWithinBounds(nstone, size)) {
        if (stone.type !== nstone.type && nstone.type !== 0) {
          if (!isInArray(nstone, captured)) {
            console.log("TCL: captured -> nstone", nstone);
            if (calcLiberties(nstone).length === 0) {
              const chainedStones = calcChains(nstone);
              captured = [...captured, ...chainedStones];
            }
          }
        }
      }
    });
    console.log("TCL: calcCapturedStones", captured);
    return captured;
  };

  let result = true;
  // calcLiberties(newStone, [], [], boardState, size);
  // calcChains(newStone, [], boardState, size);
  const captures = calcCapturedStones(newStone);
  if (captures.length > 0) {
    const board = boardState;
    captures.forEach(cap => {
      const cr = cap.col + "_" + cap.row;
      board[cr].type = 0;
      board[cr].key = cr;
    });
    boardState = board;
  } else if (calcLiberties(newStone).length === 0) {
    showError("suicide");
    result = false;
  }
  console.log("TCL: rules -> result", result);
  return result;
}

module.exports = {
  rules,
  isPitOccipied
};
