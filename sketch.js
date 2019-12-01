
// THOUGHTS:
// what if the number of nodes you connect to is not fixed, but depends on distance?
// the current perturbDots function is dumb
//
// shouldn't have to completely recalculate connections every time, they barely update
//
// a different possible way of doing cnnections: R3 distance
//
// a different possible way of doing connections: fixed connections from the beginning of the program

let dots = [];
let dotTrajectories = [];
let n = 30;
let neighborThresh = 3; // the max number of connections
let distThresh = 200;

let speed = 1;

function setup(){
	createCanvas(500, 500);

	for(let i=0; i < n; i++){
		dots.push(createVector(random()*width, random()*height));
	}

}

function draw(){
	fill(0);
	background(255);
	for(let i in dots){
		ellipse(dots[i].x, dots[i].y, 10, 10);
	}
	perturbDots();
  connectDots();
}

function realMod(n, m){
  return ((n%m) + m) % m;
}

function perturbDots(){
	for(let i in dots){

		dots[i].x += randomGaussian(0, speed);
		dots[i].y += randomGaussian(0, speed);
		// dots[i].x += (random()-0.5)*10*speed;
		// dots[i].y += (random()-0.5)*10*speed;

    // bounce off boundaries
    if (dots[i].x > width){
      dots[i].x -= speed*5;
    }
    else if (dots[i].x < 0){
      dots[i].x += speed*5;
    }
    if (dots[i].y > height){
      dots[i].y -= speed*5;
    }
    else if (dots[i].y < 0){
      dots[i].y += speed*5;
    }

	}
}

function connectDots() {
  let connectionsMade = [];
  let closestCandidates = [];
  for(let i = 0; i < n; i++) {
    connectionsMade.push(0);
    let allDists = []; // this is stupid, I should be inserting new distances in to a sorted array, but WHATEVER!! n^2 log n VS n^2 log n AM I RIGHT? technically but the constants are egregious
    for(let j = i+1; j < n; j++) {
      nodeDist = dots[i].dist(dots[j]);
      if (nodeDist < distThresh){
        allDists.push({"dist":nodeDist, "indices":[i,j]});
      }
    }
    allDists.sort(function(x,y){x.dist - y.dist});
    for(let k = 0; k < min(allDists.length, neighborThresh); k++) {
      closestCandidates.push(allDists[k]);
    }
  }
  // OK THIS is kinda trash too, but asymptotically "whatever"
  closestCandidates.sort(function(x,y){x.dist - y.dist});

  for(let k in closestCandidates){
    let i = closestCandidates[k].indices[0];
    let j = closestCandidates[k].indices[1];
    if (connectionsMade[i] < neighborThresh && connectionsMade[j] < neighborThresh) {
      line(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
    }
  }
}

