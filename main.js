// set up our canvas
//gives access to the drawing properties

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//innerWidth refers to the viewport
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    return Math.floor(Math.random()  * (max - min + 1)) + min;
}

// function to generate a random RGB color

function randomRGB() {
    return `rgb(${random(0,255)}, ${random(0, 225)}, ${random(0, 255)})`
}

// build a constructor object using a class

class Ball {
    //builds the ball
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    //draw the object

    draw(){
        ctx.beginPath(); //start drawing shape
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    //when the ball is hitting the side of the screen it bounces and changes direction and speed
    update(){
        if((this.x + this.size) >= width  /*if hits right of screen*/) {
            this.velX = -(this.velX)
        }

        if((this.x - this.size) <= 0/*if hits right of screen*/){
            this.velX = -(this.velX)
        }
        //if hits top of screen
        if((this.y +this.size)>= height) {
            this.velY = -(this.velY)
        }
        //if hits bottom of screen
        if((this.y - this.size) <= 0 ) {
            this.velY = -(this.velY);
        }

        //move the ball redraws location of ball at x or y and  by velX or velY
        this.x += this.velX;
        this.y += this.velY; 
    }
}

// create an array called balls
const balls = []

// have a certain number of balls on the screen 
while (balls.length < 10) {
    // variable for size
    const size = random(10, 20);
    const ball = new Ball(//we are assigning values to all the constructors of class Ball
        random(0 + size, width - size), //x-coordinate-start point, keeps ball from forming off screen
        random(0 + size, height - size), // y coordinate -start point, keeps ball from forming off screen
        random(1,4),//starter velocity-x
        random(1,4),//starter velocity-y
        randomRGB(), // assign color

    )
    balls.push(ball)//add new ball to end of balls array
}

//function that loops the animation
function loop() {
    for (const ball of balls) {
        ball.draw()
        ball.update()
    }

    requestAnimationFrame(loop) // recursion - creates endless animation
}

// initialize the function
loop();