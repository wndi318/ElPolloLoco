class MiniChicken extends MovableObject {
    y = 380;
    height = 40;
    width = 40;
    deadChicken = false;

    offset = {
        top: -5,
        left: -5,
        right: -5,
        bottom: -5
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.smallChickenMoveLeft();
        this.chickenDied();
    }

    smallChickenMoveLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

    chickenDied() {
        let chickenInterval = setInterval(() => {
            if (this.deadChicken) {
                this.speed = 0;
                hitChickenSound.play();
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(chickenInterval);
            }
        }, 150);
    }
}