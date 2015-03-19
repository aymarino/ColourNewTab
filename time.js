function dotime(){
  $("body").css({"transition": "all 0.8s", "-webkit-transition": "all 0.8s"});
  
  var d = new Date();
  var date = d.toDateString();

  var hours = d.getHours(); var pm = false;
  if (hours > 12) {
    pm = true;
    var americanHours = hours - 12;
  }
  else if (hours == 0) {
    var americanHours = 12;
  }
  
  var mins = d.getMinutes();
  var secs = d.getSeconds();
  
  if (hours < 10){hours = "0" + hours};
  if (mins < 10){mins = "0" + mins};
  if (secs < 10){secs = "0" + secs};
  
  hours.toString();
  mins.toString();
  secs.toString();
  
  var hex = "#" + hours + mins + secs;
  
  $("#d").html(date);

  if (pm) $("#t").html(americanHours + " : " + mins + " : " + secs + "&nbsp; PM");
  else if (hours == 0)
    $("#t").html(americanHours + " : " + mins + " : " + secs + "&nbsp; AM");
  else $("#t").html(hours + " : " + mins +" : " + secs + "&nbsp; AM");
  $("#h").html(hex);
  
  document.body.style.background = hex;
  
  setTimeout(function(){ dotime();}, 1000);
}

window.onload = dotime;