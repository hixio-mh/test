var caseId = 0;
var caseOpening = false;

$(".openCase").attr("disabled", null);

$(document).on("click", ".case", function () {
	$("#rank-popup").css('display', 'none');
	$('#special-popup').css('display', 'none');
	caseId = this.id;
	if (typeof cases[caseId].minRank != 'undefined' && getRank().id < getRankByName(cases[caseId].minRank).id) {
		needRank = getRankByName(cases[caseId].minRank);
		$("#rank-popup").css('display', 'block');
		$("#rank").html('<img src="' + needRank.img + '" style="width: 50px;">');
		return false;
	}
	if (cases[caseId].type == "Special") {
		
		if (parseInt(getStatistic('specialCases', 0)) >= cases[caseId].casesToOpen) {
			window.location = "open.html?caseId=" + caseId;
		} else {
			$('#special-popup').css('display', 'block');
			var needToOpen = cases[caseId].casesToOpen - parseInt(getStatistic('specialCases', 0));
			$('#special').text(needToOpen);
			$('#showVideoAd').data();
			$('.js-secretField').text(caseId);
		}
	} else {
		window.location = "open.html?caseId=" + caseId;
	}
});
$(document).on('click', '#closePopup', function () {
	$('.popup').css('display', 'none');
});

function fillCarusel(caseId) {
	var c0 = cases[caseId].weapons.filter(function (weapon) {
			return weapon.rarity == 'consumer'
		}).mul(7).shuffle();
	var a0 = cases[caseId].weapons.filter(function (weapon) {
			return weapon.rarity == 'industrial'
		}).mul(7).shuffle();
	var a1 = cases[caseId].weapons.filter(function (weapon) {
			return weapon.rarity == 'milspec'
		}).mul(5).shuffle();
	var a2 = cases[caseId].weapons.filter(function (weapon) {
			return weapon.rarity == 'restricted'
		}).mul(5).shuffle();
	var a3 = cases[caseId].weapons.filter(function (weapon) {
			return weapon.rarity == 'classified'
		}).mul(4).shuffle();
	var a4 = cases[caseId].weapons.filter(function (weapon) {
			return weapon.rarity == 'covert'
		}).mul(1).shuffle();
	var a5 = cases[caseId].weapons.filter(function (weapon) {
			return weapon.rarity == 'rare'
		}).mul(1).shuffle();

	if ((Math.rand(0, 10) > 7) && (a5.length + a4.length + a2.length + a1.length != 0)) {
		a3 = [];
	}
	if ((Math.rand(0, 10) > 5) && (a5.length + a3.length + a2.length + a1.length != 0)) {
		a4 = [];
	}
	if ((Math.rand(0, 10) > 3) && (a4.length + a3.length + a2.length + a1.length != 0)) {
		a5 = [];
	}

	if (c0 == undefined) {
		var arr = a0.concat(a1, a2, a3, a4, a5).shuffle().shuffle().shuffle();
	} else {
		var arr = c0.concat(a0, a1, a2, a3, a4, a5).shuffle().shuffle().shuffle();
	}
	var el = '';
	while (arr.length <= (winNumber + 3)) {
		arr = arr.concat(a1, a2, a3, a4).shuffle().shuffle();
	}

	if (arr.length > winNumber + 3)
		arr.splice(winNumber + 3, arr.length - (winNumber + 3));
	arr.forEach(function (item, index) {
		var img = getImgUrl(item.img);
		var type = item.type;
		if (type.indexOf("|") != -1) {
			type = type.split("|")[1]
		}
		type = (type.indexOf('Сувенир') != -1 && Settings.language != 'RU') ? type.replace('Сувенир', 'Souvenir') : type;

		if (item.rarity == 'rare') {
			type = '★ Rare Special Item ★';
			name = '&nbsp;';
			img = '../images/Weapons/rare.png';
		} else {
			var name = getSkinName(item.skinName, Settings.language);
		}
		if (item.rarity == 'rare')
			img = '../images/Weapons/rare.png';
		el += '<div class="weapon">' +
		'<img src="' + img + '" />' +
		'<div class="weaponInfo ' + item.rarity + '"><span class="type">' + type + '<br>' + name + '</span></div>' +
		'</div>'
	})

	win = arr[winNumber];
	$(".casesCarusel").html(el);
	$(".casesCarusel").css("margin-left", "0px");
}

