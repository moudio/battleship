const Gameboard = require ('./gameboard')

test('it tests if gameboard can create a ship', () => {
  const game = Gameboard();
  const shipFromBoard = game.createShip(4);
  expect(shipFromBoard.length).toBe(4);
})
