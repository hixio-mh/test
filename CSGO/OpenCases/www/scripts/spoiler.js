$(document).ready(function()
{
  $('.spoiler').hide();
  $('.spoiler_head').click(function()
  {
	if($(this).next('.spoiler_body').css('display')=='none') {
		var YouTube = $(this).next('.spoiler_body').html();
		$(this).next('.spoiler_body').html('<iframe width="100%" height="315px" src="'+YouTube+'" frameborder="0" allowfullscreen></iframe><div class="youtubelink">'+YouTube+'</div>');
	} else {
		var YouTube = $(this).next('.spoiler_body').text();
		$(this).next('.spoiler_body').html(YouTube);
	}
    $(this).next('.spoiler_body').slideToggle(100);
  });
});