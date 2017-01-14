var openCase = {
    caseId: 0,
    souvenir: false,
    caseOpening: false,
    win: null,
    status: 'init',
    casesCarusel: null,
    scrollSoundOpt: null,
    rareItemsRegExp: new RegExp('(rare|extraordinary)' ,'i'),
    init: function() {
        $(function() {
            $(".openCase").attr("disabled", null);
            
            openCase.casesCarusel = document.getElementById('casesCarusel');
            
            var param = parseURLParams(window.location.href);
            if(typeof param != "undefined") {
                openCase.caseId = param.caseId[0];
                try {
                    openCase.souvenir = param.souvenir[0] == 'true';
                } catch(e) {}
                $("#youCanWin").data('loc-var', {1: cases[openCase.caseId].name})
 
                var opened = getStatistic("case-"+cases[openCase.caseId].name, 0);
                $("#opened").text(opened);

                document.title = "Открытие кейса — " + cases[openCase.caseId].name;

                $(document).on('localizationloaded', function() {
                    openCase.fillCarusel();
                });
            }
            
            
            $('#what-i-can-win-Button').on('click', function(){openCase.whatInCase()});
            
            $(document).on("click", "#double_sell_button", function() {
                var id = $("#double_sell_button").data('id');
                deleteWeapon(id);

                var doublePoints = parseInt($("#double_sell_button").text());
                Player.doubleBalance += doublePoints;
                saveStatistic('doubleBalance', Player.doubleBalance);
                $("#double_sell_button").prop("disabled", true);
                $(".win").addClass("sold-out big");
                Sound("buy");
                if (isAndroid()) {
                    client.sendToAnalytics("Open case", "Selling weapon", "Player has sold weapon for  double points", doublePoints + " double points");
                }
            });
            
            $(document).on("click", ".openCase", function() {
                openCase.openCase();
            });
            
            $(document).on("click", ".closeCase", function() {
                window.location.replace("cases.html");
                caseOpening = false;
            });
        })
    },
    goToCase: function(caseId, souvenir) {
        $("#rank-popup").css('display', 'none');
        $('#special-popup').css('display', 'none');
        if (typeof cases[caseId].minLvl != 'undefined' && Level.myLvl() < cases[caseId].minLvl) {
            $("#rank-popup").css('display', 'block');
            $("[data-loc='low_level'] i").html(cases[caseId].minLvl);
            return false;
        }
        if (cases[caseId].type == "Special") {

            if (parseInt(getStatistic('specialCases', 0)) >= cases[caseId].casesToOpen) {
                window.location.replace("open.html?caseId=" + caseId + ((souvenir) ? "&souvenir=" + souvenir : ''));
            } else {
                $('#special-popup').css('display', 'block');
                var needToOpen = cases[caseId].casesToOpen - parseInt(getStatistic('specialCases', 0));
                $('[data-loc="need_more_cases"] i').text(needToOpen);
                $('#showVideoAd').data();
                $('.js-secretField').text(caseId);
            }
        } else {
            window.location.replace("open.html?caseId=" + caseId + ((souvenir) ? "&souvenir=" + souvenir : ''));
        }
    },
    fillCarusel: function(caseId) {
        caseId = caseId || openCase.caseId;
        var weaponsArray = [];
        if (cases[caseId].weapons)
            weaponsArray = getWeaponsById(cases[caseId].weapons);
        if (cases[caseId].knives)
            weaponsArray = weaponsArray.concat(getWeaponsById(cases[caseId].knives));

        if (weaponsArray.length == 0) {
            if (cases[caseId].regExp) {
                var rg = cases[caseId].regExp;
                for (var i = 0; i < weapons.length; i++) {
                    var weapon = getWeaponById(weapons[i].id);
                    if (RegExp(rg.reg).test(weapon[rg.param]))
                        weaponsArray.push(weapon);
                }
            } else {
                return null;
            }
        }
        
        var caseWeapons = {
            win: {},
            weight: {
                rare:       5,
                covert:     15,
                classified: 20,
                restricted: 25,
                milspec:    50,
                industrial: 60,
                consumer:   70
            }
        };
        caseWeapons.consumer = weaponsArray.filter(function(weapon) {
            return weapon.rarity == 'consumer'
        }).mul(7).shuffle();
        caseWeapons.industrial = weaponsArray.filter(function(weapon) {
            return weapon.rarity == 'industrial'
        }).mul(7).shuffle();
        caseWeapons.milspec = weaponsArray.filter(function(weapon) {
            return weapon.rarity == 'milspec'
        }).mul(5).shuffle();
        caseWeapons.restricted = weaponsArray.filter(function(weapon) {
            return weapon.rarity == 'restricted'
        }).mul(5).shuffle();
        caseWeapons.classified = weaponsArray.filter(function(weapon) {
            return weapon.rarity == 'classified'
        }).mul(4).shuffle();
        caseWeapons.covert = weaponsArray.filter(function(weapon) {
            return weapon.rarity == 'covert'
        }).mul(1).shuffle();
        
        caseWeapons.rare = weaponsArray.filter(function(weapon) {
            return (weapon.rarity == 'rare' || weapon.rarity == 'extraordinary')
        }).mul(1).shuffle();
        
        if (caseWeapons.consumer.length + caseWeapons.industrial.length + caseWeapons.milspec.length + caseWeapons.restricted.length + caseWeapons.classified.length + caseWeapons.covert.length == 0 && caseWeapons.rare.length > 0) {
            caseWeapons.all = caseWeapons.rare;
        } else {
            caseWeapons.all = caseWeapons.consumer.concat(caseWeapons.industrial, caseWeapons.milspec, caseWeapons.restricted, caseWeapons.classified, caseWeapons.covert);
        }
        
        /* === Select the rarity of the win item === */
        
        var total_weights = (function(weight){
            var a = 0;
            for (key in weight) {
                a += Number(weight[key]);
            }
            return a;
        })(caseWeapons.weight);
        
        while (typeof caseWeapons.win == 'undefined' || typeof caseWeapons.win.id == 'undefined') {
            var rnd = Math.rand(0, total_weights);
            var weight_sum = 0;

            for (var i = 0; i < Object.keys(caseWeapons.weight).length; i++) {
                weight_sum += caseWeapons.weight[Object.keys(caseWeapons.weight)[i]];
                weight_sum = +weight_sum.toFixed(2);

                if (rnd <= weight_sum) {
                    caseWeapons.win = caseWeapons[Object.keys(caseWeapons.weight)[i]];
                    caseWeapons.win = caseWeapons.win[Math.floor(Math.random()*caseWeapons.win.length)];
                    break;
                }
            }
        }
        
        caseWeapons.all = caseWeapons.all.shuffle().shuffle();
    
        while (caseWeapons.all.length <= (winNumber + 3)) {
            caseWeapons.all = caseWeapons.all.concat(caseWeapons.all).shuffle().shuffle();
        }

        if (caseWeapons.all.length > winNumber + 3)
            caseWeapons.all.splice(winNumber + 3, caseWeapons.all.length - (winNumber + 3));
        
        
        caseWeapons.all[winNumber] = caseWeapons.win;
        
        for(var i = 0; i < caseWeapons.all.length; i++) {
            caseWeapons.all[i] = new Weapon(caseWeapons.all[i].id);
            if (!openCase.souvenir) {
                caseWeapons.all[i].stattrakRandom();
            } else {
                caseWeapons.all[i].stattrak = false;
                caseWeapons.all[i].souvenir = true;
            }
        }
        
        var el = '';
        caseWeapons.all.forEach(function(weapon, index) {
            var img = weapon.getImgUrl();
            var type = weapon.specialText() + weapon.type;
            var name = weapon.name;

            if (openCase.rareItemsRegExp.test(weapon.rarity)) {
                type = '★ Rare Special Item ★';
                name = '&nbsp;';
                img = '../images/Weapons/rare.png';
            }
            if (weapon.rarity == 'rare')
                img = '../images/Weapons/rare.png';
            el += '<div class="weapon">' +
                '<img src="' + img + '" />' +
                '<div class="weaponInfo ' + weapon.rarity + '"><span class="type">' + type + '<br>' + name + '</span></div>' +
                '</div>'
        })

        openCase.win = caseWeapons.all[winNumber];
        $(".casesCarusel").html(el);
        $(".casesCarusel").css("margin-left", "0px");
    },
    openCase: function() {
        if (openCase.caseOpening || $(".openCase").text() == Localization.getString('open_case.opening')) {
            return false
        };
        $(".win").removeClass("sold-out");
        $(".win").slideUp("slow");
        if ($(".openCase").text() == Localization.getString('open_case.try_again')) {
            openCase.backToZero();
            return false;
        }
        $(".openCase").text(Localization.getString('open_case.opening'));
        $(".openCase").attr("disabled", "disabled");
        //var a = 1431 + 16*24;
        openCase.startScroll();
    },
    startScroll: function() {
        $(".weapons").scrollTop(0);
        var a = 127 * winNumber;
        var l = 131;
        var d = 0,
            s = 0;
        var duration = (Settings.drop) ? 5 : 10,
            marginLeft = -1 * Math.rand(a - 50, a + 60);

        $('.casesCarusel').css({
            'transition': 'all ' + duration + 's cubic-bezier(0.07, 0.49, 0.39, 1)',
            'margin-left': marginLeft + 'px'
            })
        Sound("open", "play", 5);
        
        openCase.status = 'scrolling';
        openCase.scrollSound(marginLeft, (duration*1000));
        
        var type = openCase.win.type;
        //var statTrak = openCase.souvenir ? false : openCase.win.stattrakRandom();
        //openCase.win.souvenir = openCase.souvenir ? true : false;
        var quality = openCase.win.qualityRandom();
        openCase.caseOpening = true;

        var price = openCase.win.getPrice();

        $(".win_name").html(openCase.win.specialText() + openCase.win.type + " | " + openCase.win.name);
        $(".win_quality").html(openCase.win.qualityText());
        $(".win_price").html(price);
        $(".win_img").attr("src", getImgUrl(openCase.win.img, 1));
        $(".openCase").prop("disabled", true);
        $("#double_sell_button").text((price * 100).toFixed(0));

        var anim = document.getElementById('casesCarusel');
        anim.addEventListener("transitionend", openCase.endScroll, false);
        anim.addEventListener("webkitTransitionEnd", openCase.endScroll, false);
    },
    endScroll: function() {
        if (openCase.status == 'scrollBack')
            return false;
        $("#opened").text(parseInt($("#opened").text()) + 1);                        

        $("#double_sell_button").prop("disabled", false);
        openCase.win['new'] = true;
        saveWeapon(openCase.win).then(function(result) {
            console.log(result);
            $("#double_sell_button").data('id', result);
        });
        Sound("close", "play", 5);
        $(".openCase").text(Localization.getString('open_case.try_again'));
        //$(".win").slideDown("fast");
        $('.win').show();
        openCase.caseOpening = false;
        $(".openCase").prop("disabled", false);
        $(".weapons").scrollTop(160);
        
        openCase.status = 'endScroll';

        //Statistic
        Level.addEXP(1);

        statisticPlusOne('case-' + cases[openCase.caseId].name);
        statisticPlusOne('weapon-' + openCase.win.rarity);
        if (openCase.win.stattrak)
            statisticPlusOne('statTrak');

        var param = parseURLParams(window.location.href);
        if (typeof param != "undefined") {
            var fromAd = 0;
            try {
                fromAd = parseInt(param.fromAd[0]);
            } catch (e) {}

            if (cases[openCase.caseId].type == 'Special') {
                if (!fromAd) {
                    var need = getStatistic('specialCases', 0) - cases[openCase.caseId].casesToOpen;
                    need = (need < 0) ? 0 : need;
                    saveStatistic('specialCases', need);
                }
                if (getStatistic('specialCases', 0) < cases[openCase.caseId].casesToOpen)
                    $('.openCase').attr("disabled", "disabled");
            } else {
                statisticPlusOne('specialCases');
            }
        } else {
            statisticPlusOne('specialCases');
        }
    },
    backToZero: function() {
        openCase.status = 'scrollBack';
        $(".casesCarusel").children(".weapon").addClass("animated fadeOutDown");
        $('.casesCarusel').css({
            'transition': 'all 0.9s cubic-bezier(0.07, 0.49, 0.39, 1)',
            'margin-left': '0px'
        });
        openCase.sleep(1000).then(function(){
            $(".casesCarusel").empty();
            openCase.fillCarusel();
            openCase.startScroll();
        })
    },
    scrollSound: function (offset, speed) {
        openCase.scrollSoundOpt = {
            start: openCase.casesCarusel.getBoundingClientRect().left,
            count: 0
        };
        
        try{
            if (openCase.status == 'scrolling') {
                window.requestAnimationFrame(playScrollSound);
            }
        } catch(e){}

        function playScrollSound() {
            var left = openCase.casesCarusel.getBoundingClientRect().left;
            left -= openCase.scrollSoundOpt.start;
            left += 131 * 1.5;
            
            if (-1*left - 131 * openCase.scrollSoundOpt.count > 0) {
                ++openCase.scrollSoundOpt.count;
                Sound('scroll');
            }
            
            if (openCase.status == 'scrolling')
                window.requestAnimationFrame(playScrollSound);
        }
        
    },
    whatInCase: function(caseId) {
        caseId = caseId || openCase.caseId;
        var rare = false;
        var weaponsArray = [];
        if (cases[caseId].weapons)
            weaponsArray = getWeaponsById(cases[caseId].weapons);
        if (cases[caseId].knives)
            weaponsArray = weaponsArray.concat(getWeaponsById(cases[caseId].knives));
        if (weaponsArray.length == 0) {
            if (cases[caseId].regExp) {
                var rg = cases[caseId].regExp;
                for (var i = 0; i < weapons.length; i++) {
                    var weapon = getWeaponById(weapons[i].id);
                    if (RegExp(rg.reg).test(weapon[rg.param]))
                        weaponsArray.push(weapon);
                }
            } else {
                return null;
            }
        }
        
        for (var i = 0; i < weaponsArray.length; i++) {
            var weapon = new Weapon(weaponsArray[i].id);
            if (openCase.rareItemsRegExp.test(weapon.rarity) && rare == true)
                continue;
            var img = getImgUrl(weapon.img);

            var type = weapon.type;
            var name = weapon.name;

            var name = getSkinName(weaponsArray[i].skinName, Settings.language);
            if (openCase.rareItemsRegExp.test(weapon.rarity)) {
                type = '★ Rare Special Item ★';
                name = '&nbsp;';
                img = '../images/Weapons/rare.png';
                rare = true;
            }
            var weaponInfo = "<img src=\"" + img + "\"><div class='weaponInfo " + weapon.rarity + "'><span class='type'>" + type + "<br>" + name + "</span></div>";
            $(".weaponsList").append("<li class='weapon animated fadeInDown'>" + weaponInfo + "</li>");
        }
        $(".weaponsList").css("display", "block");
        $("#youCanWin").css("display", "block");
        $('#what-i-can-win-Button').css('display', 'none');
    },
    sleep: function(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    }
}