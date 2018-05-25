var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

// Adiciona um ponto de controle na tela.
document.addEventListener("click", e => {
    insertPoint({
        x: e.offsetX,
        y: e.offsetY
    });
    draw();

    bezierPoints = [];
});

document.addEventListener("mousedown", e => {
    move = checkProximity({
        x: e.offsetX,
        y: e.offsetY
    });
});

document.addEventListener("mousemove", e => {
    if(move !== false) {
        controlPoints[move] = {
            x: e.offsetX,
            y: e.offsetY
        };
        draw();
    }
});

document.addEventListener("mouseup", e => {
    move = false;
});

document.addEventListener("contextmenu", e => {
    e.preventDefault();

    removePoint({
        x: e.offsetX,
        y: e.offsetY
    });
    draw();

    bezierPoints = [];
});

document.addEventListener("keypress", e => {
    let key = e.which || e.keyCode;
    if (key === 13) { // Pressionou Enter.
        for(let i = 0; i <= 1; i += 0.01) {
            bezierPoints.push(bezierPoint(i));
        }
        drawCurve();
    }
});

function drawCurve() {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(bezierPoints[0].x, bezierPoints[0].y);

    for (i = 1; i < bezierPoints.length - 2; i ++) {
        var xc = (bezierPoints[i].x + bezierPoints[i + 1].x) / 2;
        var yc = (bezierPoints[i].y + bezierPoints[i + 1].y) / 2;
        ctx.quadraticCurveTo(bezierPoints[i].x, bezierPoints[i].y, xc, yc);
    }
    ctx.quadraticCurveTo(bezierPoints[i].x, bezierPoints[i].y, bezierPoints[i+1].x,bezierPoints[i+1].y);
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "white";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;

    for(i = 0; i < controlPoints.length; i++) {
        ctx.beginPath();
        ctx.arc(controlPoints[i].x, controlPoints[i].y, radius, 0, 2 * Math.PI);
        if(i < controlPoints.length - 1) 
            drawLine(controlPoints[i].x, controlPoints[i + 1].x, controlPoints[i].y, controlPoints[i + 1].y);
        ctx.stroke();
        ctx.fill();
    }   
}

function drawLine(initialX, finalX, initialY, finalY) {
    ctx.moveTo(initialX, initialY);
    ctx.lineTo(finalX, finalY);
}