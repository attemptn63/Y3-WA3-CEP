//contains the guide page for the simulation
var simul_info, usage_info; 
var slide = 0;
function guide(){
    //overlay a translucent gray background over the main page and display the guide, along with the buttons
    background(119,119,119,100);
    exitbutton.draw();
    nextbutton.draw();
    if(slide == 0){
        //first slide
        //display the simulation information
        push();
        textSize(20);
        textAlign(LEFT,CENTER);
        text(simul_info,100,100,windowWidth-150,windowHeight-150);
        pop();
    }
    else if(slide == 1){
        //second slide
        //display the usage information
        push();
        textSize(20);
        textAlign(CENTER,CENTER);
        text(usage_info,40,0,windowWidth-150,windowHeight-150);
        pop();
    }
}