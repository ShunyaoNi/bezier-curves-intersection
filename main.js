var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

// Adiciona um ponto de controle na tela.
document.addEventListener("click", e => {

    let point = new Point(e.offsetX, e.offsetY);
    insertPoint(point);
    draw();
});

document.addEventListener("contextmenu", e => {
    e.preventDefault();

    let point = new Point(e.offsetX, e.offsetY);
    removePoint(point);
    draw();
})

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