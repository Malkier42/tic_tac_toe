import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import TicTacToeBoard from './board';

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pos of positions) {
    const symbol = cells[pos[0]];
    let winner = symbol;
    for (let i of pos) {
      if (cells[i] != symbol){
        winner = null;
        break;
      }
    }
    if (winner != null) return true;
  }
  return false;
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c === null).length == 0;
}

function getPlayerSymbol(player) {
  let symbol = 'O';
  if (player === '1') symbol = 'X';
  return symbol;
}

const TicTacToe = Game({
  setup: () => ({ cells: Array(9).fill(null)}),

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        cells[id] = getPlayerSymbol(ctx.currentPlayer);
      }

      return { ...G, cells };
    },
  },

  flow: {
    movesPerTurn: 1,

    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return { winner: getPlayerSymbol(ctx.currentPlayer) };
      }
      if (IsDraw(G.cells)) {
        return { draw: true };
      }
    },
  },
});

const App = Client({ 
  game: TicTacToe, 
  board: TicTacToeBoard,
});

export default App;
