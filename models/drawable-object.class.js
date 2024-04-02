/**
 * Represents an object that can be drawn on a canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image file.
        */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the drawable object on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Draws a frame around the drawable object.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof MiniChicken || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    /**
    * Loads multiple images from an array of paths and caches them.
    * @param {string[]} arr - Array of paths to image files.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }
}