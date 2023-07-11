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
        if(percentage >= 1.05){
            hull_loop++;
            if(hull_loop == hull.length - 1){
                percentage = 0;
                return;
            }
            percentage = 0;
        }
        line_start = hull[hull_loop].copy();
        line_end = hull[hull_loop + 1].copy();
        drawHull(hull_loop, percentage);
        percentage += 0.05;
    }
    for(var i = 0; i < points.length; i++){
        circle(points[i].x,points[i].y,60);
        textSize(32);
        textAlign(CENTER,CENTER);
        if(mode == "hull"){
            text(i+1,points[i].x,points[i].y);
        }
    }
}

function mousePressed(){
    if(mode == "edit" && (mouseX > 400 || mouseY > 100)){
        points.push(createVector(mouseX,mouseY));
    }
}
function drawHull(hull_loop, percentage){
    var dist = line_start.dist(line_end);
    var start = hull[hull_loop].copy();
    start.lerp(line_end.copy(), 31/dist);
    var anim_end = start.copy();
    var end = hull[hull_loop+1].copy();
    end.lerp(line_start.copy(), 31/dist);
    anim_end.lerp(end, percentage);
    push();
    strokeCap(SQUARE);
    strokeWeight(5);
    line(start.x,start.y,anim_end.x,anim_end.y);
    pop();
}