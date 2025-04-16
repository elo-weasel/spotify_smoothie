

function preload(){
   
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}


function draw() {
    background(200);
    text(windowWidth + ", " + windowHeight, 50,50);
}



function windowResized(){
    resizeCanvas(windowWidth, windowHeight); 
}
    
