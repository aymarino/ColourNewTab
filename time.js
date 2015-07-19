function dotime(){
  $("body").css({"transition": "all 0.8s", "-webkit-transition": "all 0.8s"});
  
  var d = new Date();
  var date = d.toDateString();

  var hours = d.getHours(); var pm = false;
  if (hours > 12) pm = true;
  
  var mins = d.getMinutes();
  var secs = d.getSeconds();

  var totalSeconds = hours * 60 * 60 + mins * 60 + secs;

  var curTime = formatTimeForDisplay(totalSeconds, true);
  var timeLeft = formatTimeForDisplay(24 * 60 * 60 - totalSeconds, false);

  var curTimeStr = curTime[0] + ' : ' + curTime[1] + ' : ' + curTime[2];
  if (pm) curTimeStr += '&nbsp; PM';
  else curTimeStr += '&nbsp; AM';

  var timeLeftStr = timeLeft[0] + ' : ' + timeLeft[1] + ' : '
                    + timeLeft[2] + ' left today.';

  var colour = curTime[0] + curTime[1] + curTime[2];

  $("#d").html(date);
  $("#left").html(timeLeftStr);
  $("#t").html(curTimeStr);
  $("#h").html('#' + colour);
  
  var inverseColor = (0xFFFFFF - parseInt(colour, 16)).toString(16);
  drawProgress(totalSeconds / (60 * 60 * 24), inverseColor);
  document.body.style.background = '#' + colour;
  
  setTimeout(function(){ dotime();}, 1000);
}

function formatTimeForDisplay(totalSecs, isAmericanDisplay) {
  var hours = Math.floor(totalSecs / (60 * 60));
  totalSecs = totalSecs % (60 * 60);
  var mins = Math.floor(totalSecs / 60);
  totalSecs = totalSecs % 60;
  var secs = totalSecs;

  if (isAmericanDisplay && hours > 12) hours -= 12;
  else if (isAmericanDisplay && hours == 0) hours = 12;

  if (hours < 10) hours = '0' + hours;
  if (mins < 10) mins = '0' + mins;
  if (secs < 10) secs = '0' + secs;

  return [hours.toString(), mins.toString(), secs.toString()];
}

window.onload = dotime;