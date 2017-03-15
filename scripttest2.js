





//////////////////AVATAR MOVING AREA





let AVT = $("#avatar");

//two jquery selection
let hAVT = $("#avatarhandle");

let A = {
  xPos: 400,
  yPos: 400,
  yTarget: 500,
  xTarget: 400,
  name: "playerName",
  jq: AVT,
  handle: hAVT
};

let amount = 160;

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




///////////WORLD PART//////////////


amount = 320;

let WRLD = $("#world");
let hWRLD = $("#worldhandle"); //for now

let World = {
  xPos: 0,
  yPos: 0,
  slideY: 0,
  slideX: 0,
  name: "planetName",
  jq: WRLD,
  jqhandle: hWRLD //fornow
};


let hWRLDChangePos = function (x,y) {
  hWRLD.css({
    "top": World.slideY, //dont let it reach 0
    "left": World.slideX //dont let it reach 0
  });
}

hWRLDChangePos(World.xPos,World.yPos);

let slideWRLD = function(d) {
  console.log(d);

  switch (d) {

    case "up":
      World.slideY -= amount;
      World.yPos = World.slideY;
      break;

    case "dn":
      World.slideY += amount;
      World.yPos = World.slideY;
      break;

    case "left":
      World.slideX -= amount;
      World.xPos = World.slideX;
      break;

    case "right":
      World.slideX += amount;
      World.xPos = World.slideX;
      break;

  }//end switch


  hWRLD.css({
    "top": World.slideY,
    "left": World.slideX
  });
  //hWRLDChangePos(World.slideX,World.slideY);

}// end slideWRLD

// copied template from
// http://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery

// SLIDEWORLD STUFF

$(document).keydown(function(e) {
  //alert(String.fromCharCode(e.keyCode));
    switch(e.which) {
        case 37: // left
        slideWRLD("right");
        break;

        case 38: // up
        slideWRLD("dn");
        break;

        case 39: // right
        slideWRLD("left");
        break;

        case 40: // down
        slideWRLD("up");
        break;

        default: return; // exit this handler for other keys
    }//end switch statement

    e.preventDefault(); // prevent the default action (scroll / move caret)

});

//////////////KEYCOMMAND FOR AVATAR MOVING

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
