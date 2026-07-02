'use strict';

// Generación, rotación y fusión de piezas con el tablero.

function randomPiece() {
  // La tuerca (tipo 8) es un reto: aparece rara, ~1 de cada 12 piezas.
  const type = Math.random() < 0.08 ? 8 : Math.floor(Math.random() * 7) + 1;
  return makePiece(type);
}

// Construye una pieza fresca del tipo dado, sin rotación previa y centrada
// en su posición inicial. Usado también al sacar una pieza del hold.
function makePiece(type) {
  const shape = PIECES[type].map(row => [...row]);
  return { type, shape, x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2), y: 0 };
}

// Rotación en sentido horario: transposición + reverso de filas. No es el
// sistema SRS completo, solo una rotación simple sobre matrices cuadradas.
function rotateCW(shape) {
  const rows = shape.length, cols = shape[0].length;
  const result = Array.from({ length: cols }, () => new Array(rows).fill(0));
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      result[c][rows - 1 - r] = shape[r][c];
  return result;
}

// Tras rotar, prueba estos desplazamientos en x (wall kicks) hasta
// encontrar una posición sin colisión antes de descartar el giro.
function tryRotate() {
  const rotated = rotateCW(current.shape);
  const kicks = [0, -1, 1, -2, 2];
  for (const kick of kicks) {
    if (!collide(rotated, current.x + kick, current.y)) {
      current.shape = rotated;
      current.x += kick;
      return;
    }
  }
}

function merge() {
  for (let r = 0; r < current.shape.length; r++)
    for (let c = 0; c < current.shape[r].length; c++)
      if (current.shape[r][c])
        board[current.y + r][current.x + c] = current.shape[r][c];
}

// Proyecta hacia abajo la posición final de la pieza actual (pieza fantasma).
function ghostY() {
  let gy = current.y;
  while (!collide(current.shape, current.x, gy + 1)) gy++;
  return gy;
}
