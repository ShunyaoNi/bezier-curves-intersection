// Algoritmo de De Casteljau
function deCasteljau(controlPoints, t) {
    
    if(controlPoints.length === 0)
        return [];

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
    
    return deCasteljau(nextLevel, t);
}

// Interseção de curvas.
function intersect(curveControlPoints1, curvePoints1, curveControlPoints2, curvePoints2) {

    if(!overlap(getBoundingBox(curvePoints1, curvePoints2))) {

    }

}