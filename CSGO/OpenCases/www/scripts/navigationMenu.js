var menuClick = new Audio();
menuClick.src = "../sound/interface/menuClick.wav";
menuClick.volume = 0.9;

$(function() {
	var bar = $('.navigationBar');
	var pageName = $('.navigationBar').data('menu-'+Settings.language.toLowerCase());
	var barHTML = '<img src="../images/navigation/hamburger.png" class="navigationBar_hamburger"><span>'+pageName+'</span>';
	bar.html(barHTML);
	$(document.body).prepend('<div class="leftMenu" style="left: -270px"></div>');
	var menu = $('.leftMenu');
	var menuHTML = '<div class="menu_playerInfo"><img src="../images/ava/'+Player.avatar+'" align="left"><span>'+Player.nickname+'</span></div>';
	menuHTML += '<ul><li><a href="cases.html"><span class="icon icon-key2"></span><span id="local-menu-case">Открыть кейсы</span></a></li>'+
					'<li><a href="rulet.html"><span class="icon icon-spinner5"></span><span id="local-menu-rulet">Рулетка</span></a></li>'+
					'<li><a href="inventory.html"><span class="icon icon-coin-dollar"></span><span id="local-menu-inventory">Мой инвентарь</span></a></li>'+
					'<li><a href="statistic.html"><span class="icon icon-stats-bars"></span><span id="local-menu-stat">Статистика</span></a></li>'+
					'<li><a href="faq.html"><span class="icon icon-question"></span><span>FAQ</span></a></li>'+
					'<li><a href="settings.html"><span class="icon icon-cog"></span><span id="local-menu-settings">Настройки</span></a></li>'+
					'<li><a href="about.html"><span class="icon icon-info"></span><span id="local-menu-about">О программе</span></a></li>'+
					'<li><a href="#"><span class="icon icon-star-full"></span><span id="local-menu-apps">Другие приложения</span></a></li>'+
					'</ul>';
	$(menu).html(menuHTML);
})

/*$(document).on('click', '.leftMenu', function() {
	menuClick.play();
})*/

$(document).on('click', '.navigationBar_hamburger', function() {
	menuClick.play();
	$('.leftMenu').animate({
		left: ($('.leftMenu').css('left') == '0px') ? "-=270" : "+=270"
		//css('left', '0px');
	}, 700)
	$('.navigationBar').animate({
		left: ($('.leftMenu').css('left') == '0px') ? "-=270" : "+=270"
	}, 700)
})