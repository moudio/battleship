const Ship = require('./ship');

function Gameboard(player = null) {

  return {
    ships: [],
    moves: [],
    letterToNum: {
      'A': 0,
      'B': 1,
      'C': 2,
      'D': 3,
      'E': 4,
      'F': 5,
      'G': 6,
      'H': 7,
      'I': 8,
      'J': 9
    },
    createShip: function(n) {
      const newShip = Ship(n);
      return newShip;
    },

    board: (function() {
      const board = [];
      let board_row = [];
      let row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      let col = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      for (let row_element of row) {
        for (let col_element of col) {
          board_row.push(row_element + col_element);
          if (board_row.length === 10) {
            board.push(board_row);
            board_row = [];
          }
        }
      }
      return board;

    })(),

    placeShip: function(ship, x, y) {

      const row_x = this.letterToNum[x];

      let max_length = y + ship.length;
      if (max_length <= 10) {
        for (let i = y; i < max_length; i++) {
          this.board[row_x][i - 1] += " ";
          this.board[row_x][i - 1] += `ship_${this.ships.length}`;

          if (this.board[row_x - 1]) {
            if (!this.board[row_x - 1][i - 1].match(/blank/g)) {
              this.board[row_x - 1][i - 1] += "-blank";
            }

          }

          if(this.board[row_x]){

          if (i === y) {

            if (this.board[row_x][i - 2] && !this.board[row_x][i - 2].match(/blank/g)) {
              this.board[row_x][i - 2] += "-blank";
            }

          }

          if(max_length - y > 3){
          if (i === max_length - 1) {

            if (this.board[row_x][i] && !this.board[row_x][i].match(/blank/g)) {
              this.board[row_x][i] += "-blank";
            }
          }
        }
}

          if (this.board[row_x + 1]) {
            if (!this.board[row_x + 1][i - 1].match(/blank/g)) {
              this.board[row_x + 1][i - 1] += "-blank";
            }

          }
          ship.ship_coordonates.push(`${x}${i}`);
        }
      } else {
        max_length = y - ship.length;
        for (let i = y; i > max_length; i--) {
          this.board[row_x][i - 1] += " ";
          this.board[row_x][i - 1] += `ship_${this.ships.length}`;
          if (this.board[row_x - 1]) {
            if (!this.board[row_x - 1][i - 1].match(/blank/g)) {
              this.board[row_x - 1][i - 1] += "-blank";
            }
          }

          if (this.board[row_x + 1]) {
            if (!this.board[row_x + 1][i - 1].match(/blank/g))
              this.board[row_x + 1][i - 1] += "-blank"

          }


          ship.ship_coordonates.unshift(`${x}${i}`);
        }

      }

      this.ships.push(ship);
      return this.board;

    },

    receiveAttack: function(x, y) {
      const row_x = this.letterToNum[x];
      let hit_coordonate = this.board[row_x][y - 1].split('_');

      if(this.board[row_x][y-1] === 'hit' || this.board[row_x][y-1] === 'miss'){
        return;
      } else {
      if (/ship/g.test(hit_coordonate[0])) {
        this.board[row_x][y - 1] = 'hit';
        const ship_number = hit_coordonate[1];
        const hit_ship = this.ships[ship_number];
        const indexHit = hit_ship.ship_coordonates.indexOf(`${x}${y}`);
        hit_ship.places[indexHit] = 'hit';

      } else {
        this.board[row_x][y - 1] = 'miss';
      }
    }
    },

    attack: function(x, y) {
      if (player) {
        player.board.receiveAttack(x, y)
      }
    },

    all_ships_sunk: function() {
      return this.ships.every(ship => ship.isSunk() === true);

    }, 



    game_over: function(message) {
      if (!document.querySelector('.restart')) {
        const body = document.querySelector('body')
        const gameOverDiv = document.createElement('div');
        gameOverDiv.innerHTML = `<div class="card text-center">
  <div class="card-header">
    Game over, ${message}
  </div>
  <div class="card-body">
    <a href="#" class="btn btn-primary restart">Restart</a>
  </div>
</div>`
        gameOverDiv.classList.add('game-over-div');

        body.prepend(gameOverDiv);
      }
      if (document.querySelector('.restart')) {
        const restartButton = document.querySelector('.restart');
        restartButton.addEventListener('click', function() {
          window.location.reload()
        });
      }
    }
  }
}



module.exports = Gameboard;
