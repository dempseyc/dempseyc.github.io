//BAAD PLAANET!! BOARD0 PLAANT THAAT!! BOARD1 BAAD CAATS!! BOARD2 TAAKE THIS!!
// BOARD3
//
//
//
//
// craig ll dempsey style starts on line 11

//initializing board
//
let B = {
  mapSize: 15,
  worldArray: [],
  width: 750,//this.size*blockSize + maskborder/2, //150
  height: 750,//this.size*blockSize, //150
  imageSize: 1250,//this.size*blockSize+blockSize*2 + maskborder/2, //250
  aCoords: [7,8],
  slideX: 0,  //initial position
  slideY: 0,  //initial position
  zeroedAx: 0,
  zeroedAy: 0,
};

let landArray = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
[0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
[0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],
[0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
[0,1,1,0,0,1,1,1,1,0,0,0,1,1,0],
[0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
[0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
[0,0,0,0,0,1,1,1,1,1,1,1,0,0,0],
[0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],
[0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],
[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
[0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],
[0,0,0,0,0,1,1,1,1,1,1,1,0,0,0],
[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
];


let WRLD = $("#world");
let hWRLD = $("#worldhandle");

let blockSize = 50;
let moveAmount = blockSize; ///10;

//initializing avatar
//

//jqueryselections
let AVT = $("#avatar");

//a little hovering for this guy
setInterval(function(){
  AVT.toggleClass("hover");
},1000);

let hAVT = $("#avatarhandle");

//if avt is stationary, only game response animations applied to these like sensor going off, getting a message, banking, hovering, blinking, whatever.  Let A have all the properties of location, items collected, etc.  easy to add features like money or board timeout or whatever logic

let A = {
  name: "playerName",
  jq: AVT,
  handle: hAVT,
  coords: [7,8],   //init at (mapSize-1)/2 and ((mapSize-1)/2)+1
  xPos: 375,  //coord * 50 + 25 //adds up
  yPos: 425   //coord * 50 + 25 //adds up
};

let hAVTchangePos = function (x,y) {
  hAVT.css({
    "left": x,
    "top": y
  });
}

hAVTchangePos(B.slideX,B.slideY); //start at 0

//put some global timers in,
// 0.1 secs for avatar movement and css class changes
// 0.5 secs for gamestate logic update
// immediate dom append and remove manipulation and user feedback
// with changing background-position


//might need to offset display of items by 25 to collide with avatar shadow.
// looks like that on a grid

let hWRLDChangePos = function (x,y) {
  hWRLD.css({
    "left": x,
    "top": y
  });
}

hWRLDChangePos(B.slideX,B.slideY);  //start at 0


let slideWRLD = function(d) {
  console.log(d);
  let prevX = B.zeroedAx;
  let prevY = B.zeroedAy;

  switch (d) {

    case "up":
      B.slideY -= moveAmount;

      // first things first get A to have an actual location

      //everytime  is slide world the main function?
      //do i want all the game logic in here?
      //and all the display stuff?
      //ok ill start this way



      //check landArray move back to prev and break



      //console.log("slideY "+B.slideY);
      //conditional here for
      //looping behavior with .5 sec timeout
      //store xpos, ypos, slide amt
      if (B.slideY<-350) {
        B.slideY += 625; //half map image size
      }
      break;

    case "dn":
      B.slideY += moveAmount;
      //console.log("slideY "+B.slideY);

      if (B.slideY>350) {
        B.slideY -= 625;
      }

      break;

    case "left":
      B.slideX -= moveAmount;
      // console.log("slideX "+B.slideX);

      if (B.slideX<-350) {
        B.slideX += 625;  //size of planetmap
      }
      break;

    case "right":
      B.slideX += moveAmount;
      // console.log("slideX "+B.slideX);

      if (B.slideX>350) {
        B.slideX -= 625;  //size of planetmap
      }
      break;

  }//end switch

  B.zeroedAx = B.slideX;
  B.zeroedAy = B.slideY;

  hWRLDChangePos(B.zeroedAx,B.zeroedAy);

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

        //need behavior for "/" or "_" key/
        //if A has no token selected, pick up token
        //if A has token selected, drop token
        //if A has no token selected, and no token to pick up,
        //enter select token mode, and the arrow keys now have totally different behavior

        default: return; // exit this handler for other keys
    }//end switch statement

    e.preventDefault(); // prevent the default action (scroll / move caret)

});




