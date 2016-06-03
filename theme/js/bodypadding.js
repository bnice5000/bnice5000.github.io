$(document).ready(function(){
    $('body').css('padding-top', $('.navbar').height()+'px');
});

var shiftWindow = function() { scrollBy(0, -50) };
if (location.hash) shiftWindow();
  window.addEventListener("hashchange", shiftWindow);
