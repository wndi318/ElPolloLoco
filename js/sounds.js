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

allSounds.forEach(sound => {
    sound.volume = 0.25;
});

const muteButton = document.getElementById("muteButton");
let isMuted = false;

function toggleMute() {
    if (isMuted) {
        allSounds.forEach(sound => {
            sound.volume = 0.25;
        });
        isMuted = false;
        document.getElementById("muteIcon").src = "img/design_icons/mute.png";
    } else {
        allSounds.forEach(sound => {
            sound.volume = 0;
        });
        isMuted = true;
        document.getElementById("muteIcon").src = "img/design_icons/unmute.png";
    }
}

muteButton.addEventListener("click", toggleMute);
