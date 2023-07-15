var editbutton,mode,cancelbutton,resetbutton,convexhullbutton;
function createButtons(){
    mode = "view";
    editbutton = new Clickable(100,100);
    cancelbutton = new Clickable(100,100);
    resetbutton = new Clickable(100,100);
    convexhullbutton = new Clickable(100,100);
    editbutton.locate(0, 0);
    cancelbutton.locate(100, 0);
    resetbutton.locate(200, 0);
    convexhullbutton.locate(300, 0);
    editbutton.onPress = function(){
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
    }
    cancelbutton.onPress = function(){
        if(mode == "edit"){
            mode = "view";
        }
    }
    resetbutton.onPress = function(){
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
        if(mode != "hull" && mode != "index" && points.length > 2 && !indexed && !hulled){
            hull = convexhull(points);
            mode = "index";
            i_loop = 1;
        }
    }
    editbutton.text = "Edit";
    cancelbutton.text = "Cancel";
    resetbutton.text = "Reset";
    convexhullbutton.text = "Hull";
}