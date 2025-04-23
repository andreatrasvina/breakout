let barraX;
let barraY = 550;
let barraAncho = 150;
let barraAlto = 20;
let velocidad = 5;

let pelotaX;
let pelotaY;
let pelotaRadio = 10;
let randomX = 4;
let randomY = -4;

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
  
  //mov BARRA
  if (keyIsDown(LEFT_ARROW)) {
    barraX -= velocidad;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    barraX += velocidad;
  }
  //limite
  barraX = Math.max(0, Math.min(barraX, width - barraAncho));

  //mov PELOTA
  pelotaX += randomX;
  pelotaY += randomY;

  //paredes
  if (pelotaX - pelotaRadio <= 0 || pelotaX + pelotaRadio >= width) {
    randomX *= -1;
  }
  if (pelotaY - pelotaRadio <= 0) {
    randomY *= -1;
  }

  //barra
  if (pelotaY + pelotaRadio >= barraY && pelotaX >= barraX && pelotaX <= barraX + barraAncho) {
    randomY *= -1;
    pelotaY = barraY - pelotaRadio;
  }

  //toca suelo
  if (pelotaY - pelotaRadio > height) {
    reiniciar();
  }
}

function reiniciar() {
  barraX = (width - barraAncho) / 2;
  pelotaX = width / 2;
  pelotaY = barraY - pelotaRadio;
  velocidadX = 4;
  velocidadY = -4;
}