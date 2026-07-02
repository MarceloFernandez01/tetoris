'use strict';

// Inicialización y arranque del juego.

function initTheme() {
  const saved = localStorage.getItem('tetoris-theme');
  applyTheme(saved === 'light' ? 'light' : 'dark');
}

function init() {
  board = createBoard();
  score = 0;
  lines = 0;
  level = 1;
  paused = false;
  gameOver = false;
  dropInterval = 1000;
  dropAccum = 0;
  lastTime = performance.now();
  next = randomPiece();
  spawn();
  updateHUD();
  overlay.classList.add('hidden');
  cancelAnimationFrame(animId);
  animId = requestAnimationFrame(loop);
}

initTheme();
init();
