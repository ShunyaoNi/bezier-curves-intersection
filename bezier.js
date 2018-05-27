// Algoritmo de De Casteljau
function deCasteljau(controlPoints, t) {
    
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