let gameState = 0;

function preload(){
   
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
}


function draw() {
    background(200);
    text(windowWidth + ", " + windowHeight, 50,50);
    text(document.getElementById("song1").innerText, 100,100);

    if(gameState === 0){
        text("start", windowWidth/2, windowHeight*3/4);
    }
}



function windowResized(){
    resizeCanvas(windowWidth, windowHeight); 
}
    
