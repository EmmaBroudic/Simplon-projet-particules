import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//let animationDelay = 10;
const radius = 50;
const speed = 2;
const distance = Math.sqrt(width * width + height * height);
const ratio = speed / distance;
let x = radius;
let y = radius;

export function blackScreen() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}

/*

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

    return res;
}

export function randomColorDots(a: number, b: number): { a: number, b: number } {
    ctx.fillStyle = getRandomHexColor();
    ctx.beginPath();
    ctx.arc(width / a, height / b, 50, 0, Math.PI * 2);
    ctx.fill();
    return { a, b };
}*/

export function pinkDots(x: number, y: number): { x: number, y: number }  {
    ctx.fillStyle = "#ff69B4";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    return { x, y };
}

blackScreen();
pinkDots(x, y);

function animateOne() {
    blackScreen();
    
    x += speed;

    if (x > width - radius) {
        x = radius;
    }

    y += speed;

    if (y > height - radius) {
        y = radius;
    }

    pinkDots(x, radius);
    pinkDots(width -x, height - radius);
    pinkDots((width - radius), y);
    pinkDots(radius, height - y);

    setTimeout(animateOne, 10);
}

animateOne();
//blackScreen();

/*
addEventListener("mousemove", (e) => {
    animationDelay = 100000000000;
    e.clientX;
    e.clientY;
    animate();
 });*/