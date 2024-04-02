/**
 * Represents a level in the game.
 */
class Level {
    enemies;
    clouds;
    backgoundObjects;
    coins;
    bottles;
    level_end_x = 4100;

     /**
     * Creates an instance of Level.
     * @param {MovableObject[]} enemies - Array containing enemies in the level.
     * @param {Cloud[]} clouds - Array containing clouds in the level.
     * @param {BackgroundObject[]} backgoundObjects - Array containing background objects in the level.
     * @param {Coin[]} coins - Array containing coins in the level.
     * @param {Bottle[]} bottles - Array containing bottles in the level.
     */
     constructor(enemies, clouds, backgoundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgoundObjects = backgoundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}