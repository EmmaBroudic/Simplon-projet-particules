import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let animationDelay = 1000;
let centerX = width / 2;
let centerY = height / 2;
let radius = 200; // Ajustez le rayon du cercle
let angle = 0;
let w1 = 27;
let x1 = 12;
let y1 = 1.04;
let z1 = 1.09;

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

    return res;
}

export function randomColorDots(a: number, b: number): { w: number, x: number; y: number, z: number } {
    ctx.fillStyle = getRandomHexColor();
    ctx.beginPath();

    // Calculez les nouvelles coordonnées en utilisant l'angle et le rayon
    const w = centerY + radius * Math.cos(angle);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const z = centerX + radius * Math.sin(angle);

    ctx.arc(a, b, 50, 0, Math.PI * 2);
    ctx.fill();

    // Incrémentez l'angle pour faire tourner l'objet autour du cercle
    angle += 0.01;

    return { w, x, y, z };
}

function animate() {
    blackScreen();
    
    const dotPosition1 = randomColorDots(w1, x1);
    w1 = dotPosition1.x;
    x1 = dotPosition1.y;

    randomColorDots(y1, z1);
    y1 = dotPosition1.y;
    z1 = dotPosition1.x;

    randomColorDots(y1, x1);
    y1 = dotPosition1.z;
    z1 = dotPosition1.w;

    randomColorDots(w1, z1);
    w1 = dotPosition1.w;
    z1 = dotPosition1.z;

    setTimeout(animate, animationDelay);
}

blackScreen();


addEventListener("mousemove", (e) => {
    animationDelay = 100000000000;
    e.clientX;
    e.clientY;
    animate();
 });