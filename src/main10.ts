/*import "./style.css";

// declarer les constantes

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const coordinatesArray: { x: number, y: number }[] = [];

// constantes coeurs fixes


// déclarer les variables
let radius = 50;
let isDoubleSize = false;
//let isNormalHeart = true;

let x = radius;
let y = radius;
let purpleOpacity = 0.1;
let increasing = true;
let xMouse: number;
let yMouse: number;

// fonctions écrans noirs et écrans roses

export function blackScreen() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}

export function palePinkScreen() {
    ctx.fillStyle = "#f5dad8";
    ctx.fillRect(0, 0, width, height);
}

export function gradientColorsScreen() {
    // Créez un dégradé radial allant du coin supérieur gauche (0, 0) au coin inférieur droit (width, height)
    let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.sqrt(width * width + height * height));
    gradient.addColorStop(0, "#EEC4C9");     // Départ
    gradient.addColorStop(0.5, "#E09197");   // Intermédiaire
    gradient.addColorStop(1, "#F9429E");     // Arrivée

    // Affectez le dégradé au remplissage
    ctx.fillStyle = gradient;

    // Remplissez le canvas avec le dégradé
    ctx.fillRect(0, 0, width, height);
}

// fonctions créations de formes

// créations de points
// function to create purple dots with coordinates x and y
export function purpleDots(x: number, y: number): { x: number, y: number } {
    ctx.fillStyle = "#9370DB";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    return { x, y };
}

// function to create pink dots with coordinates x and y
export function pinkDots(x: number, y: number): { x: number, y: number } {
    ctx.fillStyle = "#ff69B4";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    //ctx.createLinearGradient(x, y, radius, radius);
    ctx.fill();

    return { x, y };
}

export function heartShape() {
    // Calculez le centre du canvas
    const centerX = width / 2;
    const centerY = height / 2;
    const valueOne = 30;
    const valueTwo = 40;
    const valueThree = 15;
    const valueFour = 70;
    const valueFive = 45;
    const valueSix = 75;
    const valueSeven = 80;
    const valueEight = 20;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - valueOne); // Déplacez-vous au centre, en ajustant la valeur de -30 pour la hauteur
    ctx.bezierCurveTo(centerX, centerY - valueTwo, centerX - valueThree, centerY - valueFour, centerX - valueFive, centerY - valueFour); // Ajustez les coordonnées en fonction du centre
    ctx.bezierCurveTo(centerX - valueSix, centerY - valueFour, centerX - valueSix, centerY - valueTwo, centerX - valueSix, centerY - valueTwo);
    ctx.bezierCurveTo(centerX - valueSix, centerY + valueEight, centerX, centerY + valueSeven, centerX, centerY + valueSeven);
    ctx.bezierCurveTo(centerX, centerY + valueSeven, centerX + valueSix, centerY + valueEight, centerX + valueSix, centerY - valueTwo);
    ctx.bezierCurveTo(centerX + valueSix, centerY -valueTwo, centerX + valueSix, centerY - valueFour, centerX + valueFive, centerY - valueFour);
    ctx.bezierCurveTo(centerX + valueThree, centerY - valueFour, centerX, centerY - valueTwo, centerX, centerY - valueOne);
    ctx.fillStyle = "red";
    ctx.fill();
}
/*
export function biggerHeartShape() {
    // Calculez le centre du canvas
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - valueNine); // Déplacez-vous au centre, en ajustant la valeur de -60 pour la hauteur
    ctx.bezierCurveTo(centerX, centerY - valueTen, centerX - valueEleven, centerY - valueTwelve, centerX - valueThirteen, centerY - valueTwelve); // Ajustez les coordonnées en fonction du centre
    ctx.bezierCurveTo(centerX - valueFourteen, centerY - valueTwelve, centerX - valueFourteen, centerY - valueTen, centerX - valueFourteen, centerY - valueTen);
    ctx.bezierCurveTo(centerX - valueFourteen, centerY + valueSixteen, centerX, centerY + valueFifteen, centerX, centerY + valueFifteen);
    ctx.bezierCurveTo(centerX, centerY + valueFifteen, centerX + valueFourteen, centerY + valueSixteen, centerX + valueFourteen, centerY - valueTen);
    ctx.bezierCurveTo(centerX + valueFourteen, centerY - valueTen, centerX + valueFourteen, centerY - valueTwelve, centerX + valueThirteen, centerY - valueTwelve);
    ctx.bezierCurveTo(centerX + valueEleven, centerY - valueTwelve, centerX, centerY - valueTen, centerX, centerY - valueNine);
    
    ctx.fillStyle = "red";
    ctx.fill();
}*/
/*
export function growingHeart(valueA: number, valueB: number) {
    let valueC = valueA;

    if (valueC < valueB) {
        valueC += 10;
    } else {
        valueC = valueA;
    }
}*/
/*
export function updatePurpleOpacity() {
    if (increasing) {
        purpleOpacity += 0.1;
        if (purpleOpacity >= 1) {
            increasing = false;
        }
    } else {
        purpleOpacity -= 0.1;
        if (purpleOpacity <= 0) {
            increasing = true;
        }
    }
}

// Appel de la fonction de mise à jour de l'opacité à intervalles réguliers
setInterval(updatePurpleOpacity, 1000);

// Créer une fonction qui génère des coordonnées aléatoires

export function getRandomCoordinates() {
    // générer le coordonnées x de façon aléatoire
    let minX = Math.ceil(0);
    let maxX = Math.floor(width);
    let randomNumberX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    // générer le coordonnée y de façon aléatoire
    let minY = Math.ceil(0);
    let maxY = Math.floor(height);
    let randomNumberY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    // retourner les coordonnées
    return { randomNumberX, randomNumberY };
}

// calculer la vitesse de déplcament

export function calculateSpeed(x1: number, y1: number, x2: number, y2: number, desiredSpeed: number): { dx: number, dy: number } {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const ratio = desiredSpeed / distance;
    return { dx: dx * ratio, dy: dy * ratio };
}

// fonction animation
export function animateOne() {
    blackScreen();

    const desiredX = width - radius;
    const desiredY = height - radius;
    
    const { dx: speedX, dy: speedY } = calculateSpeed(x, y, desiredX, desiredY, 2);

    x += speedX * 1.5;
    y += speedY * 1.5;
    
    ctx.globalAlpha = purpleOpacity;

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
        radius = 200;
        ctx.globalAlpha = 1;
        gradientColorsScreen();                
        
        const coordinates = getRandomCoordinates();
        coordinatesArray.push(coordinates);

        if (coordinatesArray.length <= 150) {
            for (const coordinates of coordinatesArray) {
                pinkDots(coordinates.randomNumberX, coordinates.randomNumberY);
            }
        }

        heartShape();
        //biggerHeartShape();
    } else {
        radius = 50;
    }

    pinkDots(xMouse, yMouse);
    
    requestAnimationFrame(animateOne);
}

// événement souris et clic

addEventListener("mousemove", (e) => {
    xMouse = e.clientX;
    yMouse = e.clientY;

 });

 addEventListener("mousedown", (e) => {
    //appeller fonction qui va multiplier les points
    isDoubleSize = !isDoubleSize; // Inverser l'état de la taille
 });

 animateOne();*/