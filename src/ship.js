 function Ship(length){
  return {
  length,
  coordonates : new Array(length).fill('not hit'),
  state: 'not-sunk',
  hit: function(n){
    this.coordonates[n-1] = 'hit'
  },

  isSunk: function(){
    const response = this.coordonates.every(el => el === 'hit');
    if(response){
      this.state = 'sunk';
      return true;
    } else {
      return false;
    }


  }

}

}


module.exports = Ship;
