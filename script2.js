  //BAAD PLAANET!! BOARD0 TAAKE THAAT!! BOARD1 BAAD CAATS!! BOARD2 PLAANT THIS!!
  // Q uses "AA" syntax, meaning all a's or strings of a's, add an extra a, unless preceded by e i o or u
$(document).ready(function () {
  // //first worry about water
  // //then worry about items
  // craig ll dempsey starts on line 11
  //initializing display
  let blockSize = 50;
  let viewArea = 500; //not used in demo
  let moveAmount = blockSize; ///10;

  //CAPS for DOM queries
  //jqueryselections

  let WRLD = $("#world");
  let hWRLD = $("#worldhandle");

  let AVT = $("#avatar");
  let hAVT = $("#avatarhandle");

  let ITMAP = $()

  let LOC = $("#locator");
  let LOCp = LOC.find("p");

  let Q = $("#q");
  let Qp = Q.find("p");

  //a little wobbling for this guy // give him class of wobble and do css keyfrm


  //if avt is stationary, only game response animations applied to these like sensor going on, getting a message, banking, hovering, blinking, whatever.  Let A have all the properties of location, items collected, etc.  easy to add features like money or board timeout or whatever logic

  //initializing board
  //
  //B for board

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

  let LandArray = [
  [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,0,0,1,1,1],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  let A = {
    name: "playerName",
    jq: AVT,
    handle: hAVT,
    coords: [7,8],   //init at (mapSize-1)/2 and ((mapSize-1)/2)+1
    xPos: 375,  //this.coords[0] * blockSize + 25 //adds up
    yPos: 425,  //this.coords[1] * blockSize + 25 //adds up
    panel: []
  };

  LOCp.text("[X:"+A.coords[0]+", Y:"+A.coords[1]+"]");

  let hAVTchangePos = function (x,y) {
    hAVT.css({
      "left": x,
      "top": y
    });
  }

  hAVTchangePos(B.slideX,B.slideY); //start at 0



    //getting item on map...  B contains a list of items with locations like [7,7]
  //item map is populated with child divs and they are given css positions
  //


//
///////// token ACTION
//

let tokenAction = function () {



  console.log("tokenAction!!");
  // if moveable token with same coords as player exists, addchild to panel
  // <div class= "item"></div>
  // and remove child from itemmap

  // add array item to A.storagePANEL // Q reports item+"AADDED!!"

  // if item staged, drop item to item map at player coords

  // if nothing staged or present, enter panel menu, change behavior of arrow keys to select mode, and
}










  //put some global timers in,
  // 0.1 secs for avatar movement and css class changes
  // 0.5 secs for gamestate logic update
  // immediate dom append and remove manipulation and user feedback
  // with changing background-position


  //might need to offset display of items by 25 to collide with avatar shadow.
  // looks like that on a grid

  let hWRLDchangePos = function (x,y) {
    hWRLD.css({
      "left": x,
      "top": y
    });
  }

  hWRLDchangePos(B.slideX,B.slideY);  //start at 0


  let slideWRLD = function(d) {
    console.log(d);
    let prevX = B.zeroedAx;
    let prevY = B.zeroedAy;
    let prevCoords = A.coords.slice();

    switch (d) {

      case "up":
        B.slideY -= moveAmount;
        A.coords[1] += 1;

        //everytime  is slide world the main function?
        //do i want all the game logic in here?
        //and all the display stuff?
        //ok ill start this way



        //check LandArray move back to prev and break



        //console.log("slideY "+B.slideY);
        //conditional here for
        //looping behavior with .5 sec timeout
        //store xpos, ypos, slide amt
        if (B.slideY<-350) {
          B.slideY += 750; //half map image size
        }
        if (A.coords[1]>14) {
          A.coords[1] = 0;
        }

        break;

      case "dn":
        B.slideY += moveAmount;
        A.coords[1] -= 1;
        //console.log("slideY "+B.slideY);

        if (B.slideY>350) {
          B.slideY -= 750;
        }
        if (A.coords[1]<0) {
          A.coords[1] = 14;
        }

        break;

      case "left":
        B.slideX -= moveAmount;
        A.coords[0] += 1;
        // console.log("slideX "+B.slideX);

        if (B.slideX<-350) {
          B.slideX += 750;  //size of planetmap
        }
        if (A.coords[0]>14) {
          A.coords[0] = 0;
        }

        break;

      case "right":
        B.slideX += moveAmount;
        A.coords[0] -= 1;
        // console.log("slideX "+B.slideX);

        if (B.slideX>350) {
          B.slideX -= 750;  //size of planetmap
        }
        if (A.coords[0]<0) {
          A.coords[0] = 14;
        }

        break;

    }//end switch

    //do some checks
    //if A has no seapower
    if (!LandArray[A.coords[1]][A.coords[0]]) {  //x and y flipped in landArr
      B.slideX=prevX;
      B.slideY=prevY;
      A.coords=prevCoords;
    }

    B.zeroedAx = B.slideX;
    B.zeroedAy = B.slideY;
    LOCp.text("[X:"+A.coords[0]+", Y:"+A.coords[1]+"]");

    hWRLDchangePos(B.zeroedAx,B.zeroedAy);

  }// end slideWRLD


// KEY EVENT STUFF

// copied template from
// http://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery

// document.addEventListener("keydown", function(event) {
//   console.log(event.which);
// });


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

          case 88:
          case 191:
            tokenAction();
            break;
            //need behavior for "/" or "_" key/
            //if A has no token selected, pick up token
            //if A has token selected, drop token
            //if A has no token selected, and no token to pick up,
            //enter select token mode, and the arrow keys now have totally different behavior

          default: return; // exit this handler for other keys
      }//end switch statement

      e.preventDefault(); // prevent the default action (scroll / move caret)

  }); //document keydown function


}); //document ready function




