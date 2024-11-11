import {
  fromEvent
} from 'rxjs'
import {
  map
} from 'rxjs/operators'

const canvas = document.getElementById('reactive-canvas');
const canvasContext = canvas.getContext('2d');
const restartButton = document.getElementById('restart-button');

const cursorPosition = {x: 0, y: 0};
const onMouseDown$ = fromEvent(canvas, 'mousedown').pipe(map(event => {
    cursorPosition.x = event.clientX - canvas.offsetLeft;
    cursorPosition.y = event.clientY - canvas.offsetTop;
  })
);
const onMouseUp$ = fromEvent(canvas, 'mouseup');

onMouseDown$.subscribe();

function drawLine(xi, yi, xf, yf, canvasContext) {
  canvasContext.beginPath();
  canvasContext.strokeStyle = 'white';
  canvasContext.lineWidth = '8';
  canvasContext.moveTo(xi, yi);
  canvasContext.lineTo(xf, yf);
  canvasContext.stroke();
  canvasContext.closePath();
}

drawLine(0, 0, 200, 200, canvasContext);
