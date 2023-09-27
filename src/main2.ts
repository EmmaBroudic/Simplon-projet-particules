import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;

const ctx = canvas.getContext("2d")!;

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let w = 27;
let x = 12;
let y = 1.04;
let z = 1.09;

//let mouseX = 0;
//let mouseY = 0;

export function blackScreen() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}

//blackScreen()

export function redDots(a: number, b: number) {
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(width / a, height / b, 50, 0, Math.PI * 2);
    ctx.fill();
}

export function pinkDots(a: number, b: number) {
    ctx.fillStyle = "#ff69B4";
    ctx.beginPath();
    ctx.arc(width / a, height / b, 50, 0, Math.PI * 2);
    ctx.fill();
}

function animationOne() {
    //blackScreen();
    redDots(w, x);
    redDots(y, z);
    pinkDots(y, x);
    pinkDots(w, z);

    for (let i = 1; i < 10000; i++) {
        w -= 0.1;
        x += 0.1;
        y -= 0.1;
        z += 0.1;
        //blackScreen();
        //setTimeout(animationOne, 100);
    }
    setTimeout(animationOne, 100);
}

animationOne();

/*


function animationTwo() {
        w = 0;
        x = 1;
        y = 2;
        z = 3;
        pinkDots(w, x);
        pinkDots(y, z);
        pinkDots(y, x);
        pinkDots(w, z);
        w += 0.001;
        x += 0.1;
        y += 0.001;
        z += 0.1;
        setTimeout(animationTwo, 1000);
}

animationTwo();

/*

addEventListener("mousemove", (e) => {

   // let moveMouseX = e.clientX;
    let moveMouseY = e.clientY;
    e.stopPropagation();
    e.preventDefault();
    animationOne();

    /*
    if (moveMouseX > mouseX) {
        animationOne();
    }

    if (moveMouseY > mouseY) {
        animationOne();
    }

    moveMouseX = mouseX;
    moveMouseY = mouseY;
});*/