
// Algoritmo de De Casteljau
function bezierPoint(t) {
    
    let curvePoint = new Point(0, 0);
    let bernsteinCoefficient;
    for(let i = 0; i < controlPoints.length; i++) {
        bernstein = Bernstein(i, t);
        curvePoint.x += bernsteinCoefficient * controlPoints[i].x;
        curvePoint.y += bernsteinCoefficient * controlPoints[i].y;
    }
    return curvePoint;
}

function Bernstein(i, t) {
    let n = controlPoints.length - 1;
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