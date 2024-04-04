const coinSound = new Audio('audio/coin.mp3');
const walkingSound = new Audio('audio/walking.mp3');
const jumpingSound = new Audio('audio/jump.mp3');
const pickBottleSound = new Audio('audio/pick_bottle.mp3');
const hitChickenSound = new Audio('audio/chicken_hit.mp3');
const hurtSound = new Audio('audio/hurt.mp3');
const bottleSplashSound = new Audio('audio/bottle_splash.mp3');
const bossSound = new Audio('audio/boss_sound.mp3');
const backgroundSound = new Audio('audio/background_sound.mp3');

const allSounds = [
    coinSound,
    walkingSound,
    jumpingSound,
    pickBottleSound,
    hitChickenSound,
    hurtSound,
    bottleSplashSound,
    bossSound,
    backgroundSound
];

const muteButton = document.getElementById("muteButton");
let isMuted = localStorage.getItem('isMuted') === 'true';

/**
 * Initializes the mute button icon based on the mute status stored in localStorage.
 * If the mute status is "true", sets the icon to "mute.png", otherwise sets it to "unmute.png".
 */
function initMuteButton() {
    const isMuted = localStorage.getItem('isMuted') === 'true';
    const muteIcon = document.getElementById("muteIcon");
    if (isMuted) {
        muteIcon.src = "img/design_icons/mute.png";
    } else {
        muteIcon.src = "img/design_icons/unmute.png";
    }

    muteButton.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
}

/**
 * Loads the mute state from localStorage and calls either the `mute()` or `unmute()` functions accordingly
 * to set the mute state.
 */
function loadMuteState() {
    if (isMuted) {
        mute();
    } else {
        unmute();
    }
}

/**
 * Saves the current mute state to localStorage.
 */
function saveMuteState() {
    localStorage.setItem('isMuted', isMuted);
}

/**
 * Setzt die Lautstärke aller Sounds.
 */
allSounds.forEach(sound => {
    sound.volume = 0.25;
});

/**
 * Schaltet die Stummschaltung um und aktualisiert das Symbol.
 */
function toggleMute() {
    if (isMuted) {
        unmute();
    } else {
        mute();
    }
}

/**
 * Setzt den Stummschaltungsstatus auf stumm und aktualisiert das Symbol.
 */
function mute() {
    allSounds.forEach(sound => {
        sound.volume = 0;
    });
    isMuted = true;
    saveMuteState();
    document.getElementById("muteIcon").src = "img/design_icons/mute.png";
}

/**
 * Setzt den Stummschaltungsstatus auf nicht stumm und aktualisiert das Symbol.
 */
function unmute() {
    allSounds.forEach(sound => {
        sound.volume = 0.25;
    });
    isMuted = false;
    saveMuteState();
    document.getElementById("muteIcon").src = "img/design_icons/unmute.png";
}

/**
 * Stoppt die Wiedergabe aller Sounds und setzt ihre aktuelle Zeit auf null.
 */
function stopAllSounds() {
    allSounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}

/**
 * Loads the mute Status at loading the site
 */
loadMuteState();