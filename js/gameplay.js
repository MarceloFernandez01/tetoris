'use strict';

// Acciones de gameplay: caídas, fijado de piezas y aparición de nuevas.

function hardDrop() {
  const gy = ghostY();
  score += (gy - current.y) * 2;
  current.y = gy;
  lockPiece();
}

function softDrop() {
  if (!collide(current.shape, current.x, current.y + 1)) {
    current.y++;
    score += 1;
    updateHUD();
  } else {
    lockPiece();
  }
}

function lockPiece() {
  merge();
  clearLines();
  spawn();
}

function spawn() {
  current = next;
  next = randomPiece();
  canHold = true;
  if (collide(current.shape, current.x, current.y)) {
    endGame();
  }
  drawNext();
}

function holdPiece() {
  if (!canHold) return;
  const prevType = current.type;
  if (hold === null) {
    hold = prevType;
    current = next;
    next = randomPiece();
    drawNext();
  } else {
    current = makePiece(hold);
    hold = null;
    next = makePiece(prevType);
    drawNext();
  }
  canHold = false;
  drawHold();
}
