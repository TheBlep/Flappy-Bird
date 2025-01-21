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
    let timerId = setInterval(startGame, 20)

    function jump() {
        // Adds 50px to bird bottom to use as a jump
        birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }
    document.addEventListener('keyup', jump)
})