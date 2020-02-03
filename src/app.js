import 'bootstrap';
import './scss/app.scss';
const ship = require('./ship');
const gameboard = require('./gameboard');
const Player = require('./player');
const Game = require('./game');
const game = Game();
game.start()
