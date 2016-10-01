
var itemsAccepted = 0;
var totalMoney = 0.00;
var timerId;
var botMinDec = 5000,
    botMaxDec = 10000;
var maxItems = 15;
var itemsLimit = 50;
var usedName = [];
var usedImages = [];
var PlayersInGame = [];
var ItemsInGame = [];
var ifCarusel = false;
var lastTicket = 0,
    winnerTicket = 0;
var ticketsRegExp = /(\d)(?=(\d\d\d)+([^\d]|$))/g;
var PlayerInGame = false;
var priceRange = {
    min: parseFloat($('#diffuculty option:selected').data('min')),
    max: parseFloat($('#diffuculty option:selected').data('max'))
};

//DEBUG
var DEBUG = false;

try {
    var bar = new ProgressBar.Circle(circle, {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 1000,
        color: '#b50606',
        trailColor: '#fff',
        trailWidth: 2,
        svgStyle: null,
        text: {
            value: '0/' + itemsLimit,
            alignToBottom: false
        }
    });

    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
} catch (err) {
    //ERR
}

function newGame() {
    clearTimeout(timerId);
    ifCarusel = false;
    $(".win").slideUp("slow");
    bar.animate(0);
    bar.setText("0/" + itemsLimit + "<hr><s>$0</s>");
    $("#addItems").prop("disabled", false);
    itemsAccepted = 0;
    totalMoney = 0;
    lastTicket = 0;
    PlayerInGame = false;

    $(".items li").remove();

    $("#players").html("");
    $(".casesCarusel").html("");

    $('#diffuculty').prop('disabled', false);

    PlayersInGame = [];
    ItemsInGame = [];

    {
        marginLeft: 0
    }

    timerId = setTimeout(function() {
        botAddItems()
    }, Math.rand(botMinDec, botMaxDec));
}

$("#addItems").on("click", function() {
    inventory = inventory.sort(function(a, b) {
        return b.price - a.price;
    });
    Sound("additems", "play");
    fillInventory();
});

$('#diffuculty').change(function() {
    var minPrice = parseFloat($('#diffuculty option:selected').data('min'));
    var maxPrice = parseFloat($('#diffuculty option:selected').data('max'));

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    newGame();
});

function addItems(fromName, fromImg, itemCount, itemsCost) {
    var okon = ["предмет", "предмета", "предмета", "предмета", "предметов"];
    itemsAccepted += itemCount;
    var step = itemsAccepted * 100 / itemsLimit / 100;
    var value = itemCount - 1;
    //step += bar.value();
    if (step > 1) {
        step = 1
    }
    totalMoney += +Math.round(parseFloat(itemsCost) * 100) / 100;
    totalMoney = +Math.round(parseFloat(totalMoney) * 100) / 100;
    bar.setText(itemsAccepted + '/' + itemsLimit + '<hr><s>$' + totalMoney + '</s>');
    bar.animate(step);

    if (itemCount > 5) value = 4;


    if (Settings.language == "RU")
        $("#status").html(fromName + " внес " + itemCount + " " + okon[value] + " (~" + parseFloat(itemsCost).toFixed(2) + "$)");
    else if (Settings.language == "EN")
        $("#status").html(fromName + " added " + itemCount + " " + ((itemCount == 1) ? "item" : "items") + " (~$" + parseFloat(itemsCost).toFixed(2) + ")");

    var players = '';
    for (var i = 0; i < PlayersInGame.length; i++) {
        var chance = 0.0;
        chance = parseFloat(Math.round((PlayersInGame[i].itemsCost * 100) / totalMoney * 100) / 100);
        players += "<span class='playerAva'  data-nick='" + PlayersInGame[i].nick + "'><img src='../images/ava/" + PlayersInGame[i].avatar + "'><p>" + chance + "%</p></span>";
        PlayersInGame[i].chance = chance;
    }
    $("#players").html(players);

    clearTimeout(timerId);
    if (itemsAccepted >= itemsLimit) {
        startGame()
    }

    if (ifCarusel == false) {
        timerId = setTimeout(function() {
            botAddItems()
        }, Math.rand(botMinDec, botMaxDec));
    }
}

