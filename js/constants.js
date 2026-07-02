'use strict';

// Dimensiones del tablero y tamaño de renderizado de cada celda.
const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

// Color por índice de pieza (el índice 0 representa celda vacía).
const COLORS = [
  null,
  '#4dd0e1', // I - cyan
  '#ffd54f', // O - yellow
  '#ba68c8', // T - purple
  '#81c784', // S - green
  '#e57373', // Z - red
  '#7986cb', // J - indigo
  '#ffb74d', // L - orange
];

// Forma inicial de cada pieza (matrices cuadradas fijas). El valor de cada
// celda ocupada es el índice de color/tipo de la pieza.
const PIECES = [
  null,
  [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], // I
  [[2,2],[2,2]],                               // O
  [[0,3,0],[3,3,3],[0,0,0]],                  // T
  [[0,4,4],[4,4,0],[0,0,0]],                  // S
  [[5,5,0],[0,5,5],[0,0,0]],                  // Z
  [[6,0,0],[6,6,6],[0,0,0]],                  // J
  [[0,0,7],[7,7,7],[0,0,0]],                  // L
];

// Puntos otorgados según la cantidad de líneas eliminadas de una vez (1-4).
const LINE_SCORES = [0, 100, 300, 500, 800];
