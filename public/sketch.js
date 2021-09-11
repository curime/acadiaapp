var myArray = [];
var trailLength = 25;
var counter = 0;

function setup() {
  createCanvas(width, height);
  frameRate(30);

  for (var i=0; i<5;i++){
    //myArray.push(new smileyFace(random(400),random(400),random(50,100)));
  }
  smileyFace(mouseX,mouseY);

}

function draw() {
  background(220);
  for (var i =0 ; i< myArray.length;i++){
    myArray[i].show(i);
  }
  if (myArray.length>trailLength){
    myArray.splice(0,1);

  }
  textAlign(CENTER);
  textSize(height/20);
  text("BE HAPPY MY FRIEND",width/2,height/2)
  console.log(counter);
}

function mouseDragged(){
  myArray.push(new smileyFace(mouseX,mouseY, random(25,50)));

}

function smileyFace(x,y,diameter){
  this.x = x;
  this.y = y;
  this.d = diameter;
  this.show = function(variable){
  fill(sin(variable),cos(variable),255,variable);
  ellipse(this.x,this.y,this.d,this.d);
  fill(variable);
  ellipse(this.x+this.d/10, this.y-this.d/10,this.d/10);
  ellipse(this.x-this.d/10, this.y-this.d/10,this.d/10);
  rectMode(CENTER);
  rect(this.x,this.y+this.d/5,this.d/3,this.d/10);

  }

}
