var myArray = [];
var trailLength = 500;
var counter = 0;
var moodInTheRoom = 1;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  frameRate(30);

  // friends number
  slider = createSlider(1, 5, 2,1);
  slider.position(75, 10);
  slider.style('friends', '80px');

  slider1 = createSlider(25, 500, 250,25);
  slider1.position(220, 10);
  slider1.style('emmisionRate', '80px');


  slider2 = createSlider(0, 0.25,0,0.01);
  slider2.position(75, 50);
  slider2.style('Curvature', '80px');


  button = createButton('reset');
  button.position(10, 10);
  button.mousePressed(resetCanvas);


  button1 = createButton('snap');
  button1.position(window.innerWidth/2, window.innerHeight-50);
  button1.mousePressed(snapPhoto);

  myArray.push(new smileyFace(window.innerWidth/2,window.innerHeight/2, random(65,100)));




}

function draw() {
  //background(125);
  background(255,moodInTheRoom*255,0,2.5);

  if (frameCount%slider1.value()==0){

    myArray.push(new smileyFace(window.innerWidth/2,window.innerHeight/2, random(65,100)));
  }


  if (frameCount<5){
    textSize(16);
    text("draw some friends, s(he) is lonely", window.innerWidth/2-75,window.innerHeight/2-50);

  }

  var balance = 0;
  moodInTheRoom = 0
  for (var i =0 ; i< myArray.length;i++){
    myArray[i].show();
    myArray[i].distance(myArray);
    myArray[i].move();
    myArray[i].isOffCanvas();
    moodInTheRoom = moodInTheRoom + myArray[i].mood;

    if (myArray[i].isOffCanvas()){
      myArray.splice(i-balance,1);
      //balance = balance-1;
     }
    }
  if (myArray.length>trailLength){
    myArray.splice(0,1);
  }
  moodInTheRoom = moodInTheRoom/ myArray.length;


}

function mouseDragged(){
  if (frameCount%3  ==0 ){
  if (mouseX > 70 && mouseY>100){
  myArray.push(new smileyFace(mouseX,mouseY, random(25,100)));
}
}
}




function resetCanvas(){
  background(255);
  myArray.splice(0,myArray.length);


}


function snapPhoto(){
  var name;
  if (moodInTheRoom>0.5){
    name = "campers are happy"

  }else{
    name = "campers need some love"
  }
  saveCanvas(name, 'png');
}


function smileyFace(x,y,diameter){
  this.startTime = millis();
  this.pos = createVector(x,y);
  this.dir = createVector(random(-0.5,0.5),random(-0.5,0.5))
  this.d = diameter;
  this.mood = 0;
  // show function ------------------------------------------------------------
  this.show = function(){
    // create Smile Variable
    var xDiffLarge = 5;
    var xDiffSmall = 10;
    var yOffset = 5;
    var mood = map(millis()-this.startTime,0,millis(),1,-1);
    var smileyFactor = mood*5;
        var r = 255;
    var g = int(255*(map(mood,-1,1,0,1,true)));
    var b = 0;
    this.mood = mood;

    // Create Smiley
    noStroke();
    fill(r,g,b,25);
    ellipse(this.pos.x,this.pos.y,this.d,this.d);
    stroke(51);
    // eyes
    fill(0);
    ellipse(this.pos.x+this.d/10, this.pos.y-this.d/10,this.d/10);
    ellipse(this.pos.x-this.d/10, this.pos.y-this.d/10,this.d/10);
    //rectMode(CENTER);
    // draw Smile
    noFill();
    stroke(100);
    bezier(this.pos.x-this.d/xDiffLarge,this.pos.y+this.d/yOffset,
           this.pos.x-this.d/xDiffSmall,this.pos.y+this.d/yOffset+smileyFactor,
           this.pos.x+this.d/xDiffSmall,this.pos.y+this.d/yOffset+smileyFactor,
           this.pos.x+this.d/xDiffLarge,this.pos.y+this.d/yOffset);
    fill(0);
    // create text to check
    //var textPrint = str(g);
    //text(textPrint,this.pos.x,this.pos.y+this.d/2);

  }
  //distance function --------------------------------------------
  this.distance = function(myArrayTemp){
    var counter=0;
    for (var i= 0; i< myArrayTemp.length; i++){
      var distance = this.pos.dist(myArrayTemp[i].pos);
      if (distance < this.d){
        counter = counter+1;
      }
    }

    // resets mood
    if (counter > slider.value()){
      this.startTime = millis();
    }
  }

  // move ---------------------------------------------
  this.move = function(){

    var canvasSize = 0;
    canvasSize = window.innerWidth*window.innerHeight;

    this.dir.setMag(canvasSize/2000000);
    this.dir.rotate(random(slider2.value(),slider2.value()));
    this.pos.add(this.dir);



  }
  // is isOffCanvas ----------------------------------------------------------
  this.isOffCanvas = function(){
    var offset = 25;
    var offCanv = (this.pos.x < 0+offset ||
           this.pos.x > window.innerWidth-offset ||
           this.pos.y < 0+offset ||
           this.pos.y > window.innerHeight-offset);

    //offCanv =this.pos.y > window.innerHeight-offset;

    if (offCanv){
      this.dir = createVector(0,1);
    }
   return offCanv;
  }

}
