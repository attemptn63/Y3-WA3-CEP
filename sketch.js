//This is the main page, where all the functions are run and the canvas is created.

//Variables
var points = [],hull = [], hulllines = []; //arrays for storing the information needed for convexhull
//variables for drawing the lines
var startframe = 0, endframe = 0;
var i_loop = 0, percentage = 0; 
var line_start, line_end, undraw, indexed, hulled;
function preload(){
    //loading the text files that contain instructions and informations
    simul_info = loadStrings("simulation_info.txt");
    usage_info = loadStrings("usage_info.txt");
}
function setup(){
    //just setup
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(60);
    createButtons();
    simul_info = simul_info[0];
    usage_info = usage_info[0];
    simul_info = simul_info.replace(/\\n/g,"\n");
    usage_info = usage_info.replace(/\\n/g,"\n");
}
function draw(){
    editbutton.draw();
    resetbutton.draw();
    convexhullbutton.draw();
    createBlocks();
    if(mode == "guide"){
        //go to guide mode if this is the first time the program is run
        guide();
    }
    if(mode == "index"){
        //if indexing, highlight the first code block then run the index function.
        //see index.js and codeBlock.js for more information
        BlockList[0].blockColor = "#c1a61d";
        BlockList[0].textColor = "white";
        index();
    }
    if(mode == "hull" && i_loop < hulllines.length){
        //draws the convex hull given the set of points specified by the user
        //see drawhull.js for more information
        drawhull();
    }
    if(mode == "view" && hulled == true){
        //if the convex hull has been drawn, display the convex hull
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
        //if in edit or view mode, display the points
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
        //if in view mode and the convex hull has been drawn, highlight the points in the convex hull
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
    if(mode != "guide"){
        //if not in guide mode, draw the code blocks
        //see codeBlock.js for more information
        drawBlocks();
    }
}

function mousePressed(){
    if(mode == "edit" && bounded()){
        //if in edit mode and the mouse is within the limits, add a point
        points.push(createVector(mouseX,mouseY));
    }
}
function bounded(){
    //checks if the mouse is within the limits
    if((mouseX > 330 || mouseY > 130) && (mouseX < width - 30 && mouseX > 30) && (mouseY < height - 30 && mouseY > 30) && (mouseX < 930 || mouseY < 630)){
        return true;
    }
    return false;
}
function drawLine(percentage, color, strokeSize = 3){
    //draws a line from line_start to line_end
    //animates the line by only drawing a portion of it every frame
    //time to draw the line is determined by the change in percentage, determined outside of this function
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