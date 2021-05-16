export default class Bullet {
    x;
    y;
    width;
    height;
    isPlayer;
    constructor(shooterX, shooterY, isPlayer = true) {
        this.x = shooterX
        this.y = shooterY
        this.width = 25;
        this.height = 40;
        this.isPlayer = isPlayer;
    }
}