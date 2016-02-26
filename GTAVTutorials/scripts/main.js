$('a').on('click',function(e) { e.preventDefault(); window.location = $(this).attr('href'); });

Device.isiPhone = function() {
   return navigator.userAgent.indexOf('iPhone') != -1;
}
Device.isiPod = function() {
   return navigator.userAgent.indexOf('iPod') != -1;
}
Device.isiPad = function() {
   return navigator.userAgent.indexOf('iPad') != -1;
}
Device.isiOS = function() {
   return Device.isiPhone || Device.isiPod || Device.isiPad;
}