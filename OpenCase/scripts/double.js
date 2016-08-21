var numbers = [1,   14,  2,   13,  3,   12,  4,   0,   11,  5,   10,  6,   9,   7,   8];
var colors = ['r', 'b', 'r', 'b', 'r', 'b', 'r', 'g', 'b', 'r', 'b', 'r', 'b', 'r', 'b'];
var botMinDec = 700,
	botMaxDec = 3000,
	botMinBet = 1,
	botMaxBet = 1000;
var timerBots,
	intervalCountdown,
	winNumber = 40,
	winNum,
	countdownTime = 25000,
	countdownTimer = countdownTime,
	gameStart = false,
	playerBet = [];
var maxItems = 30;
	
var caseScrollAudio = new Audio();
	caseScrollAudio.src = "../sound/scroll.wav";
	//caseScrollAudio.loop = true;
	caseScrollAudio.playbackRate = 1;
	caseScrollAudio.volume = 0.2;


$(function() {
	var lastGames = getLastGames(10);
	var lastGamesHTML="";
	for (var i = 0; i < lastGames.length; i++)
		lastGamesHTML += "<div class='"+lastGames[i].color+"-ball inline ball'>"+lastGames[i].number+"</div>";
	$(".last-games").html(lastGamesHTML);
	
	$('#bet').val('0');
	$('#balance').text(Player.doubleBalance.toFixed(0));
	
	newGame();
});

function newGame() {
	gameStart = false;
	$('.bet-to-color').prop('disabled', false);
	
	playerBet = [];
	
	fillCarusel(parseInt($(".ball:first-child").text()));
	
	botMaxBet = Player.doubleBalance + 1000;
	
	countdownTimer = countdownTime;
	$('.the-bet').fadeOut(300, function(){ $(this).remove();});
	
	timerBots = setTimeout(function(){botAddBet()}, Math.rand(botMinDec, botMaxDec));
	countDown();
}

function countDown() {
	clearTimeout(intervalCountdown);
	countdownTimer -= 100;
	val = (countdownTimer * 100) / countdownTime;
	$('#progress-countdown').css('width', val+'%');
	$('.big-progress span').text(Localization.double2.rollingIn[Settings.language]+' '+(countdownTimer/1000).toFixed(1)+'...');
	
	if (val > 0) {
		intervalCountdown = setTimeout(countDown, 100);
	} else {
		$('.big-progress span').text(Localization.double2.rolling[Settings.language]);
		startGame();
	}
}

function startGame() {
	gameStart = true;
	
	winNum = Math.rand(winNumber-3, winNumber+5);
	
	var a = 96*winNum - 144;
	var l = 96;
	var d = 0, s = 0;
	$(".casesCarusel").animate({marginLeft: -1 * Math.rand(a-40, a+40) }, {
		duration: 9000,
		easing: 'easeInOutCubic',
		start: function(){
			$('.bet-to-color').prop('disabled', true);
		},
		complete: function(){
			if (playerBet.length) {
				for (var i = 0; i < playerBet.length; i++)
					if (playerBet[i].color == getNumberColor(getWinnerNumber())) {
						switch (playerBet[i].color) {
						case 'red':
						case 'black':
							Player.doubleBalance += playerBet[i].bet * 2;
							break
						case 'green':
							Player.doubleBalance += playerBet[i].bet * 14;
							break
						}
						Player.doubleBalance = parseInt(Player.doubleBalance.toFixed(0));
						$('#balance').text(Player.doubleBalance);
						statisticPlusOne('double-wins');
						changePoints(2);
					} else {
						changePoints(-1);
						statisticPlusOne('double-loose');
					}
					
				saveStatistic('doubleBalance', Player.doubleBalance);
			}
			win = getWinnerNumber();
			$('.last-games').prepend("<div class='"+getNumberColor(win)+"-ball inline ball'>"+win+"</div>");
			$($('.ball')[$('.ball').length-1]).remove();
		},
	})
	.animate({marginLeft: -1 * Math.rand(a, a) }, {
		duration: 800,
		easing: 'easeInOutCubic',
		complete: function(){
			newGame();
		},
	});
	
}

function getWinnerNumber() {
	return parseInt($($('.casesCarusel div')[winNum]).text());
}

function getNumberColor(num) {
	i = $.inArray(num, numbers);
	return colors[i] == 'r' ? 'red' : colors[i] == 'b' ? 'black' : 'green';;
}

function getLastGames(count) {
	count = count || 5;
	lastGames = [];
	for (var i = 0; i < count; i++) {
		rnd = Math.rand(0, numbers.length-1);
		color = colors[rnd] == 'r' ? 'red' : colors[rnd] == 'b' ? 'black' : 'green';
		lastGames.push({number:numbers[rnd], color:color});
	}
	return lastGames;
}

