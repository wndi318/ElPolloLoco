/**
 * Represents a throwable object in the game.
 * Extends the MovableObject class.
 */
class ThrowableObject extends MovableObject {
    /**
     * Array of image paths representing the rotation animation of the throwable object.
     * @type {string[]}
     */
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths representing the splash animation of the throwable object.
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * The offset values for collision detection.
     * @type {Object}
     */
    offset = {
        top: 20,
        left: 52,
        right: 45,
        bottom: 20
    };

    bottleSplash = false;

    /**
     * Constructs a new ThrowableObject object.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     * @param {boolean} direction - The direction of the throwable object.
     */
    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.throw();
        this.bottleHit();
        this.otherDirection = direction;
    }

    /**
     * Throws the throwable object and initiates the rotation animation.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
            this.bottleHit();
        }, 25);
        setTimeout(() => {
            clearInterval(throwInterval);
        }, 1100);
    };

    /**
     * Initiates the splash animation when the throwable object hits the ground or an enemie.
     */
    bottleHit() {
        let hitInterval = setInterval(() => {
            if (this.bottleSplash || this.y >= 360) {
                this.playAnimation(this.IMAGES_SPLASH);
                this.speedY = 0;
                this.y = 370;
                if (!this.splashSoundPlayed) {
                    bottleSplashSound.play();
                    this.splashSoundPlayed = true;
                }
                setTimeout(() => {
                    this.x = -200;
                }, 40);
                clearInterval(hitInterval);
            }
        }, 300);
    }
}
