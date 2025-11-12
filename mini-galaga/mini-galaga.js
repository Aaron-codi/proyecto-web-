//variables para los espacios
let tilesize=32;
let rows=16;
let columns=16;

//variables para la nave del jugador
let shipWidth=tilesize*2;
let shipHeight=tilesize*2;
let shipX =tilesize * columns / 2 - tilesize;
let shipY =tilesize * rows - tilesize*2;
let shipImg;
let shipVelocityX = tilesize;

//variables para las naves enemigas
let enemyShipArray = [];
let enemyShipWidth = tilesize*2;
let enemyShipHeight = tilesize*2;
let enemyShipX = tilesize;
let enemyShipY = tilesize;
let enemyShipImg;
let enemyShipVelocityX = 1;


let enemyShipRows = 2;
let enemyShipColumns = 3;
let enemyShipCount = 0;

//variables para el tablero
let board;
let boardWidth= tilesize * columns;
let boardHeight= tilesize * rows;
let context;

//variables para las balas
let bulletArray = [];
let bulletVelocityY = -10;

//variables para el puntaje
let puntuacion = 0;

let levelsX = tilesize * columns / 2 - tilesize;
let levelsY = tilesize*16;



let ship = {
     X:shipX,
     Y:shipY,
     width:shipWidth,
     height:shipHeight

}
  let mostrandoNivel = false;
  let levels = 1;

window.onload= function(){
    


    //crea el escenario con altura y ancho
     board= document.getElementById("escenario");
     board.width =boardWidth;
     board.height =boardHeight ;
     context= board.getContext("2d");  

     context.font = "20px Lekton";
     context.textAlign = "center";
     context.textBaseline = "middle";

    //Crea la imagen de la nave, y con la funcion la carga al abrir la ventana
    shipImg = new Image();
    shipImg.src = "img/navePropia4.png";
    shipImg.onload = function (){
    context.drawImage(shipImg, ship.X, ship.Y, ship.width, ship.height);

    }
   
     //Crea la imagen de la nave enemiga, y con la funcion la carga al abrir la ventana
    enemyShipImg = new Image();
    enemyShipImg.src ="img/naveEnemiga3.png";
    createEnemyShip();
     
    document.addEventListener("keydown", moveShip);
    document.addEventListener ("keyup", shoot);

    requestAnimationFrame(update);

}

//cada que recarga la pagina (todo el tiempo) se ejecuta esta funcion
function update(){
        requestAnimationFrame(update);
 
    if (mostrandoNivel) return;

     context.clearRect(0, 0, boardWidth,  boardHeight);
    context.drawImage(shipImg, ship.X, ship.Y, ship.width, ship.height);

    for(let l = 0; l< enemyShipArray.length; l++){
        let enemyShip = enemyShipArray[l];
        //si esta viva la nave entra
        if(enemyShip.alive){
            enemyShip.X +=  enemyShipVelocityX;
            //mueve las 6 nave de a un espacio por las 2 columnas.
            if(enemyShip.X + enemyShipWidth >= board.width || enemyShip.X <=0){
                enemyShipVelocityX *=-1;
                enemyShip.X += enemyShipVelocityX*2;
                
                for(let j = 0; j< enemyShipArray.length; j++){
                    enemyShipArray[j].Y += enemyShipHeight;
                }

            }
            if (enemyShip.Y + enemyShip.height >= ship.Y) {
            gameOver();
             return; // detener el update
             }
            //agrega la imagen de la nave enemia
            context.drawImage(enemyShipImg, enemyShip.X, enemyShip.Y, enemyShip.width, enemyShip.height)
        
        }
    }
for(let i = 0; i< bulletArray.length; i++) {
    
    //crea la bala
    let bullet = bulletArray[i];
    bullet.Y += bulletVelocityY;
    context.fillStyle = "white";
    context.fillRect(bullet.X, bullet.Y, bullet.width, bullet.height);
    
    //verifica que la bala haya chocado con la nave.
     for( let h = 0; h < enemyShipArray.length; h++){
    let enemyShip = enemyShipArray[h];
    if(!bullet.used && enemyShip.alive && detectCollision(bullet, enemyShip)){
        bullet.used = true;
        enemyShip.alive = false;
        enemyShipCount --;
        puntuacion += 100;
    }
 }
 }
 while (bulletArray.length >0 &&  (bulletArray[0].used || bulletArray[0].Y < 0)) {
    bulletArray.shift();//elemina el primer elemento del array.
 }
 //agrega el score en la pantalla
    document.getElementById("scores").innerHTML="<p>score:"+puntuacion+"</p>" ; 

}

