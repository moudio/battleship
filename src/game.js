import Player from './player';
import Computer from './computer';
import Dom from './dom';

export default function Game() {
  function start() {
    const player = Player();
    const computer = Computer();
    const dom = Dom();
    dom.placeRandomShips(player);
    dom.placeRandomShips(computer);
    const gameLoop = setInterval(() => {
      if (!player.gameEnvironment.allShipsSunk()
      && !computer.gameEnvironment.allShipsSunk()) {
        dom.updatePlayerBoard(player);
        dom.updateComputerBoard(computer);
      } else {
        if (player.gameEnvironment.allShipsSunk()) {
          dom.gameOver('Computer Wins!');
        } else {
          dom.gameOver('You win!');
        }
        clearInterval(gameLoop);
      }
    }, 300);
  }
  return {
    start,
  };
}
