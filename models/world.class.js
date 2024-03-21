class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    bottleCount = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollison();
            this.checkBottleCollison();
            this.checkThrowObjects();
        }, 100);

        setInterval(() => {
            this.checkBottleChickenCollison();
        }, 10);

    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCount > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(this.bottleCount * 10);
            this.bottleCount--;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCoinCollison() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.getCoin();
                this.coinBar.setPercentage(this.character.coins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkBottleCollison() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.getBottle();
                this.bottleBar.setPercentage(this.bottleCount * 10);
                this.level.bottles.splice(index, 1);
                this.bottleCount++;
            }
        });
    }

    checkBottleChickenCollison() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    enemy.deadChicken = true;
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 500);
                }
            });
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgoundObjects);

        this.ctx.translate(-this.camera_x, 0); //Back
        // ----------- Space for fixed Objects ----------
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0); //Forwards

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}