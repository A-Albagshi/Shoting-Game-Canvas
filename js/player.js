import Bullet from './Bullet.js';

export default class Player {
    positionX;
    positionY;
    width;
    height;
    isAlive;
    constructor(positionX, positionY, width, height) {
        this.positionX = positionX
        this.positionY = positionY
        this.width = width;
        this.height = height;
        this.isAlive = true;
    }
    moveRight() {
        this.positionX += 15;
    }
    moveLeft() {
        this.positionX -= 15;
    }
    shoot() {
        return new Bullet(this.positionX, this.positionY)
    }
}