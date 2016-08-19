var win;
var winNumber = 35;
var inventory = [];
var inventory_length = 0;
var inventory_step = 50,
inventory_loading = false;

var caseOpenAudio = new Audio();
caseOpenAudio.src = "../sound/open.wav";
caseOpenAudio.volume = 0.2;

var caseCloseAudio = new Audio();
caseCloseAudio.src = "../sound/close.wav";
caseCloseAudio.volume = 0.2;

var caseScrollAudio = new Audio();
caseScrollAudio.src = "../sound/scroll.wav";
caseScrollAudio.playbackRate = 1;
caseScrollAudio.volume = 0.2;

$(function () {
	if (!isAndroid())
		inventory = getInventory();
});

window.onerror = function(msg, url, line, col, error) {
	if (url) {
		var a = url.split('/');
		var errorFile = a[a.length - 1];
	} else {
		errorFile = 'none.js';
	}
	extra = ':'+line;
	extra += !col ? '' : ':'+col;
		
	var action = msg+' | '+errorFile+extra;
	if (isAndroid()) {
		client.sendToAnalytics('Error', 'Error', action, url);
	}
	$(document.body).append('<div class="error-log">ERROR<br>'+action+'</div');
};


function statisticPlusOne(cookieName) {
	if (isAndroid()) {
		var stat = client.getStatistic(cookieName);
		stat = parseInt(stat);
		if (isNaN(stat)) stat = 0;
		client.saveStatistic(cookieName, stat + 1);
	} else {
		var a = $.cookie(cookieName, Number);
		if (typeof a == "undefined")
			a = 0;
		else
			a = parseInt(a);
		a++;
		$.cookie(cookieName, a);
	}
}

function saveStatistic(key, value) {
	console.log('Save stat '+key+': '+value+' type: '+ typeof value);
	if (isAndroid()) {
		client.saveStatistic(key, ''+value);
	} else {
		$.cookie(key, value);
	}
}

function getStatistic(key, defaultVal) {
	defaultVal = defaultVal || 0
	if (isAndroid()) {
		var st = client.getStatistic(key);
		return st == '0' ? defaultVal : st;
	} else {
		return $.cookie(key) || defaultVal;
	}
}

function saveInventory() {
	if (typeof localStorage != 'undefined' && localStorage != null)
		localStorage.clear();
	localStorage["inventory.count"] = inventory.length;
	for (var i = 0; i < inventory.length; i++) {
		localStorage["inventory.item." + i + ".type"] = inventory[i].type;
		localStorage["inventory.item." + i + ".skinName"] = inventory[i].skinName;
		localStorage["inventory.item." + i + ".rarity"] = inventory[i].rarity;
		localStorage["inventory.item." + i + ".img"] = inventory[i].img;
		localStorage["inventory.item." + i + ".quality"] = inventory[i].quality;
		localStorage["inventory.item." + i + ".statTrak"] = inventory[i].statTrak;
		localStorage["inventory.item." + i + ".price"] = inventory[i].price;
		localStorage["inventory.item." + i + ".new"] = inventory[i].new;
	}
}

function saveWeapon(weapon) {
	//Weapon - object;
	if (isAndroid()) {
		var rowID = client.saveWeapon(weapon.type, weapon.skinName, weapon.img, weapon.quality, weapon.statTrak, weapon.rarity, weapon.price, weapon.new);
	}
}
function updateWeapon(weapon) {
	//Weapon - object;
	if (isAndroid()) {
		var rowID = client.updateWeapon(weapon.id, weapon.type, weapon.skinName, weapon.img, weapon.quality, weapon.statTrak, weapon.rarity, weapon.price, weapon.new);
	}
}
function getWeapon(id) {
	if (isAndroid())
		return $.parseJSON(client.getWeaponById(id))[0];
}
function deleteWeapon(id) {
	if (isAndroid())
		client.deleteWeapon(id)

}

function getInventory(count_from, count_to, special) {
	if (typeof special == 'undefined')
		special = "";
	count_from = count_from || 1;
	if (typeof count_to == 'undefined' && isAndroid())
		count_to = client.getInventoryLength("");

	if (count_to <= 0)
		return false;

	if (isAndroid())
		return _getInventoryAndroid(count_from, count_to, special);
	else
		return _getInventoryLocalStorage();
}

function fromLocalStorageToDB() {
	if (typeof localStorage == 'undefined' || localStorage.length == 0 || !isAndroid())
		return false;

	var count = parseInt(localStorage["inventory.count"], 10);
	for (var i = 0; i < count; i++) {
		var st;
		var item = {};
		item.type = localStorage["inventory.item." + i + ".type"];
		if (typeof item.type == 'undefined')
			continue;
		item.skinName = getSkinName(localStorage["inventory.item." + i + ".skinName"], Settings.language);
		item.rarity = localStorage["inventory.item." + i + ".rarity"];
		item.img = localStorage["inventory.item." + i + ".img"];
		item.quality = localStorage["inventory.item." + i + ".quality"];
		st = localStorage["inventory.item." + i + ".statTrak"];
		item.price = Number(localStorage["inventory.item." + i + ".price"]);
		item.new = localStorage["inventory.item." + i + ".new"];
		if ((st == "true") || (st == "1")) {
			item.statTrak = true;
		} else {
			item.statTrak = false;
		}
		if ((item.new == "true") || (item.new == "1")) {
			item.new = true;
		} else {
			item.new = false;
		}
		saveWeapon(item);
	}
	localStorage.clear();
	return true;
}

