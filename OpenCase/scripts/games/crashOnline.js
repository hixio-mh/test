var odometer = null,
    newGameTimer = null,
    socket = null,
    reconnectTimer = 0,
    reconnectDelay = 5000;
$(function() {
    var currentMultiply = 100,
        raiseInterval = null,
        multiply = 0,
        betLimit = 500000,
        gameStartStatus = false,
        history = [],
        backgroundSpeed = 1000,
        PING_PONG_INTERVAL = 50000;
    
    var playerInfo = {};
    connectToServer();
    
    window.odometerOptions = {
        auto: false,
    };
    
    odometer = new Odometer({el: $("#odometer")[0], value: 1.00, theme: 'default', duration: 500, format: '(ddd).dd'});
    odometer.render();
    newGameTimer = new Odometer({el: $(".crash__next-round-timer span")[0], value: 5, theme: 'default', duration: 1000, format: '(ddd).d'});
    newGameTimer.render();
    
    function connectToServer() {
        //socket = new WebSocket('ws://localhost:8000');
        socket = new WebSocket('wss://crashserver.herokuapp.com/');
        
        socket.onopen = function(event) {
            if(reconnectTimer) {
                clearInterval(reconnectTimer);
                reconnectTimer = 0;
            }
            //console.log('Connected to the server');
        }

        socket.onclose = function(event) {
            //console.log("Connection lost...");
            if (!reconnectTimer) {
                reconnectTimer = setInterval(function(){checkConnection()}, reconnectDelay);
            }
            
            //$('.connection-status').html(Localization.double2.connectionLost[Settings.language]);
            onlineGames.chatMessage({from:'', message: 'Connection lost. Trying to reconnect...', specialType: 'warning'});
           
            if (playerInfo.bet) {
                Player.doubleBalance += playerInfo.bet;

                Player.doubleBalance = parseInt(Player.doubleBalance.toFixed(0));

                $('#menu_doubleBalance').text(Player.doubleBalance);
                $('#balance').text(Player.doubleBalance);
                saveStatistic('doubleBalance', Player.doubleBalance, 'Number');

                playerInfo.bet = 0;
                
                $('#balance').addClass('animated flash');
                setTimeout(function() {
                    $('#balance').removeClass('animated flash')
                }, 1000);
            }
        }
        
        socket.onmessage = function(event) {
            message = JSON.parse(event.data);
            getMessage(message);
        }
    }
    
    function checkConnection() {
        if(!socket || socket.readyState == 3) connectToServer();
    }
    
    var PING = {type:'ping'};
    
    function getMessage(message) {
        //console.log(message);
        
        switch (message.type) {
            case 'newGame':
                newGame(message);
                break;
            case 'gameStart':
                gameStart(100);
                break;
            case 'tick':
                tick(message);
                break;
            case 'endGame':
                endGame(message);
                break;
            case 'first-connect':
                firstConnect(message);
                setTimeout(function pingpong() {
                    if (!reconnectTimer) socket.send(JSON.stringify(PING));
                    setTimeout(pingpong, PING_PONG_INTERVAL);
                }, PING_PONG_INTERVAL);
                break;
            case 'addBet':
                newBet(message);
                break;
            case 'cashOut':
                cashOut(message);
                break;
            case 'message':
                onlineGames.chatMessage(message);
                break;
            case 'online':
                onlineGames.onlineCount(message.online);
                break;
        }
    }
    
    function firstConnect(message) {
        if (message.status) {
            currentMultiply = message.multiply;
            $('#place-bet').prop('disabled', true);
        } else if (message.time > 0) {
            newGame(message);
        }
        playerInfo.id = message.id;
        
        for (var key in message.bets) {
            newBet(message.bets[key]);
        }
        
        history = message.history;
        updateHistory();
        sortBetTable();
    }
    
    function newGame(message) {
        //Очистка таблицы ставок
        $('.bet-list').find('tr:gt(0)').remove();
        
        $('#place-bet').prop('disabled', false);
        gameStartStatus = false;
        
        currentMultiply = 0;
        $('.crash__next-round-timer').show();
        var timer = Math.round(message.time/1000 - 1);
        $(".crash__next-round-timer span").text(timer);
        backgroundSpeed = 1000;
        
        
        newGameCountdown(timer);
    }
    
    function newGameCountdown(countFrom) {
        if (countFrom) newGameTimer.value = countFrom;
        if (newGameTimer.value == 0)
            return false;
        newGameTimer.update((newGameTimer.value-1));
        setTimeout(newGameCountdown, 1000);
    }
    
    function gameStart(mlt) {
        multiply = mlt;
        $('.crash__multiply').removeClass('crashed');
        $('.crash__next-round-timer').hide();
        gameStartStatus = true;
        if (playerInfo.bet) {
            
            $('#place-bet').prop('disabled', false);
        } else {
            $('#place-bet').prop('disabled', true);
        }
        
        sortBetTable();
    }
    
    function endGame(message) {
        currentMultiply = 0;
        odometer.update(message.number/100);
        setTimeout(function() {
            $('.crash__multiply').addClass('crashed');
            $('#place-bet').html('Place bet');
            $('#place-bet').prop('disabled', true);
            playerInfo.bet = 0;
            gameStartStatus = false;
            $('.bet-list').find('tr:gt(0)').each(function(){
                if (!$(this).hasClass('cashOut')) {
                    $(this).addClass('crashed');
                }
            })
            if (history.length > 20) 
                history = history.slice(1);
            history.push(message.number);
            
            updateHistory();
        }, 300) //300 - Время анимации в css odometr'а
    }
    
    function tick(message) {
        currentMultiply = message.number;
        odometer.update(currentMultiply/100);
        if (playerInfo.bet) {
            $('#place-bet').html('Cash out<br>@ ' + Math.round(currentMultiply/100 * playerInfo.bet) + ' coins');
        }
        backgroundSpeed = backgroundSpeed < 100 ? 100 : backgroundSpeed-4;
    }
    
    function newBet(message) {
        if (message.status == 'crashed' || message.status == 'cashOut')
            var status = message.status;
        $('.bet-list').append('<tr data-playerID="'+message.id+'" class="'+status+'"><td class="bet__nickname">'+message.player+'</td><td class="bet__multiply">-</td><td class="bet__bet">'+message.bet+'</td><td class="bet__profit">-</td></tr>')
    }
    
    function cashOut(message) {
        var $tableRow = $('tr[data-playerID="'+message.id+'"]');
        $($tableRow).addClass('cashOut');
        $($tableRow).find(".bet__multiply").text(message.multiply);
        $($tableRow).find(".bet__profit").text(message.profit);
        
        if (message.id == playerInfo.id) {
            //console.log('This player cash out!');
            $('#place-bet').html('Place bet');
            $('#place-bet').prop('disabled', true);
            Player.doubleBalance += (playerInfo.bet + message.profit);
            playerInfo.bet = 0;
            saveStatistic('doubleBalance', Player.doubleBalance, 'Number');
            
            $('#balance').text(Player.doubleBalance);
            $('#menu_doubleBalance').text(Player.doubleBalance);
        }
        sortBetTable();
    }
    
    function updateHistory() {
        $('.history').empty();
        for (var i = 0; i < history.length; i++) {
            var color = history[i] >= 200 ? 'cashOut-color' : 'crashed-color';
            $('.history').prepend('<li class="'+color+'">' + (history[i]/100) + 'x</i>');
        }
    }
    
    function sortBetTable() {
        var regular = $('.bet-list tr:not(.cashOut):gt(0)');
        var cashOut = $('.bet-list tr.cashOut');
        
        regular.sort(function(a, b){
            if (parseInt(a.cells[2].innerText) > parseInt(b.cells[2].innerText))
                return -1;
            else
                return 1
        });
        cashOut.sort(function(a, b){
            if (parseInt(a.cells[2].innerText) > parseInt(b.cells[2].innerText))
                return -1;
            else
                return 1
        })
        
        $('.bet-list').find('tr:gt(0)').remove();
        $('.bet-list').append(regular);
        $('.bet-list').append(cashOut);
    }
    
    $('#bet').val('0');
    $('#balance').text(Player.doubleBalance.toFixed(0));
    $('#menu_doubleBalance').text(Player.doubleBalance.toFixed(0));
    
    //Работа со ставкой игрока    
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
    
    $(document).on('click', '#place-bet', function() {
        if (playerInfo.bet && gameStartStatus) {
            socket.send(JSON.stringify({
                type: 'cashOut',
                id: playerInfo.id
            }))
        } else {
            playerInfo.bet = parseInt($('#bet').val());
            if (playerInfo.bet <= 0 || playerInfo.bet > Player.doubleBalance || isNaN(playerInfo.bet)) return;
            socket.send(JSON.stringify({
                type: 'addBet',
                player: Player.nickname,
                bet: playerInfo.bet,
                id: playerInfo.id
            }))
            Player.doubleBalance -= playerInfo.bet;
            saveStatistic('doubleBalance', Player.doubleBalance, 'Number');
            
            $("#place-bet").text('Betting...');
            $('#place-bet').prop('disabled', true);
            
            $('#balance').text(Player.doubleBalance);
            $('#menu_doubleBalance').text(Player.doubleBalance);
        }
    })
})