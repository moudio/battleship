const Ship = require('./ship');
function Gameboard(player = null){

 return {
   ships: [],
  letterToNum : {
     'A': 0,'B': 1, 'C': 2, 'D': 3,'E': 4,
     'F': 5,'G': 6, 'H': 7, 'I': 8,'J': 9
   },
   createShip: function(n){
     const newShip = Ship(n);
     return newShip;
   },

   board: (function(){
     const board = [];
     const number = 0;
     let board_row = [];
     let row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
     let col = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
     for(let row_element of row){
       for(let col_element of col ){
         board_row.push(row_element + col_element);
         if(board_row.length === 10){
           board.push(board_row);
           board_row = [];
         }
       }
     }
     return board;

 })(),

  placeShip: function(ship, x, y){

  const row_x = this.letterToNum[x];

  let max_length = y + ship.length;
if(max_length <= 10){
  for(let i = y; i < max_length; i++){
    this.board[row_x][i - 1] += `ship-${this.ships.length}`;
    ship.ship_coordonates.push(`${x}${i}` );
  }
} else {
max_length = y - ship.length;
for(let i = y; i > max_length; i--){
  this.board[row_x][i - 1] += `ship-${this.ships.length}`;
  ship.ship_coordonates.push(`${x}${i}` );
}

}

this.ships.push(ship);
  return  this.board;
},

receiveAttack: function(x, y){
const row_x = this.letterToNum[x];
let hit_coordonate = this.board[row_x][y-1].split('-');

if(hit_coordonate[0] === 'ship'){
  this.board[row_x][y - 1] = 'hit';
  const ship_number = hit_coordonate[1];
  const hit_ship = this.ships[ship_number];
  const indexHit = hit_ship.ship_coordonates.indexOf(`${x}${y}`);
  hit_ship.ship_coordonates[indexHit] = 'hit'
} else {
    this.board[row_x][y - 1]  = 'X';
}

},

attack: function(x,y){
  if(player){
    player.board.receiveAttack(x,y)
  }
},

all_ships_sunk : function(){
return this.ships.every(ship => ship.isSunk() === true)
},


}
}



module.exports = Gameboard;
