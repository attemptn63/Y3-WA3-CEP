//contains the code blocks and their locations
var BlockList = [];
class codeBlocks{
    constructor(x,y,w,h,text,textColor,blockColor){
        //decide how the code block will look
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.textColor = textColor;
        this.blockColor = blockColor;
    }
    draw(){
        //draw the code block
        push();
        fill(this.blockColor);
        rect(this.x,this.y,this.w,this.h);
        fill(this.textColor);
        textSize(16);
        textAlign(LEFT);
        textFont("Source Code Pro");
        text(this.text,this.x+5,this.y+30);
        pop();
    }
}
function createBlocks(){
    BlockList = [];
    //create the code blocks
    BlockList.push(new codeBlocks(windowWidth - 500,windowHeight - 300,500,50,"indexing...","black","white"));
    BlockList.push(new codeBlocks(windowWidth - 500,windowHeight - 250,500,50,"push P[N-1], P[0] and P[1] into stack S","black","white"));
    BlockList.push(new codeBlocks(windowWidth - 500,windowHeight - 200,500,50,"for i = 2 to N-1","black","white"));
    BlockList.push(new codeBlocks(windowWidth - 500,windowHeight - 150,500,50,"    if (ccw(S[S.length-2],S[S.length-1],P[i]) > 0)","black","white"));
    BlockList.push(new codeBlocks(windowWidth - 500,windowHeight - 100,500,50,"        push P[i] into stack S","black","white"));
    BlockList.push(new codeBlocks(windowWidth - 500,windowHeight - 50,500,50,"    else pop from S","black","white"));
}
function drawBlocks(){
    for(var i = 0; i < BlockList.length; i++){
        //draw the code blocks
        BlockList[i].draw();
    }
}