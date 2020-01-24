const Player = require('./player');
const Computer =  require('./computer');

function Game (){

  return {
      attack: function(player, x, y){
      player === player ? player : computer;
      player.gameEnvironment.receiveAttack(x,y);
    },


    start: function(){
      const player = Player() ;
      const computer = Computer();
      // while(player.gameEnvironment.all_ships_sunk || computer.gameEnvironment.all_ships_sunk){
      //
      // }
      console.log("started")
      player.printBoard();
      computer.printBoard();
    }

  }

};



module.exports = Game;
