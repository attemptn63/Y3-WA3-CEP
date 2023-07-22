function drawhull(){
    if(percentage >= 1.05){
        if(i_loop == hulllines.length - 1){
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
        push();
        stroke(hulllines[i].color);
        strokeCap(SQUARE);
        strokeWeight(hulllines[i].strokeSize);
        line(hulllines[i].x1,hulllines[i].y1,hulllines[i].x2,hulllines[i].y2);
        pop();
    }
    BlockList[hulllines[i].codeLine].blockColor = "#c1a61d";
    BlockList[hulllines[i].codeLine].textColor = "white";
    line_start = createVector(hulllines[i_loop].x1,hulllines[i_loop].y1);
    line_end = createVector(hulllines[i_loop].x2,hulllines[i_loop].y2);
    drawLine(percentage, hulllines[i_loop].color, hulllines[i_loop].strokeSize);
    percentage += 0.05;
    for(var i = 0; i < points.length; i++){
        circle(points[i].x,points[i].y,60);
        textSize(32);
        textAlign(CENTER,CENTER);
        text(i,points[i].x,points[i].y);
    }
}