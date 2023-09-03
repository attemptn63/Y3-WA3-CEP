//This file contains the convex hull algorithm
class HullLine{
    //class for the lines drawn in the convex hull algorithm
    //contains the start and end points, color, stroke size, and code line (for the code blocks)
    constructor(x1,y1,x2,y2,color,strokeSize, codeLine){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2; 
        this.color = color;
        this.strokeSize = strokeSize;
        this.codeLine = codeLine;
    }
}

function convexhull(){
    //see https://en.wikipedia.org/wiki/Graham_scan for a more complete explanation of the algorithm
    var p_0 = createVector(0,0);
    var hull = [];
    points.sort(function(a,b){return b.y-a.y});
    //find the lowest point
    p_0 = points[0].copy();
    points.shift();
    //sort the points by angle between the line from p_0 to the point and the x-axis, counterclockwise
    points.sort(function(a,b){
        angle_a = atan2(-(a.y-p_0.y),a.x-p_0.x);
        angle_b = atan2(-(b.y-p_0.y),b.x-p_0.x);
        return angle_a-angle_b;
    });
    points.unshift(p_0.copy());
    //setting up the initial 3 points and the two lines
    hull.push(points.length-1);
    hull.push(0);
    hull.push(1);
    hulllines.push(new HullLine(points[points.length-1].x,points[points.length-1].y,points[0].x,points[0].y,"black",3,1));
    hulllines.push(new HullLine(points[0].x,points[0].y,points[1].x,points[1].y,"black",3,1));
    var i = 2;
    while(i<points.length){
        //animate a new line from the last point in the hull to the current point
        hulllines.push(new HullLine(points[hull[hull.length-1]].x,points[hull[hull.length-1]].y,points[i].x,points[i].y,"black",3,3));
        //check if the new line is counterclockwise to the previous line
        if(counter_clockwise(points[hull[hull.length-2]],points[hull[hull.length-1]],points[i])>0){
            //if it is, add the point to the hull
            hull.push(i);
            hulllines.push(new HullLine(-10,-10,-100,-100,"black",3,4));
            i++;
        }else{
            //if it isn't, remove the last two lines and the last point from the hull
            hulllines.push(new HullLine(points[i].x,points[i].y,points[hull[hull.length-1]].x,points[hull[hull.length-1]].y,"white",4,5));
            hulllines.push(new HullLine(points[hull[hull.length-1]].x,points[hull[hull.length-1]].y,points[hull[hull.length-2]].x,points[hull[hull.length-2]].y,"white",4,5));
            hull.pop();
        }
    }
    //input the last point to the hull
    hull.push(0);
    hull.shift();
    return hull;
}
function sortAngle(points,p_0){
    //sort the points by angle between the line from p_0 to the point and the x-axis, counterclockwise
    points.sort(function(a,b){
        angle_a = atan2(-(a.y-p_0.y),a.x-p_0.x);
        angle_b = atan2(-(b.y-p_0.y),b.x-p_0.x);
        return angle_a-angle_b;
    });
}
function counter_clockwise(a,b,c){
    //some linear algebra to determine if it is a left or right turn, more info on wikipedia
    return (b.x-a.x)*(a.y-c.y)-(a.y-b.y)*(c.x-a.x);
}