function startGame() {
    $("#addItems").prop("disabled", true);
    $('#diffuculty').prop('disabled', true);

    winNumber = 35;

    ifCarusel = true;

    var arr = [];
    for (var i = 0; i < PlayersInGame.length; i++) {
        var count = parseInt(PlayersInGame[i].chance);
        for (var z = 0; z < count; z++) {
            arr.push(PlayersInGame[i]);
        }
    }
    arr = arr.shuffle().shuffle().shuffle();
    if (arr.length > winNumber + 3)
        arr.splice(winNumber + 3, arr.length - (winNumber + 3));
    var el = '';

    arr[winNumber] = getJackpotWiner();

    arr.forEach(function(item, index) {
        var img = '../images/ava/' + item.avatar;

        el += '<span class="playerAva">' +
            '<img src="' + img + '" />' +
            '</span>'
    })
    win = arr[winNumber];
    $(".casesCarusel").html(el);
    $(".casesCarusel").css("margin-left", "0px");

    var a = 141 * winNumber - 141;
    var l = 141;
    var d = 0,
        s = 0;
    $(".casesCarusel").animate({
        marginLeft: -1 * Math.rand(a - 70, a + 15)
    }, {
        duration: 7000,
        easing: 'easeInOutCubic',
        start: function() {
            //caseOpenAudio.play();
            //caseOpening = true;
            $(".closeInventory").click();

            $(".win").html("<img src='../images/ava/" + win.avatar + "'><span class='win__title'>" + Localization.jackpot2.winner[Settings.language] + "</span><span class='win__nick'>" + win.nick + "</span><span class='win__chance'>" + win.chance + "%</span><span class='win__ticket'><i class='fa fa-ticket'></i> " + ('' + parseInt(winnerTicket)).replace(ticketsRegExp, '$1&#8198;') + "</span>");

            if (win.nick == Player.nickname) {
                for (var i = 0; i < ItemsInGame.length; i++) {
                    if (isAndroid())
                        saveWeapon(ItemsInGame[i]);
                    else
                        inventory.push(ItemsInGame[i]);

                }
                if (!isAndroid())
                    saveInventory();

                //Statistic
                statisticPlusOne('rulet-wins');
                changePoints(2);

                var a = getStatistic('rulet-max-win');

                var winSum = parseFloat($('.progressbar-text s').text().substr(1));
                if (typeof a == "undefined")
                    a = winSum;
                else
                    a = winSum > parseFloat(a) ? winSum : parseFloat(a);
                saveStatistic('rulet-max-win', a);
            } else {
                if (PlayerInGame) {
                    statisticPlusOne('rulet-loose');
                    changePoints(-1);
                }
            }
        },
        progress: function(e, t) {
            /*progress_animate = Math.round(100 * t),
            s = parseInt(parseInt($(".casesCarusel").css("marginLeft").replace(/[^0-9.]/g, "") - l / 2) / l),
            s > d && (caseScrollAudio.pause(),caseScrollAudio.currentTime = 0,
            caseScrollAudio.play(),
            d++)*/
        },
        complete: function() {
            $(".win").show();
            var timerId2 = 0;
            $($('.casesCarusel').children('.playerAva')[winNumber]).addClass('winnerAnimation');
            checkInventoryForNotification();
            timerId2 = setTimeout(function() {
                newGame();
            }, 7000);
        },
    })
}

function getJackpotWiner() {
    var random = Math.rand(1, lastTicket);
    winnerTicket = random;

    try {
        if (hex_md5(Player.nickname) == Cheats.winEveryTime) {
            for (var i = 0; i < PlayersInGame.length; i++) {
                if (PlayersInGame[i].nick == Player.nickname)
                    return PlayersInGame[i];
            }
        }
    } catch (e) {
        //something went wrong
    }


    for (var i = 0; i < PlayersInGame.length; i++) {
        if ((PlayersInGame[i].tickets.from < random) && (random < PlayersInGame[i].tickets.to)) {
            var log = [
                ["Победил", PlayersInGame[i].nick],
                ["Билеты от", PlayersInGame[i].tickets.from],
                ["Билеты до", PlayersInGame[i].tickets.to],
                ["Случайное число", random]
            ];
            if (DEBUG) console.table(log);
            return PlayersInGame[i];
        }
    }
}

function botAddItems() {
    if (ifCarusel == false) {
        var botName = getRandomBotName();
        var botImg = getRandomBotImg();
        var botWeapons = [];
        var itemsCost = 0.00;
        var qual, st, price;
        var rand = Math.rand(1, maxItems);

        while (botWeapons.length < rand) {
            var weapon = getRandomWeapon(1);
            weapon.quality = getItemQuality()[Settings.language == 'RU' ? 1 : 0];
            weapon.statTrak = ifStatTrak(weapon.type, weapon.skinName);
            var price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
            if (price > priceRange.min)
                if (price < priceRange.max)
                    if (price != 0) {
                        weapon.price = price;
                        botWeapons.push(weapon);
                    }
        }
        for (var i = 0; i < botWeapons.length; i++) {

            var z = 0;
            while (weapon.price == 0) {
                botWeapons[i].quality = Quality[z].name[Settings.language == 'RU' ? 1 : 0];
                botWeapons[i].price = getPrice(botWeapons[i].type, botWeapons[i].skinName, botWeapons[i].quality, botWeapons[i].statTrak);
                if (z == 4) break;
                z++
            }
            itemsCost += +botWeapons[i].price;
        }
        Sound("additems", "play");
        PlayersInGame.push({
            "nick": botName,
            "avatar": botImg,
            "chance": "0",
            "itemsCost": itemsCost,
            "tickets": {
                "from": lastTicket + 1,
                "to": (itemsCost * 100) + lastTicket + 1
            }
        });
        itemsList(botName, botImg, PlayersInGame[PlayersInGame.length - 1].tickets, itemsCost, botWeapons);
        lastTicket += (itemsCost * 100);
        addItems(botName, botImg, botWeapons.length, itemsCost);
    }
};

