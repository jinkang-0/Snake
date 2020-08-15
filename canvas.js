var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

var key;
document.addEventListener("keydown", function() {
  key = window.event.keyCode;

  if (key == 37) {

    // left
    if (snake[0].xDir != 1) {
      dx = -1;
      dy = 0;
    }

  }
  if (key == 38) {

    // up
    if (snake[0].yDir != 1) {
      dx = 0;
      dy = -1;
    }

    window.event.preventDefault();

  }
  if (key == 39) {

    // right 
    if (snake[0].xDir != -1) {
      dx = 1;
      dy = 0;
    }

  }
  if (key == 40) {

    // down
    if (snake[0].yDir != -1) {
      dx = 0;
      dy = 1;
    }

    window.event.preventDefault();
    
  }
  
})

class SnakeHead {
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = 0;
    this.yDir = 0;

    this.lastX = 0;
    this.lastY = 0;
    this.lastXDir = 0;
    this.lastYDir = 0;
  }

  show() {
    c.fillStyle = "darkgreen";
    c.fillRect(this.x, this.y, scale, scale);
  }

  update() {

    this.lastX = this.x;
    this.lastY = this.y;
    this.lastXDir = this.xDir;
    this.lastYDir = this.yDir;
    
    this.xDir = dx;
    this.yDir = dy;
    this.x += this.xDir * scale;
    this.y += this.yDir * scale;

    if (snake.length > 1) snake[1].update(this.lastXDir, this.lastYDir);

    if (this.x > canvas.width - grids || this.x < 0 || this.y < 0 || this.y > canvas.height - grids) {
      setup();
    }

    for (var i = 1; i < snake.length - 1; i++) {
      if (this.x == snake[i].x && this.y == snake[i].y) {
        setup();
      }
    }
    
  }

  addTail() {
    snake.push(new SnakeBody(this.lastX, this.lastY, this.lastXDir, this.lastYDir, 1))
  }

}

class SnakeBody {
  
  constructor(x, y, xDir, yDir, index) {
    this.x = x;
    this.y = y;
    this.xDir = xDir;
    this.yDir = yDir;

    this.lastX = x;
    this.lastY = y;
    this.lastXDir = 0;
    this.lastYDir = 0;

    this.index = index;
  }

  update(xDir, yDir) {

    this.lastXDir = this.xDir;
    this.lastYDir = this.yDir;
    this.xDir = xDir;
    this.yDir = yDir;

    if (this.x + this.xDir >= 0 && this.x + this.xDir <= canvas.width - grids) {
      this.lastX = this.x;
      this.x += this.xDir * scale;
    }
    if (this.y + this.yDir >= 0 && this.y + this.yDir <= canvas.height - grids) {
      this.lastY = this.y;
      this.y += this.yDir * scale;
    }

    if (this.index < snake.length - 1) snake[this.index + 1].update(this.lastXDir, this.lastYDir);

  }

  show() {
    c.fillStyle = "green";
    c.fillRect(this.x, this.y, scale, scale);
  }

  addTail() {
    snake.push(new SnakeBody(this.lastX, this.lastY, this.lastXDir, this.lastYDir, snake.length));
  }

}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    c.beginPath();
    c.fillStyle = "red";
    c.arc(this.x + scale/2, this.y + scale/2, scale/2, 0, 360);
    c.fill();
  }

  eaten() {
    this.x = Math.floor(Math.random() * grids) * scale;
    this.y = Math.floor(Math.random() * grids) * scale;
  }
}

var grids;
var scale;

var snake = [];
var head;
var food;
var dx = 0;
var dy = 0;

function setup() {

  grids = worldSize;
  scale = 400 / grids;

  snake = [];
  head = new SnakeHead(Math.floor(grids/4) * scale, Math.floor(grids/2) * scale);
  food = new Food(Math.floor(grids*2/3) * scale, Math.floor(grids/2) * scale);
  snake.push(head);

  dx = 0;
  dy = 0;

  snake[0].show();

  resetScore();

}

setup();

function animate() {

  c.clearRect(0,0,canvas.width,canvas.height);

  if (snake[0].x % scale == 0 && snake[0].y % scale == 0) {
    snake[0].update(dx, dy); 
  }

  for (var i = 0; i < snake.length; i++) {
    snake[i].show();
    if (snake[i].x == food.x && snake[i].y == food.y) {
      food.eaten();
      if (snake[i] === snake[0]) {
        updateScore();
        snake[snake.length - 1].addTail();
      }
    }
  }

  food.show();

  if (snake.length == grids*grids) {
    winGame();
  } else {
    setTimeout(function() {
      requestAnimationFrame(animate);
    }, 1000/frameRate);
  }

}

animate();