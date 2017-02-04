/*var itemsAccepted = 0;
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
var PlayerInGame = false;
var priceRange = {
    min: parseFloat($('#diffuculty option:selected').data('min')),
    max: parseFloat($('#diffuculty option:selected').data('max'))
};*/
var maxItems = 0;
var ticketsRegExp = /(\d)(?=(\d\d\d)+([^\d]|$))/g;

var Jackpot = {
    roomID: 0,
    bar: null,
    winNumber: 35,
    roomsPreview: null,
    countdownTimer: null,
    newGameTimer: null,
    socket: io('http://192.168.1.205:8020'),
    room: {
        players: {},
        gameStart: false,
        history: [],
        gameStartIn: 0,
        limits: {
            min: 0.1,
            max: 5,
            items: 50,
            perPlayer: 15
        },
        winner: {},
        playerWin: false,
        totalItems: 0,
        totalPrice: 0
    },
    reconnectDelay: 5000,
    init: function() {
        $(function() {            
            $(window).on('popstate', function(e) {
                var state = e.originalEvent.state;
                if (state === null) {
                    Jackpot.showRooms();
                    Jackpot.socket.emit('leaveRoom', {room: 'all'})
                } else if (typeof state.room != 'undefined') {
                    Jackpot.selectRoom(state.room);
                }
            })
            
            Jackpot.socket.on('stats', function(stats) {
                Jackpot.roomsPreview = stats;
                Jackpot.updateStats();
            })
            
            Jackpot.socket.on('connect', function(event) {
                console.log('Успешно подключились к серверу');
            })
            
            Jackpot.socket.on('reconnect', function(event) {
                console.log('Переподключились к серверу');
            })
            
            Jackpot.socket.on('reconnection', function(event) {
                console.log('Соедениние потеряно, переподключаемся...')
            })
            
            Jackpot.socket.on('roomInfo', function(info) {
                Jackpot.room.players = info.players;
                Jackpot.room.bets = info.bets;
                Jackpot.room.history = info.history;
                Jackpot.room.gameStart = info.gameStart;
                Jackpot.room.gameStartIn = info.gameStartIn;
                Jackpot.room.limits = info.limits;
                maxItems = info.limits.perPlayer;
                
                Jackpot.selectRoom(info.roomid);
                history.pushState({room: Jackpot.roomID}, 'Jackpot online. Room #'+Jackpot.roomID, '?room='+Jackpot.roomID);
            })
            
            Jackpot.socket.on('bet', function(bet) {
                Jackpot.newBet(bet);
            })
            
            Jackpot.socket.on('chances', function(chances) {
                Jackpot.updateChances(chances);
            })
            
            Jackpot.socket.on('countdown_start', function(timer) {
                $('#countdown-timer').show();
                $('#caruselLine').hide();
                Jackpot.countdown(timer);
            })
            
            Jackpot.socket.on('winner', function(winner) {
                Jackpot.room.winner = winner;
                Jackpot.startGame();
            })
            
            Jackpot.socket.on('new_game', function(timer) {
                $('.items').empty();
                $('#players').empty();
                $(".casesCarusel").empty();
                $(".win").slideUp("slow");
                $("#addItems").prop("disabled", false);
                
                
                Jackpot.room.gameStart = false;
                Jackpot.bar.animate(0);
                Jackpot.bar.setText("0/" + Jackpot.room.limits.items + "<hr><s class='currency dollar'>0</s>");
                Jackpot.room.totalItems = 0;
                Jackpot.room.totalPrice = 0;

            })
            
            $('#change_room').on('click', function() {
                Jackpot.showRooms();
            });
            
            $(document).on('click', '.jackpot-room', function() {
                Jackpot.socket.emit('enterRoom', parseInt($(this).data('roomid')));
            })
            
            $(".choseItems").on("click", function() {
                var itemsCount = $(".inventoryItemSelected").length;
                var itemsCost = 0;
                if (itemsCount > 0) {
                    var ids = [];
                    $(".inventoryItemSelected").each(function() {
                        ids.push(parseInt($(this).data('id')));
                    })
                    getWeapons(ids).then(function(playerWeapons) {
                        var itemsCost = playerWeapons.reduce(function(summ, current) {
                            return summ + current.price;
                        }, 0);
                        
                        var betWeapons = [];
                        
                        for (var i = 0; i < playerWeapons.length; i++) {
                            betWeapons.push(playerWeapons[i].tradeObject());
                        }
                        
                        Jackpot.socket.emit('bet', {
                            room: Jackpot.roomID,
                            nick: Player.nickname,
                            avatar: Player.avatar,
                            weapons: betWeapons
                        })
                        
                        $(".closeInventory").click();
                    })
                }
            })
        })
    },
    message: function(msg) {
        switch(msg.type) {
            case 'bet':
                Jackpot.room.bets.push(msg);
                if (msg.id == Jackpot.id)
                    Jackpot.room.player.isBet = true;
                Jackpot.newBet(msg);
                break;
            case 'confirmBet':
                Jackpot.room.player.confirmed = msg.answer;
                break;
                
        }
    },
    showRooms: function() {
        var roomsHTML = "";
        for (var key in this.roomsPreview) {
            var room = this.roomsPreview[key];
            roomsHTML += "<li class='jackpot-room' data-roomid='"+key+"'> \
                            <span class='diff'>"+Localization.getString('jackpot.difficulty.' + (room.diff+1))+"</span>\
                            <span class='online'>"+room.players+"</span> \
                            </li>"
        }
        $('.room-select-modal__rooms').html(roomsHTML);
        $('.room-select-modal').show();
    },
    updateStats: function() {
        if ($('.jackpot-room').length <= 0) {
            this.showRooms();
            return;
        }
        for (var key in this.roomsPreview) {
            $('.jackpot-room[data-roomid="'+key+'"] .online').text(this.roomsPreview[key].players);
        }
    },
    selectRoom: function(room) {
        $(document).trigger({
            type: 'openRoom',
            roomID: room
        });
        this.roomID = room;
        $('.room-select-modal').hide();
        this.setupRoom();
    },
    setupRoom: function() {
        try {
            $('#circle').empty();
            this.bar = new ProgressBar.Circle(circle, {
                strokeWidth: 6,
                easing: 'easeInOut',
                duration: 1000,
                color: '#b50606',
                trailColor: '#fff',
                trailWidth: 2,
                svgStyle: null,
                text: {
                    value: '0/' + this.room.limits.items,
                    alignToBottom: false
                }
            });

            this.bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
            this.bar.text.style.fontSize = '2rem';
        } catch (err) {
            //ERR
            console.log('err');
        }
        
        $(".win").slideUp("slow");
        
        $('.items').empty();
        
        this.room.totalItems = 0;
        this.room.totalPrice = 0;
        
        for (var i = 0; i < this.room.bets.length; i++) {
            this.newBet(this.room.bets[i]);
        }
        this.room.totalPrice = parseFloat(this.room.totalPrice.toFixed(2));
        
        this.bar.setText(this.room.totalItems + '/' + this.room.limits.items + '<hr><s class="currency dollar">' + this.room.totalPrice + '</s>');
        var step = this.room.totalItems * 100 / this.room.limits.items / 100;
        step = step > 1 ? 1 : step;
        this.bar.animate(step);
        
        if (this.room.gameStartIn != 0) {
            this.countdown(this.room.gameStartIn);
        }
        
        if (this.room.gameStartIn <= 0) {
            $('#countdown-timer').hide();
            $('#caruselLine').show();
        } else {
            $('#countdown-timer').show();
            $('#caruselLine').hide();
        }
    },
    newBet: function(bet) {
        Jackpot.room.totalPrice += bet.itemsCost;
        Jackpot.room.totalItems += bet.weapons.length;
        Jackpot.bar.setText(Jackpot.room.totalItems + '/' + Jackpot.room.limits.items + '<hr><s class="currency dollar">' + Jackpot.room.totalPrice + '</s>');
        
        var step = Jackpot.room.totalItems * 100 / Jackpot.room.limits.items / 100;
        step = step > 1 ? 1 : step;
        Jackpot.bar.animate(step);
        
        itemsList(bet);
    },
    updateChances: function(chances) {
        $('#players').empty();
        for (var key in chances) {
            var ava = chances[key].avatar;
            ava = ava.length > 7 ? ava : '../images/ava/' + ava;
            $('#players').append('<span class="playerAva"><img src="' + ava + '"><p>'+chances[key].chance+'%</p></span>');
        }
    },
    countdown: function(timer) {
        console.log('Countdown timer', timer);
        $('#countdown-timer').text(parseInt(timer/1000));

        function countdown() {
            var currentVal = parseInt($('#countdown-timer').text());
            if (currentVal > 0) {
                $('#countdown-timer').text(--currentVal);
            } else {
                clearInterval(Jackpot.countdownTimer);
                Jackpot.countdownTimer = null;
            }
        }

        this.countdownTimer = setInterval(countdown, 1000);
    },
    startGame: function(winner) {
        $('#countdown-timer').hide();
        $('#caruselLine').show();
        
        $("#addItems").prop("disabled", true);
        this.room.gameStart = true;
        
        var avatars = [];
        $('#players .playerAva img').each(function() {
            avatars.push($(this).attr('src'));
        })
        
        while (avatars.length < this.winNumber + 3) {
            avatars = avatars.concat(avatars);
        }
        
        avatars.shuffle();
        
        if (avatars.length > this.winNumber + 3)
            avatars.splice(this.winNumber + 3, avatars.length - (this.winNumber + 3))
            
        avatars[this.winNumber] = Jackpot.room.winner.avatar.length > 7 ? Jackpot.room.winner.avatar : '../images/ava/' + Jackpot.room.winner.avatar;
        
        var el = '';
        avatars.forEach(function(item, index) {
            el += '<span class="playerAva">' +
                '<img src="' + item + '" />' +
                '</span>'
        })
        
        $(".casesCarusel").html(el);
        $(".casesCarusel").css("margin-left", "0px");
        var a = 141 * this.winNumber - 141;
        var l = 141;
        var d = 0,
            s = 0;
        $(".casesCarusel").animate({
            marginLeft: -1 * Math.rand(a - 70, a + 15)
        }, {
            duration: 7000,
            easing: 'easeInOutCubic',
            start: function() {
                $(".closeInventory").click();

                $(".win").html("<img src='../images/ava/" + Jackpot.room.winner.avatar + "'><span class='win__title'>" + Localization.getString('jackpot.winner') + "</span><span class='win__nick'>" + Jackpot.room.winner.nickname + "</span><span class='win__chance'>" + Jackpot.room.winner.chance + "%</span><span class='win__ticket'><i class='fa fa-ticket'></i> " + ('' + parseInt(Jackpot.room.winner.ticket)).replace(ticketsRegExp, '$1&#8198;') + "</span>");
                
                /*if (win.nick == Player.nickname) {
                    saveWeapons(ItemsInGame);

                    //Statistic
                    statisticPlusOne('rulet-wins');
                    Level.addEXP(2);

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
                    }
                }*/
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
                $($('.casesCarusel').children('.playerAva')[winNumber]).addClass('winnerAnimation');
            },
        })
    }
}

