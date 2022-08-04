//BAAD PLAANET!! BOARD0 TAAKE THAAT!! BOARD1 BAAD CAATS!! BOARD2 PLAANT THIS!!

let viewArea = 500;
let blockSize = 50;
let worldSize = 750; // should inject
let moveAmount = blockSize; ///10;


let worldHandleOffset = (worldSize-viewArea)*0.5 - blockSize;
//CAPS for DOM queries
//jqueryselections

let WSQUARES = $(".worldsquare");
let hWRLD = $("#worldhandle");

hWRLD.css({
	"height": worldSize * 3,
	"width": worldSize *3
})

WSQUARES.css({
	"height": worldSize,
	"width": worldSize
})

let hWRLDskip = $("#whoffset");

hWRLDskip.css({
	"top": -worldHandleOffset-worldSize,
	"left": -worldHandleOffset-worldSize,
})
// add eventlistener transitionend if y = 14 or -1, remove trans class, reset postion, continue

let AVT = $("#avatar");
let hAVT = $("#avatarhandle");

//a little wobbling for this guy // give him class of wobble and do css keyfrm

let TKMAPS = $(".tokenmap");
let INV = $("#inventory");



let LOC = $("#locator");
let LOCp = LOC.find("p");

let Q = $("#q");
let Qp = Q.find("p");

//if avt is stationary, only game response animations applied to these like sensor going on, getting a message, banking, hovering, blinking, whatever.  Let A have all the properties of location, tokens token collected, etc.  easy to add features like money or board timeout or whatever logic

//initializing board
//
//B for board

let B = {
	mapSize: worldSize/blockSize,
	width: worldSize,
	height: worldSize,
	skipX: 0, //resets at breakpoint / crossing the mapborder / for looping array effect
	skipY: 0, //resets at breakpoint / crossing the mapborder / for looping array effect
	slideX: 0,  //initial position
	slideY: 0,  //initial position
	tokens: [
		{"waterpower": {
			"location": [7,8] ,
			"TKMAPobjs": [],
			}
		},
		{"goal": {
			"location": [12,2] ,
			"TKMAPobjs": [],
			}
		},
	],
};

let LandArray = [
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
];

//A for Avatar
//

let A = {
	name: "playerName",
	jq: AVT,
	handle: hAVT,
	coords: [(B.mapSize-1)/2,((B.mapSize-1)/2)+1],
	xPos: (B.mapSize-1)/2 * blockSize - worldHandleOffset, 
	yPos: (((B.mapSize-1)/2)+1) * blockSize - worldHandleOffset, 
	panel: [],
	powers: []// ["seapower",]
};


LOCp.text("[X:"+A.coords[0]+", Y:"+A.coords[1]+"]");

hAVT.css({
"left": A.xPos,
"top": A.yPos
});

// BUILD TOKEN MAP
//
//B.tokArray === ["waterpower","goal"]

let buildTKMAPS = function (name,i) {
	TKMAPS.each( function (j, obj) {
		let DIV = $(`<div id="${name}-${j}">`);
		DIV.addClass(`power ${name} `);
		let loc = B.tokens[i][name].location;
	
		//// see what this does
		let xy = loc.map(function(coord){
			coord *= 50; //blocksize
			// coord += 225; //offset?
			return coord;
		});  //keeps mapitem coords consistent with player coords, a little messy
	
		DIV.css({
			"top": xy[1],
			"left": xy[0]
		});
		$(obj).append(DIV);
		B.tokens[i][name].TKMAPobjs.push(DIV);
	});
};

B.tokens.forEach(function (token,i) {
	const name = Object.keys(token)[0];
	buildTKMAPS(name,i);
});


///////// token ACTION
//
// called when keydown is "/" or "x"

let tokenAction = function () {
	//console.log("tokenAction!!");
	for (i=0;i<B.tokens.length;i++) {
		let name = Object.keys(B.tokens[i])[0];
		if (A.coords[0]===B.tokens[i][name].location[0] && A.coords[1]===B.tokens[i][name].location[1]) {
		// console.log("token at this location");
		// now have to do this

		let EL;
		B.tokens[i][name].TKMAPobjs.forEach(function(OBJ,i){
			// console.log(OBJ);
			EL = OBJ.detach();
		})
		// console.log(EL);
		EL.css({
			top: "0px",
			left: "0px",
		})
		INV.append(EL);
		A.powers.push(B.tokens[i]);
		Qp.text("HAAS WAATERPOWER!!")
		}
	}

	if (A.powers.length>1) {
		Qp.text("NOT BAAD!!");
	}

}





///////////////////////////
//HANDLE MOVEMENT


const borderSkip = function (x,y) {
	console.log('skipping',x,y);
	hWRLDskip.css({
		"left": x-worldHandleOffset-worldSize,
		"top": y-worldHandleOffset-worldSize
	})
}

let hWRLDchangePos = function (x,y) {
	console.log('slide',x,y)
	console.log('skip',B.skipX,B.skipY);
	hWRLD.css({
	"left": -x,
	"top": -y
	});
}

