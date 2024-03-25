class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    endbossArea = false;
    endbossDead = false;

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
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    boss_sound = new Audio('../audio/boss_sound.mp3')

    constructor(x) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = x;
        this.applyGravity();
        this.animate();
        this.speed = 20;
    }

    animate() {
        if (!this.endbossArea) {
            this.alert();
        } else {
            this.walkingAndJumping();
            this.moveLeft();
        }
    }

    alert() {
        const alertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 150);

        const checkEndbossAreaInterval = setInterval(() => {
            if (this.endbossArea) {
                clearInterval(alertInterval);
                clearInterval(checkEndbossAreaInterval);
            }
        }, 100);
    }

    walkingAndJumping() {
        this.playAnimation(this.IMAGES_WALKING);
        if (!this.isAboveGround()) {
            this.walk = setTimeout(() => {
                this.jump();
                this.speed = 5;
                this.playAnimation(this.IMAGES_ATTACK);
                clearTimeout(this.walk);
            }, 200)
        }
    }

}