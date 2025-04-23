

function preload(){
   
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}


function draw() {
    background(200);
    text(windowWidth + ", " + windowHeight, 50,50);
    console.log(document.getElementById("genre1").innerText);
    text(document.getElementById("genre1").innerText, 100,100);
}



function windowResized(){
    resizeCanvas(windowWidth, windowHeight); 
}
    
