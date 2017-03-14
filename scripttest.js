
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

let amount = 40;

let hAVTchangePos = function (x,y) {
  hAVT.css({
    "top": A.yTarget, //dont let it reach 0
    "left": A.xTarget //dont let it reach 0
  });
}

hAVTchangePos(A.xTarget,A.yTarget);

let moveAVT = function(d) {

  switch (d) {

    case "up":
      A.yTarget -= amount;
      A.yPos = A.yTarget;
      break;

    case "dn":
      A.yTarget += amount;
      A.yPos = A.yTarget;
      break;

    case "left":
      A.xTarget -= amount;
      A.xPos = A.xTarget;
      break;

    case "right":
      A.xTarget += amount;
      A.xPos = A.xTarget;
      break;

  }//end switch

  hAVT.css({
    "top": A.yTarget,
    "left": A.xTarget
  });

}

// copied template from
// http://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery

$(document).keydown(function(e) {
  //alert(String.fromCharCode(e.keyCode));
    switch(e.which) {
        case 37: // left
        moveAVT("left");
        break;

        case 38: // up
        moveAVT("up");
        break;

        case 39: // right
        moveAVT("right");
        break;

        case 40: // down
        moveAVT("dn");
        break;

        default: return; // exit this handler for other keys
    }//end switch statement
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
