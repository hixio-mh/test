/*
var lnk = document.createElement('link');
$(lnk).attr('href', '../css/pushy.css');
$(lnk).attr('type', 'text/css');
$(lnk).attr('rel', 'stylesheet');
document.head.appendChild(lnk);
*/

$(function() {
    $(".site-overlay").hide();
    var bar = $('.navigationBar');
    var pageName = $('.navigationBar').data('menu-' + Settings.language.toLowerCase());
    var barHTML = '<img src="../images/navigation/hamburger.png" class="navigationBar_hamburger menu-btn"><span>' + pageName + '</span>';
    bar.html(barHTML);
    $(document.body).prepend('<div class="left-menu closed"></div>');
    var menu = $('.left-menu');
    var rank = getRank();
    var nextRank = getNextRank();
    var percent = ((Player.points - getRank().points) * 100) / (getNextRank().points - getRank().points);
    if (getNextRank().points - getRank().points == 0) percent = 100;
    var menuHTML = '<div class="menu_playerInfo"><div id="menu_playerInfo_info"><img src="../images/ava/' + Player.avatar + '" class="menu_ava"><div id="menu_playerInfo_info_text"><span id="menu_playerInfo_name">' + Player.nickname + '</span><span id="menu_doubleBalance">' + Player.doubleBalance + '</span> <i class="double-icon"></i></div></div>' +
        '<div class="menu_rank"><img src="' + rank.img + '" id="left-rank"><img src="' + nextRank.img + '" style="float:right" id="right-rank"><div class="progress"><div class="progress-bar" id="player-rank-progress" style="width: ' + percent + '%"></div></div></div>' +
        '</div>';
    menuHTML += '<ul><li class="pushy-link"><a href="cases.html"><span class="icon icon-key2"></span><span id="local-menu-case">Открыть кейсы</span></a></li>' +
        '<li class="submenu closed" data-podmenu="games"><a href="#"><span class="icon icon-pacman"></span><span id="local-menu-games">Игры</span></a>' +
        '<ul>' +
        '<li class="pushy-link"><a href="rulet.html"><span class="icon icon-spinner5"></span><span id="local-menu-rulet">Джекпот</span></a></li>' +
        '<li class="pushy-link"><a href="RPS.html"><span class="icon icon-scissors"></span><span id="local-menu-rps">Камень-ножницы-бумага</span></a></li>' +
        '<li class="pushy-link"><a href="coinflip.html"><span class="icon icon-coin-dollar"></span><span id="local-menu-coinflip">Монетка</span></a></li>' +
        '<li class="pushy-link"><a href="double.html"><span class="icon icon-make-group"></span><span id="local-menu-double">Дабл</span></a></li>' +
        '</ul></li>' +
        '<li class="pushy-link"><a href="inventory.html"><span class="icon icon-list"></span><span id="local-menu-inventory">Мой инвентарь</span></a></li>' +
        '<li class="pushy-link"><a href="market.html"><span class="icon icon-cart"></span><span id="local-menu-market">Магазин</span></a></li>' +
        '<li class="pushy-link"><a href="statistic.html"><span class="icon icon-stats-bars"></span><span id="local-menu-stat">Статистика</span></a></li>' +
        '<li class="pushy-link"><a href="faq.html"><span class="icon icon-question"></span><span>FAQ</span></a></li>' +
        '<li class="pushy-link"><a href="news.html"><span class="icon icon-bullhorn"></span><span id="local-menu-news">Обновления</span></a></li>' +
        '<li class="pushy-link"><a href="settings.html"><span class="icon icon-cog"></span><span id="local-menu-settings">Настройки</span></a></li>' +
        '<li class="pushy-link"><a href="about.html"><span class="icon icon-info"></span><span id="local-menu-about">О программе</span></a></li>' +
        '<li class="pushy-link"><a href="apps.html"><span class="icon icon-star-full"></span><span id="local-menu-apps">Другие приложения</span></a></li>' +
        '</ul>';
    $(menu).html(menuHTML);
    $(document.body).addClass("menuClose");
    /*var script = document.createElement('script');
    script.src = "../scripts/pushy.min.js";
    script.async = false;
    document.body.appendChild(script);*/
})

/*$(document).on('click', '.js-podmenu', function() {
    var podmenu = $(this).data('podmenu');
    $('.podmenu-' + podmenu).toggleClass('hide');
});*/
$(document).on('click', '.leftMenu ul a', function() {
    Sound("click", "play");
});
$(document).on('click', '.submenu', function() {
    $(this).toggleClass("closed opened"); //, 200, "easeOutSine");
})
$(document).on('click', '.navigationBar_hamburger, .site-overlay', function() {
    Sound("menuclick", "play");
    $(".left-menu").toggleClass("closed opened");
    if ($(".site-overlay").is(":visible"))
        $(".site-overlay").hide();
    else {
        $(".site-overlay").show();
    }
})
