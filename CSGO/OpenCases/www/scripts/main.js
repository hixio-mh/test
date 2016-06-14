	var caseId = 0;
	var win;
	var winNumber = 35;
	var inventory = [];
	var caseOpening = false;
	var caseOpenAudio = new Audio();
	caseOpenAudio.src = "../sound/open.wav";
	caseOpenAudio.volume = 0.2;
	
	var caseCloseAudio = new Audio();
	caseCloseAudio.src = "../sound/close.wav";
	caseCloseAudio.volume = 0.2;

	var caseBackAudio = new Audio();
	caseBackAudio.src = "../sound/back.wav";
	caseBackAudio.volume = 0.1;

	var caseScrollAudio = new Audio();
	caseScrollAudio.src = "../sound/scroll.wav";
	//caseScrollAudio.loop = true;
	caseScrollAudio.playbackRate = 1;
	caseScrollAudio.volume = 0.2;
	
	$(".openCase").attr("disabled", null);
	
	getInventory();

$(document).on("click", ".case", function(){
	caseId = this.id;
	if (cases[caseId].type == "Special") {
		if (typeof $.cookie('specialCases') == 'undefined') $.cookie('specialCases', 0);
		if (parseInt($.cookie('specialCases')) >= cases[caseId].casesToOpen) {
			window.location = "open.html?caseId="+caseId;
		} else {
			$('.popup').css('display', 'block');
			var needToOpen = cases[caseId].casesToOpen - parseInt($.cookie('specialCases'));
			$('#special').text(needToOpen);
		}		
	} else {
		window.location = "open.html?caseId="+caseId;
	}
});
$(document).on('click', '#closePopup', function() {
	$('.popup').css('display', 'none');
});

function fillCarusel(caseId) {
	var c0 = cases[caseId].weapons.filter(function(weapon) { return weapon.rarity == 'consumer' }).mul(7).shuffle();
	var a0 = cases[caseId].weapons.filter(function(weapon) { return weapon.rarity == 'industrial' }).mul(7).shuffle();
	var a1 = cases[caseId].weapons.filter(function(weapon) { return weapon.rarity == 'milspec' }).mul(5).shuffle();
	var a2 = cases[caseId].weapons.filter(function(weapon) { return weapon.rarity == 'restricted' }).mul(5).shuffle();
	var a3 = cases[caseId].weapons.filter(function(weapon) { return weapon.rarity == 'classified' }).mul(4).shuffle();
	var a4 = cases[caseId].weapons.filter(function(weapon) { return weapon.rarity == 'covert' }).mul(1).shuffle();
	var a5 = cases[caseId].weapons.filter(function(weapon) { return weapon.rarity == 'rare' }).mul(1).shuffle();
	
	if ((Math.rand(0, 10) > 7) && (a5.length + a4.length+a2.length+a1.length != 0)) {a3 = [];}
	if ((Math.rand(0, 10) > 5) && (a5.length + a3.length+a2.length+a1.length != 0)) {a4 = [];}
	if ((Math.rand(0, 10) > 3) && (a4.length + a3.length+a2.length+a1.length != 0)) {a5 = [];}
	
	if (c0 == undefined) {
		var arr = a1.concat(a2, a3, a4, a5).shuffle().shuffle().shuffle();
	} else {
		var arr = c0.concat(a1, a2, a3, a4, a5).shuffle().shuffle().shuffle();
	}
	var el = '';
	if (arr.length <= winNumber) {
		while (arr.length <= winNumber) {
			arr = arr.concat(a1, a2, a3, a4).shuffle().shuffle();
		}
	}
	arr.forEach(function(item, index) {
		var img = getImgUrl(item.img);
		var type = item.type;
		if(type.indexOf("|") != -1) {type = type.split("|")[1]}
		
		var name = getSkinName(item.skinName, Settings.language);
		el += '<div class="weapon">'+
				'<img src="'+img+'" />'+
				'<div class="weaponInfo '+item.rarity+'"><span class="type">'+type+'<br>'+name+'</span></div>'+
				'</div>'
		})
	
	win = arr[winNumber];
	$(".casesCarusel").html(el);
	$(".casesCarusel").css("margin-left", "0px");
}

