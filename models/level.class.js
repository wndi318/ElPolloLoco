class Level {
    enemies;
    clouds;
    backgoundObjects;
    coins;
    bottles;
    level_end_x = 4100;

    constructor(enemies, clouds, backgoundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgoundObjects = backgoundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}