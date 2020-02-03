const Gameboard = require('./gameboard');

function Computer() {

  return {

    randomMove: function() {
      const letters = ['A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H', 'I', 'J'
      ];
      const random_index = Math.floor(Math.random() * letters.length);
      const random_letter = letters[random_index];
      const random_y = Math.ceil(Math.random() * 10);
      return [random_letter, random_y];

    },
    turn: true,
    gameEnvironment: Gameboard(),

    placeShip: function(n, x, y) {
      const newShip = this.gameEnvironment.createShip(n);
      this.gameEnvironment.placeShip(newShip, x, y);
    },

    printBoard: function() {
      const div = document.createElement('div');
      div.classList.add('board', 'computer-board')
      const container = document.querySelector('.container');
      const table = document.createElement('table');
      const computer_caption = document.createElement('caption');
      computer_caption.className = 'table-caption'
      table.appendChild(computer_caption)
      computer_caption.innerHTML = 'Computer board';
      table.innerHTML += `<tbody> </tbody>`;
      div.appendChild(table);
      container.appendChild(div)

      const board = this.gameEnvironment.board;
      board.forEach((row, index) => {
        let allTbodies = document.querySelectorAll('tbody');
        let tbody = allTbodies[allTbodies.length - 1];
        let table_row = document.createElement('tr');

        for (let element of row) {
          const t_data = document.createElement('td');
          if (element.match(/ship/g)) {
            const shipName = element.match(/ship_\d+/)[0];
            const gridcoord = element.match(/[A-Z]\d+/)[0]
            t_data.classList.add('computer-ship', shipName, gridcoord);
          } else {
            t_data.classList.add(element);
          }
          t_data.innerHTML = ``;
          table_row.appendChild(t_data);
        }
        tbody.appendChild(table_row);
      });

      document.querySelector('.computer-board').addEventListener('click', this.updateCell);

    },

    updateBoard: function() {
      if (document.querySelector(".turn")) {
        let turn_span = document.querySelector(".turn");
        if (turn_span.innerHTML === "Computer") {
          const computer_move = this.validRandomComputerMove();
          if (!document.querySelector('.comp-move')) {
            let comp_move_span = document.createElement("span");
            comp_move_span.className = 'comp-move'
            comp_move_span.innerHTML += `${computer_move[0]}`;
            comp_move_span.innerHTML += `${computer_move[1]}`;
            document.querySelector('body').appendChild(comp_move_span);
          } else {
            const comp_move_span = document.querySelector('.comp-move');
            comp_move_span.innerHTML = '';
            comp_move_span.innerHTML += `${computer_move[0]}`;
            comp_move_span.innerHTML += `${computer_move[1]}`;
          }

          turn_span.innerHTML = "Player";
          document.querySelector('.computer-board').removeEventListener('click', this.updateCell);
        } else {
          document.querySelector('.computer-board').addEventListener('click', this.updateCell);
        }

      }
      const board_cells = Array.from(document.querySelectorAll('.computer-board td'));

      board_cells.forEach(cell => {
        if (cell.className.match(/hit/g)) {
          const cellClassNames = cell.className
          const shipName = cellClassNames.match(/ship_\d+/)[0];
          const shipNumber = Number(shipName.charAt(shipName.length - 1));
          const gridcoord = cellClassNames.match(/[A-Z]\d+/)[0];
          const ship = this.gameEnvironment.ships[shipNumber];

          for (let i = 0; i < ship.ship_coordonates.length; i++) {
            if (ship.ship_coordonates[i] == gridcoord) {
              ship.places[i] = "hit";
              if (ship.isSunk()) {
                this.changeShipSunk(ship);
              }

            }
          }
        }
        // } else if (cell.className.match(/miss/g)) {
        //
        // }
      });



    },

    validRandomComputerMove: function() {
      let randomComputerMove = this.randomMove();
      while (this.gameEnvironment.moves.indexOf(randomComputerMove.join("")) !== -1) {
        randomComputerMove = this.randomMove();
      }
      this.gameEnvironment.moves.push(randomComputerMove.join(""));
      return randomComputerMove;
    },
    changeShipSunk: function(ship) {
      const board_cells = Array.from(document.querySelectorAll('.computer-board td'));
      const index_letter = this.gameEnvironment.letterToNum[ship.ship_coordonates[0][0]];
      const letter_num = Number(ship.ship_coordonates[0].match(/\d+/g)[0]);
      let index_to_start = index_letter * 10 + letter_num - 1;
      let i = 0;
      while (i < ship.length) {
        board_cells[index_to_start].classList.add('sunk');

        index_to_start++;
        i++;
      }

    },

    updateCell: function(e) {
      if (e.target.tagName.toLowerCase() === "td") {
        const grid_classes = e.target.className.split(" ");
        let ship_coord = grid_classes.find(el => el.match(/[A-Z]\d+/g));
        if (ship_coord.length > 3) {
          ship_coord = ship_coord.split("-")[0];
        }

        if (!document.querySelector('.player-move')) {
          const span = document.createElement('span')
          span.className = "player-move"
          span.innerHTML = ship_coord
          document.querySelector('body').appendChild(span);
        } else {
          const span = document.querySelector('.player-move')
          span.innerHTML = "";
          span.innerHTML = ship_coord
        }

        if (e.target.classList.contains('hit') || e.target.classList.contains('miss')) {
          alert("you can't play twice");
          return
        }

        if (!document.querySelector('.turn')) {
          const turn_span = document.createElement('span');
          turn_span.className = 'turn'
          turn_span.innerHTML = "Computer";
          document.querySelector('body').appendChild(turn_span);
        } else {
          document.querySelector('.turn').innerHTML = "Computer"
        }

        if (e.target.classList.contains('computer-ship')) {
          e.target.classList.add('hit');
          // let ship_number = grid_classes.find(el => el.match(/ship-\d+/g));
          // ship_number = Number(ship_number[ship_number.length - 1])

        } else {
          e.target.classList.add('miss');
        }

      }
    },



    placeRandomShips: function() {

      const shipsLengths = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
      shipsLengths.forEach(shipsLength => {
        let randomPosition = this.randomPlace();
        while (!this.validPosition(shipsLength, randomPosition[0], randomPosition[1])) {
          randomPosition = this.randomPlace();
        }
        this.placeShip(shipsLength, randomPosition[0], randomPosition[1]);

      });
      this.printBoard();

    },


    randomPlace: function() {
      const randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 9));
      const randomNumber = Math.ceil(Math.random() * 10);
      const result = [randomLetter, randomNumber];
      return result;
    },

    validPosition: function(shipLength, letter, position) {
      const player_gameboard = this.gameEnvironment.board;
      const row_x_index = this.gameEnvironment.letterToNum[letter];
      const row_x = player_gameboard[row_x_index];

      if ((position + shipLength) <= 10) {
        let real_ship_length = position + shipLength - 1;

        while (real_ship_length > position - 1) {

          if (row_x[real_ship_length - 1].match(/blank/) ||
            row_x[real_ship_length - 1].match(/ship/)) {

            return false;
          }
          real_ship_length--;
        }
        return true;
      } else {
        let ship_end_position = position - shipLength - 1;
        while (position - 1 > ship_end_position) {

          if (row_x[position - 1].match(/blank/) ||
            row_x[position - 1].match(/ship/)) {
            return false;
          }
          position--;
        }

        return true;


      }



    }

  }

}


module.exports = Computer;
