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

      const computer = Computer();


player.placeRandomShips();
computer.placeRandomShips();

  player.printBoard();

  computer.printBoard();



      // computer.printBoard();

      // while(player.gameEnvironment.all_ships_sunk === false && player.gameEnvironment.all_ships_sunk === false){
      //   console.log("hello")
      // }




  }
}
};



module.exports = Game;
