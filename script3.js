//BAAD PLAANET!! BOARD0 TAAKE THAAT!! BOARD1 BAAD CAATS!! BOARD2 PLAANT THIS!!

$(document).ready(function () {

  let phase = "intro";

  let blockSize = 50;
  let viewArea = 500; //not used in demo
  let moveAmount = blockSize; ///10;

  //CAPS for DOM queries
  //jqueryselections

  let hW = $("#worldhandle");
  let hA = $("#avatarhandle");

  let TKMAP = $("#tokenmap");
  let PAN = $("#panel");
  let ITHAS = PAN.find("#items");
  let POW = PAN.find("#powers");


  let LOC = $("#locator").find("p");

  let Q = $("#q").find("p");

    let B = {
    mapSize: 15,
    width: 750,
    height: 750,
    imageSize: 1250,
    slideX: 0,  //initial position
    slideY: 0,  //initial position
    zeroedAx: 0, //for looping
    zeroedAy: 0, //for looping
    gamepieces: [];
    landArray: [
    [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,0,0,0,1,1],
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
    ]
  } //B

  let U = {
    coords: [7,8],   //init at (mapSize-1)/2 and ((mapSize-1)/2)+1
    xPos: 375,  //this.coords[0] * blockSize + 25 //adds up
    yPos: 425,
    xZeroed: this.xPos-375,
    yZeroed: this.yPos-425, //this.coords[1] * blockSize + 25 //adds up
    items: [],
    powers: []// ["seapower",]
  }

LOC.text("[X:"+U.coords[0]+", Y:"+U.coords[1]+"]");


//init gamepieces

let Gamepiece = function (id,type,owner,coords,xPos,yPos,jQ) {
  this.id = id;  //"goal " "waterpower " "caat0 " ..etc
  this.type = type; //"goal " "token " "power " "npc "
  this.owner = owner;
  this.coords = coords; //array
  this.xPos = xPos;
  this.yPos = yPos;
  this.jQ = jQ;
}

let goal = new Gamepiece("goal","goal","board",[12,2],0,0,$(#goal));
let waterpower = new Gamepiece("waterpower","power","board",[14,10],0,0,$(#waterpower));

B.gamepieces.push(waterpower);
B.gamepieces.push(goal);

  // BUILD TOKEN MAP
  //
  //B.tokArray === ["waterpower","goal"]

  let addGamepieces = function () {
    console.log("addGamepieces");

    B.gamepieces.forEach(function(gp){
      let DIV = $("<div>");
      DIV.addClass(gp.id);
      DIV.addClass(gp.type);
      let xy = gp.coords.map(function(coord){
        coord *= 50; //blocksize
        coord += 225; //offset?
        return coord;
      });  //keeps mapitem coords consistent with player coords, a little messy

    }



    }



    DIV.css("top",xy[1]+75);
    DIV.css("left",xy[0]);
    TKMAP.append(DIV);
    B.TKMAPArray.push(DIV);

    //same again for goal
    let DIV2 = $("<div>");
    DIV2.addClass("goal ");
    let loc2 = B.tokLocArray[1];

    let xy2 = loc2.map(function(coord){
      coord *= 50; //blocksize
      coord += 225; //offset?
      return coord;
    });  //keeps mapitem coords consistent with player coords, a little messy

    DIV2.css("top",xy2[1]+75);
    DIV2.css("left",xy2[0]);
    TKMAP.append(DIV2);
    B.TKMAPArray.push(DIV2);

  }

  buildTKMAP();

}); //document ready function
