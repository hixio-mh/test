function getPrice(type, name, quality, statTrak) {
	quality = getQualityName(quality).toLowerCase();
	name = getSkinName(name, "EN").toLowerCase();
	if (type.substring(0,1) == "★") type = type.substring(2, type.length);
	if (type.indexOf("Сувенир") != -1) type = type.replace("Сувенир", "Souvenir");
	var item = Prices.filter(function(obj) {
		return obj.name.toLowerCase() == name && obj.type.toLowerCase() == type.toLowerCase() && obj.quality.toLowerCase() == quality;
	})
	if (item.length == 1) {
		console.warn("Найден только 1 предмет. StatTrak не учитывается.");
		if (item[0].marketPrice != 0) {
			return item[0].marketPrice;
		} else {
			console.warn("Нет цены в маркете");
			return item[0].avgPrice;
		}
	} else {
		if (statTrak == 1) {
			item = item.filter(function(obj) {
				return obj.statTrak == 1;
			})
		} else {
			item = item.filter(function(obj) {
				return typeof obj.statTrak == "undefined";
			})
		}
		if (typeof item[0] == "undefined") {
			var st = (statTrak == 1) ? "StatTrak™ " : "";
			console.warn("Предмет не найден! "+st+type+" | "+name+" ("+quality+")");
			return 0
		}
		if (item[0].marketPrice != 0) {
			return item[0].marketPrice;
		} else {
			console.warn("Нет цены в маркете");
			return item[0].avgPrice;
		}
	}
}

function getMarketPrice(type, name, quality, statTrak, selector) {
	if (statTrak != 0) type = "StatTrak™ " + type;
	if (type.indexOf("Сувенир") != -1) type = type.replace("Сувенир", "Souvenir");
	var n = type+" | "+getSkinName(name, 'EN')+" ("+getQualityName(quality)+")";
	n = encodeURI(n);
	
	$.getJSON("https://query.yahooapis.com/v1/public/yql", {
		q: "select * from json where url=\"http://steamcommunity.com/market/priceoverview/?currency=3&appid=730&market_hash_name="+n+"\"",
		format: "json"
	},
	function(data){
			try {
			if (data.query.results.json.success == "true") {
				var pr = data.query.results.json.lowest_price;
				pr = pr.replace(/,/ig, ".");
				pr = pr.substr(0, pr.length-1);
				pr = parseFloat(pr);
				console.log(pr);
				if (typeof selector != "undefined")
					$(selector).text(pr+"$");
				return pr;
			}
			} catch (e) {
				getOtherMarketsPrice(type, name, quality, statTrak, selector);
			}
		}
	);
}

function getOtherMarketsPrice(type, name, quality, statTrak, selector) {
	var n = type +' | '+ name;
	n = n.replace(/ /gi, '_');
	n = encodeURI(n);
	
	$.getJSON("https://query.yahooapis.com/v1/public/yql", {
		q: "select * from html where url='http://csgoitems.pro/en/skin/"+n+"' and xpath='//ul[@class=\"no-bullet five-up\"]'",
		format: "json"
	},
	function(data) {
		if (typeof data.query.results != "undefined") {
			var li = 0;
			switch (getQualityName(quality)) {
				case 'Factory New':
					li = 0;
					break;
				case 'Minimal Wear':
					li = 1;
					break;
				case 'Field-Tested':
					li = 2;
					break;
				case 'Well-Worn':
					li = 3;
					break;
				case 'Battle-Scarred':
					li = 4;
					break;
				default:
					li = 0;
			}
			var price = parseFloat(data.query.results.ul.li[li].ul.li[(statTrak == true) ? 3 : 1].a.content);
			if (isNaN(price)) price = 0;
			console.log('Other market: '+price);
			if (typeof selector != "undefined")
				$(selector).text(price+'$');
			return price;
		}
	});
}

var Prices = [
{
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.62,
	"avgPrice" : 2.70
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.27,
	"avgPrice" : 2.24
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.21,
	"avgPrice" : 2.19
}, {
	"type" : "AK-47",
	"name" : "Emerald Pinstripe",
	"quality" : "Factory New",
	"marketPrice" : 3.35,
	"avgPrice" : 3.58
}, {
	"type" : "AK-47",
	"name" : "Emerald Pinstripe",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.67,
	"avgPrice" : 1.76
}, {
	"type" : "AK-47",
	"name" : "Emerald Pinstripe",
	"quality" : "Field-Tested",
	"marketPrice" : 1.38,
	"avgPrice" : 1.30
}, {
	"type" : "AK-47",
	"name" : "Emerald Pinstripe",
	"quality" : "Well-Worn",
	"marketPrice" : 1.27,
	"avgPrice" : 1.24
}, {
	"type" : "AK-47",
	"name" : "Emerald Pinstripe",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.28,
	"avgPrice" : 1.23
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 687.50
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Minimal Wear",
	"marketPrice" : 344.78,
	"avgPrice" : 352.11
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Field-Tested",
	"marketPrice" : 230.03,
	"avgPrice" : 231.38
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Well-Worn",
	"marketPrice" : 206.00,
	"avgPrice" : 205.80
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Battle-Scarred",
	"marketPrice" : 143.68,
	"avgPrice" : 130.50
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 4262.50
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 1306.25
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 762.50
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 616.25
}, {
	"type" : "AK-47",
	"name" : "Fire Serpent",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 407.50
}, {
	"type" : "AK-47",
	"name" : "First Class",
	"quality" : "Factory New",
	"marketPrice" : 28.81,
	"avgPrice" : 25.81
}, {
	"type" : "AK-47",
	"name" : "First Class",
	"quality" : "Minimal Wear",
	"marketPrice" : 13.15,
	"avgPrice" : 13.28
}, {
	"type" : "AK-47",
	"name" : "First Class",
	"quality" : "Field-Tested",
	"marketPrice" : 10.75,
	"avgPrice" : 9.38
}, {
	"type" : "AK-47",
	"name" : "First Class",
	"quality" : "Well-Worn",
	"marketPrice" : 8.51,
	"avgPrice" : 9.01
}, {
	"type" : "AK-47",
	"name" : "First Class",
	"quality" : "Battle-Scarred",
	"marketPrice" : 8.67,
	"avgPrice" : 8.94
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Factory New",
	"marketPrice" : 29.98,
	"avgPrice" : 29.70
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.67,
	"avgPrice" : 14.60
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Field-Tested",
	"marketPrice" : 10.23,
	"avgPrice" : 10.17
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Well-Worn",
	"marketPrice" : 9.45,
	"avgPrice" : 9.29
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.67,
	"avgPrice" : 5.80
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 103.35,
	"avgPrice" : 106.93
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 51.64,
	"avgPrice" : 53.47
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 31.76,
	"avgPrice" : 31.59
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 27.91,
	"avgPrice" : 28.66
}, {
	"type" : "AK-47",
	"name" : "Frontside Misty",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 17.98,
	"avgPrice" : 17.67
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Factory New",
	"marketPrice" : 110.00,
	"avgPrice" : 100.88
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Minimal Wear",
	"marketPrice" : 49.10,
	"avgPrice" : 50.90
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Field-Tested",
	"marketPrice" : 37.95,
	"avgPrice" : 37.08
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Well-Worn",
	"marketPrice" : 29.14,
	"avgPrice" : 30.35
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Battle-Scarred",
	"marketPrice" : 28.77,
	"avgPrice" : 26.69
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 578.75
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 196.00,
	"avgPrice" : 169.93
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 117.00,
	"avgPrice" : 118.86
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 89.89,
	"avgPrice" : 88.94
}, {
	"type" : "AK-47",
	"name" : "Fuel Injector",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 78.00,
	"avgPrice" : 72.51
}, {
	"type" : "AK-47",
	"name" : "Hydroponic",
	"quality" : "Factory New",
	"marketPrice" : 175.19,
	"avgPrice" : 174.17
}, {
	"type" : "AK-47",
	"name" : "Hydroponic",
	"quality" : "Minimal Wear",
	"marketPrice" : 122.47,
	"avgPrice" : 120.72
}, {
	"type" : "AK-47",
	"name" : "Hydroponic",
	"quality" : "Field-Tested",
	"marketPrice" : 64.58,
	"avgPrice" : 60.94
}, {
	"type" : "AK-47",
	"name" : "Hydroponic",
	"quality" : "Well-Worn",
	"marketPrice" : 62.03,
	"avgPrice" : 53.83
}, {
	"type" : "AK-47",
	"name" : "Hydroponic",
	"quality" : "Battle-Scarred",
	"marketPrice" : 28.82,
	"avgPrice" : 27.58
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Factory New",
	"marketPrice" : 50.00,
	"avgPrice" : 50.09
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Minimal Wear",
	"marketPrice" : 16.41,
	"avgPrice" : 17.60
}, {
	"type" : "AUG",
	"name" : "Radiation Hazard",
	"quality" : "Well-Worn",
	"marketPrice" : 0.24,
	"avgPrice" : 0.27
}, {
	"type" : "AUG",
	"name" : "Radiation Hazard",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "Souvenir AUG",
	"name" : "Radiation Hazard",
	"quality" : "Factory New",
	"marketPrice" : 3.63,
	"avgPrice" : 3.71
}, {
	"type" : "Souvenir AUG",
	"name" : "Radiation Hazard",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.03,
	"avgPrice" : 1.72
}, {
	"type" : "Souvenir AUG",
	"name" : "Radiation Hazard",
	"quality" : "Field-Tested",
	"marketPrice" : 0.87,
	"avgPrice" : 0.93
}, {
	"type" : "Souvenir AUG",
	"name" : "Radiation Hazard",
	"quality" : "Well-Worn",
	"marketPrice" : 2.39,
	"avgPrice" : 1.91
}, {
	"type" : "Souvenir AUG",
	"name" : "Radiation Hazard",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.96,
	"avgPrice" : 0.93
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Factory New",
	"marketPrice" : 0.72,
	"avgPrice" : 0.70
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Field-Tested",
	"marketPrice" : 0.11,
	"avgPrice" : 0.11
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Well-Worn",
	"marketPrice" : 0.20,
	"avgPrice" : 0.21
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.92,
	"avgPrice" : 4.00
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.40,
	"avgPrice" : 1.38
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.76,
	"avgPrice" : 0.73
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.19,
	"avgPrice" : 1.23
}, {
	"type" : "AUG",
	"name" : "Ricochet",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.70,
	"avgPrice" : 0.67
}, {
	"type" : "AUG",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 0.19,
	"avgPrice" : 0.19
}, {
	"type" : "AUG",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "AUG",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "AUG",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "AUG",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir AUG",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 91.74
}, {
	"type" : "Souvenir AUG",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.72,
	"avgPrice" : 4.00
}, {
	"type" : "Souvenir AUG",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 1.21,
	"avgPrice" : 1.40
}, {
	"type" : "Souvenir AUG",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 2.84,
	"avgPrice" : 1.65
}, {
	"type" : "Souvenir AUG",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.06,
	"avgPrice" : 1.11
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Factory New",
	"marketPrice" : 1.43,
	"avgPrice" : 1.38
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.85,
	"avgPrice" : 0.82
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Field-Tested",
	"marketPrice" : 0.64,
	"avgPrice" : 0.66
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Well-Worn",
	"marketPrice" : 0.97,
	"avgPrice" : 0.88
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.86,
	"avgPrice" : 0.88
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.98,
	"avgPrice" : 5.97
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.39,
	"avgPrice" : 3.52
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.55,
	"avgPrice" : 2.39
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.58,
	"avgPrice" : 2.94
}, {
	"type" : "AUG",
	"name" : "Torque",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.29,
	"avgPrice" : 3.18
}, {
	"type" : "AUG",
	"name" : "Wings",
	"quality" : "Factory New",
	"marketPrice" : 0.92,
	"avgPrice" : 0.88
}, {
	"type" : "AUG",
	"name" : "Wings",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.10,
	"avgPrice" : 0.96
}, {
	"type" : "AUG",
	"name" : "Wings",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.81,
	"avgPrice" : 2.82
}, {
	"type" : "AUG",
	"name" : "Wings",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.27,
	"avgPrice" : 3.13
}, {
	"type" : "AK-47",
	"name" : "Redline",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 10.58,
	"avgPrice" : 11.25
}, {
	"type" : "AK-47",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 2.69,
	"avgPrice" : 2.70
}, {
	"type" : "AK-47",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.25,
	"avgPrice" : 0.26
}, {
	"type" : "AK-47",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "AK-47",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "AK-47",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "Souvenir AK-47",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 119.00,
	"avgPrice" : 80.63
}, {
	"type" : "Souvenir AK-47",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 12.05,
	"avgPrice" : 13.05
}, {
	"type" : "Souvenir AK-47",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 6.46,
	"avgPrice" : 6.65
}, {
	"type" : "Souvenir AK-47",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 6.28,
	"avgPrice" : 6.67
}, {
	"type" : "Souvenir AK-47",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.35,
	"avgPrice" : 6.27
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Factory New",
	"marketPrice" : 90.91,
	"avgPrice" : 92.14
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Minimal Wear",
	"marketPrice" : 48.00,
	"avgPrice" : 48.69
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Field-Tested",
	"marketPrice" : 27.60,
	"avgPrice" : 28.60
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Well-Worn",
	"marketPrice" : 21.87,
	"avgPrice" : 22.49
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Battle-Scarred",
	"marketPrice" : 11.64,
	"avgPrice" : 11.11
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 406.25
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 224.39,
	"avgPrice" : 221.78
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 104.81,
	"avgPrice" : 101.69
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 71.07,
	"avgPrice" : 72.66
}, {
	"type" : "AK-47",
	"name" : "Vulcan",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 41.45,
	"avgPrice" : 37.92
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Factory New",
	"marketPrice" : 121.34,
	"avgPrice" : 114.51
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Minimal Wear",
	"marketPrice" : 25.83,
	"avgPrice" : 25.92
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Field-Tested",
	"marketPrice" : 18.08,
	"avgPrice" : 17.89
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Well-Worn",
	"marketPrice" : 19.66,
	"avgPrice" : 20.13
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 16.40,
	"avgPrice" : 15.94
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 757.50
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 149.43,
	"avgPrice" : 142.64
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 90.85,
	"avgPrice" : 92.02
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 93.15,
	"avgPrice" : 83.79
}, {
	"type" : "AK-47",
	"name" : "Wasteland Rebel",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 89.27,
	"avgPrice" : 84.23
}, {
	"type" : "AUG",
	"name" : "Akihabara Accept",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 835.00
}, {
	"type" : "AUG",
	"name" : "Akihabara Accept",
	"quality" : "Minimal Wear",
	"marketPrice" : 247.17,
	"avgPrice" : 252.12
}, {
	"type" : "AUG",
	"name" : "Akihabara Accept",
	"quality" : "Field-Tested",
	"marketPrice" : 91.00,
	"avgPrice" : 88.88
}, {
	"type" : "AUG",
	"name" : "Akihabara Accept",
	"quality" : "Well-Worn",
	"marketPrice" : 55.57,
	"avgPrice" : 54.37
}, {
	"type" : "AUG",
	"name" : "Akihabara Accept",
	"quality" : "Battle-Scarred",
	"marketPrice" : 42.55,
	"avgPrice" : 36.91
}, {
	"type" : "AUG",
	"name" : "Anodized Navy",
	"quality" : "Factory New",
	"marketPrice" : 8.37,
	"avgPrice" : 8.48
}, {
	"type" : "AUG",
	"name" : "Anodized Navy",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.39,
	"avgPrice" : 11.46
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Factory New",
	"marketPrice" : 21.35,
	"avgPrice" : 22.49
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.85,
	"avgPrice" : 4.03
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Field-Tested",
	"marketPrice" : 2.08,
	"avgPrice" : 2.24
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Well-Worn",
	"marketPrice" : 2.85,
	"avgPrice" : 2.48
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.63,
	"avgPrice" : 2.18
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 240.00,
	"avgPrice" : 78.78
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 13.81,
	"avgPrice" : 15.43
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 6.98,
	"avgPrice" : 6.56
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 9.69,
	"avgPrice" : 8.45
}, {
	"type" : "AUG",
	"name" : "Bengal Tiger",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 6.87,
	"avgPrice" : 6.46
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Factory New",
	"marketPrice" : 2.77,
	"avgPrice" : 2.78
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.01,
	"avgPrice" : 1.98
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Field-Tested",
	"marketPrice" : 1.66,
	"avgPrice" : 1.64
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Well-Worn",
	"marketPrice" : 1.81,
	"avgPrice" : 1.81
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.86,
	"avgPrice" : 1.80
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 14.61,
	"avgPrice" : 14.97
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 8.97,
	"avgPrice" : 8.81
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 6.01,
	"avgPrice" : 5.67
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 6.73,
	"avgPrice" : 6.15
}, {
	"type" : "AUG",
	"name" : "Chameleon",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 5.68,
	"avgPrice" : 5.83
}, {
	"type" : "AUG",
	"name" : "Colony",
	"quality" : "Factory New",
	"marketPrice" : 7.87,
	"avgPrice" : 7.88
}, {
	"type" : "AUG",
	"name" : "Colony",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.16,
	"avgPrice" : 0.18
}, {
	"type" : "AUG",
	"name" : "Colony",
	"quality" : "Field-Tested",
	"marketPrice" : 0.12,
	"avgPrice" : 0.10
}, {
	"type" : "AUG",
	"name" : "Colony",
	"quality" : "Well-Worn",
	"marketPrice" : 0.31,
	"avgPrice" : 0.29
}, {
	"type" : "AUG",
	"name" : "Colony",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.15,
	"avgPrice" : 0.14
}, {
	"type" : "Souvenir AUG",
	"name" : "Colony",
	"quality" : "Factory New",
	"marketPrice" : 5.68,
	"avgPrice" : 4.98
}, {
	"type" : "Souvenir AUG",
	"name" : "Colony",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.69,
	"avgPrice" : 0.64
}, {
	"type" : "Souvenir AUG",
	"name" : "Colony",
	"quality" : "Field-Tested",
	"marketPrice" : 0.31,
	"avgPrice" : 0.29
}, {
	"type" : "Souvenir AUG",
	"name" : "Colony",
	"quality" : "Well-Worn",
	"marketPrice" : 0.51,
	"avgPrice" : 0.54
}, {
	"type" : "Souvenir AUG",
	"name" : "Colony",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.42,
	"avgPrice" : 0.44
}, {
	"type" : "AUG",
	"name" : "Condemned",
	"quality" : "Factory New",
	"marketPrice" : 1.21,
	"avgPrice" : 1.33
}, {
	"type" : "AUG",
	"name" : "Condemned",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.09,
	"avgPrice" : 0.09
}, {
	"type" : "AUG",
	"name" : "Condemned",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "AUG",
	"name" : "Condemned",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "AUG",
	"name" : "Condemned",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir AUG",
	"name" : "Condemned",
	"quality" : "Minimal Wear",
	"marketPrice" : 45.00,
	"avgPrice" : 32.16
}, {
	"type" : "Souvenir AUG",
	"name" : "Condemned",
	"quality" : "Field-Tested",
	"marketPrice" : 7.89,
	"avgPrice" : 6.68
}, {
	"type" : "Souvenir AUG",
	"name" : "Condemned",
	"quality" : "Well-Worn",
	"marketPrice" : 19.38,
	"avgPrice" : 8.66
}, {
	"type" : "Souvenir AUG",
	"name" : "Condemned",
	"quality" : "Battle-Scarred",
	"marketPrice" : 12.92,
	"avgPrice" : 11.12
}, {
	"type" : "AUG",
	"name" : "Contractor",
	"quality" : "Factory New",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "AUG",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "AUG",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "AUG",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "AUG",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir AUG",
	"name" : "Contractor",
	"quality" : "Factory New",
	"marketPrice" : 388.67,
	"avgPrice" : 57.14
}, {
	"type" : "Souvenir AUG",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.75,
	"avgPrice" : 5.24
}, {
	"type" : "Souvenir AUG",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 1.19,
	"avgPrice" : 1.26
}, {
	"type" : "Souvenir AUG",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 2.36,
	"avgPrice" : 1.84
}, {
	"type" : "Souvenir AUG",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.47,
	"avgPrice" : 2.90
}, {
	"type" : "AUG",
	"name" : "Copperhead",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.93,
	"avgPrice" : 7.33
}, {
	"type" : "AUG",
	"name" : "Copperhead",
	"quality" : "Field-Tested",
	"marketPrice" : 6.46,
	"avgPrice" : 4.69
}, {
	"type" : "AUG",
	"name" : "Daedalus",
	"quality" : "Factory New",
	"marketPrice" : 0.30,
	"avgPrice" : 0.27
}, {
	"type" : "AUG",
	"name" : "Daedalus",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.23,
	"avgPrice" : 0.21
}, {
	"type" : "AUG",
	"name" : "Daedalus",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "AUG",
	"name" : "Daedalus",
	"quality" : "Well-Worn",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "AUG",
	"name" : "Daedalus",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "AUG",
	"name" : "Hot Rod",
	"quality" : "Factory New",
	"marketPrice" : 64.75,
	"avgPrice" : 67.96
}, {
	"type" : "AUG",
	"name" : "Hot Rod",
	"quality" : "Minimal Wear",
	"marketPrice" : 212.56,
	"avgPrice" : 58.90
}, {
	"type" : "AUG",
	"name" : "Radiation Hazard",
	"quality" : "Factory New",
	"marketPrice" : 0.55,
	"avgPrice" : 0.52
}, {
	"type" : "AUG",
	"name" : "Radiation Hazard",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.27,
	"avgPrice" : 0.27
}, {
	"type" : "AUG",
	"name" : "Radiation Hazard",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.16
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Field-Tested",
	"marketPrice" : 12.92,
	"avgPrice" : 12.67
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Well-Worn",
	"marketPrice" : 11.59,
	"avgPrice" : 11.63
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Battle-Scarred",
	"marketPrice" : 9.58,
	"avgPrice" : 9.83
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 340.00,
	"avgPrice" : 251.12
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 106.74,
	"avgPrice" : 110.39
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 69.84,
	"avgPrice" : 71.52
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 58.51,
	"avgPrice" : 53.61
}, {
	"type" : "AK-47",
	"name" : "Jaguar",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 46.88,
	"avgPrice" : 44.54
}, {
	"type" : "AK-47",
	"name" : "Jet Set",
	"quality" : "Factory New",
	"marketPrice" : 191.98,
	"avgPrice" : 183.90
}, {
	"type" : "AK-47",
	"name" : "Jet Set",
	"quality" : "Minimal Wear",
	"marketPrice" : 52.00,
	"avgPrice" : 57.05
}, {
	"type" : "AK-47",
	"name" : "Jet Set",
	"quality" : "Field-Tested",
	"marketPrice" : 38.49,
	"avgPrice" : 34.51
}, {
	"type" : "AK-47",
	"name" : "Jet Set",
	"quality" : "Well-Worn",
	"marketPrice" : 29.99,
	"avgPrice" : 27.98
}, {
	"type" : "AK-47",
	"name" : "Jet Set",
	"quality" : "Battle-Scarred",
	"marketPrice" : 27.23,
	"avgPrice" : 25.55
}, {
	"type" : "AK-47",
	"name" : "Jungle Spray",
	"quality" : "Factory New",
	"marketPrice" : 16.50,
	"avgPrice" : 16.70
}, {
	"type" : "AK-47",
	"name" : "Jungle Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.74,
	"avgPrice" : 1.82
}, {
	"type" : "AK-47",
	"name" : "Jungle Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.66,
	"avgPrice" : 0.70
}, {
	"type" : "AK-47",
	"name" : "Jungle Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 1.19,
	"avgPrice" : 1.14
}, {
	"type" : "AK-47",
	"name" : "Jungle Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.95,
	"avgPrice" : 0.99
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Factory New",
	"marketPrice" : 28.07,
	"avgPrice" : 28.55
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Minimal Wear",
	"marketPrice" : 18.49,
	"avgPrice" : 17.70
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Field-Tested",
	"marketPrice" : 12.53,
	"avgPrice" : 12.54
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Well-Worn",
	"marketPrice" : 12.12,
	"avgPrice" : 12.54
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 7.62,
	"avgPrice" : 7.57
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 100.21,
	"avgPrice" : 94.11
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 68.55,
	"avgPrice" : 67.22
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 39.90,
	"avgPrice" : 40.29
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 40.08,
	"avgPrice" : 39.91
}, {
	"type" : "AK-47",
	"name" : "Point Disarray",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 22.46,
	"avgPrice" : 24.18
}, {
	"type" : "AK-47",
	"name" : "Predator",
	"quality" : "Factory New",
	"marketPrice" : 8.65,
	"avgPrice" : 8.45
}, {
	"type" : "AK-47",
	"name" : "Predator",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.21,
	"avgPrice" : 1.23
}, {
	"type" : "AK-47",
	"name" : "Predator",
	"quality" : "Field-Tested",
	"marketPrice" : 0.75,
	"avgPrice" : 0.72
}, {
	"type" : "AK-47",
	"name" : "Predator",
	"quality" : "Well-Worn",
	"marketPrice" : 1.11,
	"avgPrice" : 1.10
}, {
	"type" : "AK-47",
	"name" : "Predator",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.95,
	"avgPrice" : 0.85
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Factory New",
	"marketPrice" : 123.34,
	"avgPrice" : 113.10
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Minimal Wear",
	"marketPrice" : 11.70,
	"avgPrice" : 11.43
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Field-Tested",
	"marketPrice" : 6.85,
	"avgPrice" : 7.02
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Well-Worn",
	"marketPrice" : 7.50,
	"avgPrice" : 8.07
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.64,
	"avgPrice" : 7.03
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 1625.00
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 94.70,
	"avgPrice" : 89.18
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 42.70,
	"avgPrice" : 43.02
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 41.92,
	"avgPrice" : 41.10
}, {
	"type" : "AK-47",
	"name" : "Red Laminate",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 46.00,
	"avgPrice" : 45.50
}, {
	"type" : "AK-47",
	"name" : "Redline",
	"quality" : "Minimal Wear",
	"marketPrice" : 18.48,
	"avgPrice" : 19.42
}, {
	"type" : "AK-47",
	"name" : "Redline",
	"quality" : "Field-Tested",
	"marketPrice" : 5.77,
	"avgPrice" : 5.79
}, {
	"type" : "AK-47",
	"name" : "Redline",
	"quality" : "Well-Worn",
	"marketPrice" : 6.04,
	"avgPrice" : 5.83
}, {
	"type" : "AK-47",
	"name" : "Redline",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.37,
	"avgPrice" : 3.16
}, {
	"type" : "AK-47",
	"name" : "Redline",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 140.00,
	"avgPrice" : 127.23
}, {
	"type" : "AK-47",
	"name" : "Redline",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 27.53,
	"avgPrice" : 27.03
}, {
	"type" : "AK-47",
	"name" : "Redline",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 24.66,
	"avgPrice" : 23.05
}, {
	"type" : "AWP",
	"name" : "Asiimov",
	"quality" : "Field-Tested",
	"marketPrice" : 38.75,
	"avgPrice" : 41.26
}, {
	"type" : "AWP",
	"name" : "Asiimov",
	"quality" : "Well-Worn",
	"marketPrice" : 33.17,
	"avgPrice" : 34.65
}, {
	"type" : "AWP",
	"name" : "Asiimov",
	"quality" : "Battle-Scarred",
	"marketPrice" : 26.91,
	"avgPrice" : 26.03
}, {
	"type" : "AWP",
	"name" : "Asiimov",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 118.52,
	"avgPrice" : 124.42
}, {
	"type" : "AWP",
	"name" : "Asiimov",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 88.50,
	"avgPrice" : 97.39
}, {
	"type" : "AWP",
	"name" : "Asiimov",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 73.00,
	"avgPrice" : 69.84
}, {
	"type" : "AWP",
	"name" : "BOOM",
	"quality" : "Factory New",
	"marketPrice" : 117.96,
	"avgPrice" : 110.92
}, {
	"type" : "AWP",
	"name" : "BOOM",
	"quality" : "Minimal Wear",
	"marketPrice" : 23.53,
	"avgPrice" : 24.73
}, {
	"type" : "AWP",
	"name" : "BOOM",
	"quality" : "Field-Tested",
	"marketPrice" : 19.38,
	"avgPrice" : 19.98
}, {
	"type" : "AWP",
	"name" : "BOOM",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 366.25
}, {
	"type" : "AWP",
	"name" : "BOOM",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 114.60,
	"avgPrice" : 108.25
}, {
	"type" : "AWP",
	"name" : "BOOM",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 71.07,
	"avgPrice" : 71.75
}, {
	"type" : "AWP",
	"name" : "Corticera",
	"quality" : "Factory New",
	"marketPrice" : 12.65,
	"avgPrice" : 12.44
}, {
	"type" : "AWP",
	"name" : "Corticera",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.75,
	"avgPrice" : 6.68
}, {
	"type" : "AWP",
	"name" : "Corticera",
	"quality" : "Field-Tested",
	"marketPrice" : 6.40,
	"avgPrice" : 6.19
}, {
	"type" : "AWP",
	"name" : "Corticera",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 54.47,
	"avgPrice" : 56.44
}, {
	"type" : "AWP",
	"name" : "Corticera",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 27.41,
	"avgPrice" : 27.50
}, {
	"type" : "AWP",
	"name" : "Corticera",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 24.77,
	"avgPrice" : 23.86
}, {
	"type" : "AWP",
	"name" : "Dragon Lore",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1536.25
}, {
	"type" : "AWP",
	"name" : "Dragon Lore",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 1285.00
}, {
	"type" : "AWP",
	"name" : "Dragon Lore",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 923.75
}, {
	"type" : "AWP",
	"name" : "Dragon Lore",
	"quality" : "Well-Worn",
	"marketPrice" : 0,
	"avgPrice" : 675.00
}, {
	"type" : "AWP",
	"name" : "Dragon Lore",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0,
	"avgPrice" : 568.75
}, {
	"type" : "Souvenir AWP",
	"name" : "Dragon Lore",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 15500.00
}, {
	"type" : "Souvenir AWP",
	"name" : "Dragon Lore",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 6550.00
}, {
	"type" : "Souvenir AWP",
	"name" : "Dragon Lore",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 3399.00
}, {
	"type" : "Souvenir AWP",
	"name" : "Dragon Lore",
	"quality" : "Well-Worn",
	"marketPrice" : 0,
	"avgPrice" : 1850.00
}, {
	"type" : "Souvenir AWP",
	"name" : "Dragon Lore",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0,
	"avgPrice" : 1100.00
}, {
	"type" : "AWP",
	"name" : "Electric Hive",
	"quality" : "Factory New",
	"marketPrice" : 15.57,
	"avgPrice" : 15.58
}, {
	"type" : "AWP",
	"name" : "Electric Hive",
	"quality" : "Minimal Wear",
	"marketPrice" : 13.50,
	"avgPrice" : 13.23
}, {
	"type" : "AWP",
	"name" : "Electric Hive",
	"quality" : "Field-Tested",
	"marketPrice" : 10.47,
	"avgPrice" : 10.70
}, {
	"type" : "AWP",
	"name" : "Electric Hive",
	"quality" : "Well-Worn",
	"marketPrice" : 12.70,
	"avgPrice" : 13.42
}, {
	"type" : "AWP",
	"name" : "Electric Hive",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 65.16,
	"avgPrice" : 65.10
}, {
	"type" : "AWP",
	"name" : "Electric Hive",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 50.56,
	"avgPrice" : 50.54
}, {
	"type" : "AWP",
	"name" : "Electric Hive",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 34.53,
	"avgPrice" : 34.75
}, {
	"type" : "AWP",
	"name" : "Electric Hive",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 41.42,
	"avgPrice" : 43.34
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Factory New",
	"marketPrice" : 22.03,
	"avgPrice" : 21.22
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Minimal Wear",
	"marketPrice" : 11.55,
	"avgPrice" : 11.86
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Field-Tested",
	"marketPrice" : 6.87,
	"avgPrice" : 7.28
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Well-Worn",
	"marketPrice" : 5.81,
	"avgPrice" : 6.04
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.95,
	"avgPrice" : 4.88
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 88.75,
	"avgPrice" : 89.57
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 47.20,
	"avgPrice" : 47.28
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 28.17,
	"avgPrice" : 29.40
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 23.60,
	"avgPrice" : 23.58
}, {
	"type" : "AWP",
	"name" : "Elite Build",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 23.23,
	"avgPrice" : 20.97
}, {
	"type" : "AWP",
	"name" : "Graphite",
	"quality" : "Factory New",
	"marketPrice" : 42.03,
	"avgPrice" : 42.81
}, {
	"type" : "AWP",
	"name" : "Graphite",
	"quality" : "Minimal Wear",
	"marketPrice" : 41.22,
	"avgPrice" : 40.99
}, {
	"type" : "AWP",
	"name" : "Graphite",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 218.00,
	"avgPrice" : 202.81
}, {
	"type" : "AWP",
	"name" : "Graphite",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 174.66,
	"avgPrice" : 158.25
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Factory New",
	"marketPrice" : 63.30,
	"avgPrice" : 63.49
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Minimal Wear",
	"marketPrice" : 44.00,
	"avgPrice" : 43.92
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Field-Tested",
	"marketPrice" : 30.36,
	"avgPrice" : 29.65
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Well-Worn",
	"marketPrice" : 22.45,
	"avgPrice" : 22.61
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Battle-Scarred",
	"marketPrice" : 13.41,
	"avgPrice" : 13.45
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 242.86
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 137.00,
	"avgPrice" : 137.99
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 82.61,
	"avgPrice" : 80.44
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 64.05,
	"avgPrice" : 62.45
}, {
	"type" : "AWP",
	"name" : "Hyper Beast",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 35.00,
	"avgPrice" : 37.83
}, {
	"type" : "AWP",
	"name" : "Lightning Strike",
	"quality" : "Factory New",
	"marketPrice" : 64.06,
	"avgPrice" : 62.23
}, {
	"type" : "AWP",
	"name" : "Lightning Strike",
	"quality" : "Minimal Wear",
	"marketPrice" : 82.80,
	"avgPrice" : 66.81
}, {
	"type" : "AWP",
	"name" : "Lightning Strike",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 258.46,
	"avgPrice" : 244.86
}, {
	"type" : "AWP",
	"name" : "Lightning Strike",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 381.63,
	"avgPrice" : 187.79
}, {
	"type" : "AWP",
	"name" : "Man-o'-war",
	"quality" : "Minimal Wear",
	"marketPrice" : 12.16,
	"avgPrice" : 11.94
}, {
	"type" : "AWP",
	"name" : "Man-o'-war",
	"quality" : "Field-Tested",
	"marketPrice" : 11.69,
	"avgPrice" : 11.37
}, {
	"type" : "AWP",
	"name" : "Man-o'-war",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 45.23,
	"avgPrice" : 41.17
}, {
	"type" : "AWP",
	"name" : "Man-o'-war",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 38.48,
	"avgPrice" : 37.09
}, {
	"type" : "AWP",
	"name" : "Medusa",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1215.00
}, {
	"type" : "AWP",
	"name" : "Medusa",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 590.00
}, {
	"type" : "AWP",
	"name" : "Medusa",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 415.00
}, {
	"type" : "AWP",
	"name" : "Medusa",
	"quality" : "Well-Worn",
	"marketPrice" : 0,
	"avgPrice" : 412.50
}, {
	"type" : "AWP",
	"name" : "Medusa",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0,
	"avgPrice" : 448.75
}, {
	"type" : "AWP",
	"name" : "Pink DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 114.48,
	"avgPrice" : 125.75
}, {
	"type" : "AWP",
	"name" : "Pink DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 27.99,
	"avgPrice" : 26.64
}, {
	"type" : "AWP",
	"name" : "Pink DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 15.30,
	"avgPrice" : 14.96
}, {
	"type" : "AWP",
	"name" : "Pink DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 14.76,
	"avgPrice" : 14.80
}, {
	"type" : "AWP",
	"name" : "Pink DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 12.44,
	"avgPrice" : 11.54
}, {
	"type" : "Souvenir AWP",
	"name" : "Pink DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 279.36,
	"avgPrice" : 295.89
}, {
	"type" : "Souvenir AWP",
	"name" : "Pink DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 111.22,
	"avgPrice" : 126.73
}, {
	"type" : "Souvenir AWP",
	"name" : "Pink DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 349.20,
	"avgPrice" : 184.34
}, {
	"type" : "Souvenir AWP",
	"name" : "Pink DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 121.45,
	"avgPrice" : 100.03
}, {
	"type" : "AWP",
	"name" : "Pit Viper",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.01,
	"avgPrice" : 2.09
}, {
	"type" : "AWP",
	"name" : "Pit Viper",
	"quality" : "Field-Tested",
	"marketPrice" : 1.18,
	"avgPrice" : 1.15
}, {
	"type" : "AWP",
	"name" : "Pit Viper",
	"quality" : "Well-Worn",
	"marketPrice" : 1.66,
	"avgPrice" : 1.62
}, {
	"type" : "AWP",
	"name" : "Pit Viper",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.45,
	"avgPrice" : 1.47
}, {
	"type" : "Souvenir AWP",
	"name" : "Pit Viper",
	"quality" : "Minimal Wear",
	"marketPrice" : 150.60,
	"avgPrice" : 173.55
}, {
	"type" : "Souvenir AWP",
	"name" : "Pit Viper",
	"quality" : "Field-Tested",
	"marketPrice" : 115.00,
	"avgPrice" : 51.95
}, {
	"type" : "AWP",
	"name" : "Redline",
	"quality" : "Minimal Wear",
	"marketPrice" : 15.75,
	"avgPrice" : 15.66
}, {
	"type" : "AWP",
	"name" : "Redline",
	"quality" : "Field-Tested",
	"marketPrice" : 10.78,
	"avgPrice" : 10.41
}, {
	"type" : "AWP",
	"name" : "Redline",
	"quality" : "Well-Worn",
	"marketPrice" : 13.72,
	"avgPrice" : 12.78
}, {
	"type" : "AWP",
	"name" : "Redline",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 61.79,
	"avgPrice" : 63.74
}, {
	"type" : "AWP",
	"name" : "Redline",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 41.30,
	"avgPrice" : 36.67
}, {
	"type" : "AWP",
	"name" : "Redline",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 60.35,
	"avgPrice" : 42.01
}, {
	"type" : "AWP",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 3.17,
	"avgPrice" : 2.85
}, {
	"type" : "AWP",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.43,
	"avgPrice" : 0.43
}, {
	"type" : "AWP",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "AWP",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.26,
	"avgPrice" : 0.25
}, {
	"type" : "AWP",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.49,
	"avgPrice" : 0.47
}, {
	"type" : "Souvenir AWP",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 50.00,
	"avgPrice" : 62.96
}, {
	"type" : "Souvenir AWP",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 41.21,
	"avgPrice" : 46.29
}, {
	"type" : "Souvenir AWP",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 59.05,
	"avgPrice" : 31.48
}, {
	"type" : "Souvenir AWP",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 33.58,
	"avgPrice" : 25.25
}, {
	"type" : "AWP",
	"name" : "Snake Camo",
	"quality" : "Factory New",
	"marketPrice" : 34.82,
	"avgPrice" : 30.80
}, {
	"type" : "AWP",
	"name" : "Snake Camo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 6.36
}, {
	"type" : "AWP",
	"name" : "Snake Camo",
	"quality" : "Field-Tested",
	"marketPrice" : 5.49,
	"avgPrice" : 4.47
}, {
	"type" : "AWP",
	"name" : "Snake Camo",
	"quality" : "Well-Worn",
	"marketPrice" : 4.48,
	"avgPrice" : 4.63
}, {
	"type" : "AWP",
	"name" : "Snake Camo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.92,
	"avgPrice" : 4.93
}, {
	"type" : "AWP",
	"name" : "Sun in Leo",
	"quality" : "Factory New",
	"marketPrice" : 6.81,
	"avgPrice" : 6.78
}, {
	"type" : "AWP",
	"name" : "Sun in Leo",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.85,
	"avgPrice" : 5.04
}, {
	"type" : "AWP",
	"name" : "Sun in Leo",
	"quality" : "Field-Tested",
	"marketPrice" : 2.53,
	"avgPrice" : 2.56
}, {
	"type" : "AWP",
	"name" : "Sun in Leo",
	"quality" : "Well-Worn",
	"marketPrice" : 2.83,
	"avgPrice" : 2.90
}, {
	"type" : "AWP",
	"name" : "Sun in Leo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.25,
	"avgPrice" : 2.39
}, {
	"type" : "AWP",
	"name" : "Worm God",
	"quality" : "Factory New",
	"marketPrice" : 1.52,
	"avgPrice" : 1.49
}, {
	"type" : "AWP",
	"name" : "Worm God",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.00,
	"avgPrice" : 1.01
}, {
	"type" : "AWP",
	"name" : "Worm God",
	"quality" : "Field-Tested",
	"marketPrice" : 0.94,
	"avgPrice" : 0.91
}, {
	"type" : "AWP",
	"name" : "Worm God",
	"quality" : "Well-Worn",
	"marketPrice" : 1.12,
	"avgPrice" : 1.09
}, {
	"type" : "AWP",
	"name" : "Worm God",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 7.85,
	"avgPrice" : 7.56
}, {
	"type" : "AWP",
	"name" : "Worm God",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 5.63,
	"avgPrice" : 5.57
}, {
	"type" : "AWP",
	"name" : "Worm God",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 5.07,
	"avgPrice" : 5.10
}, {
	"type" : "AWP",
	"name" : "Worm God",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.91,
	"avgPrice" : 5.80
}, {
	"type" : "Bayonet",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 274.99,
	"avgPrice" : 215.24
}, {
	"type" : "Bayonet",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 164.00,
	"avgPrice" : 159.05
}, {
	"type" : "Bayonet",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 142.63,
	"avgPrice" : 139.27
}, {
	"type" : "Bayonet",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 129.95,
	"avgPrice" : 132.55
}, {
	"type" : "Bayonet",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 126.96,
	"avgPrice" : 124.35
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 523.75
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 215.00,
	"avgPrice" : 202.38
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 199.47,
	"avgPrice" : 174.72
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 182.18,
	"avgPrice" : 170.26
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 214.86,
	"avgPrice" : 153.38
}, {
	"type" : "Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 230.00,
	"avgPrice" : 189.18
}, {
	"type" : "Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 106.00,
	"avgPrice" : 103.55
}, {
	"type" : "Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 78.01,
	"avgPrice" : 77.67
}, {
	"type" : "Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 86.25,
	"avgPrice" : 81.72
}, {
	"type" : "Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 78.86,
	"avgPrice" : 76.32
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 148.58,
	"avgPrice" : 135.84
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 98.83,
	"avgPrice" : 95.31
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 157.21,
	"avgPrice" : 99.98
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 92.00,
	"avgPrice" : 87.47
}, {
	"type" : "Bayonet",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 254.00,
	"avgPrice" : 236.43
}, {
	"type" : "Bayonet",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 172.50,
	"avgPrice" : 179.64
}, {
	"type" : "Bayonet",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 154.13,
	"avgPrice" : 157.87
}, {
	"type" : "Bayonet",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 154.99,
	"avgPrice" : 143.79
}, {
	"type" : "Bayonet",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 140.10,
	"avgPrice" : 132.07
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 957.50
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 229.25,
	"avgPrice" : 240.09
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 196.14,
	"avgPrice" : 203.38
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 234.15,
	"avgPrice" : 183.26
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 201.55,
	"avgPrice" : 179.09
}, {
	"type" : "Bayonet",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1531.25
}, {
	"type" : "Bayonet",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 246.67,
	"avgPrice" : 247.60
}, {
	"type" : "Bayonet",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 126.65,
	"avgPrice" : 127.74
}, {
	"type" : "Bayonet",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 137.00,
	"avgPrice" : 127.44
}, {
	"type" : "Bayonet",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 123.02,
	"avgPrice" : 110.22
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 437.50
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Factory New",
	"marketPrice" : 45.72,
	"avgPrice" : 42.29
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Minimal Wear",
	"marketPrice" : 29.01,
	"avgPrice" : 29.88
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Field-Tested",
	"marketPrice" : 20.24,
	"avgPrice" : 20.45
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Well-Worn",
	"marketPrice" : 15.89,
	"avgPrice" : 15.53
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Battle-Scarred",
	"marketPrice" : 11.23,
	"avgPrice" : 10.85
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 181.71,
	"avgPrice" : 179.38
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 108.69,
	"avgPrice" : 111.18
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 75.90,
	"avgPrice" : 70.07
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 47.61,
	"avgPrice" : 49.02
}, {
	"type" : "AK-47",
	"name" : "Aquamarine Revenge",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 34.09,
	"avgPrice" : 35.37
}, {
	"type" : "AK-47",
	"name" : "Black Laminate",
	"quality" : "Factory New",
	"marketPrice" : 195.00,
	"avgPrice" : 122.83
}, {
	"type" : "AK-47",
	"name" : "Black Laminate",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.24,
	"avgPrice" : 8.04
}, {
	"type" : "AK-47",
	"name" : "Black Laminate",
	"quality" : "Field-Tested",
	"marketPrice" : 6.16,
	"avgPrice" : 6.46
}, {
	"type" : "AK-47",
	"name" : "Black Laminate",
	"quality" : "Well-Worn",
	"marketPrice" : 6.94,
	"avgPrice" : 6.56
}, {
	"type" : "AK-47",
	"name" : "Black Laminate",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.80,
	"avgPrice" : 6.44
}, {
	"type" : "AK-47",
	"name" : "Blue Laminate",
	"quality" : "Factory New",
	"marketPrice" : 3.00,
	"avgPrice" : 3.06
}, {
	"type" : "AK-47",
	"name" : "Blue Laminate",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.25,
	"avgPrice" : 2.32
}, {
	"type" : "AK-47",
	"name" : "Blue Laminate",
	"quality" : "Field-Tested",
	"marketPrice" : 2.14,
	"avgPrice" : 2.20
}, {
	"type" : "AK-47",
	"name" : "Blue Laminate",
	"quality" : "Well-Worn",
	"marketPrice" : 4.39,
	"avgPrice" : 4.37
}, {
	"type" : "AK-47",
	"name" : "Blue Laminate",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 16.22,
	"avgPrice" : 16.90
}, {
	"type" : "AK-47",
	"name" : "Blue Laminate",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 12.39,
	"avgPrice" : 12.28
}, {
	"type" : "AK-47",
	"name" : "Blue Laminate",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 11.22,
	"avgPrice" : 11.44
}, {
	"type" : "AK-47",
	"name" : "Blue Laminate",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 15.46,
	"avgPrice" : 14.76
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Factory New",
	"marketPrice" : 5.20,
	"avgPrice" : 5.31
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.55,
	"avgPrice" : 2.61
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Field-Tested",
	"marketPrice" : 2.27,
	"avgPrice" : 2.24
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Well-Worn",
	"marketPrice" : 3.85,
	"avgPrice" : 3.67
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.30,
	"avgPrice" : 2.33
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 27.05,
	"avgPrice" : 25.51
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 15.00,
	"avgPrice" : 14.71
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 10.32,
	"avgPrice" : 11.23
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 14.00,
	"avgPrice" : 13.08
}, {
	"type" : "AK-47",
	"name" : "Cartel",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 11.80,
	"avgPrice" : 11.66
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 68.50,
	"avgPrice" : 67.20
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 42.47,
	"avgPrice" : 43.94
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 32.29,
	"avgPrice" : 33.30
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 29.53,
	"avgPrice" : 29.17
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 24.41,
	"avgPrice" : 26.14
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 356.00,
	"avgPrice" : 349.83
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 199.99,
	"avgPrice" : 180.39
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 123.59,
	"avgPrice" : 126.74
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 97.53,
	"avgPrice" : 101.04
}, {
	"type" : "AK-47",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 84.26,
	"avgPrice" : 90.21
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Factory New",
	"marketPrice" : 1.86,
	"avgPrice" : 2.06
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.63,
	"avgPrice" : 0.62
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Field-Tested",
	"marketPrice" : 0.34,
	"avgPrice" : 0.35
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Well-Worn",
	"marketPrice" : 0.26,
	"avgPrice" : 0.27
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.25,
	"avgPrice" : 0.24
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 13.00,
	"avgPrice" : 13.13
}, {
	"type" : "AK-47",
	"name" : "Elite Build",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.20,
	"avgPrice" : 4.12
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 172.13,
	"avgPrice" : 159.36
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 280.76,
	"avgPrice" : 157.30
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 165.00,
	"avgPrice" : 135.83
}, {
	"type" : "Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 192.00,
	"avgPrice" : 193.41
}, {
	"type" : "Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 177.83,
	"avgPrice" : 170.94
}, {
	"type" : "Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 151.61,
	"avgPrice" : 150.01
}, {
	"type" : "Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 155.55,
	"avgPrice" : 154.30
}, {
	"type" : "Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 157.43,
	"avgPrice" : 142.59
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 335.38,
	"avgPrice" : 316.64
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 275.00,
	"avgPrice" : 235.34
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 227.74,
	"avgPrice" : 170.88
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 213.17,
	"avgPrice" : 176.46
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 258.37,
	"avgPrice" : 196.84
}, {
	"type" : "Bayonet",
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 305.59,
	"avgPrice" : 283.75
}, {
	"type" : "Bayonet",
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 307.93
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 562.50
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 398.62,
	"avgPrice" : 387.50
}, {
	"type" : "Bayonet",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 320.01,
	"avgPrice" : 313.35
}, {
	"type" : "Bayonet",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 296.96
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 456.25
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 384.99,
	"avgPrice" : 443.75
}, {
	"type" : "Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 153.67,
	"avgPrice" : 154.12
}, {
	"type" : "Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 99.98,
	"avgPrice" : 99.16
}, {
	"type" : "Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 77.36,
	"avgPrice" : 77.16
}, {
	"type" : "Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 82.98,
	"avgPrice" : 80.99
}, {
	"type" : "Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 77.05,
	"avgPrice" : 76.36
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 766.25
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 151.83,
	"avgPrice" : 137.33
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 96.33,
	"avgPrice" : 94.97
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 91.25,
	"avgPrice" : 89.47
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 115.03,
	"avgPrice" : 93.40
}, {
	"type" : "Bayonet",
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 407.50
}, {
	"type" : "Bayonet",
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 400.51,
	"avgPrice" : 612.50
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 597.50
}, {
	"type" : "Bayonet",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 975.00
}, {
	"type" : "Bayonet",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 165.89,
	"avgPrice" : 167.00
}, {
	"type" : "Bayonet",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 100.00,
	"avgPrice" : 96.39
}, {
	"type" : "Bayonet",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 99.98,
	"avgPrice" : 99.10
}, {
	"type" : "Bayonet",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 95.50,
	"avgPrice" : 85.92
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 3500.00
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 247.17,
	"avgPrice" : 233.09
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 132.05,
	"avgPrice" : 122.97
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 129.19,
	"avgPrice" : 115.34
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 135.65,
	"avgPrice" : 100.46
}, {
	"type" : "Bayonet",
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 138.19,
	"avgPrice" : 128.40
}, {
	"type" : "Bayonet",
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 106.74,
	"avgPrice" : 108.35
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 404.46,
	"avgPrice" : 730.00
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 149.99,
	"avgPrice" : 150.23
}, {
	"type" : "Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 316.18,
	"avgPrice" : 190.57
}, {
	"type" : "Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 91.10,
	"avgPrice" : 87.50
}, {
	"type" : "Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 76.41,
	"avgPrice" : 74.49
}, {
	"type" : "Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 79.99,
	"avgPrice" : 74.33
}, {
	"type" : "Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 77.44,
	"avgPrice" : 74.11
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 140.44,
	"avgPrice" : 110.21
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 95.95,
	"avgPrice" : 91.06
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 90.00,
	"avgPrice" : 88.49
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 87.59,
	"avgPrice" : 85.79
}, {
	"type" : "Bayonet",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 340.00,
	"avgPrice" : 251.25
}, {
	"type" : "Bayonet",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 105.00,
	"avgPrice" : 101.81
}, {
	"type" : "Bayonet",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 80.00,
	"avgPrice" : 76.78
}, {
	"type" : "Bayonet",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 83.98,
	"avgPrice" : 75.35
}, {
	"type" : "Bayonet",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 78.00,
	"avgPrice" : 77.96
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1837.50
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 142.54,
	"avgPrice" : 117.11
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 103.11,
	"avgPrice" : 96.59
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 99.99,
	"avgPrice" : 93.99
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 193.80,
	"avgPrice" : 91.94
}, {
	"type" : "Bayonet",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 327.75,
	"avgPrice" : 306.09
}, {
	"type" : "Bayonet",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 239.02,
	"avgPrice" : 245.44
}, {
	"type" : "Bayonet",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 206.97,
	"avgPrice" : 193.87
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 457.50
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 340.43,
	"avgPrice" : 311.25
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 257.28,
	"avgPrice" : 221.98
}, {
	"type" : "Bayonet",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 168.50,
	"avgPrice" : 157.81
}, {
	"type" : "Bayonet",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 120.25,
	"avgPrice" : 120.31
}, {
	"type" : "Bayonet",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 109.76,
	"avgPrice" : 110.91
}, {
	"type" : "Bayonet",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 106.37,
	"avgPrice" : 106.97
}, {
	"type" : "Bayonet",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 107.37,
	"avgPrice" : 103.19
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 180.87,
	"avgPrice" : 156.78
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 140.99,
	"avgPrice" : 130.12
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 135.84,
	"avgPrice" : 129.64
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 121.59,
	"avgPrice" : 117.11
}, {
	"type" : "Bayonet",
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 381.65,
	"avgPrice" : 326.25
}, {
	"type" : "Bayonet",
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 378.98,
	"avgPrice" : 354.63
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 427.50
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 918.75
}, {
	"type" : "Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 892.50
}, {
	"type" : "Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 179.99,
	"avgPrice" : 174.41
}, {
	"type" : "Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 89.13,
	"avgPrice" : 92.92
}, {
	"type" : "Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 95.00,
	"avgPrice" : 94.31
}, {
	"type" : "Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 96.11,
	"avgPrice" : 92.36
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 269.82,
	"avgPrice" : 241.34
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 129.03,
	"avgPrice" : 117.12
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 130.65,
	"avgPrice" : 112.43
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 123.20,
	"avgPrice" : 108.47
}, {
	"type" : "Bayonet",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 212.83,
	"avgPrice" : 182.26
}, {
	"type" : "Bayonet",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 114.85,
	"avgPrice" : 107.84
}, {
	"type" : "Bayonet",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 95.64,
	"avgPrice" : 81.24
}, {
	"type" : "Bayonet",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 90.91,
	"avgPrice" : 81.93
}, {
	"type" : "Bayonet",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 81.00,
	"avgPrice" : 78.46
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 124.00,
	"avgPrice" : 112.58
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 116.28,
	"avgPrice" : 106.79
}, {
	"name" : "Bowie Knife",
	"marketPrice" : 129.19,
	"avgPrice" : 144.20
}, {
	"type" : "Butterfly Knife",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 232.56,
	"avgPrice" : 204.37
}, {
	"type" : "Butterfly Knife",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 162.40,
	"avgPrice" : 156.54
}, {
	"type" : "Butterfly Knife",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 134.83,
	"avgPrice" : 134.38
}, {
	"type" : "Butterfly Knife",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 131.71,
	"avgPrice" : 126.45
}, {
	"type" : "Butterfly Knife",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 139.68,
	"avgPrice" : 131.08
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 718.75
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 336.28,
	"avgPrice" : 232.30
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 215.71,
	"avgPrice" : 197.91
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 185.55,
	"avgPrice" : 185.02
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 398.84,
	"avgPrice" : 221.83
}, {
	"type" : "Butterfly Knife",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 239.28,
	"avgPrice" : 203.21
}, {
	"type" : "Butterfly Knife",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 119.95,
	"avgPrice" : 112.18
}, {
	"type" : "Butterfly Knife",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 96.78,
	"avgPrice" : 92.68
}, {
	"type" : "Butterfly Knife",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 104.76,
	"avgPrice" : 93.32
}, {
	"type" : "Butterfly Knife",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 92.13,
	"avgPrice" : 89.71
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 179.53,
	"avgPrice" : 172.23
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 127.94,
	"avgPrice" : 118.60
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 128.01,
	"avgPrice" : 116.98
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 105.35,
	"avgPrice" : 88.92
}, {
	"type" : "Butterfly Knife",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 265.94,
	"avgPrice" : 252.81
}, {
	"type" : "Butterfly Knife",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 165.00,
	"avgPrice" : 160.75
}, {
	"type" : "Butterfly Knife",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 140.00,
	"avgPrice" : 145.04
}, {
	"type" : "Butterfly Knife",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 139.68,
	"avgPrice" : 132.19
}, {
	"type" : "Butterfly Knife",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 134.98,
	"avgPrice" : 125.87
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 762.50
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 324.45,
	"avgPrice" : 257.04
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 213.98,
	"avgPrice" : 212.48
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 202.22,
	"avgPrice" : 205.82
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 259.99,
	"avgPrice" : 144.45
}, {
	"type" : "Butterfly Knife",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 956.25
}, {
	"type" : "Butterfly Knife",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 289.92,
	"avgPrice" : 276.49
}, {
	"type" : "Butterfly Knife",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 148.69,
	"avgPrice" : 146.96
}, {
	"type" : "Butterfly Knife",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 153.75,
	"avgPrice" : 141.25
}, {
	"type" : "Butterfly Knife",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 114.97,
	"avgPrice" : 117.19
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 478.75
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 214.99,
	"avgPrice" : 195.49
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 210.45,
	"avgPrice" : 209.74
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 172.50,
	"avgPrice" : 137.69
}, {
	"type" : "Butterfly Knife",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 307.75,
	"avgPrice" : 298.28
}, {
	"type" : "Butterfly Knife",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 330.20,
	"avgPrice" : 297.40
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 406.25
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 399.05,
	"avgPrice" : 631.25
}, {
	"type" : "Butterfly Knife",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 172.58,
	"avgPrice" : 154.01
}, {
	"type" : "Butterfly Knife",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 112.26,
	"avgPrice" : 106.42
}, {
	"type" : "Butterfly Knife",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 91.58,
	"avgPrice" : 90.48
}, {
	"type" : "Butterfly Knife",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 95.50,
	"avgPrice" : 87.14
}, {
	"type" : "Butterfly Knife",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 91.10,
	"avgPrice" : 85.65
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 214.52,
	"avgPrice" : 165.98
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 121.23,
	"avgPrice" : 114.87
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 168.52,
	"avgPrice" : 109.88
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 112.35,
	"avgPrice" : 340.00
}, {
	"type" : "Bowie Knife",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 245.00,
	"avgPrice" : 226.02
}, {
	"type" : "Bowie Knife",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 140.99,
	"avgPrice" : 129.30
}, {
	"type" : "Bowie Knife",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 120.75,
	"avgPrice" : 111.58
}, {
	"type" : "Bowie Knife",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 109.53,
	"avgPrice" : 100.43
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 387.60,
	"avgPrice" : 437.50
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 225.00,
	"avgPrice" : 206.56
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 188.74,
	"avgPrice" : 164.89
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 211.88,
	"avgPrice" : 128.88
}, {
	"type" : "Bowie Knife",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 79.92,
	"avgPrice" : 80.07
}, {
	"type" : "Bowie Knife",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 71.91,
	"avgPrice" : 71.32
}, {
	"type" : "Bowie Knife",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 82.93,
	"avgPrice" : 69.30
}, {
	"type" : "Bowie Knife",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 73.04,
	"avgPrice" : 69.27
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 299.00,
	"avgPrice" : 475.00
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 150.00,
	"avgPrice" : 87.06
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 95.70,
	"avgPrice" : 92.03
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 101.11,
	"avgPrice" : 94.44
}, {
	"type" : "Bowie Knife",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 97.75,
	"avgPrice" : 91.87
}, {
	"type" : "Bowie Knife",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 76.93,
	"avgPrice" : 72.09
}, {
	"type" : "Bowie Knife",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 81.78,
	"avgPrice" : 72.10
}, {
	"type" : "Bowie Knife",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 67.82,
	"avgPrice" : 69.78
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 163.96,
	"avgPrice" : 243.75
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 92.61,
	"avgPrice" : 97.20
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 104.82,
	"avgPrice" : 80.31
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 95.00,
	"avgPrice" : 91.44
}, {
	"type" : "Bowie Knife",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 377.71,
	"avgPrice" : 421.25
}, {
	"type" : "Bowie Knife",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 327.75,
	"avgPrice" : 300.62
}, {
	"type" : "Bowie Knife",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 308.96,
	"avgPrice" : 281.99
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 797.50
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 404.19,
	"avgPrice" : 481.25
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 400.00,
	"avgPrice" : 365.00
}, {
	"type" : "Bowie Knife",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 210.08,
	"avgPrice" : 181.17
}, {
	"type" : "Bowie Knife",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 129.19,
	"avgPrice" : 124.66
}, {
	"type" : "Bowie Knife",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 112.36,
	"avgPrice" : 113.65
}, {
	"type" : "Bowie Knife",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 108.52,
	"avgPrice" : 110.99
}, {
	"type" : "Bowie Knife",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 106.90,
	"avgPrice" : 102.46
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 211.21,
	"avgPrice" : 182.89
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 166.86,
	"avgPrice" : 142.05
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 150.00,
	"avgPrice" : 121.51
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 126.50,
	"avgPrice" : 134.48
}, {
	"type" : "Bowie Knife",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 322.99,
	"avgPrice" : 1435.00
}, {
	"type" : "Bowie Knife",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 110.30,
	"avgPrice" : 105.74
}, {
	"type" : "Bowie Knife",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 78.16,
	"avgPrice" : 74.22
}, {
	"type" : "Bowie Knife",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 79.00,
	"avgPrice" : 77.23
}, {
	"type" : "Bowie Knife",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 84.48,
	"avgPrice" : 75.24
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 162.90,
	"avgPrice" : 165.61
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 108.56,
	"avgPrice" : 105.35
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1000.00
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 161.88,
	"avgPrice" : 117.38
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 94.32,
	"avgPrice" : 92.18
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 122.47,
	"avgPrice" : 96.01
}, {
	"type" : "Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 156.18,
	"avgPrice" : 90.70
}, {
	"name" : "Bayonet",
	"marketPrice" : 160.00,
	"avgPrice" : 158.34
}, {
	"name" : "Bayonet",
	"statTrak" : 1,
	"marketPrice" : 238.71,
	"avgPrice" : 216.04
}, {
	"name" : "Bowie Knife",
	"statTrak" : 1,
	"marketPrice" : 229.21,
	"avgPrice" : 214.83
}, {
	"type" : "Bowie Knife",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 292.57,
	"avgPrice" : 279.34
}, {
	"type" : "Bowie Knife",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 185.39,
	"avgPrice" : 166.12
}, {
	"type" : "Bowie Knife",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 158.40,
	"avgPrice" : 144.81
}, {
	"type" : "Bowie Knife",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 134.96,
	"avgPrice" : 131.61
}, {
	"type" : "Bowie Knife",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 151.66,
	"avgPrice" : 136.35
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 315.38,
	"avgPrice" : 272.86
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 232.56,
	"avgPrice" : 231.50
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 218.50,
	"avgPrice" : 226.10
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 216.01,
	"avgPrice" : 179.20
}, {
	"type" : "Bowie Knife",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 391.70,
	"avgPrice" : 191.15
}, {
	"type" : "Bowie Knife",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 113.42,
	"avgPrice" : 103.51
}, {
	"type" : "Bowie Knife",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 88.60,
	"avgPrice" : 82.65
}, {
	"type" : "Bowie Knife",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 84.25,
	"avgPrice" : 78.25
}, {
	"type" : "Bowie Knife",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 77.86,
	"avgPrice" : 71.89
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 172.52,
	"avgPrice" : 166.22
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 168.52,
	"avgPrice" : 116.50
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 120.15,
	"avgPrice" : 172.50
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 105.01,
	"avgPrice" : 91.65
}, {
	"type" : "Bowie Knife",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 400.00,
	"avgPrice" : 355.60
}, {
	"type" : "Bowie Knife",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 212.56,
	"avgPrice" : 203.77
}, {
	"type" : "Bowie Knife",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 164.00,
	"avgPrice" : 168.56
}, {
	"type" : "Bowie Knife",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 157.00,
	"avgPrice" : 146.65
}, {
	"type" : "Bowie Knife",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 146.06,
	"avgPrice" : 134.38
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 395.60,
	"avgPrice" : 546.25
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 349.41,
	"avgPrice" : 560.00
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 317.79,
	"avgPrice" : 321.03
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 247.98,
	"avgPrice" : 220.09
}, {
	"type" : "Bowie Knife",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 399.05,
	"avgPrice" : 718.75
}, {
	"type" : "Bowie Knife",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 207.85,
	"avgPrice" : 203.72
}, {
	"type" : "Bowie Knife",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 207.00,
	"avgPrice" : 180.33
}, {
	"type" : "Bowie Knife",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 127.22,
	"avgPrice" : 119.43
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 404.42,
	"avgPrice" : 388.75
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 230.00,
	"avgPrice" : 198.72
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 209.65,
	"avgPrice" : 210.00
}, {
	"type" : "Bowie Knife",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 400.00,
	"avgPrice" : 467.50
}, {
	"type" : "Bowie Knife",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 408.77,
	"avgPrice" : 441.25
}, {
	"type" : "Bowie Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 792.50
}, {
	"type" : "Bowie Knife",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 404.39,
	"avgPrice" : 432.50
}, {
	"type" : "Bowie Knife",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 112.36,
	"avgPrice" : 106.22
}, {
	"type" : "Bowie Knife",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 88.04,
	"avgPrice" : 83.51
}, {
	"type" : "Bowie Knife",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 90.16,
	"avgPrice" : 85.45
}, {
	"type" : "Bowie Knife",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 81.12,
	"avgPrice" : 77.12
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 878.75
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 163.21,
	"avgPrice" : 145.57
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 117.96,
	"avgPrice" : 111.95
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 119.76,
	"avgPrice" : 101.60
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 132.25,
	"avgPrice" : 98.16
}, {
	"type" : "Butterfly Knife",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 575.00
}, {
	"type" : "Butterfly Knife",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 192.12,
	"avgPrice" : 191.55
}, {
	"type" : "Butterfly Knife",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 117.76,
	"avgPrice" : 116.15
}, {
	"type" : "Butterfly Knife",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 118.42,
	"avgPrice" : 115.60
}, {
	"type" : "Butterfly Knife",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 99.91,
	"avgPrice" : 97.01
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 276.00,
	"avgPrice" : 292.98
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 175.00,
	"avgPrice" : 179.32
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 172.50,
	"avgPrice" : 157.99
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 119.10,
	"avgPrice" : 103.12
}, {
	"type" : "Butterfly Knife",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 153.91,
	"avgPrice" : 122.99
}, {
	"type" : "Butterfly Knife",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 92.80,
	"avgPrice" : 90.77
}, {
	"type" : "Butterfly Knife",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 82.99,
	"avgPrice" : 83.83
}, {
	"type" : "Butterfly Knife",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 94.37,
	"avgPrice" : 85.39
}, {
	"type" : "Butterfly Knife",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 86.51,
	"avgPrice" : 82.76
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 134.13,
	"avgPrice" : 129.08
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 105.81,
	"avgPrice" : 94.77
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 115.20,
	"avgPrice" : 90.59
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 105.80,
	"avgPrice" : 99.01
}, {
	"type" : "Butterfly Knife",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 200.00,
	"avgPrice" : 219.21
}, {
	"type" : "Butterfly Knife",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 113.63,
	"avgPrice" : 111.79
}, {
	"type" : "Butterfly Knife",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 96.44,
	"avgPrice" : 90.68
}, {
	"type" : "Butterfly Knife",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 98.75,
	"avgPrice" : 90.31
}, {
	"type" : "Butterfly Knife",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 89.25,
	"avgPrice" : 84.26
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 392.79,
	"avgPrice" : 697.50
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 150.00,
	"avgPrice" : 150.55
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 106.44,
	"avgPrice" : 116.42
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 129.19,
	"avgPrice" : 118.71
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 115.00,
	"avgPrice" : 91.73
}, {
	"type" : "Butterfly Knife",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 283.22,
	"avgPrice" : 283.61
}, {
	"type" : "Butterfly Knife",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 248.00,
	"avgPrice" : 244.05
}, {
	"type" : "Butterfly Knife",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 225.82,
	"avgPrice" : 214.26
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 537.50
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 370.00,
	"avgPrice" : 320.00
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 325.00,
	"avgPrice" : 311.64
}, {
	"type" : "Butterfly Knife",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 161.29,
	"avgPrice" : 150.55
}, {
	"type" : "Butterfly Knife",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 116.00,
	"avgPrice" : 115.98
}, {
	"type" : "Butterfly Knife",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 109.90,
	"avgPrice" : 107.02
}, {
	"type" : "Butterfly Knife",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 105.00,
	"avgPrice" : 106.21
}, {
	"type" : "Butterfly Knife",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 105.62,
	"avgPrice" : 105.05
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 335.07,
	"avgPrice" : 332.42
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 199.99,
	"avgPrice" : 150.93
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 153.65,
	"avgPrice" : 135.14
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 151.81,
	"avgPrice" : 132.86
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 115.00,
	"avgPrice" : 129.45
}, {
	"type" : "Butterfly Knife",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 253.19,
	"avgPrice" : 196.70
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.78,
	"avgPrice" : 0.81
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.48,
	"avgPrice" : 0.49
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.61,
	"avgPrice" : 0.62
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.19,
	"avgPrice" : 1.18
}, {
	"type" : "Desert Eagle",
	"name" : "Cobalt Disruption",
	"quality" : "Factory New",
	"marketPrice" : 5.65,
	"avgPrice" : 5.92
}, {
	"type" : "Desert Eagle",
	"name" : "Cobalt Disruption",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.40,
	"avgPrice" : 5.42
}, {
	"type" : "Desert Eagle",
	"name" : "Cobalt Disruption",
	"quality" : "Field-Tested",
	"marketPrice" : 6.45,
	"avgPrice" : 6.16
}, {
	"type" : "Desert Eagle",
	"name" : "Cobalt Disruption",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 35.65,
	"avgPrice" : 35.70
}, {
	"type" : "Desert Eagle",
	"name" : "Cobalt Disruption",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 25.50,
	"avgPrice" : 25.03
}, {
	"type" : "Desert Eagle",
	"name" : "Cobalt Disruption",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 24.40,
	"avgPrice" : 21.05
}, {
	"type" : "Desert Eagle",
	"name" : "Conspiracy",
	"quality" : "Factory New",
	"marketPrice" : 2.65,
	"avgPrice" : 2.69
}, {
	"type" : "Desert Eagle",
	"name" : "Conspiracy",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.08,
	"avgPrice" : 2.13
}, {
	"type" : "Desert Eagle",
	"name" : "Conspiracy",
	"quality" : "Field-Tested",
	"marketPrice" : 1.90,
	"avgPrice" : 1.98
}, {
	"type" : "Desert Eagle",
	"name" : "Conspiracy",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 15.55
}, {
	"type" : "Desert Eagle",
	"name" : "Conspiracy",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 9.98,
	"avgPrice" : 9.85
}, {
	"type" : "Desert Eagle",
	"name" : "Conspiracy",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.83,
	"avgPrice" : 7.54
}, {
	"type" : "Desert Eagle",
	"name" : "Corinthian",
	"quality" : "Factory New",
	"marketPrice" : 0.41,
	"avgPrice" : 0.43
}, {
	"type" : "Desert Eagle",
	"name" : "Corinthian",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.27,
	"avgPrice" : 0.28
}, {
	"type" : "Desert Eagle",
	"name" : "Corinthian",
	"quality" : "Field-Tested",
	"marketPrice" : 0.24,
	"avgPrice" : 0.23
}, {
	"type" : "Desert Eagle",
	"name" : "Corinthian",
	"quality" : "Well-Worn",
	"marketPrice" : 0.35,
	"avgPrice" : 0.33
}, {
	"type" : "Desert Eagle",
	"name" : "Corinthian",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.64,
	"avgPrice" : 3.42
}, {
	"type" : "Desert Eagle",
	"name" : "Corinthian",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.30,
	"avgPrice" : 2.32
}, {
	"type" : "Desert Eagle",
	"name" : "Corinthian",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.62,
	"avgPrice" : 1.77
}, {
	"type" : "Desert Eagle",
	"name" : "Corinthian",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.12,
	"avgPrice" : 2.15
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 30.21,
	"avgPrice" : 33.77
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.51,
	"avgPrice" : 4.48
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 0.96,
	"avgPrice" : 0.90
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 1.41,
	"avgPrice" : 1.36
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.92,
	"avgPrice" : 0.86
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 363.32
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 23.00,
	"avgPrice" : 23.03
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 5.48,
	"avgPrice" : 4.58
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.99,
	"avgPrice" : 5.90
}, {
	"type" : "Desert Eagle",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.62,
	"avgPrice" : 3.54
}, {
	"type" : "Desert Eagle",
	"name" : "Golden Koi",
	"quality" : "Factory New",
	"marketPrice" : 14.75,
	"avgPrice" : 14.13
}, {
	"type" : "Desert Eagle",
	"name" : "Golden Koi",
	"quality" : "Minimal Wear",
	"marketPrice" : 15.49,
	"avgPrice" : 14.12
}, {
	"type" : "Desert Eagle",
	"name" : "Golden Koi",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 128.37,
	"avgPrice" : 121.32
}, {
	"type" : "Desert Eagle",
	"name" : "Golden Koi",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 120.00,
	"avgPrice" : 92.55
}, {
	"type" : "Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Factory New",
	"marketPrice" : 28.31,
	"avgPrice" : 31.51
}, {
	"type" : "Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Minimal Wear",
	"marketPrice" : 30.47,
	"avgPrice" : 26.71
}, {
	"type" : "Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Field-Tested",
	"marketPrice" : 27.27,
	"avgPrice" : 24.72
}, {
	"type" : "Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Well-Worn",
	"marketPrice" : 28.42,
	"avgPrice" : 26.49
}, {
	"type" : "Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Battle-Scarred",
	"marketPrice" : 26.12,
	"avgPrice" : 24.31
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Factory New",
	"marketPrice" : 342.65,
	"avgPrice" : 227.60
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Minimal Wear",
	"marketPrice" : 89.86,
	"avgPrice" : 61.38
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Field-Tested",
	"marketPrice" : 42.35,
	"avgPrice" : 40.20
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Well-Worn",
	"marketPrice" : 50.00,
	"avgPrice" : 44.24
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Hand Cannon",
	"quality" : "Battle-Scarred",
	"marketPrice" : 44.94,
	"avgPrice" : 36.23
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Factory New",
	"marketPrice" : 4.63,
	"avgPrice" : 4.14
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.35,
	"avgPrice" : 1.31
}, {
	"type" : "Butterfly Knife",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 114.54,
	"avgPrice" : 116.79
}, {
	"type" : "Butterfly Knife",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 91.60,
	"avgPrice" : 89.65
}, {
	"type" : "Butterfly Knife",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 92.52,
	"avgPrice" : 87.32
}, {
	"type" : "Butterfly Knife",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 87.86,
	"avgPrice" : 87.70
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 170.00,
	"avgPrice" : 159.48
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 120.40,
	"avgPrice" : 122.93
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 141.45,
	"avgPrice" : 110.38
}, {
	"type" : "Butterfly Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 105.94,
	"avgPrice" : 100.88
}, {
	"name" : "Butterfly Knife",
	"marketPrice" : 133.70,
	"avgPrice" : 143.93
}, {
	"name" : "Butterfly Knife",
	"statTrak" : 1,
	"marketPrice" : 212.75,
	"avgPrice" : 202.90
}, {
	"type" : "CZ75-Auto",
	"name" : "Army Sheen",
	"quality" : "Factory New",
	"marketPrice" : 0.23,
	"avgPrice" : 0.24
}, {
	"type" : "CZ75-Auto",
	"name" : "Army Sheen",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.09,
	"avgPrice" : 0.08
}, {
	"type" : "CZ75-Auto",
	"name" : "Army Sheen",
	"quality" : "Field-Tested",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "CZ75-Auto",
	"name" : "Chalice",
	"quality" : "Factory New",
	"marketPrice" : 28.92,
	"avgPrice" : 26.72
}, {
	"type" : "CZ75-Auto",
	"name" : "Chalice",
	"quality" : "Minimal Wear",
	"marketPrice" : 26.53,
	"avgPrice" : 27.29
}, {
	"type" : "Souvenir CZ75-Auto",
	"name" : "Chalice",
	"quality" : "Factory New",
	"marketPrice" : 28.83,
	"avgPrice" : 31.85
}, {
	"type" : "Souvenir CZ75-Auto",
	"name" : "Chalice",
	"quality" : "Minimal Wear",
	"marketPrice" : 38.76,
	"avgPrice" : 34.11
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 11.50,
	"avgPrice" : 11.77
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.12,
	"avgPrice" : 1.09
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 0.35,
	"avgPrice" : 0.33
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 0.35,
	"avgPrice" : 0.47
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.32,
	"avgPrice" : 0.29
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 129.19,
	"avgPrice" : 96.05
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.84,
	"avgPrice" : 4.82
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.84,
	"avgPrice" : 0.97
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.31,
	"avgPrice" : 1.12
}, {
	"type" : "CZ75-Auto",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.00,
	"avgPrice" : 0.88
}, {
	"type" : "CZ75-Auto",
	"name" : "Emerald",
	"quality" : "Factory New",
	"marketPrice" : 2.14,
	"avgPrice" : 2.16
}, {
	"type" : "CZ75-Auto",
	"name" : "Emerald",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.51,
	"avgPrice" : 3.70
}, {
	"type" : "CZ75-Auto",
	"name" : "Green Plaid",
	"quality" : "Factory New",
	"marketPrice" : 1.72,
	"avgPrice" : 1.52
}, {
	"type" : "CZ75-Auto",
	"name" : "Green Plaid",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.37,
	"avgPrice" : 0.35
}, {
	"type" : "CZ75-Auto",
	"name" : "Green Plaid",
	"quality" : "Field-Tested",
	"marketPrice" : 0.30,
	"avgPrice" : 0.27
}, {
	"type" : "CZ75-Auto",
	"name" : "Green Plaid",
	"quality" : "Well-Worn",
	"marketPrice" : 0.66,
	"avgPrice" : 0.67
}, {
	"type" : "CZ75-Auto",
	"name" : "Green Plaid",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.45
}, {
	"type" : "CZ75-Auto",
	"name" : "Hexane",
	"quality" : "Factory New",
	"marketPrice" : 0.78,
	"avgPrice" : 0.81
}, {
	"type" : "CZ75-Auto",
	"name" : "Hexane",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.31,
	"avgPrice" : 0.32
}, {
	"type" : "CZ75-Auto",
	"name" : "Hexane",
	"quality" : "Field-Tested",
	"marketPrice" : 0.24,
	"avgPrice" : 0.23
}, {
	"type" : "CZ75-Auto",
	"name" : "Hexane",
	"quality" : "Well-Worn",
	"marketPrice" : 0.65,
	"avgPrice" : 0.72
}, {
	"type" : "CZ75-Auto",
	"name" : "Hexane",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.81,
	"avgPrice" : 4.66
}, {
	"type" : "Desert Eagle",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.84,
	"avgPrice" : 0.84
}, {
	"type" : "Desert Eagle",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 0.24,
	"avgPrice" : 0.23
}, {
	"type" : "Desert Eagle",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 0.41,
	"avgPrice" : 0.34
}, {
	"type" : "Desert Eagle",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.23,
	"avgPrice" : 0.22
}, {
	"type" : "Desert Eagle",
	"name" : "Pilot",
	"quality" : "Factory New",
	"marketPrice" : 39.39,
	"avgPrice" : 36.20
}, {
	"type" : "Desert Eagle",
	"name" : "Pilot",
	"quality" : "Minimal Wear",
	"marketPrice" : 16.00,
	"avgPrice" : 15.38
}, {
	"type" : "Desert Eagle",
	"name" : "Pilot",
	"quality" : "Field-Tested",
	"marketPrice" : 10.12,
	"avgPrice" : 10.22
}, {
	"type" : "Desert Eagle",
	"name" : "Pilot",
	"quality" : "Well-Worn",
	"marketPrice" : 9.10,
	"avgPrice" : 8.40
}, {
	"type" : "Desert Eagle",
	"name" : "Pilot",
	"quality" : "Battle-Scarred",
	"marketPrice" : 8.89,
	"avgPrice" : 8.33
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Factory New",
	"marketPrice" : 20.16,
	"avgPrice" : 18.38
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 15.09,
	"avgPrice" : 14.40
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 9.11,
	"avgPrice" : 8.42
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 10.88,
	"avgPrice" : 9.24
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 7.75,
	"avgPrice" : 7.17
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Factory New",
	"marketPrice" : 19.49,
	"avgPrice" : 18.70
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.96,
	"avgPrice" : 14.20
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 9.29,
	"avgPrice" : 8.46
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 9.00,
	"avgPrice" : 10.01
}, {
	"type" : "Desert Eagle",
	"name" : "Sunset Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 7.09,
	"avgPrice" : 6.81
}, {
	"type" : "Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 3.64,
	"avgPrice" : 3.34
}, {
	"type" : "Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.34,
	"avgPrice" : 0.37
}, {
	"type" : "Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.21,
	"avgPrice" : 0.20
}, {
	"type" : "Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 0.20,
	"avgPrice" : 0.19
}, {
	"type" : "Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 120.00,
	"avgPrice" : 111.93
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 11.40,
	"avgPrice" : 9.92
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 4.34,
	"avgPrice" : 4.15
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 5.29,
	"avgPrice" : 4.80
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.55,
	"avgPrice" : 4.24
}, {
	"type" : "Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Factory New",
	"marketPrice" : 0.26,
	"avgPrice" : 0.23
}, {
	"type" : "Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Well-Worn",
	"marketPrice" : 0.35,
	"avgPrice" : 0.34
}, {
	"type" : "Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.16,
	"avgPrice" : 0.15
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Factory New",
	"marketPrice" : 23.00,
	"avgPrice" : 16.36
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Minimal Wear",
	"marketPrice" : 9.60,
	"avgPrice" : 6.80
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Field-Tested",
	"marketPrice" : 5.26,
	"avgPrice" : 4.93
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Well-Worn",
	"marketPrice" : 6.32,
	"avgPrice" : 5.87
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Urban Rubble",
	"quality" : "Battle-Scarred",
	"marketPrice" : 8.12,
	"avgPrice" : 9.29
}, {
	"type" : "Dual Berettas",
	"name" : "Anodized Navy",
	"quality" : "Factory New",
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "Dual Berettas",
	"name" : "Anodized Navy",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.08,
	"avgPrice" : 1.01
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Anodized Navy",
	"quality" : "Factory New",
	"marketPrice" : 2.42,
	"avgPrice" : 2.35
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Anodized Navy",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.41,
	"avgPrice" : 6.78
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Factory New",
	"marketPrice" : 5.23,
	"avgPrice" : 4.45
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.85,
	"avgPrice" : 0.94
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Field-Tested",
	"marketPrice" : 0.70,
	"avgPrice" : 0.69
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Well-Worn",
	"marketPrice" : 0.69,
	"avgPrice" : 0.77
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.75,
	"avgPrice" : 0.70
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 49.45,
	"avgPrice" : 33.54
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.58,
	"avgPrice" : 2.37
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.80,
	"avgPrice" : 1.60
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.90,
	"avgPrice" : 1.80
}, {
	"type" : "Dual Berettas",
	"name" : "Black Limba",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.92,
	"avgPrice" : 1.51
}, {
	"type" : "Dual Berettas",
	"name" : "Briar",
	"quality" : "Factory New",
	"marketPrice" : 0.23,
	"avgPrice" : 0.23
}, {
	"type" : "Dual Berettas",
	"name" : "Briar",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.09,
	"avgPrice" : 0.09
}, {
	"type" : "Dual Berettas",
	"name" : "Briar",
	"quality" : "Field-Tested",
	"marketPrice" : 0.07,
	"avgPrice" : 0.06
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Briar",
	"quality" : "Factory New",
	"marketPrice" : 0.70,
	"avgPrice" : 0.57
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Briar",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.54,
	"avgPrice" : 0.38
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Briar",
	"quality" : "Field-Tested",
	"marketPrice" : 0.40,
	"avgPrice" : 0.38
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Factory New",
	"marketPrice" : 0.31,
	"avgPrice" : 0.29
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.19,
	"avgPrice" : 2.10
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.58,
	"avgPrice" : 0.57
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.35,
	"avgPrice" : 0.31
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "Dual Berettas",
	"name" : "Cartel",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.30,
	"avgPrice" : 0.29
}, {
	"type" : "Dual Berettas",
	"name" : "Cobalt Quartz",
	"quality" : "Factory New",
	"marketPrice" : 0.29,
	"avgPrice" : 0.31
}, {
	"type" : "Dual Berettas",
	"name" : "Cobalt Quartz",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "Dual Berettas",
	"name" : "Cobalt Quartz",
	"quality" : "Field-Tested",
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "Dual Berettas",
	"name" : "Cobalt Quartz",
	"quality" : "Well-Worn",
	"marketPrice" : 0.43,
	"avgPrice" : 0.45
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Cobalt Quartz",
	"quality" : "Factory New",
	"marketPrice" : 351.23,
	"avgPrice" : 240.91
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Cobalt Quartz",
	"quality" : "Minimal Wear",
	"marketPrice" : 98.00,
	"avgPrice" : 47.12
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Cobalt Quartz",
	"quality" : "Field-Tested",
	"marketPrice" : 45.00,
	"avgPrice" : 54.39
}, {
	"type" : "Dual Berettas",
	"name" : "Colony",
	"quality" : "Factory New",
	"marketPrice" : 0.15,
	"avgPrice" : 0.14
}, {
	"type" : "Dual Berettas",
	"name" : "Colony",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Dual Berettas",
	"name" : "Colony",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Dual Berettas",
	"name" : "Colony",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Dual Berettas",
	"name" : "Colony",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Colony",
	"quality" : "Factory New",
	"marketPrice" : 19.11,
	"avgPrice" : 19.36
}, {
	"type" : "CZ75-Auto",
	"name" : "Hexane",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.08,
	"avgPrice" : 1.18
}, {
	"type" : "CZ75-Auto",
	"name" : "Hexane",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.64,
	"avgPrice" : 0.60
}, {
	"type" : "CZ75-Auto",
	"name" : "Hexane",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.07,
	"avgPrice" : 1.11
}, {
	"type" : "CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Factory New",
	"marketPrice" : 24.12,
	"avgPrice" : 19.59
}, {
	"type" : "CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.00,
	"avgPrice" : 2.85
}, {
	"type" : "CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Field-Tested",
	"marketPrice" : 1.88,
	"avgPrice" : 1.79
}, {
	"type" : "CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Well-Worn",
	"marketPrice" : 1.76,
	"avgPrice" : 1.65
}, {
	"type" : "CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.66,
	"avgPrice" : 1.55
}, {
	"type" : "Souvenir CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 81.39
}, {
	"type" : "Souvenir CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Minimal Wear",
	"marketPrice" : 17.94,
	"avgPrice" : 18.22
}, {
	"type" : "Souvenir CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Field-Tested",
	"marketPrice" : 6.73,
	"avgPrice" : 6.55
}, {
	"type" : "Souvenir CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Well-Worn",
	"marketPrice" : 6.18,
	"avgPrice" : 8.56
}, {
	"type" : "Souvenir CZ75-Auto",
	"name" : "Nitro",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.18,
	"avgPrice" : 5.10
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Factory New",
	"marketPrice" : 2.25,
	"avgPrice" : 2.13
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.95,
	"avgPrice" : 1.04
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Field-Tested",
	"marketPrice" : 0.53,
	"avgPrice" : 0.55
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Well-Worn",
	"marketPrice" : 2.04,
	"avgPrice" : 1.95
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.24,
	"avgPrice" : 0.76
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 7.75,
	"avgPrice" : 8.85
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.08,
	"avgPrice" : 3.33
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.09,
	"avgPrice" : 1.23
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.27,
	"avgPrice" : 2.20
}, {
	"type" : "CZ75-Auto",
	"name" : "Poison Dart",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.87,
	"avgPrice" : 1.26
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Factory New",
	"marketPrice" : 0.54,
	"avgPrice" : 0.59
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.34,
	"avgPrice" : 0.34
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Field-Tested",
	"marketPrice" : 0.30,
	"avgPrice" : 0.29
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Well-Worn",
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.10,
	"avgPrice" : 3.02
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.53,
	"avgPrice" : 1.50
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.75,
	"avgPrice" : 0.72
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.01,
	"avgPrice" : 0.98
}, {
	"type" : "CZ75-Auto",
	"name" : "Pole Position",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.78,
	"avgPrice" : 0.73
}, {
	"type" : "CZ75-Auto",
	"name" : "The Fuschia Is Now",
	"quality" : "Factory New",
	"marketPrice" : 4.68,
	"avgPrice" : 4.49
}, {
	"type" : "CZ75-Auto",
	"name" : "The Fuschia Is Now",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.19,
	"avgPrice" : 3.27
}, {
	"type" : "CZ75-Auto",
	"name" : "The Fuschia Is Now",
	"quality" : "Field-Tested",
	"marketPrice" : 3.13,
	"avgPrice" : 2.70
}, {
	"type" : "CZ75-Auto",
	"name" : "The Fuschia Is Now",
	"quality" : "Well-Worn",
	"marketPrice" : 21.35,
	"avgPrice" : 9.45
}, {
	"type" : "CZ75-Auto",
	"name" : "The Fuschia Is Now",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 27.83,
	"avgPrice" : 28.77
}, {
	"type" : "CZ75-Auto",
	"name" : "The Fuschia Is Now",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 15.80,
	"avgPrice" : 15.51
}, {
	"type" : "CZ75-Auto",
	"name" : "The Fuschia Is Now",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 9.29,
	"avgPrice" : 9.71
}, {
	"type" : "CZ75-Auto",
	"name" : "The Fuschia Is Now",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 30.37,
	"avgPrice" : 11.90
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Factory New",
	"marketPrice" : 1.07,
	"avgPrice" : 1.07
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.39,
	"avgPrice" : 0.40
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Field-Tested",
	"marketPrice" : 0.30,
	"avgPrice" : 0.31
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Well-Worn",
	"marketPrice" : 0.30,
	"avgPrice" : 0.31
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.32,
	"avgPrice" : 0.30
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.15,
	"avgPrice" : 5.96
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.68,
	"avgPrice" : 1.77
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.10,
	"avgPrice" : 1.08
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.97,
	"avgPrice" : 0.92
}, {
	"type" : "Dual Berettas",
	"name" : "Moon in Libra",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.17
}, {
	"type" : "Dual Berettas",
	"name" : "Moon in Libra",
	"quality" : "Well-Worn",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "Dual Berettas",
	"name" : "Moon in Libra",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.16,
	"avgPrice" : 0.17
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Factory New",
	"marketPrice" : 1.11,
	"avgPrice" : 1.06
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.43,
	"avgPrice" : 0.47
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.21
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Well-Worn",
	"marketPrice" : 0.77,
	"avgPrice" : 0.69
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.43,
	"avgPrice" : 0.53
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.37,
	"avgPrice" : 5.46
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.10,
	"avgPrice" : 2.31
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.76,
	"avgPrice" : 0.74
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.52,
	"avgPrice" : 1.31
}, {
	"type" : "Dual Berettas",
	"name" : "Panther",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.15,
	"avgPrice" : 0.98
}, {
	"type" : "Dual Berettas",
	"name" : "Retribution",
	"quality" : "Factory New",
	"marketPrice" : 1.09,
	"avgPrice" : 0.97
}, {
	"type" : "Dual Berettas",
	"name" : "Retribution",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.65,
	"avgPrice" : 0.63
}, {
	"type" : "Dual Berettas",
	"name" : "Retribution",
	"quality" : "Field-Tested",
	"marketPrice" : 0.66,
	"avgPrice" : 0.71
}, {
	"type" : "Dual Berettas",
	"name" : "Retribution",
	"quality" : "Well-Worn",
	"marketPrice" : 27.32,
	"avgPrice" : 123.60
}, {
	"type" : "Dual Berettas",
	"name" : "Retribution",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.53,
	"avgPrice" : 2.39
}, {
	"type" : "Dual Berettas",
	"name" : "Retribution",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.27,
	"avgPrice" : 1.19
}, {
	"type" : "Dual Berettas",
	"name" : "Retribution",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.81,
	"avgPrice" : 0.77
}, {
	"type" : "Dual Berettas",
	"name" : "Retribution",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 11.22,
	"avgPrice" : 8.54
}, {
	"type" : "Dual Berettas",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 0.19,
	"avgPrice" : 0.17
}, {
	"type" : "Dual Berettas",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Dual Berettas",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Dual Berettas",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Dual Berettas",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 129.19,
	"avgPrice" : 82.69
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 100.00,
	"avgPrice" : 7.81
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 8.74,
	"avgPrice" : 4.09
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 5.25,
	"avgPrice" : 4.31
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 16.85,
	"avgPrice" : 8.46
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Factory New",
	"marketPrice" : 0.72,
	"avgPrice" : 0.74
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.47,
	"avgPrice" : 0.47
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Field-Tested",
	"marketPrice" : 0.37,
	"avgPrice" : 0.37
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Well-Worn",
	"marketPrice" : 0.61,
	"avgPrice" : 0.56
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.70,
	"avgPrice" : 0.69
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.49,
	"avgPrice" : 3.20
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.20,
	"avgPrice" : 2.10
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.33,
	"avgPrice" : 1.30
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.47,
	"avgPrice" : 1.35
}, {
	"type" : "Dual Berettas",
	"name" : "Urban Shock",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.39,
	"avgPrice" : 2.41
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Colony",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.64,
	"avgPrice" : 0.53
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Colony",
	"quality" : "Field-Tested",
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Colony",
	"quality" : "Well-Worn",
	"marketPrice" : 0.47,
	"avgPrice" : 0.42
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Colony",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.39
}, {
	"type" : "Dual Berettas",
	"name" : "Contractor",
	"quality" : "Factory New",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "Dual Berettas",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Dual Berettas",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Dual Berettas",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Dual Berettas",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Contractor",
	"quality" : "Factory New",
	"marketPrice" : 30.36,
	"avgPrice" : 21.06
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.69,
	"avgPrice" : 2.46
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 1.16,
	"avgPrice" : 1.12
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 1.69,
	"avgPrice" : 1.47
}, {
	"type" : "Souvenir Dual Berettas",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.40,
	"avgPrice" : 2.03
}, {
	"type" : "Dual Berettas",
	"name" : "Demolition",
	"quality" : "Field-Tested",
	"marketPrice" : 2.07,
	"avgPrice" : 1.71
}, {
	"type" : "Dual Berettas",
	"name" : "Demolition",
	"quality" : "Well-Worn",
	"marketPrice" : 1.17,
	"avgPrice" : 1.16
}, {
	"type" : "Dual Berettas",
	"name" : "Demolition",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.91,
	"avgPrice" : 1.51
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Factory New",
	"marketPrice" : 0.69,
	"avgPrice" : 0.73
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.79,
	"avgPrice" : 4.59
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.88,
	"avgPrice" : 0.82
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.49,
	"avgPrice" : 0.45
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.38,
	"avgPrice" : 0.37
}, {
	"type" : "Dual Berettas",
	"name" : "Dualing Dragons",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.39,
	"avgPrice" : 0.37
}, {
	"type" : "Dual Berettas",
	"name" : "Duelist",
	"quality" : "Factory New",
	"marketPrice" : 18.77,
	"avgPrice" : 19.88
}, {
	"type" : "Dual Berettas",
	"name" : "Duelist",
	"quality" : "Minimal Wear",
	"marketPrice" : 12.35,
	"avgPrice" : 11.04
}, {
	"type" : "Dual Berettas",
	"name" : "Duelist",
	"quality" : "Field-Tested",
	"marketPrice" : 10.32,
	"avgPrice" : 8.50
}, {
	"type" : "Dual Berettas",
	"name" : "Duelist",
	"quality" : "Well-Worn",
	"marketPrice" : 10.29,
	"avgPrice" : 8.56
}, {
	"type" : "Dual Berettas",
	"name" : "Duelist",
	"quality" : "Battle-Scarred",
	"marketPrice" : 9.16,
	"avgPrice" : 8.07
}, {
	"type" : "Dual Berettas",
	"name" : "Hemoglobin",
	"quality" : "Factory New",
	"marketPrice" : 1.11,
	"avgPrice" : 1.19
}, {
	"type" : "Dual Berettas",
	"name" : "Hemoglobin",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.17,
	"avgPrice" : 1.12
}, {
	"type" : "Dual Berettas",
	"name" : "Hemoglobin",
	"quality" : "Field-Tested",
	"marketPrice" : 1.18,
	"avgPrice" : 1.12
}, {
	"type" : "Dual Berettas",
	"name" : "Hemoglobin",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.61,
	"avgPrice" : 5.37
}, {
	"type" : "Dual Berettas",
	"name" : "Hemoglobin",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.53,
	"avgPrice" : 3.92
}, {
	"type" : "Dual Berettas",
	"name" : "Hemoglobin",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 4.06,
	"avgPrice" : 3.58
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Factory New",
	"marketPrice" : 5.49,
	"avgPrice" : 4.94
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.28,
	"avgPrice" : 1.30
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Field-Tested",
	"marketPrice" : 1.18,
	"avgPrice" : 1.05
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Well-Worn",
	"marketPrice" : 1.69,
	"avgPrice" : 1.35
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.58,
	"avgPrice" : 4.90
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 24.24,
	"avgPrice" : 23.34
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.30,
	"avgPrice" : 4.14
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.35,
	"avgPrice" : 2.82
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.27,
	"avgPrice" : 2.96
}, {
	"type" : "Dual Berettas",
	"name" : "Marina",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 4.52,
	"avgPrice" : 4.29
}, {
	"type" : "Dual Berettas",
	"name" : "Moon in Libra",
	"quality" : "Factory New",
	"marketPrice" : 0.31,
	"avgPrice" : 0.28
}, {
	"type" : "Dual Berettas",
	"name" : "Moon in Libra",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.23,
	"avgPrice" : 0.22
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Field-Tested",
	"marketPrice" : 0.80,
	"avgPrice" : 0.77
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Well-Worn",
	"marketPrice" : 1.78,
	"avgPrice" : 1.71
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.23,
	"avgPrice" : 1.21
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 41.55,
	"avgPrice" : 39.83
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 8.90,
	"avgPrice" : 8.94
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 5.23,
	"avgPrice" : 5.22
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 10.30,
	"avgPrice" : 10.38
}, {
	"type" : "Desert Eagle",
	"name" : "Heirloom",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 4.79,
	"avgPrice" : 4.91
}, {
	"type" : "Desert Eagle",
	"name" : "Hypnotic",
	"quality" : "Factory New",
	"marketPrice" : 7.96,
	"avgPrice" : 8.21
}, {
	"type" : "Desert Eagle",
	"name" : "Hypnotic",
	"quality" : "Minimal Wear",
	"marketPrice" : 12.65,
	"avgPrice" : 11.37
}, {
	"type" : "Desert Eagle",
	"name" : "Hypnotic",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 35.95,
	"avgPrice" : 33.21
}, {
	"type" : "Desert Eagle",
	"name" : "Hypnotic",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 78.98,
	"avgPrice" : 77.02
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Factory New",
	"marketPrice" : 13.26,
	"avgPrice" : 13.98
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.15,
	"avgPrice" : 7.54
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Field-Tested",
	"marketPrice" : 5.21,
	"avgPrice" : 5.08
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Well-Worn",
	"marketPrice" : 5.17,
	"avgPrice" : 5.76
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.85,
	"avgPrice" : 4.15
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 65.00,
	"avgPrice" : 65.37
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 33.60,
	"avgPrice" : 34.52
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 20.75,
	"avgPrice" : 21.74
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 44.94,
	"avgPrice" : 27.79
}, {
	"type" : "Desert Eagle",
	"name" : "Kumicho Dragon",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 19.32,
	"avgPrice" : 18.98
}, {
	"type" : "Desert Eagle",
	"name" : "Meteorite",
	"quality" : "Factory New",
	"marketPrice" : 0.43,
	"avgPrice" : 0.41
}, {
	"type" : "Desert Eagle",
	"name" : "Meteorite",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.30,
	"avgPrice" : 0.30
}, {
	"type" : "Desert Eagle",
	"name" : "Meteorite",
	"quality" : "Field-Tested",
	"marketPrice" : 0.32,
	"avgPrice" : 0.28
}, {
	"type" : "Desert Eagle",
	"name" : "Midnight Storm",
	"quality" : "Factory New",
	"marketPrice" : 3.68,
	"avgPrice" : 3.68
}, {
	"type" : "Desert Eagle",
	"name" : "Midnight Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.65,
	"avgPrice" : 1.79
}, {
	"type" : "Desert Eagle",
	"name" : "Midnight Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.34,
	"avgPrice" : 0.33
}, {
	"type" : "Desert Eagle",
	"name" : "Midnight Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 1.16,
	"avgPrice" : 1.10
}, {
	"type" : "Desert Eagle",
	"name" : "Midnight Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.30,
	"avgPrice" : 0.30
}, {
	"type" : "Desert Eagle",
	"name" : "Mudder",
	"quality" : "Factory New",
	"marketPrice" : 0.87,
	"avgPrice" : 0.95
}, {
	"type" : "Desert Eagle",
	"name" : "Mudder",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "Desert Eagle",
	"name" : "Mudder",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Desert Eagle",
	"name" : "Mudder",
	"quality" : "Well-Worn",
	"marketPrice" : 0.07,
	"avgPrice" : 0.06
}, {
	"type" : "Desert Eagle",
	"name" : "Mudder",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Mudder",
	"quality" : "Minimal Wear",
	"marketPrice" : 13.37,
	"avgPrice" : 13.79
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Mudder",
	"quality" : "Field-Tested",
	"marketPrice" : 10.37,
	"avgPrice" : 7.77
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Mudder",
	"quality" : "Well-Worn",
	"marketPrice" : 9.27,
	"avgPrice" : 7.76
}, {
	"type" : "Souvenir Desert Eagle",
	"name" : "Mudder",
	"quality" : "Battle-Scarred",
	"marketPrice" : 12.28,
	"avgPrice" : 11.28
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Factory New",
	"marketPrice" : 1.86,
	"avgPrice" : 1.72
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.54,
	"avgPrice" : 0.55
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Field-Tested",
	"marketPrice" : 0.38,
	"avgPrice" : 0.38
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Well-Worn",
	"marketPrice" : 0.38,
	"avgPrice" : 0.39
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.38
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 10.78,
	"avgPrice" : 8.46
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.91,
	"avgPrice" : 2.98
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.69,
	"avgPrice" : 1.81
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.74,
	"avgPrice" : 1.75
}, {
	"type" : "Desert Eagle",
	"name" : "Naga",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.69,
	"avgPrice" : 1.77
}, {
	"type" : "Desert Eagle",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 11.19,
	"avgPrice" : 11.47
}, {
	"type" : "Falchion Knife",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 46.98,
	"avgPrice" : 52.03
}, {
	"type" : "Falchion Knife",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 54.21,
	"avgPrice" : 51.52
}, {
	"type" : "Falchion Knife",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 56.59,
	"avgPrice" : 50.74
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 115.00,
	"avgPrice" : 98.11
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 71.91,
	"avgPrice" : 71.33
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 89.14,
	"avgPrice" : 65.33
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 116.28,
	"avgPrice" : 64.93
}, {
	"type" : "Falchion Knife",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 146.06,
	"avgPrice" : 149.06
}, {
	"type" : "Falchion Knife",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 133.07,
	"avgPrice" : 124.99
}, {
	"type" : "Falchion Knife",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 118.98,
	"avgPrice" : 113.26
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 258.40,
	"avgPrice" : 225.84
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 202.23,
	"avgPrice" : 188.42
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 306.33,
	"avgPrice" : 156.24
}, {
	"type" : "Falchion Knife",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 92.12,
	"avgPrice" : 90.78
}, {
	"type" : "Falchion Knife",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 62.92,
	"avgPrice" : 62.23
}, {
	"type" : "Falchion Knife",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 60.56,
	"avgPrice" : 58.00
}, {
	"type" : "Falchion Knife",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 59.20,
	"avgPrice" : 56.79
}, {
	"type" : "Falchion Knife",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 60.60,
	"avgPrice" : 56.23
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 409.53,
	"avgPrice" : 149.17
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 106.76,
	"avgPrice" : 95.53
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 78.81,
	"avgPrice" : 77.86
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 86.56,
	"avgPrice" : 72.13
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 132.99,
	"avgPrice" : 67.59
}, {
	"type" : "Falchion Knife",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 114.89,
	"avgPrice" : 92.36
}, {
	"type" : "Falchion Knife",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 64.82,
	"avgPrice" : 58.81
}, {
	"type" : "Falchion Knife",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 53.86,
	"avgPrice" : 50.94
}, {
	"type" : "Falchion Knife",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 53.70,
	"avgPrice" : 51.07
}, {
	"type" : "Falchion Knife",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 53.25,
	"avgPrice" : 50.53
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 94.13,
	"avgPrice" : 100.75
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 72.37,
	"avgPrice" : 68.99
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 90.00,
	"avgPrice" : 70.80
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 78.20,
	"avgPrice" : 66.92
}, {
	"name" : "Falchion Knife",
	"marketPrice" : 73.39,
	"avgPrice" : 70.99
}, {
	"name" : "Falchion Knife",
	"statTrak" : 1,
	"marketPrice" : 94.30,
	"avgPrice" : 100.25
}, {
	"type" : "FAMAS",
	"name" : "Afterimage",
	"quality" : "Factory New",
	"marketPrice" : 4.42,
	"avgPrice" : 4.73
}, {
	"type" : "FAMAS",
	"name" : "Afterimage",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.00,
	"avgPrice" : 2.92
}, {
	"type" : "FAMAS",
	"name" : "Afterimage",
	"quality" : "Field-Tested",
	"marketPrice" : 3.04,
	"avgPrice" : 2.63
}, {
	"type" : "FAMAS",
	"name" : "Afterimage",
	"quality" : "Well-Worn",
	"marketPrice" : 3.79,
	"avgPrice" : 3.48
}, {
	"type" : "FAMAS",
	"name" : "Afterimage",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 22.45,
	"avgPrice" : 23.64
}, {
	"type" : "FAMAS",
	"name" : "Afterimage",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 9.40,
	"avgPrice" : 9.36
}, {
	"type" : "FAMAS",
	"name" : "Afterimage",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 6.18,
	"avgPrice" : 6.27
}, {
	"type" : "FAMAS",
	"name" : "Afterimage",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 21.99,
	"avgPrice" : 15.97
}, {
	"type" : "FAMAS",
	"name" : "Colony",
	"quality" : "Factory New",
	"marketPrice" : 0.19,
	"avgPrice" : 0.18
}, {
	"type" : "FAMAS",
	"name" : "Colony",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "FAMAS",
	"name" : "Colony",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "FAMAS",
	"name" : "Colony",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "FAMAS",
	"name" : "Colony",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Colony",
	"quality" : "Factory New",
	"marketPrice" : 180.15,
	"avgPrice" : 75.94
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Colony",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.37,
	"avgPrice" : 2.98
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Colony",
	"quality" : "Field-Tested",
	"marketPrice" : 1.47,
	"avgPrice" : 2.00
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Colony",
	"quality" : "Well-Worn",
	"marketPrice" : 1.54,
	"avgPrice" : 1.45
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Colony",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.54,
	"avgPrice" : 1.31
}, {
	"type" : "FAMAS",
	"name" : "Contrast Spray",
	"quality" : "Factory New",
	"marketPrice" : 8.81,
	"avgPrice" : 7.59
}, {
	"type" : "FAMAS",
	"name" : "Contrast Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.87,
	"avgPrice" : 0.91
}, {
	"type" : "FAMAS",
	"name" : "Contrast Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.63,
	"avgPrice" : 0.89
}, {
	"type" : "FAMAS",
	"name" : "Contrast Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 1.12,
	"avgPrice" : 4.52
}, {
	"type" : "FAMAS",
	"name" : "Contrast Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.91,
	"avgPrice" : 1.85
}, {
	"type" : "FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Factory New",
	"marketPrice" : 0.89,
	"avgPrice" : 0.95
}, {
	"type" : "FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Minimal Wear",
	"marketPrice" : 16.28,
	"avgPrice" : 13.77
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Field-Tested",
	"marketPrice" : 5.49,
	"avgPrice" : 5.23
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Well-Worn",
	"marketPrice" : 5.68,
	"avgPrice" : 4.84
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Cyanospatter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 29.18,
	"avgPrice" : 5.48
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Factory New",
	"marketPrice" : 5.01,
	"avgPrice" : 4.96
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.04,
	"avgPrice" : 2.05
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Field-Tested",
	"marketPrice" : 1.28,
	"avgPrice" : 1.39
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Well-Worn",
	"marketPrice" : 1.41,
	"avgPrice" : 1.33
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.33,
	"avgPrice" : 1.34
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 30.36,
	"avgPrice" : 27.34
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 6.33,
	"avgPrice" : 6.36
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.49,
	"avgPrice" : 3.81
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.69,
	"avgPrice" : 3.38
}, {
	"type" : "FAMAS",
	"name" : "Djinn",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 4.51,
	"avgPrice" : 3.40
}, {
	"type" : "FAMAS",
	"name" : "Doomkitty",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.59,
	"avgPrice" : 0.64
}, {
	"type" : "FAMAS",
	"name" : "Doomkitty",
	"quality" : "Field-Tested",
	"marketPrice" : 0.72,
	"avgPrice" : 0.71
}, {
	"type" : "FAMAS",
	"name" : "Doomkitty",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.35,
	"avgPrice" : 1.44
}, {
	"type" : "FAMAS",
	"name" : "Doomkitty",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.30,
	"avgPrice" : 1.34
}, {
	"type" : "FAMAS",
	"name" : "Hexane",
	"quality" : "Factory New",
	"marketPrice" : 1.15,
	"avgPrice" : 1.37
}, {
	"type" : "FAMAS",
	"name" : "Hexane",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.97,
	"avgPrice" : 1.08
}, {
	"type" : "FAMAS",
	"name" : "Hexane",
	"quality" : "Field-Tested",
	"marketPrice" : 0.86,
	"avgPrice" : 0.86
}, {
	"type" : "FAMAS",
	"name" : "Hexane",
	"quality" : "Well-Worn",
	"marketPrice" : 1.11,
	"avgPrice" : 1.17
}, {
	"type" : "FAMAS",
	"name" : "Hexane",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.52,
	"avgPrice" : 4.11
}, {
	"type" : "FAMAS",
	"name" : "Hexane",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.54,
	"avgPrice" : 2.76
}, {
	"type" : "FAMAS",
	"name" : "Hexane",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.54,
	"avgPrice" : 1.67
}, {
	"type" : "FAMAS",
	"name" : "Hexane",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.25,
	"avgPrice" : 2.28
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Factory New",
	"marketPrice" : 0.66,
	"avgPrice" : 0.68
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.43,
	"avgPrice" : 0.42
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Field-Tested",
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Well-Worn",
	"marketPrice" : 0.55,
	"avgPrice" : 0.51
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.96,
	"avgPrice" : 2.94
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.74,
	"avgPrice" : 1.59
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.93,
	"avgPrice" : 0.91
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.94,
	"avgPrice" : 0.97
}, {
	"type" : "FAMAS",
	"name" : "Neural Net",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.89,
	"avgPrice" : 0.85
}, {
	"type" : "FAMAS",
	"name" : "Pulse",
	"quality" : "Factory New",
	"marketPrice" : 1.76,
	"avgPrice" : 1.68
}, {
	"type" : "FAMAS",
	"name" : "Pulse",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.24,
	"avgPrice" : 1.30
}, {
	"type" : "Falchion Knife",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 89.89,
	"avgPrice" : 80.13
}, {
	"type" : "Falchion Knife",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 76.62,
	"avgPrice" : 76.91
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 406.79,
	"avgPrice" : 416.25
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 192.52,
	"avgPrice" : 149.47
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 129.19,
	"avgPrice" : 132.92
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 134.21,
	"avgPrice" : 116.62
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 128.00,
	"avgPrice" : 94.21
}, {
	"type" : "Falchion Knife",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 391.27
}, {
	"type" : "Falchion Knife",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 148.58,
	"avgPrice" : 160.22
}, {
	"type" : "Falchion Knife",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 90.44,
	"avgPrice" : 90.65
}, {
	"type" : "Falchion Knife",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 98.98,
	"avgPrice" : 88.75
}, {
	"type" : "Falchion Knife",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 68.55,
	"avgPrice" : 65.36
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 330.00,
	"avgPrice" : 273.19
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 137.33,
	"avgPrice" : 126.17
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 130.00,
	"avgPrice" : 110.78
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 109.64,
	"avgPrice" : 89.92
}, {
	"type" : "Falchion Knife",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 132.29,
	"avgPrice" : 139.36
}, {
	"type" : "Falchion Knife",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 159.54,
	"avgPrice" : 149.98
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 215.00,
	"avgPrice" : 202.51
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 395.46,
	"avgPrice" : 245.00
}, {
	"type" : "Falchion Knife",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 387.92,
	"avgPrice" : 123.80
}, {
	"type" : "Falchion Knife",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 63.49,
	"avgPrice" : 58.60
}, {
	"type" : "Falchion Knife",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 51.61,
	"avgPrice" : 51.18
}, {
	"type" : "Falchion Knife",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 56.23,
	"avgPrice" : 52.24
}, {
	"type" : "Falchion Knife",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 48.58,
	"avgPrice" : 49.32
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 500.00
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 81.38,
	"avgPrice" : 81.98
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 84.54,
	"avgPrice" : 74.84
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 75.18,
	"avgPrice" : 65.52
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 75.27,
	"avgPrice" : 67.38
}, {
	"type" : "Falchion Knife",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 406.30,
	"avgPrice" : 347.12
}, {
	"type" : "Falchion Knife",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 96.63,
	"avgPrice" : 97.29
}, {
	"type" : "Falchion Knife",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 67.36,
	"avgPrice" : 66.72
}, {
	"type" : "Falchion Knife",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 69.99,
	"avgPrice" : 68.19
}, {
	"type" : "Falchion Knife",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 58.01,
	"avgPrice" : 54.37
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 151.83,
	"avgPrice" : 144.83
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 99.97,
	"avgPrice" : 92.97
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 263.49,
	"avgPrice" : 99.00
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 95.50,
	"avgPrice" : 83.47
}, {
	"type" : "Falchion Knife",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 135.65,
	"avgPrice" : 253.75
}, {
	"type" : "Falchion Knife",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 54.90,
	"avgPrice" : 53.27
}, {
	"type" : "Falchion Knife",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 50.78,
	"avgPrice" : 49.47
}, {
	"type" : "Falchion Knife",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 51.67,
	"avgPrice" : 49.14
}, {
	"type" : "Falchion Knife",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 50.00,
	"avgPrice" : 49.41
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 79.51,
	"avgPrice" : 70.53
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 75.41,
	"avgPrice" : 66.06
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 73.04,
	"avgPrice" : 59.31
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 69.85,
	"avgPrice" : 61.39
}, {
	"type" : "Falchion Knife",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 115.00,
	"avgPrice" : 102.76
}, {
	"type" : "Falchion Knife",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 64.59,
	"avgPrice" : 60.22
}, {
	"type" : "FAMAS",
	"name" : "Pulse",
	"quality" : "Field-Tested",
	"marketPrice" : 1.18,
	"avgPrice" : 1.12
}, {
	"type" : "FAMAS",
	"name" : "Pulse",
	"quality" : "Well-Worn",
	"marketPrice" : 1.67,
	"avgPrice" : 1.77
}, {
	"type" : "FAMAS",
	"name" : "Pulse",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.93,
	"avgPrice" : 6.42
}, {
	"type" : "FAMAS",
	"name" : "Pulse",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.33,
	"avgPrice" : 4.19
}, {
	"type" : "FAMAS",
	"name" : "Pulse",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.26,
	"avgPrice" : 3.11
}, {
	"type" : "FAMAS",
	"name" : "Pulse",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.99,
	"avgPrice" : 4.86
}, {
	"type" : "FAMAS",
	"name" : "Sergeant",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.99,
	"avgPrice" : 1.02
}, {
	"type" : "FAMAS",
	"name" : "Sergeant",
	"quality" : "Field-Tested",
	"marketPrice" : 0.38,
	"avgPrice" : 0.40
}, {
	"type" : "FAMAS",
	"name" : "Sergeant",
	"quality" : "Well-Worn",
	"marketPrice" : 0.40,
	"avgPrice" : 0.40
}, {
	"type" : "FAMAS",
	"name" : "Sergeant",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.38
}, {
	"type" : "FAMAS",
	"name" : "Sergeant",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.83,
	"avgPrice" : 4.06
}, {
	"type" : "FAMAS",
	"name" : "Sergeant",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.40,
	"avgPrice" : 1.36
}, {
	"type" : "FAMAS",
	"name" : "Sergeant",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.31,
	"avgPrice" : 1.23
}, {
	"type" : "FAMAS",
	"name" : "Sergeant",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.11,
	"avgPrice" : 0.99
}, {
	"type" : "FAMAS",
	"name" : "Spitfire",
	"quality" : "Factory New",
	"marketPrice" : 207.84,
	"avgPrice" : 170.01
}, {
	"type" : "FAMAS",
	"name" : "Spitfire",
	"quality" : "Minimal Wear",
	"marketPrice" : 27.25,
	"avgPrice" : 27.11
}, {
	"type" : "FAMAS",
	"name" : "Spitfire",
	"quality" : "Field-Tested",
	"marketPrice" : 4.90,
	"avgPrice" : 5.60
}, {
	"type" : "FAMAS",
	"name" : "Spitfire",
	"quality" : "Well-Worn",
	"marketPrice" : 7.87,
	"avgPrice" : 5.98
}, {
	"type" : "FAMAS",
	"name" : "Spitfire",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.88,
	"avgPrice" : 5.55
}, {
	"type" : "FAMAS",
	"name" : "Styx",
	"quality" : "Factory New",
	"marketPrice" : 5.15,
	"avgPrice" : 5.37
}, {
	"type" : "FAMAS",
	"name" : "Styx",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.87,
	"avgPrice" : 2.95
}, {
	"type" : "FAMAS",
	"name" : "Styx",
	"quality" : "Field-Tested",
	"marketPrice" : 1.05,
	"avgPrice" : 1.02
}, {
	"type" : "FAMAS",
	"name" : "Styx",
	"quality" : "Well-Worn",
	"marketPrice" : 1.86,
	"avgPrice" : 1.29
}, {
	"type" : "FAMAS",
	"name" : "Styx",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.86,
	"avgPrice" : 1.03
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Styx",
	"quality" : "Factory New",
	"marketPrice" : 42.55,
	"avgPrice" : 44.11
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Styx",
	"quality" : "Minimal Wear",
	"marketPrice" : 17.79,
	"avgPrice" : 16.99
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Styx",
	"quality" : "Field-Tested",
	"marketPrice" : 6.07,
	"avgPrice" : 6.76
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Styx",
	"quality" : "Well-Worn",
	"marketPrice" : 9.86,
	"avgPrice" : 9.16
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Styx",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.55,
	"avgPrice" : 6.52
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Factory New",
	"marketPrice" : 0.28,
	"avgPrice" : 0.29
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.17,
	"avgPrice" : 0.17
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Field-Tested",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Well-Worn",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.52,
	"avgPrice" : 1.46
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.92,
	"avgPrice" : 0.87
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.49,
	"avgPrice" : 0.53
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.20,
	"avgPrice" : 1.09
}, {
	"type" : "FAMAS",
	"name" : "Survivor Z",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.54,
	"avgPrice" : 0.52
}, {
	"type" : "FAMAS",
	"name" : "Teardown",
	"quality" : "Factory New",
	"marketPrice" : 0.53,
	"avgPrice" : 0.53
}, {
	"type" : "FAMAS",
	"name" : "Teardown",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.27,
	"avgPrice" : 0.28
}, {
	"type" : "FAMAS",
	"name" : "Teardown",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "FAMAS",
	"name" : "Teardown",
	"quality" : "Well-Worn",
	"marketPrice" : 0.40,
	"avgPrice" : 0.41
}, {
	"type" : "FAMAS",
	"name" : "Teardown",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.17,
	"avgPrice" : 0.19
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Teardown",
	"quality" : "Factory New",
	"marketPrice" : 400.00,
	"avgPrice" : 52.02
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Teardown",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.81,
	"avgPrice" : 11.93
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Teardown",
	"quality" : "Field-Tested",
	"marketPrice" : 6.49,
	"avgPrice" : 8.00
}, {
	"type" : "Souvenir FAMAS",
	"name" : "Teardown",
	"quality" : "Well-Worn",
	"marketPrice" : 29.98,
	"avgPrice" : 21.72
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Factory New",
	"marketPrice" : 4.25,
	"avgPrice" : 4.50
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.67,
	"avgPrice" : 1.93
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.86,
	"avgPrice" : 1.80
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Field-Tested",
	"marketPrice" : 1.30,
	"avgPrice" : 1.38
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Well-Worn",
	"marketPrice" : 1.45,
	"avgPrice" : 1.37
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.34,
	"avgPrice" : 1.38
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 13.89,
	"avgPrice" : 15.04
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 6.99,
	"avgPrice" : 6.40
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.72,
	"avgPrice" : 4.02
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.71,
	"avgPrice" : 3.72
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.88,
	"avgPrice" : 3.64
}, {
	"type" : "Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Factory New",
	"marketPrice" : 1.73,
	"avgPrice" : 1.67
}, {
	"type" : "Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.38,
	"avgPrice" : 0.42
}, {
	"type" : "Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Field-Tested",
	"marketPrice" : 0.20,
	"avgPrice" : 0.18
}, {
	"type" : "Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Well-Worn",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Factory New",
	"marketPrice" : 11.36,
	"avgPrice" : 12.52
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.62,
	"avgPrice" : 3.41
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Field-Tested",
	"marketPrice" : 1.26,
	"avgPrice" : 1.15
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Well-Worn",
	"marketPrice" : 0.88,
	"avgPrice" : 0.83
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Hot Shot",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.77,
	"avgPrice" : 0.80
}, {
	"type" : "Five-SeveN",
	"name" : "Jungle",
	"quality" : "Factory New",
	"marketPrice" : 7.42,
	"avgPrice" : 6.25
}, {
	"type" : "Five-SeveN",
	"name" : "Jungle",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.72,
	"avgPrice" : 0.48
}, {
	"type" : "Five-SeveN",
	"name" : "Jungle",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.23
}, {
	"type" : "Five-SeveN",
	"name" : "Jungle",
	"quality" : "Well-Worn",
	"marketPrice" : 1.05,
	"avgPrice" : 0.60
}, {
	"type" : "Five-SeveN",
	"name" : "Jungle",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.97,
	"avgPrice" : 0.49
}, {
	"type" : "Five-SeveN",
	"name" : "Kami",
	"quality" : "Factory New",
	"marketPrice" : 0.50,
	"avgPrice" : 0.50
}, {
	"type" : "Five-SeveN",
	"name" : "Kami",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.40,
	"avgPrice" : 0.42
}, {
	"type" : "Five-SeveN",
	"name" : "Kami",
	"quality" : "Field-Tested",
	"marketPrice" : 0.42,
	"avgPrice" : 0.40
}, {
	"type" : "Five-SeveN",
	"name" : "Kami",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.77,
	"avgPrice" : 1.70
}, {
	"type" : "Five-SeveN",
	"name" : "Kami",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.32,
	"avgPrice" : 1.28
}, {
	"type" : "Five-SeveN",
	"name" : "Kami",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.26,
	"avgPrice" : 1.23
}, {
	"type" : "Five-SeveN",
	"name" : "Monkey Business",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.42,
	"avgPrice" : 6.39
}, {
	"type" : "Five-SeveN",
	"name" : "Monkey Business",
	"quality" : "Field-Tested",
	"marketPrice" : 1.52,
	"avgPrice" : 1.57
}, {
	"type" : "Five-SeveN",
	"name" : "Monkey Business",
	"quality" : "Well-Worn",
	"marketPrice" : 1.47,
	"avgPrice" : 1.45
}, {
	"type" : "Five-SeveN",
	"name" : "Monkey Business",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.29,
	"avgPrice" : 1.35
}, {
	"type" : "Five-SeveN",
	"name" : "Monkey Business",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 32.79,
	"avgPrice" : 31.84
}, {
	"type" : "Five-SeveN",
	"name" : "Monkey Business",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 6.11,
	"avgPrice" : 6.00
}, {
	"type" : "Five-SeveN",
	"name" : "Monkey Business",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.29,
	"avgPrice" : 5.09
}, {
	"type" : "Five-SeveN",
	"name" : "Monkey Business",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.54,
	"avgPrice" : 3.70
}, {
	"type" : "Five-SeveN",
	"name" : "Neon Kimono",
	"quality" : "Factory New",
	"marketPrice" : 19.09,
	"avgPrice" : 18.85
}, {
	"type" : "Five-SeveN",
	"name" : "Neon Kimono",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.61,
	"avgPrice" : 14.32
}, {
	"type" : "Five-SeveN",
	"name" : "Neon Kimono",
	"quality" : "Field-Tested",
	"marketPrice" : 9.11,
	"avgPrice" : 8.04
}, {
	"type" : "Five-SeveN",
	"name" : "Neon Kimono",
	"quality" : "Well-Worn",
	"marketPrice" : 12.04,
	"avgPrice" : 9.64
}, {
	"type" : "Five-SeveN",
	"name" : "Neon Kimono",
	"quality" : "Battle-Scarred",
	"marketPrice" : 7.18,
	"avgPrice" : 6.52
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Factory New",
	"marketPrice" : 0.60,
	"avgPrice" : 0.65
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.50,
	"avgPrice" : 0.52
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Field-Tested",
	"marketPrice" : 0.31,
	"avgPrice" : 0.30
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Well-Worn",
	"marketPrice" : 0.87,
	"avgPrice" : 0.75
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.74,
	"avgPrice" : 0.70
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.31,
	"avgPrice" : 2.24
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.61,
	"avgPrice" : 1.54
}, {
	"type" : "CZ75-Auto",
	"name" : "Tigris",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.86,
	"avgPrice" : 0.89
}, {
	"type" : "CZ75-Auto",
	"name" : "Tread Plate",
	"quality" : "Factory New",
	"marketPrice" : 0.89,
	"avgPrice" : 0.77
}, {
	"type" : "CZ75-Auto",
	"name" : "Tread Plate",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.88,
	"avgPrice" : 0.61
}, {
	"type" : "CZ75-Auto",
	"name" : "Tread Plate",
	"quality" : "Field-Tested",
	"marketPrice" : 0.96,
	"avgPrice" : 0.95
}, {
	"type" : "CZ75-Auto",
	"name" : "Tread Plate",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.48,
	"avgPrice" : 4.20
}, {
	"type" : "CZ75-Auto",
	"name" : "Tread Plate",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.33,
	"avgPrice" : 3.37
}, {
	"type" : "CZ75-Auto",
	"name" : "Tread Plate",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.25,
	"avgPrice" : 2.80
}, {
	"type" : "CZ75-Auto",
	"name" : "Tuxedo",
	"quality" : "Factory New",
	"marketPrice" : 0.41,
	"avgPrice" : 0.43
}, {
	"type" : "CZ75-Auto",
	"name" : "Tuxedo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.23,
	"avgPrice" : 0.22
}, {
	"type" : "CZ75-Auto",
	"name" : "Tuxedo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.15,
	"avgPrice" : 0.14
}, {
	"type" : "CZ75-Auto",
	"name" : "Tuxedo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "CZ75-Auto",
	"name" : "Tuxedo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.15,
	"avgPrice" : 0.14
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Factory New",
	"marketPrice" : 0.48,
	"avgPrice" : 0.52
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.18,
	"avgPrice" : 0.19
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Field-Tested",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Well-Worn",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.13,
	"avgPrice" : 0.13
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.30,
	"avgPrice" : 2.28
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.60,
	"avgPrice" : 0.57
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.34,
	"avgPrice" : 0.36
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.31,
	"avgPrice" : 0.33
}, {
	"type" : "CZ75-Auto",
	"name" : "Twist",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.32,
	"avgPrice" : 0.33
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Factory New",
	"marketPrice" : 14.95,
	"avgPrice" : 12.33
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.70,
	"avgPrice" : 6.60
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Field-Tested",
	"marketPrice" : 5.14,
	"avgPrice" : 4.87
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Well-Worn",
	"marketPrice" : 5.67,
	"avgPrice" : 5.56
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.80,
	"avgPrice" : 4.47
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 219.28,
	"avgPrice" : 189.52
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 50.55,
	"avgPrice" : 51.61
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 33.70,
	"avgPrice" : 32.12
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 39.99,
	"avgPrice" : 29.77
}, {
	"type" : "CZ75-Auto",
	"name" : "Victoria",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 39.18,
	"avgPrice" : 24.93
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Factory New",
	"marketPrice" : 6.62,
	"avgPrice" : 6.06
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.87,
	"avgPrice" : 3.71
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Field-Tested",
	"marketPrice" : 2.37,
	"avgPrice" : 2.48
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Well-Worn",
	"marketPrice" : 2.30,
	"avgPrice" : 2.28
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.47,
	"avgPrice" : 2.27
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 28.00,
	"avgPrice" : 28.14
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 12.12,
	"avgPrice" : 12.66
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.70,
	"avgPrice" : 7.54
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.68,
	"avgPrice" : 5.92
}, {
	"type" : "CZ75-Auto",
	"name" : "Yellow Jacket",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 5.72,
	"avgPrice" : 5.57
}, {
	"type" : "Desert Eagle",
	"name" : "Blaze",
	"quality" : "Factory New",
	"marketPrice" : 64.00,
	"avgPrice" : 58.00
}, {
	"type" : "Desert Eagle",
	"name" : "Blaze",
	"quality" : "Minimal Wear",
	"marketPrice" : 59.77,
	"avgPrice" : 60.51
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.15
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "Desert Eagle",
	"name" : "Bronze Deco",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.12,
	"avgPrice" : 1.20
}, {
	"type" : "Falchion Knife",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 120.11,
	"avgPrice" : 112.10
}, {
	"type" : "Falchion Knife",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 87.30,
	"avgPrice" : 82.96
}, {
	"type" : "Falchion Knife",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 78.21,
	"avgPrice" : 75.36
}, {
	"type" : "Falchion Knife",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 74.47,
	"avgPrice" : 76.45
}, {
	"type" : "Falchion Knife",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 76.73,
	"avgPrice" : 73.71
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 220.15,
	"avgPrice" : 217.03
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 133.76,
	"avgPrice" : 123.90
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 110.00,
	"avgPrice" : 98.63
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 104.00,
	"avgPrice" : 99.05
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 200.25,
	"avgPrice" : 398.75
}, {
	"type" : "Falchion Knife",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 152.04,
	"avgPrice" : 133.20
}, {
	"type" : "Falchion Knife",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 71.88,
	"avgPrice" : 67.01
}, {
	"type" : "Falchion Knife",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 55.86,
	"avgPrice" : 54.82
}, {
	"type" : "Falchion Knife",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 61.10,
	"avgPrice" : 53.77
}, {
	"type" : "Falchion Knife",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 55.61,
	"avgPrice" : 49.14
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 106.74,
	"avgPrice" : 87.12
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 77.00,
	"avgPrice" : 73.82
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 70.00,
	"avgPrice" : 80.49
}, {
	"type" : "Falchion Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 72.05,
	"avgPrice" : 60.52
}, {
	"type" : "Falchion Knife",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 125.71,
	"avgPrice" : 121.36
}, {
	"type" : "Falchion Knife",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 96.07,
	"avgPrice" : 97.64
}, {
	"type" : "Falchion Knife",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 79.76,
	"avgPrice" : 80.34
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Field-Tested",
	"marketPrice" : 0.88,
	"avgPrice" : 0.95
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Well-Worn",
	"marketPrice" : 1.29,
	"avgPrice" : 1.39
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.72,
	"avgPrice" : 0.71
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 21.76,
	"avgPrice" : 20.39
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 6.74,
	"avgPrice" : 7.49
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.49,
	"avgPrice" : 3.56
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.47,
	"avgPrice" : 5.48
}, {
	"type" : "FAMAS",
	"name" : "Valence",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.21,
	"avgPrice" : 2.58
}, {
	"type" : "Five-SeveN",
	"name" : "Anodized Gunmetal",
	"quality" : "Factory New",
	"marketPrice" : 1.53,
	"avgPrice" : 1.51
}, {
	"type" : "Five-SeveN",
	"name" : "Anodized Gunmetal",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.87,
	"avgPrice" : 1.91
}, {
	"type" : "Five-SeveN",
	"name" : "Candy Apple",
	"quality" : "Factory New",
	"marketPrice" : 10.69,
	"avgPrice" : 10.04
}, {
	"type" : "Five-SeveN",
	"name" : "Candy Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.35,
	"avgPrice" : 9.30
}, {
	"type" : "Five-SeveN",
	"name" : "Candy Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 9.68,
	"avgPrice" : 8.66
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 11.23,
	"avgPrice" : 13.55
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.75,
	"avgPrice" : 6.14
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 3.71,
	"avgPrice" : 3.89
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 3.25,
	"avgPrice" : 3.56
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.34,
	"avgPrice" : 3.39
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 69.00,
	"avgPrice" : 72.76
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 24.73,
	"avgPrice" : 27.45
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 15.49,
	"avgPrice" : 16.88
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 12.91,
	"avgPrice" : 13.26
}, {
	"type" : "Five-SeveN",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 11.61,
	"avgPrice" : 13.66
}, {
	"type" : "Five-SeveN",
	"name" : "Contractor",
	"quality" : "Factory New",
	"marketPrice" : 3.37,
	"avgPrice" : 3.75
}, {
	"type" : "Five-SeveN",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.38,
	"avgPrice" : 0.40
}, {
	"type" : "Five-SeveN",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 0.16,
	"avgPrice" : 0.15
}, {
	"type" : "Five-SeveN",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 0.29,
	"avgPrice" : 0.32
}, {
	"type" : "Five-SeveN",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.43,
	"avgPrice" : 0.37
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Contractor",
	"quality" : "Factory New",
	"marketPrice" : 11.30,
	"avgPrice" : 8.70
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.22,
	"avgPrice" : 1.25
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 0.55,
	"avgPrice" : 0.54
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 0.62,
	"avgPrice" : 0.68
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.63,
	"avgPrice" : 0.57
}, {
	"type" : "Five-SeveN",
	"name" : "Copper Galaxy",
	"quality" : "Factory New",
	"marketPrice" : 1.74,
	"avgPrice" : 1.75
}, {
	"type" : "Five-SeveN",
	"name" : "Copper Galaxy",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.65,
	"avgPrice" : 1.59
}, {
	"type" : "Five-SeveN",
	"name" : "Copper Galaxy",
	"quality" : "Field-Tested",
	"marketPrice" : 1.29,
	"avgPrice" : 1.21
}, {
	"type" : "Five-SeveN",
	"name" : "Copper Galaxy",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 14.61,
	"avgPrice" : 13.30
}, {
	"type" : "Five-SeveN",
	"name" : "Copper Galaxy",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 9.82,
	"avgPrice" : 8.76
}, {
	"type" : "Five-SeveN",
	"name" : "Copper Galaxy",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 4.69,
	"avgPrice" : 4.84
}, {
	"type" : "Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Factory New",
	"marketPrice" : 0.27,
	"avgPrice" : 0.29
}, {
	"type" : "Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Factory New",
	"marketPrice" : 20.56,
	"avgPrice" : 16.79
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.04,
	"avgPrice" : 2.12
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Field-Tested",
	"marketPrice" : 0.76,
	"avgPrice" : 0.75
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Well-Worn",
	"marketPrice" : 1.09,
	"avgPrice" : 0.95
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Forest Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.75,
	"avgPrice" : 0.69
}, {
	"type" : "Five-SeveN",
	"name" : "Fowl Play",
	"quality" : "Factory New",
	"marketPrice" : 3.18,
	"avgPrice" : 3.29
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.20,
	"avgPrice" : 1.14
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.42,
	"avgPrice" : 1.35
}, {
	"type" : "Five-SeveN",
	"name" : "Nightshade",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.54,
	"avgPrice" : 1.22
}, {
	"type" : "Five-SeveN",
	"name" : "Nitro",
	"quality" : "Factory New",
	"marketPrice" : 13.96,
	"avgPrice" : 13.12
}, {
	"type" : "Five-SeveN",
	"name" : "Nitro",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.80,
	"avgPrice" : 1.67
}, {
	"type" : "Five-SeveN",
	"name" : "Nitro",
	"quality" : "Field-Tested",
	"marketPrice" : 1.01,
	"avgPrice" : 0.86
}, {
	"type" : "Five-SeveN",
	"name" : "Nitro",
	"quality" : "Well-Worn",
	"marketPrice" : 1.08,
	"avgPrice" : 0.88
}, {
	"type" : "Five-SeveN",
	"name" : "Nitro",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.01,
	"avgPrice" : 0.83
}, {
	"type" : "Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Factory New",
	"marketPrice" : 1.07,
	"avgPrice" : 1.03
}, {
	"type" : "Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Well-Worn",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Factory New",
	"marketPrice" : 39.99,
	"avgPrice" : 29.54
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.37,
	"avgPrice" : 3.46
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Field-Tested",
	"marketPrice" : 0.96,
	"avgPrice" : 1.00
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Well-Worn",
	"marketPrice" : 1.50,
	"avgPrice" : 1.45
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Orange Peel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.09,
	"avgPrice" : 1.02
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Factory New",
	"marketPrice" : 3.33,
	"avgPrice" : 3.52
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.28,
	"avgPrice" : 1.37
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Field-Tested",
	"marketPrice" : 0.65,
	"avgPrice" : 0.65
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Well-Worn",
	"marketPrice" : 0.53,
	"avgPrice" : 0.59
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.51,
	"avgPrice" : 0.53
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 21.81,
	"avgPrice" : 20.06
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 7.99,
	"avgPrice" : 7.68
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.16,
	"avgPrice" : 3.14
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.27,
	"avgPrice" : 2.28
}, {
	"type" : "Five-SeveN",
	"name" : "Retrobution",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.86,
	"avgPrice" : 1.86
}, {
	"type" : "Five-SeveN",
	"name" : "Silver Quartz",
	"quality" : "Factory New",
	"marketPrice" : 0.54,
	"avgPrice" : 0.53
}, {
	"type" : "Five-SeveN",
	"name" : "Silver Quartz",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.28,
	"avgPrice" : 0.29
}, {
	"type" : "Five-SeveN",
	"name" : "Silver Quartz",
	"quality" : "Field-Tested",
	"marketPrice" : 0.24,
	"avgPrice" : 0.21
}, {
	"type" : "Five-SeveN",
	"name" : "Silver Quartz",
	"quality" : "Well-Worn",
	"marketPrice" : 0.43,
	"avgPrice" : 0.41
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Silver Quartz",
	"quality" : "Factory New",
	"marketPrice" : 78.66,
	"avgPrice" : 47.21
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Silver Quartz",
	"quality" : "Minimal Wear",
	"marketPrice" : 39.49,
	"avgPrice" : 18.71
}, {
	"type" : "Souvenir Five-SeveN",
	"name" : "Silver Quartz",
	"quality" : "Field-Tested",
	"marketPrice" : 11.51,
	"avgPrice" : 9.51
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Factory New",
	"marketPrice" : 1.29,
	"avgPrice" : 1.41
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.82,
	"avgPrice" : 0.83
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Field-Tested",
	"marketPrice" : 0.53,
	"avgPrice" : 0.54
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Well-Worn",
	"marketPrice" : 0.60,
	"avgPrice" : 0.62
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.50,
	"avgPrice" : 0.52
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.45,
	"avgPrice" : 7.02
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.51,
	"avgPrice" : 4.32
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.27,
	"avgPrice" : 2.17
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.55,
	"avgPrice" : 2.32
}, {
	"type" : "Five-SeveN",
	"name" : "Triumvirate",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.37,
	"avgPrice" : 1.87
}, {
	"type" : "Five-SeveN",
	"name" : "Urban Hazard",
	"quality" : "Factory New",
	"marketPrice" : 0.66,
	"avgPrice" : 0.66
}, {
	"type" : "Five-SeveN",
	"name" : "Urban Hazard",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.51,
	"avgPrice" : 0.54
}, {
	"type" : "Five-SeveN",
	"name" : "Urban Hazard",
	"quality" : "Field-Tested",
	"marketPrice" : 0.54,
	"avgPrice" : 0.51
}, {
	"type" : "Five-SeveN",
	"name" : "Urban Hazard",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.95,
	"avgPrice" : 2.91
}, {
	"type" : "Five-SeveN",
	"name" : "Urban Hazard",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.07,
	"avgPrice" : 2.13
}, {
	"type" : "Flip Knife",
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 187.69
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 255.50,
	"avgPrice" : 244.18
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 322.99,
	"avgPrice" : 319.28
}, {
	"type" : "Flip Knife",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 216.83,
	"avgPrice" : 198.23
}, {
	"type" : "Flip Knife",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 215.83,
	"avgPrice" : 203.32
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 259.90,
	"avgPrice" : 287.29
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 306.21,
	"avgPrice" : 320.35
}, {
	"type" : "Flip Knife",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 137.33,
	"avgPrice" : 107.97
}, {
	"type" : "Flip Knife",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 77.36,
	"avgPrice" : 76.24
}, {
	"type" : "Flip Knife",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 64.56,
	"avgPrice" : 61.12
}, {
	"type" : "Flip Knife",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 71.07,
	"avgPrice" : 63.16
}, {
	"type" : "Flip Knife",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 61.10,
	"avgPrice" : 56.52
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 128.88,
	"avgPrice" : 92.87
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 96.63,
	"avgPrice" : 82.47
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 90.96,
	"avgPrice" : 79.99
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 92.12,
	"avgPrice" : 73.02
}, {
	"type" : "Flip Knife",
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 257.60,
	"avgPrice" : 251.91
}, {
	"type" : "Flip Knife",
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 289.49,
	"avgPrice" : 285.39
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 373.24
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 404.46,
	"avgPrice" : 325.93
}, {
	"type" : "Flip Knife",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 410.59,
	"avgPrice" : 368.87
}, {
	"type" : "Flip Knife",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 135.87,
	"avgPrice" : 128.58
}, {
	"type" : "Flip Knife",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 86.33,
	"avgPrice" : 85.78
}, {
	"type" : "Flip Knife",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 80.99,
	"avgPrice" : 81.18
}, {
	"type" : "Flip Knife",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 70.22,
	"avgPrice" : 67.71
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 187.00,
	"avgPrice" : 152.70
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 164.04,
	"avgPrice" : 113.18
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 129.19,
	"avgPrice" : 94.52
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 103.29,
	"avgPrice" : 85.79
}, {
	"type" : "Flip Knife",
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 101.02,
	"avgPrice" : 88.43
}, {
	"type" : "Flip Knife",
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 77.88,
	"avgPrice" : 73.35
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 96.00,
	"avgPrice" : 141.49
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 109.99,
	"avgPrice" : 105.18
}, {
	"type" : "Flip Knife",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 114.17,
	"avgPrice" : 87.19
}, {
	"type" : "Flip Knife",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 62.92,
	"avgPrice" : 60.11
}, {
	"type" : "Flip Knife",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 57.23,
	"avgPrice" : 56.67
}, {
	"type" : "Flip Knife",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 60.73,
	"avgPrice" : 55.23
}, {
	"type" : "Flip Knife",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 58.80,
	"avgPrice" : 56.02
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 106.28,
	"avgPrice" : 78.17
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 73.21,
	"avgPrice" : 70.54
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 108.00,
	"avgPrice" : 67.02
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 80.50,
	"avgPrice" : 67.82
}, {
	"type" : "Flip Knife",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 400.00,
	"avgPrice" : 111.63
}, {
	"type" : "Flip Knife",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 77.09,
	"avgPrice" : 72.38
}, {
	"type" : "Flip Knife",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 60.00,
	"avgPrice" : 58.22
}, {
	"type" : "Flip Knife",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 63.25,
	"avgPrice" : 58.20
}, {
	"type" : "Flip Knife",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 60.90,
	"avgPrice" : 56.64
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 406.98,
	"avgPrice" : 271.61
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 135.65,
	"avgPrice" : 93.27
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 90.44,
	"avgPrice" : 78.45
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 95.00,
	"avgPrice" : 68.98
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 125.99,
	"avgPrice" : 70.69
}, {
	"type" : "Flip Knife",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 180.87,
	"avgPrice" : 177.83
}, {
	"type" : "Flip Knife",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 154.72,
	"avgPrice" : 158.39
}, {
	"type" : "Flip Knife",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 143.81,
	"avgPrice" : 151.78
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 349.98,
	"avgPrice" : 246.14
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 224.68,
	"avgPrice" : 202.95
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 252.68,
	"avgPrice" : 165.39
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 113.10,
	"avgPrice" : 107.15
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 82.00,
	"avgPrice" : 79.82
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 74.06,
	"avgPrice" : 72.59
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 73.92,
	"avgPrice" : 70.64
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 76.41,
	"avgPrice" : 69.70
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 348.92,
	"avgPrice" : 229.49
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 110.82,
	"avgPrice" : 101.75
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 107.23,
	"avgPrice" : 87.66
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 102.73,
	"avgPrice" : 79.40
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 174.60,
	"avgPrice" : 114.69
}, {
	"type" : "Flip Knife",
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 207.00,
	"avgPrice" : 207.59
}, {
	"type" : "Flip Knife",
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 265.00,
	"avgPrice" : 228.80
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 292.11,
	"avgPrice" : 301.18
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 277.40,
	"avgPrice" : 283.83
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"marketPrice" : 356.51,
	"avgPrice" : 381.86
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 153.09,
	"avgPrice" : 141.59
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 94.94,
	"avgPrice" : 94.18
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 94.30,
	"avgPrice" : 90.44
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 72.29,
	"avgPrice" : 68.82
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 218.34,
	"avgPrice" : 167.78
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 121.03,
	"avgPrice" : 133.14
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 133.70,
	"avgPrice" : 99.01
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 99.98,
	"avgPrice" : 86.22
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 130.00,
	"avgPrice" : 102.19
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 72.46,
	"avgPrice" : 72.55
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 63.84,
	"avgPrice" : 62.12
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 63.07,
	"avgPrice" : 62.66
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 62.28,
	"avgPrice" : 58.90
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 120.00
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 141.58,
	"avgPrice" : 94.02
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 90.44,
	"avgPrice" : 75.58
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 126.50,
	"avgPrice" : 77.16
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 75.05,
	"avgPrice" : 70.95
}, {
	"name" : "Flip Knife",
	"marketPrice" : 80.00,
	"avgPrice" : 78.01
}, {
	"name" : "Flip Knife",
	"statTrak" : 1,
	"marketPrice" : 108.52,
	"avgPrice" : 103.94
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Factory New",
	"marketPrice" : 30.36,
	"avgPrice" : 25.12
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.98,
	"avgPrice" : 3.96
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Field-Tested",
	"marketPrice" : 3.72,
	"avgPrice" : 1.19
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Well-Worn",
	"marketPrice" : 2.59,
	"avgPrice" : 1.76
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.79,
	"avgPrice" : 1.70
}, {
	"type" : "G3SG1",
	"name" : "Azure Zebra",
	"quality" : "Factory New",
	"marketPrice" : 0.48,
	"avgPrice" : 0.37
}, {
	"type" : "G3SG1",
	"name" : "Azure Zebra",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.34,
	"avgPrice" : 0.32
}, {
	"type" : "Five-SeveN",
	"name" : "Urban Hazard",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.98,
	"avgPrice" : 2.00
}, {
	"type" : "Flip Knife",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 148.01,
	"avgPrice" : 115.04
}, {
	"type" : "Flip Knife",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 99.98,
	"avgPrice" : 95.83
}, {
	"type" : "Flip Knife",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 87.07,
	"avgPrice" : 88.30
}, {
	"type" : "Flip Knife",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 87.00,
	"avgPrice" : 84.90
}, {
	"type" : "Flip Knife",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 89.83,
	"avgPrice" : 85.20
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 349.99,
	"avgPrice" : 185.12
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 140.82,
	"avgPrice" : 121.50
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 103.35,
	"avgPrice" : 105.97
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 115.00,
	"avgPrice" : 107.37
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 107.87,
	"avgPrice" : 107.07
}, {
	"type" : "Flip Knife",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 117.10,
	"avgPrice" : 97.74
}, {
	"type" : "Flip Knife",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 75.99,
	"avgPrice" : 70.87
}, {
	"type" : "Flip Knife",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 60.73,
	"avgPrice" : 60.36
}, {
	"type" : "Flip Knife",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 69.69,
	"avgPrice" : 61.61
}, {
	"type" : "Flip Knife",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 58.77,
	"avgPrice" : 57.51
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 118.04,
	"avgPrice" : 93.46
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 96.90,
	"avgPrice" : 81.84
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 68.00,
	"avgPrice" : 63.17
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 85.00,
	"avgPrice" : 66.08
}, {
	"type" : "Flip Knife",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 170.38,
	"avgPrice" : 150.02
}, {
	"type" : "Flip Knife",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 114.74,
	"avgPrice" : 111.76
}, {
	"type" : "Flip Knife",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 103.88,
	"avgPrice" : 97.84
}, {
	"type" : "Flip Knife",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 107.98,
	"avgPrice" : 101.20
}, {
	"type" : "Flip Knife",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 97.75,
	"avgPrice" : 100.43
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 404.46,
	"avgPrice" : 352.31
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 182.63,
	"avgPrice" : 143.53
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 172.50,
	"avgPrice" : 151.33
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 125.00,
	"avgPrice" : 126.06
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 132.56,
	"avgPrice" : 121.80
}, {
	"type" : "Flip Knife",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 496.25
}, {
	"type" : "Flip Knife",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 219.02,
	"avgPrice" : 209.06
}, {
	"type" : "Flip Knife",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 121.32,
	"avgPrice" : 121.27
}, {
	"type" : "Flip Knife",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 120.24,
	"avgPrice" : 112.62
}, {
	"type" : "Flip Knife",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 96.06,
	"avgPrice" : 89.84
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 400.51,
	"avgPrice" : 372.87
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 155.04,
	"avgPrice" : 153.71
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 249.36,
	"avgPrice" : 117.31
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 125.00,
	"avgPrice" : 105.87
}, {
	"type" : "Flip Knife",
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 124.38,
	"avgPrice" : 115.38
}, {
	"type" : "Flip Knife",
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 109.16,
	"avgPrice" : 101.25
}, {
	"type" : "Flip Knife",
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 88.50,
	"avgPrice" : 88.56
}, {
	"type" : "Flip Knife",
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 92.00,
	"avgPrice" : 89.06
}, {
	"type" : "Flip Knife",
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 105.00,
	"avgPrice" : 76.31
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 182.00,
	"avgPrice" : 171.04
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 162.90,
	"avgPrice" : 138.39
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 146.00,
	"avgPrice" : 121.58
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 303.74,
	"avgPrice" : 89.79
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 122.10,
	"avgPrice" : 103.22
}, {
	"type" : "Flip Knife",
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 179.77,
	"avgPrice" : 179.96
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 95.00,
	"avgPrice" : 68.98
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 125.99,
	"avgPrice" : 70.69
}, {
	"type" : "Flip Knife",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 180.87,
	"avgPrice" : 177.83
}, {
	"type" : "Flip Knife",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 154.72,
	"avgPrice" : 158.39
}, {
	"type" : "Flip Knife",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 143.81,
	"avgPrice" : 151.78
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 349.98,
	"avgPrice" : 246.14
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 224.68,
	"avgPrice" : 202.95
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 252.68,
	"avgPrice" : 165.39
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 113.10,
	"avgPrice" : 107.15
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 82.00,
	"avgPrice" : 79.82
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 74.06,
	"avgPrice" : 72.59
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 73.94,
	"avgPrice" : 70.64
}, {
	"type" : "Flip Knife",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 76.41,
	"avgPrice" : 69.70
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 348.92,
	"avgPrice" : 229.49
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 110.82,
	"avgPrice" : 101.75
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 107.23,
	"avgPrice" : 87.66
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 102.73,
	"avgPrice" : 79.40
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 174.60,
	"avgPrice" : 114.69
}, {
	"type" : "Flip Knife",
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 207.00,
	"avgPrice" : 207.59
}, {
	"type" : "Flip Knife",
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 265.00,
	"avgPrice" : 228.80
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 292.11,
	"avgPrice" : 301.18
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 277.40,
	"avgPrice" : 283.83
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"marketPrice" : 356.51,
	"avgPrice" : 381.86
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 153.09,
	"avgPrice" : 141.59
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 94.94,
	"avgPrice" : 94.18
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 94.30,
	"avgPrice" : 90.44
}, {
	"type" : "Flip Knife",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 72.29,
	"avgPrice" : 68.82
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 218.34,
	"avgPrice" : 167.78
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 121.03,
	"avgPrice" : 133.14
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 133.70,
	"avgPrice" : 99.01
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 99.98,
	"avgPrice" : 86.22
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 130.00,
	"avgPrice" : 102.19
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 72.46,
	"avgPrice" : 72.55
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 62.00,
	"avgPrice" : 62.12
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 63.07,
	"avgPrice" : 62.66
}, {
	"type" : "Flip Knife",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 62.28,
	"avgPrice" : 58.90
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 120.00
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 141.58,
	"avgPrice" : 94.02
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 90.44,
	"avgPrice" : 75.58
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 126.50,
	"avgPrice" : 77.16
}, {
	"type" : "Flip Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 75.05,
	"avgPrice" : 70.95
}, {
	"name" : "Flip Knife",
	"marketPrice" : 80.00,
	"avgPrice" : 78.01
}, {
	"name" : "Flip Knife",
	"statTrak" : 1,
	"marketPrice" : 108.52,
	"avgPrice" : 103.94
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Factory New",
	"marketPrice" : 30.36,
	"avgPrice" : 25.12
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.98,
	"avgPrice" : 3.96
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Field-Tested",
	"marketPrice" : 3.72,
	"avgPrice" : 1.19
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Well-Worn",
	"marketPrice" : 2.59,
	"avgPrice" : 1.76
}, {
	"type" : "G3SG1",
	"name" : "Arctic Camo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.79,
	"avgPrice" : 1.70
}, {
	"type" : "G3SG1",
	"name" : "Azure Zebra",
	"quality" : "Factory New",
	"marketPrice" : 0.48,
	"avgPrice" : 0.37
}, {
	"type" : "G3SG1",
	"name" : "Azure Zebra",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.34,
	"avgPrice" : 0.32
}, {
	"type" : "Souvenir G3SG1",
	"name" : "VariCamo",
	"quality" : "Factory New",
	"marketPrice" : 100.00,
	"avgPrice" : 15.03
}, {
	"type" : "Souvenir G3SG1",
	"name" : "VariCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.44,
	"avgPrice" : 5.85
}, {
	"type" : "Souvenir G3SG1",
	"name" : "VariCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 2.68,
	"avgPrice" : 2.28
}, {
	"type" : "Souvenir G3SG1",
	"name" : "VariCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 28.77,
	"avgPrice" : 24.24
}, {
	"type" : "Souvenir G3SG1",
	"name" : "VariCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 10.59,
	"avgPrice" : 8.15
}, {
	"type" : "Galil AR",
	"name" : "Aqua Terrace",
	"quality" : "Factory New",
	"marketPrice" : 4.10,
	"avgPrice" : 3.74
}, {
	"type" : "Galil AR",
	"name" : "Aqua Terrace",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.04,
	"avgPrice" : 2.64
}, {
	"type" : "Galil AR",
	"name" : "Aqua Terrace",
	"quality" : "Field-Tested",
	"marketPrice" : 2.36,
	"avgPrice" : 2.27
}, {
	"type" : "Galil AR",
	"name" : "Aqua Terrace",
	"quality" : "Well-Worn",
	"marketPrice" : 2.19,
	"avgPrice" : 2.08
}, {
	"type" : "Galil AR",
	"name" : "Aqua Terrace",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.81,
	"avgPrice" : 1.74
}, {
	"type" : "Galil AR",
	"name" : "Blue Titanium",
	"quality" : "Factory New",
	"marketPrice" : 0.34,
	"avgPrice" : 0.34
}, {
	"type" : "Galil AR",
	"name" : "Blue Titanium",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.53,
	"avgPrice" : 1.32
}, {
	"type" : "Galil AR",
	"name" : "Cerberus",
	"quality" : "Factory New",
	"marketPrice" : 19.05,
	"avgPrice" : 19.53
}, {
	"type" : "Galil AR",
	"name" : "Cerberus",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.43,
	"avgPrice" : 8.46
}, {
	"type" : "Galil AR",
	"name" : "Cerberus",
	"quality" : "Field-Tested",
	"marketPrice" : 3.27,
	"avgPrice" : 3.35
}, {
	"type" : "Galil AR",
	"name" : "Cerberus",
	"quality" : "Well-Worn",
	"marketPrice" : 2.84,
	"avgPrice" : 2.75
}, {
	"type" : "Galil AR",
	"name" : "Cerberus",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.43,
	"avgPrice" : 1.40
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Cerberus",
	"quality" : "Factory New",
	"marketPrice" : 280.87,
	"avgPrice" : 221.64
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Cerberus",
	"quality" : "Minimal Wear",
	"marketPrice" : 32.29,
	"avgPrice" : 33.54
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Cerberus",
	"quality" : "Field-Tested",
	"marketPrice" : 13.47,
	"avgPrice" : 11.62
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Cerberus",
	"quality" : "Well-Worn",
	"marketPrice" : 10.55,
	"avgPrice" : 8.89
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Cerberus",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.46,
	"avgPrice" : 5.47
}, {
	"type" : "Galil AR",
	"name" : "Chatterbox",
	"quality" : "Field-Tested",
	"marketPrice" : 16.47,
	"avgPrice" : 16.04
}, {
	"type" : "Galil AR",
	"name" : "Chatterbox",
	"quality" : "Well-Worn",
	"marketPrice" : 3.23,
	"avgPrice" : 3.25
}, {
	"type" : "Galil AR",
	"name" : "Chatterbox",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.98,
	"avgPrice" : 1.96
}, {
	"type" : "Galil AR",
	"name" : "Chatterbox",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 115.24,
	"avgPrice" : 118.17
}, {
	"type" : "Galil AR",
	"name" : "Chatterbox",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 16.91,
	"avgPrice" : 16.90
}, {
	"type" : "Galil AR",
	"name" : "Chatterbox",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 7.79,
	"avgPrice" : 7.21
}, {
	"type" : "Galil AR",
	"name" : "Eco",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.95,
	"avgPrice" : 4.47
}, {
	"type" : "Galil AR",
	"name" : "Eco",
	"quality" : "Field-Tested",
	"marketPrice" : 1.38,
	"avgPrice" : 1.35
}, {
	"type" : "Galil AR",
	"name" : "Eco",
	"quality" : "Well-Worn",
	"marketPrice" : 1.34,
	"avgPrice" : 1.36
}, {
	"type" : "Galil AR",
	"name" : "Eco",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.34,
	"avgPrice" : 1.32
}, {
	"type" : "Galil AR",
	"name" : "Eco",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 23.58,
	"avgPrice" : 16.99
}, {
	"type" : "Galil AR",
	"name" : "Eco",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.85,
	"avgPrice" : 3.83
}, {
	"type" : "Galil AR",
	"name" : "Eco",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.45,
	"avgPrice" : 3.49
}, {
	"type" : "Galil AR",
	"name" : "Eco",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.74,
	"avgPrice" : 3.39
}, {
	"type" : "Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Factory New",
	"marketPrice" : 0.69,
	"avgPrice" : 0.67
}, {
	"type" : "Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.16,
	"avgPrice" : 0.18
}, {
	"type" : "Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Field-Tested",
	"marketPrice" : 0.12,
	"avgPrice" : 0.11
}, {
	"type" : "Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Well-Worn",
	"marketPrice" : 0.35,
	"avgPrice" : 0.36
}, {
	"type" : "Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.24,
	"avgPrice" : 0.23
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Factory New",
	"marketPrice" : 1.51,
	"avgPrice" : 1.48
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.03,
	"avgPrice" : 0.89
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Field-Tested",
	"marketPrice" : 0.54,
	"avgPrice" : 0.47
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Well-Worn",
	"marketPrice" : 0.83,
	"avgPrice" : 0.73
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Hunting Blind",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.01,
	"avgPrice" : 0.57
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Factory New",
	"marketPrice" : 0.26,
	"avgPrice" : 0.27
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.16,
	"avgPrice" : 0.17
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Field-Tested",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Well-Worn",
	"marketPrice" : 0.20,
	"avgPrice" : 0.21
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.19,
	"avgPrice" : 1.19
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.55,
	"avgPrice" : 0.54
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.63,
	"avgPrice" : 0.58
}, {
	"type" : "Galil AR",
	"name" : "Kami",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.48,
	"avgPrice" : 0.45
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 29.90,
	"avgPrice" : 27.61
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.64,
	"avgPrice" : 4.05
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 3.15,
	"avgPrice" : 2.75
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 3.31,
	"avgPrice" : 2.90
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.60,
	"avgPrice" : 2.75
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 334.67,
	"avgPrice" : 198.34
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 12.20,
	"avgPrice" : 12.54
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.72,
	"avgPrice" : 7.34
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 7.03,
	"avgPrice" : 6.66
}, {
	"type" : "Galil AR",
	"name" : "Orange DDPAT",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 6.64,
	"avgPrice" : 5.55
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Factory New",
	"marketPrice" : 0.72,
	"avgPrice" : 0.71
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.18,
	"avgPrice" : 0.19
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Field-Tested",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.45,
	"avgPrice" : 4.55
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.77,
	"avgPrice" : 0.74
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.32,
	"avgPrice" : 0.32
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.34,
	"avgPrice" : 0.30
}, {
	"type" : "Galil AR",
	"name" : "Rocket Pop",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.28,
	"avgPrice" : 0.27
}, {
	"type" : "Galil AR",
	"name" : "Sage Spray",
	"quality" : "Factory New",
	"marketPrice" : 0.18,
	"avgPrice" : 0.15
}, {
	"type" : "Galil AR",
	"name" : "Sage Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Galil AR",
	"name" : "Sage Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Galil AR",
	"name" : "Sage Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Galil AR",
	"name" : "Sage Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Sage Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.93,
	"avgPrice" : 1.93
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Sage Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 1.07,
	"avgPrice" : 0.96
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Sage Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 2.30,
	"avgPrice" : 1.36
}, {
	"type" : "Souvenir Galil AR",
	"name" : "Sage Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.46,
	"avgPrice" : 1.44
}, {
	"type" : "Galil AR",
	"name" : "Sandstorm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.36,
	"avgPrice" : 0.40
}, {
	"type" : "Galil AR",
	"name" : "Sandstorm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.15
}, {
	"type" : "Galil AR",
	"name" : "Sandstorm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.55,
	"avgPrice" : 0.51
}, {
	"type" : "Galil AR",
	"name" : "Sandstorm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.34,
	"avgPrice" : 0.31
}, {
	"type" : "Galil AR",
	"name" : "Sandstorm",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.19,
	"avgPrice" : 1.00
}, {
	"type" : "Galil AR",
	"name" : "Sandstorm",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.38,
	"avgPrice" : 0.37
}, {
	"type" : "Galil AR",
	"name" : "Sandstorm",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.77,
	"avgPrice" : 0.66
}, {
	"type" : "Galil AR",
	"name" : "Sandstorm",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.81,
	"avgPrice" : 0.82
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Factory New",
	"marketPrice" : 13.48,
	"avgPrice" : 10.65
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.01,
	"avgPrice" : 0.97
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Field-Tested",
	"marketPrice" : 0.71,
	"avgPrice" : 0.68
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Well-Worn",
	"marketPrice" : 0.75,
	"avgPrice" : 0.73
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.75,
	"avgPrice" : 0.73
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 29.00,
	"avgPrice" : 25.43
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.02,
	"avgPrice" : 2.79
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.77,
	"avgPrice" : 1.77
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.68,
	"avgPrice" : 1.52
}, {
	"type" : "Galil AR",
	"name" : "Shattered",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.55,
	"avgPrice" : 1.54
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Factory New",
	"marketPrice" : 2.60,
	"avgPrice" : 2.39
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.80,
	"avgPrice" : 0.85
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Field-Tested",
	"marketPrice" : 0.53,
	"avgPrice" : 0.53
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Well-Worn",
	"marketPrice" : 0.52,
	"avgPrice" : 0.52
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.47,
	"avgPrice" : 0.49
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 11.35,
	"avgPrice" : 10.80
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.27,
	"avgPrice" : 3.13
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.56,
	"avgPrice" : 1.59
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.89,
	"avgPrice" : 1.43
}, {
	"type" : "Galil AR",
	"name" : "Stone Cold",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.54,
	"avgPrice" : 1.32
}, {
	"type" : "Galil AR",
	"name" : "Tuxedo",
	"quality" : "Factory New",
	"marketPrice" : 0.47,
	"avgPrice" : 0.49
}, {
	"type" : "Galil AR",
	"name" : "Tuxedo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.20,
	"avgPrice" : 0.23
}, {
	"type" : "Galil AR",
	"name" : "Tuxedo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.13,
	"avgPrice" : 0.14
}, {
	"type" : "Galil AR",
	"name" : "Tuxedo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "Galil AR",
	"name" : "Tuxedo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.16,
	"avgPrice" : 0.14
}, {
	"type" : "Galil AR",
	"name" : "Urban Rubble",
	"quality" : "Factory New",
	"marketPrice" : 1.74,
	"avgPrice" : 1.57
}, {
	"type" : "Galil AR",
	"name" : "Urban Rubble",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.39,
	"avgPrice" : 0.44
}, {
	"type" : "Galil AR",
	"name" : "Urban Rubble",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.21
}, {
	"type" : "Galil AR",
	"name" : "Urban Rubble",
	"quality" : "Well-Worn",
	"marketPrice" : 0.24,
	"avgPrice" : 0.25
}, {
	"type" : "Galil AR",
	"name" : "Urban Rubble",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.30
}, {
	"type" : "Galil AR",
	"name" : "VariCamo",
	"quality" : "Factory New",
	"marketPrice" : 0.09,
	"avgPrice" : 0.08
}, {
	"type" : "Galil AR",
	"name" : "VariCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "Galil AR",
	"name" : "VariCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Galil AR",
	"name" : "VariCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "Galil AR",
	"name" : "VariCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir Galil AR",
	"name" : "VariCamo",
	"quality" : "Factory New",
	"marketPrice" : 24.54,
	"avgPrice" : 17.92
}, {
	"type" : "Souvenir Galil AR",
	"name" : "VariCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.00,
	"avgPrice" : 6.82
}, {
	"type" : "Souvenir Galil AR",
	"name" : "VariCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 3.07,
	"avgPrice" : 2.33
}, {
	"type" : "Souvenir Galil AR",
	"name" : "VariCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 339.29,
	"avgPrice" : 23.46
}, {
	"type" : "Souvenir Galil AR",
	"name" : "VariCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 35.46,
	"avgPrice" : 4.02
}, {
	"type" : "Galil AR",
	"name" : "Winter Forest",
	"quality" : "Factory New",
	"marketPrice" : 31.58,
	"avgPrice" : 24.08
}, {
	"type" : "Galil AR",
	"name" : "Winter Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.87,
	"avgPrice" : 3.09
}, {
	"type" : "Galil AR",
	"name" : "Winter Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 1.19,
	"avgPrice" : 1.13
}, {
	"type" : "Galil AR",
	"name" : "Winter Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 3.98,
	"avgPrice" : 3.67
}, {
	"type" : "Galil AR",
	"name" : "Winter Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.98,
	"avgPrice" : 1.59
}, {
	"name" : "Gift Package",
	"marketPrice" : 0.81,
	"avgPrice" : 0.78
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Factory New",
	"marketPrice" : 6.10,
	"avgPrice" : 5.84
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.86,
	"avgPrice" : 0.81
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Field-Tested",
	"marketPrice" : 0.43,
	"avgPrice" : 0.44
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Well-Worn",
	"marketPrice" : 1.04,
	"avgPrice" : 0.93
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.47,
	"avgPrice" : 0.52
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 69.14,
	"avgPrice" : 62.46
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 5.82,
	"avgPrice" : 5.80
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.82,
	"avgPrice" : 2.88
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.15,
	"avgPrice" : 4.63
}, {
	"type" : "Glock-18",
	"name" : "Blue Fissure",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.08,
	"avgPrice" : 2.83
}, {
	"type" : "Glock-18",
	"name" : "Brass",
	"quality" : "Factory New",
	"marketPrice" : 15.53,
	"avgPrice" : 14.77
}, {
	"type" : "Glock-18",
	"name" : "Brass",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.48,
	"avgPrice" : 4.40
}, {
	"type" : "Glock-18",
	"name" : "Brass",
	"quality" : "Field-Tested",
	"marketPrice" : 1.92,
	"avgPrice" : 2.05
}, {
	"type" : "Glock-18",
	"name" : "Brass",
	"quality" : "Well-Worn",
	"marketPrice" : 1.74,
	"avgPrice" : 1.95
}, {
	"type" : "Glock-18",
	"name" : "Brass",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.68,
	"avgPrice" : 1.68
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Factory New",
	"marketPrice" : 0.41,
	"avgPrice" : 0.44
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Field-Tested",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Well-Worn",
	"marketPrice" : 0.24,
	"avgPrice" : 0.23
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.13,
	"avgPrice" : 0.14
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.31,
	"avgPrice" : 3.26
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.03,
	"avgPrice" : 1.12
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.70,
	"avgPrice" : 0.70
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.64,
	"avgPrice" : 1.43
}, {
	"type" : "Glock-18",
	"name" : "Bunsen Burner",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.80,
	"avgPrice" : 0.74
}, {
	"type" : "Glock-18",
	"name" : "Candy Apple",
	"quality" : "Factory New",
	"marketPrice" : 0.61,
	"avgPrice" : 0.62
}, {
	"type" : "Glock-18",
	"name" : "Candy Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.40,
	"avgPrice" : 0.41
}, {
	"type" : "Glock-18",
	"name" : "Candy Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 0.40,
	"avgPrice" : 0.39
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Candy Apple",
	"quality" : "Factory New",
	"marketPrice" : 274.24,
	"avgPrice" : 140.29
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Candy Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 60.73,
	"avgPrice" : 55.04
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Candy Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 84.26,
	"avgPrice" : 33.55
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Factory New",
	"marketPrice" : 0.18,
	"avgPrice" : 0.19
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Field-Tested",
	"marketPrice" : 0.12,
	"avgPrice" : 0.11
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Well-Worn",
	"marketPrice" : 0.16,
	"avgPrice" : 0.17
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.23,
	"avgPrice" : 1.24
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.70,
	"avgPrice" : 0.75
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.61,
	"avgPrice" : 0.62
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.03,
	"avgPrice" : 1.04
}, {
	"type" : "Glock-18",
	"name" : "Catacombs",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.84,
	"avgPrice" : 0.89
}, {
	"type" : "Glock-18",
	"name" : "Death Rattle",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "Glock-18",
	"name" : "Death Rattle",
	"quality" : "Field-Tested",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "Glock-18",
	"name" : "Death Rattle",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Glock-18",
	"name" : "Death Rattle",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Glock-18",
	"name" : "Dragon Tattoo",
	"quality" : "Factory New",
	"marketPrice" : 7.79,
	"avgPrice" : 7.74
}, {
	"type" : "Glock-18",
	"name" : "Dragon Tattoo",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.43,
	"avgPrice" : 7.95
}, {
	"type" : "Glock-18",
	"name" : "Dragon Tattoo",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 27.60,
	"avgPrice" : 27.44
}, {
	"type" : "Glock-18",
	"name" : "Dragon Tattoo",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 30.74,
	"avgPrice" : 27.03
}, {
	"type" : "Glock-18",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 332.00,
	"avgPrice" : 336.63
}, {
	"type" : "Glock-18",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 322.61
}, {
	"type" : "Glock-18",
	"name" : "Grinder",
	"quality" : "Factory New",
	"marketPrice" : 0.78,
	"avgPrice" : 0.77
}, {
	"type" : "Glock-18",
	"name" : "Grinder",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.58,
	"avgPrice" : 0.60
}, {
	"type" : "Glock-18",
	"name" : "Grinder",
	"quality" : "Field-Tested",
	"marketPrice" : 0.63,
	"avgPrice" : 0.65
}, {
	"type" : "Glock-18",
	"name" : "Grinder",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.71,
	"avgPrice" : 4.91
}, {
	"type" : "Glock-18",
	"name" : "Grinder",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.08,
	"avgPrice" : 3.38
}, {
	"type" : "Glock-18",
	"name" : "Grinder",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.26,
	"avgPrice" : 3.29
}, {
	"type" : "Glock-18",
	"name" : "Groundwater",
	"quality" : "Factory New",
	"marketPrice" : 15.75,
	"avgPrice" : 16.32
}, {
	"type" : "Glock-18",
	"name" : "Groundwater",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.03,
	"avgPrice" : 1.10
}, {
	"type" : "Glock-18",
	"name" : "Groundwater",
	"quality" : "Field-Tested",
	"marketPrice" : 0.75,
	"avgPrice" : 0.81
}, {
	"type" : "Glock-18",
	"name" : "Groundwater",
	"quality" : "Well-Worn",
	"marketPrice" : 0.83,
	"avgPrice" : 0.80
}, {
	"type" : "Glock-18",
	"name" : "Groundwater",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.92,
	"avgPrice" : 0.85
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Groundwater",
	"quality" : "Factory New",
	"marketPrice" : 73.04,
	"avgPrice" : 55.30
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Groundwater",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.03,
	"avgPrice" : 4.95
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Groundwater",
	"quality" : "Field-Tested",
	"marketPrice" : 2.35,
	"avgPrice" : 2.53
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Groundwater",
	"quality" : "Well-Worn",
	"marketPrice" : 2.50,
	"avgPrice" : 2.67
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Groundwater",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.26,
	"avgPrice" : 2.52
}, {
	"type" : "Glock-18",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 9.00,
	"avgPrice" : 8.63
}, {
	"type" : "Glock-18",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.53,
	"avgPrice" : 0.50
}, {
	"type" : "Glock-18",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 0.21,
	"avgPrice" : 0.21
}, {
	"type" : "Glock-18",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 0.28,
	"avgPrice" : 0.29
}, {
	"type" : "Glock-18",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 349.99,
	"avgPrice" : 145.81
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 12.08,
	"avgPrice" : 12.92
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 4.97,
	"avgPrice" : 4.78
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 6.06,
	"avgPrice" : 5.75
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.97,
	"avgPrice" : 4.53
}, {
	"type" : "Glock-18",
	"name" : "Reactor",
	"quality" : "Factory New",
	"marketPrice" : 5.65,
	"avgPrice" : 5.50
}, {
	"type" : "Glock-18",
	"name" : "Reactor",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.55,
	"avgPrice" : 2.81
}, {
	"type" : "Glock-18",
	"name" : "Reactor",
	"quality" : "Field-Tested",
	"marketPrice" : 1.61,
	"avgPrice" : 1.60
}, {
	"type" : "Glock-18",
	"name" : "Reactor",
	"quality" : "Well-Worn",
	"marketPrice" : 1.31,
	"avgPrice" : 1.37
}, {
	"type" : "Glock-18",
	"name" : "Reactor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.09,
	"avgPrice" : 1.02
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Reactor",
	"quality" : "Factory New",
	"marketPrice" : 80.89,
	"avgPrice" : 69.06
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Reactor",
	"quality" : "Minimal Wear",
	"marketPrice" : 18.40,
	"avgPrice" : 20.52
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Reactor",
	"quality" : "Field-Tested",
	"marketPrice" : 13.15,
	"avgPrice" : 12.24
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Reactor",
	"quality" : "Well-Worn",
	"marketPrice" : 8.05,
	"avgPrice" : 6.87
}, {
	"type" : "Souvenir Glock-18",
	"name" : "Reactor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.30,
	"avgPrice" : 4.94
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Factory New",
	"marketPrice" : 3.25,
	"avgPrice" : 3.20
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.06,
	"avgPrice" : 1.04
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Field-Tested",
	"marketPrice" : 0.55,
	"avgPrice" : 0.58
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Well-Worn",
	"marketPrice" : 0.51,
	"avgPrice" : 0.56
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.53,
	"avgPrice" : 0.54
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 23.14,
	"avgPrice" : 20.48
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 7.68,
	"avgPrice" : 7.33
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 4.17,
	"avgPrice" : 4.32
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.45,
	"avgPrice" : 3.33
}, {
	"type" : "Glock-18",
	"name" : "Royal Legion",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.03,
	"avgPrice" : 2.89
}, {
	"type" : "Glock-18",
	"name" : "Sand Dune",
	"quality" : "Factory New",
	"marketPrice" : 19.52,
	"avgPrice" : 20.73
}, {
	"type" : "Glock-18",
	"name" : "Sand Dune",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.61,
	"avgPrice" : 1.52
}, {
	"type" : "Glock-18",
	"name" : "Sand Dune",
	"quality" : "Field-Tested",
	"marketPrice" : 0.76,
	"avgPrice" : 0.78
}, {
	"type" : "Glock-18",
	"name" : "Sand Dune",
	"quality" : "Well-Worn",
	"marketPrice" : 1.20,
	"avgPrice" : 1.17
}, {
	"type" : "Glock-18",
	"name" : "Sand Dune",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.02,
	"avgPrice" : 2.15
}, {
	"type" : "Glock-18",
	"name" : "Steel Disruption",
	"quality" : "Factory New",
	"marketPrice" : 1.38,
	"avgPrice" : 1.35
}, {
	"type" : "Glock-18",
	"name" : "Steel Disruption",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.88,
	"avgPrice" : 0.89
}, {
	"type" : "Glock-18",
	"name" : "Steel Disruption",
	"quality" : "Field-Tested",
	"marketPrice" : 1.28,
	"avgPrice" : 1.17
}, {
	"type" : "Glock-18",
	"name" : "Steel Disruption",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.72,
	"avgPrice" : 5.40
}, {
	"type" : "Glock-18",
	"name" : "Steel Disruption",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.01,
	"avgPrice" : 3.08
}, {
	"type" : "Glock-18",
	"name" : "Steel Disruption",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.19,
	"avgPrice" : 3.11
}, {
	"type" : "Glock-18",
	"name" : "Twilight Galaxy",
	"quality" : "Factory New",
	"marketPrice" : 22.79,
	"avgPrice" : 23.13
}, {
	"type" : "Glock-18",
	"name" : "Twilight Galaxy",
	"quality" : "Minimal Wear",
	"marketPrice" : 20.90,
	"avgPrice" : 18.00
}, {
	"type" : "Glock-18",
	"name" : "Twilight Galaxy",
	"quality" : "Field-Tested",
	"marketPrice" : 18.93,
	"avgPrice" : 16.72
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Factory New",
	"marketPrice" : 7.52,
	"avgPrice" : 7.33
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.14,
	"avgPrice" : 4.44
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Field-Tested",
	"marketPrice" : 3.19,
	"avgPrice" : 3.19
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Well-Worn",
	"marketPrice" : 3.50,
	"avgPrice" : 3.77
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.30,
	"avgPrice" : 2.46
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 40.33,
	"avgPrice" : 38.42
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 22.46,
	"avgPrice" : 22.32
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 13.72,
	"avgPrice" : 13.14
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 15.35,
	"avgPrice" : 14.37
}, {
	"type" : "Glock-18",
	"name" : "Water Elemental",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 8.91,
	"avgPrice" : 8.69
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Factory New",
	"marketPrice" : 0.39,
	"avgPrice" : 0.40
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.14,
	"avgPrice" : 0.15
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Well-Worn",
	"marketPrice" : 0.28,
	"avgPrice" : 0.27
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.12
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.17,
	"avgPrice" : 2.99
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.15,
	"avgPrice" : 1.07
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.69,
	"avgPrice" : 0.66
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.63,
	"avgPrice" : 1.40
}, {
	"type" : "Glock-18",
	"name" : "Wraiths",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.70,
	"avgPrice" : 0.69
}, {
	"type" : "Gut Knife",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 100.00,
	"avgPrice" : 92.28
}, {
	"type" : "Gut Knife",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 73.09,
	"avgPrice" : 71.00
}, {
	"type" : "Gut Knife",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 68.16,
	"avgPrice" : 66.79
}, {
	"type" : "Gut Knife",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 64.92,
	"avgPrice" : 64.39
}, {
	"type" : "Gut Knife",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 69.62,
	"avgPrice" : 63.13
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 151.14,
	"avgPrice" : 125.95
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 101.12,
	"avgPrice" : 93.69
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 101.12,
	"avgPrice" : 85.89
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 85.92,
	"avgPrice" : 81.32
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 98.69,
	"avgPrice" : 76.38
}, {
	"type" : "Gut Knife",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 107.36
}, {
	"type" : "Gut Knife",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 55.61,
	"avgPrice" : 57.87
}, {
	"type" : "Gut Knife",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 52.25,
	"avgPrice" : 50.30
}, {
	"type" : "Gut Knife",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 59.40,
	"avgPrice" : 50.53
}, {
	"type" : "Gut Knife",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 51.02,
	"avgPrice" : 48.48
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 93.81,
	"avgPrice" : 75.25
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 68.96,
	"avgPrice" : 57.09
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 259.74,
	"avgPrice" : 61.01
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 65.43,
	"avgPrice" : 59.28
}, {
	"type" : "Gut Knife",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 135.99,
	"avgPrice" : 107.44
}, {
	"type" : "Gut Knife",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 88.75,
	"avgPrice" : 86.09
}, {
	"type" : "Gut Knife",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 79.18,
	"avgPrice" : 76.54
}, {
	"type" : "Gut Knife",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 76.98,
	"avgPrice" : 73.82
}, {
	"type" : "Gut Knife",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 72.87,
	"avgPrice" : 71.15
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 139.00,
	"avgPrice" : 162.27
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 108.95,
	"avgPrice" : 105.41
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 109.25,
	"avgPrice" : 107.57
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 150.00,
	"avgPrice" : 79.65
}, {
	"type" : "Gut Knife",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 545.00
}, {
	"type" : "Gut Knife",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 115.00,
	"avgPrice" : 112.42
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 103.35,
	"avgPrice" : 94.85
}, {
	"type" : "Gut Knife",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 78.50,
	"avgPrice" : 75.04
}, {
	"type" : "Gut Knife",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 56.17,
	"avgPrice" : 52.41
}, {
	"type" : "Gut Knife",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 49.06,
	"avgPrice" : 48.87
}, {
	"type" : "Gut Knife",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 51.84,
	"avgPrice" : 48.99
}, {
	"type" : "Gut Knife",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 52.00,
	"avgPrice" : 49.04
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 224.71,
	"avgPrice" : 60.66
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 69.00,
	"avgPrice" : 57.94
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 89.87,
	"avgPrice" : 61.86
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 69.00,
	"avgPrice" : 59.15
}, {
	"type" : "Gut Knife",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 112.36,
	"avgPrice" : 84.19
}, {
	"type" : "Gut Knife",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 58.12,
	"avgPrice" : 58.71
}, {
	"type" : "Gut Knife",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 51.36,
	"avgPrice" : 50.22
}, {
	"type" : "Gut Knife",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 51.70,
	"avgPrice" : 49.56
}, {
	"type" : "Gut Knife",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 52.02,
	"avgPrice" : 49.97
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 95.50,
	"avgPrice" : 85.63
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 68.97,
	"avgPrice" : 63.93
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 85.84,
	"avgPrice" : 65.00
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 63.99,
	"avgPrice" : 62.65
}, {
	"type" : "Gut Knife",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 113.47,
	"avgPrice" : 105.78
}, {
	"type" : "Gut Knife",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 94.30,
	"avgPrice" : 92.04
}, {
	"type" : "Gut Knife",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 77.07,
	"avgPrice" : 74.99
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 162.90,
	"avgPrice" : 161.03
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 131.10,
	"avgPrice" : 126.51
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 110.86,
	"avgPrice" : 92.96
}, {
	"type" : "Gut Knife",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 97.17,
	"avgPrice" : 74.97
}, {
	"type" : "Gut Knife",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 65.98,
	"avgPrice" : 64.02
}, {
	"type" : "Gut Knife",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 64.59,
	"avgPrice" : 59.47
}, {
	"type" : "Gut Knife",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 56.18,
	"avgPrice" : 59.08
}, {
	"type" : "Gut Knife",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 59.80,
	"avgPrice" : 59.38
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 93.01,
	"avgPrice" : 87.34
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 106.00,
	"avgPrice" : 72.80
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 84.25,
	"avgPrice" : 74.26
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 84.26,
	"avgPrice" : 75.02
}, {
	"type" : "Gut Knife",
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 112.13,
	"avgPrice" : 117.02
}, {
	"type" : "Gut Knife",
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 119.94,
	"avgPrice" : 110.40
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 179.90,
	"avgPrice" : 162.75
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 400.00,
	"avgPrice" : 138.71
}, {
	"type" : "Gut Knife",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"marketPrice" : 322.00,
	"avgPrice" : 227.58
}, {
	"type" : "Gut Knife",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 90.73,
	"avgPrice" : 85.08
}, {
	"type" : "Gut Knife",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 57.50,
	"avgPrice" : 59.51
}, {
	"type" : "Gut Knife",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 63.17,
	"avgPrice" : 59.93
}, {
	"type" : "Gut Knife",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 59.84,
	"avgPrice" : 53.85
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 135.82,
	"avgPrice" : 119.48
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 80.45,
	"avgPrice" : 74.85
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 79.90,
	"avgPrice" : 66.90
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 124.10,
	"avgPrice" : 75.30
}, {
	"type" : "Gut Knife",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 119.27,
	"avgPrice" : 78.98
}, {
	"type" : "Gut Knife",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 60.66,
	"avgPrice" : 58.09
}, {
	"type" : "Gut Knife",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 51.47,
	"avgPrice" : 50.74
}, {
	"type" : "Gut Knife",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 57.19,
	"avgPrice" : 52.89
}, {
	"type" : "Gut Knife",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 51.53,
	"avgPrice" : 49.30
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 86.73,
	"avgPrice" : 74.84
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 67.19,
	"avgPrice" : 63.87
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 78.66,
	"avgPrice" : 69.03
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 101.12,
	"avgPrice" : 71.40
}, {
	"name" : "Gut Knife",
	"marketPrice" : 65.68,
	"avgPrice" : 64.77
}, {
	"name" : "Gut Knife",
	"statTrak" : 1,
	"marketPrice" : 101.20,
	"avgPrice" : 88.63
}, {
	"type" : "Huntsman Knife",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 196.62,
	"avgPrice" : 177.42
}, {
	"type" : "Huntsman Knife",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 128.54,
	"avgPrice" : 121.31
}, {
	"type" : "Huntsman Knife",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 114.43,
	"avgPrice" : 107.87
}, {
	"type" : "Huntsman Knife",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 101.21,
	"avgPrice" : 104.11
}, {
	"type" : "Huntsman Knife",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 102.24,
	"avgPrice" : 101.32
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 455.00
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 180.00,
	"avgPrice" : 178.22
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 188.88,
	"avgPrice" : 156.36
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 150.00,
	"avgPrice" : 151.33
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0,
	"avgPrice" : 121.29
}, {
	"type" : "Huntsman Knife",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 191.94,
	"avgPrice" : 163.62
}, {
	"type" : "Huntsman Knife",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 95.05,
	"avgPrice" : 93.11
}, {
	"type" : "Huntsman Knife",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 69.39,
	"avgPrice" : 67.88
}, {
	"type" : "Huntsman Knife",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 68.46,
	"avgPrice" : 67.13
}, {
	"type" : "Huntsman Knife",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 73.04,
	"avgPrice" : 66.14
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 875.00
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 134.83,
	"avgPrice" : 120.87
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 95.35,
	"avgPrice" : 87.70
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 96.03,
	"avgPrice" : 89.05
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 115.00,
	"avgPrice" : 90.31
}, {
	"type" : "Huntsman Knife",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 202.23,
	"avgPrice" : 205.92
}, {
	"type" : "Huntsman Knife",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 136.99,
	"avgPrice" : 136.04
}, {
	"type" : "Huntsman Knife",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 116.70,
	"avgPrice" : 116.25
}, {
	"type" : "Huntsman Knife",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 118.85,
	"avgPrice" : 115.04
}, {
	"type" : "Huntsman Knife",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 117.57,
	"avgPrice" : 113.59
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 687.50
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 259.99,
	"avgPrice" : 217.15
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 200.25,
	"avgPrice" : 193.37
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 190.99,
	"avgPrice" : 176.32
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 183.11,
	"avgPrice" : 178.88
}, {
	"type" : "Huntsman Knife",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 806.25
}, {
	"type" : "Huntsman Knife",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 247.86,
	"avgPrice" : 243.05
}, {
	"type" : "Huntsman Knife",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 114.97,
	"avgPrice" : 115.66
}, {
	"type" : "Huntsman Knife",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 129.81,
	"avgPrice" : 110.66
}, {
	"type" : "Huntsman Knife",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 103.00,
	"avgPrice" : 96.51
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 506.25
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 239.02,
	"avgPrice" : 190.19
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 213.47,
	"avgPrice" : 163.45
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 387.60,
	"avgPrice" : 240.85
}, {
	"type" : "Huntsman Knife",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 236.91,
	"avgPrice" : 234.54
}, {
	"type" : "Huntsman Knife",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 280.87,
	"avgPrice" : 238.50
}, {
	"type" : "Gut Knife",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 64.59,
	"avgPrice" : 66.81
}, {
	"type" : "Gut Knife",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 69.65,
	"avgPrice" : 72.04
}, {
	"type" : "Gut Knife",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 62.92,
	"avgPrice" : 62.37
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 207.65,
	"avgPrice" : 157.81
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 94.32,
	"avgPrice" : 87.69
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 112.35,
	"avgPrice" : 97.92
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 80.61,
	"avgPrice" : 72.75
}, {
	"type" : "Gut Knife",
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 95.56,
	"avgPrice" : 89.25
}, {
	"type" : "Gut Knife",
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 78.81,
	"avgPrice" : 76.58
}, {
	"type" : "Gut Knife",
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 71.23,
	"avgPrice" : 69.07
}, {
	"type" : "Gut Knife",
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 85.00,
	"avgPrice" : 72.80
}, {
	"type" : "Gut Knife",
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 115.00,
	"avgPrice" : 68.50
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 151.66,
	"avgPrice" : 145.16
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 133.95,
	"avgPrice" : 118.65
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 110.00,
	"avgPrice" : 103.53
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 93.19,
	"avgPrice" : 90.61
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 93.00,
	"avgPrice" : 79.87
}, {
	"type" : "Gut Knife",
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 96.68,
	"avgPrice" : 100.72
}, {
	"type" : "Gut Knife",
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 104.23,
	"avgPrice" : 108.64
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 165.00,
	"avgPrice" : 148.88
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 162.78,
	"avgPrice" : 144.64
}, {
	"type" : "Gut Knife",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 114.92,
	"avgPrice" : 113.88
}, {
	"type" : "Gut Knife",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 150.00,
	"avgPrice" : 116.06
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 166.00,
	"avgPrice" : 153.49
}, {
	"type" : "Gut Knife",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 112.36,
	"avgPrice" : 86.65
}, {
	"type" : "Gut Knife",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 61.07,
	"avgPrice" : 57.95
}, {
	"type" : "Gut Knife",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 51.94,
	"avgPrice" : 50.25
}, {
	"type" : "Gut Knife",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 52.30,
	"avgPrice" : 50.49
}, {
	"type" : "Gut Knife",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 51.65,
	"avgPrice" : 49.91
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 250.00
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 123.41,
	"avgPrice" : 72.87
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 67.04,
	"avgPrice" : 61.51
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 127.70,
	"avgPrice" : 68.32
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 67.67,
	"avgPrice" : 63.83
}, {
	"type" : "Gut Knife",
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 118.22,
	"avgPrice" : 118.92
}, {
	"type" : "Gut Knife",
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 125.00,
	"avgPrice" : 126.52
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 187.62,
	"avgPrice" : 190.89
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 235.92,
	"avgPrice" : 132.04
}, {
	"type" : "Gut Knife",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 238.32,
	"avgPrice" : 177.22
}, {
	"type" : "Gut Knife",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 82.77,
	"avgPrice" : 80.28
}, {
	"type" : "Gut Knife",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 57.85,
	"avgPrice" : 54.93
}, {
	"type" : "Gut Knife",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 61.79,
	"avgPrice" : 53.46
}, {
	"type" : "Gut Knife",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 55.00,
	"avgPrice" : 52.33
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 125.37,
	"avgPrice" : 121.55
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 76.50,
	"avgPrice" : 73.55
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 128.70,
	"avgPrice" : 104.77
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 67.19,
	"avgPrice" : 58.39
}, {
	"type" : "Gut Knife",
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 69.00,
	"avgPrice" : 69.62
}, {
	"type" : "Gut Knife",
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 61.79,
	"avgPrice" : 60.73
}, {
	"type" : "Gut Knife",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 250.55,
	"avgPrice" : 183.75
}, {
	"type" : "G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Factory New",
	"marketPrice" : 200.00,
	"avgPrice" : 39.36
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.02,
	"avgPrice" : 2.20
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.97,
	"avgPrice" : 0.89
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 4.00,
	"avgPrice" : 1.70
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.06,
	"avgPrice" : 2.82
}, {
	"type" : "G3SG1",
	"name" : "Murky",
	"quality" : "Factory New",
	"marketPrice" : 0.34,
	"avgPrice" : 0.28
}, {
	"type" : "G3SG1",
	"name" : "Murky",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.21,
	"avgPrice" : 0.21
}, {
	"type" : "G3SG1",
	"name" : "Murky",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.22
}, {
	"type" : "G3SG1",
	"name" : "Murky",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.39,
	"avgPrice" : 1.26
}, {
	"type" : "G3SG1",
	"name" : "Murky",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.78,
	"avgPrice" : 0.82
}, {
	"type" : "G3SG1",
	"name" : "Murky",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.76,
	"avgPrice" : 0.80
}, {
	"type" : "G3SG1",
	"name" : "Orange Kimono",
	"quality" : "Factory New",
	"marketPrice" : 0.34,
	"avgPrice" : 0.33
}, {
	"type" : "G3SG1",
	"name" : "Orange Kimono",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.15,
	"avgPrice" : 0.14
}, {
	"type" : "G3SG1",
	"name" : "Orange Kimono",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "G3SG1",
	"name" : "Orange Kimono",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "G3SG1",
	"name" : "Orange Kimono",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "G3SG1",
	"name" : "Polar Camo",
	"quality" : "Factory New",
	"marketPrice" : 0.29,
	"avgPrice" : 0.28
}, {
	"type" : "G3SG1",
	"name" : "Polar Camo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "G3SG1",
	"name" : "Polar Camo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "G3SG1",
	"name" : "Polar Camo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "G3SG1",
	"name" : "Polar Camo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Polar Camo",
	"quality" : "Factory New",
	"marketPrice" : 32.29,
	"avgPrice" : 23.38
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Polar Camo",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.58,
	"avgPrice" : 1.71
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Polar Camo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.43,
	"avgPrice" : 0.39
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Polar Camo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.78,
	"avgPrice" : 1.01
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Polar Camo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.31,
	"avgPrice" : 0.32
}, {
	"type" : "G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 1.95,
	"avgPrice" : 1.78
}, {
	"type" : "G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.26,
	"avgPrice" : 0.19
}, {
	"type" : "G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.13,
	"avgPrice" : 0.11
}, {
	"type" : "G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.83,
	"avgPrice" : 1.99
}, {
	"type" : "G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.19,
	"avgPrice" : 0.19
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 3.87,
	"avgPrice" : 3.68
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.36,
	"avgPrice" : 0.34
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.21
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.27,
	"avgPrice" : 0.24
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.23,
	"avgPrice" : 0.23
}, {
	"type" : "G3SG1",
	"name" : "The Executioner",
	"quality" : "Minimal Wear",
	"marketPrice" : 23.08,
	"avgPrice" : 19.08
}, {
	"type" : "G3SG1",
	"name" : "The Executioner",
	"quality" : "Field-Tested",
	"marketPrice" : 1.50,
	"avgPrice" : 1.44
}, {
	"type" : "G3SG1",
	"name" : "The Executioner",
	"quality" : "Well-Worn",
	"marketPrice" : 1.41,
	"avgPrice" : 1.38
}, {
	"type" : "G3SG1",
	"name" : "The Executioner",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.38,
	"avgPrice" : 1.34
}, {
	"type" : "G3SG1",
	"name" : "The Executioner",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 404.46,
	"avgPrice" : 255.05
}, {
	"type" : "G3SG1",
	"name" : "The Executioner",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 5.47,
	"avgPrice" : 5.22
}, {
	"type" : "G3SG1",
	"name" : "The Executioner",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 4.69,
	"avgPrice" : 4.64
}, {
	"type" : "G3SG1",
	"name" : "The Executioner",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 4.16,
	"avgPrice" : 4.14
}, {
	"type" : "G3SG1",
	"name" : "VariCamo",
	"quality" : "Factory New",
	"marketPrice" : 0.09,
	"avgPrice" : 0.07
}, {
	"type" : "G3SG1",
	"name" : "VariCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "G3SG1",
	"name" : "VariCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "G3SG1",
	"name" : "VariCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "G3SG1",
	"name" : "VariCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Karambit",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 543.75
}, {
	"type" : "Karambit",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 345.00,
	"avgPrice" : 332.16
}, {
	"type" : "Karambit",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 319.06,
	"avgPrice" : 310.52
}, {
	"type" : "Karambit",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 225.00,
	"avgPrice" : 225.33
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 1267.50
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 405.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 0,
	"avgPrice" : 468.75
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 352.77,
	"avgPrice" : 322.69
}, {
	"type" : "Karambit",
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 373.75
}, {
	"type" : "Karambit",
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 342.38,
	"avgPrice" : 344.17
}, {
	"type" : "Karambit",
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 290.69,
	"avgPrice" : 289.34
}, {
	"type" : "Karambit",
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 280.06,
	"avgPrice" : 271.85
}, {
	"type" : "Karambit",
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 272.39,
	"avgPrice" : 246.83
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 518.75
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 581.25
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 400.00,
	"avgPrice" : 335.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 370.00,
	"avgPrice" : 358.43
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 400.00,
	"avgPrice" : 303.75
}, {
	"type" : "Karambit",
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 451.25
}, {
	"type" : "Karambit",
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 597.50
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 661.25
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 625.00
}, {
	"type" : "Karambit",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 610.00
}, {
	"type" : "Karambit",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 558.75
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 930.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 681.25
}, {
	"type" : "Karambit",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 301.89
}, {
	"type" : "Karambit",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 174.15,
	"avgPrice" : 170.53
}, {
	"type" : "Karambit",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 140.07,
	"avgPrice" : 139.56
}, {
	"type" : "Karambit",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 150.15,
	"avgPrice" : 138.08
}, {
	"type" : "Karambit",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 134.37,
	"avgPrice" : 134.01
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 255.85,
	"avgPrice" : 199.34
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 202.23,
	"avgPrice" : 177.77
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 258.38,
	"avgPrice" : 176.34
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 222.47,
	"avgPrice" : 145.01
}, {
	"type" : "Karambit",
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 690.00
}, {
	"type" : "Karambit",
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 656.25
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1191.25
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 790.00
}, {
	"type" : "Karambit",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1281.25
}, {
	"type" : "Karambit",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 329.74,
	"avgPrice" : 326.43
}, {
	"type" : "Karambit",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 227.58,
	"avgPrice" : 220.88
}, {
	"type" : "Karambit",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 224.71,
	"avgPrice" : 209.68
}, {
	"type" : "Karambit",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 203.29,
	"avgPrice" : 188.39
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 456.25
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 291.99,
	"avgPrice" : 283.49
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 248.63,
	"avgPrice" : 228.73
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 258.40,
	"avgPrice" : 241.75
}, {
	"type" : "Karambit",
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 225.00,
	"avgPrice" : 203.89
}, {
	"type" : "Karambit",
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 194.37,
	"avgPrice" : 196.10
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 398.45
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 350.00,
	"avgPrice" : 352.41
}, {
	"type" : "Huntsman Knife",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 178.62,
	"avgPrice" : 134.99
}, {
	"type" : "Huntsman Knife",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 93.28,
	"avgPrice" : 90.02
}, {
	"type" : "Huntsman Knife",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 66.29,
	"avgPrice" : 65.46
}, {
	"type" : "Huntsman Knife",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 67.43,
	"avgPrice" : 66.31
}, {
	"type" : "Huntsman Knife",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 64.90,
	"avgPrice" : 62.25
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 382.50,
	"avgPrice" : 391.44
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 117.21,
	"avgPrice" : 121.08
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 96.88,
	"avgPrice" : 88.78
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 112.36,
	"avgPrice" : 79.26
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 100.00,
	"avgPrice" : 63.54
}, {
	"type" : "Huntsman Knife",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 687.50
}, {
	"type" : "Huntsman Knife",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 157.29,
	"avgPrice" : 160.30
}, {
	"type" : "Huntsman Knife",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 101.72,
	"avgPrice" : 94.86
}, {
	"type" : "Huntsman Knife",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 99.68,
	"avgPrice" : 86.83
}, {
	"type" : "Huntsman Knife",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 90.44,
	"avgPrice" : 88.92
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 3250.00
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 312.35,
	"avgPrice" : 317.55
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 157.91,
	"avgPrice" : 142.29
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 258.40,
	"avgPrice" : 164.07
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 109.99,
	"avgPrice" : 115.67
}, {
	"type" : "Huntsman Knife",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 224.71,
	"avgPrice" : 120.00
}, {
	"type" : "Huntsman Knife",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 81.13,
	"avgPrice" : 77.09
}, {
	"type" : "Huntsman Knife",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 64.00,
	"avgPrice" : 62.03
}, {
	"type" : "Huntsman Knife",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 72.82,
	"avgPrice" : 59.58
}, {
	"type" : "Huntsman Knife",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 63.36,
	"avgPrice" : 61.88
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 103.00,
	"avgPrice" : 107.08
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 97.64,
	"avgPrice" : 83.13
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 97.75,
	"avgPrice" : 66.97
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 95.79,
	"avgPrice" : 79.37
}, {
	"type" : "Huntsman Knife",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 404.46,
	"avgPrice" : 140.13
}, {
	"type" : "Huntsman Knife",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 89.79,
	"avgPrice" : 88.70
}, {
	"type" : "Huntsman Knife",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 64.06,
	"avgPrice" : 65.01
}, {
	"type" : "Huntsman Knife",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 75.90,
	"avgPrice" : 71.08
}, {
	"type" : "Huntsman Knife",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 67.80,
	"avgPrice" : 64.17
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 375.76,
	"avgPrice" : 200.00
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 146.05,
	"avgPrice" : 126.80
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 100.90,
	"avgPrice" : 89.24
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 101.11,
	"avgPrice" : 77.50
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 95.50,
	"avgPrice" : 79.40
}, {
	"type" : "Huntsman Knife",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 272.39,
	"avgPrice" : 275.27
}, {
	"type" : "Huntsman Knife",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 210.00,
	"avgPrice" : 213.39
}, {
	"type" : "Huntsman Knife",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 167.55,
	"avgPrice" : 164.57
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 407.50
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 400.82,
	"avgPrice" : 324.80
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 275.25,
	"avgPrice" : 195.14
}, {
	"type" : "Huntsman Knife",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 142.11,
	"avgPrice" : 117.44
}, {
	"type" : "Huntsman Knife",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 95.60,
	"avgPrice" : 96.33
}, {
	"type" : "Huntsman Knife",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 87.76,
	"avgPrice" : 88.58
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 295.17,
	"avgPrice" : 228.30
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 262.39,
	"avgPrice" : 261.95
}, {
	"type" : "Karambit",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 254.91,
	"avgPrice" : 225.00
}, {
	"type" : "Karambit",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 140.00,
	"avgPrice" : 141.07
}, {
	"type" : "Karambit",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 125.78,
	"avgPrice" : 126.37
}, {
	"type" : "Karambit",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 129.19,
	"avgPrice" : 126.94
}, {
	"type" : "Karambit",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 127.97,
	"avgPrice" : 122.08
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 387.42
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 256.00,
	"avgPrice" : 192.92
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 167.96,
	"avgPrice" : 157.69
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 170.39,
	"avgPrice" : 136.44
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 167.96,
	"avgPrice" : 140.36
}, {
	"type" : "Karambit",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 331.25
}, {
	"type" : "Karambit",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 179.71,
	"avgPrice" : 172.91
}, {
	"type" : "Karambit",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 131.99,
	"avgPrice" : 135.19
}, {
	"type" : "Karambit",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 131.69,
	"avgPrice" : 129.53
}, {
	"type" : "Karambit",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 132.54,
	"avgPrice" : 131.56
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 223.60
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 187.34,
	"avgPrice" : 169.07
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 249.98,
	"avgPrice" : 153.38
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 194.92,
	"avgPrice" : 162.37
}, {
	"type" : "Karambit",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 458.75
}, {
	"type" : "Karambit",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 403.45,
	"avgPrice" : 366.25
}, {
	"type" : "Karambit",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 345.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 683.75
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 440.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 448.75
}, {
	"type" : "Karambit",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 350.00,
	"avgPrice" : 333.50
}, {
	"type" : "Karambit",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 251.93,
	"avgPrice" : 239.60
}, {
	"type" : "Karambit",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 225.00,
	"avgPrice" : 225.15
}, {
	"type" : "Karambit",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 212.40,
	"avgPrice" : 204.42
}, {
	"type" : "Karambit",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 200.41,
	"avgPrice" : 204.39
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 753.75
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 348.29,
	"avgPrice" : 300.08
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 303.62,
	"avgPrice" : 262.84
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 271.89,
	"avgPrice" : 242.96
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 233.70,
	"avgPrice" : 208.61
}, {
	"type" : "Karambit",
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 527.50
}, {
	"type" : "Karambit",
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 490.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 903.75
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 1031.25
}, {
	"type" : "Karambit",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1177.50
}, {
	"type" : "Karambit",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 385.29,
	"avgPrice" : 370.19
}, {
	"type" : "Karambit",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 233.36,
	"avgPrice" : 226.11
}, {
	"type" : "Karambit",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 226.00,
	"avgPrice" : 220.51
}, {
	"type" : "Karambit",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 194.24,
	"avgPrice" : 189.63
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 357.50
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 297.05,
	"avgPrice" : 277.49
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 365.55,
	"avgPrice" : 334.62
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 280.33,
	"avgPrice" : 211.56
}, {
	"type" : "Karambit",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 430.00
}, {
	"type" : "Karambit",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 209.57,
	"avgPrice" : 188.91
}, {
	"type" : "Karambit",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 143.37,
	"avgPrice" : 140.66
}, {
	"type" : "Karambit",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 144.37,
	"avgPrice" : 133.78
}, {
	"type" : "Karambit",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 135.39,
	"avgPrice" : 129.12
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 365.13,
	"avgPrice" : 236.43
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 189.00,
	"avgPrice" : 170.20
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 160.21,
	"avgPrice" : 179.49
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 219.65,
	"avgPrice" : 149.67
}, {
	"name" : "Karambit",
	"marketPrice" : 268.80,
	"avgPrice" : 264.08
}, {
	"name" : "Karambit",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 396.43
}, {
	"type" : "M249",
	"name" : "Blizzard Marbleized",
	"quality" : "Factory New",
	"marketPrice" : 46.00,
	"avgPrice" : 46.95
}, {
	"type" : "M249",
	"name" : "Blizzard Marbleized",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.98,
	"avgPrice" : 3.11
}, {
	"type" : "M249",
	"name" : "Blizzard Marbleized",
	"quality" : "Field-Tested",
	"marketPrice" : 1.70,
	"avgPrice" : 1.45
}, {
	"type" : "M249",
	"name" : "Blizzard Marbleized",
	"quality" : "Well-Worn",
	"marketPrice" : 4.37,
	"avgPrice" : 38.83
}, {
	"type" : "M249",
	"name" : "Blizzard Marbleized",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.60,
	"avgPrice" : 11.78
}, {
	"type" : "M249",
	"name" : "Contrast Spray",
	"quality" : "Factory New",
	"marketPrice" : 0.50,
	"avgPrice" : 0.43
}, {
	"type" : "M249",
	"name" : "Contrast Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "M249",
	"name" : "Contrast Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "M249",
	"name" : "Contrast Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 0.07,
	"avgPrice" : 0.04
}, {
	"type" : "M249",
	"name" : "Contrast Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir M249",
	"name" : "Contrast Spray",
	"quality" : "Factory New",
	"marketPrice" : 7.88,
	"avgPrice" : 5.86
}, {
	"type" : "Souvenir M249",
	"name" : "Contrast Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.47,
	"avgPrice" : 0.47
}, {
	"type" : "Souvenir M249",
	"name" : "Contrast Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.25,
	"avgPrice" : 0.22
}, {
	"type" : "Souvenir M249",
	"name" : "Contrast Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 0.35,
	"avgPrice" : 0.32
}, {
	"type" : "Souvenir M249",
	"name" : "Contrast Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.29,
	"avgPrice" : 0.28
}, {
	"type" : "M249",
	"name" : "Gator Mesh",
	"quality" : "Factory New",
	"marketPrice" : 0.09,
	"avgPrice" : 0.08
}, {
	"type" : "M249",
	"name" : "Gator Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "M249",
	"name" : "Gator Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "M249",
	"name" : "Gator Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "M249",
	"name" : "Gator Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir M249",
	"name" : "Gator Mesh",
	"quality" : "Factory New",
	"marketPrice" : 26.07,
	"avgPrice" : 14.41
}, {
	"type" : "Souvenir M249",
	"name" : "Gator Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 9.40,
	"avgPrice" : 3.48
}, {
	"type" : "Souvenir M249",
	"name" : "Gator Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 5.65,
	"avgPrice" : 2.73
}, {
	"type" : "Souvenir M249",
	"name" : "Gator Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 12.43,
	"avgPrice" : 13.36
}, {
	"type" : "Souvenir M249",
	"name" : "Gator Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 23.99,
	"avgPrice" : 21.91
}, {
	"type" : "M249",
	"name" : "Impact Drill",
	"quality" : "Factory New",
	"marketPrice" : 0.50,
	"avgPrice" : 0.43
}, {
	"type" : "M249",
	"name" : "Impact Drill",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "M249",
	"name" : "Impact Drill",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "M249",
	"name" : "Impact Drill",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "M249",
	"name" : "Impact Drill",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "M249",
	"name" : "Jungle DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 5.17,
	"avgPrice" : 4.78
}, {
	"type" : "M249",
	"name" : "Jungle DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.87,
	"avgPrice" : 0.96
}, {
	"type" : "M249",
	"name" : "Jungle DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.60,
	"avgPrice" : 0.48
}, {
	"type" : "M249",
	"name" : "Jungle DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 1.09,
	"avgPrice" : 1.12
}, {
	"type" : "M249",
	"name" : "Jungle DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.62,
	"avgPrice" : 0.73
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Factory New",
	"marketPrice" : 0.43,
	"avgPrice" : 0.37
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.20,
	"avgPrice" : 0.19
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.15
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Well-Worn",
	"marketPrice" : 0.46,
	"avgPrice" : 3.42
}, {
	"type" : "G3SG1",
	"name" : "Azure Zebra",
	"quality" : "Field-Tested",
	"marketPrice" : 0.35,
	"avgPrice" : 0.33
}, {
	"type" : "G3SG1",
	"name" : "Azure Zebra",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.34,
	"avgPrice" : 1.26
}, {
	"type" : "G3SG1",
	"name" : "Azure Zebra",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.06,
	"avgPrice" : 0.97
}, {
	"type" : "G3SG1",
	"name" : "Azure Zebra",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.01,
	"avgPrice" : 0.91
}, {
	"type" : "G3SG1",
	"name" : "Chronos",
	"quality" : "Factory New",
	"marketPrice" : 24.81,
	"avgPrice" : 23.51
}, {
	"type" : "G3SG1",
	"name" : "Chronos",
	"quality" : "Minimal Wear",
	"marketPrice" : 21.96,
	"avgPrice" : 20.14
}, {
	"type" : "G3SG1",
	"name" : "Chronos",
	"quality" : "Field-Tested",
	"marketPrice" : 19.98,
	"avgPrice" : 18.33
}, {
	"type" : "G3SG1",
	"name" : "Chronos",
	"quality" : "Well-Worn",
	"marketPrice" : 25.00,
	"avgPrice" : 20.22
}, {
	"type" : "G3SG1",
	"name" : "Contractor",
	"quality" : "Factory New",
	"marketPrice" : 5.00,
	"avgPrice" : 5.23
}, {
	"type" : "G3SG1",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.32,
	"avgPrice" : 0.33
}, {
	"type" : "G3SG1",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 0.21,
	"avgPrice" : 0.24
}, {
	"type" : "G3SG1",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 0.30,
	"avgPrice" : 0.32
}, {
	"type" : "G3SG1",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.74,
	"avgPrice" : 3.91
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Factory New",
	"marketPrice" : 4.95,
	"avgPrice" : 4.37
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.06,
	"avgPrice" : 1.00
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Field-Tested",
	"marketPrice" : 0.66,
	"avgPrice" : 0.69
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Well-Worn",
	"marketPrice" : 1.00,
	"avgPrice" : 0.97
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.80,
	"avgPrice" : 0.75
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 31.00,
	"avgPrice" : 29.24
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.61,
	"avgPrice" : 2.78
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.79,
	"avgPrice" : 1.58
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.96,
	"avgPrice" : 1.78
}, {
	"type" : "G3SG1",
	"name" : "Demeter",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.70,
	"avgPrice" : 1.71
}, {
	"type" : "G3SG1",
	"name" : "Desert Storm",
	"quality" : "Factory New",
	"marketPrice" : 0.16,
	"avgPrice" : 0.14
}, {
	"type" : "G3SG1",
	"name" : "Desert Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "G3SG1",
	"name" : "Desert Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "G3SG1",
	"name" : "Desert Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "G3SG1",
	"name" : "Desert Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Desert Storm",
	"quality" : "Factory New",
	"marketPrice" : 8.43,
	"avgPrice" : 7.67
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Desert Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.82,
	"avgPrice" : 0.79
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Desert Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.24
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Desert Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.39,
	"avgPrice" : 0.38
}, {
	"type" : "Souvenir G3SG1",
	"name" : "Desert Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.26,
	"avgPrice" : 0.26
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Factory New",
	"marketPrice" : 6.90,
	"avgPrice" : 6.53
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.87,
	"avgPrice" : 3.97
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Field-Tested",
	"marketPrice" : 2.43,
	"avgPrice" : 2.53
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Well-Worn",
	"marketPrice" : 2.46,
	"avgPrice" : 2.47
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.46,
	"avgPrice" : 2.40
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 30.36,
	"avgPrice" : 29.18
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 13.48,
	"avgPrice" : 13.21
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.68,
	"avgPrice" : 7.69
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 7.40,
	"avgPrice" : 6.94
}, {
	"type" : "G3SG1",
	"name" : "Flux",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 5.78,
	"avgPrice" : 6.55
}, {
	"type" : "G3SG1",
	"name" : "Green Apple",
	"quality" : "Factory New",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "G3SG1",
	"name" : "Green Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "G3SG1",
	"name" : "Green Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Factory New",
	"marketPrice" : 0.20,
	"avgPrice" : 0.23
}, {
	"type" : "G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "G3SG1",
	"name" : "Jungle Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 8.21,
	"avgPrice" : 8.07
}, {
	"type" : "M4A1-S",
	"name" : "Blood Tiger",
	"quality" : "Factory New",
	"marketPrice" : 2.72,
	"avgPrice" : 2.73
}, {
	"type" : "M4A1-S",
	"name" : "Blood Tiger",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.15,
	"avgPrice" : 2.01
}, {
	"type" : "M4A1-S",
	"name" : "Blood Tiger",
	"quality" : "Field-Tested",
	"marketPrice" : 1.96,
	"avgPrice" : 1.89
}, {
	"type" : "M4A1-S",
	"name" : "Blood Tiger",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 12.80,
	"avgPrice" : 13.23
}, {
	"type" : "M4A1-S",
	"name" : "Blood Tiger",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 8.48,
	"avgPrice" : 8.83
}, {
	"type" : "M4A1-S",
	"name" : "Blood Tiger",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 8.76,
	"avgPrice" : 8.30
}, {
	"type" : "M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 2.99,
	"avgPrice" : 3.12
}, {
	"type" : "M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.48,
	"avgPrice" : 0.47
}, {
	"type" : "M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.18,
	"avgPrice" : 0.19
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 67.43,
	"avgPrice" : 41.20
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 13.61,
	"avgPrice" : 12.46
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 57.50,
	"avgPrice" : 23.18
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 50.56,
	"avgPrice" : 30.15
}, {
	"type" : "M4A1-S",
	"name" : "Bright Water",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.83,
	"avgPrice" : 4.69
}, {
	"type" : "M4A1-S",
	"name" : "Bright Water",
	"quality" : "Field-Tested",
	"marketPrice" : 4.56,
	"avgPrice" : 4.58
}, {
	"type" : "M4A1-S",
	"name" : "Bright Water",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 17.80,
	"avgPrice" : 16.90
}, {
	"type" : "M4A1-S",
	"name" : "Bright Water",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 15.49,
	"avgPrice" : 14.93
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Factory New",
	"marketPrice" : 18.97,
	"avgPrice" : 19.48
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.42,
	"avgPrice" : 15.03
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Field-Tested",
	"marketPrice" : 10.89,
	"avgPrice" : 10.79
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Well-Worn",
	"marketPrice" : 10.38,
	"avgPrice" : 10.46
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Battle-Scarred",
	"marketPrice" : 9.68,
	"avgPrice" : 9.02
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 91.67,
	"avgPrice" : 86.35
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 56.18,
	"avgPrice" : 58.68
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 36.80,
	"avgPrice" : 34.95
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 32.29,
	"avgPrice" : 30.77
}, {
	"type" : "M4A1-S",
	"name" : "Cyrex",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 31.65,
	"avgPrice" : 25.82
}, {
	"type" : "M4A1-S",
	"name" : "Dark Water",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.85,
	"avgPrice" : 6.66
}, {
	"type" : "M4A1-S",
	"name" : "Dark Water",
	"quality" : "Field-Tested",
	"marketPrice" : 6.68,
	"avgPrice" : 6.43
}, {
	"type" : "M4A1-S",
	"name" : "Dark Water",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 22.00,
	"avgPrice" : 20.54
}, {
	"type" : "M4A1-S",
	"name" : "Dark Water",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 15.60,
	"avgPrice" : 15.76
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Factory New",
	"marketPrice" : 59.35,
	"avgPrice" : 58.78
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Minimal Wear",
	"marketPrice" : 37.53,
	"avgPrice" : 36.63
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Field-Tested",
	"marketPrice" : 25.73,
	"avgPrice" : 25.36
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Well-Worn",
	"marketPrice" : 20.66,
	"avgPrice" : 21.60
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Battle-Scarred",
	"marketPrice" : 16.58,
	"avgPrice" : 16.80
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 337.06,
	"avgPrice" : 272.68
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 126.10,
	"avgPrice" : 132.04
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 83.07,
	"avgPrice" : 76.62
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 64.70,
	"avgPrice" : 61.64
}, {
	"type" : "M4A1-S",
	"name" : "Golden Coil",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 47.20,
	"avgPrice" : 45.59
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Factory New",
	"marketPrice" : 8.10,
	"avgPrice" : 8.34
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.28,
	"avgPrice" : 6.58
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Field-Tested",
	"marketPrice" : 5.72,
	"avgPrice" : 5.77
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Well-Worn",
	"marketPrice" : 6.69,
	"avgPrice" : 6.26
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.00,
	"avgPrice" : 5.71
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 43.93,
	"avgPrice" : 43.50
}, {
	"type" : "M4A4",
	"name" : "Asiimov",
	"quality" : "Battle-Scarred",
	"marketPrice" : 18.33,
	"avgPrice" : 17.90
}, {
	"type" : "M4A4",
	"name" : "Asiimov",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 248.21,
	"avgPrice" : 238.15
}, {
	"type" : "M4A4",
	"name" : "Asiimov",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 144.99,
	"avgPrice" : 144.18
}, {
	"type" : "M4A4",
	"name" : "Asiimov",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 71.07,
	"avgPrice" : 71.43
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Factory New",
	"marketPrice" : 24.73,
	"avgPrice" : 24.07
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Minimal Wear",
	"marketPrice" : 10.24,
	"avgPrice" : 10.11
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Field-Tested",
	"marketPrice" : 6.46,
	"avgPrice" : 6.51
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Well-Worn",
	"marketPrice" : 6.87,
	"avgPrice" : 6.91
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Battle-Scarred",
	"marketPrice" : 8.09,
	"avgPrice" : 7.42
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 123.59,
	"avgPrice" : 131.78
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 59.49,
	"avgPrice" : 55.80
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 30.67,
	"avgPrice" : 27.12
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 37.07,
	"avgPrice" : 31.31
}, {
	"type" : "M4A4",
	"name" : "Bullet Rain",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 73.04,
	"avgPrice" : 67.42
}, {
	"type" : "M4A4",
	"name" : "Daybreak",
	"quality" : "Factory New",
	"marketPrice" : 27.50,
	"avgPrice" : 29.26
}, {
	"type" : "M4A4",
	"name" : "Daybreak",
	"quality" : "Minimal Wear",
	"marketPrice" : 19.91,
	"avgPrice" : 18.94
}, {
	"type" : "M4A4",
	"name" : "Daybreak",
	"quality" : "Field-Tested",
	"marketPrice" : 9.16,
	"avgPrice" : 8.72
}, {
	"type" : "M4A4",
	"name" : "Daybreak",
	"quality" : "Well-Worn",
	"marketPrice" : 8.64,
	"avgPrice" : 8.25
}, {
	"type" : "M4A4",
	"name" : "Daybreak",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.97,
	"avgPrice" : 6.28
}, {
	"type" : "M4A4",
	"name" : "Desert Storm",
	"quality" : "Factory New",
	"marketPrice" : 8.40,
	"avgPrice" : 8.26
}, {
	"type" : "M4A4",
	"name" : "Desert Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.17,
	"avgPrice" : 1.14
}, {
	"type" : "M4A4",
	"name" : "Desert Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.70,
	"avgPrice" : 0.70
}, {
	"type" : "M4A4",
	"name" : "Desert Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.87,
	"avgPrice" : 0.90
}, {
	"type" : "M4A4",
	"name" : "Desert Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.78,
	"avgPrice" : 0.86
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Factory New",
	"marketPrice" : 6.52,
	"avgPrice" : 7.22
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.32,
	"avgPrice" : 4.12
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Field-Tested",
	"marketPrice" : 2.22,
	"avgPrice" : 2.31
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Well-Worn",
	"marketPrice" : 3.23,
	"avgPrice" : 3.22
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.13,
	"avgPrice" : 2.12
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 44.93,
	"avgPrice" : 42.06
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 28.52,
	"avgPrice" : 25.02
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 11.38,
	"avgPrice" : 11.77
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 15.84,
	"avgPrice" : 13.94
}, {
	"type" : "M4A4",
	"name" : "Desert-Strike",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 10.70,
	"avgPrice" : 10.25
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Factory New",
	"marketPrice" : 2.39,
	"avgPrice" : 2.43
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.49,
	"avgPrice" : 1.48
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.94,
	"avgPrice" : 0.94
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Well-Worn",
	"marketPrice" : 1.20,
	"avgPrice" : 1.20
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.92,
	"avgPrice" : 0.93
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 14.83,
	"avgPrice" : 14.27
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 7.75,
	"avgPrice" : 8.21
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 4.89,
	"avgPrice" : 4.84
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.87,
	"avgPrice" : 5.51
}, {
	"type" : "M4A4",
	"name" : "Evil Daimyo",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 4.83,
	"avgPrice" : 4.71
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Factory New",
	"marketPrice" : 4.99,
	"avgPrice" : 5.00
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.92,
	"avgPrice" : 1.07
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Field-Tested",
	"marketPrice" : 0.80,
	"avgPrice" : 0.76
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Well-Worn",
	"marketPrice" : 1.10,
	"avgPrice" : 0.85
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.80,
	"avgPrice" : 0.78
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 36.80,
	"avgPrice" : 37.79
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 29.90,
	"avgPrice" : 30.48
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 22.35,
	"avgPrice" : 23.06
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 25.25,
	"avgPrice" : 24.41
}, {
	"type" : "M4A1-S",
	"name" : "Guardian",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 25.23,
	"avgPrice" : 23.28
}, {
	"type" : "M4A1-S",
	"name" : "Hot Rod",
	"quality" : "Factory New",
	"marketPrice" : 138.00,
	"avgPrice" : 132.93
}, {
	"type" : "M4A1-S",
	"name" : "Hot Rod",
	"quality" : "Minimal Wear",
	"marketPrice" : 145.84,
	"avgPrice" : 116.68
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Factory New",
	"marketPrice" : 57.51,
	"avgPrice" : 53.32
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Minimal Wear",
	"marketPrice" : 25.83,
	"avgPrice" : 26.32
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Field-Tested",
	"marketPrice" : 15.67,
	"avgPrice" : 15.66
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Well-Worn",
	"marketPrice" : 12.11,
	"avgPrice" : 12.02
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Battle-Scarred",
	"marketPrice" : 9.75,
	"avgPrice" : 9.87
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 277.77,
	"avgPrice" : 343.75
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 79.27,
	"avgPrice" : 85.33
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 48.31,
	"avgPrice" : 47.11
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 34.85,
	"avgPrice" : 35.83
}, {
	"type" : "M4A1-S",
	"name" : "Hyper Beast",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 27.32,
	"avgPrice" : 27.23
}, {
	"type" : "M4A1-S",
	"name" : "Icarus Fell",
	"quality" : "Factory New",
	"marketPrice" : 101.00,
	"avgPrice" : 102.71
}, {
	"type" : "M4A1-S",
	"name" : "Icarus Fell",
	"quality" : "Minimal Wear",
	"marketPrice" : 103.35,
	"avgPrice" : 100.59
}, {
	"type" : "M4A1-S",
	"name" : "Knight",
	"quality" : "Factory New",
	"marketPrice" : 271.26,
	"avgPrice" : 260.24
}, {
	"type" : "M4A1-S",
	"name" : "Knight",
	"quality" : "Minimal Wear",
	"marketPrice" : 275.50,
	"avgPrice" : 230.56
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Knight",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 816.25
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Knight",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 392.10
}, {
	"type" : "M4A1-S",
	"name" : "Master Piece",
	"quality" : "Factory New",
	"marketPrice" : 183.14,
	"avgPrice" : 182.66
}, {
	"type" : "M4A1-S",
	"name" : "Master Piece",
	"quality" : "Minimal Wear",
	"marketPrice" : 93.79,
	"avgPrice" : 89.53
}, {
	"type" : "M4A1-S",
	"name" : "Master Piece",
	"quality" : "Field-Tested",
	"marketPrice" : 62.92,
	"avgPrice" : 61.24
}, {
	"type" : "M4A1-S",
	"name" : "Master Piece",
	"quality" : "Well-Worn",
	"marketPrice" : 49.34,
	"avgPrice" : 48.54
}, {
	"type" : "M4A1-S",
	"name" : "Master Piece",
	"quality" : "Battle-Scarred",
	"marketPrice" : 43.94,
	"avgPrice" : 41.36
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Master Piece",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 418.75
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Master Piece",
	"quality" : "Well-Worn",
	"marketPrice" : 349.20,
	"avgPrice" : 325.00
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Master Piece",
	"quality" : "Battle-Scarred",
	"marketPrice" : 280.87,
	"avgPrice" : 217.00
}, {
	"type" : "M4A1-S",
	"name" : "Nitro",
	"quality" : "Factory New",
	"marketPrice" : 5.48,
	"avgPrice" : 5.54
}, {
	"type" : "M4A1-S",
	"name" : "Nitro",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.01,
	"avgPrice" : 2.96
}, {
	"type" : "M4A1-S",
	"name" : "Nitro",
	"quality" : "Field-Tested",
	"marketPrice" : 1.46,
	"avgPrice" : 1.54
}, {
	"type" : "M4A1-S",
	"name" : "Nitro",
	"quality" : "Well-Worn",
	"marketPrice" : 1.93,
	"avgPrice" : 1.91
}, {
	"type" : "M4A1-S",
	"name" : "Nitro",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.40,
	"avgPrice" : 1.46
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Nitro",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 223.51
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Nitro",
	"quality" : "Field-Tested",
	"marketPrice" : 83.15,
	"avgPrice" : 44.25
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "Nitro",
	"quality" : "Battle-Scarred",
	"marketPrice" : 179.77,
	"avgPrice" : 68.38
}, {
	"type" : "M4A1-S",
	"name" : "VariCamo",
	"quality" : "Factory New",
	"marketPrice" : 1.06,
	"avgPrice" : 1.13
}, {
	"type" : "M4A1-S",
	"name" : "VariCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.49,
	"avgPrice" : 0.51
}, {
	"type" : "M4A1-S",
	"name" : "VariCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.34,
	"avgPrice" : 0.35
}, {
	"type" : "M4A1-S",
	"name" : "VariCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.94,
	"avgPrice" : 0.88
}, {
	"type" : "M4A1-S",
	"name" : "VariCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.48,
	"avgPrice" : 0.42
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "VariCamo",
	"quality" : "Factory New",
	"marketPrice" : 29.63,
	"avgPrice" : 28.83
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "VariCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 19.49,
	"avgPrice" : 15.57
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "VariCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 9.60,
	"avgPrice" : 9.58
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "VariCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 11.84,
	"avgPrice" : 10.29
}, {
	"type" : "Souvenir M4A1-S",
	"name" : "VariCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 14.62,
	"avgPrice" : 11.39
}, {
	"type" : "M4A4",
	"name" : "Asiimov",
	"quality" : "Field-Tested",
	"marketPrice" : 48.45,
	"avgPrice" : 51.22
}, {
	"type" : "M4A4",
	"name" : "Asiimov",
	"quality" : "Well-Worn",
	"marketPrice" : 39.30,
	"avgPrice" : 37.33
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.18,
	"avgPrice" : 0.20
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.35,
	"avgPrice" : 1.10
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.51,
	"avgPrice" : 0.50
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.36,
	"avgPrice" : 0.34
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.53,
	"avgPrice" : 0.57
}, {
	"type" : "M249",
	"name" : "Magma",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.39,
	"avgPrice" : 0.32
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Factory New",
	"marketPrice" : 1.86,
	"avgPrice" : 1.66
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.78,
	"avgPrice" : 0.76
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Field-Tested",
	"marketPrice" : 0.50,
	"avgPrice" : 0.53
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Well-Worn",
	"marketPrice" : 0.50,
	"avgPrice" : 0.49
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.48,
	"avgPrice" : 0.48
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.40,
	"avgPrice" : 6.02
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.66,
	"avgPrice" : 2.62
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.52,
	"avgPrice" : 1.48
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.22,
	"avgPrice" : 1.26
}, {
	"type" : "M249",
	"name" : "Nebula Crusader",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.29,
	"avgPrice" : 1.21
}, {
	"type" : "M249",
	"name" : "Shipping Forecast",
	"quality" : "Factory New",
	"marketPrice" : 1.03,
	"avgPrice" : 0.80
}, {
	"type" : "M249",
	"name" : "Shipping Forecast",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.80,
	"avgPrice" : 0.71
}, {
	"type" : "M249",
	"name" : "Shipping Forecast",
	"quality" : "Field-Tested",
	"marketPrice" : 0.77,
	"avgPrice" : 0.67
}, {
	"type" : "M249",
	"name" : "Shipping Forecast",
	"quality" : "Well-Worn",
	"marketPrice" : 0.69,
	"avgPrice" : 0.68
}, {
	"type" : "M249",
	"name" : "Shipping Forecast",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.69,
	"avgPrice" : 0.65
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Factory New",
	"marketPrice" : 0.30,
	"avgPrice" : 0.27
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.12,
	"avgPrice" : 0.12
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Well-Worn",
	"marketPrice" : 0.13,
	"avgPrice" : 0.14
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.10,
	"avgPrice" : 1.06
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.30,
	"avgPrice" : 0.30
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.53,
	"avgPrice" : 0.48
}, {
	"type" : "M249",
	"name" : "System Lock",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.27,
	"avgPrice" : 0.24
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Factory New",
	"marketPrice" : 13.19,
	"avgPrice" : 13.63
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.18,
	"avgPrice" : 5.94
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Field-Tested",
	"marketPrice" : 3.58,
	"avgPrice" : 3.50
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Well-Worn",
	"marketPrice" : 3.83,
	"avgPrice" : 3.59
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.65,
	"avgPrice" : 3.44
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 55.20,
	"avgPrice" : 53.83
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 23.60,
	"avgPrice" : 22.87
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 11.24,
	"avgPrice" : 11.14
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 13.40,
	"avgPrice" : 11.52
}, {
	"type" : "M4A1-S",
	"name" : "Atomic Alloy",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 9.89,
	"avgPrice" : 9.23
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Factory New",
	"marketPrice" : 3.49,
	"avgPrice" : 3.58
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.81,
	"avgPrice" : 1.92
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Field-Tested",
	"marketPrice" : 1.61,
	"avgPrice" : 1.56
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Well-Worn",
	"marketPrice" : 2.38,
	"avgPrice" : 2.47
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.66,
	"avgPrice" : 1.62
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 17.15,
	"avgPrice" : 15.61
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 9.28,
	"avgPrice" : 9.23
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 8.00,
	"avgPrice" : 7.93
}, {
	"type" : "M4A1-S",
	"name" : "Basilisk",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 11.21,
	"avgPrice" : 8.78
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.87,
	"avgPrice" : 4.96
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.41,
	"avgPrice" : 3.43
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.69,
	"avgPrice" : 3.76
}, {
	"type" : "M4A4",
	"name" : "Faded Zebra",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 4.49,
	"avgPrice" : 4.63
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Factory New",
	"marketPrice" : 4.09,
	"avgPrice" : 4.26
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.75,
	"avgPrice" : 1.77
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Field-Tested",
	"marketPrice" : 1.20,
	"avgPrice" : 1.25
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Well-Worn",
	"marketPrice" : 2.62,
	"avgPrice" : 2.60
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.24,
	"avgPrice" : 1.21
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 21.35,
	"avgPrice" : 22.44
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 8.70,
	"avgPrice" : 8.54
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 5.15,
	"avgPrice" : 5.63
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 7.70,
	"avgPrice" : 7.60
}, {
	"type" : "M4A4",
	"name" : "Griffin",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 5.17,
	"avgPrice" : 5.28
}, {
	"type" : "M4A4",
	"name" : "Howl",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 840.00
}, {
	"type" : "M4A4",
	"name" : "Howl",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 550.00
}, {
	"type" : "M4A4",
	"name" : "Howl",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 423.75
}, {
	"type" : "M4A4",
	"name" : "Howl",
	"quality" : "Well-Worn",
	"marketPrice" : 0,
	"avgPrice" : 387.50
}, {
	"type" : "M4A4",
	"name" : "Howl",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 2650.00
}, {
	"type" : "M4A4",
	"name" : "Howl",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 1242.50
}, {
	"type" : "M4A4",
	"name" : "Howl",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 1078.75
}, {
	"type" : "M4A4",
	"name" : "Jungle Tiger",
	"quality" : "Factory New",
	"marketPrice" : 16.10,
	"avgPrice" : 19.07
}, {
	"type" : "M4A4",
	"name" : "Jungle Tiger",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.00,
	"avgPrice" : 1.81
}, {
	"type" : "M4A4",
	"name" : "Jungle Tiger",
	"quality" : "Field-Tested",
	"marketPrice" : 0.66,
	"avgPrice" : 0.68
}, {
	"type" : "M4A4",
	"name" : "Jungle Tiger",
	"quality" : "Well-Worn",
	"marketPrice" : 0.92,
	"avgPrice" : 0.88
}, {
	"type" : "M4A4",
	"name" : "Jungle Tiger",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.74,
	"avgPrice" : 0.76
}, {
	"type" : "M4A4",
	"name" : "Modern Hunter",
	"quality" : "Factory New",
	"marketPrice" : 215.00,
	"avgPrice" : 221.51
}, {
	"type" : "M4A4",
	"name" : "Modern Hunter",
	"quality" : "Minimal Wear",
	"marketPrice" : 24.97,
	"avgPrice" : 24.51
}, {
	"type" : "M4A4",
	"name" : "Modern Hunter",
	"quality" : "Field-Tested",
	"marketPrice" : 7.88,
	"avgPrice" : 6.54
}, {
	"type" : "M4A4",
	"name" : "Modern Hunter",
	"quality" : "Well-Worn",
	"marketPrice" : 7.22,
	"avgPrice" : 7.68
}, {
	"type" : "M4A4",
	"name" : "Modern Hunter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 12.65,
	"avgPrice" : 10.28
}, {
	"type" : "M4A4",
	"name" : "Poseidon",
	"quality" : "Factory New",
	"marketPrice" : 235.19,
	"avgPrice" : 226.19
}, {
	"type" : "M4A4",
	"name" : "Poseidon",
	"quality" : "Minimal Wear",
	"marketPrice" : 141.00,
	"avgPrice" : 143.40
}, {
	"type" : "M4A4",
	"name" : "Poseidon",
	"quality" : "Field-Tested",
	"marketPrice" : 120.00,
	"avgPrice" : 117.56
}, {
	"type" : "M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Factory New",
	"marketPrice" : 189.14,
	"avgPrice" : 139.86
}, {
	"type" : "M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Minimal Wear",
	"marketPrice" : 20.83,
	"avgPrice" : 20.88
}, {
	"type" : "M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Field-Tested",
	"marketPrice" : 5.70,
	"avgPrice" : 5.38
}, {
	"type" : "M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Well-Worn",
	"marketPrice" : 4.73,
	"avgPrice" : 5.13
}, {
	"type" : "M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.17,
	"avgPrice" : 4.99
}, {
	"type" : "Souvenir M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Minimal Wear",
	"marketPrice" : 69.64,
	"avgPrice" : 65.26
}, {
	"type" : "Souvenir M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Field-Tested",
	"marketPrice" : 17.90,
	"avgPrice" : 29.21
}, {
	"type" : "Souvenir M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Well-Worn",
	"marketPrice" : 16.28,
	"avgPrice" : 18.10
}, {
	"type" : "Souvenir M4A4",
	"name" : "Radiation Hazard",
	"quality" : "Battle-Scarred",
	"marketPrice" : 16.86,
	"avgPrice" : 17.80
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Factory New",
	"marketPrice" : 74.71,
	"avgPrice" : 70.92
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Minimal Wear",
	"marketPrice" : 29.26,
	"avgPrice" : 29.76
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Field-Tested",
	"marketPrice" : 9.50,
	"avgPrice" : 9.76
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Well-Worn",
	"marketPrice" : 13.54,
	"avgPrice" : 13.44
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Battle-Scarred",
	"marketPrice" : 7.33,
	"avgPrice" : 7.12
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 370.77,
	"avgPrice" : 338.92
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 138.76,
	"avgPrice" : 119.09
}, {
	"type" : "Huntsman Knife",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 89.60,
	"avgPrice" : 85.64
}, {
	"type" : "Huntsman Knife",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 89.89,
	"avgPrice" : 84.92
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 408.66,
	"avgPrice" : 357.36
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 145.61,
	"avgPrice" : 151.74
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 119.09,
	"avgPrice" : 105.05
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 120.47,
	"avgPrice" : 103.27
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 118.41,
	"avgPrice" : 90.20
}, {
	"type" : "Huntsman Knife",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 220.00,
	"avgPrice" : 132.27
}, {
	"type" : "Huntsman Knife",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 96.90,
	"avgPrice" : 98.53
}, {
	"type" : "Huntsman Knife",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 72.10,
	"avgPrice" : 66.74
}, {
	"type" : "Huntsman Knife",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 71.34,
	"avgPrice" : 70.37
}, {
	"type" : "Huntsman Knife",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 73.04,
	"avgPrice" : 63.77
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 134.98,
	"avgPrice" : 130.63
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 101.12,
	"avgPrice" : 89.17
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 147.43,
	"avgPrice" : 123.41
}, {
	"type" : "Huntsman Knife",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 115.00,
	"avgPrice" : 88.21
}, {
	"name" : "Huntsman Knife",
	"marketPrice" : 134.83,
	"avgPrice" : 128.73
}, {
	"name" : "Huntsman Knife",
	"statTrak" : 1,
	"marketPrice" : 203.35,
	"avgPrice" : 202.53
}, {
	"type" : "Karambit",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 350.00
}, {
	"type" : "Karambit",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 297.73,
	"avgPrice" : 286.14
}, {
	"type" : "Karambit",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 268.73,
	"avgPrice" : 268.29
}, {
	"type" : "Karambit",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 233.70,
	"avgPrice" : 243.71
}, {
	"type" : "Karambit",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 243.80,
	"avgPrice" : 228.08
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 635.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 402.50
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 323.75
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 334.02,
	"avgPrice" : 298.58
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 318.84,
	"avgPrice" : 293.27
}, {
	"type" : "Karambit",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 382.50
}, {
	"type" : "Karambit",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 185.39,
	"avgPrice" : 176.67
}, {
	"type" : "Karambit",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 141.00,
	"avgPrice" : 146.48
}, {
	"type" : "Karambit",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 149.43,
	"avgPrice" : 144.26
}, {
	"type" : "Karambit",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 140.30,
	"avgPrice" : 135.47
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1000.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 268.73,
	"avgPrice" : 203.54
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 220.14,
	"avgPrice" : 192.16
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 314.52,
	"avgPrice" : 207.39
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 381.98,
	"avgPrice" : 156.71
}, {
	"type" : "Karambit",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 500.00
}, {
	"type" : "Karambit",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 352.77,
	"avgPrice" : 325.87
}, {
	"type" : "Karambit",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 272.39,
	"avgPrice" : 278.10
}, {
	"type" : "Karambit",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 287.08,
	"avgPrice" : 280.73
}, {
	"type" : "Karambit",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 235.91,
	"avgPrice" : 257.95
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1260.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 415.00
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 0,
	"avgPrice" : 501.25
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 397.99,
	"avgPrice" : 319.46
}, {
	"type" : "Karambit",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 366.19,
	"avgPrice" : 358.21
}, {
	"type" : "Karambit",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 2305.00
}, {
	"type" : "M9 Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 190.99,
	"avgPrice" : 163.29
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 376.25
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 335.00,
	"avgPrice" : 313.36
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 279.36,
	"avgPrice" : 256.71
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 305.21,
	"avgPrice" : 209.93
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 247.76,
	"avgPrice" : 209.01
}, {
	"type" : "M9 Bayonet",
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 373.32,
	"avgPrice" : 340.00
}, {
	"type" : "M9 Bayonet",
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 556.25
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 507.50
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Doppler",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 868.75
}, {
	"type" : "M9 Bayonet",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 386.48,
	"avgPrice" : 320.00
}, {
	"type" : "M9 Bayonet",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 382.50
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 472.50
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 400.00,
	"avgPrice" : 700.00
}, {
	"type" : "M9 Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 354.59,
	"avgPrice" : 221.32
}, {
	"type" : "M9 Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 114.95,
	"avgPrice" : 115.96
}, {
	"type" : "M9 Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 95.50,
	"avgPrice" : 94.51
}, {
	"type" : "M9 Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 116.28,
	"avgPrice" : 99.93
}, {
	"type" : "M9 Bayonet",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 93.04,
	"avgPrice" : 91.96
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 179.77,
	"avgPrice" : 180.38
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 121.45,
	"avgPrice" : 117.67
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 134.83,
	"avgPrice" : 120.84
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 119.09,
	"avgPrice" : 105.41
}, {
	"type" : "M9 Bayonet",
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 533.75
}, {
	"type" : "M9 Bayonet",
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 605.00
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 975.00
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Marble Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 666.25
}, {
	"type" : "M9 Bayonet",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1041.25
}, {
	"type" : "M9 Bayonet",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 257.85,
	"avgPrice" : 252.42
}, {
	"type" : "M9 Bayonet",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 135.25,
	"avgPrice" : 135.37
}, {
	"type" : "M9 Bayonet",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 125.72,
	"avgPrice" : 127.20
}, {
	"type" : "M9 Bayonet",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 113.30,
	"avgPrice" : 106.85
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 335.00
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 171.35,
	"avgPrice" : 161.75
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 0,
	"avgPrice" : 239.01
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0,
	"avgPrice" : 112.77
}, {
	"type" : "M9 Bayonet",
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 148.78,
	"avgPrice" : 139.84
}, {
	"type" : "M9 Bayonet",
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 123.59,
	"avgPrice" : 122.53
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 398.91,
	"avgPrice" : 113.13
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 197.38,
	"avgPrice" : 178.09
}, {
	"type" : "M9 Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 224.71,
	"avgPrice" : 159.21
}, {
	"type" : "M9 Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 104.58,
	"avgPrice" : 101.55
}, {
	"type" : "M9 Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 87.88,
	"avgPrice" : 87.08
}, {
	"type" : "M9 Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 92.13,
	"avgPrice" : 84.99
}, {
	"type" : "M9 Bayonet",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 94.37,
	"avgPrice" : 92.24
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 189.37,
	"avgPrice" : 112.77
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 116.28,
	"avgPrice" : 98.24
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 119.00,
	"avgPrice" : 93.60
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 115.00,
	"avgPrice" : 100.12
}, {
	"type" : "M9 Bayonet",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 175.47
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Well-Worn",
	"marketPrice" : 5.30,
	"avgPrice" : 5.13
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.10,
	"avgPrice" : 2.96
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 47.79,
	"avgPrice" : 48.25
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 30.67,
	"avgPrice" : 26.33
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 12.42,
	"avgPrice" : 13.03
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 21.01,
	"avgPrice" : 18.31
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 11.43,
	"avgPrice" : 10.53
}, {
	"type" : "M9 Bayonet",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 349.67,
	"avgPrice" : 276.49
}, {
	"type" : "M9 Bayonet",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 209.69,
	"avgPrice" : 207.70
}, {
	"type" : "M9 Bayonet",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 187.00,
	"avgPrice" : 187.80
}, {
	"type" : "M9 Bayonet",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 181.60,
	"avgPrice" : 177.35
}, {
	"type" : "M9 Bayonet",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 179.24,
	"avgPrice" : 176.17
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 722.50
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 336.85,
	"avgPrice" : 270.00
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 263.32,
	"avgPrice" : 237.99
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 299.00,
	"avgPrice" : 208.93
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 314.58,
	"avgPrice" : 219.25
}, {
	"type" : "M9 Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 251.41
}, {
	"type" : "M9 Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 130.29,
	"avgPrice" : 131.64
}, {
	"type" : "M9 Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 101.12,
	"avgPrice" : 100.68
}, {
	"type" : "M9 Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 101.68,
	"avgPrice" : 97.34
}, {
	"type" : "M9 Bayonet",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 93.00,
	"avgPrice" : 90.67
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 247.17,
	"avgPrice" : 170.96
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 149.90,
	"avgPrice" : 127.80
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 135.65,
	"avgPrice" : 113.46
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 129.18,
	"avgPrice" : 97.52
}, {
	"type" : "M9 Bayonet",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 310.08
}, {
	"type" : "M9 Bayonet",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 189.92,
	"avgPrice" : 204.41
}, {
	"type" : "M9 Bayonet",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 178.64,
	"avgPrice" : 180.98
}, {
	"type" : "M9 Bayonet",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 174.54,
	"avgPrice" : 168.43
}, {
	"type" : "M9 Bayonet",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 151.80,
	"avgPrice" : 153.41
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 675.00
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 345.00,
	"avgPrice" : 332.67
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 292.41,
	"avgPrice" : 233.16
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 258.11,
	"avgPrice" : 211.34
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 196.28,
	"avgPrice" : 184.26
}, {
	"type" : "M9 Bayonet",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 4218.75
}, {
	"type" : "M9 Bayonet",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 606.25
}, {
	"type" : "M9 Bayonet",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 189.95,
	"avgPrice" : 205.68
}, {
	"type" : "M9 Bayonet",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 179.14,
	"avgPrice" : 159.26
}, {
	"type" : "M9 Bayonet",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 133.60,
	"avgPrice" : 130.94
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 6278.75
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 1245.00
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 275.00,
	"avgPrice" : 260.44
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 0,
	"avgPrice" : 232.31
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 197.39,
	"avgPrice" : 214.39
}, {
	"type" : "M9 Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 245.48,
	"avgPrice" : 228.10
}, {
	"type" : "M9 Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 213.00,
	"avgPrice" : 213.74
}, {
	"type" : "M9 Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 184.47,
	"avgPrice" : 179.73
}, {
	"type" : "M9 Bayonet",
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 175.38,
	"avgPrice" : 172.07
}, {
	"type" : "MAC-10",
	"name" : "Indigo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.09,
	"avgPrice" : 0.09
}, {
	"type" : "MAC-10",
	"name" : "Indigo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "MAC-10",
	"name" : "Indigo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "MAC-10",
	"name" : "Indigo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Indigo",
	"quality" : "Factory New",
	"marketPrice" : 6.72,
	"avgPrice" : 5.26
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Indigo",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.15,
	"avgPrice" : 1.05
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Indigo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.35,
	"avgPrice" : 0.34
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Indigo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.54,
	"avgPrice" : 0.49
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Indigo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.32,
	"avgPrice" : 0.33
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Factory New",
	"marketPrice" : 0.24,
	"avgPrice" : 0.22
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.22,
	"avgPrice" : 1.13
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.63,
	"avgPrice" : 0.61
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.35,
	"avgPrice" : 0.32
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.36,
	"avgPrice" : 0.35
}, {
	"type" : "MAC-10",
	"name" : "Lapis Gator",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.32,
	"avgPrice" : 0.30
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Factory New",
	"marketPrice" : 0.73,
	"avgPrice" : 0.77
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.48,
	"avgPrice" : 0.48
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Field-Tested",
	"marketPrice" : 0.38,
	"avgPrice" : 0.37
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Well-Worn",
	"marketPrice" : 1.04,
	"avgPrice" : 0.87
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.49,
	"avgPrice" : 0.53
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.90,
	"avgPrice" : 3.12
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.01,
	"avgPrice" : 2.01
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.49,
	"avgPrice" : 1.26
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.40,
	"avgPrice" : 1.30
}, {
	"type" : "MAC-10",
	"name" : "Malachite",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.19,
	"avgPrice" : 1.28
}, {
	"type" : "MAC-10",
	"name" : "Neon Rider",
	"quality" : "Factory New",
	"marketPrice" : 5.61,
	"avgPrice" : 5.43
}, {
	"type" : "MAC-10",
	"name" : "Neon Rider",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.59,
	"avgPrice" : 3.36
}, {
	"type" : "MAC-10",
	"name" : "Neon Rider",
	"quality" : "Field-Tested",
	"marketPrice" : 1.98,
	"avgPrice" : 2.00
}, {
	"type" : "MAC-10",
	"name" : "Neon Rider",
	"quality" : "Well-Worn",
	"marketPrice" : 2.18,
	"avgPrice" : 2.32
}, {
	"type" : "MAC-10",
	"name" : "Neon Rider",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 20.66,
	"avgPrice" : 23.53
}, {
	"type" : "MAC-10",
	"name" : "Neon Rider",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 12.85,
	"avgPrice" : 13.07
}, {
	"type" : "MAC-10",
	"name" : "Neon Rider",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 5.69,
	"avgPrice" : 5.32
}, {
	"type" : "MAC-10",
	"name" : "Neon Rider",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 6.46,
	"avgPrice" : 6.09
}, {
	"type" : "MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Factory New",
	"marketPrice" : 1.35,
	"avgPrice" : 1.31
}, {
	"type" : "MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.10,
	"avgPrice" : 0.93
}, {
	"type" : "MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Field-Tested",
	"marketPrice" : 0.43,
	"avgPrice" : 0.43
}, {
	"type" : "MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Well-Worn",
	"marketPrice" : 1.26,
	"avgPrice" : 0.68
}, {
	"type" : "MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.38,
	"avgPrice" : 0.35
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Factory New",
	"marketPrice" : 10.95,
	"avgPrice" : 10.40
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.02,
	"avgPrice" : 3.81
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Field-Tested",
	"marketPrice" : 1.56,
	"avgPrice" : 1.46
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Well-Worn",
	"marketPrice" : 2.61,
	"avgPrice" : 2.74
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Nuclear Garden",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.16,
	"avgPrice" : 1.04
}, {
	"type" : "MAC-10",
	"name" : "Palm",
	"quality" : "Factory New",
	"marketPrice" : 0.32,
	"avgPrice" : 0.32
}, {
	"type" : "MAC-10",
	"name" : "Palm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "MAC-10",
	"name" : "Palm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "MAC-10",
	"name" : "Palm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "MAC-10",
	"name" : "Palm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Palm",
	"quality" : "Factory New",
	"marketPrice" : 13.00,
	"avgPrice" : 12.42
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Palm",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.15,
	"avgPrice" : 1.20
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Palm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.35,
	"avgPrice" : 0.39
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Palm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.57,
	"avgPrice" : 0.57
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Palm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.49,
	"avgPrice" : 0.47
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Factory New",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.24,
	"avgPrice" : 1.27
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.49,
	"avgPrice" : 0.50
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.26
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.32,
	"avgPrice" : 0.30
}, {
	"type" : "MAC-10",
	"name" : "Rangeen",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.34,
	"avgPrice" : 0.30
}, {
	"type" : "MAC-10",
	"name" : "Silver",
	"quality" : "Factory New",
	"marketPrice" : 0.08,
	"avgPrice" : 0.06
}, {
	"type" : "MAC-10",
	"name" : "Silver",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.12,
	"avgPrice" : 0.09
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Factory New",
	"marketPrice" : 1.80,
	"avgPrice" : 1.56
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.84,
	"avgPrice" : 0.86
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Field-Tested",
	"marketPrice" : 0.72,
	"avgPrice" : 0.68
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Well-Worn",
	"marketPrice" : 0.89,
	"avgPrice" : 0.91
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.89,
	"avgPrice" : 0.91
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.61,
	"avgPrice" : 5.56
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.95,
	"avgPrice" : 3.49
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.48,
	"avgPrice" : 2.30
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.37,
	"avgPrice" : 2.27
}, {
	"type" : "MAC-10",
	"name" : "Tatter",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 4.14,
	"avgPrice" : 2.93
}, {
	"type" : "MAC-10",
	"name" : "Tornado",
	"quality" : "Factory New",
	"marketPrice" : 6.15,
	"avgPrice" : 5.40
}, {
	"type" : "MAC-10",
	"name" : "Tornado",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.48,
	"avgPrice" : 0.44
}, {
	"type" : "MAC-10",
	"name" : "Tornado",
	"quality" : "Field-Tested",
	"marketPrice" : 0.19,
	"avgPrice" : 0.19
}, {
	"type" : "MAC-10",
	"name" : "Tornado",
	"quality" : "Well-Worn",
	"marketPrice" : 2.54,
	"avgPrice" : 0.64
}, {
	"type" : "MAC-10",
	"name" : "Tornado",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.29,
	"avgPrice" : 0.30
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"marketPrice" : 2.68,
	"avgPrice" : 2.33
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.49,
	"avgPrice" : 0.45
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 0.16,
	"avgPrice" : 0.17
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 0.30,
	"avgPrice" : 0.29
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.20,
	"avgPrice" : 0.21
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 10.72,
	"avgPrice" : 10.15
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.07,
	"avgPrice" : 1.13
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.43,
	"avgPrice" : 0.41
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.49,
	"avgPrice" : 0.47
}, {
	"type" : "MAC-10",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.40,
	"avgPrice" : 0.40
}, {
	"type" : "MAC-10",
	"name" : "Urban DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 6.36,
	"avgPrice" : 5.83
}, {
	"type" : "MAC-10",
	"name" : "Urban DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.92,
	"avgPrice" : 0.94
}, {
	"type" : "MAC-10",
	"name" : "Urban DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.64,
	"avgPrice" : 0.79
}, {
	"type" : "MAC-10",
	"name" : "Urban DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 0.80,
	"avgPrice" : 0.89
}, {
	"type" : "MAC-10",
	"name" : "Urban DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.69,
	"avgPrice" : 0.56
}, {
	"type" : "MAG-7",
	"name" : "Bulldozer",
	"quality" : "Factory New",
	"marketPrice" : 60.67,
	"avgPrice" : 60.43
}, {
	"type" : "M9 Bayonet",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 114.80,
	"avgPrice" : 110.24
}, {
	"type" : "M9 Bayonet",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 79.77,
	"avgPrice" : 87.83
}, {
	"type" : "M9 Bayonet",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 90.16,
	"avgPrice" : 88.74
}, {
	"type" : "M9 Bayonet",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 134.83,
	"avgPrice" : 129.72
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 224.71,
	"avgPrice" : 159.18
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 144.09,
	"avgPrice" : 123.68
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 140.44,
	"avgPrice" : 108.59
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 113.47,
	"avgPrice" : 109.43
}, {
	"type" : "M9 Bayonet",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 390.00
}, {
	"type" : "M9 Bayonet",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 335.00,
	"avgPrice" : 293.75
}, {
	"type" : "M9 Bayonet",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 274.16,
	"avgPrice" : 284.21
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 706.25
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 390.00
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 380.00,
	"avgPrice" : 342.50
}, {
	"type" : "M9 Bayonet",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 188.74,
	"avgPrice" : 178.26
}, {
	"type" : "M9 Bayonet",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 145.95,
	"avgPrice" : 142.80
}, {
	"type" : "M9 Bayonet",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 142.68,
	"avgPrice" : 128.30
}, {
	"type" : "M9 Bayonet",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 143.80,
	"avgPrice" : 121.49
}, {
	"type" : "M9 Bayonet",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 121.45,
	"avgPrice" : 120.83
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 216.88
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 191.30,
	"avgPrice" : 164.03
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 156.18,
	"avgPrice" : 154.06
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 156.18,
	"avgPrice" : 146.41
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 152.43,
	"avgPrice" : 142.50
}, {
	"type" : "M9 Bayonet",
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 397.50
}, {
	"type" : "M9 Bayonet",
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 393.85,
	"avgPrice" : 366.25
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 581.25
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Tiger Tooth",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 645.00
}, {
	"type" : "M9 Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 937.50
}, {
	"type" : "M9 Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 249.00,
	"avgPrice" : 249.37
}, {
	"type" : "M9 Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 120.21,
	"avgPrice" : 132.90
}, {
	"type" : "M9 Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 125.83,
	"avgPrice" : 123.12
}, {
	"type" : "M9 Bayonet",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 112.36,
	"avgPrice" : 108.03
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 399.98,
	"avgPrice" : 361.25
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 187.62,
	"avgPrice" : 202.44
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 180.00,
	"avgPrice" : 113.95
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 149.50,
	"avgPrice" : 131.51
}, {
	"type" : "M9 Bayonet",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 196.05
}, {
	"type" : "M9 Bayonet",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 131.04,
	"avgPrice" : 129.44
}, {
	"type" : "M9 Bayonet",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 91.04,
	"avgPrice" : 90.60
}, {
	"type" : "M9 Bayonet",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 89.99,
	"avgPrice" : 96.31
}, {
	"type" : "M9 Bayonet",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 97.47,
	"avgPrice" : 96.00
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 197.39,
	"avgPrice" : 155.18
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 130.49,
	"avgPrice" : 113.55
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 137.86,
	"avgPrice" : 96.05
}, {
	"type" : "M9 Bayonet",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 258.40,
	"avgPrice" : 169.40
}, {
	"name" : "M9 Bayonet",
	"marketPrice" : 179.00,
	"avgPrice" : 176.05
}, {
	"name" : "M9 Bayonet",
	"statTrak" : 1,
	"marketPrice" : 252.80,
	"avgPrice" : 248.42
}, {
	"type" : "MAC-10",
	"name" : "Amber Fade",
	"quality" : "Factory New",
	"marketPrice" : 4.50,
	"avgPrice" : 4.90
}, {
	"type" : "MAC-10",
	"name" : "Amber Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.15,
	"avgPrice" : 1.44
}, {
	"type" : "MAC-10",
	"name" : "Amber Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 1.29,
	"avgPrice" : 1.24
}, {
	"type" : "MAC-10",
	"name" : "Amber Fade",
	"quality" : "Well-Worn",
	"marketPrice" : 3.74,
	"avgPrice" : 2.82
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Amber Fade",
	"quality" : "Factory New",
	"marketPrice" : 9.50,
	"avgPrice" : 10.93
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Amber Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.52,
	"avgPrice" : 4.84
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Amber Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 3.31,
	"avgPrice" : 3.05
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Amber Fade",
	"quality" : "Well-Worn",
	"marketPrice" : 11.34,
	"avgPrice" : 6.65
}, {
	"type" : "MAC-10",
	"name" : "Candy Apple",
	"quality" : "Factory New",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MAC-10",
	"name" : "Candy Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "MAC-10",
	"name" : "Candy Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Candy Apple",
	"quality" : "Factory New",
	"marketPrice" : 5.49,
	"avgPrice" : 5.05
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Candy Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.73,
	"avgPrice" : 2.73
}, {
	"type" : "Souvenir MAC-10",
	"name" : "Candy Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 1.69,
	"avgPrice" : 1.83
}, {
	"type" : "MAC-10",
	"name" : "Commuter",
	"quality" : "Factory New",
	"marketPrice" : 3.15,
	"avgPrice" : 2.97
}, {
	"type" : "MAC-10",
	"name" : "Commuter",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.97,
	"avgPrice" : 0.93
}, {
	"type" : "MAC-10",
	"name" : "Commuter",
	"quality" : "Field-Tested",
	"marketPrice" : 0.50,
	"avgPrice" : 0.49
}, {
	"type" : "MAC-10",
	"name" : "Commuter",
	"quality" : "Well-Worn",
	"marketPrice" : 1.39,
	"avgPrice" : 0.73
}, {
	"type" : "MAC-10",
	"name" : "Commuter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.43,
	"avgPrice" : 1.20
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Factory New",
	"marketPrice" : 2.02,
	"avgPrice" : 1.86
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.92,
	"avgPrice" : 0.90
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Field-Tested",
	"marketPrice" : 0.85,
	"avgPrice" : 0.87
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Well-Worn",
	"marketPrice" : 7.43,
	"avgPrice" : 2.21
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.33,
	"avgPrice" : 3.13
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 7.08,
	"avgPrice" : 6.79
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.88,
	"avgPrice" : 3.47
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.54,
	"avgPrice" : 2.67
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.17,
	"avgPrice" : 2.90
}, {
	"type" : "MAC-10",
	"name" : "Curse",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 7.48,
	"avgPrice" : 4.60
}, {
	"type" : "MAC-10",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 3.13,
	"avgPrice" : 3.07
}, {
	"type" : "MAC-10",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.61,
	"avgPrice" : 4.73
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Factory New",
	"marketPrice" : 15.00,
	"avgPrice" : 14.25
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.15,
	"avgPrice" : 4.66
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Field-Tested",
	"marketPrice" : 4.55,
	"avgPrice" : 4.11
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Well-Worn",
	"marketPrice" : 5.00,
	"avgPrice" : 3.88
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.51,
	"avgPrice" : 4.25
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 139.99,
	"avgPrice" : 120.37
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 15.90,
	"avgPrice" : 16.68
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 11.99,
	"avgPrice" : 12.03
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 13.71,
	"avgPrice" : 11.33
}, {
	"type" : "MAC-10",
	"name" : "Graven",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 13.00,
	"avgPrice" : 10.46
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Factory New",
	"marketPrice" : 1.35,
	"avgPrice" : 1.37
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.74,
	"avgPrice" : 0.73
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Field-Tested",
	"marketPrice" : 0.40,
	"avgPrice" : 0.41
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Well-Worn",
	"marketPrice" : 0.42,
	"avgPrice" : 0.40
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.38,
	"avgPrice" : 0.40
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.17,
	"avgPrice" : 5.46
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.37,
	"avgPrice" : 3.44
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.44,
	"avgPrice" : 1.41
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.40,
	"avgPrice" : 1.24
}, {
	"type" : "MAC-10",
	"name" : "Heat",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.16,
	"avgPrice" : 1.13
}, {
	"type" : "MAC-10",
	"name" : "Indigo",
	"quality" : "Factory New",
	"marketPrice" : 0.58,
	"avgPrice" : 0.55
}, {
	"type" : "MAG-7",
	"name" : "Silver",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.47,
	"avgPrice" : 0.44
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Silver",
	"quality" : "Factory New",
	"marketPrice" : 1.53,
	"avgPrice" : 1.62
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Silver",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.57,
	"avgPrice" : 2.99
}, {
	"type" : "MAG-7",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 0.55,
	"avgPrice" : 0.42
}, {
	"type" : "MAG-7",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "MAG-7",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "MAG-7",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "MAG-7",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 7.07,
	"avgPrice" : 9.32
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.55,
	"avgPrice" : 0.45
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.23
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.30,
	"avgPrice" : 0.34
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.31,
	"avgPrice" : 0.29
}, {
	"type" : "MP7",
	"name" : "Anodized Navy",
	"quality" : "Factory New",
	"marketPrice" : 0.37,
	"avgPrice" : 0.38
}, {
	"type" : "MP7",
	"name" : "Anodized Navy",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.42,
	"avgPrice" : 0.38
}, {
	"type" : "Souvenir MP7",
	"name" : "Anodized Navy",
	"quality" : "Factory New",
	"marketPrice" : 35.95,
	"avgPrice" : 28.24
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.53,
	"avgPrice" : 0.49
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.30,
	"avgPrice" : 0.30
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.25
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.32,
	"avgPrice" : 0.30
}, {
	"type" : "MP7",
	"name" : "Armor Core",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.39,
	"avgPrice" : 0.42
}, {
	"type" : "MP7",
	"name" : "Army Recon",
	"quality" : "Factory New",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "MP7",
	"name" : "Army Recon",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP7",
	"name" : "Army Recon",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP7",
	"name" : "Army Recon",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP7",
	"name" : "Army Recon",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir MP7",
	"name" : "Army Recon",
	"quality" : "Factory New",
	"marketPrice" : 99.99,
	"avgPrice" : 41.16
}, {
	"type" : "Souvenir MP7",
	"name" : "Army Recon",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.37,
	"avgPrice" : 2.47
}, {
	"type" : "Souvenir MP7",
	"name" : "Army Recon",
	"quality" : "Field-Tested",
	"marketPrice" : 1.34,
	"avgPrice" : 1.23
}, {
	"type" : "Souvenir MP7",
	"name" : "Army Recon",
	"quality" : "Well-Worn",
	"marketPrice" : 7.87,
	"avgPrice" : 2.11
}, {
	"type" : "Souvenir MP7",
	"name" : "Army Recon",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.76,
	"avgPrice" : 2.75
}, {
	"type" : "MP7",
	"name" : "Asterion",
	"quality" : "Factory New",
	"marketPrice" : 0.31,
	"avgPrice" : 0.30
}, {
	"type" : "MP7",
	"name" : "Asterion",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.24,
	"avgPrice" : 0.23
}, {
	"type" : "MP7",
	"name" : "Asterion",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.17
}, {
	"type" : "MP7",
	"name" : "Asterion",
	"quality" : "Well-Worn",
	"marketPrice" : 0.23,
	"avgPrice" : 0.21
}, {
	"type" : "MP7",
	"name" : "Asterion",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "MP7",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0.12,
	"avgPrice" : 0.12
}, {
	"type" : "MAG-7",
	"name" : "Heaven Guard",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MAG-7",
	"name" : "Heaven Guard",
	"quality" : "Well-Worn",
	"marketPrice" : 0.12,
	"avgPrice" : 0.11
}, {
	"type" : "MAG-7",
	"name" : "Heaven Guard",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.57,
	"avgPrice" : 0.51
}, {
	"type" : "MAG-7",
	"name" : "Heaven Guard",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.34,
	"avgPrice" : 0.34
}, {
	"type" : "MAG-7",
	"name" : "Heaven Guard",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.24
}, {
	"type" : "MAG-7",
	"name" : "Heaven Guard",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.32,
	"avgPrice" : 0.36
}, {
	"type" : "MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Factory New",
	"marketPrice" : 4.85,
	"avgPrice" : 4.48
}, {
	"type" : "MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.70,
	"avgPrice" : 0.72
}, {
	"type" : "MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Field-Tested",
	"marketPrice" : 0.32,
	"avgPrice" : 0.27
}, {
	"type" : "MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Well-Worn",
	"marketPrice" : 0.42,
	"avgPrice" : 0.45
}, {
	"type" : "MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.27,
	"avgPrice" : 0.28
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Factory New",
	"marketPrice" : 16.99,
	"avgPrice" : 18.54
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.17,
	"avgPrice" : 1.34
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Field-Tested",
	"marketPrice" : 0.54,
	"avgPrice" : 0.50
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Well-Worn",
	"marketPrice" : 0.60,
	"avgPrice" : 0.64
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Irradiated Alert",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.49,
	"avgPrice" : 0.49
}, {
	"type" : "MAG-7",
	"name" : "Memento",
	"quality" : "Factory New",
	"marketPrice" : 1.62,
	"avgPrice" : 1.59
}, {
	"type" : "MAG-7",
	"name" : "Memento",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.81,
	"avgPrice" : 0.87
}, {
	"type" : "MAG-7",
	"name" : "Memento",
	"quality" : "Field-Tested",
	"marketPrice" : 0.84,
	"avgPrice" : 0.86
}, {
	"type" : "MAG-7",
	"name" : "Memento",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 7.70,
	"avgPrice" : 6.90
}, {
	"type" : "MAG-7",
	"name" : "Memento",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.80,
	"avgPrice" : 1.48
}, {
	"type" : "MAG-7",
	"name" : "Memento",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.52,
	"avgPrice" : 1.47
}, {
	"type" : "MAG-7",
	"name" : "Metallic DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "MAG-7",
	"name" : "Metallic DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Metallic DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 1.40,
	"avgPrice" : 1.39
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Metallic DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.75,
	"avgPrice" : 3.68
}, {
	"type" : "MAG-7",
	"name" : "Praetorian",
	"quality" : "Factory New",
	"marketPrice" : 1.42,
	"avgPrice" : 1.30
}, {
	"type" : "MAG-7",
	"name" : "Praetorian",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.77,
	"avgPrice" : 0.78
}, {
	"type" : "MAG-7",
	"name" : "Praetorian",
	"quality" : "Field-Tested",
	"marketPrice" : 0.55,
	"avgPrice" : 0.54
}, {
	"type" : "MAG-7",
	"name" : "Praetorian",
	"quality" : "Well-Worn",
	"marketPrice" : 0.57,
	"avgPrice" : 0.56
}, {
	"type" : "MAG-7",
	"name" : "Praetorian",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.63,
	"avgPrice" : 5.64
}, {
	"type" : "MAG-7",
	"name" : "Praetorian",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.27,
	"avgPrice" : 3.47
}, {
	"type" : "MAG-7",
	"name" : "Praetorian",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.07,
	"avgPrice" : 2.07
}, {
	"type" : "MAG-7",
	"name" : "Praetorian",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.07,
	"avgPrice" : 2.17
}, {
	"type" : "MAG-7",
	"name" : "Sand Dune",
	"quality" : "Factory New",
	"marketPrice" : 9.48,
	"avgPrice" : 9.45
}, {
	"type" : "MAG-7",
	"name" : "Sand Dune",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.42,
	"avgPrice" : 0.44
}, {
	"type" : "MAG-7",
	"name" : "Sand Dune",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.18
}, {
	"type" : "MAG-7",
	"name" : "Sand Dune",
	"quality" : "Well-Worn",
	"marketPrice" : 0.65,
	"avgPrice" : 0.32
}, {
	"type" : "MAG-7",
	"name" : "Sand Dune",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Sand Dune",
	"quality" : "Factory New",
	"marketPrice" : 2.30,
	"avgPrice" : 2.49
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Sand Dune",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.25,
	"avgPrice" : 0.29
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Sand Dune",
	"quality" : "Field-Tested",
	"marketPrice" : 0.20,
	"avgPrice" : 0.18
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Sand Dune",
	"quality" : "Well-Worn",
	"marketPrice" : 0.23,
	"avgPrice" : 0.20
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Sand Dune",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.21,
	"avgPrice" : 0.20
}, {
	"type" : "MAG-7",
	"name" : "Seabird",
	"quality" : "Factory New",
	"marketPrice" : 0.35,
	"avgPrice" : 0.38
}, {
	"type" : "MAG-7",
	"name" : "Seabird",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MAG-7",
	"name" : "Seabird",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "MAG-7",
	"name" : "Seabird",
	"quality" : "Well-Worn",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "MAG-7",
	"name" : "Seabird",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "MAG-7",
	"name" : "Silver",
	"quality" : "Factory New",
	"marketPrice" : 0.43,
	"avgPrice" : 0.40
}, {
	"type" : "MP7",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP7",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP7",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP7",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP7",
	"name" : "Full Stop",
	"quality" : "Factory New",
	"marketPrice" : 2.82,
	"avgPrice" : 2.31
}, {
	"type" : "MP7",
	"name" : "Full Stop",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.30,
	"avgPrice" : 1.27
}, {
	"type" : "MP7",
	"name" : "Full Stop",
	"quality" : "Field-Tested",
	"marketPrice" : 0.92,
	"avgPrice" : 0.82
}, {
	"type" : "MP7",
	"name" : "Full Stop",
	"quality" : "Well-Worn",
	"marketPrice" : 1.17,
	"avgPrice" : 1.17
}, {
	"type" : "MP7",
	"name" : "Full Stop",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.23,
	"avgPrice" : 0.84
}, {
	"type" : "MP7",
	"name" : "Groundwater",
	"quality" : "Factory New",
	"marketPrice" : 4.74,
	"avgPrice" : 5.87
}, {
	"type" : "MP7",
	"name" : "Groundwater",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.49,
	"avgPrice" : 0.52
}, {
	"type" : "MP7",
	"name" : "Groundwater",
	"quality" : "Field-Tested",
	"marketPrice" : 0.37,
	"avgPrice" : 0.43
}, {
	"type" : "MP7",
	"name" : "Groundwater",
	"quality" : "Well-Worn",
	"marketPrice" : 0.70,
	"avgPrice" : 0.76
}, {
	"type" : "MP7",
	"name" : "Groundwater",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.85,
	"avgPrice" : 0.77
}, {
	"type" : "MP7",
	"name" : "Gunsmoke",
	"quality" : "Factory New",
	"marketPrice" : 4.57,
	"avgPrice" : 5.23
}, {
	"type" : "MP7",
	"name" : "Gunsmoke",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.38,
	"avgPrice" : 0.37
}, {
	"type" : "MP7",
	"name" : "Gunsmoke",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.20
}, {
	"type" : "MP7",
	"name" : "Gunsmoke",
	"quality" : "Well-Worn",
	"marketPrice" : 0.26,
	"avgPrice" : 0.22
}, {
	"type" : "MP7",
	"name" : "Gunsmoke",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "Souvenir MP7",
	"name" : "Gunsmoke",
	"quality" : "Factory New",
	"marketPrice" : 65.55,
	"avgPrice" : 46.68
}, {
	"type" : "Souvenir MP7",
	"name" : "Gunsmoke",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.99,
	"avgPrice" : 6.91
}, {
	"type" : "Souvenir MP7",
	"name" : "Gunsmoke",
	"quality" : "Field-Tested",
	"marketPrice" : 1.29,
	"avgPrice" : 1.54
}, {
	"type" : "Souvenir MP7",
	"name" : "Gunsmoke",
	"quality" : "Well-Worn",
	"marketPrice" : 2.30,
	"avgPrice" : 2.45
}, {
	"type" : "Souvenir MP7",
	"name" : "Gunsmoke",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.20,
	"avgPrice" : 1.24
}, {
	"type" : "MP7",
	"name" : "Impire",
	"quality" : "Factory New",
	"marketPrice" : 1.47,
	"avgPrice" : 1.35
}, {
	"type" : "MP7",
	"name" : "Impire",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.77,
	"avgPrice" : 0.81
}, {
	"type" : "MP7",
	"name" : "Impire",
	"quality" : "Field-Tested",
	"marketPrice" : 0.63,
	"avgPrice" : 0.55
}, {
	"type" : "MP7",
	"name" : "Impire",
	"quality" : "Well-Worn",
	"marketPrice" : 1.45,
	"avgPrice" : 1.12
}, {
	"type" : "MP7",
	"name" : "Impire",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.72,
	"avgPrice" : 5.85
}, {
	"type" : "MP7",
	"name" : "Impire",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.49,
	"avgPrice" : 3.60
}, {
	"type" : "MP7",
	"name" : "Impire",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.99,
	"avgPrice" : 2.16
}, {
	"type" : "MP7",
	"name" : "Impire",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.70,
	"avgPrice" : 4.48
}, {
	"type" : "MP7",
	"name" : "Nemesis",
	"quality" : "Factory New",
	"marketPrice" : 5.00,
	"avgPrice" : 5.24
}, {
	"type" : "MP7",
	"name" : "Nemesis",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.82,
	"avgPrice" : 3.75
}, {
	"type" : "MP7",
	"name" : "Nemesis",
	"quality" : "Field-Tested",
	"marketPrice" : 3.04,
	"avgPrice" : 2.99
}, {
	"type" : "MP7",
	"name" : "Nemesis",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 21.69,
	"avgPrice" : 21.38
}, {
	"type" : "MP7",
	"name" : "Nemesis",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 12.57,
	"avgPrice" : 12.44
}, {
	"type" : "MP7",
	"name" : "Nemesis",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 8.29,
	"avgPrice" : 8.26
}, {
	"type" : "MP7",
	"name" : "Ocean Foam",
	"quality" : "Factory New",
	"marketPrice" : 1.67,
	"avgPrice" : 1.45
}, {
	"type" : "MP7",
	"name" : "Ocean Foam",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.20,
	"avgPrice" : 1.82
}, {
	"type" : "MP7",
	"name" : "Ocean Foam",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.05,
	"avgPrice" : 4.91
}, {
	"type" : "MP7",
	"name" : "Ocean Foam",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 5.25,
	"avgPrice" : 5.67
}, {
	"type" : "MP7",
	"name" : "Olive Plaid",
	"quality" : "Factory New",
	"marketPrice" : 0.82,
	"avgPrice" : 1.02
}, {
	"type" : "MP7",
	"name" : "Olive Plaid",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.28,
	"avgPrice" : 0.31
}, {
	"type" : "MP7",
	"name" : "Olive Plaid",
	"quality" : "Field-Tested",
	"marketPrice" : 0.26,
	"avgPrice" : 0.32
}, {
	"type" : "MP7",
	"name" : "Olive Plaid",
	"quality" : "Well-Worn",
	"marketPrice" : 6.50,
	"avgPrice" : 1.36
}, {
	"type" : "MP7",
	"name" : "Olive Plaid",
	"quality" : "Battle-Scarred",
	"marketPrice" : 8.85,
	"avgPrice" : 9.52
}, {
	"type" : "MP7",
	"name" : "Orange Peel",
	"quality" : "Factory New",
	"marketPrice" : 5.41,
	"avgPrice" : 5.26
}, {
	"type" : "MP7",
	"name" : "Orange Peel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.97,
	"avgPrice" : 0.97
}, {
	"type" : "MP7",
	"name" : "Orange Peel",
	"quality" : "Field-Tested",
	"marketPrice" : 0.72,
	"avgPrice" : 0.73
}, {
	"type" : "MP7",
	"name" : "Orange Peel",
	"quality" : "Well-Worn",
	"marketPrice" : 1.53,
	"avgPrice" : 2.19
}, {
	"type" : "MP7",
	"name" : "Orange Peel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.58,
	"avgPrice" : 1.54
}, {
	"type" : "Souvenir MP7",
	"name" : "Orange Peel",
	"quality" : "Factory New",
	"marketPrice" : 73.04,
	"avgPrice" : 28.11
}, {
	"type" : "Souvenir MP7",
	"name" : "Orange Peel",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.14,
	"avgPrice" : 2.12
}, {
	"type" : "Souvenir MP7",
	"name" : "Orange Peel",
	"quality" : "Field-Tested",
	"marketPrice" : 1.09,
	"avgPrice" : 0.96
}, {
	"type" : "Souvenir MP7",
	"name" : "Orange Peel",
	"quality" : "Well-Worn",
	"marketPrice" : 1.31,
	"avgPrice" : 1.01
}, {
	"type" : "Souvenir MP7",
	"name" : "Orange Peel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.94,
	"avgPrice" : 0.92
}, {
	"type" : "MP7",
	"name" : "Skulls",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.08,
	"avgPrice" : 1.01
}, {
	"type" : "MP7",
	"name" : "Skulls",
	"quality" : "Field-Tested",
	"marketPrice" : 0.97,
	"avgPrice" : 0.85
}, {
	"type" : "MP7",
	"name" : "Skulls",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.22,
	"avgPrice" : 3.09
}, {
	"type" : "MP7",
	"name" : "Skulls",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.16,
	"avgPrice" : 2.20
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Factory New",
	"marketPrice" : 1.45,
	"avgPrice" : 1.34
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.75,
	"avgPrice" : 0.74
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Field-Tested",
	"marketPrice" : 0.50,
	"avgPrice" : 0.53
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Well-Worn",
	"marketPrice" : 0.57,
	"avgPrice" : 0.54
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.52,
	"avgPrice" : 0.49
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.20,
	"avgPrice" : 4.79
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.60,
	"avgPrice" : 2.60
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.61,
	"avgPrice" : 1.45
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.35,
	"avgPrice" : 1.41
}, {
	"type" : "MP7",
	"name" : "Special Delivery",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.24,
	"avgPrice" : 1.24
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Factory New",
	"marketPrice" : 0.15,
	"avgPrice" : 0.14
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.75,
	"avgPrice" : 0.76
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.39,
	"avgPrice" : 0.43
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.27,
	"avgPrice" : 0.27
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.38,
	"avgPrice" : 0.38
}, {
	"type" : "MP7",
	"name" : "Urban Hazard",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.39,
	"avgPrice" : 0.36
}, {
	"type" : "MP7",
	"name" : "Whiteout",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 421.25
}, {
	"type" : "MP7",
	"name" : "Whiteout",
	"quality" : "Minimal Wear",
	"marketPrice" : 28.48,
	"avgPrice" : 26.36
}, {
	"type" : "MP7",
	"name" : "Whiteout",
	"quality" : "Field-Tested",
	"marketPrice" : 1.57,
	"avgPrice" : 1.52
}, {
	"type" : "MP7",
	"name" : "Whiteout",
	"quality" : "Well-Worn",
	"marketPrice" : 1.75,
	"avgPrice" : 1.75
}, {
	"type" : "MP7",
	"name" : "Whiteout",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.00,
	"avgPrice" : 3.59
}, {
	"type" : "MP9",
	"name" : "Bulldozer",
	"quality" : "Minimal Wear",
	"marketPrice" : 25.23,
	"avgPrice" : 23.84
}, {
	"type" : "MP9",
	"name" : "Bulldozer",
	"quality" : "Field-Tested",
	"marketPrice" : 4.66,
	"avgPrice" : 4.69
}, {
	"type" : "MP9",
	"name" : "Bulldozer",
	"quality" : "Well-Worn",
	"marketPrice" : 24.54,
	"avgPrice" : 5.16
}, {
	"type" : "MP9",
	"name" : "Bulldozer",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.23,
	"avgPrice" : 4.54
}, {
	"type" : "MP9",
	"name" : "Dark Age",
	"quality" : "Factory New",
	"marketPrice" : 3.53,
	"avgPrice" : 3.38
}, {
	"type" : "MP9",
	"name" : "Dark Age",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.27,
	"avgPrice" : 3.20
}, {
	"type" : "MP9",
	"name" : "Dark Age",
	"quality" : "Field-Tested",
	"marketPrice" : 2.85,
	"avgPrice" : 3.16
}, {
	"type" : "Souvenir MP9",
	"name" : "Dark Age",
	"quality" : "Factory New",
	"marketPrice" : 5.23,
	"avgPrice" : 4.46
}, {
	"type" : "Souvenir MP9",
	"name" : "Dark Age",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.22,
	"avgPrice" : 3.33
}, {
	"type" : "Souvenir MP9",
	"name" : "Dark Age",
	"quality" : "Field-Tested",
	"marketPrice" : 4.64,
	"avgPrice" : 4.77
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Factory New",
	"marketPrice" : 0.39,
	"avgPrice" : 0.39
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.29,
	"avgPrice" : 0.30
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Field-Tested",
	"marketPrice" : 0.21,
	"avgPrice" : 0.21
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Well-Worn",
	"marketPrice" : 0.55,
	"avgPrice" : 0.52
}, {
	"type" : "MP9",
	"name" : "Rose Iron",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 5.17,
	"avgPrice" : 4.69
}, {
	"type" : "MP9",
	"name" : "Rose Iron",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.61,
	"avgPrice" : 3.56
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Factory New",
	"marketPrice" : 0.69,
	"avgPrice" : 0.72
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.41,
	"avgPrice" : 0.44
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Field-Tested",
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Well-Worn",
	"marketPrice" : 0.37,
	"avgPrice" : 0.41
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.41,
	"avgPrice" : 0.34
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.15,
	"avgPrice" : 3.29
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.14,
	"avgPrice" : 1.91
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.99,
	"avgPrice" : 1.00
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.09,
	"avgPrice" : 1.18
}, {
	"type" : "MP9",
	"name" : "Ruby Poison Dart",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.99,
	"avgPrice" : 1.04
}, {
	"type" : "MP9",
	"name" : "Sand Dashed",
	"quality" : "Factory New",
	"marketPrice" : 0.16,
	"avgPrice" : 0.15
}, {
	"type" : "MP9",
	"name" : "Sand Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP9",
	"name" : "Sand Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP9",
	"name" : "Sand Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "MP9",
	"name" : "Sand Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir MP9",
	"name" : "Sand Dashed",
	"quality" : "Factory New",
	"marketPrice" : 3.45,
	"avgPrice" : 3.06
}, {
	"type" : "Souvenir MP9",
	"name" : "Sand Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.58,
	"avgPrice" : 0.57
}, {
	"type" : "Souvenir MP9",
	"name" : "Sand Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.28,
	"avgPrice" : 0.29
}, {
	"type" : "Souvenir MP9",
	"name" : "Sand Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 0.43,
	"avgPrice" : 0.42
}, {
	"type" : "Souvenir MP9",
	"name" : "Sand Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.42,
	"avgPrice" : 0.41
}, {
	"type" : "MP9",
	"name" : "Setting Sun",
	"quality" : "Factory New",
	"marketPrice" : 2.19,
	"avgPrice" : 2.13
}, {
	"type" : "MP9",
	"name" : "Setting Sun",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.10,
	"avgPrice" : 1.06
}, {
	"type" : "MP9",
	"name" : "Setting Sun",
	"quality" : "Field-Tested",
	"marketPrice" : 0.46,
	"avgPrice" : 0.45
}, {
	"type" : "MP9",
	"name" : "Setting Sun",
	"quality" : "Well-Worn",
	"marketPrice" : 0.40,
	"avgPrice" : 0.39
}, {
	"type" : "MP9",
	"name" : "Setting Sun",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.37
}, {
	"type" : "Souvenir MP9",
	"name" : "Setting Sun",
	"quality" : "Factory New",
	"marketPrice" : 29.99,
	"avgPrice" : 26.69
}, {
	"type" : "Souvenir MP9",
	"name" : "Setting Sun",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.72,
	"avgPrice" : 4.91
}, {
	"type" : "Souvenir MP9",
	"name" : "Setting Sun",
	"quality" : "Field-Tested",
	"marketPrice" : 4.02,
	"avgPrice" : 2.27
}, {
	"type" : "Souvenir MP9",
	"name" : "Setting Sun",
	"quality" : "Well-Worn",
	"marketPrice" : 1.87,
	"avgPrice" : 1.68
}, {
	"type" : "Souvenir MP9",
	"name" : "Setting Sun",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.42,
	"avgPrice" : 1.20
}, {
	"type" : "MP9",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 0.53,
	"avgPrice" : 0.51
}, {
	"type" : "MP9",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "MP9",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "MP9",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "MP9",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir MP9",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 8.83,
	"avgPrice" : 8.70
}, {
	"type" : "Souvenir MP9",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.10,
	"avgPrice" : 1.00
}, {
	"type" : "Souvenir MP9",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.40,
	"avgPrice" : 0.38
}, {
	"type" : "Souvenir MP9",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.49,
	"avgPrice" : 0.57
}, {
	"type" : "Souvenir MP9",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.42,
	"avgPrice" : 0.39
}, {
	"type" : "MAG-7",
	"name" : "Bulldozer",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.03,
	"avgPrice" : 3.76
}, {
	"type" : "MAG-7",
	"name" : "Bulldozer",
	"quality" : "Field-Tested",
	"marketPrice" : 0.62,
	"avgPrice" : 0.61
}, {
	"type" : "MAG-7",
	"name" : "Bulldozer",
	"quality" : "Well-Worn",
	"marketPrice" : 0.93,
	"avgPrice" : 0.91
}, {
	"type" : "MAG-7",
	"name" : "Bulldozer",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.82,
	"avgPrice" : 0.72
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Bulldozer",
	"quality" : "Minimal Wear",
	"marketPrice" : 23.59,
	"avgPrice" : 23.36
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Bulldozer",
	"quality" : "Field-Tested",
	"marketPrice" : 4.20,
	"avgPrice" : 4.67
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Bulldozer",
	"quality" : "Well-Worn",
	"marketPrice" : 5.92,
	"avgPrice" : 5.94
}, {
	"type" : "Souvenir MAG-7",
	"name" : "Bulldozer",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.73,
	"avgPrice" : 4.10
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Factory New",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.08
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.97,
	"avgPrice" : 0.82
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.43,
	"avgPrice" : 0.40
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.27
}, {
	"type" : "MAG-7",
	"name" : "Cobalt Core",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.26
}, {
	"type" : "MAG-7",
	"name" : "Counter Terrace",
	"quality" : "Factory New",
	"marketPrice" : 3.23,
	"avgPrice" : 3.39
}, {
	"type" : "MAG-7",
	"name" : "Counter Terrace",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.13,
	"avgPrice" : 2.66
}, {
	"type" : "MAG-7",
	"name" : "Counter Terrace",
	"quality" : "Field-Tested",
	"marketPrice" : 2.68,
	"avgPrice" : 2.24
}, {
	"type" : "MAG-7",
	"name" : "Counter Terrace",
	"quality" : "Well-Worn",
	"marketPrice" : 1.93,
	"avgPrice" : 1.80
}, {
	"type" : "MAG-7",
	"name" : "Counter Terrace",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.10,
	"avgPrice" : 1.67
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Factory New",
	"marketPrice" : 1.29,
	"avgPrice" : 1.32
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.19,
	"avgPrice" : 0.19
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.17
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Well-Worn",
	"marketPrice" : 0.30,
	"avgPrice" : 0.30
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.53,
	"avgPrice" : 0.56
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.37,
	"avgPrice" : 3.58
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.78,
	"avgPrice" : 0.80
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.57,
	"avgPrice" : 0.56
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.57,
	"avgPrice" : 0.63
}, {
	"type" : "MAG-7",
	"name" : "Firestarter",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.05,
	"avgPrice" : 0.98
}, {
	"type" : "MAG-7",
	"name" : "Hazard",
	"quality" : "Factory New",
	"marketPrice" : 150.00,
	"avgPrice" : 161.49
}, {
	"type" : "MAG-7",
	"name" : "Hazard",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.27,
	"avgPrice" : 5.99
}, {
	"type" : "MAG-7",
	"name" : "Hazard",
	"quality" : "Field-Tested",
	"marketPrice" : 3.65,
	"avgPrice" : 2.65
}, {
	"type" : "MAG-7",
	"name" : "Hazard",
	"quality" : "Well-Worn",
	"marketPrice" : 3.35,
	"avgPrice" : 2.79
}, {
	"type" : "MAG-7",
	"name" : "Hazard",
	"quality" : "Battle-Scarred",
	"marketPrice" : 19.98,
	"avgPrice" : 5.01
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Factory New",
	"marketPrice" : 1.06,
	"avgPrice" : 1.02
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.35,
	"avgPrice" : 0.35
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Field-Tested",
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Well-Worn",
	"marketPrice" : 0.30,
	"avgPrice" : 0.30
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.30,
	"avgPrice" : 0.30
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.75,
	"avgPrice" : 4.72
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.74,
	"avgPrice" : 1.69
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.72,
	"avgPrice" : 0.73
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.76,
	"avgPrice" : 0.72
}, {
	"type" : "MAG-7",
	"name" : "Heat",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.76,
	"avgPrice" : 0.71
}, {
	"type" : "MAG-7",
	"name" : "Heaven Guard",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "MAG-7",
	"name" : "Heaven Guard",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.98,
	"avgPrice" : 0.66
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.07,
	"avgPrice" : 1.27
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.89,
	"avgPrice" : 0.92
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.51,
	"avgPrice" : 0.60
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.80,
	"avgPrice" : 0.74
}, {
	"type" : "MP9",
	"name" : "Dart",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.81,
	"avgPrice" : 1.68
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Factory New",
	"marketPrice" : 0.63,
	"avgPrice" : 0.66
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.18,
	"avgPrice" : 0.20
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Field-Tested",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Well-Worn",
	"marketPrice" : 0.12,
	"avgPrice" : 0.12
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.11
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.87,
	"avgPrice" : 3.03
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.61,
	"avgPrice" : 0.59
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.39,
	"avgPrice" : 0.35
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.30,
	"avgPrice" : 0.31
}, {
	"type" : "MP9",
	"name" : "Deadly Poison",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.31,
	"avgPrice" : 0.30
}, {
	"type" : "MP9",
	"name" : "Dry Season",
	"quality" : "Factory New",
	"marketPrice" : 4.25,
	"avgPrice" : 4.31
}, {
	"type" : "MP9",
	"name" : "Dry Season",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.65,
	"avgPrice" : 0.63
}, {
	"type" : "MP9",
	"name" : "Dry Season",
	"quality" : "Field-Tested",
	"marketPrice" : 0.47,
	"avgPrice" : 0.53
}, {
	"type" : "MP9",
	"name" : "Dry Season",
	"quality" : "Well-Worn",
	"marketPrice" : 1.32,
	"avgPrice" : 1.36
}, {
	"type" : "MP9",
	"name" : "Dry Season",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.70,
	"avgPrice" : 0.71
}, {
	"type" : "MP9",
	"name" : "Green Plaid",
	"quality" : "Factory New",
	"marketPrice" : 0.57,
	"avgPrice" : 0.65
}, {
	"type" : "MP9",
	"name" : "Green Plaid",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.42,
	"avgPrice" : 0.39
}, {
	"type" : "MP9",
	"name" : "Green Plaid",
	"quality" : "Field-Tested",
	"marketPrice" : 0.26,
	"avgPrice" : 0.25
}, {
	"type" : "MP9",
	"name" : "Green Plaid",
	"quality" : "Well-Worn",
	"marketPrice" : 0.32,
	"avgPrice" : 0.30
}, {
	"type" : "MP9",
	"name" : "Green Plaid",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.90,
	"avgPrice" : 1.52
}, {
	"type" : "MP9",
	"name" : "Hot Rod",
	"quality" : "Factory New",
	"marketPrice" : 5.20,
	"avgPrice" : 5.89
}, {
	"type" : "MP9",
	"name" : "Hot Rod",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.24,
	"avgPrice" : 6.55
}, {
	"type" : "Souvenir MP9",
	"name" : "Hot Rod",
	"quality" : "Factory New",
	"marketPrice" : 14.00,
	"avgPrice" : 14.39
}, {
	"type" : "Souvenir MP9",
	"name" : "Hot Rod",
	"quality" : "Minimal Wear",
	"marketPrice" : 24.16,
	"avgPrice" : 17.71
}, {
	"type" : "MP9",
	"name" : "Hypnotic",
	"quality" : "Factory New",
	"marketPrice" : 1.45,
	"avgPrice" : 1.34
}, {
	"type" : "MP9",
	"name" : "Hypnotic",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.08,
	"avgPrice" : 2.93
}, {
	"type" : "MP9",
	"name" : "Hypnotic",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.18,
	"avgPrice" : 6.28
}, {
	"type" : "MP9",
	"name" : "Hypnotic",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 34.01,
	"avgPrice" : 27.81
}, {
	"type" : "MP9",
	"name" : "Orange Peel",
	"quality" : "Factory New",
	"marketPrice" : 0.89,
	"avgPrice" : 0.50
}, {
	"type" : "MP9",
	"name" : "Orange Peel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.09,
	"avgPrice" : 0.07
}, {
	"type" : "MP9",
	"name" : "Orange Peel",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "MP9",
	"name" : "Orange Peel",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "MP9",
	"name" : "Orange Peel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir MP9",
	"name" : "Orange Peel",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.56,
	"avgPrice" : 6.25
}, {
	"type" : "Souvenir MP9",
	"name" : "Orange Peel",
	"quality" : "Field-Tested",
	"marketPrice" : 2.58,
	"avgPrice" : 2.38
}, {
	"type" : "Souvenir MP9",
	"name" : "Orange Peel",
	"quality" : "Well-Worn",
	"marketPrice" : 12.99,
	"avgPrice" : 8.89
}, {
	"type" : "Souvenir MP9",
	"name" : "Orange Peel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 11.39,
	"avgPrice" : 7.90
}, {
	"type" : "MP9",
	"name" : "Pandora's Box",
	"quality" : "Factory New",
	"marketPrice" : 9.80,
	"avgPrice" : 8.28
}, {
	"type" : "MP9",
	"name" : "Pandora's Box",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.77,
	"avgPrice" : 7.33
}, {
	"type" : "MP9",
	"name" : "Pandora's Box",
	"quality" : "Field-Tested",
	"marketPrice" : 9.49,
	"avgPrice" : 7.21
}, {
	"type" : "MP9",
	"name" : "Rose Iron",
	"quality" : "Factory New",
	"marketPrice" : 2.19,
	"avgPrice" : 2.18
}, {
	"type" : "MP9",
	"name" : "Rose Iron",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.96,
	"avgPrice" : 1.88
}, {
	"type" : "MP9",
	"name" : "Rose Iron",
	"quality" : "Field-Tested",
	"marketPrice" : 1.78,
	"avgPrice" : 1.69
}, {
	"type" : "MP9",
	"name" : "Rose Iron",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 7.33,
	"avgPrice" : 6.97
}, {
	"type" : "Souvenir Negev",
	"name" : "Nuclear Waste",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.73,
	"avgPrice" : 0.64
}, {
	"type" : "Souvenir Negev",
	"name" : "Nuclear Waste",
	"quality" : "Field-Tested",
	"marketPrice" : 0.46,
	"avgPrice" : 0.44
}, {
	"type" : "Souvenir Negev",
	"name" : "Nuclear Waste",
	"quality" : "Well-Worn",
	"marketPrice" : 1.00,
	"avgPrice" : 0.93
}, {
	"type" : "Negev",
	"name" : "Palm",
	"quality" : "Factory New",
	"marketPrice" : 10.81,
	"avgPrice" : 11.51
}, {
	"type" : "Negev",
	"name" : "Palm",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.01,
	"avgPrice" : 3.14
}, {
	"type" : "Negev",
	"name" : "Palm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.76,
	"avgPrice" : 0.62
}, {
	"type" : "Negev",
	"name" : "Palm",
	"quality" : "Well-Worn",
	"marketPrice" : 1.21,
	"avgPrice" : 1.48
}, {
	"type" : "Negev",
	"name" : "Palm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.44,
	"avgPrice" : 1.53
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Factory New",
	"marketPrice" : 2.69,
	"avgPrice" : 2.41
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.12,
	"avgPrice" : 1.15
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Field-Tested",
	"marketPrice" : 0.61,
	"avgPrice" : 0.65
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Well-Worn",
	"marketPrice" : 0.63,
	"avgPrice" : 0.57
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.62,
	"avgPrice" : 0.53
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 13.20,
	"avgPrice" : 12.73
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 6.35,
	"avgPrice" : 5.08
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.95,
	"avgPrice" : 2.26
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.40,
	"avgPrice" : 1.57
}, {
	"type" : "Negev",
	"name" : "Power Loader",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.47,
	"avgPrice" : 1.34
}, {
	"type" : "Negev",
	"name" : "Terrain",
	"quality" : "Factory New",
	"marketPrice" : 0.15,
	"avgPrice" : 0.14
}, {
	"type" : "Negev",
	"name" : "Terrain",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Negev",
	"name" : "Terrain",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Negev",
	"name" : "Terrain",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Negev",
	"name" : "Terrain",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.53,
	"avgPrice" : 0.47
}, {
	"type" : "Negev",
	"name" : "Terrain",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.34,
	"avgPrice" : 0.33
}, {
	"type" : "Negev",
	"name" : "Terrain",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.24,
	"avgPrice" : 0.24
}, {
	"type" : "Negev",
	"name" : "Terrain",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.29
}, {
	"type" : "Nova",
	"name" : "Antique",
	"quality" : "Factory New",
	"marketPrice" : 3.62,
	"avgPrice" : 3.45
}, {
	"type" : "Nova",
	"name" : "Antique",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.84,
	"avgPrice" : 3.01
}, {
	"type" : "Nova",
	"name" : "Antique",
	"quality" : "Field-Tested",
	"marketPrice" : 3.60,
	"avgPrice" : 3.49
}, {
	"type" : "Nova",
	"name" : "Antique",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 12.25,
	"avgPrice" : 9.39
}, {
	"type" : "Nova",
	"name" : "Antique",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 10.19,
	"avgPrice" : 7.31
}, {
	"type" : "Nova",
	"name" : "Antique",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 11.00,
	"avgPrice" : 7.75
}, {
	"type" : "Nova",
	"name" : "Blaze Orange",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 62.38
}, {
	"type" : "Nova",
	"name" : "Blaze Orange",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.74,
	"avgPrice" : 6.30
}, {
	"type" : "Nova",
	"name" : "Blaze Orange",
	"quality" : "Field-Tested",
	"marketPrice" : 2.44,
	"avgPrice" : 2.26
}, {
	"type" : "Nova",
	"name" : "Blaze Orange",
	"quality" : "Well-Worn",
	"marketPrice" : 6.26,
	"avgPrice" : 5.45
}, {
	"type" : "Nova",
	"name" : "Blaze Orange",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.64,
	"avgPrice" : 3.86
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Factory New",
	"marketPrice" : 16.00,
	"avgPrice" : 17.09
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.56,
	"avgPrice" : 2.83
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Field-Tested",
	"marketPrice" : 1.95,
	"avgPrice" : 1.90
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Well-Worn",
	"marketPrice" : 2.96,
	"avgPrice" : 2.68
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.46,
	"avgPrice" : 2.14
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 110.00,
	"avgPrice" : 84.78
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 14.61,
	"avgPrice" : 12.66
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.70,
	"avgPrice" : 5.55
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 7.87,
	"avgPrice" : 6.07
}, {
	"type" : "Nova",
	"name" : "Bloomstick",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 5.49,
	"avgPrice" : 6.22
}, {
	"type" : "Nova",
	"name" : "Caged Steel",
	"quality" : "Factory New",
	"marketPrice" : 0.08,
	"avgPrice" : 0.06
}, {
	"type" : "Nova",
	"name" : "Caged Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Nova",
	"name" : "Caged Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Negev",
	"name" : "Army Sheen",
	"quality" : "Factory New",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "Negev",
	"name" : "Army Sheen",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Negev",
	"name" : "Army Sheen",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Factory New",
	"marketPrice" : 1.78,
	"avgPrice" : 1.74
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.39,
	"avgPrice" : 0.39
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Field-Tested",
	"marketPrice" : 0.20,
	"avgPrice" : 0.21
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Well-Worn",
	"marketPrice" : 0.20,
	"avgPrice" : 0.19
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.21,
	"avgPrice" : 5.86
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.93,
	"avgPrice" : 1.09
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.43,
	"avgPrice" : 0.46
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.53,
	"avgPrice" : 0.53
}, {
	"type" : "Negev",
	"name" : "Bratatat",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.49,
	"avgPrice" : 0.46
}, {
	"type" : "Negev",
	"name" : "CaliCamo",
	"quality" : "Factory New",
	"marketPrice" : 1.53,
	"avgPrice" : 1.39
}, {
	"type" : "Negev",
	"name" : "CaliCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.99,
	"avgPrice" : 1.05
}, {
	"type" : "Negev",
	"name" : "CaliCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.76,
	"avgPrice" : 0.74
}, {
	"type" : "Negev",
	"name" : "CaliCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 1.00,
	"avgPrice" : 1.37
}, {
	"type" : "Negev",
	"name" : "CaliCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.98,
	"avgPrice" : 0.82
}, {
	"type" : "Souvenir Negev",
	"name" : "CaliCamo",
	"quality" : "Factory New",
	"marketPrice" : 1.47,
	"avgPrice" : 1.40
}, {
	"type" : "Souvenir Negev",
	"name" : "CaliCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.65,
	"avgPrice" : 0.73
}, {
	"type" : "Souvenir Negev",
	"name" : "CaliCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.48,
	"avgPrice" : 0.50
}, {
	"type" : "Souvenir Negev",
	"name" : "CaliCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.92,
	"avgPrice" : 0.77
}, {
	"type" : "Souvenir Negev",
	"name" : "CaliCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.58,
	"avgPrice" : 0.61
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.52,
	"avgPrice" : 0.44
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.28,
	"avgPrice" : 0.25
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.23
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.28,
	"avgPrice" : 0.26
}, {
	"type" : "Negev",
	"name" : "Desert-Strike",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.30,
	"avgPrice" : 0.25
}, {
	"type" : "Negev",
	"name" : "Loudmouth",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.92,
	"avgPrice" : 1.83
}, {
	"type" : "Negev",
	"name" : "Loudmouth",
	"quality" : "Field-Tested",
	"marketPrice" : 0.29,
	"avgPrice" : 0.30
}, {
	"type" : "Negev",
	"name" : "Loudmouth",
	"quality" : "Well-Worn",
	"marketPrice" : 0.37,
	"avgPrice" : 0.40
}, {
	"type" : "Negev",
	"name" : "Loudmouth",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.31,
	"avgPrice" : 0.30
}, {
	"type" : "Negev",
	"name" : "Loudmouth",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 8.80,
	"avgPrice" : 6.80
}, {
	"type" : "Negev",
	"name" : "Loudmouth",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.82,
	"avgPrice" : 0.84
}, {
	"type" : "Negev",
	"name" : "Loudmouth",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.87,
	"avgPrice" : 0.88
}, {
	"type" : "Negev",
	"name" : "Loudmouth",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.78,
	"avgPrice" : 0.79
}, {
	"type" : "Negev",
	"name" : "Man-o'-war",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Negev",
	"name" : "Man-o'-war",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Negev",
	"name" : "Man-o'-war",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.26
}, {
	"type" : "Negev",
	"name" : "Man-o'-war",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.25
}, {
	"type" : "Negev",
	"name" : "Nuclear Waste",
	"quality" : "Factory New",
	"marketPrice" : 0.34,
	"avgPrice" : 0.32
}, {
	"type" : "Negev",
	"name" : "Nuclear Waste",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.23,
	"avgPrice" : 0.22
}, {
	"type" : "Negev",
	"name" : "Nuclear Waste",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "Negev",
	"name" : "Nuclear Waste",
	"quality" : "Well-Worn",
	"marketPrice" : 0.37,
	"avgPrice" : 0.34
}, {
	"type" : "Souvenir Negev",
	"name" : "Nuclear Waste",
	"quality" : "Factory New",
	"marketPrice" : 1.17,
	"avgPrice" : 1.24
}, {
	"type" : "Negev",
	"name" : "Anodized Navy",
	"quality" : "Factory New",
	"marketPrice" : 58.48,
	"avgPrice" : 59.14
}, {
	"type" : "Negev",
	"name" : "Anodized Navy",
	"quality" : "Minimal Wear",
	"marketPrice" : 89.89,
	"avgPrice" : 63.13
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 45.78,
	"avgPrice" : 48.09
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 47.20,
	"avgPrice" : 52.14
}, {
	"type" : "M4A4",
	"name" : "Royal Paladin",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 42.13,
	"avgPrice" : 36.45
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Factory New",
	"marketPrice" : 21.50,
	"avgPrice" : 22.01
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.95,
	"avgPrice" : 14.95
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Field-Tested",
	"marketPrice" : 7.86,
	"avgPrice" : 8.01
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Well-Worn",
	"marketPrice" : 8.53,
	"avgPrice" : 7.75
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.02,
	"avgPrice" : 5.80
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 101.77,
	"avgPrice" : 87.18
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 55.27,
	"avgPrice" : 59.23
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 34.50,
	"avgPrice" : 35.24
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 40.44,
	"avgPrice" : 35.26
}, {
	"type" : "M4A4",
	"name" : "The Battlestar",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 24.75,
	"avgPrice" : 27.18
}, {
	"type" : "M4A4",
	"name" : "Tornado",
	"quality" : "Factory New",
	"marketPrice" : 26.74,
	"avgPrice" : 23.72
}, {
	"type" : "M4A4",
	"name" : "Tornado",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.77,
	"avgPrice" : 1.94
}, {
	"type" : "M4A4",
	"name" : "Tornado",
	"quality" : "Field-Tested",
	"marketPrice" : 0.63,
	"avgPrice" : 0.63
}, {
	"type" : "M4A4",
	"name" : "Tornado",
	"quality" : "Well-Worn",
	"marketPrice" : 0.97,
	"avgPrice" : 0.97
}, {
	"type" : "M4A4",
	"name" : "Tornado",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.76,
	"avgPrice" : 0.75
}, {
	"type" : "Souvenir M4A4",
	"name" : "Tornado",
	"quality" : "Factory New",
	"marketPrice" : 106.74,
	"avgPrice" : 55.51
}, {
	"type" : "Souvenir M4A4",
	"name" : "Tornado",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.49,
	"avgPrice" : 7.39
}, {
	"type" : "Souvenir M4A4",
	"name" : "Tornado",
	"quality" : "Field-Tested",
	"marketPrice" : 2.72,
	"avgPrice" : 2.97
}, {
	"type" : "Souvenir M4A4",
	"name" : "Tornado",
	"quality" : "Well-Worn",
	"marketPrice" : 3.52,
	"avgPrice" : 3.51
}, {
	"type" : "Souvenir M4A4",
	"name" : "Tornado",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.79,
	"avgPrice" : 2.81
}, {
	"type" : "M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 4.46,
	"avgPrice" : 4.28
}, {
	"type" : "M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.42,
	"avgPrice" : 0.45
}, {
	"type" : "M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 0.20,
	"avgPrice" : 0.20
}, {
	"type" : "M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Souvenir M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 331.44,
	"avgPrice" : 239.47
}, {
	"type" : "Souvenir M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 20.21,
	"avgPrice" : 19.59
}, {
	"type" : "Souvenir M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 5.30,
	"avgPrice" : 5.00
}, {
	"type" : "Souvenir M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 4.98,
	"avgPrice" : 8.30
}, {
	"type" : "Souvenir M4A4",
	"name" : "Urban DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.15,
	"avgPrice" : 5.05
}, {
	"type" : "M4A4",
	"name" : "X-Ray",
	"quality" : "Factory New",
	"marketPrice" : 8.60,
	"avgPrice" : 8.69
}, {
	"type" : "M4A4",
	"name" : "X-Ray",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.36,
	"avgPrice" : 6.30
}, {
	"type" : "M4A4",
	"name" : "X-Ray",
	"quality" : "Field-Tested",
	"marketPrice" : 5.76,
	"avgPrice" : 5.66
}, {
	"type" : "M4A4",
	"name" : "X-Ray",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 63.89,
	"avgPrice" : 64.60
}, {
	"type" : "M4A4",
	"name" : "X-Ray",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 39.47,
	"avgPrice" : 37.94
}, {
	"type" : "M4A4",
	"name" : "X-Ray",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 35.45,
	"avgPrice" : 29.03
}, {
	"type" : "M4A4",
	"name" : "Zirka",
	"quality" : "Factory New",
	"marketPrice" : 19.55,
	"avgPrice" : 18.64
}, {
	"type" : "M4A4",
	"name" : "Zirka",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.99,
	"avgPrice" : 4.80
}, {
	"type" : "M4A4",
	"name" : "Zirka",
	"quality" : "Field-Tested",
	"marketPrice" : 4.55,
	"avgPrice" : 4.38
}, {
	"type" : "M4A4",
	"name" : "Zirka",
	"quality" : "Well-Worn",
	"marketPrice" : 4.83,
	"avgPrice" : 4.50
}, {
	"type" : "M4A4",
	"name" : "Zirka",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 90.00,
	"avgPrice" : 85.87
}, {
	"type" : "M4A4",
	"name" : "Zirka",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 16.95,
	"avgPrice" : 16.53
}, {
	"type" : "M4A4",
	"name" : "Zirka",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 13.71,
	"avgPrice" : 13.24
}, {
	"type" : "M4A4",
	"name" : "Zirka",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 15.75,
	"avgPrice" : 13.49
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Factory New",
	"marketPrice" : 12.80,
	"avgPrice" : 12.50
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.44,
	"avgPrice" : 6.17
}, {
	"type" : "M4A4",
	"name" : "Dragon King",
	"quality" : "Field-Tested",
	"marketPrice" : 3.27,
	"avgPrice" : 3.51
}, {
	"type" : "Souvenir P2000",
	"name" : "Chainmail",
	"quality" : "Field-Tested",
	"marketPrice" : 4.60,
	"avgPrice" : 4.93
}, {
	"type" : "P2000",
	"name" : "Coach Class",
	"quality" : "Factory New",
	"marketPrice" : 3.96,
	"avgPrice" : 3.18
}, {
	"type" : "P2000",
	"name" : "Coach Class",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.09,
	"avgPrice" : 1.14
}, {
	"type" : "P2000",
	"name" : "Coach Class",
	"quality" : "Field-Tested",
	"marketPrice" : 0.53,
	"avgPrice" : 0.55
}, {
	"type" : "P2000",
	"name" : "Coach Class",
	"quality" : "Well-Worn",
	"marketPrice" : 0.85,
	"avgPrice" : 0.77
}, {
	"type" : "P2000",
	"name" : "Coach Class",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.83,
	"avgPrice" : 0.69
}, {
	"type" : "P2000",
	"name" : "Corticera",
	"quality" : "Factory New",
	"marketPrice" : 4.75,
	"avgPrice" : 4.80
}, {
	"type" : "P2000",
	"name" : "Corticera",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.35,
	"avgPrice" : 2.43
}, {
	"type" : "P2000",
	"name" : "Corticera",
	"quality" : "Field-Tested",
	"marketPrice" : 2.32,
	"avgPrice" : 2.38
}, {
	"type" : "P2000",
	"name" : "Corticera",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 25.79,
	"avgPrice" : 24.01
}, {
	"type" : "P2000",
	"name" : "Corticera",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 10.06,
	"avgPrice" : 11.14
}, {
	"type" : "P2000",
	"name" : "Corticera",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.84,
	"avgPrice" : 8.01
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Factory New",
	"marketPrice" : 16.64,
	"avgPrice" : 16.43
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Minimal Wear",
	"marketPrice" : 10.30,
	"avgPrice" : 10.49
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Field-Tested",
	"marketPrice" : 8.16,
	"avgPrice" : 8.37
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Well-Worn",
	"marketPrice" : 9.29,
	"avgPrice" : 8.90
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Battle-Scarred",
	"marketPrice" : 8.20,
	"avgPrice" : 7.90
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 127.00,
	"avgPrice" : 118.22
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 96.07,
	"avgPrice" : 64.52
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 50.32,
	"avgPrice" : 48.05
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 67.19,
	"avgPrice" : 45.70
}, {
	"type" : "P2000",
	"name" : "Fire Elemental",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 56.39,
	"avgPrice" : 41.86
}, {
	"type" : "P2000",
	"name" : "Granite Marbleized",
	"quality" : "Factory New",
	"marketPrice" : 0.28,
	"avgPrice" : 0.31
}, {
	"type" : "P2000",
	"name" : "Granite Marbleized",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "P2000",
	"name" : "Granite Marbleized",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "P2000",
	"name" : "Granite Marbleized",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "P2000",
	"name" : "Granite Marbleized",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir P2000",
	"name" : "Granite Marbleized",
	"quality" : "Minimal Wear",
	"marketPrice" : 13.08,
	"avgPrice" : 23.08
}, {
	"type" : "Souvenir P2000",
	"name" : "Granite Marbleized",
	"quality" : "Field-Tested",
	"marketPrice" : 5.69,
	"avgPrice" : 4.43
}, {
	"type" : "Souvenir P2000",
	"name" : "Granite Marbleized",
	"quality" : "Well-Worn",
	"marketPrice" : 17.42,
	"avgPrice" : 12.02
}, {
	"type" : "Souvenir P2000",
	"name" : "Granite Marbleized",
	"quality" : "Battle-Scarred",
	"marketPrice" : 14.50,
	"avgPrice" : 6.59
}, {
	"type" : "P2000",
	"name" : "Grassland",
	"quality" : "Factory New",
	"marketPrice" : 2.37,
	"avgPrice" : 2.12
}, {
	"type" : "P2000",
	"name" : "Grassland",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.35,
	"avgPrice" : 0.34
}, {
	"type" : "P2000",
	"name" : "Grassland",
	"quality" : "Field-Tested",
	"marketPrice" : 0.21,
	"avgPrice" : 0.20
}, {
	"type" : "P2000",
	"name" : "Grassland",
	"quality" : "Well-Worn",
	"marketPrice" : 0.23,
	"avgPrice" : 0.19
}, {
	"type" : "P2000",
	"name" : "Grassland",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.18,
	"avgPrice" : 0.17
}, {
	"type" : "Souvenir P2000",
	"name" : "Grassland",
	"quality" : "Factory New",
	"marketPrice" : 50.00,
	"avgPrice" : 24.05
}, {
	"type" : "Souvenir P2000",
	"name" : "Grassland",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.87,
	"avgPrice" : 3.07
}, {
	"type" : "Souvenir P2000",
	"name" : "Grassland",
	"quality" : "Field-Tested",
	"marketPrice" : 2.23,
	"avgPrice" : 1.18
}, {
	"type" : "Souvenir P2000",
	"name" : "Grassland",
	"quality" : "Well-Worn",
	"marketPrice" : 2.39,
	"avgPrice" : 1.65
}, {
	"type" : "Souvenir P2000",
	"name" : "Grassland",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.70,
	"avgPrice" : 1.48
}, {
	"type" : "P2000",
	"name" : "Grassland Leaves",
	"quality" : "Factory New",
	"marketPrice" : 20.70,
	"avgPrice" : 14.99
}, {
	"type" : "P2000",
	"name" : "Grassland Leaves",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.25,
	"avgPrice" : 2.08
}, {
	"type" : "P2000",
	"name" : "Grassland Leaves",
	"quality" : "Field-Tested",
	"marketPrice" : 0.89,
	"avgPrice" : 0.85
}, {
	"type" : "P2000",
	"name" : "Grassland Leaves",
	"quality" : "Well-Worn",
	"marketPrice" : 2.77,
	"avgPrice" : 2.69
}, {
	"type" : "P2000",
	"name" : "Grassland Leaves",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.84,
	"avgPrice" : 4.98
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Factory New",
	"marketPrice" : 1.93,
	"avgPrice" : 2.11
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.53,
	"avgPrice" : 0.50
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Field-Tested",
	"marketPrice" : 0.30,
	"avgPrice" : 0.32
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Well-Worn",
	"marketPrice" : 0.30,
	"avgPrice" : 0.31
}, {
	"type" : "Nova",
	"name" : "Moon in Libra",
	"quality" : "Factory New",
	"marketPrice" : 0.30,
	"avgPrice" : 0.28
}, {
	"type" : "Nova",
	"name" : "Moon in Libra",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.23,
	"avgPrice" : 0.23
}, {
	"type" : "Nova",
	"name" : "Moon in Libra",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "Nova",
	"name" : "Moon in Libra",
	"quality" : "Well-Worn",
	"marketPrice" : 0.17,
	"avgPrice" : 0.17
}, {
	"type" : "Nova",
	"name" : "Moon in Libra",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.19,
	"avgPrice" : 0.17
}, {
	"type" : "Nova",
	"name" : "Polar Mesh",
	"quality" : "Factory New",
	"marketPrice" : 0.30,
	"avgPrice" : 0.17
}, {
	"type" : "Nova",
	"name" : "Polar Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Polar Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Polar Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Polar Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Nova",
	"name" : "Polar Mesh",
	"quality" : "Factory New",
	"marketPrice" : 6.03,
	"avgPrice" : 4.21
}, {
	"type" : "Souvenir Nova",
	"name" : "Polar Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.55,
	"avgPrice" : 0.59
}, {
	"type" : "Souvenir Nova",
	"name" : "Polar Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "Souvenir Nova",
	"name" : "Polar Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.37,
	"avgPrice" : 0.35
}, {
	"type" : "Souvenir Nova",
	"name" : "Polar Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.41,
	"avgPrice" : 0.38
}, {
	"type" : "Nova",
	"name" : "Predator",
	"quality" : "Factory New",
	"marketPrice" : 0.15,
	"avgPrice" : 0.13
}, {
	"type" : "Nova",
	"name" : "Predator",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Predator",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Predator",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Predator",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Nova",
	"name" : "Predator",
	"quality" : "Factory New",
	"marketPrice" : 5.15,
	"avgPrice" : 4.71
}, {
	"type" : "Souvenir Nova",
	"name" : "Predator",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.49,
	"avgPrice" : 0.38
}, {
	"type" : "Souvenir Nova",
	"name" : "Predator",
	"quality" : "Field-Tested",
	"marketPrice" : 0.24,
	"avgPrice" : 0.23
}, {
	"type" : "Souvenir Nova",
	"name" : "Predator",
	"quality" : "Well-Worn",
	"marketPrice" : 0.43,
	"avgPrice" : 0.47
}, {
	"type" : "Souvenir Nova",
	"name" : "Predator",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.24,
	"avgPrice" : 0.24
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Factory New",
	"marketPrice" : 0.21,
	"avgPrice" : 0.20
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.12,
	"avgPrice" : 0.10
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.27,
	"avgPrice" : 1.14
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.43,
	"avgPrice" : 0.43
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.25
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.24
}, {
	"type" : "Nova",
	"name" : "Ranger",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.24
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Factory New",
	"marketPrice" : 1.93,
	"avgPrice" : 1.75
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.28,
	"avgPrice" : 1.24
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Field-Tested",
	"marketPrice" : 1.08,
	"avgPrice" : 1.10
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Well-Worn",
	"marketPrice" : 3.00,
	"avgPrice" : 1.49
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.25,
	"avgPrice" : 2.40
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.63,
	"avgPrice" : 6.22
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.51,
	"avgPrice" : 4.11
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.19,
	"avgPrice" : 2.90
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 4.50,
	"avgPrice" : 3.13
}, {
	"type" : "Nova",
	"name" : "Rising Skull",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.99,
	"avgPrice" : 2.89
}, {
	"type" : "Nova",
	"name" : "Sand Dune",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "Nova",
	"name" : "Sand Dune",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Sand Dune",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Sand Dune",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Nova",
	"name" : "Sand Dune",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "P2000",
	"name" : "Scorpion",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.04,
	"avgPrice" : 5.79
}, {
	"type" : "P2000",
	"name" : "Silver",
	"quality" : "Factory New",
	"marketPrice" : 1.28,
	"avgPrice" : 1.31
}, {
	"type" : "P2000",
	"name" : "Silver",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.32,
	"avgPrice" : 8.39
}, {
	"type" : "P250",
	"name" : "Bone Mask",
	"quality" : "Factory New",
	"marketPrice" : 8.48,
	"avgPrice" : 7.66
}, {
	"type" : "P250",
	"name" : "Bone Mask",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.25,
	"avgPrice" : 0.21
}, {
	"type" : "P250",
	"name" : "Bone Mask",
	"quality" : "Field-Tested",
	"marketPrice" : 0.12,
	"avgPrice" : 0.10
}, {
	"type" : "P250",
	"name" : "Bone Mask",
	"quality" : "Well-Worn",
	"marketPrice" : 0.26,
	"avgPrice" : 0.22
}, {
	"type" : "P250",
	"name" : "Bone Mask",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.13,
	"avgPrice" : 0.13
}, {
	"type" : "Souvenir P250",
	"name" : "Bone Mask",
	"quality" : "Factory New",
	"marketPrice" : 7.30,
	"avgPrice" : 6.40
}, {
	"type" : "Souvenir P250",
	"name" : "Bone Mask",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.80,
	"avgPrice" : 0.81
}, {
	"type" : "Souvenir P250",
	"name" : "Bone Mask",
	"quality" : "Field-Tested",
	"marketPrice" : 0.42,
	"avgPrice" : 0.41
}, {
	"type" : "Souvenir P250",
	"name" : "Bone Mask",
	"quality" : "Well-Worn",
	"marketPrice" : 0.59,
	"avgPrice" : 0.69
}, {
	"type" : "Souvenir P250",
	"name" : "Bone Mask",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.58,
	"avgPrice" : 0.51
}, {
	"type" : "P250",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 0.19,
	"avgPrice" : 0.22
}, {
	"type" : "P250",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "P250",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "P250",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "P250",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir P250",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.71,
	"avgPrice" : 6.14
}, {
	"type" : "Souvenir P250",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 1.43,
	"avgPrice" : 1.33
}, {
	"type" : "Souvenir P250",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 5.24,
	"avgPrice" : 3.71
}, {
	"type" : "Souvenir P250",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.37,
	"avgPrice" : 1.15
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Factory New",
	"marketPrice" : 6.83,
	"avgPrice" : 6.75
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.96,
	"avgPrice" : 2.78
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Field-Tested",
	"marketPrice" : 2.10,
	"avgPrice" : 2.24
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Well-Worn",
	"marketPrice" : 2.34,
	"avgPrice" : 2.62
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.47,
	"avgPrice" : 2.25
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 39.99,
	"avgPrice" : 43.87
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 15.49,
	"avgPrice" : 13.51
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 9.02,
	"avgPrice" : 7.95
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 11.00,
	"avgPrice" : 10.88
}, {
	"type" : "P250",
	"name" : "Cartel",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 11.22,
	"avgPrice" : 7.56
}, {
	"type" : "P250",
	"name" : "Contamination",
	"quality" : "Factory New",
	"marketPrice" : 0.57,
	"avgPrice" : 0.54
}, {
	"type" : "P250",
	"name" : "Contamination",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.23,
	"avgPrice" : 0.23
}, {
	"type" : "P250",
	"name" : "Contamination",
	"quality" : "Field-Tested",
	"marketPrice" : 0.16,
	"avgPrice" : 0.15
}, {
	"type" : "P250",
	"name" : "Contamination",
	"quality" : "Well-Worn",
	"marketPrice" : 0.30,
	"avgPrice" : 0.32
}, {
	"type" : "P250",
	"name" : "Contamination",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.14,
	"avgPrice" : 0.12
}, {
	"type" : "Souvenir P250",
	"name" : "Contamination",
	"quality" : "Factory New",
	"marketPrice" : 9.28,
	"avgPrice" : 7.66
}, {
	"type" : "Souvenir P250",
	"name" : "Contamination",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.64,
	"avgPrice" : 1.59
}, {
	"type" : "Souvenir P250",
	"name" : "Contamination",
	"quality" : "Field-Tested",
	"marketPrice" : 0.65,
	"avgPrice" : 0.59
}, {
	"type" : "Souvenir P250",
	"name" : "Contamination",
	"quality" : "Well-Worn",
	"marketPrice" : 1.22,
	"avgPrice" : 1.17
}, {
	"type" : "Souvenir P250",
	"name" : "Contamination",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.57,
	"avgPrice" : 0.65
}, {
	"type" : "P250",
	"name" : "Crimson Kimono",
	"quality" : "Factory New",
	"marketPrice" : 1.12,
	"avgPrice" : 1.02
}, {
	"type" : "P250",
	"name" : "Crimson Kimono",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.43,
	"avgPrice" : 0.41
}, {
	"type" : "P250",
	"name" : "Crimson Kimono",
	"quality" : "Field-Tested",
	"marketPrice" : 0.24,
	"avgPrice" : 0.22
}, {
	"type" : "P250",
	"name" : "Crimson Kimono",
	"quality" : "Well-Worn",
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "P250",
	"name" : "Crimson Kimono",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.19,
	"avgPrice" : 0.20
}, {
	"type" : "P250",
	"name" : "Facets",
	"quality" : "Factory New",
	"marketPrice" : 13.48,
	"avgPrice" : 13.19
}, {
	"type" : "P250",
	"name" : "Facets",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.09,
	"avgPrice" : 1.69
}, {
	"type" : "P250",
	"name" : "Facets",
	"quality" : "Field-Tested",
	"marketPrice" : 0.76,
	"avgPrice" : 0.66
}, {
	"type" : "P250",
	"name" : "Facets",
	"quality" : "Well-Worn",
	"marketPrice" : 1.19,
	"avgPrice" : 1.05
}, {
	"type" : "P250",
	"name" : "Facets",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.10,
	"avgPrice" : 1.91
}, {
	"type" : "P250",
	"name" : "Franklin",
	"quality" : "Factory New",
	"marketPrice" : 1.33,
	"avgPrice" : 1.45
}, {
	"type" : "P250",
	"name" : "Franklin",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.01,
	"avgPrice" : 1.00
}, {
	"type" : "P250",
	"name" : "Franklin",
	"quality" : "Field-Tested",
	"marketPrice" : 0.80,
	"avgPrice" : 0.83
}, {
	"type" : "P250",
	"name" : "Franklin",
	"quality" : "Well-Worn",
	"marketPrice" : 1.10,
	"avgPrice" : 1.14
}, {
	"type" : "P250",
	"name" : "Gunsmoke",
	"quality" : "Factory New",
	"marketPrice" : 18.10,
	"avgPrice" : 14.12
}, {
	"type" : "P250",
	"name" : "Gunsmoke",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.07,
	"avgPrice" : 1.06
}, {
	"type" : "P250",
	"name" : "Gunsmoke",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "P250",
	"name" : "Gunsmoke",
	"quality" : "Well-Worn",
	"marketPrice" : 0.47,
	"avgPrice" : 0.46
}, {
	"type" : "P250",
	"name" : "Gunsmoke",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.37,
	"avgPrice" : 0.31
}, {
	"type" : "Souvenir P250",
	"name" : "Gunsmoke",
	"quality" : "Factory New",
	"marketPrice" : 42.55,
	"avgPrice" : 30.87
}, {
	"type" : "Souvenir P250",
	"name" : "Gunsmoke",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.06,
	"avgPrice" : 4.48
}, {
	"type" : "Souvenir P250",
	"name" : "Gunsmoke",
	"quality" : "Field-Tested",
	"marketPrice" : 0.99,
	"avgPrice" : 0.97
}, {
	"type" : "Souvenir P250",
	"name" : "Gunsmoke",
	"quality" : "Well-Worn",
	"marketPrice" : 1.44,
	"avgPrice" : 1.29
}, {
	"type" : "Souvenir P250",
	"name" : "Gunsmoke",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.74,
	"avgPrice" : 0.75
}, {
	"type" : "P250",
	"name" : "Hive",
	"quality" : "Factory New",
	"marketPrice" : 1.15,
	"avgPrice" : 1.36
}, {
	"type" : "P250",
	"name" : "Hive",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.98,
	"avgPrice" : 1.04
}, {
	"type" : "P250",
	"name" : "Hive",
	"quality" : "Field-Tested",
	"marketPrice" : 0.97,
	"avgPrice" : 1.03
}, {
	"type" : "P250",
	"name" : "Hive",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.53,
	"avgPrice" : 4.37
}, {
	"type" : "P250",
	"name" : "Hive",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.49,
	"avgPrice" : 2.69
}, {
	"type" : "P250",
	"name" : "Hive",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.15,
	"avgPrice" : 1.83
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Factory New",
	"marketPrice" : 10.05,
	"avgPrice" : 10.15
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.70,
	"avgPrice" : 5.46
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Field-Tested",
	"marketPrice" : 4.91,
	"avgPrice" : 4.68
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Well-Worn",
	"marketPrice" : 4.54,
	"avgPrice" : 4.41
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.26,
	"avgPrice" : 4.04
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 74.90,
	"avgPrice" : 68.39
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 26.96,
	"avgPrice" : 25.21
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 17.96,
	"avgPrice" : 16.88
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 13.70,
	"avgPrice" : 13.04
}, {
	"type" : "P250",
	"name" : "Mehndi",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 11.20,
	"avgPrice" : 11.67
}, {
	"type" : "P250",
	"name" : "Metallic DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "P250",
	"name" : "Metallic DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.12,
	"avgPrice" : 0.11
}, {
	"type" : "Souvenir P250",
	"name" : "Metallic DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 4.55,
	"avgPrice" : 4.73
}, {
	"type" : "Souvenir P250",
	"name" : "Metallic DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 15.73,
	"avgPrice" : 13.27
}, {
	"type" : "P250",
	"name" : "Mint Kimono",
	"quality" : "Factory New",
	"marketPrice" : 0.35,
	"avgPrice" : 0.33
}, {
	"type" : "P250",
	"name" : "Mint Kimono",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "P250",
	"name" : "Mint Kimono",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "P250",
	"name" : "Mint Kimono",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "P250",
	"name" : "Mint Kimono",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "P250",
	"name" : "Modern Hunter",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 117.73
}, {
	"type" : "P250",
	"name" : "Modern Hunter",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.00,
	"avgPrice" : 8.13
}, {
	"type" : "P250",
	"name" : "Modern Hunter",
	"quality" : "Field-Tested",
	"marketPrice" : 2.93,
	"avgPrice" : 2.75
}, {
	"type" : "P250",
	"name" : "Modern Hunter",
	"quality" : "Well-Worn",
	"marketPrice" : 9.56,
	"avgPrice" : 4.69
}, {
	"type" : "P250",
	"name" : "Modern Hunter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.99,
	"avgPrice" : 2.45
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Factory New",
	"marketPrice" : 3.64,
	"avgPrice" : 3.50
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.25,
	"avgPrice" : 2.24
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Field-Tested",
	"marketPrice" : 1.92,
	"avgPrice" : 2.00
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Well-Worn",
	"marketPrice" : 2.35,
	"avgPrice" : 2.35
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.00,
	"avgPrice" : 2.00
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 16.86,
	"avgPrice" : 16.80
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 8.43,
	"avgPrice" : 9.47
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.41,
	"avgPrice" : 7.42
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 8.14,
	"avgPrice" : 7.75
}, {
	"type" : "P250",
	"name" : "Muertos",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 7.17,
	"avgPrice" : 7.24
}, {
	"type" : "P250",
	"name" : "Nuclear Threat",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 497.50
}, {
	"type" : "P250",
	"name" : "Nuclear Threat",
	"quality" : "Minimal Wear",
	"marketPrice" : 36.89,
	"avgPrice" : 37.41
}, {
	"type" : "P250",
	"name" : "Nuclear Threat",
	"quality" : "Field-Tested",
	"marketPrice" : 6.72,
	"avgPrice" : 6.71
}, {
	"type" : "P250",
	"name" : "Nuclear Threat",
	"quality" : "Well-Worn",
	"marketPrice" : 6.21,
	"avgPrice" : 6.59
}, {
	"type" : "P250",
	"name" : "Nuclear Threat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.85,
	"avgPrice" : 3.93
}, {
	"type" : "Souvenir P250",
	"name" : "Nuclear Threat",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 272.35
}, {
	"type" : "Souvenir P250",
	"name" : "Nuclear Threat",
	"quality" : "Field-Tested",
	"marketPrice" : 65.00,
	"avgPrice" : 62.86
}, {
	"type" : "Souvenir P250",
	"name" : "Nuclear Threat",
	"quality" : "Well-Worn",
	"marketPrice" : 75.92,
	"avgPrice" : 60.58
}, {
	"type" : "Souvenir P250",
	"name" : "Nuclear Threat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 36.16,
	"avgPrice" : 28.84
}, {
	"type" : "P250",
	"name" : "Sand Dune",
	"quality" : "Factory New",
	"marketPrice" : 0.47,
	"avgPrice" : 0.42
}, {
	"type" : "P250",
	"name" : "Sand Dune",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "P250",
	"name" : "Sand Dune",
	"quality" : "Field-Tested",
	"marketPrice" : 0.05,
	"avgPrice" : 0.04
}, {
	"type" : "P250",
	"name" : "Sand Dune",
	"quality" : "Well-Worn",
	"marketPrice" : 0.05,
	"avgPrice" : 0.04
}, {
	"type" : "P250",
	"name" : "Sand Dune",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Souvenir P250",
	"name" : "Sand Dune",
	"quality" : "Factory New",
	"marketPrice" : 39.99,
	"avgPrice" : 18.34
}, {
	"type" : "Souvenir P250",
	"name" : "Sand Dune",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.27,
	"avgPrice" : 1.62
}, {
	"type" : "Souvenir P250",
	"name" : "Sand Dune",
	"quality" : "Field-Tested",
	"marketPrice" : 0.88,
	"avgPrice" : 0.46
}, {
	"type" : "Souvenir P250",
	"name" : "Sand Dune",
	"quality" : "Well-Worn",
	"marketPrice" : 0.55,
	"avgPrice" : 0.69
}, {
	"type" : "Souvenir P250",
	"name" : "Sand Dune",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.03,
	"avgPrice" : 1.01
}, {
	"type" : "P250",
	"name" : "Splash",
	"quality" : "Factory New",
	"marketPrice" : 14.20,
	"avgPrice" : 14.10
}, {
	"type" : "P250",
	"name" : "Splash",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.55,
	"avgPrice" : 4.22
}, {
	"type" : "P250",
	"name" : "Splash",
	"quality" : "Field-Tested",
	"marketPrice" : 4.73,
	"avgPrice" : 3.90
}, {
	"type" : "P250",
	"name" : "Splash",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 56.00,
	"avgPrice" : 56.49
}, {
	"type" : "P250",
	"name" : "Splash",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 13.22,
	"avgPrice" : 13.41
}, {
	"type" : "P250",
	"name" : "Splash",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 404.46,
	"avgPrice" : 9.45
}, {
	"type" : "P250",
	"name" : "Steel Disruption",
	"quality" : "Factory New",
	"marketPrice" : 0.29,
	"avgPrice" : 0.31
}, {
	"type" : "P250",
	"name" : "Steel Disruption",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.27,
	"avgPrice" : 0.28
}, {
	"type" : "P250",
	"name" : "Steel Disruption",
	"quality" : "Field-Tested",
	"marketPrice" : 0.40,
	"avgPrice" : 0.41
}, {
	"type" : "P250",
	"name" : "Steel Disruption",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.18,
	"avgPrice" : 1.26
}, {
	"type" : "P250",
	"name" : "Steel Disruption",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.03,
	"avgPrice" : 1.06
}, {
	"type" : "P250",
	"name" : "Steel Disruption",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.09,
	"avgPrice" : 1.12
}, {
	"type" : "P250",
	"name" : "Supernova",
	"quality" : "Factory New",
	"marketPrice" : 0.54,
	"avgPrice" : 0.53
}, {
	"type" : "P250",
	"name" : "Supernova",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.36,
	"avgPrice" : 0.35
}, {
	"type" : "P250",
	"name" : "Supernova",
	"quality" : "Field-Tested",
	"marketPrice" : 0.32,
	"avgPrice" : 0.31
}, {
	"type" : "P250",
	"name" : "Supernova",
	"quality" : "Well-Worn",
	"marketPrice" : 0.69,
	"avgPrice" : 0.61
}, {
	"type" : "P250",
	"name" : "Supernova",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.31,
	"avgPrice" : 3.15
}, {
	"type" : "P250",
	"name" : "Supernova",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.87,
	"avgPrice" : 1.80
}, {
	"type" : "P250",
	"name" : "Supernova",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.12,
	"avgPrice" : 1.19
}, {
	"type" : "P250",
	"name" : "Supernova",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.18,
	"avgPrice" : 2.03
}, {
	"type" : "P250",
	"name" : "Undertow",
	"quality" : "Factory New",
	"marketPrice" : 4.97,
	"avgPrice" : 4.46
}, {
	"type" : "P250",
	"name" : "Undertow",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.55,
	"avgPrice" : 4.10
}, {
	"type" : "P250",
	"name" : "Undertow",
	"quality" : "Field-Tested",
	"marketPrice" : 4.51,
	"avgPrice" : 3.80
}, {
	"type" : "P250",
	"name" : "Undertow",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 27.92,
	"avgPrice" : 24.54
}, {
	"type" : "P250",
	"name" : "Undertow",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 18.63,
	"avgPrice" : 18.09
}, {
	"type" : "P250",
	"name" : "Undertow",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 12.37,
	"avgPrice" : 12.37
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Factory New",
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Well-Worn",
	"marketPrice" : 0.16,
	"avgPrice" : 0.14
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.26,
	"avgPrice" : 2.20
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.72,
	"avgPrice" : 0.73
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.42,
	"avgPrice" : 0.42
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.95,
	"avgPrice" : 1.01
}, {
	"type" : "P250",
	"name" : "Valence",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.42,
	"avgPrice" : 0.41
}, {
	"type" : "P250",
	"name" : "Whiteout",
	"quality" : "Factory New",
	"marketPrice" : 95.41,
	"avgPrice" : 99.83
}, {
	"type" : "P250",
	"name" : "Whiteout",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.09,
	"avgPrice" : 8.01
}, {
	"type" : "P250",
	"name" : "Whiteout",
	"quality" : "Field-Tested",
	"marketPrice" : 1.03,
	"avgPrice" : 0.91
}, {
	"type" : "P250",
	"name" : "Whiteout",
	"quality" : "Well-Worn",
	"marketPrice" : 1.20,
	"avgPrice" : 1.07
}, {
	"type" : "P250",
	"name" : "Whiteout",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.03,
	"avgPrice" : 0.89
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Factory New",
	"marketPrice" : 1.93,
	"avgPrice" : 2.03
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.87,
	"avgPrice" : 0.85
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Field-Tested",
	"marketPrice" : 0.50,
	"avgPrice" : 0.54
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Well-Worn",
	"marketPrice" : 0.50,
	"avgPrice" : 0.54
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.50,
	"avgPrice" : 0.50
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 10.47,
	"avgPrice" : 10.82
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.82,
	"avgPrice" : 3.76
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.00,
	"avgPrice" : 2.00
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.02,
	"avgPrice" : 1.91
}, {
	"type" : "P250",
	"name" : "Wingshot",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.90,
	"avgPrice" : 1.81
}, {
	"type" : "P90",
	"name" : "Ash Wood",
	"quality" : "Factory New",
	"marketPrice" : 0.09,
	"avgPrice" : 0.08
}, {
	"type" : "P90",
	"name" : "Ash Wood",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "P90",
	"name" : "Ash Wood",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "P90",
	"name" : "Ash Wood",
	"quality" : "Well-Worn",
	"marketPrice" : 0.07,
	"avgPrice" : 0.06
}, {
	"type" : "Souvenir P90",
	"name" : "Ash Wood",
	"quality" : "Factory New",
	"marketPrice" : 6.32,
	"avgPrice" : 5.88
}, {
	"type" : "Souvenir P90",
	"name" : "Ash Wood",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.47,
	"avgPrice" : 2.43
}, {
	"type" : "Souvenir P90",
	"name" : "Ash Wood",
	"quality" : "Field-Tested",
	"marketPrice" : 1.45,
	"avgPrice" : 1.66
}, {
	"type" : "Souvenir P90",
	"name" : "Ash Wood",
	"quality" : "Well-Worn",
	"marketPrice" : 7.09,
	"avgPrice" : 2.58
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Factory New",
	"marketPrice" : 22.20,
	"avgPrice" : 21.89
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Minimal Wear",
	"marketPrice" : 10.32,
	"avgPrice" : 10.90
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Field-Tested",
	"marketPrice" : 6.38,
	"avgPrice" : 6.41
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Well-Worn",
	"marketPrice" : 6.06,
	"avgPrice" : 5.96
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.95,
	"avgPrice" : 3.91
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 134.98,
	"avgPrice" : 118.21
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 45.48,
	"avgPrice" : 43.38
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 21.53,
	"avgPrice" : 22.08
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 16.94,
	"avgPrice" : 17.26
}, {
	"type" : "P90",
	"name" : "Asiimov",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 11.12,
	"avgPrice" : 10.94
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Factory New",
	"marketPrice" : 1.46,
	"avgPrice" : 1.38
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.21,
	"avgPrice" : 1.15
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Field-Tested",
	"marketPrice" : 0.93,
	"avgPrice" : 0.96
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Well-Worn",
	"marketPrice" : 1.17,
	"avgPrice" : 1.06
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.12,
	"avgPrice" : 1.25
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.18,
	"avgPrice" : 5.12
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.60,
	"avgPrice" : 3.63
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.25,
	"avgPrice" : 2.98
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.81,
	"avgPrice" : 2.74
}, {
	"type" : "P90",
	"name" : "Blind Spot",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.11,
	"avgPrice" : 2.85
}, {
	"type" : "P90",
	"name" : "Cold Blooded",
	"quality" : "Factory New",
	"marketPrice" : 5.82,
	"avgPrice" : 5.75
}, {
	"type" : "P90",
	"name" : "Cold Blooded",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.30,
	"avgPrice" : 6.85
}, {
	"type" : "P90",
	"name" : "Cold Blooded",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 34.04,
	"avgPrice" : 29.50
}, {
	"type" : "P90",
	"name" : "Cold Blooded",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 30.21,
	"avgPrice" : 33.41
}, {
	"type" : "P90",
	"name" : "Death by Kitty",
	"quality" : "Minimal Wear",
	"marketPrice" : 47.95,
	"avgPrice" : 44.94
}, {
	"type" : "P90",
	"name" : "Death by Kitty",
	"quality" : "Field-Tested",
	"marketPrice" : 26.41,
	"avgPrice" : 26.50
}, {
	"type" : "P90",
	"name" : "Death by Kitty",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 285.00,
	"avgPrice" : 282.09
}, {
	"type" : "P90",
	"name" : "Death by Kitty",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 129.19,
	"avgPrice" : 137.29
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Factory New",
	"marketPrice" : 3.26,
	"avgPrice" : 3.20
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.53,
	"avgPrice" : 2.50
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Field-Tested",
	"marketPrice" : 1.79,
	"avgPrice" : 1.54
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Well-Worn",
	"marketPrice" : 2.19,
	"avgPrice" : 2.08
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.85,
	"avgPrice" : 2.09
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 14.96,
	"avgPrice" : 11.81
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 9.08,
	"avgPrice" : 6.46
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.04,
	"avgPrice" : 3.28
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.63,
	"avgPrice" : 5.11
}, {
	"type" : "P90",
	"name" : "Desert Warfare",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 6.52,
	"avgPrice" : 4.33
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Factory New",
	"marketPrice" : 1.06,
	"avgPrice" : 1.02
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.25,
	"avgPrice" : 0.24
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Field-Tested",
	"marketPrice" : 0.15,
	"avgPrice" : 0.14
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.11
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.46,
	"avgPrice" : 6.64
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.62,
	"avgPrice" : 1.64
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.99,
	"avgPrice" : 0.93
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.80,
	"avgPrice" : 0.75
}, {
	"type" : "P90",
	"name" : "Elite Build",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.72,
	"avgPrice" : 0.69
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Factory New",
	"marketPrice" : 128.31,
	"avgPrice" : 116.01
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Minimal Wear",
	"marketPrice" : 32.58,
	"avgPrice" : 33.59
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Field-Tested",
	"marketPrice" : 29.99,
	"avgPrice" : 27.94
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Well-Worn",
	"marketPrice" : 30.84,
	"avgPrice" : 27.80
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Battle-Scarred",
	"marketPrice" : 35.38,
	"avgPrice" : 26.63
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 389.42
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 105.00,
	"avgPrice" : 105.86
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 72.29,
	"avgPrice" : 66.34
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 99.99,
	"avgPrice" : 80.38
}, {
	"type" : "P90",
	"name" : "Emerald Dragon",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 76.16,
	"avgPrice" : 71.78
}, {
	"type" : "P90",
	"name" : "Fallout Warning",
	"quality" : "Factory New",
	"marketPrice" : 37.63,
	"avgPrice" : 25.68
}, {
	"type" : "P90",
	"name" : "Fallout Warning",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.83,
	"avgPrice" : 3.63
}, {
	"type" : "P90",
	"name" : "Fallout Warning",
	"quality" : "Field-Tested",
	"marketPrice" : 1.81,
	"avgPrice" : 1.62
}, {
	"type" : "P90",
	"name" : "Fallout Warning",
	"quality" : "Well-Worn",
	"marketPrice" : 1.75,
	"avgPrice" : 1.46
}, {
	"type" : "P90",
	"name" : "Fallout Warning",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.32,
	"avgPrice" : 1.30
}, {
	"type" : "Souvenir P90",
	"name" : "Fallout Warning",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 139.62
}, {
	"type" : "Souvenir P90",
	"name" : "Fallout Warning",
	"quality" : "Minimal Wear",
	"marketPrice" : 12.00,
	"avgPrice" : 12.46
}, {
	"type" : "Souvenir P90",
	"name" : "Fallout Warning",
	"quality" : "Field-Tested",
	"marketPrice" : 4.30,
	"avgPrice" : 4.13
}, {
	"type" : "Nova",
	"name" : "Candy Apple",
	"quality" : "Factory New",
	"marketPrice" : 0.11,
	"avgPrice" : 0.11
}, {
	"type" : "Nova",
	"name" : "Candy Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.08,
	"avgPrice" : 0.06
}, {
	"type" : "Nova",
	"name" : "Candy Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 0.08,
	"avgPrice" : 0.06
}, {
	"type" : "Souvenir Nova",
	"name" : "Candy Apple",
	"quality" : "Factory New",
	"marketPrice" : 25.73,
	"avgPrice" : 19.14
}, {
	"type" : "Souvenir Nova",
	"name" : "Candy Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.99,
	"avgPrice" : 7.57
}, {
	"type" : "Souvenir Nova",
	"name" : "Candy Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 13.48,
	"avgPrice" : 13.19
}, {
	"type" : "Nova",
	"name" : "Forest Leaves",
	"quality" : "Factory New",
	"marketPrice" : 3.88,
	"avgPrice" : 3.81
}, {
	"type" : "Nova",
	"name" : "Forest Leaves",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.66,
	"avgPrice" : 0.80
}, {
	"type" : "Nova",
	"name" : "Forest Leaves",
	"quality" : "Field-Tested",
	"marketPrice" : 0.27,
	"avgPrice" : 0.44
}, {
	"type" : "Nova",
	"name" : "Forest Leaves",
	"quality" : "Well-Worn",
	"marketPrice" : 1.35,
	"avgPrice" : 1.08
}, {
	"type" : "Nova",
	"name" : "Forest Leaves",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.88,
	"avgPrice" : 0.63
}, {
	"type" : "Nova",
	"name" : "Ghost Camo",
	"quality" : "Factory New",
	"marketPrice" : 0.42,
	"avgPrice" : 0.41
}, {
	"type" : "Nova",
	"name" : "Ghost Camo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.27,
	"avgPrice" : 0.29
}, {
	"type" : "Nova",
	"name" : "Ghost Camo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.30,
	"avgPrice" : 0.28
}, {
	"type" : "Nova",
	"name" : "Ghost Camo",
	"quality" : "Well-Worn",
	"marketPrice" : 2.62,
	"avgPrice" : 2.17
}, {
	"type" : "Nova",
	"name" : "Ghost Camo",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.30,
	"avgPrice" : 1.28
}, {
	"type" : "Nova",
	"name" : "Ghost Camo",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.07,
	"avgPrice" : 0.97
}, {
	"type" : "Nova",
	"name" : "Ghost Camo",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.95,
	"avgPrice" : 0.91
}, {
	"type" : "Nova",
	"name" : "Ghost Camo",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.66,
	"avgPrice" : 1.96
}, {
	"type" : "Nova",
	"name" : "Graphite",
	"quality" : "Factory New",
	"marketPrice" : 0.99,
	"avgPrice" : 1.10
}, {
	"type" : "Nova",
	"name" : "Graphite",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.12,
	"avgPrice" : 1.12
}, {
	"type" : "Nova",
	"name" : "Graphite",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.95,
	"avgPrice" : 4.69
}, {
	"type" : "Nova",
	"name" : "Graphite",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.33,
	"avgPrice" : 3.92
}, {
	"type" : "Nova",
	"name" : "Green Apple",
	"quality" : "Factory New",
	"marketPrice" : 0.38,
	"avgPrice" : 0.39
}, {
	"type" : "Nova",
	"name" : "Green Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.38,
	"avgPrice" : 0.32
}, {
	"type" : "Nova",
	"name" : "Green Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 0.38,
	"avgPrice" : 0.31
}, {
	"type" : "Souvenir Nova",
	"name" : "Green Apple",
	"quality" : "Factory New",
	"marketPrice" : 1.66,
	"avgPrice" : 1.77
}, {
	"type" : "Souvenir Nova",
	"name" : "Green Apple",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.12,
	"avgPrice" : 0.98
}, {
	"type" : "Souvenir Nova",
	"name" : "Green Apple",
	"quality" : "Field-Tested",
	"marketPrice" : 0.99,
	"avgPrice" : 0.82
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Factory New",
	"marketPrice" : 7.10,
	"avgPrice" : 6.45
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.38,
	"avgPrice" : 4.13
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Field-Tested",
	"marketPrice" : 2.68,
	"avgPrice" : 2.92
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Well-Worn",
	"marketPrice" : 3.19,
	"avgPrice" : 3.00
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.79,
	"avgPrice" : 2.70
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 27.15,
	"avgPrice" : 25.47
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 13.96,
	"avgPrice" : 16.30
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 10.64,
	"avgPrice" : 8.97
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 9.69,
	"avgPrice" : 10.19
}, {
	"type" : "Nova",
	"name" : "Hyper Beast",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 6.73,
	"avgPrice" : 7.23
}, {
	"type" : "Nova",
	"name" : "Koi",
	"quality" : "Factory New",
	"marketPrice" : 0.48,
	"avgPrice" : 0.50
}, {
	"type" : "Nova",
	"name" : "Koi",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.34,
	"avgPrice" : 0.34
}, {
	"type" : "Nova",
	"name" : "Koi",
	"quality" : "Field-Tested",
	"marketPrice" : 0.32,
	"avgPrice" : 0.32
}, {
	"type" : "Nova",
	"name" : "Koi",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.69,
	"avgPrice" : 2.42
}, {
	"type" : "Nova",
	"name" : "Koi",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.66,
	"avgPrice" : 1.42
}, {
	"type" : "Nova",
	"name" : "Koi",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.22,
	"avgPrice" : 1.13
}, {
	"type" : "Nova",
	"name" : "Modern Hunter",
	"quality" : "Factory New",
	"marketPrice" : 230.00,
	"avgPrice" : 63.88
}, {
	"type" : "Nova",
	"name" : "Modern Hunter",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.68,
	"avgPrice" : 7.78
}, {
	"type" : "Nova",
	"name" : "Modern Hunter",
	"quality" : "Field-Tested",
	"marketPrice" : 2.73,
	"avgPrice" : 2.41
}, {
	"type" : "Nova",
	"name" : "Modern Hunter",
	"quality" : "Well-Worn",
	"marketPrice" : 2.46,
	"avgPrice" : 2.36
}, {
	"type" : "Nova",
	"name" : "Modern Hunter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.11,
	"avgPrice" : 2.25
}, {
	"type" : "Souvenir P90",
	"name" : "Fallout Warning",
	"quality" : "Well-Worn",
	"marketPrice" : 5.63,
	"avgPrice" : 5.72
}, {
	"type" : "Souvenir P90",
	"name" : "Fallout Warning",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.84,
	"avgPrice" : 2.87
}, {
	"type" : "P90",
	"name" : "Glacier Mesh",
	"quality" : "Factory New",
	"marketPrice" : 29.90,
	"avgPrice" : 17.54
}, {
	"type" : "P90",
	"name" : "Glacier Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.04,
	"avgPrice" : 1.90
}, {
	"type" : "P90",
	"name" : "Glacier Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 1.49,
	"avgPrice" : 1.29
}, {
	"type" : "P90",
	"name" : "Glacier Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 3.63,
	"avgPrice" : 3.05
}, {
	"type" : "P90",
	"name" : "Glacier Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.82,
	"avgPrice" : 2.71
}, {
	"type" : "P90",
	"name" : "Leather",
	"quality" : "Factory New",
	"marketPrice" : 3.14,
	"avgPrice" : 3.33
}, {
	"type" : "P90",
	"name" : "Leather",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.06,
	"avgPrice" : 1.09
}, {
	"type" : "P90",
	"name" : "Leather",
	"quality" : "Field-Tested",
	"marketPrice" : 0.64,
	"avgPrice" : 0.65
}, {
	"type" : "P90",
	"name" : "Leather",
	"quality" : "Well-Worn",
	"marketPrice" : 0.74,
	"avgPrice" : 0.73
}, {
	"type" : "P90",
	"name" : "Leather",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.75,
	"avgPrice" : 0.75
}, {
	"type" : "P90",
	"name" : "Module",
	"quality" : "Factory New",
	"marketPrice" : 0.71,
	"avgPrice" : 0.70
}, {
	"type" : "P90",
	"name" : "Module",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.53,
	"avgPrice" : 0.51
}, {
	"type" : "P90",
	"name" : "Module",
	"quality" : "Field-Tested",
	"marketPrice" : 0.49,
	"avgPrice" : 0.47
}, {
	"type" : "P90",
	"name" : "Module",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.46,
	"avgPrice" : 2.62
}, {
	"type" : "P90",
	"name" : "Module",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.72,
	"avgPrice" : 1.68
}, {
	"type" : "P90",
	"name" : "Module",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.63,
	"avgPrice" : 1.56
}, {
	"type" : "P90",
	"name" : "Sand Spray",
	"quality" : "Factory New",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "P90",
	"name" : "Sand Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "P90",
	"name" : "Sand Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "P90",
	"name" : "Sand Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "P90",
	"name" : "Sand Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir P90",
	"name" : "Sand Spray",
	"quality" : "Factory New",
	"marketPrice" : 5.52,
	"avgPrice" : 4.51
}, {
	"type" : "Souvenir P90",
	"name" : "Sand Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.83,
	"avgPrice" : 0.85
}, {
	"type" : "Souvenir P90",
	"name" : "Sand Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.38,
	"avgPrice" : 0.36
}, {
	"type" : "Souvenir P90",
	"name" : "Sand Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 0.71,
	"avgPrice" : 0.59
}, {
	"type" : "Souvenir P90",
	"name" : "Sand Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.40,
	"avgPrice" : 0.40
}, {
	"type" : "P90",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 7.99,
	"avgPrice" : 6.67
}, {
	"type" : "P90",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.32,
	"avgPrice" : 0.30
}, {
	"type" : "P90",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.11
}, {
	"type" : "P90",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 0.39,
	"avgPrice" : 0.37
}, {
	"type" : "P90",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.28,
	"avgPrice" : 0.27
}, {
	"type" : "Souvenir P90",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 5.17,
	"avgPrice" : 5.51
}, {
	"type" : "Souvenir P90",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.84,
	"avgPrice" : 0.84
}, {
	"type" : "Souvenir P90",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 0.39,
	"avgPrice" : 0.38
}, {
	"type" : "Souvenir P90",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 0.61,
	"avgPrice" : 0.62
}, {
	"type" : "Souvenir P90",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.53,
	"avgPrice" : 0.44
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Factory New",
	"marketPrice" : 6.00,
	"avgPrice" : 6.21
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.73,
	"avgPrice" : 2.78
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Field-Tested",
	"marketPrice" : 1.70,
	"avgPrice" : 1.66
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Well-Worn",
	"marketPrice" : 1.65,
	"avgPrice" : 1.62
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.63,
	"avgPrice" : 1.61
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 40.25,
	"avgPrice" : 34.99
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 10.31,
	"avgPrice" : 10.77
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 6.05,
	"avgPrice" : 6.24
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.60,
	"avgPrice" : 5.66
}, {
	"type" : "P90",
	"name" : "Shapewood",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 5.84,
	"avgPrice" : 5.65
}, {
	"type" : "P90",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 0.69,
	"avgPrice" : 0.75
}, {
	"type" : "P90",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.09,
	"avgPrice" : 0.09
}, {
	"type" : "PP-Bizon",
	"name" : "Bamboo Print",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.08
}, {
	"type" : "PP-Bizon",
	"name" : "Bamboo Print",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Factory New",
	"marketPrice" : 8.36,
	"avgPrice" : 7.67
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.22,
	"avgPrice" : 1.04
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Field-Tested",
	"marketPrice" : 0.48,
	"avgPrice" : 0.51
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Well-Worn",
	"marketPrice" : 0.70,
	"avgPrice" : 0.61
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.57,
	"avgPrice" : 0.53
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 65.00,
	"avgPrice" : 69.12
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.00,
	"avgPrice" : 3.76
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.18,
	"avgPrice" : 1.25
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.51,
	"avgPrice" : 1.49
}, {
	"type" : "PP-Bizon",
	"name" : "Blue Streak",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.50,
	"avgPrice" : 1.11
}, {
	"type" : "PP-Bizon",
	"name" : "Brass",
	"quality" : "Factory New",
	"marketPrice" : 1.12,
	"avgPrice" : 1.04
}, {
	"type" : "PP-Bizon",
	"name" : "Brass",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "PP-Bizon",
	"name" : "Brass",
	"quality" : "Field-Tested",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "PP-Bizon",
	"name" : "Brass",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "PP-Bizon",
	"name" : "Brass",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Brass",
	"quality" : "Factory New",
	"marketPrice" : 29.99,
	"avgPrice" : 28.83
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Brass",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.64,
	"avgPrice" : 6.80
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Brass",
	"quality" : "Field-Tested",
	"marketPrice" : 3.24,
	"avgPrice" : 3.61
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Brass",
	"quality" : "Well-Worn",
	"marketPrice" : 2.53,
	"avgPrice" : 1.96
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Brass",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.58,
	"avgPrice" : 1.88
}, {
	"type" : "PP-Bizon",
	"name" : "Carbon Fiber",
	"quality" : "Factory New",
	"marketPrice" : 7.47,
	"avgPrice" : 6.17
}, {
	"type" : "PP-Bizon",
	"name" : "Carbon Fiber",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.48,
	"avgPrice" : 4.41
}, {
	"type" : "PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Factory New",
	"marketPrice" : 0.92,
	"avgPrice" : 0.89
}, {
	"type" : "PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.25,
	"avgPrice" : 0.23
}, {
	"type" : "PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Field-Tested",
	"marketPrice" : 0.16,
	"avgPrice" : 0.15
}, {
	"type" : "PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Well-Worn",
	"marketPrice" : 0.13,
	"avgPrice" : 0.15
}, {
	"type" : "PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Factory New",
	"marketPrice" : 8.19,
	"avgPrice" : 7.79
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.46,
	"avgPrice" : 1.38
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Field-Tested",
	"marketPrice" : 0.59,
	"avgPrice" : 0.66
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Well-Worn",
	"marketPrice" : 0.60,
	"avgPrice" : 0.58
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Chemical Green",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.47,
	"avgPrice" : 0.47
}, {
	"type" : "PP-Bizon",
	"name" : "Cobalt Halftone",
	"quality" : "Factory New",
	"marketPrice" : 0.81,
	"avgPrice" : 0.85
}, {
	"type" : "PP-Bizon",
	"name" : "Cobalt Halftone",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.16,
	"avgPrice" : 0.17
}, {
	"type" : "PP-Bizon",
	"name" : "Cobalt Halftone",
	"quality" : "Field-Tested",
	"marketPrice" : 0.16,
	"avgPrice" : 0.14
}, {
	"type" : "PP-Bizon",
	"name" : "Cobalt Halftone",
	"quality" : "Well-Worn",
	"marketPrice" : 0.37,
	"avgPrice" : 0.32
}, {
	"type" : "PP-Bizon",
	"name" : "Cobalt Halftone",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.56,
	"avgPrice" : 2.18
}, {
	"type" : "PP-Bizon",
	"name" : "Cobalt Halftone",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.52,
	"avgPrice" : 0.50
}, {
	"type" : "PP-Bizon",
	"name" : "Cobalt Halftone",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.37,
	"avgPrice" : 0.34
}, {
	"type" : "PP-Bizon",
	"name" : "Cobalt Halftone",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.40,
	"avgPrice" : 0.45
}, {
	"type" : "PP-Bizon",
	"name" : "Forest Leaves",
	"quality" : "Factory New",
	"marketPrice" : 11.55,
	"avgPrice" : 9.86
}, {
	"type" : "PP-Bizon",
	"name" : "Forest Leaves",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.48,
	"avgPrice" : 0.39
}, {
	"type" : "PP-Bizon",
	"name" : "Forest Leaves",
	"quality" : "Field-Tested",
	"marketPrice" : 0.15,
	"avgPrice" : 0.17
}, {
	"type" : "PP-Bizon",
	"name" : "Forest Leaves",
	"quality" : "Well-Worn",
	"marketPrice" : 0.46,
	"avgPrice" : 0.49
}, {
	"type" : "PP-Bizon",
	"name" : "Forest Leaves",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.49,
	"avgPrice" : 0.81
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Factory New",
	"marketPrice" : 3.23,
	"avgPrice" : 2.60
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.12,
	"avgPrice" : 1.19
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Field-Tested",
	"marketPrice" : 0.62,
	"avgPrice" : 0.64
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Well-Worn",
	"marketPrice" : 0.60,
	"avgPrice" : 0.56
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.59,
	"avgPrice" : 0.52
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 14.60,
	"avgPrice" : 12.07
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 6.00,
	"avgPrice" : 5.59
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.35,
	"avgPrice" : 2.19
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.56,
	"avgPrice" : 1.55
}, {
	"type" : "PP-Bizon",
	"name" : "Fuel Rod",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.80,
	"avgPrice" : 1.46
}, {
	"type" : "PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Factory New",
	"marketPrice" : 6.06,
	"avgPrice" : 6.63
}, {
	"type" : "PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.71,
	"avgPrice" : 0.69
}, {
	"type" : "PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.25
}, {
	"type" : "PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Well-Worn",
	"marketPrice" : 0.80,
	"avgPrice" : 1.27
}, {
	"type" : "PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.28,
	"avgPrice" : 0.82
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Factory New",
	"marketPrice" : 31.48,
	"avgPrice" : 28.24
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.44,
	"avgPrice" : 1.55
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Field-Tested",
	"marketPrice" : 0.38,
	"avgPrice" : 0.48
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Well-Worn",
	"marketPrice" : 0.96,
	"avgPrice" : 0.91
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Irradiated Alert",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.41,
	"avgPrice" : 0.46
}, {
	"type" : "PP-Bizon",
	"name" : "Modern Hunter",
	"quality" : "Factory New",
	"marketPrice" : 129.19,
	"avgPrice" : 73.20
}, {
	"type" : "PP-Bizon",
	"name" : "Modern Hunter",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.25,
	"avgPrice" : 7.04
}, {
	"type" : "PP-Bizon",
	"name" : "Modern Hunter",
	"quality" : "Field-Tested",
	"marketPrice" : 2.26,
	"avgPrice" : 2.61
}, {
	"type" : "PP-Bizon",
	"name" : "Modern Hunter",
	"quality" : "Well-Worn",
	"marketPrice" : 3.65,
	"avgPrice" : 4.76
}, {
	"type" : "PP-Bizon",
	"name" : "Modern Hunter",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.38,
	"avgPrice" : 3.56
}, {
	"type" : "PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Factory New",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Factory New",
	"marketPrice" : 15.00,
	"avgPrice" : 20.27
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.73,
	"avgPrice" : 5.50
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Field-Tested",
	"marketPrice" : 5.41,
	"avgPrice" : 1.66
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Well-Worn",
	"marketPrice" : 12.65,
	"avgPrice" : 10.62
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Night Ops",
	"quality" : "Battle-Scarred",
	"marketPrice" : 26.18,
	"avgPrice" : 13.18
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Factory New",
	"marketPrice" : 0.55,
	"avgPrice" : 0.53
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.36,
	"avgPrice" : 0.35
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Field-Tested",
	"marketPrice" : 0.30,
	"avgPrice" : 0.31
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Well-Worn",
	"marketPrice" : 0.36,
	"avgPrice" : 0.35
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.46,
	"avgPrice" : 0.43
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.85,
	"avgPrice" : 2.64
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.63,
	"avgPrice" : 1.49
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.09,
	"avgPrice" : 1.05
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.01,
	"avgPrice" : 1.05
}, {
	"type" : "PP-Bizon",
	"name" : "Osiris",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.00,
	"avgPrice" : 0.86
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Factory New",
	"marketPrice" : 0.57,
	"avgPrice" : 0.53
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.15,
	"avgPrice" : 0.16
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.88,
	"avgPrice" : 2.83
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.85,
	"avgPrice" : 0.81
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.41,
	"avgPrice" : 0.41
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.37,
	"avgPrice" : 0.33
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.35,
	"avgPrice" : 0.32
}, {
	"type" : "PP-Bizon",
	"name" : "Rust Coat",
	"quality" : "Factory New",
	"marketPrice" : 23.00,
	"avgPrice" : 15.60
}, {
	"type" : "PP-Bizon",
	"name" : "Rust Coat",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.47,
	"avgPrice" : 4.77
}, {
	"type" : "PP-Bizon",
	"name" : "Rust Coat",
	"quality" : "Field-Tested",
	"marketPrice" : 3.23,
	"avgPrice" : 3.16
}, {
	"type" : "PP-Bizon",
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 3.37,
	"avgPrice" : 4.68
}, {
	"type" : "PP-Bizon",
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.83,
	"avgPrice" : 6.11
}, {
	"type" : "PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Factory New",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Factory New",
	"marketPrice" : 129.19,
	"avgPrice" : 46.07
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.42,
	"avgPrice" : 1.06
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.55,
	"avgPrice" : 0.57
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 2.53,
	"avgPrice" : 1.12
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Sand Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 10.12,
	"avgPrice" : 1.20
}, {
	"type" : "PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Factory New",
	"marketPrice" : 5.90,
	"avgPrice" : 4.65
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.57,
	"avgPrice" : 0.53
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 0.40,
	"avgPrice" : 0.40
}, {
	"type" : "Souvenir PP-Bizon",
	"name" : "Urban Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.37
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Factory New",
	"marketPrice" : 0.42,
	"avgPrice" : 0.43
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.34,
	"avgPrice" : 0.30
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Field-Tested",
	"marketPrice" : 0.29,
	"avgPrice" : 0.28
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Well-Worn",
	"marketPrice" : 0.57,
	"avgPrice" : 0.57
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.04,
	"avgPrice" : 0.99
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.56,
	"avgPrice" : 1.42
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.05,
	"avgPrice" : 0.97
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.87,
	"avgPrice" : 0.82
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.97,
	"avgPrice" : 0.94
}, {
	"type" : "PP-Bizon",
	"name" : "Water Sigil",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.05,
	"avgPrice" : 0.88
}, {
	"type" : "R8 Revolver",
	"name" : "Amber Fade",
	"quality" : "Factory New",
	"marketPrice" : 1.47,
	"avgPrice" : 1.52
}, {
	"type" : "R8 Revolver",
	"name" : "Amber Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.19,
	"avgPrice" : 1.13
}, {
	"type" : "R8 Revolver",
	"name" : "Amber Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 0.85,
	"avgPrice" : 0.89
}, {
	"type" : "R8 Revolver",
	"name" : "Amber Fade",
	"quality" : "Well-Worn",
	"marketPrice" : 1.19,
	"avgPrice" : 1.26
}, {
	"type" : "Souvenir R8 Revolver",
	"name" : "Amber Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 419.11,
	"avgPrice" : 107.27
}, {
	"type" : "R8 Revolver",
	"name" : "Bone Mask",
	"quality" : "Factory New",
	"marketPrice" : 0.28,
	"avgPrice" : 0.29
}, {
	"type" : "R8 Revolver",
	"name" : "Bone Mask",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "R8 Revolver",
	"name" : "Bone Mask",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "R8 Revolver",
	"name" : "Bone Mask",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "R8 Revolver",
	"name" : "Bone Mask",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 2.88,
	"avgPrice" : 2.90
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.30,
	"avgPrice" : 0.30
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.29,
	"avgPrice" : 0.31
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 13.48,
	"avgPrice" : 14.78
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.87,
	"avgPrice" : 3.68
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.72,
	"avgPrice" : 1.66
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.32,
	"avgPrice" : 1.30
}, {
	"type" : "P2000",
	"name" : "Handgun",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.23,
	"avgPrice" : 1.21
}, {
	"type" : "P2000",
	"name" : "Imperial",
	"quality" : "Factory New",
	"marketPrice" : 0.35,
	"avgPrice" : 0.34
}, {
	"type" : "P2000",
	"name" : "Imperial",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.20,
	"avgPrice" : 0.21
}, {
	"type" : "P2000",
	"name" : "Imperial",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "P2000",
	"name" : "Imperial",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.87,
	"avgPrice" : 1.78
}, {
	"type" : "P2000",
	"name" : "Imperial",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.22,
	"avgPrice" : 1.23
}, {
	"type" : "P2000",
	"name" : "Imperial",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.00,
	"avgPrice" : 0.94
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Factory New",
	"marketPrice" : 0.19,
	"avgPrice" : 0.19
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.30,
	"avgPrice" : 1.36
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "P2000",
	"name" : "Ivory",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "P2000",
	"name" : "Ocean Foam",
	"quality" : "Factory New",
	"marketPrice" : 36.89,
	"avgPrice" : 37.10
}, {
	"type" : "P2000",
	"name" : "Ocean Foam",
	"quality" : "Minimal Wear",
	"marketPrice" : 43.16,
	"avgPrice" : 37.05
}, {
	"type" : "P2000",
	"name" : "Ocean Foam",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 159.94,
	"avgPrice" : 165.58
}, {
	"type" : "P2000",
	"name" : "Ocean Foam",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 145.90,
	"avgPrice" : 134.42
}, {
	"type" : "P2000",
	"name" : "Pathfinder",
	"quality" : "Factory New",
	"marketPrice" : 0.86,
	"avgPrice" : 0.80
}, {
	"type" : "P2000",
	"name" : "Pathfinder",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.84,
	"avgPrice" : 0.71
}, {
	"type" : "P2000",
	"name" : "Pathfinder",
	"quality" : "Field-Tested",
	"marketPrice" : 0.88,
	"avgPrice" : 0.68
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Factory New",
	"marketPrice" : 0.35,
	"avgPrice" : 0.35
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.23,
	"avgPrice" : 0.22
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Well-Worn",
	"marketPrice" : 0.53,
	"avgPrice" : 0.55
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.17,
	"avgPrice" : 0.17
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.46,
	"avgPrice" : 1.62
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.89,
	"avgPrice" : 0.88
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.42,
	"avgPrice" : 0.43
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.93,
	"avgPrice" : 0.88
}, {
	"type" : "P2000",
	"name" : "Pulse",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.39,
	"avgPrice" : 0.43
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Factory New",
	"marketPrice" : 0.60,
	"avgPrice" : 0.60
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Well-Worn",
	"marketPrice" : 0.84,
	"avgPrice" : 0.83
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.88,
	"avgPrice" : 1.04
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.22,
	"avgPrice" : 4.20
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.55,
	"avgPrice" : 1.55
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.72,
	"avgPrice" : 0.70
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.24,
	"avgPrice" : 1.16
}, {
	"type" : "P2000",
	"name" : "Red FragCam",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.55,
	"avgPrice" : 1.33
}, {
	"type" : "P2000",
	"name" : "Scorpion",
	"quality" : "Factory New",
	"marketPrice" : 1.88,
	"avgPrice" : 1.88
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 38.53
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Minimal Wear",
	"marketPrice" : 49.99,
	"avgPrice" : 15.24
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Field-Tested",
	"marketPrice" : 15.79,
	"avgPrice" : 12.93
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Battle-Scarred",
	"marketPrice" : 149.99,
	"avgPrice" : 29.27
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Factory New",
	"marketPrice" : 1.03,
	"avgPrice" : 0.91
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.52,
	"avgPrice" : 0.53
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Field-Tested",
	"marketPrice" : 0.37,
	"avgPrice" : 0.36
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Well-Worn",
	"marketPrice" : 0.40,
	"avgPrice" : 0.40
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.46,
	"avgPrice" : 0.40
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6.45,
	"avgPrice" : 5.92
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.08,
	"avgPrice" : 1.88
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.01,
	"avgPrice" : 0.95
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.03,
	"avgPrice" : 0.92
}, {
	"type" : "Sawed-Off",
	"name" : "Highwayman",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.00,
	"avgPrice" : 0.93
}, {
	"type" : "Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Factory New",
	"marketPrice" : 6.00,
	"avgPrice" : 5.22
}, {
	"type" : "Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.59,
	"avgPrice" : 1.08
}, {
	"type" : "Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Field-Tested",
	"marketPrice" : 0.28,
	"avgPrice" : 0.27
}, {
	"type" : "Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Well-Worn",
	"marketPrice" : 0.36,
	"avgPrice" : 0.46
}, {
	"type" : "Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.42,
	"avgPrice" : 0.47
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Factory New",
	"marketPrice" : 33.87,
	"avgPrice" : 29.95
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.00,
	"avgPrice" : 1.32
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Field-Tested",
	"marketPrice" : 0.30,
	"avgPrice" : 0.41
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Well-Worn",
	"marketPrice" : 0.64,
	"avgPrice" : 0.65
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Irradiated Alert",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.43,
	"avgPrice" : 0.57
}, {
	"type" : "Sawed-Off",
	"name" : "Mosaico",
	"quality" : "Factory New",
	"marketPrice" : 11.50,
	"avgPrice" : 7.50
}, {
	"type" : "Sawed-Off",
	"name" : "Mosaico",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.34,
	"avgPrice" : 1.31
}, {
	"type" : "Sawed-Off",
	"name" : "Mosaico",
	"quality" : "Field-Tested",
	"marketPrice" : 0.74,
	"avgPrice" : 0.89
}, {
	"type" : "Sawed-Off",
	"name" : "Mosaico",
	"quality" : "Well-Worn",
	"marketPrice" : 0.86,
	"avgPrice" : 0.80
}, {
	"type" : "Sawed-Off",
	"name" : "Mosaico",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.84,
	"avgPrice" : 3.33
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 14.98,
	"avgPrice" : 13.88
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.51,
	"avgPrice" : 4.29
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 4.09,
	"avgPrice" : 2.75
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 3.40,
	"avgPrice" : 3.14
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.34,
	"avgPrice" : 2.76
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 103.15,
	"avgPrice" : 65.33
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 10.60,
	"avgPrice" : 9.74
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.13,
	"avgPrice" : 6.64
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 7.25,
	"avgPrice" : 5.59
}, {
	"type" : "Sawed-Off",
	"name" : "Orange DDPAT",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 6.59,
	"avgPrice" : 5.28
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.50,
	"avgPrice" : 0.47
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.29,
	"avgPrice" : 0.28
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.26
}, {
	"type" : "Sawed-Off",
	"name" : "Origami",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Factory New",
	"marketPrice" : 0.53,
	"avgPrice" : 0.41
}, {
	"type" : "Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.35,
	"avgPrice" : 0.32
}, {
	"type" : "Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Field-Tested",
	"marketPrice" : 0.32,
	"avgPrice" : 0.31
}, {
	"type" : "Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 0.37,
	"avgPrice" : 0.32
}, {
	"type" : "Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.34,
	"avgPrice" : 0.31
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Factory New",
	"marketPrice" : 1.90,
	"avgPrice" : 1.98
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.54,
	"avgPrice" : 0.57
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Field-Tested",
	"marketPrice" : 0.47,
	"avgPrice" : 0.39
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Well-Worn",
	"marketPrice" : 0.89,
	"avgPrice" : 0.86
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Rust Coat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.89,
	"avgPrice" : 0.83
}, {
	"type" : "Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Factory New",
	"marketPrice" : 0.49,
	"avgPrice" : 0.44
}, {
	"type" : "Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.07
}, {
	"type" : "Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Factory New",
	"marketPrice" : 10.49,
	"avgPrice" : 5.86
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.40,
	"avgPrice" : 0.39
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.25,
	"avgPrice" : 0.23
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 0.35,
	"avgPrice" : 0.32
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Sage Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.28,
	"avgPrice" : 0.26
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Factory New",
	"marketPrice" : 0.80,
	"avgPrice" : 0.76
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.50,
	"avgPrice" : 0.47
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Field-Tested",
	"marketPrice" : 0.39,
	"avgPrice" : 0.37
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Well-Worn",
	"marketPrice" : 0.57,
	"avgPrice" : 0.56
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.63,
	"avgPrice" : 0.54
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.14,
	"avgPrice" : 3.22
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.02,
	"avgPrice" : 2.10
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.19,
	"avgPrice" : 1.29
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.72,
	"avgPrice" : 1.30
}, {
	"type" : "Sawed-Off",
	"name" : "Serenity",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.34,
	"avgPrice" : 1.37
}, {
	"type" : "Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Factory New",
	"marketPrice" : 0.31,
	"avgPrice" : 0.30
}, {
	"type" : "Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Factory New",
	"marketPrice" : 7.68,
	"avgPrice" : 4.58
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.60,
	"avgPrice" : 0.54
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.29,
	"avgPrice" : 0.28
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.49,
	"avgPrice" : 0.45
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Snake Camo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.57,
	"avgPrice" : 0.56
}, {
	"type" : "Sawed-Off",
	"name" : "The Kraken",
	"quality" : "Factory New",
	"marketPrice" : 6.40,
	"avgPrice" : 6.05
}, {
	"type" : "Sawed-Off",
	"name" : "The Kraken",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.51,
	"avgPrice" : 4.52
}, {
	"type" : "Sawed-Off",
	"name" : "The Kraken",
	"quality" : "Field-Tested",
	"marketPrice" : 3.85,
	"avgPrice" : 3.70
}, {
	"type" : "Sawed-Off",
	"name" : "The Kraken",
	"quality" : "Well-Worn",
	"marketPrice" : 4.50,
	"avgPrice" : 4.51
}, {
	"type" : "Sawed-Off",
	"name" : "The Kraken",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 48.55,
	"avgPrice" : 42.94
}, {
	"type" : "Sawed-Off",
	"name" : "The Kraken",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 33.60,
	"avgPrice" : 19.63
}, {
	"type" : "Sawed-Off",
	"name" : "The Kraken",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 13.70,
	"avgPrice" : 13.37
}, {
	"type" : "Sawed-Off",
	"name" : "The Kraken",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 25.25,
	"avgPrice" : 22.43
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Factory New",
	"marketPrice" : 0.37,
	"avgPrice" : 0.36
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 21.58,
	"avgPrice" : 22.33
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.75,
	"avgPrice" : 1.92
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.47,
	"avgPrice" : 0.47
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.70,
	"avgPrice" : 0.67
}, {
	"type" : "R8 Revolver",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.46,
	"avgPrice" : 0.43
}, {
	"type" : "R8 Revolver",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 8.98,
	"avgPrice" : 9.07
}, {
	"type" : "R8 Revolver",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.85,
	"avgPrice" : 4.80
}, {
	"type" : "R8 Revolver",
	"name" : "Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 3.22,
	"avgPrice" : 3.19
}, {
	"type" : "R8 Revolver",
	"name" : "Fade",
	"quality" : "Well-Worn",
	"marketPrice" : 5.07,
	"avgPrice" : 4.98
}, {
	"type" : "R8 Revolver",
	"name" : "Fade",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 50.46,
	"avgPrice" : 49.96
}, {
	"type" : "R8 Revolver",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 23.58,
	"avgPrice" : 23.56
}, {
	"type" : "R8 Revolver",
	"name" : "Fade",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 12.92,
	"avgPrice" : 12.48
}, {
	"type" : "R8 Revolver",
	"name" : "Fade",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 196.62,
	"avgPrice" : 23.45
}, {
	"type" : "Sawed-Off",
	"name" : "Amber Fade",
	"quality" : "Factory New",
	"marketPrice" : 0.21,
	"avgPrice" : 0.23
}, {
	"type" : "Sawed-Off",
	"name" : "Amber Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.18,
	"avgPrice" : 0.14
}, {
	"type" : "Sawed-Off",
	"name" : "Amber Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Sawed-Off",
	"name" : "Amber Fade",
	"quality" : "Well-Worn",
	"marketPrice" : 0.25,
	"avgPrice" : 0.24
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Amber Fade",
	"quality" : "Factory New",
	"marketPrice" : 4.39,
	"avgPrice" : 4.63
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Amber Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.69,
	"avgPrice" : 2.25
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Amber Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 1.38,
	"avgPrice" : 1.45
}, {
	"type" : "Souvenir Sawed-Off",
	"name" : "Amber Fade",
	"quality" : "Well-Worn",
	"marketPrice" : 5.48,
	"avgPrice" : 5.61
}, {
	"type" : "Sawed-Off",
	"name" : "Bamboo Shadow",
	"quality" : "Factory New",
	"marketPrice" : 0.25,
	"avgPrice" : 0.26
}, {
	"type" : "Sawed-Off",
	"name" : "Bamboo Shadow",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "Sawed-Off",
	"name" : "Bamboo Shadow",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Sawed-Off",
	"name" : "Bamboo Shadow",
	"quality" : "Well-Worn",
	"marketPrice" : 0.70,
	"avgPrice" : 0.09
}, {
	"type" : "Sawed-Off",
	"name" : "Bamboo Shadow",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "Sawed-Off",
	"name" : "Copper",
	"quality" : "Factory New",
	"marketPrice" : 13.47,
	"avgPrice" : 11.19
}, {
	"type" : "Sawed-Off",
	"name" : "Copper",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.30,
	"avgPrice" : 6.07
}, {
	"type" : "Sawed-Off",
	"name" : "Copper",
	"quality" : "Field-Tested",
	"marketPrice" : 4.87,
	"avgPrice" : 4.20
}, {
	"type" : "Sawed-Off",
	"name" : "Copper",
	"quality" : "Well-Worn",
	"marketPrice" : 4.54,
	"avgPrice" : 4.57
}, {
	"type" : "Sawed-Off",
	"name" : "Copper",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.32,
	"avgPrice" : 4.31
}, {
	"type" : "Sawed-Off",
	"name" : "First Class",
	"quality" : "Factory New",
	"marketPrice" : 5.52,
	"avgPrice" : 5.57
}, {
	"type" : "Sawed-Off",
	"name" : "First Class",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.50,
	"avgPrice" : 3.51
}, {
	"type" : "Sawed-Off",
	"name" : "First Class",
	"quality" : "Field-Tested",
	"marketPrice" : 3.73,
	"avgPrice" : 3.51
}, {
	"type" : "Sawed-Off",
	"name" : "First Class",
	"quality" : "Well-Worn",
	"marketPrice" : 6.00,
	"avgPrice" : 4.50
}, {
	"type" : "Sawed-Off",
	"name" : "First Class",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.84,
	"avgPrice" : 2.95
}, {
	"type" : "Sawed-Off",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0.23,
	"avgPrice" : 0.62
}, {
	"type" : "Sawed-Off",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Sawed-Off",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Sawed-Off",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Sawed-Off",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Factory New",
	"marketPrice" : 0.37,
	"avgPrice" : 0.35
}, {
	"type" : "Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.24,
	"avgPrice" : 0.22
}, {
	"type" : "Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Field-Tested",
	"marketPrice" : 0.21,
	"avgPrice" : 0.18
}, {
	"type" : "Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Well-Worn",
	"marketPrice" : 0.23,
	"avgPrice" : 0.22
}, {
	"type" : "Sawed-Off",
	"name" : "Full Stop",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.21,
	"avgPrice" : 0.17
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 8.94,
	"avgPrice" : 12.63
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 25.00,
	"avgPrice" : 19.98
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 8.22,
	"avgPrice" : 7.75
}, {
	"type" : "SCAR-20",
	"name" : "Emerald",
	"quality" : "Factory New",
	"marketPrice" : 5.20,
	"avgPrice" : 4.76
}, {
	"type" : "SCAR-20",
	"name" : "Emerald",
	"quality" : "Minimal Wear",
	"marketPrice" : 16.99,
	"avgPrice" : 10.65
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Factory New",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.10,
	"avgPrice" : 1.05
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.32,
	"avgPrice" : 0.33
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.24,
	"avgPrice" : 0.24
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.37,
	"avgPrice" : 0.33
}, {
	"type" : "SCAR-20",
	"name" : "Green Marine",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Factory New",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.12,
	"avgPrice" : 0.13
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Well-Worn",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.66,
	"avgPrice" : 0.69
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.35,
	"avgPrice" : 0.36
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.59,
	"avgPrice" : 0.63
}, {
	"type" : "SCAR-20",
	"name" : "Grotto",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.42,
	"avgPrice" : 0.41
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Factory New",
	"marketPrice" : 0.36,
	"avgPrice" : 0.33
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Well-Worn",
	"marketPrice" : 0.12,
	"avgPrice" : 0.10
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.96,
	"avgPrice" : 2.53
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.21,
	"avgPrice" : 1.06
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.30,
	"avgPrice" : 0.32
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.55,
	"avgPrice" : 0.46
}, {
	"type" : "SCAR-20",
	"name" : "Outbreak",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.55,
	"avgPrice" : 0.65
}, {
	"type" : "SCAR-20",
	"name" : "Palm",
	"quality" : "Factory New",
	"marketPrice" : 24.72,
	"avgPrice" : 23.58
}, {
	"type" : "SCAR-20",
	"name" : "Palm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.75,
	"avgPrice" : 0.73
}, {
	"type" : "SCAR-20",
	"name" : "Palm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.60,
	"avgPrice" : 0.56
}, {
	"type" : "SCAR-20",
	"name" : "Palm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.74,
	"avgPrice" : 0.64
}, {
	"type" : "SCAR-20",
	"name" : "Palm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.64,
	"avgPrice" : 0.67
}, {
	"type" : "SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.12
}, {
	"type" : "SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Factory New",
	"marketPrice" : 3.95,
	"avgPrice" : 3.77
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.38,
	"avgPrice" : 0.41
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.23,
	"avgPrice" : 0.21
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.25,
	"avgPrice" : 0.25
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Sand Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.26,
	"avgPrice" : 0.23
}, {
	"type" : "SCAR-20",
	"name" : "Splash Jam",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 364.28
}, {
	"type" : "SCAR-20",
	"name" : "Splash Jam",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.00,
	"avgPrice" : 19.81
}, {
	"type" : "SCAR-20",
	"name" : "Splash Jam",
	"quality" : "Field-Tested",
	"marketPrice" : 2.46,
	"avgPrice" : 2.51
}, {
	"type" : "SCAR-20",
	"name" : "Splash Jam",
	"quality" : "Well-Worn",
	"marketPrice" : 3.85,
	"avgPrice" : 2.81
}, {
	"type" : "SCAR-20",
	"name" : "Splash Jam",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.14,
	"avgPrice" : 3.67
}, {
	"type" : "SCAR-20",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 0.62,
	"avgPrice" : 0.61
}, {
	"type" : "SCAR-20",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.09,
	"avgPrice" : 0.09
}, {
	"type" : "SCAR-20",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "SCAR-20",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "SCAR-20",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 3.14,
	"avgPrice" : 2.79
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.39,
	"avgPrice" : 0.47
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.24,
	"avgPrice" : 0.22
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.37,
	"avgPrice" : 0.34
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.29,
	"avgPrice" : 0.24
}, {
	"type" : "SG 553",
	"name" : "Anodized Navy",
	"quality" : "Factory New",
	"marketPrice" : 0.27,
	"avgPrice" : 0.24
}, {
	"type" : "SG 553",
	"name" : "Anodized Navy",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.43,
	"avgPrice" : 0.45
}, {
	"type" : "Souvenir SG 553",
	"name" : "Anodized Navy",
	"quality" : "Factory New",
	"marketPrice" : 30.88,
	"avgPrice" : 31.70
}, {
	"type" : "Souvenir SG 553",
	"name" : "Anodized Navy",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 92.25
}, {
	"type" : "SG 553",
	"name" : "Army Sheen",
	"quality" : "Factory New",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "SG 553",
	"name" : "Army Sheen",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SG 553",
	"name" : "Army Sheen",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SG 553",
	"name" : "Bulldozer",
	"quality" : "Factory New",
	"marketPrice" : 42.98,
	"avgPrice" : 32.10
}, {
	"type" : "SG 553",
	"name" : "Bulldozer",
	"quality" : "Minimal Wear",
	"marketPrice" : 11.50,
	"avgPrice" : 10.64
}, {
	"type" : "SG 553",
	"name" : "Bulldozer",
	"quality" : "Field-Tested",
	"marketPrice" : 10.52,
	"avgPrice" : 8.65
}, {
	"type" : "SG 553",
	"name" : "Bulldozer",
	"quality" : "Well-Worn",
	"marketPrice" : 10.62,
	"avgPrice" : 8.34
}, {
	"type" : "SG 553",
	"name" : "Bulldozer",
	"quality" : "Battle-Scarred",
	"marketPrice" : 10.25,
	"avgPrice" : 8.20
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Factory New",
	"marketPrice" : 7.67,
	"avgPrice" : 7.81
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.93,
	"avgPrice" : 3.75
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Field-Tested",
	"marketPrice" : 2.50,
	"avgPrice" : 2.48
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Well-Worn",
	"marketPrice" : 2.41,
	"avgPrice" : 2.29
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.60,
	"avgPrice" : 2.25
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 39.10,
	"avgPrice" : 36.33
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 13.68,
	"avgPrice" : 13.09
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.79,
	"avgPrice" : 7.46
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 6.33,
	"avgPrice" : 6.34
}, {
	"type" : "SG 553",
	"name" : "Cyrex",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 5.54,
	"avgPrice" : 5.71
}, {
	"type" : "SG 553",
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 0.92,
	"avgPrice" : 0.82
}, {
	"type" : "SG 553",
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "SG 553",
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "SG 553",
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "SG 553",
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Souvenir SG 553",
	"name" : "Damascus Steel",
	"quality" : "Factory New",
	"marketPrice" : 67.43,
	"avgPrice" : 58.06
}, {
	"type" : "Souvenir SG 553",
	"name" : "Damascus Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.17,
	"avgPrice" : 5.86
}, {
	"type" : "Souvenir SG 553",
	"name" : "Damascus Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 3.49,
	"avgPrice" : 2.80
}, {
	"type" : "Souvenir SG 553",
	"name" : "Damascus Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 2.24,
	"avgPrice" : 2.14
}, {
	"type" : "Souvenir SG 553",
	"name" : "Damascus Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.36,
	"avgPrice" : 2.96
}, {
	"type" : "SG 553",
	"name" : "Fallout Warning",
	"quality" : "Factory New",
	"marketPrice" : 0.87,
	"avgPrice" : 0.79
}, {
	"type" : "SG 553",
	"name" : "Fallout Warning",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.24,
	"avgPrice" : 0.26
}, {
	"type" : "SG 553",
	"name" : "Fallout Warning",
	"quality" : "Field-Tested",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "SG 553",
	"name" : "Fallout Warning",
	"quality" : "Well-Worn",
	"marketPrice" : 0.42,
	"avgPrice" : 0.39
}, {
	"type" : "SG 553",
	"name" : "Fallout Warning",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "Souvenir SG 553",
	"name" : "Fallout Warning",
	"quality" : "Factory New",
	"marketPrice" : 5.75,
	"avgPrice" : 5.25
}, {
	"type" : "Souvenir SG 553",
	"name" : "Fallout Warning",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.41,
	"avgPrice" : 1.40
}, {
	"type" : "Souvenir SG 553",
	"name" : "Fallout Warning",
	"quality" : "Field-Tested",
	"marketPrice" : 0.73,
	"avgPrice" : 0.68
}, {
	"type" : "Souvenir SG 553",
	"name" : "Fallout Warning",
	"quality" : "Well-Worn",
	"marketPrice" : 1.27,
	"avgPrice" : 1.37
}, {
	"type" : "Souvenir SG 553",
	"name" : "Fallout Warning",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.73,
	"avgPrice" : 0.70
}, {
	"type" : "SG 553",
	"name" : "Gator Mesh",
	"quality" : "Factory New",
	"marketPrice" : 1.10,
	"avgPrice" : 1.06
}, {
	"type" : "SG 553",
	"name" : "Gator Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.87,
	"avgPrice" : 0.84
}, {
	"type" : "SG 553",
	"name" : "Gator Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.65,
	"avgPrice" : 0.73
}, {
	"type" : "SG 553",
	"name" : "Gator Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.81,
	"avgPrice" : 0.80
}, {
	"type" : "SG 553",
	"name" : "Gator Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.23,
	"avgPrice" : 1.37
}, {
	"type" : "Souvenir SG 553",
	"name" : "Gator Mesh",
	"quality" : "Factory New",
	"marketPrice" : 3.37,
	"avgPrice" : 3.44
}, {
	"type" : "Souvenir SG 553",
	"name" : "Gator Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.29,
	"avgPrice" : 1.37
}, {
	"type" : "Souvenir SG 553",
	"name" : "Gator Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.78,
	"avgPrice" : 0.76
}, {
	"type" : "Souvenir SG 553",
	"name" : "Gator Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 7.95,
	"avgPrice" : 10.78
}, {
	"type" : "Souvenir SG 553",
	"name" : "Gator Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.97,
	"avgPrice" : 0.94
}, {
	"type" : "SG 553",
	"name" : "Pulse",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.12,
	"avgPrice" : 1.09
}, {
	"type" : "SG 553",
	"name" : "Pulse",
	"quality" : "Field-Tested",
	"marketPrice" : 0.41,
	"avgPrice" : 0.41
}, {
	"type" : "SG 553",
	"name" : "Pulse",
	"quality" : "Well-Worn",
	"marketPrice" : 0.71,
	"avgPrice" : 0.75
}, {
	"type" : "SG 553",
	"name" : "Pulse",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.40
}, {
	"type" : "SG 553",
	"name" : "Pulse",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.38,
	"avgPrice" : 4.45
}, {
	"type" : "SG 553",
	"name" : "Pulse",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.44,
	"avgPrice" : 1.41
}, {
	"type" : "SG 553",
	"name" : "Pulse",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.79,
	"avgPrice" : 1.89
}, {
	"type" : "SG 553",
	"name" : "Pulse",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.44,
	"avgPrice" : 1.48
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Factory New",
	"marketPrice" : 3.33,
	"avgPrice" : 3.29
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.29,
	"avgPrice" : 1.33
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Field-Tested",
	"marketPrice" : 0.69,
	"avgPrice" : 0.69
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Well-Worn",
	"marketPrice" : 0.63,
	"avgPrice" : 0.59
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.59,
	"avgPrice" : 0.54
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 19.98,
	"avgPrice" : 16.98
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 6.85,
	"avgPrice" : 6.81
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 3.23,
	"avgPrice" : 2.96
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.47,
	"avgPrice" : 2.44
}, {
	"type" : "SG 553",
	"name" : "Tiger Moth",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.46,
	"avgPrice" : 2.38
}, {
	"type" : "SG 553",
	"name" : "Tornado",
	"quality" : "Factory New",
	"marketPrice" : 6.16,
	"avgPrice" : 5.77
}, {
	"type" : "SG 553",
	"name" : "Tornado",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.98,
	"avgPrice" : 1.97
}, {
	"type" : "SG 553",
	"name" : "Tornado",
	"quality" : "Field-Tested",
	"marketPrice" : 1.06,
	"avgPrice" : 1.15
}, {
	"type" : "SG 553",
	"name" : "Tornado",
	"quality" : "Well-Worn",
	"marketPrice" : 1.62,
	"avgPrice" : 1.20
}, {
	"type" : "SG 553",
	"name" : "Tornado",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.35,
	"avgPrice" : 1.26
}, {
	"type" : "SG 553",
	"name" : "Traveler",
	"quality" : "Factory New",
	"marketPrice" : 3.37,
	"avgPrice" : 3.15
}, {
	"type" : "SG 553",
	"name" : "Traveler",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.93,
	"avgPrice" : 0.88
}, {
	"type" : "SG 553",
	"name" : "Traveler",
	"quality" : "Field-Tested",
	"marketPrice" : 0.51,
	"avgPrice" : 0.51
}, {
	"type" : "SG 553",
	"name" : "Traveler",
	"quality" : "Well-Worn",
	"marketPrice" : 0.97,
	"avgPrice" : 0.71
}, {
	"type" : "SG 553",
	"name" : "Traveler",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.75,
	"avgPrice" : 0.77
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"marketPrice" : 9.71,
	"avgPrice" : 8.14
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.06,
	"avgPrice" : 1.20
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"marketPrice" : 0.78,
	"avgPrice" : 0.82
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"marketPrice" : 0.89,
	"avgPrice" : 0.90
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.74,
	"avgPrice" : 0.86
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.25,
	"avgPrice" : 2.21
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.88,
	"avgPrice" : 0.85
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.35,
	"avgPrice" : 0.31
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.26
}, {
	"type" : "Sawed-Off",
	"name" : "Yorick",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.29,
	"avgPrice" : 0.26
}, {
	"type" : "SCAR-20",
	"name" : "Army Sheen",
	"quality" : "Factory New",
	"marketPrice" : 0.24,
	"avgPrice" : 0.24
}, {
	"type" : "SCAR-20",
	"name" : "Army Sheen",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.10,
	"avgPrice" : 0.08
}, {
	"type" : "SCAR-20",
	"name" : "Army Sheen",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "SCAR-20",
	"name" : "Carbon Fiber",
	"quality" : "Factory New",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "SCAR-20",
	"name" : "Carbon Fiber",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.07,
	"avgPrice" : 0.06
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Carbon Fiber",
	"quality" : "Factory New",
	"marketPrice" : 2.46,
	"avgPrice" : 2.71
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Carbon Fiber",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.55,
	"avgPrice" : 2.96
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Factory New",
	"marketPrice" : 8.32,
	"avgPrice" : 8.19
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.00,
	"avgPrice" : 3.24
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Field-Tested",
	"marketPrice" : 2.43,
	"avgPrice" : 2.43
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Well-Worn",
	"marketPrice" : 2.30,
	"avgPrice" : 2.34
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.70,
	"avgPrice" : 2.63
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 63.55,
	"avgPrice" : 55.31
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 14.06,
	"avgPrice" : 13.33
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 8.43,
	"avgPrice" : 7.61
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 7.74,
	"avgPrice" : 7.34
}, {
	"type" : "SCAR-20",
	"name" : "Cardiac",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 7.26,
	"avgPrice" : 7.26
}, {
	"type" : "SCAR-20",
	"name" : "Contractor",
	"quality" : "Factory New",
	"marketPrice" : 0.12,
	"avgPrice" : 0.11
}, {
	"type" : "SCAR-20",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SCAR-20",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SCAR-20",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SCAR-20",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Contractor",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.20,
	"avgPrice" : 2.28
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Contractor",
	"quality" : "Field-Tested",
	"marketPrice" : 1.35,
	"avgPrice" : 0.99
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Contractor",
	"quality" : "Well-Worn",
	"marketPrice" : 1.85,
	"avgPrice" : 1.30
}, {
	"type" : "Souvenir SCAR-20",
	"name" : "Contractor",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.36,
	"avgPrice" : 1.81
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 5.14,
	"avgPrice" : 4.92
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.00,
	"avgPrice" : 1.13
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 0.76,
	"avgPrice" : 0.84
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 0.88,
	"avgPrice" : 0.85
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.77,
	"avgPrice" : 0.76
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 26.45,
	"avgPrice" : 23.47
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.33,
	"avgPrice" : 3.24
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.57,
	"avgPrice" : 1.65
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.80,
	"avgPrice" : 1.81
}, {
	"type" : "SCAR-20",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.76,
	"avgPrice" : 1.49
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Factory New",
	"marketPrice" : 6.50,
	"avgPrice" : 6.51
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.85,
	"avgPrice" : 4.47
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Field-Tested",
	"marketPrice" : 3.40,
	"avgPrice" : 3.32
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Well-Worn",
	"marketPrice" : 4.17,
	"avgPrice" : 3.50
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.52,
	"avgPrice" : 3.75
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 23.88,
	"avgPrice" : 23.56
}, {
	"type" : "SCAR-20",
	"name" : "Cyrex",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 18.55,
	"avgPrice" : 14.82
}, {
	"type" : "Souvenir Nova",
	"name" : "Sand Dune",
	"quality" : "Factory New",
	"marketPrice" : 94.44,
	"avgPrice" : 38.50
}, {
	"type" : "Souvenir Nova",
	"name" : "Sand Dune",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.50,
	"avgPrice" : 2.93
}, {
	"type" : "Souvenir Nova",
	"name" : "Sand Dune",
	"quality" : "Field-Tested",
	"marketPrice" : 1.20,
	"avgPrice" : 1.05
}, {
	"type" : "Souvenir Nova",
	"name" : "Sand Dune",
	"quality" : "Well-Worn",
	"marketPrice" : 4.31,
	"avgPrice" : 4.96
}, {
	"type" : "Souvenir Nova",
	"name" : "Sand Dune",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.58,
	"avgPrice" : 1.66
}, {
	"type" : "Nova",
	"name" : "Tempest",
	"quality" : "Factory New",
	"marketPrice" : 4.85,
	"avgPrice" : 7.07
}, {
	"type" : "Nova",
	"name" : "Tempest",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.00,
	"avgPrice" : 0.89
}, {
	"type" : "Nova",
	"name" : "Tempest",
	"quality" : "Field-Tested",
	"marketPrice" : 0.78,
	"avgPrice" : 0.81
}, {
	"type" : "Nova",
	"name" : "Tempest",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 19.55,
	"avgPrice" : 15.85
}, {
	"type" : "Nova",
	"name" : "Tempest",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.45,
	"avgPrice" : 2.57
}, {
	"type" : "Nova",
	"name" : "Tempest",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.73,
	"avgPrice" : 1.86
}, {
	"type" : "Nova",
	"name" : "Walnut",
	"quality" : "Factory New",
	"marketPrice" : 15.64,
	"avgPrice" : 11.06
}, {
	"type" : "Nova",
	"name" : "Walnut",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.46,
	"avgPrice" : 0.50
}, {
	"type" : "Nova",
	"name" : "Walnut",
	"quality" : "Field-Tested",
	"marketPrice" : 0.21,
	"avgPrice" : 0.20
}, {
	"type" : "Nova",
	"name" : "Walnut",
	"quality" : "Well-Worn",
	"marketPrice" : 0.34,
	"avgPrice" : 0.32
}, {
	"type" : "Nova",
	"name" : "Walnut",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "Souvenir Nova",
	"name" : "Walnut",
	"quality" : "Factory New",
	"marketPrice" : 6.50,
	"avgPrice" : 6.21
}, {
	"type" : "Souvenir Nova",
	"name" : "Walnut",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.70,
	"avgPrice" : 0.64
}, {
	"type" : "Souvenir Nova",
	"name" : "Walnut",
	"quality" : "Field-Tested",
	"marketPrice" : 0.27,
	"avgPrice" : 0.26
}, {
	"type" : "Souvenir Nova",
	"name" : "Walnut",
	"quality" : "Well-Worn",
	"marketPrice" : 0.39,
	"avgPrice" : 0.40
}, {
	"type" : "Souvenir Nova",
	"name" : "Walnut",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.28,
	"avgPrice" : 0.27
}, {
	"type" : "P2000",
	"name" : "Amber Fade",
	"quality" : "Factory New",
	"marketPrice" : 1.06,
	"avgPrice" : 1.05
}, {
	"type" : "P2000",
	"name" : "Amber Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.43,
	"avgPrice" : 0.44
}, {
	"type" : "P2000",
	"name" : "Amber Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 0.35,
	"avgPrice" : 0.35
}, {
	"type" : "P2000",
	"name" : "Amber Fade",
	"quality" : "Well-Worn",
	"marketPrice" : 0.55,
	"avgPrice" : 0.56
}, {
	"type" : "Souvenir P2000",
	"name" : "Amber Fade",
	"quality" : "Factory New",
	"marketPrice" : 29.21,
	"avgPrice" : 34.09
}, {
	"type" : "Souvenir P2000",
	"name" : "Amber Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 20.78,
	"avgPrice" : 15.30
}, {
	"type" : "Souvenir P2000",
	"name" : "Amber Fade",
	"quality" : "Field-Tested",
	"marketPrice" : 8.00,
	"avgPrice" : 9.66
}, {
	"type" : "Souvenir P2000",
	"name" : "Amber Fade",
	"quality" : "Well-Worn",
	"marketPrice" : 21.35,
	"avgPrice" : 18.81
}, {
	"type" : "P2000",
	"name" : "Chainmail",
	"quality" : "Factory New",
	"marketPrice" : 3.48,
	"avgPrice" : 3.38
}, {
	"type" : "P2000",
	"name" : "Chainmail",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.33,
	"avgPrice" : 3.28
}, {
	"type" : "P2000",
	"name" : "Chainmail",
	"quality" : "Field-Tested",
	"marketPrice" : 3.60,
	"avgPrice" : 3.30
}, {
	"type" : "Souvenir P2000",
	"name" : "Chainmail",
	"quality" : "Factory New",
	"marketPrice" : 7.09,
	"avgPrice" : 7.30
}, {
	"type" : "Souvenir P2000",
	"name" : "Chainmail",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.84,
	"avgPrice" : 4.82
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 104.57,
	"avgPrice" : 102.09
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 78.52,
	"avgPrice" : 73.67
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 80.50,
	"avgPrice" : 68.22
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 83.85,
	"avgPrice" : 66.86
}, {
	"type" : "Shadow Daggers",
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 161.81,
	"avgPrice" : 155.79
}, {
	"type" : "Shadow Daggers",
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 136.85,
	"avgPrice" : 135.17
}, {
	"type" : "Shadow Daggers",
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 134.35,
	"avgPrice" : 123.36
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Factory New",
	"marketPrice" : 273.24,
	"avgPrice" : 258.14
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Minimal Wear",
	"marketPrice" : 252.82,
	"avgPrice" : 207.95
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Slaughter",
	"quality" : "Field-Tested",
	"marketPrice" : 194.90,
	"avgPrice" : 167.51
}, {
	"type" : "Shadow Daggers",
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 132.97,
	"avgPrice" : 108.00
}, {
	"type" : "Shadow Daggers",
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 79.86,
	"avgPrice" : 73.43
}, {
	"type" : "Shadow Daggers",
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 69.84,
	"avgPrice" : 65.74
}, {
	"type" : "Shadow Daggers",
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 71.07,
	"avgPrice" : 65.50
}, {
	"type" : "Shadow Daggers",
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 67.25,
	"avgPrice" : 64.42
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Factory New",
	"marketPrice" : 356.17,
	"avgPrice" : 317.57
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Minimal Wear",
	"marketPrice" : 200.00,
	"avgPrice" : 119.34
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Field-Tested",
	"marketPrice" : 94.35,
	"avgPrice" : 84.07
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Well-Worn",
	"marketPrice" : 118.04,
	"avgPrice" : 85.70
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Stained",
	"quality" : "Battle-Scarred",
	"marketPrice" : 109.82,
	"avgPrice" : 87.94
}, {
	"type" : "Shadow Daggers",
	"name" : "Urban Masked",
	"quality" : "Factory New",
	"marketPrice" : 273.59,
	"avgPrice" : 130.79
}, {
	"type" : "Shadow Daggers",
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 73.09,
	"avgPrice" : 70.93
}, {
	"type" : "Shadow Daggers",
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 59.80,
	"avgPrice" : 58.57
}, {
	"type" : "Shadow Daggers",
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 64.30,
	"avgPrice" : 61.88
}, {
	"type" : "Shadow Daggers",
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 58.43,
	"avgPrice" : 55.26
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Minimal Wear",
	"marketPrice" : 144.24,
	"avgPrice" : 101.42
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Field-Tested",
	"marketPrice" : 87.30,
	"avgPrice" : 78.74
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Well-Worn",
	"marketPrice" : 109.99,
	"avgPrice" : 73.96
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Urban Masked",
	"quality" : "Battle-Scarred",
	"marketPrice" : 77.35,
	"avgPrice" : 71.68
}, {
	"name" : "Shadow Daggers",
	"marketPrice" : 112.36,
	"avgPrice" : 107.26
}, {
	"name" : "Shadow Daggers",
	"statTrak" : 1,
	"marketPrice" : 202.23,
	"avgPrice" : 197.72
}, {
	"name" : "Slid3 Capsule",
	"marketPrice" : 1.17,
	"avgPrice" : 1.19
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Factory New",
	"marketPrice" : 1.08,
	"avgPrice" : 1.04
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.19,
	"avgPrice" : 0.19
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Field-Tested",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.67,
	"avgPrice" : 5.67
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.12,
	"avgPrice" : 1.11
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.47,
	"avgPrice" : 0.47
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.38,
	"avgPrice" : 0.38
}, {
	"type" : "SSG 08",
	"name" : "Abyss",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.39,
	"avgPrice" : 0.37
}, {
	"type" : "SSG 08",
	"name" : "Acid Fade",
	"quality" : "Factory New",
	"marketPrice" : 0.57,
	"avgPrice" : 0.55
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Acid Fade",
	"quality" : "Factory New",
	"marketPrice" : 48.30,
	"avgPrice" : 46.35
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Factory New",
	"marketPrice" : 6.30,
	"avgPrice" : 6.05
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.87,
	"avgPrice" : 4.06
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Field-Tested",
	"marketPrice" : 3.11,
	"avgPrice" : 3.01
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Well-Worn",
	"marketPrice" : 3.30,
	"avgPrice" : 2.96
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.56,
	"avgPrice" : 2.63
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 32.29,
	"avgPrice" : 29.72
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 15.75,
	"avgPrice" : 14.93
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.86,
	"avgPrice" : 8.20
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 7.30,
	"avgPrice" : 6.74
}, {
	"type" : "SSG 08",
	"name" : "Big Iron",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 8.88,
	"avgPrice" : 7.63
}, {
	"type" : "SSG 08",
	"name" : "Blood in the Water",
	"quality" : "Factory New",
	"marketPrice" : 44.54,
	"avgPrice" : 44.18
}, {
	"type" : "SSG 08",
	"name" : "Blood in the Water",
	"quality" : "Minimal Wear",
	"marketPrice" : 30.72,
	"avgPrice" : 28.84
}, {
	"type" : "SSG 08",
	"name" : "Blood in the Water",
	"quality" : "Field-Tested",
	"marketPrice" : 31.43,
	"avgPrice" : 28.89
}, {
	"type" : "SSG 08",
	"name" : "Blood in the Water",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 343.78,
	"avgPrice" : 337.45
}, {
	"type" : "SSG 08",
	"name" : "Blood in the Water",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 115.00,
	"avgPrice" : 129.10
}, {
	"type" : "SSG 08",
	"name" : "Blood in the Water",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 159.48,
	"avgPrice" : 110.29
}, {
	"type" : "SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Factory New",
	"marketPrice" : 0.23,
	"avgPrice" : 0.25
}, {
	"type" : "SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Factory New",
	"marketPrice" : 120.00,
	"avgPrice" : 65.77
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.60,
	"avgPrice" : 3.86
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Field-Tested",
	"marketPrice" : 2.37,
	"avgPrice" : 3.77
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Well-Worn",
	"marketPrice" : 2.44,
	"avgPrice" : 2.25
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Blue Spruce",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.33,
	"avgPrice" : 4.17
}, {
	"type" : "SSG 08",
	"name" : "Dark Water",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.32,
	"avgPrice" : 0.33
}, {
	"type" : "SSG 08",
	"name" : "Dark Water",
	"quality" : "Field-Tested",
	"marketPrice" : 0.19,
	"avgPrice" : 0.19
}, {
	"type" : "SSG 08",
	"name" : "Dark Water",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.20,
	"avgPrice" : 1.24
}, {
	"type" : "SSG 08",
	"name" : "Dark Water",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.60,
	"avgPrice" : 0.59
}, {
	"type" : "SSG 08",
	"name" : "Detour",
	"quality" : "Factory New",
	"marketPrice" : 5.42,
	"avgPrice" : 5.15
}, {
	"type" : "SSG 08",
	"name" : "Detour",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.65,
	"avgPrice" : 2.78
}, {
	"type" : "SSG 08",
	"name" : "Detour",
	"quality" : "Field-Tested",
	"marketPrice" : 1.87,
	"avgPrice" : 1.83
}, {
	"type" : "SSG 08",
	"name" : "Detour",
	"quality" : "Well-Worn",
	"marketPrice" : 2.00,
	"avgPrice" : 1.80
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Detour",
	"quality" : "Factory New",
	"marketPrice" : 47.91,
	"avgPrice" : 46.32
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Detour",
	"quality" : "Minimal Wear",
	"marketPrice" : 30.18,
	"avgPrice" : 26.80
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Detour",
	"quality" : "Field-Tested",
	"marketPrice" : 23.27,
	"avgPrice" : 18.32
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Detour",
	"quality" : "Well-Worn",
	"marketPrice" : 11.99,
	"avgPrice" : 15.66
}, {
	"type" : "SSG 08",
	"name" : "Lichen Dashed",
	"quality" : "Factory New",
	"marketPrice" : 9.77,
	"avgPrice" : 8.37
}, {
	"type" : "SSG 08",
	"name" : "Lichen Dashed",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.48,
	"avgPrice" : 0.47
}, {
	"type" : "SSG 08",
	"name" : "Lichen Dashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.20,
	"avgPrice" : 0.21
}, {
	"type" : "SSG 08",
	"name" : "Lichen Dashed",
	"quality" : "Well-Worn",
	"marketPrice" : 0.72,
	"avgPrice" : 0.29
}, {
	"type" : "SSG 08",
	"name" : "Lichen Dashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.40,
	"avgPrice" : 0.44
}, {
	"type" : "SSG 08",
	"name" : "Mayan Dreams",
	"quality" : "Factory New",
	"marketPrice" : 33.71,
	"avgPrice" : 30.11
}, {
	"type" : "SSG 08",
	"name" : "Mayan Dreams",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.77,
	"avgPrice" : 1.83
}, {
	"type" : "SSG 08",
	"name" : "Mayan Dreams",
	"quality" : "Field-Tested",
	"marketPrice" : 0.75,
	"avgPrice" : 0.65
}, {
	"type" : "SSG 08",
	"name" : "Mayan Dreams",
	"quality" : "Well-Worn",
	"marketPrice" : 0.92,
	"avgPrice" : 0.88
}, {
	"type" : "SSG 08",
	"name" : "Mayan Dreams",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.65,
	"avgPrice" : 1.66
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Factory New",
	"marketPrice" : 1.05,
	"avgPrice" : 1.07
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.21,
	"avgPrice" : 0.22
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Field-Tested",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 8.01,
	"avgPrice" : 7.57
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.85,
	"avgPrice" : 1.82
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.87,
	"avgPrice" : 0.83
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 44.80,
	"avgPrice" : 49.81
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.97,
	"avgPrice" : 4.09
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.14,
	"avgPrice" : 2.04
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.32,
	"avgPrice" : 2.19
}, {
	"type" : "SG 553",
	"name" : "Ultraviolet",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.20,
	"avgPrice" : 2.06
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Factory New",
	"marketPrice" : 12.22,
	"avgPrice" : 10.18
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.00,
	"avgPrice" : 0.94
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Field-Tested",
	"marketPrice" : 0.74,
	"avgPrice" : 0.67
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Well-Worn",
	"marketPrice" : 1.74,
	"avgPrice" : 6.80
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.15,
	"avgPrice" : 1.19
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 45.00,
	"avgPrice" : 36.78
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.83,
	"avgPrice" : 2.88
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.77,
	"avgPrice" : 1.78
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.90,
	"avgPrice" : 1.67
}, {
	"type" : "SG 553",
	"name" : "Wave Spray",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.55,
	"avgPrice" : 1.51
}, {
	"type" : "SG 553",
	"name" : "Waves Perforated",
	"quality" : "Factory New",
	"marketPrice" : 0.20,
	"avgPrice" : 0.20
}, {
	"type" : "SG 553",
	"name" : "Waves Perforated",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SG 553",
	"name" : "Waves Perforated",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SG 553",
	"name" : "Waves Perforated",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "SG 553",
	"name" : "Waves Perforated",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir SG 553",
	"name" : "Waves Perforated",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.72,
	"avgPrice" : 2.57
}, {
	"type" : "Souvenir SG 553",
	"name" : "Waves Perforated",
	"quality" : "Field-Tested",
	"marketPrice" : 2.07,
	"avgPrice" : 1.82
}, {
	"type" : "Souvenir SG 553",
	"name" : "Waves Perforated",
	"quality" : "Well-Worn",
	"marketPrice" : 3.33,
	"avgPrice" : 4.30
}, {
	"type" : "Souvenir SG 553",
	"name" : "Waves Perforated",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.44,
	"avgPrice" : 1.64
}, {
	"type" : "Shadow Daggers",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 127.65,
	"avgPrice" : 107.56
}, {
	"type" : "Shadow Daggers",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 86.25,
	"avgPrice" : 81.73
}, {
	"type" : "Shadow Daggers",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 77.68,
	"avgPrice" : 76.34
}, {
	"type" : "Shadow Daggers",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 74.75,
	"avgPrice" : 74.17
}, {
	"type" : "Shadow Daggers",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 77.52,
	"avgPrice" : 74.50
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 401.08,
	"avgPrice" : 311.82
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 154.12,
	"avgPrice" : 126.16
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 111.71,
	"avgPrice" : 124.25
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 149.50,
	"avgPrice" : 102.47
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 123.00,
	"avgPrice" : 95.50
}, {
	"type" : "Shadow Daggers",
	"name" : "Boreal Forest",
	"quality" : "Factory New",
	"marketPrice" : 114.42,
	"avgPrice" : 110.44
}, {
	"type" : "Shadow Daggers",
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 68.27,
	"avgPrice" : 64.05
}, {
	"type" : "Shadow Daggers",
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 58.70,
	"avgPrice" : 56.25
}, {
	"type" : "Shadow Daggers",
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 62.70,
	"avgPrice" : 59.36
}, {
	"type" : "Shadow Daggers",
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 55.27,
	"avgPrice" : 52.47
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 96.90,
	"avgPrice" : 89.00
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 80.50,
	"avgPrice" : 83.72
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 214.70,
	"avgPrice" : 60.63
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Boreal Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 104.65,
	"avgPrice" : 61.88
}, {
	"type" : "Shadow Daggers",
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 162.90,
	"avgPrice" : 149.56
}, {
	"type" : "Shadow Daggers",
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 101.20,
	"avgPrice" : 101.34
}, {
	"type" : "Shadow Daggers",
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 90.44,
	"avgPrice" : 86.78
}, {
	"type" : "Shadow Daggers",
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 84.76,
	"avgPrice" : 80.73
}, {
	"type" : "Shadow Daggers",
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 85.15,
	"avgPrice" : 81.37
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.64,
	"avgPrice" : 0.60
}, {
	"type" : "SSG 08",
	"name" : "Necropos",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.42,
	"avgPrice" : 0.45
}, {
	"type" : "SSG 08",
	"name" : "Sand Dune",
	"quality" : "Factory New",
	"marketPrice" : 6.35,
	"avgPrice" : 6.16
}, {
	"type" : "SSG 08",
	"name" : "Sand Dune",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.65,
	"avgPrice" : 0.63
}, {
	"type" : "SSG 08",
	"name" : "Sand Dune",
	"quality" : "Field-Tested",
	"marketPrice" : 0.27,
	"avgPrice" : 0.26
}, {
	"type" : "SSG 08",
	"name" : "Sand Dune",
	"quality" : "Well-Worn",
	"marketPrice" : 0.63,
	"avgPrice" : 0.59
}, {
	"type" : "SSG 08",
	"name" : "Sand Dune",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.95,
	"avgPrice" : 0.78
}, {
	"type" : "SSG 08",
	"name" : "Slashed",
	"quality" : "Field-Tested",
	"marketPrice" : 0.17,
	"avgPrice" : 0.18
}, {
	"type" : "SSG 08",
	"name" : "Slashed",
	"quality" : "Well-Worn",
	"marketPrice" : 0.19,
	"avgPrice" : 0.17
}, {
	"type" : "SSG 08",
	"name" : "Slashed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "SSG 08",
	"name" : "Slashed",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.62,
	"avgPrice" : 0.64
}, {
	"type" : "SSG 08",
	"name" : "Slashed",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.53,
	"avgPrice" : 0.53
}, {
	"type" : "SSG 08",
	"name" : "Slashed",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.47,
	"avgPrice" : 0.45
}, {
	"type" : "SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Factory New",
	"marketPrice" : 8.75,
	"avgPrice" : 9.81
}, {
	"type" : "SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.09,
	"avgPrice" : 0.97
}, {
	"type" : "SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.87,
	"avgPrice" : 0.70
}, {
	"type" : "SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 1.00,
	"avgPrice" : 0.79
}, {
	"type" : "SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.85,
	"avgPrice" : 0.81
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Factory New",
	"marketPrice" : 69.99,
	"avgPrice" : 55.73
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.70,
	"avgPrice" : 5.27
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 1.97,
	"avgPrice" : 1.89
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 2.23,
	"avgPrice" : 2.45
}, {
	"type" : "Souvenir SSG 08",
	"name" : "Tropical Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.39,
	"avgPrice" : 2.33
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Factory New",
	"marketPrice" : 376.92,
	"avgPrice" : 226.55
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Minimal Wear",
	"marketPrice" : 179.57,
	"avgPrice" : 149.09
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Field-Tested",
	"marketPrice" : 127.00,
	"avgPrice" : 130.78
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Well-Worn",
	"marketPrice" : 140.44,
	"avgPrice" : 127.84
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Case Hardened",
	"quality" : "Battle-Scarred",
	"marketPrice" : 111.60,
	"avgPrice" : 110.91
}, {
	"type" : "Shadow Daggers",
	"name" : "Crimson Web",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 1350.00
}, {
	"type" : "Shadow Daggers",
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 186.73,
	"avgPrice" : 176.63
}, {
	"type" : "Shadow Daggers",
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 121.46,
	"avgPrice" : 119.52
}, {
	"type" : "Shadow Daggers",
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 110.00,
	"avgPrice" : 107.89
}, {
	"type" : "Shadow Daggers",
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 85.88,
	"avgPrice" : 79.80
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Minimal Wear",
	"marketPrice" : 374.87,
	"avgPrice" : 387.50
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Field-Tested",
	"marketPrice" : 200.00,
	"avgPrice" : 166.48
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Well-Worn",
	"marketPrice" : 142.11,
	"avgPrice" : 140.89
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Crimson Web",
	"quality" : "Battle-Scarred",
	"marketPrice" : 129.19,
	"avgPrice" : 110.92
}, {
	"type" : "Shadow Daggers",
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 182.85,
	"avgPrice" : 180.89
}, {
	"type" : "Shadow Daggers",
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 255.00,
	"avgPrice" : 235.13
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Factory New",
	"marketPrice" : 300.00,
	"avgPrice" : 288.57
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Fade",
	"quality" : "Minimal Wear",
	"marketPrice" : 386.45,
	"avgPrice" : 363.86
}, {
	"type" : "Shadow Daggers",
	"name" : "Forest DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 144.99,
	"avgPrice" : 109.38
}, {
	"type" : "Shadow Daggers",
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 70.78,
	"avgPrice" : 69.01
}, {
	"type" : "Shadow Daggers",
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 58.07,
	"avgPrice" : 58.23
}, {
	"type" : "Shadow Daggers",
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 60.00,
	"avgPrice" : 56.45
}, {
	"type" : "Shadow Daggers",
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 57.50,
	"avgPrice" : 54.35
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 144.99,
	"avgPrice" : 95.48
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 84.90,
	"avgPrice" : 80.24
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 84.25,
	"avgPrice" : 78.29
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Forest DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 66.70,
	"avgPrice" : 64.51
}, {
	"type" : "Shadow Daggers",
	"name" : "Night",
	"quality" : "Factory New",
	"marketPrice" : 399.19,
	"avgPrice" : 331.45
}, {
	"type" : "Shadow Daggers",
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 100.78,
	"avgPrice" : 96.93
}, {
	"type" : "Shadow Daggers",
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 82.69,
	"avgPrice" : 74.73
}, {
	"type" : "Shadow Daggers",
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 82.00,
	"avgPrice" : 73.82
}, {
	"type" : "Shadow Daggers",
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 63.85,
	"avgPrice" : 61.45
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Minimal Wear",
	"marketPrice" : 205.59,
	"avgPrice" : 144.19
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Field-Tested",
	"marketPrice" : 117.47,
	"avgPrice" : 109.06
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Well-Worn",
	"marketPrice" : 114.65,
	"avgPrice" : 110.96
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Night",
	"quality" : "Battle-Scarred",
	"marketPrice" : 93.97,
	"avgPrice" : 78.96
}, {
	"type" : "Shadow Daggers",
	"name" : "Safari Mesh",
	"quality" : "Factory New",
	"marketPrice" : 280.98,
	"avgPrice" : 86.45
}, {
	"type" : "Shadow Daggers",
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 58.13,
	"avgPrice" : 59.04
}, {
	"type" : "Shadow Daggers",
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 55.95,
	"avgPrice" : 53.10
}, {
	"type" : "Shadow Daggers",
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 64.59,
	"avgPrice" : 54.06
}, {
	"type" : "Shadow Daggers",
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 54.05,
	"avgPrice" : 51.72
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 86.25,
	"avgPrice" : 80.68
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 74.14,
	"avgPrice" : 69.30
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 80.89,
	"avgPrice" : 73.64
}, {
	"type" : "Shadow Daggers",
	"statTrak" : 1,
	"name" : "Safari Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 168.52,
	"avgPrice" : 60.34
}, {
	"type" : "Shadow Daggers",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 193.28,
	"avgPrice" : 123.16
}, {
	"type" : "Shadow Daggers",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 72.50,
	"avgPrice" : 68.87
}, {
	"type" : "Shadow Daggers",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 58.90,
	"avgPrice" : 55.47
}, {
	"type" : "Shadow Daggers",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 59.95,
	"avgPrice" : 57.57
}, {
	"type" : "Shadow Daggers",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 57.84,
	"avgPrice" : 52.08
}, {
	"type" : "P90",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "P90",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "P90",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "Souvenir P90",
	"name" : "Storm",
	"quality" : "Factory New",
	"marketPrice" : 6.07,
	"avgPrice" : 6.50
}, {
	"type" : "Souvenir P90",
	"name" : "Storm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.86,
	"avgPrice" : 0.85
}, {
	"type" : "Souvenir P90",
	"name" : "Storm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.36,
	"avgPrice" : 0.37
}, {
	"type" : "Souvenir P90",
	"name" : "Storm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.58,
	"avgPrice" : 0.52
}, {
	"type" : "Souvenir P90",
	"name" : "Storm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.39,
	"avgPrice" : 0.45
}, {
	"type" : "P90",
	"name" : "Teardown",
	"quality" : "Factory New",
	"marketPrice" : 0.40,
	"avgPrice" : 0.38
}, {
	"type" : "P90",
	"name" : "Teardown",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.19,
	"avgPrice" : 0.19
}, {
	"type" : "P90",
	"name" : "Teardown",
	"quality" : "Field-Tested",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "P90",
	"name" : "Teardown",
	"quality" : "Well-Worn",
	"marketPrice" : 0.28,
	"avgPrice" : 0.25
}, {
	"type" : "P90",
	"name" : "Teardown",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Souvenir P90",
	"name" : "Teardown",
	"quality" : "Factory New",
	"marketPrice" : 112.36,
	"avgPrice" : 59.98
}, {
	"type" : "Souvenir P90",
	"name" : "Teardown",
	"quality" : "Minimal Wear",
	"marketPrice" : 38.22,
	"avgPrice" : 32.96
}, {
	"type" : "Souvenir P90",
	"name" : "Teardown",
	"quality" : "Field-Tested",
	"marketPrice" : 17.45,
	"avgPrice" : 12.64
}, {
	"type" : "Souvenir P90",
	"name" : "Teardown",
	"quality" : "Battle-Scarred",
	"marketPrice" : 38.76,
	"avgPrice" : 20.72
}, {
	"type" : "P90",
	"name" : "Trigon",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.50,
	"avgPrice" : 4.51
}, {
	"type" : "P90",
	"name" : "Trigon",
	"quality" : "Field-Tested",
	"marketPrice" : 2.96,
	"avgPrice" : 2.90
}, {
	"type" : "P90",
	"name" : "Trigon",
	"quality" : "Well-Worn",
	"marketPrice" : 3.08,
	"avgPrice" : 3.07
}, {
	"type" : "P90",
	"name" : "Trigon",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.95,
	"avgPrice" : 2.68
}, {
	"type" : "P90",
	"name" : "Trigon",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 14.06,
	"avgPrice" : 15.56
}, {
	"type" : "P90",
	"name" : "Trigon",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.75,
	"avgPrice" : 7.61
}, {
	"type" : "P90",
	"name" : "Trigon",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 7.86,
	"avgPrice" : 8.27
}, {
	"type" : "P90",
	"name" : "Trigon",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 7.89,
	"avgPrice" : 6.03
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Factory New",
	"marketPrice" : 8.63,
	"avgPrice" : 8.76
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.12,
	"avgPrice" : 1.28
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Field-Tested",
	"marketPrice" : 0.57,
	"avgPrice" : 0.57
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Well-Worn",
	"marketPrice" : 0.99,
	"avgPrice" : 0.84
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.66,
	"avgPrice" : 0.65
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 46.07,
	"avgPrice" : 35.86
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.38,
	"avgPrice" : 4.71
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.89,
	"avgPrice" : 1.83
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.27,
	"avgPrice" : 2.08
}, {
	"type" : "P90",
	"name" : "Virus",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.55,
	"avgPrice" : 1.52
}, {
	"name" : "Pallet of Presents",
	"marketPrice" : 13.19,
	"avgPrice" : 11.49
}, {
	"name" : "Pinups Capsule",
	"marketPrice" : 1.21,
	"avgPrice" : 1.21
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Factory New",
	"marketPrice" : 1.34,
	"avgPrice" : 1.32
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.78,
	"avgPrice" : 0.79
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Field-Tested",
	"marketPrice" : 0.63,
	"avgPrice" : 0.64
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Well-Worn",
	"marketPrice" : 1.08,
	"avgPrice" : 0.89
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.49,
	"avgPrice" : 1.49
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.60,
	"avgPrice" : 5.60
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4.46,
	"avgPrice" : 3.31
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.25,
	"avgPrice" : 2.24
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 3.27,
	"avgPrice" : 2.80
}, {
	"type" : "PP-Bizon",
	"name" : "Antique",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.08,
	"avgPrice" : 2.88
}, {
	"type" : "PP-Bizon",
	"name" : "Bamboo Print",
	"quality" : "Factory New",
	"marketPrice" : 0.26,
	"avgPrice" : 0.27
}, {
	"type" : "PP-Bizon",
	"name" : "Bamboo Print",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.13,
	"avgPrice" : 0.14
}, {
	"type" : "PP-Bizon",
	"name" : "Bamboo Print",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Tec-9",
	"name" : "Army Mesh",
	"quality" : "Factory New",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Tec-9",
	"name" : "Army Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Army Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Army Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Army Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Army Mesh",
	"quality" : "Factory New",
	"marketPrice" : 6.30,
	"avgPrice" : 6.46
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Army Mesh",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.43,
	"avgPrice" : 2.15
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Army Mesh",
	"quality" : "Field-Tested",
	"marketPrice" : 1.69,
	"avgPrice" : 1.69
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Army Mesh",
	"quality" : "Well-Worn",
	"marketPrice" : 7.09,
	"avgPrice" : 3.30
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.08,
	"avgPrice" : 2.41
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.36,
	"avgPrice" : 0.33
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.23,
	"avgPrice" : 0.24
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.30,
	"avgPrice" : 0.26
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.24
}, {
	"type" : "UMP-45",
	"name" : "Delusion",
	"quality" : "Factory New",
	"marketPrice" : 1.79,
	"avgPrice" : 1.80
}, {
	"type" : "UMP-45",
	"name" : "Delusion",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.24,
	"avgPrice" : 0.22
}, {
	"type" : "UMP-45",
	"name" : "Delusion",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.17
}, {
	"type" : "UMP-45",
	"name" : "Delusion",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 7.89,
	"avgPrice" : 8.12
}, {
	"type" : "UMP-45",
	"name" : "Delusion",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.93,
	"avgPrice" : 0.90
}, {
	"type" : "UMP-45",
	"name" : "Delusion",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.55,
	"avgPrice" : 0.57
}, {
	"type" : "UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Factory New",
	"marketPrice" : 42.94,
	"avgPrice" : 44.28
}, {
	"type" : "UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.92,
	"avgPrice" : 4.70
}, {
	"type" : "UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Field-Tested",
	"marketPrice" : 1.65,
	"avgPrice" : 1.65
}, {
	"type" : "UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Well-Worn",
	"marketPrice" : 2.07,
	"avgPrice" : 1.71
}, {
	"type" : "UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.32,
	"avgPrice" : 1.24
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Minimal Wear",
	"marketPrice" : 10.35,
	"avgPrice" : 13.41
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Field-Tested",
	"marketPrice" : 4.78,
	"avgPrice" : 5.16
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Well-Worn",
	"marketPrice" : 4.51,
	"avgPrice" : 5.27
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Fallout Warning",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.30,
	"avgPrice" : 4.31
}, {
	"type" : "UMP-45",
	"name" : "Grand Prix",
	"quality" : "Field-Tested",
	"marketPrice" : 0.29,
	"avgPrice" : 0.29
}, {
	"type" : "UMP-45",
	"name" : "Grand Prix",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.75,
	"avgPrice" : 0.72
}, {
	"type" : "UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Factory New",
	"marketPrice" : 1.40,
	"avgPrice" : 1.25
}, {
	"type" : "UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.08,
	"avgPrice" : 0.08
}, {
	"type" : "UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.06
}, {
	"type" : "UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Minimal Wear",
	"marketPrice" : 20.78,
	"avgPrice" : 10.97
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Field-Tested",
	"marketPrice" : 5.64,
	"avgPrice" : 7.20
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Well-Worn",
	"marketPrice" : 34.50,
	"avgPrice" : 37.27
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Gunsmoke",
	"quality" : "Battle-Scarred",
	"marketPrice" : 11.80,
	"avgPrice" : 5.87
}, {
	"type" : "UMP-45",
	"name" : "Indigo",
	"quality" : "Factory New",
	"marketPrice" : 1.67,
	"avgPrice" : 1.49
}, {
	"type" : "UMP-45",
	"name" : "Indigo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.09,
	"avgPrice" : 0.10
}, {
	"type" : "UMP-45",
	"name" : "Indigo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "UMP-45",
	"name" : "Indigo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "UMP-45",
	"name" : "Indigo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Indigo",
	"quality" : "Factory New",
	"marketPrice" : 17.66,
	"avgPrice" : 17.35
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Indigo",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.87,
	"avgPrice" : 2.70
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Indigo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.78,
	"avgPrice" : 0.70
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Indigo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.92,
	"avgPrice" : 0.99
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Indigo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.47,
	"avgPrice" : 0.43
}, {
	"type" : "UMP-45",
	"name" : "Labyrinth",
	"quality" : "Factory New",
	"marketPrice" : 0.13,
	"avgPrice" : 0.13
}, {
	"type" : "UMP-45",
	"name" : "Labyrinth",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "UMP-45",
	"name" : "Labyrinth",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "UMP-45",
	"name" : "Labyrinth",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.11
}, {
	"type" : "UMP-45",
	"name" : "Labyrinth",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.53,
	"avgPrice" : 0.49
}, {
	"type" : "UMP-45",
	"name" : "Labyrinth",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.29,
	"avgPrice" : 0.28
}, {
	"type" : "UMP-45",
	"name" : "Labyrinth",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.27,
	"avgPrice" : 0.24
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Army Mesh",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.23,
	"avgPrice" : 3.60
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Factory New",
	"marketPrice" : 7.28,
	"avgPrice" : 6.68
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.01,
	"avgPrice" : 3.06
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Field-Tested",
	"marketPrice" : 1.33,
	"avgPrice" : 1.36
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Well-Worn",
	"marketPrice" : 1.01,
	"avgPrice" : 1.04
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.80,
	"avgPrice" : 0.77
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 35.11,
	"avgPrice" : 35.41
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 16.10,
	"avgPrice" : 15.92
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 8.23,
	"avgPrice" : 8.11
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 5.80,
	"avgPrice" : 5.82
}, {
	"type" : "Tec-9",
	"name" : "Avalanche",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 3.94,
	"avgPrice" : 4.37
}, {
	"type" : "Tec-9",
	"name" : "Bamboo Forest",
	"quality" : "Factory New",
	"marketPrice" : 0.46,
	"avgPrice" : 0.44
}, {
	"type" : "Tec-9",
	"name" : "Bamboo Forest",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.18,
	"avgPrice" : 0.19
}, {
	"type" : "Tec-9",
	"name" : "Bamboo Forest",
	"quality" : "Field-Tested",
	"marketPrice" : 0.09,
	"avgPrice" : 0.08
}, {
	"type" : "Tec-9",
	"name" : "Bamboo Forest",
	"quality" : "Well-Worn",
	"marketPrice" : 0.19,
	"avgPrice" : 0.17
}, {
	"type" : "Tec-9",
	"name" : "Bamboo Forest",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.07,
	"avgPrice" : 0.07
}, {
	"type" : "Tec-9",
	"name" : "Blue Titanium",
	"quality" : "Factory New",
	"marketPrice" : 1.21,
	"avgPrice" : 1.32
}, {
	"type" : "Tec-9",
	"name" : "Blue Titanium",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 3.87,
	"avgPrice" : 4.06
}, {
	"type" : "Tec-9",
	"name" : "Brass",
	"quality" : "Factory New",
	"marketPrice" : 15.95,
	"avgPrice" : 12.86
}, {
	"type" : "Tec-9",
	"name" : "Brass",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.87,
	"avgPrice" : 1.46
}, {
	"type" : "Tec-9",
	"name" : "Brass",
	"quality" : "Field-Tested",
	"marketPrice" : 0.55,
	"avgPrice" : 0.50
}, {
	"type" : "Tec-9",
	"name" : "Brass",
	"quality" : "Well-Worn",
	"marketPrice" : 0.71,
	"avgPrice" : 0.62
}, {
	"type" : "Tec-9",
	"name" : "Brass",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.50,
	"avgPrice" : 0.53
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Brass",
	"quality" : "Factory New",
	"marketPrice" : 51.61,
	"avgPrice" : 40.90
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Brass",
	"quality" : "Minimal Wear",
	"marketPrice" : 15.38,
	"avgPrice" : 14.17
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Brass",
	"quality" : "Field-Tested",
	"marketPrice" : 5.94,
	"avgPrice" : 6.51
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Brass",
	"quality" : "Well-Worn",
	"marketPrice" : 5.48,
	"avgPrice" : 5.35
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Brass",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.32,
	"avgPrice" : 4.75
}, {
	"type" : "Tec-9",
	"name" : "Groundwater",
	"quality" : "Factory New",
	"marketPrice" : 0.20,
	"avgPrice" : 0.25
}, {
	"type" : "Tec-9",
	"name" : "Groundwater",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Groundwater",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Groundwater",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Groundwater",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Groundwater",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 76.77
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Groundwater",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.51,
	"avgPrice" : 8.76
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Groundwater",
	"quality" : "Field-Tested",
	"marketPrice" : 1.41,
	"avgPrice" : 1.60
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Groundwater",
	"quality" : "Well-Worn",
	"marketPrice" : 3.37,
	"avgPrice" : 2.96
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Groundwater",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.24,
	"avgPrice" : 1.53
}, {
	"type" : "Tec-9",
	"name" : "Hades",
	"quality" : "Factory New",
	"marketPrice" : 1.17,
	"avgPrice" : 1.15
}, {
	"type" : "Tec-9",
	"name" : "Hades",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.86,
	"avgPrice" : 0.74
}, {
	"type" : "Tec-9",
	"name" : "Hades",
	"quality" : "Field-Tested",
	"marketPrice" : 0.80,
	"avgPrice" : 0.68
}, {
	"type" : "Tec-9",
	"name" : "Hades",
	"quality" : "Well-Worn",
	"marketPrice" : 0.87,
	"avgPrice" : 0.66
}, {
	"type" : "Tec-9",
	"name" : "Hades",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.75,
	"avgPrice" : 0.69
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Factory New",
	"marketPrice" : 3.12,
	"avgPrice" : 3.00
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.78,
	"avgPrice" : 0.74
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Field-Tested",
	"marketPrice" : 0.38,
	"avgPrice" : 0.40
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Well-Worn",
	"marketPrice" : 0.31,
	"avgPrice" : 0.32
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.26,
	"avgPrice" : 0.27
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 12.58,
	"avgPrice" : 13.22
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.79,
	"avgPrice" : 3.08
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.67,
	"avgPrice" : 1.56
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.06,
	"avgPrice" : 1.10
}, {
	"type" : "Tec-9",
	"name" : "Isaac",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.93,
	"avgPrice" : 0.89
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Factory New",
	"marketPrice" : 0.57,
	"avgPrice" : 0.53
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.52,
	"avgPrice" : 4.68
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.24,
	"avgPrice" : 1.21
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.63,
	"avgPrice" : 0.66
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.51,
	"avgPrice" : 0.53
}, {
	"type" : "Tec-9",
	"name" : "Jambiya",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.47,
	"avgPrice" : 0.47
}, {
	"type" : "Tec-9",
	"name" : "Nuclear Threat",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 325.92
}, {
	"type" : "Tec-9",
	"name" : "Nuclear Threat",
	"quality" : "Minimal Wear",
	"marketPrice" : 55.05,
	"avgPrice" : 56.39
}, {
	"type" : "Tec-9",
	"name" : "Nuclear Threat",
	"quality" : "Field-Tested",
	"marketPrice" : 21.78,
	"avgPrice" : 20.65
}, {
	"type" : "Tec-9",
	"name" : "Nuclear Threat",
	"quality" : "Well-Worn",
	"marketPrice" : 17.98,
	"avgPrice" : 18.10
}, {
	"type" : "Tec-9",
	"name" : "Nuclear Threat",
	"quality" : "Battle-Scarred",
	"marketPrice" : 13.96,
	"avgPrice" : 10.79
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Nuclear Threat",
	"quality" : "Minimal Wear",
	"marketPrice" : 0,
	"avgPrice" : 247.73
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Nuclear Threat",
	"quality" : "Field-Tested",
	"marketPrice" : 109.64,
	"avgPrice" : 78.67
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Nuclear Threat",
	"quality" : "Well-Worn",
	"marketPrice" : 0,
	"avgPrice" : 59.65
}, {
	"type" : "Tec-9",
	"name" : "Ossified",
	"quality" : "Factory New",
	"marketPrice" : 0.84,
	"avgPrice" : 0.84
}, {
	"type" : "Tec-9",
	"name" : "Ossified",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.25,
	"avgPrice" : 2.60
}, {
	"type" : "Tec-9",
	"name" : "Red Quartz",
	"quality" : "Factory New",
	"marketPrice" : 0.47,
	"avgPrice" : 0.49
}, {
	"type" : "Tec-9",
	"name" : "Red Quartz",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.31,
	"avgPrice" : 0.33
}, {
	"type" : "Tec-9",
	"name" : "Red Quartz",
	"quality" : "Field-Tested",
	"marketPrice" : 0.28,
	"avgPrice" : 0.29
}, {
	"type" : "Tec-9",
	"name" : "Red Quartz",
	"quality" : "Well-Worn",
	"marketPrice" : 0.53,
	"avgPrice" : 0.51
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Red Quartz",
	"quality" : "Factory New",
	"marketPrice" : 49.16,
	"avgPrice" : 32.48
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Red Quartz",
	"quality" : "Minimal Wear",
	"marketPrice" : 18.98,
	"avgPrice" : 16.69
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Red Quartz",
	"quality" : "Field-Tested",
	"marketPrice" : 13.94,
	"avgPrice" : 12.19
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Red Quartz",
	"quality" : "Well-Worn",
	"marketPrice" : 51.11,
	"avgPrice" : 45.02
}, {
	"type" : "Tec-9",
	"name" : "Sandstorm",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.29,
	"avgPrice" : 0.30
}, {
	"type" : "Tec-9",
	"name" : "Sandstorm",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Tec-9",
	"name" : "Sandstorm",
	"quality" : "Well-Worn",
	"marketPrice" : 0.17,
	"avgPrice" : 0.16
}, {
	"type" : "Tec-9",
	"name" : "Sandstorm",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "Tec-9",
	"name" : "Sandstorm",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.61,
	"avgPrice" : 1.56
}, {
	"type" : "Tec-9",
	"name" : "Sandstorm",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "Tec-9",
	"name" : "Sandstorm",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.73,
	"avgPrice" : 0.66
}, {
	"type" : "Tec-9",
	"name" : "Sandstorm",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.31,
	"avgPrice" : 0.31
}, {
	"type" : "Tec-9",
	"name" : "Terrace",
	"quality" : "Factory New",
	"marketPrice" : 10.12,
	"avgPrice" : 10.23
}, {
	"type" : "Tec-9",
	"name" : "Terrace",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.11,
	"avgPrice" : 2.85
}, {
	"type" : "Tec-9",
	"name" : "Terrace",
	"quality" : "Field-Tested",
	"marketPrice" : 2.69,
	"avgPrice" : 2.34
}, {
	"type" : "Tec-9",
	"name" : "Terrace",
	"quality" : "Well-Worn",
	"marketPrice" : 2.13,
	"avgPrice" : 1.85
}, {
	"type" : "Tec-9",
	"name" : "Terrace",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.73,
	"avgPrice" : 1.68
}, {
	"type" : "Tec-9",
	"name" : "Titanium Bit",
	"quality" : "Factory New",
	"marketPrice" : 1.04,
	"avgPrice" : 1.04
}, {
	"type" : "Tec-9",
	"name" : "Titanium Bit",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.06,
	"avgPrice" : 1.04
}, {
	"type" : "Tec-9",
	"name" : "Titanium Bit",
	"quality" : "Field-Tested",
	"marketPrice" : 1.21,
	"avgPrice" : 1.22
}, {
	"type" : "Tec-9",
	"name" : "Titanium Bit",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 7.75,
	"avgPrice" : 7.27
}, {
	"type" : "Tec-9",
	"name" : "Titanium Bit",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 6.07,
	"avgPrice" : 5.49
}, {
	"type" : "Tec-9",
	"name" : "Titanium Bit",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 6.36,
	"avgPrice" : 5.64
}, {
	"type" : "USP-S",
	"name" : "Caiman",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 25.90,
	"avgPrice" : 25.26
}, {
	"type" : "USP-S",
	"name" : "Caiman",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 17.41,
	"avgPrice" : 16.72
}, {
	"type" : "USP-S",
	"name" : "Caiman",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 10.50,
	"avgPrice" : 10.86
}, {
	"type" : "USP-S",
	"name" : "Caiman",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 13.99,
	"avgPrice" : 13.53
}, {
	"type" : "USP-S",
	"name" : "Dark Water",
	"quality" : "Minimal Wear",
	"marketPrice" : 7.59,
	"avgPrice" : 7.26
}, {
	"type" : "USP-S",
	"name" : "Dark Water",
	"quality" : "Field-Tested",
	"marketPrice" : 7.08,
	"avgPrice" : 6.35
}, {
	"type" : "USP-S",
	"name" : "Dark Water",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 23.30,
	"avgPrice" : 21.56
}, {
	"type" : "USP-S",
	"name" : "Dark Water",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 19.87,
	"avgPrice" : 17.31
}, {
	"type" : "USP-S",
	"name" : "Forest Leaves",
	"quality" : "Factory New",
	"marketPrice" : 0.71,
	"avgPrice" : 0.78
}, {
	"type" : "USP-S",
	"name" : "Forest Leaves",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.12,
	"avgPrice" : 0.11
}, {
	"type" : "USP-S",
	"name" : "Forest Leaves",
	"quality" : "Field-Tested",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "USP-S",
	"name" : "Forest Leaves",
	"quality" : "Well-Worn",
	"marketPrice" : 0.08,
	"avgPrice" : 0.06
}, {
	"type" : "USP-S",
	"name" : "Forest Leaves",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.08,
	"avgPrice" : 0.07
}, {
	"type" : "Souvenir USP-S",
	"name" : "Forest Leaves",
	"quality" : "Minimal Wear",
	"marketPrice" : 22.36,
	"avgPrice" : 17.06
}, {
	"type" : "Souvenir USP-S",
	"name" : "Forest Leaves",
	"quality" : "Field-Tested",
	"marketPrice" : 9.06,
	"avgPrice" : 7.26
}, {
	"type" : "Souvenir USP-S",
	"name" : "Forest Leaves",
	"quality" : "Well-Worn",
	"marketPrice" : 15.06,
	"avgPrice" : 10.40
}, {
	"type" : "Souvenir USP-S",
	"name" : "Forest Leaves",
	"quality" : "Battle-Scarred",
	"marketPrice" : 13.62,
	"avgPrice" : 20.40
}, {
	"type" : "USP-S",
	"name" : "Guardian",
	"quality" : "Factory New",
	"marketPrice" : 1.08,
	"avgPrice" : 1.04
}, {
	"type" : "USP-S",
	"name" : "Guardian",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.75,
	"avgPrice" : 0.76
}, {
	"type" : "USP-S",
	"name" : "Guardian",
	"quality" : "Field-Tested",
	"marketPrice" : 0.57,
	"avgPrice" : 0.57
}, {
	"type" : "USP-S",
	"name" : "Guardian",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5.07,
	"avgPrice" : 5.32
}, {
	"type" : "USP-S",
	"name" : "Guardian",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.84,
	"avgPrice" : 3.77
}, {
	"type" : "USP-S",
	"name" : "Guardian",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.54,
	"avgPrice" : 2.46
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Factory New",
	"marketPrice" : 59.91,
	"avgPrice" : 59.71
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Minimal Wear",
	"marketPrice" : 31.46,
	"avgPrice" : 34.52
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Field-Tested",
	"marketPrice" : 24.54,
	"avgPrice" : 24.72
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Well-Worn",
	"marketPrice" : 21.57,
	"avgPrice" : 21.00
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Battle-Scarred",
	"marketPrice" : 20.03,
	"avgPrice" : 19.78
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 269.62,
	"avgPrice" : 259.27
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 141.91,
	"avgPrice" : 138.25
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 89.50,
	"avgPrice" : 87.76
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 70.84,
	"avgPrice" : 70.36
}, {
	"type" : "USP-S",
	"name" : "Kill Confirmed",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 64.60,
	"avgPrice" : 65.14
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Factory New",
	"marketPrice" : 1.07,
	"avgPrice" : 1.08
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.28,
	"avgPrice" : 0.29
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Field-Tested",
	"marketPrice" : 0.16,
	"avgPrice" : 0.16
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Well-Worn",
	"marketPrice" : 0.14,
	"avgPrice" : 0.13
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.13,
	"avgPrice" : 0.12
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 7.15,
	"avgPrice" : 7.01
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.39,
	"avgPrice" : 2.24
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.49,
	"avgPrice" : 1.46
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.24,
	"avgPrice" : 1.26
}, {
	"type" : "USP-S",
	"name" : "Lead Conduit",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.29,
	"avgPrice" : 1.24
}, {
	"type" : "USP-S",
	"name" : "Night Ops",
	"quality" : "Factory New",
	"marketPrice" : 0.35,
	"avgPrice" : 0.36
}, {
	"type" : "USP-S",
	"name" : "Night Ops",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.18,
	"avgPrice" : 0.18
}, {
	"type" : "USP-S",
	"name" : "Night Ops",
	"quality" : "Field-Tested",
	"marketPrice" : 0.12,
	"avgPrice" : 0.12
}, {
	"type" : "USP-S",
	"name" : "Night Ops",
	"quality" : "Well-Worn",
	"marketPrice" : 0.21,
	"avgPrice" : 0.20
}, {
	"type" : "USP-S",
	"name" : "Night Ops",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.15,
	"avgPrice" : 0.15
}, {
	"type" : "Souvenir USP-S",
	"name" : "Night Ops",
	"quality" : "Minimal Wear",
	"marketPrice" : 62.21,
	"avgPrice" : 22.58
}, {
	"type" : "Souvenir USP-S",
	"name" : "Night Ops",
	"quality" : "Field-Tested",
	"marketPrice" : 33.25,
	"avgPrice" : 27.58
}, {
	"type" : "Tec-9",
	"name" : "Tornado",
	"quality" : "Factory New",
	"marketPrice" : 5.03,
	"avgPrice" : 5.52
}, {
	"type" : "Tec-9",
	"name" : "Tornado",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.78,
	"avgPrice" : 0.83
}, {
	"type" : "Tec-9",
	"name" : "Tornado",
	"quality" : "Field-Tested",
	"marketPrice" : 0.60,
	"avgPrice" : 0.65
}, {
	"type" : "Tec-9",
	"name" : "Tornado",
	"quality" : "Well-Worn",
	"marketPrice" : 0.87,
	"avgPrice" : 0.84
}, {
	"type" : "Tec-9",
	"name" : "Tornado",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.99,
	"avgPrice" : 1.00
}, {
	"type" : "Tec-9",
	"name" : "Toxic",
	"quality" : "Factory New",
	"marketPrice" : 5.72,
	"avgPrice" : 6.07
}, {
	"type" : "Tec-9",
	"name" : "Toxic",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.77,
	"avgPrice" : 3.93
}, {
	"type" : "Tec-9",
	"name" : "Toxic",
	"quality" : "Field-Tested",
	"marketPrice" : 1.62,
	"avgPrice" : 1.80
}, {
	"type" : "Tec-9",
	"name" : "Toxic",
	"quality" : "Well-Worn",
	"marketPrice" : 2.42,
	"avgPrice" : 2.34
}, {
	"type" : "Tec-9",
	"name" : "Toxic",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.01,
	"avgPrice" : 1.07
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Toxic",
	"quality" : "Factory New",
	"marketPrice" : 44.10,
	"avgPrice" : 44.84
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Toxic",
	"quality" : "Minimal Wear",
	"marketPrice" : 16.30,
	"avgPrice" : 16.42
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Toxic",
	"quality" : "Field-Tested",
	"marketPrice" : 7.43,
	"avgPrice" : 7.69
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Toxic",
	"quality" : "Well-Worn",
	"marketPrice" : 12.37,
	"avgPrice" : 10.17
}, {
	"type" : "Souvenir Tec-9",
	"name" : "Toxic",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.74,
	"avgPrice" : 6.28
}, {
	"type" : "Tec-9",
	"name" : "Urban DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0.25,
	"avgPrice" : 0.27
}, {
	"type" : "Tec-9",
	"name" : "Urban DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Urban DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Urban DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "Urban DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Tec-9",
	"name" : "VariCamo",
	"quality" : "Factory New",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "Tec-9",
	"name" : "VariCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "Tec-9",
	"name" : "VariCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Tec-9",
	"name" : "VariCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "Tec-9",
	"name" : "VariCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir Tec-9",
	"name" : "VariCamo",
	"quality" : "Factory New",
	"marketPrice" : 5.17,
	"avgPrice" : 4.24
}, {
	"type" : "Souvenir Tec-9",
	"name" : "VariCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.70,
	"avgPrice" : 2.57
}, {
	"type" : "Souvenir Tec-9",
	"name" : "VariCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 1.54,
	"avgPrice" : 1.69
}, {
	"type" : "Souvenir Tec-9",
	"name" : "VariCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 2.59,
	"avgPrice" : 2.23
}, {
	"type" : "Souvenir Tec-9",
	"name" : "VariCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.99,
	"avgPrice" : 1.93
}, {
	"type" : "UMP-45",
	"name" : "Blaze",
	"quality" : "Factory New",
	"marketPrice" : 11.39,
	"avgPrice" : 10.78
}, {
	"type" : "UMP-45",
	"name" : "Blaze",
	"quality" : "Minimal Wear",
	"marketPrice" : 15.92,
	"avgPrice" : 17.47
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Blaze",
	"quality" : "Factory New",
	"marketPrice" : 38.22,
	"avgPrice" : 33.29
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Blaze",
	"quality" : "Minimal Wear",
	"marketPrice" : 39.15,
	"avgPrice" : 35.91
}, {
	"type" : "UMP-45",
	"name" : "Bone Pile",
	"quality" : "Factory New",
	"marketPrice" : 4.53,
	"avgPrice" : 4.31
}, {
	"type" : "UMP-45",
	"name" : "Bone Pile",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.88,
	"avgPrice" : 0.89
}, {
	"type" : "UMP-45",
	"name" : "Bone Pile",
	"quality" : "Field-Tested",
	"marketPrice" : 0.72,
	"avgPrice" : 0.69
}, {
	"type" : "UMP-45",
	"name" : "Bone Pile",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 21.92,
	"avgPrice" : 23.48
}, {
	"type" : "UMP-45",
	"name" : "Bone Pile",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.00,
	"avgPrice" : 2.96
}, {
	"type" : "UMP-45",
	"name" : "Bone Pile",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.87,
	"avgPrice" : 1.76
}, {
	"type" : "UMP-45",
	"name" : "Caramel",
	"quality" : "Factory New",
	"marketPrice" : 12.37,
	"avgPrice" : 14.40
}, {
	"type" : "UMP-45",
	"name" : "Caramel",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.65,
	"avgPrice" : 2.81
}, {
	"type" : "UMP-45",
	"name" : "Caramel",
	"quality" : "Field-Tested",
	"marketPrice" : 1.04,
	"avgPrice" : 1.26
}, {
	"type" : "UMP-45",
	"name" : "Caramel",
	"quality" : "Well-Worn",
	"marketPrice" : 1.29,
	"avgPrice" : 1.32
}, {
	"type" : "UMP-45",
	"name" : "Caramel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.44,
	"avgPrice" : 1.42
}, {
	"type" : "UMP-45",
	"name" : "Carbon Fiber",
	"quality" : "Factory New",
	"marketPrice" : 0.07,
	"avgPrice" : 0.06
}, {
	"type" : "UMP-45",
	"name" : "Carbon Fiber",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.08,
	"avgPrice" : 0.06
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Factory New",
	"marketPrice" : 0.53,
	"avgPrice" : 0.44
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.10,
	"avgPrice" : 0.10
}, {
	"type" : "UMP-45",
	"name" : "Corporal",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "USP-S",
	"name" : "Serum",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 24.38,
	"avgPrice" : 22.86
}, {
	"type" : "USP-S",
	"name" : "Serum",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 21.52,
	"avgPrice" : 19.40
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Factory New",
	"marketPrice" : 5.56,
	"avgPrice" : 5.28
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.07,
	"avgPrice" : 1.95
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Field-Tested",
	"marketPrice" : 1.09,
	"avgPrice" : 1.10
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Well-Worn",
	"marketPrice" : 2.02,
	"avgPrice" : 1.94
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.08,
	"avgPrice" : 1.05
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 36.80,
	"avgPrice" : 28.56
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 11.34,
	"avgPrice" : 10.02
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 6.33,
	"avgPrice" : 5.59
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 10.08,
	"avgPrice" : 7.97
}, {
	"type" : "USP-S",
	"name" : "Stainless",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 5.61,
	"avgPrice" : 4.98
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Factory New",
	"marketPrice" : 0.50,
	"avgPrice" : 0.51
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.34,
	"avgPrice" : 0.33
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.19
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Well-Worn",
	"marketPrice" : 0.24,
	"avgPrice" : 0.27
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.26,
	"avgPrice" : 0.29
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 2.93,
	"avgPrice" : 2.90
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 2.10,
	"avgPrice" : 1.95
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.28,
	"avgPrice" : 1.23
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1.51,
	"avgPrice" : 1.56
}, {
	"type" : "USP-S",
	"name" : "Torque",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1.53,
	"avgPrice" : 1.55
}, {
	"type" : "XM1014",
	"name" : "Blaze Orange",
	"quality" : "Factory New",
	"marketPrice" : 179.77,
	"avgPrice" : 76.39
}, {
	"type" : "XM1014",
	"name" : "Blaze Orange",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.16,
	"avgPrice" : 8.31
}, {
	"type" : "XM1014",
	"name" : "Blaze Orange",
	"quality" : "Field-Tested",
	"marketPrice" : 2.25,
	"avgPrice" : 2.15
}, {
	"type" : "XM1014",
	"name" : "Blaze Orange",
	"quality" : "Well-Worn",
	"marketPrice" : 3.36,
	"avgPrice" : 8.19
}, {
	"type" : "XM1014",
	"name" : "Blaze Orange",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.41,
	"avgPrice" : 3.35
}, {
	"type" : "XM1014",
	"name" : "Blue Spruce",
	"quality" : "Factory New",
	"marketPrice" : 0.17,
	"avgPrice" : 0.17
}, {
	"type" : "XM1014",
	"name" : "Blue Spruce",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "XM1014",
	"name" : "Blue Spruce",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "XM1014",
	"name" : "Blue Spruce",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "XM1014",
	"name" : "Blue Spruce",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Spruce",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.82,
	"avgPrice" : 3.13
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Spruce",
	"quality" : "Field-Tested",
	"marketPrice" : 1.95,
	"avgPrice" : 1.48
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Spruce",
	"quality" : "Well-Worn",
	"marketPrice" : 2.70,
	"avgPrice" : 1.39
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Spruce",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.45,
	"avgPrice" : 1.76
}, {
	"type" : "XM1014",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 0.18,
	"avgPrice" : 0.17
}, {
	"type" : "XM1014",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.05
}, {
	"type" : "XM1014",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "XM1014",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "XM1014",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Steel",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 87.98
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Steel",
	"quality" : "Minimal Wear",
	"marketPrice" : 20.24,
	"avgPrice" : 11.56
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Steel",
	"quality" : "Field-Tested",
	"marketPrice" : 7.05,
	"avgPrice" : 4.42
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Steel",
	"quality" : "Well-Worn",
	"marketPrice" : 5.56,
	"avgPrice" : 4.42
}, {
	"type" : "Souvenir XM1014",
	"name" : "Blue Steel",
	"quality" : "Battle-Scarred",
	"marketPrice" : 12.37,
	"avgPrice" : 5.93
}, {
	"type" : "XM1014",
	"name" : "Bone Machine",
	"quality" : "Factory New",
	"marketPrice" : 1.61,
	"avgPrice" : 1.53
}, {
	"type" : "XM1014",
	"name" : "Bone Machine",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.11,
	"avgPrice" : 1.03
}, {
	"type" : "Souvenir USP-S",
	"name" : "Night Ops",
	"quality" : "Well-Worn",
	"marketPrice" : 125.26,
	"avgPrice" : 22.08
}, {
	"type" : "Souvenir USP-S",
	"name" : "Night Ops",
	"quality" : "Battle-Scarred",
	"marketPrice" : 39.33,
	"avgPrice" : 24.05
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Factory New",
	"marketPrice" : 12.67,
	"avgPrice" : 12.95
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.88,
	"avgPrice" : 9.09
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Field-Tested",
	"marketPrice" : 8.65,
	"avgPrice" : 8.68
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Well-Worn",
	"marketPrice" : 11.63,
	"avgPrice" : 12.00
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Battle-Scarred",
	"marketPrice" : 28.77,
	"avgPrice" : 23.75
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 78.95,
	"avgPrice" : 79.87
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 49.00,
	"avgPrice" : 48.55
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 45.90,
	"avgPrice" : 40.77
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 63.96,
	"avgPrice" : 46.10
}, {
	"type" : "USP-S",
	"name" : "Orion",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 175.00,
	"avgPrice" : 79.35
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Factory New",
	"marketPrice" : 40.99,
	"avgPrice" : 40.44
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.27,
	"avgPrice" : 7.03
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Field-Tested",
	"marketPrice" : 4.27,
	"avgPrice" : 4.31
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Well-Worn",
	"marketPrice" : 5.03,
	"avgPrice" : 4.73
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.52,
	"avgPrice" : 4.24
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0,
	"avgPrice" : 303.64
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 37.08,
	"avgPrice" : 33.58
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 13.48,
	"avgPrice" : 14.03
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 15.66,
	"avgPrice" : 13.82
}, {
	"type" : "USP-S",
	"name" : "Overgrowth",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 13.60,
	"avgPrice" : 12.92
}, {
	"type" : "USP-S",
	"name" : "Para Green",
	"quality" : "Factory New",
	"marketPrice" : 2.32,
	"avgPrice" : 1.86
}, {
	"type" : "USP-S",
	"name" : "Para Green",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.51,
	"avgPrice" : 0.47
}, {
	"type" : "USP-S",
	"name" : "Para Green",
	"quality" : "Field-Tested",
	"marketPrice" : 0.24,
	"avgPrice" : 0.23
}, {
	"type" : "USP-S",
	"name" : "Para Green",
	"quality" : "Well-Worn",
	"marketPrice" : 0.58,
	"avgPrice" : 0.57
}, {
	"type" : "USP-S",
	"name" : "Para Green",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.21,
	"avgPrice" : 0.21
}, {
	"type" : "USP-S",
	"name" : "Road Rash",
	"quality" : "Factory New",
	"marketPrice" : 24.70,
	"avgPrice" : 23.88
}, {
	"type" : "USP-S",
	"name" : "Road Rash",
	"quality" : "Minimal Wear",
	"marketPrice" : 14.87,
	"avgPrice" : 13.62
}, {
	"type" : "USP-S",
	"name" : "Road Rash",
	"quality" : "Field-Tested",
	"marketPrice" : 10.13,
	"avgPrice" : 9.63
}, {
	"type" : "USP-S",
	"name" : "Road Rash",
	"quality" : "Well-Worn",
	"marketPrice" : 8.80,
	"avgPrice" : 8.51
}, {
	"type" : "USP-S",
	"name" : "Road Rash",
	"quality" : "Battle-Scarred",
	"marketPrice" : 8.28,
	"avgPrice" : 7.97
}, {
	"type" : "Souvenir USP-S",
	"name" : "Road Rash",
	"quality" : "Minimal Wear",
	"marketPrice" : 85.26,
	"avgPrice" : 71.77
}, {
	"type" : "Souvenir USP-S",
	"name" : "Road Rash",
	"quality" : "Field-Tested",
	"marketPrice" : 73.85,
	"avgPrice" : 83.90
}, {
	"type" : "Souvenir USP-S",
	"name" : "Road Rash",
	"quality" : "Well-Worn",
	"marketPrice" : 58.60,
	"avgPrice" : 53.43
}, {
	"type" : "Souvenir USP-S",
	"name" : "Road Rash",
	"quality" : "Battle-Scarred",
	"marketPrice" : 51.75,
	"avgPrice" : 56.44
}, {
	"type" : "USP-S",
	"name" : "Royal Blue",
	"quality" : "Factory New",
	"marketPrice" : 18.59,
	"avgPrice" : 18.24
}, {
	"type" : "USP-S",
	"name" : "Royal Blue",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.02,
	"avgPrice" : 2.05
}, {
	"type" : "USP-S",
	"name" : "Royal Blue",
	"quality" : "Field-Tested",
	"marketPrice" : 0.41,
	"avgPrice" : 0.42
}, {
	"type" : "USP-S",
	"name" : "Royal Blue",
	"quality" : "Well-Worn",
	"marketPrice" : 0.63,
	"avgPrice" : 0.65
}, {
	"type" : "USP-S",
	"name" : "Royal Blue",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.37,
	"avgPrice" : 0.33
}, {
	"type" : "Souvenir USP-S",
	"name" : "Royal Blue",
	"quality" : "Factory New",
	"marketPrice" : 0,
	"avgPrice" : 268.84
}, {
	"type" : "Souvenir USP-S",
	"name" : "Royal Blue",
	"quality" : "Minimal Wear",
	"marketPrice" : 18.29,
	"avgPrice" : 22.68
}, {
	"type" : "Souvenir USP-S",
	"name" : "Royal Blue",
	"quality" : "Field-Tested",
	"marketPrice" : 5.36,
	"avgPrice" : 5.60
}, {
	"type" : "Souvenir USP-S",
	"name" : "Royal Blue",
	"quality" : "Well-Worn",
	"marketPrice" : 5.80,
	"avgPrice" : 5.21
}, {
	"type" : "Souvenir USP-S",
	"name" : "Royal Blue",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.16,
	"avgPrice" : 3.65
}, {
	"type" : "USP-S",
	"name" : "Serum",
	"quality" : "Factory New",
	"marketPrice" : 8.21,
	"avgPrice" : 7.64
}, {
	"type" : "USP-S",
	"name" : "Serum",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.98,
	"avgPrice" : 6.33
}, {
	"type" : "USP-S",
	"name" : "Serum",
	"quality" : "Field-Tested",
	"marketPrice" : 7.75,
	"avgPrice" : 6.16
}, {
	"type" : "USP-S",
	"name" : "Serum",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 28.44,
	"avgPrice" : 28.96
}, {
	"type" : "UMP-45",
	"name" : "Labyrinth",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.42,
	"avgPrice" : 0.37
}, {
	"type" : "UMP-45",
	"name" : "Minotaur's Labyrinth",
	"quality" : "Factory New",
	"marketPrice" : 9.11,
	"avgPrice" : 8.35
}, {
	"type" : "UMP-45",
	"name" : "Minotaur's Labyrinth",
	"quality" : "Minimal Wear",
	"marketPrice" : 8.76,
	"avgPrice" : 7.54
}, {
	"type" : "UMP-45",
	"name" : "Minotaur's Labyrinth",
	"quality" : "Field-Tested",
	"marketPrice" : 8.70,
	"avgPrice" : 7.03
}, {
	"type" : "UMP-45",
	"name" : "Minotaur's Labyrinth",
	"quality" : "Well-Worn",
	"marketPrice" : 8.43,
	"avgPrice" : 8.50
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Factory New",
	"marketPrice" : 0.23,
	"avgPrice" : 0.21
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.12,
	"avgPrice" : 0.11
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Well-Worn",
	"marketPrice" : 0.12,
	"avgPrice" : 0.10
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.11,
	"avgPrice" : 0.09
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.85,
	"avgPrice" : 1.80
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.59,
	"avgPrice" : 0.57
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.24,
	"avgPrice" : 0.27
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.64,
	"avgPrice" : 0.65
}, {
	"type" : "UMP-45",
	"name" : "Riot",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.27,
	"avgPrice" : 0.25
}, {
	"type" : "UMP-45",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 0.54,
	"avgPrice" : 0.41
}, {
	"type" : "UMP-45",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "UMP-45",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 0.05,
	"avgPrice" : 0.03
}, {
	"type" : "UMP-45",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "UMP-45",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Scorched",
	"quality" : "Factory New",
	"marketPrice" : 11.75,
	"avgPrice" : 6.92
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Scorched",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.03,
	"avgPrice" : 1.20
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Scorched",
	"quality" : "Field-Tested",
	"marketPrice" : 0.42,
	"avgPrice" : 0.40
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Scorched",
	"quality" : "Well-Worn",
	"marketPrice" : 0.53,
	"avgPrice" : 0.51
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Scorched",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.42,
	"avgPrice" : 0.45
}, {
	"type" : "UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 0.19,
	"avgPrice" : 0.20
}, {
	"type" : "UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.04,
	"avgPrice" : 0.03
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Factory New",
	"marketPrice" : 11.23,
	"avgPrice" : 14.03
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.33,
	"avgPrice" : 2.53
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Field-Tested",
	"marketPrice" : 0.63,
	"avgPrice" : 0.62
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Well-Worn",
	"marketPrice" : 0.70,
	"avgPrice" : 0.64
}, {
	"type" : "Souvenir UMP-45",
	"name" : "Urban DDPAT",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.78,
	"avgPrice" : 0.63
}, {
	"type" : "USP-S",
	"name" : "Blood Tiger",
	"quality" : "Factory New",
	"marketPrice" : 0.84,
	"avgPrice" : 0.81
}, {
	"type" : "USP-S",
	"name" : "Blood Tiger",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.47,
	"avgPrice" : 0.44
}, {
	"type" : "USP-S",
	"name" : "Blood Tiger",
	"quality" : "Field-Tested",
	"marketPrice" : 0.43,
	"avgPrice" : 0.41
}, {
	"type" : "USP-S",
	"name" : "Blood Tiger",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 4.64,
	"avgPrice" : 4.71
}, {
	"type" : "USP-S",
	"name" : "Blood Tiger",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.97,
	"avgPrice" : 1.92
}, {
	"type" : "USP-S",
	"name" : "Blood Tiger",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1.67,
	"avgPrice" : 1.68
}, {
	"type" : "USP-S",
	"name" : "Business Class",
	"quality" : "Factory New",
	"marketPrice" : 21.80,
	"avgPrice" : 20.16
}, {
	"type" : "USP-S",
	"name" : "Business Class",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.72,
	"avgPrice" : 5.95
}, {
	"type" : "USP-S",
	"name" : "Business Class",
	"quality" : "Field-Tested",
	"marketPrice" : 3.03,
	"avgPrice" : 3.07
}, {
	"type" : "USP-S",
	"name" : "Business Class",
	"quality" : "Well-Worn",
	"marketPrice" : 3.14,
	"avgPrice" : 2.97
}, {
	"type" : "USP-S",
	"name" : "Business Class",
	"quality" : "Battle-Scarred",
	"marketPrice" : 4.16,
	"avgPrice" : 4.55
}, {
	"type" : "USP-S",
	"name" : "Caiman",
	"quality" : "Factory New",
	"marketPrice" : 7.27,
	"avgPrice" : 6.91
}, {
	"type" : "USP-S",
	"name" : "Caiman",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.92,
	"avgPrice" : 4.88
}, {
	"type" : "USP-S",
	"name" : "Caiman",
	"quality" : "Field-Tested",
	"marketPrice" : 4.00,
	"avgPrice" : 4.15
}, {
	"type" : "USP-S",
	"name" : "Caiman",
	"quality" : "Well-Worn",
	"marketPrice" : 4.87,
	"avgPrice" : 4.83
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Well-Worn",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.13,
	"avgPrice" : 0.11
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 0.58,
	"avgPrice" : 0.52
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.34,
	"avgPrice" : 0.30
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.25,
	"avgPrice" : 0.24
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.48,
	"avgPrice" : 0.41
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.36,
	"avgPrice" : 0.34
}, {
	"type" : "XM1014",
	"name" : "Red Leather",
	"quality" : "Factory New",
	"marketPrice" : 6.46,
	"avgPrice" : 6.04
}, {
	"type" : "XM1014",
	"name" : "Red Leather",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.77,
	"avgPrice" : 3.63
}, {
	"type" : "XM1014",
	"name" : "Red Leather",
	"quality" : "Field-Tested",
	"marketPrice" : 2.61,
	"avgPrice" : 2.44
}, {
	"type" : "XM1014",
	"name" : "Red Leather",
	"quality" : "Well-Worn",
	"marketPrice" : 4.00,
	"avgPrice" : 3.61
}, {
	"type" : "XM1014",
	"name" : "Red Leather",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.63,
	"avgPrice" : 5.83
}, {
	"type" : "XM1014",
	"name" : "Red Python",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.31,
	"avgPrice" : 0.32
}, {
	"type" : "XM1014",
	"name" : "Red Python",
	"quality" : "Field-Tested",
	"marketPrice" : 0.18,
	"avgPrice" : 0.17
}, {
	"type" : "XM1014",
	"name" : "Red Python",
	"quality" : "Well-Worn",
	"marketPrice" : 0.83,
	"avgPrice" : 0.70
}, {
	"type" : "XM1014",
	"name" : "Red Python",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.35,
	"avgPrice" : 0.34
}, {
	"type" : "XM1014",
	"name" : "Red Python",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 1.20,
	"avgPrice" : 1.19
}, {
	"type" : "XM1014",
	"name" : "Red Python",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.43,
	"avgPrice" : 0.43
}, {
	"type" : "XM1014",
	"name" : "Red Python",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.88,
	"avgPrice" : 0.70
}, {
	"type" : "XM1014",
	"name" : "Red Python",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.66,
	"avgPrice" : 0.61
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Factory New",
	"marketPrice" : 0.20,
	"avgPrice" : 0.21
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Field-Tested",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Well-Worn",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.10,
	"avgPrice" : 0.09
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 1.23,
	"avgPrice" : 1.11
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 0.32,
	"avgPrice" : 0.31
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 0.24,
	"avgPrice" : 0.24
}, {
	"type" : "XM1014",
	"name" : "Scumbria",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 0.26,
	"avgPrice" : 0.24
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Factory New",
	"marketPrice" : 1.80,
	"avgPrice" : 1.92
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Minimal Wear",
	"marketPrice" : 1.15,
	"avgPrice" : 1.13
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Field-Tested",
	"marketPrice" : 0.66,
	"avgPrice" : 0.64
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Well-Worn",
	"marketPrice" : 0.77,
	"avgPrice" : 0.74
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.55,
	"avgPrice" : 0.62
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 12.22,
	"avgPrice" : 8.85
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 7.75,
	"avgPrice" : 5.10
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.50,
	"avgPrice" : 2.33
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 2.82,
	"avgPrice" : 3.01
}, {
	"type" : "XM1014",
	"name" : "Teclu Burner",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.47,
	"avgPrice" : 2.36
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Factory New",
	"marketPrice" : 6.46,
	"avgPrice" : 6.25
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.99,
	"avgPrice" : 2.76
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Field-Tested",
	"marketPrice" : 2.10,
	"avgPrice" : 2.28
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Well-Worn",
	"marketPrice" : 4.83,
	"avgPrice" : 4.02
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.49,
	"avgPrice" : 3.23
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 31.46,
	"avgPrice" : 32.58
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 13.60,
	"avgPrice" : 13.32
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 7.56,
	"avgPrice" : 7.00
}, {
	"type" : "XM1014",
	"name" : "Tranquility",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 11.17,
	"avgPrice" : 8.36
}, {
	"type" : "XM1014",
	"name" : "Bone Machine",
	"quality" : "Field-Tested",
	"marketPrice" : 0.51,
	"avgPrice" : 0.50
}, {
	"type" : "XM1014",
	"name" : "Bone Machine",
	"quality" : "Well-Worn",
	"marketPrice" : 1.06,
	"avgPrice" : 1.05
}, {
	"type" : "XM1014",
	"name" : "Bone Machine",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.46,
	"avgPrice" : 0.41
}, {
	"type" : "Souvenir XM1014",
	"name" : "Bone Machine",
	"quality" : "Factory New",
	"marketPrice" : 10.96,
	"avgPrice" : 9.39
}, {
	"type" : "Souvenir XM1014",
	"name" : "Bone Machine",
	"quality" : "Minimal Wear",
	"marketPrice" : 4.25,
	"avgPrice" : 4.58
}, {
	"type" : "Souvenir XM1014",
	"name" : "Bone Machine",
	"quality" : "Field-Tested",
	"marketPrice" : 2.22,
	"avgPrice" : 2.45
}, {
	"type" : "Souvenir XM1014",
	"name" : "Bone Machine",
	"quality" : "Well-Worn",
	"marketPrice" : 4.69,
	"avgPrice" : 4.10
}, {
	"type" : "Souvenir XM1014",
	"name" : "Bone Machine",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.20,
	"avgPrice" : 2.03
}, {
	"type" : "XM1014",
	"name" : "CaliCamo",
	"quality" : "Factory New",
	"marketPrice" : 0.10,
	"avgPrice" : 0.08
}, {
	"type" : "XM1014",
	"name" : "CaliCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.07,
	"avgPrice" : 0.05
}, {
	"type" : "XM1014",
	"name" : "CaliCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "XM1014",
	"name" : "CaliCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 0.07,
	"avgPrice" : 0.04
}, {
	"type" : "XM1014",
	"name" : "CaliCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.06,
	"avgPrice" : 0.04
}, {
	"type" : "Souvenir XM1014",
	"name" : "CaliCamo",
	"quality" : "Factory New",
	"marketPrice" : 27.32,
	"avgPrice" : 33.19
}, {
	"type" : "Souvenir XM1014",
	"name" : "CaliCamo",
	"quality" : "Minimal Wear",
	"marketPrice" : 6.97,
	"avgPrice" : 7.32
}, {
	"type" : "Souvenir XM1014",
	"name" : "CaliCamo",
	"quality" : "Field-Tested",
	"marketPrice" : 3.56,
	"avgPrice" : 1.96
}, {
	"type" : "Souvenir XM1014",
	"name" : "CaliCamo",
	"quality" : "Well-Worn",
	"marketPrice" : 162.90,
	"avgPrice" : 31.78
}, {
	"type" : "Souvenir XM1014",
	"name" : "CaliCamo",
	"quality" : "Battle-Scarred",
	"marketPrice" : 19.98,
	"avgPrice" : 10.89
}, {
	"type" : "XM1014",
	"name" : "Fallout Warning",
	"quality" : "Factory New",
	"marketPrice" : 27.99,
	"avgPrice" : 27.73
}, {
	"type" : "XM1014",
	"name" : "Fallout Warning",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.49,
	"avgPrice" : 3.89
}, {
	"type" : "XM1014",
	"name" : "Fallout Warning",
	"quality" : "Field-Tested",
	"marketPrice" : 1.85,
	"avgPrice" : 1.66
}, {
	"type" : "XM1014",
	"name" : "Fallout Warning",
	"quality" : "Well-Worn",
	"marketPrice" : 1.69,
	"avgPrice" : 1.39
}, {
	"type" : "XM1014",
	"name" : "Fallout Warning",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.18,
	"avgPrice" : 1.16
}, {
	"type" : "Souvenir XM1014",
	"name" : "Fallout Warning",
	"quality" : "Factory New",
	"marketPrice" : 219.08,
	"avgPrice" : 59.48
}, {
	"type" : "Souvenir XM1014",
	"name" : "Fallout Warning",
	"quality" : "Minimal Wear",
	"marketPrice" : 3.00,
	"avgPrice" : 3.85
}, {
	"type" : "Souvenir XM1014",
	"name" : "Fallout Warning",
	"quality" : "Field-Tested",
	"marketPrice" : 2.25,
	"avgPrice" : 2.16
}, {
	"type" : "Souvenir XM1014",
	"name" : "Fallout Warning",
	"quality" : "Well-Worn",
	"marketPrice" : 2.72,
	"avgPrice" : 3.29
}, {
	"type" : "Souvenir XM1014",
	"name" : "Fallout Warning",
	"quality" : "Battle-Scarred",
	"marketPrice" : 2.50,
	"avgPrice" : 2.80
}, {
	"type" : "XM1014",
	"name" : "Grassland",
	"quality" : "Factory New",
	"marketPrice" : 5.92,
	"avgPrice" : 3.95
}, {
	"type" : "XM1014",
	"name" : "Grassland",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.49,
	"avgPrice" : 0.50
}, {
	"type" : "XM1014",
	"name" : "Grassland",
	"quality" : "Field-Tested",
	"marketPrice" : 0.19,
	"avgPrice" : 0.17
}, {
	"type" : "XM1014",
	"name" : "Grassland",
	"quality" : "Well-Worn",
	"marketPrice" : 1.00,
	"avgPrice" : 0.70
}, {
	"type" : "XM1014",
	"name" : "Grassland",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.19,
	"avgPrice" : 0.22
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Factory New",
	"marketPrice" : 1.89,
	"avgPrice" : 1.74
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.78,
	"avgPrice" : 0.82
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Field-Tested",
	"marketPrice" : 0.62,
	"avgPrice" : 0.64
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Well-Worn",
	"marketPrice" : 0.70,
	"avgPrice" : 0.67
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Battle-Scarred",
	"marketPrice" : 1.05,
	"avgPrice" : 0.97
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 10.12,
	"avgPrice" : 7.14
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3.71,
	"avgPrice" : 3.44
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2.23,
	"avgPrice" : 2.33
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 4.63,
	"avgPrice" : 19.38
}, {
	"type" : "XM1014",
	"name" : "Heaven Guard",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 2.93,
	"avgPrice" : 2.57
}, {
	"type" : "XM1014",
	"name" : "Jungle",
	"quality" : "Factory New",
	"marketPrice" : 2.95,
	"avgPrice" : 2.51
}, {
	"type" : "XM1014",
	"name" : "Jungle",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.82,
	"avgPrice" : 0.77
}, {
	"type" : "XM1014",
	"name" : "Jungle",
	"quality" : "Field-Tested",
	"marketPrice" : 0.46,
	"avgPrice" : 0.45
}, {
	"type" : "XM1014",
	"name" : "Jungle",
	"quality" : "Well-Worn",
	"marketPrice" : 0.63,
	"avgPrice" : 0.69
}, {
	"type" : "XM1014",
	"name" : "Jungle",
	"quality" : "Battle-Scarred",
	"marketPrice" : 0.51,
	"avgPrice" : 0.53
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Factory New",
	"marketPrice" : 0.14,
	"avgPrice" : 0.14
}, {
	"type" : "XM1014",
	"name" : "Quicksilver",
	"quality" : "Minimal Wear",
	"marketPrice" : 0.11,
	"avgPrice" : 0.10
}, {
	"type" : "XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Factory New",
	"marketPrice" : 4.04,
	"avgPrice" : 4.0
}, {
	"type" : "XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Minimal Wear",
	"marketPrice" : 2.72,
	"avgPrice" : 2.50
}, {
	"type" : "XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Field-Tested",
	"marketPrice" : 1.76,
	"avgPrice" : 1.65
}, {
	"type" : "XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Well-Worn",
	"marketPrice" : 1.91,
	"avgPrice" : 1.82
}, {
	"type" : "XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Battle-Scarred",
	"marketPrice" : 3.62,
	"avgPrice" : 3.50
}, {
	"type" : "Souvenir XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Factory New",
	"marketPrice" : 7.40,
	"avgPrice" : 7.30
}, {
	"type" : "Souvenir XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Minimal Wear",
	"marketPrice" : 5.17,
	"avgPrice" : 5.01
}, {
	"type" : "Souvenir XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Field-Tested",
	"marketPrice" : 2.11,
	"avgPrice" : 2.01
}, {
	"type" : "Souvenir XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Well-Worn",
	"marketPrice" : 3.98,
	"avgPrice" : 3.81
}, {
	"type" : "Souvenir XM1014",
	"name" : "VariCamo Blue",
	"quality" : "Battle-Scarred",
	"marketPrice" : 5.82,
	"avgPrice" : 5.65
}, { //CHROMA 3
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"quality" : "Factory New",
	"marketPrice" : 1642.83,
	"avgPrice" : 1494.80
}, {
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"quality" : "Minimal Wear",
	"marketPrice" : 1045.20,
	"avgPrice" : 1126.70
}, {
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"quality" : "Field-Tested",
	"marketPrice" : 709.03,
	"avgPrice" : 706.32
}, {
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"quality" : "Well-Worn",
	"marketPrice" : 670.34,
	"avgPrice" : 649.19
}, {
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"quality" : "Battle-Scarred",
	"marketPrice" : 709.03,
	"avgPrice" : 533.36
}, {
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 6042.40,
	"avgPrice" : 5833.75
}, {
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 3667.86,
	"avgPrice" : 3662.52
}, {
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 2013.69,
	"avgPrice" : 1818.50
}, {
	"type" : "PP-Bizon",
	"name" : "Judgement of Anubis",
	"statTrak" : 1,
	"quality" : "Well-Worn",
	"marketPrice" : 1915.64,
	"avgPrice" : 1747.69
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Factory New",
	"marketPrice" : 32.68,
	"avgPrice" : 29.91
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Minimal Wear",
	"marketPrice" : 10.01,
	"avgPrice" : 9.95
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Field-Tested",
	"marketPrice" : 6.67,
	"avgPrice" : 5.89
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Well-Worn",
	"marketPrice" : 6.67,
	"avgPrice" : 5.80
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Battle-Scarred",
	"marketPrice" : 6.67,
	"avgPrice" : 5.80
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 171.42,
	"avgPrice" : 165.16
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 49.36,
	"avgPrice" : 50.50
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 22.68,
	"avgPrice" : 24.80
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 20.01,
	"avgPrice" : 20.85
}, {
	"type" : "PP-Bizon",
	"name" : "Photic Zone",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 20.01,
	"avgPrice" : 20.10
}, { //Gamma
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Battle-Scarred",
	"statTrak" : 0,
	"marketPrice" : 409.90,
	"avgPrice" : 409.90
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Well-Worn",
	"statTrak" : 0,
	"marketPrice" : 590.00,
	"avgPrice" : 590.00
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Field-Tested",
	"statTrak" : 0,
	"marketPrice" : 600.00,
	"avgPrice" : 600.00
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Minimal Wear",
	"statTrak" : 0,
	"marketPrice" : 950.00,
	"avgPrice" : 950.00
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Factory New",
	"statTrak" : 0,
	"marketPrice" : 1180.00,
	"avgPrice" : 1180.00
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Factory New",
	"statTrak" : 1,
	"marketPrice" : 5899.00,
	"avgPrice" : 5899.00
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Minimal Wear",
	"statTrak" : 1,
	"marketPrice" : 4299.00,
	"avgPrice" : 4299.00
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Field-Tested",
	"statTrak" : 1,
	"marketPrice" : 1334.00,
	"avgPrice" : 1334.00
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Well-Worn",
	"statTrak" : 1,
	"marketPrice" : 1280.00,
	"avgPrice" : 1280.00
}, {
	"type" : "★ Karambit",
	"name" : "Lore",
	"quality" : "Battle-Scarred",
	"statTrak" : 1,
	"marketPrice" : 1020.00,
	"avgPrice" : 1020.00
},

];