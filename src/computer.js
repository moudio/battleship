import Gameboard from './gameboard';

export default function Computer() {
  return {

    randomMove() {
      const letters = ['A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H', 'I', 'J',
      ];
      const randomIndex = Math.floor(Math.random() * letters.length);
      const randomLetter = letters[randomIndex];
      const randomY = Math.ceil(Math.random() * 10);
      return [randomLetter, randomY];
    },
    turn: true,
    gameEnvironment: Gameboard(),

    placeShip(n, x, y) {
      const newShip = this.gameEnvironment.createShip(n);
      this.gameEnvironment.placeShip(newShip, x, y);
    },

    printBoard() {
      const div = document.createElement('div');
      div.classList.add('board', 'computer-board');
      const container = document.querySelector('.container');
      const table = document.createElement('table');
      const computerCaption = document.createElement('caption');
      computerCaption.className = 'table-caption';
      table.appendChild(computerCaption);
      computerCaption.innerHTML = 'Computer board';
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
            tData.classList.add('computer-ship', shipName, gridcoord);
          } else {
            tData.classList.add(row[i]);
          }
          tData.innerHTML = '';
          tableRow.appendChild(tData);
        }

        tbody.appendChild(tableRow);
      });

      document.querySelector('.computer-board').addEventListener('click', this.updateCell);
    },

    updateBoard() {
      if (document.querySelector('.turn')) {
        const turnSpan = document.querySelector('.turn');
        if (turnSpan.innerHTML === 'Computer') {
          const computerMove = this.validRandomComputerMove();
          if (!document.querySelector('.comp-move')) {
            const compMoveSpan = document.createElement('span');
            compMoveSpan.className = 'comp-move';
            compMoveSpan.innerHTML += `${computerMove[0]}`;
            compMoveSpan.innerHTML += `${computerMove[1]}`;
            document.querySelector('body').appendChild(compMoveSpan);
          } else {
            const compMoveSpan = document.querySelector('.comp-move');
            compMoveSpan.innerHTML = '';
            compMoveSpan.innerHTML += `${computerMove[0]}`;
            compMoveSpan.innerHTML += `${computerMove[1]}`;
          }

          turnSpan.innerHTML = 'Player';
          document.querySelector('.computer-board').removeEventListener('click', this.updateCell);
        } else {
          document.querySelector('.computer-board').addEventListener('click', this.updateCell);
        }
      }
      const boardCells = Array.from(document.querySelectorAll('.computer-board td'));

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
                this.changeShipSunk(ship);
              }
            }
          }
        }
      });
    },

    validRandomComputerMove() {
      let randomComputerMove = this.randomMove();
      while (this.gameEnvironment.moves.indexOf(randomComputerMove.join('')) !== -1) {
        randomComputerMove = this.randomMove();
      }
      this.gameEnvironment.moves.push(randomComputerMove.join(''));
      return randomComputerMove;
    },
    changeShipSunk(ship) {
      const boardCells = Array.from(document.querySelectorAll('.computer-board td'));
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

    updateCell(e) {
      if (e.target.tagName.toLowerCase() === 'td') {
        const gridClasses = e.target.className.split(' ');
        let shipCoord = gridClasses.find(el => el.match(/[A-Z]\d+/g));
        if (shipCoord.length > 3) {
          [shipCoord] = shipCoord.split('-');
        }
        if (!document.querySelector('.player-move')) {
          const span = document.createElement('span');
          span.className = 'player-move';
          span.innerHTML = shipCoord;
          document.querySelector('body').appendChild(span);
        } else {
          const span = document.querySelector('.player-move');
          span.innerHTML = '';
          span.innerHTML = shipCoord;
        }

        if (e.target.classList.contains('hit') || e.target.classList.contains('miss')) {
          const alertDiv = document.createElement('div');
          const body = document.querySelector('body');

          alertDiv.innerHTML = `
          <div class="alert alert-warning">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>You can't play this cell twice!</strong>
          </div>`;
          body.prepend(alertDiv);
          setTimeout(() => {
            const alert = document.querySelector('.alert');
            alert.style.display = 'none';
          }, 2000);
          return;
        }


        if (!document.querySelector('.turn')) {
          const turnSpan = document.createElement('span');
          turnSpan.className = 'turn';
          turnSpan.innerHTML = 'Computer';
          document.querySelector('body').appendChild(turnSpan);
        } else {
          document.querySelector('.turn').innerHTML = 'Computer';
        }

        if (e.target.classList.contains('computer-ship')) {
          e.target.classList.add('hit');
        } else {
          e.target.classList.add('miss');
        }
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
