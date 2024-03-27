class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    endbossEnergy = 100;
    lastHit = 0;
    hurt_sound = new Audio ('audio/hurt.mp3')
    gravityEnd;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

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

    // z.B. character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.hurt_sound.play();
    }

    endbossHit() {
        this.endbossEnergy -= 20;
        if (this.endbossEnergy <= 0) {
            this.endbossEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 0.5;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 6 % 6; => 1, Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0,....
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}