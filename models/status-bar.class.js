/**
 * Represents a status bar in the game.
 * Extends the DrawableObject class.
 */
class StatusBar extends DrawableObject {
    /**
     * Array of image paths representing different percentages of the status bar.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * The percentage value of the status bar.
     * @type {number}
     */
    percentage;

    /**
     * Constructs a new StatusBar object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in the IMAGES array based on the current percentage value.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        return Math.min(Math.floor(this.percentage / 20), 5);
    }
}