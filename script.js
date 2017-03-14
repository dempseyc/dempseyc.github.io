//one jquery selection
let AVT = $("#avatar");

//two jquery selection
let hAVT = AVT.parent();

//hAVT is AVT's handle, it is a positionable handle for AVT, absolute within its div... maybe that will make more sense later

let A = {
  name: "playerName",
  jq: AVT,
  handle: hAVT,
  xPos: 0,
  yPos: 0,
  nextX: 0,
  nextY: 0,
  yTarget: 0,
  xTarget: 0,

  // for instance, below, outsite of A
  // [A.calculateTarget(A.xPos,A.yPos,A.xTarget,A.xTarget)]
  calculateTarget: function (x,y,Tx,Ty) {
    let targetArr = [Tx,Ty];  //does this look like an array with 2 items?
    //take those four values and return an [x,y] coordinate
    //that makes sense to the caller of the A.calculateTarget method
    //i think I'm on the right track
    return targetArr
  }

  updateNextPos: function (xTarget, yTarget) {
    this.nextX += 0.5*xTarget;
    this.nextY += 0.5*yTarget;
  },

  moveMe: function () {
    this.yPos += nextX;
    this.xPos += nextY
  },

  /// several other functions also;
    /// can i get movement out of this?
} //closes object A