hWRLDchangePos(B.slideX,B.slideY);  //start at 0


let checkLandAndPowers = function (prevCoords) {
	if (A.powers.length===0) { // not haas waterpower
		if (!LandArray[A.coords[1]][A.coords[0]]) {  //x and y flipped in landArr
			A.coords=prevCoords;
			return false;
		}
		return true;
	}
	return true;
}	//do some checks

let slideWRLD = function(d) {

	let xDir = 0;
	let yDir = 0;

	let prevX = B.slideX;
	let prevY = B.slideY;
	let prevCoords = A.coords.slice();
	
	switch (d) {
		
		case "up":
			B.slideY -= moveAmount;
			yDir = -1
			A.coords[1] += yDir;
			if (A.coords[1]<0) {
				A.coords[1] = 14;
			}
		
		break;
		
		case "dn":
			B.slideY += moveAmount;
			yDir = 1;
			A.coords[1] += yDir;
			if (A.coords[1]>14) {
				A.coords[1] = 0;
			}
			break;

		case "left":
			B.slideX -= moveAmount;
			xDir = -1
			A.coords[0] += xDir;
			if (A.coords[0]<0) {
				A.coords[0] = 14;
			}
			
			break;
		
		case "right":
			B.slideX += moveAmount;
			xDir = 1;
			A.coords[0] += xDir;
			if (A.coords[0]>14) {
				A.coords[0] = 0;
			}

			break;

		default:
			break;

	}//end switch

	if (!checkLandAndPowers(prevCoords)) {
		B.slideY = prevY;
		xDir = 0;
		B.slideX = prevX;
		yDir = 0;
	} else {
		B.skipX += moveAmount*xDir;
		B.skipY += moveAmount*yDir;

		hWRLDchangePos(B.slideX,B.slideY);
		/// works so far
		// 350 means (worldSize-blockSize)*0.5  // 750 means worldSize

		if (Math.abs(B.skipX)>700 || Math.abs(B.skipY)>700) {
			// number of skips = 
			let X = Math.trunc(B.slideX/750) * 750;
			let Y = Math.trunc(B.slideY/750) * 750;
			// let X = B.slideX*xDir+(350*xDir);
			// let Y = B.slideY*yDir+(350*yDir);
			borderSkip(X,Y);
			B.skipX -= 750 * xDir;
			B.skipY -= 750 * yDir;
		}
	}

	LOCp.text("[X:"+A.coords[0]+", Y:"+A.coords[1]+"]");


}// end slideWRLD


// KEY EVENT STUFF

// copied template from
// http://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery

// document.addEventListener("keydown", function(event) {
//   console.log(event.which);
// });

let stillPressed = false;

let upKey = false;
let downKey = false;
let leftKey = false;
let rightKey = false;
let spaceOrSlashKey = false;

let transitionEndHandler = function (caller) {
	if (stillPressed) {
		let keyPriorities = [spaceOrSlashKey,upKey,downKey,leftKey,rightKey];
		if (keyPriorities[0]) {
		return tokenAction();
		} else {
		keyPriorities.forEach((sudlr, i)=>{
			if (!sudlr) { return; }
			if (i === 1) { return slideWRLD("up"); }
			if (i === 2) { return slideWRLD("dn"); }
			if (i === 3) { return slideWRLD("left"); }
			if (i === 4) { return slideWRLD("right"); }
		})
		}
	}
}

let keydownHandler = function (e) {
	switch(e.which) {
		case 37: // left arrow
		e.preventDefault();
		leftKey = true;
		break;
		
		case 38: // up arrow
		e.preventDefault();
		upKey = true;
		break;
		
		case 39: // right arrow
		e.preventDefault();
		rightKey = true;
		break;
		
		case 40: // down arrow
		e.preventDefault();
		downKey = true;
		break;
		
		case 88:
		case 191:
		e.preventDefault();
		spaceOrSlashKey = true;
		break;

		default:
		break;
		}
	if (!stillPressed) {
		stillPressed = true;
		transitionEndHandler('keypress');
	};
	// return;
}

let keyupHandler = function (e) {
	switch(e.which) {
		case 37: // left arrow
		leftKey = false;
		break;
		
		case 38: // up arrow
		upKey = false;
		break;
		
		case 39: // right arrow
		rightKey = false;
		break;
		
		case 40: // down arrow
		downKey = false;
		break;
		
		case 88:
		case 191:
		spaceOrSlashKey = false;
		break;

		default:
		stillPressed = false;
		break;

		}

	stillPressed = false;
	// return;

}

$(document).keydown(keydownHandler);
$(document).keyup(keyupHandler);

hWRLD.on("transitionend", transitionEndHandler);


			//need behavior for "/" or "_" key/
			//if A has no token selected, pick up token
			//if A has token selected, drop token
			//if A has no token selected, and no token to pick up,
			//enter select token mode, and the arrow keys now have totally different behavior





