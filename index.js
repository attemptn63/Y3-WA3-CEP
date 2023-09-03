//contains the index function which animates the indexing of the points
function index(){
    if(percentage >= 1.05){
        //if the line is finished animating, move on to the next line
        if(undraw && i_loop == points.length - 1){
            //if the last line has been drawn, reset the variables and return, setting the mode to hull
            mode = "hull";
            indexed = true;
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
        //if the line is being undrawn, draw a white line back to the first point
        line_start = points[i_loop].copy();
        line_end = points[0].copy();
        drawLine(percentage, "white", 4);
    }
    else{
        //if the line is being drawn, draw a black line to the next point
        line_start = points[0].copy();
        line_end = points[i_loop].copy();
        drawLine(percentage, "black");
    }
    percentage += 0.05;
    for(var i = 0; i < points.length; i++){
        //draw the points
        circle(points[i].x,points[i].y,60);
        if(i < i_loop || (i == i_loop && undraw)){
            //if the point has been indexed, display the index
            textSize(32);
            textAlign(CENTER,CENTER);
            text(i,points[i].x,points[i].y);
        }
    }
}