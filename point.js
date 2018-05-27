const radius = 4;
var controlPoints = [[],[]];
var curve = 0;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

// Checa se o ponto está próximo a um outro.
function checkProximity(point) {
    for(i = 0; i < controlPoints[curve].length; i++) {

        let v = {
            x: controlPoints[curve][i].x - point.x,
            y: controlPoints[curve][i].y - point.y
        }

        if(Math.sqrt(v.x * v.x + v.y * v.y) <= radius)
            return i;
    } 
    return false;
}

function insertPoint(point) {
    if(checkProximity(point) === false && point.y >= 28)
        controlPoints[curve].push(point);
}

function removePoint(point) {
    let index = checkProximity(point);
    if(index !== false)
        controlPoints[curve].splice(index, 1);
}

function addition(point1, point2) {
    return new Point(point1.x + point2.x, point1.y + point2.y);
}

function multiplication(point, scalar) {
    return new Point(point.x * scalar, point.y * scalar);
}