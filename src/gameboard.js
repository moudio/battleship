const Ship = require('./ship')
function Gameboard(){

 return {
   createShip: function(n, x, y){
     const newShip = Ship(n, x, y);
     placeShip(x,y);
     return newShip;

   },
   receiveAttack: function(x, y){

   },
   board: function(){
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

 },
 placeShip: function(x, y, ship){

 }

}
}



module.exports = Gameboard;
