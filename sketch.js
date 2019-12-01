
// THOUGHTS:
// what if the number of nodes you connect to is not fixed, but depends on distance?
// the current perturbDots function is dumb

let dots = [];
let n = 30;
let m = 5; // how many to connect to 

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

function perturbDots(){
	for(let i in dots){
		dots[i].x += (random()-0.5)*10;
		dots[i].y += (random()-0.5)*10;

		dots[i].x %= width;
		dots[i].y %= height;
	}
}

function connectDots() {
  let closest = [];
  for(let i = 0; i < n; i++) {
    closest.push([]);
    let allDists = []; // this is stupid, I should be inserting new distances in to a sorted array, but WHATEVER!! n^2 log n VS n^2 log n AM I RIGHT? technically but the constants are egregious
    for(let j = i+1; j < n; j++) {
      allDists.push({"dist":dots[i].dist(dots[j]), "index":j})
    }
    allDists.sort(function(x,y){x.dist - y.dist});
    for(let k = 0; k < min(allDists.length, m); k++) {
      let j = allDists[k].index;
      closest[i].push(j);
      line(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
    }
  }
}

