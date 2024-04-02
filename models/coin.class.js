/**
 * Represents a coin object that extends the functionality of a movable object.
 */
class Coin extends MovableObject {
    height = 110;
    width = 110;

    /**
     * The offset values for collision detection.
     * @type {Object}
     */
    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };

    /**
     * Array of image paths representing different coin images.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of Coin.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 3500;
        this.y = 320 -  Math.random() * 180;
        this.animate();
    }

    /**
     * Initiates the coin animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }
}
