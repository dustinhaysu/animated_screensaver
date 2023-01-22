// link to instructions
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
//Mayanwolfe 06 let's build an animated screensaver
//the practical application of objects, classes, and constructors


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
    // to test go live and open console
    //input: const testBall = new Ball(50, 100, 4, 4, 'blue', 10)
    // input: console.log(testBall)
    // input: testBall.draw() - a ball will appear in screen if everything is correct

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

// method creates a strobe effect whenever balls run into each other the math is complicated and not necessary for the program to run. could be used to adjust ball size among other things. 

//     collisionDetect(){
//         for (const ball of balls) {
//             if (!(this === ball)) {
//                 const dx = this.x - ball.x
//                 const dy = this.y - ball.y
//                 const distance = Math.sqrt(dx * dx + dy * dy)

//                 if (distance < this.size + ball.size) {
//                     ball.color = this.ball = randomRGB()
//                 }
//             }
//         }
//     }
 }

// create an array called balls
const balls = []

// have a certain number of balls on the screen 
while (balls.length < 200) {
    // variable for size
    const size = random(50, 100);
    const ball = new Ball(//we are assigning values to all the constructors of class Ball
        random(0 + size, width - size), //x-coordinate-start point, keeps ball from forming off screen
        random(0 + size, height - size), // y coordinate -start point, keeps ball from forming off screen
        random(1,4),//starter velocity-x
        random(1,4),//starter velocity-y
        randomRGB(), // assign color
        size
    )
    balls.push(ball)//add new ball to end of balls array
}

//function that loops the animation
function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.09)'//#1
    ctx.fillRect(0,0, width, height) //#2
    for (const ball of balls) {
        ball.draw()
        ball.update()
        //ball.collisionDetect()
    }

    requestAnimationFrame(loop) // recursion - creates endless animation // requestAnimationFrame() is a built in function
    
    
    
    // #1 wiping the screen by covering the previous frame fillStyle - see mdn
   // disabling this will cause trails instead of balls
   
    // #2portion of the screen to be filled with ctx.fillStyle    
}

// initialize the function
loop();