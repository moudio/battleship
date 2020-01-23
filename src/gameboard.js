const Ship = require('./ship');
function Gameboard(){

 return {
  letterToNum : {
     'A': 0,'B': 1, 'C': 2, 'D': 3,'E': 4,
     'F': 5,'G': 6, 'H': 7, 'I': 8,'J': 9
   },
   createShip: function(n, x, y){
     const newShip = Ship(n);
     // placeShip(newShip, x, y);
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

  for(let i = y; i < max_length; i++){
    this.board[row_x][i - 1] = 'ship';
  }
  return  this.board;
},

receiveAttack: function(x, y){
const row_x = this.letterToNum[x];
let hit_coordonate = this.board[row_x][y];
if(hit_coordonate === 'ship'){
  this.board[row_x][y - 1] = 'hit';
} else {
    this.board[row_x][y - 1]  = 'X'
}

}

}
}



module.exports = Gameboard;
