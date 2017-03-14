
//one jquery selection
let AVT = $("#avatar");

//two jquery selection
let hAVT = AVT.parent();

//hAVT is AVT's handle, it is a positionable handle for AVT, absolute within its div... maybe it'll make more sense later

let A = {
    name: "playerName",
    jq: AVT,
    handle: hAVT,
    xPos: 0,
    yPos: 0,
    nextX: 0,
    nextY: 0,

    moveMe: function () {
      this.yPos += nextX;
      this.xPos += nextY
    },

    updateNextPos: function (xTarget, yTarget) {
      this.nextX += 0.5*xTarget;
      this.nextY += 0.5*yTarget;
    },

    /// several other functions;
    /// can i get movement out of this?
}

//
