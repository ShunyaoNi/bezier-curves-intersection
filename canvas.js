var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

function drawCurve() {
    getCurvePoints();

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
    drawCurve();   
}

function drawLine(initialX, finalX, initialY, finalY) {
    ctx.moveTo(initialX, initialY);
    ctx.lineTo(finalX, finalY);
}

function getCurvePoints() {
    bezierPoints = [];
    for(let t = 0; t < 1; t += 0.01)
        bezierPoints.push(bezierPoint(t));
}