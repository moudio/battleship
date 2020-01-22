const Gameboard = require ('./gameboard')

test('it tests if gameboard can create a ship', () => {
  const game = Gameboard();
  const shipFromBoard = game.createShip(4, 1, 5);
  expect(shipFromBoard.length).toBe(4);
  expect(shipFromBoard.coordinates.coord_x).toBe(1);
  expect(shipFromBoard.coordinates.coord_y).toBe(5);
})


test('it checks if gameboard ', () => {
  const game = Gameboard();
   expect(game.receiveAttack()).toBeDefined();
})
