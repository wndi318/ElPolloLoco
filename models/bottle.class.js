class Bottle extends MovableObject {
    y = 360;
    height = 65;
    width = 55;

    offset = {
        top: 10,
        left: 42,
        right: 35,
        bottom: 10
    }

    IMAGE_BOTTLES_ON_GROUND = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        let randomIndex = Math.random() < 0.5 ? 0 : 1;
        super().loadImage(this.IMAGE_BOTTLES_ON_GROUND[randomIndex]);
        this.x = 200 + Math.random() * 3500;
    }
}