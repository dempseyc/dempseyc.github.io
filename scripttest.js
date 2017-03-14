
let AVT = $("#avatar");

//two jquery selection
let hAVT = $("#avatarhandle");

let A = {
  xPos: 400,
  yPos: 400,
  yTarget: 400,
  xTarget: 400,
  name: "playerName",
  jq: AVT,
  handle: hAVT
};

let amount = 16;

let moveAVT = function(d) {

  switch (d) {

    case "up":
      A.yTarget -= amount;
      A.yPos = A.yTarget;

    case "dn":
      A.yTarget += amount;
      A.yPos = A.yTarget;

    case "left":
      A.xTarget -= amount;
      A.xPos = A.xTarget;

    case "right":
      A.xTarget += amount;
      A.xPos = A.xTarget;

  }//end switch

  hAVT.css({
    "top": A.yTarget,
    "left": A.xTarget
  });

}
