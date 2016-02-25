$(document).ready(function()
{
  $('.spoiler').hide();
  $('li:has(span.spoiler_head)').on("click", function()
  {
	var elemen = this;
	if($(this)[0].tagName == "LI") {
		elemen = $(this).children("span");
	}
	if($(elemen).next('.spoiler_body').css('display')=='none') {
		var YouTube = $(elemen).next('.spoiler_body').html();
		$(elemen).next('.spoiler_body').html('<iframe width="100%" height="315px" src="'+YouTube+'" frameborder="0" allowfullscreen></iframe><div class="youtubelink">'+YouTube+'</div>');
	} else {
		var YouTube = $(elemen).next('.spoiler_body').text();
		$(elemen).next('.spoiler_body').html(YouTube);
	}
    $(elemen).next('.spoiler_body').slideToggle(100);
  });
});