class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(imageePath, x){
        super().loadImage(imageePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}