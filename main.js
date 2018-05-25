// Adiciona um ponto de controle na tela.
document.addEventListener("click", e => {
    insertPoint({
        x: e.offsetX,
        y: e.offsetY
    });
    draw();
});

// Permite mover um ponto ao clicar e arrastar.
document.addEventListener("mousedown", e => {
    move = checkProximity(new Point(e.offsetX, e.offsetY));
});

document.addEventListener("mousemove", e => {
    if(move !== false) {
        controlPoints[move] = new Point(e.offsetX, e.offsetY);
        draw();
    }
});

document.addEventListener("mouseup", e => {
    move = false;
});

// Remover um ponto.
document.addEventListener("contextmenu", e => {
    e.preventDefault();

    removePoint(new Point(e.offsetX, e.offsetY));
    draw();
});

// Desenhar a curva.
document.addEventListener("keypress", e => {
    let key = e.which || e.keyCode;
    if (key === 13) { // Pressionou Enter.
        for(let i = 0; i <= 1; i += 0.01) {
            bezierPoints.push(bezierPoint(i));
        }
        drawCurve();
    }
});