$(function () {
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
    var link = "chat.html";
    try {
        firebase.auth().onAuthStateChanged(function (user) {
            if (firebase.auth().currentUser != null) {
                link = "profile.html?uid=" + firebase.auth().currentUser.uid;
                $("a[data-profileLink='true']").each(function () {
                    $(this).attr('href', link)
                }); 
            }
        });
    }
    catch (e) {}
    var menuHTML = '<div class="menu_playerInfo"> \
        <div id="menu_playerInfo_info"> \
            <a href="' + link + '" data-profileLink="true"><img src="../images/ava/' + Player.avatar + '" class="menu_ava"></a> \
            <div id="menu_playerInfo_info_text"> \
                <a href="' + link + '" data-profileLink="true"><span id="menu_playerInfo_name">' + Player.nickname + '</span></a> \
                <span id="menu_doubleBalance">' + Player.doubleBalance + '</span><i class="double-icon"></i> \
            </div> \
        </div> \
        <div class="menu_rank"> \
            <div class="menu_rank__top"> \
                <span class="menu_rank__exp">' + Level.myEXP() + ' EXP</span> \
            </div> \
            <div class="menu_rank__lvl"> \
                <span class="lvl lvl-current">' + Level.myLvl() + '</span> \
                <div class="progress"><div class="progress-bar" id="player-rank-progress" style="width: ' + Level.progress() + '%"></div></div> \
                <span class="lvl lvl-next">'+Level.nextLvl()+'</span> \
            </div> \
            <div class="menu_rank__bottom"> \
                <span class="menu_rank__next-lvl-exp">' + (Level.nextLvlEXP() - Level.myEXP()) + ' to next level</span> \
            </div> \
        </div> \
    </div>';
    
    menuHTML += '<ul> \
        <li class="pushy-link"><a href="cases.html"><span class="icon icon-key2"></span><span id="local-menu-case" data-local="Open case">Открыть кейсы</span></a></li> \
        <li class="submenu closed" data-podmenu="games"><a href="#"><span class="icon icon-pacman"></span><span id="local-menu-games" data-local="Games">Игры</span></a> \
        <ul> \
            <li class="pushy-link"><a href="rulet.html"><span class="icon icon-spinner5"></span><span id="local-menu-rulet" data-local="Jackpot">Джекпот</span></a></li>\
            <li class="pushy-link"><a href="RPS.html"><span class="icon icon-scissors"></span><span id="local-menu-rps" data-local="Rock-Paper-Scissors">Камень-ножницы-бумага</span></a></li> \
            <li class="pushy-link"><a href="coinflip.html"><span class="icon icon-coin-dollar"></span><span id="local-menu-coinflip" data-local="Coinflip">Монетка</span></a></li> \
            <li class="pushy-link"><a href="double.html"><span class="icon icon-make-group"></span><span id="local-menu-double" data-local="Double">Дабл</span></a></li> \
        </ul></li> \
        <li class="submenu closed"><a href="#"><i class="icon icon-pacman"></i><span id="local-menu-online-games" data-local="Online games">Онлайн игры</span></a> \
        <ul> \
            <li class="pushy-link"><a href="double-Online.html"><span class="icon icon-make-group"></span><span data-local="Double">Дабл</span><sup class="beta">beta</sup></a></li> \
            <li class="pushy-link"><a href="crash-Online.html"><span class="icon icon-stats-dots"></span><span data-local="Crash">Краш</span><sup class="beta">beta</sup></a></li> \
        </ul></li> \
        <li class="pushy-link"><a href="inventory.html"><span class="icon icon-list"></span><span id="local-menu-inventory" data-local="My inventory">Мой инвентарь</span></a></li>\
        <li class="pushy-link"><a href="market.html"><span class="icon icon-cart"></span><span id="local-menu-market" data-local="Market">Магазин</span></a></li> \
        <li class="pushy-link"><a href="chat.html"><span class="icon icon-bubbles2"></span><span id="local-menu-chat" data-local="Chat">Чат</span></a></li> \
        <li class="pushy-link"><a href="statistic.html"><span class="icon icon-stats-bars"></span><span id="local-menu-stat" data-local="Statistic">Статистика</span></a></li> \
        <li class="pushy-link"><a href="faq.html"><span class="icon icon-question"></span><span>FAQ</span></a></li> \
        <li class="pushy-link"><a href="news.html"><span class="icon icon-bullhorn"></span><span id="local-menu-news" data-local="Updates">Обновления</span></a></li> \
        <li class="pushy-link"><a href="settings.html"><span class="icon icon-cog"></span><span id="local-menu-settings" data-local="Settings">Настройки</span></a></li> \
        <li class="pushy-link"><a href="about.html"><span class="icon icon-info"></span><span id="local-menu-about" data-local="About">О программе</span></a></li> \
        <li class="pushy-link"><a href="apps.html"><span class="icon icon-star-full"></span><span id="local-menu-apps" data-local="Other apps">Другие приложения</span></a></li> \
        </ul>';
    $(menu).html(menuHTML);
    $(document.body).addClass("menuClose");
    $(document).on('click', '.leftMenu ul a', function () {
        Sound("click", "play");
    });
    $(document).on('click', '.submenu', function () {
        $(this).toggleClass("closed opened"); //, 200, "easeOutSine");
    })
    $(document).on('click', '.navigationBar_hamburger, .site-overlay', function () {
        Sound("menuclick", "play");
        $(".left-menu").toggleClass("closed opened");
        if ($(".site-overlay").is(":visible")) $(".site-overlay").hide();
        else {
            $(".site-overlay").show();
        }
    })
    
    $(document).on('expchanged', function() {
        $('.menu_rank__exp').text(Level.myEXP() + ' EXP');
        $('.lvl-current').text(Level.myLvl());
        $('.lvl-next').text(Level.nextLvl());
        $('#player-rank-progress').css('width', Level.progress()+'%');
        $('.menu_rank__next-lvl-exp').text((Level.nextLvlEXP() - Level.myEXP()) + ' to next level');
    })
})