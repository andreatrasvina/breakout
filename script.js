let barraX;
let barraY = 550;
let barraAncho = 150;
let barraAlto = 20;
let velocidad = 5;

function setup() {
  createCanvas(1200, 600);
  barraX = (width - barraAncho) / 2;
}

function draw() {
  background(255);
  
  //barra ñenga
  rect(barraX, barraY, barraAncho, barraAlto);
  
  //mov
  if (keyIsDown(LEFT_ARROW)) {
    barraX -= velocidad;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    barraX += velocidad;
  }

  //limite
  barraX = constrain(barraX, 0, width - barraAncho);
}
