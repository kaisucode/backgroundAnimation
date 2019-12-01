
let dots = [];

function setup(){
	createCanvas(500, 500);

	for(let i=0; i<10; i++){
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
}

function perturbDots(){
	for(let i in dots){
		dots[i].x += (random()-0.5)*10;
		dots[i].y += (random()-0.5)*10;

		dots[i].x %= width;
		dots[i].y %= height;
	}
}

function connectDots(){
	for(let i in dots){

	}
}

