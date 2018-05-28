var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight - 28);

var drawPoints = [true, true];
var drawPolygons = [true, true];
var drawCurves = [true, true];

var inputs = document.getElementsByClassName("iterations");

function drawCurve(j) {
    let curve = getCurvePoints(controlPoints[j], inputs[j].value);
    bezierPoints[j] = curve;
    prepareContext("red", "yellow", j);

    if(curve.length > 0) {
        ctx.moveTo(curve[0].x, curve[0].y);

        for(i = 0; i < curve.length - 1; i++)
            ctx.lineTo(curve[i + 1].x, curve[i + 1].y);
        ctx.stroke();
    }
}

function drawPolygon(j) {
    for(i = 0; i < controlPoints[j].length; i++) {
        ctx.beginPath();
        if(drawPoints[j])
            ctx.arc(controlPoints[j][i].x, controlPoints[j][i].y, radius, 0, 2 * Math.PI);
        if(i < controlPoints[j].length - 1 && drawPolygons[j]) 
            drawLine(controlPoints[j][i].x, controlPoints[j][i + 1].x, controlPoints[j][i].y, controlPoints[j][i + 1].y);
        ctx.stroke();
        ctx.fill();
    }
}

function animate() {
    requestAnimationFrame(animate);
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    
    for(j = 0; j <= 1; j++) {
        prepareContext("white", "green", j);
        drawPolygon(j);
        if(drawCurves[j])
            drawCurve(j);  
    }
    intersect(controlPoints[0], controlPoints[1]);
}

function prepareContext(color1, color2, index) {
    ctx.beginPath();
    if(index === 0)
        ctx.strokeStyle = color1;
    else
        ctx.strokeStyle = color2;     
}

function drawIntersectionPoints(x, y) {
    if(drawCurves[0] || drawCurves[1]) {
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawLine(initialX, finalX, initialY, finalY) {
    ctx.moveTo(initialX, initialY);
    ctx.lineTo(finalX, finalY);
}

function getCurvePoints(controlPoints, iterations) {
    let bezierPoints = [];
    for(let t = 0; t < 1; t += 1/iterations) {
        bezierPoints.push(deCasteljau(controlPoints, [], [], t));
    }
    bezierPoints.push(deCasteljau(controlPoints, [], [], 1));
    
    return bezierPoints;
}

animate();