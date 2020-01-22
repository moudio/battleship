const ship = require('./ship');
const gameboard = require('./gameboard');
const newShip = ship(3, 2, 1);
const board = gameboard();
console.log(board.createBoard());
