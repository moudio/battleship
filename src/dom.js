export default function Dom() {
  function alert(message) {
    const alertDiv = document.createElement('div');
    const body = document.querySelector('body');

    alertDiv.innerHTML = `
    <div class="alert alert-warning">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>${message}</strong>
    </div>`;
    body.prepend(alertDiv);
    setTimeout(() => {
      const alert = document.querySelector('.alert');
      alert.style.display = 'none';
    }, 2000);
  }

  function updateComputerCell(e) {
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
        alert("You can't play this cell twice!");
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
  }

  function changeShipSunkColor(currentPlayer, ship, type) {
    let boardCells;
    if (type === 'player') {
      boardCells = Array.from(document.querySelectorAll('.player-board td'));
    } else if (type === 'computer') {
      boardCells = Array.from(document.querySelectorAll('.computer-board td'));
    }
    const indexLetter = currentPlayer.gameEnvironment.letterToNum[ship.ship_coordonates[0][0]];
    const letterNum = Number(ship.ship_coordonates[0].match(/\d+/g)[0]);
    let indexToStart = indexLetter * 10 + letterNum - 1;
    let i = 0;
    while (i < ship.length) {
      boardCells[indexToStart].classList.add('sunk');
      indexToStart += 1;
      i += 1;
    }
  }

  function printBoard(p) {
    const div = document.createElement('div');
    if (p.type === 'computer') {
      div.classList.add('board', 'computer-board');
    } else {
      div.classList.add('board', 'player-board');
    }
    const container = document.querySelector('.container');
    if (p.type === 'player') {
      container.innerHTML = '';
    }
    const table = document.createElement('table');
    const computerCaption = document.createElement('caption');
    computerCaption.className = 'table-caption';
    table.appendChild(computerCaption);
    computerCaption.innerHTML = 'Computer board';
    table.innerHTML += '<tbody> </tbody>';
    div.appendChild(table);
    container.appendChild(div);

    const {
      board,
    } = p.gameEnvironment;
    board.forEach((row) => {
      const allTbodies = document.querySelectorAll('tbody');
      const tbody = allTbodies[allTbodies.length - 1];
      const tableRow = document.createElement('tr');
      for (let i = 0; i < row.length; i += 1) {
        const tData = document.createElement('td');
        if (row[i].match(/ship/g)) {
          const shipName = row[i].match(/ship_\d+/)[0];
          const gridcoord = row[i].match(/[A-Z]\d+/)[0];
          if (p.type === 'computer') {
            tData.classList.add('computer-ship', shipName, gridcoord);
          } else {
            tData.classList.add('player-ship', shipName, gridcoord);
          }
        } else {
          tData.classList.add(row[i]);
        }
        tData.innerHTML = '';
        tableRow.appendChild(tData);
      }
      tbody.appendChild(tableRow);
    });
    if (p.type === 'computer') {
      document.querySelector('.computer-board').addEventListener('click', updateComputerCell);
    }
  }

  function updatePlayerCell(tdClass) {
    let tdTarget = document.querySelector(`.player-board .${tdClass}`);
    if (tdTarget === null) {
      tdTarget = document.querySelector(`.player-board .${tdClass}-blank`);
    }

    if (tdTarget.classList.contains('player-ship')) {
      tdTarget.classList.add('hit');
    } else {
      tdTarget.classList.add('miss');
    }
  }

  function updatePlayerBoard(player) {
    if (document.querySelector('.comp-move')) {
      const spanCoordonates = document.querySelector('.comp-move').innerHTML;
      const attackLetter = spanCoordonates.match(/[A-J]/g)[0];
      const attackNumber = Number(spanCoordonates.match(/\d+/g)[0]);
      player.gameEnvironment.receiveAttack(attackLetter, attackNumber);
      updatePlayerCell(spanCoordonates);
    }
    const boardCells = Array.from(document.querySelectorAll('.player-board td'));

    boardCells.forEach(cell => {
      if (cell.className.match(/hit/g)) {
        const cellClassNames = cell.className;
        const shipName = cellClassNames.match(/ship_\d+/)[0];
        const shipNumber = Number(shipName.charAt(shipName.length - 1));
        const gridcoord = cellClassNames.match(/[A-Z]\d+/)[0];
        const ship = player.gameEnvironment.ships[shipNumber];

        for (let i = 0; i < ship.ship_coordonates.length; i += 1) {
          if (ship.ship_coordonates[i] === gridcoord) {
            ship.places[i] = 'hit';
            if (ship.isSunk()) {
              changeShipSunkColor(player, ship, 'player');
            }
          }
        }
      }
    });
  }

  function updateComputerBoard(computer) {
    if (document.querySelector('.turn')) {
      const turnSpan = document.querySelector('.turn');
      if (turnSpan.innerHTML === 'Computer') {
        const computerMove = computer.validRandomComputerMove();
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
        document.querySelector('.computer-board').removeEventListener('click', updateComputerCell);
      } else {
        document.querySelector('.computer-board').addEventListener('click', updateComputerCell);
      }
    }
    const boardCells = Array.from(document.querySelectorAll('.computer-board td'));

    boardCells.forEach(cell => {
      if (cell.className.match(/hit/g)) {
        const cellClassNames = cell.className;
        const shipName = cellClassNames.match(/ship_\d+/)[0];
        const shipNumber = Number(shipName.charAt(shipName.length - 1));
        const gridcoord = cellClassNames.match(/[A-Z]\d+/)[0];
        const ship = computer.gameEnvironment.ships[shipNumber];
        for (let i = 0; i < ship.ship_coordonates.length; i += 1) {
          if (ship.ship_coordonates[i] === gridcoord) {
            ship.places[i] = 'hit';
            if (ship.isSunk()) {
              changeShipSunkColor(computer, ship, 'computer');
            }
          }
        }
      }
    });
  }

  function randomPlace() {
    const randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 9));
    const randomNumber = Math.ceil(Math.random() * 10);
    const result = [randomLetter, randomNumber];
    return result;
  }

  function validPosition(p, shipLength, letter, position) {
    const playerGameboard = p.gameEnvironment.board;
    const rowXIndex = p.gameEnvironment.letterToNum[letter];
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
  }

  function placeRandomShips(p) {
    const shipsLengths = [1, 1, 2, 2, 2, 3, 3, 4];
    shipsLengths.forEach(shipsLength => {
      let randomPosition = randomPlace();
      while (!validPosition(p, shipsLength, randomPosition[0], randomPosition[1])) {
        randomPosition = randomPlace();
      }

      p.placeShip(shipsLength, randomPosition[0], randomPosition[1]);
    });

    printBoard(p);
  }

  function gameOver(message) {
    if (!document.querySelector('.restart')) {
      const body = document.querySelector('body');
      const gameOverDiv = document.createElement('div');
      gameOverDiv.innerHTML = `<div class="card text-center">
  <div class="card-header">
    Game over, ${message}
  </div>
  <div class="card-body">
    <a href="#" class="btn btn-primary restart">Restart</a>
  </div>
</div>`;
      gameOverDiv.classList.add('game-over-div');

      body.prepend(gameOverDiv);
    }
    if (document.querySelector('.restart')) {
      const restartButton = document.querySelector('.restart');
      restartButton.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }

  return {
    updatePlayerBoard,
    updateComputerBoard,
    placeRandomShips,
    gameOver,

  };
}
