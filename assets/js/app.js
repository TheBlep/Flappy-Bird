//Start game once content is loaded.
document.addEventListener('DOMContentLoaded', () => {
    bird = document.querySelector('.bird')
    gameDisplay = document.querySelector('.game-container')
    resetButton = document.querySelector('.resetButton')
    jumpButton = document.querySelector('.jumpButton')
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    startGame()

    /** Button function to restart game */
    resetButton.onclick = function () {
        gameOver()
        console.log('isclicked')
        startGame()
        resetButton.blur()
    };
})

//Initialization
let birdLeft = 220
let birdBottom = 100
let gravity = 2
let gap = 450
let isGameOver = false
let moveObsticalTimers = []

let bird = document.querySelector('.bird')
let gameDisplay = document.querySelector('.game-container')
let resetButton = document.querySelector('.button')
let jumpButton = document.querySelector('.jumpButton')
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

/**Used to reset game**/
function startGame() {
    resetObstical()
    gameTimerId = setInterval(gameLoop, 20)
    generationId = setInterval(generateObstical, 3000)
    birdLeft = 220
    birdBottom = 300
    gravity = 2
    gap = 450

    isGameOver = false

    generateObstical()

    jumpButton.onclick = function () {
        console.log('You jumped')
        jump()
    }

}

/**Game function loop, 20ms**/
function gameLoop() {

    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'

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
    moveObsticalTimers.push(timerId);
    console.log(timerId)
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
            //alert("You failed")
            popup()
        }
    }
}

function resetObstical() {
    let obsticals = document.getElementsByClassName('obstical')
    let topObsticals = document.getElementsByClassName('topObstical')
    for (var i = 0; i < obsticals.length; i++) {
        gameDisplay.removeChild(obsticals[i])
        gameDisplay.removeChild(topObsticals[i])
    }
}

/** End game function */
function gameOver() {

    for (var i = 0; i < moveObsticalTimers.length; i++) {
        clearInterval(moveObsticalTimers[i])
    }
    clearInterval(gameTimerId)
    clearInterval(generationId)
    console.log('game over')

    isGameOver = true
    document.removeEventListener('touchstart', jump)
}

// Get the modal


// When the user clicks on the button, open the modal
function popup() {
    modal.style.display = "block";
}