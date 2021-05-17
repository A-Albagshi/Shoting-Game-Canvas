import Object from './Object.js';

export default class Enemy extends Object {
    speed;
    constructor(positionX, positionY, width, height, speed) {
        super(positionX - 50, positionY, width, height)
        this.speed = speed;
    }

    fallDown() {
        this.positionY += 3 * this.speed + 1;
    }
}