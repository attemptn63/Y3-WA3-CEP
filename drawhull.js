//contains the drawhull function which draws the convex hull
function drawhull(){
    //loop through the hulllines array and draw each line
    if(percentage >= 1.05){
        //if the line is finished animating, move on to the next line
        if(i_loop == hulllines.length - 1){
            //if the last line has been drawn, reset the variables and return
            i_loop = 0;
            percentage = 0;
            mode = "view";
            convexhullbutton.stroke = "#000000";
            hulled = true;
            return;
        }
        i_loop++;
        percentage = 0;
    }
    for(var i = 0; i < i_loop; i++){
        //draw all the lines that have already been drawn
        push();
        stroke(hulllines[i].color);
        strokeCap(SQUARE);
        strokeWeight(hulllines[i].strokeSize);
        line(hulllines[i].x1,hulllines[i].y1,hulllines[i].x2,hulllines[i].y2);
        pop();
    }
    //highlight the current code block
    BlockList[hulllines[i].codeLine].blockColor = "#c1a61d";
    BlockList[hulllines[i].codeLine].textColor = "white";
    //draw the current line
    line_start = createVector(hulllines[i_loop].x1,hulllines[i_loop].y1);
    line_end = createVector(hulllines[i_loop].x2,hulllines[i_loop].y2);
    drawLine(percentage, hulllines[i_loop].color, hulllines[i_loop].strokeSize);
    percentage += 0.05;
    //draw the points
    for(var i = 0; i < points.length; i++){
        circle(points[i].x,points[i].y,60);
        textSize(32);
        textAlign(CENTER,CENTER);
        text(i,points[i].x,points[i].y);
    }
}