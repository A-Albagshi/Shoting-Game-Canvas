import Player from './player.js';

export default class Enemy extends Player {
    speed;
    constructor(positionX, positionY, width, height, speed) {
        super(positionX, positionY, width, height)
        this.speed = speed;
    }

    fallDown() {
        this.positionY += 5 * this.speed;
    }
}