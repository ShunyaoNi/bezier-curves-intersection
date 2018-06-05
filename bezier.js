var TC = document.getElementsByClassName("parameter"); //T's para a primeira curva
var intersectionPoints = [[],[]];

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
                let parameter1 = ((subcurves1[i][subcurves1[i].length - 2] + subcurves1[i][subcurves1[i].length - 1]) / 2).toFixed(2);
                let parameter2 = ((subcurves2[j][subcurves2[j].length - 2] + subcurves2[j][subcurves2[j].length - 1]) / 2).toFixed(2);
                
                if(!intersectionPoints[0].includes(parameter1))
                    intersectionPoints[0].push(parameter1);
                if(!intersectionPoints[1].includes(parameter2))
                    intersectionPoints[1].push(parameter2);

				addIntersection();
                drawIntersectionPoints((boundingBox1[0] + boundingBox1[2]) / 2, (boundingBox1[1] + boundingBox1[3]) / 2);
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

    for(let i = 0; i < curve.length - 2; i++) {
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

    let leftParameter = curve[curve.length - 2];
    let rightParameter = curve[curve.length - 1];

    deCasteljau(curve.slice(0, curve.length - 2), leftSubCurve, rightSubCurve, 0.5);
    
    let leftSubCurveParameters = [leftParameter, (leftParameter + rightParameter) / 2];
    let rightSubCurveParameters = [rightParameter, (leftParameter + rightParameter) / 2]; 

    return [leftSubCurve.concat(leftSubCurveParameters), rightSubCurve.concat(rightSubCurveParameters)];
}

var tolerancia = 0.1;
function smallEnough(boundingBox) {
    return (boundingBox[2] - boundingBox[0]) * (boundingBox[3] - boundingBox[1]) <= tolerancia;
}

function addIntersection() {
    var ul = document.getElementsByClassName("parameter");
    ul[0].innerHTML = "";
    ul[1].innerHTML = "";

    for(let i = 0; i < intersectionPoints.length; i++) {
        for(let j = 0; j < intersectionPoints[i].length; j++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(i + ": " + intersectionPoints[i][j]));
            ul[i].appendChild(li);
        }
    }
    
      
    //TC[curve].innerHTML = "" + t;
}