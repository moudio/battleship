import Gameboard from './gameboard';

export default function Computer() {
  const turn = true;
  const type = 'computer';
  const gameEnvironment = Gameboard();
  function placeShip(n, x, y) {
    const newShip = this.gameEnvironment.createShip(n);
    this.gameEnvironment.placeShip(newShip, x, y);
  }
  function randomMove() {
    const letters = ['A', 'B', 'C', 'D',
      'E', 'F', 'G', 'H', 'I', 'J',
    ];
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];
    const randomY = Math.ceil(Math.random() * 10);
    return [randomLetter, randomY];
  }

  function validRandomComputerMove() {
    let randomComputerMove = this.randomMove();
    while (this.gameEnvironment.moves.indexOf(randomComputerMove.join('')) !== -1) {
      randomComputerMove = this.randomMove();
    }
    this.gameEnvironment.moves.push(randomComputerMove.join(''));
    return randomComputerMove;
  }

  return {
    validRandomComputerMove,
    turn,
    type,
    gameEnvironment,
    placeShip,
    randomMove,

  };
}
