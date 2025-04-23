let barraX;
let barraY = 550;
let barraAncho = 150;
let barraAlto = 20;
let velocidad = 5;

let pelotaX;
let pelotaY;
let pelotaRadio = 10;

function setup() {
  createCanvas(1200, 600);
  barraX = (width - barraAncho) / 2;
  pelotaX = width / 2;
  pelotaY = barraY - pelotaRadio;
}

function draw() {
  background(255);
  
  //barra ñenga
  rect(barraX, barraY, barraAncho, barraAlto);

  //pelota
  ellipse(pelotaX, pelotaY, pelotaRadio * 2, pelotaRadio * 2);
  
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
