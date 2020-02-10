import Ship from './ship';

export default function Gameboard(player = null) {
  const ships = [];
  const moves = [];
  const letterToNum = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
  };
  function createShip(n) {
    const newShip = Ship(n);
    return newShip;
  }

  const board = (function () {
    const board = [];
    let boardRow = [];
    const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const col = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    for (let i = 0; i < row.length; i += 1) {
      for (let j = 0; j < col.length; j += 1) {
        boardRow.push(row[i] + col[j]);
        if (boardRow.length === 10) {
          board.push(boardRow);
          boardRow = [];
        }
      }
    }
    return board;
  }());

  function placeShip(ship, x, y) {
    const rowX = this.letterToNum[x];

    let maxLength = y + ship.length;
    if (maxLength <= 10) {
      for (let i = y; i < maxLength; i += 1) {
        this.board[rowX][i - 1] += ' ';
        this.board[rowX][i - 1] += `ship_${this.ships.length}`;

        if (this.board[rowX - 1]) {
          if (!this.board[rowX - 1][i - 1].match(/blank/g)) {
            this.board[rowX - 1][i - 1] += '-blank';
          }
        }

        if (this.board[rowX]) {
          if (i === y) {
            if (this.board[rowX][i - 2] && !this.board[rowX][i - 2].match(/blank/g)) {
              this.board[rowX][i - 2] += '-blank';
            }
          }

          if (i === maxLength - 1) {
            if (this.board[rowX][i] && !this.board[rowX][i].match(/blank/g)) {
              this.board[rowX][i] += '-blank';
            }
          }
        }

        if (this.board[rowX + 1]) {
          if (!this.board[rowX + 1][i - 1].match(/blank/g)) {
            this.board[rowX + 1][i - 1] += '-blank';
          }
        }
        ship.ship_coordonates.push(`${x}${i}`);
      }
    } else {
      maxLength = y - ship.length;
      for (let i = y; i > maxLength; i -= 1) {
        this.board[rowX][i - 1] += ' ';
        this.board[rowX][i - 1] += `ship_${this.ships.length}`;
        if (this.board[rowX - 1]) {
          if (!this.board[rowX - 1][i - 1].match(/blank/g)) {
            this.board[rowX - 1][i - 1] += '-blank';
          }
        }

        if (this.board[rowX + 1]) {
          if (!this.board[rowX + 1][i - 1].match(/blank/g)) this.board[rowX + 1][i - 1] += '-blank';
        }


        ship.ship_coordonates.unshift(`${x}${i}`);
      }
    }

    this.ships.push(ship);
    return this.board;
  }

  function receiveAttack(x, y) {
    const rowX = this.letterToNum[x];
    const hitCoordonate = this.board[rowX][y - 1].split('_');
    if (/ship/g.test(hitCoordonate[0])) {
      this.board[rowX][y - 1] = 'hit';
      const shipNumber = hitCoordonate[1];
      const hitShip = this.ships[shipNumber];
      const indexHit = hitShip.ship_coordonates.indexOf(`${x}${y}`);
      hitShip.places[indexHit] = 'hit';
    } else {
      this.board[rowX][y - 1] = 'miss';
    }
  }

  function attack(x, y) {
    if (player) {
      player.board.receiveAttack(x, y);
    }
  }

  function allShipsSunk() {
    return this.ships.every(ship => ship.isSunk() === true);
  }

  return {
    ships,
    moves,
    letterToNum,
    createShip,
    board,
    placeShip,
    receiveAttack,
    attack,
    allShipsSunk,

  };
}
