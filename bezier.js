// Algoritmo de De Casteljau
function bezierPoint(t) {
    
    let curvePoint = new Point(0, 0);
    let bernsteinCoefficient;
    for(let i = 0; i < controlPoints[curve].length; i++) {
        bernsteinCoefficient = Bernstein(i, t);
        curvePoint.x += bernsteinCoefficient * controlPoints[curve][i].x;
        curvePoint.y += bernsteinCoefficient * controlPoints[curve][i].y;
    }
    return curvePoint;
}

function Bernstein(i, t) {
    let n = controlPoints[curve].length - 1;
    return comb(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
}

function comb(n, i) {
    return factorial(n) / (factorial(i) * factorial(n - i));
}

function factorial(n) {
    if(n == 0)
        return 1;
    return n * factorial(n - 1);
}

// Calculando a bounding box da curva (pontos extremos a partir da esquerda em sentido horário).
function calculateBoundingBox(curve) {
    var boundingBox = findExtremes(curve);
    return boundingBox;
}

function findExtremes(curve) {
    var least = [10000, 10000];
    var highest = [0, 0];

    for(let i = 0; i < curve.length; i++) {
        least[0] = Math.min(least[0], curve[i].x);
        least[1] = Math.min(least[1], curve[i].y);
        highest[0] = Math.max(highest[0], curve[i].x);
        highest[1] = Math.max(highest[1], curve[i].y);
    }
    
    return [least[0], least[1], highest[0], highest[1]];
}

// Interseção de curvas.
function intersect(curve1, curve2) {
    if(!overlap(calculateBoundingBox(curve1), calculateBoundingBox(curve2)))
        return false;
}

function overlap(boundingBox1, boundingBox2) {
    return overlapCondition(boundingBox1, boundingBox2, 0) && overlapCondition(boundingBox1, boundingBox2, 1);
}

function overlapCondition(boundingBox1, boundingBox2, i) {
    return Math.abs(boundingBox1[i] + boundingBox1[i + 2] - boundingBox2[i] - boundingBox2[i + 2]) <=
        (boundingBox1[i + 2] - boundingBox1[i] + boundingBox2[i + 2] - boundingBox2[i]);
}