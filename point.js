const radius = 5;
var controlPoints = [];

function Point(x, y) {
    this.x = x;
    this.y = y;
}

// Checa se o ponto está próximo a um outro.
function checkValidity(point) {
    for(i = 0; i < controlPoints.length; i++) {

        let v = {
            x: controlPoints[i].x - point.x,
            y: controlPoints[i].y - point.y
        }

        if(Math.sqrt(v.x * v.x + v.y * v.y) <= radius)
            return i;
    } 
    return true;
}

function insertPoint(point) {
    if(checkValidity(point) === true)
        controlPoints.push(point);
}

function removePoint(point) {
    let index = checkValidity(point);
    if(index !== true)
        controlPoints.splice(index, 1);
}