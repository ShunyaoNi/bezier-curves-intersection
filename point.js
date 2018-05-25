const radius = 4;
var controlPoints = [];
var bezierPoints = [];

function Point(x, y) {
    this.x = x;
    this.y = y;
}

// Checa se o ponto está próximo a um outro.
function checkProximity(point) {
    for(i = 0; i < controlPoints.length; i++) {

        let v = {
            x: controlPoints[i].x - point.x,
            y: controlPoints[i].y - point.y
        }

        if(Math.sqrt(v.x * v.x + v.y * v.y) <= radius)
            return i;
    } 
    return false;
}

function insertPoint(point) {
    if(checkProximity(point) === false)
        controlPoints.push(point);
}

function removePoint(point) {
    let index = checkProximity(point);
    if(index !== false)
        controlPoints.splice(index, 1);
}

function addition(point1, point2) {
    return new Point(point1.x + point2.x, point1.y + point2.y);
}

function multiplication(escalar, point1) {
    return new Point(escalar * point1.x, escalar * point1.y);
}