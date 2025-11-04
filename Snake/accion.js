// ** I. Seleccionar Elementos del DOM **
// Obtenemos los elementos HTML donde se mostrarán el juego y la información.
const playBoard = document.querySelector(".play-board"); // El contenedor principal del juego (el "tablero").
const scoreElement = document.querySelector(".score");   // Elemento para mostrar la puntuación actual.
const highScoreElement = document.querySelector(".high-score") // Elemento para mostrar la puntuación máxima histórica.

// ** II. Variables de Estado del Juego **
let gameover = false;      // Bandera que indica si el juego ha terminado.
let foodX, foodY;          // Coordenadas (X, Y) de la comida.
let snakeX = 5, snakeY = 10; // Posición inicial (X, Y) de la cabeza de la serpiente.
let snakeBody = [];        // Array que contendrá las coordenadas de cada segmento del cuerpo de la serpiente.
let velocityX = 0, velocityY = 0; // Dirección de movimiento de la serpiente (velocidad horizontal y vertical).
let setIntervalId;         // ID del intervalo de tiempo usado para el bucle principal del juego.
let score = 0;             // Puntuación actual del jugador.

// Obtener y establecer la Puntuación Máxima (High Score) desde el almacenamiento local.
// Si no existe, se inicializa a 0.
let highScore = localStorage.getItem("high-score") || 0; 
highScoreElement.innerHTML = `High Score: ${highScore}`; // Muestra el High Score en el HTML.

// ** III. Funciones del Juego **

// Función para colocar la comida en una posición aleatoria.
const changFoodPosition = () => {
    // Genera un número aleatorio entre 1 y 30 (asumiendo que el tablero es de 30x30 unidades).
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Función que se ejecuta cuando el juego termina.
const handleGameOver = () => {
    clearInterval(setIntervalId); // Detiene el bucle principal del juego.
    alert("Game Over!!");        // Muestra una alerta.
    location.reload();           // Recarga la página para empezar un nuevo juego.
}

// Función para cambiar la dirección de la serpiente basada en la tecla presionada.
const changeDirection = (e) => {
    // e.key contiene el nombre de la tecla (ArrowUp, ArrowDown, etc.).
    // La condición `&& velocityY != 1` (y similares) evita que la serpiente se mueva instantáneamente
    // en la dirección opuesta a su movimiento actual (ej: ir de Arriba a Abajo de golpe).
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1; // Mover hacia arriba (en el grid, Y-1 es arriba).
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;  // Mover hacia abajo.
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1; // Mover hacia la izquierda.
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;  // Mover hacia la derecha.
        velocityY = 0;
    }
    // La línea `//initgame();` está comentada. Si se descomenta, la serpiente se movería inmediatamente
    // al presionar una tecla, en lugar de esperar al siguiente intervalo.
}

// ** IV. Bucle Principal del Juego **
// Función que se llama repetidamente para actualizar el estado del juego.
const initgame = () => {
    // Si la bandera gameover es verdadera, llama a handleGameOver y sale de la función.
    if (gameover) return handleGameOver();
    
    // 1. Dibuja la Comida
    // Crea el HTML para colocar la comida usando CSS Grid (`grid-area: Y / X`).
    let htmlMarkup = `<div id="food" style="grid-area: ${foodY} / ${foodX}"></div>`; 

    // 2. Detección de Colisión con la Comida
    if (snakeX === foodX && snakeY === foodY) {
        changFoodPosition(); // Coloca una nueva comida.
        snakeBody.push([foodX, foodY]); // Agrega un nuevo segmento al cuerpo (en la posición de la comida consumida).
        score++;                      // Incrementa la puntuación.

        // 3. Actualización de Puntuaciones
        // Compara la puntuación actual con el High Score y actualiza si es necesario.
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore); // Guarda el nuevo High Score en el almacenamiento local.
        scoreElement.innerHTML = `Score: ${score}`; // Actualiza la puntuación en pantalla.
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    // 4. Movimiento del Cuerpo de la Serpiente
    // Itera desde el último segmento hasta el segundo.
    // Cada segmento toma la posición del segmento anterior, simulando el arrastre.
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    // 5. Mover la Cabeza
    // Coloca la posición anterior de la cabeza como el primer segmento del cuerpo.
    // **NOTA:** El cuerpo de la serpiente (`snakeBody`) almacena la posición *anterior* de la serpiente.
    snakeBody[0] = [snakeX, snakeY];
    
    // Aplica la velocidad para calcular la nueva posición de la cabeza.
    snakeX += velocityX;
    snakeY += velocityY;

    // 6. Detección de Colisión con las Paredes
    // Si la cabeza de la serpiente sale de los límites del tablero (1 a 30), el juego termina.
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameover = true;
    }

    // 7. Dibuja la Serpiente y Detección de Colisión con el Cuerpo
    for (let i = 0; i < snakeBody.length; ++i) {
        // Agrega el HTML para dibujar cada segmento de la serpiente.
        htmlMarkup += `<div id="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        
        // Detección de colisión consigo misma:
        // Si el índice no es 0 (no es la cabeza) y la cabeza choca con las coordenadas de cualquier otro segmento, el juego termina.
        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameover = true;
        }
    }
    
    // 8. Renderizado Final
    // Actualiza el contenido del tablero (playBoard) con la nueva posición de la comida y la serpiente.
    playBoard.innerHTML = htmlMarkup;
}

// ** V. Inicialización y Bucle del Juego **

changFoodPosition(); // Coloca la comida en su posición inicial.

// Inicia el bucle del juego: llama a initgame() cada 125 milisegundos.
setIntervalId = setInterval(initgame, 125); 

// Escucha los eventos de teclado en todo el documento para permitir el control de la serpiente.
document.addEventListener("keydown", changeDirection);