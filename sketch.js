var editbutton,mode,cancelbutton,resetbutton,convexhullbutton;
var points = [],hull = [];
var startframe = 0, endframe = 0;
var hull_loop = 0, percentage = 0;
var line_start, line_end;
function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(60);
    createButtons();
}

function createButtons(){
    mode = "view";
    editbutton = new Clickable(100,100);
    cancelbutton = new Clickable(100,100);
    resetbutton = new Clickable(100,100);
    convexhullbutton = new Clickable(100,100);
    editbutton.locate(0, 0);
    cancelbutton.locate(100, 0);
    resetbutton.locate(200, 0);
    convexhullbutton.locate(300, 0);
    editbutton.onPress = function(){
        mode = "edit";
    }
    cancelbutton.onPress = function(){
        mode = "view";
    }
    resetbutton.onPress = function(){
        background(255);
        points = [];
        hull = [];
        hull_loop = 0;
        percentage = 0;
    }
    convexhullbutton.onPress = function(){
        if(mode != "hull" && points.length > 2){
            hull = convexhull(points);
            mode = "hull";
        }
    }
    editbutton.text = "Edit";
    cancelbutton.text = "Cancel";
    resetbutton.text = "Reset";
    convexhullbutton.text = "Hull";
}
function draw(){
    editbutton.draw();
    cancelbutton.draw();
    resetbutton.draw();
    convexhullbutton.draw();
    if(mode == "hull" && hull_loop < hull.length - 1){
        if(percentage >= 1.029){
            hull_loop++;
            percentage = 0;
        }
        line_start = hull[hull_loop].copy();
        line_end = hull[hull_loop + 1].copy();
        drawHull(hull_loop, percentage);
        percentage += 0.03;
    }
}

function mousePressed(){
    if(mode == "edit" && (mouseX > 400 || mouseY > 100)){
        circle(mouseX,mouseY,60);
        points.push(createVector(mouseX,mouseY));
    }
}
function drawHull(i, percentage){
    var dist = line_start.dist(line_end);
    var start = hull[i].copy();
    start.lerp(line_end, 31/dist);
    var end = hull[i+1].copy();
    end.lerp(line_start, 31/dist);
    start.lerp(end, percentage);
    push();
    strokeCap(SQUARE);
    strokeWeight(5);
    line(start.x,start.y,end.x,end.y);
    pop();
}