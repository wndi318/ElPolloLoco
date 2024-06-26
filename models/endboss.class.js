/**
 * Represents the end boss character.
 */
class Endboss extends MovableObject {
    height = 350;
    width = 200;
    x = 3800;
    endbossArea = false;
    endbossDead = false;
    endbossEnd = false;
    deadAnimationPlayed = false;
    normalAnimationSopped = false;
    alertInterval;
    checkEndbossAreaInterval;
    walkingAndJumpingInterval;
    gravityEnd = 100;

    /**
    * The offset values for collision detection.
    * @type {Object}
    */
    offset = {
        top: 65,
        left: 5,
        right: 5,
        bottom: 10
    };

    /**
     * Array of image paths representing walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array of image paths representing alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array of image paths representing attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Array of image paths representing dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an instance of Endboss.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.speed = 20;
        this.y = 0;
    }

    /**
     * Initiates the animation sequence for the end boss.
     */
    animate() {
        if (!this.endbossDead) {
            if (!this.endbossArea) {
                this.alert();
            } else {
                this.walkingAndJumping();
                this.moveLeft();
            }
        } else {
            this.dead();
        }
    }

    /**
     * Initiates the alert animation sequence.
     */
    alert() {
        this.alertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 150);

        this.checkEndbossAreaInterval = setInterval(() => {
            if (this.endbossArea) {
                clearInterval(this.alertInterval);
                clearInterval(this.checkEndbossAreaInterval);
            }
        }, 100);
    }

    /**
     * Initiates the walking and jumping animation sequence.
     */
    walkingAndJumping() {
        this.playAnimation(this.IMAGES_WALKING);
        if (!this.isAboveGround()) {
            this.walkingAndJumpingInterval = setTimeout(() => {
                this.jump();
                this.speed = 5;
                this.playAnimation(this.IMAGES_ATTACK);
                clearTimeout(this.walkingAndJumpingInterval);
            }, 200);
        }
    }

    /**
     * Initiates the dead animation sequence.
     */
    dead() {
        clearInterval(this.alertInterval);
        clearInterval(this.checkEndbossAreaInterval);
        clearInterval(this.walkingAndJumpingInterval);
        this.speed = 0;
        if (!this.endbossEnd && !this.deadAnimationPlayed) {
            this.playAnimation(this.IMAGES_DEAD);
            this.deadAnimationPlayed = true;
        } else {
            this.showLastDeadImage();
        }
    }

    /**
     * Displays the last image of the dead animation.
     */
    showLastDeadImage() {
        const lastDeadImage = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
        this.loadImage(lastDeadImage);
        setTimeout(() => {
            this.gameEnd();
        }, 700);
    }

    /**
     * Ends the game when the end boss is dead.
     */
    gameEnd() {
        gameOver();
        stopAllSounds();
    }
}