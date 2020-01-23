const Gameboard = require ('./gameboard');
const Ship = require('./ship');

test('it checks if gameboard can place the ship ', () => {
  const game = Gameboard();
  let newShip = Ship(1);
  game.placeShip(newShip, 'A', 1);
  expect(game.board).toEqual([
  ["ship-0", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
  ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
  ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
  ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"],
  ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]
]);

newShip = Ship(4)
  expect(game.placeShip(newShip, 'B', 6)).toEqual([
  ["ship-0", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  ["B1", "B2", "B3", "B4", "B5", "ship-1", "ship-1", "ship-1", "ship-1", "B10"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
  ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
  ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
  ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"],
  ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]
]);


});

test('it checks the receiveAttack function when there is a hit', () => {
const gameboard = Gameboard();
let newShip = Ship(3);
gameboard.placeShip(newShip, 'A', 4);
gameboard.receiveAttack('A', 5);
expect(gameboard.board).toEqual([
  ["A1", "A2", "A3", "ship-0", "hit", "ship-0", "A7", "A8", "A9", "A10"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
  ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
  ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
  ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"],
  ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]
]);

});

test('it checks the receiveAttack function when there is a miss', () => {
  const gameboard = Gameboard();
  let newShip = Ship(3);
  gameboard.placeShip(newShip, 'C', 6);
  gameboard.receiveAttack('D', 8);
  expect(gameboard.board).toEqual([
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
    ["C1", "C2", "C3", "C4", "C5", "ship-0", "ship-0", "ship-0", "C9", "C10"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "X", "D9", "D10"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
    ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"],
    ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]
  ])
});

test('it checks if all the ships are not sunk when not all hit', () => {
  const gameboard = Gameboard();
  let firstShip = Ship(3);
  let secondShip = Ship(4);
  gameboard.placeShip(firstShip, 'C', 6);
  gameboard.placeShip(secondShip, 'A', 3);
  gameboard.receiveAttack('C', 6);
  gameboard.receiveAttack('C', 7);
  gameboard.receiveAttack('C', 8);
  gameboard.receiveAttack('A', 4);

  expect(gameboard.all_ships_sunk()).toBe(false);

});
test('it checks if all the ships are sunk when all hit', () => {
  const gameboard = Gameboard();
  let firstShip = Ship(3);
  let secondShip = Ship(2);
  gameboard.placeShip(firstShip, 'C', 6);
  gameboard.placeShip(secondShip, 'J', 3 );
  gameboard.receiveAttack('C', 6);
  gameboard.receiveAttack('C', 7);
  gameboard.receiveAttack('C', 8);

  gameboard.receiveAttack('J', 3)
  gameboard.receiveAttack('J', 4)
  expect(gameboard.all_ships_sunk()).toBe(true);

});
