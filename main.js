var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

document.addEventListener("click", e => {

    var point = new Point(e.offsetX, e.offsetY);
    if(checkValidity(point)) {
        controlPoints.push(point);
        draw();
    }

});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "white";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;

    for(i = 0; i < controlPoints.length; i++) {
        ctx.beginPath();
        ctx.arc(controlPoints[i].x, controlPoints[i].y, radius, 0, 2 * Math.PI);
        if(i < controlPoints.length - 1)
            ctx.lineTo(controlPoints[i + 1].x, controlPoints[i + 1].y);
        ctx.stroke();
        ctx.fill();
    }

   
}