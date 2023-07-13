var editbutton,mode,cancelbutton,resetbutton,convexhullbutton;
var points = [],hull = [];
var startframe = 0, endframe = 0;
var i_loop = 0, percentage = 0;
var line_start, line_end, undraw;
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
        if(mode == "hull" || mode == "index"){
            background(255);
            points = [];
            hull = [];
            i_loop = 0;
            percentage = 0;
            undraw = 0;
        }
        mode = "edit";
    }
    cancelbutton.onPress = function(){
        if(mode == "edit"){
            mode = "view";
        }
    }
    resetbutton.onPress = function(){
        background(255);
        points = [];
        hull = [];
        i_loop = 0;
        percentage = 0;
        undraw = 0;
    }
    convexhullbutton.onPress = function(){
        if(mode != "hull" && mode != "index" && points.length > 2){
            hull = convexhull(points);
            mode = "index";
            i_loop = 1;
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
    if(mode == "index"){
        if(percentage >= 1.05){
            if(undraw && i_loop == points.length - 1){
                mode = "hull";
                percentage = 0;
                i_loop = 0;
                return;
            }
            if(undraw == 1){
                undraw = 0;
                i_loop++;
            }
            else{
                undraw = 1;
            }
            percentage = 0;
        }
        else if(undraw){
            line_start = points[i_loop].copy();
            line_end = points[0].copy();
            drawLine(percentage, "white", 6);
        }
        else{
            line_start = points[0].copy();
            line_end = points[i_loop].copy();
            drawLine(percentage, "black");
        }
        percentage += 0.05;
        for(var i = 0; i < points.length; i++){
            circle(points[i].x,points[i].y,60);
            if(i < i_loop || (i == i_loop && undraw)){
                textSize(32);
                textAlign(CENTER,CENTER);
                text(i,points[i].x,points[i].y);
            }
        }
    }
    if(mode == "hull" && i_loop < hull.length - 1){
        if(percentage >= 1.05){
            i_loop++;
            if(i_loop == hull.length - 1){
                percentage = 0;
                return;
            }
            percentage = 0;
        }
        line_start = points[hull[i_loop]].copy();
        line_end = points[hull[i_loop+1]].copy();
        drawLine(percentage, "#ce9102");
        percentage += 0.05;
        for(var i = 0; i < points.length; i++){
            circle(points[i].x,points[i].y,60);
            textSize(32);
            textAlign(CENTER,CENTER);
            text(i,points[i].x,points[i].y);
        }
        for(var i = 0; i <= i_loop; i++){
            push();
                stroke("#ce9102");
                fill(255);
                circle(points[hull[i]].x,points[hull[i]].y,60);
                fill("#ce9102");
                textSize(32);
                textAlign(CENTER,CENTER);
                text(hull[i],points[hull[i]].x,points[hull[i]].y);
            pop();
        }
    }
    if(mode == "edit" || mode == "view"){
        for(var i = 0; i < points.length; i++){
            circle(points[i].x,points[i].y,60);
        }
    }
}

function mousePressed(){
    if(mode == "edit" && (mouseX > 400 || mouseY > 100) && (mouseX < width - 30 && mouseX > 30) && (mouseY < height - 30 && mouseY > 30)){
        points.push(createVector(mouseX,mouseY));
    }
}
function drawLine(percentage, color, strokeSize = 5){
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