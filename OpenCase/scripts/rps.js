var anim = document.getElementById('js-left-hand');
anim.addEventListener("animationend", listener, false);


var yourScore = 0,
	enemyScore = 0,
	totalRounds = 3,
	round = 1,
	maxItems = 1;
	
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

$('.add-item').on('click', function(){
newGame();

inventory = inventory.sort(function(a,b){
	return b.price-a.price;
});

fillInventory();
});

$(document).on("click", '.closeInventory', function(){
	$(".inventoryList").css("display", "none");
	$("#inventorySum").remove();
});

$(document).on("click", ".weapon", function(){
	selectItemSound.pause();
	if (!isNaN(selectItemSound.duration))
		selectItemSound.currentTime = 0;
	
	if ($(".inventoryItemSelected").length < maxItems) {
		$(this).toggleClass("inventoryItemSelected");
		selectItemSound.play();
	} else if ($(this).hasClass("inventoryItemSelected")) {
		$(this).toggleClass("inventoryItemSelected");
		selectItemSound.play();
	}
});

$(".choseItems").on("click", function () {
	var itemsCount = $(".inventoryItemSelected").length;
	if (itemsCount == 0) {
		$(".closeInventory").click();
		return false;
	}
	//var playerWeapons = [];
	var ids = [];
	var itemsCost = 0;

	$(".inventoryItemSelected").each(function () {
		winItems.push(inventory[parseInt(this.id)]);
		itemsCost += inventory[parseInt(this.id)].price;
		ids.push(parseInt(this.id));
	})
	for (var i = 0; i < ids.length; i++) {
		var d = ids[ids.length - i - 1];
		inventory.splice(d, 1);
	}
	saveInventory();
	/*newItemsSound.play();
	addItems(Player.nickname, Player.avatar, itemsCount, itemsCost);*/
	$(".add-item").css("display", 'none');
	$(".closeInventory").click();
	
	$('.winItems').append('<li>'+Localization.rps2.youAdd[Settings.language]+winItems[0].type+' | '+winItems[0].skinName+' ($'+winItems[0].price+')<b class='+winItems[0].rarity+'></b>');
	botAddWeapon(itemsCost);
	
	$('.choice').css('display', 'block');
	$('.status').text('...');
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
	} else if (itemsCost >=10 && itemsCost < 50) {
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
		minPrice = itemsCost - 200;
		maxPrice = itemsCost + 200;
	}
	
	var canContinue = false;
	while (!canContinue) {
		var weapon = getRandomWeapon(0);
		weapon.quality = getItemQuality()[Settings.language == 'RU' ? 1 : 0];
		weapon.statTrak = ifStatTrak(weapon.type);
		price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
		
		var z = 0;
		while (price == 0) {
			qual = Quality[z].name[Settings.language == 'RU' ? 1 : 0];
			price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
			if (z == 4) break;
			z++
		}
		if (price > minPrice && price < maxPrice)
			canContinue = true;
	}
	weapon.skinName = getSkinName(weapon.skinName, Settings.language);
	weapon.quality = getQualityName(weapon.quality, Settings.language)
	weapon.price = price;
	if (Settings.language != 'RU' && weapon.type.indexOf('Сувенир') != -1) weapon.type = weapon.type.replace('Сувенир', 'Souvenir');
	winItems.push(weapon);
	$('.winItems').append('<li>'+Localization.rps2.opponentAdd[Settings.language]+winItems[1].type+' | '+winItems[1].skinName+' ($'+winItems[1].price+')<b class='+winItems[1].rarity+'></b>');
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
	} else if (whoWin == 'comp'){
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
	
	if (round == totalRounds+1 || (yourScore == 2 && enemyScore == 0) || (yourScore == 0 && enemyScore == 2))
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
			inventory.push(winItems[i]);
		}
		saveInventory();
		statisticPlusOne('rps-wins');
	} else {
		$('.status').text(Localization.rps2.lostGame[Settings.language]);
		statisticPlusOne('rps-loose');
	}
	
	winItems = [];
	
	round = 1;
	yourScore = 0;
	enemyScore = 0;
	
	$(".choice").css("display", 'none');
	$(".add-item").css("display", 'block');
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

function startGame(userChoice) {
var computerChoice = Math.random();
if (computerChoice < 0.34) {
    computerChoice = "rock";
} else if(computerChoice <= 0.67) {
    computerChoice = "paper";
} else {
    computerChoice = "scissors";
}

$('#js-player-img').attr('src', '../images/rps/'+userChoice+'.png');
$('#js-comp-img').attr('src', '../images/rps/'+computerChoice+'.png');

return compare(userChoice, computerChoice);
}

function compare(choice1,choice2) {
    if (choice1===choice2) {
        return "tie";
    }
    if (choice1==="rock") {
        if (choice2==="scissors") {
            return "player";
        } else {
            return "comp";
        }
    }
    if (choice1==="paper") {
        if (choice2==="rock") {
            return "player";
        } else {
            return "comp";
        }
    }
    if (choice1==="scissors") {
        if (choice2==="rock") {
            return "comp";
        } else {
            return "player";
        }
    }
};