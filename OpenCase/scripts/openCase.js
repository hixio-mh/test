
var caseId = 0;
var souvenirCase = false;
var caseOpening = false;

$(".openCase").attr("disabled", null);

$(document).on("click", ".case", function() {
    $("#rank-popup").css('display', 'none');
    $('#special-popup').css('display', 'none');
    caseId = $(this).data('case-id');
    souvenir = $(this).data('souvenir');
    if (typeof cases[caseId].minRank != 'undefined' && getRank().id < getRankByName(cases[caseId].minRank).id) {
        needRank = getRankByName(cases[caseId].minRank);
        $("#rank-popup").css('display', 'block');
        $("#rank").html('<img src="' + needRank.img + '" style="width: 50px;">');
        return false;
    }
    if (cases[caseId].type == "Special") {

        if (parseInt(getStatistic('specialCases', 0)) >= cases[caseId].casesToOpen) {
            window.location.replace("open.html?caseId=" + caseId + ((souvenir) ? "&souvenir=" + souvenir : ''));
        } else {
            $('#special-popup').css('display', 'block');
            var needToOpen = cases[caseId].casesToOpen - parseInt(getStatistic('specialCases', 0));
            $('#special').text(needToOpen);
            $('#showVideoAd').data();
            $('.js-secretField').text(caseId);
        }
    } else {
        window.location.replace("open.html?caseId=" + caseId + ((souvenir) ? "&souvenir=" + souvenir : ''));
    }
});
$(document).on('click', '#closePopup', function() {
    $('.popup').css('display', 'none');
});

function fillCarusel(caseId) {
    var c0 = cases[caseId].weapons.filter(function(weapon) {
        return weapon.rarity == 'consumer'
    }).mul(7).shuffle();
    var a0 = cases[caseId].weapons.filter(function(weapon) {
        return weapon.rarity == 'industrial'
    }).mul(7).shuffle();
    var a1 = cases[caseId].weapons.filter(function(weapon) {
        return weapon.rarity == 'milspec'
    }).mul(5).shuffle();
    var a2 = cases[caseId].weapons.filter(function(weapon) {
        return weapon.rarity == 'restricted'
    }).mul(5).shuffle();
    var a3 = cases[caseId].weapons.filter(function(weapon) {
        return weapon.rarity == 'classified'
    }).mul(4).shuffle();
    var a4 = cases[caseId].weapons.filter(function(weapon) {
        return weapon.rarity == 'covert'
    }).mul(1).shuffle();
    var a5 = cases[caseId].weapons.filter(function(weapon) {
        return weapon.rarity == 'rare'
    }).mul(1).shuffle();

    if ((Math.rand(0, 10) > 7) && (a5.length + a4.length + a2.length + a1.length != 0)) {
        a3 = [];
    }
    if ((Math.rand(0, 10) > 5) && (a5.length + a3.length + a2.length + a1.length != 0)) {
        a4 = [];
    }
    if ((Math.rand(0, 10) > 1) && (a4.length + a3.length + a2.length + a1.length != 0)) {
        a5 = [];
    }

    if (c0 == undefined) {
        var arr = a0.concat(a1, a2, a3, a4, a5).shuffle().shuffle().shuffle();
    } else {
        var arr = c0.concat(a0, a1, a2, a3, a4, a5).shuffle().shuffle().shuffle();
    }
    var el = '';
    while (arr.length <= (winNumber + 3)) {
        arr = arr.concat(a1, a2, a3, a4).shuffle().shuffle();
    }

    if (arr.length > winNumber + 3)
        arr.splice(winNumber + 3, arr.length - (winNumber + 3));
    arr.forEach(function(item, index) {
        var img = getImgUrl(item.img);
        var type = item.type;
        if (type.indexOf("|") != -1) {
            type = type.split("|")[1]
        }

        type = $.trim(type.replace(/(Сувенир|Souvenir)/gi, ''));
        if (souvenirCase && !type.match(/(Сувенир|Souvenir)/))
            type = Localization.souvenir[Settings.language] + ' ' + type;

        type = type.replace(/(Сувенир |Souvenir ){2,}/, Localization.souvenir[Settings.language] + ' ')

        if (item.rarity == 'rare') {
            type = '★ Rare Special Item ★';
            name = '&nbsp;';
            img = '../images/Weapons/rare.png';
        } else {
            var name = getSkinName(item.skinName, Settings.language);
        }
        if (item.rarity == 'rare')
            img = '../images/Weapons/rare.png';
        el += '<div class="weapon">' +
            '<img src="' + img + '" />' +
            '<div class="weaponInfo ' + item.rarity + '"><span class="type">' + type + '<br>' + name + '</span></div>' +
            '</div>'
    })

    win = arr[winNumber];
    $(".casesCarusel").html(el);
    $(".casesCarusel").css("margin-left", "0px");
}

