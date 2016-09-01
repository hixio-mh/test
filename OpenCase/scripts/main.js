var win;
var winNumber = 35;
var inventory = [];
var inventory_length = 0;
var inventory_step = 50,
inventory_loading = false;

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
	var screen = "";
	try {
		screen = window.location.href;
		if (screen) {
			var temp = screen.split('/');
			screen = temp[temp.length-1].replace('.html', '.h');
			screen = " in "+screen;
		}
	} catch (e){}
	extra = ':'+line;
	extra += !col ? '' : ':'+col;
		
	var action = msg+' | '+errorFile+extra+screen;
	if (isAndroid()) {
		client.sendToAnalytics('Error', 'Error', action, url);
	}
	$(document.body).append('<div class="error-log">'+action+'</div');
};

if (!isAndroid() || (isAndroid() && parseFloat(client.getCurrentAppVersionName()) < 1.3)) {
	var openSound = new Audio();
	openSound.src = "../sound/open.wav";
	openSound.volume = 1;

	var closeSound = new Audio();
	closeSound.src = "../sound/close.wav";
	closeSound.volume = 1;

	var scrollSound = new Audio();
	scrollSound.src = "../sound/scroll.wav";
	scrollSound.playbackRate = 1;
	scrollSound.volume = 1;

	var menuClickSound = new Audio();
	menuClickSound.src = "../sound/interface/menuClick.wav";
	menuClickSound.volume = 1;

	var addItemsSound = new Audio();
	addItemsSound.src = "../sound/interface/jackpotAddItems.wav";
	addItemsSound.volume = 1;

	var selectItemSound = new Audio();
	selectItemSound.src = "../sound/interface/SelectItem.wav";
	selectItemSound.volume = 1;

	var contractSound = new Audio();
	contractSound.src = "../sound/interface/contract.wav";
	contractSound.volume = 1;

	var buySound = new Audio();
	buySound.src = "../sound/buy.wav";
	buySound.playbackRate = 1;
	buySound.volume = 1;

	var coinFlipSound = new Audio();
	coinFlipSound.src = "../sound/coinFlip.wav";
	coinFlipSound.volume = 1;
	coinFlipSound.loop = true;
}

function Sound(soundGet, action, priority, repeat, speed) {
	if (!Settings.sounds) return false;
	action = action || "play";
	priority = priority || 0;
	repeat = repeat || 0;
	speed = speed || 1;
	var sound;
	
	if (soundGet == "click") soundGet = "menuclick";
	
	if (isAndroid() && parseFloat(client.getCurrentAppVersionName()) >= 1.3) {
		client.playSound(soundGet.toLowerCase(), priority, repeat, speed)
	} else {
		switch (soundGet.toLowerCase()) {
		case "open":
			sound = openSound;
			break;
		case "close":
			sound = closeSound;
			break;
		case "scroll":
			sound = scrollSound;
			break;
		case "menuclick":
			sound = menuClickSound;
			break;
		case "additems":
			sound = addItemsSound;
			break;
		case "selectitems":
			sound = selectItemSound;
			break;
		case "contract":
			sound = contractSound;
			break;
		case "buy":
			sound = buySound;
			break;
		case "coinflip":
			sound = coinFlipSound;
			break;
		}
		if (sound) {
			sound.pause();
			sound.currentTime = 0;
			if (action == "play")
				sound.play();
			/*switch (action) {
			case "play":
				sound.pause();
				sound.currentTime = 0;
				sound.play();
				break;
			case "pause":
				sound.pause();
				sound.currentTime = 0;
				break;
			}*/
		}
	}
}


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

function saveStatistic(key, value, type) {
	if (typeof type != 'undefined') {
		switch (type){
			case 'Number':
				if (typeof value == 'string') value = value.replace(/\$/g, '');
				value = parseInt(value);
				break
			case 'Float' :
				value = parseFloat(value);
				break
		}
	}
	console.log('Save stat '+key+': '+value+' type: '+ type);
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
		localStorage["inventory.item." + i + ".new"] = inventory[i]['new'];
	}
}

function saveWeapon(weapon) {
	//Weapon - object;
	if (isAndroid()) {
		var rowID = client.saveWeapon(weapon.type, weapon.skinName, weapon.img, weapon.quality, weapon.statTrak, weapon.rarity, weapon.price, weapon['new']);
	}
}
function updateWeapon(weapon) {
	//Weapon - object;
	if (isAndroid()) {
		var rowID = client.updateWeapon(weapon.id, weapon.type, weapon.skinName, weapon.img, weapon.quality, weapon.statTrak, weapon.rarity, weapon.price, weapon['new']);
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
		item['new'] = localStorage["inventory.item." + i + ".new"];
		if ((st == "true") || (st == "1")) {
			item.statTrak = true;
		} else {
			item.statTrak = false;
		}
		if ((item['new'] == "true") || (item['new'] == "1")) {
			item['new'] = true;
		} else {
			item['new'] = false;
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
		item['new'] = localStorage["inventory.item." + i + ".new"];
		if ((st == "true") || (st == "1")) {
			item.statTrak = true;
		} else {
			item.statTrak = false;
		}
		if ((item['new'] == "true") || (item['new'] == "1")) {
			item['new'] = true;
			new_weapon_count++;
		} else {
			item['new'] = false;
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

function getCollection(type, name) {
	try {
		var param = parseURLParams(window.location.href);
		if(typeof param != "undefined") {
			var caseId = param.caseId[0];
			return cases[parseInt(caseId)]
		}
	} catch (e) {
		//Error
	}
	var collection="";
	type = $.trim(type.replace(/(Souvenir|Сувенир)/g, ''));
	for (var i = 0; i < cases.length; i++) {
		for (var z = 0; z < cases[i].weapons.length; z++) 
			if ((cases[i].weapons[z].type == type) && (getSkinName(cases[i].weapons[z].skinName, "EN") == name)) {
				collection = cases[i];
				break;
			}
		if (typeof collection != 'undefined' && collection != '') break;
	}
	return collection;
}

function getWeaponImg(type, name) {
	type = type.replace(/(Souvenir|Сувенир)/g, '');
	name = getSkinName(name);
	var coll = getCollection(type, name);
	if (!coll) return 'none.png';
	for (var i = 0; i < coll.weapons.length; i++) {
		if (coll.weapons[i].type == type && getSkinName(coll.weapons[i].skinName) == name)
			return coll.weapons[i].img;
	}
}

function getWeaponRarity(type, name) {
	name = getSkinName(name);
	type = type.replace(/(Souvenir|Сувенир)/g, '');
	var coll = getCollection(type, name);
	if (typeof coll == undefined && isAndroid())
		client.sendToAnalytics("Error", "Error", "Cant find collection: "+type+" | "+name, "main.js")
	for (var i = 0; i < coll.weapons.length; i++) {
		if (coll.weapons[i].type == type && getSkinName(coll.weapons[i].skinName) == name)
			return coll.weapons[i].rarity;
	}
}

function getImgUrl(img, big) {
	var prefix = "https://steamcommunity-a.akamaihd.net/economy/image/"
	prefix = window.location.protocol == "http:" ? prefix.replace("https", "http") : prefix;
	var postfix = "/125fx125f";
	var postfixBig = "/383fx383f";
	
	if (typeof img == 'undefined') return "../images/none.png";
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

var Cheats = {
	winEveryTime : "85d9a0e47f087eaea49348f1af267d40"
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
