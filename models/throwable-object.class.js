class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    offset = {
        top: 20,
        left: 52,
        right: 45,
        bottom: 20
    }

    bottleSplash = false;

    bottleSplashSound = new Audio('../audio/bottle_splash.mp3');

    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.throw();
        this.bottleHit();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        let throwInterval =  setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
            this.x += 10;
            this.bottleHit();
        }, 25);
        setTimeout(() => {
            clearInterval(throwInterval);
        }, 1100);
    };

    bottleHit() {
        let hitInterval = setInterval(() => {
            if (this.bottleSplash || this.y >= 360) {
                this.playAnimation(this.IMAGES_SPLASH);
                this.speedY = 0;
                this.y = 370;
                if (!this.splashSoundPlayed) {
                    this.bottleSplashSound.play();
                    this.splashSoundPlayed = true;
                }
                setTimeout(() => {
                    this.x = -200;
                }, 40);
                clearInterval(hitInterval);
            }
        }, 300);
    }
    
}