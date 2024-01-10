var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
// ball radius
let ballRadius = 10;
// ball initial location
let x = 200;
let y = 200;
// ball direction
let dx = 1;
let dy = 1;
// paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
  } else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095AA";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if (r == 0)
          ctx.fillStyle = "#FF0000";
        else if (r == 1)
          ctx.fillStyle = "#FFA500";
          else if (r == 2)
          ctx.fillStyle = "#FFFF00";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status == 1 && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
        dy = -dy;
        b.status = 0;
      }
    }
  }
}
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw graphics
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // if paddle hits the ball, make it bounce away
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      // else, ball has hit the floor
      alert("GAME OVER");
      clearInterval(interval);
    }
  }
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // increment paddle position
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth;
    }
  }
  if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0){
      paddleX = 0;
  }
  }
  // increment the balls position
  x = x + dx;
  y = y + dy;
}
const interval = setInterval(draw, 10);
