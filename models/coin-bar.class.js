/**
 * Represents a status bar for the collected coins.
 */
class CoinBar extends StatusBar {
    /**
     * Array of image paths representing different percentage levels of the status bar.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Creates an instance of CoinBar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 240;
        this.setPercentage(0);
    }
}
