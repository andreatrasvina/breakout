let barraX;
let barraY = 550;
let barraAncho = 500;
let barraAlto = 20;
let velocidadBarra = 100;

let pelotaX;
let pelotaY;
let pelotaRadio = 10;
let velocidadPelotaX;
let velocidadPelotaY;

let juegoPausado = true;
let vidas = 3;
let puntaje = 0;

let bloques = [];
let columnas = 10;
let filas = 4;
let bloqueAncho = 100;
let bloqueAlto = 30;
let espacio = 5;
let nivel = 1;

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
        // bloque que aguanta 3 fregazos
        if (bloque.indestructible) {
          fill(50, 50, 50);
        } else if (bloque.resistencia && bloque.resistencia > 1) {
          fill(255, 0, 0); // rojo para los bloques resistentes
        } else if (bloque.fregazos > 1) {
          fill(255, 0, 0); // rojo para los bloques resistentes (por si acaso)
        } else {
          fill(150, 100, 200);
        }
        rect(bloque.x, bloque.y, bloqueAncho, bloqueAlto);
      }
    }
  }
  
  if (!juegoPausado) {
    //mov barra
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

    //colisiones con bloques
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
            puntaje++;

            //si el bloque es indestructible no hacemos nada xd
            if (bloque.indestructible) {
              // XD
            } else {
              // le reducimos fregazos
              bloque.fregazos--;
              if (bloque.fregazos <= 0) {
                bloque.activo = false;
              }
            }
          }
        }
      }
    }

    // si ya no quedan bloques, subir de nivel
    if (!quedanBloques()) {
      nivel++;

      // se ajusta la velocidad dependiendo el nivel
      if (nivel===2) {
        velocidadPelotaX =9; 
        velocidadPelotaY = 9;
      } else if (nivel === 3) {
        velocidadPelotaX =11; 
        velocidadPelotaY =11;
      }

      filas = 4 + nivel - 1;
      crearBloques();
      reiniciar();
      juegoPausado = true;
    }

    //toca suelo
    if (pelotaY - pelotaRadio > height) {
      vidas = vidas - 1;
      juegoPausado = true;
    }

  } else {
    let colorFondo;
    let mensaje;
  
    if (vidas === 3) {
      //inicio
      colorFondo = color(0, 255, 0, 150);
      mensaje = "presiona ESPACIO para jugar";

      //segundo nivel
    } else if(nivel === 2 && puntaje === 40){
      colorFondo = color(0, 0, 255, 150);
      mensaje = "¡Nivel 2! presiona ESPACIO para continuar";
    
      //tercer nivel
    } else if (nivel === 3 && puntaje === 90) {
      colorFondo = color(255, 255, 0, 150);
      mensaje = "¡Nivel 3! presiona ESPACIO para continuar";
    
    }else {
      //desp perder
      colorFondo = color(255, 0, 0, 150);
      mensaje = "¡lol q mal! presiona ESPACIO para volver a intentarlo";
    }
  
    //pantallas
    fill(colorFondo);
    rect(0, 0, width, height);
    
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(40);
    text(mensaje, width / 2, height / 2);
  }

  // Vidas
  fill(0);
  textSize(20);
  text("Vidas: " + vidas, 60, 20);
  text("Nivel: " + nivel, width - 100, 20);
  text("Score: " + puntaje, width / 2, 20);
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
  
  // cambiar velocidad segun el nivel xd
  let velocidadBase = 30 + nivel - 1;
  velocidadPelotaX = velocidadBase;
  velocidadPelotaY = velocidadBase;
}

function quedanBloques() {
  for (let fila of bloques) {
    for (let bloque of fila) {
      if (bloque.activo && !bloque.indestructible) return true;
    }
  }
  return false;
}


function crearBloques() {
  bloques = [];

  // se ajusta cantidad de filas dependiendo el nivel
  let filasNivel = filas;
  if (nivel === 2) filasNivel = 5; 
  else if (nivel === 3) filasNivel = 6;

  for (let f = 0; f < filasNivel; f++) {
    let fila = [];
    for (let c = 0; c < columnas; c++) {
      let x = c * (bloqueAncho + espacio) + 60;
      let y = f * (bloqueAlto + espacio) + 40;

      let bloque = {
        x,
        y,
        activo: true,
        fregazos: 1, 
        indestructible: false
      };

      // nivel 2: hay un bloque resistente, misma logica que al hacer un cuadrado hueco en primer semestre
      if (nivel === 2) {
        if (f === 4 && c === 5) {
          bloque.fregazos = 3; // bloque resistente, aguanta 3 fregazos
        }
        if (f === 3 && c === 4) {
          bloque.indestructible = true; // bloque indestructible en el nivel 2
        }
      }

      //novel 3: 2 bloques resistentes y uno indestructible
      if (nivel === 3) {
        if ((f === 1 && c === 3) || (f === 4 && c === 6)) {
          bloque.fregazos = 3; // bloques que aguantan tres fregazos
        }
        if (f === 3 && c === 5) {
          bloque.indestructible = true; //bloque que no se puede destruir
        }
      }

      fila.push(bloque);
    }
    bloques.push(fila);
  }
}