/*var socket = null,
    reconnectDelay = 5000;*/

//DEBUG
var DEBUG = false;

$(function() {
    
})

function newGame() {
    clearTimeout(timerId);
    ifCarusel = false;
    $(".win").slideUp("slow");
    bar.animate(0);
    bar.setText("0/" + itemsLimit + "<hr><s class='currency dollar'>0</s>");
    $("#addItems").prop("disabled", false);
    itemsAccepted = 0;
    totalMoney = 0;
    lastTicket = 0;
    PlayerInGame = false;

    $(".items li").remove();

    $("#players").html("");
    $(".casesCarusel").html("");
}

$("#addItems").on("click", function() {
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
    bar.setText(itemsAccepted + '/' + itemsLimit + '<hr><s class="currency dollar">' + totalMoney + '</s>');
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

            $(".win").html("<img src='../images/ava/" + win.avatar + "'><span class='win__title'>" + Localization.getString('jackpot.winner') + "</span><span class='win__nick'>" + win.nick + "</span><span class='win__chance'>" + win.chance + "%</span><span class='win__ticket'><i class='fa fa-ticket'></i> " + ('' + parseInt(winnerTicket)).replace(ticketsRegExp, '$1&#8198;') + "</span>");

            if (win.nick == Player.nickname) {
                saveWeapons(ItemsInGame);

                //Statistic
                statisticPlusOne('rulet-wins');
                Level.addEXP(2);

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
        },
    })
}

