import Bullet from './Bullet.js';
import Object from './Object.js';

export default class Ally extends Object {
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