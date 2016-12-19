
$(function() {
	if ($(".inventory").length) {
		$('.inventory').html('<li class="js-loading-inventory" data-from="1"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
	
		$('.inventoryList').on('scroll', function() {
			if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight-80) {
				if (!inventory_loading && isAndroid() && client.getInventoryLength("") > $(this).find('.weapon').length)
					fillInventory();
			}
		});
	}
})

function getRandomWeapon(specialClass, canCheck) {
	if (typeof specialClass == 'undefined') specialClass = 0;
	var randomCaseId = Math.rand(0, cases.length-1);
	
	if ((specialClass == 0) && (typeof cases[randomCaseId].specialClass != "undefined")) {
		randomCaseId = Math.rand(0, cases.length-1);
		while (typeof cases[randomCaseId].specialClass != "undefined") {
			randomCaseId = Math.rand(0, cases.length-1);
		}
	}
	var randomWeaponId = Math.rand(0, cases[randomCaseId].weapons.length-1);
	var wp = cases[randomCaseId].weapons[randomWeaponId];
    
    if (canCheck && typeof wp[canCheck] != 'undefined' && wp[canCheck] == false) {
        return getRandomWeapon(specialClass, canCheck);
    }
	
	if (typeof cases[randomCaseId].canBeSouvenir != 'undefined' && cases[randomCaseId].canBeSouvenir)
		wp.type = (Math.rand(0, 10) > 7) ? Localization.souvenir[Settings.language]+' '+wp.type : wp.type;
	
	return cases[randomCaseId].weapons[randomWeaponId];
}

function fillInventory(selector) {
    selector = selector || ".inventory";
	if ($('.js-loading-inventory').length == 0){
		if (isAndroid()) {
			if ($(selector+' .weapon').length != 0) {
				$(selector+" .weapon").remove();
				$(selector).append('<li class="js-loading-inventory" data-from="1"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
			} else if ($('.inventoryItemSelected').length != 0) {
                return false;
            }
		}
	}
	
	inventory_loading = true;
	var wp_from = parseInt($('.js-loading-inventory').data('from'));
	wp_from = wp_from || 1;
	if (isAndroid()) {
		var inventory = getInventory(wp_from, wp_from+inventory_step-1);
	} else {
		if ($(selector+' .weapon').length != 0) 
			$(selector+" .weapon").remove();
		var inventory = _getInventoryLocalStorage();
		/*if ($('.weapon').length == inventory.length) {
			inventory_loading = false;
			return false;
		}*/
	}
	
	$("#intentory-Player").html(Localization.jackpot2.playerInventory[Settings.language]);
	$(".js-loading-inventory").remove();
	var need_save = false;
	
	for(var i = 0; i < inventory.length; i++) {
		var weapon = inventory[i];
		//var img = prefix + weapon.img + postfix;
		
		if (typeof weapon['new'] == 'undefined') 
			weapon['new'] = false;
	
		var type = weapon.type;
		type = (Settings.language == 'RU') ? type.replace(/souvenir/gi, "Сувенир") : type.replace(/Сувенир/gi, "Souvenir");
        
        if (typeof weapon.id == 'undefined') weapon.id = i;
		
		var name = getSkinName(weapon.skinName, Settings.language);
		var weaponInfo = "<img src='"+getImgUrl(weapon.img)+"'><div class='weaponInfo "+weapon.rarity+"'><span class='type'>"+type+"<br>"+name+		"</span></div><i>"+weapon.price+"$</i>";
		$(selector).append("<li class='weapon "+ ((weapon.statTrak == 1) ? "wp-statTrak" : "") +" "+((weapon['new'] == true) ? "new-weapon" : "")+"' id='"+i+"-inventoryItem' data-id='"+weapon.id+"'>"+weaponInfo+"</li>");
		
		if (weapon['new'] == true) {
			inventory[i]['new'] = false;
			if (isAndroid()) updateWeapon(inventory[i]);
			need_save = true;
		}
		inventory_loading = false;
	}
	if (inventory.length == 0) {
		$(selector).html("<li>"+Localization.jackpot2.emptyInventory[Settings.language]+"</li>");
	}
	
	if (isAndroid() && (wp_from+inventory_step) < inventory_length) {
		$(selector).append('<li class="js-loading-inventory" data-from="'+(wp_from+inventory_step)+'"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
	}
$(".inventoryList").css("display", "block");
if (need_save && !isAndroid()) saveInventory();
inventory_loading = false;
}

$(document).on("click", ".weapon", function(){
	Sound("selectitem", "play");
	
	var parent = $(this).parent()[0];
	
	if ($(parent).hasClass('inv-no-select')) return false;
	
	if ($(".inventoryItemSelected").length < maxItems) {
		$(this).toggleClass("inventoryItemSelected");
		Sound("selectitems", "play");
	} else if ($(this).hasClass("inventoryItemSelected")) {
		$(this).toggleClass("inventoryItemSelected");
		Sound("selectitems", "play");
	}
	
	if ($(parent).hasClass('inv-price-counter')) {
		if ($("li").is(".inventoryItemSelected")) {
			var sumText = Localization.jackpot2.sumText[Settings.language];
			if ($("div").is(".inventorySum")) {
				var sumPr = 0.0;
				$(".inventoryItemSelected").each(function () {
					sumPr += parseFloat($("i", this).text(), 10)
				});
				$(".inventorySum").html(sumText + sumPr.toFixed(2) + "$");
			} else {
				$(".inventoryList").append("<div class='inventorySum'>" + sumText + $("i", this).text());
			}
		} else {
			$(".inventorySum").remove();
		}
	}
});

function checkForLoadMore() {
	if($(window).scrollTop() + $(window).height() > $(document).height() - 80 && $('.js-loading-inventory').length) {
		var wp_from = parseInt($('.js-loading-inventory').data('from'));
		if (isNaN(wp_from)) wp_from = 1;
		if (!inventory_loading && isAndroid())
			inventoryLoadMore(wp_from);
	}
}

$(document).on("click", '.closeInventory', function(){
	$(".inventoryList").css("display", "none");
	$("#inventorySum").remove();
	if (isAndroid()) $('.js-loading-inventory').remove();
});