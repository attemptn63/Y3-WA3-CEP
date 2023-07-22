var simul_info, usage_info;
var slide = 0;
function guide(){
    background(119,119,119,100);
    exitbutton.draw();
    nextbutton.draw();
    if(slide == 0){
        push();
        rect(90,250,1250,300,20);
        textSize(20);
        textAlign(LEFT,CENTER);
        text(simul_info,100,100,windowWidth-150,windowHeight-150);
        pop();
    }
    else if(slide == 1){
        push();
        rectMode(CENTER);
        rect(windowWidth/2 - 30,windowHeight/2-50,550,300,20)
        pop();
        push();
        textSize(20);
        textAlign(CENTER,CENTER);
        text(usage_info,40,0,windowWidth-150,windowHeight-150);
        pop();
    }
}