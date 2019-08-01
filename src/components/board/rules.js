function isPitOccipied(stone) {
  // const pit = boardState[xy];
  return stone.type !== 0 ? false : true;
}

function getScores(board) {
  console.log("GameOver");
  return {
    board: {},
    message: "Player 1 Won!"
  };
}

function countProps(obj) {
  let count = 0;
  let k;
  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      count++;
    }
  }
  return count;
}

function objectEquals(v1, v2) {
  if (typeof v1 !== typeof v2) {
    return false;
  }

  if (typeof v1 === "function") {
    return v1.toString() === v2.toString();
  }

  if (v1 instanceof Object && v2 instanceof Object) {
    if (countProps(v1) !== countProps(v2)) {
      return false;
    }
    let r = true,
      k;
    for (k in v1) {
      r = objectEquals(v1[k], v2[k]);
      if (!r) {
        return false;
      }
    }
    return true;
  } else {
    return v1 === v2;
  }
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
  isPitOccipied,
  getScores
};
