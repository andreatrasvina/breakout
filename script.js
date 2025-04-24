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

let bloques = [];
let columnas = 10;
let filas = 4;
let bloqueAncho = 100;
let bloqueAlto = 30;
let espacio = 5;
let nivel = 1;
let juegoGanado = false;


function setup() {
  createCanvas(1200, 600);

  //aqui creamos nuestros bloques equis de
  crearBloques();
  reiniciar();
}

function draw() {
  background(255);
  
  //barra ñenga
  rect(barraX, barraY, barraAncho, barraAlto);

  //pelota
  ellipse(pelotaX, pelotaY, pelotaRadio * 2, pelotaRadio * 2);

  // dibujamos nuestros bloques
  for (let fila of bloques) {
    for (let bloque of fila) {
      if (bloque.activo) {
        fill(150, 100, 200);
        rect(bloque.x, bloque.y, bloqueAncho, bloqueAlto);
      }
    }
  }
  
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

    // Colisiones con bloques
    for (let fila of bloques) {
      for (let bloque of fila) {
        if (bloque.activo) {
          if (
            pelotaX + pelotaRadio > bloque.x &&
            pelotaX - pelotaRadio < bloque.x + bloqueAncho &&
            pelotaY + pelotaRadio > bloque.y &&
            pelotaY - pelotaRadio < bloque.y + bloqueAlto
          ) {
            velocidadPelotaY *= -1;
            bloque.activo = false;
          }
        }
      }
    }

    // si ya no quedan bloques, subir de nivel o terminar juego
    if (!quedanBloques()) {
      if (nivel < 3) {
        nivel++;
        filas = 4 + nivel - 1;
        crearBloques();
        reiniciar();
        juegoPausado = true;
      } else {
        juegoGanado = true;
        juegoPausado = true;
      }
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
      
    } else if (vidas > 0){
      //desp de perder
      fill(255, 0, 0, 150);
      rect(0, 0, width, height);

      textAlign(CENTER, CENTER);
      fill(255);
      textSize(40);
      text("te quedan " + vidas + " vidas", width / 2, height / 2 - 30);
      text("¡presiona ESPACIO para seguir", width / 2, height / 2);
    }else {
      // sin vidas
      fill(255, 0, 0, 150);
      rect(0, 0, width, height);
  
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(40);
      text("¡lol q mal! presiona ESPACIO para reiniciar", width / 2, height / 2);
    }

  }
  // Vidas
  fill(0);
  textSize(20);
  text("Vidas: " + vidas, 60, 20);
  text("Nivel: " + nivel, width - 100, 20);
}



function keyPressed() {
  if (key === ' ') {
    if (vidas === 0 || juegoGanado) {
      // reiniciar juego completo
      vidas = 3;
      nivel = 1;
      filas = 4;
      juegoGanado = false;
    }
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

function quedanBloques() {
  for (let fila of bloques) {
    for (let bloque of fila) {
      if (bloque.activo) return true;
    }
  }
  return false;
}

function crearBloques() {
  bloques = [];
  for (let f = 0; f < filas; f++) {
    let fila = [];
    for (let c = 0; c < columnas; c++) {
      let x = c * (bloqueAncho + espacio) + 60;
      let y = f * (bloqueAlto + espacio) + 40;
      fila.push({ x, y, activo: true });
    }
    bloques.push(fila);
  }
}