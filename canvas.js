var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

function drawCurve() {
    getCurvePoints();

    for(j = 0; j <= 1; j++) {
        prepareContext("red", "yellow", j);

        if(bezierPoints[j].length > 0) {
            ctx.moveTo(bezierPoints[j][0].x, bezierPoints[j][0].y);

            for (i = 1; i < bezierPoints[j].length - 2; i ++) {
                var xc = (bezierPoints[j][i].x + bezierPoints[j][i + 1].x) / 2;
                var yc = (bezierPoints[j][i].y + bezierPoints[j][i + 1].y) / 2;
                ctx.quadraticCurveTo(bezierPoints[j][i].x, bezierPoints[j][i].y, xc, yc);
            }
            ctx.quadraticCurveTo(bezierPoints[j][i].x, bezierPoints[j][i].y, bezierPoints[j][i+1].x,bezierPoints[j][i+1].y);
            ctx.stroke();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    
    for(j = 0; j <= 1; j++) {
        prepareContext("white", "green", j);

        for(i = 0; i < controlPoints[j].length; i++) {
            ctx.beginPath();
            ctx.arc(controlPoints[j][i].x, controlPoints[j][i].y, radius, 0, 2 * Math.PI);
            if(i < controlPoints[j].length - 1) 
                drawLine(controlPoints[j][i].x, controlPoints[j][i + 1].x, controlPoints[j][i].y, controlPoints[j][i + 1].y);
            ctx.stroke();
            ctx.fill();
        }
    }
    drawCurve();   
}

function prepareContext(color1, color2, index) {
    ctx.beginPath();
    if(index === 0)
        ctx.strokeStyle = color1;
    else
        ctx.strokeStyle = color2;     
}

function drawLine(initialX, finalX, initialY, finalY) {
    ctx.moveTo(initialX, initialY);
    ctx.lineTo(finalX, finalY);
}

function getCurvePoints() {
    bezierPoints[curve] = [];
    for(let t = 0; t <= 1; t += 0.1) {
        bezierPoints[curve].push(bezierPoint(t));
    }
}