//BUILDING WEB-BASED DRAWING INSTRUMENTS TEMPLATE
//BY GALO CANIZARES

function setup() {
  pixelDensity(1);

  canvasIMG = createCanvas(window.windowWidth, window.windowHeight);
  background(255, 0, 0);

}

function draw() {
  //background(bgr, bgg, bgb, alph);
  ellipse(mouseX, mouseY, 300, 300);

}

function windowResized() {
  resizeCanvas(window.windowWidth, window.windowHeight);
  resetCanvas();
}
