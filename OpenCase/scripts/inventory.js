var selectItemSound = new Audio();
selectItemSound.src = "../sound/interface/SelectItem.wav";
selectItemSound.volume = 0.9;

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
	var need_save = false;
	
	for(var i = 0; i < inventory.length; i++) {
		var weapon = inventory[i];
		//var img = prefix + weapon.img + postfix;
		
		if (typeof weapon.new == 'undefined') 
			weapon.new = false;
	
		var type = weapon.type;
		if(type.indexOf("|") != -1) {type = type.split("|")[1]}
	
		var name = weapon.skinName;
		if(name.indexOf("|") != -1) {name = name.split("|")[1]}
		var weaponInfo = "<img src='"+getImgUrl(weapon.img)+"'><div class='weaponInfo "+weapon.rarity+"'><span class='type'>"+type+"<br>"+name+		"</span></div><i>"+weapon.price+"$</i>";
		$(".inventory").append("<li class='weapon "+ ((weapon.statTrak == 1) ? "wp-statTrak" : "") +" "+((weapon.new == true) ? "new-weapon" : "")+"' id='"+i+"-inventoryItem'>"+weaponInfo+"</li>");
		
		if (weapon.new == true) {
			inventory[i].new = false;
			need_save = true;
		}
	}
	if (inventory.length == 0) {
		$(".inventory").append("<li>"+Localization.jackpot2.emptyInventory[Settings.language]+"</li>");
	}
$(".inventoryList").css("display", "block");
if (need_save) saveInventory();
}

$(document).on("click", ".weapon", function(){
	selectItemSound.pause();
	if (!isNaN(selectItemSound.duration))
		selectItemSound.currentTime = 0;
	
	var parent = $(this).parent()[0];
	
	if ($(parent).hasClass('inv-no-select')) return false;
	
	if ($(".inventoryItemSelected").length < maxItems) {
		$(this).toggleClass("inventoryItemSelected");
		if (Settings.sounds)selectItemSound.play();
	} else if ($(this).hasClass("inventoryItemSelected")) {
		$(this).toggleClass("inventoryItemSelected");
		if (Settings.sounds)selectItemSound.play();
	}
	
	if ($(parent).hasClass('inv-price-counter')) {
		if ($("li").is(".inventoryItemSelected")) {
			var sumText = Localization.jackpot2.sumText[Settings.language];
			if ($("div").is("#inventorySum")) {
				var sumPr = 0.0;
				$(".inventoryItemSelected").each(function () {
					sumPr += parseFloat($("i", this).text(), 10)
				});
				$("#inventorySum").html(sumText + sumPr.toFixed(2) + "$");
			} else {
				$(".inventoryList").append("<div id='inventorySum'>" + sumText + $("i", this).text());
			}
		} else {
			$("#inventorySum").remove();
		}
	}
});

$(document).on("click", '.closeInventory', function(){
	$(".inventoryList").css("display", "none");
	$("#inventorySum").remove();
});