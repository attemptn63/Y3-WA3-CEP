var editbutton,mode = "guide",cancelbutton,resetbutton,convexhullbutton,exitbutton,nextbutton;
function createButtons(){
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
        if(mode == "guide")return;
        if(mode == "hull" || mode == "index" || indexed || hulled){
            background(255);
            points = [];
            hull = [];
            i_loop = 0;
            percentage = 0;
            undraw = 0;
            indexed = false;
            hulled = false;
        }
        mode = "edit";
        editbutton.stroke = "#cea716";
        resetbutton.stroke = "#000000";
        convexhullbutton.stroke = "#000000";
    }
    resetbutton.onPress = function(){
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
        if(mode == "guide")return;
        if(mode != "hull" && mode != "index" && points.length > 2 && !indexed && !hulled){
            hull = convexhull(points);
            mode = "index";
            i_loop = 1;
        }
        editbutton.stroke = "#000000";
        resetbutton.stroke = "#000000";
        convexhullbutton.stroke = "#cea716";
    }
    exitbutton.onPress = function(){
        mode = "view";
        background(255);
    }
    nextbutton.onPress = function(){
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