import "./style.css";


// create a first canvas
const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// create a second canvas layer for the pink dot
const canvasLayer2 = document.createElement("canvas");
canvasLayer2.width = width;
canvasLayer2.height = height;
const ctxLayer2 = canvasLayer2.getContext("2d")!;
document.body.appendChild(canvasLayer2);

// constant radius of a dot
const radius = 50;
//const colorChangeDelay = 5000;

// variables x and y, coordinates of dots
let x = radius;
let y = radius;
let xMouse = 0;
let yMouse = 0;

// function to create a black screen
export function blackScreen() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}

export function getRandomHexColor(): string {
    let res = "#";
    let string = "";
    let strings = ["A", "B", "C", "D", "E", "F", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const min = 0; 
    const max = 15;

    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * (max - min)) + min;
        string = strings[random];
        res = res + string;
    }

    console.log(res);
    return res;
}

export function randomColorDots(x: number, y: number): { x: number; y: number } {
    ctx.fillStyle = getRandomHexColor();
    console.log(ctx.fillStyle);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    return { x, y };
}

// function to create pink dots with coordinates x and y
function pinkDots(x: number, y: number): { x: number, y: number } {
    ctxLayer2.fillStyle = "#ff69B4";
    ctxLayer2.beginPath();
    ctxLayer2.arc(x, y, radius, 0, Math.PI * 2);
    ctxLayer2.fill();

    return { x, y };
}

// function to calculte the velocity of the motion
function calculateSpeed(x1: number, y1: number, x2: number, y2: number, desiredSpeed: number): { dx: number, dy: number } {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const ratio = desiredSpeed / distance;
    return { dx: dx * ratio, dy: dy * ratio };
}

// function to animate dots
function animateOne() {
    blackScreen();
    
    const desiredX = width - radius;
    const desiredY = height - radius;
    
    const { dx: speedX, dy: speedY } = calculateSpeed(x, y, desiredX, desiredY, 2);

    x += speedX * 1.5;
    y += speedY * 1.5;

    if (x > width - radius) {
        x = radius;
    }

    if (y > height - radius) {
        y = radius;
    }

    pinkDots(x, radius);
    pinkDots(width -x, height - radius);
    pinkDots((width - radius), y);
    pinkDots(radius, height - y);

    requestAnimationFrame(animateOne);
}

animateOne();

addEventListener("mousemove", (e) => {
    blackScreen();
    xMouse = e.clientX;
    console.log(e.clientX);
    yMouse = e.clientY;
    console.log(e.clientY);
    randomColorDots(xMouse, yMouse);
 });
 
