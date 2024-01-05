var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Radius
let radius = 10

// Initial location
let x = 0;
let y = 0;

// Direction
let dx = 1;
let dy = 1;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the ball
  drawBall();

  // increment the balls position
  x = x + dx;
  y = y + dy;

  if (y + dy < 0) {
    dy = -dy;
  }
}
setInterval(draw, 10);