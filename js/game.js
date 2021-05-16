// import Ally from './player.js';
// import Bullet from './Bullet.js';
import AllyPlayer from './ally.js';
import Enemy from './enemy.js';

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 1000;

let cnvWidth = canvas.width;
let cnvHeight = canvas.height;

let playerBullets = [];
let Enemies = [];
let score = 0;

let p = new AllyPlayer(cnvWidth / 2, cnvHeight - 100, 100, 50);

function draw() {
    context.clearRect(0, 0, cnvWidth, cnvHeight);
    DrawPlayer();
    GenerateEnemies()

    DrawEnemies();

    if (playerBullets.length) {
        bulletDraw();
    }

    window.requestAnimationFrame(draw);
}

function DrawPlayer() {
    context.fillStyle = 'black';
    context.fillRect(p.positionX, p.positionY, p.width, p.height);
}

function bulletDraw() {
    for (let i = 0; i < playerBullets.length; i++) {
        context.fillStyle = 'red';
        context.fillRect(
            playerBullets[i].x + p.width / 2 - playerBullets[i].width / 2,
            playerBullets[i].y - p.height,
            playerBullets[i].width,
            playerBullets[i].height
        );
        playerBullets[i].y -= 10;
        if (playerBullets[i].y <= 0) {
            playerBullets.splice(i, 1);
        }
    }
}

// enemy
function DrawEnemies() {
    context.fillStyle = 'red';
    for (let i = 0; i < Enemies.length; i++) {
        context.fillRect(Enemies[i].positionX, Enemies[i].positionY, Enemies[i].width, Enemies[i].height)
        Enemies[i].fallDown();
        if (Enemies[i].positionY >= cnvHeight) {
            Enemies.splice(i, 1);
        }
    }
}

function GenerateEnemies() {
    let enemiesCount = 6 - Enemies.length;
    for (let i = 0; i < enemiesCount; i++) {
        let e = new Enemy(Math.random() * cnvWidth, 0, 100, 100, Math.random());
        Enemies.push(e);
    }
}


// Collision Detection

// bullets Detection

function bulletDetection() {
    for (let i = 0; i < playerBullets.length; i++) {
        if (playerBullets[i].isPlayer) {
            for (let j = 0; j < Enemies.length; j++) {
                const element = array[j];

            }
        }
    }
}



draw();

// event
document.addEventListener('keydown', (e) => {
    // left key
    if (e.keyCode == 37 && p.positionX > 0) {
        p.moveLeft();
    }
    // right
    if (e.keyCode == 39 && p.positionX + p.width < cnvWidth) {
        p.moveRight();
    }
    //space code 32  enter code 13
    if (e.keyCode == 32 || (e.keyCode == 13 && playerBullets.length < 15)) {
        playerBullets.push(p.shoot());
    }
});