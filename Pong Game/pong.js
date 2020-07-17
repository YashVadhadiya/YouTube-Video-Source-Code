alert("Random colours!");

let ball;

let paddle;

let paddle2;

let score = 0;

let score2 = 0;

let fps;

let particles = [];

function setup(){

    createCanvas(windowWidth, windowHeight);

    ball = new Ball(width/2, height/2, 40, 5, 5);

    paddle = new Paddle(width/2, height-50, 100, 5);

    paddle2 = new Paddle(width/2, 50, 100, 5);

    score = 0;

    score2 = 0;

    setInterval(function(){

        particles.splice(0, 1);

    }, 100);

}

class Ball{

    constructor(x, y, d, xs, ys){

        this.x = x;

        this.y = y;

        this.d = d;

        this.xs = xs;

        this.ys = ys;

        this.r = random(255);

        this.g = random(255);

        this.b = random(255);

        

    }

    show(){

        //stroke(this.r-50, this.g-50, this.b-50);

        fill(this.r, this.g, this.b);

        ellipse(this.x, this.y, this.d);

        this.x += this.xs;

        this.y += this.ys;

        if(this.y + this.d/2 >= height || this.y - this.d/2 <= 0){

            alert("Game over. Score was " + score + ":" + score2 + ". Retry?");

            setup();

        }

        if(this.x + this.d/2 >= width || this.x - this.d/2 <= 0){

            this.xs *= -1;

            for(let i = 0;i<5;i++){

            particles.push(new Particle(ball.x, ball.y, random(-5, 5), random(-5, 5)));

        }

        } 

        

        

    }

}

class Paddle{

    constructor(x, y, w, h){

        this.x = x;

        this.y = y;

        this.w = w;

        this.h = h;

        this.r = random(255);

        this.g = random(255);

        this.b = random(255);

    }

    show(){

        fill(this.r, this.g, this.b);

        stroke(this.r, this.g, this.b);

        rect(this.x, this.y, this.w, this.h);

        this.x = mouseX-this.w/2;

    }

}

class Particle{

    constructor(x, y, xs, ys){

        this.x = x;

        this.y = y;

        this.d = random(3, 7);

        this.xs = xs;

        this.ys = ys;

    }

    show(){

        ellipse(this.x, this.y, this.d);

        this.x += this.xs;

        this.y += this.ys;

        

    }

}

function draw(){

    background(50, 50);

    stroke(0);

    fill(255);

    fps = "fps: " + floor(frameRate());

    textSize(10);

    text(fps, 10, 20);

    textSize(20);

    text(floor(score), width/2, height/2+50);

    text(floor(score2), width/2, height/2-50);

    noStroke();

    ball.show();

    for(let i = 0;i<particles.length;i++){

        particles[i].show();

    }

    paddle.show();

    paddle2.show();

    paddle2.x = ball.x-paddle2.w/2;

    if(collideRectCircle(paddle.x, paddle.y, paddle.w, paddle.h, ball.x, ball.y, ball.d)){

        ball.ys *= -1;

        for(let i = 0;i<10;i++){

            particles.push(new Particle(ball.x, ball.y, random(-5, 5), random(-5, 5)));

        }

        score += 1;

    }

    if(collideRectCircle(paddle2.x, paddle2.y, paddle2.w, paddle2.h, ball.x, ball.y, ball.d)){

        ball.ys *= -1;

        for(let i = 0;i<10;i++){

            particles.push(new Particle(ball.x, ball.y, random(-5, 5), random(-5, 5)));

        }

        score2 += 1;

    }

}