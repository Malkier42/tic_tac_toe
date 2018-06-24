import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c === null).length == 0;
}

const TicTacToe = Game({
  setup: () => ({ cells: Array(9).fill(null)}),

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      return { ...G, cells };
    },
  },

  flow: {
    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return { winner: ctx.currentPlayer };
      }
      if (IsDraw(G.cells)) {
        return { draw: true };
      }
    },
  },
});

const App = Client({ game: TicTacToe });

export default App;
