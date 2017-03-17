
fns = {

  calculateTarget: function (x,y,Tx,Ty) {
    let targetArr = [Tx,Ty];
    //take those four values and return an [x,y] coordinate
    //that makes sense to the caller of the A.calculateTarget method
    //i think I'm on the right track
    return targetArr
  },

  updateNextPos: function (xTarget, yTarget) {
    this.nextX += 0.5*xTarget;
    this.nextY += 0.5*yTarget;
  },

  moveMe: function () {
    this.yPos += nextX;
    this.xPos += nextY
  }

}