$(document).on("click", ".openCase", function () {
	$(".weapons").scrollTop(0);
	if (caseOpening || $(".openCase").text() == Localization.openCase2.opening[Settings.language]) {
		return false
	};
	$(".win").slideUp("slow");
	if ($(".openCase").text() == Localization.openCase2.tryAgain[Settings.language]) {
		backToZero()
	}
	$(".openCase").text(Localization.openCase2.opening[Settings.language]);
	$(".openCase").attr("disabled", "disabled");
	//var a = 1431 + 16*24;
	var a = 127 * winNumber;
	var l = 131;
	var d = 0,
	s = 0;
	var duration = (Settings.drop) ? 5000 : 10000;
	$(".casesCarusel").animate({
		marginLeft : -1 * Math.rand(a - 50, a + 60)
	}, {
		duration : duration,
		easing : 'easeOutCubic',
		start : function () {
			if (Settings.sounds)
				caseOpenAudio.play();
			var type = win.type;
			var name = getSkinName(win.skinName, Settings.language);
			win.name = name;
			var statTrak = ifStatTrak(type, win.name);
			var quality = getItemQuality()[Settings.language == 'RU' ? 1 : 0];
			caseOpening = true;

			if (type.indexOf("|") != -1) {
				type = type.split("|")[1]
			}
			type = (type.indexOf('Сувенир') != -1 && Settings.language != 'RU') ? type.replace('Сувенир', 'Souvenir') : type;
			var price = getPrice(type, name, quality, statTrak);

			win.type = type;

			var stopLoop = 0;
			while (price == 0) {
				quality = getItemQuality()[Settings.language == 'RU' ? 1 : 0];
				price = getPrice(type, name, quality, statTrak);
				if (stopLoop == 15)
					break;
				stopLoop++;
			}

			$(".win_price").html(price + "$");

			if (price == 0)
				getMarketPrice(type, name, quality, statTrak, ".win_price");

			if (statTrak) {
				type = "StatTrak™ " + type;
			}
			$(".win_name").html(type + " | " + name);
			$(".win_quality").html(quality);
			$(".win_img").attr("src", getImgUrl(win.img, 1));
			$(".openCase").attr("disabled", "disabled");
			win.statTrak = statTrak;
			win.quality = quality;
			win.price = price;
			//getInventory();

		},
		progress : function (e, t) {
			if (Settings.sounds) {
				progress_animate = Math.round(100 * t),
				s = parseInt(parseInt($(".casesCarusel").css("marginLeft").replace(/[^0-9.]/g, "") - l / 2) / l),
				s > d && (caseScrollAudio.pause(), caseScrollAudio.currentTime = 0,
					caseScrollAudio.play(),
					d++)
			}

		},
		complete : function () {
			$("#opened").text(parseInt($("#opened").text()) + 1);
			var price = parseFloat($(".win_price").html());
			if (isNaN(price))
				price = 0;
			win.price = price;
			win.new = true;
			inventory.push(win);
			if (isAndroid())
				saveWeapon(win);
			else
				saveInventory();
			if (Settings.sounds)
				caseCloseAudio.play();
			$(".openCase").text(Localization.openCase2.tryAgain[Settings.language]);
			$(".win").slideDown("fast");
			caseOpening = false;
			$(".openCase").attr("disabled", null);
			$(".weapons").scrollTop(185);

			//Statistic
			changePoints(1);

			var caseId = $("#youCanWin span").text();
			statisticPlusOne('case-' + caseId);
			statisticPlusOne('weapon-' + win.rarity);
			if (win.statTrak)
				statisticPlusOne('statTrak');

			var param = parseURLParams(window.location.href);
			if (typeof param != "undefined") {
				caseId = param.caseId[0];
				var fromAd = 0;
				try {
					fromAd = parseInt(param.fromAd[0]);
				} catch (e) {}

				if (cases[caseId].type == 'Special') {
					if (!fromAd) {
						var need = getStatistic('specialCases', 0) - cases[caseId].casesToOpen;
						need = (need < 0) ? 0 : need;
						saveStatistic('specialCases', need);
					}
					if (getStatistic('specialCases', 0) < cases[caseId].casesToOpen)
						$('.openCase').attr("disabled", "disabled");
				} else {
					statisticPlusOne('specialCases');
				}
			} else {
				statisticPlusOne('specialCases');
			}
		},
		always : function () {
			// $(".openCase").attr("disabled", null);
			caseOpening = false;
		}
	})
})

function backToZero() {
	var l = 131;
	var s = 0,
	d = 0;
	$(".casesCarusel").animate({
		marginLeft : 0
	}, {
		duration : 1000,
		easing : "easeOutQuad",
		start : function () {
			fillCarusel(caseId);
			//caseBackAudio.play();
		},
		always : function () {
			//$(".openCase").attr("disabled", null);
			caseOpening = false;
		}
	})
}

$(document).on("click", ".closeCase", function () {
	window.location = "cases.html";
	/*$(".weapons").css("display", "none");
	$(".openCase").text("Открыть кейс");
	$(".win").hide();
	$(".casesCarusel").stop(true, true);
	$("body").css("overflow", "visible");*/
	caseOpening = false;
})
