var simul_info, usage_info;
var slide = 0;
function guide(){
    background(119,119,119,100);
    exitbutton.draw();
    nextbutton.draw();
    if(slide == 0){
        push();
        textSize(20);
        textAlign(LEFT,CENTER);
        text(simul_info,100,100,windowWidth-150,windowHeight-150);
        pop();
    }
    else if(slide == 1){
        push();
        textSize(20);
        textAlign(CENTER,CENTER);
        text(usage_info,40,0,windowWidth-150,windowHeight-150);
        pop();
    }
}