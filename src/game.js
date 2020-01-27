const Player = require('./player');
const Computer =  require('./computer');

function Game (){

  return {
      attack: function(player, x, y){
      player === player ? player : computer;
      player.gameEnvironment.receiveAttack(x,y);
    },


    start: function(){
      const player = Player()
      // const computer = Computer();
      // while(player.gameEnvironment.all_ships_sunk || computer.gameEnvironment.all_ships_sunk){
      //
      // }
console.log("calling random placement")
player.placeRandomShips();
      player.printBoard();
      // computer.printBoard();

      // while(player.gameEnvironment.all_ships_sunk === false && player.gameEnvironment.all_ships_sunk === false){
      //   console.log("hello")
      // }




  }
}
};



module.exports = Game;
