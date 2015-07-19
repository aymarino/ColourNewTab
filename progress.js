var canvas = document.getElementById('progress');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.8;
canvas.height = 10;

function drawProgress(proportion, colour) {
  var width = proportion * canvas.width;

  // Fill background
  ctx.fillStyle = '#' + colour;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fill bar
  ctx.fillStyle = "#777";
  ctx.fillRect(0, 0, width, canvas.height);
}
