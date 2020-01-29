const Player = require('./player');
const Computer =  require('./computer');

function Game (){

  return {
      attack: function(player, x, y){
      player === player ? player : computer;
      player.gameEnvironment.receiveAttack(x,y);
    },
    start: function(){

      const player = Player();
      const computer = Computer();
      player.placeRandomShips();
      computer.placeRandomShips();

        // setInterval(function(){
          player.printBoard();
           computer.printBoard();
        // }, 3000)
  }
}
};



module.exports = Game;