$(document).on("click", ".openCase", function() {
    $(".weapons").scrollTop(0);
    if (caseOpening || $(".openCase").text() == Localization.openCase2.opening[Settings.language]) {
        return false
    };
    $(".win").removeClass("sold-out");
    $(".win").slideUp("slow");
    if ($(".openCase").text() == Localization.openCase2.tryAgain[Settings.language]) {
        backToZero()
    }
    $(".openCase").text(Localization.openCase2.opening[Settings.language]);
    $(".openCase").attr("disabled", "disabled");
    //var a = 1431 + 16*24;
    var a = 127 * winNumber;
    var l = 131;
    var d = 0,
        s = 0;
    var duration = (Settings.drop) ? 5000 : 10000;
    $(".casesCarusel").animate({
        marginLeft: -1 * Math.rand(a - 50, a + 60)
    }, {
        duration: duration,
        easing: 'easeOutCubic',
        start: function() {
            Sound("open", "play", 5);
            var type = win.type;
            var name = getSkinName(win.skinName, Settings.language);
            win.skinName = name;
            var statTrak = ifStatTrak(type, win.skinName);
            var quality = getItemQuality()[Settings.language == 'RU' ? 1 : 0];
            caseOpening = true;

            if (type.indexOf("|") != -1) {
                type = type.split("|")[1]
            }
            type = $.trim(type.replace(/(Сувенир|Souvenir)/gi, ''));
            if (souvenirCase && !type.match(/(Сувенир|Souvenir)/))
                type = Localization.souvenir[Settings.language] + ' ' + type;

            win.statTrak = statTrak;
            win.type = type;
            win.quality = quality;
            
            //try {
                /*win.price = getPrice(win.type, win.skinName, win.quality, win.statTrak);
                
                if (win.price == 0)
                    getMarketPrice(type, name, quality, statTrak, ".win_price");*/
   
            //} catch (e) {
                 type = type.replace(/(Сувенир |Souvenir ){2,}/, Localization.souvenir[Settings.language] + ' ')

                var price = getPrice(type, name, quality, statTrak);
                
                if (price == 0) {
                    for (var i = 0; i < Quality.length; i++) {
                        quality = Quality[i].name[Settings.language == 'RU' ? 1 : 0];
                        quality = getQualityName(quality, Settings.language);
                        price = getPrice(type, name, quality, statTrak);
                        if (price != 0) break;
                    }

                    if (price == 0) {
                        statTrak = !statTrak;

                        for (var i = 0; i < Quality.length; i++) {
                            quality = Quality[i].name[Settings.language == 'RU' ? 1 : 0];
                            quality = getQualityName(quality, Settings.language);
                            price = getPrice(type, name, quality, statTrak);
                            if (price != 0) break;
                        }
                    }
                }
                if (price == 0) {
                    getMarketPrice(win.type, win.skinName, win.quality, win.statTrak, ".win_price");
                } else {
                    win.statTrak = statTrak;
                    win.quality =  quality;
                    win.price = price;
                }
            //}

            $(".win_price").html(win.price + "$");
            
            /*if (win.statTrak) {
                win.type = win.type.indexOf('StatTrak' == -1) ? "StatTrak™ " + win.type : win.type;
            }*/
            
            $(".win_name").html((win.statTrak ? "StatTrak™ " : "")+ win.type + " | " + win.skinName);
            $(".win_quality").html(win.quality);
            $(".win_img").attr("src", getImgUrl(win.img, 1));
            $(".openCase").attr("disabled", "disabled");
            $("#double_sell_button").text((win.price * 100).toFixed(0));
            //getInventory();

        },
        progress: function(e, t) {
            if (Settings.sounds) {
                progress_animate = Math.round(100 * t),
                    s = parseInt(parseInt($(".casesCarusel").css("marginLeft").replace(/[^0-9.]/g, "") - l / 2) / l),
                    s > d && (Sound("scroll", "play"),
                        d++)
            }

        },
        complete: function() {
            $("#opened").text(parseInt($("#opened").text()) + 1);
            var price = parseFloat($(".win_price").html());
            if (isNaN(price))
                price = 0;
            win.price = price;
            $("#double_sell_button").text((price * 100).toFixed(0));
            $("#double_sell_button").prop("disabled", false);
            win['new'] = true;
            inventory.push(win);
            if (isAndroid())
                saveWeapon(win);
            else
                saveInventory();
            Sound("close", "play", 5);
            $(".openCase").text(Localization.openCase2.tryAgain[Settings.language]);
            $(".win").slideDown("fast");
            caseOpening = false;
            $(".openCase").attr("disabled", null);
            $(".weapons").scrollTop(185);

            //Statistic
            Level.addEXP(1);

            var caseId = $("#youCanWin span").text();
            statisticPlusOne('case-' + caseId);
            statisticPlusOne('weapon-' + win.rarity);
            if (win.statTrak)
                statisticPlusOne('statTrak');

            var param = parseURLParams(window.location.href);
            if (typeof param != "undefined") {
                caseId = param.caseId[0];
                var fromAd = 0;
                try {
                    fromAd = parseInt(param.fromAd[0]);
                } catch (e) {}

                if (cases[caseId].type == 'Special') {
                    if (!fromAd) {
                        var need = getStatistic('specialCases', 0) - cases[caseId].casesToOpen;
                        need = (need < 0) ? 0 : need;
                        saveStatistic('specialCases', need);
                    }
                    if (getStatistic('specialCases', 0) < cases[caseId].casesToOpen)
                        $('.openCase').attr("disabled", "disabled");
                } else {
                    statisticPlusOne('specialCases');
                }
            } else {
                statisticPlusOne('specialCases');
            }
        },
        always: function() {
            // $(".openCase").attr("disabled", null);
            caseOpening = false;
        }
    })
})

