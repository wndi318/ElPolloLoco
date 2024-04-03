let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Starts the game, initializes it, and hides the start screen.
 */
function startGame() {
    init();
    initMuteButton();
    document.getElementById('startScreen').style.display = 'none';
}

/**
 * Displays the end screen and stops all intervals.
 */
function gameOver() {
    document.getElementById('endScreen').style.display = 'block';
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Taking the user back to the menu.
 */
function backToMenu() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}

/**
 * Initializes the game by setting up the canvas and creating the game world.
 * Also sets up mobile controls.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setupMobileControls();
}

/**
 * Event listener function that listens for keydown events and updates the keyboard object accordingly.
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Event listener function that listens for keyup events and updates the keyboard object accordingly.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * Sets up mobile controls for the game by adding touch event listeners to control buttons.
 */
function setupMobileControls() {
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnJump = document.getElementById('btnJump');
    const btnThrow = document.getElementById('btnThrow');

    btnLeft.addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    });

    btnLeft.addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });

    btnRight.addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    });

    btnRight.addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });

    btnJump.addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    });

    btnJump.addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });

    btnThrow.addEventListener('touchstart', () => {
        keyboard.D = true;
    });

    btnThrow.addEventListener('touchend', () => {
        keyboard.D = false;
    });
}

/**
 * Toggles the fullscreen mode for the specified element.
 */
function toggleFullScreen() {
    let elem = document.getElementById('fullBody');
    let gameScreen = document.getElementById('gameScreen');
    let canvas = document.getElementById('canvas');
    let startScreen = document.getElementById('startScreenImage');
    let endScreen = document.getElementById('endScreenImage');

    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

        // Set gameScreen, canvas, startScreen, and endScreen height and width to 100% when entering fullscreen
        gameScreen.style.width = "100%";
        gameScreen.style.height = "100%";
        canvas.style.width = "100%";
        canvas.style.height = "94%";
        startScreen.style.width = "100vw";
        startScreen.style.height = "100vh";
        endScreen.style.width = "100vw";
        endScreen.style.height = "100vh";
        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        // Reset gameScreen, canvas, startScreen, and endScreen height and width when exiting fullscreen
        gameScreen.style.width = "";
        gameScreen.style.height = "";
        canvas.style.width = "";
        canvas.style.height = "";
        startScreen.style.width = "";
        startScreen.style.height = "";
        endScreen.style.width = "";
        endScreen.style.height = "";
    }
}



