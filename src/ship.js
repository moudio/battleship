export default function Ship(length) {
  return {
    length,
    places: new Array(length).fill('not hit'),
    state: 'not-sunk',
    hit(n) {
      this.places[n - 1] = 'hit';
    },

    isSunk() {
      const response = this.places.every(el => el === 'hit');
      if (response) {
        this.state = 'sunk';
        return true;
      }
      return false;
    },
    ship_coordonates: [],

  };
}
