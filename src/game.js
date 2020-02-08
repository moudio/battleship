import Player from './player';
import Computer from './computer';

export default function Game() {
  return {

    start() {
      const player = Player();
      const computer = Computer();
      player.placeRandomShips();
      computer.placeRandomShips();

      const gameLoop = setInterval(() => {
        if (!player.gameEnvironment.all_ships_sunk()
        && !computer.gameEnvironment.all_ships_sunk()) {
          computer.updateBoard();
          player.updateBoard();
        } else {
          if (player.gameEnvironment.all_ships_sunk()) {
            player.gameEnvironment.game_over('Computer Wins!');
          } else {
            player.gameEnvironment.game_over('You win!');
          }
          clearInterval(gameLoop);
        }
      }, 300);
    },
  };
}
