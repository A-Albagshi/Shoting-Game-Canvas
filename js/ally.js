import Player from './player.js';
import Bullet from './Bullet.js';

export default class Ally extends Player {
    constructor(positionX, positionY, width, height) {
        super(positionX, positionY, width, height)
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