let gameState = 0;

var background;

function preload(){
    background = loadImage('background.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);

    imageMode(CENTER);
}


function draw() {
    background(200);

    image(background, windowWidth/2, windowHeight/2);

    if(gameState === 0){
        text("start", windowWidth/2, windowHeight*3/4);
    }
    
    
    
    else if(gameState === 1){
        text("info page", windowWidth/2, windowHeight*3/4);
    }



    else if(gameState === 2){
        text("actual screen", windowWidth/2, windowHeight*3/4);
    }
}



function windowResized(){
    resizeCanvas(windowWidth, windowHeight); 
}
    
function mouseClicked(){
    if(gameState === 0){
        if(mouseX < windowWidth/2){
            gameState++;
        }else{
            gameState += 2;
        }
    }


    else if(gameState === 1){
        gameState ++;
    }
}