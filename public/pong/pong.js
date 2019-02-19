h = 600;
w = document.getElementById("pong-container").offsetWidth;

function setup() {
  createCanvas(w, h);
  background(51);
  frameRate(60);
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
  ball.move();
  paddleMe.move();
  // paddleAi.followBall(); TODO
}

function collision(ball, paddle) {
  var ballX = ball.x;
  var ballTop = ball.y;
  var ballBottom = ball.y + ball.ballWidth;

  var paddleX = paddle.x + paddle.paddleWidth + 20;
  var paddleTop = paddle.y;
  var paddleBottom = paddle.y + paddle.h;

  if (ballX <= paddleX){ 
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

  this.draw = function(){
    fill(255);
    ellipse(this.x, this.y, this.ballWidth);
  }

  this.move = function(){
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.ballWidth / 2 > w || this.x - this.ballWidth / 2 < 0) {
      this.vx = -this.vx
    }

    if (this.y + this.ballWidth / 2 > h || this.y - this.ballWidth / 2 < 0) {
      this.vy = -this.vy
    }
  }

  this.bump = function() {
    this.vx = -this.vx;
    this.vx += 5;
    this.x += this.vx;

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

  this.draw = function() {
    fill(255);
    rect(this.x, this.y, this.paddleWidth, this.h);
  }

  this.move = function() {
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
}
