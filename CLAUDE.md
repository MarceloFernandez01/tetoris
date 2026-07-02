# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Tetris implementado en JavaScript vanilla con HTML5 Canvas. Sin dependencias, sin `package.json`, sin build ni transpilación: `index.html`, `style.css` y la carpeta `js/` (lógica del juego repartida en varios archivos) que se abren directamente en el navegador.

## Running the game

No hay comandos de build/lint/test. Para probar cambios, abrir `index.html` en el navegador o servir el directorio con cualquier servidor estático:

```bash
python3 -m http.server 8000
# o
npx serve .
```

No existe suite de tests automatizada; la verificación es manual jugando en el navegador.

## Architecture

La lógica está repartida en `js/*.js`, cargados como `<script>` clásicos (sin módulos, sin bundler) en un orden específico definido en `index.html`. Todos comparten el mismo scope léxico global: no hay clases ni namespaces, todo son funciones que leen/mutan el mismo estado compartido.

**Orden de carga (importa)**: `constants.js` → `dom.js` → `state.js` → `board.js` → `piece.js` → `gameplay.js` → `hud.js` → `render.js` → `loop.js` → `input.js` → `main.js`. Los primeros tres solo declaran datos; los siguientes solo definen funciones; `input.js` registra listeners; `main.js` llama a `init()` al final, por lo que debe cargarse último.

- **Estado global mutable** (`js/state.js`): variables de nivel superior (`board`, `current`, `next`, `score`, `lines`, `level`, `paused`, `gameOver`, `dropInterval`, etc.) representan todo el estado del juego.
- **Tablero** (`js/board.js`): matriz `ROWS × COLS` (`board`), cada celda es `0` (vacía) o un índice 1–7 que indexa `COLORS`/`PIECES`.
- **Piezas** (`js/piece.js`, formas en `js/constants.js` → `PIECES`): matrices cuadradas fijas. La rotación (`rotateCW`) es una transposición + reverso de filas, sin tablas de rotación (no es el sistema SRS completo).
- **Wall kicks** (`tryRotate`, en `js/piece.js`): tras rotar, prueba desplazamientos `[0, -1, 1, -2, 2]` en `x` hasta encontrar una posición sin colisión.
- **Colisión** (`collide`, en `js/board.js`): única función de chequeo de límites/solapamiento, usada tanto por movimiento como por rotación, ghost piece y detección de game over.
- **Game loop** (`loop`, en `js/loop.js`): basado en `requestAnimationFrame`, acumula `dt` y aplica caída automática cuando supera `dropInterval`; `togglePause` (en `js/hud.js`) cancela el frame (`cancelAnimationFrame`) y lo relanza al reanudar.
- **Ghost piece**: `ghostY()` (en `js/piece.js`) proyecta hacia abajo la posición final antes de dibujar con `globalAlpha = 0.2` (en `js/render.js`).
- **Flujo de spawn/fin de partida** (`js/gameplay.js`): `spawn()` promueve `next` a `current` y genera una nueva `next`; si la nueva pieza colisiona al aparecer, se dispara `endGame()` (en `js/hud.js`).
- **Rendering** (`js/render.js`): `draw()` dibuja grid + tablero fijo + ghost + pieza actual en el canvas principal (`#board`); `drawNext()` dibuja la vista previa en un canvas separado (`#next-canvas`).

### Ajustar parámetros del juego

Constantes en `js/constants.js`: `COLS`, `ROWS`, `BLOCK`, `COLORS`, `PIECES`, `LINE_SCORES`. Si se cambia `COLS`, `ROWS` o `BLOCK`, hay que ajustar también `width`/`height` del `<canvas id="board">` en `index.html` para que coincidan (`COLS × BLOCK`, `ROWS × BLOCK`). `dropInterval` se inicializa en `js/main.js` (dentro de `init()`), no en `constants.js`.
