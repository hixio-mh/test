var results = require("./spinking_result.js");
var Spins = require("./spins.js");
exports.results = results;
var caseOpening = false;
var betLimit = 1000000;

$(function() {
    for (var i = 0; i < Spins.length; i++)
        Spins[i].id = i;

    $('#bet').val('0');
    $('#balance').text(Player.doubleBalance.toFixed(0));
    $("#bet").keydown(function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    fillCarusel();
    fillItems();
})

function newGame() {
    $("#spin").prop("disabled", false);
    fillCarusel();
}
exports.newGame = newGame;

function fillCarusel() {
    $(".casesCarusel").empty();
    var arr = [];
    for (var key in Spins) {
        arr[key] = Spins[key];
    }
    while (arr.length < winNumber + 3) {
        arr = arr.concat(arr.shuffle());
    }
    if (arr.length > winNumber + 3)
        arr.splice(winNumber + 3, arr.length - (winNumber + 3));

    var carusel = "";
    arr.forEach(function(item, i) {
        var img = "../images/spinking/icons/" + arr[i].img;
        var bg = "bg-" + arr[i].rarity;
        var style = typeof arr[i].imgStyles != "undefined" ? "style='" + arr[i].imgStyles + "'" : "";

        carusel += "<div class='weapon spinking " + bg + " animated fadeInDown' data-id=" + arr[i].id + ">" +
            "<div class='img-holder'><img src='" + img + "' " + style + "></div>" + (typeof arr[i].xCounter != "undefined" ? "<span class='xCounter'>" + arr[i].xCounter + "</span>" : "") + "<div class='weaponInfo'><span class='spinking-item-name'>" + arr[i].name[Settings.language] + "</span><span class='spinking-item-descr'>" + arr[i].description[Settings.language] + "</span></div></div>";
    })

    $(".casesCarusel").html(carusel);
    $(".casesCarusel").css("margin-left", "0px");
    setTimeout(function() {
        $(".casesCarusel .weapon").removeClass("animated fadeInDown");
    }, 1000);
}

function spin() {
    var win = getResult();
    console.log(win.name.RU);
    $($(".casesCarusel").children(".weapon")[winNumber]).replaceWith(resultToHTML(win));
    var a = 127 * winNumber;
    var l = 131;
    var d = 0,
        s = 0;
    var progress_animate = 0;
    jQuery.fx.interval = 10;
    $(".casesCarusel").animate({
        marginLeft: -1 * Math.rand(a - 48, a + 75)
    }, {
        duration: 10000,
        easing: 'easeOutSine',
        start: function() {
            $("#spin").prop("disabled", true);
            $("#bet").prop("disabled", true);
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
            //$(".win").slideDown("fast");
            caseOpening = false;
            if (win.code != "")
                eval(win.code);
            $("#spin").attr("onclick", "spinking.buttonSpin(true);");
            $("#spin").prop("disabled", false);
            $("#bet").prop("disabled", false);
            //$(".openCase").attr("disabled", null);
            //$(".weapons").scrollTop(185);

            //Statistic
            //changePoints(1);

        },
        always: function() {
            // $(".openCase").attr("disabled", null);
            caseOpening = false;
        }
    })
}
exports.spin = spin;

function buttonSpin(respin) {
    respin = respin || false;
    var bet = getBet();
    if (bet == 0) return false;

    if (bet > Player.doubleBalance) bet = Player.doubleBalance;
    $("#bet").val(bet);
    Player.doubleBalance -= bet;
    $("#balance").text(Player.doubleBalance);
    saveStatistic('doubleBalance', Player.doubleBalance, 'Number');
    if (!respin)
        spin();
    else
        results.retry();
}
exports.buttonSpin = buttonSpin;

//exports.retry = retry;

function resultToHTML(result) {
    var style = typeof result.imgStyles != "undefined" ? "style='" + result.imgStyles + "'" : "";
    var html = "<div class='weapon spinking bg-" + result.rarity + "' data-id=" + result.id + ">" +
        "<div class='img-holder'><img src='../images/spinking/icons/" + result.img + "' " + style + "></div>" + (typeof result.xCounter != "undefined" ? "<span class='xCounter'>" + result.xCounter + "</span>" : "") + "<div class='weaponInfo'><span class='spinking-item-name'>" + result.name[Settings.language] + "</span><span class='spinking-item-descr'>" + result.description[Settings.language] + "</span></div></div>";
    return html;
}

function getResult() {
    var sumChances = 0;
    for (var i = 0; i < Spins.length; i++)
        sumChances += Spins[i].chance;

    for (var i = 0; i < Spins.length; i++) {
        var weight = Spins[i].chance / sumChances;
        Spins[i].weight = weight;
    }
    var sumWeights = 0;
    for (var i = 0; i < Spins.length; i++)
        sumWeights += Spins[i].weight;

    var cursor = 0;
    var random = Math.random();
    for (var i = 0; i < Spins.length; i++) {
        cursor += Spins[i].weight / sumWeights;
        if (cursor >= random)
            return Spins[i];
    }
}

$(document).on('click', '.add-to-bet', function() {
    var plus = $(this).data('bet');
    var val = parseInt($('#bet').val());
    if (isNaN(val)) val = 0;
    switch (plus) {
        case 'clear':
            $('#bet').val('0');
            break
        case 'max':
            $('#bet').val(betLimit);
            break
        case 'x2':
            val *= 2;
            val = val > betLimit ? betLimit : val;
            $('#bet').val(val);
            break
        case '1/2':
            val = val || 1;
            val /= 2;
            $('#bet').val(Math.round(val));
            break
        default:
            val += parseInt(plus);
            $('#bet').val(val);
    }
    if (parseInt($("#bet").val()) > betLimit) $('#bet').val(betLimit);
    if (parseInt($("#bet").val()) > Player.doubleBalance) $('#bet').val(Player.doubleBalance);
    if (Player.doubleBalance <= 0) {
        $('#balance').addClass('animated flash');
        setTimeout(function() {
            $('#balance').removeClass('animated flash')
        }, 1000);
    }
});

function getBet() {
    var bet = parseInt($("#bet").val());
    if (bet < 0) bet = 0;
    return bet;
}
exports.getBet = getBet;

function getRandomWeapon(specialClass) {
    if (typeof specialClass == 'undefined') specialClass = 0;
    var randomCaseId = Math.rand(0, cases.length - 1);

    if ((specialClass == 0) && (typeof cases[randomCaseId].specialClass != "undefined")) {
        randomCaseId = Math.rand(0, cases.length - 1);
        while (typeof cases[randomCaseId].specialClass != "undefined") {
            randomCaseId = Math.rand(0, cases.length - 1);
        }
    }
    var randomWeaponId = Math.rand(0, cases[randomCaseId].weapons.length - 1);
    var wp = cases[randomCaseId].weapons[randomWeaponId]

    if (typeof cases[randomCaseId].canBeSouvenir != 'undefined' && cases[randomCaseId].canBeSouvenir)
        wp.type = (Math.rand(0, 10) > 7) ? Localization.souvenir[Settings.language] + ' ' + wp.type : wp.type;

    return cases[randomCaseId].weapons[randomWeaponId];
}
exports.getRandomWeapon = getRandomWeapon;

function fillItems() {
    var allItems = "";
    for (var i = 0; i < Spins.length; i++) {
        allItems += "<li class='weapon spinking bg-" + Spins[i].rarity + " animated fadeInUp'><div class='img-holder'><img src='../images/spinking/icons/" + Spins[i].img + "' " + (typeof Spins[i].imgStyles != "undefined" ? "style='" + Spins[i].imgStyles + "'" : "") + "></div>" + (typeof Spins[i].xCounter != "undefined" ?
                "<span class='xCounter'>" + Spins[i].xCounter + "</span>" : "") +
            "<div class='weaponInfo'><span class='spinking-item-name'>" + Spins[i].name[Settings.language] + "</span><span class='spinking-item-descr'>" + Spins[i].description[Settings.language] + "</span></div></li>";
    }
    $(".winList").html(allItems);
};
