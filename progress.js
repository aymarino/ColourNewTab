Date.prototype.monthDays= function(){
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
}

Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

function getMonthDays(month, year) {
  return new Date(year, month, 1).monthDays();
}

var barWidth = window.innerWidth * 0.8;
var barHeight = 10;

var dayCanvas = document.getElementById('dayProgress');
var dayCtx = dayCanvas.getContext('2d');

var monthCanvas = document.getElementById('monthProgress');
var monthCtx = monthCanvas.getContext('2d');

var yearCanvas = document.getElementById('yearProgress');
var yearCtx = yearCanvas.getContext('2d');

dayCanvas.width = barWidth;
monthCanvas.width = barWidth;
yearCanvas.width = barWidth;

dayCanvas.height = barHeight;
monthCanvas.height = barHeight;
yearCanvas.height = barHeight;

function drawProgress(date, colour) {
  // Day progress bar
  var totalSecsToday = date.getHours() * 60 * 60
                     + date.getMinutes() * 60
                     + date.getSeconds();
  var dayProportion  = totalSecsToday / (60 * 60 * 24);
  var dayWidth = dayProportion * dayCanvas.width;

  // Month progress bar
  var totalSecsMonth = (date.getDate() - 1) * (24 * 60 * 60)
                     + totalSecsToday;
  var monthProportion = totalSecsMonth /
                        (date.monthDays() * 24 * 60 * 60);
  var monthWidth = monthProportion * monthCanvas.width;

  // Year progress bar
  var totalSecsYear = totalSecsMonth;
  for (var i = 0; i < date.getMonth(); i++) {
    totalSecsYear += getMonthDays(i, date.getFullYear()) * 24 * 60 * 60;
  }

  var daysInYear = 365;
  if (date.isLeapYear()) daysInYear += 1;

  var yearProportion = totalSecsYear / (daysInYear * 24 * 60 * 60);
  var yearWidth = yearProportion * yearCanvas.width;

  // Update canvases
  updateCanvas(dayCanvas, dayCtx, colour, dayWidth);
  updateCanvas(monthCanvas, monthCtx, colour, monthWidth);
  updateCanvas(yearCanvas, yearCtx, colour, yearWidth);

  // Update progress percentage
  updatePercent('day', dayProportion);
  updatePercent('month', monthProportion);
  updatePercent('year', yearProportion);
}

function updateCanvas(canvas, ctx, colour, width) {
  // Fill background
  ctx.fillStyle = '#' + colour;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fill bar
  ctx.fillStyle = '#777';
  ctx.fillRect(0, 0, width, canvas.height);
}

function updatePercent(elementId, proportion) {
  document.getElementById(elementId).innerHTML += ' | '
    + (proportion * 100).toPrecision(3) + '%';
}
