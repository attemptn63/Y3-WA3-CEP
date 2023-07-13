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
    points.unshift(p_0);
    hull.push(points.length-1);
    hull.push(0);
    hull.push(1);
    var i = 1;
    while(i<points.length){
        if(counter_clockwise(points[hull[hull.length-2]],points[hull[hull.length-1]],points[i])>0){
            hull.push(i);
            i++;
        }else{
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