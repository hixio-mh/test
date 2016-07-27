var Games = [];
var PlayerBet = {};
var maxWeapons = 15;
var maxItems = maxWeapons,
	PlayerInGame = false;
var priceRange = {
	low: {min: 20, max: 60},
	normal: {min: 60, max: 120},
	hight: {min: 120, max: 350},
	legendary: {min: 350, max: 999999}
};
var timerId = 0;

var flipSoundCT = new Audio();
flipSoundCT.src = "../sound/coinFlip.wav";
flipSoundCT.volume = 0.7;
flipSoundCT.loop = true;

var clickSound = new Audio();
clickSound.src = "../sound/interface/menuClick.wav";
clickSound.volume = 0.9;


$(window).load(function() {
	var anim = document.getElementById('coin');
	anim.addEventListener("animationend", coinStoped, false);
	
	var games_order = ['low', 'low', 'normal', 'normal', 'hight', 'hight', 'legendary', 'legendary'];
	var list = '';
	for (var i = 0; i < games_order.length; i++) {
		var game = botAddGame(games_order[i]);
		Games.push(game);
		//list += "<tr><td class='table-name'><img src='../images/ava/"+game.img+"'><span>"+game.name+"</span></td><td>"+game.weapons.length+" items <span class='view'>(view)</span></td><td>$"+game.items_cost+" / Open</td><td><span class='join "+game.color+"' data-game-id="+i+">Join</span></td></tr>";
	}
	Games = Games.sort(function(a,b){
		return parseFloat(a.bot.items_cost)-parseFloat(b.bot.items_cost);
	});
	
	for (var i = 0; i < Games.length; i++) {
		list += "<tr><td class='table-name'><img src='../images/ava/"+Games[i].bot.img+"'><span>"+Games[i].bot.name+"</span></td><td>"+Games[i].bot.weapons.length+" items</td><td>$"+Games[i].bot.items_cost.toFixed(2)+"</td><td><span class='join "+Games[i].color+"' data-game-id="+i+">"+Localization.coinflip2.join[Settings.language]+"</span></td></tr>";
	}
	$('.games').append(list);
	$('#js-table-loading-gif').remove();
});

$(document).ready(function() {
	$('.navigationBar').append('<img src="../images/navigation/refresh.png" class="navigationBar_refresh">');
});

$(document).on('click', '.navigationBar_refresh', function(){
	location.reload();
});

$(document).on('click', '.game__start span', function(){
	startGame();
});

function startGame() {
	$('#coin').removeClass();
	var win = getRandomItem(['CT', 'T'], [Games[PlayerInGame].bot.chance, Games[PlayerInGame].player.chance]);
	animation = win;
	
	$('.game__start').css('display', 'none');
	$('.addWeapons').addClass('hide');
	
	$('.coin-blur').removeClass('hide');
	$('#coin-flip-cont').removeClass('hide');
	
	$("#coin").addClass(animation);
	
	flipSoundCT.currentTime = 0;
	//if (Settings.sounds)flipSoundCT.play();
}

function coinStoped() {
	//if (Settings.sounds) flipSoundCT.pause();
	var winner = $('#coin').attr('class');
	if (winner == 'CT') {
		$('.game__bot__img').addClass('winner-img');
	} else {
		$('.game__player__img').addClass('winner-img');
		for (var i = 0; i < PlayerBet.weapons.length; i++) {
			PlayerBet.weapons[i].new = true;
			inventory.push(PlayerBet.weapons[i]);
		}
		for (var i = 0; i < Games[PlayerInGame].bot.weapons.length; i++) {
			Games[PlayerInGame].bot.weapons[i].new = true;
			inventory.push(Games[PlayerInGame].bot.weapons[i]);
		}
		saveInventory();
	}
	Games[PlayerInGame].winner = winner;
	Games[PlayerInGame].player.weapons = [];
	Games[PlayerInGame].player.items_cost = PlayerBet.items_cost;
	
	for (var i = 0; i < PlayerBet.weapons.length; i++)
		Games[PlayerInGame].player.weapons.push(PlayerBet.weapons[i]);
	
	checkInventoryForNotification();
	
	timerId = setTimeout(function(){
		hideCoin();
	}, 3000);
	
	$(document).on('click', '.coin-blur', function() {
		hideCoin();
	});
	
}