function backToZero() {
    var l = 131;
    var s = 0,
        d = 0;
    $(".casesCarusel").animate({
        marginLeft: 0
    }, {
        duration: 1000,
        easing: "easeOutQuad",
        start: function() {
            fillCarusel(caseId);
            //caseBackAudio.play();
        },
        always: function() {
            //$(".openCase").attr("disabled", null);
            caseOpening = false;
        }
    })
}

$(document).on("click", "#double_sell_button", function() {
    if (isAndroid()) {
        var special = "where ID=(select max(ID) from Inventory)";
        var weapon = getInventory(1, 1, special)[0];
        console.log("weapon: " + weapon);
        if (typeof weapon != undefined) {
            deleteWeapon(weapon.id);
        }
    } else {
        inventory.splice(inventory.length - 1, 1);
        saveInventory();
    }
    var doublePoints = parseInt($("#double_sell_button").text());
    Player.doubleBalance += doublePoints;
    saveStatistic('doubleBalance', Player.doubleBalance);
    $("#double_sell_button").prop("disabled", true);
    $(".win").addClass("sold-out big");
    Sound("buy");
    if (isAndroid()) {
        client.sendToAnalytics("Open case", "Selling weapon", "Player has sold weapon for  double points", doublePoints + " double points");
    }
})

$(document).on("click", ".closeCase", function() {
    window.location.replace("cases.html");
    caseOpening = false;
})
