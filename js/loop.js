'use strict';

// Bucle principal basado en requestAnimationFrame.

function loop(ts) {
  const dt = ts - lastTime;
  lastTime = ts;
  dropAccum += dt;
  // Cuando el tiempo acumulado supera dropInterval, la pieza baja una fila
  // (o se fija si ya no puede seguir bajando).
  if (dropAccum >= dropInterval) {
    dropAccum = 0;
    if (!collide(current.shape, current.x, current.y + 1)) {
      current.y++;
    } else {
      lockPiece();
    }
  }
  draw();
  animId = requestAnimationFrame(loop);
}
