class Chicken extends MovableObject {
    y = 360;
    height = 50;
    width = 70;

    offset = {
        top: 2,
        left: 2,
        right: 2,
        bottom: 2
    }

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 2500; // Zahl zwischen 200 und 700 
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.chickenMoveLeft();        
    }

    chickenMoveLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
}