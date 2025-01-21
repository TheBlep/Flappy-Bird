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
        bird.computedStyleMap.bottom = birdBottom + 'px'
        bird.computedStyleMap.left = birdLeft + 'px'

      }
    
    /**
     * Let the game interval start every 20ms, used to simulate
     * gravity using the birdBottom -= gravity
     */
    let timerid = setInterval(startGame, 20)
})