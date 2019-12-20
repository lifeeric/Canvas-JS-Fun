// this is the project files
require('./index.html');
require('./main.scss');
require('./images/Poster1.jpg');
require('../node_modules/materialize-css/sass/materialize.scss');
require('../node_modules/material-icons/iconfont/material-icons.scss');



// Actual code is here //

// get the canvas element
let canvas = document.querySelector('#canvas');

// set the width, height, color, and more of the canvas
let ctx         = canvas.getContext('2d');
canvas.width       = window.innerWidth;
canvas.height      = window.innerHeight;
ctx.strokeStyle = '#000';
ctx.lineCap     = 'round';
ctx.joinCap     = 'round';
ctx.lineWidth   = 100;


// set some global variables
let isDrawing  = false;
let hue        = 0;
let lastX      = 0;
let lastY      = 0;
let direction  = true;


// draw funcion which draw the line

const draw = (e) => {
  // console.log('yeah\' worked');

  if( !isDrawing ) return null;

  // now set the color for the line
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  // begin the path
  console.log(ctx);
  ctx.beginPath();

  // get the current path
  ctx.moveTo(lastX, lastY);

  // line to
  ctx.lineTo(e.offsetX, e.offsetY);

  // start filling line
  ctx.stroke();

  // set new line
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;

  if(hue >= 360 ) hue = 0;

  if( ctx.lineWidth >= 100 || ctx.lineWidth <= 1 ) direction = !direction;

  if( direction ) ctx.lineWidth++;
  else ctx.lineWidth--;

  console.log(ctx.lineWidth)

}

// now deal with cursor( which is click on the page )

window.addEventListener('mousedown', (e) => {
  // drawing is strating now
  isDrawing = true;
  // set the starting point of the cursor
  [lastX, lastY] = [e.offsetX, e.offsetY]
} );

window.addEventListener('mousemove', draw );
window.addEventListener('mouseout', () => isDrawing = false );
window.addEventListener('mouseup', () => isDrawing = false );