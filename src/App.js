import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';

const TicTacToe = Game({
  setup: () => ({ cells: Array(9).fill(null)}),
  
  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells];
      cells[id] = ctx.currentPlayer;
      return { ...G, cells };
    },
  },
});

const App = Client({ game: TicTacToe });

export default App;
