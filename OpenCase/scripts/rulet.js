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

var bar = new ProgressBar.Circle(circle, {
	strokeWidth: 6,
	easing: 'easeInOut',
	duration: 1000,
	color: '#105868',
	trailColor: '#2D96AE',
	trailWidth: 6,
	svgStyle: null,
	text: {
		value: '0/20',
		alignToBottom: false
	}
});

bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';

var addItemsSound = new Audio();
addItemsSound.src = "../sound/interface/menuClick.wav";
addItemsSound.volume = 0.9;

var selectItemSound = new Audio();
selectItemSound.src = "../sound/interface/SelectItem.wav";
selectItemSound.volume = 0.9;

var newItemsSound = new Audio();
newItemsSound.src = "../sound/interface/jackpotAddItems.wav";
newItemsSound.volume = 0.9;

//if ($("#changeOrientation").css('display') == 'block') {
	var orientationTimer = 0;
	orientationTimer = setTimeout(function(){
		$("#changeOrientation").hide('slow'),
		$("#changeOrientation img").hide('slow', function() {
			$("#changeOrientation").remove();
		})
	}, 2000);
//}

newGame();

function newGame() {
	clearTimeout(timerId);
	ifCarusel = false;
	$(".win").slideUp("slow");
	bar.animate(0);
	bar.setText("0/20");
	$("#addItems").attr("disabled", null);
	itemsAccepted = 0;
	totalMoney = 0;
	lastTicket = 0;
	
	$(".items tr").remove();
	$(".items").append("<tr></tr>");
	
	$("#players").html("");
	$(".casesCarusel").html("");
	
	PlayersInGame = [];
	ItemsInGame = [];
	
	{marginLeft: 0}
	
	timerId = setTimeout(function(){botAddItems()}, Math.rand(botMinDec, botMaxDec));
}

