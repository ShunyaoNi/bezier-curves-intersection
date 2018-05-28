// Algoritmo de De Casteljau
function deCasteljau(controlPoints, leftSubCurve, rightSubCurve, t) {
    
    if(controlPoints.length === 0)
        return [];

    // Subcurvas.
    leftSubCurve.push(controlPoints[0]);
    rightSubCurve.push(controlPoints[controlPoints.length - 1]);

    // Ponto na curva.
    if(controlPoints.length === 1) 
        return controlPoints[0];
    
    // Pontos intermediários.
    var nextLevel = [];    
    for(let i = 0; i < controlPoints.length - 1; i++) {
        let p1 = multiplication(controlPoints[i], 1 - t);
        let p2 = multiplication(controlPoints[i + 1], t);
        nextLevel.push(addition(p1, p2));
    }
    
    return deCasteljau(nextLevel, leftSubCurve, rightSubCurve, t);
}

// Interseção de curvas.
function intersect(curve1, curve2) {

    let boundingBox1 = calculateBoundingBox(curve1);
    let boundingBox2 = calculateBoundingBox(curve2);
    
    if(smallEnough(boundingBox1) && smallEnough(boundingBox2)) {
        return true;
    }

    if(!overlap(boundingBox1, boundingBox2)) {
        return false;
    }

    let subcurves1 = subdivide(curve1);
    let subcurves2 = subdivide(curve2);

    for(let i = 0; i < 2; i++) {
        for(let j = 0; j < 2; j++) {
            if(intersect(subcurves1[i], subcurves2[j])) {
                drawIntersectionPoints(boundingBox1[0], boundingBox1[1]);
            }
        }
    }
    return false;
}

// Cálculo da bounding box da curva.
function calculateBoundingBox(curve) {
    let boundingBox = findExtremes(curve);
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

// Interseção de bounding boxes.
function overlap(boundingBox1, boundingBox2) {
    return overlapCondition(boundingBox1, boundingBox2, 0) && overlapCondition(boundingBox1, boundingBox2, 1);
}

function overlapCondition(boundingBox1, boundingBox2, i) {
    return (boundingBox1[i + 2] >= boundingBox2[i] && boundingBox1[i] <= boundingBox2[i + 2]);
}

// Subdivisão.
function subdivide(curve) {
    let leftSubCurve = [];
    let rightSubCurve = [];
    deCasteljau(curve, leftSubCurve, rightSubCurve, 0.5);
    
    return [leftSubCurve, rightSubCurve];
}

function smallEnough(boundingBox) {
    return (boundingBox[2] - boundingBox[0]) * (boundingBox[3] - boundingBox[1]) <= 0.1;
}