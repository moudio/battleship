const Gameboard = require ('./gameboard');

function Computer()  {

  return {
    randomMove: function(){
      const letters = ['A', 'B', 'C', 'D',
                          'E', 'F', 'G', 'H', 'I', 'J'];
      const random_index = Math.floor(Math.random() * possible_x.length);
      const random_letter = letters[random_index];
      const random_y = Math.ceil(Math.random() * 10);
      return [random_letter, random_y];
    },
    turn: false,
    gameEnvironment: Gameboard(),
    placeShip: function(n, x, y){
    const newShip =  this.gameEnvironment.createShip(n);
      this.gameEnvironment.placeShip(newShip, x, y);
    },

    printBoard: function(){
      const div = document.createElement('div');
      const container = document.querySelector('.container');
      const table = document.createElement('table');
      table.innerHTML += `<tbody> </tbody>`;
      console.log(table)
      div.appendChild(table);
      container.appendChild(div)

      const board = this.gameEnvironment.board;
        board.forEach((row, index) => {
          const tbody = document.querySelector('tbody');
          let table_row = document.createElement('tr');
          console.log(table_row)

           for(let element of row){
          const t_data = document.createElement('td');
          t_data.className = element;
          t_data.innerHTML = `       `;
          table_row.appendChild(t_data);
           }


           tbody.appendChild(table_row);

        });


    }


  }



}


module.exports = Computer;
