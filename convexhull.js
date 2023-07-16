class HullLine{
    constructor(x1,y1,x2,y2,color,strokeSize){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2; 
        this.color = color;
        this.strokeSize = strokeSize;
        this.drawn = false;
    }
}

function convexhull(){
    var p_0 = createVector(0,0);
    var hull = [];
    points.sort(function(a,b){return b.y-a.y});
    p_0 = points[0].copy();
    points.shift();
    points.sort(function(a,b){
        angle_a = atan2(-(a.y-p_0.y),a.x-p_0.x);
        angle_b = atan2(-(b.y-p_0.y),b.x-p_0.x);
        return angle_a-angle_b;
    });
    points.unshift(p_0.copy());
    hull.push(points.length-1);
    hull.push(0);
    hull.push(1);
    hulllines.push(new HullLine(points[points.length-1].x,points[points.length-1].y,points[0].x,points[0].y,"black",3));
    hulllines.push(new HullLine(points[0].x,points[0].y,points[1].x,points[1].y,"black",3));
    var i = 2;
    while(i<points.length){
        hulllines.push(new HullLine(points[hull[hull.length-1]].x,points[hull[hull.length-1]].y,points[i].x,points[i].y,"black",3));
        if(counter_clockwise(points[hull[hull.length-2]],points[hull[hull.length-1]],points[i])>0){
            hull.push(i);
            i++;
        }else{
            hulllines.push(new HullLine(points[i].x,points[i].y,points[hull[hull.length-1]].x,points[hull[hull.length-1]].y,"white",4));
            hulllines.push(new HullLine(points[hull[hull.length-1]].x,points[hull[hull.length-1]].y,points[hull[hull.length-2]].x,points[hull[hull.length-2]].y,"white",4));
            hull.pop();
        }
    }
    hull.push(0);
    hull.shift();
    return hull;
}
function sortAngle(points,p_0){
    points.sort(function(a,b){
        angle_a = atan2(-(a.y-p_0.y),a.x-p_0.x);
        angle_b = atan2(-(b.y-p_0.y),b.x-p_0.x);
        return angle_a-angle_b;
    });
}
function counter_clockwise(a,b,c){
    return (b.x-a.x)*(a.y-c.y)-(a.y-b.y)*(c.x-a.x);
}