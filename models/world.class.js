/**
 * Represents the game world.
 */
class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    bottleCount = 0;
    wasHit = false; // Flag to track if the character was hit
    hitTimeout = null; // Timeout for resetting wasHit

    /**
     * Constructs a new World object.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard input state.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.entered3300 = false;
        this.endboss.animate();
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets up the world by assigning necessary properties.
     */
    setWorld() {
        this.character.world = this;
        backgroundSound.play();
    }

    /**
     * Checks different collisions and methods.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkEndbossCollision();
            this.checkCoinCollison();
            this.checkBottleCollison();
            this.checkThrowObjects();
            this.endbossAction();
            this.checkEndbossIsDead();
        }, 100);

        setInterval(() => {
            this.checkBottleChickenCollison();
            this.checkCharacterJumpOnChicken();
            this.checkBottleEndbossCollison();
        }, 10);
    }

    /**
    * Checks if the player initiated a throw action and throws a bottle if conditions are met.
    */
    checkThrowObjects() {
        const currentTime = Date.now();
        const throwCooldown = 1000;
        if (this.keyboard.D && this.bottleCount > 0 && (!this.lastThrowTime || currentTime - this.lastThrowTime >= throwCooldown)) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(this.bottleCount * 10);
            this.bottleCount--;
            this.lastThrowTime = currentTime;
        }
    }

    /**
    * Checks for collisions between the player character and enemies.
    * If a collision is detected, triggers the character's hit method and updates the health bar.
    */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
                this.wasHit = true; // Character was hit
                // Set a timeout to reset wasHit after 0.5 seconds
                if (this.hitTimeout) {
                    clearTimeout(this.hitTimeout);
                }
                this.hitTimeout = setTimeout(() => {
                    this.wasHit = false;
                }, 90);
            }
        });
    }

    /**
    * Checks for collisions between the player character and coins.
    * If a collision is detected, triggers the character's get coin method and updates the coin bar.
    */
    checkCoinCollison() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.getCoin();
                this.coinBar.setPercentage(this.character.coins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
    * Checks for collisions between the player character and bottles.
    * If a collision is detected, triggers the character's get bottle method and updates the bottle bar.
    */
    checkBottleCollison() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.getBottle();
                this.bottleBar.setPercentage(this.bottleCount * 20);
                this.level.bottles.splice(index, 1);
                this.bottleCount++;
            }
        });
    }

    /**
    * Checks for collisions between throwable objects (bottles) and enemies (chickens).
    * If a collision is detected, sets the 'deadChicken' property of the enemy to true,
    * triggers the bottle splash effect, and removes both the bottle and the enemy from the game after a delay.
    */
    checkBottleChickenCollison() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    enemy.deadChicken = true;
                    bottle.bottleSplash = true;
                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 200);
                }
            });
        });
    }

    /**
     Checks if the character jumps on top of a chicken enemy.
    * If a collision is detected and certain conditions are met,
    * sets the 'deadChicken' property of the enemy to true, adjusts the character's acceleration,
    * makes the character jump, and removes the enemy from the game after a delay.
    */
    checkCharacterJumpOnChicken() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (
                this.character.isColliding(enemy) &&
                this.character.isAboveGround() && // Charakter ist über dem Boden
                this.character.y < enemy.y && // Charakter ist oberhalb des Huhns
                !enemy.deadChicken &&
                !this.wasHit // Check if character was not hit before attempting to jump on chicken
            ) {
                enemy.deadChicken = true;
                this.character.acceleration = 3.0;
                this.character.jump();
                this.level.enemies.splice(enemyIndex, 1);
            }
        });
    }

    /**
    * Checks for collision between the character and the end boss.
    * If a collision is detected, reduces the character's energy and updates the health bar percentage.
    */
    checkEndbossCollision() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    /**
    * Checks for collision between throwable objects (bottles) and the end boss.
    * If a collision is detected, triggers a splash effect from the bottle,
    * reduces the end boss's energy, updates the end boss's health bar percentage,
    * and removes the bottle from the game.
    */
    checkBottleEndbossCollison() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            if (bottle.isColliding(this.endboss)) {
                bottle.bottleSplash = true;
                this.endboss.endbossHit();
                this.endbossBar.setPercentage(this.endboss.endbossEnergy);
                setTimeout(() => {
                    this.throwableObjects.splice(bottleIndex, 1);
                }, 200);
            }
        });
    }

    /**
    * Manages the behavior of the end boss as the character progresses through the game.
    * Triggers specific actions related to the end boss's appearance and animation.
    */
    endbossAction() {
        if (this.character.x >= 3300 && !this.entered3300) {
            this.entered3300 = true;
            this.endboss.endbossArea = true;
            bossSound.play();
            backgroundSound.pause();
        }
        if (this.entered3300) {
            this.endboss.animate();
        }
    }

    /**
    * Checks if the end boss is defeated by monitoring its energy level.
    * If the end boss's energy reaches zero, it is marked as dead.
    */
    checkEndbossIsDead() {
        if (this.endboss.endbossEnergy === 0) {
            this.endboss.endbossDead = true;
        }
    }

    /**
    * Renders all game objects onto the canvas.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgoundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    /**
    * Adds an array of objects to the map for rendering.
    * @param {Array} objects - Array of objects to be rendered.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
    * Renders a single object onto the canvas.
    * Handles flipping images horizontally if required.
    * @param {DrawableObject} mo - The object to be rendered.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * Flips the image horizontally.
    * @param {DrawableObject} mo - The object whose image needs to be flipped.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the original orientation of the image after flipping.
    * @param {DrawableObject} mo - The object whose image orientation needs to be restored.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