$(document).on('click', '.add-to-bet', function() {
	var plus = $(this).data('bet');
	switch(plus) {
		case 'clear':
			$('#bet').val('0');
			break
		case 'max':
			$('#bet').val('1000000');
			break
		case 'x2':
			val = parseInt($('#bet').val());
			val *= 2;
			val = val > 1000000 ? 1000000 : val;
			$('#bet').val(val);
			break
		case '1/2':
			val = parseInt($('#bet').val());
			val = val || 1;
			val /= 2;
			$('#bet').val(Math.round(val));
			break
		default:
			val = parseInt($('#bet').val());
			val += parseInt(plus);
			$('#bet').val(val);
	}
	if (parseInt($("#bet").val()) > 1000000) $('#bet').val('1000000');
	if (parseInt($("#bet").val()) > Player.doubleBalance) $('#bet').val(Player.doubleBalance);
	if (Player.doubleBalance <= 0) {
		$('#balance').addClass('animated flash');
		setTimeout(function(){
			$('#balance').removeClass('animated flash')
		}, 1000);
	}
});

$(document).on('click', '.bet-to-color', function() {
	bet = parseInt($('#bet').val());
	if (gameStart) return false;
	if (bet == 0) return false;
	if (Player.doubleBalance <= 0) {
		$('#balance').addClass('animated flash');
		setTimeout(function(){
			$('#balance').removeClass('animated flash')
		}, 1000);
		return false;
	}
	$(this).prop('disabled', true);
	pl = {};
	pl.name = Player.nickname;
	pl.img = Player.avatar;
	pl.bet = bet;
	color = ($(this).hasClass('bet-red')) ? 'red' : ($(this).hasClass('bet-black')) ? 'black' : 'green';
	
	playerBet.push({color: color, bet: bet});
	
	Player.doubleBalance -= bet;
	Player.doubleBalance = parseInt(Player.doubleBalance.toFixed(0));
	$('#balance').text(Player.doubleBalance);
	saveStatistic('doubleBalance', Player.doubleBalance);
	
	addBet(color, pl);
});

$(document).on('click', '#fillBalance', function() {
	fillInventory();
});

$(document).on("click", ".choseItems", function(){
	var itemsCount = $(".inventoryItemSelected").length;
	var ids = [];
	var itemsCost = 0;
	if(itemsCount != 0) {
		
		if (isAndroid()) {
			$(".inventoryItemSelected").each(function () {
				itemsCost += getWeapon(parseInt($(this).data('id'))).price;
				deleteWeapon($(this).data('id'));
			})
		}else {
			$(".inventoryItemSelected").each(function () {
				itemsCost += inventory[parseInt(this.id)].price;
				ids.push(parseInt(this.id));
			})
		}
		if (!isAndroid()) {
			for (var i = 0; i < ids.length; i++) {
				var d = ids[ids.length - i - 1];
				inventory.splice(d, 1);
			}
			saveInventory();
		}
		
		if (itemsCost) {
			Player.doubleBalance += itemsCost*100;
			Player.doubleBalance = parseInt(Player.doubleBalance.toFixed(0));
			$('#balance').text(Player.doubleBalance);
			saveStatistic('doubleBalance', Player.doubleBalance);
		}
		
		//if (Settings.sounds) newItemsSound.play();
		$(".closeInventory").click();
		
	}
})

function botAddBet() {
	if (gameStart) return false;
	var bot = {};
	bot.name = getRandomBotName();
	bot.img = getRandomBotImg();
	bot.bet = Math.rand(botMinBet, botMaxBet);
	
	tables = ['red', 'green', 'black'];
	addBet(tables[Math.rand(0,2)], bot);
	
	clearTimeout(timerBots);
	if (!gameStart) {
		timerBots = setTimeout(function(){botAddBet()}, Math.rand(botMinDec, botMaxDec));
	}
}

function addBet(tableColor, player) {
	tableColor = tableColor || 'red';
	$('.bets-'+tableColor+'-table').append('<tr class="the-bet"><td class="the-bet__player"><img src="../images/ava/'+player.img+'">'+player.name+'</td><td class="the-bet__bet">'+player.bet+'</td></tr>');
}

function fillCarusel(lastNumber) {
	lastNumer = lastNumber || 1;
	var offset = $.inArray(lastNumber, numbers);
	switch (offset){
		case 0:
			offset = numbers.length-2;
			break
		case 1:
			offset = numbers.length-1;
			break
		default:
			offset -=2;
	}
	
	$('.casesCarusel').css('margin-left', '-48px');
	
	var caruselHTML = "";
	
	for (var i = 0; i < winNumber+8; i++) {
		if (offset == numbers.length) offset = 0;
		color = colors[offset] == 'r' ? 'red' : colors[offset] == 'b' ? 'black' : 'green';
		caruselHTML += "<div class='"+color+"-block inline block'>"+numbers[offset]+"</div>";
		offset++;
	}
	$('.casesCarusel').html(caruselHTML);
}