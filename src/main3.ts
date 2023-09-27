import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;

const ctx = canvas.getContext("2d")!;

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// coordonnées pour placer les points aux quatre coins de l'écran
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

export function randomColorDots(a: number, b: number): { x: number; y: number } {
    ctx.fillStyle = getRandomHexColor();
    console.log(ctx.fillStyle);
    ctx.beginPath();
    ctx.arc(width / a, height / b, 50, 0, Math.PI * 2);
    ctx.fill();
    return { x: width / a, y: height / b };
}

export function pinkDots(a: number, b: number): { x: number; y: number } {
    ctx.fillStyle = "#ff69B4";
    ctx.beginPath();
    ctx.arc(width / a, height / b, 50, 0, Math.PI * 2);
    ctx.fill();
    return { x: width / a, y: height / b };
}


export function moveObject(object: { x: number; y: number }, target: { x: number; y: number }, speed: number): boolean {
    const distanceX = target.x - object.x;
    const distanceY = target.y - object.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance <= speed) {
        object.x = target.x;
        object.y = target.y;
        return true;
    } else {
        const ratio = speed / distance;
        object.x += distanceX * ratio;
        object.y += distanceY * ratio;
        return false;
    }
}

/*
export function loop() {
    //ctx.fillStyle = "#000000";
    //ctx.fillRect(0, 0, width, height);
    //ctx.clearRect(0, 0, 500, 500);
    blackScreen();

    // Obtenez les coordonnées actuelles des points roses
    let dot1 = pinkDots(y, x);
    let dot2 = pinkDots(w, z);
    //console.log(dot1);
    //console.log(dot2)

    // Déplacez les points roses vers de nouvelles coordonnées de destination
    if (!moveObject(dot1, { x: 10, y: 10 }, 2)) {
         // Mettez à jour les coordonnées X du premier point rose
        //x = dot1.x;
        //y = dot1.y;
        console.log("Dot1 is moving with speed 2");
        for (let i = 0; i < x; i++) {
            x += 0.01; // Augmentez la position X de manière plus lente
            y -= 0.01; // Diminuez la position Y de manière plus lente
        }
        setTimeout(loop, 100000); // Vous pouvez ajuster le délai en millisecondes ici
        
    }

    if (!moveObject(dot2, { x: 5, y: 5 }, 1)) {
        x = dot2.y;
        y = dot2.x;
        console.log(x);
        console.log(y);
        setTimeout(loop, 100);
    }
}

loop();
*/


export function loop() {
    blackScreen();

    const destinationX = 0;
    const destinationY = 0;

    //pinkDots(3, 2);
    randomColorDots(2, 2);
    let dot1 = pinkDots(w1, x1);
    let dot2 = pinkDots(y1, z1);
    let dot3 = randomColorDots(y1, x1);
    let dot4 = randomColorDots(w1, z1);

    // Déplacez le premier point rose
    if (!moveObject(dot1, { x: destinationX, y: destinationY }, 2)) {
        console.log("Dot1 is moving with speed 2");
        x1 = 2;
        y1 = 2;
    }

    // Déplacez le deuxième point rose
    if (!moveObject(dot2, { x: destinationY, y: destinationX }, 1)) {
        console.log("Dot2 is moving with speed 1");
        w1 = dot2.x;
        z1 = dot2.y;
    }

    if (!moveObject(dot3, { x: destinationX, y: destinationY }, 1)) {
        console.log("Dot3 is moving with speed 1");
        w1 = dot3.x;
        z1 = dot3.y;
    }

    if (!moveObject(dot4, { x: destinationY, y: destinationX }, 1)) {
        console.log("Dot4 is moving with speed 1");
        w1 = dot4.x;
        z1 = dot4.y;
    }

    setTimeout(loop, 1000);
}

loop();