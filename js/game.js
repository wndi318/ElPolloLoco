let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    init();
    document.getElementById('startScreen').style.display = 'none';
}

function gameOver() {
    document.getElementById('endScreen').style.display = 'block';
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setupMobileControls();
}

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

function toggleFullScreen() {
    let elem = document.getElementById('fullBody');

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
    }
}
