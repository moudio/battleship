const ship = require('./ship');
const gameboard = require('./gameboard');

const newShip = ship(3);
// const otherShip = ship(4)
const board = gameboard();
board.placeShip(newShip, 'C', 4);
board.receiveAttack('C', 4);
 board.receiveAttack('C', 5);
board.receiveAttack('C', 6);
// board.receiveAttack('C', 8);
console.log(board.board);
