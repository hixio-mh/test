var anim = document.getElementById('js-left-hand');
anim.addEventListener("animationend", listener, false);
anim.addEventListener("webkitAnimationEnd", listener, false);


var yourScore = 0,
    enemyScore = 0,
    totalRounds = 3,
    round = 1,
    maxItems = 5;

var winItems = [];

var addItemsSound = new Audio();
addItemsSound.src = "../sound/interface/menuClick.wav";
addItemsSound.volume = 0.9;

var selectItemSound = new Audio();
selectItemSound.src = "../sound/interface/SelectItem.wav";
selectItemSound.volume = 0.9;

var newItemsSound = new Audio();
newItemsSound.src = "../sound/interface/jackpotAddItems.wav";
newItemsSound.volume = 0.9;

$(function() {
    $('.round-count').text(round + '/' + totalRounds);
});

$('.add-item').on('click', function() {
    newGame();

    fillInventory();
});

$(".choseItems").on("click", function() {
    var itemsCount = $(".inventoryItemSelected").length;
    if (itemsCount == 0) {
        $(".closeInventory").click();
        return false;
    }
    //var playerWeapons = [];
    var ids = [];
    var itemsCost = 0;

    if (isAndroid()) {
        $(".inventoryItemSelected").each(function() {
            winItems.push(getWeapon(parseInt($(this).data('id'))));
            itemsCost += getWeapon(parseInt($(this).data('id'))).price;
            deleteWeapon($(this).data('id'));
        })
    } else {
        $(".inventoryItemSelected").each(function() {
            winItems.push(inventory[parseInt(this.id)]);
            itemsCost += inventory[parseInt(this.id)].price;
            ids.push(parseInt(this.id));
        })
        for (var i = 0; i < ids.length; i++) {
            var d = ids[ids.length - i - 1];
            inventory.splice(d, 1);
        }
        saveInventory();
    }
    $(".add-item").css("display", 'none');
    $(".closeInventory").click();

    $('.winItems').append('<li id="whoBet">' + Localization.rps2.youAdd[Settings.language] + '</li>');

    for (var i = 0; i < winItems.length; i++) {
        $('.winItems').append('<li>' + winItems[i].type + ' | ' + winItems[i].skinName + ' ($' + winItems[i].price + ')<b class=' + winItems[i].rarity + '></b>');
    }
    $('.status').html('<li id="js-loading-inventory" data-from="1"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
    setTimeout(function() {
        botAddWeapon(itemsCost / winItems.length);
        $('.choice').css('display', 'block');
        $('.status').text('...');
    }, 200);

})

function botAddWeapon(itemsCost) {
    var minPrice = 0,
        maxPrice = 0;
    if (itemsCost < 1) {
        minPrice = 0.1,
            maxPrice = 2.5;
    } else if (itemsCost >= 1 && itemsCost < 10) {
        minPrice = 1,
            maxPrice = 15;
    } else if (itemsCost >= 10 && itemsCost < 50) {
        minPrice = 10,
            maxPrice = 60;
    } else if (itemsCost >= 50 && itemsCost < 100) {
        minPrice = 50,
            maxPrice = 120;
    } else if (itemsCost >= 100 && itemsCost < 200) {
        minPrice = 100,
            maxPrice = 230;
    } else if (itemsCost >= 200 && itemsCost < 500) {
        minPrice = 190,
            maxPrice = 550;
    } else if (itemsCost >= 500 && itemsCost < 1000) {
        minPrice = 470,
            maxPrice = 1200;
    } else {
        minPrice = itemsCost - 500;
        maxPrice = itemsCost + 500;
    }

    var canContinue = false;
    var weapons = [];
    wpLength = winItems.length;
    var oldDate = new Date();
    while (!canContinue) {
        var rnd = Math.rand(0, Prices.length - 1)
        var weapon = Prices[rnd];
        var price = weapon.marketPrice == 0 ? weapon.avgPrice : weapon.marketPrice;

        if (price >= minPrice && price <= maxPrice) {
            var type = weapon.type;
            var name = getSkinName(weapon.name);
            var quality = getQualityName(weapon.quality, Settings.language);
            var br = false;
            type = type.replace(/(Souvenir |Сувенир )/gi, '');
            for (var i = 0; i < cases.length; i++) {
                for (var z = 0; z < cases[i].weapons.length - 1; z++) {
                    if ((cases[i].weapons[z].type.replace(/★ /, '') == type) && (getSkinName(cases[i].weapons[z].skinName) == name)) {

                        var wp = {}
                        for (var key in cases[i].weapons[z])
                            wp[key] = cases[i].weapons[z][key];

                        wp.skinName = getSkinName(name, Settings.language);
                        wp.price = price;
                        wp.statTrak = (typeof weapon.statTrak == 'undefined') ? false : true;
                        wp.quality = quality;
                        weapons.push(wp);
                        if (wpLength == weapons.length) canContinue = true;
                        br = true;
                        break;
                    }
                }
                if (br) break;
            }
        }
        if (new Date() - oldDate > 7000) {
            weapons = winItems.slice();
            canContinue = true;
            break;
        }
    }
    winItems = winItems.concat(weapons);
    $('.winItems').append('<li id="whoBet">' + Localization.rps2.opponentAdd[Settings.language] + '</li>');
    for (var i = wpLength; i < winItems.length; i++)
        $('.winItems').append('<li>' + winItems[i].type + ' | ' + winItems[i].skinName + ' ($' + winItems[i].price + ')<b class=' + winItems[i].rarity + '></b>');
}

$('.choice__hand').on('click', function() {

    $(this).addClass('selected');
    $('.status').text('...');

    $('.choice__hand').prop('disabled', true);

    $('#js-player-img').attr('src', '../images/rps/rock.png');
    $('#js-comp-img').attr('src', '../images/rps/rock.png');

    $('.battle-field .left').addClass('animation-shake-left');
    $('.battle-field .right').addClass('animation-shake-right');
});

function listener(e) {
    var playerChoice = $('.selected').data('choice');
    var whoWin = startGame(playerChoice);

    if (whoWin == 'player') {
        yourScore++;
        round++;
        $('.your-score span').text(yourScore);
        $('.status').text(Localization.rps2.youWinRound[Settings.language]);
    } else if (whoWin == 'comp') {
        enemyScore++;
        round++;
        $('.comp-score span').text(enemyScore);
        $('.status').text(Localization.rps2.youLostRound[Settings.language]);
    } else {
        $('.status').text(Localization.rps2.tie[Settings.language]);
    }


    $('.battle-field .left').removeClass('animation-shake-left');
    $('.battle-field .right').removeClass('animation-shake-right');
    $('.choice__hand').removeClass('selected');
    $('.choice__hand').prop('disabled', false);

    if (round == totalRounds + 1 || (yourScore == 2 && enemyScore == 0) || (yourScore == 0 && enemyScore == 2))
        endGame((yourScore > enemyScore) ? true : false);
    else
        $('.round-count').text(round + '/' + totalRounds);
}

function newGame() {
    round = 1;
    yourScore = 0;
    enemyScore = 0;

    $('.your-score span').text(yourScore);
    $('.comp-score span').text(enemyScore);
    $('.round-count').text(round + '/' + totalRounds);

    $('.winItems').html('');

    $('#js-player-img').attr('src', '../images/rps/rock.png');
    $('#js-comp-img').attr('src', '../images/rps/rock.png');
}

function endGame(playerWin) {
    if (playerWin) {
        $('.status').text(Localization.rps2.winGame[Settings.language]);
        for (var i = 0; i < winItems.length; i++) {
            winItems[i]['new'] = true;
            if (!isAndroid())
                inventory.push(winItems[i]);
            else
                saveWeapon(winItems[i]);
        }
        if (!isAndroid()) saveInventory();
        changePoints(2);
        statisticPlusOne('rps-wins');
    } else {
        $('.status').text(Localization.rps2.lostGame[Settings.language]);
        statisticPlusOne('rps-loose');
        changePoints(-1);
    }

    winItems = [];

    round = 1;
    yourScore = 0;
    enemyScore = 0;

    $(".choice").css("display", 'none');
    $(".add-item").css("display", 'block');
    checkInventoryForNotification();
}

function startGame(userChoice) {
    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
        computerChoice = "rock";
    } else if (computerChoice <= 0.67) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }

    $('#js-player-img').attr('src', '../images/rps/' + userChoice + '.png');
    $('#js-comp-img').attr('src', '../images/rps/' + computerChoice + '.png');

    return compare(userChoice, computerChoice);
}

function compare(choice1, choice2) {
    if (choice1 === choice2) {
        return "tie";
    }
    if (choice1 === "rock") {
        if (choice2 === "scissors") {
            return "player";
        } else {
            return "comp";
        }
    }
    if (choice1 === "paper") {
        if (choice2 === "rock") {
            return "player";
        } else {
            return "comp";
        }
    }
    if (choice1 === "scissors") {
        if (choice2 === "rock") {
            return "comp";
        } else {
            return "player";
        }
    }
};
