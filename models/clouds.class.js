/**
 * Represents a cloud object that extends the functionality of a movable object.
 */
class Cloud extends MovableObject {
    y = 30;
    width = 500;
    height = 300;
    speed = 0.15;

    /**
     * Array of image paths representing different cloud images.
     * @type {string[]}
     */
    IMAGES_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ]

    /**
     * Creates an instance of Cloud.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(x) {
        let randomIndex = Math.random() < 0.5 ? 0 : 1;
        super().loadImage(this.IMAGES_CLOUDS[randomIndex]);
        this.x = x;
        this.animate();
    }

    /**
     * Initiates the cloud animation.
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud to the left.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= 0.1;
            if (this.x < -this.width) {
                this.x = 720; 
            }
        }, 1000 / 60);
    }
}