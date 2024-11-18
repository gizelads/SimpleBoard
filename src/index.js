import {
  fromEvent
} from 'rxjs'
import {
  map,
  mergeAll
} from 'rxjs/operators'

const canvas = document.getElementById('reactive-canvas');
const canvasContext = canvas.getContext('2d');
canvasContext.strokeStyle = 'white';
canvasContext.lineWidth = '5';
const restartButton = document.getElementById('restart-button');
const cursorPosition = {x: 0, y: 0};

const updateCursorPosition = (event) => {
  cursorPosition.x = event.clientX - canvas.offsetLeft;
  cursorPosition.y = event.clientY - canvas.offsetTop;
};
const paintStroke = (event) => {
  canvasContext.beginPath();
  canvasContext.moveTo(cursorPosition.x, cursorPosition.y);
  updateCursorPosition(event);
  canvasContext.lineTo(cursorPosition.x, cursorPosition.y);
  canvasContext.stroke();
  canvasContext.closePath();
};

const onMouseDown$ = fromEvent(canvas, 'mousedown');
const onMouseMove$ = fromEvent(canvas, 'mousemove');
const onMouseUp$ = fromEvent(canvas, 'mouseup');
const startPaint$ = onMouseDown$.pipe(
  map(() => onMouseMove$),
  mergeAll()
);

onMouseDown$.subscribe(updateCursorPosition);
startPaint$.subscribe(paintStroke);