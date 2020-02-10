import Game from './game';
// eslint-disable-next-line
require('bootstrap');
require('./scss/app.scss');

const game = Game();
game.start();
