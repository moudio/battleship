const Ship = require('./ship');
test('checks if the ship is created', ()=> {
  let newShip = Ship(3);
  expect(newShip.length).toBe(3);
   newShip = Ship(6);
  expect(newShip.length).toBe(6)
});

test('check for the ships coordonates', ()=> {
  const newShip = Ship(3);
  expect(newShip.places).toEqual(['not hit', 'not hit', 'not hit'])
});


test('check if the hit function actually hits the ship', () => {
  const newShip = Ship(4);
  newShip.hit(3);
  expect(newShip.places).toEqual(['not hit', 'not hit', 'hit', 'not hit']);
});

test('check if the ship is sunk or not', () => {
  const newShip = Ship(3);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  expect(newShip.isSunk()).toBe(true);
  expect(newShip.state).toBe('sunk');
})