$("#addItems").on("click", function(){
	inventory = inventory.sort(function(a,b){
		return b.price-a.price;
	});
	addItemsSound.play();
	fillInventory();
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
	bar.setText(itemsAccepted + '/20<br><s>'+totalMoney+'$</s>');
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
	$("#addItems").attr("disabled", "disabled");
	
	winNumber = 70;
	
	ifCarusel = true;
	
	var arr = [];
	while (arr.length < winNumber+3) {
		arr = arr.concat(PlayersInGame).shuffle().shuffle().shuffle();
	}
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
	$(".casesCarusel").animate({marginLeft: -1 * Math.rand(a-75, a+20) }, {
		duration: 10000,
		easing: 'easeInOutCubic',
		start: function(){
			//caseOpenAudio.play();
			//caseOpening = true;
			$(".closeInventory").click();
			
			if (Settings.language == "RU") 
				$(".win").html("Победил: <b>"+win.nick + "</b><br>с шансом "+win.chance+"%<br><img src='../images/ava/"+win.avatar+"'>");
			else if (Settings.language == "EN")
				$(".win").html("<b>"+win.nick + "</b> won <br>with "+win.chance+"% chanse<br><img src='../images/ava/"+win.avatar+"'>");
			/*$(".winQuality").html(getItemQuality()[1]);
			$(".winImg").attr("src", prefix + win.img + postfixBig);
			$(".openCase").attr("disabled", "disabled");*/
		},
		progress: function(e, t) {
			/*progress_animate = Math.round(100 * t),
            s = parseInt(parseInt($(".casesCarusel").css("marginLeft").replace(/[^0-9.]/g, "") - l / 2) / l),
            s > d && (caseScrollAudio.pause(),caseScrollAudio.currentTime = 0,
            caseScrollAudio.play(),
            d++)*/
		},
		complete: function(){
			//caseCloseAudio.play();
			//$(".openCase").text("Попробовать еще раз");
			//$(".win").slideDown("slow");
			//caseOpening = false;
			//$(".openCase").attr("disabled", null);
			//$(".weapons").scrollTop(185);
			$(".win").slideDown("slow");
			var timerId2 = 0;
			timerId2 = setTimeout(function(){newGame();}, 7000);
			
			if(win.nick == Player.nickname) {
				console.info("Player win! Inventory before:");
				console.info(inventory);
				for (var i = 0; i < ItemsInGame.length; i++) {
					inventory.push(ItemsInGame[i]);
				}
				console.info("Inventory after:");
				console.info(inventory);
				console.info("Items in game:");
				console.info(ItemsInGame);
				saveInventory();
				
				//Statistic
				statisticPlusOne('rulet-wins');
				
				var a = $.cookie('rulet-max-win');
				var winSum = parseFloat($('.progressbar-text s').text());
				if (typeof a == "undefined")
					a = winSum;
				else
					a = winSum > parseFloat(a) ? winSum : parseFloat(a);
				a++;
				$.cookie('rulet-max-win', a);	
			} else {
				statisticPlusOne('rulet-loose');
			}
		},
		always: function() {
			//$(".openCase").attr("disabled", null);
		}
	})
}

function getJackpotWiner() {
	//var sumChanses = 100;
	//var sumWeights = 1;
	var random = Math.rand(1, lastTicket);
	
	/*for(var i = 0; i < PlayersInGame.length; i++) {
		sumChanses += PlayersInGame[i].chance;
	}*/
	for(var i = 0; i < PlayersInGame.length; i++) {
		if ((PlayersInGame[i].tickets.from < random) && (random < PlayersInGame[i].tickets.to)) {
			var log = [["Победил", PlayersInGame[i].nick],["Билеты от", PlayersInGame[i].tickets.from], ["Билеты до", PlayersInGame[i].tickets.to],["Случайное число", random]];
			console.table(log);
			return PlayersInGame[i];
			}
	}
	/*for(var i = 0; i < PlayersInGame.length; i++) {
		sumWeights += PlayersInGame[i].weight;
	}*/
	/*var cursor = 0;
	for(var i = 0; i < PlayersInGame.length; i++) {
		cursor += PlayersInGame[i].weight / sumWeights;
		if (cursor >= random) {
			return PlayersInGame[i];
		}
	}*/
}

function botAddItems() {
	if (ifCarusel == false) {
	var botName = Bot.names[Math.rand(0, Bot.names.length-1)];
	
	var botImg = Bot.images[Math.rand(0, Bot.images.length-1)];
	var botWeapons = [];
	var itemsCost = 0.00;
	
	for (var i = 0; i < Math.rand(1, maxItems); i++) {
		botWeapons.push(getRandomWeapon(0));
	}
	for (var i = 0; i < botWeapons.length; i++) {
		var qual = getItemQuality()[Settings.language == 'RU' ? 1 : 0];
		var st = ifStatTrak(botWeapons[i].type);
		var price = getPrice(botWeapons[i].type, botWeapons[i].skinName, qual, st);
		
		var z = 0;
		while (price == 0) {
			qual = Quality[z].name[Settings.language == 'RU' ? 1 : 0];
			price = getPrice(botWeapons[i].type, botWeapons[i].skinName, qual, st);
			if (z == 4) break;
			z++
		}
		if (Settings.language != 'RU' && botWeapons[i].type.indexOf('Сувенир') != -1) botWeapons[i].type = botWeapons[i].type.replace('Сувенир', 'Souvenir');
		itemsCost += +price;
		itemsList(botName, botWeapons[i].type, getSkinName(botWeapons[i].skinName, Settings.language), getImgUrl(botWeapons[i].img), qual, st, botWeapons[i].rarity, price)
	}
	newItemsSound.play()
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
}

function itemsList(fromName, weaponType, weaponName, weaponImg, weaponQuality, ifStatTrak, weaponRarity, price) {
	if (typeof price == 'undefined') price = 0;
	var statTrak = (ifStatTrak == true) ? "StatTrak™ " : "";
	if(weaponType.indexOf("|") != -1) {weaponType = weaponType.split("|")[1]}
	if(weaponName.indexOf("|") != -1) {weaponName = weaponName.split("|")[1]}
	
	price = (price == 0) ? getPrice(weaponType, weaponName, weaponQuality, ifStatTrak) : price;
	if (price == 0) {
		console.error("Нет цены для предмета: "+weaponType+" | "+weaponName+" ("+weaponQuality+")");
	}
	var newItems = "<tr class='itemInItemsList "+weaponRarity+"'>"+
				   "<td><p class='fromName'>"+fromName+"</p><p>"+statTrak + weaponType+" | "+weaponName+"<p class='quality'>"+
				   "("+weaponQuality+")</p></p></td><td><img src='"+weaponImg+"' class='weaponImg'></td></tr>";
				   
	$(".items tr:first").before(newItems);
	
	var item = {
		"type" : weaponType,
		"skinName" : weaponName,
		"rarity" : weaponRarity,
		"img" : weaponImg,
		"quality" : weaponQuality,
		"statTrak" : ifStatTrak,
		"price" : price
	}
	ItemsInGame.push(item);
}

function getRandomWeapon(specialClass) {
	if (typeof specialClass == 'undefined') specialClass = 0;
	var randomCaseId = Math.rand(0, cases.length-1);
	
	if ((specialClass == 0) && (typeof cases[randomCaseId].specialClass != "undefined")) {
		randomCaseId = Math.rand(0, cases.length-1);
		while (typeof cases[randomCaseId].specialClass != "undefined") {
			randomCaseId = Math.rand(0, cases.length-1);
		}
	}
	var randomWeaponId = Math.rand(0, cases[randomCaseId].weapons.length-1);
	
	return cases[randomCaseId].weapons[randomWeaponId];
}

$(".closeInventory").on("click", function(){
	$(".inventoryList").css("display", "none");
	$("#inventorySum").remove();
})

$(".choseItems").on("click", function(){
	var itemsCount = $(".inventoryItemSelected").length;
	var playerWeapons = [];
	var ids = [];
	var itemsCost = 0;
	if(itemsCount != 0) {
		
		$(".inventoryItemSelected").each(function(){
			playerWeapons.push(inventory[parseInt(this.id)]);
			itemsCost += inventory[parseInt(this.id)].price;
			ids.push(parseInt(this.id));
		})
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
		for (var i = 0; i < ids.length; i++) {
			var d = ids[ids.length-i-1];
			inventory.splice(d, 1);
		}
		saveInventory();
	
	
		for (var i = 0; i < playerWeapons.length; i++) {
			itemsList(Player.nickname, playerWeapons[i].type, playerWeapons[i].skinName, getImgUrl(playerWeapons[i].img), playerWeapons[i].quality, playerWeapons[i].statTrak, playerWeapons[i].rarity)
		}
		newItemsSound.play();
		addItems(Player.nickname, Player.avatar, itemsCount, itemsCost);
		$("#addItems").attr("disabled", "disabled");
		$(".closeInventory").click();
	}
})

$(document).on("click", ".weapon", function(){
	selectItemSound.pause();
	selectItemSound.currentTime = 0;
	
	if ($(".inventoryItemSelected").length < maxItems) {
		$(this).toggleClass("inventoryItemSelected");
		selectItemSound.play();
	} else if ($(this).hasClass("inventoryItemSelected")) {
		$(this).toggleClass("inventoryItemSelected");
		selectItemSound.play();
	}
	
	if ($("li").is(".inventoryItemSelected")) {
		var sumText = Localization.jackpot2.sumText[Settings.language];
		if ($("div").is("#inventorySum")){
			var sumPr = 0.0;
			$(".inventoryItemSelected").each(function(){
				sumPr += parseFloat($("i", this).text(), 10)
			});
			$("#inventorySum").html(sumText+sumPr.toFixed(2)+"$");
		} else {
			$(".inventoryList").append("<div id='inventorySum'>"+sumText+$("i", this).text());
		}
	} else {
		$("#inventorySum").remove();
	}
})

function fillInventory() {
	$("#intentory-Player").html(Localization.jackpot2.playerInventory[Settings.language]);
	$(".inventory li").remove();
	
	for(var i = 0; i < inventory.length; i++) {
		var weapon = inventory[i];
		//var img = prefix + weapon.img + postfix;
	
		var type = weapon.type;
		if(type.indexOf("|") != -1) {type = type.split("|")[1]}
	
		var name = weapon.skinName;
		if(name.indexOf("|") != -1) {name = name.split("|")[1]}
		var weaponInfo = "<img src='"+getImgUrl(weapon.img)+"'><div class='weaponInfo "+weapon.rarity+"'><span class='type'>"+type+"<br>"+name+		"</span></div><i>"+weapon.price+"$</i>";
		$(".inventory").append("<li class='weapon "+ ((weapon.statTrak == 1) ? "wp-statTrak" : "") +"' id='"+i+"-inventoryItem'>"+weaponInfo+"</li>");
	}
	if (inventory.length == 0) {
		$(".inventory").append("<li>"+Localization.jackpot2.emptyInventory[Settings.language]+"</li>");
	}
$(".inventoryList").css("display", "block");
}

function FillMyInventoryWithRandomWeapon(count){
	while(count--) {
		var weapon = getRandomWeapon(1)
		weapon.quality = getItemQuality()[1];
		weapon.statTrak = ifStatTrak(weapon.type);
		weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
		
		var z = 0;
		while (weapon.price == 0) {
			weapon.quality = Quality[z].name[1];
			weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
			if (z == 4) break;
			z++
		}
		inventory.push(weapon);
	}
	saveInventory();
}