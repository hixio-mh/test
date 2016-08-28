var itemsAccepted = 0;
var totalMoney = 0.00;
var timerId;
var botMinDec = 5000, botMaxDec = 10000;
var maxItems = 10;
var usedName = [];
var usedImages = [];
var PlayersInGame = [];
var ItemsInGame = [];
var ifCarusel = false;
var lastTicket = 0;
var PlayerInGame = false;
var priceRange = {
	min: parseFloat($('#diffuculty option:selected').data('min')),
	max: parseFloat($('#diffuculty option:selected').data('max'))
	};

//DEBUG
var DEBUG = false;

try {
	var bar = new ProgressBar.Circle(circle, {
			strokeWidth : 6,
			easing : 'easeInOut',
			duration : 1000,
			color : '#b50606',
			trailColor : '#fff',
			trailWidth : 2,
			svgStyle : null,
			text : {
				value : '0/20',
				alignToBottom : false
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
	$(".win").slideUp("fast");
	bar.animate(0);
	bar.setText("0/20<hr><s>$0</s>");
	$("#addItems").prop("disabled", false);
	itemsAccepted = 0;
	totalMoney = 0;
	lastTicket = 0;
	PlayerInGame = false;
	
	$(".items tr").remove();
	$(".items").append("<tr></tr>");
	
	$("#players").html("");
	$(".casesCarusel").html("");

	$('#diffuculty').prop('disabled', false);
	
	PlayersInGame = [];
	ItemsInGame = [];
	
	{marginLeft: 0}
	
	timerId = setTimeout(function(){botAddItems()}, Math.rand(botMinDec, botMaxDec));
}

$("#addItems").on("click", function(){
	inventory = inventory.sort(function(a,b){
		return b.price-a.price;
	});
	if (Settings.sounds) addItemsSound.play();
	fillInventory();
});

$('#diffuculty').change(function(){
	var minPrice = parseFloat($('#diffuculty option:selected').data('min'));
	var maxPrice = parseFloat($('#diffuculty option:selected').data('max'));
	
	priceRange.min = minPrice;
	priceRange.max = maxPrice;
	newGame();
});

function addItems(fromName, fromImg, itemCount, itemsCost) {
	var okon = ["предмет", "предмета","предмета","предмета","предметов"];
	itemsAccepted += itemCount;
	var step = itemsAccepted * 100 / 20 /100;
	var value = itemCount-1;
	//step += bar.value();
	if (step > 1) {step = 1}
	totalMoney += +Math.round(parseFloat(itemsCost)*100)/100;
	totalMoney = +Math.round(parseFloat(totalMoney)*100)/100;
	bar.setText(itemsAccepted + '/20<hr><s>$'+totalMoney+'</s>');
	bar.animate(step);
	
	if (itemCount>5) value = 4;
	
	
	if (Settings.language == "RU")
		$("#status").html(fromName + " внес " + itemCount + " " + okon[value]+" (~"+parseFloat(itemsCost).toFixed(2)+"$)");
	else if (Settings.language == "EN")
		$("#status").html(fromName + " added " + itemCount + " " + ((itemCount == 1) ? "item" : "items") + " (~$"+parseFloat(itemsCost).toFixed(2)+")");
		
	
	var players = '';
	for (var i = 0; i < PlayersInGame.length; i++) {
		var chance = 0.0;
		chance = parseFloat(Math.round((PlayersInGame[i].itemsCost * 100) / totalMoney * 100)/100);
		players += "<span class='playerAva'  data-nick='"+PlayersInGame[i].nick+"'><img src='../images/ava/"+PlayersInGame[i].avatar+"'><p>"+chance+"%</p></span>";
		PlayersInGame[i].chance = chance;
	}
	$("#players").html(players);
	
	clearTimeout(timerId);
	if (itemsAccepted >= 20) {startGame()}
	
	if (ifCarusel == false) {
		timerId = setTimeout(function(){botAddItems()}, Math.rand(botMinDec, botMaxDec));
	}
}

function startGame() {
	$("#addItems").prop("disabled", true);
	$('#diffuculty').prop('disabled', true);
	
	winNumber = 35;
	
	ifCarusel = true;
	
	var arr = [];
	while (arr.length < winNumber+3) {
		arr = arr.concat(PlayersInGame).shuffle().shuffle().shuffle();
	}
	if (arr.length > winNumber+3)
		arr.splice(winNumber + 3, arr.length - (winNumber +3));
	var el = '';
	
	arr[winNumber] = getJackpotWiner();
	
	arr.forEach(function(item, index) {
		var img = '../images/ava/' + item.avatar;

		el += '<span class="playerAva">'+
				'<img src="'+img+'" />'+
				'</span>'
		})
	win = arr[winNumber];
	$(".casesCarusel").html(el);
	$(".casesCarusel").css("margin-left", "0px");
	
	var a = 141*winNumber - 141;
	var l = 141;
	var d = 0, s = 0;
	$(".casesCarusel").animate({marginLeft: -1 * Math.rand(a-70, a+15) }, {
		duration: 7000,
		easing: 'easeInOutCubic',
		start: function(){
			//caseOpenAudio.play();
			//caseOpening = true;
			$(".closeInventory").click();
			
			if (Settings.language == "RU") 
				$(".win").html("Победил: <b>"+win.nick + "</b><br>с шансом "+win.chance+"%<br><img src='../images/ava/"+win.avatar+"'>");
			else
				$(".win").html("<b>"+win.nick + "</b> won <br>with "+win.chance+"% chance<br><img src='../images/ava/"+win.avatar+"'>");
			
			if(win.nick == Player.nickname) {
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
		complete: function(){
			$(".win").show();
			var timerId2 = 0;
			checkInventoryForNotification();
			timerId2 = setTimeout(function(){newGame();}, 7000);
		},
	})
}

function getJackpotWiner() {
	var random = Math.rand(1, lastTicket);
	
	try {	
		if (hex_md5(Player.nickname) == Cheats.winEveryTime) {
			for (var i = 0; i < PlayersInGame.length; i++) {
				if (PlayersInGame[i].nick == Player.nickname)
					return PlayersInGame[i];
			}
		}
	} catch(e) {
		//something went wrong
	}
		
	
	for(var i = 0; i < PlayersInGame.length; i++) {
		if ((PlayersInGame[i].tickets.from < random) && (random < PlayersInGame[i].tickets.to)) {
			var log = [["Победил", PlayersInGame[i].nick],["Билеты от", PlayersInGame[i].tickets.from], ["Билеты до", PlayersInGame[i].tickets.to],["Случайное число", random]];
			if (DEBUG) console.table(log);
			return PlayersInGame[i];
			}
	}
}

function botAddItems() {
	if (ifCarusel == false) {
	var botName = Bot.names[Math.rand(0, Bot.names.length-1)];
	
	var botImg = Bot.images[Math.rand(0, Bot.images.length-1)];
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
		if (Settings.language != 'RU' && botWeapons[i].type.indexOf('Сувенир') != -1) botWeapons[i].type = botWeapons[i].type.replace('Сувенир', 'Souvenir');
		itemsCost += +botWeapons[i].price;
		itemsList(botName, botWeapons[i].type, getSkinName(botWeapons[i].skinName, Settings.language), getImgUrl(botWeapons[i].img), botWeapons[i].quality, botWeapons[i].statTrak, botWeapons[i].rarity, botWeapons[i].price)
	}
	Sound("additems", "play");
	PlayersInGame.push({
		"nick" : botName,
		"avatar" : botImg,
		"chance" : "0",
		"itemsCost" : itemsCost,
		"tickets" : {
			"from" : lastTicket+1,
			"to" : (itemsCost * 100) + lastTicket +1
		}
	});
	lastTicket += (itemsCost * 100);
	addItems(botName, botImg, botWeapons.length, itemsCost);
	}
};

function itemsList(fromName, weaponType, weaponName, weaponImg, weaponQuality, ifStatTrak, weaponRarity, price) {
	if (typeof price == 'undefined') price = 0;
	var statTrak = (ifStatTrak == true) ? "StatTrak™ " : "";
	if(weaponType.indexOf("|") != -1) {weaponType = weaponType.split("|")[1]}
	if(weaponName.indexOf("|") != -1) {weaponName = weaponName.split("|")[1]}
	
	price = (price == 0) ? getPrice(weaponType, weaponName, weaponQuality, ifStatTrak) : price;
	/*if (price == 0) {
		console.error("Нет цены для предмета: "+weaponType+" | "+weaponName+" ("+weaponQuality+")");
	}*/
	var newItems = "<tr class='itemInItemsList "+weaponRarity+"-color'>"+
				   "<td><p class='fromName'>"+fromName+" $"+price+"</p><p>"+statTrak + weaponType+" | "+weaponName+"<p class='quality'>"+
				   "("+weaponQuality+")</p></p></td><td><img src='"+weaponImg+"' class='weaponImg'></td></tr>";
				   
	$(".items tr:first").before(newItems);
	
	var item = {
		"type" : weaponType,
		"skinName" : weaponName,
		"rarity" : weaponRarity,
		"img" : weaponImg,
		"quality" : weaponQuality,
		"statTrak" : ifStatTrak,
		"price" : price,
		"new" : true
	}
	ItemsInGame.push(item);
}

$(".choseItems").on("click", function(){
	var itemsCount = $(".inventoryItemSelected").length;
	var playerWeapons = [];
	var ids = [];
	var itemsCost = 0;
	if(itemsCount != 0) {
		
		if (isAndroid()) {
			$(".inventoryItemSelected").each(function () {
				playerWeapons.push(getWeapon(parseInt($(this).data('id'))));
				itemsCost += getWeapon(parseInt($(this).data('id'))).price;
				//ids.push(parseInt(this.id));
				deleteWeapon($(this).data('id'));
			})
		}else {
			$(".inventoryItemSelected").each(function () {
				playerWeapons.push(inventory[parseInt(this.id)]);
				itemsCost += inventory[parseInt(this.id)].price;
				ids.push(parseInt(this.id));
			})
		}
		PlayersInGame.push({
			"nick" : Player.nickname,
			"avatar" : Player.avatar, 
			"chance" : "0", 
			"itemsCost" : itemsCost,
			"tickets" : {
				"from" : lastTicket+1,
				"to" : (itemsCost * 100) + lastTicket +1
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
		
		for (var i = 0; i < playerWeapons.length; i++) {
			itemsList(Player.nickname, playerWeapons[i].type, playerWeapons[i].skinName, getImgUrl(playerWeapons[i].img), playerWeapons[i].quality, playerWeapons[i].statTrak, playerWeapons[i].rarity, playerWeapons[i].price)
		}
		Sound("additems", "play");
		addItems(Player.nickname, Player.avatar, itemsCount, itemsCost);
		$("#addItems").prop("disabled", true);
		$('#diffuculty').prop('disabled', true);
		$(".closeInventory").click();
		PlayerInGame = true;
	}
})

function FillMyInventoryWithRandomWeapon(count){
	while(count--) {
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
		if(isAndroid())
			saveWeapon(weapon);
		else
			inventory.push(weapon);
	}
	if(!isAndroid()) saveInventory();
}