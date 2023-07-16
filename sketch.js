var points = [],hull = [], hulllines = [];
var startframe = 0, endframe = 0;
var i_loop = 0, percentage = 0;
var line_start, line_end, undraw, indexed, hulled;
function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(60);
    createButtons();
}
function draw(){
    editbutton.draw();
    cancelbutton.draw();
    resetbutton.draw();
    convexhullbutton.draw();
    if(mode == "index"){
        index();
    }
    if(mode == "hull" && i_loop < hulllines.length){
        drawhull();
    }
    if(mode == "view" && hulled == true){
        for(var i = 0; i < hull.length-1; i++){
            push();
            stroke("#c1a61d");
            strokeCap(SQUARE);
            strokeWeight(3);
            line(points[hull[i]].x,points[hull[i]].y,points[hull[i+1]].x,points[hull[i+1]].y);
            pop();
        }
    }
    if(mode == "edit" || mode == "view"){
        for(var i = 0; i < points.length; i++){
            circle(points[i].x,points[i].y,60);
            if(indexed){
                push();
                noStroke();
                textSize(32);
                textAlign(CENTER,CENTER);
                text(i,points[i].x,points[i].y);
                pop();
            }
        }
    }
    if(mode == "view" && hulled == true){
        for(var i = 0;i < hull.length; i++){
            push();
            stroke("#c1a61d");
            strokeWeight(3);
            circle(points[hull[i]].x,points[hull[i]].y,60);
            noStroke();
            fill("black");
            textSize(32);
            textAlign(CENTER,CENTER);
            text(hull[i],points[hull[i]].x,points[hull[i]].y);
            pop();
        }
    }
}

function mousePressed(){
    if(mode == "edit" && bounded()){
        points.push(createVector(mouseX,mouseY));
    }
}
function bounded(){
    if((mouseX > 400 || mouseY > 100) && (mouseX < width - 30 && mouseX > 30) && (mouseY < height - 30 && mouseY > 30)){
        return true;
    }
    return false;
}
function drawLine(percentage, color, strokeSize = 3){
    var start = line_start.copy();
    var anim_end = start.copy();
    var end = line_end.copy();
    anim_end.lerp(end, percentage);
    push();
    stroke(color);
    strokeCap(SQUARE);
    strokeWeight(strokeSize);
    line(start.x,start.y,anim_end.x,anim_end.y);
    pop();
}