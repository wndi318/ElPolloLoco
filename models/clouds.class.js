class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 300;
    speed = 0.15;

    IMAGES_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ]

    constructor(x) {
        let randomIndex = Math.random() < 0.5 ? 0 : 1;
        super().loadImage(this.IMAGES_CLOUDS[randomIndex]);
        this.x = x;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            this.x -= 0.1;
            if (this.x < -this.width) {
                this.x = 720; 
            }
        }, 1000 / 60);
    }
}