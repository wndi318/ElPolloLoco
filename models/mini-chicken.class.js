/**
 * Represents a mini chicken enemy.
 * Extends the MovableObject class.
 */
class MiniChicken extends MovableObject {
    y = 380;
    height = 40;
    width = 40;
    deadChicken = false;

    /**
     * Offset values for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: -5,
        left: -5,
        right: -5,
        bottom: -5
    };

    /**
     * Array of image paths representing the walking animation of the mini chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Array of image paths representing the dead state of the mini chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates an instance of MiniChicken.
     * @param {number} x - The initial x-coordinate of the mini chicken.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Starts the animation of the mini chicken.
     * Moves the mini chicken left and plays its walking animation.
     * Triggers the chicken's death animation when it's dead.
     */
    animate() {
        this.smallChickenMoveLeft();
        this.chickenDied();
    }

    /**
     * Moves the mini chicken left at a constant interval.
     */
    smallChickenMoveLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

    /**
     * Initiates the mini chicken's death animation when it's dead.
     */
    chickenDied() {
        let chickenInterval = setInterval(() => {
            if (this.deadChicken) {
                this.speed = 0;
                hitChickenSound.play();
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(chickenInterval);
            }
        }, 150);
    }
}