//BUILDING WEB-BASED DRAWING INSTRUMENTS TEMPLATE
//BY GALO CANIZARES

function setup() {
  pixelDensity(1);

  canvasIMG = createCanvas(window.windowWidth, window.windowHeight);
  background(255, 0, 0);

}

function draw() {
  //background(bgr, bgg, bgb, alph);
  ellipse(mouseX, mouseY, 25, 25);

}

function windowResized() {
  resizeCanvas(window.windowWidth, window.windowHeight);
  resetCanvas();
}
