import '../css/style.css';
import {sketch} from './node_modules/p5js-wrapper';

sketch.setup = function(){
  createCanvas (800, 600);
}

sketch.draw = function(){
    background(200)
    text(document.getElementById("genre1").innerText, width/2, height/2);
}