//Define el movimiento de la nave
function moveShip(e){
    //movimiento para la izquierda
     if (e.code == "ArrowLeft" && ship.X - shipVelocityX >= 0) {
        ship.X -= shipVelocityX;
     }
     //movimiento para la derecha
     else if ( e.code =="ArrowRight" && ship.X + shipVelocityX + ship.width <= board.width) {
        ship.X += shipVelocityX;


     }
      if(enemyShipCount == 0){
        nivel();
     }
    

}

//crea el objeto nave enemiga, con sus atributos y crea un total de 6
function createEnemyShip(){
     for (let c = 0; c < enemyShipColumns; c++) {
        for (let r =0; r < enemyShipRows; r++)  {
            //declara el objeto de la nave enemiga
           let enemyShip ={
               img: enemyShipImg,
               X: enemyShipX + c*enemyShipWidth,
               Y: enemyShipY + r*enemyShipHeight,
               width: enemyShipWidth,
               height: enemyShipHeight,
               alive: true
           }
           //"publica" la nave enemiga
           enemyShipArray.push(enemyShip);
             
        }
        
     }
     //cuenta la cantidad de naves enemigas
     enemyShipCount = enemyShipArray.length;

    
          mostrandoNivel = false; 


    }
//crea el objeto disparo al tocar la barra espacidora.
function shoot(e){
     if(e.code == "Space" || e.code == "Spacebar")  {
        //declara el objeto de la bala
        let bullet = {
            X: ship.X + shipWidth*15/32,
            Y: ship.Y,
            width: tilesize/8,
            height: tilesize/2,
            used: false,
        }
        //"publica" la balas
        bulletArray.push(bullet);
     }

}
//Detecta la colision de la bala con las naves enemigas
function detectCollision(a, b){
   return a.X < b.X + b.width &&
    a.X + a.width > b.X &&
     a.Y < b.Y + b.height &&
     a.Y + a.height > b.Y;

}
function nivel() {
  // Mostrar texto de nivel
  mostrandoNivel = true; // pausa el juego
  context.clearRect(0, 0, boardWidth, boardHeight);
  context.fillStyle = "white";
  context.font = "30px Lekton";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Nivel " + levels, board.width / 2, board.height / 2);

  // Esperar un momento antes de crear nuevos enemigos
  setTimeout(() => {
    actualizarNivel();
  }, 500);
}

function actualizarNivel() {
  levels++;
  enemyShipArray = []; // Limpiar enemigos previos
  enemyShipColumns++;  // Aumentar dificultad
  enemyShipRows = Math.min(enemyShipRows + 1, 6); // Máximo 6 filas

  createEnemyShip();
 }
function gameOver() {
  mostrandoNivel = true; // pausa el juego
  context.clearRect(0, 0, boardWidth, boardHeight);
  context.fillStyle = "white";
  context.font = "40px Lekton";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("GAME OVER", board.width / 2, board.height / 2);
  
  // mostrar el puntaje final
  context.font = "20px Lekton";
  context.fillText("Puntuación: " + puntuacion, board.width / 2, board.height / 2 + 50);
}
document.getElementById("reset");
function reiniciar(){
    setTimeout(() => {
    location.reload();
  }, 400);
  
}
  window.reiniciar = reiniciar;