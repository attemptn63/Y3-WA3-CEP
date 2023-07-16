function index(){
    if(percentage >= 1.05){
        if(undraw && i_loop == points.length - 1){
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
        line_start = points[i_loop].copy();
        line_end = points[0].copy();
        drawLine(percentage, "white", 4);
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