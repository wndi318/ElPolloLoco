/**
 * Represents a chicken enemy object that extends the functionality of a movable object.
 */
class Chicken extends MovableObject {
    y = 360;
    height = 50;
    width = 70;
    deadChicken = false;

    /**
    * The offset values for collision detection.
    */
    offset = {
        top: 2,
        left: 2,
        right: 2,
        bottom: 2
    }

    /**
    * Array of image paths representing the chicken walking animation.
    * @type {string[]}
    */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array of image paths representing the chicken dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    /**
    * Creates an instance of Chicken.
    * @param {number} x - The initial x-coordinate of the chicken.
    */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Initiates the chicken animation loops.
     */
    animate() {
        this.chickenMoveLeft();
        this.chickenDied();
    }

    /**
     * Animates the chicken movement to the left.
     */
    chickenMoveLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

     /**
     * Animates the chicken's death.
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