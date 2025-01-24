/**
 * All javascript is run once content has been loaded.
 */
document.addEventListener('DOMContentLoaded' , () => {
    /**
     * Setting Constants for the script to use
     */
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let gap = 450

    let isGameOver = false

    /**
     * Function used to play the game
     */
    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'

      }
    
    /**
     * Let the game interval start every 20ms, used to simulate
     * gravity using the birdBottom -= gravity
     */
    let gameTimerId = setInterval(startGame, 20)

    /** Space bar jump trigger */
    function control(e){
        if (e.keyCode === 32 || ontouchstart()){
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
    document.addEventListener('keyup', control)

    /**Generates obsticals at random hights, moving at a constant pace left */
    function generateObstical () {
        let obsticalLeft = 500
        // random hight in generation
        let randomHeight = Math.random() * 60
        let obsticalBottom = randomHeight
        const obstical = document.createElement('div')
        const topObstical = document.createElement('div')
        if (!isGameOver){
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
                (birdBottom < obsticalBottom + 152 || birdBottom > obsticalBottom + gap -200) ||
                birdBottom === 0 
                ) {
                gameOver()
                clearInterval(timerId)
                
            }
        }
        let timerId = setInterval(moveObstical, 20)
        if (!isGameOver) setTimeout(generateObstical, 3000)
    }

    generateObstical()

    /** end game function */
    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
    }
})