

function preload(){
   
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    x = 0;
    y = 0;
}


function draw() {
    background(200);
    text(windowWidth + ", " + windowHeight, 50,50);

    ellipse(x,y,10,10);
    x++;
    y++;
}



function windowResized(){
    resizeCanvas(windowWidth, windowHeight); 
}
    
