import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let radius = 50; // Rayon initial
let isDoubleSize = false; // Indicateur de taille normale ou double

let x = radius;
let y = radius;
let xMouse: number;
let yMouse: number;

export function blackScreen() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}

export function whiteScreen() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
}

// function to create purple dots with coordinates x and y
function purpleDots(x: number, y: number): { x: number, y: number } {
    ctx.fillStyle = "#9370DB";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    return { x, y };
}

// function to create pink dots with coordinates x and y
function pinkDots(x: number, y: number): { x: number, y: number } {
    ctx.fillStyle = "#ff69B4";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    return { x, y };
}

function heartShape(){
    /*x = width / 2;
    y = height / 6;

    ctx.beginPath();
    let topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(x, y, 
                          x - width / 2, y, 
                          x - width / 2, y + topCurveHeight
     );
    
    // bottom left curve
    ctx.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, 
                          x, y + (height + topCurveHeight) / 2, 
                          x, y + height
     );
    
    // bottom right curve
    ctx.bezierCurveTo(x, y + (height + topCurveHeight) / 2, 
                          x + width / 2, y + (height + topCurveHeight) / 2, 
                          x + width / 2, y + topCurveHeight
     );
    
    // top right curve
    ctx.bezierCurveTo(x + width / 2, y, 
                          x, y, 
                          x, y + topCurveHeight
     );
    
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();*/
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fillStyle = "red";
    ctx.fill();
}

function calculateSpeed(x1: number, y1: number, x2: number, y2: number, desiredSpeed: number): { dx: number, dy: number } {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const ratio = desiredSpeed / distance;
    return { dx: dx * ratio, dy: dy * ratio };
}

heartShape();/*
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

    purpleDots(x, radius);
    purpleDots(width -x, height - radius);
    purpleDots((width - radius), y);
    purpleDots(radius, height - y);

    if (isDoubleSize) {
        whiteScreen();
        radius = 200; // Taille doublée
        heartShape();
        //whiteScreen();
    } else {
        radius = 50; // Taille normale
    }

    pinkDots(xMouse, yMouse);

    requestAnimationFrame(animateOne);
}*/

addEventListener("mousemove", (e) => {
    xMouse = e.clientX;
    yMouse = e.clientY;
 });

 addEventListener("mousedown", (e) => {
    isDoubleSize = !isDoubleSize; // Inverser l'état de la taille
 });
/*
 animateOne();*/