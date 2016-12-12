
$(function() {
	if ($(".inventory").length) {
		$('.inventory').html('<li class="js-loading-inventory" data-from="1"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
	
		$('.inventoryList').on('scroll', function() {
			if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight-80) {
				if (isAndroid() && !inventory_loading && client.getInventoryLength("") > $(this).find('.weapon').length)
					fillInventory();
			}
		});
	}
})

function fillInventory(selector, action) {
    selector = selector || ".inventory";
    action = action || "";
	if ($('.js-loading-inventory').length == 0){
        if ($(selector+' .weapon').length != 0) {
            $(selector+" .weapon").remove();
            $(selector).append('<li class="js-loading-inventory" data-from="1"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
        } else if ($('.inventoryItemSelected').length != 0) {
            return false;
        }
	}
	
	inventory_loading = true;
	var wp_from = parseInt($('.js-loading-inventory').data('from'));
	wp_from = wp_from || 1;
	getInventory(wp_from, wp_from+inventory_step-1).then(function(inventory) {
        inventory = inventory.sort(function(a, b) {
            return b.price - a.price;
        });
        
        $(".js-loading-inventory").remove();
        var need_save = false;

        for(var i = 0; i < inventory.length; i++) {
            var weapon = inventory[i];
            
            if (action != "" && typeof weapon.can[action] != 'undefined' && weapon.can[action] == false) continue

            var weaponInfo = "<img src='"+getImgUrl(weapon.img)+"'> \
            <div class='weaponInfo "+weapon.rarity+"'> \
                <span class='type'>"+weapon.specialText()+weapon.type+"<br>" + weapon.name + "</span> \
            </div><i class='currency dollar'>"+weapon.price+"</i>";
            
            $(selector).append("<li class='weapon "+ (weapon.statTrak ? "wp-statTrak" : "") +" "+((weapon['new'] == true) ? "new-weapon" : "")+"' data-id='"+weapon.id+"' data-weapon_obj='"+JSON.stringify(weapon.saveObject())+"' data-weapon_can='"+JSON.stringify(weapon.can)+"'>"+weaponInfo+"</li>");

            if (weapon['new'] == true) {
                inventory[i]['new'] = false;
                updateWeapon(inventory[i]);
            }
        }
        if (inventory.length == 0) {
            $(selector).html("<li>"+Localization.getString('other.empty_inventory')+"</li>");
        }

        if ((wp_from+inventory_step) < inventory_length) {
            $(selector).append('<li class="js-loading-inventory" data-from="'+(wp_from+inventory_step)+'"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
        }
        $(".inventoryList").css("display", "block");
        inventory_loading = false;
    });
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
			var sumText = Localization.getString('other.sum_text');
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