function _getInventoryAndroid(count_from, count_to, special) {

	var inventoryJSON = client.getInventory(count_from, count_to, special);
	try {
		inventoryJSON = $.parseJSON(inventoryJSON);
	} catch (e) {
		client.deleteAllInventory();
	}
	if (inventoryJSON.length == 0)
		return false;
	inventory_length = client.getInventoryLength(special);
	if (typeof inventoryJSON[0].error != 'undefined')
		return [];
	return inventoryJSON;
}

function _getInventoryLocalStorage() {
	if (typeof localStorage == 'undefined')
		return false;
	var inventoryLocal = [];
	count = 0;
	try {
		count = parseInt(localStorage["inventory.count"], 10);
	} catch (e) {
		count = 0;
	}
	var new_weapon_count = 0;
	for (var i = 0; i < count; i++) {
		var st;
		var item = {};
		item.type = localStorage["inventory.item." + i + ".type"];
		if (typeof item.type == 'undefined')
			continue;
		item.skinName = localStorage["inventory.item." + i + ".skinName"];
		item.rarity = localStorage["inventory.item." + i + ".rarity"];
		item.img = localStorage["inventory.item." + i + ".img"];
		item.quality = localStorage["inventory.item." + i + ".quality"];
		st = localStorage["inventory.item." + i + ".statTrak"];
		item.price = Number(localStorage["inventory.item." + i + ".price"]);
		item.new = localStorage["inventory.item." + i + ".new"];
		if ((st == "true") || (st == "1")) {
			item.statTrak = true;
		} else {
			item.statTrak = false;
		}
		if ((item.new == "true") || (item.new == "1")) {
			item.new = true;
			new_weapon_count++;
		} else {
			item.new = false;
		}

		inventoryLocal.push(item);
	}
	if (new_weapon_count)
		menuNotification('inventory', '' + new_weapon_count)
		inventory_length = inventoryLocal.length;
	return inventoryLocal;
}

function getInventoryCost(special) {
	special = special || '';
	if (isAndroid())
		return client.getInventoryCost(special);
	else
		return 0;
}

function checkInventoryForNotification() {
	var new_weapon_count = 0;
	if (isAndroid()) {
		new_weapon_count = client.getInventoryLength("WHERE isNew = 'true'");
	} else {
		if (typeof localStorage == 'undefined')
			return false;
		var count = parseInt(localStorage["inventory.count"], 10);
		for (var i = 0; i < count; i++) {
			var item_new = localStorage["inventory.item." + i + ".new"];
			if ((item_new == "true") || (item_new == "1"))
				new_weapon_count++;
		}
	}
	if (new_weapon_count)
		menuNotification('inventory', '' + new_weapon_count)
}

function menuNotification(items, message) {
	switch (items) {
	case 'inventory':
		if ($('#local-menu-inventory .menu-notification').length) {
			$('#local-menu-inventory .menu-notification').text(message);
		} else {
			$('#local-menu-inventory').append('<span class="menu-notification">' + message + '</span>');
		}
		break
	default:
		break
	}
}

function deleteMenuNotification(items) {
	switch (items) {
	case 'inventory':
		$('#local-menu-inventory .menu-notification').remove();
		break
	default:
		break
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
		return "../images/Weapons/" + img;
	else if (img.indexOf("steamcommunity") == -1) {
		if (typeof big != "undefined")
			return prefix + img + postfixBig;
		else
			return prefix + img + postfix;
	} else
		if (typeof big != "undefined") {
			return img.replace("125fx125f", "383fx383f");
		} else {
			return img;
		}
}

function changeLocation(url) {
	window.location = url;
}

function parseURLParams(url) {
	var queryStart = url.indexOf("?") + 1,
	queryEnd = url.indexOf("#") + 1 || url.length + 1,
	query = url.slice(queryStart, queryEnd - 1),
	pairs = query.replace(/\+/g, " ").split("&"),
	parms = {},
	i,
	n,
	v,
	nv;

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
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function isAndroid() {
	try {
		var a = client.isAndroid();
		return true;
	} catch (e) {
		return false;
	}
}

Array.prototype.shuffle = function () {
	var o = this;
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}
Array.prototype.mul = function (k) {
	var res = []
	for (var i = 0; i < k; ++i)
		res = res.concat(this.slice(0))
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
