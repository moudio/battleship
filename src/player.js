const Gameboard = require('./gameboard');

function Player() {
  return {
    turn: false,
    gameEnvironment: Gameboard(),
    placeShip(n, x, y) {
      const newShip = this.gameEnvironment.createShip(n);
      this.gameEnvironment.placeShip(newShip, x, y);
    },
    printBoard() {
      const div = document.createElement('div');
      div.classList.add('board', 'player-board');
      const container = document.querySelector('.container');
      container.innerHTML = '';
      const table = document.createElement('table');
      const playerCaption = document.createElement('caption');
      playerCaption.className = 'table-caption';
      table.appendChild(playerCaption);
      playerCaption.innerHTML = 'Your board';
      table.innerHTML += '<tbody> </tbody>';
      div.appendChild(table);


      container.appendChild(div);

      const { board } = this.gameEnvironment;
      board.forEach((row) => {
        const allTbodies = document.querySelectorAll('tbody');
        const tbody = allTbodies[allTbodies.length - 1];
        const tableRow = document.createElement('tr');


        for (let i = 0; i < row.length; i += 1) {
          const tData = document.createElement('td');
          if (row[i].match(/ship/g)) {
            const shipName = row[i].match(/ship_\d+/)[0];
            const gridcoord = row[i].match(/[A-Z]\d+/)[0];
            tData.classList.add('player-ship', shipName, gridcoord);
          } else {
            tData.classList.add(row[i]);
          }
          tData.innerHTML = '';
          tableRow.appendChild(tData);
        }
        tbody.appendChild(tableRow);
      });
    },

    updateBoard() {
      if (document.querySelector('.comp-move')) {
        const spanCoordonates = document.querySelector('.comp-move').innerHTML;
        const attackLetter = spanCoordonates.match(/[A-J]/g)[0];
        const attackNumber = Number(spanCoordonates.match(/\d+/g)[0]);
        this.gameEnvironment.receiveAttack(attackLetter, attackNumber);
        this.updatePlayerCell(spanCoordonates);
      }
      const boardCells = Array.from(document.querySelectorAll('.player-board td'));

      boardCells.forEach(cell => {
        if (cell.className.match(/hit/g)) {
          const cellClassNames = cell.className;
          const shipName = cellClassNames.match(/ship_\d+/)[0];
          const shipNumber = Number(shipName.charAt(shipName.length - 1));
          const gridcoord = cellClassNames.match(/[A-Z]\d+/)[0];
          const ship = this.gameEnvironment.ships[shipNumber];

          for (let i = 0; i < ship.ship_coordonates.length; i += 1) {
            if (ship.ship_coordonates[i] === gridcoord) {
              ship.places[i] = 'hit';
              if (ship.isSunk()) {
                this.changeShipSunkColor(ship);
              }
            }
          }
        }
      });
    },

    changeShipSunkColor(ship) {
      const boardCells = Array.from(document.querySelectorAll('.player-board td'));
      const indexLetter = this.gameEnvironment.letterToNum[ship.ship_coordonates[0][0]];
      const letterNum = Number(ship.ship_coordonates[0].match(/\d+/g)[0]);
      let indexToStart = indexLetter * 10 + letterNum - 1;
      let i = 0;
      while (i < ship.length) {
        boardCells[indexToStart].classList.add('sunk');
        indexToStart += 1;
        i += 1;
      }
    },

    updatePlayerCell(tdClass) {
      let tdTarget = document.querySelector(`.player-board .${tdClass}`);
      if (tdTarget === null) {
        tdTarget = document.querySelector(`.player-board .${tdClass}-blank`);
      }

      if (tdTarget.classList.contains('player-ship')) {
        tdTarget.classList.add('hit');
      } else {
        tdTarget.classList.add('miss');
      }
    },

    placeRandomShips() {
      const shipsLengths = [1, 1, 2, 2, 2, 3, 3, 4];
      shipsLengths.forEach(shipsLength => {
        let randomPosition = this.randomPlace();
        while (!this.validPosition(shipsLength, randomPosition[0], randomPosition[1])) {
          randomPosition = this.randomPlace();
        }

        this.placeShip(shipsLength, randomPosition[0], randomPosition[1]);
      });
      this.printBoard();
    },

    randomPlace() {
      const randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 9));
      const randomNumber = Math.ceil(Math.random() * 10);
      const result = [randomLetter, randomNumber];
      return result;
    },

    validPosition(shipLength, letter, position) {
      const playerGameboard = this.gameEnvironment.board;
      const rowXIndex = this.gameEnvironment.letterToNum[letter];
      const rowX = playerGameboard[rowXIndex];

      if ((position + shipLength) <= 10) {
        let realShipLength = position + shipLength - 1;

        while (realShipLength > position - 1) {
          if (rowX[realShipLength - 1].match(/blank/)
          || rowX[realShipLength - 1].match(/ship/)) {
            return false;
          }
          realShipLength -= 1;
        }
        return true;
      }
      const shipEndPosition = position - shipLength - 1;
      while (position - 1 > shipEndPosition) {
        if (rowX[position - 1].match(/blank/)
              || rowX[position - 1].match(/ship/)) {
          return false;
        }
        position -= 1;
      }

      return true;
    },


  };
}


module.exports = Player;
