import AllyPlayer from './ally.js';
import Enemy from './enemy.js';
import Object from './Object.js';

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 1000;

let cnvWidth = canvas.width;
let cnvHeight = canvas.height;

let playerBullets = [];
let Enemies = [];
let Obstacles = []
let score = 45;

let p = new AllyPlayer(cnvWidth / 2, cnvHeight - 100, 100, 50);


function draw() {
    context.clearRect(0, 0, cnvWidth, cnvHeight);
    DrawPlayer();
    if (score < 50) {
        GenerateEnemies();
        DrawEnemies();
    }
    DrawObstacles()
    if (playerBullets.length) {
        bulletDraw();
    }
    ObstacleDetection()
    bulletDetection();
    DrawScore()
    window.requestAnimationFrame(draw);
}

function DrawScore() {
    context.fillStyle = 'black';
    context.font = '48px sans-serif';

    context.fillText(score.toString(), cnvWidth - 50, 100);

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

// Obstacles

function GenerateObstacles() {
    let obstacleCount = 3
    for (let i = 0; i < obstacleCount; i++) {
        let xPos = Math.random() * ((cnvWidth - 100) - (cnvWidth - 900)) + (cnvWidth - 900)
        let yPos = Math.random() * ((cnvHeight - 200) - (cnvHeight - 750)) + (cnvHeight - 750)
        console.log(xPos, yPos)
        let obstacle = new Object(xPos, yPos, 100, 50)
        Obstacles.push(obstacle)
    }
}

function DrawObstacles() {
    context.fillStyle = 'blue';
    for (let i = 0; i < Obstacles.length; i++) {
        context.fillRect(
            Obstacles[i].positionX,
            Obstacles[i].positionY,
            Obstacles[i].width,
            Obstacles[i].height
        );
    }
}

// enemy

function GenerateEnemies() {
    let enemiesCount = 8 - Enemies.length;
    for (let i = 0; i < enemiesCount; i++) {
        let e = new Enemy(Math.random() * cnvWidth, 0, 100, 100, Math.random());
        Enemies.push(e);
    }
}

function DrawEnemies() {
    context.fillStyle = 'red';
    for (let i = 0; i < Enemies.length; i++) {
        context.fillRect(
            Enemies[i].positionX,
            Enemies[i].positionY,
            Enemies[i].width,
            Enemies[i].height
        );
        Enemies[i].fallDown();
        if (Enemies[i].positionY >= cnvHeight) {
            Enemies.splice(i, 1);
        }
    }
}



// Collision Detection

// bullets Detection

function bulletDetection() {
    for (let i = 0; i < playerBullets.length; i++) {
        if (playerBullets[i].isPlayer) {
            let pBullet = playerBullets[i];
            for (let j = 0; j < Enemies.length; j++) {
                let e = Enemies[j];
                if (
                    pBullet.x + pBullet.width / 2 >= e.positionX - e.width / 2 &&
                    pBullet.x - pBullet.width / 2 <= e.positionX + e.width / 2 &&
                    pBullet.y >= e.positionY - e.height * 2 &&
                    pBullet.y <= e.positionY + e.height
                ) {
                    score++;
                    Enemies.splice(j, 1);
                    playerBullets.splice(i, 1);
                }
            }
        }
    }
}



// Obstacles Detection

function ObstacleDetection() {
    for (let i = 0; i < Obstacles.length; i++) {
        let obstacle = Obstacles[i];
        for (let j = 0; j < Enemies.length; j++) {
            let e = Enemies[j];
            if (
                obstacle.positionX + obstacle.width / 2 >= e.positionX - e.width / 2 &&
                obstacle.positionX - obstacle.width / 2 <= e.positionX + e.width / 2 &&
                obstacle.positionY >= e.positionY - e.height * 2 &&
                obstacle.positionY <= e.positionY + e.height
            ) {
                Enemies.splice(j, 1);
            }
        }
        for (let j = 0; j < playerBullets.length; j++) {
            let pBullet = playerBullets[j];
            if (
                obstacle.positionX + obstacle.width / 2 >= pBullet.x - pBullet.width / 2 &&
                obstacle.positionX - obstacle.width / 2 <= pBullet.x + pBullet.width / 2 &&
                obstacle.positionY >= pBullet.y - pBullet.height * 2 &&
                obstacle.positionY <= pBullet.y + pBullet.height
            ) {
                playerBullets.splice(j, 1);
            }
        }
    }
}

GenerateObstacles()
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
    if ((e.keyCode == 32 || e.keyCode == 13) && playerBullets.length < 15) {
        playerBullets.push(p.shoot());
    }
});