function itemsList(fromName, fromImg, tickets, itemsCost, weapons) {
    if (typeof weapons == 'undefined' || weapons.length == 0) return false;
    var bet = "<li class='game-bet animated zoomIn'><div class='game-bet__info'><div class='game-bet__player'><img src='../images/ava/" + fromImg + "'>" + fromName + "</div><div class='game-bet__tickets'><span class='game-bet__tickets__price'>$" + itemsCost.toFixed(2) + "</span><i class='fa fa-ticket'></i> " + ('' + parseInt(tickets.from)).replace(ticketsRegExp, '$1&#8198;') + " - " + ('' + parseInt(tickets.to)).replace(ticketsRegExp, '$1&#8198;') + "</div></div></div>" +
        "<div class='bet-items " + (weapons.length > 4 ? "hide-items" : "") + "'><div colspan=2>";
    for (var i = 0; i < weapons.length; i++) {
        var weapon = weapons[i];
        var statTrak = (weapon.statTrak == true) ? "StatTrak™ " : "";
        weapon.skinName = getSkinName(weapon.skinName);
        var img = getImgUrl(weapon.img);

        if (weapon.price == 0) weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);

        var newItem = "<div class='bet-items__item'><img src='" + img + "'><div class='bet-items__item__rarity " + weapon.rarity + "'></div><span class='bet-items__item__price'>$" + weapon.price + "</span></div>";
        bet += newItem;

        var item = weapon;
        item.new = true;
        ItemsInGame.push(item);
    }
    bet += "</div></div>";
    $(bet).hide().prependTo(".items").slideToggle();
    //$(".items").prepend(bet);
}

$(document).on('click', '.hide-items, .show-items', function() {
    $(this).toggleClass('hide-items show-items');
})

$(".choseItems").on("click", function() {
    var itemsCount = $(".inventoryItemSelected").length;
    var playerWeapons = [];
    var ids = [];
    var itemsCost = 0;
    if (itemsCount != 0) {

        if (isAndroid()) {
            $(".inventoryItemSelected").each(function() {
                playerWeapons.push(getWeapon(parseInt($(this).data('id'))));
                itemsCost += getWeapon(parseInt($(this).data('id'))).price;
                //ids.push(parseInt(this.id));
                deleteWeapon($(this).data('id'));
            })
        } else {
            $(".inventoryItemSelected").each(function() {
                playerWeapons.push(inventory[parseInt(this.id)]);
                itemsCost += inventory[parseInt(this.id)].price;
                ids.push(parseInt(this.id));
            })
        }
        PlayersInGame.push({
            "nick": Player.nickname,
            "avatar": Player.avatar,
            "chance": "0",
            "itemsCost": itemsCost,
            "tickets": {
                "from": lastTicket + 1,
                "to": (itemsCost * 100) + lastTicket + 1
            }
        });
        lastTicket += (itemsCost * 100);
        if (!isAndroid()) {
            for (var i = 0; i < ids.length; i++) {
                var d = ids[ids.length - i - 1];
                inventory.splice(d, 1);
            }
            saveInventory();
        }

        itemsList(Player.nickname, Player.avatar, PlayersInGame[PlayersInGame.length - 1].tickets, itemsCost, playerWeapons);
        Sound("additems", "play");
        addItems(Player.nickname, Player.avatar, itemsCount, itemsCost);
        $("#addItems").prop("disabled", true);
        $('#diffuculty').prop('disabled', true);
        $(".closeInventory").click();
        PlayerInGame = true;
    }
})

function FillMyInventoryWithRandomWeapon(count) {
    while (count--) {
        var weapon = getRandomWeapon(1)
        weapon.quality = getItemQuality()[1];
        weapon.statTrak = ifStatTrak(weapon.type, weapon.name);
        weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
        weapon['new'] = true;

        var z = 0;
        while (weapon.price == 0) {
            weapon.quality = Quality[z].name[1];
            weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
            if (z == 4) break;
            z++
        }
        if (isAndroid())
            saveWeapon(weapon);
        else
            inventory.push(weapon);
    }
    if (!isAndroid()) saveInventory();
}