var getRandomItem = function(list, weight) {
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });
     
    var random_num = Math.rand(0, total_weight);
    var weight_sum = 0;
    //console.log(random_num)
     
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);
         
        if (random_num <= weight_sum) {
            return list[i];
        }
    }
     
    // end of function
};

function getJackpotWiner() {
    
    var weight = [];
    for (var i = 0; i < PlayersInGame.length; i++) {
        weight.push(PlayersInGame[i].itemsCost);
    }
    
    var w = getRandomItem(PlayersInGame, weight);

    var random = Math.rand(w.tickets.from, w.tickets.to);
    winnerTicket = random;
    
    return w;
}

function itemsList(newBet/*fromName, fromImg, tickets, itemsCost, weaponsList*/) {
    if (typeof newBet.weapons == 'undefined' || newBet.weapons.length == 0) return false;
    var bet = "<li class='game-bet animated zoomIn'><div class='game-bet__info'><div class='game-bet__player'><img src='../images/ava/" + newBet.avatar + "'>" + newBet.nick + "</div><div class='game-bet__tickets'><span class='game-bet__tickets__price'>$" + newBet.itemsCost.toFixed(2) + "</span><i class='fa fa-ticket'></i> " + ('' + parseInt(newBet.tickets.from)).replace(ticketsRegExp, '$1&#8198;') + " - " + ('' + parseInt(newBet.tickets.to)).replace(ticketsRegExp, '$1&#8198;') + "</div></div></div>" +
        "<div class='bet-items " + (newBet.weapons.length > 4 ? "hide-items" : "") + "'><div colspan=2>";
    for (var i = 0; i < newBet.weapons.length; i++) {
        var weapon = new Weapon(newBet.weapons[i]);
        var img = getImgUrl(weapon.img);

        var newItem = "<div class='bet-items__item'><img src='" + img + "'><div class='bet-items__item__rarity " + weapon.rarity + "'></div><span class='bet-items__item__price'>$" + weapon.price + "</span></div>";
        bet += newItem;
    }
    bet += "</div></div>";
    $(bet).hide().prependTo(".items").slideToggle();
    //$(".items").prepend(bet);
}

$(document).on('click', '.hide-items, .show-items', function() {
    $(this).toggleClass('hide-items show-items');
})