$(".openCase").on("click", function() {
	$(".weapons").scrollTop(0);
	if (caseOpening || $(".openCase").text() ==  Localization.openCase2.opening[Settings.language]) {return false};
	$(".win").slideUp("slow");
	$(".zabor-bot").css("display", "none");
	if($(".openCase").text() == Localization.openCase2.tryAgain[Settings.language]) {backToZero()}
	$(".openCase").text(Localization.openCase2.opening[Settings.language]);
	$(".openCase").attr("disabled", "disabled");
	//var a = 1431 + 16*24;
	var a = 127*winNumber;
	var l = 131;
	var d = 0, s = 0;
	$(".casesCarusel").animate({marginLeft: -1 * Math.rand(a-50, a+60) }, {
		duration: 10000,
		easing: 'easeOutCubic',
		start: function(){
			caseOpenAudio.play();
			var type = win.type;
			var statTrak = ifStatTrak(type);
			var quality = getItemQuality()[1];
			caseOpening = true;
			
			if (type.indexOf("|") != -1) {type = type.split("|")[1]}
			var name = win.skinName;
			var price = getPrice(type, getSkinName(name), quality, statTrak);
			
			var stopLoop = 0;
			while (price == 0) {
				quality = getItemQuality()[1];
				price = getPrice(type, getSkinName(name), quality, statTrak);
				if (stopLoop == 15) break;
				stopLoop++;
			}
			
			$(".winPrice").html(price+"$");
			
			if (price == 0) getMarketPrice(type, getSkinName(name, "EN"), getQualityName(quality), statTrak, ".winPrice");
			
			if (statTrak) {
				type = "StatTrak™ " + type;
				statisticPlusOne('statTrak');
			}
			$(".winName").html(type + " | " + getSkinName(name, "RU"));
			$(".winQuality").html(quality);
			$(".winImg").attr("src", getImgUrl(win.img, 1));
			$(".openCase").attr("disabled", "disabled");
			win.statTrak = statTrak;
			win.quality = quality;
			win.price = price;
			//getInventory();
			
			if (type.match(/.*(Н|н)ож.*/) != null)
				statisticPlusOne('knifes');
			
		},
		progress: function(e, t) {
			progress_animate = Math.round(100 * t),
            s = parseInt(parseInt($(".casesCarusel").css("marginLeft").replace(/[^0-9.]/g, "") - l / 2) / l),
            s > d && (caseScrollAudio.pause(), caseScrollAudio.currentTime = 0,
            caseScrollAudio.play(),
            d++)
		},
		complete: function(){
			$("#opened").text(parseInt($("#opened").text())+1);
			var price = parseFloat($(".winPrice").html());
			win.price = price;
			inventory.push(win);
			saveInventory();
			caseCloseAudio.play();
			$(".openCase").text(Localization.openCase2.tryAgain[Settings.language]);
			$(".win").slideDown("slow");
			$(".zabor-bot").css("display", "block");
			caseOpening = false;
			$(".openCase").attr("disabled", null);
			$(".weapons").scrollTop(185);
			
			//Statistic
			var caseId = $("#caseID").text();
			statisticPlusOne('case'+caseId);
			statisticPlusOne('weapon-'+win.rarity);
			
			var param = parseURLParams(window.location.href);
			if(typeof param != "undefined") {
				caseId = param.caseId[0];
				if (cases[caseId].type == 'Special') {
					$.cookie('specialCases', cases[caseId].casesToOpen - parseInt($.cookie('specialCases')));
					if ($.cookie('specialCases') < cases[caseId].casesToOpen)
						$('.openCase').attr("disabled", "disabled");
				} else {
					statisticPlusOne('specialCases');
				}
			} else {
				statisticPlusOne('specialCases');
			}
		},
		always: function() {
			// $(".openCase").attr("disabled", null);
			caseOpening = false;
		}
	})
})

function backToZero() {
	var l = 131;
	var s = 0, d = 0;
	$(".casesCarusel").animate({marginLeft: 0}, {
		duration: 1000,
		easing: "easeOutQuad",
		start: function() {
			fillCarusel(caseId);
			//caseBackAudio.play();
		},
		always: function() {
			//$(".openCase").attr("disabled", null);
			caseOpening = false;
		}
	})
}

$(".closeCase").on("click", function(){
	window.location = "cases.html";
	/*$(".weapons").css("display", "none");
	$(".openCase").text("Открыть кейс");
	$(".win").hide();
	$(".zabor-bot").css("display", "none");
	$(".casesCarusel").stop(true, true);
	$("body").css("overflow", "visible");*/
	caseOpening = false;
})

function statisticPlusOne(cookieName) {
	var a = $.cookie(cookieName, Number);
	if (typeof a == "undefined")
		a = 0;
	else
		a = parseInt(a);
	a++;
	$.cookie(cookieName, a);		
}

function saveInventory() {
	localStorage.clear();
	localStorage["inventory.count"] = inventory.length;
	for(var i = 0; i < inventory.length; i++) {
		localStorage["inventory.item."+i+".type"] = inventory[i].type;
		localStorage["inventory.item."+i+".skinName"] = inventory[i].skinName;
		localStorage["inventory.item."+i+".rarity"] = inventory[i].rarity;
		localStorage["inventory.item."+i+".img"] = inventory[i].img;
		localStorage["inventory.item."+i+".quality"] = inventory[i].quality;
		localStorage["inventory.item."+i+".statTrak"] = inventory[i].statTrak;
		localStorage["inventory.item."+i+".price"] = inventory[i].price;
	}
}

function getInventory() {
	var count = parseInt(localStorage["inventory.count"], 10);
	for(var i = 0; i < count; i++) {
		var st;
		var item = {};
		item.type = localStorage["inventory.item."+i+".type"];
		item.skinName = localStorage["inventory.item."+i+".skinName"];
		item.rarity = localStorage["inventory.item."+i+".rarity"];
		item.img = localStorage["inventory.item."+i+".img"];
		item.quality = localStorage["inventory.item."+i+".quality"];
		st = localStorage["inventory.item."+i+".statTrak"];
		item.price = Number(localStorage["inventory.item."+i+".price"]);
		if ((st == "true") || (st == "1")) {
			item.statTrak = 1;
		} else {
			item.statTrak = 0;
		}
		inventory.push(item);
	}
}

function getImgUrl(img, big) {
	if (img.indexOf("images/") != -1)
		if (typeof big != "undefined") {
			return img.replace("125fx125f", "383fx383f");
		} else {
			return img;
		}
	else if (img.indexOf(".png") != -1) 
		return "../images/Weapons/"+img;
	else if (img.indexOf("steamcommunity") == -1) {
		if (typeof big != "undefined")
			return prefix + img + postfixBig;
		else
			return prefix + img + postfix;
	}
	else 
		if (typeof big != "undefined") {
			return img.replace("125fx125f", "383fx383f");
		} else {
			return img;
		}
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

Array.prototype.shuffle = function() {
	var o = this;
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}
Array.prototype.mul = function(k) {
	var res = []
	for (var i = 0; i < k; ++i) res = res.concat(this.slice(0))
	return res
}
Math.rand = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};*/