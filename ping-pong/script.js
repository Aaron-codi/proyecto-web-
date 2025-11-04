// ** 1. Configuración Inicial **
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let gameRunning = true; 
// === Velocidad base de la pelota reducida a 2.0 ===
const INITIAL_SPEED = 2.0; 
const WINNING_SCORE = 10;  

// Variables para la corrección de colisión (posición de la pelota en el frame anterior)
let lastBallX; 
let lastBallY; 

// ** 2. Definición de Objetos del Juego **

// Objeto Pelota
let ball = {
    x: width / 2, 
    y: height / 2, 
    radius: 5,
    speed: INITIAL_SPEED, 
    dx: INITIAL_SPEED, 
    dy: -INITIAL_SPEED
};

// Objeto Paleta del Jugador 1 (Izquierda - Lenta)
let paddle1 = {
    x: 10,
    y: height / 2 - 30, 
    width: 10,
    height: 60,
    score: 0 
};

// Objeto Paleta del Jugador 2 (Derecha - IA Rápida)
let paddle2 = {
    x: width - 20, 
    y: height / 2 - 30, 
    width: 10,
    height: 60,
    score: 0
};

// ** 3. Funciones de Dibujo **

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall() {
    ctx.beginPath(); 
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); 
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath(); 
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(paddle1.score, width / 4, 30);
    ctx.fillText(paddle2.score, 3 * width / 4, 30);
}

function drawNet() {
    for (let i = 0; i < height; i += 15) {
        drawRect(width / 2 - 1, i, 2, 10, "white");
    }
}

// ** 4. Lógica del Juego y Movimiento (Colisión Corregida) **

function update() {
    if (!gameRunning) return; 

    // Guardar la posición actual antes de mover (para la colisión anticipada)
    lastBallX = ball.x;
    lastBallY = ball.y;

    // 1. Mueve la pelota
    ball.x += ball.dx; 
    ball.y += ball.dy; 

    // 2. Colisión de la pelota con los bordes superior e inferior
    if (ball.y + ball.radius > height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy; 
    }

    // 3. Colisión de la pelota con los bordes izquierdo y derecho (Puntuación)
    if (ball.x + ball.radius > width) { 
        paddle1.score++;
        checkWin(); 
        if (gameRunning) resetBall(); 
    } else if (ball.x - ball.radius < 0) { 
        paddle2.score++;
        checkWin(); 
        if (gameRunning) resetBall(); 
    }

    // 4. Movimiento de la Paleta 2 (Derecha - IA RÁPIDA)
    let aiLevel = 0.15; // Velocidad alta de la IA
    paddle2.y += (ball.y - (paddle2.y + paddle2.height / 2)) * aiLevel;

    // 5. Colisión de la pelota con las Paletas y Aceleración
    let player = (ball.x < width / 2) ? paddle1 : paddle2;

    // Colisión de AABB (caja delimitadora)
    if (ball.x - ball.radius < player.x + player.width && 
        ball.x + ball.radius > player.x && 
        ball.y + ball.radius > player.y && 
        ball.y - ball.radius < player.y + player.height) 
    {
        // Validación de Dirección (para evitar rebotes desde arriba/abajo de la pala)
        let hitFromRight = (player === paddle1 && lastBallX - ball.radius <= paddle1.x + paddle1.width);
        let hitFromLeft = (player === paddle2 && lastBallX + ball.radius >= paddle2.x);

        // Solo rebotamos si la pelota vino de la dirección de la paleta
        if (hitFromRight || hitFromLeft) {
        
            // AUMENTO DE VELOCIDAD con cada golpe (0.2)
            ball.speed += 0.2; 
            
            // Invertimos la dirección horizontal
            ball.dx = -ball.dx;

            // REPOSICIONAMIENTO ROBUSTO: Colocamos la pelota justo en el borde
            if (player === paddle1) { // Pala Izquierda
                ball.x = paddle1.x + paddle1.width + ball.radius;
            } else { // Pala Derecha
                ball.x = paddle2.x - ball.radius;
            }

            // Recalculamos el ángulo y la velocidad
            let collidePoint = ball.y - (player.y + player.height / 2); 
            collidePoint = collidePoint / (player.height / 2); 
            ball.dy = collidePoint * ball.speed;
            
            let new_dx_magnitude = Math.sqrt(ball.speed * ball.speed - ball.dy * ball.dy);
            ball.dx = (ball.dx > 0 ? 1 : -1) * new_dx_magnitude; 
        }
    }
}

// ** 5. Lógica de Victoria **
function checkWin() {
    let winner = null;

    if (paddle1.score >= WINNING_SCORE) {
        winner = "¡Jugador 1 (Izquierda) GANA!";
    } else if (paddle2.score >= WINNING_SCORE) {
        winner = "¡Jugador 2 (Derecha) GANA!";
    }

    if (winner) {
        gameRunning = false; 
    }
}

// ** 6. Función para mostrar el ganador **
function displayWinMessage(message) {
    // Dibuja el fondo oscuro semi-transparente
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; 
    ctx.fillRect(0, 0, width, height);

    // Escribe el mensaje
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(message, width / 2, height / 2);
    
    ctx.font = "16px Arial";
    ctx.fillText("¡Felicidades!", width / 2, height / 2 + 40);
}


// Función para reiniciar la pelota en el centro
function resetBall() {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.speed = INITIAL_SPEED; 
    ball.dx = (ball.dx > 0 ? -1 : 1) * ball.speed; 
    ball.dy = ball.speed * (Math.random() > 0.5 ? 1 : -1); 
}

// ** 7. Manejo de Entrada del Usuario (Movimiento del Jugador 1 - IZQUIERDA LENTA) **

canvas.addEventListener('mousemove', function(event) {
    if (!gameRunning) return;
    
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    
    // Sensibilidad normal (1.0)
    let mouseSensitivity = 1.0; 
    paddle1.y = (mouseY * mouseSensitivity) - paddle1.height / 2;

    // Limita la paleta
    if (paddle1.y < 0) {
        paddle1.y = 0;
    } else if (paddle1.y + paddle1.height > height) {
        paddle1.y = height - paddle1.height;
    }
});

// ** 8. Bucle Principal del Juego (Game Loop) **

function render() {
    // 1. Limpia todo el canvas
    drawRect(0, 0, width, height, "black"); 

    // Dibuja el marcador siempre
    drawScore(); 

    // 2. Dibuja los elementos del juego solo si está en curso
    if (gameRunning) {
        drawNet(); 
        drawRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height, "white"); 
        drawRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height, "white"); 
        drawBall(); 
    } else {
        // Si el juego terminó, dibuja el mensaje de victoria
        let winnerMessage = (paddle1.score >= WINNING_SCORE) ? 
            "¡Jugador 1 (Izquierda) GANA!" : "¡Jugador 2 (Derecha) GANA!";
        
        displayWinMessage(winnerMessage);
    }
}

function loop() {
    update(); 
    render(); 
    
    // Detiene la recursión si gameRunning es false
    if (gameRunning) {
        requestAnimationFrame(loop); 
    }
}

// Inicia el bucle del juego
requestAnimationFrame(loop);