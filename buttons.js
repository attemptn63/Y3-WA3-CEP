//contains all the buttons and their functions
var editbutton,mode = "guide",cancelbutton,resetbutton,convexhullbutton,exitbutton,nextbutton;
function createButtons(){
    //create the buttons (see clickable.js for more information)
    //there's so many things to set with the buttons :(
    editbutton = new Clickable();
    resetbutton = new Clickable();
    convexhullbutton = new Clickable();
    exitbutton = new Clickable();
    nextbutton = new Clickable();
    exitbutton.resize(40,40)
    editbutton.locate(0, 0);
    resetbutton.locate(100, 0);
    convexhullbutton.locate(200, 0);
    exitbutton.locate(windowWidth-40,0);
    nextbutton.locate(windowWidth-100,windowHeight-50);
    exitbutton.cornerRadius = 4;
    editbutton.onPress = function(){
        //go to edit mode if not in edit mode
        //if you are halfway through indexing or drawing the convex hull, reset the variables
        if(mode == "guide")return;
        if(mode == "hull" || mode == "index" || indexed || hulled){
            background(255);
            points = [];
            hull = [];
            hulllines = [];
            i_loop = 0;
            percentage = 0;
            undraw = 0;
            indexed = false;
            hulled = false;
        }
        //set the mode to edit and change the button colors
        mode = "edit";
        editbutton.stroke = "#7c7127";
        editbutton.strokeWeight = 4;
        resetbutton.stroke = "#000000";
        resetbutton.strokeWeight = 2;
        convexhullbutton.stroke = "#000000";
        convexhullbutton.strokeWeight = 2;
    }
    resetbutton.onPress = function(){
        //reset the variables and clear the screen
        if(mode == "guide")return;
        background(255);
        points = [];
        hull = [];
        hulllines = [];
        i_loop = 0;
        percentage = 0;
        undraw = 0;
        indexed = false;
        hulled = false;
    }
    convexhullbutton.onPress = function(){
        //start drawing the convex hull
        if(mode == "guide")return;
        if(mode != "hull" && mode != "index" && points.length > 2 && !indexed && !hulled){
            hull = convexhull(points);
            mode = "index";
            i_loop = 1;
        }
        editbutton.stroke = "#000000";
        editbutton.strokeWeight = 2;
        resetbutton.stroke = "#000000";
        resetbutton.strokeWeight = 2;
        convexhullbutton.stroke = "#7c7127";
        convexhullbutton.strokeWeight = 4;
    }
    exitbutton.onPress = function(){
        //exit the guide mode
        mode = "view";
        background(255);
    }
    nextbutton.onPress = function(){
        //move to the next slide in the guide
        if(slide == 0){
            slide = 1;
        }
        else{
            mode = "view";
            background(255);
            slide = 0;
        }
    }
    editbutton.text = "Edit";
    resetbutton.text = "Reset";
    convexhullbutton.text = "Hull";
    exitbutton.textSize = 20;
    exitbutton.text = "X";
    nextbutton.text = "Next";
}