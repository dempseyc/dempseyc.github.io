// take objects out and put them on an earlier script
// let player have an x location and a y location and an x target and a y
// target, but rather than an xpos and ypos, just have a map and locate the player
//  on a longitude and latitude. the game state changing functions while display
//  changing functions only take arguments from map and player state
// location function calls, target, property, class attribute, etc. and logic
// tells CSS and DOM what to change. CSS does the animation, coloring, skin,
// styling, etc.
// the maps and game logic will display CSS position transitions and turning off and on the transitions
// halfway through the 1s resetting CSS to appear to loop, resetting the display of tokens on the item map....  player marking to the map will always pass his location to a function that changes itemmap state and updates game area.  change item to token


//////////////////AVATAR MOVING TO Inital State


//jqueryselections
let AVT = $("#avatar");
let hAVT = $("#avatarhandle");

//if avt is stationary, only game response animations applied to these like sensor going off, getting a message, banking, hovering, blinking, whatever.  Let A have all the properties of location, items collected, etc.  easy to add features like money or board timeout or whatever logic

let A = {
  name: "playerName" ,
  jq: AVT ,
  handle: hAVT ,
  SHHimageURL: "images/PNGavS.png" ,
  TKNimageURL: "images/PNGavT.png" ,
  BLNKimageRL: "images/PNGavB.png" ,
  xPos: 400,
  yPos: 500,
  MapLong: 0,
  MapLat: 0,
  MapLngTarget:0,
  MapLatTarget:0
};

//update MapLong MapLat MapLngTarget, MapLatTarget every .5 secs
//put some global timers in, .1 secs for class change css sprite animations
//with changing background-position
//1sec for transitions
//UI is immediate action
//do i want to make map long target a percentage of the div?
//if i have velocity, i can change target

let hAVTchangePos = function (x,y) {
  hAVT.css({
    "top": A.yPos, //dont let it reach 0
    "left": A.xPos //dont let it reach 0
  });
}

hAVTchangePos(A.xTarget,A.yTarget);


let WRLD = $("#world");
let hWRLD = $("#worldhandle");

let moveAmount = 160;

let World = {
  xPos: 0,
  yPos: 0,
  slideV: 0,
  slideH: 0,
  name: "planetName",
  jq: WRLD,
  jqhandle: hWRLD //fornow
};


let hWRLDChangePos = function (x,y) {
  hWRLD.css({
    "top": World.slideV, //dont let it reach 0
    "left": World.slideH //dont let it reach 0
  });
}

hWRLDChangePos(World.xPos,World.yPos);

let slideWRLD = function(d) {
  console.log(d);

  switch (d) {

    case "up":
      World.slideV -= moveAmount;
      World.yPos = World.slideV;
      break;

    case "dn":
      World.slideV += moveAmount;
      World.yPos = World.slideV;
      break;

    case "left":
      World.slideH -= moveAmount;
      World.xPos = World.slideH;
      break;

    case "right":
      World.slideH += moveAmount;
      World.xPos = World.slideH;
      break;

  }//end switch


  hWRLD.css({
    "top": World.slideV,
    "left": World.slideH
  });
  //hWRLDChangePos(World.slideH,World.slideV);

}// end slideWRLD

// copied template from
// http://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery

// SLIDEWORLD STUFF

$(document).keydown(function(e) {
  //alert(String.fromCharCode(e.keyCode));
    switch(e.which) {
        case 37: // left arrow
        slideWRLD("right");
        break;

        case 38: // up arrow
        slideWRLD("dn");
        break;

        case 39: // right arrow
        slideWRLD("left");
        break;

        case 40: // down arrow
        slideWRLD("up");
        break;

        default: return; // exit this handler for other keys
    }//end switch statement

    e.preventDefault(); // prevent the default action (scroll / move caret)

});


