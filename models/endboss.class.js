class Endboss extends MovableObject {
    height = 350;
    width = 200;
    x = 3800;
    endbossArea = false;
    endbossDead = false;
    endbossEnd = false;
    deadAnimationPlayed = false;
    normalAnimationSopped = false;
    alertInterval;
    checkEndbossAreaInterval;
    walkingAndJumpingInterval;
    gravityEnd = 100;

    offset = {
        top: 65,
        left: 5,
        right: 5,
        bottom: 10
    }

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.speed = 20;
        this.y = 0;
    }

    animate() {
        if (!this.endbossDead) {
            if (!this.endbossArea) {
                this.alert();
            } else {
                this.walkingAndJumping();
                this.moveLeft();
            }
        } else {
            this.dead();
        }
    }

    alert() {
        this.alertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 150);

        this.checkEndbossAreaInterval = setInterval(() => {
            if (this.endbossArea) {
                clearInterval(this.alertInterval);
                clearInterval(this.checkEndbossAreaInterval);
            }
        }, 100);
    }

    walkingAndJumping() {
        this.playAnimation(this.IMAGES_WALKING);
        if (!this.isAboveGround()) {
            this.walkingAndJumpingInterval = setTimeout(() => {
                this.jump();
                this.speed = 5;
                this.playAnimation(this.IMAGES_ATTACK);
                clearTimeout(this.walkingAndJumpingInterval);
            }, 200)
        }
    }

    dead() {
        clearInterval(this.alertInterval);
        clearInterval(this.checkEndbossAreaInterval);
        clearInterval(this.walkingAndJumpingInterval);
        this.speed = 0;
        if (!this.endbossEnd && !this.deadAnimationPlayed) { // Überprüfen, ob die Todesanimation bereits abgespielt wurde
            this.playAnimation(this.IMAGES_DEAD);
            this.deadAnimationPlayed = true; // Markieren Sie die Todesanimation als abgespielt
        } else {
            this.showLastDeadImage();
        }
    }

    showLastDeadImage() {
        const lastDeadImage = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
        this.loadImage(lastDeadImage);
        setTimeout(() => {
            this.gameEnd();
        }, 700);
    }

    gameEnd() {
        gameOver();
        stopAllSounds();
    }

}