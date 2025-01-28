// Start game once content is loaded.
document.addEventListener('DOMContentLoaded', () => {
    bird = document.querySelector('.bird');
    gameDisplay = document.querySelector('.game-container');
    resetButton = document.querySelector('.resetButton');
    jumpButton = document.querySelector('.jumpButton');
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal (For endgame)
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it (for endgame)
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    // Starts the game
    startGame();

    /** Button function to restart game */
    resetButton.onclick = function () {
        gameOver();
        console.log('isclicked');
        startGame();
        resetButton.blur();
    };
});

// Initialization
let birdLeft = 220;
let birdBottom = 100;
let gravity = 2;
let gap = 450;
let isGameOver = false;
let moveObsticalTimers = [];

let bird = document.querySelector('.bird');
let gameDisplay = document.querySelector('.game-container');
let resetButton = document.querySelector('.button');
let jumpButton = document.querySelector('.jumpButton');
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

/** Used to reset game**/
function startGame() {
    resetObstical();
    gameTimerId = setInterval(gameLoop, 20);
    generationId = setInterval(generateObstical, 3000);
    birdLeft = 220;
    birdBottom = 300;
    gravity = 2;
    gap = 450;

    isGameOver = false;

    generateObstical();

    jumpButton.onclick = function () {
        if (!isGameOver){
        console.log('You jumped');
        jump();
        }
    };
}

/** Game function loop, 20ms**/
function gameLoop() {

    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';

}

/** Makes the bird jump */
function jump() {
    // Creates a ceiling for the bird
    if (birdBottom < 500)
        // Adds 50px to bird bottom to use as a jump
        birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';

}

/** Generates obsticals at random hights, moving at a constant pace left */
function generateObstical() {
    let timerId = setInterval(moveObstical, 20);
    moveObsticalTimers.push(timerId);
    console.log(timerId);
    let obsticalLeft = 500;
    // random hight in generation
    let randomHeight = Math.random() * 60;
    let obsticalBottom = randomHeight;
    const obstical = document.createElement('div');
    const topObstical = document.createElement('div');
    if (!isGameOver) {
        obstical.classList.add('obstical');
        topObstical.classList.add('topObstical');
    }
    // Insert obstical divs
    gameDisplay.appendChild(obstical);
    gameDisplay.appendChild(topObstical);
    obstical.style.left = obsticalLeft + 'px';
    topObstical.style.left = obsticalLeft + 'px';
    obstical.style.bottom = obsticalBottom + 'px';
    topObstical.style.bottom = obsticalBottom + gap + 'px';

    /** moving obsticals from right to left */
    function moveObstical() {

        obsticalLeft -= 2;
        obstical.style.left = obsticalLeft + 'px';
        topObstical.style.left = obsticalLeft + 'px';

        // Remove obstical after leaving game area
        if (obsticalLeft === -60) {
            clearInterval(timerId);
            gameDisplay.removeChild(obstical);
            gameDisplay.removeChild(topObstical);
        }
        if (obsticalLeft > 200 && obsticalLeft < 270 &&
            (birdBottom < obsticalBottom + 152 || birdBottom > obsticalBottom + gap - 200) ||
            birdBottom === 0
        ) {
            gameOver();
            popup();
        }
    }
}
/** Remove all obsticals */
function resetObstical() {
    document.querySelectorAll('.obstical').forEach(e => e.remove());
    document.querySelectorAll('.topObstical').forEach(e => e.remove());
  

}

/** End game function */
function gameOver() {
    // Clear all timers
    for (let i = 0; i < moveObsticalTimers.length; i++) {
        clearInterval(moveObsticalTimers[i]);
    }
    clearInterval(gameTimerId);
    clearInterval(generationId);
    console.log('game over');

    isGameOver = true;
    jumpButton = null;
    
}

/** Modal popup for endgame */
function popup() {
    modal.style.display = "block";
}