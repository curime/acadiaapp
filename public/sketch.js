var myArray = [];
var trailLength = 500;
var counter = 0;
var moodInTheRoom = 1;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  frameRate(30);

  // friends number
  slider = createSlider(1, 5, 2,1);
  slider.position(10, 10);
  slider.style('friends', '80px');

  slider1 = createSlider(0, 100, 50,1);
  slider1.position(10, 40);
  slider1.style('borderOffset', '80px');

  button = createButton('reset');
  button.position(10, 70);
  button.mousePressed(resetCanvas);


  button = createButton('snap');
  button.position(10, 100);
  button.mousePressed(snapPhoto);


}

function draw() {
  //background(125);
  background(255,moodInTheRoom*255,0,2.5);
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
  if (mouseX > 70 && mouseY>70){
  myArray.push(new smileyFace(mouseX,mouseY, random(65,100)));
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
    this.pos.add(this.dir);
    
  }
  // is isOffCanvas ----------------------------------------------------------
  this.isOffCanvas = function(){
    var offset = slider1.value();
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
