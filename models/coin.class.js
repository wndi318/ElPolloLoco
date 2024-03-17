class Coin extends MovableObject {
    height = 110;
    width = 110;

    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    }

    IMAGES_COIN = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImage('../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 2500;
        this.y = 320 -  Math.random() * 180;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }
}