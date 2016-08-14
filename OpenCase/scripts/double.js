var numbers = [1,   14,  2,   13,  3,   12,  4,   0,   11,  5,   10,  6,   9,   7,   8];
var colors = ['r', 'b', 'r', 'b', 'r', 'b', 'r', 'g', 'b', 'r', 'b', 'r', 'b', 'r', 'b'];

$(function() {
	var lastGames = getLastGames(10);
	var lastGamesHTML="";
	for (var i = 0; i < lastGames.length; i++)
		lastGamesHTML += "<div class='"+lastGames[i].color+"-ball inline'>"+lastGames[i].number+"</div>";
	$(".last-games").html(lastGamesHTML);
	
	fillCarusel(parseInt($(".inline:first-child").text()));
	$('#bet').val('0');
});

function getWinnerNumber() {
	return Math.rand(0, 14);
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
	plus = $(this).data('bet');
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
});

function botAddBet() {
	var bot = {};
	bot.name = getRandomBotName();
	bot.img = getRandomBotImg();
	bot.bet = Math.rand(1, 10000);
	
	tables = ['red', 'green', 'black'];
	addBet(tables[Math.rand(0,2)], bot);
}

function addBet(tableColor, player) {
	tableColor = tableColor || 'red';
	$('.bets-'+tableColor+'-table').append('<tr class="the-bet"><td class="the-bet__player"><img src="../images/ava/'+player.img+'">'+player.name+'</td><td class="the-bet__bet">'+player.bet+'</td></tr>');
}

function fillCarusel(lastNumber) {
	lastNumer = lastNumber || 1;
	var offset = $.inArray(lastNumber, numbers);
	if (offset == 0) offset = numbers.length-1;
	offset -= 2;
	
	$('.casesCarusel').css('margin-left', '-48px');
	
	var caruselHTML = "";
	
	for (var i = 0; i < winNumber; i++) {
		if (offset == numbers.length) offset = 0;
		color = colors[offset] == 'r' ? 'red' : colors[offset] == 'b' ? 'black' : 'green';
		caruselHTML += "<div class='"+color+"-block inline'>"+numbers[offset]+"</div>";
		offset++;
	}
	$('.casesCarusel').html(caruselHTML);
}