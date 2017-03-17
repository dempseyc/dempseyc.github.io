//initializing board
//

let B = {
  mapSize: 10,
  worldArray: [],
  width: 500,//this.size*blockSize + maskborder/2, //150
  height: 500,//this.size*blockSize, //150
  imageSize: 1000,//this.size*blockSize+blockSize*2 + maskborder/2, //250
  aLocX: 250,//this.width+(blockSize/2),
  aLocY: 300, //this.width+(blockSize/2)+blockSize,
  aVel: [0,0], //change in x, change in y
  slideV: 0,  //initial position
  slideH: 0,  //initial position
}

buildWorldArray = function () {

  for (i=0;i<B.mapSize;i++){
    let row = [];
      for (j=0;j<B.mapSize;j++) {

      let cell = {
        idx: i+""+j,
        avloc: false,
        occ: false,
        tokens: [],
        land: true
      };
      row.push(cell);

    }
    B.worldArray.push(row);
  }
}

buildWorldArray();
console.log(B.worldArray);


let WRLD = $("#world");
let hWRLD = $("#worldhandle");

let blockSize = 50;
let moveAmount = blockSize; ///10;

//initializing avatar
//

//jqueryselections
let AVT = $("#avatar");
let hAVT = $("#avatarhandle");

//if avt is stationary, only game response animations applied to these like sensor going off, getting a message, banking, hovering, blinking, whatever.  Let A have all the properties of location, items collected, etc.  easy to add features like money or board timeout or whatever logic

let A = {
  name: "playerName" ,
  jq: AVT ,
  handle: hAVT ,
  // SHHimageURL: "images/PNGavS.png" ,
  // TKNimageURL: "images/PNGavT.png" ,
  // BLNKimageRL: "images/PNGavB.png" ,
  xPos: 0,
  yPos: 0,
  MapLong: 0,
  MapLat: 0,
  MapLngTarget:0,
  MapLatTarget:0
};

let AinitX = A.xPos;
let AinitY = A.yPos;


let hAVTchangePos = function (x,y) {
  hAVT.css({
    "left": x,
    "top": y
  });
}

hAVTchangePos(AinitX,AinitY);

//put some global timers in,
// 0.1 secs for avatar movement and css class changes
// 0.5 secs for gamestate logic update
// immediate dom append and remove manipulation and user feedback
//with changing background-position


let hWRLDChangePos = function (x,y) {
  hWRLD.css({
    "left": x,
    "top": y
  });
}

hWRLDChangePos(B.xPos,B.yPos);


let slideWRLD = function(d) {
  console.log(d);

  switch (d) {

    case "up":
      B.slideV -= moveAmount;
      //console.log("slideV "+B.slideV);
      //conditional here for
      //looping behavior with .5 sec timeout
      //store xpos, ypos, slide amt
      if (B.slideV<-250) {
        B.slideV += 500;  //size of planetmap
      }

      B.yPos = B.slideV;
      break;

    case "dn":
      B.slideV += moveAmount;
      //console.log("slideV "+B.slideV);

      if (B.slideV>250) {
        B.slideV -= 500;  //size of planetmap
      }

      B.yPos = B.slideV;
      break;

    case "left":
      B.slideH -= moveAmount;
      // console.log("slideH "+B.slideH);

      if (B.slideH<-250) {
        B.slideH += 500;  //size of planetmap
      }

      B.xPos = B.slideH;
      break;

    case "right":
      B.slideH += moveAmount;
      // console.log("slideH "+B.slideH);

      if (B.slideH>250) {
        B.slideH -= 500;  //size of planetmap
      }

      B.xPos = B.slideH;
      break;

  }//end switch


  hWRLDChangePos(B.slideH,B.slideV);

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

        //need behavior for "/" or "X" key/
        //if A has no token selected, pick up token
        //if A has token selected, drop token
        //if A has no token selected, and no token to pick up,
        //enter select token mode, and the arrow keys now have totally different behavior

        default: return; // exit this handler for other keys
    }//end switch statement

    e.preventDefault(); // prevent the default action (scroll / move caret)

});



















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



