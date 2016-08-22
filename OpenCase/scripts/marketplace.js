var buySound = new Audio();
buySound.src = "../sound/buy.wav";
buySound.playbackRate = 1;
buySound.volume = 0.4;

$(function() {
	var autocompleteTags = [];
	for (var i = 0; i < cases.length; i++)
		for (var z = 0; z < cases[i].weapons.length; z++) {
			var tp = cases[i].weapons[z].type;
			var name = getSkinName(cases[i].weapons[z].skinName, Settings.language);
			tp = Settings.language == 'RUS' ? tp.replace(/Souvenir/g, 'Сувенир') : tp.replace(/Сувенир/g, 'Souvenir');
			if ($.inArray(tp+' | '+name, autocompleteTags) == -1) autocompleteTags.push(tp+' | '+name);
		}
		
	$("#search_text").autocomplete({
		source: autocompleteTags
	})
});

$(document).ready(function() {
	$('.navigationBar').append('<span id="playerBalance">'+Player.doubleBalance+' <i class="double-icon"></i></span>');
});

$(document).on('click', '.item', function() {
	var name = $(this).data("name");
	var type = $(this).data("type");
	var img = $(this).data("img");
	var price = $($(this).children('.item__price')[0]).text();
	var statTrak = $(this).data("stattrak");
	var quality = $(this).data("quality");
	
	if (price == '0$' || price == '$0') {
		$(this).addClass('animated flipOutX');
		
		setTimeout($.proxy(function(){
			$(this).remove();
		}, this), 800);
			
		return false;
	}
	
	var st = statTrak == true ? 'StatTrak™ ' : '';	
	
	$("#weaponInfoContainer").data('name', name);
	$("#weaponInfoContainer").data('type', type);
	$("#weaponInfoContainer").data('stattrak', statTrak);
	$("#weaponInfoContainer").data('img', img);
	$("#weaponInfoContainer").data('price', price.replace(/\$/, ''));
	
	$("#weaponInfoContainer").css("display", "block");
	$("#weaponImg").attr("src", getImgUrl(img, 1));
	$("#weaponName").html(st+type+" | "+getSkinName(name, Settings.language));
	$("#weaponPrice").html(price);
	$("#weaponQuality").html(quality);
	
	if (typeof price == 'string') {
		if (isNaN(parseFloat(price)))
			price = parseFloat(price.substr(1));
	}
	
	$('#buy-double').html((parseFloat(price)*100).toFixed(0)+' <i class="double-icon"></i>');
});

//var rowID = client.saveWeapon(weapon.type, weapon.skinName, weapon.img, weapon.quality, weapon.statTrak, weapon.rarity, weapon.price, weapon.new);

$(document).on('click', '#buy-double', function () {
	var rarity = getWeaponRarity($("#weaponInfoContainer").data('type'), $("#weaponInfoContainer").data('name'));
	var weapon = {
		type: $("#weaponInfoContainer").data('type'),
		skinName: $("#weaponInfoContainer").data('name'),
		img: $("#weaponInfoContainer").data('img'),
		quality: $("#weaponQuality").text(),
		statTrak: $("#weaponInfoContainer").data('stattrak'),
		rarity: rarity,
		price: parseFloat($("#weaponInfoContainer").data('price').replace(/\$/, '')),
		new: true,
	}
	if (Player.doubleBalance < weapon.price*100) {
		$('#weaponPrice').addClass('animated flash');
		setTimeout(function(){
			$('#weaponPrice').removeClass('animated flash')
		}, 1000);
		return false;
	}
	if (isAndroid()) {
		saveWeapon(weapon);
	} else {
		inventory.push(weapon);
		saveInventory();
	}
	if (Settings.sounds) buySound.play();
	Player.doubleBalance -= parseInt((weapon.price*100).toFixed(0));
	saveStatistic('doubleBalance', Player.doubleBalance);
	$("#playerBalance").html(Player.doubleBalance+' <i class="double-icon"></i>');
	
	$("#buy-double").prop('disabled', true);
	$(".buy-animation").addClass("buy-animation-show", 500, hideBuyCheck);
	
	checkInventoryForNotification();
});

