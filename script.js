let barraX;
let barraY = 550;
let barraAncho = 150;
let barraAlto = 20;
let velocidadBarra = 7;

let pelotaX;
let pelotaY;
let pelotaRadio = 10;
let velocidadPelotaX;
let velocidadPelotaY;

let juegoPausado = true;
let vidas = 3;

function setup() {
  createCanvas(1200, 600);
  reiniciar();
}

function draw() {
  background(255);
  
  //barra ñenga
  rect(barraX, barraY, barraAncho, barraAlto);

  //pelota
  ellipse(pelotaX, pelotaY, pelotaRadio * 2, pelotaRadio * 2);
  
  if (!juegoPausado) {
    //mov BARRA
    if (keyIsDown(LEFT_ARROW)) {
      barraX -= velocidadBarra;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      barraX += velocidadBarra;
    }
    //limite
    barraX = Math.max(0, Math.min(barraX, width - barraAncho));

    //mov PELOTA
    pelotaX += velocidadPelotaX;
    pelotaY += velocidadPelotaY;

    //paredes
    if (pelotaX - pelotaRadio <= 0 || pelotaX + pelotaRadio >= width) {
      velocidadPelotaX *= -1;
    }
    if (pelotaY - pelotaRadio <= 0) {
      velocidadPelotaY *= -1;
    }

    //barra
    if (pelotaY + pelotaRadio >= barraY && pelotaX >= barraX && pelotaX <= barraX + barraAncho) {
      velocidadPelotaY *= -1;
      pelotaY = barraY - pelotaRadio;
    }

    //toca suelo
    if (pelotaY - pelotaRadio > height) {
      vidas = vidas - 1;
      juegoPausado = true;
    }

  } else {
    if (vidas === 3) {
      //inicio
      fill(0, 255, 0, 150);
      rect(0, 0, width, height);
      
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(40);
      text("presiona ESPACIO para iniciar", width / 2, height / 2);
    } else {
      //desp de perder
      fill(255, 0, 0, 150);
      rect(0, 0, width, height);

      textAlign(CENTER, CENTER);
      fill(255);
      textSize(40);
      text("¡lol q mal! presiona ESPACIO para reiniciar", width / 2, height / 2);
    }
  }
}

function keyPressed() {
  if (juegoPausado && key === ' ') {
    reiniciar();
    juegoPausado = false;
  }
}

function reiniciar() {
  barraX = (width - barraAncho) / 2;
  pelotaX = width / 2;
  pelotaY = barraY - pelotaRadio;
  velocidadPelotaX = 7;
  velocidadPelotaY = 7;
}