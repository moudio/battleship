 function Ship(length){

  return {
  length,
   places : new Array(length).fill('not hit'),
  state: 'not-sunk',

  hit: function(n){
    this.places[n-1] = 'hit'
  },

  isSunk: function(){
    const response = this.places.every(el => el === 'hit');
    if(response){
      this.state = 'sunk';
      return true;
    } else {
      return false;
    }


  },


}

}


module.exports = Ship;
