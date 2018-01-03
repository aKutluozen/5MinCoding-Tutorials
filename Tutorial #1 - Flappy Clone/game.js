// GLOBALS

// Establish the screen
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
ctx.font = 'bold 56px Comic Sans MS';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';

// Load sprites into a global variable
var sprites = document.getElementById('sprites');

// Custom function for writing a stroked text
function drawText(text, x, y) {
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

// Custom function for drawing a tint on the screen
function drawTint(x, y, w, h) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x, y, w, h);
}

// Variables
var score = 0; // Will hold the global score
var pressed = false; // Flag variable, determines if a key is pressed
var isPaused = true; // Flag variable, determines if the game is paused or unpaused
var isGameOver = false; // Flag variable, determines if the game is over or not

// Objects
var player = new Bird(32, 240, 80, 70);
var pipeTop = new Pipe(360, 0, 80, 300, 2);
var pipeBottom = new Pipe(360, 480, 80, 300, 2);
var background1 = new Background(0, 0, 360, 640, 2);
var background2 = new Background(360, 0, 360, 640, 2);

// INPUTS

// Handle keyboard inputs - Based on JavaScript's event listener loop.
document.addEventListener('keydown', function(event) {
    // Up arrow button: Player control
    if (event.keyCode === 38 && pressed === false) {
        player.moveUp(2); // Call the necessary player action
        pressed = true; // Mark this true so the player can not keep the button pressed
    }

    // Enter button: Start/unpause the game
    if (event.keyCode === 13) {
        // If the game is in a game over state, refresh the page to restart the game
        if (isGameOver) {
            window.location.reload();
        }

        // If the game is paused, unpause it
        if (isPaused) {
            isPaused = false;
        }
    }

    // ESC button: Pause the game
    if (event.keyCode === 27 && !isPaused && !isGameOver) {
        isPaused = true;
    }
}, false);

document.addEventListener('keyup', function(event) {
    pressed = false;
}, false);

// MAIN LOOP
function gameLoop() {

    // UPDATE CALLS

    // If the game is not paused and is not over, keep executing the physics and the logic
    if (!isPaused && !isGameOver) {
        player.update();
        pipeTop.update();
        pipeBottom.update();
        background1.update();
        background2.update();
    }

    // DRAW CALLS

    // Clear the screen first
    ctx.clearRect(0, 0, 360, 640);

    // Draw the backgrounds first
    background1.draw();
    background2.draw();

    // Then draw the foreground objects
    player.draw();
    pipeTop.draw();
    pipeBottom.draw();

    // Show the informational text on top of everything
    if (isPaused) {
        // If the game is paused, show the necessary information
        drawTint(0, 0, 360, 640);
        drawText('Hit "Enter"', 180, 310);
        drawText('to play!', 180, 380);
        if (score > 0) {
            drawText(score, 180, 52);
        }
    } else if (isGameOver) {
        // If the game is over, show the necessary message
        drawTint(0, 0, 360, 640);
        drawText('Game Over', 180, 310);
        drawText('Score: ' + score, 180, 380);
    } else {
        // If neither is true, just show the score
        drawTint(0, 0, 360, 64);
        drawText(score, 180, 52);
    }

    // Recursive loop - Calls itself
    window.requestAnimationFrame(gameLoop);
}

// ENTRY POINT
gameLoop(); // Call it once and start the game!