const Ship = require('./ship')
function Gameboard(){
 return {
   createShip: function(n){
     const newShip = Ship(n);
     return newShip;
   }
 }
}


module.exports = Gameboard;
