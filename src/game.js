const Player = require('./player');
const Computer =  require('./computer');

function Game (){

  return {

    start: function(){
      const player = Player();
      const computer = Computer();
      player.placeRandomShips();
      computer.placeRandomShips();
      setInterval(function(){
          computer.updateBoard();
          player.updateBoard();
        }, 300)
  }
}
};



module.exports = Game;
