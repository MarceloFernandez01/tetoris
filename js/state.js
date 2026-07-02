'use strict';

// Estado global mutable del juego. Se inicializa en init() (js/main.js) y es
// leído/mutado por el resto de los archivos.
let board, current, next, score, lines, level, paused, gameOver, lastTime, dropAccum, dropInterval, animId;

// Pieza reservada con hold (tipo 1-8 o null) y si el hold está disponible
// para la pieza actual (se bloquea tras usarlo hasta la próxima pieza).
let hold, canHold;

// Tema visual activo ('dark' | 'light') y color de grilla del canvas derivado de él.
let theme, gridColor;
