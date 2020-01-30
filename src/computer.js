const Gameboard = require ('./gameboard');

function Computer()  {

  return {

    randomMove: function(){
      const letters = ['A', 'B', 'C', 'D',
                          'E', 'F', 'G', 'H', 'I', 'J'];
      const random_index = Math.floor(Math.random() * letters.length);
      const random_letter = letters[random_index];
      const random_y = Math.ceil(Math.random() * 10);
      return [random_letter, random_y];

    },
    turn: true,
    gameEnvironment: Gameboard(),
    placeShip: function(n, x, y){
    const newShip =  this.gameEnvironment.createShip(n);
      this.gameEnvironment.placeShip(newShip, x, y);
    },

    printBoard: function(){
      const div = document.createElement('div');
      div.classList.add('board', 'computer-board')
      const container = document.querySelector('.container');
      const table = document.createElement('table');
      table.innerHTML += `<tbody> </tbody>`;
      div.appendChild(table);
      container.appendChild(div)

      const board = this.gameEnvironment.board;
        board.forEach((row, index) => {
          let allTbodies = document.querySelectorAll('tbody');
          let tbody = allTbodies[allTbodies.length -1];
          let table_row = document.createElement('tr');

           for(let element of row){
          const t_data = document.createElement('td');
          if(element.match(/ship/g)){
            const shipName = element.match(/ship-\d+/)[0];
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


        document.querySelector('.computer-board').addEventListener('click', this.updateShip);


    },

    updateBoard: function() {
      const board_cells = Array.from(document.querySelectorAll('.computer-board td'));
     if(document.querySelector("h1")){
              let h1 = document.querySelector("h1");
              if(h1.innerHTML === "Computer"){
                const computer_move = this.randomMove();
                if(!document.querySelector('p')){
                let p = document.createElement("p");
                p.innerHTML += `${computer_move[0]}`;
                p.innerHTML += `${computer_move[1]}`;
                document.querySelector('.container').appendChild(p);
              } else {
                const p = document.querySelector('p');
                p.innerHTML = '';
                p.innerHTML += `${computer_move[0]}`;
                p.innerHTML += `${computer_move[1]}`;
              }
                 h1.innerHTML = "Player";
                document.querySelector('.computer-board').removeEventListener('click', this.updateShip);
              } else {
                document.querySelector('.computer-board').addEventListener('click', this.updateShip);
        };

        }
board_cells.forEach(cell => {
  if(cell.className.match(/hit/g)){
      const cellClassNames = cell.className
      const shipName = cellClassNames.match(/ship-\d+/)[0];
      const shipNumber = Number(shipName.charAt(shipName.length -1));
      const gridcoord = cellClassNames.match(/[A-Z]\d+/)[0];
const ship = this.gameEnvironment.ships[shipNumber];

for(let i = 0 ; i < ship.ship_coordonates.length; i++){
  if(ship.ship_coordonates[i] == gridcoord){
    ship.places[i] = "hit";
    if(ship.isSunk()){
      this.changeShipSunkColor(ship);
    }

  }
}
  } else if (cell.className.match(/miss/g)) {

  }
});
    },
    changeShipSunkColor: function(ship){
      const board_cells = Array.from(document.querySelectorAll('.computer-board td'));
      const index_letter = this.gameEnvironment.letterToNum[ship.ship_coordonates[0][0]];
      const letter_num = Number(ship.ship_coordonates[0].match(/\d+/g)[0]);
      let index_to_start = index_letter * 10 + letter_num - 1 ;
      let i = 0 ;
      while(i < ship.length){
        board_cells[index_to_start].classList.add('sunk');
        index_to_start ++;
        i++;
      }

    },

    updateShip: function(e){
      if(!document.querySelector('h1')){
        const h1 = document.createElement('h1');
        h1.innerHTML = "Computer";
        document.querySelector('.container').appendChild(h1);
      } else {
        document.querySelector('h1').innerHTML = "Computer"
      }
        const target = e.target
        if(e.target.classList.contains('computer-ship')){
          e.target.classList.add('hit');
          const grid_classes = target.className.split(" ");
          let ship_number = grid_classes.find(el => el.match(/ship-\d+/g));
          ship_number = Number(ship_number[ship_number.length - 1])
          const ship_coord = grid_classes.find(el => el.match(/[A-J]\d+/g));
        } else {
          e.target.classList.add('miss');
        }

    },



    placeRandomShips: function(){

      const shipsLengths = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4 ];
      shipsLengths.forEach(shipsLength => {
        let randomPosition = this.randomPlace();
        while(!this.validPosition(shipsLength, randomPosition[0], randomPosition[1])){
          randomPosition = this.randomPlace();
        }
        this.placeShip(shipsLength, randomPosition[0], randomPosition[1]);

      });
      this.printBoard();

    },


    randomPlace: function(){
      const randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 9));
      const randomNumber = Math.ceil(Math.random() * 10);
      const result = [randomLetter, randomNumber];
      return result;
    },

    validPosition: function(shipLength, letter, position){
      //check if there is already a ship;

      const player_gameboard = this.gameEnvironment.board;
      const row_x_index = this.gameEnvironment.letterToNum[letter];
      const row_x = player_gameboard[row_x_index];

      if((position + shipLength) <= 10){
        let real_ship_length = position + shipLength -1;

        while(real_ship_length > position - 1){

          if(row_x[real_ship_length-1].match(/ship/)){

            return false;
          }
          real_ship_length --;
        }
        return true;
      } else {
        let ship_end_position = position - shipLength - 1;
        while(position - 1 > ship_end_position){

          if(row_x[position - 1].match(/ship/)){
            return false;
          }
          position --;
        }

        return true;


      }



  }

}

}


module.exports = Computer;
