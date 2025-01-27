 //Start game once content is loaded.
document.addEventListener('DOMContentLoaded', () => {
    bird = document.querySelector('.bird')
    gameDisplay = document.querySelector('.game-container')
    resetButton = document.querySelector('.resetButton')
    startGame()

    /** Button function to restart game */
    resetButton.onclick = function () {
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

let bird = document.querySelector('.bird')
let gameDisplay = document.querySelector('.game-container')
let resetButton = document.querySelector('.button')


/**Used to reset game**/
function startGame() {
    resetObstical()
    gameTimerId = setInterval(gameLoop, 20)
    birdLeft = 220
    birdBottom = 100
    gravity = 2
    gap = 450

    isGameOver = false

    generateObstical()
    document.addEventListener('keyup', control)
    document.addEventListener('touchstart', jump)
}

/**Game function loop, 20ms**/
function gameLoop() {

    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'

}

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
        if (isGameOver) {
            clearInterval(timerId)
            return
        }
        obsticalLeft -= 2
        obstical.style.left = obsticalLeft + 'px'
        topObstical.style.left = obsticalLeft + 'px'

        // remove obstical after leaving game area
        if (obsticalLeft === -60){
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
            alert("You failed")
        }
    }

    if (!isGameOver) setTimeout(generateObstical, 3000)

}
function resetObstical(){
    let obsticals = document.getElementsByClassName('obstical')
    let topObsticals = document.getElementsByClassName('topObstical')
    for(var i= 0; i < obsticals.length; i++){
        gameDisplay.removeChild(obsticals[i])
        gameDisplay.removeChild(topObsticals[i])
    }
}

/** end game function */
function gameOver() {
    clearInterval(gameTimerId)
    console.log('game over')
    isGameOver = true
    document.removeEventListener('keyup', control)
    document.removeEventListener('touchstart', jump)
}