h = 600;
w = document.getElementById("pong-container").offsetWidth;
fps = 60;

function setup() {
  createCanvas(w, h);
  background(51);
  frameRate(fps);
  ball = new Ball();
  paddleMe = new Paddle(0);
  paddleAi = new Paddle(w);
}

function draw() {
  background(51);
  ball.draw();
  paddleMe.draw();
  paddleAi.draw();

  collision(ball, paddleMe);
  collision(ball, paddleAi);

  ball.move();
  paddleMe.move();
  paddleAi.followBall(ball);
}

function collision(ball, paddle) {
  var ballLeft = ball.x;
  var ballRight = ball.x + ball.ballWidth;
  var ballTop = ball.y;
  var ballBottom = ball.y + ball.ballWidth;

  var paddleRight = paddle.x + ball.ballWidth/2;
  var paddleLeft = paddle.x + paddle.paddleWidth + ball.ballWidth/2;
  var paddleTop = paddle.y;
  var paddleBottom = paddle.y + paddle.h;

  if (ballLeft <= paddleLeft && ballRight >= paddleRight){
    if (ballTop <= paddleBottom && ballBottom >= paddleTop) {
      console.log('BUMP ' + ball.x);
      ball.bump();
    }
  }
}

function Ball() {
  this.x = w/2;
  this.y = h/2;
  this.vx = -6;
  this.vy = -6;
  this.ballWidth = 30;

  this.draw = () => {
    fill(255);
    ellipse(this.x, this.y, this.ballWidth);
  }

  this.move = () => {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.ballWidth / 2 > w || this.x - this.ballWidth / 2 < 0) {
      this.vx = -this.vx
    }

    if (this.y + this.ballWidth / 2 > h || this.y - this.ballWidth / 2 < 0) {
      this.vy = -this.vy
    }
  }

  this.bump = () => {
    this.vx = -this.vx;

    if (this.x + this.ballWidth / 2 > w || this.x - this.ballWidth / 2 < 0) {
      this.vx = -this.vx
    }
  }
}

function Paddle(x) {
  this.h = 100;
  this.paddleWidth = 15;
  this.x = x == 0 ? 0 : x - this.paddleWidth - 1;
  this.y = (h / 2) - this.h / 2

  this.draw = () => {
    fill(255);
    rect(this.x, this.y, this.paddleWidth, this.h);
  }

  this.move = () => {
    if (keyIsDown(UP_ARROW)) {
      if (this.y > 0 ){
        this.y -= 10;
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      if (this.y + this.h < (h - 5)) {
        this.y += 10;
      }
    }
  }

  this.followBall = (ball) => {
    ball_location = ball.y - ball.ballWidth / 2;
    if (this.y < ball_location) {
      this.y += 5;
    } else if (this.y > ball_location) {
      this.y -= 5;
    }
  }
}
