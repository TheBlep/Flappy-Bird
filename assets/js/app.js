/**
 * All javascript is run once content has been loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    bird = document.querySelector('.bird')
    gameDisplay = document.querySelector('.game-container')
    button = document.querySelector('.button')
    gameTimerId = setInterval(gameLoop, 20)
    setUp()

    /** Button function to restart game */
    button.onclick = function () {
        console.log('isclicked')
        setUp()
        //gameTimerId = setInterval(startGame, 20),
        //generateObstical(),
        //isGameOver=false,
        //setUp()

    };
})

//Setting Constants for the script to use
let birdLeft = 220
let birdBottom = 100
let gravity = 2
let gap = 450

let isGameOver = false

let bird = document.querySelector('.bird')
let gameDisplay = document.querySelector('.game-container')
let button = document.querySelector('.button')


/**Used to reset variables**/
function setUp() {

    birdLeft = 220
    birdBottom = 100
    gravity = 2
    gap = 450

    isGameOver = false

    generateObstical()
    document.addEventListener('keyup', control)
    document.addEventListener('touchstart', jump)
}

/**Function used to play the game**/
function gameLoop() {
    
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
    
}



/**Let the game interval start every 20ms, used to simulate
 * gravity using the birdBottom -= gravity
 */


/** Space bar jump trigger */
function control(e) {
    if (e.keyCode === 32) {
        jump()
    }
}


/** Makes the bird jump */
function jump() {
    // Creates a ceiling for the bird
    if (birdBottom < 500)
        // Adds 50px to bird bottom to use as a jump
        birdBottom += 50
    bird.style.bottom = birdBottom + 'px'

}

/**Generates obsticals at random hights, moving at a constant pace left */
function generateObstical() {
    let timerId = setInterval(moveObstical, 20)
    let obsticalLeft = 500
    // random hight in generation
    let randomHeight = Math.random() * 60
    let obsticalBottom = randomHeight
    const obstical = document.createElement('div')
    const topObstical = document.createElement('div')
    if (!isGameOver) {
        obstical.classList.add('obstical')
        topObstical.classList.add('topObstical')
    }
    gameDisplay.appendChild(obstical)
    gameDisplay.appendChild(topObstical)
    obstical.style.left = obsticalLeft + 'px'
    topObstical.style.left = obsticalLeft + 'px'
    obstical.style.bottom = obsticalBottom + 'px'
    topObstical.style.bottom = obsticalBottom + gap + 'px'

    /** moving obstical from right to left */
    function moveObstical() {
        obsticalLeft -= 2
        obstical.style.left = obsticalLeft + 'px'
        topObstical.style.left = obsticalLeft + 'px'

        // remove obstical after leaving game area
        if (obsticalLeft === -60) {
            clearInterval(timerId)
            gameDisplay.removeChild(obstical)
            gameDisplay.removeChild(topObstical)
        }
        if (obsticalLeft > 200 && obsticalLeft < 270 &&
            (birdBottom < obsticalBottom + 152 || birdBottom > obsticalBottom + gap - 200) ||
            birdBottom === 0
        ) {
            gameOver()
            clearInterval(timerId)

        }
    }

    if (!isGameOver) setTimeout(generateObstical, 3000)
    if (isGameOver) alert("You failed")
}

/** end game function */
function gameOver() {
    clearInterval(gameTimerId)
    console.log('game over')
    isGameOver = true
    document.removeEventListener('keyup', control)
    document.removeEventListener('touchstart', jump)
}

//button.addEventListener("click", myScript);