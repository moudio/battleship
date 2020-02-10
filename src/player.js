import Gameboard from './gameboard';

export default function Player() {
  const turn = false;
  const gameEnvironment = Gameboard();
  const type = 'player';
  function placeShip(n, x, y) {
    const newShip = this.gameEnvironment.createShip(n);
    this.gameEnvironment.placeShip(newShip, x, y);
  }
  return {
    turn,
    type,
    gameEnvironment,
    placeShip,

  };
}
