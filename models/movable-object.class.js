/**
 * Represents a movable object in the game.
 * Extends the DrawableObject class.
 */
class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    endbossEnergy = 100;
    lastHit = 0;
    gravityEnd;

    /**
     * Applies gravity to the movable object, affecting its vertical movement.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            if (this.y > this.gravityEnd) {
                this.y = this.gravityEnd;
            }
            return this.y < this.gravityEnd;
        }
    }

    /**
     * Checks if the movable object is colliding with another object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Decreases the energy of the movable object when hit.
     * Plays a hurt sound effect.
     */
    hit() {
        if (!this.isAboveGround()) {
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
            hurtSound.play();
        }
    }

    /**
     * Decreases the end boss's energy when hit.
     */
    endbossHit() {
        let currentTime = new Date().getTime();
        let timePassed = currentTime - this.lastHit; // Time passed since last hit in milliseconds
        if (timePassed >= 500) { // Check if at least 0.5 seconds (500 milliseconds) have passed since last hit
            this.endbossEnergy -= 20;
            if (this.endbossEnergy <= 0) {
                this.endbossEnergy = 0;
            }
            this.lastHit = currentTime; // Update last hit time
        }
    }

    /**
     * Checks if the movable object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the movable object is hurt based on time passed since last hit.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Plays an animation by changing the current image of the object.
     * @param {string[]} images - Array of image paths representing the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the movable object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the movable object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the movable object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }
}