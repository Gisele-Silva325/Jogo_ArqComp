var canvas = document.getElementById('mariseInvader');
var ctx = canvas.getContext('2d');
var player = new Image();
player.src = "assets/ship.png";
var playerPosX = 200;
var playerSpeed = 4;
var a = 0;
var isMovingLeft = false;
var isMovingRight = false;
var shotPosX = 185;
var shotPosY = 300;
var shotSpeed = 5;
var enemy = new Image();
enemy.src = "assets/enemy.png";
var enemySpeed = 1.7;
var enemiesPosX = [50, 333, 120, 230, 231, 180, 20, 260, 150, 100];
var enemiesPosY = [0, 17, 80, 115, 19, 14, 90, 80, 50, 15];
var score = 0;
var bg1 = new Image();
bg1.src = "assets/background.jpg";
var bg2 = new Image();
bg2.src = "assets/background.jpg";
var bg1PosY = 0;
var bg2PosY = 300;
var bgSpeed = 0.1;
var shotSound = new Audio("assets/Laser_Shoot3.wav");
var enemyDeath = new Audio("assets/Explosion2.wav");


document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37) {
    isMovingLeft = true;
  }
  if (event.keyCode == 39) {
    isMovingRight = true;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 37) {
    isMovingLeft = false;
  }
  if (event.keyCode == 39) {
    isMovingRight = false;
  }
});

document.addEventListener("keypress", function(event) {
  if (event.keyCode == 32 && shotPosY < -7) {
    shotPosX = playerPosX + 20;
    shotPosY = 250;
    shotSound.play();
  }
});

function BackgroundCircles() {
  a -= 0.1;

  ctx.fillStyle = "#55D8C1";
  ctx.beginPath();
  ctx.arc(200, 150, 50, 0, 2 * Math.PI);
  ctx.fill()

  ctx.fillStyle = "#A084CF";
  ctx.beginPath();
  ctx.arc(200, 150, 20, 0, 2 * Math.PI);
  ctx.fill()

  ctx.fillStyle = "#4B7BE5";
  ctx.beginPath();
  ctx.arc(200 + Math.cos(a) * 70, 150 + Math.sin(a) * 70, 20, 0, 2 * Math.PI);
  ctx.fill()

  ctx.fillStyle = "#4B7BE5";
  ctx.beginPath();
  ctx.arc(200 + Math.cos(a + Math.PI) * 70, 150 + Math.sin(a + Math.PI) * 70, 20, 0, 2 * Math.PI);
  ctx.fill()

  ctx.strokeStyle = "black";
  ctx.moveTo(200, 150);
  ctx.lineTo(200 + Math.cos(a) * 70, 150 + Math.sin(a) * 70);
  ctx.stroke();

}

function DesenhaJogador() {
  ctx.drawImage(player, playerPosX, 250, 40, 40);
}

function DesenhaInimigo() { 
  for (i = 0; i < enemiesPosX.length; i++) {
    enemiesPosX[i] += enemySpeed;
    let distance = Math.sqrt(Math.pow(shotPosX - enemiesPosX[i], 2) + Math.pow(shotPosY - enemiesPosY[i], 2));
    if( distance < 15 +3 ){
    enemiesPosX[i] = -100 - Math.random() * 150;
    enemiesPosY[i] = 10 + Math.random() * 140;
    shotPosY = -30;
    enemyDeath.play();
    score += 1;
    }
    if(enemiesPosX[i] > 500){
      enemiesPosX[i] = -100 - Math.random() * 150;
      enemiesPosY[i] = 10 + Math.random() * 140;
    }
    ctx.drawImage(enemy, enemiesPosX[i], enemiesPosY[i], 30, 30);
  }
}

function DesenhaTiro() {
  shotPosY -= shotSpeed;
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(shotPosX, shotPosY, 3, 0, Math.PI * 2);
  ctx.fill();
}

function DesenhaUI(){
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Score: "+ score, 250, 75);
}

function DesenhaFundo(){
bg1PosY += bgSpeed;
if(bg1PosY >= 300)
  bg1PosY -= 600;
ctx.drawImage(bg1, 0, bg1PosY, 400, 300);

bg2PosY += bgSpeed;
if(bg2PosY >= 300)
  bg2PosY -= 600;
ctx.drawImage(bg1, 0, bg2PosY, 400, 300);
}

function Desenha() {
  ctx.clearRect(0, 0, 400, 300);
  DesenhaFundo();
  if (isMovingLeft && playerPosX > 0) {
    playerPosX -= playerSpeed;
  }
  if (isMovingRight && playerPosX < canvas.width - 40) {
    playerPosX += playerSpeed;
  }

  DesenhaJogador();
  DesenhaTiro();
  DesenhaInimigo();
  DesenhaUI();
    
}

setInterval(Desenha, 1000 / 60);

