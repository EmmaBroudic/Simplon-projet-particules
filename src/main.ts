import "./style.css";

// declare constants
// declare constants to draw a virtual canvas the size of the screen
const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// declare an array to store points coordinates
const coordinatesArray: { x: number, y: number }[] = [];

// declare variables
// declare a radius and coordinates
let radius = 25;
let x = radius;
let y = radius;

// declare an opacityvalue and a boolean value used with function updateOpacityDot()
let opacityDot = 0.1;
let increasing = true;

// declare a boolean value and variables used with addEventListener
let isDoubleSize = false;
let xMouse: number;
let yMouse: number;

let heartSize = 3;

// colored screen functions

function blackScreen() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}
/*
function palePinkScreen() {
    ctx.fillStyle = "#f5dad8";
    ctx.fillRect(0, 0, width, height);
}*/

function gradientColorsScreen() {
    // Create a radial gradient from the top left corner (0, 0) to the bottom right corner (width, height)
    let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.sqrt(width * width + height * height));
    
    gradient.addColorStop(0, "#EEC4C9");     // Start
    gradient.addColorStop(0.5, "#E09197");   // Middle
    gradient.addColorStop(1, "#F9429E");     // End

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

// Functions to create shapes

// Create dots
// Function to create purple dots with coordinates x and y
function purpleDots(x: number, y: number): { x: number, y: number } {
    ctx.fillStyle = "#9370DB";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    return { x, y };
}

// Function to create pink dots with coordinates x and y
function pinkDots(x: number, y: number): { x: number, y: number } {
    ctx.fillStyle = "#FF69B4";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    return { x, y };
}

// Function to create a red heart shape
function heartShape() {
    // Calculate coordinates of middle of the screen
    const centerX = width / 2;
    const centerY = height / 2;

    // declare constants values
   let { valueOne, valueTwo, valueThree, valueFour, valueFive, valueSix, valueSeven, valueEight } = {
        valueOne: 30 * heartSize,
        valueTwo: 40 * heartSize,
        valueThree: 15 * heartSize,
        valueFour: 70 * heartSize,
        valueFive: 45 * heartSize,
        valueSix: 75 * heartSize,
        valueSeven: 80 * heartSize,
        valueEight: 20 * heartSize,
    };

    // draw heart shape
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - valueOne);
    //console.log(centerX, centerY - valueTwo, centerX - valueThree, centerY - valueFour, centerX - valueFive, centerY - valueFour);
    ctx.bezierCurveTo(centerX, centerY - valueTwo, centerX - valueThree, centerY - valueFour, centerX - valueFive, centerY - valueFour); // Ajustez les coordonnées en fonction du centre
    ctx.bezierCurveTo(centerX - valueSix, centerY - valueFour, centerX - valueSix, centerY - valueTwo, centerX - valueSix, centerY - valueTwo);
    ctx.bezierCurveTo(centerX - valueSix, centerY + valueEight, centerX, centerY + valueSeven, centerX, centerY + valueSeven);
    ctx.bezierCurveTo(centerX, centerY + valueSeven, centerX + valueSix, centerY + valueEight, centerX + valueSix, centerY - valueTwo);
    ctx.bezierCurveTo(centerX + valueSix, centerY -valueTwo, centerX + valueSix, centerY - valueFour, centerX + valueFive, centerY - valueFour);
    ctx.bezierCurveTo(centerX + valueThree, centerY - valueFour, centerX, centerY - valueTwo, centerX, centerY - valueOne);
    ctx.fillStyle = "red";
    ctx.fill();
}


// Function to modify opacity
function updateOpacityDot() {
    if (increasing) {
        opacityDot += 0.05;
        if (opacityDot >= 1) {
            increasing = false;
        }
    } else {
        opacityDot -= 0.05;
        if (opacityDot <= 0) {
            increasing = true;
        }
    }
}

// Call the opacity update function at regular intervals
setInterval(updateOpacityDot, 1000);

// Create a function that generates random coordinates
function getRandomCoordinates() {
    // randomly generate x coordinates
    let minX = Math.ceil(0);
    let maxX = Math.floor(width);
    let randomNumberX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    // randomly generate y coordinates
    let minY = Math.ceil(0);
    let maxY = Math.floor(height);
    let randomNumberY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    // return coordinates
    return { randomNumberX, randomNumberY };
}

// create a function in order to adapt speed to distance
function calculateSpeed(x1: number, y1: number, x2: number, y2: number, desiredSpeed: number): { dx: number, dy: number } {
    // distance coordinates x
    const dx = x2 - x1;
    // distance coordinates y
    const dy = y2 - y1;
    // distance bewteen dots
    const distance = Math.sqrt(dx * dx + dy * dy);
    // ratio between desiredSpeed and distance
    const ratio = desiredSpeed / distance;
    // return adapted speed
    return { dx: dx * ratio, dy: dy * ratio };
}

// create a function to animate elements
function animateOne() {
    blackScreen();

    // arrival dots coordinates
    const desiredX = width - radius;
    const desiredY = height - radius;
    
    // adapted speed
    const { dx: speedX, dy: speedY } = calculateSpeed(x, y, desiredX, desiredY, 2);

    // increasing value of moving dots coordinates
    x += speedX * 1.5;
    y += speedY * 1.5;
    
    // change opacity of the dots
    ctx.globalAlpha = opacityDot;

    // if value of coordinate x is superior to the width of the screen -> change the value of x
    if (x > width - radius) {
        x = radius;
    }

    // if value of coordinate y is superior to the width of the screen -> change the value of y
    if (y > height - radius) {
        y = radius;
    }
    
    // call function purpleDots and place them at the right positions (in the four corners of the screen)
    purpleDots(x, radius);
    purpleDots(width -x, height - radius);
    purpleDots((width - radius), y);
    purpleDots(radius, height - y);

    const previousGlobalAlpha = ctx.globalAlpha;
    
    // a condition triggered by a mouse click
    if (isDoubleSize) {

        // change radius of dots
        radius = 50;
        // opacity to max
        ctx.globalAlpha = 1;

        gradientColorsScreen();                
        
        // generate randomCoordinates and push them in an array
        const coordinates = getRandomCoordinates();
        coordinatesArray.push(coordinates);

        // call pink dots with random coordinates
        //if (coordinatesArray.length <= 1000) {
            for (const coordinates of coordinatesArray) {
                pinkDots(coordinates.randomNumberX, coordinates.randomNumberY);
                ctx.globalAlpha = previousGlobalAlpha;
            }
        //}


        heartSize += 0.05;

        if (heartSize > 4) {
            heartSize = 1;
        }

        heartShape();

    } else {
        radius = 25;
    }

    ctx.globalAlpha = previousGlobalAlpha;
    //create a pink dots that follow mouse cursor
    pinkDots(xMouse, yMouse);
    
    requestAnimationFrame(animateOne);
}

// link mouse cursor coordinates to variables xMouse and yMouse
addEventListener("mousemove", (e) => {
    xMouse = e.clientX;
    yMouse = e.clientY;

 });

 // call the condition isDoubleSize
 addEventListener("mousedown", (e) => {
    isDoubleSize = !isDoubleSize;
 });

 // call function animate
 animateOne();