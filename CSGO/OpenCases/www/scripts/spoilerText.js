$(document).ready(function()
{
  $('.spoiler').hide();
  $('.spoiler_head').click(function()
  {
    $(this).next('.spoiler_body').slideToggle(100);
  });
});