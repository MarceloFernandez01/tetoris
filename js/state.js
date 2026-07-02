'use strict';

// Estado global mutable del juego. Se inicializa en init() (js/main.js) y es
// leído/mutado por el resto de los archivos.
let board, current, next, score, lines, level, paused, gameOver, lastTime, dropAccum, dropInterval, animId;
