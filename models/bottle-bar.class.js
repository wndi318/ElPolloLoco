/**
 * Represents the statusbar of bottles.
 */
class BottleBar extends StatusBar {
    /**
     * Array of image paths representing different percentage levels of the status bar.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Creates an instance of BottleBar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.setPercentage(0);
    }
}