function hideBuyCheck() {
	$(".buy-animation").addClass('animated zoomOut');
	setTimeout(function() {
        $( ".buy-animation" ).removeClass( "buy-animation-show" );
        $( ".buy-animation" ).removeClass( "animated" );
        $( ".buy-animation" ).removeClass( "zoomOut" );
		$("#buy-double").prop('disabled', false);
      }, 800 );
}

$(document).on('click', '#search_button', function() {
	if ($("#search_text").val() != '');
		search($("#search_text").val());
})

function search(searchStr) {
	var info = [];
	if (searchStr.indexOf(' | ') != -1) {
		var wp = searchStr.split(' | ');
		info = getAllWeaponInfo(wp[0], wp[1], true);
	} else {
		if ($(".ui-menu-item").length != 0) {
			var count = $(".ui-menu-item").length;
			for (var i = 0; i < count; i++) {
				var item = $($(".ui-menu-item")[i]).text();
				var wp = item.split(' | ');
				info = info.concat(getAllWeaponInfo(wp[0], wp[1]));
			}
		}
	}
	var items = "";
	for (var i = 0; i < info.length; i++) {
		var st = info[i].statTrak == true ? 'StatTrak™ ' : '';
		var extraStyle = "regular";
		extraStyle = info[i].statTrak == true ? 'statTrak' : extraStyle;
		extraStyle = info[i].type.indexOf('★') != -1 ? 'knive' : extraStyle;
		extraStyle = info[i].type.match(/(?:Сувенир|Souvenir)/) != null ? 'souvenir' : extraStyle;
		
		var data = "data-type='"+info[i].type+"' data-name='"+info[i].skinName+"' data-quality='"+info[i].quality+"' data-statTrak='"+info[i].statTrak+"' data-price='"+info[i].price+"' data-img='"+info[i].img+"'";
		
		items += "<tr class='item' "+data+"><td><img src='"+getImgUrl(info[i].img)+"' class='"+extraStyle+"_border'></td><td class='item__name-group "+extraStyle+"_color'><span class='item__type'>"+st+info[i].type+"</span> | <span class='item__name'>"+info[i].skinName+"</span> (<span class='item__quality'>"+info[i].quality+"</span>)</td><td class='item__price' data-price-for='"+st+info[i].type+' | '+info[i].skinName+" ("+info[i].quality+")'>$"+info[i].price+"</td></tr>";
	}
	$('#search_result').html(items);
}

$(document).on("click", ".glassBlur", function(){
	$("#weaponInfoContainer").css("display", "none");
})

function getAllWeaponInfo(type, name, loadPrices) {
	loadPrices = loadPrices || false;
	var info = [];
	var statTrak = false,
		souvenir = false,
		count = 2;
	if (type.match(/(?:Сувенир|Souvenir)/)) {
		souvenir = true;
		count = 1;
	} else {
		var collect = getCollection(type, getSkinName(name))
		count = collect.type == 'Collection' ? 1 : count;
	}
	var img = getWeaponImg(type, name);
	for (var z = 0; z < count; z++) {
		for (var i = 0; i < Quality.length; i++){
			var quality = Settings.language == 'RUS' ? Quality[i].name[1] : Quality[i].name[0]
			var pr = getPriceIfExists(type, name, quality, statTrak);
			if (!pr) {
				var selector = '[data-price-for="'+(statTrak == true ? 'StatTrak™ ' : '')+type+' | '+name+" ("+quality+')"]';
				getMarketPrice(type, name, quality, statTrak, selector, false);
			}
			if (pr || loadPrices)
				info.push({
					'type': type,
					'skinName': name,
					'quality' : quality,
					'statTrak' : statTrak,
					'price': pr,
					'img': img
				});
			
		}
		if (!souvenir) statTrak = true;
	}
	return info
}