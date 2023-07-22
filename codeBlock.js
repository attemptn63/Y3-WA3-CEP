var BlockList = [];
class codeBlocks{
    constructor(x,y,w,h,text,textColor,blockColor){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.textColor = textColor;
        this.blockColor = blockColor;
    }
    draw(){
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
    BlockList.push(new codeBlocks(900,450,500,50,"indexing...","black","white"));
    BlockList.push(new codeBlocks(900,500,500,50,"push P[N-1], P[0] and P[1] into stack S","black","white"));
    BlockList.push(new codeBlocks(900,550,500,50,"for i = 2 to N-1","black","white"));
    BlockList.push(new codeBlocks(900,600,500,50,"    if (ccw(S[S.length-2],S[S.length-1],P[i]) > 0)","black","white"));
    BlockList.push(new codeBlocks(900,650,500,50,"        push P[i] into stack S","black","white"));
    BlockList.push(new codeBlocks(900,700,500,50,"    else pop from S","black","white"));
}
function drawBlocks(){
    for(var i = 0; i < BlockList.length; i++){
        BlockList[i].draw();
    }
}