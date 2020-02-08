require('bootstrap');
require('./scss/app.scss');
const Game = require('./game');

const game = Game();
game.start();