function hideCoin() {
	clearTimeout(timerId);
	timerId = null;
	var winner = $('#coin').attr('class');
	$('.coin-blur').addClass('hide');
	$('#coin-flip-cont').addClass('hide');
	PlayerBet = {};
	$($('.join')[PlayerInGame]).text(Localization.coinflip2.view[Settings.language]);
	PlayerInGame = false;
	maxItems = maxWeapons;
	//newGame();
	$('.game__table__win').html(Localization.coinflip2.winner[Settings.language]+'<br><img src="../images/coinflip/'+winner.toLowerCase()+'.png">')
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
 

$(document).on('click', '.addWeapons', function() {	
	PlayerInGame = $(this).data('game-id');
	inventory = inventory.sort(function(a,b){
		return b.price-a.price;
	});
	if (Settings.sounds) clickSound.play();
	fillInventory();
});

$(document).on('click', '.join', function(){
	if (typeof PlayerBet.weapons != 'undefined') PlayerInGame = $(this).data('game-id');
	if (Settings.sounds) clickSound.play();
	showGame($(this).data('game-id'));
	$('#coin').removeClass();	
});

function showGame(game_id) {
	$('.addWeapons').removeClass('hide');
	$('.game__bot__nick').text(Games[game_id].bot.name);
	$('.game__bot__img').attr('src', '../images/ava/'+Games[game_id].bot.img);
	$('.game__bot__price').text('$'+Games[game_id].bot.items_cost.toFixed(2));
	
	$('.game__player__nick').text(Player.nickname);
	$('.game__player__img').attr('src', '../images/ava/'+Player.avatar);
	$('.game__player__price').text('$0');
	$('.game__player__chance').text('0%');
	
	$('.game__table__win').html("");
		
	var bot_inventory = Games[game_id].bot.weapons;
	
	$('.player-inventory tr').remove();
	$(".bot-inventory tr").remove();
	for(var i = 0; i < bot_inventory.length; i++) {
		var weapon = bot_inventory[i];
	
		if (Settings.language != 'RU' && weapon.type.indexOf('Сувенир') != -1) weapon.type = weapon.type.replace('Сувенир', 'Souvenir');
		var weaponInfo = "<tr><td class='"+weapon.rarity+"-color inv_rarity'></td><td><span class='inv_type'>"+weapon.type+"</span><span class='inv_name'>"+weapon.skinName+"</span></td><td class='inv_price'>$"+weapon.price+"</td></tr>";
		$('.bot-inventory').append(weaponInfo);
	}
	if (PlayerInGame === false && typeof Games[game_id].winner == 'undefined') {
		$('.player-inventory').append('<tr><td class="addWeapons" data-game-id="'+game_id+'">'+Localization.coinflip2.add_weapons[Settings.language]+'</td></tr>');
		$('.game__start').css('display', 'none');
		
	} else if (typeof Games[game_id].winner == 'undefined') {
		$('.game__player__price').text('$'+PlayerBet.items_cost.toFixed(2));
		
		for(var i = 0; i < PlayerBet.weapons.length; i++) {
			var weapon = PlayerBet.weapons[i];
	
			if (Settings.language != 'RU' && weapon.type.indexOf('Сувенир') != -1) weapon.type = weapon.type.replace('Сувенир', 'Souvenir');
			var weaponInfo = "<tr><td class='inv_price'>$"+weapon.price+"</td><td><span class='inv_type'>"+weapon.type+"</span><span class='inv_name'>"+weapon.skinName+"</span></td><td class='"+weapon.rarity+"-color inv_rarity'></td></tr>";
			$('.player-inventory').append(weaponInfo);
		}
		$('.game__start').css('display', 'block');
		
		if(PlayerBet.weapons.length < maxWeapons){
			maxItems = maxWeapons - PlayerBet.weapons.length;
			$('.player-inventory').append('<tr><td colspan="3" class="addWeapons" data-game-id="'+game_id+'">'+Localization.coinflip2.add_weapons[Settings.language]+'</td></tr>');
		}
		
		var sum = Games[game_id].bot.items_cost + PlayerBet.items_cost;
		var botChance = (Games[game_id].bot.items_cost * 100) / sum;
		var playerChance = (PlayerBet.items_cost * 100) / sum;
		Games[game_id].bot.chance = botChance;
		Games[game_id].player.chance = playerChance;
		$('.game__bot__chance').text(botChance.toFixed(1)+'%');
		$('.game__player__chance').text(playerChance.toFixed(1)+'%');
		
	} else if (typeof Games[game_id].winner != 'undefined') {
		if (Games[game_id].winner == 'CT') 
			$('.game__bot__img').addClass('winner-img');
		else
			$('.game__player__img').addClass('winner-img');
		$('.game__player__chance').text(Games[game_id].player.chance.toFixed(1)+'%');
		$('.game__player__price').text('$'+Games[game_id].player.items_cost.toFixed(2));
		$('.game__bot__chance').text(Games[game_id].bot.chance.toFixed(1)+'%');
		$('.game__start').css('display', 'none');
		
		$('.game__table__win').html(Localization.coinflip2.winner[Settings.language]+'<br><img src="../images/coinflip/'+Games[game_id].winner.toLowerCase()+'.png">')
		
		for(var i = 0; i < Games[game_id].player.weapons.length; i++) {
			var weapon = Games[game_id].player.weapons[i];
	
			if (Settings.language != 'RU' && weapon.type.indexOf('Сувенир') != -1) weapon.type = weapon.type.replace('Сувенир', 'Souvenir');
			var weaponInfo = "<tr><td class='inv_price'>$"+weapon.price+"</td><td><span class='inv_type'>"+weapon.type+"</span><span class='inv_name'>"+weapon.skinName+"</span></td><td class='"+weapon.rarity+"-color inv_rarity'></td></tr>";
			$('.player-inventory').append(weaponInfo);
		}
	}
	$('.blur').css('display', 'block');
	$(".game").css("display", "block");
}

$(document).on('click', '.close-game, .blur', function() {
	$('.game__bot__img').removeClass('winner-img');
	$('.game__player__img').removeClass('winner-img');
	$('.game').css('display', 'none');
	$('.blur').css('display', 'none');
	if (Settings.sounds) clickSound.play();
	//PlayerInGame = false;
});

$(document).on("click", ".choseItems", function(){
	var itemsCount = $(".inventoryItemSelected").length;
	var playerWeapons = [];
	var ids = [];
	if (Settings.sounds) clickSound.play();
	if(itemsCount != 0) {
		if (typeof PlayerBet.nick == 'undefined') {
			PlayerBet = {
				"nick" : Player.nickname,
				"chance" : 0,
				"items_cost" : 0
			};
			PlayerBet.weapons = [];
		}
		$(".inventoryItemSelected").each(function(){
			PlayerBet.weapons.push(inventory[parseInt(this.id)]);
			PlayerBet.items_cost += inventory[parseInt(this.id)].price;
			ids.push(parseInt(this.id));
		})
		for (var i = 0; i < ids.length; i++) {
			var d = ids[ids.length-i-1];
			inventory.splice(d, 1);
		}
		saveInventory();

		$(".inventoryList").css("display", "none");
		$("#inventorySum").remove();
		showGame(PlayerInGame);
	}
});
$(document).on('click', ".closeInventory", function(){
	if (typeof PlayerBet.items_cost == 'undefined') PlayerInGame = false;
	if (Settings.sounds) clickSound.play();
});

function botAddGame(difficulty) {
	var bot = {};
	bot.name = getRandomBotName();
	bot.img = getRandomBotImg();
	bot.weapons = [];
	bot.items_cost = 0.0;
	
	var weaponCount = Math.rand(3, maxWeapons);
	console.log('Random number: '+'%c '+weaponCount+' ', 'background: #006E99')
	for (var q = 0; q < weaponCount; q++) {
		var rnd = Math.rand(0, Prices.length-1)
		var weapon = Prices[rnd];
		//console.log(rnd);
		var price = (weapon.marketPrice == 0) ? weapon.avgPrice : weapon.marketPrice;
		
		if (price > priceRange[difficulty].min && price < priceRange[difficulty].max) {
			var type = weapon.type;
			var name = getSkinName(weapon.name);
			var quality = getQualityName(weapon.quality, Settings.language);
			
			var brk = false;
			
			for (var i = 0; i < cases.length; i++) {
				for (var z = 0; z < cases[i].weapons.length; z++) 
					if ((cases[i].weapons[z].type == type) && (getSkinName(cases[i].weapons[z].skinName) == name)) {
						var wp = cases[i].weapons[z];
						wp.skinName = getSkinName(name, Settings.language);
						wp.price = price;
						wp.statTrak = (typeof weapon.statTrak == 'undefined') ? false : true;
						wp.quality = quality;
					
						bot.weapons.push(wp);
						bot.items_cost += price;
					
						brk = true;
						break;
					}
				if (brk) break;
			}
			if (!brk) weaponCount++;
		} else {
			weaponCount++;
		}
	}
	
	/*for (var i = 0; i < weaponCount; i++) {
		var weapon = getRandomWeapon(1);
		weapon.skinName = getSkinName(weapon.skinName, Settings.language);
		weapon.quality = getItemQuality()[Settings.language == 'RU' ? 1 : 0];
		weapon.statTrak = ifStatTrak(weapon.type);
		var price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
		
		if (price > priceRange[difficulty].min && price < priceRange[difficulty].max) {
			weapon.price = price;
			bot.weapons.push(weapon);
			bot.items_cost += weapon.price;
		} else {
			//i--;
			weaponCount++;
		}
	}*/
	var color = '';
	if (bot.items_cost < 100) color = 'consumer-color';
	if (bot.items_cost > 100 && bot.items_cost < 500) color = 'milspec-color';
	if (bot.items_cost > 500 && bot.items_cost < 1000) color = 'restricted-color';
	if (bot.items_cost > 1000 && bot.items_cost < 3000) color = 'classified-color';
	if (bot.items_cost > 3000 && bot.items_cost < 8000) color = 'covert-color';
	if (bot.items_cost > 8000) color = 'rare-color';
	var Temp = {};
	Temp.color = color;
	Temp.bot = bot;
	Temp.player = {};
	return Temp;
}