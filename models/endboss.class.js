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

    constructor (x) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.animate();
        this.speed = 0.05
    }

    animate() {
        if (!this.endbossArea) {
            this.alert();
        }
    }
 
    alert() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 150);
    }
    
    walking() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 300);

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}