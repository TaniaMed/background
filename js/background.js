'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function rendNum(min, max) {
    return Math.random() * (max - min) + min;
}

function integerRandomNumber(min, max) {
    return Math.round(rendNum(min, max));
}

function choiceNumberFigures() {
    return Math.round(integerRandomNumber(50, 200) / 2);
}

let nextPointCoord;
let time;

function choiceCoordinatesFigures() {
    switch (integerRandomNumber(0, 1)) {
        case 0:
            return {
                x: integerRandomNumber(0, screenWidth),
                y: integerRandomNumber(0, screenHeight),
                fun: function nextPoint(x, y, time) {
                    return {
                        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
                        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
                    }
                },
                size: rendNum(0.1, 0.6)
            }
            break;
        case 1:
            return {
                x: integerRandomNumber(0, screenWidth),
                y: integerRandomNumber(0, screenHeight),
                fun: function nextPoint(x, y, time) {
                    return {
                        x: x + Math.sin((x + (time / 10)) / 100) * 5,
                        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
                    }
                },
                size: rendNum(0.1, 0.6)
            }
    }
}

function nextPoint(x, y, time) {
    return this.funReturn;
}

let numberFigures = choiceNumberFigures();
let screenWidth = 300;
let screenHeight = 200;
let backgroundColor = 'rgba(0,111,255,214)';

ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, screenWidth, screenHeight);

let circlesAll = [];

function createСircles() {
    for (let circles = 0; circles <= numberFigures; circles++) {
        let figure = choiceCoordinatesFigures();
        circlesAll.push(figure);
    }
    return;
}

function drawCircles(x, y, size) {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, 12 * size, 0, 2 * Math.PI, false);
    ctx.lineWidth = size * 5;
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.stroke();
}

let crossesAll = [];

function createСrosses() {
    for (let crosses = 0; crosses <= numberFigures; crosses++) {
        let figure = choiceCoordinatesFigures();
        figure.size *= 20;
        figure.angle = rendNum(0, 2 * Math.PI);
        figure.speed = integerRandomNumber(-0.2, 0.2);
        crossesAll.push(figure);
    }
    return;
}

function crossRotare(crosses) {
    crosses.forEach(cross => {
        2 * Math.PI * cross.size / cross.speed;
    });

};

function drawСrosses(x, y, size) {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x + (size / 2), y - (size / 2));
    ctx.lineTo(x + (size / 2), y + (size / 2));
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = size / 4;
    ctx.stroke();
}

createСircles();
createСrosses();
render();

function changePosition(figures, funct) {
    figures.forEach((figure) => {
        let figureCoord = figure.fun(figure.x, figure.y, Date.now())

        funct(figureCoord.x, figureCoord.y, figure.size);

    });
}

function render() {
    ctx.clearRect(0, 0, 800, 400);
    ctx.fillRect(0, 0, 800, 400);
    changePosition(circlesAll, drawCircles);
    changePosition(crossesAll, drawСrosses);
    requestAnimationFrame(render);

}