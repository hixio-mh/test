var DEBUG = false;
function getPrice(type, name, quality, statTrak) {
    quality = getQualityName(quality, "EN");
    name = getSkinName(name, "EN");
    if (type.substring(0, 1) == "★")
        type = type.substring(2, type.length);
    if (type.indexOf("Сувенир") != -1)
        type = type.replace("Сувенир", "Souvenir");
    var item = Prices.filter(function(obj) {
        return obj.name == name && obj.type == type && obj.quality == quality;
    })
    if (item.length == 1) {
        if (DEBUG)
            console.warn("Найден только 1 предмет. StatTrak не учитывается.");
        if (item[0].marketPrice != 0) {
            return item[0].marketPrice;
        } else {
            if (DEBUG)
                console.warn("Нет цены в маркете");
            return item[0].avgPrice;
        }
    } else {
        if (statTrak == 1) {
            item = item.filter(function(obj) {
                return obj.statTrak == true;
            })
        } else {
            item = item.filter(function(obj) {
                return typeof obj.statTrak == "undefined";
            })
        }
        if (typeof item[0] == "undefined") {
            var st = (statTrak == 1) ? "StatTrak™ " : "";
            if (DEBUG)
                console.warn("Предмет не найден! " + st + type + " | " + name + " (" + quality + ")");
            return 0
        }
        if (item[0].marketPrice != 0) {
            return item[0].marketPrice;
        } else {
            if (DEBUG)
                console.warn("Нет цены в маркете");
            return item[0].avgPrice;
        }
    }
}
function getPriceIfExists(type, name, quality, statTrak) {
    quality = getQualityName(quality, "EN");
    name = getSkinName(name, "EN");
    if (type.substring(0, 1) == "★")
        type = type.substring(2, type.length);
    if (type.indexOf("Сувенир") != -1)
        type = type.replace("Сувенир", "Souvenir");
    var item = Prices.filter(function(obj) {
        return obj.name == name && obj.type == type && obj.quality == quality;
    })
    if (item.length == 0) {
        return 0;
    } else {
        if (statTrak == 1) {
            item = item.filter(function(obj) {
                return obj.statTrak == true;
            })
        } else {
            item = item.filter(function(obj) {
                return typeof obj.statTrak == "undefined";
            })
        }
        if (typeof item[0] == "undefined") {
            return 0
        }
        if (item[0].marketPrice != 0) {
            return item[0].marketPrice;
        } else {
            return item[0].avgPrice;
        }
    }
}
function getMarketPrice(type, name, quality, statTrak, selector, allowanyPrice) {
    if (typeof selector == "string") $(selector).html('<span class="current-price hide">' + $(selector).html() + '</span><span class="loading-animate"><i class="fa fa-refresh fa-spin" aria-hidden="true"></span>');
    $('.glassBlur').addClass('js-price-loading');
    if (statTrak != 0 && statTrak != false) {
        type = "StatTrak™ " + type;
        statTrak = true;
    } else {
        statTrak = false;
    }
    name = getSkinName(name, 'EN');
    quality = getQualityName(quality, "EN");
    if (type.indexOf("Сувенир") != -1)
        type = type.replace("Сувенир", "Souvenir");
    var n = type + " | " + name + " (" + quality + ")";
    n = encodeURI(n);
    $.getJSON("https://query.yahooapis.com/v1/public/yql", {
            q: "select * from json where url=\"http://steamcommunity.com/market/priceoverview/?currency=1&appid=730&market_hash_name=" + n + "\"",
            format: "json"
        },
        function(data) {
            try {
                if (data.query.results.json.success == "true") {
                    var pr = data.query.results.json.lowest_price;
                    pr = pr.replace(/,/ig, ".");
                    pr = pr.substr(0, pr.length - 1);
                    pr = parseFloat(pr);
                    if (DEBUG)
                        console.log(pr);
                    if (typeof selector == "string")
                        $(selector).html(pr + "$");
                    else if (typeof selector == "function")
                        selector(pr);
                    $('.glassBlur').removeClass('js-price-loading');
                    return pr;
                }
            } catch (e) {
                //getOtherMarketsPrice(type, name, quality, statTrak, selector);
                csgoStashGetURL(type, name, quality, statTrak, selector, allowanyPrice);
            }
        });
}
function getOtherMarketsPrice(type, name, quality, statTrak, selector) {
    var n = type + '|' + name;
    n = n.replace(/ /gi, '_');
    n = encodeURI(n);
    $.getJSON("https://query.yahooapis.com/v1/public/yql", {
            q: "select * from html where url='http://csgoitems.pro/en/skin/" + n + "' and xpath='//ul[@class=\"no-bullet five-up\"]'",
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
                if (isNaN(price))
                    price = 0;
                if (DEBUG)
                    console.log('Other market: ' + price);
                if (typeof selector == "string")
                    $(selector).html(pr + "$");
                else if (typeof selector == "function")
                    selector.call(pr);
                return price;
            }
        });
}
function csgoStashGetURL(type, name, quality, statTrak, selector, allowanyPrice) {
    var souvenir = false;
    var type2 = type.replace(/ /gi, '+');
    if (/Souvenir/.test(type))
        souvenir = true;
    type2 = type2.replace(/StatTrak™\+/, '');
    type2 = type2.replace(/Souvenir\+/, '');
    type2 = type2.replace(/ПП.*Бизон/, 'PP-Bizon');
    type2 = type2.replace(/Керамбит/, 'Karambit');
    type2 = type2.replace(/Штык-нож+M9/, 'M9+Bayonet');
    type2 = type2.replace(/★\+/, '');
    if (DEBUG)
        console.log('%c ' + type2 + ' %c | ' + '%c ' + name + ' ', 'background:#af7b05;color:#fff', '', 'background:#56af05;color:#fff')
    $.getJSON("https://query.yahooapis.com/v1/public/yql", {
            q: "select * from html where url='http://csgostash.com/weapon/" + type2 + "'and xpath='//a[contains(@href, \"csgostash.com/skin\") and img[contains(@alt, \"" + type2.replace(/\+/gi, ' ') + " " + name + "\")]]'",
            format: "json"
        },
        function(data) {
            try {
                if (data.query.results == null) {
                    $('.current-price').removeClass('hide');
                    $('.loading-animate').addClass('hide');
                    $('.glassBlur').removeClass('js-price-loading');
                }
                var url = data.query.results.a.href;
                csgoStash(url, quality, statTrak, souvenir, selector, allowanyPrice);
            } catch (err) {
                if (typeof selector == 'function') {
					selector(-1);
				}else {
					$('.current-price').removeClass('hide');
					$('.loading-animate').addClass('hide');
					$('.glassBlur').removeClass('js-price-loading');
				}
            }
        })
		.fail(function() {
			if (typeof selector == 'function') {
				selector(-1);
			}else {
				$('.current-price').removeClass('hide');
				$('.loading-animate').addClass('hide');
				$('.glassBlur').removeClass('js-price-loading');
			}
		});
}
function csgoStash(url, quality, statTrak, souvenir, selector, allowanyPrice) {
    if (typeof allowanyPrice == 'undefined')
        allowanyPrice = false;
    var anyPrice = false;
    $.getJSON("https://query.yahooapis.com/v1/public/yql", {
            q: "select * from html where url='" + url + "' and xpath='//a[contains(@class, \"btn-sm\") and not(contains(@class, \"price-tab-keys-button\"))]/span'",
            format: "json"
        },
        function(data) {
            try {
                var spans = data.query.results.span;
                for (var i = 0; i < spans.length; i++) {
                    var souvenirFound = false;
                    var statTrakFound = false;
                    var curr = spans[i];
                    if (curr.content == 'StatTrak') {
                        if (!statTrak) {
                            i += 2;
                            continue;
                        }
                        i++;
                        curr = spans[i];
                        statTrakFound = true;
                    } else if (curr['class'].indexOf('price-details-souv') != -1) {
                        if (!souvenir) {
                            i += 2;
                            continue;
                        }
                        i++;
                        curr = spans[i];
                        souvenirFound = true;
                    }
                    if (curr.content == quality || anyPrice) {
                        if ((souvenir && !souvenirFound) || (statTrak && !statTrakFound))
                            continue;
                        if (spans[i + 1].content[0] == '$') {
                            var price = parseFloat(spans[i + 1].content.substr(1).replace(/,/gi, ''));
                            if (typeof selector == "string")
                                $(selector).html(price + "$");
                            else if (typeof selector == "function")
                                selector(price);
                            if (DEBUG)
                                console.log('Quality: %c ' + quality + ' %c;StatTrak: ' + '%c ' + statTrak + ' %c Souvenir: ' + '%c ' + souvenir + ' %c; anyPrice: ' + '%c ' + anyPrice + ' %c; Price: %c ' + price + '$ ', 'background:#af7b05;color:#fff', '', 'background:#56af05;color:#fff', '', 'background:#0083a0;color:#fff', '', 'background:#c5c100;color:#fff', '', 'background:#b005b3;color:#fff')
                            break;
                        } else {
                            if (spans[i + 1].content == 'Not Possible' || spans[i + 1].content == 'No Recent Price')
                                if (allowanyPrice)
                                    anyPrice = true;
                            i++;
                        }
                    } else {
                        i++;
                    }
                }
                $('.current-price').removeClass('hide');
                $('.loading-animate').addClass('hide');
                $('.glassBlur').removeClass('js-price-loading');
            } catch (err) {
                //ERROR
                $('.current-price').removeClass('hide');
                $('.loading-animate').addClass('hide');
                $('.glassBlur').removeClass('js-price-loading');
            }
        });
}

function getPriceWithNewQuality(weapon, recurs) {
    recurs = recurs || false;
    var price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
    var quality = weapon.quality;

    if (price == 0) {
        for (var i = 0; i < Quality.length; i++) {
            quality = Quality[i].name[Settings.language == 'RU' ? 1 : 0];
            quality = getQualityName(quality, Settings.language);
            price = getPrice(weapon.type, weapon.skinName, quality, weapon.statTrak);
            if (price != 0) break;
        }

        if (price == 0 && !recurs) {
            weapon.statTrak = !weapon.statTrak;
            getPriceWithNewQuality(weapon, true);
        } else if (price == 0 && recurs) {
            weapon.statTrak = !weapon.statTrak;
        }
    }
    weapon.price = price;
    weapon.quality = quality;
    return weapon;
}

function getMarketPriceWithNewQuality(weapon, callback, recurs) {
    recurs = recurs || 0;
	if (recurs == 10) callback(weapon);
    getMarketPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak, function(pr) {
		if (pr == -1 || pr == 0) {
			var nextQuality = getNextQuality(weapon.quality);
			if (weapon.quality == nextQuality && recurs < 5) {
				nextQuality = getQualityName("Battle-Scarred", Settings.language);
			} else if (recurs == 5) {
				weapon.statTrak = !weapon.statTrak;
			} else if (recurs == 10) {
				weapon.statTrak = !weapon.statTrak;
			}
			
			weapon.quality = nextQuality;
			getMarketPriceWithNewQuality(weapon, callback, (recurs+1));
		} else {
			weapon.price = pr;
			callback(weapon);
		}
	});
}

var Prices = [{
    type: 'AK-47',
    name: 'Aquamarine Revenge',
    quality: 'Factory New',
    marketPrice: 34.47,
    avgPrice: 31.16
}, {
    type: 'AK-47',
    name: 'Aquamarine Revenge',
    quality: 'Minimal Wear',
    marketPrice: 21.50,
    avgPrice: 21.39
}, {
    type: 'AK-47',
    name: 'Aquamarine Revenge',
    quality: 'Field-Tested',
    marketPrice: 15.95,
    avgPrice: 15.29
}, {
    type: 'AK-47',
    name: 'Aquamarine Revenge',
    quality: 'Well-Worn',
    marketPrice: 11.11,
    avgPrice: 12.15
}, {
    type: 'AK-47',
    name: 'Aquamarine Revenge',
    quality: 'Battle-Scarred',
    marketPrice: 9.00,
    avgPrice: 8.67
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Aquamarine Revenge',
    quality: 'Factory New',
    marketPrice: 138.80,
    avgPrice: 125.89
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Aquamarine Revenge',
    quality: 'Minimal Wear',
    marketPrice: 78.00,
    avgPrice: 75.48
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Aquamarine Revenge',
    quality: 'Field-Tested',
    marketPrice: 54.62,
    avgPrice: 51.09
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Aquamarine Revenge',
    quality: 'Well-Worn',
    marketPrice: 37.00,
    avgPrice: 36.63
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Aquamarine Revenge',
    quality: 'Battle-Scarred',
    marketPrice: 28.30,
    avgPrice: 25.35
}, {
    type: 'AK-47',
    name: 'Black Laminate',
    quality: 'Factory New',
    marketPrice: 163.66,
    avgPrice: 163.82
}, {
    type: 'AK-47',
    name: 'Black Laminate',
    quality: 'Minimal Wear',
    marketPrice: 7.64,
    avgPrice: 7.69
}, {
    type: 'AK-47',
    name: 'Black Laminate',
    quality: 'Field-Tested',
    marketPrice: 6.90,
    avgPrice: 6.35
}, {
    type: 'AK-47',
    name: 'Black Laminate',
    quality: 'Well-Worn',
    marketPrice: 6.62,
    avgPrice: 6.59
}, {
    type: 'AK-47',
    name: 'Black Laminate',
    quality: 'Battle-Scarred',
    marketPrice: 6.76,
    avgPrice: 6.38
}, {
    type: 'AK-47',
    name: 'Blue Laminate',
    quality: 'Factory New',
    marketPrice: 2.73,
    avgPrice: 2.78
}, {
    type: 'AK-47',
    name: 'Blue Laminate',
    quality: 'Minimal Wear',
    marketPrice: 2.34,
    avgPrice: 2.23
}, {
    type: 'AK-47',
    name: 'Blue Laminate',
    quality: 'Field-Tested',
    marketPrice: 2.22,
    avgPrice: 2.12
}, {
    type: 'AK-47',
    name: 'Blue Laminate',
    quality: 'Well-Worn',
    marketPrice: 3.56,
    avgPrice: 3.79
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Blue Laminate',
    quality: 'Factory New',
    marketPrice: 15.38,
    avgPrice: 14.75
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Blue Laminate',
    quality: 'Minimal Wear',
    marketPrice: 9.68,
    avgPrice: 10.40
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Blue Laminate',
    quality: 'Field-Tested',
    marketPrice: 10.06,
    avgPrice: 9.75
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Blue Laminate',
    quality: 'Well-Worn',
    marketPrice: 13.35,
    avgPrice: 11.31
}, {
    type: 'AK-47',
    name: 'Cartel',
    quality: 'Factory New',
    marketPrice: 5.03,
    avgPrice: 4.74
}, {
    type: 'AK-47',
    name: 'Cartel',
    quality: 'Minimal Wear',
    marketPrice: 2.49,
    avgPrice: 2.49
}, {
    type: 'AK-47',
    name: 'Cartel',
    quality: 'Field-Tested',
    marketPrice: 2.04,
    avgPrice: 2.15
}, {
    type: 'AK-47',
    name: 'Cartel',
    quality: 'Well-Worn',
    marketPrice: 3.29,
    avgPrice: 3.09
}, {
    type: 'AK-47',
    name: 'Cartel',
    quality: 'Battle-Scarred',
    marketPrice: 2.25,
    avgPrice: 2.24
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Cartel',
    quality: 'Factory New',
    marketPrice: 22.74,
    avgPrice: 21.22
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Cartel',
    quality: 'Minimal Wear',
    marketPrice: 12.25,
    avgPrice: 12.59
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Cartel',
    quality: 'Field-Tested',
    marketPrice: 9.70,
    avgPrice: 9.30
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Cartel',
    quality: 'Well-Worn',
    marketPrice: 12.60,
    avgPrice: 11.25
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Cartel',
    quality: 'Battle-Scarred',
    marketPrice: 9.50,
    avgPrice: 9.32
}, {
    type: 'AK-47',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 46.64,
    avgPrice: 49.58
}, {
    type: 'AK-47',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 29.99,
    avgPrice: 31.91
}, {
    type: 'AK-47',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 24.24,
    avgPrice: 24.62
}, {
    type: 'AK-47',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 21.59,
    avgPrice: 22.60
}, {
    type: 'AK-47',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 21.09,
    avgPrice: 20.50
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 298.59,
    avgPrice: 304.16
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 143.26,
    avgPrice: 132.43
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 98.11,
    avgPrice: 94.80
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 100.36,
    avgPrice: 92.46
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 86.59,
    avgPrice: 74.87
}, {
    type: 'AK-47',
    name: 'Elite Build',
    quality: 'Factory New',
    marketPrice: 1.86,
    avgPrice: 1.94
}, {
    type: 'AK-47',
    name: 'Elite Build',
    quality: 'Minimal Wear',
    marketPrice: 0.69,
    avgPrice: 0.63
}, {
    type: 'AK-47',
    name: 'Elite Build',
    quality: 'Field-Tested',
    marketPrice: 0.38,
    avgPrice: 0.35
}, {
    type: 'AK-47',
    name: 'Elite Build',
    quality: 'Well-Worn',
    marketPrice: 0.28,
    avgPrice: 0.25
}, {
    type: 'AK-47',
    name: 'Elite Build',
    quality: 'Battle-Scarred',
    marketPrice: 0.26,
    avgPrice: 0.22
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Factory New',
    marketPrice: 10.21,
    avgPrice: 9.99
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Minimal Wear',
    marketPrice: 3.56,
    avgPrice: 3.59
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Field-Tested',
    marketPrice: 2.48,
    avgPrice: 2.50
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Well-Worn',
    marketPrice: 2.12,
    avgPrice: 2.13
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Battle-Scarred',
    marketPrice: 2.10,
    avgPrice: 2.06
}, {
    type: 'AK-47',
    name: 'Emerald Pinstripe',
    quality: 'Factory New',
    marketPrice: 2.90,
    avgPrice: 3.01
}, {
    type: 'AK-47',
    name: 'Emerald Pinstripe',
    quality: 'Minimal Wear',
    marketPrice: 1.70,
    avgPrice: 1.69
}, {
    type: 'AK-47',
    name: 'Emerald Pinstripe',
    quality: 'Field-Tested',
    marketPrice: 1.26,
    avgPrice: 1.25
}, {
    type: 'AK-47',
    name: 'Emerald Pinstripe',
    quality: 'Well-Worn',
    marketPrice: 1.26,
    avgPrice: 1.19
}, {
    type: 'AK-47',
    name: 'Emerald Pinstripe',
    quality: 'Battle-Scarred',
    marketPrice: 1.26,
    avgPrice: 1.18
}, {
    type: 'AK-47',
    name: 'Fire Serpent',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 753.75
}, {
    type: 'AK-47',
    name: 'Fire Serpent',
    quality: 'Minimal Wear',
    marketPrice: 299.84,
    avgPrice: 311.15
}, {
    type: 'AK-47',
    name: 'Fire Serpent',
    quality: 'Field-Tested',
    marketPrice: 210.99,
    avgPrice: 208.89
}, {
    type: 'AK-47',
    name: 'Fire Serpent',
    quality: 'Well-Worn',
    marketPrice: 195.85,
    avgPrice: 178.68
}, {
    type: 'AK-47',
    name: 'Fire Serpent',
    quality: 'Battle-Scarred',
    marketPrice: 127.50,
    avgPrice: 120.23
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fire Serpent',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 4950.00
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fire Serpent',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1337.50
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fire Serpent',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 801.25
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fire Serpent',
    quality: 'Well-Worn',
    marketPrice: 0,
    avgPrice: 582.50
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fire Serpent',
    quality: 'Battle-Scarred',
    marketPrice: 0,
    avgPrice: 447.50
}, {
    type: 'AK-47',
    name: 'First Class',
    quality: 'Factory New',
    marketPrice: 22.45,
    avgPrice: 22.04
}, {
    type: 'AK-47',
    name: 'First Class',
    quality: 'Minimal Wear',
    marketPrice: 12.74,
    avgPrice: 11.06
}, {
    type: 'AK-47',
    name: 'First Class',
    quality: 'Field-Tested',
    marketPrice: 8.43,
    avgPrice: 7.71
}, {
    type: 'AK-47',
    name: 'First Class',
    quality: 'Well-Worn',
    marketPrice: 7.18,
    avgPrice: 7.20
}, {
    type: 'AK-47',
    name: 'First Class',
    quality: 'Battle-Scarred',
    marketPrice: 7.24,
    avgPrice: 7.05
}, {
    type: 'AK-47',
    name: 'Frontside Misty',
    quality: 'Factory New',
    marketPrice: 22.77,
    avgPrice: 23.07
}, {
    type: 'AK-47',
    name: 'Frontside Misty',
    quality: 'Minimal Wear',
    marketPrice: 11.20,
    avgPrice: 11.43
}, {
    type: 'AK-47',
    name: 'Frontside Misty',
    quality: 'Field-Tested',
    marketPrice: 8.33,
    avgPrice: 8.00
}, {
    type: 'AK-47',
    name: 'Frontside Misty',
    quality: 'Well-Worn',
    marketPrice: 8.00,
    avgPrice: 7.50
}, {
    type: 'AK-47',
    name: 'Frontside Misty',
    quality: 'Battle-Scarred',
    marketPrice: 4.91,
    avgPrice: 4.88
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Frontside Misty',
    quality: 'Factory New',
    marketPrice: 80.00,
    avgPrice: 79.01
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Frontside Misty',
    quality: 'Minimal Wear',
    marketPrice: 42.00,
    avgPrice: 36.71
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Frontside Misty',
    quality: 'Field-Tested',
    marketPrice: 24.65,
    avgPrice: 23.02
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Frontside Misty',
    quality: 'Well-Worn',
    marketPrice: 22.20,
    avgPrice: 20.99
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Frontside Misty',
    quality: 'Battle-Scarred',
    marketPrice: 12.54,
    avgPrice: 14.10
}, {
    type: 'AK-47',
    name: 'Fuel Injector',
    quality: 'Factory New',
    marketPrice: 70.50,
    avgPrice: 76.36
}, {
    type: 'AK-47',
    name: 'Fuel Injector',
    quality: 'Minimal Wear',
    marketPrice: 39.76,
    avgPrice: 36.93
}, {
    type: 'AK-47',
    name: 'Fuel Injector',
    quality: 'Field-Tested',
    marketPrice: 28.25,
    avgPrice: 27.99
}, {
    type: 'AK-47',
    name: 'Fuel Injector',
    quality: 'Well-Worn',
    marketPrice: 26.08,
    avgPrice: 24.12
}, {
    type: 'AK-47',
    name: 'Fuel Injector',
    quality: 'Battle-Scarred',
    marketPrice: 20.41,
    avgPrice: 21.19
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fuel Injector',
    quality: 'Factory New',
    marketPrice: 388.67,
    avgPrice: 531.25
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fuel Injector',
    quality: 'Minimal Wear',
    marketPrice: 133.26,
    avgPrice: 135.32
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fuel Injector',
    quality: 'Field-Tested',
    marketPrice: 88.12,
    avgPrice: 96.86
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fuel Injector',
    quality: 'Well-Worn',
    marketPrice: 79.95,
    avgPrice: 80.15
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fuel Injector',
    quality: 'Battle-Scarred',
    marketPrice: 70.88,
    avgPrice: 65.75
}, {
    type: 'AK-47',
    name: 'Hydroponic',
    quality: 'Factory New',
    marketPrice: 130.25,
    avgPrice: 128.65
}, {
    type: 'AK-47',
    name: 'Hydroponic',
    quality: 'Minimal Wear',
    marketPrice: 91.40,
    avgPrice: 84.10
}, {
    type: 'AK-47',
    name: 'Hydroponic',
    quality: 'Field-Tested',
    marketPrice: 42.85,
    avgPrice: 42.45
}, {
    type: 'AK-47',
    name: 'Hydroponic',
    quality: 'Well-Worn',
    marketPrice: 43.86,
    avgPrice: 34.90
}, {
    type: 'AK-47',
    name: 'Hydroponic',
    quality: 'Battle-Scarred',
    marketPrice: 19.82,
    avgPrice: 18.19
}, {
    type: 'AK-47',
    name: 'Jaguar',
    quality: 'Factory New',
    marketPrice: 41.14,
    avgPrice: 40.50
}, {
    type: 'AK-47',
    name: 'Jaguar',
    quality: 'Minimal Wear',
    marketPrice: 14.43,
    avgPrice: 14.41
}, {
    type: 'AK-47',
    name: 'Jaguar',
    quality: 'Field-Tested',
    marketPrice: 10.87,
    avgPrice: 10.28
}, {
    type: 'AK-47',
    name: 'Jaguar',
    quality: 'Well-Worn',
    marketPrice: 9.83,
    avgPrice: 9.64
}, {
    type: 'AK-47',
    name: 'Jaguar',
    quality: 'Battle-Scarred',
    marketPrice: 8.81,
    avgPrice: 7.99
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Jaguar',
    quality: 'Factory New',
    marketPrice: 288.73,
    avgPrice: 282.75
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Jaguar',
    quality: 'Minimal Wear',
    marketPrice: 88.00,
    avgPrice: 86.00
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Jaguar',
    quality: 'Field-Tested',
    marketPrice: 54.14,
    avgPrice: 51.66
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Jaguar',
    quality: 'Well-Worn',
    marketPrice: 38.18,
    avgPrice: 37.00
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Jaguar',
    quality: 'Battle-Scarred',
    marketPrice: 31.75,
    avgPrice: 28.80
}, {
    type: 'AK-47',
    name: 'Jet Set',
    quality: 'Factory New',
    marketPrice: 220.99,
    avgPrice: 166.12
}, {
    type: 'AK-47',
    name: 'Jet Set',
    quality: 'Minimal Wear',
    marketPrice: 45.57,
    avgPrice: 42.71
}, {
    type: 'AK-47',
    name: 'Jet Set',
    quality: 'Field-Tested',
    marketPrice: 23.32,
    avgPrice: 25.22
}, {
    type: 'AK-47',
    name: 'Jet Set',
    quality: 'Well-Worn',
    marketPrice: 21.98,
    avgPrice: 22.52
}, {
    type: 'AK-47',
    name: 'Jet Set',
    quality: 'Battle-Scarred',
    marketPrice: 22.20,
    avgPrice: 22.06
}, {
    type: 'AK-47',
    name: 'Jungle Spray',
    quality: 'Factory New',
    marketPrice: 13.34,
    avgPrice: 12.36
}, {
    type: 'AK-47',
    name: 'Jungle Spray',
    quality: 'Minimal Wear',
    marketPrice: 1.78,
    avgPrice: 1.68
}, {
    type: 'AK-47',
    name: 'Jungle Spray',
    quality: 'Field-Tested',
    marketPrice: 0.58,
    avgPrice: 0.59
}, {
    type: 'AK-47',
    name: 'Jungle Spray',
    quality: 'Well-Worn',
    marketPrice: 1.26,
    avgPrice: 1.14
}, {
    type: 'AK-47',
    name: 'Jungle Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.88,
    avgPrice: 0.90
}, {
    type: 'AK-47',
    name: 'Point Disarray',
    quality: 'Factory New',
    marketPrice: 22.39,
    avgPrice: 21.32
}, {
    type: 'AK-47',
    name: 'Point Disarray',
    quality: 'Minimal Wear',
    marketPrice: 14.07,
    avgPrice: 13.66
}, {
    type: 'AK-47',
    name: 'Point Disarray',
    quality: 'Field-Tested',
    marketPrice: 9.91,
    avgPrice: 9.39
}, {
    type: 'AK-47',
    name: 'Point Disarray',
    quality: 'Well-Worn',
    marketPrice: 10.20,
    avgPrice: 9.76
}, {
    type: 'AK-47',
    name: 'Point Disarray',
    quality: 'Battle-Scarred',
    marketPrice: 6.64,
    avgPrice: 6.18
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Point Disarray',
    quality: 'Factory New',
    marketPrice: 87.00,
    avgPrice: 74.94
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Point Disarray',
    quality: 'Minimal Wear',
    marketPrice: 49.97,
    avgPrice: 46.45
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Point Disarray',
    quality: 'Field-Tested',
    marketPrice: 28.65,
    avgPrice: 29.47
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Point Disarray',
    quality: 'Well-Worn',
    marketPrice: 30.97,
    avgPrice: 29.85
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Point Disarray',
    quality: 'Battle-Scarred',
    marketPrice: 17.42,
    avgPrice: 17.16
}, {
    type: 'AK-47',
    name: 'Predator',
    quality: 'Factory New',
    marketPrice: 8.39,
    avgPrice: 8.60
}, {
    type: 'AK-47',
    name: 'Predator',
    quality: 'Minimal Wear',
    marketPrice: 1.39,
    avgPrice: 1.30
}, {
    type: 'AK-47',
    name: 'Predator',
    quality: 'Field-Tested',
    marketPrice: 0.62,
    avgPrice: 0.63
}, {
    type: 'AK-47',
    name: 'Predator',
    quality: 'Well-Worn',
    marketPrice: 1.24,
    avgPrice: 1.13
}, {
    type: 'AK-47',
    name: 'Predator',
    quality: 'Battle-Scarred',
    marketPrice: 0.82,
    avgPrice: 0.81
}, {
    type: 'AK-47',
    name: 'Red Laminate',
    quality: 'Factory New',
    marketPrice: 166.01,
    avgPrice: 157.86
}, {
    type: 'AK-47',
    name: 'Red Laminate',
    quality: 'Minimal Wear',
    marketPrice: 8.99,
    avgPrice: 9.62
}, {
    type: 'AK-47',
    name: 'Red Laminate',
    quality: 'Field-Tested',
    marketPrice: 6.84,
    avgPrice: 6.30
}, {
    type: 'AK-47',
    name: 'Red Laminate',
    quality: 'Well-Worn',
    marketPrice: 7.39,
    avgPrice: 6.73
}, {
    type: 'AK-47',
    name: 'Red Laminate',
    quality: 'Battle-Scarred',
    marketPrice: 7.01,
    avgPrice: 6.29
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Red Laminate',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1625.00
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Red Laminate',
    quality: 'Minimal Wear',
    marketPrice: 63.85,
    avgPrice: 68.81
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Red Laminate',
    quality: 'Field-Tested',
    marketPrice: 39.71,
    avgPrice: 35.80
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Red Laminate',
    quality: 'Well-Worn',
    marketPrice: 42.81,
    avgPrice: 34.49
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Red Laminate',
    quality: 'Battle-Scarred',
    marketPrice: 38.00,
    avgPrice: 34.51
}, {
    type: 'AK-47',
    name: 'Redline',
    quality: 'Minimal Wear',
    marketPrice: 16.67,
    avgPrice: 17.80
}, {
    type: 'AK-47',
    name: 'Redline',
    quality: 'Field-Tested',
    marketPrice: 5.13,
    avgPrice: 5.27
}, {
    type: 'AK-47',
    name: 'Redline',
    quality: 'Well-Worn',
    marketPrice: 4.98,
    avgPrice: 5.32
}, {
    type: 'AK-47',
    name: 'Redline',
    quality: 'Battle-Scarred',
    marketPrice: 3.00,
    avgPrice: 2.91
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Redline',
    quality: 'Minimal Wear',
    marketPrice: 103.50,
    avgPrice: 110.81
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Redline',
    quality: 'Field-Tested',
    marketPrice: 22.59,
    avgPrice: 21.72
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Redline',
    quality: 'Well-Worn',
    marketPrice: 18.44,
    avgPrice: 18.54
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Redline',
    quality: 'Battle-Scarred',
    marketPrice: 10.72,
    avgPrice: 10.06
}, {
    type: 'AK-47',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 2.09,
    avgPrice: 2.11
}, {
    type: 'AK-47',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'AK-47',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'AK-47',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'AK-47',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Souvenir AK-47',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 126.85,
    avgPrice: 112.80
}, {
    type: 'Souvenir AK-47',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 9.86,
    avgPrice: 10.25
}, {
    type: 'Souvenir AK-47',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 5.29,
    avgPrice: 5.30
}, {
    type: 'Souvenir AK-47',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 4.94,
    avgPrice: 5.53
}, {
    type: 'Souvenir AK-47',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 4.90,
    avgPrice: 4.89
}, {
    type: 'AK-47',
    name: 'Vulcan',
    quality: 'Factory New',
    marketPrice: 64.08,
    avgPrice: 59.59
}, {
    type: 'AK-47',
    name: 'Vulcan',
    quality: 'Minimal Wear',
    marketPrice: 39.37,
    avgPrice: 37.27
}, {
    type: 'AK-47',
    name: 'Vulcan',
    quality: 'Field-Tested',
    marketPrice: 22.05,
    avgPrice: 21.94
}, {
    type: 'AK-47',
    name: 'Vulcan',
    quality: 'Well-Worn',
    marketPrice: 18.49,
    avgPrice: 18.10
}, {
    type: 'AK-47',
    name: 'Vulcan',
    quality: 'Battle-Scarred',
    marketPrice: 8.93,
    avgPrice: 9.47
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Vulcan',
    quality: 'Factory New',
    marketPrice: 351.79,
    avgPrice: 400.00
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Vulcan',
    quality: 'Minimal Wear',
    marketPrice: 202.99,
    avgPrice: 179.80
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Vulcan',
    quality: 'Field-Tested',
    marketPrice: 77.05,
    avgPrice: 83.44
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Vulcan',
    quality: 'Well-Worn',
    marketPrice: 58.03,
    avgPrice: 57.02
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Vulcan',
    quality: 'Battle-Scarred',
    marketPrice: 27.77,
    avgPrice: 30.39
}, {
    type: 'AK-47',
    name: 'Wasteland Rebel',
    quality: 'Factory New',
    marketPrice: 155.49,
    avgPrice: 106.26
}, {
    type: 'AK-47',
    name: 'Wasteland Rebel',
    quality: 'Minimal Wear',
    marketPrice: 23.32,
    avgPrice: 23.55
}, {
    type: 'AK-47',
    name: 'Wasteland Rebel',
    quality: 'Field-Tested',
    marketPrice: 16.99,
    avgPrice: 16.09
}, {
    type: 'AK-47',
    name: 'Wasteland Rebel',
    quality: 'Well-Worn',
    marketPrice: 20.01,
    avgPrice: 18.43
}, {
    type: 'AK-47',
    name: 'Wasteland Rebel',
    quality: 'Battle-Scarred',
    marketPrice: 15.24,
    avgPrice: 14.14
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 757.50
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Minimal Wear',
    marketPrice: 115.00,
    avgPrice: 119.48
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Field-Tested',
    marketPrice: 69.96,
    avgPrice: 67.23
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Well-Worn',
    marketPrice: 73.66,
    avgPrice: 65.03
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Battle-Scarred',
    marketPrice: 62.00,
    avgPrice: 63.31
}, {
    type: 'AUG',
    name: 'Akihabara Accept',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 2055.00
}, {
    type: 'AUG',
    name: 'Akihabara Accept',
    quality: 'Minimal Wear',
    marketPrice: 178.94,
    avgPrice: 156.97
}, {
    type: 'AUG',
    name: 'Akihabara Accept',
    quality: 'Field-Tested',
    marketPrice: 52.21,
    avgPrice: 54.72
}, {
    type: 'AUG',
    name: 'Akihabara Accept',
    quality: 'Well-Worn',
    marketPrice: 29.98,
    avgPrice: 27.64
}, {
    type: 'AUG',
    name: 'Akihabara Accept',
    quality: 'Battle-Scarred',
    marketPrice: 21.45,
    avgPrice: 21.53
}, {
    type: 'AUG',
    name: 'Anodized Navy',
    quality: 'Factory New',
    marketPrice: 5.57,
    avgPrice: 5.83
}, {
    type: 'AUG',
    name: 'Anodized Navy',
    quality: 'Minimal Wear',
    marketPrice: 16.67,
    avgPrice: 11.67
}, {
    type: 'AUG',
    name: 'Aristocrat',
    quality: 'Factory New',
    marketPrice: 3.45,
    avgPrice: 3.20
}, {
    type: 'AUG',
    name: 'Aristocrat',
    quality: 'Minimal Wear',
    marketPrice: 2.14,
    avgPrice: 1.98
}, {
    type: 'AUG',
    name: 'Aristocrat',
    quality: 'Field-Tested',
    marketPrice: 1.34,
    avgPrice: 1.39
}, {
    type: 'AUG',
    name: 'Aristocrat',
    quality: 'Well-Worn',
    marketPrice: 1.69,
    avgPrice: 1.40
}, {
    type: 'AUG',
    name: 'Aristocrat',
    quality: 'Battle-Scarred',
    marketPrice: 1.35,
    avgPrice: 1.23
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Aristocrat',
    quality: 'Factory New',
    marketPrice: 10.99,
    avgPrice: 10.25
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Aristocrat',
    quality: 'Minimal Wear',
    marketPrice: 5.44,
    avgPrice: 5.27
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Aristocrat',
    quality: 'Field-Tested',
    marketPrice: 3.38,
    avgPrice: 3.52
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Aristocrat',
    quality: 'Well-Worn',
    marketPrice: 4.30,
    avgPrice: 3.46
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Aristocrat',
    quality: 'Battle-Scarred',
    marketPrice: 3.59,
    avgPrice: 3.07
}, {
    type: 'AUG',
    name: 'Bengal Tiger',
    quality: 'Factory New',
    marketPrice: 16.99,
    avgPrice: 17.19
}, {
    type: 'AUG',
    name: 'Bengal Tiger',
    quality: 'Minimal Wear',
    marketPrice: 2.77,
    avgPrice: 2.54
}, {
    type: 'AUG',
    name: 'Bengal Tiger',
    quality: 'Field-Tested',
    marketPrice: 1.57,
    avgPrice: 1.49
}, {
    type: 'AUG',
    name: 'Bengal Tiger',
    quality: 'Well-Worn',
    marketPrice: 1.98,
    avgPrice: 1.87
}, {
    type: 'AUG',
    name: 'Bengal Tiger',
    quality: 'Battle-Scarred',
    marketPrice: 1.52,
    avgPrice: 1.57
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Bengal Tiger',
    quality: 'Factory New',
    marketPrice: 196.83,
    avgPrice: 104.67
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Bengal Tiger',
    quality: 'Minimal Wear',
    marketPrice: 11.27,
    avgPrice: 10.90
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Bengal Tiger',
    quality: 'Field-Tested',
    marketPrice: 4.74,
    avgPrice: 4.68
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Bengal Tiger',
    quality: 'Well-Worn',
    marketPrice: 6.63,
    avgPrice: 5.38
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Bengal Tiger',
    quality: 'Battle-Scarred',
    marketPrice: 4.94,
    avgPrice: 5.56
}, {
    type: 'AUG',
    name: 'Chameleon',
    quality: 'Factory New',
    marketPrice: 2.15,
    avgPrice: 2.17
}, {
    type: 'AUG',
    name: 'Chameleon',
    quality: 'Minimal Wear',
    marketPrice: 1.53,
    avgPrice: 1.50
}, {
    type: 'AUG',
    name: 'Chameleon',
    quality: 'Field-Tested',
    marketPrice: 1.23,
    avgPrice: 1.18
}, {
    type: 'AUG',
    name: 'Chameleon',
    quality: 'Well-Worn',
    marketPrice: 1.49,
    avgPrice: 1.34
}, {
    type: 'AUG',
    name: 'Chameleon',
    quality: 'Battle-Scarred',
    marketPrice: 1.23,
    avgPrice: 1.24
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Chameleon',
    quality: 'Factory New',
    marketPrice: 10.21,
    avgPrice: 10.43
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Chameleon',
    quality: 'Minimal Wear',
    marketPrice: 5.53,
    avgPrice: 5.90
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Chameleon',
    quality: 'Field-Tested',
    marketPrice: 4.23,
    avgPrice: 3.83
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Chameleon',
    quality: 'Well-Worn',
    marketPrice: 4.63,
    avgPrice: 4.63
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Chameleon',
    quality: 'Battle-Scarred',
    marketPrice: 6.70,
    avgPrice: 4.11
}, {
    type: 'AUG',
    name: 'Colony',
    quality: 'Factory New',
    marketPrice: 8.88,
    avgPrice: 6.82
}, {
    type: 'AUG',
    name: 'Colony',
    quality: 'Minimal Wear',
    marketPrice: 0.21,
    avgPrice: 0.18
}, {
    type: 'AUG',
    name: 'Colony',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'AUG',
    name: 'Colony',
    quality: 'Well-Worn',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'AUG',
    name: 'Colony',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Souvenir AUG',
    name: 'Colony',
    quality: 'Factory New',
    marketPrice: 3.50,
    avgPrice: 3.32
}, {
    type: 'Souvenir AUG',
    name: 'Colony',
    quality: 'Minimal Wear',
    marketPrice: 0.76,
    avgPrice: 0.51
}, {
    type: 'Souvenir AUG',
    name: 'Colony',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.23
}, {
    type: 'Souvenir AUG',
    name: 'Colony',
    quality: 'Well-Worn',
    marketPrice: 0.37,
    avgPrice: 0.30
}, {
    type: 'Souvenir AUG',
    name: 'Colony',
    quality: 'Battle-Scarred',
    marketPrice: 0.26,
    avgPrice: 0.26
}, {
    type: 'AUG',
    name: 'Condemned',
    quality: 'Factory New',
    marketPrice: 0.71,
    avgPrice: 0.69
}, {
    type: 'AUG',
    name: 'Condemned',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'AUG',
    name: 'Condemned',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'AUG',
    name: 'Condemned',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'AUG',
    name: 'Condemned',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir AUG',
    name: 'Condemned',
    quality: 'Minimal Wear',
    marketPrice: 45.00,
    avgPrice: 26.60
}, {
    type: 'Souvenir AUG',
    name: 'Condemned',
    quality: 'Field-Tested',
    marketPrice: 8.42,
    avgPrice: 7.59
}, {
    type: 'Souvenir AUG',
    name: 'Condemned',
    quality: 'Well-Worn',
    marketPrice: 11.96,
    avgPrice: 5.21
}, {
    type: 'Souvenir AUG',
    name: 'Condemned',
    quality: 'Battle-Scarred',
    marketPrice: 9.95,
    avgPrice: 7.31
}, {
    type: 'AUG',
    name: 'Contractor',
    quality: 'Factory New',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'AUG',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'AUG',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'AUG',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'AUG',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir AUG',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 2.56,
    avgPrice: 2.46
}, {
    type: 'Souvenir AUG',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.89,
    avgPrice: 0.90
}, {
    type: 'Souvenir AUG',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 4.16,
    avgPrice: 4.52
}, {
    type: 'Souvenir AUG',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 3.99,
    avgPrice: 2.51
}, {
    type: 'AUG',
    name: 'Copperhead',
    quality: 'Minimal Wear',
    marketPrice: 6.30,
    avgPrice: 5.63
}, {
    type: 'AUG',
    name: 'Copperhead',
    quality: 'Field-Tested',
    marketPrice: 3.56,
    avgPrice: 3.63
}, {
    type: 'AUG',
    name: 'Daedalus',
    quality: 'Factory New',
    marketPrice: 0.20,
    avgPrice: 0.20
}, {
    type: 'AUG',
    name: 'Daedalus',
    quality: 'Minimal Wear',
    marketPrice: 0.18,
    avgPrice: 0.15
}, {
    type: 'AUG',
    name: 'Daedalus',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.11
}, {
    type: 'AUG',
    name: 'Daedalus',
    quality: 'Well-Worn',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'AUG',
    name: 'Daedalus',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'AUG',
    name: 'Fleet Flock',
    quality: 'Factory New',
    marketPrice: 7.77,
    avgPrice: 5.85
}, {
    type: 'AUG',
    name: 'Fleet Flock',
    quality: 'Minimal Wear',
    marketPrice: 2.73,
    avgPrice: 2.55
}, {
    type: 'AUG',
    name: 'Fleet Flock',
    quality: 'Field-Tested',
    marketPrice: 1.78,
    avgPrice: 1.68
}, {
    type: 'AUG',
    name: 'Fleet Flock',
    quality: 'Well-Worn',
    marketPrice: 1.53,
    avgPrice: 1.48
}, {
    type: 'AUG',
    name: 'Fleet Flock',
    quality: 'Battle-Scarred',
    marketPrice: 1.68,
    avgPrice: 1.40
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Fleet Flock',
    quality: 'Factory New',
    marketPrice: 28.49,
    avgPrice: 25.55
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Fleet Flock',
    quality: 'Minimal Wear',
    marketPrice: 9.40,
    avgPrice: 8.31
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Fleet Flock',
    quality: 'Field-Tested',
    marketPrice: 4.88,
    avgPrice: 4.84
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Fleet Flock',
    quality: 'Well-Worn',
    marketPrice: 3.87,
    avgPrice: 3.87
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Fleet Flock',
    quality: 'Battle-Scarred',
    marketPrice: 3.82,
    avgPrice: 3.61
}, {
    type: 'AUG',
    name: 'Hot Rod',
    quality: 'Factory New',
    marketPrice: 67.75,
    avgPrice: 69.76
}, {
    type: 'AUG',
    name: 'Hot Rod',
    quality: 'Minimal Wear',
    marketPrice: 75.00,
    avgPrice: 53.85
}, {
    type: 'AUG',
    name: 'Radiation Hazard',
    quality: 'Factory New',
    marketPrice: 0.40,
    avgPrice: 0.39
}, {
    type: 'AUG',
    name: 'Radiation Hazard',
    quality: 'Minimal Wear',
    marketPrice: 0.21,
    avgPrice: 0.21
}, {
    type: 'AUG',
    name: 'Radiation Hazard',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'AUG',
    name: 'Radiation Hazard',
    quality: 'Well-Worn',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'AUG',
    name: 'Radiation Hazard',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Souvenir AUG',
    name: 'Radiation Hazard',
    quality: 'Factory New',
    marketPrice: 3.00,
    avgPrice: 2.62
}, {
    type: 'Souvenir AUG',
    name: 'Radiation Hazard',
    quality: 'Minimal Wear',
    marketPrice: 1.58,
    avgPrice: 1.24
}, {
    type: 'Souvenir AUG',
    name: 'Radiation Hazard',
    quality: 'Field-Tested',
    marketPrice: 0.81,
    avgPrice: 0.67
}, {
    type: 'Souvenir AUG',
    name: 'Radiation Hazard',
    quality: 'Well-Worn',
    marketPrice: 1.05,
    avgPrice: 0.99
}, {
    type: 'Souvenir AUG',
    name: 'Radiation Hazard',
    quality: 'Battle-Scarred',
    marketPrice: 0.77,
    avgPrice: 0.61
}, {
    type: 'AUG',
    name: 'Ricochet',
    quality: 'Factory New',
    marketPrice: 0.73,
    avgPrice: 0.71
}, {
    type: 'AUG',
    name: 'Ricochet',
    quality: 'Minimal Wear',
    marketPrice: 0.29,
    avgPrice: 0.27
}, {
    type: 'AUG',
    name: 'Ricochet',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'AUG',
    name: 'Ricochet',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'AUG',
    name: 'Ricochet',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Ricochet',
    quality: 'Factory New',
    marketPrice: 2.85,
    avgPrice: 2.92
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Ricochet',
    quality: 'Minimal Wear',
    marketPrice: 1.35,
    avgPrice: 1.26
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Ricochet',
    quality: 'Field-Tested',
    marketPrice: 0.78,
    avgPrice: 0.71
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Ricochet',
    quality: 'Well-Worn',
    marketPrice: 1.11,
    avgPrice: 1.12
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Ricochet',
    quality: 'Battle-Scarred',
    marketPrice: 0.65,
    avgPrice: 0.69
}, {
    type: 'AUG',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'AUG',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'AUG',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'AUG',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'AUG',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir AUG',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 2.96,
    avgPrice: 2.48
}, {
    type: 'Souvenir AUG',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.95,
    avgPrice: 1.13
}, {
    type: 'Souvenir AUG',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 2.58,
    avgPrice: 2.50
}, {
    type: 'Souvenir AUG',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 1.42,
    avgPrice: 1.38
}, {
    type: 'AUG',
    name: 'Torque',
    quality: 'Factory New',
    marketPrice: 1.06,
    avgPrice: 1.04
}, {
    type: 'AUG',
    name: 'Torque',
    quality: 'Minimal Wear',
    marketPrice: 0.76,
    avgPrice: 0.69
}, {
    type: 'AUG',
    name: 'Torque',
    quality: 'Field-Tested',
    marketPrice: 0.66,
    avgPrice: 0.56
}, {
    type: 'AUG',
    name: 'Torque',
    quality: 'Well-Worn',
    marketPrice: 0.57,
    avgPrice: 0.60
}, {
    type: 'AUG',
    name: 'Torque',
    quality: 'Battle-Scarred',
    marketPrice: 1.09,
    avgPrice: 0.87
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Torque',
    quality: 'Factory New',
    marketPrice: 4.60,
    avgPrice: 4.39
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Torque',
    quality: 'Minimal Wear',
    marketPrice: 2.44,
    avgPrice: 2.61
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Torque',
    quality: 'Field-Tested',
    marketPrice: 1.97,
    avgPrice: 1.83
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Torque',
    quality: 'Well-Worn',
    marketPrice: 2.11,
    avgPrice: 1.93
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Torque',
    quality: 'Battle-Scarred',
    marketPrice: 2.50,
    avgPrice: 2.54
}, {
    type: 'AUG',
    name: 'Wings',
    quality: 'Factory New',
    marketPrice: 0.82,
    avgPrice: 0.79
}, {
    type: 'AUG',
    name: 'Wings',
    quality: 'Minimal Wear',
    marketPrice: 0.87,
    avgPrice: 0.76
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Wings',
    quality: 'Factory New',
    marketPrice: 2.56,
    avgPrice: 2.18
}, {
    type: 'AUG',
    statTrak: true,
    name: 'Wings',
    quality: 'Minimal Wear',
    marketPrice: 2.43,
    avgPrice: 2.13
}, {
    type: 'AWP',
    name: 'Asiimov',
    quality: 'Field-Tested',
    marketPrice: 33.00,
    avgPrice: 31.91
}, {
    type: 'AWP',
    name: 'Asiimov',
    quality: 'Well-Worn',
    marketPrice: 28.25,
    avgPrice: 26.98
}, {
    type: 'AWP',
    name: 'Asiimov',
    quality: 'Battle-Scarred',
    marketPrice: 21.07,
    avgPrice: 20.87
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Field-Tested',
    marketPrice: 102.16,
    avgPrice: 103.51
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Well-Worn',
    marketPrice: 80.51,
    avgPrice: 79.04
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Battle-Scarred',
    marketPrice: 55.97,
    avgPrice: 54.78
}, {
    type: 'AWP',
    name: 'BOOM',
    quality: 'Factory New',
    marketPrice: 153.80,
    avgPrice: 144.66
}, {
    type: 'AWP',
    name: 'BOOM',
    quality: 'Minimal Wear',
    marketPrice: 20.77,
    avgPrice: 20.21
}, {
    type: 'AWP',
    name: 'BOOM',
    quality: 'Field-Tested',
    marketPrice: 16.60,
    avgPrice: 16.17
}, {
    type: 'AWP',
    statTrak: true,
    name: 'BOOM',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 347.50
}, {
    type: 'AWP',
    statTrak: true,
    name: 'BOOM',
    quality: 'Minimal Wear',
    marketPrice: 68.95,
    avgPrice: 77.48
}, {
    type: 'AWP',
    statTrak: true,
    name: 'BOOM',
    quality: 'Field-Tested',
    marketPrice: 52.21,
    avgPrice: 53.39
}, {
    type: 'AWP',
    name: 'Corticera',
    quality: 'Factory New',
    marketPrice: 10.67,
    avgPrice: 10.19
}, {
    type: 'AWP',
    name: 'Corticera',
    quality: 'Minimal Wear',
    marketPrice: 5.70,
    avgPrice: 5.37
}, {
    type: 'AWP',
    name: 'Corticera',
    quality: 'Field-Tested',
    marketPrice: 5.00,
    avgPrice: 4.91
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Corticera',
    quality: 'Factory New',
    marketPrice: 40.38,
    avgPrice: 40.20
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Corticera',
    quality: 'Minimal Wear',
    marketPrice: 21.13,
    avgPrice: 20.07
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Corticera',
    quality: 'Field-Tested',
    marketPrice: 17.62,
    avgPrice: 17.29
}, {
    type: 'AWP',
    name: 'Dragon Lore',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1838.75
}, {
    type: 'AWP',
    name: 'Dragon Lore',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1270.00
}, {
    type: 'AWP',
    name: 'Dragon Lore',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 906.25
}, {
    type: 'AWP',
    name: 'Dragon Lore',
    quality: 'Well-Worn',
    marketPrice: 0,
    avgPrice: 606.25
}, {
    type: 'AWP',
    name: 'Dragon Lore',
    quality: 'Battle-Scarred',
    marketPrice: 0,
    avgPrice: 568.75
}, {
    type: 'Souvenir AWP',
    name: 'Dragon Lore',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 9281.25
}, {
    type: 'Souvenir AWP',
    name: 'Dragon Lore',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 3703.75
}, {
    type: 'AWP',
    name: 'Electric Hive',
    quality: 'Factory New',
    marketPrice: 12.22,
    avgPrice: 11.88
}, {
    type: 'AWP',
    name: 'Electric Hive',
    quality: 'Minimal Wear',
    marketPrice: 10.50,
    avgPrice: 10.14
}, {
    type: 'AWP',
    name: 'Electric Hive',
    quality: 'Field-Tested',
    marketPrice: 8.64,
    avgPrice: 7.98
}, {
    type: 'AWP',
    name: 'Electric Hive',
    quality: 'Well-Worn',
    marketPrice: 10.00,
    avgPrice: 10.26
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Electric Hive',
    quality: 'Factory New',
    marketPrice: 53.51,
    avgPrice: 50.54
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Electric Hive',
    quality: 'Minimal Wear',
    marketPrice: 43.31,
    avgPrice: 37.38
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Electric Hive',
    quality: 'Field-Tested',
    marketPrice: 29.87,
    avgPrice: 27.68
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Electric Hive',
    quality: 'Well-Worn',
    marketPrice: 47.22,
    avgPrice: 41.79
}, {
    type: 'AWP',
    name: 'Elite Build',
    quality: 'Factory New',
    marketPrice: 11.85,
    avgPrice: 12.59
}, {
    type: 'AWP',
    name: 'Elite Build',
    quality: 'Minimal Wear',
    marketPrice: 7.10,
    avgPrice: 7.32
}, {
    type: 'AWP',
    name: 'Elite Build',
    quality: 'Field-Tested',
    marketPrice: 4.63,
    avgPrice: 4.58
}, {
    type: 'AWP',
    name: 'Elite Build',
    quality: 'Well-Worn',
    marketPrice: 4.03,
    avgPrice: 4.05
}, {
    type: 'AWP',
    name: 'Elite Build',
    quality: 'Battle-Scarred',
    marketPrice: 3.45,
    avgPrice: 3.42
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Factory New',
    marketPrice: 70.55,
    avgPrice: 50.76
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Minimal Wear',
    marketPrice: 28.87,
    avgPrice: 28.31
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Field-Tested',
    marketPrice: 17.45,
    avgPrice: 18.21
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Well-Worn',
    marketPrice: 15.13,
    avgPrice: 15.28
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Battle-Scarred',
    marketPrice: 14.17,
    avgPrice: 14.26
}, {
    type: 'AWP',
    name: 'Graphite',
    quality: 'Factory New',
    marketPrice: 38.30,
    avgPrice: 36.38
}, {
    type: 'AWP',
    name: 'Graphite',
    quality: 'Minimal Wear',
    marketPrice: 35.65,
    avgPrice: 35.78
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Graphite',
    quality: 'Factory New',
    marketPrice: 174.36,
    avgPrice: 179.15
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Graphite',
    quality: 'Minimal Wear',
    marketPrice: 172.13,
    avgPrice: 146.88
}, {
    type: 'AWP',
    name: 'Hyper Beast',
    quality: 'Factory New',
    marketPrice: 49.40,
    avgPrice: 47.10
}, {
    type: 'AWP',
    name: 'Hyper Beast',
    quality: 'Minimal Wear',
    marketPrice: 33.30,
    avgPrice: 31.92
}, {
    type: 'AWP',
    name: 'Hyper Beast',
    quality: 'Field-Tested',
    marketPrice: 22.00,
    avgPrice: 21.09
}, {
    type: 'AWP',
    name: 'Hyper Beast',
    quality: 'Well-Worn',
    marketPrice: 17.38,
    avgPrice: 16.93
}, {
    type: 'AWP',
    name: 'Hyper Beast',
    quality: 'Battle-Scarred',
    marketPrice: 10.35,
    avgPrice: 10.24
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Factory New',
    marketPrice: 165.48,
    avgPrice: 170.81
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Minimal Wear',
    marketPrice: 93.00,
    avgPrice: 99.15
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Field-Tested',
    marketPrice: 59.97,
    avgPrice: 58.04
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Well-Worn',
    marketPrice: 43.94,
    avgPrice: 42.26
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Battle-Scarred',
    marketPrice: 31.34,
    avgPrice: 31.64
}, {
    type: 'AWP',
    name: 'Lightning Strike',
    quality: 'Factory New',
    marketPrice: 52.56,
    avgPrice: 46.81
}, {
    type: 'AWP',
    name: 'Lightning Strike',
    quality: 'Minimal Wear',
    marketPrice: 55.54,
    avgPrice: 63.08
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Lightning Strike',
    quality: 'Factory New',
    marketPrice: 204.30,
    avgPrice: 187.41
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Lightning Strike',
    quality: 'Minimal Wear',
    marketPrice: 253.70,
    avgPrice: 208.43
}, {
    type: 'AWP',
    name: 'Man-o\'-war',
    quality: 'Minimal Wear',
    marketPrice: 9.32,
    avgPrice: 9.18
}, {
    type: 'AWP',
    name: 'Man-o\'-war',
    quality: 'Field-Tested',
    marketPrice: 8.79,
    avgPrice: 8.94
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Man-o\'-war',
    quality: 'Minimal Wear',
    marketPrice: 29.25,
    avgPrice: 31.01
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Man-o\'-war',
    quality: 'Field-Tested',
    marketPrice: 29.81,
    avgPrice: 28.24
}, {
    type: 'AWP',
    name: 'Medusa',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1237.50
}, {
    type: 'AWP',
    name: 'Medusa',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 590.00
}, {
    type: 'AWP',
    name: 'Medusa',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 440.00
}, {
    type: 'AWP',
    name: 'Medusa',
    quality: 'Well-Worn',
    marketPrice: 0,
    avgPrice: 428.75
}, {
    type: 'AWP',
    name: 'Medusa',
    quality: 'Battle-Scarred',
    marketPrice: 0,
    avgPrice: 428.75
}, {
    type: 'AWP',
    name: 'Phobos',
    quality: 'Factory New',
    marketPrice: 6.55,
    avgPrice: 7.17
}, {
    type: 'AWP',
    name: 'Phobos',
    quality: 'Minimal Wear',
    marketPrice: 5.45,
    avgPrice: 5.56
}, {
    type: 'AWP',
    name: 'Phobos',
    quality: 'Field-Tested',
    marketPrice: 4.50,
    avgPrice: 4.93
}, {
    type: 'AWP',
    name: 'Phobos',
    quality: 'Well-Worn',
    marketPrice: 6.17,
    avgPrice: 5.79
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phobos',
    quality: 'Factory New',
    marketPrice: 25.54,
    avgPrice: 24.51
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phobos',
    quality: 'Minimal Wear',
    marketPrice: 19.00,
    avgPrice: 18.80
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phobos',
    quality: 'Field-Tested',
    marketPrice: 16.11,
    avgPrice: 16.14
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phobos',
    quality: 'Well-Worn',
    marketPrice: 33.29,
    avgPrice: 18.92
}, {
    type: 'AWP',
    name: 'Pink DDPAT',
    quality: 'Factory New',
    marketPrice: 67.75,
    avgPrice: 60.99
}, {
    type: 'AWP',
    name: 'Pink DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 16.99,
    avgPrice: 16.81
}, {
    type: 'AWP',
    name: 'Pink DDPAT',
    quality: 'Field-Tested',
    marketPrice: 9.98,
    avgPrice: 9.78
}, {
    type: 'AWP',
    name: 'Pink DDPAT',
    quality: 'Well-Worn',
    marketPrice: 10.31,
    avgPrice: 9.74
}, {
    type: 'AWP',
    name: 'Pink DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 7.66,
    avgPrice: 7.49
}, {
    type: 'Souvenir AWP',
    name: 'Pink DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 301.25,
    avgPrice: 293.79
}, {
    type: 'Souvenir AWP',
    name: 'Pink DDPAT',
    quality: 'Field-Tested',
    marketPrice: 105.39,
    avgPrice: 103.91
}, {
    type: 'Souvenir AWP',
    name: 'Pink DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0,
    avgPrice: 100.54
}, {
    type: 'Souvenir AWP',
    name: 'Pink DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 93.29,
    avgPrice: 79.55
}, {
    type: 'AWP',
    name: 'Pit Viper',
    quality: 'Minimal Wear',
    marketPrice: 1.50,
    avgPrice: 1.57
}, {
    type: 'AWP',
    name: 'Pit Viper',
    quality: 'Field-Tested',
    marketPrice: 0.83,
    avgPrice: 0.83
}, {
    type: 'AWP',
    name: 'Pit Viper',
    quality: 'Well-Worn',
    marketPrice: 1.30,
    avgPrice: 1.28
}, {
    type: 'AWP',
    name: 'Pit Viper',
    quality: 'Battle-Scarred',
    marketPrice: 1.22,
    avgPrice: 1.15
}, {
    type: 'Souvenir AWP',
    name: 'Pit Viper',
    quality: 'Minimal Wear',
    marketPrice: 166.58,
    avgPrice: 127.85
}, {
    type: 'Souvenir AWP',
    name: 'Pit Viper',
    quality: 'Field-Tested',
    marketPrice: 44.43,
    avgPrice: 46.17
}, {
    type: 'AWP',
    name: 'Redline',
    quality: 'Minimal Wear',
    marketPrice: 13.20,
    avgPrice: 12.90
}, {
    type: 'AWP',
    name: 'Redline',
    quality: 'Field-Tested',
    marketPrice: 8.11,
    avgPrice: 8.20
}, {
    type: 'AWP',
    name: 'Redline',
    quality: 'Well-Worn',
    marketPrice: 11.30,
    avgPrice: 10.68
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Redline',
    quality: 'Minimal Wear',
    marketPrice: 44.69,
    avgPrice: 47.29
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Redline',
    quality: 'Field-Tested',
    marketPrice: 26.70,
    avgPrice: 28.08
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Redline',
    quality: 'Well-Worn',
    marketPrice: 33.13,
    avgPrice: 29.72
}, {
    type: 'AWP',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 1.91,
    avgPrice: 2.26
}, {
    type: 'AWP',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.32
}, {
    type: 'AWP',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'AWP',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.17
}, {
    type: 'AWP',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.38,
    avgPrice: 0.36
}, {
    type: 'Souvenir AWP',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 63.82,
    avgPrice: 56.03
}, {
    type: 'Souvenir AWP',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 38.91,
    avgPrice: 27.23
}, {
    type: 'Souvenir AWP',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 29.99,
    avgPrice: 34.78
}, {
    type: 'Souvenir AWP',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 46.00,
    avgPrice: 38.04
}, {
    type: 'AWP',
    name: 'Snake Camo',
    quality: 'Factory New',
    marketPrice: 41.00,
    avgPrice: 36.78
}, {
    type: 'AWP',
    name: 'Snake Camo',
    quality: 'Minimal Wear',
    marketPrice: 5.68,
    avgPrice: 5.47
}, {
    type: 'AWP',
    name: 'Snake Camo',
    quality: 'Field-Tested',
    marketPrice: 3.35,
    avgPrice: 3.53
}, {
    type: 'AWP',
    name: 'Snake Camo',
    quality: 'Well-Worn',
    marketPrice: 3.33,
    avgPrice: 3.54
}, {
    type: 'AWP',
    name: 'Snake Camo',
    quality: 'Battle-Scarred',
    marketPrice: 4.09,
    avgPrice: 3.77
}, {
    type: 'AWP',
    name: 'Sun in Leo',
    quality: 'Factory New',
    marketPrice: 4.57,
    avgPrice: 4.49
}, {
    type: 'AWP',
    name: 'Sun in Leo',
    quality: 'Minimal Wear',
    marketPrice: 3.11,
    avgPrice: 3.17
}, {
    type: 'AWP',
    name: 'Sun in Leo',
    quality: 'Field-Tested',
    marketPrice: 1.78,
    avgPrice: 1.81
}, {
    type: 'AWP',
    name: 'Sun in Leo',
    quality: 'Well-Worn',
    marketPrice: 2.33,
    avgPrice: 2.19
}, {
    type: 'AWP',
    name: 'Sun in Leo',
    quality: 'Battle-Scarred',
    marketPrice: 1.66,
    avgPrice: 1.71
}, {
    type: 'AWP',
    name: 'Worm God',
    quality: 'Factory New',
    marketPrice: 1.49,
    avgPrice: 1.41
}, {
    type: 'AWP',
    name: 'Worm God',
    quality: 'Minimal Wear',
    marketPrice: 0.93,
    avgPrice: 0.88
}, {
    type: 'AWP',
    name: 'Worm God',
    quality: 'Field-Tested',
    marketPrice: 0.80,
    avgPrice: 0.77
}, {
    type: 'AWP',
    name: 'Worm God',
    quality: 'Well-Worn',
    marketPrice: 0.95,
    avgPrice: 0.93
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Worm God',
    quality: 'Factory New',
    marketPrice: 6.34,
    avgPrice: 5.97
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Worm God',
    quality: 'Minimal Wear',
    marketPrice: 4.45,
    avgPrice: 4.34
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Worm God',
    quality: 'Field-Tested',
    marketPrice: 4.05,
    avgPrice: 4.00
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Worm God',
    quality: 'Well-Worn',
    marketPrice: 5.20,
    avgPrice: 4.59
}, {
    type: 'Bayonet',
    name: 'Autotronic',
    quality: 'Minimal Wear',
    marketPrice: 326.49,
    avgPrice: 428.75
}, {
    type: 'Bayonet',
    name: 'Autotronic',
    quality: 'Field-Tested',
    marketPrice: 305.00,
    avgPrice: 275.82
}, {
    type: 'Bayonet',
    name: 'Autotronic',
    quality: 'Well-Worn',
    marketPrice: 275.00,
    avgPrice: 256.93
}, {
    type: 'Bayonet',
    name: 'Autotronic',
    quality: 'Battle-Scarred',
    marketPrice: 404.59,
    avgPrice: 316.29
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Autotronic',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1290.00
}, {
    type: 'Bayonet',
    name: 'Black Laminate',
    quality: 'Minimal Wear',
    marketPrice: 244.31,
    avgPrice: 202.00
}, {
    type: 'Bayonet',
    name: 'Black Laminate',
    quality: 'Field-Tested',
    marketPrice: 172.50,
    avgPrice: 184.29
}, {
    type: 'Bayonet',
    name: 'Black Laminate',
    quality: 'Well-Worn',
    marketPrice: 184.61,
    avgPrice: 163.58
}, {
    type: 'Bayonet',
    name: 'Black Laminate',
    quality: 'Battle-Scarred',
    marketPrice: 180.51,
    avgPrice: 158.44
}, {
    type: 'Bayonet',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 224.76,
    avgPrice: 284.59
}, {
    type: 'Bayonet',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 105.81,
    avgPrice: 115.75
}, {
    type: 'Bayonet',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 108.60,
    avgPrice: 103.12
}, {
    type: 'Bayonet',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 104.00,
    avgPrice: 98.98
}, {
    type: 'Bayonet',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 97.25,
    avgPrice: 96.34
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 523.75
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 202.29,
    avgPrice: 194.42
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 154.92,
    avgPrice: 138.63
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 139.11,
    avgPrice: 130.09
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 111.05,
    avgPrice: 122.80
}, {
    type: 'Bayonet',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 222.09,
    avgPrice: 215.64
}, {
    type: 'Bayonet',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 86.34,
    avgPrice: 81.44
}, {
    type: 'Bayonet',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 60.00,
    avgPrice: 59.42
}, {
    type: 'Bayonet',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 63.85,
    avgPrice: 113.71
}, {
    type: 'Bayonet',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 62.62,
    avgPrice: 56.61
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 126.58,
    avgPrice: 106.04
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 80.86,
    avgPrice: 69.73
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 229.86,
    avgPrice: 263.46
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 80.52,
    avgPrice: 77.90
}, {
    type: 'Bayonet',
    name: 'Bright Water',
    quality: 'Factory New',
    marketPrice: 269.95,
    avgPrice: 199.69
}, {
    type: 'Bayonet',
    name: 'Bright Water',
    quality: 'Minimal Wear',
    marketPrice: 155.49,
    avgPrice: 137.94
}, {
    type: 'Bayonet',
    name: 'Bright Water',
    quality: 'Field-Tested',
    marketPrice: 115.00,
    avgPrice: 95.51
}, {
    type: 'Bayonet',
    name: 'Bright Water',
    quality: 'Battle-Scarred',
    marketPrice: 77.88,
    avgPrice: 72.05
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Bright Water',
    quality: 'Field-Tested',
    marketPrice: 153.01,
    avgPrice: 116.58
}, {
    type: 'Bayonet',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 220.99,
    avgPrice: 201.67
}, {
    type: 'Bayonet',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 144.00,
    avgPrice: 141.50
}, {
    type: 'Bayonet',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 113.66,
    avgPrice: 112.80
}, {
    type: 'Bayonet',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 111.71,
    avgPrice: 109.20
}, {
    type: 'Bayonet',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 108.53,
    avgPrice: 107.92
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1387.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 239.00,
    avgPrice: 250.09
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 185.00,
    avgPrice: 174.25
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 167.29,
    avgPrice: 143.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 164.35,
    avgPrice: 157.53
}, {
    type: 'Bayonet',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1531.25
}, {
    type: 'Bayonet',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 201.77,
    avgPrice: 201.95
}, {
    type: 'Bayonet',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 97.75,
    avgPrice: 94.67
}, {
    type: 'Bayonet',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 116.61,
    avgPrice: 109.55
}, {
    type: 'Bayonet',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 94.39,
    avgPrice: 88.57
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 417.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 140.47,
    avgPrice: 136.47
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 240.00,
    avgPrice: 212.98
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 166.75,
    avgPrice: 126.19
}, {
    type: 'Bayonet',
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 144.30,
    avgPrice: 143.76
}, {
    type: 'Bayonet',
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 127.70,
    avgPrice: 124.14
}, {
    type: 'Bayonet',
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 112.28,
    avgPrice: 109.57
}, {
    type: 'Bayonet',
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 124.62,
    avgPrice: 107.11
}, {
    type: 'Bayonet',
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 133.40,
    avgPrice: 128.99
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 255.00,
    avgPrice: 335.25
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 254.76,
    avgPrice: 195.00
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 161.00,
    avgPrice: 169.69
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 159.00,
    avgPrice: 138.68
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 175.45,
    avgPrice: 182.21
}, {
    type: 'Bayonet',
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 227.65,
    avgPrice: 257.50
}, {
    type: 'Bayonet',
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 244.31,
    avgPrice: 222.60
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 329.65,
    avgPrice: 425.00
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 345.00,
    avgPrice: 353.75
}, {
    type: 'Bayonet',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 243.20,
    avgPrice: 233.20
}, {
    type: 'Bayonet',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 394.23,
    avgPrice: 316.29
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 413.12,
    avgPrice: 393.75
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 398.60,
    avgPrice: 381.25
}, {
    type: 'Bayonet',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 359.53,
    avgPrice: 191.17
}, {
    type: 'Bayonet',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 75.41,
    avgPrice: 75.22
}, {
    type: 'Bayonet',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 63.31,
    avgPrice: 59.32
}, {
    type: 'Bayonet',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 61.30,
    avgPrice: 60.02
}, {
    type: 'Bayonet',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 60.87,
    avgPrice: 58.36
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 766.25
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 119.94,
    avgPrice: 129.53
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 80.91,
    avgPrice: 73.33
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 92.55,
    avgPrice: 73.05
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 94.08,
    avgPrice: 84.13
}, {
    type: 'Bayonet',
    name: 'Freehand',
    quality: 'Factory New',
    marketPrice: 320.00,
    avgPrice: 287.82
}, {
    type: 'Bayonet',
    name: 'Freehand',
    quality: 'Minimal Wear',
    marketPrice: 217.77,
    avgPrice: 241.21
}, {
    type: 'Bayonet',
    name: 'Freehand',
    quality: 'Field-Tested',
    marketPrice: 183.73,
    avgPrice: 173.72
}, {
    type: 'Bayonet',
    name: 'Freehand',
    quality: 'Well-Worn',
    marketPrice: 165.94,
    avgPrice: 153.22
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Freehand',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 2152.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Freehand',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1291.25
}, {
    type: 'Bayonet',
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1247.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 998.75
}, {
    type: 'Bayonet',
    name: 'Lore',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1118.75
}, {
    type: 'Bayonet',
    name: 'Lore',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 750.00
}, {
    type: 'Bayonet',
    name: 'Lore',
    quality: 'Field-Tested',
    marketPrice: 334.36,
    avgPrice: 431.25
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Lore',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1253.75
}, {
    type: 'Bayonet',
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 364.98,
    avgPrice: 387.50
}, {
    type: 'Bayonet',
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 390.00,
    avgPrice: 605.00
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 561.25
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 398.08,
    avgPrice: 737.50
}, {
    type: 'Bayonet',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 912.50
}, {
    type: 'Bayonet',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 138.00,
    avgPrice: 121.69
}, {
    type: 'Bayonet',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 78.85,
    avgPrice: 74.31
}, {
    type: 'Bayonet',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 87.49,
    avgPrice: 72.96
}, {
    type: 'Bayonet',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 76.62,
    avgPrice: 74.25
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 3500.00
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 259.24,
    avgPrice: 231.16
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 102.16,
    avgPrice: 102.78
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 122.15,
    avgPrice: 105.98
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 102.16,
    avgPrice: 94.76
}, {
    type: 'Bayonet',
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 100.00,
    avgPrice: 90.03
}, {
    type: 'Bayonet',
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 83.29,
    avgPrice: 80.81
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 175.20,
    avgPrice: 687.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 131.03,
    avgPrice: 117.25
}, {
    type: 'Bayonet',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 197.62,
    avgPrice: 135.25
}, {
    type: 'Bayonet',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 71.65,
    avgPrice: 68.33
}, {
    type: 'Bayonet',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 58.53,
    avgPrice: 57.06
}, {
    type: 'Bayonet',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 61.07,
    avgPrice: 57.80
}, {
    type: 'Bayonet',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 60.00,
    avgPrice: 58.67
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 103.06,
    avgPrice: 87.05
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 75.00,
    avgPrice: 69.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 100.71,
    avgPrice: 97.12
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 140.47,
    avgPrice: 80.08
}, {
    type: 'Bayonet',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 340.00,
    avgPrice: 130.93
}, {
    type: 'Bayonet',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 79.42,
    avgPrice: 80.87
}, {
    type: 'Bayonet',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 59.97,
    avgPrice: 59.49
}, {
    type: 'Bayonet',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 74.77,
    avgPrice: 60.96
}, {
    type: 'Bayonet',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 62.12,
    avgPrice: 64.12
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1837.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 138.00,
    avgPrice: 122.53
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 103.75,
    avgPrice: 84.76
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 97.72,
    avgPrice: 91.03
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 86.61,
    avgPrice: 82.79
}, {
    type: 'Bayonet',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 233.10,
    avgPrice: 231.16
}, {
    type: 'Bayonet',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 175.50,
    avgPrice: 176.36
}, {
    type: 'Bayonet',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 163.30,
    avgPrice: 146.88
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 384.51,
    avgPrice: 412.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 255.41,
    avgPrice: 296.25
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 226.52,
    avgPrice: 189.52
}, {
    type: 'Bayonet',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 134.10,
    avgPrice: 122.76
}, {
    type: 'Bayonet',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 97.49,
    avgPrice: 94.44
}, {
    type: 'Bayonet',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 85.00,
    avgPrice: 86.48
}, {
    type: 'Bayonet',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 80.00,
    avgPrice: 80.57
}, {
    type: 'Bayonet',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 82.18,
    avgPrice: 76.72
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 308.38,
    avgPrice: 287.50
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 130.56,
    avgPrice: 142.31
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 117.72,
    avgPrice: 114.98
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 120.00,
    avgPrice: 137.28
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 103.07,
    avgPrice: 110.83
}, {
    type: 'Bayonet',
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 299.70,
    avgPrice: 305.00
}, {
    type: 'Bayonet',
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 289.25,
    avgPrice: 298.75
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 395.00
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 938.75
}, {
    type: 'Bayonet',
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 846.25
}, {
    type: 'Bayonet',
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 125.49,
    avgPrice: 132.58
}, {
    type: 'Bayonet',
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 68.85,
    avgPrice: 72.33
}, {
    type: 'Bayonet',
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 74.00,
    avgPrice: 72.20
}, {
    type: 'Bayonet',
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 68.00,
    avgPrice: 68.78
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 188.78,
    avgPrice: 188.58
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 90.63,
    avgPrice: 89.13
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 110.99,
    avgPrice: 114.86
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 266.51,
    avgPrice: 99.95
}, {
    type: 'Bayonet',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 155.08,
    avgPrice: 130.14
}, {
    type: 'Bayonet',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 86.96,
    avgPrice: 80.67
}, {
    type: 'Bayonet',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 65.98,
    avgPrice: 61.95
}, {
    type: 'Bayonet',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 69.82,
    avgPrice: 66.61
}, {
    type: 'Bayonet',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 63.31,
    avgPrice: 63.17
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1000.00
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 114.27,
    avgPrice: 102.76
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 77.01,
    avgPrice: 73.68
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 131.53,
    avgPrice: 152.72
}, {
    type: 'Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 89.99,
    avgPrice: 83.99
}, {
    type: 'Bayonet',
    name: '',
    quality: '',
    marketPrice: 127.59,
    avgPrice: 123.81
}, {
    type: 'Bayonet',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 188.90,
    avgPrice: 175.59
}, {
    type: 'Butterfly Knife',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 236.85,
    avgPrice: 161.92
}, {
    type: 'Butterfly Knife',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 122.84,
    avgPrice: 118.03
}, {
    type: 'Butterfly Knife',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 105.16,
    avgPrice: 103.60
}, {
    type: 'Butterfly Knife',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 99.48,
    avgPrice: 99.61
}, {
    type: 'Butterfly Knife',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 103.29,
    avgPrice: 98.00
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 718.75
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 249.95,
    avgPrice: 256.68
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 163.66,
    avgPrice: 159.94
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 194.36,
    avgPrice: 285.17
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 178.78,
    avgPrice: 148.56
}, {
    type: 'Butterfly Knife',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 199.90,
    avgPrice: 159.93
}, {
    type: 'Butterfly Knife',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 90.00,
    avgPrice: 87.87
}, {
    type: 'Butterfly Knife',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 74.41,
    avgPrice: 72.74
}, {
    type: 'Butterfly Knife',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 73.29,
    avgPrice: 72.60
}, {
    type: 'Butterfly Knife',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 65.28,
    avgPrice: 63.78
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 377.56,
    avgPrice: 253.40
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 147.34,
    avgPrice: 138.80
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 112.87,
    avgPrice: 106.04
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 128.69,
    avgPrice: 89.42
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 83.58,
    avgPrice: 79.87
}, {
    type: 'Butterfly Knife',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 248.99,
    avgPrice: 229.84
}, {
    type: 'Butterfly Knife',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 129.99,
    avgPrice: 134.78
}, {
    type: 'Butterfly Knife',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 111.00,
    avgPrice: 113.92
}, {
    type: 'Butterfly Knife',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 119.97,
    avgPrice: 105.04
}, {
    type: 'Butterfly Knife',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 97.00,
    avgPrice: 99.52
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 762.50
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 242.00,
    avgPrice: 238.83
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 188.78,
    avgPrice: 174.95
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 215.00,
    avgPrice: 237.43
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 194.12,
    avgPrice: 197.08
}, {
    type: 'Butterfly Knife',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 975.00
}, {
    type: 'Butterfly Knife',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 198.95,
    avgPrice: 214.00
}, {
    type: 'Butterfly Knife',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 119.00,
    avgPrice: 115.19
}, {
    type: 'Butterfly Knife',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 113.48,
    avgPrice: 113.94
}, {
    type: 'Butterfly Knife',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 80.52,
    avgPrice: 82.05
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 407.17,
    avgPrice: 491.25
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 168.82,
    avgPrice: 177.35
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 199.22,
    avgPrice: 194.32
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 140.00,
    avgPrice: 118.11
}, {
    type: 'Butterfly Knife',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 230.00,
    avgPrice: 228.96
}, {
    type: 'Butterfly Knife',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 352.01,
    avgPrice: 277.67
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 345.00,
    avgPrice: 393.75
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 391.92,
    avgPrice: 527.50
}, {
    type: 'Butterfly Knife',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 209.72,
    avgPrice: 130.18
}, {
    type: 'Butterfly Knife',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 89.50,
    avgPrice: 83.59
}, {
    type: 'Butterfly Knife',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 69.08,
    avgPrice: 66.60
}, {
    type: 'Butterfly Knife',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 71.35,
    avgPrice: 64.65
}, {
    type: 'Butterfly Knife',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 65.32,
    avgPrice: 64.50
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 878.75
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 131.92,
    avgPrice: 168.66
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 98.75,
    avgPrice: 96.41
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 164.11,
    avgPrice: 103.87
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 114.49,
    avgPrice: 171.19
}, {
    type: 'Butterfly Knife',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 593.75
}, {
    type: 'Butterfly Knife',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 149.50,
    avgPrice: 148.90
}, {
    type: 'Butterfly Knife',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 94.26,
    avgPrice: 86.98
}, {
    type: 'Butterfly Knife',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 93.38,
    avgPrice: 94.17
}, {
    type: 'Butterfly Knife',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 78.17,
    avgPrice: 74.98
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 320.22,
    avgPrice: 303.83
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 124.00,
    avgPrice: 127.90
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 126.00,
    avgPrice: 138.54
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 129.95,
    avgPrice: 148.29
}, {
    type: 'Butterfly Knife',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 130.00,
    avgPrice: 142.94
}, {
    type: 'Butterfly Knife',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 74.41,
    avgPrice: 70.78
}, {
    type: 'Butterfly Knife',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 63.31,
    avgPrice: 62.79
}, {
    type: 'Butterfly Knife',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 66.50,
    avgPrice: 65.85
}, {
    type: 'Butterfly Knife',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 63.85,
    avgPrice: 61.75
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 150.02,
    avgPrice: 111.32
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 88.80,
    avgPrice: 87.43
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 99.62,
    avgPrice: 82.32
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 86.18,
    avgPrice: 74.22
}, {
    type: 'Butterfly Knife',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 178.95,
    avgPrice: 172.25
}, {
    type: 'Butterfly Knife',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 88.12,
    avgPrice: 82.72
}, {
    type: 'Butterfly Knife',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 66.98,
    avgPrice: 65.67
}, {
    type: 'Butterfly Knife',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 66.37,
    avgPrice: 68.80
}, {
    type: 'Butterfly Knife',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 68.94,
    avgPrice: 61.89
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 392.79,
    avgPrice: 697.50
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 138.82,
    avgPrice: 141.91
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 82.40,
    avgPrice: 110.27
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 86.14,
    avgPrice: 93.56
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 109.40,
    avgPrice: 103.65
}, {
    type: 'Butterfly Knife',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 220.50,
    avgPrice: 221.78
}, {
    type: 'Butterfly Knife',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 199.90,
    avgPrice: 185.63
}, {
    type: 'Butterfly Knife',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 165.95,
    avgPrice: 160.72
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 500.00
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 294.03,
    avgPrice: 312.50
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 279.99,
    avgPrice: 269.27
}, {
    type: 'Butterfly Knife',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 140.47,
    avgPrice: 128.43
}, {
    type: 'Butterfly Knife',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 93.03,
    avgPrice: 90.85
}, {
    type: 'Butterfly Knife',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 80.91,
    avgPrice: 82.37
}, {
    type: 'Butterfly Knife',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 83.00,
    avgPrice: 80.79
}, {
    type: 'Butterfly Knife',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 86.62,
    avgPrice: 77.39
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 399.78,
    avgPrice: 348.13
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 147.70,
    avgPrice: 144.12
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 120.00,
    avgPrice: 120.03
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 134.10,
    avgPrice: 255.24
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 138.73,
    avgPrice: 91.11
}, {
    type: 'Butterfly Knife',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 245.08,
    avgPrice: 204.84
}, {
    type: 'Butterfly Knife',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 85.51,
    avgPrice: 84.06
}, {
    type: 'Butterfly Knife',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 70.52,
    avgPrice: 67.01
}, {
    type: 'Butterfly Knife',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 67.46,
    avgPrice: 67.63
}, {
    type: 'Butterfly Knife',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 66.64,
    avgPrice: 63.06
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 135.48,
    avgPrice: 124.99
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 95.80,
    avgPrice: 87.53
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 119.71,
    avgPrice: 212.40
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 101.00,
    avgPrice: 102.93
}, {
    type: 'Butterfly Knife',
    name: '',
    quality: '',
    marketPrice: 111.03,
    avgPrice: 115.72
}, {
    type: 'Butterfly Knife',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 171.77,
    avgPrice: 163.36
}, {
    type: 'CZ75-Auto',
    name: 'Army Sheen',
    quality: 'Factory New',
    marketPrice: 0.19,
    avgPrice: 0.16
}, {
    type: 'CZ75-Auto',
    name: 'Army Sheen',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.05
}, {
    type: 'CZ75-Auto',
    name: 'Army Sheen',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'CZ75-Auto',
    name: 'Chalice',
    quality: 'Factory New',
    marketPrice: 23.87,
    avgPrice: 21.15
}, {
    type: 'CZ75-Auto',
    name: 'Chalice',
    quality: 'Minimal Wear',
    marketPrice: 21.50,
    avgPrice: 20.75
}, {
    type: 'Souvenir CZ75-Auto',
    name: 'Chalice',
    quality: 'Factory New',
    marketPrice: 20.98,
    avgPrice: 23.13
}, {
    type: 'Souvenir CZ75-Auto',
    name: 'Chalice',
    quality: 'Minimal Wear',
    marketPrice: 32.21,
    avgPrice: 27.02
}, {
    type: 'CZ75-Auto',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 5.75,
    avgPrice: 6.42
}, {
    type: 'CZ75-Auto',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 0.62,
    avgPrice: 0.59
}, {
    type: 'CZ75-Auto',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.20
}, {
    type: 'CZ75-Auto',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.39
}, {
    type: 'CZ75-Auto',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.20
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 90.64,
    avgPrice: 77.00
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 3.06,
    avgPrice: 3.36
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 0.73,
    avgPrice: 0.67
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 0.85,
    avgPrice: 0.76
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 0.60,
    avgPrice: 0.61
}, {
    type: 'CZ75-Auto',
    name: 'Emerald',
    quality: 'Factory New',
    marketPrice: 1.61,
    avgPrice: 1.43
}, {
    type: 'CZ75-Auto',
    name: 'Emerald',
    quality: 'Minimal Wear',
    marketPrice: 2.93,
    avgPrice: 2.30
}, {
    type: 'CZ75-Auto',
    name: 'Green Plaid',
    quality: 'Factory New',
    marketPrice: 0.77,
    avgPrice: 2.97
}, {
    type: 'CZ75-Auto',
    name: 'Green Plaid',
    quality: 'Minimal Wear',
    marketPrice: 0.21,
    avgPrice: 0.21
}, {
    type: 'CZ75-Auto',
    name: 'Green Plaid',
    quality: 'Field-Tested',
    marketPrice: 0.27,
    avgPrice: 0.26
}, {
    type: 'CZ75-Auto',
    name: 'Green Plaid',
    quality: 'Well-Worn',
    marketPrice: 0.39,
    avgPrice: 0.38
}, {
    type: 'CZ75-Auto',
    name: 'Green Plaid',
    quality: 'Battle-Scarred',
    marketPrice: 1.27,
    avgPrice: 1.10
}, {
    type: 'CZ75-Auto',
    name: 'Hexane',
    quality: 'Factory New',
    marketPrice: 0.74,
    avgPrice: 0.72
}, {
    type: 'CZ75-Auto',
    name: 'Hexane',
    quality: 'Minimal Wear',
    marketPrice: 0.31,
    avgPrice: 0.27
}, {
    type: 'CZ75-Auto',
    name: 'Hexane',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.16
}, {
    type: 'CZ75-Auto',
    name: 'Hexane',
    quality: 'Well-Worn',
    marketPrice: 0.28,
    avgPrice: 0.27
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Hexane',
    quality: 'Factory New',
    marketPrice: 3.52,
    avgPrice: 3.69
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Hexane',
    quality: 'Minimal Wear',
    marketPrice: 0.89,
    avgPrice: 0.89
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Hexane',
    quality: 'Field-Tested',
    marketPrice: 0.48,
    avgPrice: 0.43
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Hexane',
    quality: 'Well-Worn',
    marketPrice: 1.17,
    avgPrice: 1.14
}, {
    type: 'CZ75-Auto',
    name: 'Nitro',
    quality: 'Factory New',
    marketPrice: 10.55,
    avgPrice: 7.76
}, {
    type: 'CZ75-Auto',
    name: 'Nitro',
    quality: 'Minimal Wear',
    marketPrice: 2.14,
    avgPrice: 1.73
}, {
    type: 'CZ75-Auto',
    name: 'Nitro',
    quality: 'Field-Tested',
    marketPrice: 1.10,
    avgPrice: 1.07
}, {
    type: 'CZ75-Auto',
    name: 'Nitro',
    quality: 'Well-Worn',
    marketPrice: 1.01,
    avgPrice: 1.01
}, {
    type: 'CZ75-Auto',
    name: 'Nitro',
    quality: 'Battle-Scarred',
    marketPrice: 0.80,
    avgPrice: 0.93
}, {
    type: 'Souvenir CZ75-Auto',
    name: 'Nitro',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 95.05
}, {
    type: 'Souvenir CZ75-Auto',
    name: 'Nitro',
    quality: 'Minimal Wear',
    marketPrice: 15.24,
    avgPrice: 12.26
}, {
    type: 'Souvenir CZ75-Auto',
    name: 'Nitro',
    quality: 'Field-Tested',
    marketPrice: 4.10,
    avgPrice: 4.32
}, {
    type: 'Souvenir CZ75-Auto',
    name: 'Nitro',
    quality: 'Well-Worn',
    marketPrice: 7.01,
    avgPrice: 5.50
}, {
    type: 'Souvenir CZ75-Auto',
    name: 'Nitro',
    quality: 'Battle-Scarred',
    marketPrice: 5.09,
    avgPrice: 4.06
}, {
    type: 'CZ75-Auto',
    name: 'Poison Dart',
    quality: 'Factory New',
    marketPrice: 1.67,
    avgPrice: 1.56
}, {
    type: 'CZ75-Auto',
    name: 'Poison Dart',
    quality: 'Minimal Wear',
    marketPrice: 0.76,
    avgPrice: 0.69
}, {
    type: 'CZ75-Auto',
    name: 'Poison Dart',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.30
}, {
    type: 'CZ75-Auto',
    name: 'Poison Dart',
    quality: 'Well-Worn',
    marketPrice: 0.97,
    avgPrice: 1.13
}, {
    type: 'CZ75-Auto',
    name: 'Poison Dart',
    quality: 'Battle-Scarred',
    marketPrice: 0.51,
    avgPrice: 0.52
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Poison Dart',
    quality: 'Factory New',
    marketPrice: 4.92,
    avgPrice: 4.69
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Poison Dart',
    quality: 'Minimal Wear',
    marketPrice: 1.87,
    avgPrice: 1.87
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Poison Dart',
    quality: 'Field-Tested',
    marketPrice: 0.75,
    avgPrice: 0.70
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Poison Dart',
    quality: 'Well-Worn',
    marketPrice: 7.66,
    avgPrice: 3.21
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Poison Dart',
    quality: 'Battle-Scarred',
    marketPrice: 1.15,
    avgPrice: 1.22
}, {
    type: 'CZ75-Auto',
    name: 'Pole Position',
    quality: 'Factory New',
    marketPrice: 0.58,
    avgPrice: 0.52
}, {
    type: 'CZ75-Auto',
    name: 'Pole Position',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.29
}, {
    type: 'CZ75-Auto',
    name: 'Pole Position',
    quality: 'Field-Tested',
    marketPrice: 0.27,
    avgPrice: 0.25
}, {
    type: 'CZ75-Auto',
    name: 'Pole Position',
    quality: 'Well-Worn',
    marketPrice: 0.32,
    avgPrice: 0.28
}, {
    type: 'CZ75-Auto',
    name: 'Pole Position',
    quality: 'Battle-Scarred',
    marketPrice: 0.27,
    avgPrice: 0.25
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Pole Position',
    quality: 'Factory New',
    marketPrice: 2.53,
    avgPrice: 2.41
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Pole Position',
    quality: 'Minimal Wear',
    marketPrice: 1.20,
    avgPrice: 1.17
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Pole Position',
    quality: 'Field-Tested',
    marketPrice: 0.73,
    avgPrice: 0.66
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Pole Position',
    quality: 'Well-Worn',
    marketPrice: 0.88,
    avgPrice: 0.77
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Pole Position',
    quality: 'Battle-Scarred',
    marketPrice: 0.71,
    avgPrice: 0.65
}, {
    type: 'CZ75-Auto',
    name: 'Red Astor',
    quality: 'Factory New',
    marketPrice: 1.98,
    avgPrice: 1.86
}, {
    type: 'CZ75-Auto',
    name: 'Red Astor',
    quality: 'Minimal Wear',
    marketPrice: 0.88,
    avgPrice: 0.79
}, {
    type: 'CZ75-Auto',
    name: 'Red Astor',
    quality: 'Field-Tested',
    marketPrice: 0.43,
    avgPrice: 0.41
}, {
    type: 'CZ75-Auto',
    name: 'Red Astor',
    quality: 'Well-Worn',
    marketPrice: 0.41,
    avgPrice: 0.36
}, {
    type: 'CZ75-Auto',
    name: 'Red Astor',
    quality: 'Battle-Scarred',
    marketPrice: 0.40,
    avgPrice: 0.34
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Red Astor',
    quality: 'Factory New',
    marketPrice: 8.89,
    avgPrice: 9.64
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Red Astor',
    quality: 'Minimal Wear',
    marketPrice: 2.80,
    avgPrice: 2.99
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Red Astor',
    quality: 'Field-Tested',
    marketPrice: 1.64,
    avgPrice: 1.67
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Red Astor',
    quality: 'Well-Worn',
    marketPrice: 1.32,
    avgPrice: 1.29
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Red Astor',
    quality: 'Battle-Scarred',
    marketPrice: 1.12,
    avgPrice: 1.15
}, {
    type: 'CZ75-Auto',
    name: 'The Fuschia Is Now',
    quality: 'Factory New',
    marketPrice: 3.03,
    avgPrice: 2.78
}, {
    type: 'CZ75-Auto',
    name: 'The Fuschia Is Now',
    quality: 'Minimal Wear',
    marketPrice: 2.23,
    avgPrice: 2.09
}, {
    type: 'CZ75-Auto',
    name: 'The Fuschia Is Now',
    quality: 'Field-Tested',
    marketPrice: 1.74,
    avgPrice: 1.73
}, {
    type: 'CZ75-Auto',
    name: 'The Fuschia Is Now',
    quality: 'Well-Worn',
    marketPrice: 8.78,
    avgPrice: 9.27
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'The Fuschia Is Now',
    quality: 'Factory New',
    marketPrice: 18.23,
    avgPrice: 18.38
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'The Fuschia Is Now',
    quality: 'Minimal Wear',
    marketPrice: 11.34,
    avgPrice: 10.99
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'The Fuschia Is Now',
    quality: 'Field-Tested',
    marketPrice: 5.47,
    avgPrice: 5.82
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'The Fuschia Is Now',
    quality: 'Well-Worn',
    marketPrice: 54.69,
    avgPrice: 41.26
}, {
    type: 'CZ75-Auto',
    name: 'Tigris',
    quality: 'Factory New',
    marketPrice: 0.92,
    avgPrice: 0.81
}, {
    type: 'CZ75-Auto',
    name: 'Tigris',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.33
}, {
    type: 'CZ75-Auto',
    name: 'Tigris',
    quality: 'Field-Tested',
    marketPrice: 0.28,
    avgPrice: 0.27
}, {
    type: 'CZ75-Auto',
    name: 'Tigris',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'CZ75-Auto',
    name: 'Tigris',
    quality: 'Battle-Scarred',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Tigris',
    quality: 'Factory New',
    marketPrice: 4.15,
    avgPrice: 3.66
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Tigris',
    quality: 'Minimal Wear',
    marketPrice: 1.56,
    avgPrice: 1.33
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Tigris',
    quality: 'Field-Tested',
    marketPrice: 0.80,
    avgPrice: 0.81
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Tigris',
    quality: 'Well-Worn',
    marketPrice: 0.82,
    avgPrice: 0.75
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Tigris',
    quality: 'Battle-Scarred',
    marketPrice: 0.76,
    avgPrice: 0.70
}, {
    type: 'CZ75-Auto',
    name: 'Tread Plate',
    quality: 'Factory New',
    marketPrice: 0.73,
    avgPrice: 0.68
}, {
    type: 'CZ75-Auto',
    name: 'Tread Plate',
    quality: 'Minimal Wear',
    marketPrice: 0.57,
    avgPrice: 0.48
}, {
    type: 'CZ75-Auto',
    name: 'Tread Plate',
    quality: 'Field-Tested',
    marketPrice: 0.84,
    avgPrice: 0.77
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Tread Plate',
    quality: 'Factory New',
    marketPrice: 3.87,
    avgPrice: 3.45
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Tread Plate',
    quality: 'Minimal Wear',
    marketPrice: 2.80,
    avgPrice: 2.63
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Tread Plate',
    quality: 'Field-Tested',
    marketPrice: 2.93,
    avgPrice: 2.15
}, {
    type: 'CZ75-Auto',
    name: 'Tuxedo',
    quality: 'Factory New',
    marketPrice: 0.38,
    avgPrice: 0.35
}, {
    type: 'CZ75-Auto',
    name: 'Tuxedo',
    quality: 'Minimal Wear',
    marketPrice: 0.20,
    avgPrice: 0.18
}, {
    type: 'CZ75-Auto',
    name: 'Tuxedo',
    quality: 'Field-Tested',
    marketPrice: 0.14,
    avgPrice: 0.13
}, {
    type: 'CZ75-Auto',
    name: 'Tuxedo',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.16
}, {
    type: 'CZ75-Auto',
    name: 'Tuxedo',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.11
}, {
    type: 'CZ75-Auto',
    name: 'Twist',
    quality: 'Factory New',
    marketPrice: 0.38,
    avgPrice: 0.36
}, {
    type: 'CZ75-Auto',
    name: 'Twist',
    quality: 'Minimal Wear',
    marketPrice: 0.15,
    avgPrice: 0.15
}, {
    type: 'CZ75-Auto',
    name: 'Twist',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'CZ75-Auto',
    name: 'Twist',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'CZ75-Auto',
    name: 'Twist',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Twist',
    quality: 'Factory New',
    marketPrice: 1.62,
    avgPrice: 1.62
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Twist',
    quality: 'Minimal Wear',
    marketPrice: 0.49,
    avgPrice: 0.47
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Twist',
    quality: 'Field-Tested',
    marketPrice: 0.32,
    avgPrice: 0.31
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Twist',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Twist',
    quality: 'Battle-Scarred',
    marketPrice: 0.28,
    avgPrice: 0.27
}, {
    type: 'CZ75-Auto',
    name: 'Victoria',
    quality: 'Factory New',
    marketPrice: 8.67,
    avgPrice: 8.56
}, {
    type: 'CZ75-Auto',
    name: 'Victoria',
    quality: 'Minimal Wear',
    marketPrice: 4.78,
    avgPrice: 4.48
}, {
    type: 'CZ75-Auto',
    name: 'Victoria',
    quality: 'Field-Tested',
    marketPrice: 3.31,
    avgPrice: 3.23
}, {
    type: 'CZ75-Auto',
    name: 'Victoria',
    quality: 'Well-Worn',
    marketPrice: 4.11,
    avgPrice: 3.46
}, {
    type: 'CZ75-Auto',
    name: 'Victoria',
    quality: 'Battle-Scarred',
    marketPrice: 3.64,
    avgPrice: 3.03
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Victoria',
    quality: 'Factory New',
    marketPrice: 189.88,
    avgPrice: 135.27
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Victoria',
    quality: 'Minimal Wear',
    marketPrice: 47.75,
    avgPrice: 47.98
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Victoria',
    quality: 'Field-Tested',
    marketPrice: 19.90,
    avgPrice: 18.75
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Victoria',
    quality: 'Well-Worn',
    marketPrice: 190.00,
    avgPrice: 143.35
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Victoria',
    quality: 'Battle-Scarred',
    marketPrice: 16.60,
    avgPrice: 17.41
}, {
    type: 'CZ75-Auto',
    name: 'Yellow Jacket',
    quality: 'Factory New',
    marketPrice: 4.50,
    avgPrice: 4.52
}, {
    type: 'CZ75-Auto',
    name: 'Yellow Jacket',
    quality: 'Minimal Wear',
    marketPrice: 3.29,
    avgPrice: 2.74
}, {
    type: 'CZ75-Auto',
    name: 'Yellow Jacket',
    quality: 'Field-Tested',
    marketPrice: 2.04,
    avgPrice: 1.84
}, {
    type: 'CZ75-Auto',
    name: 'Yellow Jacket',
    quality: 'Well-Worn',
    marketPrice: 1.91,
    avgPrice: 1.70
}, {
    type: 'CZ75-Auto',
    name: 'Yellow Jacket',
    quality: 'Battle-Scarred',
    marketPrice: 1.89,
    avgPrice: 1.65
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Yellow Jacket',
    quality: 'Factory New',
    marketPrice: 29.85,
    avgPrice: 27.90
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Yellow Jacket',
    quality: 'Minimal Wear',
    marketPrice: 13.12,
    avgPrice: 9.01
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Yellow Jacket',
    quality: 'Field-Tested',
    marketPrice: 5.17,
    avgPrice: 5.09
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Yellow Jacket',
    quality: 'Well-Worn',
    marketPrice: 4.78,
    avgPrice: 4.05
}, {
    type: 'CZ75-Auto',
    statTrak: true,
    name: 'Yellow Jacket',
    quality: 'Battle-Scarred',
    marketPrice: 4.07,
    avgPrice: 3.71
}, {
    type: 'Desert Eagle',
    name: 'Blaze',
    quality: 'Factory New',
    marketPrice: 46.57,
    avgPrice: 47.59
}, {
    type: 'Desert Eagle',
    name: 'Blaze',
    quality: 'Minimal Wear',
    marketPrice: 49.99,
    avgPrice: 50.11
}, {
    type: 'Desert Eagle',
    name: 'Bronze Deco',
    quality: 'Factory New',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'Desert Eagle',
    name: 'Bronze Deco',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'Desert Eagle',
    name: 'Bronze Deco',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Desert Eagle',
    name: 'Bronze Deco',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Desert Eagle',
    name: 'Bronze Deco',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.11
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Bronze Deco',
    quality: 'Factory New',
    marketPrice: 1.18,
    avgPrice: 1.11
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Bronze Deco',
    quality: 'Minimal Wear',
    marketPrice: 0.81,
    avgPrice: 0.74
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Bronze Deco',
    quality: 'Field-Tested',
    marketPrice: 0.49,
    avgPrice: 0.47
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Bronze Deco',
    quality: 'Well-Worn',
    marketPrice: 0.76,
    avgPrice: 0.70
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Bronze Deco',
    quality: 'Battle-Scarred',
    marketPrice: 1.12,
    avgPrice: 1.08
}, {
    type: 'Desert Eagle',
    name: 'Cobalt Disruption',
    quality: 'Factory New',
    marketPrice: 5.38,
    avgPrice: 5.35
}, {
    type: 'Desert Eagle',
    name: 'Cobalt Disruption',
    quality: 'Minimal Wear',
    marketPrice: 4.66,
    avgPrice: 4.76
}, {
    type: 'Desert Eagle',
    name: 'Cobalt Disruption',
    quality: 'Field-Tested',
    marketPrice: 5.46,
    avgPrice: 5.19
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Cobalt Disruption',
    quality: 'Factory New',
    marketPrice: 26.65,
    avgPrice: 26.13
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Cobalt Disruption',
    quality: 'Minimal Wear',
    marketPrice: 21.28,
    avgPrice: 19.43
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Cobalt Disruption',
    quality: 'Field-Tested',
    marketPrice: 16.00,
    avgPrice: 16.20
}, {
    type: 'Desert Eagle',
    name: 'Conspiracy',
    quality: 'Factory New',
    marketPrice: 2.27,
    avgPrice: 2.34
}, {
    type: 'Desert Eagle',
    name: 'Conspiracy',
    quality: 'Minimal Wear',
    marketPrice: 2.00,
    avgPrice: 1.90
}, {
    type: 'Desert Eagle',
    name: 'Conspiracy',
    quality: 'Field-Tested',
    marketPrice: 1.85,
    avgPrice: 1.78
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Conspiracy',
    quality: 'Factory New',
    marketPrice: 13.42,
    avgPrice: 12.10
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Conspiracy',
    quality: 'Minimal Wear',
    marketPrice: 8.90,
    avgPrice: 8.08
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Conspiracy',
    quality: 'Field-Tested',
    marketPrice: 8.11,
    avgPrice: 6.43
}, {
    type: 'Desert Eagle',
    name: 'Corinthian',
    quality: 'Factory New',
    marketPrice: 0.43,
    avgPrice: 0.41
}, {
    type: 'Desert Eagle',
    name: 'Corinthian',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.26
}, {
    type: 'Desert Eagle',
    name: 'Corinthian',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.21
}, {
    type: 'Desert Eagle',
    name: 'Corinthian',
    quality: 'Well-Worn',
    marketPrice: 0.39,
    avgPrice: 0.34
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Corinthian',
    quality: 'Factory New',
    marketPrice: 2.84,
    avgPrice: 2.88
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Corinthian',
    quality: 'Minimal Wear',
    marketPrice: 2.15,
    avgPrice: 2.03
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Corinthian',
    quality: 'Field-Tested',
    marketPrice: 1.63,
    avgPrice: 1.54
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Corinthian',
    quality: 'Well-Worn',
    marketPrice: 2.12,
    avgPrice: 2.05
}, {
    type: 'Desert Eagle',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 31.62,
    avgPrice: 32.90
}, {
    type: 'Desert Eagle',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 3.58,
    avgPrice: 3.59
}, {
    type: 'Desert Eagle',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 0.92,
    avgPrice: 0.83
}, {
    type: 'Desert Eagle',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 1.33,
    avgPrice: 1.27
}, {
    type: 'Desert Eagle',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 0.87,
    avgPrice: 0.76
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 389.04
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 20.76,
    avgPrice: 19.79
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 4.57,
    avgPrice: 4.14
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 4.69,
    avgPrice: 4.52
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 3.00,
    avgPrice: 2.92
}, {
    type: 'Desert Eagle',
    name: 'Golden Koi',
    quality: 'Factory New',
    marketPrice: 9.28,
    avgPrice: 10.21
}, {
    type: 'Desert Eagle',
    name: 'Golden Koi',
    quality: 'Minimal Wear',
    marketPrice: 12.21,
    avgPrice: 10.51
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Golden Koi',
    quality: 'Factory New',
    marketPrice: 101.61,
    avgPrice: 97.62
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Golden Koi',
    quality: 'Minimal Wear',
    marketPrice: 117.81,
    avgPrice: 93.11
}, {
    type: 'Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Factory New',
    marketPrice: 28.26,
    avgPrice: 24.60
}, {
    type: 'Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Minimal Wear',
    marketPrice: 25.27,
    avgPrice: 20.25
}, {
    type: 'Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Field-Tested',
    marketPrice: 20.66,
    avgPrice: 18.35
}, {
    type: 'Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Well-Worn',
    marketPrice: 23.14,
    avgPrice: 19.85
}, {
    type: 'Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Battle-Scarred',
    marketPrice: 19.14,
    avgPrice: 18.14
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Factory New',
    marketPrice: 308.40,
    avgPrice: 350.01
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Minimal Wear',
    marketPrice: 68.51,
    avgPrice: 59.40
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Field-Tested',
    marketPrice: 37.00,
    avgPrice: 35.53
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Well-Worn',
    marketPrice: 55.37,
    avgPrice: 43.89
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Hand Cannon',
    quality: 'Battle-Scarred',
    marketPrice: 31.91,
    avgPrice: 43.46
}, {
    type: 'Desert Eagle',
    name: 'Heirloom',
    quality: 'Factory New',
    marketPrice: 4.30,
    avgPrice: 3.63
}, {
    type: 'Desert Eagle',
    name: 'Heirloom',
    quality: 'Minimal Wear',
    marketPrice: 1.22,
    avgPrice: 1.14
}, {
    type: 'Desert Eagle',
    name: 'Heirloom',
    quality: 'Field-Tested',
    marketPrice: 0.63,
    avgPrice: 0.58
}, {
    type: 'Desert Eagle',
    name: 'Heirloom',
    quality: 'Well-Worn',
    marketPrice: 1.63,
    avgPrice: 1.53
}, {
    type: 'Desert Eagle',
    name: 'Heirloom',
    quality: 'Battle-Scarred',
    marketPrice: 1.03,
    avgPrice: 0.96
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Heirloom',
    quality: 'Factory New',
    marketPrice: 29.99,
    avgPrice: 26.82
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Heirloom',
    quality: 'Minimal Wear',
    marketPrice: 7.22,
    avgPrice: 6.82
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Heirloom',
    quality: 'Field-Tested',
    marketPrice: 3.82,
    avgPrice: 4.16
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Heirloom',
    quality: 'Well-Worn',
    marketPrice: 5.77,
    avgPrice: 5.56
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Heirloom',
    quality: 'Battle-Scarred',
    marketPrice: 4.43,
    avgPrice: 4.00
}, {
    type: 'Desert Eagle',
    name: 'Hypnotic',
    quality: 'Factory New',
    marketPrice: 7.13,
    avgPrice: 7.05
}, {
    type: 'Desert Eagle',
    name: 'Hypnotic',
    quality: 'Minimal Wear',
    marketPrice: 11.93,
    avgPrice: 10.67
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Hypnotic',
    quality: 'Factory New',
    marketPrice: 27.00,
    avgPrice: 24.61
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Hypnotic',
    quality: 'Minimal Wear',
    marketPrice: 75.50,
    avgPrice: 86.96
}, {
    type: 'Desert Eagle',
    name: 'Kumicho Dragon',
    quality: 'Factory New',
    marketPrice: 10.20,
    avgPrice: 8.96
}, {
    type: 'Desert Eagle',
    name: 'Kumicho Dragon',
    quality: 'Minimal Wear',
    marketPrice: 5.68,
    avgPrice: 5.14
}, {
    type: 'Desert Eagle',
    name: 'Kumicho Dragon',
    quality: 'Field-Tested',
    marketPrice: 3.31,
    avgPrice: 3.37
}, {
    type: 'Desert Eagle',
    name: 'Kumicho Dragon',
    quality: 'Well-Worn',
    marketPrice: 5.10,
    avgPrice: 4.12
}, {
    type: 'Desert Eagle',
    name: 'Kumicho Dragon',
    quality: 'Battle-Scarred',
    marketPrice: 2.88,
    avgPrice: 2.86
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Kumicho Dragon',
    quality: 'Factory New',
    marketPrice: 49.40,
    avgPrice: 43.30
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Kumicho Dragon',
    quality: 'Minimal Wear',
    marketPrice: 25.54,
    avgPrice: 23.97
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Kumicho Dragon',
    quality: 'Field-Tested',
    marketPrice: 17.66,
    avgPrice: 15.16
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Kumicho Dragon',
    quality: 'Well-Worn',
    marketPrice: 19.70,
    avgPrice: 17.51
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Kumicho Dragon',
    quality: 'Battle-Scarred',
    marketPrice: 15.32,
    avgPrice: 13.06
}, {
    type: 'Desert Eagle',
    name: 'Meteorite',
    quality: 'Factory New',
    marketPrice: 0.36,
    avgPrice: 0.36
}, {
    type: 'Desert Eagle',
    name: 'Meteorite',
    quality: 'Minimal Wear',
    marketPrice: 0.27,
    avgPrice: 0.25
}, {
    type: 'Desert Eagle',
    name: 'Meteorite',
    quality: 'Field-Tested',
    marketPrice: 0.27,
    avgPrice: 0.24
}, {
    type: 'Desert Eagle',
    name: 'Midnight Storm',
    quality: 'Factory New',
    marketPrice: 2.70,
    avgPrice: 2.50
}, {
    type: 'Desert Eagle',
    name: 'Midnight Storm',
    quality: 'Minimal Wear',
    marketPrice: 1.46,
    avgPrice: 1.38
}, {
    type: 'Desert Eagle',
    name: 'Midnight Storm',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'Desert Eagle',
    name: 'Midnight Storm',
    quality: 'Well-Worn',
    marketPrice: 0.75,
    avgPrice: 0.68
}, {
    type: 'Desert Eagle',
    name: 'Midnight Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.24,
    avgPrice: 0.21
}, {
    type: 'Desert Eagle',
    name: 'Mudder',
    quality: 'Factory New',
    marketPrice: 1.41,
    avgPrice: 1.30
}, {
    type: 'Desert Eagle',
    name: 'Mudder',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'Desert Eagle',
    name: 'Mudder',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Desert Eagle',
    name: 'Mudder',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Desert Eagle',
    name: 'Mudder',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Mudder',
    quality: 'Minimal Wear',
    marketPrice: 13.50,
    avgPrice: 12.45
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Mudder',
    quality: 'Field-Tested',
    marketPrice: 9.02,
    avgPrice: 6.00
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Mudder',
    quality: 'Well-Worn',
    marketPrice: 15.49,
    avgPrice: 17.95
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Mudder',
    quality: 'Battle-Scarred',
    marketPrice: 44.43,
    avgPrice: 12.18
}, {
    type: 'Desert Eagle',
    name: 'Naga',
    quality: 'Factory New',
    marketPrice: 1.55,
    avgPrice: 1.49
}, {
    type: 'Desert Eagle',
    name: 'Naga',
    quality: 'Minimal Wear',
    marketPrice: 0.54,
    avgPrice: 0.48
}, {
    type: 'Desert Eagle',
    name: 'Naga',
    quality: 'Field-Tested',
    marketPrice: 0.39,
    avgPrice: 0.35
}, {
    type: 'Desert Eagle',
    name: 'Naga',
    quality: 'Well-Worn',
    marketPrice: 0.38,
    avgPrice: 0.35
}, {
    type: 'Desert Eagle',
    name: 'Naga',
    quality: 'Battle-Scarred',
    marketPrice: 0.43,
    avgPrice: 0.38
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Naga',
    quality: 'Factory New',
    marketPrice: 8.56,
    avgPrice: 8.47
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Naga',
    quality: 'Minimal Wear',
    marketPrice: 2.81,
    avgPrice: 2.56
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Naga',
    quality: 'Field-Tested',
    marketPrice: 1.78,
    avgPrice: 1.63
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Naga',
    quality: 'Well-Worn',
    marketPrice: 1.55,
    avgPrice: 1.56
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Naga',
    quality: 'Battle-Scarred',
    marketPrice: 1.64,
    avgPrice: 1.59
}, {
    type: 'Desert Eagle',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 7.75,
    avgPrice: 7.12
}, {
    type: 'Desert Eagle',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 0.69,
    avgPrice: 0.63
}, {
    type: 'Desert Eagle',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'Desert Eagle',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 0.29,
    avgPrice: 0.22
}, {
    type: 'Desert Eagle',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 0.19,
    avgPrice: 0.16
}, {
    type: 'Desert Eagle',
    name: 'Pilot',
    quality: 'Factory New',
    marketPrice: 33.31,
    avgPrice: 32.19
}, {
    type: 'Desert Eagle',
    name: 'Pilot',
    quality: 'Minimal Wear',
    marketPrice: 12.80,
    avgPrice: 12.03
}, {
    type: 'Desert Eagle',
    name: 'Pilot',
    quality: 'Field-Tested',
    marketPrice: 9.83,
    avgPrice: 8.25
}, {
    type: 'Desert Eagle',
    name: 'Pilot',
    quality: 'Well-Worn',
    marketPrice: 7.78,
    avgPrice: 7.53
}, {
    type: 'Desert Eagle',
    name: 'Pilot',
    quality: 'Battle-Scarred',
    marketPrice: 8.93,
    avgPrice: 7.47
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 壱',
    quality: 'Factory New',
    marketPrice: 14.00,
    avgPrice: 13.70
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 壱',
    quality: 'Minimal Wear',
    marketPrice: 12.23,
    avgPrice: 11.07
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 壱',
    quality: 'Field-Tested',
    marketPrice: 6.10,
    avgPrice: 5.42
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 壱',
    quality: 'Well-Worn',
    marketPrice: 5.76,
    avgPrice: 5.02
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 壱',
    quality: 'Battle-Scarred',
    marketPrice: 4.44,
    avgPrice: 4.08
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 弐',
    quality: 'Factory New',
    marketPrice: 14.74,
    avgPrice: 13.75
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 弐',
    quality: 'Minimal Wear',
    marketPrice: 12.15,
    avgPrice: 10.67
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 弐',
    quality: 'Field-Tested',
    marketPrice: 6.14,
    avgPrice: 5.35
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 弐',
    quality: 'Well-Worn',
    marketPrice: 6.00,
    avgPrice: 5.65
}, {
    type: 'Desert Eagle',
    name: 'Sunset Storm 弐',
    quality: 'Battle-Scarred',
    marketPrice: 4.56,
    avgPrice: 4.29
}, {
    type: 'Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Factory New',
    marketPrice: 2.64,
    avgPrice: 2.29
}, {
    type: 'Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.26,
    avgPrice: 0.26
}, {
    type: 'Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.14,
    avgPrice: 0.11
}, {
    type: 'Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Factory New',
    marketPrice: 110.00,
    avgPrice: 100.65
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 8.05,
    avgPrice: 7.04
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Field-Tested',
    marketPrice: 4.04,
    avgPrice: 3.42
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Well-Worn',
    marketPrice: 3.88,
    avgPrice: 3.50
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 3.50,
    avgPrice: 3.53
}, {
    type: 'Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Factory New',
    marketPrice: 0.23,
    avgPrice: 0.24
}, {
    type: 'Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Minimal Wear',
    marketPrice: 0.15,
    avgPrice: 0.13
}, {
    type: 'Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Well-Worn',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Factory New',
    marketPrice: 7.77,
    avgPrice: 7.28
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Minimal Wear',
    marketPrice: 6.33,
    avgPrice: 4.42
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Field-Tested',
    marketPrice: 4.22,
    avgPrice: 3.08
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Well-Worn',
    marketPrice: 5.53,
    avgPrice: 3.75
}, {
    type: 'Souvenir Desert Eagle',
    name: 'Urban Rubble',
    quality: 'Battle-Scarred',
    marketPrice: 7.08,
    avgPrice: 5.06
}, {
    type: 'Dual Berettas',
    name: 'Anodized Navy',
    quality: 'Factory New',
    marketPrice: 0.20,
    avgPrice: 0.18
}, {
    type: 'Dual Berettas',
    name: 'Anodized Navy',
    quality: 'Minimal Wear',
    marketPrice: 0.66,
    avgPrice: 0.66
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Anodized Navy',
    quality: 'Factory New',
    marketPrice: 2.00,
    avgPrice: 2.04
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Anodized Navy',
    quality: 'Minimal Wear',
    marketPrice: 4.29,
    avgPrice: 5.04
}, {
    type: 'Dual Berettas',
    name: 'Black Limba',
    quality: 'Factory New',
    marketPrice: 4.00,
    avgPrice: 3.86
}, {
    type: 'Dual Berettas',
    name: 'Black Limba',
    quality: 'Minimal Wear',
    marketPrice: 0.71,
    avgPrice: 0.71
}, {
    type: 'Dual Berettas',
    name: 'Black Limba',
    quality: 'Field-Tested',
    marketPrice: 0.74,
    avgPrice: 0.63
}, {
    type: 'Dual Berettas',
    name: 'Black Limba',
    quality: 'Well-Worn',
    marketPrice: 0.72,
    avgPrice: 0.55
}, {
    type: 'Dual Berettas',
    name: 'Black Limba',
    quality: 'Battle-Scarred',
    marketPrice: 0.89,
    avgPrice: 0.95
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Black Limba',
    quality: 'Factory New',
    marketPrice: 63.31,
    avgPrice: 50.69
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Black Limba',
    quality: 'Minimal Wear',
    marketPrice: 2.27,
    avgPrice: 2.03
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Black Limba',
    quality: 'Field-Tested',
    marketPrice: 1.47,
    avgPrice: 1.24
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Black Limba',
    quality: 'Well-Worn',
    marketPrice: 1.40,
    avgPrice: 1.35
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Black Limba',
    quality: 'Battle-Scarred',
    marketPrice: 1.33,
    avgPrice: 1.24
}, {
    type: 'Dual Berettas',
    name: 'Briar',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'Dual Berettas',
    name: 'Briar',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'Dual Berettas',
    name: 'Briar',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Briar',
    quality: 'Factory New',
    marketPrice: 0.46,
    avgPrice: 0.45
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Briar',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Briar',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.26
}, {
    type: 'Dual Berettas',
    name: 'Cartel',
    quality: 'Factory New',
    marketPrice: 0.24,
    avgPrice: 0.21
}, {
    type: 'Dual Berettas',
    name: 'Cartel',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Dual Berettas',
    name: 'Cartel',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Dual Berettas',
    name: 'Cartel',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Dual Berettas',
    name: 'Cartel',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Cartel',
    quality: 'Factory New',
    marketPrice: 1.58,
    avgPrice: 1.57
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Cartel',
    quality: 'Minimal Wear',
    marketPrice: 0.40,
    avgPrice: 0.38
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Cartel',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.24
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Cartel',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.23
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Cartel',
    quality: 'Battle-Scarred',
    marketPrice: 0.24,
    avgPrice: 0.23
}, {
    type: 'Dual Berettas',
    name: 'Cobalt Quartz',
    quality: 'Factory New',
    marketPrice: 0.25,
    avgPrice: 0.24
}, {
    type: 'Dual Berettas',
    name: 'Cobalt Quartz',
    quality: 'Minimal Wear',
    marketPrice: 0.24,
    avgPrice: 0.23
}, {
    type: 'Dual Berettas',
    name: 'Cobalt Quartz',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.23
}, {
    type: 'Dual Berettas',
    name: 'Cobalt Quartz',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Cobalt Quartz',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 193.56
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Cobalt Quartz',
    quality: 'Minimal Wear',
    marketPrice: 115.00,
    avgPrice: 98.00
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Cobalt Quartz',
    quality: 'Field-Tested',
    marketPrice: 70.00,
    avgPrice: 48.64
}, {
    type: 'Dual Berettas',
    name: 'Colony',
    quality: 'Factory New',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Dual Berettas',
    name: 'Colony',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Dual Berettas',
    name: 'Colony',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Dual Berettas',
    name: 'Colony',
    quality: 'Well-Worn',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'Dual Berettas',
    name: 'Colony',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Colony',
    quality: 'Factory New',
    marketPrice: 2.53,
    avgPrice: 2.31
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Colony',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Colony',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.17
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Colony',
    quality: 'Well-Worn',
    marketPrice: 0.26,
    avgPrice: 0.22
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Colony',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.19
}, {
    type: 'Dual Berettas',
    name: 'Contractor',
    quality: 'Factory New',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Dual Berettas',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Dual Berettas',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Dual Berettas',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Dual Berettas',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Contractor',
    quality: 'Factory New',
    marketPrice: 18.99,
    avgPrice: 20.93
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 2.18,
    avgPrice: 2.12
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.77,
    avgPrice: 0.80
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 2.30,
    avgPrice: 1.71
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 2.93,
    avgPrice: 2.18
}, {
    type: 'Dual Berettas',
    name: 'Demolition',
    quality: 'Field-Tested',
    marketPrice: 0.96,
    avgPrice: 1.11
}, {
    type: 'Dual Berettas',
    name: 'Demolition',
    quality: 'Well-Worn',
    marketPrice: 1.04,
    avgPrice: 1.08
}, {
    type: 'Dual Berettas',
    name: 'Demolition',
    quality: 'Battle-Scarred',
    marketPrice: 1.77,
    avgPrice: 1.87
}, {
    type: 'Dual Berettas',
    name: 'Dualing Dragons',
    quality: 'Factory New',
    marketPrice: 0.53,
    avgPrice: 0.54
}, {
    type: 'Dual Berettas',
    name: 'Dualing Dragons',
    quality: 'Minimal Wear',
    marketPrice: 0.14,
    avgPrice: 0.13
}, {
    type: 'Dual Berettas',
    name: 'Dualing Dragons',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Dual Berettas',
    name: 'Dualing Dragons',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Dual Berettas',
    name: 'Dualing Dragons',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Dualing Dragons',
    quality: 'Factory New',
    marketPrice: 2.83,
    avgPrice: 2.91
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Dualing Dragons',
    quality: 'Minimal Wear',
    marketPrice: 0.63,
    avgPrice: 0.58
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Dualing Dragons',
    quality: 'Field-Tested',
    marketPrice: 0.34,
    avgPrice: 0.33
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Dualing Dragons',
    quality: 'Well-Worn',
    marketPrice: 0.31,
    avgPrice: 0.31
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Dualing Dragons',
    quality: 'Battle-Scarred',
    marketPrice: 0.46,
    avgPrice: 0.38
}, {
    type: 'Dual Berettas',
    name: 'Duelist',
    quality: 'Factory New',
    marketPrice: 11.69,
    avgPrice: 10.58
}, {
    type: 'Dual Berettas',
    name: 'Duelist',
    quality: 'Minimal Wear',
    marketPrice: 7.02,
    avgPrice: 6.85
}, {
    type: 'Dual Berettas',
    name: 'Duelist',
    quality: 'Field-Tested',
    marketPrice: 6.00,
    avgPrice: 5.31
}, {
    type: 'Dual Berettas',
    name: 'Duelist',
    quality: 'Well-Worn',
    marketPrice: 5.84,
    avgPrice: 5.05
}, {
    type: 'Dual Berettas',
    name: 'Duelist',
    quality: 'Battle-Scarred',
    marketPrice: 5.31,
    avgPrice: 5.07
}, {
    type: 'Dual Berettas',
    name: 'Hemoglobin',
    quality: 'Factory New',
    marketPrice: 1.11,
    avgPrice: 1.02
}, {
    type: 'Dual Berettas',
    name: 'Hemoglobin',
    quality: 'Minimal Wear',
    marketPrice: 0.89,
    avgPrice: 0.92
}, {
    type: 'Dual Berettas',
    name: 'Hemoglobin',
    quality: 'Field-Tested',
    marketPrice: 0.95,
    avgPrice: 0.89
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Hemoglobin',
    quality: 'Factory New',
    marketPrice: 4.60,
    avgPrice: 4.62
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Hemoglobin',
    quality: 'Minimal Wear',
    marketPrice: 3.24,
    avgPrice: 3.16
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Hemoglobin',
    quality: 'Field-Tested',
    marketPrice: 2.96,
    avgPrice: 2.82
}, {
    type: 'Dual Berettas',
    name: 'Marina',
    quality: 'Factory New',
    marketPrice: 4.64,
    avgPrice: 3.34
}, {
    type: 'Dual Berettas',
    name: 'Marina',
    quality: 'Minimal Wear',
    marketPrice: 0.96,
    avgPrice: 1.00
}, {
    type: 'Dual Berettas',
    name: 'Marina',
    quality: 'Field-Tested',
    marketPrice: 0.89,
    avgPrice: 0.87
}, {
    type: 'Dual Berettas',
    name: 'Marina',
    quality: 'Well-Worn',
    marketPrice: 1.09,
    avgPrice: 1.14
}, {
    type: 'Dual Berettas',
    name: 'Marina',
    quality: 'Battle-Scarred',
    marketPrice: 0.87,
    avgPrice: 1.24
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Marina',
    quality: 'Factory New',
    marketPrice: 43.38,
    avgPrice: 20.62
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Marina',
    quality: 'Minimal Wear',
    marketPrice: 3.33,
    avgPrice: 3.00
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Marina',
    quality: 'Field-Tested',
    marketPrice: 2.08,
    avgPrice: 2.07
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Marina',
    quality: 'Well-Worn',
    marketPrice: 3.02,
    avgPrice: 3.05
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Marina',
    quality: 'Battle-Scarred',
    marketPrice: 2.21,
    avgPrice: 1.94
}, {
    type: 'Dual Berettas',
    name: 'Moon in Libra',
    quality: 'Factory New',
    marketPrice: 0.23,
    avgPrice: 0.20
}, {
    type: 'Dual Berettas',
    name: 'Moon in Libra',
    quality: 'Minimal Wear',
    marketPrice: 0.16,
    avgPrice: 0.16
}, {
    type: 'Dual Berettas',
    name: 'Moon in Libra',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'Dual Berettas',
    name: 'Moon in Libra',
    quality: 'Well-Worn',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'Dual Berettas',
    name: 'Moon in Libra',
    quality: 'Battle-Scarred',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'Dual Berettas',
    name: 'Panther',
    quality: 'Factory New',
    marketPrice: 0.74,
    avgPrice: 0.70
}, {
    type: 'Dual Berettas',
    name: 'Panther',
    quality: 'Minimal Wear',
    marketPrice: 0.41,
    avgPrice: 0.41
}, {
    type: 'Dual Berettas',
    name: 'Panther',
    quality: 'Field-Tested',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'Dual Berettas',
    name: 'Panther',
    quality: 'Well-Worn',
    marketPrice: 0.40,
    avgPrice: 0.36
}, {
    type: 'Dual Berettas',
    name: 'Panther',
    quality: 'Battle-Scarred',
    marketPrice: 0.42,
    avgPrice: 0.34
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Panther',
    quality: 'Factory New',
    marketPrice: 3.68,
    avgPrice: 3.43
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Panther',
    quality: 'Minimal Wear',
    marketPrice: 1.53,
    avgPrice: 1.40
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Panther',
    quality: 'Field-Tested',
    marketPrice: 0.88,
    avgPrice: 0.78
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Panther',
    quality: 'Well-Worn',
    marketPrice: 0.99,
    avgPrice: 0.82
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Panther',
    quality: 'Battle-Scarred',
    marketPrice: 0.46,
    avgPrice: 0.51
}, {
    type: 'Dual Berettas',
    name: 'Retribution',
    quality: 'Factory New',
    marketPrice: 1.16,
    avgPrice: 0.99
}, {
    type: 'Dual Berettas',
    name: 'Retribution',
    quality: 'Minimal Wear',
    marketPrice: 0.29,
    avgPrice: 0.34
}, {
    type: 'Dual Berettas',
    name: 'Retribution',
    quality: 'Field-Tested',
    marketPrice: 0.39,
    avgPrice: 0.34
}, {
    type: 'Dual Berettas',
    name: 'Retribution',
    quality: 'Well-Worn',
    marketPrice: 4.45,
    avgPrice: 4.36
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Retribution',
    quality: 'Factory New',
    marketPrice: 1.54,
    avgPrice: 1.49
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Retribution',
    quality: 'Minimal Wear',
    marketPrice: 0.73,
    avgPrice: 0.77
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Retribution',
    quality: 'Field-Tested',
    marketPrice: 0.71,
    avgPrice: 1.52
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Retribution',
    quality: 'Well-Worn',
    marketPrice: 20.01,
    avgPrice: 18.04
}, {
    type: 'Dual Berettas',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 0.15,
    avgPrice: 0.12
}, {
    type: 'Dual Berettas',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Dual Berettas',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Dual Berettas',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Dual Berettas',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 101.08,
    avgPrice: 99.81
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 11.00,
    avgPrice: 13.27
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 5.00,
    avgPrice: 5.39
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 5.55,
    avgPrice: 4.69
}, {
    type: 'Souvenir Dual Berettas',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 8.93,
    avgPrice: 10.73
}, {
    type: 'Dual Berettas',
    name: 'Urban Shock',
    quality: 'Factory New',
    marketPrice: 0.72,
    avgPrice: 0.63
}, {
    type: 'Dual Berettas',
    name: 'Urban Shock',
    quality: 'Minimal Wear',
    marketPrice: 0.43,
    avgPrice: 0.41
}, {
    type: 'Dual Berettas',
    name: 'Urban Shock',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.33
}, {
    type: 'Dual Berettas',
    name: 'Urban Shock',
    quality: 'Well-Worn',
    marketPrice: 0.38,
    avgPrice: 0.36
}, {
    type: 'Dual Berettas',
    name: 'Urban Shock',
    quality: 'Battle-Scarred',
    marketPrice: 0.39,
    avgPrice: 0.32
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Urban Shock',
    quality: 'Factory New',
    marketPrice: 2.94,
    avgPrice: 2.83
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Urban Shock',
    quality: 'Minimal Wear',
    marketPrice: 1.89,
    avgPrice: 1.70
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Urban Shock',
    quality: 'Field-Tested',
    marketPrice: 1.17,
    avgPrice: 1.06
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Urban Shock',
    quality: 'Well-Worn',
    marketPrice: 1.38,
    avgPrice: 1.14
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Urban Shock',
    quality: 'Battle-Scarred',
    marketPrice: 1.57,
    avgPrice: 1.15
}, {
    type: 'Dual Berettas',
    name: 'Ventilators',
    quality: 'Factory New',
    marketPrice: 0.21,
    avgPrice: 0.19
}, {
    type: 'Dual Berettas',
    name: 'Ventilators',
    quality: 'Minimal Wear',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'Dual Berettas',
    name: 'Ventilators',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Dual Berettas',
    name: 'Ventilators',
    quality: 'Well-Worn',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Ventilators',
    quality: 'Factory New',
    marketPrice: 1.50,
    avgPrice: 1.06
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Ventilators',
    quality: 'Minimal Wear',
    marketPrice: 0.65,
    avgPrice: 0.61
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Ventilators',
    quality: 'Field-Tested',
    marketPrice: 0.32,
    avgPrice: 0.33
}, {
    type: 'Dual Berettas',
    statTrak: true,
    name: 'Ventilators',
    quality: 'Well-Worn',
    marketPrice: 0.54,
    avgPrice: 0.41
}, {
    type: 'Falchion Knife',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 90.25,
    avgPrice: 81.93
}, {
    type: 'Falchion Knife',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 59.97,
    avgPrice: 60.43
}, {
    type: 'Falchion Knife',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 56.87,
    avgPrice: 54.53
}, {
    type: 'Falchion Knife',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 52.85,
    avgPrice: 53.95
}, {
    type: 'Falchion Knife',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 53.18,
    avgPrice: 54.89
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 214.05,
    avgPrice: 206.16
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 103.00,
    avgPrice: 97.82
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 100.00,
    avgPrice: 85.29
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 94.39,
    avgPrice: 91.57
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 169.99,
    avgPrice: 375.00
}, {
    type: 'Falchion Knife',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 112.36,
    avgPrice: 127.08
}, {
    type: 'Falchion Knife',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 51.07,
    avgPrice: 50.90
}, {
    type: 'Falchion Knife',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 44.09,
    avgPrice: 41.82
}, {
    type: 'Falchion Knife',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 44.44,
    avgPrice: 42.70
}, {
    type: 'Falchion Knife',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 40.99,
    avgPrice: 38.60
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 89.50,
    avgPrice: 74.53
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 64.37,
    avgPrice: 65.81
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 70.08,
    avgPrice: 56.85
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 66.14,
    avgPrice: 54.00
}, {
    type: 'Falchion Knife',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 109.99,
    avgPrice: 112.50
}, {
    type: 'Falchion Knife',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 66.14,
    avgPrice: 72.16
}, {
    type: 'Falchion Knife',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 59.97,
    avgPrice: 60.17
}, {
    type: 'Falchion Knife',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 56.19,
    avgPrice: 59.55
}, {
    type: 'Falchion Knife',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 56.93,
    avgPrice: 55.34
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 252.85,
    avgPrice: 381.25
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 149.12,
    avgPrice: 149.69
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 99.99,
    avgPrice: 96.71
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 107.87,
    avgPrice: 91.27
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 105.52,
    avgPrice: 90.65
}, {
    type: 'Falchion Knife',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 693.75
}, {
    type: 'Falchion Knife',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 107.66,
    avgPrice: 103.48
}, {
    type: 'Falchion Knife',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 66.60,
    avgPrice: 67.88
}, {
    type: 'Falchion Knife',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 68.50,
    avgPrice: 66.35
}, {
    type: 'Falchion Knife',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 55.20,
    avgPrice: 48.47
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 233.40,
    avgPrice: 222.95
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 94.50,
    avgPrice: 94.61
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 104.85,
    avgPrice: 104.92
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 86.60,
    avgPrice: 70.34
}, {
    type: 'Falchion Knife',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 106.38,
    avgPrice: 106.31
}, {
    type: 'Falchion Knife',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 112.63,
    avgPrice: 118.84
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 155.49,
    avgPrice: 160.93
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 357.57,
    avgPrice: 245.00
}, {
    type: 'Falchion Knife',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 151.80,
    avgPrice: 87.93
}, {
    type: 'Falchion Knife',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 46.72,
    avgPrice: 46.55
}, {
    type: 'Falchion Knife',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 41.13,
    avgPrice: 39.96
}, {
    type: 'Falchion Knife',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 42.94,
    avgPrice: 40.31
}, {
    type: 'Falchion Knife',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 41.01,
    avgPrice: 39.42
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 500.00
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 62.19,
    avgPrice: 64.35
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 56.00,
    avgPrice: 55.12
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 418.61,
    avgPrice: 62.02
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 66.63,
    avgPrice: 244.57
}, {
    type: 'Falchion Knife',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 349.99,
    avgPrice: 305.83
}, {
    type: 'Falchion Knife',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 69.96,
    avgPrice: 68.99
}, {
    type: 'Falchion Knife',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 51.08,
    avgPrice: 50.73
}, {
    type: 'Falchion Knife',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 51.98,
    avgPrice: 53.17
}, {
    type: 'Falchion Knife',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 40.86,
    avgPrice: 42.63
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 137.92,
    avgPrice: 135.56
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 87.21,
    avgPrice: 83.00
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 127.70,
    avgPrice: 174.10
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 60.00,
    avgPrice: 43.84
}, {
    type: 'Falchion Knife',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 97.37,
    avgPrice: 236.25
}, {
    type: 'Falchion Knife',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 42.21,
    avgPrice: 40.69
}, {
    type: 'Falchion Knife',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 39.65,
    avgPrice: 38.89
}, {
    type: 'Falchion Knife',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 42.14,
    avgPrice: 37.77
}, {
    type: 'Falchion Knife',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 40.22,
    avgPrice: 38.47
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 63.84,
    avgPrice: 71.93
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 61.96,
    avgPrice: 51.65
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 59.80,
    avgPrice: 55.71
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 63.85,
    avgPrice: 52.20
}, {
    type: 'Falchion Knife',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 102.40,
    avgPrice: 69.34
}, {
    type: 'Falchion Knife',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 48.66,
    avgPrice: 44.86
}, {
    type: 'Falchion Knife',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 42.78,
    avgPrice: 39.22
}, {
    type: 'Falchion Knife',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 42.25,
    avgPrice: 40.69
}, {
    type: 'Falchion Knife',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 39.97,
    avgPrice: 38.57
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 75.00,
    avgPrice: 65.62
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 57.73,
    avgPrice: 55.89
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 76.97,
    avgPrice: 55.49
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 60.03,
    avgPrice: 52.81
}, {
    type: 'Falchion Knife',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 109.95,
    avgPrice: 106.00
}, {
    type: 'Falchion Knife',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 88.00,
    avgPrice: 91.53
}, {
    type: 'Falchion Knife',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 88.36,
    avgPrice: 86.51
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 183.24,
    avgPrice: 176.29
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 144.95,
    avgPrice: 141.49
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 217.19,
    avgPrice: 132.56
}, {
    type: 'Falchion Knife',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 74.66,
    avgPrice: 71.48
}, {
    type: 'Falchion Knife',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 48.30,
    avgPrice: 46.61
}, {
    type: 'Falchion Knife',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 41.93,
    avgPrice: 43.57
}, {
    type: 'Falchion Knife',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 41.00,
    avgPrice: 42.23
}, {
    type: 'Falchion Knife',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 43.41,
    avgPrice: 41.69
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 396.40,
    avgPrice: 156.96
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 82.66,
    avgPrice: 133.89
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 69.00,
    avgPrice: 65.04
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 65.51,
    avgPrice: 57.39
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 77.75,
    avgPrice: 57.30
}, {
    type: 'Falchion Knife',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 99.99,
    avgPrice: 90.89
}, {
    type: 'Falchion Knife',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 45.59,
    avgPrice: 47.26
}, {
    type: 'Falchion Knife',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 41.22,
    avgPrice: 40.30
}, {
    type: 'Falchion Knife',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 41.95,
    avgPrice: 40.27
}, {
    type: 'Falchion Knife',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 40.15,
    avgPrice: 39.29
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 83.28,
    avgPrice: 82.52
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 55.54,
    avgPrice: 52.38
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 150.28,
    avgPrice: 69.29
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 71.84,
    avgPrice: 51.62
}, {
    type: 'Falchion Knife',
    name: '',
    quality: '',
    marketPrice: 57.19,
    avgPrice: 54.52
}, {
    type: 'Falchion Knife',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 77.29,
    avgPrice: 82.77
}, {
    type: 'FAMAS',
    name: 'Afterimage',
    quality: 'Factory New',
    marketPrice: 6.00,
    avgPrice: 4.19
}, {
    type: 'FAMAS',
    name: 'Afterimage',
    quality: 'Minimal Wear',
    marketPrice: 2.42,
    avgPrice: 2.42
}, {
    type: 'FAMAS',
    name: 'Afterimage',
    quality: 'Field-Tested',
    marketPrice: 2.45,
    avgPrice: 2.13
}, {
    type: 'FAMAS',
    name: 'Afterimage',
    quality: 'Well-Worn',
    marketPrice: 4.50,
    avgPrice: 4.26
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Afterimage',
    quality: 'Factory New',
    marketPrice: 14.88,
    avgPrice: 14.58
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Afterimage',
    quality: 'Minimal Wear',
    marketPrice: 8.65,
    avgPrice: 7.77
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Afterimage',
    quality: 'Field-Tested',
    marketPrice: 5.08,
    avgPrice: 5.56
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Afterimage',
    quality: 'Well-Worn',
    marketPrice: 31.11,
    avgPrice: 13.99
}, {
    type: 'Cologne 2016 Cobblestone Souvenir Package',
    name: '',
    quality: '',
    marketPrice: 25.32,
    avgPrice: 23.66
}, {
    type: 'FAMAS',
    name: 'Colony',
    quality: 'Factory New',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'FAMAS',
    name: 'Colony',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'FAMAS',
    name: 'Colony',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'FAMAS',
    name: 'Colony',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'FAMAS',
    name: 'Colony',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir FAMAS',
    name: 'Colony',
    quality: 'Minimal Wear',
    marketPrice: 4.56,
    avgPrice: 6.09
}, {
    type: 'Souvenir FAMAS',
    name: 'Colony',
    quality: 'Field-Tested',
    marketPrice: 1.76,
    avgPrice: 1.51
}, {
    type: 'Souvenir FAMAS',
    name: 'Colony',
    quality: 'Well-Worn',
    marketPrice: 3.94,
    avgPrice: 5.20
}, {
    type: 'Souvenir FAMAS',
    name: 'Colony',
    quality: 'Battle-Scarred',
    marketPrice: 2.00,
    avgPrice: 1.87
}, {
    type: 'FAMAS',
    name: 'Contrast Spray',
    quality: 'Factory New',
    marketPrice: 9.03,
    avgPrice: 6.20
}, {
    type: 'FAMAS',
    name: 'Contrast Spray',
    quality: 'Minimal Wear',
    marketPrice: 1.00,
    avgPrice: 1.01
}, {
    type: 'FAMAS',
    name: 'Contrast Spray',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.25
}, {
    type: 'FAMAS',
    name: 'Contrast Spray',
    quality: 'Well-Worn',
    marketPrice: 0.49,
    avgPrice: 0.47
}, {
    type: 'FAMAS',
    name: 'Contrast Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.76,
    avgPrice: 0.69
}, {
    type: 'FAMAS',
    name: 'Cyanospatter',
    quality: 'Factory New',
    marketPrice: 0.52,
    avgPrice: 0.48
}, {
    type: 'FAMAS',
    name: 'Cyanospatter',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'FAMAS',
    name: 'Cyanospatter',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'FAMAS',
    name: 'Cyanospatter',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'FAMAS',
    name: 'Cyanospatter',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir FAMAS',
    name: 'Cyanospatter',
    quality: 'Minimal Wear',
    marketPrice: 13.80,
    avgPrice: 16.13
}, {
    type: 'Souvenir FAMAS',
    name: 'Cyanospatter',
    quality: 'Field-Tested',
    marketPrice: 4.40,
    avgPrice: 4.00
}, {
    type: 'Souvenir FAMAS',
    name: 'Cyanospatter',
    quality: 'Well-Worn',
    marketPrice: 6.07,
    avgPrice: 7.25
}, {
    type: 'Souvenir FAMAS',
    name: 'Cyanospatter',
    quality: 'Battle-Scarred',
    marketPrice: 6.01,
    avgPrice: 6.66
}, {
    type: 'FAMAS',
    name: 'Djinn',
    quality: 'Factory New',
    marketPrice: 4.34,
    avgPrice: 3.85
}, {
    type: 'FAMAS',
    name: 'Djinn',
    quality: 'Minimal Wear',
    marketPrice: 1.58,
    avgPrice: 1.64
}, {
    type: 'FAMAS',
    name: 'Djinn',
    quality: 'Field-Tested',
    marketPrice: 1.17,
    avgPrice: 1.14
}, {
    type: 'FAMAS',
    name: 'Djinn',
    quality: 'Well-Worn',
    marketPrice: 1.19,
    avgPrice: 1.10
}, {
    type: 'FAMAS',
    name: 'Djinn',
    quality: 'Battle-Scarred',
    marketPrice: 1.32,
    avgPrice: 1.08
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Djinn',
    quality: 'Factory New',
    marketPrice: 15.00,
    avgPrice: 14.52
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Djinn',
    quality: 'Minimal Wear',
    marketPrice: 6.32,
    avgPrice: 5.45
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Djinn',
    quality: 'Field-Tested',
    marketPrice: 2.93,
    avgPrice: 2.74
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Djinn',
    quality: 'Well-Worn',
    marketPrice: 2.78,
    avgPrice: 2.57
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Djinn',
    quality: 'Battle-Scarred',
    marketPrice: 3.01,
    avgPrice: 2.55
}, {
    type: 'FAMAS',
    name: 'Doomkitty',
    quality: 'Minimal Wear',
    marketPrice: 0.61,
    avgPrice: 0.59
}, {
    type: 'FAMAS',
    name: 'Doomkitty',
    quality: 'Field-Tested',
    marketPrice: 0.52,
    avgPrice: 0.59
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Doomkitty',
    quality: 'Minimal Wear',
    marketPrice: 1.58,
    avgPrice: 1.42
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Doomkitty',
    quality: 'Field-Tested',
    marketPrice: 1.46,
    avgPrice: 1.31
}, {
    type: 'FAMAS',
    name: 'Hexane',
    quality: 'Factory New',
    marketPrice: 1.10,
    avgPrice: 1.03
}, {
    type: 'FAMAS',
    name: 'Hexane',
    quality: 'Minimal Wear',
    marketPrice: 0.88,
    avgPrice: 0.79
}, {
    type: 'FAMAS',
    name: 'Hexane',
    quality: 'Field-Tested',
    marketPrice: 0.73,
    avgPrice: 0.65
}, {
    type: 'FAMAS',
    name: 'Hexane',
    quality: 'Well-Worn',
    marketPrice: 1.04,
    avgPrice: 0.94
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Hexane',
    quality: 'Factory New',
    marketPrice: 3.30,
    avgPrice: 3.05
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Hexane',
    quality: 'Minimal Wear',
    marketPrice: 2.07,
    avgPrice: 1.99
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Hexane',
    quality: 'Field-Tested',
    marketPrice: 1.66,
    avgPrice: 1.34
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Hexane',
    quality: 'Well-Worn',
    marketPrice: 3.83,
    avgPrice: 3.31
}, {
    type: 'FAMAS',
    name: 'Neural Net',
    quality: 'Factory New',
    marketPrice: 0.61,
    avgPrice: 0.56
}, {
    type: 'FAMAS',
    name: 'Neural Net',
    quality: 'Minimal Wear',
    marketPrice: 0.36,
    avgPrice: 0.33
}, {
    type: 'FAMAS',
    name: 'Neural Net',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'FAMAS',
    name: 'Neural Net',
    quality: 'Well-Worn',
    marketPrice: 0.35,
    avgPrice: 0.33
}, {
    type: 'FAMAS',
    name: 'Neural Net',
    quality: 'Battle-Scarred',
    marketPrice: 0.31,
    avgPrice: 0.27
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Neural Net',
    quality: 'Factory New',
    marketPrice: 2.67,
    avgPrice: 2.65
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Neural Net',
    quality: 'Minimal Wear',
    marketPrice: 1.53,
    avgPrice: 1.39
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Neural Net',
    quality: 'Field-Tested',
    marketPrice: 0.82,
    avgPrice: 0.82
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Neural Net',
    quality: 'Well-Worn',
    marketPrice: 0.94,
    avgPrice: 0.99
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Neural Net',
    quality: 'Battle-Scarred',
    marketPrice: 0.74,
    avgPrice: 0.77
}, {
    type: 'FAMAS',
    name: 'Pulse',
    quality: 'Factory New',
    marketPrice: 1.45,
    avgPrice: 1.42
}, {
    type: 'FAMAS',
    name: 'Pulse',
    quality: 'Minimal Wear',
    marketPrice: 1.11,
    avgPrice: 1.08
}, {
    type: 'FAMAS',
    name: 'Pulse',
    quality: 'Field-Tested',
    marketPrice: 0.98,
    avgPrice: 0.94
}, {
    type: 'FAMAS',
    name: 'Pulse',
    quality: 'Well-Worn',
    marketPrice: 1.24,
    avgPrice: 1.20
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Pulse',
    quality: 'Factory New',
    marketPrice: 5.56,
    avgPrice: 5.09
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Pulse',
    quality: 'Minimal Wear',
    marketPrice: 3.53,
    avgPrice: 3.11
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Pulse',
    quality: 'Field-Tested',
    marketPrice: 2.55,
    avgPrice: 2.35
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Pulse',
    quality: 'Well-Worn',
    marketPrice: 5.48,
    avgPrice: 4.30
}, {
    type: 'FAMAS',
    name: 'Sergeant',
    quality: 'Minimal Wear',
    marketPrice: 0.83,
    avgPrice: 0.84
}, {
    type: 'FAMAS',
    name: 'Sergeant',
    quality: 'Field-Tested',
    marketPrice: 0.38,
    avgPrice: 0.36
}, {
    type: 'FAMAS',
    name: 'Sergeant',
    quality: 'Well-Worn',
    marketPrice: 0.34,
    avgPrice: 0.35
}, {
    type: 'FAMAS',
    name: 'Sergeant',
    quality: 'Battle-Scarred',
    marketPrice: 0.36,
    avgPrice: 0.32
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Sergeant',
    quality: 'Minimal Wear',
    marketPrice: 3.60,
    avgPrice: 3.61
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Sergeant',
    quality: 'Field-Tested',
    marketPrice: 1.38,
    avgPrice: 1.16
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Sergeant',
    quality: 'Well-Worn',
    marketPrice: 1.11,
    avgPrice: 0.99
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Sergeant',
    quality: 'Battle-Scarred',
    marketPrice: 0.88,
    avgPrice: 0.84
}, {
    type: 'FAMAS',
    name: 'Spitfire',
    quality: 'Factory New',
    marketPrice: 174.80,
    avgPrice: 151.17
}, {
    type: 'FAMAS',
    name: 'Spitfire',
    quality: 'Minimal Wear',
    marketPrice: 19.10,
    avgPrice: 18.70
}, {
    type: 'FAMAS',
    name: 'Spitfire',
    quality: 'Field-Tested',
    marketPrice: 4.00,
    avgPrice: 3.86
}, {
    type: 'FAMAS',
    name: 'Spitfire',
    quality: 'Well-Worn',
    marketPrice: 4.09,
    avgPrice: 3.57
}, {
    type: 'FAMAS',
    name: 'Spitfire',
    quality: 'Battle-Scarred',
    marketPrice: 1.98,
    avgPrice: 2.03
}, {
    type: 'FAMAS',
    name: 'Styx',
    quality: 'Factory New',
    marketPrice: 4.67,
    avgPrice: 4.11
}, {
    type: 'FAMAS',
    name: 'Styx',
    quality: 'Minimal Wear',
    marketPrice: 2.00,
    avgPrice: 2.12
}, {
    type: 'FAMAS',
    name: 'Styx',
    quality: 'Field-Tested',
    marketPrice: 0.74,
    avgPrice: 0.72
}, {
    type: 'FAMAS',
    name: 'Styx',
    quality: 'Well-Worn',
    marketPrice: 1.00,
    avgPrice: 1.01
}, {
    type: 'FAMAS',
    name: 'Styx',
    quality: 'Battle-Scarred',
    marketPrice: 0.49,
    avgPrice: 0.39
}, {
    type: 'Souvenir FAMAS',
    name: 'Styx',
    quality: 'Factory New',
    marketPrice: 34.00,
    avgPrice: 37.37
}, {
    type: 'Souvenir FAMAS',
    name: 'Styx',
    quality: 'Minimal Wear',
    marketPrice: 16.11,
    avgPrice: 14.51
}, {
    type: 'Souvenir FAMAS',
    name: 'Styx',
    quality: 'Field-Tested',
    marketPrice: 4.87,
    avgPrice: 4.88
}, {
    type: 'Souvenir FAMAS',
    name: 'Styx',
    quality: 'Well-Worn',
    marketPrice: 7.62,
    avgPrice: 5.61
}, {
    type: 'Souvenir FAMAS',
    name: 'Styx',
    quality: 'Battle-Scarred',
    marketPrice: 3.56,
    avgPrice: 4.07
}, {
    type: 'FAMAS',
    name: 'Survivor Z',
    quality: 'Factory New',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'FAMAS',
    name: 'Survivor Z',
    quality: 'Minimal Wear',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'FAMAS',
    name: 'Survivor Z',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'FAMAS',
    name: 'Survivor Z',
    quality: 'Well-Worn',
    marketPrice: 0.14,
    avgPrice: 0.13
}, {
    type: 'FAMAS',
    name: 'Survivor Z',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Survivor Z',
    quality: 'Factory New',
    marketPrice: 1.39,
    avgPrice: 1.28
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Survivor Z',
    quality: 'Minimal Wear',
    marketPrice: 0.75,
    avgPrice: 0.75
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Survivor Z',
    quality: 'Field-Tested',
    marketPrice: 0.51,
    avgPrice: 0.48
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Survivor Z',
    quality: 'Well-Worn',
    marketPrice: 0.64,
    avgPrice: 0.64
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Survivor Z',
    quality: 'Battle-Scarred',
    marketPrice: 0.49,
    avgPrice: 0.49
}, {
    type: 'FAMAS',
    name: 'Teardown',
    quality: 'Factory New',
    marketPrice: 0.41,
    avgPrice: 0.39
}, {
    type: 'FAMAS',
    name: 'Teardown',
    quality: 'Minimal Wear',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'FAMAS',
    name: 'Teardown',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'FAMAS',
    name: 'Teardown',
    quality: 'Well-Worn',
    marketPrice: 0.32,
    avgPrice: 0.30
}, {
    type: 'FAMAS',
    name: 'Teardown',
    quality: 'Battle-Scarred',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'Souvenir FAMAS',
    name: 'Teardown',
    quality: 'Factory New',
    marketPrice: 66.63,
    avgPrice: 52.61
}, {
    type: 'Souvenir FAMAS',
    name: 'Teardown',
    quality: 'Minimal Wear',
    marketPrice: 20.31,
    avgPrice: 13.55
}, {
    type: 'Souvenir FAMAS',
    name: 'Teardown',
    quality: 'Field-Tested',
    marketPrice: 19.98,
    avgPrice: 8.19
}, {
    type: 'Souvenir FAMAS',
    name: 'Teardown',
    quality: 'Well-Worn',
    marketPrice: 34.42,
    avgPrice: 32.08
}, {
    type: 'FAMAS',
    name: 'Valence',
    quality: 'Factory New',
    marketPrice: 3.31,
    avgPrice: 3.26
}, {
    type: 'FAMAS',
    name: 'Valence',
    quality: 'Minimal Wear',
    marketPrice: 1.47,
    avgPrice: 1.35
}, {
    type: 'FAMAS',
    name: 'Valence',
    quality: 'Field-Tested',
    marketPrice: 0.62,
    avgPrice: 0.64
}, {
    type: 'FAMAS',
    name: 'Valence',
    quality: 'Well-Worn',
    marketPrice: 0.99,
    avgPrice: 1.04
}, {
    type: 'FAMAS',
    name: 'Valence',
    quality: 'Battle-Scarred',
    marketPrice: 0.53,
    avgPrice: 0.50
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Valence',
    quality: 'Factory New',
    marketPrice: 16.47,
    avgPrice: 14.36
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Valence',
    quality: 'Minimal Wear',
    marketPrice: 5.00,
    avgPrice: 5.28
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Valence',
    quality: 'Field-Tested',
    marketPrice: 2.69,
    avgPrice: 2.53
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Valence',
    quality: 'Well-Worn',
    marketPrice: 4.00,
    avgPrice: 3.72
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Valence',
    quality: 'Battle-Scarred',
    marketPrice: 2.07,
    avgPrice: 2.00
}, {
    type: 'Five-SeveN',
    name: 'Anodized Gunmetal',
    quality: 'Factory New',
    marketPrice: 1.91,
    avgPrice: 1.84
}, {
    type: 'Five-SeveN',
    name: 'Anodized Gunmetal',
    quality: 'Minimal Wear',
    marketPrice: 1.50,
    avgPrice: 1.64
}, {
    type: 'Five-SeveN',
    name: 'Candy Apple',
    quality: 'Factory New',
    marketPrice: 8.91,
    avgPrice: 7.91
}, {
    type: 'Five-SeveN',
    name: 'Candy Apple',
    quality: 'Minimal Wear',
    marketPrice: 8.28,
    avgPrice: 6.79
}, {
    type: 'Five-SeveN',
    name: 'Candy Apple',
    quality: 'Field-Tested',
    marketPrice: 8.81,
    avgPrice: 6.76
}, {
    type: 'Five-SeveN',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 9.22,
    avgPrice: 10.17
}, {
    type: 'Five-SeveN',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 4.26,
    avgPrice: 4.45
}, {
    type: 'Five-SeveN',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 2.93,
    avgPrice: 2.74
}, {
    type: 'Five-SeveN',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 2.67,
    avgPrice: 2.50
}, {
    type: 'Five-SeveN',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 2.49,
    avgPrice: 2.35
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 45.00,
    avgPrice: 46.38
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 19.98,
    avgPrice: 21.50
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 10.38,
    avgPrice: 11.40
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 8.33,
    avgPrice: 8.23
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 7.59,
    avgPrice: 8.93
}, {
    type: 'Cologne 2016 Overpass Souvenir Package',
    name: '',
    quality: '',
    marketPrice: 9.44,
    avgPrice: 8.99
}, {
    type: 'Five-SeveN',
    name: 'Contractor',
    quality: 'Factory New',
    marketPrice: 2.23,
    avgPrice: 2.36
}, {
    type: 'Five-SeveN',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.31
}, {
    type: 'Five-SeveN',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.12
}, {
    type: 'Five-SeveN',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.20
}, {
    type: 'Five-SeveN',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.20
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Contractor',
    quality: 'Factory New',
    marketPrice: 5.99,
    avgPrice: 6.47
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 0.96,
    avgPrice: 0.89
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.42,
    avgPrice: 0.39
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 0.53,
    avgPrice: 0.49
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 0.38,
    avgPrice: 0.38
}, {
    type: 'Five-SeveN',
    name: 'Copper Galaxy',
    quality: 'Factory New',
    marketPrice: 1.63,
    avgPrice: 1.42
}, {
    type: 'Five-SeveN',
    name: 'Copper Galaxy',
    quality: 'Minimal Wear',
    marketPrice: 1.40,
    avgPrice: 1.43
}, {
    type: 'Five-SeveN',
    name: 'Copper Galaxy',
    quality: 'Field-Tested',
    marketPrice: 1.10,
    avgPrice: 1.05
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Copper Galaxy',
    quality: 'Factory New',
    marketPrice: 7.90,
    avgPrice: 8.41
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Copper Galaxy',
    quality: 'Minimal Wear',
    marketPrice: 6.68,
    avgPrice: 6.06
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Copper Galaxy',
    quality: 'Field-Tested',
    marketPrice: 2.93,
    avgPrice: 3.22
}, {
    type: 'Five-SeveN',
    name: 'Forest Night',
    quality: 'Factory New',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'Five-SeveN',
    name: 'Forest Night',
    quality: 'Minimal Wear',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Five-SeveN',
    name: 'Forest Night',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Five-SeveN',
    name: 'Forest Night',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Five-SeveN',
    name: 'Forest Night',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Forest Night',
    quality: 'Factory New',
    marketPrice: 5.57,
    avgPrice: 6.68
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Forest Night',
    quality: 'Minimal Wear',
    marketPrice: 1.10,
    avgPrice: 1.11
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Forest Night',
    quality: 'Field-Tested',
    marketPrice: 0.43,
    avgPrice: 0.45
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Forest Night',
    quality: 'Well-Worn',
    marketPrice: 0.52,
    avgPrice: 0.51
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Forest Night',
    quality: 'Battle-Scarred',
    marketPrice: 0.47,
    avgPrice: 0.44
}, {
    type: 'Five-SeveN',
    name: 'Fowl Play',
    quality: 'Factory New',
    marketPrice: 2.95,
    avgPrice: 2.48
}, {
    type: 'Five-SeveN',
    name: 'Fowl Play',
    quality: 'Minimal Wear',
    marketPrice: 1.63,
    avgPrice: 1.49
}, {
    type: 'Five-SeveN',
    name: 'Fowl Play',
    quality: 'Field-Tested',
    marketPrice: 1.10,
    avgPrice: 1.12
}, {
    type: 'Five-SeveN',
    name: 'Fowl Play',
    quality: 'Well-Worn',
    marketPrice: 1.15,
    avgPrice: 1.11
}, {
    type: 'Five-SeveN',
    name: 'Fowl Play',
    quality: 'Battle-Scarred',
    marketPrice: 1.19,
    avgPrice: 1.10
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Fowl Play',
    quality: 'Factory New',
    marketPrice: 10.54,
    avgPrice: 10.65
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Fowl Play',
    quality: 'Minimal Wear',
    marketPrice: 5.59,
    avgPrice: 4.76
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Fowl Play',
    quality: 'Field-Tested',
    marketPrice: 3.35,
    avgPrice: 2.99
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Fowl Play',
    quality: 'Well-Worn',
    marketPrice: 3.13,
    avgPrice: 2.71
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Fowl Play',
    quality: 'Battle-Scarred',
    marketPrice: 2.80,
    avgPrice: 2.63
}, {
    type: 'Gamma Case',
    name: '',
    quality: '',
    marketPrice: 1.66,
    avgPrice: 1.76
}, {
    type: 'Gamma Case Key',
    name: '',
    quality: '',
    marketPrice: 2.73,
    avgPrice: 2.73
}, {
    type: 'Five-SeveN',
    name: 'Hot Shot',
    quality: 'Factory New',
    marketPrice: 1.18,
    avgPrice: 1.08
}, {
    type: 'Five-SeveN',
    name: 'Hot Shot',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.31
}, {
    type: 'Five-SeveN',
    name: 'Hot Shot',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'Five-SeveN',
    name: 'Hot Shot',
    quality: 'Well-Worn',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'Five-SeveN',
    name: 'Hot Shot',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Hot Shot',
    quality: 'Factory New',
    marketPrice: 8.98,
    avgPrice: 8.92
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Hot Shot',
    quality: 'Minimal Wear',
    marketPrice: 2.27,
    avgPrice: 2.29
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Hot Shot',
    quality: 'Field-Tested',
    marketPrice: 0.85,
    avgPrice: 0.82
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Hot Shot',
    quality: 'Well-Worn',
    marketPrice: 0.55,
    avgPrice: 0.64
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Hot Shot',
    quality: 'Battle-Scarred',
    marketPrice: 0.66,
    avgPrice: 0.58
}, {
    type: 'Five-SeveN',
    name: 'Jungle',
    quality: 'Factory New',
    marketPrice: 6.90,
    avgPrice: 7.93
}, {
    type: 'Five-SeveN',
    name: 'Jungle',
    quality: 'Minimal Wear',
    marketPrice: 0.38,
    avgPrice: 0.35
}, {
    type: 'Five-SeveN',
    name: 'Jungle',
    quality: 'Field-Tested',
    marketPrice: 0.65,
    avgPrice: 1.04
}, {
    type: 'Five-SeveN',
    name: 'Jungle',
    quality: 'Well-Worn',
    marketPrice: 0.31,
    avgPrice: 0.27
}, {
    type: 'Five-SeveN',
    name: 'Jungle',
    quality: 'Battle-Scarred',
    marketPrice: 0.39,
    avgPrice: 0.42
}, {
    type: 'Five-SeveN',
    name: 'Kami',
    quality: 'Factory New',
    marketPrice: 0.43,
    avgPrice: 0.43
}, {
    type: 'Five-SeveN',
    name: 'Kami',
    quality: 'Minimal Wear',
    marketPrice: 0.36,
    avgPrice: 0.35
}, {
    type: 'Five-SeveN',
    name: 'Kami',
    quality: 'Field-Tested',
    marketPrice: 0.37,
    avgPrice: 0.33
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Kami',
    quality: 'Factory New',
    marketPrice: 1.45,
    avgPrice: 1.43
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Kami',
    quality: 'Minimal Wear',
    marketPrice: 1.12,
    avgPrice: 1.08
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Kami',
    quality: 'Field-Tested',
    marketPrice: 1.08,
    avgPrice: 1.03
}, {
    type: 'Five-SeveN',
    name: 'Monkey Business',
    quality: 'Minimal Wear',
    marketPrice: 5.67,
    avgPrice: 5.40
}, {
    type: 'Five-SeveN',
    name: 'Monkey Business',
    quality: 'Field-Tested',
    marketPrice: 1.28,
    avgPrice: 1.24
}, {
    type: 'Five-SeveN',
    name: 'Monkey Business',
    quality: 'Well-Worn',
    marketPrice: 1.20,
    avgPrice: 1.18
}, {
    type: 'Five-SeveN',
    name: 'Monkey Business',
    quality: 'Battle-Scarred',
    marketPrice: 1.12,
    avgPrice: 1.11
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Monkey Business',
    quality: 'Minimal Wear',
    marketPrice: 25.54,
    avgPrice: 22.52
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Monkey Business',
    quality: 'Field-Tested',
    marketPrice: 4.44,
    avgPrice: 4.39
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Monkey Business',
    quality: 'Well-Worn',
    marketPrice: 4.09,
    avgPrice: 3.79
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Monkey Business',
    quality: 'Battle-Scarred',
    marketPrice: 2.93,
    avgPrice: 2.77
}, {
    type: 'Five-SeveN',
    name: 'Neon Kimono',
    quality: 'Factory New',
    marketPrice: 14.90,
    avgPrice: 14.01
}, {
    type: 'Five-SeveN',
    name: 'Neon Kimono',
    quality: 'Minimal Wear',
    marketPrice: 12.24,
    avgPrice: 10.74
}, {
    type: 'Five-SeveN',
    name: 'Neon Kimono',
    quality: 'Field-Tested',
    marketPrice: 5.84,
    avgPrice: 5.34
}, {
    type: 'Five-SeveN',
    name: 'Neon Kimono',
    quality: 'Well-Worn',
    marketPrice: 5.00,
    avgPrice: 5.66
}, {
    type: 'Five-SeveN',
    name: 'Neon Kimono',
    quality: 'Battle-Scarred',
    marketPrice: 4.77,
    avgPrice: 4.53
}, {
    type: 'Five-SeveN',
    name: 'Nightshade',
    quality: 'Factory New',
    marketPrice: 0.65,
    avgPrice: 0.53
}, {
    type: 'Five-SeveN',
    name: 'Nightshade',
    quality: 'Minimal Wear',
    marketPrice: 0.40,
    avgPrice: 0.40
}, {
    type: 'Five-SeveN',
    name: 'Nightshade',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'Five-SeveN',
    name: 'Nightshade',
    quality: 'Well-Worn',
    marketPrice: 0.34,
    avgPrice: 0.35
}, {
    type: 'Five-SeveN',
    name: 'Nightshade',
    quality: 'Battle-Scarred',
    marketPrice: 0.39,
    avgPrice: 0.34
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Nightshade',
    quality: 'Factory New',
    marketPrice: 1.80,
    avgPrice: 1.73
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Nightshade',
    quality: 'Minimal Wear',
    marketPrice: 1.28,
    avgPrice: 1.27
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Nightshade',
    quality: 'Field-Tested',
    marketPrice: 1.01,
    avgPrice: 0.98
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Nightshade',
    quality: 'Well-Worn',
    marketPrice: 1.27,
    avgPrice: 1.05
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Nightshade',
    quality: 'Battle-Scarred',
    marketPrice: 1.62,
    avgPrice: 1.15
}, {
    type: 'Five-SeveN',
    name: 'Nitro',
    quality: 'Factory New',
    marketPrice: 8.48,
    avgPrice: 8.52
}, {
    type: 'Five-SeveN',
    name: 'Nitro',
    quality: 'Minimal Wear',
    marketPrice: 1.07,
    avgPrice: 1.01
}, {
    type: 'Five-SeveN',
    name: 'Nitro',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.51
}, {
    type: 'Five-SeveN',
    name: 'Nitro',
    quality: 'Well-Worn',
    marketPrice: 0.57,
    avgPrice: 0.55
}, {
    type: 'Five-SeveN',
    name: 'Nitro',
    quality: 'Battle-Scarred',
    marketPrice: 0.54,
    avgPrice: 0.47
}, {
    type: 'Five-SeveN',
    name: 'Orange Peel',
    quality: 'Factory New',
    marketPrice: 0.71,
    avgPrice: 0.64
}, {
    type: 'Five-SeveN',
    name: 'Orange Peel',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Five-SeveN',
    name: 'Orange Peel',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Five-SeveN',
    name: 'Orange Peel',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Five-SeveN',
    name: 'Orange Peel',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Orange Peel',
    quality: 'Factory New',
    marketPrice: 51.98,
    avgPrice: 32.08
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Orange Peel',
    quality: 'Minimal Wear',
    marketPrice: 2.94,
    avgPrice: 2.60
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Orange Peel',
    quality: 'Field-Tested',
    marketPrice: 0.78,
    avgPrice: 0.73
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Orange Peel',
    quality: 'Well-Worn',
    marketPrice: 0.94,
    avgPrice: 0.97
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Orange Peel',
    quality: 'Battle-Scarred',
    marketPrice: 0.77,
    avgPrice: 0.77
}, {
    type: 'Five-SeveN',
    name: 'Retrobution',
    quality: 'Factory New',
    marketPrice: 2.79,
    avgPrice: 2.35
}, {
    type: 'Five-SeveN',
    name: 'Retrobution',
    quality: 'Minimal Wear',
    marketPrice: 0.95,
    avgPrice: 1.00
}, {
    type: 'Five-SeveN',
    name: 'Retrobution',
    quality: 'Field-Tested',
    marketPrice: 0.52,
    avgPrice: 0.51
}, {
    type: 'Five-SeveN',
    name: 'Retrobution',
    quality: 'Well-Worn',
    marketPrice: 0.50,
    avgPrice: 0.47
}, {
    type: 'Five-SeveN',
    name: 'Retrobution',
    quality: 'Battle-Scarred',
    marketPrice: 0.47,
    avgPrice: 0.43
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Retrobution',
    quality: 'Factory New',
    marketPrice: 13.22,
    avgPrice: 13.35
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Retrobution',
    quality: 'Minimal Wear',
    marketPrice: 4.55,
    avgPrice: 4.62
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Retrobution',
    quality: 'Field-Tested',
    marketPrice: 2.14,
    avgPrice: 2.14
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Retrobution',
    quality: 'Well-Worn',
    marketPrice: 1.74,
    avgPrice: 1.80
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Retrobution',
    quality: 'Battle-Scarred',
    marketPrice: 1.78,
    avgPrice: 1.53
}, {
    type: 'Five-SeveN',
    name: 'Silver Quartz',
    quality: 'Factory New',
    marketPrice: 0.40,
    avgPrice: 0.38
}, {
    type: 'Five-SeveN',
    name: 'Silver Quartz',
    quality: 'Minimal Wear',
    marketPrice: 0.24,
    avgPrice: 0.22
}, {
    type: 'Five-SeveN',
    name: 'Silver Quartz',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.17
}, {
    type: 'Five-SeveN',
    name: 'Silver Quartz',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Silver Quartz',
    quality: 'Factory New',
    marketPrice: 134.93,
    avgPrice: 132.62
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Silver Quartz',
    quality: 'Minimal Wear',
    marketPrice: 51.37,
    avgPrice: 16.44
}, {
    type: 'Souvenir Five-SeveN',
    name: 'Silver Quartz',
    quality: 'Field-Tested',
    marketPrice: 16.67,
    avgPrice: 12.67
}, {
    type: 'Five-SeveN',
    name: 'Triumvirate',
    quality: 'Factory New',
    marketPrice: 0.85,
    avgPrice: 0.92
}, {
    type: 'Five-SeveN',
    name: 'Triumvirate',
    quality: 'Minimal Wear',
    marketPrice: 0.57,
    avgPrice: 0.54
}, {
    type: 'Five-SeveN',
    name: 'Triumvirate',
    quality: 'Field-Tested',
    marketPrice: 0.38,
    avgPrice: 0.36
}, {
    type: 'Five-SeveN',
    name: 'Triumvirate',
    quality: 'Well-Worn',
    marketPrice: 0.49,
    avgPrice: 0.42
}, {
    type: 'Five-SeveN',
    name: 'Triumvirate',
    quality: 'Battle-Scarred',
    marketPrice: 0.34,
    avgPrice: 0.34
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Triumvirate',
    quality: 'Factory New',
    marketPrice: 4.46,
    avgPrice: 4.51
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Triumvirate',
    quality: 'Minimal Wear',
    marketPrice: 2.56,
    avgPrice: 2.55
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Triumvirate',
    quality: 'Field-Tested',
    marketPrice: 1.63,
    avgPrice: 1.49
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Triumvirate',
    quality: 'Well-Worn',
    marketPrice: 1.76,
    avgPrice: 1.68
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Triumvirate',
    quality: 'Battle-Scarred',
    marketPrice: 1.51,
    avgPrice: 1.29
}, {
    type: 'Five-SeveN',
    name: 'Urban Hazard',
    quality: 'Factory New',
    marketPrice: 0.60,
    avgPrice: 0.56
}, {
    type: 'Five-SeveN',
    name: 'Urban Hazard',
    quality: 'Minimal Wear',
    marketPrice: 0.48,
    avgPrice: 0.44
}, {
    type: 'Five-SeveN',
    name: 'Urban Hazard',
    quality: 'Field-Tested',
    marketPrice: 0.48,
    avgPrice: 0.42
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Urban Hazard',
    quality: 'Factory New',
    marketPrice: 2.30,
    avgPrice: 2.28
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Urban Hazard',
    quality: 'Minimal Wear',
    marketPrice: 1.72,
    avgPrice: 1.67
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Urban Hazard',
    quality: 'Field-Tested',
    marketPrice: 1.66,
    avgPrice: 1.54
}, {
    type: 'Five-SeveN',
    name: 'Violent Daimyo',
    quality: 'Factory New',
    marketPrice: 1.61,
    avgPrice: 1.78
}, {
    type: 'Five-SeveN',
    name: 'Violent Daimyo',
    quality: 'Minimal Wear',
    marketPrice: 1.00,
    avgPrice: 0.99
}, {
    type: 'Five-SeveN',
    name: 'Violent Daimyo',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.57
}, {
    type: 'Five-SeveN',
    name: 'Violent Daimyo',
    quality: 'Well-Worn',
    marketPrice: 0.80,
    avgPrice: 0.79
}, {
    type: 'Five-SeveN',
    name: 'Violent Daimyo',
    quality: 'Battle-Scarred',
    marketPrice: 0.42,
    avgPrice: 0.41
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Violent Daimyo',
    quality: 'Factory New',
    marketPrice: 8.07,
    avgPrice: 7.88
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Violent Daimyo',
    quality: 'Minimal Wear',
    marketPrice: 4.22,
    avgPrice: 3.91
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Violent Daimyo',
    quality: 'Field-Tested',
    marketPrice: 2.13,
    avgPrice: 2.13
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Violent Daimyo',
    quality: 'Well-Worn',
    marketPrice: 2.85,
    avgPrice: 2.82
}, {
    type: 'Five-SeveN',
    statTrak: true,
    name: 'Violent Daimyo',
    quality: 'Battle-Scarred',
    marketPrice: 1.63,
    avgPrice: 1.67
}, {
    type: 'Flip Knife',
    name: 'Autotronic',
    quality: 'Factory New',
    marketPrice: 319.27,
    avgPrice: 295.85
}, {
    type: 'Flip Knife',
    name: 'Autotronic',
    quality: 'Minimal Wear',
    marketPrice: 214.41,
    avgPrice: 195.59
}, {
    type: 'Flip Knife',
    name: 'Autotronic',
    quality: 'Field-Tested',
    marketPrice: 180.00,
    avgPrice: 155.98
}, {
    type: 'Flip Knife',
    name: 'Autotronic',
    quality: 'Battle-Scarred',
    marketPrice: 144.37,
    avgPrice: 140.61
}, {
    type: 'Flip Knife',
    name: 'Black Laminate',
    quality: 'Factory New',
    marketPrice: 155.49,
    avgPrice: 151.13
}, {
    type: 'Flip Knife',
    name: 'Black Laminate',
    quality: 'Minimal Wear',
    marketPrice: 127.70,
    avgPrice: 103.79
}, {
    type: 'Flip Knife',
    name: 'Black Laminate',
    quality: 'Field-Tested',
    marketPrice: 97.75,
    avgPrice: 89.46
}, {
    type: 'Flip Knife',
    name: 'Black Laminate',
    quality: 'Well-Worn',
    marketPrice: 110.00,
    avgPrice: 97.02
}, {
    type: 'Flip Knife',
    name: 'Black Laminate',
    quality: 'Battle-Scarred',
    marketPrice: 110.00,
    avgPrice: 103.01
}, {
    type: 'Flip Knife',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 109.27,
    avgPrice: 94.82
}, {
    type: 'Flip Knife',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 72.59,
    avgPrice: 70.82
}, {
    type: 'Flip Knife',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 63.85,
    avgPrice: 65.49
}, {
    type: 'Flip Knife',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 63.87,
    avgPrice: 62.05
}, {
    type: 'Flip Knife',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 70.98,
    avgPrice: 66.96
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 252.97,
    avgPrice: 163.64
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 122.16,
    avgPrice: 102.76
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 98.99,
    avgPrice: 88.50
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 104.39,
    avgPrice: 93.88
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 93.29,
    avgPrice: 87.50
}, {
    type: 'Flip Knife',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 112.36,
    avgPrice: 80.85
}, {
    type: 'Flip Knife',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 51.06,
    avgPrice: 55.80
}, {
    type: 'Flip Knife',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 50.95,
    avgPrice: 47.99
}, {
    type: 'Flip Knife',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 49.88,
    avgPrice: 51.69
}, {
    type: 'Flip Knife',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 50.00,
    avgPrice: 45.91
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 86.95,
    avgPrice: 94.77
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 77.75,
    avgPrice: 74.23
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 61.72,
    avgPrice: 66.21
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 171.62,
    avgPrice: 65.85
}, {
    type: 'Flip Knife',
    name: 'Bright Water',
    quality: 'Factory New',
    marketPrice: 144.99,
    avgPrice: 112.68
}, {
    type: 'Flip Knife',
    name: 'Bright Water',
    quality: 'Minimal Wear',
    marketPrice: 112.58,
    avgPrice: 122.50
}, {
    type: 'Flip Knife',
    name: 'Bright Water',
    quality: 'Field-Tested',
    marketPrice: 93.29,
    avgPrice: 96.25
}, {
    type: 'Flip Knife',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 129.65,
    avgPrice: 107.91
}, {
    type: 'Flip Knife',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 84.67,
    avgPrice: 81.90
}, {
    type: 'Flip Knife',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 79.31,
    avgPrice: 76.23
}, {
    type: 'Flip Knife',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 74.53,
    avgPrice: 72.37
}, {
    type: 'Flip Knife',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 75.80,
    avgPrice: 69.46
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 399.78,
    avgPrice: 306.25
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 127.70,
    avgPrice: 114.08
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 134.50,
    avgPrice: 119.82
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 126.82,
    avgPrice: 131.06
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 105.00,
    avgPrice: 86.93
}, {
    type: 'Flip Knife',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 603.75
}, {
    type: 'Flip Knife',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 182.82,
    avgPrice: 177.51
}, {
    type: 'Flip Knife',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 87.74,
    avgPrice: 94.94
}, {
    type: 'Flip Knife',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 99.74,
    avgPrice: 84.05
}, {
    type: 'Flip Knife',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 65.91,
    avgPrice: 61.55
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 305.22,
    avgPrice: 393.77
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 143.93,
    avgPrice: 131.19
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 222.10,
    avgPrice: 127.65
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 100.29,
    avgPrice: 77.71
}, {
    type: 'Flip Knife',
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 89.89,
    avgPrice: 88.53
}, {
    type: 'Flip Knife',
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 80.00,
    avgPrice: 75.66
}, {
    type: 'Flip Knife',
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 64.00,
    avgPrice: 65.90
}, {
    type: 'Flip Knife',
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 68.17,
    avgPrice: 61.34
}, {
    type: 'Flip Knife',
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 76.60,
    avgPrice: 72.45
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 179.44,
    avgPrice: 168.99
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 115.87,
    avgPrice: 124.93
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 89.96,
    avgPrice: 91.98
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 104.19,
    avgPrice: 91.97
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 95.13,
    avgPrice: 120.80
}, {
    type: 'Flip Knife',
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 143.25,
    avgPrice: 138.91
}, {
    type: 'Flip Knife',
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 165.00,
    avgPrice: 149.90
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 178.95,
    avgPrice: 195.11
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 335.00,
    avgPrice: 309.68
}, {
    type: 'Flip Knife',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 170.56,
    avgPrice: 165.22
}, {
    type: 'Flip Knife',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 220.00,
    avgPrice: 196.39
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 258.41,
    avgPrice: 250.55
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 398.08,
    avgPrice: 318.46
}, {
    type: 'Flip Knife',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 99.95,
    avgPrice: 125.64
}, {
    type: 'Flip Knife',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 61.08,
    avgPrice: 59.09
}, {
    type: 'Flip Knife',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 51.63,
    avgPrice: 48.59
}, {
    type: 'Flip Knife',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 51.68,
    avgPrice: 49.13
}, {
    type: 'Flip Knife',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 50.74,
    avgPrice: 45.53
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 111.05,
    avgPrice: 96.43
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 70.00,
    avgPrice: 62.34
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 71.12,
    avgPrice: 57.55
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 76.62,
    avgPrice: 69.83
}, {
    type: 'Flip Knife',
    name: 'Freehand',
    quality: 'Factory New',
    marketPrice: 277.62,
    avgPrice: 165.17
}, {
    type: 'Flip Knife',
    name: 'Freehand',
    quality: 'Minimal Wear',
    marketPrice: 149.80,
    avgPrice: 139.27
}, {
    type: 'Flip Knife',
    name: 'Freehand',
    quality: 'Field-Tested',
    marketPrice: 142.10,
    avgPrice: 132.25
}, {
    type: 'Flip Knife',
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 354.28,
    avgPrice: 677.50
}, {
    type: 'Flip Knife',
    name: 'Gamma Doppler',
    quality: 'Minimal Wear',
    marketPrice: 332.98,
    avgPrice: 307.46
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 398.08,
    avgPrice: 1331.25
}, {
    type: 'Flip Knife',
    name: 'Lore',
    quality: 'Factory New',
    marketPrice: 400.00,
    avgPrice: 550.00
}, {
    type: 'Flip Knife',
    name: 'Lore',
    quality: 'Minimal Wear',
    marketPrice: 320.00,
    avgPrice: 381.19
}, {
    type: 'Flip Knife',
    name: 'Lore',
    quality: 'Field-Tested',
    marketPrice: 230.00,
    avgPrice: 244.76
}, {
    type: 'Flip Knife',
    name: 'Lore',
    quality: 'Well-Worn',
    marketPrice: 0,
    avgPrice: 256.58
}, {
    type: 'Flip Knife',
    name: 'Lore',
    quality: 'Battle-Scarred',
    marketPrice: 253.00,
    avgPrice: 168.80
}, {
    type: 'Flip Knife',
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 194.12,
    avgPrice: 197.18
}, {
    type: 'Flip Knife',
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 247.17,
    avgPrice: 229.08
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 322.00,
    avgPrice: 412.50
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 379.00,
    avgPrice: 396.68
}, {
    type: 'Flip Knife',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 409.53,
    avgPrice: 403.66
}, {
    type: 'Flip Knife',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 100.05,
    avgPrice: 99.33
}, {
    type: 'Flip Knife',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 61.53,
    avgPrice: 62.06
}, {
    type: 'Flip Knife',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 65.64,
    avgPrice: 60.04
}, {
    type: 'Flip Knife',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 51.45,
    avgPrice: 50.86
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 2152.50
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 230.00,
    avgPrice: 153.58
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 98.99,
    avgPrice: 86.16
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 199.00,
    avgPrice: 99.28
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 76.94,
    avgPrice: 83.47
}, {
    type: 'Flip Knife',
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 68.00,
    avgPrice: 59.35
}, {
    type: 'Flip Knife',
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 59.92,
    avgPrice: 55.80
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 323.16,
    avgPrice: 125.24
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 88.82,
    avgPrice: 79.04
}, {
    type: 'Flip Knife',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 115.00,
    avgPrice: 68.08
}, {
    type: 'Flip Knife',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 46.00,
    avgPrice: 48.81
}, {
    type: 'Flip Knife',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 45.51,
    avgPrice: 44.08
}, {
    type: 'Flip Knife',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 52.79,
    avgPrice: 44.00
}, {
    type: 'Flip Knife',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 45.48,
    avgPrice: 43.42
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 91.05,
    avgPrice: 77.57
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 57.70,
    avgPrice: 50.90
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 99.61,
    avgPrice: 58.97
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 66.64,
    avgPrice: 54.54
}, {
    type: 'Flip Knife',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 360.00,
    avgPrice: 113.70
}, {
    type: 'Flip Knife',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 58.00,
    avgPrice: 55.10
}, {
    type: 'Flip Knife',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 46.80,
    avgPrice: 45.90
}, {
    type: 'Flip Knife',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 50.44,
    avgPrice: 50.74
}, {
    type: 'Flip Knife',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 50.37,
    avgPrice: 42.44
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 114.93,
    avgPrice: 99.66
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 60.03,
    avgPrice: 62.89
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 94.82,
    avgPrice: 70.71
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 83.29,
    avgPrice: 74.08
}, {
    type: 'Flip Knife',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 138.00,
    avgPrice: 138.17
}, {
    type: 'Flip Knife',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 131.50,
    avgPrice: 123.59
}, {
    type: 'Flip Knife',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 121.32,
    avgPrice: 116.47
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 221.95,
    avgPrice: 211.51
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 160.89,
    avgPrice: 161.96
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 177.69,
    avgPrice: 153.99
}, {
    type: 'Flip Knife',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 98.82,
    avgPrice: 82.25
}, {
    type: 'Flip Knife',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 61.98,
    avgPrice: 62.63
}, {
    type: 'Flip Knife',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 58.03,
    avgPrice: 56.77
}, {
    type: 'Flip Knife',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 58.56,
    avgPrice: 56.37
}, {
    type: 'Flip Knife',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 56.55,
    avgPrice: 54.51
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 346.74,
    avgPrice: 125.00
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 98.72,
    avgPrice: 136.79
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 78.85,
    avgPrice: 70.89
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 94.39,
    avgPrice: 82.22
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 79.95,
    avgPrice: 66.96
}, {
    type: 'Flip Knife',
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 162.19,
    avgPrice: 162.21
}, {
    type: 'Flip Knife',
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 189.78,
    avgPrice: 164.05
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 272.89,
    avgPrice: 236.38
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 339.99,
    avgPrice: 334.57
}, {
    type: 'Flip Knife',
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 381.23,
    avgPrice: 361.00
}, {
    type: 'Flip Knife',
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 107.25,
    avgPrice: 104.23
}, {
    type: 'Flip Knife',
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 69.97,
    avgPrice: 68.80
}, {
    type: 'Flip Knife',
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 67.89,
    avgPrice: 68.10
}, {
    type: 'Flip Knife',
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 56.72,
    avgPrice: 52.27
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 210.99,
    avgPrice: 164.81
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 101.13,
    avgPrice: 99.54
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 103.84,
    avgPrice: 103.43
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 89.70,
    avgPrice: 78.84
}, {
    type: 'Flip Knife',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 387.29,
    avgPrice: 115.64
}, {
    type: 'Flip Knife',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 58.60,
    avgPrice: 58.29
}, {
    type: 'Flip Knife',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 51.25,
    avgPrice: 48.60
}, {
    type: 'Flip Knife',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 54.40,
    avgPrice: 52.99
}, {
    type: 'Flip Knife',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 47.03,
    avgPrice: 45.76
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 120.00
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 127.70,
    avgPrice: 110.67
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 76.62,
    avgPrice: 60.72
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 75.52,
    avgPrice: 82.81
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 96.57,
    avgPrice: 53.05
}, {
    type: 'Flip Knife',
    name: '',
    quality: '',
    marketPrice: 63.98,
    avgPrice: 60.50
}, {
    type: 'Flip Knife',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 84.90,
    avgPrice: 81.59
}, {
    type: 'G3SG1',
    name: 'Arctic Camo',
    quality: 'Factory New',
    marketPrice: 36.51,
    avgPrice: 24.08
}, {
    type: 'G3SG1',
    name: 'Arctic Camo',
    quality: 'Minimal Wear',
    marketPrice: 2.11,
    avgPrice: 2.03
}, {
    type: 'G3SG1',
    name: 'Arctic Camo',
    quality: 'Field-Tested',
    marketPrice: 0.74,
    avgPrice: 0.68
}, {
    type: 'G3SG1',
    name: 'Arctic Camo',
    quality: 'Well-Worn',
    marketPrice: 3.60,
    avgPrice: 2.92
}, {
    type: 'G3SG1',
    name: 'Arctic Camo',
    quality: 'Battle-Scarred',
    marketPrice: 5.35,
    avgPrice: 5.40
}, {
    type: 'G3SG1',
    name: 'Azure Zebra',
    quality: 'Factory New',
    marketPrice: 0.35,
    avgPrice: 0.31
}, {
    type: 'G3SG1',
    name: 'Azure Zebra',
    quality: 'Minimal Wear',
    marketPrice: 0.27,
    avgPrice: 0.24
}, {
    type: 'G3SG1',
    name: 'Azure Zebra',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.23
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Azure Zebra',
    quality: 'Factory New',
    marketPrice: 1.04,
    avgPrice: 1.05
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Azure Zebra',
    quality: 'Minimal Wear',
    marketPrice: 0.77,
    avgPrice: 0.79
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Azure Zebra',
    quality: 'Field-Tested',
    marketPrice: 0.77,
    avgPrice: 0.79
}, {
    type: 'G3SG1',
    name: 'Chronos',
    quality: 'Factory New',
    marketPrice: 19.70,
    avgPrice: 16.77
}, {
    type: 'G3SG1',
    name: 'Chronos',
    quality: 'Minimal Wear',
    marketPrice: 15.43,
    avgPrice: 13.26
}, {
    type: 'G3SG1',
    name: 'Chronos',
    quality: 'Field-Tested',
    marketPrice: 13.14,
    avgPrice: 12.70
}, {
    type: 'G3SG1',
    name: 'Chronos',
    quality: 'Well-Worn',
    marketPrice: 22.24,
    avgPrice: 16.71
}, {
    type: 'Cologne 2016 Train Souvenir Package',
    name: '',
    quality: '',
    marketPrice: 2.26,
    avgPrice: 2.07
}, {
    type: 'G3SG1',
    name: 'Contractor',
    quality: 'Factory New',
    marketPrice: 3.08,
    avgPrice: 2.57
}, {
    type: 'G3SG1',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'G3SG1',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.21,
    avgPrice: 0.19
}, {
    type: 'G3SG1',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.22
}, {
    type: 'G3SG1',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 0.31,
    avgPrice: 1.09
}, {
    type: 'G3SG1',
    name: 'Demeter',
    quality: 'Factory New',
    marketPrice: 5.91,
    avgPrice: 5.93
}, {
    type: 'G3SG1',
    name: 'Demeter',
    quality: 'Minimal Wear',
    marketPrice: 0.89,
    avgPrice: 0.73
}, {
    type: 'G3SG1',
    name: 'Demeter',
    quality: 'Field-Tested',
    marketPrice: 0.74,
    avgPrice: 0.65
}, {
    type: 'G3SG1',
    name: 'Demeter',
    quality: 'Well-Worn',
    marketPrice: 0.64,
    avgPrice: 0.59
}, {
    type: 'G3SG1',
    name: 'Demeter',
    quality: 'Battle-Scarred',
    marketPrice: 0.66,
    avgPrice: 2.00
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Demeter',
    quality: 'Factory New',
    marketPrice: 42.66,
    avgPrice: 24.60
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Demeter',
    quality: 'Minimal Wear',
    marketPrice: 2.30,
    avgPrice: 2.15
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Demeter',
    quality: 'Field-Tested',
    marketPrice: 1.45,
    avgPrice: 1.23
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Demeter',
    quality: 'Well-Worn',
    marketPrice: 1.42,
    avgPrice: 1.43
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Demeter',
    quality: 'Battle-Scarred',
    marketPrice: 1.33,
    avgPrice: 1.26
}, {
    type: 'G3SG1',
    name: 'Desert Storm',
    quality: 'Factory New',
    marketPrice: 0.11,
    avgPrice: 0.11
}, {
    type: 'G3SG1',
    name: 'Desert Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Desert Storm',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Desert Storm',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Desert Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'Souvenir G3SG1',
    name: 'Desert Storm',
    quality: 'Factory New',
    marketPrice: 7.60,
    avgPrice: 7.16
}, {
    type: 'Souvenir G3SG1',
    name: 'Desert Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.36,
    avgPrice: 0.32
}, {
    type: 'Souvenir G3SG1',
    name: 'Desert Storm',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.16
}, {
    type: 'Souvenir G3SG1',
    name: 'Desert Storm',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'Souvenir G3SG1',
    name: 'Desert Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'G3SG1',
    name: 'Flux',
    quality: 'Factory New',
    marketPrice: 5.43,
    avgPrice: 5.08
}, {
    type: 'G3SG1',
    name: 'Flux',
    quality: 'Minimal Wear',
    marketPrice: 2.93,
    avgPrice: 2.81
}, {
    type: 'G3SG1',
    name: 'Flux',
    quality: 'Field-Tested',
    marketPrice: 1.91,
    avgPrice: 1.87
}, {
    type: 'G3SG1',
    name: 'Flux',
    quality: 'Well-Worn',
    marketPrice: 2.11,
    avgPrice: 1.84
}, {
    type: 'G3SG1',
    name: 'Flux',
    quality: 'Battle-Scarred',
    marketPrice: 1.84,
    avgPrice: 1.71
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Flux',
    quality: 'Factory New',
    marketPrice: 23.47,
    avgPrice: 22.45
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Flux',
    quality: 'Minimal Wear',
    marketPrice: 9.62,
    avgPrice: 9.35
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Flux',
    quality: 'Field-Tested',
    marketPrice: 5.43,
    avgPrice: 5.09
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Flux',
    quality: 'Well-Worn',
    marketPrice: 5.11,
    avgPrice: 4.63
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Flux',
    quality: 'Battle-Scarred',
    marketPrice: 4.91,
    avgPrice: 4.24
}, {
    type: 'G3SG1',
    name: 'Green Apple',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'G3SG1',
    name: 'Green Apple',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Green Apple',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'G3SG1',
    name: 'Jungle Dashed',
    quality: 'Factory New',
    marketPrice: 0.09,
    avgPrice: 0.09
}, {
    type: 'G3SG1',
    name: 'Jungle Dashed',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Jungle Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Jungle Dashed',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Jungle Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir G3SG1',
    name: 'Jungle Dashed',
    quality: 'Minimal Wear',
    marketPrice: 1.40,
    avgPrice: 1.76
}, {
    type: 'Souvenir G3SG1',
    name: 'Jungle Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.50,
    avgPrice: 0.53
}, {
    type: 'Souvenir G3SG1',
    name: 'Jungle Dashed',
    quality: 'Well-Worn',
    marketPrice: 2.60,
    avgPrice: 2.83
}, {
    type: 'Souvenir G3SG1',
    name: 'Jungle Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 5.49,
    avgPrice: 3.41
}, {
    type: 'G3SG1',
    name: 'Murky',
    quality: 'Factory New',
    marketPrice: 0.26,
    avgPrice: 0.26
}, {
    type: 'G3SG1',
    name: 'Murky',
    quality: 'Minimal Wear',
    marketPrice: 0.25,
    avgPrice: 0.21
}, {
    type: 'G3SG1',
    name: 'Murky',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.23
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Murky',
    quality: 'Factory New',
    marketPrice: 1.00,
    avgPrice: 1.04
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Murky',
    quality: 'Minimal Wear',
    marketPrice: 0.64,
    avgPrice: 0.59
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Murky',
    quality: 'Field-Tested',
    marketPrice: 0.43,
    avgPrice: 0.55
}, {
    type: 'G3SG1',
    name: 'Orange Crash',
    quality: 'Factory New',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'G3SG1',
    name: 'Orange Crash',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'G3SG1',
    name: 'Orange Crash',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'G3SG1',
    name: 'Orange Crash',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'G3SG1',
    name: 'Orange Crash',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Orange Crash',
    quality: 'Factory New',
    marketPrice: 0.93,
    avgPrice: 0.90
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Orange Crash',
    quality: 'Minimal Wear',
    marketPrice: 0.61,
    avgPrice: 0.55
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Orange Crash',
    quality: 'Field-Tested',
    marketPrice: 0.34,
    avgPrice: 0.32
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Orange Crash',
    quality: 'Well-Worn',
    marketPrice: 0.86,
    avgPrice: 0.81
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'Orange Crash',
    quality: 'Battle-Scarred',
    marketPrice: 0.31,
    avgPrice: 0.35
}, {
    type: 'G3SG1',
    name: 'Orange Kimono',
    quality: 'Factory New',
    marketPrice: 0.23,
    avgPrice: 0.19
}, {
    type: 'G3SG1',
    name: 'Orange Kimono',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'G3SG1',
    name: 'Orange Kimono',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Orange Kimono',
    quality: 'Well-Worn',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'G3SG1',
    name: 'Orange Kimono',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Polar Camo',
    quality: 'Factory New',
    marketPrice: 0.14,
    avgPrice: 0.14
}, {
    type: 'G3SG1',
    name: 'Polar Camo',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Polar Camo',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Polar Camo',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'Polar Camo',
    quality: 'Battle-Scarred',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'Souvenir G3SG1',
    name: 'Polar Camo',
    quality: 'Factory New',
    marketPrice: 12.72,
    avgPrice: 8.12
}, {
    type: 'Souvenir G3SG1',
    name: 'Polar Camo',
    quality: 'Minimal Wear',
    marketPrice: 0.55,
    avgPrice: 0.53
}, {
    type: 'Souvenir G3SG1',
    name: 'Polar Camo',
    quality: 'Field-Tested',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'Souvenir G3SG1',
    name: 'Polar Camo',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.24
}, {
    type: 'Souvenir G3SG1',
    name: 'Polar Camo',
    quality: 'Battle-Scarred',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'G3SG1',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 1.40,
    avgPrice: 1.27
}, {
    type: 'G3SG1',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.17,
    avgPrice: 0.17
}, {
    type: 'G3SG1',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.09,
    avgPrice: 0.08
}, {
    type: 'G3SG1',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'G3SG1',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.11
}, {
    type: 'Souvenir G3SG1',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 2.30,
    avgPrice: 2.86
}, {
    type: 'Souvenir G3SG1',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.23
}, {
    type: 'Souvenir G3SG1',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.15
}, {
    type: 'Souvenir G3SG1',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'Souvenir G3SG1',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.18,
    avgPrice: 0.16
}, {
    type: 'G3SG1',
    name: 'The Executioner',
    quality: 'Minimal Wear',
    marketPrice: 14.05,
    avgPrice: 14.80
}, {
    type: 'G3SG1',
    name: 'The Executioner',
    quality: 'Field-Tested',
    marketPrice: 1.31,
    avgPrice: 1.16
}, {
    type: 'G3SG1',
    name: 'The Executioner',
    quality: 'Well-Worn',
    marketPrice: 1.26,
    avgPrice: 1.16
}, {
    type: 'G3SG1',
    name: 'The Executioner',
    quality: 'Battle-Scarred',
    marketPrice: 1.11,
    avgPrice: 1.13
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'The Executioner',
    quality: 'Minimal Wear',
    marketPrice: 150.00,
    avgPrice: 164.65
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'The Executioner',
    quality: 'Field-Tested',
    marketPrice: 4.40,
    avgPrice: 3.49
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'The Executioner',
    quality: 'Well-Worn',
    marketPrice: 3.74,
    avgPrice: 3.39
}, {
    type: 'G3SG1',
    statTrak: true,
    name: 'The Executioner',
    quality: 'Battle-Scarred',
    marketPrice: 3.06,
    avgPrice: 2.93
}, {
    type: 'G3SG1',
    name: 'VariCamo',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'G3SG1',
    name: 'VariCamo',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'VariCamo',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'VariCamo',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'G3SG1',
    name: 'VariCamo',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir G3SG1',
    name: 'VariCamo',
    quality: 'Factory New',
    marketPrice: 38.25,
    avgPrice: 42.73
}, {
    type: 'Souvenir G3SG1',
    name: 'VariCamo',
    quality: 'Minimal Wear',
    marketPrice: 2.72,
    avgPrice: 3.32
}, {
    type: 'Souvenir G3SG1',
    name: 'VariCamo',
    quality: 'Field-Tested',
    marketPrice: 9.20,
    avgPrice: 5.69
}, {
    type: 'Souvenir G3SG1',
    name: 'VariCamo',
    quality: 'Well-Worn',
    marketPrice: 24.45,
    avgPrice: 23.15
}, {
    type: 'Souvenir G3SG1',
    name: 'VariCamo',
    quality: 'Battle-Scarred',
    marketPrice: 10.00,
    avgPrice: 7.80
}, {
    type: 'Galil AR',
    name: 'Aqua Terrace',
    quality: 'Factory New',
    marketPrice: 3.34,
    avgPrice: 2.58
}, {
    type: 'Galil AR',
    name: 'Aqua Terrace',
    quality: 'Minimal Wear',
    marketPrice: 1.57,
    avgPrice: 1.70
}, {
    type: 'Galil AR',
    name: 'Aqua Terrace',
    quality: 'Field-Tested',
    marketPrice: 1.57,
    avgPrice: 1.51
}, {
    type: 'Galil AR',
    name: 'Aqua Terrace',
    quality: 'Well-Worn',
    marketPrice: 1.19,
    avgPrice: 1.31
}, {
    type: 'Galil AR',
    name: 'Aqua Terrace',
    quality: 'Battle-Scarred',
    marketPrice: 1.10,
    avgPrice: 1.06
}, {
    type: 'Galil AR',
    name: 'Blue Titanium',
    quality: 'Factory New',
    marketPrice: 0.31,
    avgPrice: 0.31
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Blue Titanium',
    quality: 'Factory New',
    marketPrice: 1.31,
    avgPrice: 1.27
}, {
    type: 'Galil AR',
    name: 'Cerberus',
    quality: 'Factory New',
    marketPrice: 11.11,
    avgPrice: 11.75
}, {
    type: 'Galil AR',
    name: 'Cerberus',
    quality: 'Minimal Wear',
    marketPrice: 5.38,
    avgPrice: 5.62
}, {
    type: 'Galil AR',
    name: 'Cerberus',
    quality: 'Field-Tested',
    marketPrice: 2.39,
    avgPrice: 2.22
}, {
    type: 'Galil AR',
    name: 'Cerberus',
    quality: 'Well-Worn',
    marketPrice: 2.04,
    avgPrice: 1.92
}, {
    type: 'Galil AR',
    name: 'Cerberus',
    quality: 'Battle-Scarred',
    marketPrice: 1.11,
    avgPrice: 0.99
}, {
    type: 'Souvenir Galil AR',
    name: 'Cerberus',
    quality: 'Factory New',
    marketPrice: 258.45,
    avgPrice: 146.91
}, {
    type: 'Souvenir Galil AR',
    name: 'Cerberus',
    quality: 'Minimal Wear',
    marketPrice: 19.15,
    avgPrice: 20.68
}, {
    type: 'Souvenir Galil AR',
    name: 'Cerberus',
    quality: 'Field-Tested',
    marketPrice: 9.34,
    avgPrice: 7.03
}, {
    type: 'Souvenir Galil AR',
    name: 'Cerberus',
    quality: 'Well-Worn',
    marketPrice: 6.37,
    avgPrice: 6.58
}, {
    type: 'Souvenir Galil AR',
    name: 'Cerberus',
    quality: 'Battle-Scarred',
    marketPrice: 4.46,
    avgPrice: 4.19
}, {
    type: 'Galil AR',
    name: 'Chatterbox',
    quality: 'Field-Tested',
    marketPrice: 10.54,
    avgPrice: 10.70
}, {
    type: 'Galil AR',
    name: 'Chatterbox',
    quality: 'Well-Worn',
    marketPrice: 2.50,
    avgPrice: 2.46
}, {
    type: 'Galil AR',
    name: 'Chatterbox',
    quality: 'Battle-Scarred',
    marketPrice: 1.40,
    avgPrice: 1.38
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Chatterbox',
    quality: 'Field-Tested',
    marketPrice: 111.04,
    avgPrice: 97.73
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Chatterbox',
    quality: 'Well-Worn',
    marketPrice: 13.50,
    avgPrice: 10.75
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Chatterbox',
    quality: 'Battle-Scarred',
    marketPrice: 4.85,
    avgPrice: 5.00
}, {
    type: 'Galil AR',
    name: 'Eco',
    quality: 'Minimal Wear',
    marketPrice: 3.58,
    avgPrice: 3.35
}, {
    type: 'Galil AR',
    name: 'Eco',
    quality: 'Field-Tested',
    marketPrice: 1.12,
    avgPrice: 1.11
}, {
    type: 'Galil AR',
    name: 'Eco',
    quality: 'Well-Worn',
    marketPrice: 1.12,
    avgPrice: 1.11
}, {
    type: 'Galil AR',
    name: 'Eco',
    quality: 'Battle-Scarred',
    marketPrice: 1.15,
    avgPrice: 1.08
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Eco',
    quality: 'Minimal Wear',
    marketPrice: 14.33,
    avgPrice: 11.68
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Eco',
    quality: 'Field-Tested',
    marketPrice: 2.82,
    avgPrice: 2.71
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Eco',
    quality: 'Well-Worn',
    marketPrice: 2.76,
    avgPrice: 2.51
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Eco',
    quality: 'Battle-Scarred',
    marketPrice: 3.02,
    avgPrice: 2.57
}, {
    type: 'Galil AR',
    name: 'Firefight',
    quality: 'Factory New',
    marketPrice: 1.90,
    avgPrice: 1.91
}, {
    type: 'Galil AR',
    name: 'Firefight',
    quality: 'Minimal Wear',
    marketPrice: 0.89,
    avgPrice: 0.83
}, {
    type: 'Galil AR',
    name: 'Firefight',
    quality: 'Field-Tested',
    marketPrice: 0.42,
    avgPrice: 0.42
}, {
    type: 'Galil AR',
    name: 'Firefight',
    quality: 'Well-Worn',
    marketPrice: 0.41,
    avgPrice: 0.36
}, {
    type: 'Galil AR',
    name: 'Firefight',
    quality: 'Battle-Scarred',
    marketPrice: 0.37,
    avgPrice: 0.34
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Firefight',
    quality: 'Factory New',
    marketPrice: 8.80,
    avgPrice: 8.38
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Firefight',
    quality: 'Minimal Wear',
    marketPrice: 2.60,
    avgPrice: 2.97
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Firefight',
    quality: 'Field-Tested',
    marketPrice: 1.56,
    avgPrice: 1.51
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Firefight',
    quality: 'Well-Worn',
    marketPrice: 1.32,
    avgPrice: 1.14
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Firefight',
    quality: 'Battle-Scarred',
    marketPrice: 1.18,
    avgPrice: 1.00
}, {
    type: 'Galil AR',
    name: 'Hunting Blind',
    quality: 'Factory New',
    marketPrice: 0.53,
    avgPrice: 0.64
}, {
    type: 'Galil AR',
    name: 'Hunting Blind',
    quality: 'Minimal Wear',
    marketPrice: 0.19,
    avgPrice: 0.19
}, {
    type: 'Galil AR',
    name: 'Hunting Blind',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Galil AR',
    name: 'Hunting Blind',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.19
}, {
    type: 'Galil AR',
    name: 'Hunting Blind',
    quality: 'Battle-Scarred',
    marketPrice: 0.15,
    avgPrice: 0.13
}, {
    type: 'Souvenir Galil AR',
    name: 'Hunting Blind',
    quality: 'Factory New',
    marketPrice: 1.16,
    avgPrice: 1.05
}, {
    type: 'Souvenir Galil AR',
    name: 'Hunting Blind',
    quality: 'Minimal Wear',
    marketPrice: 0.80,
    avgPrice: 0.54
}, {
    type: 'Souvenir Galil AR',
    name: 'Hunting Blind',
    quality: 'Field-Tested',
    marketPrice: 0.36,
    avgPrice: 0.33
}, {
    type: 'Souvenir Galil AR',
    name: 'Hunting Blind',
    quality: 'Well-Worn',
    marketPrice: 0.76,
    avgPrice: 0.64
}, {
    type: 'Souvenir Galil AR',
    name: 'Hunting Blind',
    quality: 'Battle-Scarred',
    marketPrice: 0.37,
    avgPrice: 0.37
}, {
    type: 'Galil AR',
    name: 'Kami',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.23
}, {
    type: 'Galil AR',
    name: 'Kami',
    quality: 'Minimal Wear',
    marketPrice: 0.17,
    avgPrice: 0.15
}, {
    type: 'Galil AR',
    name: 'Kami',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Galil AR',
    name: 'Kami',
    quality: 'Well-Worn',
    marketPrice: 0.21,
    avgPrice: 0.21
}, {
    type: 'Galil AR',
    name: 'Kami',
    quality: 'Battle-Scarred',
    marketPrice: 0.17,
    avgPrice: 0.12
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Kami',
    quality: 'Factory New',
    marketPrice: 1.01,
    avgPrice: 1.00
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Kami',
    quality: 'Minimal Wear',
    marketPrice: 0.47,
    avgPrice: 0.44
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Kami',
    quality: 'Field-Tested',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Kami',
    quality: 'Well-Worn',
    marketPrice: 0.35,
    avgPrice: 0.35
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Kami',
    quality: 'Battle-Scarred',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'Galil AR',
    name: 'Orange DDPAT',
    quality: 'Factory New',
    marketPrice: 16.59,
    avgPrice: 17.83
}, {
    type: 'Galil AR',
    name: 'Orange DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 3.35,
    avgPrice: 3.00
}, {
    type: 'Galil AR',
    name: 'Orange DDPAT',
    quality: 'Field-Tested',
    marketPrice: 2.79,
    avgPrice: 2.21
}, {
    type: 'Galil AR',
    name: 'Orange DDPAT',
    quality: 'Well-Worn',
    marketPrice: 2.30,
    avgPrice: 2.33
}, {
    type: 'Galil AR',
    name: 'Orange DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 2.36,
    avgPrice: 2.07
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Factory New',
    marketPrice: 299.00,
    avgPrice: 241.84
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 10.00,
    avgPrice: 9.10
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Field-Tested',
    marketPrice: 6.73,
    avgPrice: 6.13
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Well-Worn',
    marketPrice: 6.33,
    avgPrice: 5.66
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 5.36,
    avgPrice: 5.03
}, {
    type: 'Galil AR',
    name: 'Rocket Pop',
    quality: 'Factory New',
    marketPrice: 0.66,
    avgPrice: 0.61
}, {
    type: 'Galil AR',
    name: 'Rocket Pop',
    quality: 'Minimal Wear',
    marketPrice: 0.18,
    avgPrice: 0.16
}, {
    type: 'Galil AR',
    name: 'Rocket Pop',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Galil AR',
    name: 'Rocket Pop',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Galil AR',
    name: 'Rocket Pop',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Rocket Pop',
    quality: 'Factory New',
    marketPrice: 2.81,
    avgPrice: 2.88
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Rocket Pop',
    quality: 'Minimal Wear',
    marketPrice: 0.61,
    avgPrice: 0.62
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Rocket Pop',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.29
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Rocket Pop',
    quality: 'Well-Worn',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Rocket Pop',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.24
}, {
    type: 'Galil AR',
    name: 'Sage Spray',
    quality: 'Factory New',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'Galil AR',
    name: 'Sage Spray',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Galil AR',
    name: 'Sage Spray',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Galil AR',
    name: 'Sage Spray',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Galil AR',
    name: 'Sage Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Galil AR',
    name: 'Sage Spray',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 164.98
}, {
    type: 'Souvenir Galil AR',
    name: 'Sage Spray',
    quality: 'Minimal Wear',
    marketPrice: 6.29,
    avgPrice: 4.65
}, {
    type: 'Souvenir Galil AR',
    name: 'Sage Spray',
    quality: 'Field-Tested',
    marketPrice: 1.18,
    avgPrice: 1.29
}, {
    type: 'Souvenir Galil AR',
    name: 'Sage Spray',
    quality: 'Well-Worn',
    marketPrice: 2.13,
    avgPrice: 2.32
}, {
    type: 'Souvenir Galil AR',
    name: 'Sage Spray',
    quality: 'Battle-Scarred',
    marketPrice: 1.06,
    avgPrice: 1.18
}, {
    type: 'Galil AR',
    name: 'Sandstorm',
    quality: 'Minimal Wear',
    marketPrice: 0.41,
    avgPrice: 0.34
}, {
    type: 'Galil AR',
    name: 'Sandstorm',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.12
}, {
    type: 'Galil AR',
    name: 'Sandstorm',
    quality: 'Well-Worn',
    marketPrice: 0.25,
    avgPrice: 0.22
}, {
    type: 'Galil AR',
    name: 'Sandstorm',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Sandstorm',
    quality: 'Minimal Wear',
    marketPrice: 0.99,
    avgPrice: 0.77
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Sandstorm',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.29
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Sandstorm',
    quality: 'Well-Worn',
    marketPrice: 0.57,
    avgPrice: 0.49
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Sandstorm',
    quality: 'Battle-Scarred',
    marketPrice: 0.31,
    avgPrice: 0.27
}, {
    type: 'Galil AR',
    name: 'Shattered',
    quality: 'Factory New',
    marketPrice: 3.33,
    avgPrice: 3.14
}, {
    type: 'Galil AR',
    name: 'Shattered',
    quality: 'Minimal Wear',
    marketPrice: 0.75,
    avgPrice: 0.69
}, {
    type: 'Galil AR',
    name: 'Shattered',
    quality: 'Field-Tested',
    marketPrice: 0.75,
    avgPrice: 0.61
}, {
    type: 'Galil AR',
    name: 'Shattered',
    quality: 'Well-Worn',
    marketPrice: 0.61,
    avgPrice: 0.56
}, {
    type: 'Galil AR',
    name: 'Shattered',
    quality: 'Battle-Scarred',
    marketPrice: 0.63,
    avgPrice: 0.51
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Shattered',
    quality: 'Factory New',
    marketPrice: 25.54,
    avgPrice: 24.36
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Shattered',
    quality: 'Minimal Wear',
    marketPrice: 2.30,
    avgPrice: 2.25
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Shattered',
    quality: 'Field-Tested',
    marketPrice: 1.45,
    avgPrice: 1.26
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Shattered',
    quality: 'Well-Worn',
    marketPrice: 1.53,
    avgPrice: 1.40
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Shattered',
    quality: 'Battle-Scarred',
    marketPrice: 1.33,
    avgPrice: 1.21
}, {
    type: 'Galil AR',
    name: 'Stone Cold',
    quality: 'Factory New',
    marketPrice: 1.81,
    avgPrice: 1.71
}, {
    type: 'Galil AR',
    name: 'Stone Cold',
    quality: 'Minimal Wear',
    marketPrice: 0.70,
    avgPrice: 0.65
}, {
    type: 'Galil AR',
    name: 'Stone Cold',
    quality: 'Field-Tested',
    marketPrice: 0.47,
    avgPrice: 0.42
}, {
    type: 'Galil AR',
    name: 'Stone Cold',
    quality: 'Well-Worn',
    marketPrice: 0.41,
    avgPrice: 0.40
}, {
    type: 'Galil AR',
    name: 'Stone Cold',
    quality: 'Battle-Scarred',
    marketPrice: 0.41,
    avgPrice: 0.38
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Stone Cold',
    quality: 'Factory New',
    marketPrice: 6.56,
    avgPrice: 6.56
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Stone Cold',
    quality: 'Minimal Wear',
    marketPrice: 2.50,
    avgPrice: 2.33
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Stone Cold',
    quality: 'Field-Tested',
    marketPrice: 1.18,
    avgPrice: 1.23
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Stone Cold',
    quality: 'Well-Worn',
    marketPrice: 1.08,
    avgPrice: 1.09
}, {
    type: 'Galil AR',
    statTrak: true,
    name: 'Stone Cold',
    quality: 'Battle-Scarred',
    marketPrice: 1.01,
    avgPrice: 0.98
}, {
    type: 'Galil AR',
    name: 'Tuxedo',
    quality: 'Factory New',
    marketPrice: 0.41,
    avgPrice: 0.41
}, {
    type: 'Galil AR',
    name: 'Tuxedo',
    quality: 'Minimal Wear',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'Galil AR',
    name: 'Tuxedo',
    quality: 'Field-Tested',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'Galil AR',
    name: 'Tuxedo',
    quality: 'Well-Worn',
    marketPrice: 0.17,
    avgPrice: 0.18
}, {
    type: 'Galil AR',
    name: 'Tuxedo',
    quality: 'Battle-Scarred',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'Galil AR',
    name: 'Urban Rubble',
    quality: 'Factory New',
    marketPrice: 1.19,
    avgPrice: 1.06
}, {
    type: 'Galil AR',
    name: 'Urban Rubble',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.28
}, {
    type: 'Galil AR',
    name: 'Urban Rubble',
    quality: 'Field-Tested',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'Galil AR',
    name: 'Urban Rubble',
    quality: 'Well-Worn',
    marketPrice: 0.16,
    avgPrice: 0.16
}, {
    type: 'Galil AR',
    name: 'Urban Rubble',
    quality: 'Battle-Scarred',
    marketPrice: 0.20,
    avgPrice: 0.17
}, {
    type: 'Galil AR',
    name: 'VariCamo',
    quality: 'Factory New',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'Galil AR',
    name: 'VariCamo',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Galil AR',
    name: 'VariCamo',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Galil AR',
    name: 'VariCamo',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Galil AR',
    name: 'VariCamo',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.04
}, {
    type: 'Souvenir Galil AR',
    name: 'VariCamo',
    quality: 'Factory New',
    marketPrice: 39.00,
    avgPrice: 20.67
}, {
    type: 'Souvenir Galil AR',
    name: 'VariCamo',
    quality: 'Minimal Wear',
    marketPrice: 8.31,
    avgPrice: 8.68
}, {
    type: 'Souvenir Galil AR',
    name: 'VariCamo',
    quality: 'Field-Tested',
    marketPrice: 3.70,
    avgPrice: 3.63
}, {
    type: 'Souvenir Galil AR',
    name: 'VariCamo',
    quality: 'Well-Worn',
    marketPrice: 76.96,
    avgPrice: 27.87
}, {
    type: 'Souvenir Galil AR',
    name: 'VariCamo',
    quality: 'Battle-Scarred',
    marketPrice: 27.69,
    avgPrice: 4.43
}, {
    type: 'Galil AR',
    name: 'Winter Forest',
    quality: 'Factory New',
    marketPrice: 92.00,
    avgPrice: 57.40
}, {
    type: 'Galil AR',
    name: 'Winter Forest',
    quality: 'Minimal Wear',
    marketPrice: 1.81,
    avgPrice: 1.75
}, {
    type: 'Galil AR',
    name: 'Winter Forest',
    quality: 'Field-Tested',
    marketPrice: 0.71,
    avgPrice: 0.63
}, {
    type: 'Galil AR',
    name: 'Winter Forest',
    quality: 'Well-Worn',
    marketPrice: 1.24,
    avgPrice: 1.21
}, {
    type: 'Galil AR',
    name: 'Winter Forest',
    quality: 'Battle-Scarred',
    marketPrice: 3.79,
    avgPrice: 10.93
}, {
    type: 'Glock-18',
    name: 'Blue Fissure',
    quality: 'Factory New',
    marketPrice: 4.86,
    avgPrice: 5.05
}, {
    type: 'Glock-18',
    name: 'Blue Fissure',
    quality: 'Minimal Wear',
    marketPrice: 0.85,
    avgPrice: 0.82
}, {
    type: 'Glock-18',
    name: 'Blue Fissure',
    quality: 'Field-Tested',
    marketPrice: 0.46,
    avgPrice: 0.43
}, {
    type: 'Glock-18',
    name: 'Blue Fissure',
    quality: 'Well-Worn',
    marketPrice: 0.97,
    avgPrice: 1.00
}, {
    type: 'Glock-18',
    name: 'Blue Fissure',
    quality: 'Battle-Scarred',
    marketPrice: 0.55,
    avgPrice: 0.48
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Blue Fissure',
    quality: 'Factory New',
    marketPrice: 52.01,
    avgPrice: 53.11
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Blue Fissure',
    quality: 'Minimal Wear',
    marketPrice: 4.71,
    avgPrice: 4.69
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Blue Fissure',
    quality: 'Field-Tested',
    marketPrice: 2.85,
    avgPrice: 2.64
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Blue Fissure',
    quality: 'Well-Worn',
    marketPrice: 3.88,
    avgPrice: 3.42
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Blue Fissure',
    quality: 'Battle-Scarred',
    marketPrice: 2.83,
    avgPrice: 2.54
}, {
    type: 'Glock-18',
    name: 'Brass',
    quality: 'Factory New',
    marketPrice: 11.11,
    avgPrice: 9.62
}, {
    type: 'Glock-18',
    name: 'Brass',
    quality: 'Minimal Wear',
    marketPrice: 3.18,
    avgPrice: 3.41
}, {
    type: 'Glock-18',
    name: 'Brass',
    quality: 'Field-Tested',
    marketPrice: 1.76,
    avgPrice: 1.73
}, {
    type: 'Glock-18',
    name: 'Brass',
    quality: 'Well-Worn',
    marketPrice: 1.74,
    avgPrice: 1.78
}, {
    type: 'Glock-18',
    name: 'Brass',
    quality: 'Battle-Scarred',
    marketPrice: 1.58,
    avgPrice: 1.54
}, {
    type: 'Glock-18',
    name: 'Bunsen Burner',
    quality: 'Factory New',
    marketPrice: 0.48,
    avgPrice: 0.45
}, {
    type: 'Glock-18',
    name: 'Bunsen Burner',
    quality: 'Minimal Wear',
    marketPrice: 0.16,
    avgPrice: 0.16
}, {
    type: 'Glock-18',
    name: 'Bunsen Burner',
    quality: 'Field-Tested',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'Glock-18',
    name: 'Bunsen Burner',
    quality: 'Well-Worn',
    marketPrice: 0.26,
    avgPrice: 0.26
}, {
    type: 'Glock-18',
    name: 'Bunsen Burner',
    quality: 'Battle-Scarred',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Bunsen Burner',
    quality: 'Factory New',
    marketPrice: 2.94,
    avgPrice: 2.82
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Bunsen Burner',
    quality: 'Minimal Wear',
    marketPrice: 1.07,
    avgPrice: 1.12
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Bunsen Burner',
    quality: 'Field-Tested',
    marketPrice: 0.72,
    avgPrice: 0.70
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Bunsen Burner',
    quality: 'Well-Worn',
    marketPrice: 1.20,
    avgPrice: 1.42
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Bunsen Burner',
    quality: 'Battle-Scarred',
    marketPrice: 0.80,
    avgPrice: 0.72
}, {
    type: 'Glock-18',
    name: 'Candy Apple',
    quality: 'Factory New',
    marketPrice: 0.64,
    avgPrice: 0.58
}, {
    type: 'Glock-18',
    name: 'Candy Apple',
    quality: 'Minimal Wear',
    marketPrice: 0.35,
    avgPrice: 0.35
}, {
    type: 'Glock-18',
    name: 'Candy Apple',
    quality: 'Field-Tested',
    marketPrice: 0.36,
    avgPrice: 0.32
}, {
    type: 'Souvenir Glock-18',
    name: 'Candy Apple',
    quality: 'Factory New',
    marketPrice: 255.41,
    avgPrice: 170.09
}, {
    type: 'Souvenir Glock-18',
    name: 'Candy Apple',
    quality: 'Minimal Wear',
    marketPrice: 77.75,
    avgPrice: 50.27
}, {
    type: 'Souvenir Glock-18',
    name: 'Candy Apple',
    quality: 'Field-Tested',
    marketPrice: 51.75,
    avgPrice: 44.89
}, {
    type: 'Glock-18',
    name: 'Catacombs',
    quality: 'Factory New',
    marketPrice: 0.23,
    avgPrice: 0.20
}, {
    type: 'Glock-18',
    name: 'Catacombs',
    quality: 'Minimal Wear',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'Glock-18',
    name: 'Catacombs',
    quality: 'Field-Tested',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'Glock-18',
    name: 'Catacombs',
    quality: 'Well-Worn',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'Glock-18',
    name: 'Catacombs',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.22
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Catacombs',
    quality: 'Factory New',
    marketPrice: 1.29,
    avgPrice: 1.28
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Catacombs',
    quality: 'Minimal Wear',
    marketPrice: 0.80,
    avgPrice: 0.78
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Catacombs',
    quality: 'Field-Tested',
    marketPrice: 0.63,
    avgPrice: 0.63
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Catacombs',
    quality: 'Well-Worn',
    marketPrice: 0.97,
    avgPrice: 0.83
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Catacombs',
    quality: 'Battle-Scarred',
    marketPrice: 0.80,
    avgPrice: 0.74
}, {
    type: 'Glock-18',
    name: 'Death Rattle',
    quality: 'Minimal Wear',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'Glock-18',
    name: 'Death Rattle',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Glock-18',
    name: 'Death Rattle',
    quality: 'Well-Worn',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'Glock-18',
    name: 'Death Rattle',
    quality: 'Battle-Scarred',
    marketPrice: 0.09,
    avgPrice: 0.07
}, {
    type: 'Glock-18',
    name: 'Dragon Tattoo',
    quality: 'Factory New',
    marketPrice: 6.17,
    avgPrice: 6.92
}, {
    type: 'Glock-18',
    name: 'Dragon Tattoo',
    quality: 'Minimal Wear',
    marketPrice: 8.39,
    avgPrice: 7.32
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Dragon Tattoo',
    quality: 'Factory New',
    marketPrice: 23.00,
    avgPrice: 23.05
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Dragon Tattoo',
    quality: 'Minimal Wear',
    marketPrice: 21.32,
    avgPrice: 22.61
}, {
    type: 'Glock-18',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 300.00,
    avgPrice: 321.95
}, {
    type: 'Glock-18',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 372.00,
    avgPrice: 377.87
}, {
    type: 'Glock-18',
    name: 'Grinder',
    quality: 'Factory New',
    marketPrice: 0.77,
    avgPrice: 0.73
}, {
    type: 'Glock-18',
    name: 'Grinder',
    quality: 'Minimal Wear',
    marketPrice: 0.69,
    avgPrice: 0.60
}, {
    type: 'Glock-18',
    name: 'Grinder',
    quality: 'Field-Tested',
    marketPrice: 0.70,
    avgPrice: 0.63
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Grinder',
    quality: 'Factory New',
    marketPrice: 4.30,
    avgPrice: 4.28
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Grinder',
    quality: 'Minimal Wear',
    marketPrice: 2.68,
    avgPrice: 3.06
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Grinder',
    quality: 'Field-Tested',
    marketPrice: 3.01,
    avgPrice: 3.07
}, {
    type: 'Glock-18',
    name: 'Groundwater',
    quality: 'Factory New',
    marketPrice: 12.77,
    avgPrice: 11.30
}, {
    type: 'Glock-18',
    name: 'Groundwater',
    quality: 'Minimal Wear',
    marketPrice: 1.11,
    avgPrice: 1.07
}, {
    type: 'Glock-18',
    name: 'Groundwater',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.56
}, {
    type: 'Glock-18',
    name: 'Groundwater',
    quality: 'Well-Worn',
    marketPrice: 0.63,
    avgPrice: 0.65
}, {
    type: 'Glock-18',
    name: 'Groundwater',
    quality: 'Battle-Scarred',
    marketPrice: 0.64,
    avgPrice: 0.61
}, {
    type: 'Souvenir Glock-18',
    name: 'Groundwater',
    quality: 'Factory New',
    marketPrice: 86.14,
    avgPrice: 79.58
}, {
    type: 'Souvenir Glock-18',
    name: 'Groundwater',
    quality: 'Minimal Wear',
    marketPrice: 4.86,
    avgPrice: 4.60
}, {
    type: 'Souvenir Glock-18',
    name: 'Groundwater',
    quality: 'Field-Tested',
    marketPrice: 2.36,
    avgPrice: 2.37
}, {
    type: 'Souvenir Glock-18',
    name: 'Groundwater',
    quality: 'Well-Worn',
    marketPrice: 3.19,
    avgPrice: 2.34
}, {
    type: 'Souvenir Glock-18',
    name: 'Groundwater',
    quality: 'Battle-Scarred',
    marketPrice: 3.02,
    avgPrice: 2.00
}, {
    type: 'Glock-18',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 5.00,
    avgPrice: 5.53
}, {
    type: 'Glock-18',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 0.40,
    avgPrice: 0.35
}, {
    type: 'Glock-18',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.13
}, {
    type: 'Glock-18',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 0.20,
    avgPrice: 0.17
}, {
    type: 'Glock-18',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'Souvenir Glock-18',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 77.75,
    avgPrice: 83.95
}, {
    type: 'Souvenir Glock-18',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 13.02,
    avgPrice: 11.52
}, {
    type: 'Souvenir Glock-18',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 4.23,
    avgPrice: 3.94
}, {
    type: 'Souvenir Glock-18',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 3.70,
    avgPrice: 3.70
}, {
    type: 'Souvenir Glock-18',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 3.88,
    avgPrice: 3.28
}, {
    type: 'Glock-18',
    name: 'Reactor',
    quality: 'Factory New',
    marketPrice: 4.45,
    avgPrice: 4.12
}, {
    type: 'Glock-18',
    name: 'Reactor',
    quality: 'Minimal Wear',
    marketPrice: 2.20,
    avgPrice: 2.15
}, {
    type: 'Glock-18',
    name: 'Reactor',
    quality: 'Field-Tested',
    marketPrice: 1.31,
    avgPrice: 1.30
}, {
    type: 'Glock-18',
    name: 'Reactor',
    quality: 'Well-Worn',
    marketPrice: 1.23,
    avgPrice: 1.15
}, {
    type: 'Glock-18',
    name: 'Reactor',
    quality: 'Battle-Scarred',
    marketPrice: 0.94,
    avgPrice: 0.82
}, {
    type: 'Souvenir Glock-18',
    name: 'Reactor',
    quality: 'Factory New',
    marketPrice: 57.50,
    avgPrice: 66.21
}, {
    type: 'Souvenir Glock-18',
    name: 'Reactor',
    quality: 'Minimal Wear',
    marketPrice: 15.96,
    avgPrice: 14.90
}, {
    type: 'Souvenir Glock-18',
    name: 'Reactor',
    quality: 'Field-Tested',
    marketPrice: 9.97,
    avgPrice: 8.56
}, {
    type: 'Souvenir Glock-18',
    name: 'Reactor',
    quality: 'Well-Worn',
    marketPrice: 6.11,
    avgPrice: 5.75
}, {
    type: 'Souvenir Glock-18',
    name: 'Reactor',
    quality: 'Battle-Scarred',
    marketPrice: 4.83,
    avgPrice: 4.41
}, {
    type: 'Glock-18',
    name: 'Royal Legion',
    quality: 'Factory New',
    marketPrice: 2.50,
    avgPrice: 2.47
}, {
    type: 'Glock-18',
    name: 'Royal Legion',
    quality: 'Minimal Wear',
    marketPrice: 0.94,
    avgPrice: 0.89
}, {
    type: 'Glock-18',
    name: 'Royal Legion',
    quality: 'Field-Tested',
    marketPrice: 0.48,
    avgPrice: 0.45
}, {
    type: 'Glock-18',
    name: 'Royal Legion',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.41
}, {
    type: 'Glock-18',
    name: 'Royal Legion',
    quality: 'Battle-Scarred',
    marketPrice: 0.42,
    avgPrice: 0.39
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Royal Legion',
    quality: 'Factory New',
    marketPrice: 17.78,
    avgPrice: 14.87
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Royal Legion',
    quality: 'Minimal Wear',
    marketPrice: 6.35,
    avgPrice: 5.65
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Royal Legion',
    quality: 'Field-Tested',
    marketPrice: 3.35,
    avgPrice: 3.22
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Royal Legion',
    quality: 'Well-Worn',
    marketPrice: 2.73,
    avgPrice: 2.72
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Royal Legion',
    quality: 'Battle-Scarred',
    marketPrice: 2.55,
    avgPrice: 2.38
}, {
    type: 'Glock-18',
    name: 'Sand Dune',
    quality: 'Factory New',
    marketPrice: 17.59,
    avgPrice: 16.50
}, {
    type: 'Glock-18',
    name: 'Sand Dune',
    quality: 'Minimal Wear',
    marketPrice: 1.54,
    avgPrice: 1.57
}, {
    type: 'Glock-18',
    name: 'Sand Dune',
    quality: 'Field-Tested',
    marketPrice: 0.57,
    avgPrice: 0.54
}, {
    type: 'Glock-18',
    name: 'Sand Dune',
    quality: 'Well-Worn',
    marketPrice: 0.86,
    avgPrice: 0.86
}, {
    type: 'Glock-18',
    name: 'Sand Dune',
    quality: 'Battle-Scarred',
    marketPrice: 0.93,
    avgPrice: 0.99
}, {
    type: 'Glock-18',
    name: 'Steel Disruption',
    quality: 'Factory New',
    marketPrice: 1.11,
    avgPrice: 1.06
}, {
    type: 'Glock-18',
    name: 'Steel Disruption',
    quality: 'Minimal Wear',
    marketPrice: 0.80,
    avgPrice: 0.75
}, {
    type: 'Glock-18',
    name: 'Steel Disruption',
    quality: 'Field-Tested',
    marketPrice: 1.06,
    avgPrice: 0.96
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Steel Disruption',
    quality: 'Factory New',
    marketPrice: 4.37,
    avgPrice: 4.45
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Steel Disruption',
    quality: 'Minimal Wear',
    marketPrice: 2.99,
    avgPrice: 2.90
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Steel Disruption',
    quality: 'Field-Tested',
    marketPrice: 3.03,
    avgPrice: 3.03
}, {
    type: 'Glock-18',
    name: 'Twilight Galaxy',
    quality: 'Factory New',
    marketPrice: 15.32,
    avgPrice: 14.26
}, {
    type: 'Glock-18',
    name: 'Twilight Galaxy',
    quality: 'Minimal Wear',
    marketPrice: 12.76,
    avgPrice: 12.02
}, {
    type: 'Glock-18',
    name: 'Twilight Galaxy',
    quality: 'Field-Tested',
    marketPrice: 10.99,
    avgPrice: 11.15
}, {
    type: 'Glock-18',
    name: 'Wasteland Rebel',
    quality: 'Factory New',
    marketPrice: 34.50,
    avgPrice: 32.69
}, {
    type: 'Glock-18',
    name: 'Wasteland Rebel',
    quality: 'Minimal Wear',
    marketPrice: 24.97,
    avgPrice: 26.02
}, {
    type: 'Glock-18',
    name: 'Wasteland Rebel',
    quality: 'Field-Tested',
    marketPrice: 19.82,
    avgPrice: 20.12
}, {
    type: 'Glock-18',
    name: 'Wasteland Rebel',
    quality: 'Well-Worn',
    marketPrice: 19.44,
    avgPrice: 19.33
}, {
    type: 'Glock-18',
    name: 'Wasteland Rebel',
    quality: 'Battle-Scarred',
    marketPrice: 15.96,
    avgPrice: 15.14
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Factory New',
    marketPrice: 129.00,
    avgPrice: 114.92
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Minimal Wear',
    marketPrice: 98.99,
    avgPrice: 91.57
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Field-Tested',
    marketPrice: 68.85,
    avgPrice: 66.99
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Well-Worn',
    marketPrice: 57.00,
    avgPrice: 47.91
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wasteland Rebel',
    quality: 'Battle-Scarred',
    marketPrice: 51.00,
    avgPrice: 57.29
}, {
    type: 'Glock-18',
    name: 'Water Elemental',
    quality: 'Factory New',
    marketPrice: 6.11,
    avgPrice: 5.94
}, {
    type: 'Glock-18',
    name: 'Water Elemental',
    quality: 'Minimal Wear',
    marketPrice: 3.99,
    avgPrice: 3.84
}, {
    type: 'Glock-18',
    name: 'Water Elemental',
    quality: 'Field-Tested',
    marketPrice: 2.81,
    avgPrice: 2.80
}, {
    type: 'Glock-18',
    name: 'Water Elemental',
    quality: 'Well-Worn',
    marketPrice: 3.33,
    avgPrice: 3.28
}, {
    type: 'Glock-18',
    name: 'Water Elemental',
    quality: 'Battle-Scarred',
    marketPrice: 2.30,
    avgPrice: 2.21
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Water Elemental',
    quality: 'Factory New',
    marketPrice: 28.07,
    avgPrice: 27.23
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Water Elemental',
    quality: 'Minimal Wear',
    marketPrice: 17.55,
    avgPrice: 17.31
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Water Elemental',
    quality: 'Field-Tested',
    marketPrice: 10.00,
    avgPrice: 9.90
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Water Elemental',
    quality: 'Well-Worn',
    marketPrice: 13.30,
    avgPrice: 12.28
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Water Elemental',
    quality: 'Battle-Scarred',
    marketPrice: 7.19,
    avgPrice: 7.14
}, {
    type: 'Glock-18',
    name: 'Wraiths',
    quality: 'Factory New',
    marketPrice: 0.39,
    avgPrice: 0.36
}, {
    type: 'Glock-18',
    name: 'Wraiths',
    quality: 'Minimal Wear',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'Glock-18',
    name: 'Wraiths',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Glock-18',
    name: 'Wraiths',
    quality: 'Well-Worn',
    marketPrice: 0.26,
    avgPrice: 0.24
}, {
    type: 'Glock-18',
    name: 'Wraiths',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.10
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wraiths',
    quality: 'Factory New',
    marketPrice: 2.92,
    avgPrice: 2.69
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wraiths',
    quality: 'Minimal Wear',
    marketPrice: 1.10,
    avgPrice: 1.07
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wraiths',
    quality: 'Field-Tested',
    marketPrice: 0.72,
    avgPrice: 0.66
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wraiths',
    quality: 'Well-Worn',
    marketPrice: 1.51,
    avgPrice: 1.57
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Wraiths',
    quality: 'Battle-Scarred',
    marketPrice: 0.73,
    avgPrice: 0.70
}, {
    type: 'Gut Knife',
    name: 'Autotronic',
    quality: 'Factory New',
    marketPrice: 360.91,
    avgPrice: 274.28
}, {
    type: 'Gut Knife',
    name: 'Autotronic',
    quality: 'Minimal Wear',
    marketPrice: 249.98,
    avgPrice: 276.25
}, {
    type: 'Gut Knife',
    name: 'Autotronic',
    quality: 'Field-Tested',
    marketPrice: 172.00,
    avgPrice: 187.50
}, {
    type: 'Gut Knife',
    name: 'Autotronic',
    quality: 'Well-Worn',
    marketPrice: 173.23,
    avgPrice: 147.11
}, {
    type: 'Gut Knife',
    name: 'Autotronic',
    quality: 'Battle-Scarred',
    marketPrice: 166.56,
    avgPrice: 148.29
}, {
    type: 'Gut Knife',
    name: 'Black Laminate',
    quality: 'Minimal Wear',
    marketPrice: 98.83,
    avgPrice: 89.09
}, {
    type: 'Gut Knife',
    name: 'Black Laminate',
    quality: 'Field-Tested',
    marketPrice: 91.38,
    avgPrice: 80.14
}, {
    type: 'Gut Knife',
    name: 'Black Laminate',
    quality: 'Well-Worn',
    marketPrice: 167.92,
    avgPrice: 113.24
}, {
    type: 'Gut Knife',
    name: 'Black Laminate',
    quality: 'Battle-Scarred',
    marketPrice: 111.72,
    avgPrice: 84.02
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Black Laminate',
    quality: 'Field-Tested',
    marketPrice: 223.68,
    avgPrice: 191.25
}, {
    type: 'Gut Knife',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 72.79,
    avgPrice: 67.29
}, {
    type: 'Gut Knife',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 54.68,
    avgPrice: 54.92
}, {
    type: 'Gut Knife',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 52.80,
    avgPrice: 50.72
}, {
    type: 'Gut Knife',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 51.00,
    avgPrice: 48.75
}, {
    type: 'Gut Knife',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 51.49,
    avgPrice: 48.76
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 210.72,
    avgPrice: 112.28
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 105.49,
    avgPrice: 78.66
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 80.54,
    avgPrice: 76.74
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 114.93,
    avgPrice: 112.58
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 82.46,
    avgPrice: 64.94
}, {
    type: 'Gut Knife',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 97.34,
    avgPrice: 78.05
}, {
    type: 'Gut Knife',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 49.00,
    avgPrice: 45.48
}, {
    type: 'Gut Knife',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 40.25,
    avgPrice: 39.39
}, {
    type: 'Gut Knife',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 41.32,
    avgPrice: 38.89
}, {
    type: 'Gut Knife',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 39.95,
    avgPrice: 37.84
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 77.75,
    avgPrice: 61.90
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 55.35,
    avgPrice: 52.89
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 100.00,
    avgPrice: 76.25
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 55.17,
    avgPrice: 52.99
}, {
    type: 'Gut Knife',
    name: 'Bright Water',
    quality: 'Factory New',
    marketPrice: 103.36,
    avgPrice: 101.68
}, {
    type: 'Gut Knife',
    name: 'Bright Water',
    quality: 'Minimal Wear',
    marketPrice: 88.48,
    avgPrice: 79.53
}, {
    type: 'Gut Knife',
    name: 'Bright Water',
    quality: 'Field-Tested',
    marketPrice: 70.00,
    avgPrice: 61.54
}, {
    type: 'Gut Knife',
    name: 'Bright Water',
    quality: 'Well-Worn',
    marketPrice: 325.80,
    avgPrice: 52.82
}, {
    type: 'Gut Knife',
    name: 'Bright Water',
    quality: 'Battle-Scarred',
    marketPrice: 80.50,
    avgPrice: 75.00
}, {
    type: 'Gut Knife',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 127.70,
    avgPrice: 105.08
}, {
    type: 'Gut Knife',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 65.55,
    avgPrice: 64.56
}, {
    type: 'Gut Knife',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 60.03,
    avgPrice: 59.30
}, {
    type: 'Gut Knife',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 59.12,
    avgPrice: 58.22
}, {
    type: 'Gut Knife',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 61.42,
    avgPrice: 57.06
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 345.00,
    avgPrice: 225.00
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 107.99,
    avgPrice: 102.57
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 99.02,
    avgPrice: 97.09
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 135.56,
    avgPrice: 89.54
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 96.30,
    avgPrice: 74.47
}, {
    type: 'Gut Knife',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 545.00
}, {
    type: 'Gut Knife',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 86.25,
    avgPrice: 85.10
}, {
    type: 'Gut Knife',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 53.64,
    avgPrice: 53.08
}, {
    type: 'Gut Knife',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 54.01,
    avgPrice: 53.66
}, {
    type: 'Gut Knife',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 51.76,
    avgPrice: 49.56
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 148.95,
    avgPrice: 139.60
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 88.85,
    avgPrice: 144.04
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 84.27,
    avgPrice: 79.71
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 95.77,
    avgPrice: 76.06
}, {
    type: 'Gut Knife',
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 74.52,
    avgPrice: 72.48
}, {
    type: 'Gut Knife',
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 63.25,
    avgPrice: 60.43
}, {
    type: 'Gut Knife',
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 55.00,
    avgPrice: 53.96
}, {
    type: 'Gut Knife',
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 63.04,
    avgPrice: 59.94
}, {
    type: 'Gut Knife',
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 61.30,
    avgPrice: 51.15
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 110.00,
    avgPrice: 96.39
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 112.36,
    avgPrice: 80.99
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 78.20,
    avgPrice: 71.26
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 109.95,
    avgPrice: 99.34
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 119.99,
    avgPrice: 60.27
}, {
    type: 'Gut Knife',
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 78.29,
    avgPrice: 79.90
}, {
    type: 'Gut Knife',
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 85.00,
    avgPrice: 87.57
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 114.15,
    avgPrice: 114.62
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 154.99,
    avgPrice: 143.51
}, {
    type: 'Gut Knife',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 92.00,
    avgPrice: 89.12
}, {
    type: 'Gut Knife',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 118.27,
    avgPrice: 96.78
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 146.86,
    avgPrice: 125.97
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 207.03,
    avgPrice: 177.50
}, {
    type: 'Gut Knife',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 120.00,
    avgPrice: 97.06
}, {
    type: 'Gut Knife',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 49.97,
    avgPrice: 46.89
}, {
    type: 'Gut Knife',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 40.25,
    avgPrice: 39.86
}, {
    type: 'Gut Knife',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 40.25,
    avgPrice: 39.97
}, {
    type: 'Gut Knife',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 40.86,
    avgPrice: 40.22
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 250.00
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 89.39,
    avgPrice: 69.01
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 56.13,
    avgPrice: 48.97
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 125.00,
    avgPrice: 69.56
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 63.21,
    avgPrice: 50.66
}, {
    type: 'Gut Knife',
    name: 'Freehand',
    quality: 'Factory New',
    marketPrice: 140.03,
    avgPrice: 123.82
}, {
    type: 'Gut Knife',
    name: 'Freehand',
    quality: 'Minimal Wear',
    marketPrice: 106.62,
    avgPrice: 97.85
}, {
    type: 'Gut Knife',
    name: 'Freehand',
    quality: 'Field-Tested',
    marketPrice: 69.29,
    avgPrice: 71.03
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Freehand',
    quality: 'Minimal Wear',
    marketPrice: 160.00,
    avgPrice: 126.06
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Freehand',
    quality: 'Field-Tested',
    marketPrice: 116.70,
    avgPrice: 91.95
}, {
    type: 'Gut Knife',
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 252.54,
    avgPrice: 643.75
}, {
    type: 'Gut Knife',
    name: 'Gamma Doppler',
    quality: 'Minimal Wear',
    marketPrice: 300.00,
    avgPrice: 250.00
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 597.50
}, {
    type: 'Gut Knife',
    name: 'Lore',
    quality: 'Factory New',
    marketPrice: 400.00,
    avgPrice: 416.25
}, {
    type: 'Gut Knife',
    name: 'Lore',
    quality: 'Minimal Wear',
    marketPrice: 305.00,
    avgPrice: 216.91
}, {
    type: 'Gut Knife',
    name: 'Lore',
    quality: 'Field-Tested',
    marketPrice: 261.80,
    avgPrice: 154.29
}, {
    type: 'Gut Knife',
    name: 'Lore',
    quality: 'Battle-Scarred',
    marketPrice: 133.00,
    avgPrice: 95.87
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Lore',
    quality: 'Field-Tested',
    marketPrice: 391.00,
    avgPrice: 230.88
}, {
    type: 'Gut Knife',
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 100.85,
    avgPrice: 95.96
}, {
    type: 'Gut Knife',
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 112.70,
    avgPrice: 118.86
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 133.26,
    avgPrice: 132.57
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 188.78,
    avgPrice: 176.90
}, {
    type: 'Gut Knife',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 241.33,
    avgPrice: 134.33
}, {
    type: 'Gut Knife',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 60.00,
    avgPrice: 62.54
}, {
    type: 'Gut Knife',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 43.36,
    avgPrice: 42.82
}, {
    type: 'Gut Knife',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 47.73,
    avgPrice: 41.12
}, {
    type: 'Gut Knife',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 43.31,
    avgPrice: 39.48
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 131.76,
    avgPrice: 111.18
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 59.31,
    avgPrice: 58.94
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 80.19,
    avgPrice: 62.24
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 66.43,
    avgPrice: 53.97
}, {
    type: 'Gut Knife',
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 105.99,
    avgPrice: 121.30
}, {
    type: 'Gut Knife',
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 47.20,
    avgPrice: 47.02
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 396.75,
    avgPrice: 345.00
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 67.75,
    avgPrice: 64.46
}, {
    type: 'Gut Knife',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 277.62,
    avgPrice: 205.58
}, {
    type: 'Gut Knife',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 44.50,
    avgPrice: 40.70
}, {
    type: 'Gut Knife',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 39.99,
    avgPrice: 38.60
}, {
    type: 'Gut Knife',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 41.40,
    avgPrice: 39.84
}, {
    type: 'Gut Knife',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 40.97,
    avgPrice: 38.67
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 60.86,
    avgPrice: 53.28
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 51.60,
    avgPrice: 47.10
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 142.90,
    avgPrice: 97.03
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 55.34,
    avgPrice: 60.30
}, {
    type: 'Gut Knife',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 127.33,
    avgPrice: 111.06
}, {
    type: 'Gut Knife',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 40.90,
    avgPrice: 43.54
}, {
    type: 'Gut Knife',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 40.18,
    avgPrice: 39.70
}, {
    type: 'Gut Knife',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 44.06,
    avgPrice: 42.07
}, {
    type: 'Gut Knife',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 40.99,
    avgPrice: 39.52
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 65.58,
    avgPrice: 73.30
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 55.43,
    avgPrice: 49.03
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 70.00,
    avgPrice: 72.14
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 70.23,
    avgPrice: 49.81
}, {
    type: 'Gut Knife',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 77.75,
    avgPrice: 80.91
}, {
    type: 'Gut Knife',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 77.75,
    avgPrice: 70.58
}, {
    type: 'Gut Knife',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 56.19,
    avgPrice: 58.14
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 144.29,
    avgPrice: 125.29
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 97.37,
    avgPrice: 94.58
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 87.74,
    avgPrice: 85.45
}, {
    type: 'Gut Knife',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 131.36,
    avgPrice: 302.02
}, {
    type: 'Gut Knife',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 52.75,
    avgPrice: 50.07
}, {
    type: 'Gut Knife',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 48.87,
    avgPrice: 47.21
}, {
    type: 'Gut Knife',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 46.07,
    avgPrice: 46.58
}, {
    type: 'Gut Knife',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 51.08,
    avgPrice: 45.68
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 178.78,
    avgPrice: 175.00
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 74.72,
    avgPrice: 70.66
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 68.83,
    avgPrice: 63.12
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 70.49,
    avgPrice: 59.84
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 255.41,
    avgPrice: 65.32
}, {
    type: 'Gut Knife',
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 92.18,
    avgPrice: 88.99
}, {
    type: 'Gut Knife',
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 90.41,
    avgPrice: 93.54
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 139.64,
    avgPrice: 121.42
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 255.41,
    avgPrice: 136.70
}, {
    type: 'Gut Knife',
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 287.50,
    avgPrice: 187.19
}, {
    type: 'Gut Knife',
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 68.47,
    avgPrice: 66.92
}, {
    type: 'Gut Knife',
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 47.15,
    avgPrice: 45.79
}, {
    type: 'Gut Knife',
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 49.24,
    avgPrice: 45.65
}, {
    type: 'Gut Knife',
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 44.31,
    avgPrice: 44.48
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 108.83,
    avgPrice: 99.65
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 72.99,
    avgPrice: 94.24
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 75.00,
    avgPrice: 69.36
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 84.34,
    avgPrice: 51.26
}, {
    type: 'Gut Knife',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 110.00,
    avgPrice: 111.19
}, {
    type: 'Gut Knife',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 49.80,
    avgPrice: 46.55
}, {
    type: 'Gut Knife',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 41.10,
    avgPrice: 39.73
}, {
    type: 'Gut Knife',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 43.58,
    avgPrice: 42.18
}, {
    type: 'Gut Knife',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 41.20,
    avgPrice: 40.07
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 75.81,
    avgPrice: 66.32
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 65.32,
    avgPrice: 56.05
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 92.00,
    avgPrice: 59.94
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 83.29,
    avgPrice: 75.47
}, {
    type: 'Gut Knife',
    name: '',
    quality: '',
    marketPrice: 54.00,
    avgPrice: 51.94
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 76.62,
    avgPrice: 71.92
}, {
    type: 'Huntsman Knife',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 185.99,
    avgPrice: 145.74
}, {
    type: 'Huntsman Knife',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 96.62,
    avgPrice: 92.52
}, {
    type: 'Huntsman Knife',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 86.62,
    avgPrice: 80.25
}, {
    type: 'Huntsman Knife',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 77.48,
    avgPrice: 76.47
}, {
    type: 'Huntsman Knife',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 74.03,
    avgPrice: 74.06
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 413.75
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 190.27,
    avgPrice: 151.20
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 135.27,
    avgPrice: 153.10
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 115.00,
    avgPrice: 108.74
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 153.24,
    avgPrice: 145.64
}, {
    type: 'Huntsman Knife',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 217.50,
    avgPrice: 199.09
}, {
    type: 'Huntsman Knife',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 76.62,
    avgPrice: 71.37
}, {
    type: 'Huntsman Knife',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 52.21,
    avgPrice: 51.86
}, {
    type: 'Huntsman Knife',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 55.44,
    avgPrice: 50.35
}, {
    type: 'Huntsman Knife',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 50.77,
    avgPrice: 49.19
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 875.00
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 140.00,
    avgPrice: 121.20
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 76.07,
    avgPrice: 74.55
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 86.41,
    avgPrice: 77.07
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 75.00,
    avgPrice: 68.43
}, {
    type: 'Huntsman Knife',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 268.00,
    avgPrice: 237.85
}, {
    type: 'Huntsman Knife',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 102.98,
    avgPrice: 104.84
}, {
    type: 'Huntsman Knife',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 87.97,
    avgPrice: 87.47
}, {
    type: 'Huntsman Knife',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 88.83,
    avgPrice: 86.52
}, {
    type: 'Huntsman Knife',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 90.00,
    avgPrice: 86.87
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 687.50
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 166.56,
    avgPrice: 202.34
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 164.35,
    avgPrice: 146.94
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 166.01,
    avgPrice: 151.09
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 144.37,
    avgPrice: 171.57
}, {
    type: 'Huntsman Knife',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 816.25
}, {
    type: 'Huntsman Knife',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 170.96,
    avgPrice: 162.32
}, {
    type: 'Huntsman Knife',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 97.72,
    avgPrice: 93.47
}, {
    type: 'Huntsman Knife',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 98.33,
    avgPrice: 93.93
}, {
    type: 'Huntsman Knife',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 68.95,
    avgPrice: 79.74
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 424.29,
    avgPrice: 481.25
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 133.28,
    avgPrice: 131.08
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 191.47,
    avgPrice: 157.42
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 166.58,
    avgPrice: 129.25
}, {
    type: 'Huntsman Knife',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 180.89,
    avgPrice: 179.72
}, {
    type: 'Huntsman Knife',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 197.03,
    avgPrice: 181.28
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 344.81,
    avgPrice: 337.50
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 338.15,
    avgPrice: 308.27
}, {
    type: 'Huntsman Knife',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 151.00,
    avgPrice: 133.97
}, {
    type: 'Huntsman Knife',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 68.58,
    avgPrice: 68.82
}, {
    type: 'Huntsman Knife',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 51.00,
    avgPrice: 49.65
}, {
    type: 'Huntsman Knife',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 54.64,
    avgPrice: 52.65
}, {
    type: 'Huntsman Knife',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 52.00,
    avgPrice: 49.70
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 128.94,
    avgPrice: 107.38
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 80.35,
    avgPrice: 70.22
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 127.68,
    avgPrice: 97.38
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 75.52,
    avgPrice: 63.05
}, {
    type: 'Huntsman Knife',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 637.50
}, {
    type: 'Huntsman Knife',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 126.00,
    avgPrice: 114.76
}, {
    type: 'Huntsman Knife',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 69.99,
    avgPrice: 68.70
}, {
    type: 'Huntsman Knife',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 68.80,
    avgPrice: 69.79
}, {
    type: 'Huntsman Knife',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 62.05,
    avgPrice: 63.84
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 3250.00
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 299.00,
    avgPrice: 220.34
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 125.70,
    avgPrice: 111.55
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 111.05,
    avgPrice: 92.94
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 158.54,
    avgPrice: 103.52
}, {
    type: 'Huntsman Knife',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 209.89,
    avgPrice: 117.10
}, {
    type: 'Huntsman Knife',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 61.00,
    avgPrice: 56.93
}, {
    type: 'Huntsman Knife',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 45.55,
    avgPrice: 47.39
}, {
    type: 'Huntsman Knife',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 52.87,
    avgPrice: 50.96
}, {
    type: 'Huntsman Knife',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 49.03,
    avgPrice: 47.70
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 255.41,
    avgPrice: 82.74
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 76.27,
    avgPrice: 76.87
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 69.07,
    avgPrice: 54.35
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 398.60,
    avgPrice: 84.36
}, {
    type: 'Huntsman Knife',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 172.50,
    avgPrice: 156.09
}, {
    type: 'Huntsman Knife',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 63.79,
    avgPrice: 61.83
}, {
    type: 'Huntsman Knife',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 49.45,
    avgPrice: 50.33
}, {
    type: 'Huntsman Knife',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 51.68,
    avgPrice: 54.54
}, {
    type: 'Huntsman Knife',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 49.98,
    avgPrice: 47.70
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 375.76,
    avgPrice: 200.00
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 140.47,
    avgPrice: 132.46
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 74.46,
    avgPrice: 75.92
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 101.97,
    avgPrice: 70.61
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 97.75,
    avgPrice: 74.80
}, {
    type: 'Huntsman Knife',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 212.76,
    avgPrice: 217.11
}, {
    type: 'Huntsman Knife',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 158.82,
    avgPrice: 159.38
}, {
    type: 'Huntsman Knife',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 115.00,
    avgPrice: 116.37
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 380.55,
    avgPrice: 388.75
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 252.92,
    avgPrice: 214.92
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 236.99,
    avgPrice: 247.19
}, {
    type: 'Huntsman Knife',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 115.92,
    avgPrice: 94.99
}, {
    type: 'Huntsman Knife',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 70.97,
    avgPrice: 68.98
}, {
    type: 'Huntsman Knife',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 62.99,
    avgPrice: 61.15
}, {
    type: 'Huntsman Knife',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 67.19,
    avgPrice: 60.78
}, {
    type: 'Huntsman Knife',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 63.10,
    avgPrice: 57.74
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 406.76,
    avgPrice: 339.15
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 137.91,
    avgPrice: 131.60
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 91.05,
    avgPrice: 81.19
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 114.59,
    avgPrice: 80.43
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 109.83,
    avgPrice: 102.86
}, {
    type: 'Huntsman Knife',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 241.15,
    avgPrice: 155.27
}, {
    type: 'Huntsman Knife',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 75.09,
    avgPrice: 69.47
}, {
    type: 'Huntsman Knife',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 53.30,
    avgPrice: 51.89
}, {
    type: 'Huntsman Knife',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 51.06,
    avgPrice: 53.89
}, {
    type: 'Huntsman Knife',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 52.04,
    avgPrice: 50.34
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 108.56,
    avgPrice: 105.56
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 88.70,
    avgPrice: 186.42
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 156.31,
    avgPrice: 96.94
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 94.49,
    avgPrice: 91.77
}, {
    type: 'Huntsman Knife',
    name: '',
    quality: '',
    marketPrice: 95.53,
    avgPrice: 102.08
}, {
    type: 'Huntsman Knife',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 150.00,
    avgPrice: 160.98
}, {
    type: 'Karambit',
    name: 'Autotronic',
    quality: 'Minimal Wear',
    marketPrice: 398.63,
    avgPrice: 750.00
}, {
    type: 'Karambit',
    name: 'Autotronic',
    quality: 'Field-Tested',
    marketPrice: 400.00,
    avgPrice: 517.50
}, {
    type: 'Karambit',
    name: 'Autotronic',
    quality: 'Battle-Scarred',
    marketPrice: 376.46,
    avgPrice: 362.92
}, {
    type: 'Karambit',
    name: 'Black Laminate',
    quality: 'Minimal Wear',
    marketPrice: 396.75,
    avgPrice: 385.00
}, {
    type: 'Karambit',
    name: 'Black Laminate',
    quality: 'Field-Tested',
    marketPrice: 394.23,
    avgPrice: 343.75
}, {
    type: 'Karambit',
    name: 'Black Laminate',
    quality: 'Well-Worn',
    marketPrice: 343.00,
    avgPrice: 323.09
}, {
    type: 'Karambit',
    name: 'Black Laminate',
    quality: 'Battle-Scarred',
    marketPrice: 362.25,
    avgPrice: 289.73
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Black Laminate',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 502.50
}, {
    type: 'Karambit',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 392.01,
    avgPrice: 368.75
}, {
    type: 'Karambit',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 220.00,
    avgPrice: 223.29
}, {
    type: 'Karambit',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 205.00,
    avgPrice: 197.87
}, {
    type: 'Karambit',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 188.78,
    avgPrice: 187.53
}, {
    type: 'Karambit',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 178.50,
    avgPrice: 184.03
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 635.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 390.00,
    avgPrice: 435.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 302.06,
    avgPrice: 311.25
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 380.00,
    avgPrice: 265.72
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 247.31,
    avgPrice: 216.67
}, {
    type: 'Karambit',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 370.00
}, {
    type: 'Karambit',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 155.26,
    avgPrice: 136.05
}, {
    type: 'Karambit',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 122.50,
    avgPrice: 116.32
}, {
    type: 'Karambit',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 119.71,
    avgPrice: 117.60
}, {
    type: 'Karambit',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 108.83,
    avgPrice: 108.97
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1000.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 225.05,
    avgPrice: 181.13
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 172.40,
    avgPrice: 273.46
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 226.55,
    avgPrice: 177.72
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 298.55,
    avgPrice: 274.65
}, {
    type: 'Karambit',
    name: 'Bright Water',
    quality: 'Factory New',
    marketPrice: 418.61,
    avgPrice: 381.25
}, {
    type: 'Karambit',
    name: 'Bright Water',
    quality: 'Minimal Wear',
    marketPrice: 249.98,
    avgPrice: 244.07
}, {
    type: 'Karambit',
    name: 'Bright Water',
    quality: 'Field-Tested',
    marketPrice: 223.48,
    avgPrice: 208.15
}, {
    type: 'Karambit',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 468.76,
    avgPrice: 485.00
}, {
    type: 'Karambit',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 277.86,
    avgPrice: 269.34
}, {
    type: 'Karambit',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 222.42,
    avgPrice: 225.66
}, {
    type: 'Karambit',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 215.05,
    avgPrice: 204.26
}, {
    type: 'Karambit',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 199.88,
    avgPrice: 198.41
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1258.75
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 413.12,
    avgPrice: 763.75
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 399.78,
    avgPrice: 471.25
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 398.49,
    avgPrice: 345.96
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 369.33,
    avgPrice: 361.13
}, {
    type: 'Karambit',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 2586.25
}, {
    type: 'Karambit',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 530.00
}, {
    type: 'Karambit',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 247.26,
    avgPrice: 250.39
}, {
    type: 'Karambit',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 244.31,
    avgPrice: 226.83
}, {
    type: 'Karambit',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 187.53,
    avgPrice: 176.33
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1191.25
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 399.78,
    avgPrice: 405.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 400.00,
    avgPrice: 468.75
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 326.44,
    avgPrice: 288.82
}, {
    type: 'Karambit',
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 314.25,
    avgPrice: 338.75
}, {
    type: 'Karambit',
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 265.46,
    avgPrice: 259.56
}, {
    type: 'Karambit',
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 227.65,
    avgPrice: 221.35
}, {
    type: 'Karambit',
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 235.00,
    avgPrice: 230.18
}, {
    type: 'Karambit',
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 222.09,
    avgPrice: 198.98
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 400.00,
    avgPrice: 493.75
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 394.00,
    avgPrice: 581.25
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 329.85,
    avgPrice: 312.50
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 321.55,
    avgPrice: 339.83
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 400.00,
    avgPrice: 303.75
}, {
    type: 'Karambit',
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 382.62,
    avgPrice: 403.75
}, {
    type: 'Karambit',
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 379.29,
    avgPrice: 1285.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1315.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 387.50
}, {
    type: 'Karambit',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 595.00
}, {
    type: 'Karambit',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 552.50
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 927.50
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 612.50
}, {
    type: 'Karambit',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 409.53,
    avgPrice: 318.40
}, {
    type: 'Karambit',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 145.04,
    avgPrice: 140.26
}, {
    type: 'Karambit',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 111.11,
    avgPrice: 111.17
}, {
    type: 'Karambit',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 114.38,
    avgPrice: 107.27
}, {
    type: 'Karambit',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 112.16,
    avgPrice: 108.93
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 203.01,
    avgPrice: 193.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 154.37,
    avgPrice: 137.28
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 197.68,
    avgPrice: 158.60
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 166.58,
    avgPrice: 171.97
}, {
    type: 'Karambit',
    name: 'Freehand',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 397.23
}, {
    type: 'Karambit',
    name: 'Freehand',
    quality: 'Minimal Wear',
    marketPrice: 398.60,
    avgPrice: 432.50
}, {
    type: 'Karambit',
    name: 'Freehand',
    quality: 'Field-Tested',
    marketPrice: 398.68,
    avgPrice: 367.34
}, {
    type: 'Karambit',
    name: 'Freehand',
    quality: 'Well-Worn',
    marketPrice: 298.72,
    avgPrice: 332.98
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Freehand',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 625.00
}, {
    type: 'Karambit',
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 995.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1218.75
}, {
    type: 'Karambit',
    name: 'Lore',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 2325.00
}, {
    type: 'Karambit',
    name: 'Lore',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1226.25
}, {
    type: 'Karambit',
    name: 'Lore',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 627.50
}, {
    type: 'Karambit',
    name: 'Lore',
    quality: 'Battle-Scarred',
    marketPrice: 476.90,
    avgPrice: 400.62
}, {
    type: 'Karambit',
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 647.50
}, {
    type: 'Karambit',
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 625.00
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1187.50
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 837.50
}, {
    type: 'Karambit',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1281.25
}, {
    type: 'Karambit',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 264.30,
    avgPrice: 259.06
}, {
    type: 'Karambit',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 164.35,
    avgPrice: 165.45
}, {
    type: 'Karambit',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 171.02,
    avgPrice: 154.32
}, {
    type: 'Karambit',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 152.69,
    avgPrice: 146.92
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 437.50
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 234.99,
    avgPrice: 240.81
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 319.20,
    avgPrice: 259.71
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 263.61,
    avgPrice: 243.68
}, {
    type: 'Karambit',
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 182.54,
    avgPrice: 176.61
}, {
    type: 'Karambit',
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 150.00,
    avgPrice: 145.23
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 400.00,
    avgPrice: 234.43
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 209.73,
    avgPrice: 201.94
}, {
    type: 'Karambit',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 246.52,
    avgPrice: 205.71
}, {
    type: 'Karambit',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 118.83,
    avgPrice: 113.59
}, {
    type: 'Karambit',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 101.20,
    avgPrice: 99.48
}, {
    type: 'Karambit',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 104.71,
    avgPrice: 101.92
}, {
    type: 'Karambit',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 101.06,
    avgPrice: 94.91
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 387.42
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 149.80,
    avgPrice: 157.38
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 134.78,
    avgPrice: 123.04
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 180.43,
    avgPrice: 136.57
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 139.91,
    avgPrice: 145.96
}, {
    type: 'Karambit',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 398.08,
    avgPrice: 331.25
}, {
    type: 'Karambit',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 137.82,
    avgPrice: 138.51
}, {
    type: 'Karambit',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 105.80,
    avgPrice: 107.73
}, {
    type: 'Karambit',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 112.79,
    avgPrice: 110.17
}, {
    type: 'Karambit',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 108.67,
    avgPrice: 103.77
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 240.54,
    avgPrice: 229.60
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 168.28,
    avgPrice: 158.16
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 160.00,
    avgPrice: 168.89
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 149.80,
    avgPrice: 113.60
}, {
    type: 'Karambit',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 404.59,
    avgPrice: 442.50
}, {
    type: 'Karambit',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 340.00,
    avgPrice: 341.25
}, {
    type: 'Karambit',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 308.73,
    avgPrice: 328.75
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 683.75
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 416.25
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 413.12,
    avgPrice: 448.75
}, {
    type: 'Karambit',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 322.04,
    avgPrice: 320.76
}, {
    type: 'Karambit',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 199.88,
    avgPrice: 185.96
}, {
    type: 'Karambit',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 167.69,
    avgPrice: 171.25
}, {
    type: 'Karambit',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 166.35,
    avgPrice: 160.77
}, {
    type: 'Karambit',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 172.96,
    avgPrice: 149.56
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 398.16,
    avgPrice: 753.75
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 322.06,
    avgPrice: 283.05
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 217.21,
    avgPrice: 192.77
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 235.53,
    avgPrice: 207.85
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 240.00,
    avgPrice: 192.48
}, {
    type: 'Karambit',
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 501.25
}, {
    type: 'Karambit',
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 414.20,
    avgPrice: 471.25
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 853.75
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1031.25
}, {
    type: 'Karambit',
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1187.50
}, {
    type: 'Karambit',
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 285.40,
    avgPrice: 275.28
}, {
    type: 'Karambit',
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 177.00,
    avgPrice: 168.18
}, {
    type: 'Karambit',
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 169.85,
    avgPrice: 165.31
}, {
    type: 'Karambit',
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 160.54,
    avgPrice: 148.30
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 400.00,
    avgPrice: 357.50
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 215.43,
    avgPrice: 248.80
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 377.57,
    avgPrice: 275.32
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 223.35,
    avgPrice: 186.64
}, {
    type: 'Karambit',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 425.00
}, {
    type: 'Karambit',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 180.75,
    avgPrice: 143.34
}, {
    type: 'Karambit',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 109.95,
    avgPrice: 109.64
}, {
    type: 'Karambit',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 130.00,
    avgPrice: 117.71
}, {
    type: 'Karambit',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 105.00,
    avgPrice: 104.68
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 290.00,
    avgPrice: 224.79
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 138.81,
    avgPrice: 145.89
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 177.25,
    avgPrice: 160.86
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 169.66,
    avgPrice: 152.13
}, {
    type: 'Karambit',
    name: '',
    quality: '',
    marketPrice: 210.99,
    avgPrice: 211.26
}, {
    type: 'Karambit',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 292.59,
    avgPrice: 274.46
}, {
    type: 'M249',
    name: 'Blizzard Marbleized',
    quality: 'Factory New',
    marketPrice: 113.70,
    avgPrice: 37.06
}, {
    type: 'M249',
    name: 'Blizzard Marbleized',
    quality: 'Minimal Wear',
    marketPrice: 1.95,
    avgPrice: 1.88
}, {
    type: 'M249',
    name: 'Blizzard Marbleized',
    quality: 'Field-Tested',
    marketPrice: 0.71,
    avgPrice: 0.66
}, {
    type: 'M249',
    name: 'Blizzard Marbleized',
    quality: 'Well-Worn',
    marketPrice: 8.62,
    avgPrice: 4.29
}, {
    type: 'M249',
    name: 'Blizzard Marbleized',
    quality: 'Battle-Scarred',
    marketPrice: 6.00,
    avgPrice: 5.55
}, {
    type: 'M249',
    name: 'Contrast Spray',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.25
}, {
    type: 'M249',
    name: 'Contrast Spray',
    quality: 'Minimal Wear',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'M249',
    name: 'Contrast Spray',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'M249',
    name: 'Contrast Spray',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'M249',
    name: 'Contrast Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir M249',
    name: 'Contrast Spray',
    quality: 'Factory New',
    marketPrice: 4.57,
    avgPrice: 3.72
}, {
    type: 'Souvenir M249',
    name: 'Contrast Spray',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.30
}, {
    type: 'Souvenir M249',
    name: 'Contrast Spray',
    quality: 'Field-Tested',
    marketPrice: 0.17,
    avgPrice: 0.17
}, {
    type: 'Souvenir M249',
    name: 'Contrast Spray',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.20
}, {
    type: 'Souvenir M249',
    name: 'Contrast Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.16,
    avgPrice: 0.18
}, {
    type: 'M249',
    name: 'Gator Mesh',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'M249',
    name: 'Gator Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'M249',
    name: 'Gator Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'M249',
    name: 'Gator Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.05
}, {
    type: 'M249',
    name: 'Gator Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir M249',
    name: 'Gator Mesh',
    quality: 'Factory New',
    marketPrice: 23.00,
    avgPrice: 22.64
}, {
    type: 'Souvenir M249',
    name: 'Gator Mesh',
    quality: 'Minimal Wear',
    marketPrice: 4.44,
    avgPrice: 5.62
}, {
    type: 'Souvenir M249',
    name: 'Gator Mesh',
    quality: 'Field-Tested',
    marketPrice: 4.60,
    avgPrice: 3.82
}, {
    type: 'Souvenir M249',
    name: 'Gator Mesh',
    quality: 'Well-Worn',
    marketPrice: 19.97,
    avgPrice: 10.93
}, {
    type: 'Souvenir M249',
    name: 'Gator Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 23.15,
    avgPrice: 19.68
}, {
    type: 'M249',
    name: 'Impact Drill',
    quality: 'Factory New',
    marketPrice: 0.30,
    avgPrice: 0.26
}, {
    type: 'M249',
    name: 'Impact Drill',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'M249',
    name: 'Impact Drill',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'M249',
    name: 'Impact Drill',
    quality: 'Well-Worn',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'M249',
    name: 'Impact Drill',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'M249',
    name: 'Jungle DDPAT',
    quality: 'Factory New',
    marketPrice: 14.00,
    avgPrice: 3.93
}, {
    type: 'M249',
    name: 'Jungle DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.46,
    avgPrice: 0.42
}, {
    type: 'M249',
    name: 'Jungle DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.27
}, {
    type: 'M249',
    name: 'Jungle DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.78,
    avgPrice: 0.59
}, {
    type: 'M249',
    name: 'Jungle DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.40,
    avgPrice: 0.36
}, {
    type: 'M249',
    name: 'Magma',
    quality: 'Factory New',
    marketPrice: 0.34,
    avgPrice: 0.31
}, {
    type: 'M249',
    name: 'Magma',
    quality: 'Minimal Wear',
    marketPrice: 0.13,
    avgPrice: 0.14
}, {
    type: 'M249',
    name: 'Magma',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'M249',
    name: 'Magma',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.19
}, {
    type: 'M249',
    name: 'Magma',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'M249',
    statTrak: true,
    name: 'Magma',
    quality: 'Factory New',
    marketPrice: 1.35,
    avgPrice: 1.16
}, {
    type: 'M249',
    statTrak: true,
    name: 'Magma',
    quality: 'Minimal Wear',
    marketPrice: 0.50,
    avgPrice: 0.44
}, {
    type: 'M249',
    statTrak: true,
    name: 'Magma',
    quality: 'Field-Tested',
    marketPrice: 0.27,
    avgPrice: 0.26
}, {
    type: 'M249',
    statTrak: true,
    name: 'Magma',
    quality: 'Well-Worn',
    marketPrice: 0.59,
    avgPrice: 0.28
}, {
    type: 'M249',
    statTrak: true,
    name: 'Magma',
    quality: 'Battle-Scarred',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'M249',
    name: 'Nebula Crusader',
    quality: 'Factory New',
    marketPrice: 1.35,
    avgPrice: 1.33
}, {
    type: 'M249',
    name: 'Nebula Crusader',
    quality: 'Minimal Wear',
    marketPrice: 0.62,
    avgPrice: 0.64
}, {
    type: 'M249',
    name: 'Nebula Crusader',
    quality: 'Field-Tested',
    marketPrice: 0.42,
    avgPrice: 0.42
}, {
    type: 'M249',
    name: 'Nebula Crusader',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.38
}, {
    type: 'M249',
    name: 'Nebula Crusader',
    quality: 'Battle-Scarred',
    marketPrice: 0.40,
    avgPrice: 0.37
}, {
    type: 'M249',
    statTrak: true,
    name: 'Nebula Crusader',
    quality: 'Factory New',
    marketPrice: 6.99,
    avgPrice: 5.09
}, {
    type: 'M249',
    statTrak: true,
    name: 'Nebula Crusader',
    quality: 'Minimal Wear',
    marketPrice: 1.93,
    avgPrice: 2.09
}, {
    type: 'M249',
    statTrak: true,
    name: 'Nebula Crusader',
    quality: 'Field-Tested',
    marketPrice: 1.51,
    avgPrice: 1.13
}, {
    type: 'M249',
    statTrak: true,
    name: 'Nebula Crusader',
    quality: 'Well-Worn',
    marketPrice: 1.08,
    avgPrice: 0.95
}, {
    type: 'M249',
    statTrak: true,
    name: 'Nebula Crusader',
    quality: 'Battle-Scarred',
    marketPrice: 0.92,
    avgPrice: 0.89
}, {
    type: 'M249',
    name: 'Shipping Forecast',
    quality: 'Factory New',
    marketPrice: 0.62,
    avgPrice: 0.48
}, {
    type: 'M249',
    name: 'Shipping Forecast',
    quality: 'Minimal Wear',
    marketPrice: 0.46,
    avgPrice: 0.43
}, {
    type: 'M249',
    name: 'Shipping Forecast',
    quality: 'Field-Tested',
    marketPrice: 0.43,
    avgPrice: 0.42
}, {
    type: 'M249',
    name: 'Shipping Forecast',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.43
}, {
    type: 'M249',
    name: 'Shipping Forecast',
    quality: 'Battle-Scarred',
    marketPrice: 0.49,
    avgPrice: 0.41
}, {
    type: 'M249',
    name: 'Spectre',
    quality: 'Factory New',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'M249',
    name: 'Spectre',
    quality: 'Minimal Wear',
    marketPrice: 0.14,
    avgPrice: 0.13
}, {
    type: 'M249',
    name: 'Spectre',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'M249',
    name: 'Spectre',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'M249',
    name: 'Spectre',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'M249',
    statTrak: true,
    name: 'Spectre',
    quality: 'Factory New',
    marketPrice: 0.92,
    avgPrice: 0.92
}, {
    type: 'M249',
    statTrak: true,
    name: 'Spectre',
    quality: 'Minimal Wear',
    marketPrice: 0.58,
    avgPrice: 0.44
}, {
    type: 'M249',
    statTrak: true,
    name: 'Spectre',
    quality: 'Field-Tested',
    marketPrice: 0.28,
    avgPrice: 0.24
}, {
    type: 'M249',
    statTrak: true,
    name: 'Spectre',
    quality: 'Well-Worn',
    marketPrice: 0.42,
    avgPrice: 0.27
}, {
    type: 'M249',
    statTrak: true,
    name: 'Spectre',
    quality: 'Battle-Scarred',
    marketPrice: 0.27,
    avgPrice: 0.23
}, {
    type: 'M249',
    name: 'System Lock',
    quality: 'Factory New',
    marketPrice: 0.20,
    avgPrice: 0.20
}, {
    type: 'M249',
    name: 'System Lock',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'M249',
    name: 'System Lock',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'M249',
    name: 'System Lock',
    quality: 'Well-Worn',
    marketPrice: 0.14,
    avgPrice: 0.11
}, {
    type: 'M249',
    name: 'System Lock',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'M249',
    statTrak: true,
    name: 'System Lock',
    quality: 'Factory New',
    marketPrice: 0.78,
    avgPrice: 0.85
}, {
    type: 'M249',
    statTrak: true,
    name: 'System Lock',
    quality: 'Minimal Wear',
    marketPrice: 0.32,
    avgPrice: 0.30
}, {
    type: 'M249',
    statTrak: true,
    name: 'System Lock',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'M249',
    statTrak: true,
    name: 'System Lock',
    quality: 'Well-Worn',
    marketPrice: 0.35,
    avgPrice: 0.25
}, {
    type: 'M249',
    statTrak: true,
    name: 'System Lock',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.22
}, {
    type: 'M4A1-S',
    name: 'Atomic Alloy',
    quality: 'Factory New',
    marketPrice: 9.95,
    avgPrice: 9.97
}, {
    type: 'M4A1-S',
    name: 'Atomic Alloy',
    quality: 'Minimal Wear',
    marketPrice: 4.80,
    avgPrice: 4.81
}, {
    type: 'M4A1-S',
    name: 'Atomic Alloy',
    quality: 'Field-Tested',
    marketPrice: 2.93,
    avgPrice: 2.82
}, {
    type: 'M4A1-S',
    name: 'Atomic Alloy',
    quality: 'Well-Worn',
    marketPrice: 3.10,
    avgPrice: 3.09
}, {
    type: 'M4A1-S',
    name: 'Atomic Alloy',
    quality: 'Battle-Scarred',
    marketPrice: 2.45,
    avgPrice: 2.65
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Atomic Alloy',
    quality: 'Factory New',
    marketPrice: 38.31,
    avgPrice: 34.19
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Atomic Alloy',
    quality: 'Minimal Wear',
    marketPrice: 17.52,
    avgPrice: 16.61
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Atomic Alloy',
    quality: 'Field-Tested',
    marketPrice: 8.79,
    avgPrice: 8.65
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Atomic Alloy',
    quality: 'Well-Worn',
    marketPrice: 10.59,
    avgPrice: 9.26
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Atomic Alloy',
    quality: 'Battle-Scarred',
    marketPrice: 8.36,
    avgPrice: 7.99
}, {
    type: 'M4A1-S',
    name: 'Basilisk',
    quality: 'Factory New',
    marketPrice: 3.16,
    avgPrice: 2.98
}, {
    type: 'M4A1-S',
    name: 'Basilisk',
    quality: 'Minimal Wear',
    marketPrice: 1.80,
    avgPrice: 1.76
}, {
    type: 'M4A1-S',
    name: 'Basilisk',
    quality: 'Field-Tested',
    marketPrice: 1.51,
    avgPrice: 1.49
}, {
    type: 'M4A1-S',
    name: 'Basilisk',
    quality: 'Well-Worn',
    marketPrice: 1.90,
    avgPrice: 1.98
}, {
    type: 'M4A1-S',
    name: 'Basilisk',
    quality: 'Battle-Scarred',
    marketPrice: 1.66,
    avgPrice: 1.47
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Basilisk',
    quality: 'Factory New',
    marketPrice: 12.45,
    avgPrice: 12.02
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Basilisk',
    quality: 'Minimal Wear',
    marketPrice: 7.55,
    avgPrice: 7.33
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Basilisk',
    quality: 'Field-Tested',
    marketPrice: 6.55,
    avgPrice: 6.53
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Basilisk',
    quality: 'Well-Worn',
    marketPrice: 7.66,
    avgPrice: 7.40
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Basilisk',
    quality: 'Battle-Scarred',
    marketPrice: 7.01,
    avgPrice: 6.49
}, {
    type: 'M4A1-S',
    name: 'Blood Tiger',
    quality: 'Factory New',
    marketPrice: 2.33,
    avgPrice: 2.32
}, {
    type: 'M4A1-S',
    name: 'Blood Tiger',
    quality: 'Minimal Wear',
    marketPrice: 1.79,
    avgPrice: 1.81
}, {
    type: 'M4A1-S',
    name: 'Blood Tiger',
    quality: 'Field-Tested',
    marketPrice: 1.68,
    avgPrice: 1.71
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Blood Tiger',
    quality: 'Factory New',
    marketPrice: 10.90,
    avgPrice: 10.13
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Blood Tiger',
    quality: 'Minimal Wear',
    marketPrice: 7.37,
    avgPrice: 7.18
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Blood Tiger',
    quality: 'Field-Tested',
    marketPrice: 7.48,
    avgPrice: 6.92
}, {
    type: 'M4A1-S',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 2.32,
    avgPrice: 2.50
}, {
    type: 'M4A1-S',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 0.39,
    avgPrice: 0.36
}, {
    type: 'M4A1-S',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'M4A1-S',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.18
}, {
    type: 'M4A1-S',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'Souvenir M4A1-S',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 63.42,
    avgPrice: 40.81
}, {
    type: 'Souvenir M4A1-S',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 12.76,
    avgPrice: 18.58
}, {
    type: 'Souvenir M4A1-S',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 14.43,
    avgPrice: 24.99
}, {
    type: 'Souvenir M4A1-S',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 41.40,
    avgPrice: 42.78
}, {
    type: 'M4A1-S',
    name: 'Bright Water',
    quality: 'Minimal Wear',
    marketPrice: 4.00,
    avgPrice: 3.99
}, {
    type: 'M4A1-S',
    name: 'Bright Water',
    quality: 'Field-Tested',
    marketPrice: 4.16,
    avgPrice: 3.91
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Bright Water',
    quality: 'Minimal Wear',
    marketPrice: 15.88,
    avgPrice: 14.60
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Bright Water',
    quality: 'Field-Tested',
    marketPrice: 14.09,
    avgPrice: 13.37
}, {
    type: 'M4A1-S',
    name: 'Chantico\'s Fire',
    quality: 'Factory New',
    marketPrice: 79.95,
    avgPrice: 81.92
}, {
    type: 'M4A1-S',
    name: 'Chantico\'s Fire',
    quality: 'Minimal Wear',
    marketPrice: 35.50,
    avgPrice: 35.68
}, {
    type: 'M4A1-S',
    name: 'Chantico\'s Fire',
    quality: 'Field-Tested',
    marketPrice: 27.78,
    avgPrice: 25.69
}, {
    type: 'M4A1-S',
    name: 'Chantico\'s Fire',
    quality: 'Well-Worn',
    marketPrice: 22.04,
    avgPrice: 21.07
}, {
    type: 'M4A1-S',
    name: 'Chantico\'s Fire',
    quality: 'Battle-Scarred',
    marketPrice: 15.99,
    avgPrice: 16.17
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Chantico\'s Fire',
    quality: 'Factory New',
    marketPrice: 388.67,
    avgPrice: 653.75
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Chantico\'s Fire',
    quality: 'Minimal Wear',
    marketPrice: 109.50,
    avgPrice: 104.39
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Chantico\'s Fire',
    quality: 'Field-Tested',
    marketPrice: 73.29,
    avgPrice: 68.55
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Chantico\'s Fire',
    quality: 'Well-Worn',
    marketPrice: 53.31,
    avgPrice: 49.99
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Chantico\'s Fire',
    quality: 'Battle-Scarred',
    marketPrice: 42.00,
    avgPrice: 42.37
}, {
    type: 'Cologne 2016 Nuke Souvenir Package',
    name: '',
    quality: '',
    marketPrice: 7.33,
    avgPrice: 7.15
}, {
    type: 'M4A1-S',
    name: 'Cyrex',
    quality: 'Factory New',
    marketPrice: 14.53,
    avgPrice: 14.01
}, {
    type: 'M4A1-S',
    name: 'Cyrex',
    quality: 'Minimal Wear',
    marketPrice: 11.50,
    avgPrice: 11.00
}, {
    type: 'M4A1-S',
    name: 'Cyrex',
    quality: 'Field-Tested',
    marketPrice: 8.10,
    avgPrice: 7.96
}, {
    type: 'M4A1-S',
    name: 'Cyrex',
    quality: 'Well-Worn',
    marketPrice: 8.12,
    avgPrice: 7.92
}, {
    type: 'M4A1-S',
    name: 'Cyrex',
    quality: 'Battle-Scarred',
    marketPrice: 6.60,
    avgPrice: 6.94
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Factory New',
    marketPrice: 62.03,
    avgPrice: 56.75
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Minimal Wear',
    marketPrice: 42.64,
    avgPrice: 39.48
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Field-Tested',
    marketPrice: 26.60,
    avgPrice: 24.40
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Well-Worn',
    marketPrice: 25.54,
    avgPrice: 23.42
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Battle-Scarred',
    marketPrice: 19.44,
    avgPrice: 19.92
}, {
    type: 'M4A1-S',
    name: 'Dark Water',
    quality: 'Minimal Wear',
    marketPrice: 6.12,
    avgPrice: 5.94
}, {
    type: 'M4A1-S',
    name: 'Dark Water',
    quality: 'Field-Tested',
    marketPrice: 5.67,
    avgPrice: 5.55
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Dark Water',
    quality: 'Minimal Wear',
    marketPrice: 19.95,
    avgPrice: 16.67
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Dark Water',
    quality: 'Field-Tested',
    marketPrice: 13.23,
    avgPrice: 13.44
}, {
    type: 'M4A1-S',
    name: 'Golden Coil',
    quality: 'Factory New',
    marketPrice: 38.34,
    avgPrice: 38.12
}, {
    type: 'M4A1-S',
    name: 'Golden Coil',
    quality: 'Minimal Wear',
    marketPrice: 23.95,
    avgPrice: 23.20
}, {
    type: 'M4A1-S',
    name: 'Golden Coil',
    quality: 'Field-Tested',
    marketPrice: 15.46,
    avgPrice: 15.95
}, {
    type: 'M4A1-S',
    name: 'Golden Coil',
    quality: 'Well-Worn',
    marketPrice: 14.05,
    avgPrice: 13.92
}, {
    type: 'M4A1-S',
    name: 'Golden Coil',
    quality: 'Battle-Scarred',
    marketPrice: 11.70,
    avgPrice: 11.60
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Golden Coil',
    quality: 'Factory New',
    marketPrice: 179.88,
    avgPrice: 185.43
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Golden Coil',
    quality: 'Minimal Wear',
    marketPrice: 74.63,
    avgPrice: 74.45
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Golden Coil',
    quality: 'Field-Tested',
    marketPrice: 49.45,
    avgPrice: 48.10
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Golden Coil',
    quality: 'Well-Worn',
    marketPrice: 41.58,
    avgPrice: 39.79
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Golden Coil',
    quality: 'Battle-Scarred',
    marketPrice: 33.30,
    avgPrice: 30.52
}, {
    type: 'M4A1-S',
    name: 'Guardian',
    quality: 'Factory New',
    marketPrice: 6.38,
    avgPrice: 6.89
}, {
    type: 'M4A1-S',
    name: 'Guardian',
    quality: 'Minimal Wear',
    marketPrice: 5.46,
    avgPrice: 5.53
}, {
    type: 'M4A1-S',
    name: 'Guardian',
    quality: 'Field-Tested',
    marketPrice: 4.94,
    avgPrice: 4.81
}, {
    type: 'M4A1-S',
    name: 'Guardian',
    quality: 'Well-Worn',
    marketPrice: 6.00,
    avgPrice: 5.07
}, {
    type: 'M4A1-S',
    name: 'Guardian',
    quality: 'Battle-Scarred',
    marketPrice: 5.26,
    avgPrice: 4.70
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Guardian',
    quality: 'Factory New',
    marketPrice: 30.65,
    avgPrice: 31.65
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Guardian',
    quality: 'Minimal Wear',
    marketPrice: 24.44,
    avgPrice: 22.82
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Guardian',
    quality: 'Field-Tested',
    marketPrice: 17.91,
    avgPrice: 16.80
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Guardian',
    quality: 'Well-Worn',
    marketPrice: 16.45,
    avgPrice: 16.57
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Guardian',
    quality: 'Battle-Scarred',
    marketPrice: 18.56,
    avgPrice: 15.35
}, {
    type: 'M4A1-S',
    name: 'Hot Rod',
    quality: 'Factory New',
    marketPrice: 87.21,
    avgPrice: 86.20
}, {
    type: 'M4A1-S',
    name: 'Hot Rod',
    quality: 'Minimal Wear',
    marketPrice: 89.98,
    avgPrice: 82.56
}, {
    type: 'M4A1-S',
    name: 'Hyper Beast',
    quality: 'Factory New',
    marketPrice: 37.46,
    avgPrice: 36.32
}, {
    type: 'M4A1-S',
    name: 'Hyper Beast',
    quality: 'Minimal Wear',
    marketPrice: 17.77,
    avgPrice: 17.30
}, {
    type: 'M4A1-S',
    name: 'Hyper Beast',
    quality: 'Field-Tested',
    marketPrice: 11.22,
    avgPrice: 11.11
}, {
    type: 'M4A1-S',
    name: 'Hyper Beast',
    quality: 'Well-Worn',
    marketPrice: 8.93,
    avgPrice: 8.97
}, {
    type: 'M4A1-S',
    name: 'Hyper Beast',
    quality: 'Battle-Scarred',
    marketPrice: 7.52,
    avgPrice: 7.37
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Factory New',
    marketPrice: 212.57,
    avgPrice: 310.00
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Minimal Wear',
    marketPrice: 61.46,
    avgPrice: 55.56
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Field-Tested',
    marketPrice: 31.11,
    avgPrice: 30.03
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Well-Worn',
    marketPrice: 25.00,
    avgPrice: 23.51
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Battle-Scarred',
    marketPrice: 21.06,
    avgPrice: 19.59
}, {
    type: 'M4A1-S',
    name: 'Icarus Fell',
    quality: 'Factory New',
    marketPrice: 62.99,
    avgPrice: 67.16
}, {
    type: 'M4A1-S',
    name: 'Icarus Fell',
    quality: 'Minimal Wear',
    marketPrice: 66.70,
    avgPrice: 66.31
}, {
    type: 'M4A1-S',
    name: 'Knight',
    quality: 'Factory New',
    marketPrice: 217.08,
    avgPrice: 201.71
}, {
    type: 'M4A1-S',
    name: 'Knight',
    quality: 'Minimal Wear',
    marketPrice: 240.97,
    avgPrice: 190.74
}, {
    type: 'Souvenir M4A1-S',
    name: 'Knight',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 918.75
}, {
    type: 'Souvenir M4A1-S',
    name: 'Knight',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 642.50
}, {
    type: 'M4A1-S',
    name: 'Master Piece',
    quality: 'Factory New',
    marketPrice: 114.93,
    avgPrice: 126.07
}, {
    type: 'M4A1-S',
    name: 'Master Piece',
    quality: 'Minimal Wear',
    marketPrice: 51.42,
    avgPrice: 54.32
}, {
    type: 'M4A1-S',
    name: 'Master Piece',
    quality: 'Field-Tested',
    marketPrice: 40.30,
    avgPrice: 36.72
}, {
    type: 'M4A1-S',
    name: 'Master Piece',
    quality: 'Well-Worn',
    marketPrice: 26.37,
    avgPrice: 28.27
}, {
    type: 'M4A1-S',
    name: 'Master Piece',
    quality: 'Battle-Scarred',
    marketPrice: 23.32,
    avgPrice: 22.42
}, {
    type: 'Souvenir M4A1-S',
    name: 'Master Piece',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1266.25
}, {
    type: 'Souvenir M4A1-S',
    name: 'Master Piece',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 466.25
}, {
    type: 'Souvenir M4A1-S',
    name: 'Master Piece',
    quality: 'Well-Worn',
    marketPrice: 362.04,
    avgPrice: 360.00
}, {
    type: 'Souvenir M4A1-S',
    name: 'Master Piece',
    quality: 'Battle-Scarred',
    marketPrice: 285.40,
    avgPrice: 258.92
}, {
    type: 'M4A1-S',
    name: 'Mecha Industries',
    quality: 'Factory New',
    marketPrice: 75.52,
    avgPrice: 68.62
}, {
    type: 'M4A1-S',
    name: 'Mecha Industries',
    quality: 'Minimal Wear',
    marketPrice: 42.14,
    avgPrice: 42.72
}, {
    type: 'M4A1-S',
    name: 'Mecha Industries',
    quality: 'Field-Tested',
    marketPrice: 26.82,
    avgPrice: 28.73
}, {
    type: 'M4A1-S',
    name: 'Mecha Industries',
    quality: 'Well-Worn',
    marketPrice: 29.99,
    avgPrice: 31.64
}, {
    type: 'M4A1-S',
    name: 'Mecha Industries',
    quality: 'Battle-Scarred',
    marketPrice: 21.67,
    avgPrice: 23.84
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Mecha Industries',
    quality: 'Factory New',
    marketPrice: 351.79,
    avgPrice: 626.25
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Mecha Industries',
    quality: 'Minimal Wear',
    marketPrice: 134.10,
    avgPrice: 144.71
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Mecha Industries',
    quality: 'Field-Tested',
    marketPrice: 72.94,
    avgPrice: 84.00
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Mecha Industries',
    quality: 'Well-Worn',
    marketPrice: 86.25,
    avgPrice: 69.17
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Mecha Industries',
    quality: 'Battle-Scarred',
    marketPrice: 54.00,
    avgPrice: 55.27
}, {
    type: 'M4A1-S',
    name: 'Nitro',
    quality: 'Factory New',
    marketPrice: 4.29,
    avgPrice: 4.08
}, {
    type: 'M4A1-S',
    name: 'Nitro',
    quality: 'Minimal Wear',
    marketPrice: 2.32,
    avgPrice: 2.34
}, {
    type: 'M4A1-S',
    name: 'Nitro',
    quality: 'Field-Tested',
    marketPrice: 1.44,
    avgPrice: 1.34
}, {
    type: 'M4A1-S',
    name: 'Nitro',
    quality: 'Well-Worn',
    marketPrice: 1.52,
    avgPrice: 1.64
}, {
    type: 'M4A1-S',
    name: 'Nitro',
    quality: 'Battle-Scarred',
    marketPrice: 1.30,
    avgPrice: 1.26
}, {
    type: 'Souvenir M4A1-S',
    name: 'Nitro',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 185.67
}, {
    type: 'Souvenir M4A1-S',
    name: 'Nitro',
    quality: 'Field-Tested',
    marketPrice: 130.24,
    avgPrice: 79.25
}, {
    type: 'M4A1-S',
    name: 'VariCamo',
    quality: 'Factory New',
    marketPrice: 0.88,
    avgPrice: 0.92
}, {
    type: 'M4A1-S',
    name: 'VariCamo',
    quality: 'Minimal Wear',
    marketPrice: 0.42,
    avgPrice: 0.39
}, {
    type: 'M4A1-S',
    name: 'VariCamo',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.22
}, {
    type: 'M4A1-S',
    name: 'VariCamo',
    quality: 'Well-Worn',
    marketPrice: 0.73,
    avgPrice: 0.67
}, {
    type: 'M4A1-S',
    name: 'VariCamo',
    quality: 'Battle-Scarred',
    marketPrice: 0.30,
    avgPrice: 0.30
}, {
    type: 'Souvenir M4A1-S',
    name: 'VariCamo',
    quality: 'Factory New',
    marketPrice: 25.33,
    avgPrice: 24.25
}, {
    type: 'Souvenir M4A1-S',
    name: 'VariCamo',
    quality: 'Minimal Wear',
    marketPrice: 11.68,
    avgPrice: 12.37
}, {
    type: 'Souvenir M4A1-S',
    name: 'VariCamo',
    quality: 'Field-Tested',
    marketPrice: 8.22,
    avgPrice: 7.54
}, {
    type: 'Souvenir M4A1-S',
    name: 'VariCamo',
    quality: 'Well-Worn',
    marketPrice: 9.92,
    avgPrice: 9.77
}, {
    type: 'Souvenir M4A1-S',
    name: 'VariCamo',
    quality: 'Battle-Scarred',
    marketPrice: 11.75,
    avgPrice: 10.01
}, {
    type: 'M4A4',
    name: 'Asiimov',
    quality: 'Field-Tested',
    marketPrice: 38.41,
    avgPrice: 36.39
}, {
    type: 'M4A4',
    name: 'Asiimov',
    quality: 'Well-Worn',
    marketPrice: 29.49,
    avgPrice: 27.94
}, {
    type: 'M4A4',
    name: 'Asiimov',
    quality: 'Battle-Scarred',
    marketPrice: 14.41,
    avgPrice: 14.39
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Field-Tested',
    marketPrice: 205.91,
    avgPrice: 189.32
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Well-Worn',
    marketPrice: 155.49,
    avgPrice: 122.59
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Battle-Scarred',
    marketPrice: 47.89,
    avgPrice: 45.53
}, {
    type: 'M4A4',
    name: 'Bullet Rain',
    quality: 'Factory New',
    marketPrice: 14.43,
    avgPrice: 15.29
}, {
    type: 'M4A4',
    name: 'Bullet Rain',
    quality: 'Minimal Wear',
    marketPrice: 7.84,
    avgPrice: 7.78
}, {
    type: 'M4A4',
    name: 'Bullet Rain',
    quality: 'Field-Tested',
    marketPrice: 4.98,
    avgPrice: 5.15
}, {
    type: 'M4A4',
    name: 'Bullet Rain',
    quality: 'Well-Worn',
    marketPrice: 6.05,
    avgPrice: 5.73
}, {
    type: 'M4A4',
    name: 'Bullet Rain',
    quality: 'Battle-Scarred',
    marketPrice: 7.19,
    avgPrice: 6.80
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Bullet Rain',
    quality: 'Factory New',
    marketPrice: 86.62,
    avgPrice: 83.15
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Bullet Rain',
    quality: 'Minimal Wear',
    marketPrice: 40.78,
    avgPrice: 38.01
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Bullet Rain',
    quality: 'Field-Tested',
    marketPrice: 22.21,
    avgPrice: 19.47
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Bullet Rain',
    quality: 'Well-Worn',
    marketPrice: 22.17,
    avgPrice: 21.12
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Bullet Rain',
    quality: 'Battle-Scarred',
    marketPrice: 71.35,
    avgPrice: 51.37
}, {
    type: 'M4A4',
    name: 'Daybreak',
    quality: 'Factory New',
    marketPrice: 16.37,
    avgPrice: 16.55
}, {
    type: 'M4A4',
    name: 'Daybreak',
    quality: 'Minimal Wear',
    marketPrice: 11.27,
    avgPrice: 11.64
}, {
    type: 'M4A4',
    name: 'Daybreak',
    quality: 'Field-Tested',
    marketPrice: 5.79,
    avgPrice: 5.74
}, {
    type: 'M4A4',
    name: 'Daybreak',
    quality: 'Well-Worn',
    marketPrice: 5.67,
    avgPrice: 5.10
}, {
    type: 'M4A4',
    name: 'Daybreak',
    quality: 'Battle-Scarred',
    marketPrice: 4.45,
    avgPrice: 4.50
}, {
    type: 'M4A4',
    name: 'Desert Storm',
    quality: 'Factory New',
    marketPrice: 5.56,
    avgPrice: 5.68
}, {
    type: 'M4A4',
    name: 'Desert Storm',
    quality: 'Minimal Wear',
    marketPrice: 1.30,
    avgPrice: 1.15
}, {
    type: 'M4A4',
    name: 'Desert Storm',
    quality: 'Field-Tested',
    marketPrice: 0.63,
    avgPrice: 0.60
}, {
    type: 'M4A4',
    name: 'Desert Storm',
    quality: 'Well-Worn',
    marketPrice: 0.80,
    avgPrice: 0.78
}, {
    type: 'M4A4',
    name: 'Desert Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.62,
    avgPrice: 0.62
}, {
    type: 'M4A4',
    name: 'Desert-Strike',
    quality: 'Factory New',
    marketPrice: 5.90,
    avgPrice: 5.57
}, {
    type: 'M4A4',
    name: 'Desert-Strike',
    quality: 'Minimal Wear',
    marketPrice: 3.06,
    avgPrice: 3.25
}, {
    type: 'M4A4',
    name: 'Desert-Strike',
    quality: 'Field-Tested',
    marketPrice: 1.91,
    avgPrice: 1.95
}, {
    type: 'M4A4',
    name: 'Desert-Strike',
    quality: 'Well-Worn',
    marketPrice: 2.54,
    avgPrice: 2.48
}, {
    type: 'M4A4',
    name: 'Desert-Strike',
    quality: 'Battle-Scarred',
    marketPrice: 1.81,
    avgPrice: 1.78
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Factory New',
    marketPrice: 28.87,
    avgPrice: 31.53
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Minimal Wear',
    marketPrice: 17.48,
    avgPrice: 17.44
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Field-Tested',
    marketPrice: 9.33,
    avgPrice: 8.19
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Well-Worn',
    marketPrice: 13.87,
    avgPrice: 11.55
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Battle-Scarred',
    marketPrice: 7.99,
    avgPrice: 7.85
}, {
    type: 'M4A4',
    name: 'Desolate Space',
    quality: 'Factory New',
    marketPrice: 89.48,
    avgPrice: 78.24
}, {
    type: 'M4A4',
    name: 'Desolate Space',
    quality: 'Minimal Wear',
    marketPrice: 36.88,
    avgPrice: 40.73
}, {
    type: 'M4A4',
    name: 'Desolate Space',
    quality: 'Field-Tested',
    marketPrice: 29.99,
    avgPrice: 30.26
}, {
    type: 'M4A4',
    name: 'Desolate Space',
    quality: 'Well-Worn',
    marketPrice: 23.87,
    avgPrice: 25.89
}, {
    type: 'M4A4',
    name: 'Desolate Space',
    quality: 'Battle-Scarred',
    marketPrice: 22.60,
    avgPrice: 21.42
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desolate Space',
    quality: 'Factory New',
    marketPrice: 258.75,
    avgPrice: 248.15
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desolate Space',
    quality: 'Minimal Wear',
    marketPrice: 111.05,
    avgPrice: 114.16
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desolate Space',
    quality: 'Field-Tested',
    marketPrice: 85.59,
    avgPrice: 83.58
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desolate Space',
    quality: 'Battle-Scarred',
    marketPrice: 49.85,
    avgPrice: 52.00
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Desolate Space',
    quality: 'Well-Worn',
    marketPrice: 68.85,
    avgPrice: 66.01
}, {
    type: 'M4A4',
    name: 'Evil Daimyo',
    quality: 'Factory New',
    marketPrice: 2.12,
    avgPrice: 2.17
}, {
    type: 'M4A4',
    name: 'Evil Daimyo',
    quality: 'Minimal Wear',
    marketPrice: 1.50,
    avgPrice: 1.43
}, {
    type: 'M4A4',
    name: 'Evil Daimyo',
    quality: 'Field-Tested',
    marketPrice: 0.95,
    avgPrice: 0.91
}, {
    type: 'M4A4',
    name: 'Evil Daimyo',
    quality: 'Well-Worn',
    marketPrice: 1.19,
    avgPrice: 1.11
}, {
    type: 'M4A4',
    name: 'Evil Daimyo',
    quality: 'Battle-Scarred',
    marketPrice: 0.92,
    avgPrice: 0.87
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Evil Daimyo',
    quality: 'Factory New',
    marketPrice: 10.32,
    avgPrice: 10.33
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Evil Daimyo',
    quality: 'Minimal Wear',
    marketPrice: 6.55,
    avgPrice: 6.51
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Evil Daimyo',
    quality: 'Field-Tested',
    marketPrice: 4.06,
    avgPrice: 3.90
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Evil Daimyo',
    quality: 'Well-Worn',
    marketPrice: 4.29,
    avgPrice: 4.24
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Evil Daimyo',
    quality: 'Battle-Scarred',
    marketPrice: 4.05,
    avgPrice: 3.73
}, {
    type: 'M4A4',
    name: 'Faded Zebra',
    quality: 'Factory New',
    marketPrice: 4.32,
    avgPrice: 4.57
}, {
    type: 'M4A4',
    name: 'Faded Zebra',
    quality: 'Minimal Wear',
    marketPrice: 1.05,
    avgPrice: 0.96
}, {
    type: 'M4A4',
    name: 'Faded Zebra',
    quality: 'Field-Tested',
    marketPrice: 0.69,
    avgPrice: 0.62
}, {
    type: 'M4A4',
    name: 'Faded Zebra',
    quality: 'Well-Worn',
    marketPrice: 0.81,
    avgPrice: 0.69
}, {
    type: 'M4A4',
    name: 'Faded Zebra',
    quality: 'Battle-Scarred',
    marketPrice: 0.65,
    avgPrice: 0.63
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Faded Zebra',
    quality: 'Factory New',
    marketPrice: 32.20,
    avgPrice: 26.90
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Faded Zebra',
    quality: 'Minimal Wear',
    marketPrice: 3.84,
    avgPrice: 4.18
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Faded Zebra',
    quality: 'Field-Tested',
    marketPrice: 2.64,
    avgPrice: 2.93
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Faded Zebra',
    quality: 'Well-Worn',
    marketPrice: 3.38,
    avgPrice: 3.20
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Faded Zebra',
    quality: 'Battle-Scarred',
    marketPrice: 3.45,
    avgPrice: 3.45
}, {
    type: 'M4A4',
    name: 'Griffin',
    quality: 'Factory New',
    marketPrice: 3.50,
    avgPrice: 3.57
}, {
    type: 'M4A4',
    name: 'Griffin',
    quality: 'Minimal Wear',
    marketPrice: 1.84,
    avgPrice: 1.79
}, {
    type: 'M4A4',
    name: 'Griffin',
    quality: 'Field-Tested',
    marketPrice: 1.34,
    avgPrice: 1.27
}, {
    type: 'M4A4',
    name: 'Griffin',
    quality: 'Well-Worn',
    marketPrice: 2.46,
    avgPrice: 2.20
}, {
    type: 'M4A4',
    name: 'Griffin',
    quality: 'Battle-Scarred',
    marketPrice: 1.30,
    avgPrice: 1.20
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Griffin',
    quality: 'Factory New',
    marketPrice: 14.73,
    avgPrice: 14.46
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Griffin',
    quality: 'Minimal Wear',
    marketPrice: 6.87,
    avgPrice: 7.03
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Griffin',
    quality: 'Field-Tested',
    marketPrice: 4.54,
    avgPrice: 4.61
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Griffin',
    quality: 'Well-Worn',
    marketPrice: 7.20,
    avgPrice: 6.93
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Griffin',
    quality: 'Battle-Scarred',
    marketPrice: 4.46,
    avgPrice: 4.39
}, {
    type: 'M4A4',
    name: 'Howl',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1181.25
}, {
    type: 'M4A4',
    name: 'Howl',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 667.50
}, {
    type: 'M4A4',
    name: 'Howl',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 495.00
}, {
    type: 'M4A4',
    name: 'Howl',
    quality: 'Well-Worn',
    marketPrice: 0,
    avgPrice: 440.00
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Howl',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 3525.00
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Howl',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1523.75
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Howl',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 1187.50
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Howl',
    quality: 'Well-Worn',
    marketPrice: 0,
    avgPrice: 1128.75
}, {
    type: 'M4A4',
    name: 'Jungle Tiger',
    quality: 'Factory New',
    marketPrice: 13.08,
    avgPrice: 12.43
}, {
    type: 'M4A4',
    name: 'Jungle Tiger',
    quality: 'Minimal Wear',
    marketPrice: 1.64,
    avgPrice: 1.61
}, {
    type: 'M4A4',
    name: 'Jungle Tiger',
    quality: 'Field-Tested',
    marketPrice: 0.63,
    avgPrice: 0.59
}, {
    type: 'M4A4',
    name: 'Jungle Tiger',
    quality: 'Well-Worn',
    marketPrice: 0.89,
    avgPrice: 0.87
}, {
    type: 'M4A4',
    name: 'Jungle Tiger',
    quality: 'Battle-Scarred',
    marketPrice: 0.69,
    avgPrice: 0.63
}, {
    type: 'M4A4',
    name: 'Modern Hunter',
    quality: 'Factory New',
    marketPrice: 277.62,
    avgPrice: 248.85
}, {
    type: 'M4A4',
    name: 'Modern Hunter',
    quality: 'Minimal Wear',
    marketPrice: 19.82,
    avgPrice: 19.98
}, {
    type: 'M4A4',
    name: 'Modern Hunter',
    quality: 'Field-Tested',
    marketPrice: 5.47,
    avgPrice: 4.79
}, {
    type: 'M4A4',
    name: 'Modern Hunter',
    quality: 'Well-Worn',
    marketPrice: 5.03,
    avgPrice: 4.32
}, {
    type: 'M4A4',
    name: 'Modern Hunter',
    quality: 'Battle-Scarred',
    marketPrice: 6.21,
    avgPrice: 5.31
}, {
    type: 'M4A4',
    name: 'Poseidon',
    quality: 'Factory New',
    marketPrice: 159.88,
    avgPrice: 151.67
}, {
    type: 'M4A4',
    name: 'Poseidon',
    quality: 'Minimal Wear',
    marketPrice: 97.72,
    avgPrice: 100.62
}, {
    type: 'M4A4',
    name: 'Poseidon',
    quality: 'Field-Tested',
    marketPrice: 72.19,
    avgPrice: 84.37
}, {
    type: 'M4A4',
    name: 'Radiation Hazard',
    quality: 'Factory New',
    marketPrice: 158.56,
    avgPrice: 171.64
}, {
    type: 'M4A4',
    name: 'Radiation Hazard',
    quality: 'Minimal Wear',
    marketPrice: 14.87,
    avgPrice: 15.99
}, {
    type: 'M4A4',
    name: 'Radiation Hazard',
    quality: 'Field-Tested',
    marketPrice: 4.17,
    avgPrice: 4.50
}, {
    type: 'M4A4',
    name: 'Radiation Hazard',
    quality: 'Well-Worn',
    marketPrice: 4.10,
    avgPrice: 4.22
}, {
    type: 'M4A4',
    name: 'Radiation Hazard',
    quality: 'Battle-Scarred',
    marketPrice: 3.49,
    avgPrice: 3.37
}, {
    type: 'Souvenir M4A4',
    name: 'Radiation Hazard',
    quality: 'Minimal Wear',
    marketPrice: 42.20,
    avgPrice: 39.46
}, {
    type: 'Souvenir M4A4',
    name: 'Radiation Hazard',
    quality: 'Field-Tested',
    marketPrice: 14.00,
    avgPrice: 13.93
}, {
    type: 'Souvenir M4A4',
    name: 'Radiation Hazard',
    quality: 'Well-Worn',
    marketPrice: 15.21,
    avgPrice: 13.94
}, {
    type: 'Souvenir M4A4',
    name: 'Radiation Hazard',
    quality: 'Battle-Scarred',
    marketPrice: 10.09,
    avgPrice: 10.26
}, {
    type: 'M4A4',
    name: 'Royal Paladin',
    quality: 'Factory New',
    marketPrice: 51.65,
    avgPrice: 39.28
}, {
    type: 'M4A4',
    name: 'Royal Paladin',
    quality: 'Minimal Wear',
    marketPrice: 17.80,
    avgPrice: 17.81
}, {
    type: 'M4A4',
    name: 'Royal Paladin',
    quality: 'Field-Tested',
    marketPrice: 6.33,
    avgPrice: 6.44
}, {
    type: 'M4A4',
    name: 'Royal Paladin',
    quality: 'Well-Worn',
    marketPrice: 7.89,
    avgPrice: 8.14
}, {
    type: 'M4A4',
    name: 'Royal Paladin',
    quality: 'Battle-Scarred',
    marketPrice: 5.22,
    avgPrice: 4.98
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Royal Paladin',
    quality: 'Factory New',
    marketPrice: 299.84,
    avgPrice: 273.83
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Royal Paladin',
    quality: 'Minimal Wear',
    marketPrice: 62.85,
    avgPrice: 70.57
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Royal Paladin',
    quality: 'Field-Tested',
    marketPrice: 30.88,
    avgPrice: 27.63
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Royal Paladin',
    quality: 'Well-Worn',
    marketPrice: 33.99,
    avgPrice: 30.73
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Royal Paladin',
    quality: 'Battle-Scarred',
    marketPrice: 22.96,
    avgPrice: 21.46
}, {
    type: 'M4A4',
    name: 'The Battlestar',
    quality: 'Factory New',
    marketPrice: 13.31,
    avgPrice: 12.45
}, {
    type: 'M4A4',
    name: 'The Battlestar',
    quality: 'Minimal Wear',
    marketPrice: 7.50,
    avgPrice: 8.38
}, {
    type: 'M4A4',
    name: 'The Battlestar',
    quality: 'Field-Tested',
    marketPrice: 4.65,
    avgPrice: 5.08
}, {
    type: 'M4A4',
    name: 'The Battlestar',
    quality: 'Well-Worn',
    marketPrice: 5.07,
    avgPrice: 5.28
}, {
    type: 'M4A4',
    name: 'The Battlestar',
    quality: 'Battle-Scarred',
    marketPrice: 3.87,
    avgPrice: 3.84
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'The Battlestar',
    quality: 'Factory New',
    marketPrice: 54.62,
    avgPrice: 55.87
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'The Battlestar',
    quality: 'Minimal Wear',
    marketPrice: 33.19,
    avgPrice: 33.98
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'The Battlestar',
    quality: 'Field-Tested',
    marketPrice: 25.37,
    avgPrice: 20.57
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'The Battlestar',
    quality: 'Well-Worn',
    marketPrice: 26.00,
    avgPrice: 20.87
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'The Battlestar',
    quality: 'Battle-Scarred',
    marketPrice: 14.43,
    avgPrice: 15.23
}, {
    type: 'M4A4',
    name: 'Tornado',
    quality: 'Factory New',
    marketPrice: 15.54,
    avgPrice: 14.79
}, {
    type: 'M4A4',
    name: 'Tornado',
    quality: 'Minimal Wear',
    marketPrice: 1.78,
    avgPrice: 1.78
}, {
    type: 'M4A4',
    name: 'Tornado',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.54
}, {
    type: 'M4A4',
    name: 'Tornado',
    quality: 'Well-Worn',
    marketPrice: 0.94,
    avgPrice: 0.85
}, {
    type: 'M4A4',
    name: 'Tornado',
    quality: 'Battle-Scarred',
    marketPrice: 0.85,
    avgPrice: 0.71
}, {
    type: 'Souvenir M4A4',
    name: 'Tornado',
    quality: 'Factory New',
    marketPrice: 46.14,
    avgPrice: 71.27
}, {
    type: 'Souvenir M4A4',
    name: 'Tornado',
    quality: 'Minimal Wear',
    marketPrice: 5.38,
    avgPrice: 6.07
}, {
    type: 'Souvenir M4A4',
    name: 'Tornado',
    quality: 'Field-Tested',
    marketPrice: 2.60,
    avgPrice: 2.46
}, {
    type: 'Souvenir M4A4',
    name: 'Tornado',
    quality: 'Well-Worn',
    marketPrice: 3.28,
    avgPrice: 3.11
}, {
    type: 'Souvenir M4A4',
    name: 'Tornado',
    quality: 'Battle-Scarred',
    marketPrice: 2.37,
    avgPrice: 2.47
}, {
    type: 'M4A4',
    name: 'Urban DDPAT',
    quality: 'Factory New',
    marketPrice: 2.62,
    avgPrice: 2.85
}, {
    type: 'M4A4',
    name: 'Urban DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.38,
    avgPrice: 0.37
}, {
    type: 'M4A4',
    name: 'Urban DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.09,
    avgPrice: 0.07
}, {
    type: 'M4A4',
    name: 'Urban DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.15,
    avgPrice: 0.15
}, {
    type: 'M4A4',
    name: 'Urban DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.09,
    avgPrice: 0.07
}, {
    type: 'Souvenir M4A4',
    name: 'Urban DDPAT',
    quality: 'Factory New',
    marketPrice: 104.39,
    avgPrice: 93.21
}, {
    type: 'Souvenir M4A4',
    name: 'Urban DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 8.39,
    avgPrice: 8.05
}, {
    type: 'Souvenir M4A4',
    name: 'Urban DDPAT',
    quality: 'Field-Tested',
    marketPrice: 3.17,
    avgPrice: 3.58
}, {
    type: 'Souvenir M4A4',
    name: 'Urban DDPAT',
    quality: 'Well-Worn',
    marketPrice: 3.31,
    avgPrice: 3.58
}, {
    type: 'Souvenir M4A4',
    name: 'Urban DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 2.80,
    avgPrice: 2.69
}, {
    type: 'M4A4',
    name: 'X-Ray',
    quality: 'Factory New',
    marketPrice: 7.01,
    avgPrice: 6.91
}, {
    type: 'M4A4',
    name: 'X-Ray',
    quality: 'Minimal Wear',
    marketPrice: 5.60,
    avgPrice: 5.29
}, {
    type: 'M4A4',
    name: 'X-Ray',
    quality: 'Field-Tested',
    marketPrice: 4.52,
    avgPrice: 4.44
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'X-Ray',
    quality: 'Factory New',
    marketPrice: 42.41,
    avgPrice: 40.40
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'X-Ray',
    quality: 'Minimal Wear',
    marketPrice: 23.89,
    avgPrice: 25.50
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'X-Ray',
    quality: 'Field-Tested',
    marketPrice: 18.40,
    avgPrice: 19.55
}, {
    type: 'M4A4',
    name: 'Zirka',
    quality: 'Factory New',
    marketPrice: 11.99,
    avgPrice: 12.25
}, {
    type: 'M4A4',
    name: 'Zirka',
    quality: 'Minimal Wear',
    marketPrice: 4.18,
    avgPrice: 4.30
}, {
    type: 'M4A4',
    name: 'Zirka',
    quality: 'Field-Tested',
    marketPrice: 3.86,
    avgPrice: 3.74
}, {
    type: 'M4A4',
    name: 'Zirka',
    quality: 'Well-Worn',
    marketPrice: 4.10,
    avgPrice: 4.07
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Zirka',
    quality: 'Factory New',
    marketPrice: 92.65,
    avgPrice: 90.34
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Zirka',
    quality: 'Minimal Wear',
    marketPrice: 15.30,
    avgPrice: 15.40
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Zirka',
    quality: 'Field-Tested',
    marketPrice: 14.00,
    avgPrice: 12.12
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Zirka',
    quality: 'Well-Worn',
    marketPrice: 14.50,
    avgPrice: 18.11
}, {
    type: 'M4A4',
    name: '龍王 Dragon King',
    quality: 'Factory New',
    marketPrice: 9.44,
    avgPrice: 9.36
}, {
    type: 'M4A4',
    name: '龍王 Dragon King',
    quality: 'Minimal Wear',
    marketPrice: 5.44,
    avgPrice: 5.34
}, {
    type: 'M4A4',
    name: '龍王 Dragon King',
    quality: 'Field-Tested',
    marketPrice: 3.15,
    avgPrice: 3.13
}, {
    type: 'M4A4',
    name: '龍王 Dragon King',
    quality: 'Well-Worn',
    marketPrice: 4.08,
    avgPrice: 4.19
}, {
    type: 'M4A4',
    name: '龍王 Dragon King',
    quality: 'Battle-Scarred',
    marketPrice: 2.82,
    avgPrice: 2.64
}, {
    type: 'M4A4',
    statTrak: true,
    name: '龍王 Dragon King',
    quality: 'Factory New',
    marketPrice: 31.70,
    avgPrice: 31.32
}, {
    type: 'M4A4',
    statTrak: true,
    name: '龍王 Dragon King',
    quality: 'Minimal Wear',
    marketPrice: 20.65,
    avgPrice: 19.32
}, {
    type: 'M4A4',
    statTrak: true,
    name: '龍王 Dragon King',
    quality: 'Field-Tested',
    marketPrice: 11.40,
    avgPrice: 10.40
}, {
    type: 'M4A4',
    statTrak: true,
    name: '龍王 Dragon King',
    quality: 'Well-Worn',
    marketPrice: 15.52,
    avgPrice: 15.14
}, {
    type: 'M4A4',
    statTrak: true,
    name: '龍王 Dragon King',
    quality: 'Battle-Scarred',
    marketPrice: 8.80,
    avgPrice: 8.60
}, {
    type: 'M9 Bayonet',
    name: 'Autotronic',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1203.75
}, {
    type: 'M9 Bayonet',
    name: 'Autotronic',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 636.25
}, {
    type: 'M9 Bayonet',
    name: 'Autotronic',
    quality: 'Field-Tested',
    marketPrice: 349.67,
    avgPrice: 418.75
}, {
    type: 'M9 Bayonet',
    name: 'Autotronic',
    quality: 'Well-Worn',
    marketPrice: 406.67,
    avgPrice: 347.50
}, {
    type: 'M9 Bayonet',
    name: 'Autotronic',
    quality: 'Battle-Scarred',
    marketPrice: 272.55,
    avgPrice: 283.70
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Autotronic',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1057.50
}, {
    type: 'M9 Bayonet',
    name: 'Black Laminate',
    quality: 'Minimal Wear',
    marketPrice: 335.00,
    avgPrice: 338.18
}, {
    type: 'M9 Bayonet',
    name: 'Black Laminate',
    quality: 'Field-Tested',
    marketPrice: 266.95,
    avgPrice: 241.35
}, {
    type: 'M9 Bayonet',
    name: 'Black Laminate',
    quality: 'Well-Worn',
    marketPrice: 255.41,
    avgPrice: 220.97
}, {
    type: 'M9 Bayonet',
    name: 'Black Laminate',
    quality: 'Battle-Scarred',
    marketPrice: 255.41,
    avgPrice: 249.25
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Black Laminate',
    quality: 'Field-Tested',
    marketPrice: 0,
    avgPrice: 351.87
}, {
    type: 'M9 Bayonet',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 259.99,
    avgPrice: 259.12
}, {
    type: 'M9 Bayonet',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 158.82,
    avgPrice: 153.15
}, {
    type: 'M9 Bayonet',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 150.00,
    avgPrice: 139.92
}, {
    type: 'M9 Bayonet',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 132.74,
    avgPrice: 128.32
}, {
    type: 'M9 Bayonet',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 131.85,
    avgPrice: 128.10
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 656.25
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 265.42,
    avgPrice: 270.00
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 217.00,
    avgPrice: 179.16
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 199.50,
    avgPrice: 181.12
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 191.50,
    avgPrice: 165.16
}, {
    type: 'M9 Bayonet',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 359.53,
    avgPrice: 263.44
}, {
    type: 'M9 Bayonet',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 103.82,
    avgPrice: 102.23
}, {
    type: 'M9 Bayonet',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 78.75,
    avgPrice: 77.42
}, {
    type: 'M9 Bayonet',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 87.74,
    avgPrice: 81.57
}, {
    type: 'M9 Bayonet',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 74.76,
    avgPrice: 72.59
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 204.24,
    avgPrice: 196.70
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 104.71,
    avgPrice: 104.71
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 161.03,
    avgPrice: 165.28
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 113.27,
    avgPrice: 102.92
}, {
    type: 'M9 Bayonet',
    name: 'Bright Water',
    quality: 'Factory New',
    marketPrice: 259.99,
    avgPrice: 328.20
}, {
    type: 'M9 Bayonet',
    name: 'Bright Water',
    quality: 'Minimal Wear',
    marketPrice: 210.00,
    avgPrice: 200.99
}, {
    type: 'M9 Bayonet',
    name: 'Bright Water',
    quality: 'Field-Tested',
    marketPrice: 159.85,
    avgPrice: 121.46
}, {
    type: 'M9 Bayonet',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 345.00,
    avgPrice: 298.03
}, {
    type: 'M9 Bayonet',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 160.46,
    avgPrice: 154.75
}, {
    type: 'M9 Bayonet',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 133.28,
    avgPrice: 134.21
}, {
    type: 'M9 Bayonet',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 133.28,
    avgPrice: 133.24
}, {
    type: 'M9 Bayonet',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 123.28,
    avgPrice: 120.41
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 656.25
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 226.00,
    avgPrice: 252.66
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 229.88,
    avgPrice: 261.49
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 183.24,
    avgPrice: 212.87
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 204.20,
    avgPrice: 149.12
}, {
    type: 'M9 Bayonet',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 4575.00
}, {
    type: 'M9 Bayonet',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 687.50
}, {
    type: 'M9 Bayonet',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 141.74,
    avgPrice: 142.29
}, {
    type: 'M9 Bayonet',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 127.00,
    avgPrice: 123.31
}, {
    type: 'M9 Bayonet',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 118.36,
    avgPrice: 115.42
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 6278.75
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1217.50
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 242.65,
    avgPrice: 218.68
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 220.00,
    avgPrice: 197.15
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 210.99,
    avgPrice: 161.59
}, {
    type: 'M9 Bayonet',
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 173.65,
    avgPrice: 176.29
}, {
    type: 'M9 Bayonet',
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 162.49,
    avgPrice: 157.16
}, {
    type: 'M9 Bayonet',
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 150.00,
    avgPrice: 138.35
}, {
    type: 'M9 Bayonet',
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 160.91,
    avgPrice: 140.50
}, {
    type: 'M9 Bayonet',
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 137.82,
    avgPrice: 131.32
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 358.36,
    avgPrice: 395.00
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 344.97,
    avgPrice: 262.64
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 194.50,
    avgPrice: 186.52
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 287.79,
    avgPrice: 222.76
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 241.00,
    avgPrice: 221.03
}, {
    type: 'M9 Bayonet',
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 283.97,
    avgPrice: 328.75
}, {
    type: 'M9 Bayonet',
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 315.00,
    avgPrice: 987.50
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Doppler',
    quality: 'Factory New',
    marketPrice: 399.78,
    avgPrice: 466.25
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Doppler',
    quality: 'Minimal Wear',
    marketPrice: 413.47,
    avgPrice: 1562.50
}, {
    type: 'M9 Bayonet',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 295.64,
    avgPrice: 305.00
}, {
    type: 'M9 Bayonet',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 333.16,
    avgPrice: 412.50
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 442.50
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 400.00,
    avgPrice: 700.00
}, {
    type: 'M9 Bayonet',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 277.62,
    avgPrice: 224.38
}, {
    type: 'M9 Bayonet',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 104.00,
    avgPrice: 104.00
}, {
    type: 'M9 Bayonet',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 76.62,
    avgPrice: 74.32
}, {
    type: 'M9 Bayonet',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 77.81,
    avgPrice: 75.96
}, {
    type: 'M9 Bayonet',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 74.95,
    avgPrice: 72.70
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 207.00,
    avgPrice: 155.47
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 111.05,
    avgPrice: 147.20
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 108.56,
    avgPrice: 99.46
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 122.15,
    avgPrice: 103.05
}, {
    type: 'M9 Bayonet',
    name: 'Freehand',
    quality: 'Factory New',
    marketPrice: 374.99,
    avgPrice: 511.25
}, {
    type: 'M9 Bayonet',
    name: 'Freehand',
    quality: 'Minimal Wear',
    marketPrice: 301.00,
    avgPrice: 356.99
}, {
    type: 'M9 Bayonet',
    name: 'Freehand',
    quality: 'Field-Tested',
    marketPrice: 203.22,
    avgPrice: 187.42
}, {
    type: 'M9 Bayonet',
    name: 'Freehand',
    quality: 'Well-Worn',
    marketPrice: 398.60,
    avgPrice: 187.14
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Freehand',
    quality: 'Field-Tested',
    marketPrice: 349.45,
    avgPrice: 385.27
}, {
    type: 'M9 Bayonet',
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 4287.50
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Gamma Doppler',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 872.50
}, {
    type: 'M9 Bayonet',
    name: 'Lore',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 2072.50
}, {
    type: 'M9 Bayonet',
    name: 'Lore',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 1097.50
}, {
    type: 'M9 Bayonet',
    name: 'Lore',
    quality: 'Field-Tested',
    marketPrice: 398.53,
    avgPrice: 535.00
}, {
    type: 'M9 Bayonet',
    name: 'Lore',
    quality: 'Battle-Scarred',
    marketPrice: 283.19,
    avgPrice: 243.64
}, {
    type: 'M9 Bayonet',
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 491.25
}, {
    type: 'M9 Bayonet',
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 581.25
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 836.25
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Marble Fade',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 666.25
}, {
    type: 'M9 Bayonet',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1041.25
}, {
    type: 'M9 Bayonet',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 198.95,
    avgPrice: 189.13
}, {
    type: 'M9 Bayonet',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 102.16,
    avgPrice: 98.20
}, {
    type: 'M9 Bayonet',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 96.56,
    avgPrice: 90.50
}, {
    type: 'M9 Bayonet',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 88.38,
    avgPrice: 84.71
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 306.49,
    avgPrice: 317.50
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 168.86,
    avgPrice: 153.64
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 255.41,
    avgPrice: 210.90
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 139.44,
    avgPrice: 125.63
}, {
    type: 'M9 Bayonet',
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 120.00,
    avgPrice: 119.43
}, {
    type: 'M9 Bayonet',
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 99.95,
    avgPrice: 96.99
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 254.12,
    avgPrice: 295.24
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 131.99,
    avgPrice: 126.82
}, {
    type: 'M9 Bayonet',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 210.00,
    avgPrice: 158.20
}, {
    type: 'M9 Bayonet',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 86.71,
    avgPrice: 79.95
}, {
    type: 'M9 Bayonet',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 70.45,
    avgPrice: 67.87
}, {
    type: 'M9 Bayonet',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 72.48,
    avgPrice: 64.07
}, {
    type: 'M9 Bayonet',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 78.66,
    avgPrice: 70.33
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 115.00,
    avgPrice: 134.61
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 91.94,
    avgPrice: 74.86
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 100.88,
    avgPrice: 101.15
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 139.99,
    avgPrice: 94.22
}, {
    type: 'M9 Bayonet',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 198.00,
    avgPrice: 175.76
}, {
    type: 'M9 Bayonet',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 102.01,
    avgPrice: 86.16
}, {
    type: 'M9 Bayonet',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 68.90,
    avgPrice: 68.58
}, {
    type: 'M9 Bayonet',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 72.17,
    avgPrice: 71.52
}, {
    type: 'M9 Bayonet',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 76.55,
    avgPrice: 74.18
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 136.92,
    avgPrice: 132.51
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 99.95,
    avgPrice: 80.03
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 110.32,
    avgPrice: 104.04
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 109.94,
    avgPrice: 88.31
}, {
    type: 'M9 Bayonet',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 359.85,
    avgPrice: 388.75
}, {
    type: 'M9 Bayonet',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 269.84,
    avgPrice: 277.50
}, {
    type: 'M9 Bayonet',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 203.52,
    avgPrice: 189.92
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 650.00
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 331.96,
    avgPrice: 370.00
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 353.02,
    avgPrice: 336.25
}, {
    type: 'M9 Bayonet',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 171.47,
    avgPrice: 159.20
}, {
    type: 'M9 Bayonet',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 103.07,
    avgPrice: 106.94
}, {
    type: 'M9 Bayonet',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 97.72,
    avgPrice: 97.70
}, {
    type: 'M9 Bayonet',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 97.61,
    avgPrice: 92.30
}, {
    type: 'M9 Bayonet',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 95.53,
    avgPrice: 91.25
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 244.31,
    avgPrice: 219.67
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 237.85,
    avgPrice: 156.66
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 124.59,
    avgPrice: 119.57
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 120.00,
    avgPrice: 111.43
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 211.46,
    avgPrice: 116.75
}, {
    type: 'M9 Bayonet',
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 389.01,
    avgPrice: 372.50
}, {
    type: 'M9 Bayonet',
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 393.34,
    avgPrice: 345.00
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 576.25
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Tiger Tooth',
    quality: 'Minimal Wear',
    marketPrice: 0,
    avgPrice: 645.00
}, {
    type: 'M9 Bayonet',
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 968.75
}, {
    type: 'M9 Bayonet',
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 178.49,
    avgPrice: 173.41
}, {
    type: 'M9 Bayonet',
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 100.69,
    avgPrice: 99.51
}, {
    type: 'M9 Bayonet',
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 95.00,
    avgPrice: 89.57
}, {
    type: 'M9 Bayonet',
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 88.47,
    avgPrice: 84.75
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 360.00,
    avgPrice: 337.50
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 138.82,
    avgPrice: 121.67
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 163.38,
    avgPrice: 121.62
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 148.14,
    avgPrice: 104.27
}, {
    type: 'M9 Bayonet',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 254.49,
    avgPrice: 242.06
}, {
    type: 'M9 Bayonet',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 103.40,
    avgPrice: 102.45
}, {
    type: 'M9 Bayonet',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 72.36,
    avgPrice: 72.81
}, {
    type: 'M9 Bayonet',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 79.18,
    avgPrice: 71.66
}, {
    type: 'M9 Bayonet',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 83.83,
    avgPrice: 78.09
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 138.82,
    avgPrice: 152.65
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 100.47,
    avgPrice: 94.14
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 95.00,
    avgPrice: 82.51
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 201.49,
    avgPrice: 197.60
}, {
    type: 'M9 Bayonet',
    name: '',
    quality: '',
    marketPrice: 141.17,
    avgPrice: 138.99
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 208.16,
    avgPrice: 189.04
}, {
    type: 'MAC-10',
    name: 'Amber Fade',
    quality: 'Factory New',
    marketPrice: 4.67,
    avgPrice: 3.52
}, {
    type: 'MAC-10',
    name: 'Amber Fade',
    quality: 'Minimal Wear',
    marketPrice: 1.24,
    avgPrice: 1.29
}, {
    type: 'MAC-10',
    name: 'Amber Fade',
    quality: 'Field-Tested',
    marketPrice: 1.12,
    avgPrice: 1.04
}, {
    type: 'MAC-10',
    name: 'Amber Fade',
    quality: 'Well-Worn',
    marketPrice: 4.31,
    avgPrice: 3.14
}, {
    type: 'Souvenir MAC-10',
    name: 'Amber Fade',
    quality: 'Factory New',
    marketPrice: 8.89,
    avgPrice: 6.68
}, {
    type: 'Souvenir MAC-10',
    name: 'Amber Fade',
    quality: 'Minimal Wear',
    marketPrice: 3.71,
    avgPrice: 3.31
}, {
    type: 'Souvenir MAC-10',
    name: 'Amber Fade',
    quality: 'Field-Tested',
    marketPrice: 2.03,
    avgPrice: 1.76
}, {
    type: 'Souvenir MAC-10',
    name: 'Amber Fade',
    quality: 'Well-Worn',
    marketPrice: 5.88,
    avgPrice: 7.40
}, {
    type: 'MAC-10',
    name: 'Candy Apple',
    quality: 'Factory New',
    marketPrice: 0.09,
    avgPrice: 0.07
}, {
    type: 'MAC-10',
    name: 'Candy Apple',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'MAC-10',
    name: 'Candy Apple',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Souvenir MAC-10',
    name: 'Candy Apple',
    quality: 'Factory New',
    marketPrice: 2.69,
    avgPrice: 2.44
}, {
    type: 'Souvenir MAC-10',
    name: 'Candy Apple',
    quality: 'Minimal Wear',
    marketPrice: 1.67,
    avgPrice: 1.42
}, {
    type: 'Souvenir MAC-10',
    name: 'Candy Apple',
    quality: 'Field-Tested',
    marketPrice: 1.26,
    avgPrice: 1.08
}, {
    type: 'MAC-10',
    name: 'Carnivore',
    quality: 'Factory New',
    marketPrice: 0.60,
    avgPrice: 0.49
}, {
    type: 'MAC-10',
    name: 'Carnivore',
    quality: 'Minimal Wear',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'MAC-10',
    name: 'Carnivore',
    quality: 'Field-Tested',
    marketPrice: 0.21,
    avgPrice: 0.21
}, {
    type: 'MAC-10',
    name: 'Carnivore',
    quality: 'Well-Worn',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'MAC-10',
    name: 'Carnivore',
    quality: 'Battle-Scarred',
    marketPrice: 0.19,
    avgPrice: 0.19
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Carnivore',
    quality: 'Factory New',
    marketPrice: 2.23,
    avgPrice: 2.04
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Carnivore',
    quality: 'Minimal Wear',
    marketPrice: 1.00,
    avgPrice: 0.85
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Carnivore',
    quality: 'Field-Tested',
    marketPrice: 0.62,
    avgPrice: 0.58
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Carnivore',
    quality: 'Well-Worn',
    marketPrice: 0.62,
    avgPrice: 0.50
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Carnivore',
    quality: 'Battle-Scarred',
    marketPrice: 0.69,
    avgPrice: 0.44
}, {
    type: 'Cologne 2016 Dust II Souvenir Package',
    name: '',
    quality: '',
    marketPrice: 3.75,
    avgPrice: 3.51
}, {
    type: 'MAC-10',
    name: 'Commuter',
    quality: 'Factory New',
    marketPrice: 2.65,
    avgPrice: 1.85
}, {
    type: 'MAC-10',
    name: 'Commuter',
    quality: 'Minimal Wear',
    marketPrice: 0.76,
    avgPrice: 0.77
}, {
    type: 'MAC-10',
    name: 'Commuter',
    quality: 'Field-Tested',
    marketPrice: 0.50,
    avgPrice: 0.36
}, {
    type: 'MAC-10',
    name: 'Commuter',
    quality: 'Well-Worn',
    marketPrice: 0.40,
    avgPrice: 0.37
}, {
    type: 'MAC-10',
    name: 'Commuter',
    quality: 'Battle-Scarred',
    marketPrice: 2.03,
    avgPrice: 1.48
}, {
    type: 'MAC-10',
    name: 'Curse',
    quality: 'Factory New',
    marketPrice: 1.58,
    avgPrice: 1.45
}, {
    type: 'MAC-10',
    name: 'Curse',
    quality: 'Minimal Wear',
    marketPrice: 0.84,
    avgPrice: 0.75
}, {
    type: 'MAC-10',
    name: 'Curse',
    quality: 'Field-Tested',
    marketPrice: 0.66,
    avgPrice: 0.65
}, {
    type: 'MAC-10',
    name: 'Curse',
    quality: 'Well-Worn',
    marketPrice: 2.00,
    avgPrice: 1.81
}, {
    type: 'MAC-10',
    name: 'Curse',
    quality: 'Battle-Scarred',
    marketPrice: 6.64,
    avgPrice: 4.68
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Curse',
    quality: 'Factory New',
    marketPrice: 6.99,
    avgPrice: 6.42
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Curse',
    quality: 'Minimal Wear',
    marketPrice: 3.06,
    avgPrice: 2.80
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Curse',
    quality: 'Field-Tested',
    marketPrice: 1.79,
    avgPrice: 1.89
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Curse',
    quality: 'Well-Worn',
    marketPrice: 4.27,
    avgPrice: 5.01
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Curse',
    quality: 'Battle-Scarred',
    marketPrice: 7.37,
    avgPrice: 6.55
}, {
    type: 'MAC-10',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 2.45,
    avgPrice: 2.23
}, {
    type: 'MAC-10',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 3.56,
    avgPrice: 4.09
}, {
    type: 'MAC-10',
    name: 'Graven',
    quality: 'Factory New',
    marketPrice: 12.91,
    avgPrice: 13.52
}, {
    type: 'MAC-10',
    name: 'Graven',
    quality: 'Minimal Wear',
    marketPrice: 4.46,
    avgPrice: 4.07
}, {
    type: 'MAC-10',
    name: 'Graven',
    quality: 'Field-Tested',
    marketPrice: 3.96,
    avgPrice: 3.54
}, {
    type: 'MAC-10',
    name: 'Graven',
    quality: 'Well-Worn',
    marketPrice: 4.05,
    avgPrice: 3.33
}, {
    type: 'MAC-10',
    name: 'Graven',
    quality: 'Battle-Scarred',
    marketPrice: 4.19,
    avgPrice: 3.39
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Graven',
    quality: 'Factory New',
    marketPrice: 149.47,
    avgPrice: 142.65
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Graven',
    quality: 'Minimal Wear',
    marketPrice: 17.44,
    avgPrice: 16.33
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Graven',
    quality: 'Field-Tested',
    marketPrice: 12.77,
    avgPrice: 11.57
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Graven',
    quality: 'Well-Worn',
    marketPrice: 13.45,
    avgPrice: 11.94
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Graven',
    quality: 'Battle-Scarred',
    marketPrice: 12.77,
    avgPrice: 10.87
}, {
    type: 'MAC-10',
    name: 'Heat',
    quality: 'Factory New',
    marketPrice: 1.18,
    avgPrice: 1.13
}, {
    type: 'MAC-10',
    name: 'Heat',
    quality: 'Minimal Wear',
    marketPrice: 0.75,
    avgPrice: 0.69
}, {
    type: 'MAC-10',
    name: 'Heat',
    quality: 'Field-Tested',
    marketPrice: 0.40,
    avgPrice: 0.38
}, {
    type: 'MAC-10',
    name: 'Heat',
    quality: 'Well-Worn',
    marketPrice: 0.39,
    avgPrice: 0.36
}, {
    type: 'MAC-10',
    name: 'Heat',
    quality: 'Battle-Scarred',
    marketPrice: 0.31,
    avgPrice: 0.35
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Heat',
    quality: 'Factory New',
    marketPrice: 5.06,
    avgPrice: 5.26
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Heat',
    quality: 'Minimal Wear',
    marketPrice: 3.06,
    avgPrice: 3.30
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Heat',
    quality: 'Field-Tested',
    marketPrice: 1.52,
    avgPrice: 1.23
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Heat',
    quality: 'Well-Worn',
    marketPrice: 1.27,
    avgPrice: 1.09
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Heat',
    quality: 'Battle-Scarred',
    marketPrice: 1.20,
    avgPrice: 0.98
}, {
    type: 'MAC-10',
    name: 'Indigo',
    quality: 'Factory New',
    marketPrice: 0.37,
    avgPrice: 0.37
}, {
    type: 'MAC-10',
    name: 'Indigo',
    quality: 'Minimal Wear',
    marketPrice: 0.09,
    avgPrice: 0.07
}, {
    type: 'MAC-10',
    name: 'Indigo',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'MAC-10',
    name: 'Indigo',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'MAC-10',
    name: 'Indigo',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir MAC-10',
    name: 'Indigo',
    quality: 'Factory New',
    marketPrice: 4.00,
    avgPrice: 5.18
}, {
    type: 'Souvenir MAC-10',
    name: 'Indigo',
    quality: 'Minimal Wear',
    marketPrice: 0.95,
    avgPrice: 0.81
}, {
    type: 'Souvenir MAC-10',
    name: 'Indigo',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.29
}, {
    type: 'Souvenir MAC-10',
    name: 'Indigo',
    quality: 'Well-Worn',
    marketPrice: 0.32,
    avgPrice: 0.33
}, {
    type: 'Souvenir MAC-10',
    name: 'Indigo',
    quality: 'Battle-Scarred',
    marketPrice: 0.27,
    avgPrice: 0.26
}, {
    type: 'MAC-10',
    name: 'Lapis Gator',
    quality: 'Factory New',
    marketPrice: 0.19,
    avgPrice: 0.18
}, {
    type: 'MAC-10',
    name: 'Lapis Gator',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'MAC-10',
    name: 'Lapis Gator',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MAC-10',
    name: 'Lapis Gator',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.08
}, {
    type: 'MAC-10',
    name: 'Lapis Gator',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Lapis Gator',
    quality: 'Factory New',
    marketPrice: 0.88,
    avgPrice: 0.81
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Lapis Gator',
    quality: 'Minimal Wear',
    marketPrice: 0.49,
    avgPrice: 0.45
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Lapis Gator',
    quality: 'Field-Tested',
    marketPrice: 0.29,
    avgPrice: 0.26
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Lapis Gator',
    quality: 'Well-Worn',
    marketPrice: 0.28,
    avgPrice: 0.29
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Lapis Gator',
    quality: 'Battle-Scarred',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'MAC-10',
    name: 'Malachite',
    quality: 'Factory New',
    marketPrice: 0.74,
    avgPrice: 0.73
}, {
    type: 'MAC-10',
    name: 'Malachite',
    quality: 'Minimal Wear',
    marketPrice: 0.41,
    avgPrice: 0.43
}, {
    type: 'MAC-10',
    name: 'Malachite',
    quality: 'Field-Tested',
    marketPrice: 0.35,
    avgPrice: 0.33
}, {
    type: 'MAC-10',
    name: 'Malachite',
    quality: 'Well-Worn',
    marketPrice: 0.62,
    avgPrice: 0.72
}, {
    type: 'MAC-10',
    name: 'Malachite',
    quality: 'Battle-Scarred',
    marketPrice: 0.48,
    avgPrice: 0.42
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Malachite',
    quality: 'Factory New',
    marketPrice: 2.94,
    avgPrice: 2.79
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Malachite',
    quality: 'Minimal Wear',
    marketPrice: 1.50,
    avgPrice: 1.52
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Malachite',
    quality: 'Field-Tested',
    marketPrice: 1.07,
    avgPrice: 1.05
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Malachite',
    quality: 'Well-Worn',
    marketPrice: 1.20,
    avgPrice: 1.05
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Malachite',
    quality: 'Battle-Scarred',
    marketPrice: 2.19,
    avgPrice: 3.75
}, {
    type: 'MAC-10',
    name: 'Neon Rider',
    quality: 'Factory New',
    marketPrice: 4.71,
    avgPrice: 4.77
}, {
    type: 'MAC-10',
    name: 'Neon Rider',
    quality: 'Minimal Wear',
    marketPrice: 2.96,
    avgPrice: 2.97
}, {
    type: 'MAC-10',
    name: 'Neon Rider',
    quality: 'Field-Tested',
    marketPrice: 1.75,
    avgPrice: 1.59
}, {
    type: 'MAC-10',
    name: 'Neon Rider',
    quality: 'Well-Worn',
    marketPrice: 1.90,
    avgPrice: 1.92
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Neon Rider',
    quality: 'Factory New',
    marketPrice: 23.25,
    avgPrice: 20.08
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Neon Rider',
    quality: 'Minimal Wear',
    marketPrice: 11.99,
    avgPrice: 10.18
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Neon Rider',
    quality: 'Field-Tested',
    marketPrice: 5.45,
    avgPrice: 4.64
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Neon Rider',
    quality: 'Well-Worn',
    marketPrice: 6.10,
    avgPrice: 4.65
}, {
    type: 'MAC-10',
    name: 'Nuclear Garden',
    quality: 'Factory New',
    marketPrice: 0.92,
    avgPrice: 0.96
}, {
    type: 'MAC-10',
    name: 'Nuclear Garden',
    quality: 'Minimal Wear',
    marketPrice: 0.64,
    avgPrice: 0.66
}, {
    type: 'MAC-10',
    name: 'Nuclear Garden',
    quality: 'Field-Tested',
    marketPrice: 0.32,
    avgPrice: 0.27
}, {
    type: 'MAC-10',
    name: 'Nuclear Garden',
    quality: 'Well-Worn',
    marketPrice: 0.31,
    avgPrice: 0.34
}, {
    type: 'MAC-10',
    name: 'Nuclear Garden',
    quality: 'Battle-Scarred',
    marketPrice: 0.34,
    avgPrice: 0.19
}, {
    type: 'Souvenir MAC-10',
    name: 'Nuclear Garden',
    quality: 'Factory New',
    marketPrice: 6.00,
    avgPrice: 7.22
}, {
    type: 'Souvenir MAC-10',
    name: 'Nuclear Garden',
    quality: 'Minimal Wear',
    marketPrice: 3.33,
    avgPrice: 3.01
}, {
    type: 'Souvenir MAC-10',
    name: 'Nuclear Garden',
    quality: 'Field-Tested',
    marketPrice: 1.47,
    avgPrice: 1.28
}, {
    type: 'Souvenir MAC-10',
    name: 'Nuclear Garden',
    quality: 'Well-Worn',
    marketPrice: 1.91,
    avgPrice: 1.81
}, {
    type: 'Souvenir MAC-10',
    name: 'Nuclear Garden',
    quality: 'Battle-Scarred',
    marketPrice: 0.85,
    avgPrice: 0.85
}, {
    type: 'MAC-10',
    name: 'Palm',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.28
}, {
    type: 'MAC-10',
    name: 'Palm',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'MAC-10',
    name: 'Palm',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'MAC-10',
    name: 'Palm',
    quality: 'Well-Worn',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'MAC-10',
    name: 'Palm',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.04
}, {
    type: 'Souvenir MAC-10',
    name: 'Palm',
    quality: 'Factory New',
    marketPrice: 19.95,
    avgPrice: 20.15
}, {
    type: 'Souvenir MAC-10',
    name: 'Palm',
    quality: 'Minimal Wear',
    marketPrice: 0.89,
    avgPrice: 0.81
}, {
    type: 'Souvenir MAC-10',
    name: 'Palm',
    quality: 'Field-Tested',
    marketPrice: 0.37,
    avgPrice: 0.35
}, {
    type: 'Souvenir MAC-10',
    name: 'Palm',
    quality: 'Well-Worn',
    marketPrice: 0.62,
    avgPrice: 0.50
}, {
    type: 'Souvenir MAC-10',
    name: 'Palm',
    quality: 'Battle-Scarred',
    marketPrice: 0.46,
    avgPrice: 0.41
}, {
    type: 'MAC-10',
    name: 'Rangeen',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.15
}, {
    type: 'MAC-10',
    name: 'Rangeen',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'MAC-10',
    name: 'Rangeen',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'MAC-10',
    name: 'Rangeen',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'MAC-10',
    name: 'Rangeen',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Rangeen',
    quality: 'Factory New',
    marketPrice: 0.73,
    avgPrice: 0.72
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Rangeen',
    quality: 'Minimal Wear',
    marketPrice: 0.43,
    avgPrice: 0.41
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Rangeen',
    quality: 'Field-Tested',
    marketPrice: 0.28,
    avgPrice: 0.24
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Rangeen',
    quality: 'Well-Worn',
    marketPrice: 0.29,
    avgPrice: 0.27
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Rangeen',
    quality: 'Battle-Scarred',
    marketPrice: 0.28,
    avgPrice: 0.24
}, {
    type: 'MAC-10',
    name: 'Silver',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'MAC-10',
    name: 'Silver',
    quality: 'Minimal Wear',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'MAC-10',
    name: 'Tatter',
    quality: 'Factory New',
    marketPrice: 1.65,
    avgPrice: 1.28
}, {
    type: 'MAC-10',
    name: 'Tatter',
    quality: 'Minimal Wear',
    marketPrice: 0.71,
    avgPrice: 0.68
}, {
    type: 'MAC-10',
    name: 'Tatter',
    quality: 'Field-Tested',
    marketPrice: 0.63,
    avgPrice: 0.57
}, {
    type: 'MAC-10',
    name: 'Tatter',
    quality: 'Well-Worn',
    marketPrice: 0.59,
    avgPrice: 0.60
}, {
    type: 'MAC-10',
    name: 'Tatter',
    quality: 'Battle-Scarred',
    marketPrice: 1.15,
    avgPrice: 0.89
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Tatter',
    quality: 'Factory New',
    marketPrice: 4.19,
    avgPrice: 4.11
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Tatter',
    quality: 'Minimal Wear',
    marketPrice: 2.80,
    avgPrice: 2.63
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Tatter',
    quality: 'Field-Tested',
    marketPrice: 1.66,
    avgPrice: 1.65
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Tatter',
    quality: 'Well-Worn',
    marketPrice: 1.80,
    avgPrice: 1.75
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Tatter',
    quality: 'Battle-Scarred',
    marketPrice: 5.53,
    avgPrice: 2.28
}, {
    type: 'MAC-10',
    name: 'Tornado',
    quality: 'Factory New',
    marketPrice: 6.60,
    avgPrice: 6.36
}, {
    type: 'MAC-10',
    name: 'Tornado',
    quality: 'Minimal Wear',
    marketPrice: 0.74,
    avgPrice: 0.47
}, {
    type: 'MAC-10',
    name: 'Tornado',
    quality: 'Field-Tested',
    marketPrice: 0.18,
    avgPrice: 0.18
}, {
    type: 'MAC-10',
    name: 'Tornado',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.28
}, {
    type: 'MAC-10',
    name: 'Tornado',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.21
}, {
    type: 'MAC-10',
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 4.02,
    avgPrice: 3.02
}, {
    type: 'MAC-10',
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.32
}, {
    type: 'MAC-10',
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'MAC-10',
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.19
}, {
    type: 'MAC-10',
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 0.15,
    avgPrice: 0.15
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 11.34,
    avgPrice: 10.35
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 0.99,
    avgPrice: 0.92
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 0.37,
    avgPrice: 0.33
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.33
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 0.36,
    avgPrice: 0.31
}, {
    type: 'MAC-10',
    name: 'Urban DDPAT',
    quality: 'Factory New',
    marketPrice: 3.98,
    avgPrice: 3.49
}, {
    type: 'MAC-10',
    name: 'Urban DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.74,
    avgPrice: 0.69
}, {
    type: 'MAC-10',
    name: 'Urban DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.57,
    avgPrice: 0.54
}, {
    type: 'MAC-10',
    name: 'Urban DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.57,
    avgPrice: 0.57
}, {
    type: 'MAC-10',
    name: 'Urban DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.57,
    avgPrice: 0.53
}, {
    type: 'MAG-7',
    name: 'Bulldozer',
    quality: 'Factory New',
    marketPrice: 44.34,
    avgPrice: 43.19
}, {
    type: 'MAG-7',
    name: 'Bulldozer',
    quality: 'Minimal Wear',
    marketPrice: 3.76,
    avgPrice: 3.34
}, {
    type: 'MAG-7',
    name: 'Bulldozer',
    quality: 'Field-Tested',
    marketPrice: 0.62,
    avgPrice: 0.58
}, {
    type: 'MAG-7',
    name: 'Bulldozer',
    quality: 'Well-Worn',
    marketPrice: 1.28,
    avgPrice: 0.91
}, {
    type: 'MAG-7',
    name: 'Bulldozer',
    quality: 'Battle-Scarred',
    marketPrice: 0.42,
    avgPrice: 0.44
}, {
    type: 'Souvenir MAG-7',
    name: 'Bulldozer',
    quality: 'Minimal Wear',
    marketPrice: 17.32,
    avgPrice: 15.93
}, {
    type: 'Souvenir MAG-7',
    name: 'Bulldozer',
    quality: 'Field-Tested',
    marketPrice: 3.31,
    avgPrice: 3.43
}, {
    type: 'Souvenir MAG-7',
    name: 'Bulldozer',
    quality: 'Well-Worn',
    marketPrice: 5.26,
    avgPrice: 3.58
}, {
    type: 'Souvenir MAG-7',
    name: 'Bulldozer',
    quality: 'Battle-Scarred',
    marketPrice: 2.23,
    avgPrice: 2.45
}, {
    type: 'MAG-7',
    name: 'Cobalt Core',
    quality: 'Factory New',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'MAG-7',
    name: 'Cobalt Core',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'MAG-7',
    name: 'Cobalt Core',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'MAG-7',
    name: 'Cobalt Core',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'MAG-7',
    name: 'Cobalt Core',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.09
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Cobalt Core',
    quality: 'Factory New',
    marketPrice: 0.84,
    avgPrice: 0.77
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Cobalt Core',
    quality: 'Minimal Wear',
    marketPrice: 0.46,
    avgPrice: 0.41
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Cobalt Core',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Cobalt Core',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.26
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Cobalt Core',
    quality: 'Battle-Scarred',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'MAG-7',
    name: 'Counter Terrace',
    quality: 'Factory New',
    marketPrice: 2.96,
    avgPrice: 2.50
}, {
    type: 'MAG-7',
    name: 'Counter Terrace',
    quality: 'Minimal Wear',
    marketPrice: 1.91,
    avgPrice: 1.73
}, {
    type: 'MAG-7',
    name: 'Counter Terrace',
    quality: 'Field-Tested',
    marketPrice: 1.54,
    avgPrice: 1.53
}, {
    type: 'MAG-7',
    name: 'Counter Terrace',
    quality: 'Well-Worn',
    marketPrice: 1.40,
    avgPrice: 1.32
}, {
    type: 'MAG-7',
    name: 'Counter Terrace',
    quality: 'Battle-Scarred',
    marketPrice: 0.88,
    avgPrice: 1.07
}, {
    type: 'MAG-7',
    name: 'Firestarter',
    quality: 'Factory New',
    marketPrice: 0.96,
    avgPrice: 0.75
}, {
    type: 'MAG-7',
    name: 'Firestarter',
    quality: 'Minimal Wear',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'MAG-7',
    name: 'Firestarter',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.16
}, {
    type: 'MAG-7',
    name: 'Firestarter',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'MAG-7',
    name: 'Firestarter',
    quality: 'Battle-Scarred',
    marketPrice: 0.32,
    avgPrice: 0.32
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Firestarter',
    quality: 'Factory New',
    marketPrice: 4.41,
    avgPrice: 4.14
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Firestarter',
    quality: 'Minimal Wear',
    marketPrice: 0.74,
    avgPrice: 0.61
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Firestarter',
    quality: 'Field-Tested',
    marketPrice: 0.36,
    avgPrice: 0.55
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Firestarter',
    quality: 'Well-Worn',
    marketPrice: 0.54,
    avgPrice: 0.59
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Firestarter',
    quality: 'Battle-Scarred',
    marketPrice: 0.75,
    avgPrice: 0.71
}, {
    type: 'MAG-7',
    name: 'Hazard',
    quality: 'Factory New',
    marketPrice: 199.00,
    avgPrice: 177.43
}, {
    type: 'MAG-7',
    name: 'Hazard',
    quality: 'Minimal Wear',
    marketPrice: 5.75,
    avgPrice: 5.55
}, {
    type: 'MAG-7',
    name: 'Hazard',
    quality: 'Field-Tested',
    marketPrice: 1.77,
    avgPrice: 1.89
}, {
    type: 'MAG-7',
    name: 'Hazard',
    quality: 'Well-Worn',
    marketPrice: 11.78,
    avgPrice: 38.30
}, {
    type: 'MAG-7',
    name: 'Hazard',
    quality: 'Battle-Scarred',
    marketPrice: 17.87,
    avgPrice: 28.55
}, {
    type: 'MAG-7',
    name: 'Heat',
    quality: 'Factory New',
    marketPrice: 0.86,
    avgPrice: 0.89
}, {
    type: 'MAG-7',
    name: 'Heat',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.31
}, {
    type: 'MAG-7',
    name: 'Heat',
    quality: 'Field-Tested',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'MAG-7',
    name: 'Heat',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.26
}, {
    type: 'MAG-7',
    name: 'Heat',
    quality: 'Battle-Scarred',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heat',
    quality: 'Factory New',
    marketPrice: 4.96,
    avgPrice: 4.65
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heat',
    quality: 'Minimal Wear',
    marketPrice: 1.34,
    avgPrice: 1.32
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heat',
    quality: 'Field-Tested',
    marketPrice: 0.73,
    avgPrice: 0.69
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heat',
    quality: 'Well-Worn',
    marketPrice: 0.76,
    avgPrice: 0.67
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heat',
    quality: 'Battle-Scarred',
    marketPrice: 0.72,
    avgPrice: 0.68
}, {
    type: 'MAG-7',
    name: 'Heaven Guard',
    quality: 'Factory New',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'MAG-7',
    name: 'Heaven Guard',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'MAG-7',
    name: 'Heaven Guard',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MAG-7',
    name: 'Heaven Guard',
    quality: 'Well-Worn',
    marketPrice: 0.26,
    avgPrice: 0.20
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Factory New',
    marketPrice: 0.59,
    avgPrice: 0.51
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Minimal Wear',
    marketPrice: 0.31,
    avgPrice: 0.32
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Well-Worn',
    marketPrice: 0.31,
    avgPrice: 0.30
}, {
    type: 'MAG-7',
    name: 'Irradiated Alert',
    quality: 'Factory New',
    marketPrice: 14.78,
    avgPrice: 6.14
}, {
    type: 'MAG-7',
    name: 'Irradiated Alert',
    quality: 'Minimal Wear',
    marketPrice: 0.63,
    avgPrice: 0.53
}, {
    type: 'MAG-7',
    name: 'Irradiated Alert',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.20
}, {
    type: 'MAG-7',
    name: 'Irradiated Alert',
    quality: 'Well-Worn',
    marketPrice: 0.28,
    avgPrice: 0.27
}, {
    type: 'MAG-7',
    name: 'Irradiated Alert',
    quality: 'Battle-Scarred',
    marketPrice: 0.96,
    avgPrice: 0.80
}, {
    type: 'Souvenir MAG-7',
    name: 'Irradiated Alert',
    quality: 'Factory New',
    marketPrice: 13.89,
    avgPrice: 13.50
}, {
    type: 'Souvenir MAG-7',
    name: 'Irradiated Alert',
    quality: 'Minimal Wear',
    marketPrice: 0.81,
    avgPrice: 0.80
}, {
    type: 'Souvenir MAG-7',
    name: 'Irradiated Alert',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.21
}, {
    type: 'Souvenir MAG-7',
    name: 'Irradiated Alert',
    quality: 'Well-Worn',
    marketPrice: 0.38,
    avgPrice: 0.30
}, {
    type: 'Souvenir MAG-7',
    name: 'Irradiated Alert',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.21
}, {
    type: 'MAG-7',
    name: 'Memento',
    quality: 'Factory New',
    marketPrice: 1.80,
    avgPrice: 1.44
}, {
    type: 'MAG-7',
    name: 'Memento',
    quality: 'Minimal Wear',
    marketPrice: 0.53,
    avgPrice: 0.66
}, {
    type: 'MAG-7',
    name: 'Memento',
    quality: 'Field-Tested',
    marketPrice: 0.88,
    avgPrice: 0.76
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Memento',
    quality: 'Factory New',
    marketPrice: 7.63,
    avgPrice: 6.81
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Memento',
    quality: 'Minimal Wear',
    marketPrice: 1.41,
    avgPrice: 1.34
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Memento',
    quality: 'Field-Tested',
    marketPrice: 1.09,
    avgPrice: 1.05
}, {
    type: 'MAG-7',
    name: 'Metallic DDPAT',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'MAG-7',
    name: 'Metallic DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.07,
    avgPrice: 0.06
}, {
    type: 'Souvenir MAG-7',
    name: 'Metallic DDPAT',
    quality: 'Factory New',
    marketPrice: 0.96,
    avgPrice: 0.87
}, {
    type: 'Souvenir MAG-7',
    name: 'Metallic DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 3.79,
    avgPrice: 3.32
}, {
    type: 'MAG-7',
    name: 'Praetorian',
    quality: 'Factory New',
    marketPrice: 0.77,
    avgPrice: 0.85
}, {
    type: 'MAG-7',
    name: 'Praetorian',
    quality: 'Minimal Wear',
    marketPrice: 0.51,
    avgPrice: 0.49
}, {
    type: 'MAG-7',
    name: 'Praetorian',
    quality: 'Field-Tested',
    marketPrice: 0.37,
    avgPrice: 0.36
}, {
    type: 'MAG-7',
    name: 'Praetorian',
    quality: 'Well-Worn',
    marketPrice: 0.38,
    avgPrice: 0.38
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Praetorian',
    quality: 'Factory New',
    marketPrice: 3.68,
    avgPrice: 3.58
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Praetorian',
    quality: 'Minimal Wear',
    marketPrice: 2.20,
    avgPrice: 2.20
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Praetorian',
    quality: 'Field-Tested',
    marketPrice: 1.61,
    avgPrice: 1.39
}, {
    type: 'MAG-7',
    statTrak: true,
    name: 'Praetorian',
    quality: 'Well-Worn',
    marketPrice: 1.45,
    avgPrice: 1.52
}, {
    type: 'MAG-7',
    name: 'Sand Dune',
    quality: 'Factory New',
    marketPrice: 9.79,
    avgPrice: 9.51
}, {
    type: 'MAG-7',
    name: 'Sand Dune',
    quality: 'Minimal Wear',
    marketPrice: 0.32,
    avgPrice: 0.31
}, {
    type: 'MAG-7',
    name: 'Sand Dune',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.13
}, {
    type: 'MAG-7',
    name: 'Sand Dune',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.23
}, {
    type: 'MAG-7',
    name: 'Sand Dune',
    quality: 'Battle-Scarred',
    marketPrice: 0.18,
    avgPrice: 0.34
}, {
    type: 'Souvenir MAG-7',
    name: 'Sand Dune',
    quality: 'Factory New',
    marketPrice: 2.43,
    avgPrice: 2.41
}, {
    type: 'Souvenir MAG-7',
    name: 'Sand Dune',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'Souvenir MAG-7',
    name: 'Sand Dune',
    quality: 'Field-Tested',
    marketPrice: 0.18,
    avgPrice: 0.15
}, {
    type: 'Souvenir MAG-7',
    name: 'Sand Dune',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.17
}, {
    type: 'Souvenir MAG-7',
    name: 'Sand Dune',
    quality: 'Battle-Scarred',
    marketPrice: 0.19,
    avgPrice: 0.17
}, {
    type: 'MAG-7',
    name: 'Seabird',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.26
}, {
    type: 'MAG-7',
    name: 'Seabird',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'MAG-7',
    name: 'Seabird',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'MAG-7',
    name: 'Seabird',
    quality: 'Well-Worn',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'MAG-7',
    name: 'Seabird',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'MAG-7',
    name: 'Silver',
    quality: 'Factory New',
    marketPrice: 0.40,
    avgPrice: 0.38
}, {
    type: 'MAG-7',
    name: 'Silver',
    quality: 'Minimal Wear',
    marketPrice: 0.39,
    avgPrice: 0.37
}, {
    type: 'Souvenir MAG-7',
    name: 'Silver',
    quality: 'Factory New',
    marketPrice: 1.32,
    avgPrice: 1.29
}, {
    type: 'Souvenir MAG-7',
    name: 'Silver',
    quality: 'Minimal Wear',
    marketPrice: 2.15,
    avgPrice: 2.40
}, {
    type: 'MAG-7',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.25
}, {
    type: 'MAG-7',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'MAG-7',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MAG-7',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MAG-7',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir MAG-7',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 4.60,
    avgPrice: 3.20
}, {
    type: 'Souvenir MAG-7',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.50,
    avgPrice: 0.41
}, {
    type: 'Souvenir MAG-7',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.17,
    avgPrice: 0.18
}, {
    type: 'Souvenir MAG-7',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.23
}, {
    type: 'Souvenir MAG-7',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.26,
    avgPrice: 0.23
}, {
    type: 'MP7',
    name: 'Anodized Navy',
    quality: 'Factory New',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'MP7',
    name: 'Anodized Navy',
    quality: 'Minimal Wear',
    marketPrice: 0.29,
    avgPrice: 0.27
}, {
    type: 'Souvenir MP7',
    name: 'Anodized Navy',
    quality: 'Factory New',
    marketPrice: 37.77,
    avgPrice: 40.61
}, {
    type: 'MP7',
    name: 'Armor Core',
    quality: 'Factory New',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'MP7',
    name: 'Armor Core',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'MP7',
    name: 'Armor Core',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MP7',
    name: 'Armor Core',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MP7',
    name: 'Armor Core',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.08
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Armor Core',
    quality: 'Factory New',
    marketPrice: 0.55,
    avgPrice: 0.56
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Armor Core',
    quality: 'Minimal Wear',
    marketPrice: 0.31,
    avgPrice: 0.30
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Armor Core',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.24
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Armor Core',
    quality: 'Well-Worn',
    marketPrice: 0.29,
    avgPrice: 0.27
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Armor Core',
    quality: 'Battle-Scarred',
    marketPrice: 0.28,
    avgPrice: 0.28
}, {
    type: 'MP7',
    name: 'Army Recon',
    quality: 'Factory New',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MP7',
    name: 'Army Recon',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP7',
    name: 'Army Recon',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP7',
    name: 'Army Recon',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP7',
    name: 'Army Recon',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir MP7',
    name: 'Army Recon',
    quality: 'Factory New',
    marketPrice: 63.42,
    avgPrice: 58.28
}, {
    type: 'Souvenir MP7',
    name: 'Army Recon',
    quality: 'Minimal Wear',
    marketPrice: 2.33,
    avgPrice: 2.41
}, {
    type: 'Souvenir MP7',
    name: 'Army Recon',
    quality: 'Field-Tested',
    marketPrice: 1.24,
    avgPrice: 2.20
}, {
    type: 'Souvenir MP7',
    name: 'Army Recon',
    quality: 'Well-Worn',
    marketPrice: 4.74,
    avgPrice: 4.28
}, {
    type: 'Souvenir MP7',
    name: 'Army Recon',
    quality: 'Battle-Scarred',
    marketPrice: 1.55,
    avgPrice: 1.02
}, {
    type: 'MP7',
    name: 'Asterion',
    quality: 'Factory New',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'MP7',
    name: 'Asterion',
    quality: 'Minimal Wear',
    marketPrice: 0.19,
    avgPrice: 0.17
}, {
    type: 'MP7',
    name: 'Asterion',
    quality: 'Field-Tested',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'MP7',
    name: 'Asterion',
    quality: 'Well-Worn',
    marketPrice: 0.16,
    avgPrice: 0.13
}, {
    type: 'MP7',
    name: 'Asterion',
    quality: 'Battle-Scarred',
    marketPrice: 0.14,
    avgPrice: 0.11
}, {
    type: 'MP7',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MP7',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP7',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP7',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP7',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP7',
    name: 'Full Stop',
    quality: 'Factory New',
    marketPrice: 1.58,
    avgPrice: 1.42
}, {
    type: 'MP7',
    name: 'Full Stop',
    quality: 'Minimal Wear',
    marketPrice: 0.98,
    avgPrice: 0.79
}, {
    type: 'MP7',
    name: 'Full Stop',
    quality: 'Field-Tested',
    marketPrice: 0.57,
    avgPrice: 0.50
}, {
    type: 'MP7',
    name: 'Full Stop',
    quality: 'Well-Worn',
    marketPrice: 0.57,
    avgPrice: 0.53
}, {
    type: 'MP7',
    name: 'Full Stop',
    quality: 'Battle-Scarred',
    marketPrice: 0.55,
    avgPrice: 0.46
}, {
    type: 'MP7',
    name: 'Groundwater',
    quality: 'Factory New',
    marketPrice: 11.66,
    avgPrice: 8.24
}, {
    type: 'MP7',
    name: 'Groundwater',
    quality: 'Minimal Wear',
    marketPrice: 0.63,
    avgPrice: 0.55
}, {
    type: 'MP7',
    name: 'Groundwater',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.30
}, {
    type: 'MP7',
    name: 'Groundwater',
    quality: 'Well-Worn',
    marketPrice: 0.59,
    avgPrice: 0.51
}, {
    type: 'MP7',
    name: 'Groundwater',
    quality: 'Battle-Scarred',
    marketPrice: 0.61,
    avgPrice: 0.48
}, {
    type: 'MP7',
    name: 'Gunsmoke',
    quality: 'Factory New',
    marketPrice: 2.64,
    avgPrice: 2.27
}, {
    type: 'MP7',
    name: 'Gunsmoke',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.26
}, {
    type: 'MP7',
    name: 'Gunsmoke',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.12
}, {
    type: 'MP7',
    name: 'Gunsmoke',
    quality: 'Well-Worn',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'MP7',
    name: 'Gunsmoke',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'Souvenir MP7',
    name: 'Gunsmoke',
    quality: 'Factory New',
    marketPrice: 69.00,
    avgPrice: 68.16
}, {
    type: 'Souvenir MP7',
    name: 'Gunsmoke',
    quality: 'Minimal Wear',
    marketPrice: 5.78,
    avgPrice: 5.16
}, {
    type: 'Souvenir MP7',
    name: 'Gunsmoke',
    quality: 'Field-Tested',
    marketPrice: 0.92,
    avgPrice: 1.17
}, {
    type: 'Souvenir MP7',
    name: 'Gunsmoke',
    quality: 'Well-Worn',
    marketPrice: 2.07,
    avgPrice: 2.03
}, {
    type: 'Souvenir MP7',
    name: 'Gunsmoke',
    quality: 'Battle-Scarred',
    marketPrice: 0.89,
    avgPrice: 0.87
}, {
    type: 'MP7',
    name: 'Impire',
    quality: 'Factory New',
    marketPrice: 0.92,
    avgPrice: 0.94
}, {
    type: 'MP7',
    name: 'Impire',
    quality: 'Minimal Wear',
    marketPrice: 0.59,
    avgPrice: 0.53
}, {
    type: 'MP7',
    name: 'Impire',
    quality: 'Field-Tested',
    marketPrice: 0.38,
    avgPrice: 0.37
}, {
    type: 'MP7',
    name: 'Impire',
    quality: 'Well-Worn',
    marketPrice: 0.49,
    avgPrice: 0.45
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Impire',
    quality: 'Factory New',
    marketPrice: 4.46,
    avgPrice: 4.07
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Impire',
    quality: 'Minimal Wear',
    marketPrice: 2.33,
    avgPrice: 2.29
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Impire',
    quality: 'Field-Tested',
    marketPrice: 1.75,
    avgPrice: 1.51
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Impire',
    quality: 'Well-Worn',
    marketPrice: 2.03,
    avgPrice: 1.60
}, {
    type: 'MP7',
    name: 'Nemesis',
    quality: 'Factory New',
    marketPrice: 4.52,
    avgPrice: 4.16
}, {
    type: 'MP7',
    name: 'Nemesis',
    quality: 'Minimal Wear',
    marketPrice: 3.12,
    avgPrice: 3.02
}, {
    type: 'MP7',
    name: 'Nemesis',
    quality: 'Field-Tested',
    marketPrice: 2.54,
    avgPrice: 2.41
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Nemesis',
    quality: 'Factory New',
    marketPrice: 19.15,
    avgPrice: 16.33
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Nemesis',
    quality: 'Minimal Wear',
    marketPrice: 11.59,
    avgPrice: 9.53
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Nemesis',
    quality: 'Field-Tested',
    marketPrice: 8.05,
    avgPrice: 6.90
}, {
    type: 'MP7',
    name: 'Ocean Foam',
    quality: 'Factory New',
    marketPrice: 1.23,
    avgPrice: 1.05
}, {
    type: 'MP7',
    name: 'Ocean Foam',
    quality: 'Minimal Wear',
    marketPrice: 1.52,
    avgPrice: 1.57
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Ocean Foam',
    quality: 'Factory New',
    marketPrice: 5.47,
    avgPrice: 4.00
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Ocean Foam',
    quality: 'Minimal Wear',
    marketPrice: 5.87,
    avgPrice: 5.34
}, {
    type: 'MP7',
    name: 'Olive Plaid',
    quality: 'Factory New',
    marketPrice: 0.46,
    avgPrice: 0.43
}, {
    type: 'MP7',
    name: 'Olive Plaid',
    quality: 'Minimal Wear',
    marketPrice: 0.21,
    avgPrice: 0.21
}, {
    type: 'MP7',
    name: 'Olive Plaid',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.18
}, {
    type: 'MP7',
    name: 'Olive Plaid',
    quality: 'Well-Worn',
    marketPrice: 0.88,
    avgPrice: 0.78
}, {
    type: 'MP7',
    name: 'Olive Plaid',
    quality: 'Battle-Scarred',
    marketPrice: 0.82,
    avgPrice: 0.82
}, {
    type: 'MP7',
    name: 'Orange Peel',
    quality: 'Factory New',
    marketPrice: 8.76,
    avgPrice: 10.44
}, {
    type: 'MP7',
    name: 'Orange Peel',
    quality: 'Minimal Wear',
    marketPrice: 0.73,
    avgPrice: 0.61
}, {
    type: 'MP7',
    name: 'Orange Peel',
    quality: 'Field-Tested',
    marketPrice: 0.59,
    avgPrice: 0.48
}, {
    type: 'MP7',
    name: 'Orange Peel',
    quality: 'Well-Worn',
    marketPrice: 0.58,
    avgPrice: 0.57
}, {
    type: 'MP7',
    name: 'Orange Peel',
    quality: 'Battle-Scarred',
    marketPrice: 0.54,
    avgPrice: 0.51
}, {
    type: 'Souvenir MP7',
    name: 'Orange Peel',
    quality: 'Factory New',
    marketPrice: 32.77,
    avgPrice: 40.79
}, {
    type: 'Souvenir MP7',
    name: 'Orange Peel',
    quality: 'Minimal Wear',
    marketPrice: 2.18,
    avgPrice: 1.67
}, {
    type: 'Souvenir MP7',
    name: 'Orange Peel',
    quality: 'Field-Tested',
    marketPrice: 0.75,
    avgPrice: 0.76
}, {
    type: 'Souvenir MP7',
    name: 'Orange Peel',
    quality: 'Well-Worn',
    marketPrice: 0.85,
    avgPrice: 0.77
}, {
    type: 'Souvenir MP7',
    name: 'Orange Peel',
    quality: 'Battle-Scarred',
    marketPrice: 0.62,
    avgPrice: 0.67
}, {
    type: 'MP7',
    name: 'Skulls',
    quality: 'Minimal Wear',
    marketPrice: 1.00,
    avgPrice: 0.92
}, {
    type: 'MP7',
    name: 'Skulls',
    quality: 'Field-Tested',
    marketPrice: 0.85,
    avgPrice: 0.75
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Skulls',
    quality: 'Minimal Wear',
    marketPrice: 2.83,
    avgPrice: 2.67
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Skulls',
    quality: 'Field-Tested',
    marketPrice: 1.91,
    avgPrice: 1.67
}, {
    type: 'MP7',
    name: 'Special Delivery',
    quality: 'Factory New',
    marketPrice: 1.08,
    avgPrice: 1.12
}, {
    type: 'MP7',
    name: 'Special Delivery',
    quality: 'Minimal Wear',
    marketPrice: 0.62,
    avgPrice: 0.60
}, {
    type: 'MP7',
    name: 'Special Delivery',
    quality: 'Field-Tested',
    marketPrice: 0.47,
    avgPrice: 0.42
}, {
    type: 'MP7',
    name: 'Special Delivery',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.41
}, {
    type: 'MP7',
    name: 'Special Delivery',
    quality: 'Battle-Scarred',
    marketPrice: 0.46,
    avgPrice: 0.37
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Special Delivery',
    quality: 'Factory New',
    marketPrice: 3.87,
    avgPrice: 3.85
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Special Delivery',
    quality: 'Minimal Wear',
    marketPrice: 2.45,
    avgPrice: 2.14
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Special Delivery',
    quality: 'Field-Tested',
    marketPrice: 1.42,
    avgPrice: 1.14
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Special Delivery',
    quality: 'Well-Worn',
    marketPrice: 0.98,
    avgPrice: 1.08
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Special Delivery',
    quality: 'Battle-Scarred',
    marketPrice: 0.89,
    avgPrice: 0.84
}, {
    type: 'MP7',
    name: 'Urban Hazard',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.15
}, {
    type: 'MP7',
    name: 'Urban Hazard',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'MP7',
    name: 'Urban Hazard',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MP7',
    name: 'Urban Hazard',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'MP7',
    name: 'Urban Hazard',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Urban Hazard',
    quality: 'Factory New',
    marketPrice: 0.80,
    avgPrice: 0.79
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Urban Hazard',
    quality: 'Minimal Wear',
    marketPrice: 0.46,
    avgPrice: 0.45
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Urban Hazard',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.27
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Urban Hazard',
    quality: 'Well-Worn',
    marketPrice: 0.40,
    avgPrice: 0.38
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Urban Hazard',
    quality: 'Battle-Scarred',
    marketPrice: 0.35,
    avgPrice: 0.29
}, {
    type: 'MP7',
    name: 'Whiteout',
    quality: 'Factory New',
    marketPrice: 404.59,
    avgPrice: 485.00
}, {
    type: 'MP7',
    name: 'Whiteout',
    quality: 'Minimal Wear',
    marketPrice: 18.32,
    avgPrice: 18.87
}, {
    type: 'MP7',
    name: 'Whiteout',
    quality: 'Field-Tested',
    marketPrice: 1.50,
    avgPrice: 1.42
}, {
    type: 'MP7',
    name: 'Whiteout',
    quality: 'Well-Worn',
    marketPrice: 1.97,
    avgPrice: 2.11
}, {
    type: 'MP7',
    name: 'Whiteout',
    quality: 'Battle-Scarred',
    marketPrice: 3.19,
    avgPrice: 3.01
}, {
    type: 'MP9',
    name: 'Bioleak',
    quality: 'Factory New',
    marketPrice: 0.29,
    avgPrice: 0.27
}, {
    type: 'MP9',
    name: 'Bioleak',
    quality: 'Minimal Wear',
    marketPrice: 0.17,
    avgPrice: 0.18
}, {
    type: 'MP9',
    name: 'Bioleak',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'MP9',
    name: 'Bioleak',
    quality: 'Well-Worn',
    marketPrice: 0.15,
    avgPrice: 0.15
}, {
    type: 'MP9',
    name: 'Bioleak',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Bioleak',
    quality: 'Factory New',
    marketPrice: 1.05,
    avgPrice: 1.07
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Bioleak',
    quality: 'Minimal Wear',
    marketPrice: 0.78,
    avgPrice: 0.71
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Bioleak',
    quality: 'Field-Tested',
    marketPrice: 0.37,
    avgPrice: 0.39
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Bioleak',
    quality: 'Well-Worn',
    marketPrice: 0.63,
    avgPrice: 0.56
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Bioleak',
    quality: 'Battle-Scarred',
    marketPrice: 0.34,
    avgPrice: 0.38
}, {
    type: 'MP9',
    name: 'Bulldozer',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 767.50
}, {
    type: 'MP9',
    name: 'Bulldozer',
    quality: 'Minimal Wear',
    marketPrice: 21.74,
    avgPrice: 19.42
}, {
    type: 'MP9',
    name: 'Bulldozer',
    quality: 'Field-Tested',
    marketPrice: 4.39,
    avgPrice: 3.89
}, {
    type: 'MP9',
    name: 'Bulldozer',
    quality: 'Well-Worn',
    marketPrice: 18.89,
    avgPrice: 5.27
}, {
    type: 'MP9',
    name: 'Bulldozer',
    quality: 'Battle-Scarred',
    marketPrice: 5.66,
    avgPrice: 5.31
}, {
    type: 'MP9',
    name: 'Dark Age',
    quality: 'Factory New',
    marketPrice: 2.67,
    avgPrice: 2.47
}, {
    type: 'MP9',
    name: 'Dark Age',
    quality: 'Minimal Wear',
    marketPrice: 2.00,
    avgPrice: 2.26
}, {
    type: 'MP9',
    name: 'Dark Age',
    quality: 'Field-Tested',
    marketPrice: 2.42,
    avgPrice: 2.32
}, {
    type: 'Souvenir MP9',
    name: 'Dark Age',
    quality: 'Factory New',
    marketPrice: 3.14,
    avgPrice: 3.16
}, {
    type: 'Souvenir MP9',
    name: 'Dark Age',
    quality: 'Minimal Wear',
    marketPrice: 2.80,
    avgPrice: 2.74
}, {
    type: 'Souvenir MP9',
    name: 'Dark Age',
    quality: 'Field-Tested',
    marketPrice: 2.68,
    avgPrice: 2.77
}, {
    type: 'MP9',
    name: 'Dart',
    quality: 'Factory New',
    marketPrice: 0.37,
    avgPrice: 0.33
}, {
    type: 'MP9',
    name: 'Dart',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.25
}, {
    type: 'MP9',
    name: 'Dart',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.19
}, {
    type: 'MP9',
    name: 'Dart',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.24
}, {
    type: 'MP9',
    name: 'Dart',
    quality: 'Battle-Scarred',
    marketPrice: 4.71,
    avgPrice: 2.40
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Dart',
    quality: 'Factory New',
    marketPrice: 0.96,
    avgPrice: 1.02
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Dart',
    quality: 'Minimal Wear',
    marketPrice: 0.76,
    avgPrice: 0.65
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Dart',
    quality: 'Field-Tested',
    marketPrice: 0.58,
    avgPrice: 0.47
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Dart',
    quality: 'Well-Worn',
    marketPrice: 0.53,
    avgPrice: 0.52
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Dart',
    quality: 'Battle-Scarred',
    marketPrice: 3.11,
    avgPrice: 2.50
}, {
    type: 'MP9',
    name: 'Deadly Poison',
    quality: 'Factory New',
    marketPrice: 0.59,
    avgPrice: 0.54
}, {
    type: 'MP9',
    name: 'Deadly Poison',
    quality: 'Minimal Wear',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'MP9',
    name: 'Deadly Poison',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'MP9',
    name: 'Deadly Poison',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'MP9',
    name: 'Deadly Poison',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Deadly Poison',
    quality: 'Factory New',
    marketPrice: 2.39,
    avgPrice: 2.08
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Deadly Poison',
    quality: 'Minimal Wear',
    marketPrice: 0.48,
    avgPrice: 0.45
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Deadly Poison',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.31
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Deadly Poison',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.29
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Deadly Poison',
    quality: 'Battle-Scarred',
    marketPrice: 0.30,
    avgPrice: 0.30
}, {
    type: 'MP9',
    name: 'Dry Season',
    quality: 'Factory New',
    marketPrice: 9.28,
    avgPrice: 4.68
}, {
    type: 'MP9',
    name: 'Dry Season',
    quality: 'Minimal Wear',
    marketPrice: 0.52,
    avgPrice: 0.45
}, {
    type: 'MP9',
    name: 'Dry Season',
    quality: 'Field-Tested',
    marketPrice: 0.43,
    avgPrice: 0.28
}, {
    type: 'MP9',
    name: 'Dry Season',
    quality: 'Well-Worn',
    marketPrice: 0.34,
    avgPrice: 0.31
}, {
    type: 'MP9',
    name: 'Dry Season',
    quality: 'Battle-Scarred',
    marketPrice: 0.40,
    avgPrice: 0.37
}, {
    type: 'MP9',
    name: 'Green Plaid',
    quality: 'Factory New',
    marketPrice: 0.39,
    avgPrice: 0.42
}, {
    type: 'MP9',
    name: 'Green Plaid',
    quality: 'Minimal Wear',
    marketPrice: 0.23,
    avgPrice: 0.20
}, {
    type: 'MP9',
    name: 'Green Plaid',
    quality: 'Field-Tested',
    marketPrice: 0.39,
    avgPrice: 0.29
}, {
    type: 'MP9',
    name: 'Green Plaid',
    quality: 'Well-Worn',
    marketPrice: 0.59,
    avgPrice: 0.38
}, {
    type: 'MP9',
    name: 'Green Plaid',
    quality: 'Battle-Scarred',
    marketPrice: 0.20,
    avgPrice: 0.20
}, {
    type: 'MP9',
    name: 'Hot Rod',
    quality: 'Factory New',
    marketPrice: 5.26,
    avgPrice: 4.88
}, {
    type: 'MP9',
    name: 'Hot Rod',
    quality: 'Minimal Wear',
    marketPrice: 5.41,
    avgPrice: 5.14
}, {
    type: 'Souvenir MP9',
    name: 'Hot Rod',
    quality: 'Factory New',
    marketPrice: 12.76,
    avgPrice: 10.80
}, {
    type: 'Souvenir MP9',
    name: 'Hot Rod',
    quality: 'Minimal Wear',
    marketPrice: 14.26,
    avgPrice: 11.53
}, {
    type: 'MP9',
    name: 'Hypnotic',
    quality: 'Factory New',
    marketPrice: 1.35,
    avgPrice: 1.16
}, {
    type: 'MP9',
    name: 'Hypnotic',
    quality: 'Minimal Wear',
    marketPrice: 2.78,
    avgPrice: 2.60
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Hypnotic',
    quality: 'Factory New',
    marketPrice: 5.70,
    avgPrice: 4.89
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Hypnotic',
    quality: 'Minimal Wear',
    marketPrice: 12.72,
    avgPrice: 11.84
}, {
    type: 'MP9',
    name: 'Orange Peel',
    quality: 'Factory New',
    marketPrice: 0.28,
    avgPrice: 0.24
}, {
    type: 'MP9',
    name: 'Orange Peel',
    quality: 'Minimal Wear',
    marketPrice: 0.07,
    avgPrice: 0.04
}, {
    type: 'MP9',
    name: 'Orange Peel',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'MP9',
    name: 'Orange Peel',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'MP9',
    name: 'Orange Peel',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir MP9',
    name: 'Orange Peel',
    quality: 'Minimal Wear',
    marketPrice: 6.99,
    avgPrice: 5.49
}, {
    type: 'Souvenir MP9',
    name: 'Orange Peel',
    quality: 'Field-Tested',
    marketPrice: 2.91,
    avgPrice: 2.50
}, {
    type: 'Souvenir MP9',
    name: 'Orange Peel',
    quality: 'Well-Worn',
    marketPrice: 12.67,
    avgPrice: 14.00
}, {
    type: 'Souvenir MP9',
    name: 'Orange Peel',
    quality: 'Battle-Scarred',
    marketPrice: 9.24,
    avgPrice: 9.38
}, {
    type: 'MP9',
    name: 'Pandora\'s Box',
    quality: 'Factory New',
    marketPrice: 6.50,
    avgPrice: 5.21
}, {
    type: 'MP9',
    name: 'Pandora\'s Box',
    quality: 'Minimal Wear',
    marketPrice: 5.55,
    avgPrice: 4.66
}, {
    type: 'MP9',
    name: 'Pandora\'s Box',
    quality: 'Field-Tested',
    marketPrice: 5.70,
    avgPrice: 4.56
}, {
    type: 'MP9',
    name: 'Rose Iron',
    quality: 'Factory New',
    marketPrice: 2.00,
    avgPrice: 1.72
}, {
    type: 'MP9',
    name: 'Rose Iron',
    quality: 'Minimal Wear',
    marketPrice: 1.55,
    avgPrice: 1.44
}, {
    type: 'MP9',
    name: 'Rose Iron',
    quality: 'Field-Tested',
    marketPrice: 1.49,
    avgPrice: 1.30
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Rose Iron',
    quality: 'Factory New',
    marketPrice: 5.87,
    avgPrice: 5.51
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Rose Iron',
    quality: 'Minimal Wear',
    marketPrice: 3.97,
    avgPrice: 3.47
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Rose Iron',
    quality: 'Field-Tested',
    marketPrice: 2.83,
    avgPrice: 2.64
}, {
    type: 'MP9',
    name: 'Ruby Poison Dart',
    quality: 'Factory New',
    marketPrice: 0.61,
    avgPrice: 0.57
}, {
    type: 'MP9',
    name: 'Ruby Poison Dart',
    quality: 'Minimal Wear',
    marketPrice: 0.37,
    avgPrice: 0.33
}, {
    type: 'MP9',
    name: 'Ruby Poison Dart',
    quality: 'Field-Tested',
    marketPrice: 0.29,
    avgPrice: 0.27
}, {
    type: 'MP9',
    name: 'Ruby Poison Dart',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.29
}, {
    type: 'MP9',
    name: 'Ruby Poison Dart',
    quality: 'Battle-Scarred',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Ruby Poison Dart',
    quality: 'Factory New',
    marketPrice: 2.53,
    avgPrice: 2.70
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Ruby Poison Dart',
    quality: 'Minimal Wear',
    marketPrice: 1.50,
    avgPrice: 1.50
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Ruby Poison Dart',
    quality: 'Field-Tested',
    marketPrice: 0.88,
    avgPrice: 0.82
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Ruby Poison Dart',
    quality: 'Well-Worn',
    marketPrice: 0.92,
    avgPrice: 0.88
}, {
    type: 'MP9',
    statTrak: true,
    name: 'Ruby Poison Dart',
    quality: 'Battle-Scarred',
    marketPrice: 0.87,
    avgPrice: 0.86
}, {
    type: 'MP9',
    name: 'Sand Dashed',
    quality: 'Factory New',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'MP9',
    name: 'Sand Dashed',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP9',
    name: 'Sand Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP9',
    name: 'Sand Dashed',
    quality: 'Well-Worn',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'MP9',
    name: 'Sand Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir MP9',
    name: 'Sand Dashed',
    quality: 'Factory New',
    marketPrice: 3.65,
    avgPrice: 2.79
}, {
    type: 'Souvenir MP9',
    name: 'Sand Dashed',
    quality: 'Minimal Wear',
    marketPrice: 0.39,
    avgPrice: 0.39
}, {
    type: 'Souvenir MP9',
    name: 'Sand Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.22
}, {
    type: 'Souvenir MP9',
    name: 'Sand Dashed',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'Souvenir MP9',
    name: 'Sand Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.25
}, {
    type: 'MP9',
    name: 'Setting Sun',
    quality: 'Factory New',
    marketPrice: 1.33,
    avgPrice: 1.44
}, {
    type: 'MP9',
    name: 'Setting Sun',
    quality: 'Minimal Wear',
    marketPrice: 0.73,
    avgPrice: 0.76
}, {
    type: 'MP9',
    name: 'Setting Sun',
    quality: 'Field-Tested',
    marketPrice: 0.35,
    avgPrice: 0.28
}, {
    type: 'MP9',
    name: 'Setting Sun',
    quality: 'Well-Worn',
    marketPrice: 0.25,
    avgPrice: 0.24
}, {
    type: 'MP9',
    name: 'Setting Sun',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.18
}, {
    type: 'Souvenir MP9',
    name: 'Setting Sun',
    quality: 'Factory New',
    marketPrice: 31.59,
    avgPrice: 26.71
}, {
    type: 'Souvenir MP9',
    name: 'Setting Sun',
    quality: 'Minimal Wear',
    marketPrice: 3.83,
    avgPrice: 3.70
}, {
    type: 'Souvenir MP9',
    name: 'Setting Sun',
    quality: 'Field-Tested',
    marketPrice: 1.74,
    avgPrice: 1.73
}, {
    type: 'Souvenir MP9',
    name: 'Setting Sun',
    quality: 'Well-Worn',
    marketPrice: 1.65,
    avgPrice: 1.23
}, {
    type: 'Souvenir MP9',
    name: 'Setting Sun',
    quality: 'Battle-Scarred',
    marketPrice: 0.89,
    avgPrice: 0.79
}, {
    type: 'MP9',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 0.32,
    avgPrice: 0.29
}, {
    type: 'MP9',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'MP9',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP9',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'MP9',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'Souvenir MP9',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 5.49,
    avgPrice: 6.23
}, {
    type: 'Souvenir MP9',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.69,
    avgPrice: 0.77
}, {
    type: 'Souvenir MP9',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'Souvenir MP9',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.34,
    avgPrice: 0.33
}, {
    type: 'Souvenir MP9',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.30,
    avgPrice: 0.27
}, {
    type: 'Negev',
    name: 'Anodized Navy',
    quality: 'Factory New',
    marketPrice: 62.25,
    avgPrice: 66.03
}, {
    type: 'Negev',
    name: 'Anodized Navy',
    quality: 'Minimal Wear',
    marketPrice: 99.64,
    avgPrice: 57.29
}, {
    type: 'Negev',
    name: 'Army Sheen',
    quality: 'Factory New',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Negev',
    name: 'Army Sheen',
    quality: 'Minimal Wear',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'Negev',
    name: 'Army Sheen',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Negev',
    name: 'Bratatat',
    quality: 'Factory New',
    marketPrice: 1.32,
    avgPrice: 1.39
}, {
    type: 'Negev',
    name: 'Bratatat',
    quality: 'Minimal Wear',
    marketPrice: 0.29,
    avgPrice: 0.33
}, {
    type: 'Negev',
    name: 'Bratatat',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.20
}, {
    type: 'Negev',
    name: 'Bratatat',
    quality: 'Well-Worn',
    marketPrice: 0.18,
    avgPrice: 0.18
}, {
    type: 'Negev',
    name: 'Bratatat',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.18
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Bratatat',
    quality: 'Factory New',
    marketPrice: 4.89,
    avgPrice: 4.91
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Bratatat',
    quality: 'Minimal Wear',
    marketPrice: 0.88,
    avgPrice: 0.89
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Bratatat',
    quality: 'Field-Tested',
    marketPrice: 0.49,
    avgPrice: 0.38
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Bratatat',
    quality: 'Well-Worn',
    marketPrice: 0.37,
    avgPrice: 0.34
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Bratatat',
    quality: 'Battle-Scarred',
    marketPrice: 0.35,
    avgPrice: 0.32
}, {
    type: 'Negev',
    name: 'CaliCamo',
    quality: 'Factory New',
    marketPrice: 1.18,
    avgPrice: 0.92
}, {
    type: 'Negev',
    name: 'CaliCamo',
    quality: 'Minimal Wear',
    marketPrice: 0.74,
    avgPrice: 0.59
}, {
    type: 'Negev',
    name: 'CaliCamo',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.48
}, {
    type: 'Negev',
    name: 'CaliCamo',
    quality: 'Well-Worn',
    marketPrice: 0.59,
    avgPrice: 0.56
}, {
    type: 'Negev',
    name: 'CaliCamo',
    quality: 'Battle-Scarred',
    marketPrice: 1.33,
    avgPrice: 1.11
}, {
    type: 'Souvenir Negev',
    name: 'CaliCamo',
    quality: 'Factory New',
    marketPrice: 1.03,
    avgPrice: 0.89
}, {
    type: 'Souvenir Negev',
    name: 'CaliCamo',
    quality: 'Minimal Wear',
    marketPrice: 0.47,
    avgPrice: 0.43
}, {
    type: 'Souvenir Negev',
    name: 'CaliCamo',
    quality: 'Field-Tested',
    marketPrice: 0.43,
    avgPrice: 0.30
}, {
    type: 'Souvenir Negev',
    name: 'CaliCamo',
    quality: 'Well-Worn',
    marketPrice: 0.62,
    avgPrice: 0.57
}, {
    type: 'Souvenir Negev',
    name: 'CaliCamo',
    quality: 'Battle-Scarred',
    marketPrice: 0.54,
    avgPrice: 0.38
}, {
    type: 'Negev',
    name: 'Desert-Strike',
    quality: 'Factory New',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'Negev',
    name: 'Desert-Strike',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Negev',
    name: 'Desert-Strike',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Negev',
    name: 'Desert-Strike',
    quality: 'Well-Worn',
    marketPrice: 0.09,
    avgPrice: 0.08
}, {
    type: 'Negev',
    name: 'Desert-Strike',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Factory New',
    marketPrice: 0.53,
    avgPrice: 0.47
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Minimal Wear',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.22
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Well-Worn',
    marketPrice: 0.21,
    avgPrice: 0.23
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Desert-Strike',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.22
}, {
    type: 'Negev',
    name: 'Loudmouth',
    quality: 'Minimal Wear',
    marketPrice: 1.61,
    avgPrice: 1.81
}, {
    type: 'Negev',
    name: 'Loudmouth',
    quality: 'Field-Tested',
    marketPrice: 0.27,
    avgPrice: 0.25
}, {
    type: 'Negev',
    name: 'Loudmouth',
    quality: 'Well-Worn',
    marketPrice: 0.41,
    avgPrice: 0.38
}, {
    type: 'Negev',
    name: 'Loudmouth',
    quality: 'Battle-Scarred',
    marketPrice: 0.29,
    avgPrice: 0.26
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Loudmouth',
    quality: 'Minimal Wear',
    marketPrice: 9.56,
    avgPrice: 7.42
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Loudmouth',
    quality: 'Field-Tested',
    marketPrice: 0.72,
    avgPrice: 0.69
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Loudmouth',
    quality: 'Well-Worn',
    marketPrice: 0.77,
    avgPrice: 0.76
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Loudmouth',
    quality: 'Battle-Scarred',
    marketPrice: 0.73,
    avgPrice: 0.66
}, {
    type: 'Negev',
    name: 'Man-o\'-war ',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Negev',
    name: 'Man-o\'-war',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Man-o\'-war',
    quality: 'Minimal Wear',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Man-o\'-war',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.23
}, {
    type: 'Negev',
    name: 'Nuclear Waste',
    quality: 'Factory New',
    marketPrice: 0.31,
    avgPrice: 0.26
}, {
    type: 'Negev',
    name: 'Nuclear Waste',
    quality: 'Minimal Wear',
    marketPrice: 0.17,
    avgPrice: 0.17
}, {
    type: 'Negev',
    name: 'Nuclear Waste',
    quality: 'Field-Tested',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'Negev',
    name: 'Nuclear Waste',
    quality: 'Well-Worn',
    marketPrice: 0.18,
    avgPrice: 0.16
}, {
    type: 'Souvenir Negev',
    name: 'Nuclear Waste',
    quality: 'Factory New',
    marketPrice: 1.08,
    avgPrice: 0.94
}, {
    type: 'Souvenir Negev',
    name: 'Nuclear Waste',
    quality: 'Minimal Wear',
    marketPrice: 0.57,
    avgPrice: 0.53
}, {
    type: 'Souvenir Negev',
    name: 'Nuclear Waste',
    quality: 'Field-Tested',
    marketPrice: 0.42,
    avgPrice: 0.32
}, {
    type: 'Souvenir Negev',
    name: 'Nuclear Waste',
    quality: 'Well-Worn',
    marketPrice: 1.08,
    avgPrice: 0.68
}, {
    type: 'Negev',
    name: 'Palm',
    quality: 'Factory New',
    marketPrice: 20.24,
    avgPrice: 14.78
}, {
    type: 'Negev',
    name: 'Palm',
    quality: 'Minimal Wear',
    marketPrice: 1.45,
    avgPrice: 1.34
}, {
    type: 'Negev',
    name: 'Palm',
    quality: 'Field-Tested',
    marketPrice: 0.41,
    avgPrice: 0.52
}, {
    type: 'Negev',
    name: 'Palm',
    quality: 'Well-Worn',
    marketPrice: 0.63,
    avgPrice: 0.58
}, {
    type: 'Negev',
    name: 'Palm',
    quality: 'Battle-Scarred',
    marketPrice: 0.75,
    avgPrice: 0.72
}, {
    type: 'Negev',
    name: 'Power Loader',
    quality: 'Factory New',
    marketPrice: 2.66,
    avgPrice: 2.33
}, {
    type: 'Negev',
    name: 'Power Loader',
    quality: 'Minimal Wear',
    marketPrice: 1.03,
    avgPrice: 1.00
}, {
    type: 'Negev',
    name: 'Power Loader',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.48
}, {
    type: 'Negev',
    name: 'Power Loader',
    quality: 'Well-Worn',
    marketPrice: 0.42,
    avgPrice: 0.45
}, {
    type: 'Negev',
    name: 'Power Loader',
    quality: 'Battle-Scarred',
    marketPrice: 0.48,
    avgPrice: 0.42
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Power Loader',
    quality: 'Factory New',
    marketPrice: 9.21,
    avgPrice: 8.75
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Power Loader',
    quality: 'Minimal Wear',
    marketPrice: 4.50,
    avgPrice: 4.05
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Power Loader',
    quality: 'Field-Tested',
    marketPrice: 2.20,
    avgPrice: 1.64
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Power Loader',
    quality: 'Well-Worn',
    marketPrice: 1.39,
    avgPrice: 1.29
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Power Loader',
    quality: 'Battle-Scarred',
    marketPrice: 0.94,
    avgPrice: 1.12
}, {
    type: 'Negev',
    name: 'Terrain',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.14
}, {
    type: 'Negev',
    name: 'Terrain',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Negev',
    name: 'Terrain',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Negev',
    name: 'Terrain',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Terrain',
    quality: 'Factory New',
    marketPrice: 0.70,
    avgPrice: 0.50
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Terrain',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.29
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Terrain',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.22
}, {
    type: 'Negev',
    statTrak: true,
    name: 'Terrain',
    quality: 'Well-Worn',
    marketPrice: 0.21,
    avgPrice: 0.24
}, {
    type: 'Nova',
    name: 'Antique',
    quality: 'Factory New',
    marketPrice: 4.84,
    avgPrice: 2.91
}, {
    type: 'Nova',
    name: 'Antique',
    quality: 'Minimal Wear',
    marketPrice: 3.06,
    avgPrice: 2.43
}, {
    type: 'Nova',
    name: 'Antique',
    quality: 'Field-Tested',
    marketPrice: 2.81,
    avgPrice: 2.64
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Antique',
    quality: 'Factory New',
    marketPrice: 13.34,
    avgPrice: 9.25
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Antique',
    quality: 'Minimal Wear',
    marketPrice: 6.76,
    avgPrice: 5.97
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Antique',
    quality: 'Field-Tested',
    marketPrice: 7.56,
    avgPrice: 6.45
}, {
    type: 'Nova',
    name: 'Blaze Orange',
    quality: 'Factory New',
    marketPrice: 244.31,
    avgPrice: 143.27
}, {
    type: 'Nova',
    name: 'Blaze Orange',
    quality: 'Minimal Wear',
    marketPrice: 7.93,
    avgPrice: 6.66
}, {
    type: 'Nova',
    name: 'Blaze Orange',
    quality: 'Field-Tested',
    marketPrice: 4.06,
    avgPrice: 3.74
}, {
    type: 'Nova',
    name: 'Blaze Orange',
    quality: 'Well-Worn',
    marketPrice: 5.57,
    avgPrice: 3.91
}, {
    type: 'Nova',
    name: 'Blaze Orange',
    quality: 'Battle-Scarred',
    marketPrice: 2.23,
    avgPrice: 1.86
}, {
    type: 'Nova',
    name: 'Bloomstick',
    quality: 'Factory New',
    marketPrice: 13.69,
    avgPrice: 12.71
}, {
    type: 'Nova',
    name: 'Bloomstick',
    quality: 'Minimal Wear',
    marketPrice: 2.44,
    avgPrice: 2.30
}, {
    type: 'Nova',
    name: 'Bloomstick',
    quality: 'Field-Tested',
    marketPrice: 1.63,
    avgPrice: 1.43
}, {
    type: 'Nova',
    name: 'Bloomstick',
    quality: 'Well-Worn',
    marketPrice: 1.84,
    avgPrice: 1.73
}, {
    type: 'Nova',
    name: 'Bloomstick',
    quality: 'Battle-Scarred',
    marketPrice: 1.62,
    avgPrice: 1.51
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Bloomstick',
    quality: 'Factory New',
    marketPrice: 59.99,
    avgPrice: 67.05
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Bloomstick',
    quality: 'Minimal Wear',
    marketPrice: 9.97,
    avgPrice: 9.63
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Bloomstick',
    quality: 'Field-Tested',
    marketPrice: 4.60,
    avgPrice: 4.29
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Bloomstick',
    quality: 'Well-Worn',
    marketPrice: 6.63,
    avgPrice: 5.46
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Bloomstick',
    quality: 'Battle-Scarred',
    marketPrice: 4.15,
    avgPrice: 3.75
}, {
    type: 'Nova',
    name: 'Caged Steel',
    quality: 'Factory New',
    marketPrice: 0.06,
    avgPrice: 0.05
}, {
    type: 'Nova',
    name: 'Caged Steel',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Nova',
    name: 'Caged Steel',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Candy Apple',
    quality: 'Factory New',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Nova',
    name: 'Candy Apple',
    quality: 'Minimal Wear',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'Nova',
    name: 'Candy Apple',
    quality: 'Field-Tested',
    marketPrice: 0.07,
    avgPrice: 0.04
}, {
    type: 'Souvenir Nova',
    name: 'Candy Apple',
    quality: 'Factory New',
    marketPrice: 28.70,
    avgPrice: 31.77
}, {
    type: 'Souvenir Nova',
    name: 'Candy Apple',
    quality: 'Minimal Wear',
    marketPrice: 8.88,
    avgPrice: 9.70
}, {
    type: 'Souvenir Nova',
    name: 'Candy Apple',
    quality: 'Field-Tested',
    marketPrice: 7.90,
    avgPrice: 8.70
}, {
    type: 'Nova',
    name: 'Exo',
    quality: 'Factory New',
    marketPrice: 0.37,
    avgPrice: 0.41
}, {
    type: 'Nova',
    name: 'Exo',
    quality: 'Minimal Wear',
    marketPrice: 0.35,
    avgPrice: 0.29
}, {
    type: 'Nova',
    name: 'Exo',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.21
}, {
    type: 'Nova',
    name: 'Exo',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.21
}, {
    type: 'Nova',
    name: 'Exo',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.20
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Exo',
    quality: 'Factory New',
    marketPrice: 1.53,
    avgPrice: 1.68
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Exo',
    quality: 'Minimal Wear',
    marketPrice: 1.07,
    avgPrice: 1.00
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Exo',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.63
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Exo',
    quality: 'Well-Worn',
    marketPrice: 1.05,
    avgPrice: 0.80
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Exo',
    quality: 'Battle-Scarred',
    marketPrice: 0.80,
    avgPrice: 0.71
}, {
    type: 'Nova',
    name: 'Forest Leaves',
    quality: 'Factory New',
    marketPrice: 4.39,
    avgPrice: 3.02
}, {
    type: 'Nova',
    name: 'Forest Leaves',
    quality: 'Minimal Wear',
    marketPrice: 0.32,
    avgPrice: 0.35
}, {
    type: 'Nova',
    name: 'Forest Leaves',
    quality: 'Field-Tested',
    marketPrice: 0.17,
    avgPrice: 0.18
}, {
    type: 'Nova',
    name: 'Forest Leaves',
    quality: 'Well-Worn',
    marketPrice: 1.34,
    avgPrice: 1.10
}, {
    type: 'Nova',
    name: 'Forest Leaves',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.20
}, {
    type: 'Nova',
    name: 'Ghost Camo',
    quality: 'Factory New',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'Nova',
    name: 'Ghost Camo',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.24
}, {
    type: 'Nova',
    name: 'Ghost Camo',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.21
}, {
    type: 'Nova',
    name: 'Ghost Camo',
    quality: 'Well-Worn',
    marketPrice: 0.42,
    avgPrice: 0.42
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ghost Camo',
    quality: 'Factory New',
    marketPrice: 1.32,
    avgPrice: 1.18
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ghost Camo',
    quality: 'Minimal Wear',
    marketPrice: 0.92,
    avgPrice: 0.87
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ghost Camo',
    quality: 'Field-Tested',
    marketPrice: 0.78,
    avgPrice: 0.70
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ghost Camo',
    quality: 'Well-Worn',
    marketPrice: 1.05,
    avgPrice: 2.45
}, {
    type: 'Nova',
    name: 'Graphite',
    quality: 'Factory New',
    marketPrice: 0.97,
    avgPrice: 0.93
}, {
    type: 'Nova',
    name: 'Graphite',
    quality: 'Minimal Wear',
    marketPrice: 1.06,
    avgPrice: 0.94
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Graphite',
    quality: 'Factory New',
    marketPrice: 4.29,
    avgPrice: 4.06
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Graphite',
    quality: 'Minimal Wear',
    marketPrice: 4.33,
    avgPrice: 5.28
}, {
    type: 'Nova',
    name: 'Green Apple',
    quality: 'Factory New',
    marketPrice: 0.42,
    avgPrice: 0.28
}, {
    type: 'Nova',
    name: 'Green Apple',
    quality: 'Minimal Wear',
    marketPrice: 0.23,
    avgPrice: 0.23
}, {
    type: 'Nova',
    name: 'Green Apple',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.22
}, {
    type: 'Souvenir Nova',
    name: 'Green Apple',
    quality: 'Factory New',
    marketPrice: 1.61,
    avgPrice: 1.43
}, {
    type: 'Souvenir Nova',
    name: 'Green Apple',
    quality: 'Minimal Wear',
    marketPrice: 1.11,
    avgPrice: 0.76
}, {
    type: 'Souvenir Nova',
    name: 'Green Apple',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.54
}, {
    type: 'Nova',
    name: 'Hyper Beast',
    quality: 'Factory New',
    marketPrice: 6.14,
    avgPrice: 4.83
}, {
    type: 'Nova',
    name: 'Hyper Beast',
    quality: 'Minimal Wear',
    marketPrice: 3.03,
    avgPrice: 2.93
}, {
    type: 'Nova',
    name: 'Hyper Beast',
    quality: 'Field-Tested',
    marketPrice: 2.27,
    avgPrice: 2.08
}, {
    type: 'Nova',
    name: 'Hyper Beast',
    quality: 'Well-Worn',
    marketPrice: 1.93,
    avgPrice: 2.07
}, {
    type: 'Nova',
    name: 'Hyper Beast',
    quality: 'Battle-Scarred',
    marketPrice: 1.98,
    avgPrice: 1.93
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Factory New',
    marketPrice: 24.90,
    avgPrice: 20.23
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Minimal Wear',
    marketPrice: 13.34,
    avgPrice: 12.43
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Field-Tested',
    marketPrice: 6.37,
    avgPrice: 6.77
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Well-Worn',
    marketPrice: 7.40,
    avgPrice: 6.92
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Hyper Beast',
    quality: 'Battle-Scarred',
    marketPrice: 5.45,
    avgPrice: 5.05
}, {
    type: 'Nova',
    name: 'Koi',
    quality: 'Factory New',
    marketPrice: 0.60,
    avgPrice: 0.51
}, {
    type: 'Nova',
    name: 'Koi',
    quality: 'Minimal Wear',
    marketPrice: 0.32,
    avgPrice: 0.32
}, {
    type: 'Nova',
    name: 'Koi',
    quality: 'Field-Tested',
    marketPrice: 0.32,
    avgPrice: 0.30
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Koi',
    quality: 'Factory New',
    marketPrice: 2.71,
    avgPrice: 2.27
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Koi',
    quality: 'Minimal Wear',
    marketPrice: 1.24,
    avgPrice: 1.20
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Koi',
    quality: 'Field-Tested',
    marketPrice: 0.99,
    avgPrice: 0.97
}, {
    type: 'Nova',
    name: 'Modern Hunter',
    quality: 'Factory New',
    marketPrice: 108.93,
    avgPrice: 98.75
}, {
    type: 'Nova',
    name: 'Modern Hunter',
    quality: 'Minimal Wear',
    marketPrice: 6.83,
    avgPrice: 4.63
}, {
    type: 'Nova',
    name: 'Modern Hunter',
    quality: 'Field-Tested',
    marketPrice: 2.53,
    avgPrice: 1.92
}, {
    type: 'Nova',
    name: 'Modern Hunter',
    quality: 'Well-Worn',
    marketPrice: 23.32,
    avgPrice: 24.95
}, {
    type: 'Nova',
    name: 'Modern Hunter',
    quality: 'Battle-Scarred',
    marketPrice: 21.04,
    avgPrice: 14.96
}, {
    type: 'Nova',
    name: 'Moon in Libra',
    quality: 'Factory New',
    marketPrice: 0.20,
    avgPrice: 0.21
}, {
    type: 'Nova',
    name: 'Moon in Libra',
    quality: 'Minimal Wear',
    marketPrice: 0.19,
    avgPrice: 0.17
}, {
    type: 'Nova',
    name: 'Moon in Libra',
    quality: 'Field-Tested',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'Nova',
    name: 'Moon in Libra',
    quality: 'Well-Worn',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'Nova',
    name: 'Moon in Libra',
    quality: 'Battle-Scarred',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'Nova',
    name: 'Polar Mesh',
    quality: 'Factory New',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Nova',
    name: 'Polar Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Polar Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Polar Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Polar Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Nova',
    name: 'Polar Mesh',
    quality: 'Factory New',
    marketPrice: 3.08,
    avgPrice: 2.97
}, {
    type: 'Souvenir Nova',
    name: 'Polar Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.29
}, {
    type: 'Souvenir Nova',
    name: 'Polar Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.18,
    avgPrice: 0.16
}, {
    type: 'Souvenir Nova',
    name: 'Polar Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.19
}, {
    type: 'Souvenir Nova',
    name: 'Polar Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.17
}, {
    type: 'Nova',
    name: 'Predator',
    quality: 'Factory New',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'Nova',
    name: 'Predator',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Predator',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Predator',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Predator',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Nova',
    name: 'Predator',
    quality: 'Factory New',
    marketPrice: 4.08,
    avgPrice: 2.27
}, {
    type: 'Souvenir Nova',
    name: 'Predator',
    quality: 'Minimal Wear',
    marketPrice: 0.31,
    avgPrice: 0.31
}, {
    type: 'Souvenir Nova',
    name: 'Predator',
    quality: 'Field-Tested',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'Souvenir Nova',
    name: 'Predator',
    quality: 'Well-Worn',
    marketPrice: 0.25,
    avgPrice: 0.22
}, {
    type: 'Souvenir Nova',
    name: 'Predator',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'Nova',
    name: 'Ranger',
    quality: 'Factory New',
    marketPrice: 0.19,
    avgPrice: 0.18
}, {
    type: 'Nova',
    name: 'Ranger',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Nova',
    name: 'Ranger',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Nova',
    name: 'Ranger',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Nova',
    name: 'Ranger',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ranger',
    quality: 'Factory New',
    marketPrice: 1.18,
    avgPrice: 1.07
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ranger',
    quality: 'Minimal Wear',
    marketPrice: 0.41,
    avgPrice: 0.37
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ranger',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.24
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ranger',
    quality: 'Well-Worn',
    marketPrice: 0.21,
    avgPrice: 0.23
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Ranger',
    quality: 'Battle-Scarred',
    marketPrice: 0.26,
    avgPrice: 0.22
}, {
    type: 'Nova',
    name: 'Rising Skull',
    quality: 'Factory New',
    marketPrice: 1.53,
    avgPrice: 1.40
}, {
    type: 'Nova',
    name: 'Rising Skull',
    quality: 'Minimal Wear',
    marketPrice: 1.15,
    avgPrice: 0.99
}, {
    type: 'Nova',
    name: 'Rising Skull',
    quality: 'Field-Tested',
    marketPrice: 0.88,
    avgPrice: 0.87
}, {
    type: 'Nova',
    name: 'Rising Skull',
    quality: 'Well-Worn',
    marketPrice: 1.15,
    avgPrice: 0.93
}, {
    type: 'Nova',
    name: 'Rising Skull',
    quality: 'Battle-Scarred',
    marketPrice: 1.07,
    avgPrice: 1.02
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Rising Skull',
    quality: 'Factory New',
    marketPrice: 5.56,
    avgPrice: 5.41
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Rising Skull',
    quality: 'Minimal Wear',
    marketPrice: 4.06,
    avgPrice: 3.25
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Rising Skull',
    quality: 'Field-Tested',
    marketPrice: 2.22,
    avgPrice: 1.95
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Rising Skull',
    quality: 'Well-Worn',
    marketPrice: 2.85,
    avgPrice: 2.65
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Rising Skull',
    quality: 'Battle-Scarred',
    marketPrice: 2.13,
    avgPrice: 2.05
}, {
    type: 'Nova',
    name: 'Sand Dune',
    quality: 'Factory New',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Nova',
    name: 'Sand Dune',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Sand Dune',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Sand Dune',
    quality: 'Well-Worn',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'Nova',
    name: 'Sand Dune',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Nova',
    name: 'Sand Dune',
    quality: 'Factory New',
    marketPrice: 234.84,
    avgPrice: 39.49
}, {
    type: 'Souvenir Nova',
    name: 'Sand Dune',
    quality: 'Minimal Wear',
    marketPrice: 6.55,
    avgPrice: 13.93
}, {
    type: 'Souvenir Nova',
    name: 'Sand Dune',
    quality: 'Field-Tested',
    marketPrice: 0.92,
    avgPrice: 0.74
}, {
    type: 'Souvenir Nova',
    name: 'Sand Dune',
    quality: 'Well-Worn',
    marketPrice: 3.03,
    avgPrice: 3.34
}, {
    type: 'Souvenir Nova',
    name: 'Sand Dune',
    quality: 'Battle-Scarred',
    marketPrice: 1.01,
    avgPrice: 1.33
}, {
    type: 'Nova',
    name: 'Tempest',
    quality: 'Factory New',
    marketPrice: 3.00,
    avgPrice: 3.16
}, {
    type: 'Nova',
    name: 'Tempest',
    quality: 'Minimal Wear',
    marketPrice: 0.82,
    avgPrice: 0.75
}, {
    type: 'Nova',
    name: 'Tempest',
    quality: 'Field-Tested',
    marketPrice: 0.73,
    avgPrice: 0.65
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Tempest',
    quality: 'Factory New',
    marketPrice: 16.62,
    avgPrice: 14.80
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Tempest',
    quality: 'Minimal Wear',
    marketPrice: 2.07,
    avgPrice: 1.93
}, {
    type: 'Nova',
    statTrak: true,
    name: 'Tempest',
    quality: 'Field-Tested',
    marketPrice: 1.67,
    avgPrice: 1.45
}, {
    type: 'Nova',
    name: 'Walnut',
    quality: 'Factory New',
    marketPrice: 2.84,
    avgPrice: 2.42
}, {
    type: 'Nova',
    name: 'Walnut',
    quality: 'Minimal Wear',
    marketPrice: 0.40,
    avgPrice: 0.39
}, {
    type: 'Nova',
    name: 'Walnut',
    quality: 'Field-Tested',
    marketPrice: 0.21,
    avgPrice: 0.18
}, {
    type: 'Nova',
    name: 'Walnut',
    quality: 'Well-Worn',
    marketPrice: 0.29,
    avgPrice: 0.27
}, {
    type: 'Nova',
    name: 'Walnut',
    quality: 'Battle-Scarred',
    marketPrice: 0.19,
    avgPrice: 0.21
}, {
    type: 'Souvenir Nova',
    name: 'Walnut',
    quality: 'Factory New',
    marketPrice: 4.94,
    avgPrice: 3.85
}, {
    type: 'Souvenir Nova',
    name: 'Walnut',
    quality: 'Minimal Wear',
    marketPrice: 0.57,
    avgPrice: 0.60
}, {
    type: 'Souvenir Nova',
    name: 'Walnut',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'Souvenir Nova',
    name: 'Walnut',
    quality: 'Well-Worn',
    marketPrice: 0.42,
    avgPrice: 0.40
}, {
    type: 'Souvenir Nova',
    name: 'Walnut',
    quality: 'Battle-Scarred',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'P2000',
    name: 'Amber Fade',
    quality: 'Factory New',
    marketPrice: 1.00,
    avgPrice: 0.85
}, {
    type: 'P2000',
    name: 'Amber Fade',
    quality: 'Minimal Wear',
    marketPrice: 0.39,
    avgPrice: 0.36
}, {
    type: 'P2000',
    name: 'Amber Fade',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.28
}, {
    type: 'P2000',
    name: 'Amber Fade',
    quality: 'Well-Worn',
    marketPrice: 0.39,
    avgPrice: 0.39
}, {
    type: 'Souvenir P2000',
    name: 'Amber Fade',
    quality: 'Factory New',
    marketPrice: 16.40,
    avgPrice: 16.27
}, {
    type: 'Souvenir P2000',
    name: 'Amber Fade',
    quality: 'Minimal Wear',
    marketPrice: 8.88,
    avgPrice: 9.35
}, {
    type: 'Souvenir P2000',
    name: 'Amber Fade',
    quality: 'Field-Tested',
    marketPrice: 5.56,
    avgPrice: 5.77
}, {
    type: 'Souvenir P2000',
    name: 'Amber Fade',
    quality: 'Well-Worn',
    marketPrice: 31.70,
    avgPrice: 30.41
}, {
    type: 'P2000',
    name: 'Chainmail',
    quality: 'Factory New',
    marketPrice: 2.72,
    avgPrice: 2.47
}, {
    type: 'P2000',
    name: 'Chainmail',
    quality: 'Minimal Wear',
    marketPrice: 2.23,
    avgPrice: 2.30
}, {
    type: 'P2000',
    name: 'Chainmail',
    quality: 'Field-Tested',
    marketPrice: 2.35,
    avgPrice: 2.30
}, {
    type: 'Souvenir P2000',
    name: 'Chainmail',
    quality: 'Factory New',
    marketPrice: 5.02,
    avgPrice: 4.76
}, {
    type: 'Souvenir P2000',
    name: 'Chainmail',
    quality: 'Minimal Wear',
    marketPrice: 3.06,
    avgPrice: 3.36
}, {
    type: 'Souvenir P2000',
    name: 'Chainmail',
    quality: 'Field-Tested',
    marketPrice: 3.42,
    avgPrice: 3.08
}, {
    type: 'P2000',
    name: 'Coach Class',
    quality: 'Factory New',
    marketPrice: 2.01,
    avgPrice: 3.79
}, {
    type: 'P2000',
    name: 'Coach Class',
    quality: 'Minimal Wear',
    marketPrice: 0.99,
    avgPrice: 0.76
}, {
    type: 'P2000',
    name: 'Coach Class',
    quality: 'Field-Tested',
    marketPrice: 0.41,
    avgPrice: 0.34
}, {
    type: 'P2000',
    name: 'Coach Class',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.42
}, {
    type: 'P2000',
    name: 'Coach Class',
    quality: 'Battle-Scarred',
    marketPrice: 0.53,
    avgPrice: 0.57
}, {
    type: 'P2000',
    name: 'Corticera',
    quality: 'Factory New',
    marketPrice: 3.83,
    avgPrice: 3.64
}, {
    type: 'P2000',
    name: 'Corticera',
    quality: 'Minimal Wear',
    marketPrice: 1.95,
    avgPrice: 1.92
}, {
    type: 'P2000',
    name: 'Corticera',
    quality: 'Field-Tested',
    marketPrice: 1.84,
    avgPrice: 1.86
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Corticera',
    quality: 'Factory New',
    marketPrice: 20.58,
    avgPrice: 19.22
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Corticera',
    quality: 'Minimal Wear',
    marketPrice: 8.00,
    avgPrice: 8.22
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Corticera',
    quality: 'Field-Tested',
    marketPrice: 6.11,
    avgPrice: 5.65
}, {
    type: 'P2000',
    name: 'Fire Elemental',
    quality: 'Factory New',
    marketPrice: 11.46,
    avgPrice: 10.64
}, {
    type: 'P2000',
    name: 'Fire Elemental',
    quality: 'Minimal Wear',
    marketPrice: 7.32,
    avgPrice: 6.93
}, {
    type: 'P2000',
    name: 'Fire Elemental',
    quality: 'Field-Tested',
    marketPrice: 5.59,
    avgPrice: 5.69
}, {
    type: 'P2000',
    name: 'Fire Elemental',
    quality: 'Well-Worn',
    marketPrice: 6.00,
    avgPrice: 5.83
}, {
    type: 'P2000',
    name: 'Fire Elemental',
    quality: 'Battle-Scarred',
    marketPrice: 5.61,
    avgPrice: 5.34
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Fire Elemental',
    quality: 'Factory New',
    marketPrice: 102.00,
    avgPrice: 101.18
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Fire Elemental',
    quality: 'Minimal Wear',
    marketPrice: 53.27,
    avgPrice: 50.55
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Fire Elemental',
    quality: 'Field-Tested',
    marketPrice: 29.86,
    avgPrice: 28.80
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Fire Elemental',
    quality: 'Well-Worn',
    marketPrice: 31.62,
    avgPrice: 28.01
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Fire Elemental',
    quality: 'Battle-Scarred',
    marketPrice: 31.92,
    avgPrice: 28.20
}, {
    type: 'P2000',
    name: 'Granite Marbleized',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'P2000',
    name: 'Granite Marbleized',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'P2000',
    name: 'Granite Marbleized',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'P2000',
    name: 'Granite Marbleized',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'P2000',
    name: 'Granite Marbleized',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Souvenir P2000',
    name: 'Granite Marbleized',
    quality: 'Minimal Wear',
    marketPrice: 8.29,
    avgPrice: 11.46
}, {
    type: 'Souvenir P2000',
    name: 'Granite Marbleized',
    quality: 'Field-Tested',
    marketPrice: 6.90,
    avgPrice: 16.47
}, {
    type: 'Souvenir P2000',
    name: 'Granite Marbleized',
    quality: 'Well-Worn',
    marketPrice: 418.26,
    avgPrice: 10.79
}, {
    type: 'Souvenir P2000',
    name: 'Granite Marbleized',
    quality: 'Battle-Scarred',
    marketPrice: 7.77,
    avgPrice: 7.65
}, {
    type: 'P2000',
    name: 'Grassland',
    quality: 'Factory New',
    marketPrice: 1.90,
    avgPrice: 5.88
}, {
    type: 'P2000',
    name: 'Grassland',
    quality: 'Minimal Wear',
    marketPrice: 0.19,
    avgPrice: 0.21
}, {
    type: 'P2000',
    name: 'Grassland',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'P2000',
    name: 'Grassland',
    quality: 'Well-Worn',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'P2000',
    name: 'Grassland',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Souvenir P2000',
    name: 'Grassland',
    quality: 'Factory New',
    marketPrice: 24.00,
    avgPrice: 16.81
}, {
    type: 'Souvenir P2000',
    name: 'Grassland',
    quality: 'Minimal Wear',
    marketPrice: 2.23,
    avgPrice: 1.85
}, {
    type: 'Souvenir P2000',
    name: 'Grassland',
    quality: 'Field-Tested',
    marketPrice: 0.83,
    avgPrice: 0.87
}, {
    type: 'Souvenir P2000',
    name: 'Grassland',
    quality: 'Well-Worn',
    marketPrice: 1.26,
    avgPrice: 1.12
}, {
    type: 'Souvenir P2000',
    name: 'Grassland',
    quality: 'Battle-Scarred',
    marketPrice: 0.95,
    avgPrice: 1.00
}, {
    type: 'P2000',
    name: 'Grassland Leaves',
    quality: 'Factory New',
    marketPrice: 36.92,
    avgPrice: 16.23
}, {
    type: 'P2000',
    name: 'Grassland Leaves',
    quality: 'Minimal Wear',
    marketPrice: 2.50,
    avgPrice: 2.69
}, {
    type: 'P2000',
    name: 'Grassland Leaves',
    quality: 'Field-Tested',
    marketPrice: 0.59,
    avgPrice: 0.57
}, {
    type: 'P2000',
    name: 'Grassland Leaves',
    quality: 'Well-Worn',
    marketPrice: 0.78,
    avgPrice: 0.79
}, {
    type: 'P2000',
    name: 'Grassland Leaves',
    quality: 'Battle-Scarred',
    marketPrice: 2.50,
    avgPrice: 1.74
}, {
    type: 'P2000',
    name: 'Handgun',
    quality: 'Factory New',
    marketPrice: 1.63,
    avgPrice: 1.55
}, {
    type: 'P2000',
    name: 'Handgun',
    quality: 'Minimal Wear',
    marketPrice: 0.38,
    avgPrice: 0.34
}, {
    type: 'P2000',
    name: 'Handgun',
    quality: 'Field-Tested',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'P2000',
    name: 'Handgun',
    quality: 'Well-Worn',
    marketPrice: 0.29,
    avgPrice: 0.27
}, {
    type: 'P2000',
    name: 'Handgun',
    quality: 'Battle-Scarred',
    marketPrice: 0.29,
    avgPrice: 0.26
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Handgun',
    quality: 'Factory New',
    marketPrice: 7.73,
    avgPrice: 8.00
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Handgun',
    quality: 'Minimal Wear',
    marketPrice: 2.44,
    avgPrice: 2.20
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Handgun',
    quality: 'Field-Tested',
    marketPrice: 1.17,
    avgPrice: 1.10
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Handgun',
    quality: 'Well-Worn',
    marketPrice: 0.98,
    avgPrice: 0.93
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Handgun',
    quality: 'Battle-Scarred',
    marketPrice: 0.93,
    avgPrice: 0.83
}, {
    type: 'P2000',
    name: 'Imperial',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'P2000',
    name: 'Imperial',
    quality: 'Minimal Wear',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'P2000',
    name: 'Imperial',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Imperial',
    quality: 'Factory New',
    marketPrice: 1.30,
    avgPrice: 1.27
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Imperial',
    quality: 'Minimal Wear',
    marketPrice: 0.92,
    avgPrice: 0.89
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Imperial',
    quality: 'Field-Tested',
    marketPrice: 0.73,
    avgPrice: 0.66
}, {
    type: 'P2000',
    name: 'Imperial Dragon',
    quality: 'Factory New',
    marketPrice: 5.57,
    avgPrice: 6.95
}, {
    type: 'P2000',
    name: 'Imperial Dragon',
    quality: 'Minimal Wear',
    marketPrice: 5.08,
    avgPrice: 4.56
}, {
    type: 'P2000',
    name: 'Imperial Dragon',
    quality: 'Field-Tested',
    marketPrice: 3.45,
    avgPrice: 3.43
}, {
    type: 'P2000',
    name: 'Imperial Dragon',
    quality: 'Well-Worn',
    marketPrice: 3.86,
    avgPrice: 3.75
}, {
    type: 'P2000',
    name: 'Imperial Dragon',
    quality: 'Battle-Scarred',
    marketPrice: 4.19,
    avgPrice: 4.16
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Imperial Dragon',
    quality: 'Factory New',
    marketPrice: 35.43,
    avgPrice: 30.83
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Imperial Dragon',
    quality: 'Minimal Wear',
    marketPrice: 19.92,
    avgPrice: 21.12
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Imperial Dragon',
    quality: 'Field-Tested',
    marketPrice: 13.12,
    avgPrice: 13.83
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Imperial Dragon',
    quality: 'Well-Worn',
    marketPrice: 16.85,
    avgPrice: 16.02
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Imperial Dragon',
    quality: 'Battle-Scarred',
    marketPrice: 15.20,
    avgPrice: 18.19
}, {
    type: 'P2000',
    name: 'Ivory',
    quality: 'Factory New',
    marketPrice: 0.19,
    avgPrice: 0.17
}, {
    type: 'P2000',
    name: 'Ivory',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'P2000',
    name: 'Ivory',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'P2000',
    name: 'Ivory',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'P2000',
    name: 'Ivory',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Ivory',
    quality: 'Factory New',
    marketPrice: 1.05,
    avgPrice: 1.01
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Ivory',
    quality: 'Minimal Wear',
    marketPrice: 0.29,
    avgPrice: 0.26
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Ivory',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Ivory',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Ivory',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.22
}, {
    type: 'P2000',
    name: 'Ocean Foam',
    quality: 'Factory New',
    marketPrice: 28.10,
    avgPrice: 28.48
}, {
    type: 'P2000',
    name: 'Ocean Foam',
    quality: 'Minimal Wear',
    marketPrice: 32.66,
    avgPrice: 27.89
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Ocean Foam',
    quality: 'Factory New',
    marketPrice: 154.36,
    avgPrice: 159.05
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Ocean Foam',
    quality: 'Minimal Wear',
    marketPrice: 167.29,
    avgPrice: 153.83
}, {
    type: 'P2000',
    name: 'Oceanic',
    quality: 'Factory New',
    marketPrice: 0.30,
    avgPrice: 0.27
}, {
    type: 'P2000',
    name: 'Oceanic',
    quality: 'Minimal Wear',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'P2000',
    name: 'Oceanic',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'P2000',
    name: 'Oceanic',
    quality: 'Well-Worn',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'P2000',
    name: 'Oceanic',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Oceanic',
    quality: 'Factory New',
    marketPrice: 1.80,
    avgPrice: 2.05
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Oceanic',
    quality: 'Minimal Wear',
    marketPrice: 1.24,
    avgPrice: 1.16
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Oceanic',
    quality: 'Field-Tested',
    marketPrice: 0.52,
    avgPrice: 0.49
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Oceanic',
    quality: 'Well-Worn',
    marketPrice: 0.86,
    avgPrice: 0.76
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Oceanic',
    quality: 'Battle-Scarred',
    marketPrice: 0.49,
    avgPrice: 0.41
}, {
    type: 'P2000',
    name: 'Pathfinder',
    quality: 'Factory New',
    marketPrice: 0.64,
    avgPrice: 0.50
}, {
    type: 'P2000',
    name: 'Pathfinder',
    quality: 'Minimal Wear',
    marketPrice: 0.50,
    avgPrice: 0.43
}, {
    type: 'P2000',
    name: 'Pathfinder',
    quality: 'Field-Tested',
    marketPrice: 0.42,
    avgPrice: 0.42
}, {
    type: 'P2000',
    name: 'Pulse',
    quality: 'Factory New',
    marketPrice: 0.28,
    avgPrice: 0.27
}, {
    type: 'P2000',
    name: 'Pulse',
    quality: 'Minimal Wear',
    marketPrice: 0.18,
    avgPrice: 0.16
}, {
    type: 'P2000',
    name: 'Pulse',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'P2000',
    name: 'Pulse',
    quality: 'Well-Worn',
    marketPrice: 0.29,
    avgPrice: 0.26
}, {
    type: 'P2000',
    name: 'Pulse',
    quality: 'Battle-Scarred',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Pulse',
    quality: 'Factory New',
    marketPrice: 1.26,
    avgPrice: 1.29
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Pulse',
    quality: 'Minimal Wear',
    marketPrice: 0.61,
    avgPrice: 0.65
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Pulse',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.31
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Pulse',
    quality: 'Well-Worn',
    marketPrice: 0.54,
    avgPrice: 0.58
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Pulse',
    quality: 'Battle-Scarred',
    marketPrice: 0.36,
    avgPrice: 0.34
}, {
    type: 'P2000',
    name: 'Red FragCam',
    quality: 'Factory New',
    marketPrice: 0.46,
    avgPrice: 0.43
}, {
    type: 'P2000',
    name: 'Red FragCam',
    quality: 'Minimal Wear',
    marketPrice: 0.21,
    avgPrice: 0.19
}, {
    type: 'P2000',
    name: 'Red FragCam',
    quality: 'Field-Tested',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'P2000',
    name: 'Red FragCam',
    quality: 'Well-Worn',
    marketPrice: 0.42,
    avgPrice: 0.38
}, {
    type: 'P2000',
    name: 'Red FragCam',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.22
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Red FragCam',
    quality: 'Factory New',
    marketPrice: 2.91,
    avgPrice: 2.91
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Red FragCam',
    quality: 'Minimal Wear',
    marketPrice: 0.88,
    avgPrice: 0.93
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Red FragCam',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.44
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Red FragCam',
    quality: 'Well-Worn',
    marketPrice: 0.74,
    avgPrice: 0.70
}, {
    type: 'P2000',
    statTrak: true,
    name: 'Red FragCam',
    quality: 'Battle-Scarred',
    marketPrice: 0.52,
    avgPrice: 0.49
}, {
    type: 'P2000',
    name: 'Scorpion',
    quality: 'Factory New',
    marketPrice: 1.42,
    avgPrice: 1.27
}, {
    type: 'P2000',
    name: 'Scorpion',
    quality: 'Minimal Wear',
    marketPrice: 4.00,
    avgPrice: 4.36
}, {
    type: 'P2000',
    name: 'Silver',
    quality: 'Factory New',
    marketPrice: 1.03,
    avgPrice: 0.85
}, {
    type: 'P2000',
    name: 'Silver',
    quality: 'Minimal Wear',
    marketPrice: 4.85,
    avgPrice: 4.17
}, {
    type: 'P250',
    name: 'Asiimov',
    quality: 'Minimal Wear',
    marketPrice: 26.65,
    avgPrice: 24.33
}, {
    type: 'P250',
    name: 'Asiimov',
    quality: 'Field-Tested',
    marketPrice: 6.39,
    avgPrice: 5.95
}, {
    type: 'P250',
    name: 'Asiimov',
    quality: 'Well-Worn',
    marketPrice: 5.87,
    avgPrice: 5.31
}, {
    type: 'P250',
    name: 'Asiimov',
    quality: 'Battle-Scarred',
    marketPrice: 2.69,
    avgPrice: 2.58
}, {
    type: 'P250',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Minimal Wear',
    marketPrice: 107.80,
    avgPrice: 100.36
}, {
    type: 'P250',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Field-Tested',
    marketPrice: 21.67,
    avgPrice: 23.11
}, {
    type: 'P250',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Well-Worn',
    marketPrice: 21.32,
    avgPrice: 19.07
}, {
    type: 'P250',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Battle-Scarred',
    marketPrice: 8.83,
    avgPrice: 8.66
}, {
    type: 'P250',
    name: 'Bone Mask',
    quality: 'Factory New',
    marketPrice: 9.31,
    avgPrice: 8.36
}, {
    type: 'P250',
    name: 'Bone Mask',
    quality: 'Minimal Wear',
    marketPrice: 0.26,
    avgPrice: 0.18
}, {
    type: 'P250',
    name: 'Bone Mask',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'P250',
    name: 'Bone Mask',
    quality: 'Well-Worn',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'P250',
    name: 'Bone Mask',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Souvenir P250',
    name: 'Bone Mask',
    quality: 'Factory New',
    marketPrice: 5.10,
    avgPrice: 5.34
}, {
    type: 'Souvenir P250',
    name: 'Bone Mask',
    quality: 'Minimal Wear',
    marketPrice: 0.62,
    avgPrice: 0.67
}, {
    type: 'Souvenir P250',
    name: 'Bone Mask',
    quality: 'Field-Tested',
    marketPrice: 0.39,
    avgPrice: 0.33
}, {
    type: 'Souvenir P250',
    name: 'Bone Mask',
    quality: 'Well-Worn',
    marketPrice: 0.37,
    avgPrice: 0.37
}, {
    type: 'Souvenir P250',
    name: 'Bone Mask',
    quality: 'Battle-Scarred',
    marketPrice: 0.38,
    avgPrice: 0.37
}, {
    type: 'P250',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 0.11,
    avgPrice: 0.12
}, {
    type: 'P250',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'P250',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'P250',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'P250',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir P250',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 2.87,
    avgPrice: 4.15
}, {
    type: 'Souvenir P250',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 1.08,
    avgPrice: 1.00
}, {
    type: 'Souvenir P250',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 2.50,
    avgPrice: 2.97
}, {
    type: 'Souvenir P250',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 5.45,
    avgPrice: 8.51
}, {
    type: 'P250',
    name: 'Cartel',
    quality: 'Factory New',
    marketPrice: 7.15,
    avgPrice: 5.69
}, {
    type: 'P250',
    name: 'Cartel',
    quality: 'Minimal Wear',
    marketPrice: 2.47,
    avgPrice: 2.36
}, {
    type: 'P250',
    name: 'Cartel',
    quality: 'Field-Tested',
    marketPrice: 1.75,
    avgPrice: 1.80
}, {
    type: 'P250',
    name: 'Cartel',
    quality: 'Well-Worn',
    marketPrice: 2.14,
    avgPrice: 2.09
}, {
    type: 'P250',
    name: 'Cartel',
    quality: 'Battle-Scarred',
    marketPrice: 2.00,
    avgPrice: 1.76
}, {
    type: 'P250',
    statTrak: true,
    name: 'Cartel',
    quality: 'Factory New',
    marketPrice: 32.20,
    avgPrice: 31.23
}, {
    type: 'P250',
    statTrak: true,
    name: 'Cartel',
    quality: 'Minimal Wear',
    marketPrice: 10.61,
    avgPrice: 9.28
}, {
    type: 'P250',
    statTrak: true,
    name: 'Cartel',
    quality: 'Field-Tested',
    marketPrice: 7.60,
    avgPrice: 6.10
}, {
    type: 'P250',
    statTrak: true,
    name: 'Cartel',
    quality: 'Well-Worn',
    marketPrice: 5.99,
    avgPrice: 6.31
}, {
    type: 'P250',
    statTrak: true,
    name: 'Cartel',
    quality: 'Battle-Scarred',
    marketPrice: 5.87,
    avgPrice: 5.81
}, {
    type: 'P250',
    name: 'Contamination',
    quality: 'Factory New',
    marketPrice: 0.53,
    avgPrice: 0.43
}, {
    type: 'P250',
    name: 'Contamination',
    quality: 'Minimal Wear',
    marketPrice: 0.18,
    avgPrice: 0.18
}, {
    type: 'P250',
    name: 'Contamination',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'P250',
    name: 'Contamination',
    quality: 'Well-Worn',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'P250',
    name: 'Contamination',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Souvenir P250',
    name: 'Contamination',
    quality: 'Factory New',
    marketPrice: 4.99,
    avgPrice: 5.21
}, {
    type: 'Souvenir P250',
    name: 'Contamination',
    quality: 'Minimal Wear',
    marketPrice: 1.09,
    avgPrice: 1.14
}, {
    type: 'Souvenir P250',
    name: 'Contamination',
    quality: 'Field-Tested',
    marketPrice: 0.46,
    avgPrice: 0.44
}, {
    type: 'Souvenir P250',
    name: 'Contamination',
    quality: 'Well-Worn',
    marketPrice: 1.03,
    avgPrice: 0.95
}, {
    type: 'Souvenir P250',
    name: 'Contamination',
    quality: 'Battle-Scarred',
    marketPrice: 0.43,
    avgPrice: 0.47
}, {
    type: 'P250',
    name: 'Crimson Kimono',
    quality: 'Factory New',
    marketPrice: 0.74,
    avgPrice: 0.68
}, {
    type: 'P250',
    name: 'Crimson Kimono',
    quality: 'Minimal Wear',
    marketPrice: 0.31,
    avgPrice: 0.26
}, {
    type: 'P250',
    name: 'Crimson Kimono',
    quality: 'Field-Tested',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'P250',
    name: 'Crimson Kimono',
    quality: 'Well-Worn',
    marketPrice: 0.20,
    avgPrice: 0.18
}, {
    type: 'P250',
    name: 'Crimson Kimono',
    quality: 'Battle-Scarred',
    marketPrice: 0.15,
    avgPrice: 0.13
}, {
    type: 'P250',
    name: 'Facets',
    quality: 'Factory New',
    marketPrice: 13.45,
    avgPrice: 12.90
}, {
    type: 'P250',
    name: 'Facets',
    quality: 'Minimal Wear',
    marketPrice: 1.50,
    avgPrice: 1.44
}, {
    type: 'P250',
    name: 'Facets',
    quality: 'Field-Tested',
    marketPrice: 0.49,
    avgPrice: 0.53
}, {
    type: 'P250',
    name: 'Facets',
    quality: 'Well-Worn',
    marketPrice: 0.64,
    avgPrice: 0.75
}, {
    type: 'P250',
    name: 'Facets',
    quality: 'Battle-Scarred',
    marketPrice: 0.78,
    avgPrice: 0.63
}, {
    type: 'P250',
    name: 'Franklin',
    quality: 'Factory New',
    marketPrice: 1.18,
    avgPrice: 1.11
}, {
    type: 'P250',
    name: 'Franklin',
    quality: 'Minimal Wear',
    marketPrice: 0.85,
    avgPrice: 0.73
}, {
    type: 'P250',
    name: 'Franklin',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.56
}, {
    type: 'P250',
    name: 'Franklin',
    quality: 'Well-Worn',
    marketPrice: 0.76,
    avgPrice: 0.71
}, {
    type: 'P250',
    name: 'Gunsmoke',
    quality: 'Factory New',
    marketPrice: 8.87,
    avgPrice: 8.84
}, {
    type: 'P250',
    name: 'Gunsmoke',
    quality: 'Minimal Wear',
    marketPrice: 0.76,
    avgPrice: 0.70
}, {
    type: 'P250',
    name: 'Gunsmoke',
    quality: 'Field-Tested',
    marketPrice: 0.17,
    avgPrice: 0.17
}, {
    type: 'P250',
    name: 'Gunsmoke',
    quality: 'Well-Worn',
    marketPrice: 0.36,
    avgPrice: 0.35
}, {
    type: 'P250',
    name: 'Gunsmoke',
    quality: 'Battle-Scarred',
    marketPrice: 0.28,
    avgPrice: 0.26
}, {
    type: 'Souvenir P250',
    name: 'Gunsmoke',
    quality: 'Factory New',
    marketPrice: 37.21,
    avgPrice: 33.67
}, {
    type: 'Souvenir P250',
    name: 'Gunsmoke',
    quality: 'Minimal Wear',
    marketPrice: 2.49,
    avgPrice: 2.82
}, {
    type: 'Souvenir P250',
    name: 'Gunsmoke',
    quality: 'Field-Tested',
    marketPrice: 1.09,
    avgPrice: 0.85
}, {
    type: 'Souvenir P250',
    name: 'Gunsmoke',
    quality: 'Well-Worn',
    marketPrice: 1.23,
    avgPrice: 1.10
}, {
    type: 'Souvenir P250',
    name: 'Gunsmoke',
    quality: 'Battle-Scarred',
    marketPrice: 0.58,
    avgPrice: 0.61
}, {
    type: 'P250',
    name: 'Hive',
    quality: 'Factory New',
    marketPrice: 1.23,
    avgPrice: 1.07
}, {
    type: 'P250',
    name: 'Hive',
    quality: 'Minimal Wear',
    marketPrice: 0.96,
    avgPrice: 0.76
}, {
    type: 'P250',
    name: 'Hive',
    quality: 'Field-Tested',
    marketPrice: 0.80,
    avgPrice: 0.74
}, {
    type: 'P250',
    statTrak: true,
    name: 'Hive',
    quality: 'Factory New',
    marketPrice: 3.49,
    avgPrice: 3.61
}, {
    type: 'P250',
    statTrak: true,
    name: 'Hive',
    quality: 'Minimal Wear',
    marketPrice: 1.97,
    avgPrice: 1.93
}, {
    type: 'P250',
    statTrak: true,
    name: 'Hive',
    quality: 'Field-Tested',
    marketPrice: 1.98,
    avgPrice: 1.53
}, {
    type: 'P250',
    name: 'Iron Clad',
    quality: 'Factory New',
    marketPrice: 0.76,
    avgPrice: 0.74
}, {
    type: 'P250',
    name: 'Iron Clad',
    quality: 'Minimal Wear',
    marketPrice: 0.28,
    avgPrice: 0.28
}, {
    type: 'P250',
    name: 'Iron Clad',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.20
}, {
    type: 'P250',
    name: 'Iron Clad',
    quality: 'Well-Worn',
    marketPrice: 0.21,
    avgPrice: 0.20
}, {
    type: 'P250',
    name: 'Iron Clad',
    quality: 'Battle-Scarred',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'P250',
    statTrak: true,
    name: 'Iron Clad',
    quality: 'Factory New',
    marketPrice: 5.34,
    avgPrice: 5.45
}, {
    type: 'P250',
    statTrak: true,
    name: 'Iron Clad',
    quality: 'Minimal Wear',
    marketPrice: 1.03,
    avgPrice: 0.98
}, {
    type: 'P250',
    statTrak: true,
    name: 'Iron Clad',
    quality: 'Field-Tested',
    marketPrice: 0.62,
    avgPrice: 0.58
}, {
    type: 'P250',
    statTrak: true,
    name: 'Iron Clad',
    quality: 'Well-Worn',
    marketPrice: 0.64,
    avgPrice: 0.66
}, {
    type: 'P250',
    statTrak: true,
    name: 'Iron Clad',
    quality: 'Battle-Scarred',
    marketPrice: 0.59,
    avgPrice: 0.55
}, {
    type: 'P250',
    name: 'Mehndi',
    quality: 'Factory New',
    marketPrice: 7.65,
    avgPrice: 7.53
}, {
    type: 'P250',
    name: 'Mehndi',
    quality: 'Minimal Wear',
    marketPrice: 3.84,
    avgPrice: 3.75
}, {
    type: 'P250',
    name: 'Mehndi',
    quality: 'Field-Tested',
    marketPrice: 3.59,
    avgPrice: 3.29
}, {
    type: 'P250',
    name: 'Mehndi',
    quality: 'Well-Worn',
    marketPrice: 3.33,
    avgPrice: 2.99
}, {
    type: 'P250',
    name: 'Mehndi',
    quality: 'Battle-Scarred',
    marketPrice: 3.16,
    avgPrice: 2.93
}, {
    type: 'P250',
    statTrak: true,
    name: 'Mehndi',
    quality: 'Factory New',
    marketPrice: 58.61,
    avgPrice: 55.79
}, {
    type: 'P250',
    statTrak: true,
    name: 'Mehndi',
    quality: 'Minimal Wear',
    marketPrice: 18.72,
    avgPrice: 17.85
}, {
    type: 'P250',
    statTrak: true,
    name: 'Mehndi',
    quality: 'Field-Tested',
    marketPrice: 10.75,
    avgPrice: 11.28
}, {
    type: 'P250',
    statTrak: true,
    name: 'Mehndi',
    quality: 'Well-Worn',
    marketPrice: 9.32,
    avgPrice: 9.11
}, {
    type: 'P250',
    statTrak: true,
    name: 'Mehndi',
    quality: 'Battle-Scarred',
    marketPrice: 7.15,
    avgPrice: 7.21
}, {
    type: 'P250',
    name: 'Metallic DDPAT',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'P250',
    name: 'Metallic DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.08
}, {
    type: 'Souvenir P250',
    name: 'Metallic DDPAT',
    quality: 'Factory New',
    marketPrice: 2.18,
    avgPrice: 2.62
}, {
    type: 'Souvenir P250',
    name: 'Metallic DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 5.94,
    avgPrice: 5.69
}, {
    type: 'P250',
    name: 'Mint Kimono',
    quality: 'Factory New',
    marketPrice: 0.24,
    avgPrice: 0.22
}, {
    type: 'P250',
    name: 'Mint Kimono',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'P250',
    name: 'Mint Kimono',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'P250',
    name: 'Mint Kimono',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.05
}, {
    type: 'P250',
    name: 'Mint Kimono',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'P250',
    name: 'Modern Hunter',
    quality: 'Factory New',
    marketPrice: 427.13,
    avgPrice: 373.18
}, {
    type: 'P250',
    name: 'Modern Hunter',
    quality: 'Minimal Wear',
    marketPrice: 5.69,
    avgPrice: 5.40
}, {
    type: 'P250',
    name: 'Modern Hunter',
    quality: 'Field-Tested',
    marketPrice: 1.98,
    avgPrice: 1.85
}, {
    type: 'P250',
    name: 'Modern Hunter',
    quality: 'Well-Worn',
    marketPrice: 7.16,
    avgPrice: 6.82
}, {
    type: 'P250',
    name: 'Modern Hunter',
    quality: 'Battle-Scarred',
    marketPrice: 8.62,
    avgPrice: 5.61
}, {
    type: 'P250',
    name: 'Muertos',
    quality: 'Factory New',
    marketPrice: 2.80,
    avgPrice: 2.87
}, {
    type: 'P250',
    name: 'Muertos',
    quality: 'Minimal Wear',
    marketPrice: 1.88,
    avgPrice: 1.83
}, {
    type: 'P250',
    name: 'Muertos',
    quality: 'Field-Tested',
    marketPrice: 1.69,
    avgPrice: 1.66
}, {
    type: 'P250',
    name: 'Muertos',
    quality: 'Well-Worn',
    marketPrice: 1.84,
    avgPrice: 1.91
}, {
    type: 'P250',
    name: 'Muertos',
    quality: 'Battle-Scarred',
    marketPrice: 1.63,
    avgPrice: 1.67
}, {
    type: 'P250',
    statTrak: true,
    name: 'Muertos',
    quality: 'Factory New',
    marketPrice: 13.89,
    avgPrice: 12.38
}, {
    type: 'P250',
    statTrak: true,
    name: 'Muertos',
    quality: 'Minimal Wear',
    marketPrice: 7.60,
    avgPrice: 7.08
}, {
    type: 'P250',
    statTrak: true,
    name: 'Muertos',
    quality: 'Field-Tested',
    marketPrice: 5.83,
    avgPrice: 5.52
}, {
    type: 'P250',
    statTrak: true,
    name: 'Muertos',
    quality: 'Well-Worn',
    marketPrice: 6.33,
    avgPrice: 6.12
}, {
    type: 'P250',
    statTrak: true,
    name: 'Muertos',
    quality: 'Battle-Scarred',
    marketPrice: 5.54,
    avgPrice: 5.20
}, {
    type: 'P250',
    name: 'Nuclear Threat',
    quality: 'Factory New',
    marketPrice: 399.78,
    avgPrice: 437.50
}, {
    type: 'P250',
    name: 'Nuclear Threat',
    quality: 'Minimal Wear',
    marketPrice: 28.10,
    avgPrice: 26.59
}, {
    type: 'P250',
    name: 'Nuclear Threat',
    quality: 'Field-Tested',
    marketPrice: 4.56,
    avgPrice: 5.00
}, {
    type: 'P250',
    name: 'Nuclear Threat',
    quality: 'Well-Worn',
    marketPrice: 5.34,
    avgPrice: 4.50
}, {
    type: 'P250',
    name: 'Nuclear Threat',
    quality: 'Battle-Scarred',
    marketPrice: 3.45,
    avgPrice: 3.15
}, {
    type: 'Souvenir P250',
    name: 'Nuclear Threat',
    quality: 'Minimal Wear',
    marketPrice: 357.57,
    avgPrice: 351.44
}, {
    type: 'Souvenir P250',
    name: 'Nuclear Threat',
    quality: 'Field-Tested',
    marketPrice: 48.00,
    avgPrice: 44.84
}, {
    type: 'Souvenir P250',
    name: 'Nuclear Threat',
    quality: 'Well-Worn',
    marketPrice: 72.23,
    avgPrice: 29.90
}, {
    type: 'Souvenir P250',
    name: 'Nuclear Threat',
    quality: 'Battle-Scarred',
    marketPrice: 21.53,
    avgPrice: 19.88
}, {
    type: 'P250',
    name: 'Sand Dune',
    quality: 'Factory New',
    marketPrice: 0.25,
    avgPrice: 0.24
}, {
    type: 'P250',
    name: 'Sand Dune',
    quality: 'Minimal Wear',
    marketPrice: 0.05,
    avgPrice: 0.04
}, {
    type: 'P250',
    name: 'Sand Dune',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'P250',
    name: 'Sand Dune',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'P250',
    name: 'Sand Dune',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.04
}, {
    type: 'Souvenir P250',
    name: 'Sand Dune',
    quality: 'Factory New',
    marketPrice: 19.98,
    avgPrice: 18.20
}, {
    type: 'Souvenir P250',
    name: 'Sand Dune',
    quality: 'Minimal Wear',
    marketPrice: 1.27,
    avgPrice: 1.32
}, {
    type: 'Souvenir P250',
    name: 'Sand Dune',
    quality: 'Field-Tested',
    marketPrice: 0.40,
    avgPrice: 0.36
}, {
    type: 'Souvenir P250',
    name: 'Sand Dune',
    quality: 'Well-Worn',
    marketPrice: 0.61,
    avgPrice: 0.49
}, {
    type: 'Souvenir P250',
    name: 'Sand Dune',
    quality: 'Battle-Scarred',
    marketPrice: 0.74,
    avgPrice: 0.58
}, {
    type: 'P250',
    name: 'Splash',
    quality: 'Factory New',
    marketPrice: 14.88,
    avgPrice: 13.10
}, {
    type: 'P250',
    name: 'Splash',
    quality: 'Minimal Wear',
    marketPrice: 3.83,
    avgPrice: 3.33
}, {
    type: 'P250',
    name: 'Splash',
    quality: 'Field-Tested',
    marketPrice: 3.46,
    avgPrice: 2.94
}, {
    type: 'P250',
    statTrak: true,
    name: 'Splash',
    quality: 'Factory New',
    marketPrice: 42.44,
    avgPrice: 37.03
}, {
    type: 'P250',
    statTrak: true,
    name: 'Splash',
    quality: 'Minimal Wear',
    marketPrice: 10.50,
    avgPrice: 11.06
}, {
    type: 'P250',
    statTrak: true,
    name: 'Splash',
    quality: 'Field-Tested',
    marketPrice: 8.76,
    avgPrice: 7.60
}, {
    type: 'P250',
    name: 'Steel Disruption',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'P250',
    name: 'Steel Disruption',
    quality: 'Minimal Wear',
    marketPrice: 0.24,
    avgPrice: 0.25
}, {
    type: 'P250',
    name: 'Steel Disruption',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.28
}, {
    type: 'P250',
    statTrak: true,
    name: 'Steel Disruption',
    quality: 'Factory New',
    marketPrice: 1.20,
    avgPrice: 1.14
}, {
    type: 'P250',
    statTrak: true,
    name: 'Steel Disruption',
    quality: 'Minimal Wear',
    marketPrice: 0.94,
    avgPrice: 0.92
}, {
    type: 'P250',
    statTrak: true,
    name: 'Steel Disruption',
    quality: 'Field-Tested',
    marketPrice: 0.88,
    avgPrice: 0.87
}, {
    type: 'P250',
    name: 'Supernova',
    quality: 'Factory New',
    marketPrice: 0.58,
    avgPrice: 0.52
}, {
    type: 'P250',
    name: 'Supernova',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.32
}, {
    type: 'P250',
    name: 'Supernova',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'P250',
    name: 'Supernova',
    quality: 'Well-Worn',
    marketPrice: 0.51,
    avgPrice: 0.45
}, {
    type: 'P250',
    statTrak: true,
    name: 'Supernova',
    quality: 'Factory New',
    marketPrice: 2.42,
    avgPrice: 2.59
}, {
    type: 'P250',
    statTrak: true,
    name: 'Supernova',
    quality: 'Minimal Wear',
    marketPrice: 1.70,
    avgPrice: 1.57
}, {
    type: 'P250',
    statTrak: true,
    name: 'Supernova',
    quality: 'Field-Tested',
    marketPrice: 1.10,
    avgPrice: 1.04
}, {
    type: 'P250',
    statTrak: true,
    name: 'Supernova',
    quality: 'Well-Worn',
    marketPrice: 1.51,
    avgPrice: 1.54
}, {
    type: 'P250',
    name: 'Undertow',
    quality: 'Factory New',
    marketPrice: 3.61,
    avgPrice: 3.43
}, {
    type: 'P250',
    name: 'Undertow',
    quality: 'Minimal Wear',
    marketPrice: 3.29,
    avgPrice: 3.10
}, {
    type: 'P250',
    name: 'Undertow',
    quality: 'Field-Tested',
    marketPrice: 3.33,
    avgPrice: 2.96
}, {
    type: 'P250',
    statTrak: true,
    name: 'Undertow',
    quality: 'Factory New',
    marketPrice: 20.42,
    avgPrice: 19.72
}, {
    type: 'P250',
    statTrak: true,
    name: 'Undertow',
    quality: 'Minimal Wear',
    marketPrice: 12.51,
    avgPrice: 13.78
}, {
    type: 'P250',
    statTrak: true,
    name: 'Undertow',
    quality: 'Field-Tested',
    marketPrice: 8.94,
    avgPrice: 10.06
}, {
    type: 'P250',
    name: 'Valence',
    quality: 'Factory New',
    marketPrice: 0.31,
    avgPrice: 0.29
}, {
    type: 'P250',
    name: 'Valence',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.12
}, {
    type: 'P250',
    name: 'Valence',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'P250',
    name: 'Valence',
    quality: 'Well-Worn',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'P250',
    name: 'Valence',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'P250',
    statTrak: true,
    name: 'Valence',
    quality: 'Factory New',
    marketPrice: 1.91,
    avgPrice: 1.84
}, {
    type: 'P250',
    statTrak: true,
    name: 'Valence',
    quality: 'Minimal Wear',
    marketPrice: 0.72,
    avgPrice: 0.62
}, {
    type: 'P250',
    statTrak: true,
    name: 'Valence',
    quality: 'Field-Tested',
    marketPrice: 0.40,
    avgPrice: 0.39
}, {
    type: 'P250',
    statTrak: true,
    name: 'Valence',
    quality: 'Well-Worn',
    marketPrice: 0.61,
    avgPrice: 0.61
}, {
    type: 'P250',
    statTrak: true,
    name: 'Valence',
    quality: 'Battle-Scarred',
    marketPrice: 0.41,
    avgPrice: 0.38
}, {
    type: 'P250',
    name: 'Whiteout',
    quality: 'Factory New',
    marketPrice: 79.89,
    avgPrice: 79.62
}, {
    type: 'P250',
    name: 'Whiteout',
    quality: 'Minimal Wear',
    marketPrice: 5.91,
    avgPrice: 5.11
}, {
    type: 'P250',
    name: 'Whiteout',
    quality: 'Field-Tested',
    marketPrice: 0.61,
    avgPrice: 0.58
}, {
    type: 'P250',
    name: 'Whiteout',
    quality: 'Well-Worn',
    marketPrice: 0.61,
    avgPrice: 0.56
}, {
    type: 'P250',
    name: 'Whiteout',
    quality: 'Battle-Scarred',
    marketPrice: 0.51,
    avgPrice: 0.50
}, {
    type: 'P250',
    name: 'Wingshot',
    quality: 'Factory New',
    marketPrice: 1.81,
    avgPrice: 1.77
}, {
    type: 'P250',
    name: 'Wingshot',
    quality: 'Minimal Wear',
    marketPrice: 0.76,
    avgPrice: 0.73
}, {
    type: 'P250',
    name: 'Wingshot',
    quality: 'Field-Tested',
    marketPrice: 0.46,
    avgPrice: 0.45
}, {
    type: 'P250',
    name: 'Wingshot',
    quality: 'Well-Worn',
    marketPrice: 0.46,
    avgPrice: 0.44
}, {
    type: 'P250',
    name: 'Wingshot',
    quality: 'Battle-Scarred',
    marketPrice: 0.40,
    avgPrice: 0.40
}, {
    type: 'P250',
    statTrak: true,
    name: 'Wingshot',
    quality: 'Factory New',
    marketPrice: 7.01,
    avgPrice: 7.33
}, {
    type: 'P250',
    statTrak: true,
    name: 'Wingshot',
    quality: 'Minimal Wear',
    marketPrice: 2.99,
    avgPrice: 2.79
}, {
    type: 'P250',
    statTrak: true,
    name: 'Wingshot',
    quality: 'Field-Tested',
    marketPrice: 1.65,
    avgPrice: 1.64
}, {
    type: 'P250',
    statTrak: true,
    name: 'Wingshot',
    quality: 'Well-Worn',
    marketPrice: 1.66,
    avgPrice: 1.54
}, {
    type: 'P250',
    statTrak: true,
    name: 'Wingshot',
    quality: 'Battle-Scarred',
    marketPrice: 1.50,
    avgPrice: 1.44
}, {
    type: 'P90',
    name: 'Ash Wood',
    quality: 'Factory New',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'P90',
    name: 'Ash Wood',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'P90',
    name: 'Ash Wood',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'P90',
    name: 'Ash Wood',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Souvenir P90',
    name: 'Ash Wood',
    quality: 'Factory New',
    marketPrice: 2.49,
    avgPrice: 2.21
}, {
    type: 'Souvenir P90',
    name: 'Ash Wood',
    quality: 'Minimal Wear',
    marketPrice: 1.64,
    avgPrice: 1.42
}, {
    type: 'Souvenir P90',
    name: 'Ash Wood',
    quality: 'Field-Tested',
    marketPrice: 0.83,
    avgPrice: 0.78
}, {
    type: 'Souvenir P90',
    name: 'Ash Wood',
    quality: 'Well-Worn',
    marketPrice: 2.35,
    avgPrice: 1.68
}, {
    type: 'P90',
    name: 'Asiimov',
    quality: 'Factory New',
    marketPrice: 15.32,
    avgPrice: 16.91
}, {
    type: 'P90',
    name: 'Asiimov',
    quality: 'Minimal Wear',
    marketPrice: 9.00,
    avgPrice: 8.70
}, {
    type: 'P90',
    name: 'Asiimov',
    quality: 'Field-Tested',
    marketPrice: 5.22,
    avgPrice: 5.32
}, {
    type: 'P90',
    name: 'Asiimov',
    quality: 'Well-Worn',
    marketPrice: 4.84,
    avgPrice: 4.87
}, {
    type: 'P90',
    name: 'Asiimov',
    quality: 'Battle-Scarred',
    marketPrice: 3.07,
    avgPrice: 2.93
}, {
    type: 'P90',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Factory New',
    marketPrice: 101.26,
    avgPrice: 94.24
}, {
    type: 'P90',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Minimal Wear',
    marketPrice: 35.82,
    avgPrice: 34.28
}, {
    type: 'P90',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Field-Tested',
    marketPrice: 16.47,
    avgPrice: 15.57
}, {
    type: 'P90',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Well-Worn',
    marketPrice: 12.89,
    avgPrice: 12.57
}, {
    type: 'P90',
    statTrak: true,
    name: 'Asiimov',
    quality: 'Battle-Scarred',
    marketPrice: 7.33,
    avgPrice: 8.01
}, {
    type: 'P90',
    name: 'Blind Spot',
    quality: 'Factory New',
    marketPrice: 1.23,
    avgPrice: 1.10
}, {
    type: 'P90',
    name: 'Blind Spot',
    quality: 'Minimal Wear',
    marketPrice: 1.05,
    avgPrice: 0.96
}, {
    type: 'P90',
    name: 'Blind Spot',
    quality: 'Field-Tested',
    marketPrice: 0.85,
    avgPrice: 0.81
}, {
    type: 'P90',
    name: 'Blind Spot',
    quality: 'Well-Worn',
    marketPrice: 1.21,
    avgPrice: 0.99
}, {
    type: 'P90',
    name: 'Blind Spot',
    quality: 'Battle-Scarred',
    marketPrice: 0.80,
    avgPrice: 0.81
}, {
    type: 'P90',
    statTrak: true,
    name: 'Blind Spot',
    quality: 'Factory New',
    marketPrice: 3.23,
    avgPrice: 3.50
}, {
    type: 'P90',
    statTrak: true,
    name: 'Blind Spot',
    quality: 'Minimal Wear',
    marketPrice: 3.28,
    avgPrice: 2.83
}, {
    type: 'P90',
    statTrak: true,
    name: 'Blind Spot',
    quality: 'Field-Tested',
    marketPrice: 2.39,
    avgPrice: 2.39
}, {
    type: 'P90',
    statTrak: true,
    name: 'Blind Spot',
    quality: 'Well-Worn',
    marketPrice: 3.33,
    avgPrice: 2.85
}, {
    type: 'P90',
    statTrak: true,
    name: 'Blind Spot',
    quality: 'Battle-Scarred',
    marketPrice: 3.46,
    avgPrice: 2.52
}, {
    type: 'P90',
    name: 'Chopper',
    quality: 'Factory New',
    marketPrice: 3.59,
    avgPrice: 3.41
}, {
    type: 'P90',
    name: 'Chopper',
    quality: 'Minimal Wear',
    marketPrice: 2.48,
    avgPrice: 2.23
}, {
    type: 'P90',
    name: 'Chopper',
    quality: 'Field-Tested',
    marketPrice: 1.77,
    avgPrice: 1.64
}, {
    type: 'P90',
    name: 'Chopper',
    quality: 'Well-Worn',
    marketPrice: 1.84,
    avgPrice: 1.91
}, {
    type: 'P90',
    name: 'Chopper',
    quality: 'Battle-Scarred',
    marketPrice: 1.43,
    avgPrice: 1.48
}, {
    type: 'P90',
    statTrak: true,
    name: 'Chopper',
    quality: 'Factory New',
    marketPrice: 12.77,
    avgPrice: 11.95
}, {
    type: 'P90',
    statTrak: true,
    name: 'Chopper',
    quality: 'Minimal Wear',
    marketPrice: 6.37,
    avgPrice: 6.96
}, {
    type: 'P90',
    statTrak: true,
    name: 'Chopper',
    quality: 'Field-Tested',
    marketPrice: 4.78,
    avgPrice: 4.60
}, {
    type: 'P90',
    statTrak: true,
    name: 'Chopper',
    quality: 'Well-Worn',
    marketPrice: 5.21,
    avgPrice: 5.38
}, {
    type: 'P90',
    statTrak: true,
    name: 'Chopper',
    quality: 'Battle-Scarred',
    marketPrice: 4.00,
    avgPrice: 4.31
}, {
    type: 'P90',
    name: 'Cold Blooded',
    quality: 'Factory New',
    marketPrice: 5.87,
    avgPrice: 5.36
}, {
    type: 'P90',
    name: 'Cold Blooded',
    quality: 'Minimal Wear',
    marketPrice: 6.11,
    avgPrice: 4.66
}, {
    type: 'P90',
    statTrak: true,
    name: 'Cold Blooded',
    quality: 'Factory New',
    marketPrice: 24.35,
    avgPrice: 25.73
}, {
    type: 'P90',
    statTrak: true,
    name: 'Cold Blooded',
    quality: 'Minimal Wear',
    marketPrice: 28.14,
    avgPrice: 24.34
}, {
    type: 'P90',
    name: 'Death by Kitty',
    quality: 'Minimal Wear',
    marketPrice: 32.21,
    avgPrice: 31.13
}, {
    type: 'P90',
    name: 'Death by Kitty',
    quality: 'Field-Tested',
    marketPrice: 20.82,
    avgPrice: 19.29
}, {
    type: 'P90',
    statTrak: true,
    name: 'Death by Kitty',
    quality: 'Minimal Wear',
    marketPrice: 299.54,
    avgPrice: 273.15
}, {
    type: 'P90',
    statTrak: true,
    name: 'Death by Kitty',
    quality: 'Field-Tested',
    marketPrice: 147.80,
    avgPrice: 110.44
}, {
    type: 'P90',
    name: 'Desert Warfare',
    quality: 'Factory New',
    marketPrice: 1.98,
    avgPrice: 1.95
}, {
    type: 'P90',
    name: 'Desert Warfare',
    quality: 'Minimal Wear',
    marketPrice: 1.41,
    avgPrice: 1.48
}, {
    type: 'P90',
    name: 'Desert Warfare',
    quality: 'Field-Tested',
    marketPrice: 1.03,
    avgPrice: 1.06
}, {
    type: 'P90',
    name: 'Desert Warfare',
    quality: 'Well-Worn',
    marketPrice: 1.53,
    avgPrice: 1.51
}, {
    type: 'P90',
    name: 'Desert Warfare',
    quality: 'Battle-Scarred',
    marketPrice: 4.99,
    avgPrice: 4.08
}, {
    type: 'P90',
    statTrak: true,
    name: 'Desert Warfare',
    quality: 'Factory New',
    marketPrice: 7.22,
    avgPrice: 7.41
}, {
    type: 'P90',
    statTrak: true,
    name: 'Desert Warfare',
    quality: 'Minimal Wear',
    marketPrice: 4.09,
    avgPrice: 4.27
}, {
    type: 'P90',
    statTrak: true,
    name: 'Desert Warfare',
    quality: 'Field-Tested',
    marketPrice: 2.55,
    avgPrice: 2.36
}, {
    type: 'P90',
    statTrak: true,
    name: 'Desert Warfare',
    quality: 'Well-Worn',
    marketPrice: 11.43,
    avgPrice: 11.43
}, {
    type: 'P90',
    statTrak: true,
    name: 'Desert Warfare',
    quality: 'Battle-Scarred',
    marketPrice: 5.41,
    avgPrice: 4.45
}, {
    type: 'P90',
    name: 'Elite Build',
    quality: 'Factory New',
    marketPrice: 0.76,
    avgPrice: 0.79
}, {
    type: 'P90',
    name: 'Elite Build',
    quality: 'Minimal Wear',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'P90',
    name: 'Elite Build',
    quality: 'Field-Tested',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'P90',
    name: 'Elite Build',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'P90',
    name: 'Elite Build',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'P90',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Factory New',
    marketPrice: 5.67,
    avgPrice: 4.65
}, {
    type: 'P90',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Minimal Wear',
    marketPrice: 1.33,
    avgPrice: 1.32
}, {
    type: 'P90',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Field-Tested',
    marketPrice: 0.82,
    avgPrice: 0.78
}, {
    type: 'P90',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Well-Worn',
    marketPrice: 0.66,
    avgPrice: 0.65
}, {
    type: 'P90',
    statTrak: true,
    name: 'Elite Build',
    quality: 'Battle-Scarred',
    marketPrice: 0.69,
    avgPrice: 0.62
}, {
    type: 'P90',
    name: 'Emerald Dragon',
    quality: 'Factory New',
    marketPrice: 133.00,
    avgPrice: 113.67
}, {
    type: 'P90',
    name: 'Emerald Dragon',
    quality: 'Minimal Wear',
    marketPrice: 26.54,
    avgPrice: 26.85
}, {
    type: 'P90',
    name: 'Emerald Dragon',
    quality: 'Field-Tested',
    marketPrice: 22.57,
    avgPrice: 23.10
}, {
    type: 'P90',
    name: 'Emerald Dragon',
    quality: 'Well-Worn',
    marketPrice: 27.88,
    avgPrice: 21.11
}, {
    type: 'P90',
    name: 'Emerald Dragon',
    quality: 'Battle-Scarred',
    marketPrice: 177.69,
    avgPrice: 36.12
}, {
    type: 'P90',
    statTrak: true,
    name: 'Emerald Dragon',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1760.25
}, {
    type: 'P90',
    statTrak: true,
    name: 'Emerald Dragon',
    quality: 'Minimal Wear',
    marketPrice: 114.33,
    avgPrice: 109.87
}, {
    type: 'P90',
    statTrak: true,
    name: 'Emerald Dragon',
    quality: 'Field-Tested',
    marketPrice: 120.00,
    avgPrice: 76.58
}, {
    type: 'P90',
    statTrak: true,
    name: 'Emerald Dragon',
    quality: 'Well-Worn',
    marketPrice: 80.50,
    avgPrice: 77.91
}, {
    type: 'P90',
    statTrak: true,
    name: 'Emerald Dragon',
    quality: 'Battle-Scarred',
    marketPrice: 69.00,
    avgPrice: 58.40
}, {
    type: 'P90',
    name: 'Fallout Warning',
    quality: 'Factory New',
    marketPrice: 23.65,
    avgPrice: 19.26
}, {
    type: 'P90',
    name: 'Fallout Warning',
    quality: 'Minimal Wear',
    marketPrice: 3.42,
    avgPrice: 2.82
}, {
    type: 'P90',
    name: 'Fallout Warning',
    quality: 'Field-Tested',
    marketPrice: 1.20,
    avgPrice: 1.08
}, {
    type: 'P90',
    name: 'Fallout Warning',
    quality: 'Well-Worn',
    marketPrice: 0.99,
    avgPrice: 1.01
}, {
    type: 'P90',
    name: 'Fallout Warning',
    quality: 'Battle-Scarred',
    marketPrice: 1.01,
    avgPrice: 0.93
}, {
    type: 'Souvenir P90',
    name: 'Fallout Warning',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 113.01
}, {
    type: 'Souvenir P90',
    name: 'Fallout Warning',
    quality: 'Minimal Wear',
    marketPrice: 5.56,
    avgPrice: 5.48
}, {
    type: 'Souvenir P90',
    name: 'Fallout Warning',
    quality: 'Field-Tested',
    marketPrice: 1.79,
    avgPrice: 1.87
}, {
    type: 'Souvenir P90',
    name: 'Fallout Warning',
    quality: 'Well-Worn',
    marketPrice: 2.39,
    avgPrice: 2.19
}, {
    type: 'Souvenir P90',
    name: 'Fallout Warning',
    quality: 'Battle-Scarred',
    marketPrice: 1.88,
    avgPrice: 1.26
}, {
    type: 'P90',
    name: 'Glacier Mesh',
    quality: 'Factory New',
    marketPrice: 13.70,
    avgPrice: 11.65
}, {
    type: 'P90',
    name: 'Glacier Mesh',
    quality: 'Minimal Wear',
    marketPrice: 1.39,
    avgPrice: 1.37
}, {
    type: 'P90',
    name: 'Glacier Mesh',
    quality: 'Field-Tested',
    marketPrice: 1.30,
    avgPrice: 1.16
}, {
    type: 'P90',
    name: 'Glacier Mesh',
    quality: 'Well-Worn',
    marketPrice: 4.45,
    avgPrice: 3.27
}, {
    type: 'P90',
    name: 'Glacier Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 1.67,
    avgPrice: 1.66
}, {
    type: 'P90',
    name: 'Leather',
    quality: 'Factory New',
    marketPrice: 2.14,
    avgPrice: 2.06
}, {
    type: 'P90',
    name: 'Leather',
    quality: 'Minimal Wear',
    marketPrice: 0.99,
    avgPrice: 0.88
}, {
    type: 'P90',
    name: 'Leather',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.52
}, {
    type: 'P90',
    name: 'Leather',
    quality: 'Well-Worn',
    marketPrice: 0.58,
    avgPrice: 0.57
}, {
    type: 'P90',
    name: 'Leather',
    quality: 'Battle-Scarred',
    marketPrice: 0.55,
    avgPrice: 0.62
}, {
    type: 'P90',
    name: 'Module',
    quality: 'Factory New',
    marketPrice: 0.70,
    avgPrice: 0.68
}, {
    type: 'P90',
    name: 'Module',
    quality: 'Minimal Wear',
    marketPrice: 0.57,
    avgPrice: 0.53
}, {
    type: 'P90',
    name: 'Module',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.49
}, {
    type: 'P90',
    statTrak: true,
    name: 'Module',
    quality: 'Factory New',
    marketPrice: 2.32,
    avgPrice: 2.22
}, {
    type: 'P90',
    statTrak: true,
    name: 'Module',
    quality: 'Minimal Wear',
    marketPrice: 1.52,
    avgPrice: 1.50
}, {
    type: 'P90',
    statTrak: true,
    name: 'Module',
    quality: 'Field-Tested',
    marketPrice: 1.43,
    avgPrice: 1.37
}, {
    type: 'P90',
    name: 'Sand Spray',
    quality: 'Factory New',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'P90',
    name: 'Sand Spray',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'P90',
    name: 'Sand Spray',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'P90',
    name: 'Sand Spray',
    quality: 'Well-Worn',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'P90',
    name: 'Sand Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir P90',
    name: 'Sand Spray',
    quality: 'Factory New',
    marketPrice: 3.70,
    avgPrice: 3.66
}, {
    type: 'Souvenir P90',
    name: 'Sand Spray',
    quality: 'Minimal Wear',
    marketPrice: 0.73,
    avgPrice: 0.62
}, {
    type: 'Souvenir P90',
    name: 'Sand Spray',
    quality: 'Field-Tested',
    marketPrice: 0.34,
    avgPrice: 0.28
}, {
    type: 'Souvenir P90',
    name: 'Sand Spray',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.38
}, {
    type: 'Souvenir P90',
    name: 'Sand Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.31,
    avgPrice: 0.34
}, {
    type: 'P90',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 1.38,
    avgPrice: 1.52
}, {
    type: 'P90',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 0.25,
    avgPrice: 0.25
}, {
    type: 'P90',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'P90',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 0.25,
    avgPrice: 0.21
}, {
    type: 'P90',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'Souvenir P90',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 4.64,
    avgPrice: 4.66
}, {
    type: 'Souvenir P90',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 0.62,
    avgPrice: 0.57
}, {
    type: 'Souvenir P90',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'Souvenir P90',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 0.47,
    avgPrice: 0.48
}, {
    type: 'Souvenir P90',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 0.28,
    avgPrice: 0.31
}, {
    type: 'P90',
    name: 'Shapewood',
    quality: 'Factory New',
    marketPrice: 5.34,
    avgPrice: 4.61
}, {
    type: 'P90',
    name: 'Shapewood',
    quality: 'Minimal Wear',
    marketPrice: 2.10,
    avgPrice: 2.02
}, {
    type: 'P90',
    name: 'Shapewood',
    quality: 'Field-Tested',
    marketPrice: 1.34,
    avgPrice: 1.31
}, {
    type: 'P90',
    name: 'Shapewood',
    quality: 'Well-Worn',
    marketPrice: 1.55,
    avgPrice: 1.28
}, {
    type: 'P90',
    name: 'Shapewood',
    quality: 'Battle-Scarred',
    marketPrice: 1.28,
    avgPrice: 1.25
}, {
    type: 'P90',
    statTrak: true,
    name: 'Shapewood',
    quality: 'Factory New',
    marketPrice: 23.99,
    avgPrice: 20.89
}, {
    type: 'P90',
    statTrak: true,
    name: 'Shapewood',
    quality: 'Minimal Wear',
    marketPrice: 9.01,
    avgPrice: 8.72
}, {
    type: 'P90',
    statTrak: true,
    name: 'Shapewood',
    quality: 'Field-Tested',
    marketPrice: 4.83,
    avgPrice: 4.52
}, {
    type: 'P90',
    statTrak: true,
    name: 'Shapewood',
    quality: 'Well-Worn',
    marketPrice: 4.08,
    avgPrice: 3.95
}, {
    type: 'P90',
    statTrak: true,
    name: 'Shapewood',
    quality: 'Battle-Scarred',
    marketPrice: 4.10,
    avgPrice: 4.00
}, {
    type: 'P90',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 0.51,
    avgPrice: 0.42
}, {
    type: 'P90',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.09,
    avgPrice: 0.06
}, {
    type: 'P90',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'P90',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'P90',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir P90',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 4.02,
    avgPrice: 3.74
}, {
    type: 'Souvenir P90',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.65,
    avgPrice: 0.60
}, {
    type: 'Souvenir P90',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.27
}, {
    type: 'Souvenir P90',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.49,
    avgPrice: 0.41
}, {
    type: 'Souvenir P90',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.31,
    avgPrice: 0.30
}, {
    type: 'P90',
    name: 'Teardown',
    quality: 'Factory New',
    marketPrice: 0.36,
    avgPrice: 0.33
}, {
    type: 'P90',
    name: 'Teardown',
    quality: 'Minimal Wear',
    marketPrice: 0.16,
    avgPrice: 0.16
}, {
    type: 'P90',
    name: 'Teardown',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'P90',
    name: 'Teardown',
    quality: 'Well-Worn',
    marketPrice: 0.28,
    avgPrice: 0.27
}, {
    type: 'P90',
    name: 'Teardown',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Souvenir P90',
    name: 'Teardown',
    quality: 'Factory New',
    marketPrice: 99.95,
    avgPrice: 59.82
}, {
    type: 'Souvenir P90',
    name: 'Teardown',
    quality: 'Minimal Wear',
    marketPrice: 44.42,
    avgPrice: 13.67
}, {
    type: 'Souvenir P90',
    name: 'Teardown',
    quality: 'Field-Tested',
    marketPrice: 18.89,
    avgPrice: 14.47
}, {
    type: 'Souvenir P90',
    name: 'Teardown',
    quality: 'Battle-Scarred',
    marketPrice: 32.21,
    avgPrice: 37.26
}, {
    type: 'P90',
    name: 'Trigon',
    quality: 'Minimal Wear',
    marketPrice: 3.42,
    avgPrice: 3.44
}, {
    type: 'P90',
    name: 'Trigon',
    quality: 'Field-Tested',
    marketPrice: 2.41,
    avgPrice: 2.31
}, {
    type: 'P90',
    name: 'Trigon',
    quality: 'Well-Worn',
    marketPrice: 2.56,
    avgPrice: 2.34
}, {
    type: 'P90',
    name: 'Trigon',
    quality: 'Battle-Scarred',
    marketPrice: 2.54,
    avgPrice: 2.19
}, {
    type: 'P90',
    statTrak: true,
    name: 'Trigon',
    quality: 'Minimal Wear',
    marketPrice: 11.40,
    avgPrice: 11.35
}, {
    type: 'P90',
    statTrak: true,
    name: 'Trigon',
    quality: 'Field-Tested',
    marketPrice: 6.38,
    avgPrice: 5.96
}, {
    type: 'P90',
    statTrak: true,
    name: 'Trigon',
    quality: 'Well-Worn',
    marketPrice: 5.94,
    avgPrice: 6.11
}, {
    type: 'P90',
    statTrak: true,
    name: 'Trigon',
    quality: 'Battle-Scarred',
    marketPrice: 5.17,
    avgPrice: 5.39
}, {
    type: 'P90',
    name: 'Virus',
    quality: 'Factory New',
    marketPrice: 3.85,
    avgPrice: 3.84
}, {
    type: 'P90',
    name: 'Virus',
    quality: 'Minimal Wear',
    marketPrice: 1.00,
    avgPrice: 0.93
}, {
    type: 'P90',
    name: 'Virus',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.49
}, {
    type: 'P90',
    name: 'Virus',
    quality: 'Well-Worn',
    marketPrice: 0.78,
    avgPrice: 0.75
}, {
    type: 'P90',
    name: 'Virus',
    quality: 'Battle-Scarred',
    marketPrice: 0.54,
    avgPrice: 0.49
}, {
    type: 'P90',
    statTrak: true,
    name: 'Virus',
    quality: 'Factory New',
    marketPrice: 34.39,
    avgPrice: 32.90
}, {
    type: 'P90',
    statTrak: true,
    name: 'Virus',
    quality: 'Minimal Wear',
    marketPrice: 3.22,
    avgPrice: 3.17
}, {
    type: 'P90',
    statTrak: true,
    name: 'Virus',
    quality: 'Field-Tested',
    marketPrice: 1.43,
    avgPrice: 1.39
}, {
    type: 'P90',
    statTrak: true,
    name: 'Virus',
    quality: 'Well-Worn',
    marketPrice: 1.88,
    avgPrice: 1.78
}, {
    type: 'P90',
    statTrak: true,
    name: 'Virus',
    quality: 'Battle-Scarred',
    marketPrice: 1.33,
    avgPrice: 1.24
}, {
    type: 'PP-Bizon',
    name: 'Antique',
    quality: 'Factory New',
    marketPrice: 1.18,
    avgPrice: 1.06
}, {
    type: 'PP-Bizon',
    name: 'Antique',
    quality: 'Minimal Wear',
    marketPrice: 0.74,
    avgPrice: 0.65
}, {
    type: 'PP-Bizon',
    name: 'Antique',
    quality: 'Field-Tested',
    marketPrice: 0.57,
    avgPrice: 0.53
}, {
    type: 'PP-Bizon',
    name: 'Antique',
    quality: 'Well-Worn',
    marketPrice: 0.62,
    avgPrice: 0.57
}, {
    type: 'PP-Bizon',
    name: 'Antique',
    quality: 'Battle-Scarred',
    marketPrice: 1.01,
    avgPrice: 0.85
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Antique',
    quality: 'Factory New',
    marketPrice: 4.54,
    avgPrice: 4.13
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Antique',
    quality: 'Minimal Wear',
    marketPrice: 3.06,
    avgPrice: 2.63
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Antique',
    quality: 'Field-Tested',
    marketPrice: 2.00,
    avgPrice: 1.71
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Antique',
    quality: 'Well-Worn',
    marketPrice: 2.00,
    avgPrice: 1.81
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Antique',
    quality: 'Battle-Scarred',
    marketPrice: 2.56,
    avgPrice: 1.60
}, {
    type: 'PP-Bizon',
    name: 'Bamboo Print',
    quality: 'Factory New',
    marketPrice: 0.21,
    avgPrice: 0.19
}, {
    type: 'PP-Bizon',
    name: 'Bamboo Print',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'PP-Bizon',
    name: 'Bamboo Print',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Bamboo Print',
    quality: 'Well-Worn',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'PP-Bizon',
    name: 'Bamboo Print',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Blue Streak',
    quality: 'Factory New',
    marketPrice: 4.94,
    avgPrice: 4.46
}, {
    type: 'PP-Bizon',
    name: 'Blue Streak',
    quality: 'Minimal Wear',
    marketPrice: 0.88,
    avgPrice: 0.76
}, {
    type: 'PP-Bizon',
    name: 'Blue Streak',
    quality: 'Field-Tested',
    marketPrice: 0.42,
    avgPrice: 0.44
}, {
    type: 'PP-Bizon',
    name: 'Blue Streak',
    quality: 'Well-Worn',
    marketPrice: 0.58,
    avgPrice: 0.48
}, {
    type: 'PP-Bizon',
    name: 'Blue Streak',
    quality: 'Battle-Scarred',
    marketPrice: 0.55,
    avgPrice: 0.45
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Blue Streak',
    quality: 'Factory New',
    marketPrice: 36.88,
    avgPrice: 26.79
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Blue Streak',
    quality: 'Minimal Wear',
    marketPrice: 2.50,
    avgPrice: 2.43
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Blue Streak',
    quality: 'Field-Tested',
    marketPrice: 0.92,
    avgPrice: 1.05
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Blue Streak',
    quality: 'Well-Worn',
    marketPrice: 2.16,
    avgPrice: 1.00
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Blue Streak',
    quality: 'Battle-Scarred',
    marketPrice: 0.86,
    avgPrice: 0.81
}, {
    type: 'PP-Bizon',
    name: 'Brass',
    quality: 'Factory New',
    marketPrice: 0.54,
    avgPrice: 0.59
}, {
    type: 'PP-Bizon',
    name: 'Brass',
    quality: 'Minimal Wear',
    marketPrice: 0.15,
    avgPrice: 0.15
}, {
    type: 'PP-Bizon',
    name: 'Brass',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'PP-Bizon',
    name: 'Brass',
    quality: 'Well-Worn',
    marketPrice: 0.12,
    avgPrice: 0.09
}, {
    type: 'PP-Bizon',
    name: 'Brass',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Brass',
    quality: 'Factory New',
    marketPrice: 25.96,
    avgPrice: 22.07
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Brass',
    quality: 'Minimal Wear',
    marketPrice: 3.39,
    avgPrice: 3.65
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Brass',
    quality: 'Field-Tested',
    marketPrice: 1.79,
    avgPrice: 1.65
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Brass',
    quality: 'Well-Worn',
    marketPrice: 1.27,
    avgPrice: 1.37
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Brass',
    quality: 'Battle-Scarred',
    marketPrice: 1.24,
    avgPrice: 1.18
}, {
    type: 'PP-Bizon',
    name: 'Carbon Fiber',
    quality: 'Factory New',
    marketPrice: 6.28,
    avgPrice: 5.96
}, {
    type: 'PP-Bizon',
    name: 'Carbon Fiber',
    quality: 'Minimal Wear',
    marketPrice: 4.87,
    avgPrice: 4.39
}, {
    type: 'PP-Bizon',
    name: 'Chemical Green',
    quality: 'Factory New',
    marketPrice: 0.72,
    avgPrice: 0.66
}, {
    type: 'PP-Bizon',
    name: 'Chemical Green',
    quality: 'Minimal Wear',
    marketPrice: 0.21,
    avgPrice: 0.17
}, {
    type: 'PP-Bizon',
    name: 'Chemical Green',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'PP-Bizon',
    name: 'Chemical Green',
    quality: 'Well-Worn',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'PP-Bizon',
    name: 'Chemical Green',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Chemical Green',
    quality: 'Factory New',
    marketPrice: 5.49,
    avgPrice: 5.06
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Chemical Green',
    quality: 'Minimal Wear',
    marketPrice: 1.45,
    avgPrice: 0.92
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Chemical Green',
    quality: 'Field-Tested',
    marketPrice: 0.78,
    avgPrice: 0.41
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Chemical Green',
    quality: 'Well-Worn',
    marketPrice: 0.59,
    avgPrice: 0.45
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Chemical Green',
    quality: 'Battle-Scarred',
    marketPrice: 0.43,
    avgPrice: 0.32
}, {
    type: 'PP-Bizon',
    name: 'Cobalt Halftone',
    quality: 'Factory New',
    marketPrice: 0.82,
    avgPrice: 0.70
}, {
    type: 'PP-Bizon',
    name: 'Cobalt Halftone',
    quality: 'Minimal Wear',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'PP-Bizon',
    name: 'Cobalt Halftone',
    quality: 'Field-Tested',
    marketPrice: 0.14,
    avgPrice: 0.11
}, {
    type: 'PP-Bizon',
    name: 'Cobalt Halftone',
    quality: 'Well-Worn',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Cobalt Halftone',
    quality: 'Factory New',
    marketPrice: 1.97,
    avgPrice: 1.77
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Cobalt Halftone',
    quality: 'Minimal Wear',
    marketPrice: 0.53,
    avgPrice: 0.45
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Cobalt Halftone',
    quality: 'Field-Tested',
    marketPrice: 0.36,
    avgPrice: 0.30
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Cobalt Halftone',
    quality: 'Well-Worn',
    marketPrice: 0.35,
    avgPrice: 0.33
}, {
    type: 'PP-Bizon',
    name: 'Forest Leaves',
    quality: 'Factory New',
    marketPrice: 17.87,
    avgPrice: 13.75
}, {
    type: 'PP-Bizon',
    name: 'Forest Leaves',
    quality: 'Minimal Wear',
    marketPrice: 0.65,
    avgPrice: 0.46
}, {
    type: 'PP-Bizon',
    name: 'Forest Leaves',
    quality: 'Field-Tested',
    marketPrice: 0.18,
    avgPrice: 0.18
}, {
    type: 'PP-Bizon',
    name: 'Forest Leaves',
    quality: 'Well-Worn',
    marketPrice: 0.34,
    avgPrice: 0.33
}, {
    type: 'PP-Bizon',
    name: 'Forest Leaves',
    quality: 'Battle-Scarred',
    marketPrice: 0.19,
    avgPrice: 0.21
}, {
    type: 'PP-Bizon',
    name: 'Fuel Rod',
    quality: 'Factory New',
    marketPrice: 2.15,
    avgPrice: 1.96
}, {
    type: 'PP-Bizon',
    name: 'Fuel Rod',
    quality: 'Minimal Wear',
    marketPrice: 1.06,
    avgPrice: 0.90
}, {
    type: 'PP-Bizon',
    name: 'Fuel Rod',
    quality: 'Field-Tested',
    marketPrice: 0.50,
    avgPrice: 0.48
}, {
    type: 'PP-Bizon',
    name: 'Fuel Rod',
    quality: 'Well-Worn',
    marketPrice: 0.48,
    avgPrice: 0.45
}, {
    type: 'PP-Bizon',
    name: 'Fuel Rod',
    quality: 'Battle-Scarred',
    marketPrice: 0.42,
    avgPrice: 0.42
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Fuel Rod',
    quality: 'Factory New',
    marketPrice: 8.64,
    avgPrice: 7.80
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Fuel Rod',
    quality: 'Minimal Wear',
    marketPrice: 4.98,
    avgPrice: 4.15
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Fuel Rod',
    quality: 'Field-Tested',
    marketPrice: 2.00,
    avgPrice: 1.65
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Fuel Rod',
    quality: 'Well-Worn',
    marketPrice: 1.66,
    avgPrice: 1.31
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Fuel Rod',
    quality: 'Battle-Scarred',
    marketPrice: 1.11,
    avgPrice: 1.12
}, {
    type: 'PP-Bizon',
    name: 'Harvester',
    quality: 'Factory New',
    marketPrice: 0.48,
    avgPrice: 0.46
}, {
    type: 'PP-Bizon',
    name: 'Harvester',
    quality: 'Minimal Wear',
    marketPrice: 0.23,
    avgPrice: 0.27
}, {
    type: 'PP-Bizon',
    name: 'Harvester',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.21
}, {
    type: 'PP-Bizon',
    name: 'Harvester',
    quality: 'Well-Worn',
    marketPrice: 0.18,
    avgPrice: 0.19
}, {
    type: 'PP-Bizon',
    name: 'Harvester',
    quality: 'Battle-Scarred',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Harvester',
    quality: 'Factory New',
    marketPrice: 1.92,
    avgPrice: 1.88
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Harvester',
    quality: 'Minimal Wear',
    marketPrice: 0.97,
    avgPrice: 0.83
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Harvester',
    quality: 'Field-Tested',
    marketPrice: 0.77,
    avgPrice: 0.54
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Harvester',
    quality: 'Well-Worn',
    marketPrice: 0.46,
    avgPrice: 0.45
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Harvester',
    quality: 'Battle-Scarred',
    marketPrice: 0.46,
    avgPrice: 0.44
}, {
    type: 'PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Factory New',
    marketPrice: 5.57,
    avgPrice: 5.45
}, {
    type: 'PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Minimal Wear',
    marketPrice: 0.49,
    avgPrice: 0.45
}, {
    type: 'PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.19
}, {
    type: 'PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Well-Worn',
    marketPrice: 0.36,
    avgPrice: 0.31
}, {
    type: 'PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.19
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Factory New',
    marketPrice: 15.00,
    avgPrice: 4.62
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Minimal Wear',
    marketPrice: 0.70,
    avgPrice: 0.67
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Field-Tested',
    marketPrice: 0.29,
    avgPrice: 0.22
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Well-Worn',
    marketPrice: 0.50,
    avgPrice: 0.27
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Irradiated Alert',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.20
}, {
    type: 'PP-Bizon',
    name: 'Judgement of Anubis',
    quality: 'Factory New',
    marketPrice: 11.17,
    avgPrice: 11.86
}, {
    type: 'PP-Bizon',
    name: 'Judgement of Anubis',
    quality: 'Minimal Wear',
    marketPrice: 10.21,
    avgPrice: 9.00
}, {
    type: 'PP-Bizon',
    name: 'Judgement of Anubis',
    quality: 'Field-Tested',
    marketPrice: 5.67,
    avgPrice: 5.56
}, {
    type: 'PP-Bizon',
    name: 'Judgement of Anubis',
    quality: 'Well-Worn',
    marketPrice: 5.98,
    avgPrice: 5.83
}, {
    type: 'PP-Bizon',
    name: 'Judgement of Anubis',
    quality: 'Battle-Scarred',
    marketPrice: 4.05,
    avgPrice: 3.92
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Judgement of Anubis',
    quality: 'Factory New',
    marketPrice: 46.64,
    avgPrice: 40.74
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Judgement of Anubis',
    quality: 'Minimal Wear',
    marketPrice: 30.01,
    avgPrice: 25.62
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Judgement of Anubis',
    quality: 'Field-Tested',
    marketPrice: 17.18,
    avgPrice: 15.76
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Judgement of Anubis',
    quality: 'Well-Worn',
    marketPrice: 13.80,
    avgPrice: 13.69
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Judgement of Anubis',
    quality: 'Battle-Scarred',
    marketPrice: 12.07,
    avgPrice: 9.58
}, {
    type: 'PP-Bizon',
    name: 'Modern Hunter',
    quality: 'Factory New',
    marketPrice: 399.77,
    avgPrice: 111.64
}, {
    type: 'PP-Bizon',
    name: 'Modern Hunter',
    quality: 'Minimal Wear',
    marketPrice: 5.31,
    avgPrice: 4.79
}, {
    type: 'PP-Bizon',
    name: 'Modern Hunter',
    quality: 'Field-Tested',
    marketPrice: 2.02,
    avgPrice: 2.06
}, {
    type: 'PP-Bizon',
    name: 'Modern Hunter',
    quality: 'Well-Worn',
    marketPrice: 10.67,
    avgPrice: 10.89
}, {
    type: 'PP-Bizon',
    name: 'Modern Hunter',
    quality: 'Battle-Scarred',
    marketPrice: 4.42,
    avgPrice: 2.68
}, {
    type: 'PP-Bizon',
    name: 'Night Ops',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'PP-Bizon',
    name: 'Night Ops',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Night Ops',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Night Ops',
    quality: 'Well-Worn',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Night Ops',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Night Ops',
    quality: 'Factory New',
    marketPrice: 48.71,
    avgPrice: 34.15
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Night Ops',
    quality: 'Minimal Wear',
    marketPrice: 6.93,
    avgPrice: 5.93
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Night Ops',
    quality: 'Field-Tested',
    marketPrice: 2.36,
    avgPrice: 1.69
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Night Ops',
    quality: 'Well-Worn',
    marketPrice: 31.07,
    avgPrice: 17.26
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Night Ops',
    quality: 'Battle-Scarred',
    marketPrice: 28.75,
    avgPrice: 25.76
}, {
    type: 'PP-Bizon',
    name: 'Osiris',
    quality: 'Factory New',
    marketPrice: 0.62,
    avgPrice: 0.54
}, {
    type: 'PP-Bizon',
    name: 'Osiris',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.34
}, {
    type: 'PP-Bizon',
    name: 'Osiris',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'PP-Bizon',
    name: 'Osiris',
    quality: 'Well-Worn',
    marketPrice: 0.42,
    avgPrice: 0.38
}, {
    type: 'PP-Bizon',
    name: 'Osiris',
    quality: 'Battle-Scarred',
    marketPrice: 0.30,
    avgPrice: 0.29
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Osiris',
    quality: 'Factory New',
    marketPrice: 2.76,
    avgPrice: 2.36
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Osiris',
    quality: 'Minimal Wear',
    marketPrice: 1.61,
    avgPrice: 1.28
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Osiris',
    quality: 'Field-Tested',
    marketPrice: 0.85,
    avgPrice: 0.80
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Osiris',
    quality: 'Well-Worn',
    marketPrice: 1.39,
    avgPrice: 0.92
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Osiris',
    quality: 'Battle-Scarred',
    marketPrice: 0.86,
    avgPrice: 0.78
}, {
    type: 'PP-Bizon',
    name: 'Photic Zone',
    quality: 'Factory New',
    marketPrice: 0.58,
    avgPrice: 0.48
}, {
    type: 'PP-Bizon',
    name: 'Photic Zone',
    quality: 'Minimal Wear',
    marketPrice: 0.17,
    avgPrice: 0.14
}, {
    type: 'PP-Bizon',
    name: 'Photic Zone',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'PP-Bizon',
    name: 'Photic Zone',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'PP-Bizon',
    name: 'Photic Zone',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Photic Zone',
    quality: 'Factory New',
    marketPrice: 2.15,
    avgPrice: 2.08
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Photic Zone',
    quality: 'Minimal Wear',
    marketPrice: 0.65,
    avgPrice: 0.63
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Photic Zone',
    quality: 'Field-Tested',
    marketPrice: 0.42,
    avgPrice: 0.32
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Photic Zone',
    quality: 'Well-Worn',
    marketPrice: 0.35,
    avgPrice: 0.30
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Photic Zone',
    quality: 'Battle-Scarred',
    marketPrice: 0.29,
    avgPrice: 0.29
}, {
    type: 'PP-Bizon',
    name: 'Rust Coat',
    quality: 'Factory New',
    marketPrice: 21.00,
    avgPrice: 13.07
}, {
    type: 'PP-Bizon',
    name: 'Rust Coat',
    quality: 'Minimal Wear',
    marketPrice: 11.93,
    avgPrice: 6.65
}, {
    type: 'PP-Bizon',
    name: 'Rust Coat',
    quality: 'Field-Tested',
    marketPrice: 2.11,
    avgPrice: 2.05
}, {
    type: 'PP-Bizon',
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 3.33,
    avgPrice: 3.05
}, {
    type: 'PP-Bizon',
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 3.00,
    avgPrice: 2.97
}, {
    type: 'PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Factory New',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Factory New',
    marketPrice: 83.28,
    avgPrice: 47.13
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Minimal Wear',
    marketPrice: 2.84,
    avgPrice: 2.64
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.60,
    avgPrice: 0.90
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Well-Worn',
    marketPrice: 6.27,
    avgPrice: 3.60
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Sand Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 2.27,
    avgPrice: 2.68
}, {
    type: 'PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Factory New',
    marketPrice: 0.09,
    avgPrice: 0.09
}, {
    type: 'PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Factory New',
    marketPrice: 3.88,
    avgPrice: 4.49
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Minimal Wear',
    marketPrice: 0.38,
    avgPrice: 0.29
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.18
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.25
}, {
    type: 'Souvenir PP-Bizon',
    name: 'Urban Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.19
}, {
    type: 'PP-Bizon',
    name: 'Water Sigil',
    quality: 'Factory New',
    marketPrice: 0.32,
    avgPrice: 0.32
}, {
    type: 'PP-Bizon',
    name: 'Water Sigil',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.26
}, {
    type: 'PP-Bizon',
    name: 'Water Sigil',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.21
}, {
    type: 'PP-Bizon',
    name: 'Water Sigil',
    quality: 'Well-Worn',
    marketPrice: 5.55,
    avgPrice: 6.68
}, {
    type: 'PP-Bizon',
    name: 'Water Sigil',
    quality: 'Battle-Scarred',
    marketPrice: 0.36,
    avgPrice: 0.33
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Water Sigil',
    quality: 'Factory New',
    marketPrice: 1.16,
    avgPrice: 1.14
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Water Sigil',
    quality: 'Minimal Wear',
    marketPrice: 0.82,
    avgPrice: 0.85
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Water Sigil',
    quality: 'Field-Tested',
    marketPrice: 0.77,
    avgPrice: 0.68
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Water Sigil',
    quality: 'Well-Worn',
    marketPrice: 0.78,
    avgPrice: 0.71
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Water Sigil',
    quality: 'Battle-Scarred',
    marketPrice: 0.75,
    avgPrice: 0.72
}, {
    type: 'R8 Revolver',
    name: 'Amber Fade',
    quality: 'Factory New',
    marketPrice: 1.12,
    avgPrice: 1.07
}, {
    type: 'R8 Revolver',
    name: 'Amber Fade',
    quality: 'Minimal Wear',
    marketPrice: 0.72,
    avgPrice: 0.69
}, {
    type: 'R8 Revolver',
    name: 'Amber Fade',
    quality: 'Field-Tested',
    marketPrice: 0.59,
    avgPrice: 0.57
}, {
    type: 'R8 Revolver',
    name: 'Amber Fade',
    quality: 'Well-Worn',
    marketPrice: 0.81,
    avgPrice: 0.80
}, {
    type: 'Souvenir R8 Revolver',
    name: 'Amber Fade',
    quality: 'Minimal Wear',
    marketPrice: 194.00,
    avgPrice: 201.30
}, {
    type: 'Souvenir R8 Revolver',
    name: 'Amber Fade',
    quality: 'Field-Tested',
    marketPrice: 119.51,
    avgPrice: 116.07
}, {
    type: 'R8 Revolver',
    name: 'Bone Mask',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'R8 Revolver',
    name: 'Bone Mask',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'R8 Revolver',
    name: 'Bone Mask',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'R8 Revolver',
    name: 'Bone Mask',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'R8 Revolver',
    name: 'Bone Mask',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'R8 Revolver',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 2.08,
    avgPrice: 1.98
}, {
    type: 'R8 Revolver',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 0.24,
    avgPrice: 0.23
}, {
    type: 'R8 Revolver',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'R8 Revolver',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 0.13,
    avgPrice: 0.10
}, {
    type: 'R8 Revolver',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 20.01,
    avgPrice: 18.47
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 1.35,
    avgPrice: 1.29
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 0.35,
    avgPrice: 0.35
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 0.55,
    avgPrice: 0.52
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 0.37,
    avgPrice: 0.33
}, {
    type: 'R8 Revolver',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 6.30,
    avgPrice: 6.02
}, {
    type: 'R8 Revolver',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 3.31,
    avgPrice: 3.18
}, {
    type: 'R8 Revolver',
    name: 'Fade',
    quality: 'Field-Tested',
    marketPrice: 2.00,
    avgPrice: 2.11
}, {
    type: 'R8 Revolver',
    name: 'Fade',
    quality: 'Well-Worn',
    marketPrice: 3.11,
    avgPrice: 3.37
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 38.31,
    avgPrice: 41.25
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 15.29,
    avgPrice: 14.68
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Fade',
    quality: 'Field-Tested',
    marketPrice: 8.68,
    avgPrice: 7.93
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Fade',
    quality: 'Well-Worn',
    marketPrice: 33.30,
    avgPrice: 19.46
}, {
    type: 'R8 Revolver',
    name: 'Reboot',
    quality: 'Factory New',
    marketPrice: 4.77,
    avgPrice: 4.13
}, {
    type: 'R8 Revolver',
    name: 'Reboot',
    quality: 'Minimal Wear',
    marketPrice: 2.13,
    avgPrice: 2.03
}, {
    type: 'R8 Revolver',
    name: 'Reboot',
    quality: 'Field-Tested',
    marketPrice: 1.50,
    avgPrice: 1.41
}, {
    type: 'R8 Revolver',
    name: 'Reboot',
    quality: 'Well-Worn',
    marketPrice: 1.30,
    avgPrice: 1.25
}, {
    type: 'R8 Revolver',
    name: 'Reboot',
    quality: 'Battle-Scarred',
    marketPrice: 1.28,
    avgPrice: 1.20
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Reboot',
    quality: 'Factory New',
    marketPrice: 18.77,
    avgPrice: 20.83
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Reboot',
    quality: 'Minimal Wear',
    marketPrice: 5.48,
    avgPrice: 5.45
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Reboot',
    quality: 'Field-Tested',
    marketPrice: 3.80,
    avgPrice: 3.63
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Reboot',
    quality: 'Well-Worn',
    marketPrice: 3.26,
    avgPrice: 3.17
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Reboot',
    quality: 'Battle-Scarred',
    marketPrice: 3.33,
    avgPrice: 3.04
}, {
    type: 'Sawed-Off',
    name: 'Amber Fade',
    quality: 'Factory New',
    marketPrice: 0.23,
    avgPrice: 0.23
}, {
    type: 'Sawed-Off',
    name: 'Amber Fade',
    quality: 'Minimal Wear',
    marketPrice: 0.15,
    avgPrice: 0.12
}, {
    type: 'Sawed-Off',
    name: 'Amber Fade',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.09
}, {
    type: 'Sawed-Off',
    name: 'Amber Fade',
    quality: 'Well-Worn',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Amber Fade',
    quality: 'Factory New',
    marketPrice: 1.67,
    avgPrice: 1.79
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Amber Fade',
    quality: 'Minimal Wear',
    marketPrice: 1.08,
    avgPrice: 1.14
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Amber Fade',
    quality: 'Field-Tested',
    marketPrice: 0.58,
    avgPrice: 0.64
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Amber Fade',
    quality: 'Well-Worn',
    marketPrice: 2.66,
    avgPrice: 2.50
}, {
    type: 'Sawed-Off',
    name: 'Bamboo Shadow',
    quality: 'Factory New',
    marketPrice: 0.18,
    avgPrice: 0.18
}, {
    type: 'Sawed-Off',
    name: 'Bamboo Shadow',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.09
}, {
    type: 'Sawed-Off',
    name: 'Bamboo Shadow',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Bamboo Shadow',
    quality: 'Well-Worn',
    marketPrice: 0.14,
    avgPrice: 0.13
}, {
    type: 'Sawed-Off',
    name: 'Bamboo Shadow',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Copper',
    quality: 'Factory New',
    marketPrice: 12.99,
    avgPrice: 11.61
}, {
    type: 'Sawed-Off',
    name: 'Copper',
    quality: 'Minimal Wear',
    marketPrice: 5.46,
    avgPrice: 4.07
}, {
    type: 'Sawed-Off',
    name: 'Copper',
    quality: 'Field-Tested',
    marketPrice: 3.72,
    avgPrice: 3.23
}, {
    type: 'Sawed-Off',
    name: 'Copper',
    quality: 'Well-Worn',
    marketPrice: 7.66,
    avgPrice: 6.89
}, {
    type: 'Sawed-Off',
    name: 'Copper',
    quality: 'Battle-Scarred',
    marketPrice: 2.56,
    avgPrice: 7.15
}, {
    type: 'Sawed-Off',
    name: 'First Class',
    quality: 'Factory New',
    marketPrice: 3.94,
    avgPrice: 3.47
}, {
    type: 'Sawed-Off',
    name: 'First Class',
    quality: 'Minimal Wear',
    marketPrice: 3.15,
    avgPrice: 2.45
}, {
    type: 'Sawed-Off',
    name: 'First Class',
    quality: 'Field-Tested',
    marketPrice: 1.99,
    avgPrice: 1.81
}, {
    type: 'Sawed-Off',
    name: 'First Class',
    quality: 'Well-Worn',
    marketPrice: 6.41,
    avgPrice: 6.18
}, {
    type: 'Sawed-Off',
    name: 'First Class',
    quality: 'Battle-Scarred',
    marketPrice: 4.17,
    avgPrice: 3.85
}, {
    type: 'Sawed-Off',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 0.09,
    avgPrice: 0.07
}, {
    type: 'Sawed-Off',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Fubar',
    quality: 'Well-Worn',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'Sawed-Off',
    name: 'Fubar',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Fubar',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.51
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Fubar',
    quality: 'Battle-Scarred',
    marketPrice: 0.24,
    avgPrice: 0.22
}, {
    type: 'Sawed-Off',
    name: 'Full Stop',
    quality: 'Factory New',
    marketPrice: 0.30,
    avgPrice: 0.29
}, {
    type: 'Sawed-Off',
    name: 'Full Stop',
    quality: 'Minimal Wear',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'Sawed-Off',
    name: 'Full Stop',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'Sawed-Off',
    name: 'Full Stop',
    quality: 'Well-Worn',
    marketPrice: 0.15,
    avgPrice: 0.14
}, {
    type: 'Sawed-Off',
    name: 'Full Stop',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Full Stop',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 35.20
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Full Stop',
    quality: 'Minimal Wear',
    marketPrice: 49.98,
    avgPrice: 44.58
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Full Stop',
    quality: 'Field-Tested',
    marketPrice: 14.31,
    avgPrice: 12.90
}, {
    type: 'Sawed-Off',
    name: 'Highwayman',
    quality: 'Factory New',
    marketPrice: 0.94,
    avgPrice: 0.86
}, {
    type: 'Sawed-Off',
    name: 'Highwayman',
    quality: 'Minimal Wear',
    marketPrice: 0.43,
    avgPrice: 0.39
}, {
    type: 'Sawed-Off',
    name: 'Highwayman',
    quality: 'Field-Tested',
    marketPrice: 0.38,
    avgPrice: 0.36
}, {
    type: 'Sawed-Off',
    name: 'Highwayman',
    quality: 'Well-Worn',
    marketPrice: 0.37,
    avgPrice: 0.33
}, {
    type: 'Sawed-Off',
    name: 'Highwayman',
    quality: 'Battle-Scarred',
    marketPrice: 0.32,
    avgPrice: 0.33
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Highwayman',
    quality: 'Factory New',
    marketPrice: 3.77,
    avgPrice: 3.89
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Highwayman',
    quality: 'Minimal Wear',
    marketPrice: 1.33,
    avgPrice: 1.32
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Highwayman',
    quality: 'Field-Tested',
    marketPrice: 0.76,
    avgPrice: 0.81
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Highwayman',
    quality: 'Well-Worn',
    marketPrice: 0.77,
    avgPrice: 0.74
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Highwayman',
    quality: 'Battle-Scarred',
    marketPrice: 1.22,
    avgPrice: 0.79
}, {
    type: 'Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Factory New',
    marketPrice: 4.80,
    avgPrice: 4.10
}, {
    type: 'Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Minimal Wear',
    marketPrice: 0.43,
    avgPrice: 0.45
}, {
    type: 'Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.18
}, {
    type: 'Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Well-Worn',
    marketPrice: 0.28,
    avgPrice: 0.27
}, {
    type: 'Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Battle-Scarred',
    marketPrice: 1.61,
    avgPrice: 1.44
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Factory New',
    marketPrice: 17.91,
    avgPrice: 7.62
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Minimal Wear',
    marketPrice: 0.97,
    avgPrice: 0.49
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.18
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Well-Worn',
    marketPrice: 0.21,
    avgPrice: 0.23
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Irradiated Alert',
    quality: 'Battle-Scarred',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'Sawed-Off',
    name: 'Limelight',
    quality: 'Factory New',
    marketPrice: 3.74,
    avgPrice: 3.72
}, {
    type: 'Sawed-Off',
    name: 'Limelight',
    quality: 'Minimal Wear',
    marketPrice: 2.12,
    avgPrice: 2.02
}, {
    type: 'Sawed-Off',
    name: 'Limelight',
    quality: 'Field-Tested',
    marketPrice: 1.47,
    avgPrice: 1.40
}, {
    type: 'Sawed-Off',
    name: 'Limelight',
    quality: 'Well-Worn',
    marketPrice: 1.28,
    avgPrice: 1.22
}, {
    type: 'Sawed-Off',
    name: 'Limelight',
    quality: 'Battle-Scarred',
    marketPrice: 1.23,
    avgPrice: 1.20
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Limelight',
    quality: 'Factory New',
    marketPrice: 11.77,
    avgPrice: 12.73
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Limelight',
    quality: 'Minimal Wear',
    marketPrice: 5.60,
    avgPrice: 5.15
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Limelight',
    quality: 'Field-Tested',
    marketPrice: 3.45,
    avgPrice: 3.56
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Limelight',
    quality: 'Well-Worn',
    marketPrice: 3.56,
    avgPrice: 3.11
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Limelight',
    quality: 'Battle-Scarred',
    marketPrice: 3.22,
    avgPrice: 2.87
}, {
    type: 'Sawed-Off',
    name: 'Mosaico',
    quality: 'Factory New',
    marketPrice: 63.26,
    avgPrice: 32.39
}, {
    type: 'Sawed-Off',
    name: 'Mosaico',
    quality: 'Minimal Wear',
    marketPrice: 1.70,
    avgPrice: 1.48
}, {
    type: 'Sawed-Off',
    name: 'Mosaico',
    quality: 'Field-Tested',
    marketPrice: 0.62,
    avgPrice: 0.52
}, {
    type: 'Sawed-Off',
    name: 'Mosaico',
    quality: 'Well-Worn',
    marketPrice: 1.30,
    avgPrice: 0.96
}, {
    type: 'Sawed-Off',
    name: 'Mosaico',
    quality: 'Battle-Scarred',
    marketPrice: 1.08,
    avgPrice: 0.77
}, {
    type: 'Sawed-Off',
    name: 'Orange DDPAT',
    quality: 'Factory New',
    marketPrice: 21.85,
    avgPrice: 12.24
}, {
    type: 'Sawed-Off',
    name: 'Orange DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 3.18,
    avgPrice: 3.08
}, {
    type: 'Sawed-Off',
    name: 'Orange DDPAT',
    quality: 'Field-Tested',
    marketPrice: 2.07,
    avgPrice: 2.17
}, {
    type: 'Sawed-Off',
    name: 'Orange DDPAT',
    quality: 'Well-Worn',
    marketPrice: 2.46,
    avgPrice: 2.05
}, {
    type: 'Sawed-Off',
    name: 'Orange DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 2.90,
    avgPrice: 2.06
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Factory New',
    marketPrice: 205.45,
    avgPrice: 93.18
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 8.21,
    avgPrice: 8.36
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Field-Tested',
    marketPrice: 5.57,
    avgPrice: 6.19
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Well-Worn',
    marketPrice: 6.06,
    avgPrice: 5.62
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Orange DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 6.00,
    avgPrice: 4.82
}, {
    type: 'Sawed-Off',
    name: 'Origami',
    quality: 'Factory New',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'Sawed-Off',
    name: 'Origami',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Sawed-Off',
    name: 'Origami',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Sawed-Off',
    name: 'Origami',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.08
}, {
    type: 'Sawed-Off',
    name: 'Origami',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Origami',
    quality: 'Factory New',
    marketPrice: 0.55,
    avgPrice: 0.56
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Origami',
    quality: 'Minimal Wear',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Origami',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.23
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Origami',
    quality: 'Well-Worn',
    marketPrice: 0.26,
    avgPrice: 0.26
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Origami',
    quality: 'Battle-Scarred',
    marketPrice: 0.24,
    avgPrice: 0.22
}, {
    type: 'Sawed-Off',
    name: 'Rust Coat',
    quality: 'Factory New',
    marketPrice: 0.31,
    avgPrice: 0.30
}, {
    type: 'Sawed-Off',
    name: 'Rust Coat',
    quality: 'Minimal Wear',
    marketPrice: 0.27,
    avgPrice: 0.23
}, {
    type: 'Sawed-Off',
    name: 'Rust Coat',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.22
}, {
    type: 'Sawed-Off',
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 0.26,
    avgPrice: 0.22
}, {
    type: 'Sawed-Off',
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 0.19,
    avgPrice: 0.22
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Rust Coat',
    quality: 'Factory New',
    marketPrice: 2.02,
    avgPrice: 1.83
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Rust Coat',
    quality: 'Minimal Wear',
    marketPrice: 0.40,
    avgPrice: 0.41
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Rust Coat',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.26
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Rust Coat',
    quality: 'Well-Worn',
    marketPrice: 0.49,
    avgPrice: 0.54
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Rust Coat',
    quality: 'Battle-Scarred',
    marketPrice: 1.26,
    avgPrice: 0.60
}, {
    type: 'Sawed-Off',
    name: 'Sage Spray',
    quality: 'Factory New',
    marketPrice: 0.26,
    avgPrice: 0.26
}, {
    type: 'Sawed-Off',
    name: 'Sage Spray',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Sage Spray',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Sage Spray',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Sage Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Sage Spray',
    quality: 'Factory New',
    marketPrice: 4.62,
    avgPrice: 4.05
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Sage Spray',
    quality: 'Minimal Wear',
    marketPrice: 0.32,
    avgPrice: 0.27
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Sage Spray',
    quality: 'Field-Tested',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Sage Spray',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.18
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Sage Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.18
}, {
    type: 'Sawed-Off',
    name: 'Serenity',
    quality: 'Factory New',
    marketPrice: 0.73,
    avgPrice: 0.66
}, {
    type: 'Sawed-Off',
    name: 'Serenity',
    quality: 'Minimal Wear',
    marketPrice: 0.43,
    avgPrice: 0.42
}, {
    type: 'Sawed-Off',
    name: 'Serenity',
    quality: 'Field-Tested',
    marketPrice: 0.32,
    avgPrice: 0.33
}, {
    type: 'Sawed-Off',
    name: 'Serenity',
    quality: 'Well-Worn',
    marketPrice: 0.41,
    avgPrice: 0.39
}, {
    type: 'Sawed-Off',
    name: 'Serenity',
    quality: 'Battle-Scarred',
    marketPrice: 0.53,
    avgPrice: 0.39
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Serenity',
    quality: 'Factory New',
    marketPrice: 2.80,
    avgPrice: 2.74
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Serenity',
    quality: 'Minimal Wear',
    marketPrice: 1.67,
    avgPrice: 1.45
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Serenity',
    quality: 'Field-Tested',
    marketPrice: 1.01,
    avgPrice: 1.05
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Serenity',
    quality: 'Well-Worn',
    marketPrice: 1.26,
    avgPrice: 1.21
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Serenity',
    quality: 'Battle-Scarred',
    marketPrice: 1.08,
    avgPrice: 1.02
}, {
    type: 'Sawed-Off',
    name: 'Snake Camo',
    quality: 'Factory New',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'Sawed-Off',
    name: 'Snake Camo',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Snake Camo',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Snake Camo',
    quality: 'Well-Worn',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Sawed-Off',
    name: 'Snake Camo',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Snake Camo',
    quality: 'Factory New',
    marketPrice: 5.40,
    avgPrice: 5.51
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Snake Camo',
    quality: 'Minimal Wear',
    marketPrice: 0.46,
    avgPrice: 0.42
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Snake Camo',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.19
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Snake Camo',
    quality: 'Well-Worn',
    marketPrice: 0.41,
    avgPrice: 0.40
}, {
    type: 'Souvenir Sawed-Off',
    name: 'Snake Camo',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'Sawed-Off',
    name: 'The Kraken',
    quality: 'Factory New',
    marketPrice: 5.38,
    avgPrice: 4.94
}, {
    type: 'Sawed-Off',
    name: 'The Kraken',
    quality: 'Minimal Wear',
    marketPrice: 3.56,
    avgPrice: 3.53
}, {
    type: 'Sawed-Off',
    name: 'The Kraken',
    quality: 'Field-Tested',
    marketPrice: 3.02,
    avgPrice: 2.85
}, {
    type: 'Sawed-Off',
    name: 'The Kraken',
    quality: 'Well-Worn',
    marketPrice: 4.20,
    avgPrice: 3.36
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'The Kraken',
    quality: 'Factory New',
    marketPrice: 36.65,
    avgPrice: 37.37
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'The Kraken',
    quality: 'Minimal Wear',
    marketPrice: 16.53,
    avgPrice: 15.99
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'The Kraken',
    quality: 'Field-Tested',
    marketPrice: 9.96,
    avgPrice: 9.63
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'The Kraken',
    quality: 'Well-Worn',
    marketPrice: 20.01,
    avgPrice: 24.20
}, {
    type: 'Sawed-Off',
    name: 'Yorick',
    quality: 'Factory New',
    marketPrice: 0.41,
    avgPrice: 0.37
}, {
    type: 'Sawed-Off',
    name: 'Yorick',
    quality: 'Minimal Wear',
    marketPrice: 0.14,
    avgPrice: 0.12
}, {
    type: 'Sawed-Off',
    name: 'Yorick',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Sawed-Off',
    name: 'Yorick',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Sawed-Off',
    name: 'Yorick',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Yorick',
    quality: 'Factory New',
    marketPrice: 1.63,
    avgPrice: 1.64
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Yorick',
    quality: 'Minimal Wear',
    marketPrice: 0.60,
    avgPrice: 0.58
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Yorick',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.26
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Yorick',
    quality: 'Well-Worn',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Yorick',
    quality: 'Battle-Scarred',
    marketPrice: 0.27,
    avgPrice: 0.24
}, {
    type: 'SCAR-20',
    name: 'Army Sheen',
    quality: 'Factory New',
    marketPrice: 0.20,
    avgPrice: 0.16
}, {
    type: 'SCAR-20',
    name: 'Army Sheen',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.05
}, {
    type: 'SCAR-20',
    name: 'Army Sheen',
    quality: 'Field-Tested',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Bloodsport',
    quality: 'Factory New',
    marketPrice: 5.22,
    avgPrice: 4.64
}, {
    type: 'SCAR-20',
    name: 'Bloodsport',
    quality: 'Minimal Wear',
    marketPrice: 3.79,
    avgPrice: 3.65
}, {
    type: 'SCAR-20',
    name: 'Bloodsport',
    quality: 'Field-Tested',
    marketPrice: 2.83,
    avgPrice: 2.94
}, {
    type: 'SCAR-20',
    name: 'Bloodsport',
    quality: 'Well-Worn',
    marketPrice: 3.49,
    avgPrice: 2.96
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Bloodsport',
    quality: 'Factory New',
    marketPrice: 21.98,
    avgPrice: 19.69
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Bloodsport',
    quality: 'Minimal Wear',
    marketPrice: 12.09,
    avgPrice: 12.49
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Bloodsport',
    quality: 'Field-Tested',
    marketPrice: 8.51,
    avgPrice: 8.68
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Bloodsport',
    quality: 'Well-Worn',
    marketPrice: 8.90,
    avgPrice: 7.70
}, {
    type: 'SCAR-20',
    name: 'Carbon Fiber',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'SCAR-20',
    name: 'Carbon Fiber',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Souvenir SCAR-20',
    name: 'Carbon Fiber',
    quality: 'Factory New',
    marketPrice: 1.40,
    avgPrice: 1.36
}, {
    type: 'Souvenir SCAR-20',
    name: 'Carbon Fiber',
    quality: 'Minimal Wear',
    marketPrice: 1.47,
    avgPrice: 1.36
}, {
    type: 'SCAR-20',
    name: 'Cardiac',
    quality: 'Factory New',
    marketPrice: 7.87,
    avgPrice: 6.02
}, {
    type: 'SCAR-20',
    name: 'Cardiac',
    quality: 'Minimal Wear',
    marketPrice: 2.45,
    avgPrice: 2.42
}, {
    type: 'SCAR-20',
    name: 'Cardiac',
    quality: 'Field-Tested',
    marketPrice: 2.01,
    avgPrice: 1.83
}, {
    type: 'SCAR-20',
    name: 'Cardiac',
    quality: 'Well-Worn',
    marketPrice: 1.84,
    avgPrice: 1.80
}, {
    type: 'SCAR-20',
    name: 'Cardiac',
    quality: 'Battle-Scarred',
    marketPrice: 2.14,
    avgPrice: 2.02
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cardiac',
    quality: 'Factory New',
    marketPrice: 44.94,
    avgPrice: 47.44
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cardiac',
    quality: 'Minimal Wear',
    marketPrice: 9.51,
    avgPrice: 8.30
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cardiac',
    quality: 'Field-Tested',
    marketPrice: 6.00,
    avgPrice: 6.07
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cardiac',
    quality: 'Well-Worn',
    marketPrice: 6.67,
    avgPrice: 5.19
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cardiac',
    quality: 'Battle-Scarred',
    marketPrice: 6.34,
    avgPrice: 5.31
}, {
    type: 'Cologne 2016 Cache Souvenir Package',
    name: '',
    quality: '',
    marketPrice: 5.10,
    avgPrice: 3.95
}, {
    type: 'SCAR-20',
    name: 'Contractor',
    quality: 'Factory New',
    marketPrice: 0.09,
    avgPrice: 0.08
}, {
    type: 'SCAR-20',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir SCAR-20',
    name: 'Contractor',
    quality: 'Minimal Wear',
    marketPrice: 2.39,
    avgPrice: 1.65
}, {
    type: 'Souvenir SCAR-20',
    name: 'Contractor',
    quality: 'Field-Tested',
    marketPrice: 0.83,
    avgPrice: 0.79
}, {
    type: 'Souvenir SCAR-20',
    name: 'Contractor',
    quality: 'Well-Worn',
    marketPrice: 2.30,
    avgPrice: 2.26
}, {
    type: 'Souvenir SCAR-20',
    name: 'Contractor',
    quality: 'Battle-Scarred',
    marketPrice: 2.88,
    avgPrice: 1.70
}, {
    type: 'SCAR-20',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 4.49,
    avgPrice: 3.74
}, {
    type: 'SCAR-20',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 0.93,
    avgPrice: 0.85
}, {
    type: 'SCAR-20',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 0.60,
    avgPrice: 0.61
}, {
    type: 'SCAR-20',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 0.58,
    avgPrice: 0.54
}, {
    type: 'SCAR-20',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 0.63,
    avgPrice: 0.54
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 26.35,
    avgPrice: 25.89
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 1.99,
    avgPrice: 2.00
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 1.21,
    avgPrice: 1.23
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 1.33,
    avgPrice: 1.22
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 1.22,
    avgPrice: 1.12
}, {
    type: 'SCAR-20',
    name: 'Cyrex',
    quality: 'Factory New',
    marketPrice: 5.19,
    avgPrice: 4.65
}, {
    type: 'SCAR-20',
    name: 'Cyrex',
    quality: 'Minimal Wear',
    marketPrice: 2.90,
    avgPrice: 3.05
}, {
    type: 'SCAR-20',
    name: 'Cyrex',
    quality: 'Field-Tested',
    marketPrice: 2.64,
    avgPrice: 2.52
}, {
    type: 'SCAR-20',
    name: 'Cyrex',
    quality: 'Well-Worn',
    marketPrice: 2.82,
    avgPrice: 2.59
}, {
    type: 'SCAR-20',
    name: 'Cyrex',
    quality: 'Battle-Scarred',
    marketPrice: 3.16,
    avgPrice: 2.51
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Factory New',
    marketPrice: 18.67,
    avgPrice: 18.29
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Minimal Wear',
    marketPrice: 11.39,
    avgPrice: 11.42
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Field-Tested',
    marketPrice: 7.65,
    avgPrice: 5.68
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Well-Worn',
    marketPrice: 5.60,
    avgPrice: 5.49
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Battle-Scarred',
    marketPrice: 14.40,
    avgPrice: 12.29
}, {
    type: 'SCAR-20',
    name: 'Emerald',
    quality: 'Factory New',
    marketPrice: 4.14,
    avgPrice: 4.03
}, {
    type: 'SCAR-20',
    name: 'Emerald',
    quality: 'Minimal Wear',
    marketPrice: 14.04,
    avgPrice: 13.33
}, {
    type: 'SCAR-20',
    name: 'Green Marine',
    quality: 'Factory New',
    marketPrice: 0.16,
    avgPrice: 0.16
}, {
    type: 'SCAR-20',
    name: 'Green Marine',
    quality: 'Minimal Wear',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'SCAR-20',
    name: 'Green Marine',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'SCAR-20',
    name: 'Green Marine',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'SCAR-20',
    name: 'Green Marine',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Green Marine',
    quality: 'Factory New',
    marketPrice: 0.77,
    avgPrice: 0.74
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Green Marine',
    quality: 'Minimal Wear',
    marketPrice: 0.39,
    avgPrice: 0.40
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Green Marine',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.23
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Green Marine',
    quality: 'Well-Worn',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Green Marine',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'SCAR-20',
    name: 'Grotto',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.15
}, {
    type: 'SCAR-20',
    name: 'Grotto',
    quality: 'Minimal Wear',
    marketPrice: 0.13,
    avgPrice: 0.12
}, {
    type: 'SCAR-20',
    name: 'Grotto',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'SCAR-20',
    name: 'Grotto',
    quality: 'Well-Worn',
    marketPrice: 0.20,
    avgPrice: 0.18
}, {
    type: 'SCAR-20',
    name: 'Grotto',
    quality: 'Battle-Scarred',
    marketPrice: 0.14,
    avgPrice: 0.15
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Grotto',
    quality: 'Factory New',
    marketPrice: 0.70,
    avgPrice: 0.65
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Grotto',
    quality: 'Minimal Wear',
    marketPrice: 0.38,
    avgPrice: 0.33
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Grotto',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.24
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Grotto',
    quality: 'Well-Worn',
    marketPrice: 0.38,
    avgPrice: 0.33
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Grotto',
    quality: 'Battle-Scarred',
    marketPrice: 0.31,
    avgPrice: 0.30
}, {
    type: 'SCAR-20',
    name: 'Outbreak',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.26
}, {
    type: 'SCAR-20',
    name: 'Outbreak',
    quality: 'Minimal Wear',
    marketPrice: 0.14,
    avgPrice: 0.13
}, {
    type: 'SCAR-20',
    name: 'Outbreak',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'SCAR-20',
    name: 'Outbreak',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'SCAR-20',
    name: 'Outbreak',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Outbreak',
    quality: 'Factory New',
    marketPrice: 1.17,
    avgPrice: 1.18
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Outbreak',
    quality: 'Minimal Wear',
    marketPrice: 0.60,
    avgPrice: 0.60
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Outbreak',
    quality: 'Field-Tested',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Outbreak',
    quality: 'Well-Worn',
    marketPrice: 0.37,
    avgPrice: 0.33
}, {
    type: 'SCAR-20',
    statTrak: true,
    name: 'Outbreak',
    quality: 'Battle-Scarred',
    marketPrice: 0.32,
    avgPrice: 0.29
}, {
    type: 'SCAR-20',
    name: 'Palm',
    quality: 'Factory New',
    marketPrice: 7.63,
    avgPrice: 6.38
}, {
    type: 'SCAR-20',
    name: 'Palm',
    quality: 'Minimal Wear',
    marketPrice: 1.06,
    avgPrice: 0.75
}, {
    type: 'SCAR-20',
    name: 'Palm',
    quality: 'Field-Tested',
    marketPrice: 0.63,
    avgPrice: 0.51
}, {
    type: 'SCAR-20',
    name: 'Palm',
    quality: 'Well-Worn',
    marketPrice: 0.78,
    avgPrice: 0.53
}, {
    type: 'SCAR-20',
    name: 'Palm',
    quality: 'Battle-Scarred',
    marketPrice: 0.47,
    avgPrice: 0.45
}, {
    type: 'SCAR-20',
    name: 'Sand Mesh',
    quality: 'Factory New',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'SCAR-20',
    name: 'Sand Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Sand Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Sand Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Sand Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'Souvenir SCAR-20',
    name: 'Sand Mesh',
    quality: 'Factory New',
    marketPrice: 3.00,
    avgPrice: 3.98
}, {
    type: 'Souvenir SCAR-20',
    name: 'Sand Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.31,
    avgPrice: 0.30
}, {
    type: 'Souvenir SCAR-20',
    name: 'Sand Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'Souvenir SCAR-20',
    name: 'Sand Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.24,
    avgPrice: 0.19
}, {
    type: 'Souvenir SCAR-20',
    name: 'Sand Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.19
}, {
    type: 'SCAR-20',
    name: 'Splash Jam',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 364.25
}, {
    type: 'SCAR-20',
    name: 'Splash Jam',
    quality: 'Minimal Wear',
    marketPrice: 14.10,
    avgPrice: 12.34
}, {
    type: 'SCAR-20',
    name: 'Splash Jam',
    quality: 'Field-Tested',
    marketPrice: 1.90,
    avgPrice: 1.93
}, {
    type: 'SCAR-20',
    name: 'Splash Jam',
    quality: 'Well-Worn',
    marketPrice: 1.96,
    avgPrice: 1.94
}, {
    type: 'SCAR-20',
    name: 'Splash Jam',
    quality: 'Battle-Scarred',
    marketPrice: 1.63,
    avgPrice: 1.53
}, {
    type: 'SCAR-20',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 0.27,
    avgPrice: 0.29
}, {
    type: 'SCAR-20',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'SCAR-20',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'SCAR-20',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Souvenir SCAR-20',
    name: 'Storm',
    quality: 'Factory New',
    marketPrice: 2.61,
    avgPrice: 2.14
}, {
    type: 'Souvenir SCAR-20',
    name: 'Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.30
}, {
    type: 'Souvenir SCAR-20',
    name: 'Storm',
    quality: 'Field-Tested',
    marketPrice: 0.15,
    avgPrice: 0.16
}, {
    type: 'Souvenir SCAR-20',
    name: 'Storm',
    quality: 'Well-Worn',
    marketPrice: 0.25,
    avgPrice: 0.22
}, {
    type: 'Souvenir SCAR-20',
    name: 'Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.18
}, {
    type: 'SG 553',
    name: 'Aerial',
    quality: 'Factory New',
    marketPrice: 0.65,
    avgPrice: 0.63
}, {
    type: 'SG 553',
    name: 'Aerial',
    quality: 'Minimal Wear',
    marketPrice: 0.37,
    avgPrice: 0.37
}, {
    type: 'SG 553',
    name: 'Aerial',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.21
}, {
    type: 'SG 553',
    name: 'Aerial',
    quality: 'Well-Worn',
    marketPrice: 0.30,
    avgPrice: 0.24
}, {
    type: 'SG 553',
    name: 'Aerial',
    quality: 'Battle-Scarred',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Aerial',
    quality: 'Factory New',
    marketPrice: 3.00,
    avgPrice: 3.17
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Aerial',
    quality: 'Minimal Wear',
    marketPrice: 1.67,
    avgPrice: 1.63
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Aerial',
    quality: 'Field-Tested',
    marketPrice: 0.71,
    avgPrice: 0.75
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Aerial',
    quality: 'Well-Worn',
    marketPrice: 1.41,
    avgPrice: 1.30
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Aerial',
    quality: 'Battle-Scarred',
    marketPrice: 0.50,
    avgPrice: 0.65
}, {
    type: 'SG 553',
    name: 'Anodized Navy',
    quality: 'Factory New',
    marketPrice: 0.23,
    avgPrice: 0.25
}, {
    type: 'SG 553',
    name: 'Anodized Navy',
    quality: 'Minimal Wear',
    marketPrice: 0.32,
    avgPrice: 0.32
}, {
    type: 'Souvenir SG 553',
    name: 'Anodized Navy',
    quality: 'Factory New',
    marketPrice: 24.41,
    avgPrice: 28.17
}, {
    type: 'SG 553',
    name: 'Army Sheen',
    quality: 'Factory New',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'SG 553',
    name: 'Army Sheen',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SG 553',
    name: 'Army Sheen',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SG 553',
    name: 'Atlas',
    quality: 'Factory New',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'SG 553',
    name: 'Atlas',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'SG 553',
    name: 'Atlas',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'SG 553',
    name: 'Atlas',
    quality: 'Well-Worn',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'SG 553',
    name: 'Atlas',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.08
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Atlas',
    quality: 'Factory New',
    marketPrice: 1.78,
    avgPrice: 1.66
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Atlas',
    quality: 'Minimal Wear',
    marketPrice: 0.71,
    avgPrice: 0.60
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Atlas',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.32
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Atlas',
    quality: 'Well-Worn',
    marketPrice: 1.58,
    avgPrice: 1.46
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Atlas',
    quality: 'Battle-Scarred',
    marketPrice: 0.30,
    avgPrice: 0.32
}, {
    type: 'SG 553',
    name: 'Bulldozer',
    quality: 'Factory New',
    marketPrice: 20.98,
    avgPrice: 21.22
}, {
    type: 'SG 553',
    name: 'Bulldozer',
    quality: 'Minimal Wear',
    marketPrice: 7.56,
    avgPrice: 6.73
}, {
    type: 'SG 553',
    name: 'Bulldozer',
    quality: 'Field-Tested',
    marketPrice: 4.98,
    avgPrice: 5.01
}, {
    type: 'SG 553',
    name: 'Bulldozer',
    quality: 'Well-Worn',
    marketPrice: 5.17,
    avgPrice: 5.00
}, {
    type: 'SG 553',
    name: 'Bulldozer',
    quality: 'Battle-Scarred',
    marketPrice: 5.07,
    avgPrice: 4.78
}, {
    type: 'SG 553',
    name: 'Cyrex',
    quality: 'Factory New',
    marketPrice: 6.23,
    avgPrice: 5.50
}, {
    type: 'SG 553',
    name: 'Cyrex',
    quality: 'Minimal Wear',
    marketPrice: 2.93,
    avgPrice: 2.81
}, {
    type: 'SG 553',
    name: 'Cyrex',
    quality: 'Field-Tested',
    marketPrice: 2.00,
    avgPrice: 1.86
}, {
    type: 'SG 553',
    name: 'Cyrex',
    quality: 'Well-Worn',
    marketPrice: 1.74,
    avgPrice: 1.69
}, {
    type: 'SG 553',
    name: 'Cyrex',
    quality: 'Battle-Scarred',
    marketPrice: 1.72,
    avgPrice: 1.64
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Factory New',
    marketPrice: 20.01,
    avgPrice: 21.84
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Minimal Wear',
    marketPrice: 9.63,
    avgPrice: 9.17
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Field-Tested',
    marketPrice: 6.32,
    avgPrice: 5.23
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Well-Worn',
    marketPrice: 4.79,
    avgPrice: 4.18
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Cyrex',
    quality: 'Battle-Scarred',
    marketPrice: 4.55,
    avgPrice: 3.90
}, {
    type: 'SG 553',
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 0.43,
    avgPrice: 0.39
}, {
    type: 'SG 553',
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 0.25,
    avgPrice: 0.14
}, {
    type: 'SG 553',
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'SG 553',
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'SG 553',
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'Souvenir SG 553',
    name: 'Damascus Steel',
    quality: 'Factory New',
    marketPrice: 44.43,
    avgPrice: 43.15
}, {
    type: 'Souvenir SG 553',
    name: 'Damascus Steel',
    quality: 'Minimal Wear',
    marketPrice: 2.95,
    avgPrice: 3.11
}, {
    type: 'Souvenir SG 553',
    name: 'Damascus Steel',
    quality: 'Field-Tested',
    marketPrice: 2.09,
    avgPrice: 2.00
}, {
    type: 'Souvenir SG 553',
    name: 'Damascus Steel',
    quality: 'Well-Worn',
    marketPrice: 1.27,
    avgPrice: 1.19
}, {
    type: 'Souvenir SG 553',
    name: 'Damascus Steel',
    quality: 'Battle-Scarred',
    marketPrice: 1.26,
    avgPrice: 1.18
}, {
    type: 'SG 553',
    name: 'Fallout Warning',
    quality: 'Factory New',
    marketPrice: 0.41,
    avgPrice: 0.40
}, {
    type: 'SG 553',
    name: 'Fallout Warning',
    quality: 'Minimal Wear',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'SG 553',
    name: 'Fallout Warning',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'SG 553',
    name: 'Fallout Warning',
    quality: 'Well-Worn',
    marketPrice: 0.18,
    avgPrice: 0.16
}, {
    type: 'SG 553',
    name: 'Fallout Warning',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Souvenir SG 553',
    name: 'Fallout Warning',
    quality: 'Factory New',
    marketPrice: 3.41,
    avgPrice: 2.81
}, {
    type: 'Souvenir SG 553',
    name: 'Fallout Warning',
    quality: 'Minimal Wear',
    marketPrice: 0.84,
    avgPrice: 0.88
}, {
    type: 'Souvenir SG 553',
    name: 'Fallout Warning',
    quality: 'Field-Tested',
    marketPrice: 0.48,
    avgPrice: 0.40
}, {
    type: 'Souvenir SG 553',
    name: 'Fallout Warning',
    quality: 'Well-Worn',
    marketPrice: 1.27,
    avgPrice: 0.68
}, {
    type: 'Souvenir SG 553',
    name: 'Fallout Warning',
    quality: 'Battle-Scarred',
    marketPrice: 0.55,
    avgPrice: 0.37
}, {
    type: 'SG 553',
    name: 'Gator Mesh',
    quality: 'Factory New',
    marketPrice: 0.77,
    avgPrice: 0.73
}, {
    type: 'SG 553',
    name: 'Gator Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.62,
    avgPrice: 0.55
}, {
    type: 'SG 553',
    name: 'Gator Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.58,
    avgPrice: 0.51
}, {
    type: 'SG 553',
    name: 'Gator Mesh',
    quality: 'Well-Worn',
    marketPrice: 1.01,
    avgPrice: 0.86
}, {
    type: 'SG 553',
    name: 'Gator Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 1.04,
    avgPrice: 0.91
}, {
    type: 'Souvenir SG 553',
    name: 'Gator Mesh',
    quality: 'Factory New',
    marketPrice: 2.00,
    avgPrice: 1.95
}, {
    type: 'Souvenir SG 553',
    name: 'Gator Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.86,
    avgPrice: 0.81
}, {
    type: 'Souvenir SG 553',
    name: 'Gator Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.49
}, {
    type: 'Souvenir SG 553',
    name: 'Gator Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.95,
    avgPrice: 0.95
}, {
    type: 'Souvenir SG 553',
    name: 'Gator Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.86,
    avgPrice: 0.63
}, {
    type: 'SG 553',
    name: 'Pulse',
    quality: 'Minimal Wear',
    marketPrice: 0.94,
    avgPrice: 0.86
}, {
    type: 'SG 553',
    name: 'Pulse',
    quality: 'Field-Tested',
    marketPrice: 0.38,
    avgPrice: 0.37
}, {
    type: 'SG 553',
    name: 'Pulse',
    quality: 'Well-Worn',
    marketPrice: 0.60,
    avgPrice: 0.55
}, {
    type: 'SG 553',
    name: 'Pulse',
    quality: 'Battle-Scarred',
    marketPrice: 0.36,
    avgPrice: 0.35
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Pulse',
    quality: 'Minimal Wear',
    marketPrice: 3.18,
    avgPrice: 3.38
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Pulse',
    quality: 'Field-Tested',
    marketPrice: 1.23,
    avgPrice: 1.14
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Pulse',
    quality: 'Well-Worn',
    marketPrice: 1.53,
    avgPrice: 1.44
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Pulse',
    quality: 'Battle-Scarred',
    marketPrice: 1.18,
    avgPrice: 1.03
}, {
    type: 'SG 553',
    name: 'Tiger Moth',
    quality: 'Factory New',
    marketPrice: 2.10,
    avgPrice: 2.16
}, {
    type: 'SG 553',
    name: 'Tiger Moth',
    quality: 'Minimal Wear',
    marketPrice: 1.00,
    avgPrice: 0.95
}, {
    type: 'SG 553',
    name: 'Tiger Moth',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.51
}, {
    type: 'SG 553',
    name: 'Tiger Moth',
    quality: 'Well-Worn',
    marketPrice: 0.50,
    avgPrice: 0.48
}, {
    type: 'SG 553',
    name: 'Tiger Moth',
    quality: 'Battle-Scarred',
    marketPrice: 0.49,
    avgPrice: 0.45
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Tiger Moth',
    quality: 'Factory New',
    marketPrice: 9.05,
    avgPrice: 10.00
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Tiger Moth',
    quality: 'Minimal Wear',
    marketPrice: 4.49,
    avgPrice: 4.01
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Tiger Moth',
    quality: 'Field-Tested',
    marketPrice: 1.74,
    avgPrice: 1.94
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Tiger Moth',
    quality: 'Well-Worn',
    marketPrice: 1.70,
    avgPrice: 1.61
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Tiger Moth',
    quality: 'Battle-Scarred',
    marketPrice: 1.67,
    avgPrice: 1.53
}, {
    type: 'SG 553',
    name: 'Tornado',
    quality: 'Factory New',
    marketPrice: 7.90,
    avgPrice: 6.61
}, {
    type: 'SG 553',
    name: 'Tornado',
    quality: 'Minimal Wear',
    marketPrice: 1.15,
    avgPrice: 1.23
}, {
    type: 'SG 553',
    name: 'Tornado',
    quality: 'Field-Tested',
    marketPrice: 1.01,
    avgPrice: 1.04
}, {
    type: 'SG 553',
    name: 'Tornado',
    quality: 'Well-Worn',
    marketPrice: 2.23,
    avgPrice: 1.93
}, {
    type: 'SG 553',
    name: 'Tornado',
    quality: 'Battle-Scarred',
    marketPrice: 1.09,
    avgPrice: 1.07
}, {
    type: 'SG 553',
    name: 'Traveler',
    quality: 'Factory New',
    marketPrice: 1.55,
    avgPrice: 1.65
}, {
    type: 'SG 553',
    name: 'Traveler',
    quality: 'Minimal Wear',
    marketPrice: 0.70,
    avgPrice: 0.73
}, {
    type: 'SG 553',
    name: 'Traveler',
    quality: 'Field-Tested',
    marketPrice: 0.50,
    avgPrice: 0.33
}, {
    type: 'SG 553',
    name: 'Traveler',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.35
}, {
    type: 'SG 553',
    name: 'Traveler',
    quality: 'Battle-Scarred',
    marketPrice: 0.40,
    avgPrice: 0.75
}, {
    type: 'SG 553',
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 6.50,
    avgPrice: 5.74
}, {
    type: 'SG 553',
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 0.99,
    avgPrice: 0.91
}, {
    type: 'SG 553',
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 0.81,
    avgPrice: 0.71
}, {
    type: 'SG 553',
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 1.00,
    avgPrice: 0.93
}, {
    type: 'SG 553',
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 0.74,
    avgPrice: 0.70
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Factory New',
    marketPrice: 51.45,
    avgPrice: 42.43
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Minimal Wear',
    marketPrice: 2.42,
    avgPrice: 2.34
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Field-Tested',
    marketPrice: 1.84,
    avgPrice: 1.47
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Well-Worn',
    marketPrice: 1.80,
    avgPrice: 1.53
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Ultraviolet',
    quality: 'Battle-Scarred',
    marketPrice: 1.51,
    avgPrice: 1.42
}, {
    type: 'SG 553',
    name: 'Wave Spray',
    quality: 'Factory New',
    marketPrice: 4.96,
    avgPrice: 3.74
}, {
    type: 'SG 553',
    name: 'Wave Spray',
    quality: 'Minimal Wear',
    marketPrice: 0.86,
    avgPrice: 0.77
}, {
    type: 'SG 553',
    name: 'Wave Spray',
    quality: 'Field-Tested',
    marketPrice: 0.76,
    avgPrice: 0.64
}, {
    type: 'SG 553',
    name: 'Wave Spray',
    quality: 'Well-Worn',
    marketPrice: 0.72,
    avgPrice: 0.58
}, {
    type: 'SG 553',
    name: 'Wave Spray',
    quality: 'Battle-Scarred',
    marketPrice: 0.70,
    avgPrice: 0.48
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Wave Spray',
    quality: 'Factory New',
    marketPrice: 29.98,
    avgPrice: 32.05
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Wave Spray',
    quality: 'Minimal Wear',
    marketPrice: 2.20,
    avgPrice: 1.93
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Wave Spray',
    quality: 'Field-Tested',
    marketPrice: 1.46,
    avgPrice: 1.27
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Wave Spray',
    quality: 'Well-Worn',
    marketPrice: 1.64,
    avgPrice: 1.33
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Wave Spray',
    quality: 'Battle-Scarred',
    marketPrice: 1.17,
    avgPrice: 1.11
}, {
    type: 'SG 553',
    name: 'Waves Perforated',
    quality: 'Factory New',
    marketPrice: 0.15,
    avgPrice: 0.15
}, {
    type: 'SG 553',
    name: 'Waves Perforated',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SG 553',
    name: 'Waves Perforated',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SG 553',
    name: 'Waves Perforated',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SG 553',
    name: 'Waves Perforated',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir SG 553',
    name: 'Waves Perforated',
    quality: 'Minimal Wear',
    marketPrice: 2.00,
    avgPrice: 2.15
}, {
    type: 'Souvenir SG 553',
    name: 'Waves Perforated',
    quality: 'Field-Tested',
    marketPrice: 1.04,
    avgPrice: 1.67
}, {
    type: 'Souvenir SG 553',
    name: 'Waves Perforated',
    quality: 'Well-Worn',
    marketPrice: 3.04,
    avgPrice: 2.44
}, {
    type: 'Souvenir SG 553',
    name: 'Waves Perforated',
    quality: 'Battle-Scarred',
    marketPrice: 1.70,
    avgPrice: 1.39
}, {
    type: 'Shadow Daggers',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 119.30,
    avgPrice: 106.72
}, {
    type: 'Shadow Daggers',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 61.83,
    avgPrice: 58.98
}, {
    type: 'Shadow Daggers',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 53.64,
    avgPrice: 53.43
}, {
    type: 'Shadow Daggers',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 53.63,
    avgPrice: 52.17
}, {
    type: 'Shadow Daggers',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 52.41,
    avgPrice: 50.75
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 319.78,
    avgPrice: 404.06
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 121.46,
    avgPrice: 119.32
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 80.50,
    avgPrice: 76.96
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 84.29,
    avgPrice: 78.54
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 106.57,
    avgPrice: 94.39
}, {
    type: 'Shadow Daggers',
    name: 'Boreal Forest',
    quality: 'Factory New',
    marketPrice: 120.68,
    avgPrice: 105.49
}, {
    type: 'Shadow Daggers',
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 52.53,
    avgPrice: 46.24
}, {
    type: 'Shadow Daggers',
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 42.14,
    avgPrice: 41.93
}, {
    type: 'Shadow Daggers',
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 45.72,
    avgPrice: 42.41
}, {
    type: 'Shadow Daggers',
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 41.93,
    avgPrice: 39.80
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Minimal Wear',
    marketPrice: 94.00,
    avgPrice: 129.12
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Field-Tested',
    marketPrice: 72.18,
    avgPrice: 60.58
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Well-Worn',
    marketPrice: 71.11,
    avgPrice: 54.73
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Boreal Forest',
    quality: 'Battle-Scarred',
    marketPrice: 77.75,
    avgPrice: 55.35
}, {
    type: 'Shadow Daggers',
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 145.29,
    avgPrice: 117.71
}, {
    type: 'Shadow Daggers',
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 73.76,
    avgPrice: 69.46
}, {
    type: 'Shadow Daggers',
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 65.37,
    avgPrice: 64.33
}, {
    type: 'Shadow Daggers',
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 61.00,
    avgPrice: 61.53
}, {
    type: 'Shadow Daggers',
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 59.62,
    avgPrice: 59.41
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Factory New',
    marketPrice: 399.47,
    avgPrice: 311.42
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Minimal Wear',
    marketPrice: 120.98,
    avgPrice: 109.29
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Field-Tested',
    marketPrice: 116.58,
    avgPrice: 112.51
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Well-Worn',
    marketPrice: 102.16,
    avgPrice: 112.04
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Case Hardened',
    quality: 'Battle-Scarred',
    marketPrice: 125.49,
    avgPrice: 102.61
}, {
    type: 'Shadow Daggers',
    name: 'Crimson Web',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 1531.25
}, {
    type: 'Shadow Daggers',
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 121.05,
    avgPrice: 110.23
}, {
    type: 'Shadow Daggers',
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 83.84,
    avgPrice: 80.86
}, {
    type: 'Shadow Daggers',
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 70.00,
    avgPrice: 84.97
}, {
    type: 'Shadow Daggers',
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 67.75,
    avgPrice: 58.67
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Minimal Wear',
    marketPrice: 249.97,
    avgPrice: 366.25
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Field-Tested',
    marketPrice: 116.68,
    avgPrice: 119.37
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Well-Worn',
    marketPrice: 145.88,
    avgPrice: 167.42
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Crimson Web',
    quality: 'Battle-Scarred',
    marketPrice: 94.57,
    avgPrice: 88.85
}, {
    type: 'Shadow Daggers',
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 130.48,
    avgPrice: 128.77
}, {
    type: 'Shadow Daggers',
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 226.89,
    avgPrice: 192.51
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Fade',
    quality: 'Factory New',
    marketPrice: 234.44,
    avgPrice: 217.78
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Fade',
    quality: 'Minimal Wear',
    marketPrice: 330.34,
    avgPrice: 343.05
}, {
    type: 'Shadow Daggers',
    name: 'Forest DDPAT',
    quality: 'Factory New',
    marketPrice: 99.66,
    avgPrice: 73.39
}, {
    type: 'Shadow Daggers',
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 51.00,
    avgPrice: 49.78
}, {
    type: 'Shadow Daggers',
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 43.79,
    avgPrice: 42.78
}, {
    type: 'Shadow Daggers',
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 45.96,
    avgPrice: 43.91
}, {
    type: 'Shadow Daggers',
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 40.88,
    avgPrice: 40.16
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 88.70,
    avgPrice: 77.00
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Field-Tested',
    marketPrice: 66.40,
    avgPrice: 58.87
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Well-Worn',
    marketPrice: 81.79,
    avgPrice: 63.31
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Forest DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 56.90,
    avgPrice: 50.73
}, {
    type: 'Shadow Daggers',
    name: 'Night',
    quality: 'Factory New',
    marketPrice: 398.33,
    avgPrice: 351.70
}, {
    type: 'Shadow Daggers',
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 71.65,
    avgPrice: 65.51
}, {
    type: 'Shadow Daggers',
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 53.87,
    avgPrice: 53.12
}, {
    type: 'Shadow Daggers',
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 62.93,
    avgPrice: 60.56
}, {
    type: 'Shadow Daggers',
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 47.88,
    avgPrice: 44.68
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Night',
    quality: 'Minimal Wear',
    marketPrice: 123.87,
    avgPrice: 120.92
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Night',
    quality: 'Field-Tested',
    marketPrice: 80.50,
    avgPrice: 79.32
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Night',
    quality: 'Well-Worn',
    marketPrice: 114.39,
    avgPrice: 66.08
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Night',
    quality: 'Battle-Scarred',
    marketPrice: 73.10,
    avgPrice: 58.06
}, {
    type: 'Shadow Daggers',
    name: 'Safari Mesh',
    quality: 'Factory New',
    marketPrice: 144.37,
    avgPrice: 92.54
}, {
    type: 'Shadow Daggers',
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 45.96,
    avgPrice: 43.10
}, {
    type: 'Shadow Daggers',
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 40.72,
    avgPrice: 39.50
}, {
    type: 'Shadow Daggers',
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 45.09,
    avgPrice: 41.01
}, {
    type: 'Shadow Daggers',
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 42.15,
    avgPrice: 38.73
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Minimal Wear',
    marketPrice: 83.29,
    avgPrice: 78.66
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Field-Tested',
    marketPrice: 57.46,
    avgPrice: 53.86
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Well-Worn',
    marketPrice: 61.70,
    avgPrice: 78.72
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Safari Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 138.77,
    avgPrice: 50.89
}, {
    type: 'Shadow Daggers',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 193.28,
    avgPrice: 92.49
}, {
    type: 'Shadow Daggers',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 47.01,
    avgPrice: 45.77
}, {
    type: 'Shadow Daggers',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 38.06,
    avgPrice: 40.90
}, {
    type: 'Shadow Daggers',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 42.14,
    avgPrice: 41.61
}, {
    type: 'Shadow Daggers',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 41.32,
    avgPrice: 38.91
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 351.04,
    avgPrice: 1721.25
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 84.99,
    avgPrice: 87.78
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 58.35,
    avgPrice: 51.70
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 72.94,
    avgPrice: 59.58
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 65.51,
    avgPrice: 62.62
}, {
    type: 'Shadow Daggers',
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 119.94,
    avgPrice: 104.14
}, {
    type: 'Shadow Daggers',
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 95.00,
    avgPrice: 92.08
}, {
    type: 'Shadow Daggers',
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 90.13,
    avgPrice: 86.65
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Factory New',
    marketPrice: 205.45,
    avgPrice: 202.24
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Minimal Wear',
    marketPrice: 157.98,
    avgPrice: 149.92
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Slaughter',
    quality: 'Field-Tested',
    marketPrice: 166.58,
    avgPrice: 169.02
}, {
    type: 'Shadow Daggers',
    name: 'Stained',
    quality: 'Factory New',
    marketPrice: 85.99,
    avgPrice: 78.11
}, {
    type: 'Shadow Daggers',
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 56.18,
    avgPrice: 53.42
}, {
    type: 'Shadow Daggers',
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 52.30,
    avgPrice: 48.76
}, {
    type: 'Shadow Daggers',
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 42.73,
    avgPrice: 46.99
}, {
    type: 'Shadow Daggers',
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 47.75,
    avgPrice: 45.64
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Stained',
    quality: 'Minimal Wear',
    marketPrice: 85.00,
    avgPrice: 89.54
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Stained',
    quality: 'Field-Tested',
    marketPrice: 79.28,
    avgPrice: 69.82
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Stained',
    quality: 'Well-Worn',
    marketPrice: 93.28,
    avgPrice: 92.50
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Stained',
    quality: 'Battle-Scarred',
    marketPrice: 84.41,
    avgPrice: 71.51
}, {
    type: 'Shadow Daggers',
    name: 'Urban Masked',
    quality: 'Factory New',
    marketPrice: 133.28,
    avgPrice: 124.19
}, {
    type: 'Shadow Daggers',
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 54.62,
    avgPrice: 52.28
}, {
    type: 'Shadow Daggers',
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 46.04,
    avgPrice: 44.44
}, {
    type: 'Shadow Daggers',
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 51.41,
    avgPrice: 44.94
}, {
    type: 'Shadow Daggers',
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 45.02,
    avgPrice: 41.01
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Minimal Wear',
    marketPrice: 115.00,
    avgPrice: 101.77
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Field-Tested',
    marketPrice: 60.95,
    avgPrice: 62.55
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Well-Worn',
    marketPrice: 89.39,
    avgPrice: 70.42
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: 'Urban Masked',
    quality: 'Battle-Scarred',
    marketPrice: 70.63,
    avgPrice: 69.44
}, {
    type: 'Shadow Daggers',
    name: '',
    quality: '',
    marketPrice: 77.05,
    avgPrice: 77.48
}, {
    type: 'Shadow Daggers',
    statTrak: true,
    name: '',
    quality: '',
    marketPrice: 149.99,
    avgPrice: 123.31
}, {
    type: 'SSG 08',
    name: 'Abyss',
    quality: 'Factory New',
    marketPrice: 1.04,
    avgPrice: 0.97
}, {
    type: 'SSG 08',
    name: 'Abyss',
    quality: 'Minimal Wear',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'SSG 08',
    name: 'Abyss',
    quality: 'Field-Tested',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'SSG 08',
    name: 'Abyss',
    quality: 'Well-Worn',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'SSG 08',
    name: 'Abyss',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Abyss',
    quality: 'Factory New',
    marketPrice: 4.98,
    avgPrice: 4.59
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Abyss',
    quality: 'Minimal Wear',
    marketPrice: 1.08,
    avgPrice: 1.01
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Abyss',
    quality: 'Field-Tested',
    marketPrice: 0.41,
    avgPrice: 0.40
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Abyss',
    quality: 'Well-Worn',
    marketPrice: 0.37,
    avgPrice: 0.33
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Abyss',
    quality: 'Battle-Scarred',
    marketPrice: 0.37,
    avgPrice: 0.32
}, {
    type: 'SSG 08',
    name: 'Acid Fade',
    quality: 'Factory New',
    marketPrice: 0.46,
    avgPrice: 0.45
}, {
    type: 'Souvenir SSG 08',
    name: 'Acid Fade',
    quality: 'Factory New',
    marketPrice: 56.76,
    avgPrice: 42.50
}, {
    type: 'SSG 08',
    name: 'Big Iron',
    quality: 'Factory New',
    marketPrice: 5.48,
    avgPrice: 4.76
}, {
    type: 'SSG 08',
    name: 'Big Iron',
    quality: 'Minimal Wear',
    marketPrice: 2.99,
    avgPrice: 2.96
}, {
    type: 'SSG 08',
    name: 'Big Iron',
    quality: 'Field-Tested',
    marketPrice: 2.27,
    avgPrice: 2.16
}, {
    type: 'SSG 08',
    name: 'Big Iron',
    quality: 'Well-Worn',
    marketPrice: 2.25,
    avgPrice: 2.12
}, {
    type: 'SSG 08',
    name: 'Big Iron',
    quality: 'Battle-Scarred',
    marketPrice: 2.10,
    avgPrice: 1.93
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Big Iron',
    quality: 'Factory New',
    marketPrice: 20.54,
    avgPrice: 19.58
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Big Iron',
    quality: 'Minimal Wear',
    marketPrice: 12.55,
    avgPrice: 11.63
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Big Iron',
    quality: 'Field-Tested',
    marketPrice: 7.02,
    avgPrice: 5.79
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Big Iron',
    quality: 'Well-Worn',
    marketPrice: 8.88,
    avgPrice: 6.04
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Big Iron',
    quality: 'Battle-Scarred',
    marketPrice: 5.17,
    avgPrice: 4.81
}, {
    type: 'SSG 08',
    name: 'Blood in the Water',
    quality: 'Factory New',
    marketPrice: 35.82,
    avgPrice: 34.13
}, {
    type: 'SSG 08',
    name: 'Blood in the Water',
    quality: 'Minimal Wear',
    marketPrice: 21.42,
    avgPrice: 24.43
}, {
    type: 'SSG 08',
    name: 'Blood in the Water',
    quality: 'Field-Tested',
    marketPrice: 23.09,
    avgPrice: 22.64
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Blood in the Water',
    quality: 'Factory New',
    marketPrice: 347.58,
    avgPrice: 307.27
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Blood in the Water',
    quality: 'Minimal Wear',
    marketPrice: 141.91,
    avgPrice: 130.56
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Blood in the Water',
    quality: 'Field-Tested',
    marketPrice: 128.27,
    avgPrice: 110.88
}, {
    type: 'SSG 08',
    name: 'Blue Spruce',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.17
}, {
    type: 'SSG 08',
    name: 'Blue Spruce',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SSG 08',
    name: 'Blue Spruce',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SSG 08',
    name: 'Blue Spruce',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'SSG 08',
    name: 'Blue Spruce',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir SSG 08',
    name: 'Blue Spruce',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 147.57
}, {
    type: 'Souvenir SSG 08',
    name: 'Blue Spruce',
    quality: 'Minimal Wear',
    marketPrice: 6.61,
    avgPrice: 6.06
}, {
    type: 'Souvenir SSG 08',
    name: 'Blue Spruce',
    quality: 'Field-Tested',
    marketPrice: 2.02,
    avgPrice: 1.79
}, {
    type: 'Souvenir SSG 08',
    name: 'Blue Spruce',
    quality: 'Well-Worn',
    marketPrice: 7.91,
    avgPrice: 2.06
}, {
    type: 'Souvenir SSG 08',
    name: 'Blue Spruce',
    quality: 'Battle-Scarred',
    marketPrice: 2.27,
    avgPrice: 3.42
}, {
    type: 'SSG 08',
    name: 'Dark Water',
    quality: 'Minimal Wear',
    marketPrice: 0.31,
    avgPrice: 0.30
}, {
    type: 'SSG 08',
    name: 'Dark Water',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.19
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Dark Water',
    quality: 'Minimal Wear',
    marketPrice: 1.23,
    avgPrice: 1.16
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Dark Water',
    quality: 'Field-Tested',
    marketPrice: 0.62,
    avgPrice: 0.54
}, {
    type: 'SSG 08',
    name: 'Detour',
    quality: 'Factory New',
    marketPrice: 3.87,
    avgPrice: 3.31
}, {
    type: 'SSG 08',
    name: 'Detour',
    quality: 'Minimal Wear',
    marketPrice: 1.95,
    avgPrice: 1.78
}, {
    type: 'SSG 08',
    name: 'Detour',
    quality: 'Field-Tested',
    marketPrice: 1.28,
    avgPrice: 1.13
}, {
    type: 'SSG 08',
    name: 'Detour',
    quality: 'Well-Worn',
    marketPrice: 1.27,
    avgPrice: 1.20
}, {
    type: 'Souvenir SSG 08',
    name: 'Detour',
    quality: 'Factory New',
    marketPrice: 35.73,
    avgPrice: 36.73
}, {
    type: 'Souvenir SSG 08',
    name: 'Detour',
    quality: 'Minimal Wear',
    marketPrice: 25.54,
    avgPrice: 20.39
}, {
    type: 'Souvenir SSG 08',
    name: 'Detour',
    quality: 'Field-Tested',
    marketPrice: 12.23,
    avgPrice: 11.92
}, {
    type: 'Souvenir SSG 08',
    name: 'Detour',
    quality: 'Well-Worn',
    marketPrice: 17.84,
    avgPrice: 15.09
}, {
    type: 'SSG 08',
    name: 'Ghost Crusader',
    quality: 'Factory New',
    marketPrice: 4.29,
    avgPrice: 3.65
}, {
    type: 'SSG 08',
    name: 'Ghost Crusader',
    quality: 'Minimal Wear',
    marketPrice: 1.28,
    avgPrice: 1.33
}, {
    type: 'SSG 08',
    name: 'Ghost Crusader',
    quality: 'Field-Tested',
    marketPrice: 0.62,
    avgPrice: 0.57
}, {
    type: 'SSG 08',
    name: 'Ghost Crusader',
    quality: 'Well-Worn',
    marketPrice: 0.46,
    avgPrice: 0.42
}, {
    type: 'SSG 08',
    name: 'Ghost Crusader',
    quality: 'Battle-Scarred',
    marketPrice: 0.40,
    avgPrice: 0.37
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Ghost Crusader',
    quality: 'Factory New',
    marketPrice: 19.86,
    avgPrice: 18.32
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Ghost Crusader',
    quality: 'Minimal Wear',
    marketPrice: 7.15,
    avgPrice: 7.07
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Ghost Crusader',
    quality: 'Field-Tested',
    marketPrice: 3.64,
    avgPrice: 3.57
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Ghost Crusader',
    quality: 'Well-Worn',
    marketPrice: 2.54,
    avgPrice: 2.51
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Ghost Crusader',
    quality: 'Battle-Scarred',
    marketPrice: 2.36,
    avgPrice: 2.16
}, {
    type: 'SSG 08',
    name: 'Lichen Dashed',
    quality: 'Factory New',
    marketPrice: 3.87,
    avgPrice: 2.89
}, {
    type: 'SSG 08',
    name: 'Lichen Dashed',
    quality: 'Minimal Wear',
    marketPrice: 0.35,
    avgPrice: 0.37
}, {
    type: 'SSG 08',
    name: 'Lichen Dashed',
    quality: 'Field-Tested',
    marketPrice: 0.19,
    avgPrice: 0.18
}, {
    type: 'SSG 08',
    name: 'Lichen Dashed',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.44
}, {
    type: 'SSG 08',
    name: 'Lichen Dashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.29,
    avgPrice: 0.31
}, {
    type: 'SSG 08',
    name: 'Mayan Dreams',
    quality: 'Factory New',
    marketPrice: 19.00,
    avgPrice: 16.50
}, {
    type: 'SSG 08',
    name: 'Mayan Dreams',
    quality: 'Minimal Wear',
    marketPrice: 1.97,
    avgPrice: 1.39
}, {
    type: 'SSG 08',
    name: 'Mayan Dreams',
    quality: 'Field-Tested',
    marketPrice: 0.52,
    avgPrice: 0.51
}, {
    type: 'SSG 08',
    name: 'Mayan Dreams',
    quality: 'Well-Worn',
    marketPrice: 1.41,
    avgPrice: 1.37
}, {
    type: 'SSG 08',
    name: 'Mayan Dreams',
    quality: 'Battle-Scarred',
    marketPrice: 0.76,
    avgPrice: 0.61
}, {
    type: 'SSG 08',
    name: 'Necropos',
    quality: 'Factory New',
    marketPrice: 0.82,
    avgPrice: 0.77
}, {
    type: 'SSG 08',
    name: 'Necropos',
    quality: 'Minimal Wear',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'SSG 08',
    name: 'Necropos',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'SSG 08',
    name: 'Necropos',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'SSG 08',
    name: 'Necropos',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Necropos',
    quality: 'Factory New',
    marketPrice: 5.79,
    avgPrice: 5.48
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Necropos',
    quality: 'Minimal Wear',
    marketPrice: 1.30,
    avgPrice: 1.28
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Necropos',
    quality: 'Field-Tested',
    marketPrice: 0.71,
    avgPrice: 0.63
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Necropos',
    quality: 'Well-Worn',
    marketPrice: 0.50,
    avgPrice: 0.44
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Necropos',
    quality: 'Battle-Scarred',
    marketPrice: 0.36,
    avgPrice: 0.34
}, {
    type: 'SSG 08',
    name: 'Sand Dune',
    quality: 'Factory New',
    marketPrice: 5.89,
    avgPrice: 4.54
}, {
    type: 'SSG 08',
    name: 'Sand Dune',
    quality: 'Minimal Wear',
    marketPrice: 0.55,
    avgPrice: 0.48
}, {
    type: 'SSG 08',
    name: 'Sand Dune',
    quality: 'Field-Tested',
    marketPrice: 0.23,
    avgPrice: 0.21
}, {
    type: 'SSG 08',
    name: 'Sand Dune',
    quality: 'Well-Worn',
    marketPrice: 0.36,
    avgPrice: 0.34
}, {
    type: 'SSG 08',
    name: 'Sand Dune',
    quality: 'Battle-Scarred',
    marketPrice: 0.32,
    avgPrice: 0.31
}, {
    type: 'SSG 08',
    name: 'Slashed',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.17
}, {
    type: 'SSG 08',
    name: 'Slashed',
    quality: 'Well-Worn',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'SSG 08',
    name: 'Slashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.15,
    avgPrice: 0.13
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Slashed',
    quality: 'Field-Tested',
    marketPrice: 0.59,
    avgPrice: 0.55
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Slashed',
    quality: 'Well-Worn',
    marketPrice: 0.51,
    avgPrice: 0.46
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'Slashed',
    quality: 'Battle-Scarred',
    marketPrice: 0.42,
    avgPrice: 0.37
}, {
    type: 'SSG 08',
    name: 'Tropical Storm',
    quality: 'Factory New',
    marketPrice: 10.05,
    avgPrice: 8.60
}, {
    type: 'SSG 08',
    name: 'Tropical Storm',
    quality: 'Minimal Wear',
    marketPrice: 0.78,
    avgPrice: 0.67
}, {
    type: 'SSG 08',
    name: 'Tropical Storm',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.49
}, {
    type: 'SSG 08',
    name: 'Tropical Storm',
    quality: 'Well-Worn',
    marketPrice: 0.61,
    avgPrice: 0.57
}, {
    type: 'SSG 08',
    name: 'Tropical Storm',
    quality: 'Battle-Scarred',
    marketPrice: 0.53,
    avgPrice: 0.51
}, {
    type: 'Souvenir SSG 08',
    name: 'Tropical Storm',
    quality: 'Factory New',
    marketPrice: 39.46,
    avgPrice: 27.93
}, {
    type: 'Souvenir SSG 08',
    name: 'Tropical Storm',
    quality: 'Minimal Wear',
    marketPrice: 4.05,
    avgPrice: 3.92
}, {
    type: 'Souvenir SSG 08',
    name: 'Tropical Storm',
    quality: 'Field-Tested',
    marketPrice: 1.72,
    avgPrice: 1.53
}, {
    type: 'Souvenir SSG 08',
    name: 'Tropical Storm',
    quality: 'Well-Worn',
    marketPrice: 1.96,
    avgPrice: 1.55
}, {
    type: 'Souvenir SSG 08',
    name: 'Tropical Storm',
    quality: 'Battle-Scarred',
    marketPrice: 1.40,
    avgPrice: 1.63
}, {
    type: 'Tec-9',
    name: 'Army Mesh',
    quality: 'Factory New',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Army Mesh',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Army Mesh',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Army Mesh',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Army Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Tec-9',
    name: 'Army Mesh',
    quality: 'Factory New',
    marketPrice: 4.49,
    avgPrice: 4.95
}, {
    type: 'Souvenir Tec-9',
    name: 'Army Mesh',
    quality: 'Minimal Wear',
    marketPrice: 2.37,
    avgPrice: 2.02
}, {
    type: 'Souvenir Tec-9',
    name: 'Army Mesh',
    quality: 'Field-Tested',
    marketPrice: 1.15,
    avgPrice: 1.20
}, {
    type: 'Souvenir Tec-9',
    name: 'Army Mesh',
    quality: 'Well-Worn',
    marketPrice: 5.75,
    avgPrice: 7.61
}, {
    type: 'Souvenir Tec-9',
    name: 'Army Mesh',
    quality: 'Battle-Scarred',
    marketPrice: 2.54,
    avgPrice: 3.14
}, {
    type: 'Tec-9',
    name: 'Avalanche',
    quality: 'Factory New',
    marketPrice: 5.37,
    avgPrice: 4.78
}, {
    type: 'Tec-9',
    name: 'Avalanche',
    quality: 'Minimal Wear',
    marketPrice: 2.15,
    avgPrice: 2.05
}, {
    type: 'Tec-9',
    name: 'Avalanche',
    quality: 'Field-Tested',
    marketPrice: 0.94,
    avgPrice: 0.88
}, {
    type: 'Tec-9',
    name: 'Avalanche',
    quality: 'Well-Worn',
    marketPrice: 0.71,
    avgPrice: 0.69
}, {
    type: 'Tec-9',
    name: 'Avalanche',
    quality: 'Battle-Scarred',
    marketPrice: 0.49,
    avgPrice: 0.50
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Avalanche',
    quality: 'Factory New',
    marketPrice: 27.15,
    avgPrice: 23.73
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Avalanche',
    quality: 'Minimal Wear',
    marketPrice: 12.77,
    avgPrice: 9.66
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Avalanche',
    quality: 'Field-Tested',
    marketPrice: 5.86,
    avgPrice: 5.11
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Avalanche',
    quality: 'Well-Worn',
    marketPrice: 3.80,
    avgPrice: 3.76
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Avalanche',
    quality: 'Battle-Scarred',
    marketPrice: 2.70,
    avgPrice: 2.71
}, {
    type: 'Tec-9',
    name: 'Bamboo Forest',
    quality: 'Factory New',
    marketPrice: 0.28,
    avgPrice: 0.28
}, {
    type: 'Tec-9',
    name: 'Bamboo Forest',
    quality: 'Minimal Wear',
    marketPrice: 0.15,
    avgPrice: 0.12
}, {
    type: 'Tec-9',
    name: 'Bamboo Forest',
    quality: 'Field-Tested',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'Tec-9',
    name: 'Bamboo Forest',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Tec-9',
    name: 'Bamboo Forest',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Tec-9',
    name: 'Blue Titanium',
    quality: 'Factory New',
    marketPrice: 1.12,
    avgPrice: 0.96
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Blue Titanium',
    quality: 'Factory New',
    marketPrice: 3.01,
    avgPrice: 2.74
}, {
    type: 'Tec-9',
    name: 'Brass',
    quality: 'Factory New',
    marketPrice: 7.90,
    avgPrice: 6.91
}, {
    type: 'Tec-9',
    name: 'Brass',
    quality: 'Minimal Wear',
    marketPrice: 1.06,
    avgPrice: 0.89
}, {
    type: 'Tec-9',
    name: 'Brass',
    quality: 'Field-Tested',
    marketPrice: 0.35,
    avgPrice: 0.33
}, {
    type: 'Tec-9',
    name: 'Brass',
    quality: 'Well-Worn',
    marketPrice: 0.35,
    avgPrice: 0.37
}, {
    type: 'Tec-9',
    name: 'Brass',
    quality: 'Battle-Scarred',
    marketPrice: 0.43,
    avgPrice: 0.40
}, {
    type: 'Souvenir Tec-9',
    name: 'Brass',
    quality: 'Factory New',
    marketPrice: 53.90,
    avgPrice: 40.01
}, {
    type: 'Souvenir Tec-9',
    name: 'Brass',
    quality: 'Minimal Wear',
    marketPrice: 8.85,
    avgPrice: 7.27
}, {
    type: 'Souvenir Tec-9',
    name: 'Brass',
    quality: 'Field-Tested',
    marketPrice: 5.08,
    avgPrice: 4.82
}, {
    type: 'Souvenir Tec-9',
    name: 'Brass',
    quality: 'Well-Worn',
    marketPrice: 4.60,
    avgPrice: 3.87
}, {
    type: 'Souvenir Tec-9',
    name: 'Brass',
    quality: 'Battle-Scarred',
    marketPrice: 4.56,
    avgPrice: 3.55
}, {
    type: 'Tec-9',
    name: 'Groundwater',
    quality: 'Factory New',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'Tec-9',
    name: 'Groundwater',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Groundwater',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Groundwater',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Groundwater',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir Tec-9',
    name: 'Groundwater',
    quality: 'Minimal Wear',
    marketPrice: 10.01,
    avgPrice: 8.33
}, {
    type: 'Souvenir Tec-9',
    name: 'Groundwater',
    quality: 'Field-Tested',
    marketPrice: 1.27,
    avgPrice: 1.51
}, {
    type: 'Souvenir Tec-9',
    name: 'Groundwater',
    quality: 'Well-Worn',
    marketPrice: 3.81,
    avgPrice: 1.98
}, {
    type: 'Souvenir Tec-9',
    name: 'Groundwater',
    quality: 'Battle-Scarred',
    marketPrice: 2.33,
    avgPrice: 2.45
}, {
    type: 'Tec-9',
    name: 'Hades',
    quality: 'Factory New',
    marketPrice: 0.92,
    avgPrice: 0.82
}, {
    type: 'Tec-9',
    name: 'Hades',
    quality: 'Minimal Wear',
    marketPrice: 0.53,
    avgPrice: 0.45
}, {
    type: 'Tec-9',
    name: 'Hades',
    quality: 'Field-Tested',
    marketPrice: 0.49,
    avgPrice: 0.42
}, {
    type: 'Tec-9',
    name: 'Hades',
    quality: 'Well-Worn',
    marketPrice: 0.49,
    avgPrice: 0.43
}, {
    type: 'Tec-9',
    name: 'Hades',
    quality: 'Battle-Scarred',
    marketPrice: 0.51,
    avgPrice: 0.42
}, {
    type: 'Tec-9',
    name: 'Ice Cap',
    quality: 'Factory New',
    marketPrice: 0.75,
    avgPrice: 0.79
}, {
    type: 'Tec-9',
    name: 'Ice Cap',
    quality: 'Minimal Wear',
    marketPrice: 0.58,
    avgPrice: 0.57
}, {
    type: 'Tec-9',
    name: 'Ice Cap',
    quality: 'Field-Tested',
    marketPrice: 0.27,
    avgPrice: 0.25
}, {
    type: 'Tec-9',
    name: 'Ice Cap',
    quality: 'Well-Worn',
    marketPrice: 0.36,
    avgPrice: 0.33
}, {
    type: 'Tec-9',
    name: 'Ice Cap',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.21
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Ice Cap',
    quality: 'Factory New',
    marketPrice: 3.99,
    avgPrice: 3.92
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Ice Cap',
    quality: 'Minimal Wear',
    marketPrice: 3.12,
    avgPrice: 2.58
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Ice Cap',
    quality: 'Field-Tested',
    marketPrice: 1.20,
    avgPrice: 1.25
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Ice Cap',
    quality: 'Well-Worn',
    marketPrice: 1.68,
    avgPrice: 1.48
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Ice Cap',
    quality: 'Battle-Scarred',
    marketPrice: 1.10,
    avgPrice: 1.03
}, {
    type: 'Tec-9',
    name: 'Isaac',
    quality: 'Factory New',
    marketPrice: 2.41,
    avgPrice: 2.23
}, {
    type: 'Tec-9',
    name: 'Isaac',
    quality: 'Minimal Wear',
    marketPrice: 0.59,
    avgPrice: 0.63
}, {
    type: 'Tec-9',
    name: 'Isaac',
    quality: 'Field-Tested',
    marketPrice: 0.35,
    avgPrice: 0.33
}, {
    type: 'Tec-9',
    name: 'Isaac',
    quality: 'Well-Worn',
    marketPrice: 0.29,
    avgPrice: 0.26
}, {
    type: 'Tec-9',
    name: 'Isaac',
    quality: 'Battle-Scarred',
    marketPrice: 0.23,
    avgPrice: 0.22
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Isaac',
    quality: 'Factory New',
    marketPrice: 9.44,
    avgPrice: 8.84
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Isaac',
    quality: 'Minimal Wear',
    marketPrice: 2.12,
    avgPrice: 2.23
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Isaac',
    quality: 'Field-Tested',
    marketPrice: 1.19,
    avgPrice: 1.16
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Isaac',
    quality: 'Well-Worn',
    marketPrice: 0.95,
    avgPrice: 0.91
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Isaac',
    quality: 'Battle-Scarred',
    marketPrice: 0.89,
    avgPrice: 0.78
}, {
    type: 'Tec-9',
    name: 'Jambiya',
    quality: 'Factory New',
    marketPrice: 0.41,
    avgPrice: 0.39
}, {
    type: 'Tec-9',
    name: 'Jambiya',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'Tec-9',
    name: 'Jambiya',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Tec-9',
    name: 'Jambiya',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Tec-9',
    name: 'Jambiya',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Jambiya',
    quality: 'Factory New',
    marketPrice: 3.34,
    avgPrice: 3.26
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Jambiya',
    quality: 'Minimal Wear',
    marketPrice: 0.81,
    avgPrice: 0.83
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Jambiya',
    quality: 'Field-Tested',
    marketPrice: 0.46,
    avgPrice: 0.47
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Jambiya',
    quality: 'Well-Worn',
    marketPrice: 0.43,
    avgPrice: 0.40
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Jambiya',
    quality: 'Battle-Scarred',
    marketPrice: 0.41,
    avgPrice: 0.37
}, {
    type: 'Tec-9',
    name: 'Nuclear Threat',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 395.32
}, {
    type: 'Tec-9',
    name: 'Nuclear Threat',
    quality: 'Minimal Wear',
    marketPrice: 33.71,
    avgPrice: 39.31
}, {
    type: 'Tec-9',
    name: 'Nuclear Threat',
    quality: 'Field-Tested',
    marketPrice: 15.55,
    avgPrice: 14.67
}, {
    type: 'Tec-9',
    name: 'Nuclear Threat',
    quality: 'Well-Worn',
    marketPrice: 11.62,
    avgPrice: 11.80
}, {
    type: 'Tec-9',
    name: 'Nuclear Threat',
    quality: 'Battle-Scarred',
    marketPrice: 10.75,
    avgPrice: 10.65
}, {
    type: 'Souvenir Tec-9',
    name: 'Nuclear Threat',
    quality: 'Minimal Wear',
    marketPrice: 351.79,
    avgPrice: 656.25
}, {
    type: 'Souvenir Tec-9',
    name: 'Nuclear Threat',
    quality: 'Field-Tested',
    marketPrice: 89.39,
    avgPrice: 64.30
}, {
    type: 'Souvenir Tec-9',
    name: 'Nuclear Threat',
    quality: 'Well-Worn',
    marketPrice: 96.22,
    avgPrice: 52.97
}, {
    type: 'Souvenir Tec-9',
    name: 'Nuclear Threat',
    quality: 'Battle-Scarred',
    marketPrice: 77.39,
    avgPrice: 46.71
}, {
    type: 'Tec-9',
    name: 'Ossified',
    quality: 'Factory New',
    marketPrice: 0.64,
    avgPrice: 0.59
}, {
    type: 'Tec-9',
    name: 'Ossified',
    quality: 'Minimal Wear',
    marketPrice: 1.64,
    avgPrice: 1.76
}, {
    type: 'Tec-9',
    name: 'Re-Entry',
    quality: 'Factory New',
    marketPrice: 1.87,
    avgPrice: 1.68
}, {
    type: 'Tec-9',
    name: 'Re-Entry',
    quality: 'Minimal Wear',
    marketPrice: 1.09,
    avgPrice: 1.02
}, {
    type: 'Tec-9',
    name: 'Re-Entry',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.52
}, {
    type: 'Tec-9',
    name: 'Re-Entry',
    quality: 'Well-Worn',
    marketPrice: 0.65,
    avgPrice: 0.65
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Re-Entry',
    quality: 'Factory New',
    marketPrice: 7.77,
    avgPrice: 7.81
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Re-Entry',
    quality: 'Minimal Wear',
    marketPrice: 6.16,
    avgPrice: 5.05
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Re-Entry',
    quality: 'Field-Tested',
    marketPrice: 2.77,
    avgPrice: 2.79
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Re-Entry',
    quality: 'Well-Worn',
    marketPrice: 3.29,
    avgPrice: 3.19
}, {
    type: 'Tec-9',
    name: 'Red Quartz',
    quality: 'Factory New',
    marketPrice: 0.34,
    avgPrice: 0.33
}, {
    type: 'Tec-9',
    name: 'Red Quartz',
    quality: 'Minimal Wear',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'Tec-9',
    name: 'Red Quartz',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.23
}, {
    type: 'Tec-9',
    name: 'Red Quartz',
    quality: 'Well-Worn',
    marketPrice: 0.34,
    avgPrice: 0.30
}, {
    type: 'Souvenir Tec-9',
    name: 'Red Quartz',
    quality: 'Factory New',
    marketPrice: 22.00,
    avgPrice: 18.31
}, {
    type: 'Souvenir Tec-9',
    name: 'Red Quartz',
    quality: 'Minimal Wear',
    marketPrice: 11.84,
    avgPrice: 11.96
}, {
    type: 'Souvenir Tec-9',
    name: 'Red Quartz',
    quality: 'Field-Tested',
    marketPrice: 6.34,
    avgPrice: 6.56
}, {
    type: 'Souvenir Tec-9',
    name: 'Red Quartz',
    quality: 'Well-Worn',
    marketPrice: 23.46,
    avgPrice: 16.58
}, {
    type: 'Tec-9',
    name: 'Sandstorm',
    quality: 'Minimal Wear',
    marketPrice: 0.27,
    avgPrice: 0.26
}, {
    type: 'Tec-9',
    name: 'Sandstorm',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'Tec-9',
    name: 'Sandstorm',
    quality: 'Well-Worn',
    marketPrice: 0.13,
    avgPrice: 0.13
}, {
    type: 'Tec-9',
    name: 'Sandstorm',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Sandstorm',
    quality: 'Minimal Wear',
    marketPrice: 1.45,
    avgPrice: 1.26
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Sandstorm',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.27
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Sandstorm',
    quality: 'Well-Worn',
    marketPrice: 0.58,
    avgPrice: 0.55
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Sandstorm',
    quality: 'Battle-Scarred',
    marketPrice: 0.30,
    avgPrice: 0.26
}, {
    type: 'Tec-9',
    name: 'Terrace',
    quality: 'Factory New',
    marketPrice: 5.56,
    avgPrice: 5.38
}, {
    type: 'Tec-9',
    name: 'Terrace',
    quality: 'Minimal Wear',
    marketPrice: 1.86,
    avgPrice: 1.89
}, {
    type: 'Tec-9',
    name: 'Terrace',
    quality: 'Field-Tested',
    marketPrice: 1.64,
    avgPrice: 1.52
}, {
    type: 'Tec-9',
    name: 'Terrace',
    quality: 'Well-Worn',
    marketPrice: 1.43,
    avgPrice: 1.26
}, {
    type: 'Tec-9',
    name: 'Terrace',
    quality: 'Battle-Scarred',
    marketPrice: 1.23,
    avgPrice: 1.03
}, {
    type: 'Tec-9',
    name: 'Titanium Bit',
    quality: 'Factory New',
    marketPrice: 0.80,
    avgPrice: 0.70
}, {
    type: 'Tec-9',
    name: 'Titanium Bit',
    quality: 'Minimal Wear',
    marketPrice: 0.75,
    avgPrice: 0.74
}, {
    type: 'Tec-9',
    name: 'Titanium Bit',
    quality: 'Field-Tested',
    marketPrice: 0.65,
    avgPrice: 0.58
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Titanium Bit',
    quality: 'Factory New',
    marketPrice: 3.91,
    avgPrice: 3.63
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Titanium Bit',
    quality: 'Minimal Wear',
    marketPrice: 2.95,
    avgPrice: 2.93
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Titanium Bit',
    quality: 'Field-Tested',
    marketPrice: 2.95,
    avgPrice: 2.75
}, {
    type: 'Tec-9',
    name: 'Tornado',
    quality: 'Factory New',
    marketPrice: 11.00,
    avgPrice: 11.16
}, {
    type: 'Tec-9',
    name: 'Tornado',
    quality: 'Minimal Wear',
    marketPrice: 0.62,
    avgPrice: 0.56
}, {
    type: 'Tec-9',
    name: 'Tornado',
    quality: 'Field-Tested',
    marketPrice: 0.54,
    avgPrice: 0.55
}, {
    type: 'Tec-9',
    name: 'Tornado',
    quality: 'Well-Worn',
    marketPrice: 0.55,
    avgPrice: 0.54
}, {
    type: 'Tec-9',
    name: 'Tornado',
    quality: 'Battle-Scarred',
    marketPrice: 0.51,
    avgPrice: 0.47
}, {
    type: 'Tec-9',
    name: 'Toxic',
    quality: 'Factory New',
    marketPrice: 3.80,
    avgPrice: 3.88
}, {
    type: 'Tec-9',
    name: 'Toxic',
    quality: 'Minimal Wear',
    marketPrice: 2.41,
    avgPrice: 2.33
}, {
    type: 'Tec-9',
    name: 'Toxic',
    quality: 'Field-Tested',
    marketPrice: 1.00,
    avgPrice: 1.02
}, {
    type: 'Tec-9',
    name: 'Toxic',
    quality: 'Well-Worn',
    marketPrice: 1.56,
    avgPrice: 1.67
}, {
    type: 'Tec-9',
    name: 'Toxic',
    quality: 'Battle-Scarred',
    marketPrice: 0.69,
    avgPrice: 0.62
}, {
    type: 'Souvenir Tec-9',
    name: 'Toxic',
    quality: 'Factory New',
    marketPrice: 27.77,
    avgPrice: 29.55
}, {
    type: 'Souvenir Tec-9',
    name: 'Toxic',
    quality: 'Minimal Wear',
    marketPrice: 12.73,
    avgPrice: 11.86
}, {
    type: 'Souvenir Tec-9',
    name: 'Toxic',
    quality: 'Field-Tested',
    marketPrice: 5.70,
    avgPrice: 5.50
}, {
    type: 'Souvenir Tec-9',
    name: 'Toxic',
    quality: 'Well-Worn',
    marketPrice: 7.66,
    avgPrice: 7.25
}, {
    type: 'Souvenir Tec-9',
    name: 'Toxic',
    quality: 'Battle-Scarred',
    marketPrice: 4.44,
    avgPrice: 4.08
}, {
    type: 'Tec-9',
    name: 'Urban DDPAT',
    quality: 'Factory New',
    marketPrice: 0.18,
    avgPrice: 0.19
}, {
    type: 'Tec-9',
    name: 'Urban DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Urban DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Urban DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'Urban DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'VariCamo',
    quality: 'Factory New',
    marketPrice: 0.08,
    avgPrice: 0.07
}, {
    type: 'Tec-9',
    name: 'VariCamo',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'Tec-9',
    name: 'VariCamo',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'VariCamo',
    quality: 'Well-Worn',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Tec-9',
    name: 'VariCamo',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.05
}, {
    type: 'Souvenir Tec-9',
    name: 'VariCamo',
    quality: 'Factory New',
    marketPrice: 3.42,
    avgPrice: 3.29
}, {
    type: 'Souvenir Tec-9',
    name: 'VariCamo',
    quality: 'Minimal Wear',
    marketPrice: 1.89,
    avgPrice: 1.85
}, {
    type: 'Souvenir Tec-9',
    name: 'VariCamo',
    quality: 'Field-Tested',
    marketPrice: 1.38,
    avgPrice: 1.42
}, {
    type: 'Souvenir Tec-9',
    name: 'VariCamo',
    quality: 'Well-Worn',
    marketPrice: 1.97,
    avgPrice: 1.61
}, {
    type: 'Souvenir Tec-9',
    name: 'VariCamo',
    quality: 'Battle-Scarred',
    marketPrice: 1.41,
    avgPrice: 1.44
}, {
    type: 'UMP-45',
    name: 'Blaze',
    quality: 'Factory New',
    marketPrice: 7.44,
    avgPrice: 6.73
}, {
    type: 'UMP-45',
    name: 'Blaze',
    quality: 'Minimal Wear',
    marketPrice: 10.21,
    avgPrice: 11.47
}, {
    type: 'Souvenir UMP-45',
    name: 'Blaze',
    quality: 'Factory New',
    marketPrice: 24.81,
    avgPrice: 20.50
}, {
    type: 'Souvenir UMP-45',
    name: 'Blaze',
    quality: 'Minimal Wear',
    marketPrice: 30.65,
    avgPrice: 34.17
}, {
    type: 'UMP-45',
    name: 'Bone Pile',
    quality: 'Factory New',
    marketPrice: 4.00,
    avgPrice: 3.88
}, {
    type: 'UMP-45',
    name: 'Bone Pile',
    quality: 'Minimal Wear',
    marketPrice: 0.73,
    avgPrice: 0.76
}, {
    type: 'UMP-45',
    name: 'Bone Pile',
    quality: 'Field-Tested',
    marketPrice: 0.69,
    avgPrice: 0.64
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Bone Pile',
    quality: 'Factory New',
    marketPrice: 20.83,
    avgPrice: 15.94
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Bone Pile',
    quality: 'Minimal Wear',
    marketPrice: 2.45,
    avgPrice: 2.14
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Bone Pile',
    quality: 'Field-Tested',
    marketPrice: 1.34,
    avgPrice: 1.32
}, {
    type: 'UMP-45',
    name: 'Caramel',
    quality: 'Factory New',
    marketPrice: 16.01,
    avgPrice: 11.64
}, {
    type: 'UMP-45',
    name: 'Caramel',
    quality: 'Minimal Wear',
    marketPrice: 1.98,
    avgPrice: 1.81
}, {
    type: 'UMP-45',
    name: 'Caramel',
    quality: 'Field-Tested',
    marketPrice: 1.00,
    avgPrice: 1.02
}, {
    type: 'UMP-45',
    name: 'Caramel',
    quality: 'Well-Worn',
    marketPrice: 1.15,
    avgPrice: 1.10
}, {
    type: 'UMP-45',
    name: 'Caramel',
    quality: 'Battle-Scarred',
    marketPrice: 0.89,
    avgPrice: 1.04
}, {
    type: 'UMP-45',
    name: 'Carbon Fiber',
    quality: 'Factory New',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'UMP-45',
    name: 'Carbon Fiber',
    quality: 'Minimal Wear',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'UMP-45',
    name: 'Corporal',
    quality: 'Factory New',
    marketPrice: 0.40,
    avgPrice: 0.36
}, {
    type: 'UMP-45',
    name: 'Corporal',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'UMP-45',
    name: 'Corporal',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'UMP-45',
    name: 'Corporal',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'UMP-45',
    name: 'Corporal',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Corporal',
    quality: 'Factory New',
    marketPrice: 2.00,
    avgPrice: 1.67
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Corporal',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.31
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Corporal',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.22
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Corporal',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.26
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Corporal',
    quality: 'Battle-Scarred',
    marketPrice: 0.20,
    avgPrice: 0.22
}, {
    type: 'UMP-45',
    name: 'Delusion',
    quality: 'Factory New',
    marketPrice: 1.46,
    avgPrice: 1.44
}, {
    type: 'UMP-45',
    name: 'Delusion',
    quality: 'Minimal Wear',
    marketPrice: 0.21,
    avgPrice: 0.21
}, {
    type: 'UMP-45',
    name: 'Delusion',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.16
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Delusion',
    quality: 'Factory New',
    marketPrice: 6.02,
    avgPrice: 5.23
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Delusion',
    quality: 'Minimal Wear',
    marketPrice: 1.01,
    avgPrice: 0.76
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Delusion',
    quality: 'Field-Tested',
    marketPrice: 0.51,
    avgPrice: 0.52
}, {
    type: 'UMP-45',
    name: 'Fallout Warning',
    quality: 'Factory New',
    marketPrice: 29.99,
    avgPrice: 28.12
}, {
    type: 'UMP-45',
    name: 'Fallout Warning',
    quality: 'Minimal Wear',
    marketPrice: 3.12,
    avgPrice: 3.35
}, {
    type: 'UMP-45',
    name: 'Fallout Warning',
    quality: 'Field-Tested',
    marketPrice: 1.67,
    avgPrice: 1.10
}, {
    type: 'UMP-45',
    name: 'Fallout Warning',
    quality: 'Well-Worn',
    marketPrice: 1.73,
    avgPrice: 1.56
}, {
    type: 'UMP-45',
    name: 'Fallout Warning',
    quality: 'Battle-Scarred',
    marketPrice: 0.99,
    avgPrice: 0.97
}, {
    type: 'Souvenir UMP-45',
    name: 'Fallout Warning',
    quality: 'Minimal Wear',
    marketPrice: 6.50,
    avgPrice: 6.13
}, {
    type: 'Souvenir UMP-45',
    name: 'Fallout Warning',
    quality: 'Field-Tested',
    marketPrice: 2.59,
    avgPrice: 2.13
}, {
    type: 'Souvenir UMP-45',
    name: 'Fallout Warning',
    quality: 'Well-Worn',
    marketPrice: 6.40,
    avgPrice: 2.49
}, {
    type: 'Souvenir UMP-45',
    name: 'Fallout Warning',
    quality: 'Battle-Scarred',
    marketPrice: 1.98,
    avgPrice: 1.56
}, {
    type: 'UMP-45',
    name: 'Grand Prix',
    quality: 'Field-Tested',
    marketPrice: 0.26,
    avgPrice: 0.25
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Grand Prix',
    quality: 'Field-Tested',
    marketPrice: 0.76,
    avgPrice: 0.67
}, {
    type: 'UMP-45',
    name: 'Gunsmoke',
    quality: 'Factory New',
    marketPrice: 0.97,
    avgPrice: 0.92
}, {
    type: 'UMP-45',
    name: 'Gunsmoke',
    quality: 'Minimal Wear',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'UMP-45',
    name: 'Gunsmoke',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Gunsmoke',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Gunsmoke',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Souvenir UMP-45',
    name: 'Gunsmoke',
    quality: 'Minimal Wear',
    marketPrice: 116.58,
    avgPrice: 15.93
}, {
    type: 'Souvenir UMP-45',
    name: 'Gunsmoke',
    quality: 'Field-Tested',
    marketPrice: 5.29,
    avgPrice: 5.05
}, {
    type: 'Souvenir UMP-45',
    name: 'Gunsmoke',
    quality: 'Well-Worn',
    marketPrice: 22.10,
    avgPrice: 35.74
}, {
    type: 'Souvenir UMP-45',
    name: 'Gunsmoke',
    quality: 'Battle-Scarred',
    marketPrice: 10.00,
    avgPrice: 3.73
}, {
    type: 'UMP-45',
    name: 'Indigo',
    quality: 'Factory New',
    marketPrice: 0.96,
    avgPrice: 0.98
}, {
    type: 'UMP-45',
    name: 'Indigo',
    quality: 'Minimal Wear',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'UMP-45',
    name: 'Indigo',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Indigo',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'UMP-45',
    name: 'Indigo',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Souvenir UMP-45',
    name: 'Indigo',
    quality: 'Factory New',
    marketPrice: 13.31,
    avgPrice: 8.48
}, {
    type: 'Souvenir UMP-45',
    name: 'Indigo',
    quality: 'Minimal Wear',
    marketPrice: 2.22,
    avgPrice: 1.96
}, {
    type: 'Souvenir UMP-45',
    name: 'Indigo',
    quality: 'Field-Tested',
    marketPrice: 0.87,
    avgPrice: 0.57
}, {
    type: 'Souvenir UMP-45',
    name: 'Indigo',
    quality: 'Well-Worn',
    marketPrice: 0.57,
    avgPrice: 0.64
}, {
    type: 'Souvenir UMP-45',
    name: 'Indigo',
    quality: 'Battle-Scarred',
    marketPrice: 0.46,
    avgPrice: 0.33
}, {
    type: 'UMP-45',
    name: 'Labyrinth',
    quality: 'Factory New',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'UMP-45',
    name: 'Labyrinth',
    quality: 'Minimal Wear',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'UMP-45',
    name: 'Labyrinth',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'UMP-45',
    name: 'Labyrinth',
    quality: 'Well-Worn',
    marketPrice: 0.25,
    avgPrice: 0.21
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Labyrinth',
    quality: 'Factory New',
    marketPrice: 0.70,
    avgPrice: 0.51
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Labyrinth',
    quality: 'Minimal Wear',
    marketPrice: 0.30,
    avgPrice: 0.28
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Labyrinth',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.23
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Labyrinth',
    quality: 'Well-Worn',
    marketPrice: 0.34,
    avgPrice: 0.32
}, {
    type: 'UMP-45',
    name: 'Minotaur\'s Labyrinth',
    quality: 'Factory New',
    marketPrice: 6.32,
    avgPrice: 5.24
}, {
    type: 'UMP-45',
    name: 'Minotaur\'s Labyrinth',
    quality: 'Minimal Wear',
    marketPrice: 5.71,
    avgPrice: 4.67
}, {
    type: 'UMP-45',
    name: 'Minotaur\'s Labyrinth',
    quality: 'Field-Tested',
    marketPrice: 5.56,
    avgPrice: 4.41
}, {
    type: 'UMP-45',
    name: 'Minotaur\'s Labyrinth',
    quality: 'Well-Worn',
    marketPrice: 6.36,
    avgPrice: 5.34
}, {
    type: 'UMP-45',
    name: 'Primal Saber',
    quality: 'Factory New',
    marketPrice: 14.51,
    avgPrice: 13.70
}, {
    type: 'UMP-45',
    name: 'Primal Saber',
    quality: 'Minimal Wear',
    marketPrice: 7.44,
    avgPrice: 7.27
}, {
    type: 'UMP-45',
    name: 'Primal Saber',
    quality: 'Field-Tested',
    marketPrice: 5.44,
    avgPrice: 4.72
}, {
    type: 'UMP-45',
    name: 'Primal Saber',
    quality: 'Well-Worn',
    marketPrice: 5.52,
    avgPrice: 4.83
}, {
    type: 'UMP-45',
    name: 'Primal Saber',
    quality: 'Battle-Scarred',
    marketPrice: 3.48,
    avgPrice: 2.97
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Primal Saber',
    quality: 'Factory New',
    marketPrice: 74.41,
    avgPrice: 54.53
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Primal Saber',
    quality: 'Minimal Wear',
    marketPrice: 44.47,
    avgPrice: 26.04
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Primal Saber',
    quality: 'Field-Tested',
    marketPrice: 17.71,
    avgPrice: 15.66
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Primal Saber',
    quality: 'Well-Worn',
    marketPrice: 21.81,
    avgPrice: 18.69
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Primal Saber',
    quality: 'Battle-Scarred',
    marketPrice: 11.20,
    avgPrice: 9.51
}, {
    type: 'UMP-45',
    name: 'Riot',
    quality: 'Factory New',
    marketPrice: 0.23,
    avgPrice: 0.20
}, {
    type: 'UMP-45',
    name: 'Riot',
    quality: 'Minimal Wear',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'UMP-45',
    name: 'Riot',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'UMP-45',
    name: 'Riot',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'UMP-45',
    name: 'Riot',
    quality: 'Battle-Scarred',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Riot',
    quality: 'Factory New',
    marketPrice: 1.64,
    avgPrice: 1.35
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Riot',
    quality: 'Minimal Wear',
    marketPrice: 0.50,
    avgPrice: 0.49
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Riot',
    quality: 'Field-Tested',
    marketPrice: 0.30,
    avgPrice: 0.25
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Riot',
    quality: 'Well-Worn',
    marketPrice: 0.49,
    avgPrice: 0.50
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Riot',
    quality: 'Battle-Scarred',
    marketPrice: 0.27,
    avgPrice: 0.24
}, {
    type: 'UMP-45',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 0.31,
    avgPrice: 0.30
}, {
    type: 'UMP-45',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir UMP-45',
    name: 'Scorched',
    quality: 'Factory New',
    marketPrice: 6.95,
    avgPrice: 6.89
}, {
    type: 'Souvenir UMP-45',
    name: 'Scorched',
    quality: 'Minimal Wear',
    marketPrice: 0.86,
    avgPrice: 0.80
}, {
    type: 'Souvenir UMP-45',
    name: 'Scorched',
    quality: 'Field-Tested',
    marketPrice: 0.31,
    avgPrice: 0.31
}, {
    type: 'Souvenir UMP-45',
    name: 'Scorched',
    quality: 'Well-Worn',
    marketPrice: 0.34,
    avgPrice: 0.35
}, {
    type: 'Souvenir UMP-45',
    name: 'Scorched',
    quality: 'Battle-Scarred',
    marketPrice: 0.35,
    avgPrice: 0.31
}, {
    type: 'UMP-45',
    name: 'Urban DDPAT',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.15
}, {
    type: 'UMP-45',
    name: 'Urban DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Urban DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Urban DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'UMP-45',
    name: 'Urban DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.03,
    avgPrice: 0.03
}, {
    type: 'Souvenir UMP-45',
    name: 'Urban DDPAT',
    quality: 'Factory New',
    marketPrice: 8.83,
    avgPrice: 8.63
}, {
    type: 'Souvenir UMP-45',
    name: 'Urban DDPAT',
    quality: 'Minimal Wear',
    marketPrice: 1.52,
    avgPrice: 0.99
}, {
    type: 'Souvenir UMP-45',
    name: 'Urban DDPAT',
    quality: 'Field-Tested',
    marketPrice: 0.76,
    avgPrice: 0.33
}, {
    type: 'Souvenir UMP-45',
    name: 'Urban DDPAT',
    quality: 'Well-Worn',
    marketPrice: 0.46,
    avgPrice: 0.45
}, {
    type: 'Souvenir UMP-45',
    name: 'Urban DDPAT',
    quality: 'Battle-Scarred',
    marketPrice: 0.36,
    avgPrice: 0.31
}, {
    type: 'USP-S',
    name: 'Blood Tiger',
    quality: 'Factory New',
    marketPrice: 0.80,
    avgPrice: 0.78
}, {
    type: 'USP-S',
    name: 'Blood Tiger',
    quality: 'Minimal Wear',
    marketPrice: 0.43,
    avgPrice: 0.41
}, {
    type: 'USP-S',
    name: 'Blood Tiger',
    quality: 'Field-Tested',
    marketPrice: 0.38,
    avgPrice: 0.33
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Blood Tiger',
    quality: 'Factory New',
    marketPrice: 4.29,
    avgPrice: 3.85
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Blood Tiger',
    quality: 'Minimal Wear',
    marketPrice: 1.90,
    avgPrice: 1.81
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Blood Tiger',
    quality: 'Field-Tested',
    marketPrice: 1.81,
    avgPrice: 1.63
}, {
    type: 'USP-S',
    name: 'Business Class',
    quality: 'Factory New',
    marketPrice: 15.93,
    avgPrice: 15.45
}, {
    type: 'USP-S',
    name: 'Business Class',
    quality: 'Minimal Wear',
    marketPrice: 5.00,
    avgPrice: 4.84
}, {
    type: 'USP-S',
    name: 'Business Class',
    quality: 'Field-Tested',
    marketPrice: 2.43,
    avgPrice: 2.26
}, {
    type: 'USP-S',
    name: 'Business Class',
    quality: 'Well-Worn',
    marketPrice: 2.20,
    avgPrice: 2.18
}, {
    type: 'USP-S',
    name: 'Business Class',
    quality: 'Battle-Scarred',
    marketPrice: 2.23,
    avgPrice: 2.30
}, {
    type: 'USP-S',
    name: 'Caiman',
    quality: 'Factory New',
    marketPrice: 5.84,
    avgPrice: 5.51
}, {
    type: 'USP-S',
    name: 'Caiman',
    quality: 'Minimal Wear',
    marketPrice: 4.30,
    avgPrice: 4.17
}, {
    type: 'USP-S',
    name: 'Caiman',
    quality: 'Field-Tested',
    marketPrice: 3.64,
    avgPrice: 3.36
}, {
    type: 'USP-S',
    name: 'Caiman',
    quality: 'Well-Worn',
    marketPrice: 3.83,
    avgPrice: 4.12
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Caiman',
    quality: 'Factory New',
    marketPrice: 21.00,
    avgPrice: 19.50
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Caiman',
    quality: 'Minimal Wear',
    marketPrice: 16.48,
    avgPrice: 14.00
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Caiman',
    quality: 'Field-Tested',
    marketPrice: 10.89,
    avgPrice: 8.38
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Caiman',
    quality: 'Well-Worn',
    marketPrice: 12.77,
    avgPrice: 11.89
}, {
    type: 'Cologne 2016 Mirage Souvenir Package',
    name: '',
    quality: '',
    marketPrice: 3.03,
    avgPrice: 2.53
}, {
    type: 'USP-S',
    name: 'Dark Water',
    quality: 'Minimal Wear',
    marketPrice: 6.67,
    avgPrice: 5.92
}, {
    type: 'USP-S',
    name: 'Dark Water',
    quality: 'Field-Tested',
    marketPrice: 6.87,
    avgPrice: 5.46
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Dark Water',
    quality: 'Minimal Wear',
    marketPrice: 21.54,
    avgPrice: 17.21
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Dark Water',
    quality: 'Field-Tested',
    marketPrice: 12.23,
    avgPrice: 12.65
}, {
    type: 'USP-S',
    name: 'Forest Leaves',
    quality: 'Factory New',
    marketPrice: 0.92,
    avgPrice: 0.77
}, {
    type: 'USP-S',
    name: 'Forest Leaves',
    quality: 'Minimal Wear',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'USP-S',
    name: 'Forest Leaves',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'USP-S',
    name: 'Forest Leaves',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'USP-S',
    name: 'Forest Leaves',
    quality: 'Battle-Scarred',
    marketPrice: 0.07,
    avgPrice: 0.05
}, {
    type: 'Souvenir USP-S',
    name: 'Forest Leaves',
    quality: 'Minimal Wear',
    marketPrice: 20.70,
    avgPrice: 24.18
}, {
    type: 'Souvenir USP-S',
    name: 'Forest Leaves',
    quality: 'Field-Tested',
    marketPrice: 10.21,
    avgPrice: 9.39
}, {
    type: 'Souvenir USP-S',
    name: 'Forest Leaves',
    quality: 'Well-Worn',
    marketPrice: 27.53,
    avgPrice: 21.54
}, {
    type: 'Souvenir USP-S',
    name: 'Forest Leaves',
    quality: 'Battle-Scarred',
    marketPrice: 15.21,
    avgPrice: 17.53
}, {
    type: 'USP-S',
    name: 'Guardian',
    quality: 'Factory New',
    marketPrice: 1.15,
    avgPrice: 1.04
}, {
    type: 'USP-S',
    name: 'Guardian',
    quality: 'Minimal Wear',
    marketPrice: 0.77,
    avgPrice: 0.76
}, {
    type: 'USP-S',
    name: 'Guardian',
    quality: 'Field-Tested',
    marketPrice: 0.59,
    avgPrice: 0.55
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Guardian',
    quality: 'Factory New',
    marketPrice: 5.56,
    avgPrice: 4.99
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Guardian',
    quality: 'Minimal Wear',
    marketPrice: 3.50,
    avgPrice: 3.49
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Guardian',
    quality: 'Field-Tested',
    marketPrice: 2.39,
    avgPrice: 2.40
}, {
    type: 'USP-S',
    name: 'Kill Confirmed',
    quality: 'Factory New',
    marketPrice: 50.69,
    avgPrice: 48.20
}, {
    type: 'USP-S',
    name: 'Kill Confirmed',
    quality: 'Minimal Wear',
    marketPrice: 28.65,
    avgPrice: 28.24
}, {
    type: 'USP-S',
    name: 'Kill Confirmed',
    quality: 'Field-Tested',
    marketPrice: 21.32,
    avgPrice: 20.27
}, {
    type: 'USP-S',
    name: 'Kill Confirmed',
    quality: 'Well-Worn',
    marketPrice: 17.90,
    avgPrice: 17.76
}, {
    type: 'USP-S',
    name: 'Kill Confirmed',
    quality: 'Battle-Scarred',
    marketPrice: 16.60,
    avgPrice: 16.27
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Kill Confirmed',
    quality: 'Factory New',
    marketPrice: 244.30,
    avgPrice: 224.72
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Kill Confirmed',
    quality: 'Minimal Wear',
    marketPrice: 100.00,
    avgPrice: 98.82
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Kill Confirmed',
    quality: 'Field-Tested',
    marketPrice: 81.90,
    avgPrice: 76.37
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Kill Confirmed',
    quality: 'Well-Worn',
    marketPrice: 62.63,
    avgPrice: 60.12
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Kill Confirmed',
    quality: 'Battle-Scarred',
    marketPrice: 57.50,
    avgPrice: 53.63
}, {
    type: 'USP-S',
    name: 'Lead Conduit',
    quality: 'Factory New',
    marketPrice: 0.95,
    avgPrice: 0.92
}, {
    type: 'USP-S',
    name: 'Lead Conduit',
    quality: 'Minimal Wear',
    marketPrice: 0.26,
    avgPrice: 0.24
}, {
    type: 'USP-S',
    name: 'Lead Conduit',
    quality: 'Field-Tested',
    marketPrice: 0.13,
    avgPrice: 0.11
}, {
    type: 'USP-S',
    name: 'Lead Conduit',
    quality: 'Well-Worn',
    marketPrice: 0.12,
    avgPrice: 0.10
}, {
    type: 'USP-S',
    name: 'Lead Conduit',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Lead Conduit',
    quality: 'Factory New',
    marketPrice: 7.02,
    avgPrice: 5.86
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Lead Conduit',
    quality: 'Minimal Wear',
    marketPrice: 1.91,
    avgPrice: 1.88
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Lead Conduit',
    quality: 'Field-Tested',
    marketPrice: 1.31,
    avgPrice: 1.35
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Lead Conduit',
    quality: 'Well-Worn',
    marketPrice: 1.26,
    avgPrice: 1.19
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Lead Conduit',
    quality: 'Battle-Scarred',
    marketPrice: 1.24,
    avgPrice: 1.16
}, {
    type: 'USP-S',
    name: 'Night Ops',
    quality: 'Factory New',
    marketPrice: 0.36,
    avgPrice: 0.32
}, {
    type: 'USP-S',
    name: 'Night Ops',
    quality: 'Minimal Wear',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'USP-S',
    name: 'Night Ops',
    quality: 'Field-Tested',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'USP-S',
    name: 'Night Ops',
    quality: 'Well-Worn',
    marketPrice: 0.19,
    avgPrice: 0.19
}, {
    type: 'USP-S',
    name: 'Night Ops',
    quality: 'Battle-Scarred',
    marketPrice: 0.12,
    avgPrice: 0.11
}, {
    type: 'Souvenir USP-S',
    name: 'Night Ops',
    quality: 'Factory New',
    marketPrice: 400.00,
    avgPrice: 242.32
}, {
    type: 'Souvenir USP-S',
    name: 'Night Ops',
    quality: 'Minimal Wear',
    marketPrice: 60.00,
    avgPrice: 22.97
}, {
    type: 'Souvenir USP-S',
    name: 'Night Ops',
    quality: 'Field-Tested',
    marketPrice: 38.00,
    avgPrice: 57.87
}, {
    type: 'Souvenir USP-S',
    name: 'Night Ops',
    quality: 'Well-Worn',
    marketPrice: 130.81,
    avgPrice: 28.62
}, {
    type: 'Souvenir USP-S',
    name: 'Night Ops',
    quality: 'Battle-Scarred',
    marketPrice: 19.06,
    avgPrice: 26.42
}, {
    type: 'USP-S',
    name: 'Orion',
    quality: 'Factory New',
    marketPrice: 11.10,
    avgPrice: 10.69
}, {
    type: 'USP-S',
    name: 'Orion',
    quality: 'Minimal Wear',
    marketPrice: 7.47,
    avgPrice: 7.86
}, {
    type: 'USP-S',
    name: 'Orion',
    quality: 'Field-Tested',
    marketPrice: 7.76,
    avgPrice: 7.36
}, {
    type: 'USP-S',
    name: 'Orion',
    quality: 'Well-Worn',
    marketPrice: 11.77,
    avgPrice: 10.41
}, {
    type: 'USP-S',
    name: 'Orion',
    quality: 'Battle-Scarred',
    marketPrice: 34.01,
    avgPrice: 32.54
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Orion',
    quality: 'Factory New',
    marketPrice: 60.98,
    avgPrice: 60.23
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Orion',
    quality: 'Minimal Wear',
    marketPrice: 35.54,
    avgPrice: 38.76
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Orion',
    quality: 'Field-Tested',
    marketPrice: 26.00,
    avgPrice: 28.40
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Orion',
    quality: 'Well-Worn',
    marketPrice: 48.37,
    avgPrice: 43.97
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Orion',
    quality: 'Battle-Scarred',
    marketPrice: 200.00,
    avgPrice: 85.56
}, {
    type: 'USP-S',
    name: 'Overgrowth',
    quality: 'Factory New',
    marketPrice: 39.69,
    avgPrice: 37.29
}, {
    type: 'USP-S',
    name: 'Overgrowth',
    quality: 'Minimal Wear',
    marketPrice: 5.88,
    avgPrice: 5.77
}, {
    type: 'USP-S',
    name: 'Overgrowth',
    quality: 'Field-Tested',
    marketPrice: 3.98,
    avgPrice: 3.76
}, {
    type: 'USP-S',
    name: 'Overgrowth',
    quality: 'Well-Worn',
    marketPrice: 4.00,
    avgPrice: 3.85
}, {
    type: 'USP-S',
    name: 'Overgrowth',
    quality: 'Battle-Scarred',
    marketPrice: 3.92,
    avgPrice: 4.10
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Overgrowth',
    quality: 'Factory New',
    marketPrice: 0,
    avgPrice: 325.66
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Overgrowth',
    quality: 'Minimal Wear',
    marketPrice: 27.95,
    avgPrice: 25.76
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Overgrowth',
    quality: 'Field-Tested',
    marketPrice: 13.34,
    avgPrice: 12.46
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Overgrowth',
    quality: 'Well-Worn',
    marketPrice: 13.34,
    avgPrice: 12.69
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Overgrowth',
    quality: 'Battle-Scarred',
    marketPrice: 13.34,
    avgPrice: 11.69
}, {
    type: 'USP-S',
    name: 'Para Green',
    quality: 'Factory New',
    marketPrice: 1.54,
    avgPrice: 1.39
}, {
    type: 'USP-S',
    name: 'Para Green',
    quality: 'Minimal Wear',
    marketPrice: 0.46,
    avgPrice: 0.35
}, {
    type: 'USP-S',
    name: 'Para Green',
    quality: 'Field-Tested',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'USP-S',
    name: 'Para Green',
    quality: 'Well-Worn',
    marketPrice: 0.32,
    avgPrice: 0.27
}, {
    type: 'USP-S',
    name: 'Para Green',
    quality: 'Battle-Scarred',
    marketPrice: 0.16,
    avgPrice: 0.14
}, {
    type: 'USP-S',
    name: 'Road Rash',
    quality: 'Factory New',
    marketPrice: 15.69,
    avgPrice: 14.14
}, {
    type: 'USP-S',
    name: 'Road Rash',
    quality: 'Minimal Wear',
    marketPrice: 9.11,
    avgPrice: 8.95
}, {
    type: 'USP-S',
    name: 'Road Rash',
    quality: 'Field-Tested',
    marketPrice: 7.44,
    avgPrice: 6.50
}, {
    type: 'USP-S',
    name: 'Road Rash',
    quality: 'Well-Worn',
    marketPrice: 6.67,
    avgPrice: 5.61
}, {
    type: 'USP-S',
    name: 'Road Rash',
    quality: 'Battle-Scarred',
    marketPrice: 6.33,
    avgPrice: 5.15
}, {
    type: 'Souvenir USP-S',
    name: 'Road Rash',
    quality: 'Minimal Wear',
    marketPrice: 94.39,
    avgPrice: 103.48
}, {
    type: 'Souvenir USP-S',
    name: 'Road Rash',
    quality: 'Field-Tested',
    marketPrice: 42.14,
    avgPrice: 50.15
}, {
    type: 'Souvenir USP-S',
    name: 'Road Rash',
    quality: 'Well-Worn',
    marketPrice: 77.75,
    avgPrice: 75.03
}, {
    type: 'Souvenir USP-S',
    name: 'Road Rash',
    quality: 'Battle-Scarred',
    marketPrice: 42.98,
    avgPrice: 41.32
}, {
    type: 'USP-S',
    name: 'Royal Blue',
    quality: 'Factory New',
    marketPrice: 13.34,
    avgPrice: 10.86
}, {
    type: 'USP-S',
    name: 'Royal Blue',
    quality: 'Minimal Wear',
    marketPrice: 1.65,
    avgPrice: 1.58
}, {
    type: 'USP-S',
    name: 'Royal Blue',
    quality: 'Field-Tested',
    marketPrice: 0.36,
    avgPrice: 0.31
}, {
    type: 'USP-S',
    name: 'Royal Blue',
    quality: 'Well-Worn',
    marketPrice: 0.55,
    avgPrice: 0.53
}, {
    type: 'USP-S',
    name: 'Royal Blue',
    quality: 'Battle-Scarred',
    marketPrice: 0.28,
    avgPrice: 0.24
}, {
    type: 'Souvenir USP-S',
    name: 'Royal Blue',
    quality: 'Factory New',
    marketPrice: 345.00,
    avgPrice: 363.14
}, {
    type: 'Souvenir USP-S',
    name: 'Royal Blue',
    quality: 'Minimal Wear',
    marketPrice: 15.32,
    avgPrice: 16.58
}, {
    type: 'Souvenir USP-S',
    name: 'Royal Blue',
    quality: 'Field-Tested',
    marketPrice: 4.00,
    avgPrice: 4.52
}, {
    type: 'Souvenir USP-S',
    name: 'Royal Blue',
    quality: 'Well-Worn',
    marketPrice: 5.57,
    avgPrice: 4.82
}, {
    type: 'Souvenir USP-S',
    name: 'Royal Blue',
    quality: 'Battle-Scarred',
    marketPrice: 3.62,
    avgPrice: 3.18
}, {
    type: 'USP-S',
    name: 'Serum',
    quality: 'Factory New',
    marketPrice: 7.13,
    avgPrice: 6.12
}, {
    type: 'USP-S',
    name: 'Serum',
    quality: 'Minimal Wear',
    marketPrice: 4.48,
    avgPrice: 4.97
}, {
    type: 'USP-S',
    name: 'Serum',
    quality: 'Field-Tested',
    marketPrice: 6.02,
    avgPrice: 5.03
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Serum',
    quality: 'Factory New',
    marketPrice: 28.87,
    avgPrice: 28.10
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Serum',
    quality: 'Minimal Wear',
    marketPrice: 23.00,
    avgPrice: 20.42
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Serum',
    quality: 'Field-Tested',
    marketPrice: 26.72,
    avgPrice: 19.81
}, {
    type: 'USP-S',
    name: 'Stainless',
    quality: 'Factory New',
    marketPrice: 4.68,
    avgPrice: 4.80
}, {
    type: 'USP-S',
    name: 'Stainless',
    quality: 'Minimal Wear',
    marketPrice: 2.19,
    avgPrice: 2.03
}, {
    type: 'USP-S',
    name: 'Stainless',
    quality: 'Field-Tested',
    marketPrice: 1.32,
    avgPrice: 1.18
}, {
    type: 'USP-S',
    name: 'Stainless',
    quality: 'Well-Worn',
    marketPrice: 1.88,
    avgPrice: 1.82
}, {
    type: 'USP-S',
    name: 'Stainless',
    quality: 'Battle-Scarred',
    marketPrice: 1.20,
    avgPrice: 1.13
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Stainless',
    quality: 'Factory New',
    marketPrice: 26.79,
    avgPrice: 26.00
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Stainless',
    quality: 'Minimal Wear',
    marketPrice: 8.93,
    avgPrice: 9.29
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Stainless',
    quality: 'Field-Tested',
    marketPrice: 5.77,
    avgPrice: 5.52
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Stainless',
    quality: 'Well-Worn',
    marketPrice: 7.22,
    avgPrice: 7.12
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Stainless',
    quality: 'Battle-Scarred',
    marketPrice: 5.48,
    avgPrice: 4.96
}, {
    type: 'USP-S',
    name: 'Torque',
    quality: 'Factory New',
    marketPrice: 0.59,
    avgPrice: 0.53
}, {
    type: 'USP-S',
    name: 'Torque',
    quality: 'Minimal Wear',
    marketPrice: 0.34,
    avgPrice: 0.32
}, {
    type: 'USP-S',
    name: 'Torque',
    quality: 'Field-Tested',
    marketPrice: 0.20,
    avgPrice: 0.19
}, {
    type: 'USP-S',
    name: 'Torque',
    quality: 'Well-Worn',
    marketPrice: 0.28,
    avgPrice: 0.25
}, {
    type: 'USP-S',
    name: 'Torque',
    quality: 'Battle-Scarred',
    marketPrice: 0.34,
    avgPrice: 0.32
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Torque',
    quality: 'Factory New',
    marketPrice: 2.64,
    avgPrice: 2.63
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Torque',
    quality: 'Minimal Wear',
    marketPrice: 1.90,
    avgPrice: 1.88
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Torque',
    quality: 'Field-Tested',
    marketPrice: 1.28,
    avgPrice: 1.22
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Torque',
    quality: 'Well-Worn',
    marketPrice: 1.62,
    avgPrice: 1.53
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Torque',
    quality: 'Battle-Scarred',
    marketPrice: 2.34,
    avgPrice: 1.79
}, {
    type: 'XM1014',
    name: 'Black Tie',
    quality: 'Factory New',
    marketPrice: 1.72,
    avgPrice: 1.46
}, {
    type: 'XM1014',
    name: 'Black Tie',
    quality: 'Minimal Wear',
    marketPrice: 0.84,
    avgPrice: 0.79
}, {
    type: 'XM1014',
    name: 'Black Tie',
    quality: 'Field-Tested',
    marketPrice: 0.42,
    avgPrice: 0.41
}, {
    type: 'XM1014',
    name: 'Black Tie',
    quality: 'Well-Worn',
    marketPrice: 0.52,
    avgPrice: 0.53
}, {
    type: 'XM1014',
    name: 'Black Tie',
    quality: 'Battle-Scarred',
    marketPrice: 0.39,
    avgPrice: 0.36
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Black Tie',
    quality: 'Factory New',
    marketPrice: 6.87,
    avgPrice: 6.60
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Black Tie',
    quality: 'Minimal Wear',
    marketPrice: 3.24,
    avgPrice: 3.02
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Black Tie',
    quality: 'Field-Tested',
    marketPrice: 1.54,
    avgPrice: 1.46
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Black Tie',
    quality: 'Well-Worn',
    marketPrice: 2.54,
    avgPrice: 1.67
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Black Tie',
    quality: 'Battle-Scarred',
    marketPrice: 1.11,
    avgPrice: 1.11
}, {
    type: 'XM1014',
    name: 'Blaze Orange',
    quality: 'Factory New',
    marketPrice: 114.50,
    avgPrice: 84.83
}, {
    type: 'XM1014',
    name: 'Blaze Orange',
    quality: 'Minimal Wear',
    marketPrice: 6.93,
    avgPrice: 5.81
}, {
    type: 'XM1014',
    name: 'Blaze Orange',
    quality: 'Field-Tested',
    marketPrice: 2.01,
    avgPrice: 1.83
}, {
    type: 'XM1014',
    name: 'Blaze Orange',
    quality: 'Well-Worn',
    marketPrice: 6.50,
    avgPrice: 6.44
}, {
    type: 'XM1014',
    name: 'Blaze Orange',
    quality: 'Battle-Scarred',
    marketPrice: 6.52,
    avgPrice: 6.44
}, {
    type: 'XM1014',
    name: 'Blue Spruce',
    quality: 'Factory New',
    marketPrice: 0.17,
    avgPrice: 0.16
}, {
    type: 'XM1014',
    name: 'Blue Spruce',
    quality: 'Minimal Wear',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'XM1014',
    name: 'Blue Spruce',
    quality: 'Field-Tested',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'XM1014',
    name: 'Blue Spruce',
    quality: 'Well-Worn',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'XM1014',
    name: 'Blue Spruce',
    quality: 'Battle-Scarred',
    marketPrice: 0.04,
    avgPrice: 0.03
}, {
    type: 'Souvenir XM1014',
    name: 'Blue Spruce',
    quality: 'Minimal Wear',
    marketPrice: 2.09,
    avgPrice: 1.94
}, {
    type: 'Souvenir XM1014',
    name: 'Blue Spruce',
    quality: 'Field-Tested',
    marketPrice: 1.47,
    avgPrice: 1.69
}, {
    type: 'Souvenir XM1014',
    name: 'Blue Spruce',
    quality: 'Well-Worn',
    marketPrice: 3.98,
    avgPrice: 3.23
}, {
    type: 'Souvenir XM1014',
    name: 'Blue Spruce',
    quality: 'Battle-Scarred',
    marketPrice: 1.43,
    avgPrice: 1.33
}, {
    type: 'XM1014',
    name: 'Blue Steel',
    quality: 'Factory New',
    marketPrice: 0.18,
    avgPrice: 0.17
}, {
    type: 'XM1014',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'XM1014',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'XM1014',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'XM1014',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'Souvenir XM1014',
    name: 'Blue Steel',
    quality: 'Minimal Wear',
    marketPrice: 11.50,
    avgPrice: 19.42
}, {
    type: 'Souvenir XM1014',
    name: 'Blue Steel',
    quality: 'Field-Tested',
    marketPrice: 8.65,
    avgPrice: 6.69
}, {
    type: 'Souvenir XM1014',
    name: 'Blue Steel',
    quality: 'Well-Worn',
    marketPrice: 7.71,
    avgPrice: 5.04
}, {
    type: 'Souvenir XM1014',
    name: 'Blue Steel',
    quality: 'Battle-Scarred',
    marketPrice: 16.67,
    avgPrice: 12.74
}, {
    type: 'XM1014',
    name: 'Bone Machine',
    quality: 'Factory New',
    marketPrice: 1.40,
    avgPrice: 1.29
}, {
    type: 'XM1014',
    name: 'Bone Machine',
    quality: 'Minimal Wear',
    marketPrice: 0.95,
    avgPrice: 0.89
}, {
    type: 'XM1014',
    name: 'Bone Machine',
    quality: 'Field-Tested',
    marketPrice: 0.48,
    avgPrice: 0.45
}, {
    type: 'XM1014',
    name: 'Bone Machine',
    quality: 'Well-Worn',
    marketPrice: 0.70,
    avgPrice: 0.66
}, {
    type: 'XM1014',
    name: 'Bone Machine',
    quality: 'Battle-Scarred',
    marketPrice: 0.29,
    avgPrice: 0.28
}, {
    type: 'Souvenir XM1014',
    name: 'Bone Machine',
    quality: 'Factory New',
    marketPrice: 12.33,
    avgPrice: 8.56
}, {
    type: 'Souvenir XM1014',
    name: 'Bone Machine',
    quality: 'Minimal Wear',
    marketPrice: 4.67,
    avgPrice: 3.90
}, {
    type: 'Souvenir XM1014',
    name: 'Bone Machine',
    quality: 'Field-Tested',
    marketPrice: 2.42,
    avgPrice: 2.05
}, {
    type: 'Souvenir XM1014',
    name: 'Bone Machine',
    quality: 'Well-Worn',
    marketPrice: 3.73,
    avgPrice: 3.85
}, {
    type: 'Souvenir XM1014',
    name: 'Bone Machine',
    quality: 'Battle-Scarred',
    marketPrice: 1.79,
    avgPrice: 1.61
}, {
    type: 'XM1014',
    name: 'CaliCamo',
    quality: 'Factory New',
    marketPrice: 0.08,
    avgPrice: 0.06
}, {
    type: 'XM1014',
    name: 'CaliCamo',
    quality: 'Minimal Wear',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'XM1014',
    name: 'CaliCamo',
    quality: 'Field-Tested',
    marketPrice: 0.06,
    avgPrice: 0.03
}, {
    type: 'XM1014',
    name: 'CaliCamo',
    quality: 'Well-Worn',
    marketPrice: 0.06,
    avgPrice: 0.04
}, {
    type: 'XM1014',
    name: 'CaliCamo',
    quality: 'Battle-Scarred',
    marketPrice: 0.05,
    avgPrice: 0.03
}, {
    type: 'Souvenir XM1014',
    name: 'CaliCamo',
    quality: 'Factory New',
    marketPrice: 21.96,
    avgPrice: 20.14
}, {
    type: 'Souvenir XM1014',
    name: 'CaliCamo',
    quality: 'Minimal Wear',
    marketPrice: 5.75,
    avgPrice: 6.44
}, {
    type: 'Souvenir XM1014',
    name: 'CaliCamo',
    quality: 'Field-Tested',
    marketPrice: 4.54,
    avgPrice: 6.06
}, {
    type: 'Souvenir XM1014',
    name: 'CaliCamo',
    quality: 'Well-Worn',
    marketPrice: 147.20,
    avgPrice: 25.03
}, {
    type: 'Souvenir XM1014',
    name: 'CaliCamo',
    quality: 'Battle-Scarred',
    marketPrice: 12.80,
    avgPrice: 15.00
}, {
    type: 'XM1014',
    name: 'Fallout Warning',
    quality: 'Factory New',
    marketPrice: 29.28,
    avgPrice: 20.43
}, {
    type: 'XM1014',
    name: 'Fallout Warning',
    quality: 'Minimal Wear',
    marketPrice: 3.23,
    avgPrice: 2.69
}, {
    type: 'XM1014',
    name: 'Fallout Warning',
    quality: 'Field-Tested',
    marketPrice: 1.08,
    avgPrice: 1.00
}, {
    type: 'XM1014',
    name: 'Fallout Warning',
    quality: 'Well-Worn',
    marketPrice: 1.21,
    avgPrice: 1.04
}, {
    type: 'XM1014',
    name: 'Fallout Warning',
    quality: 'Battle-Scarred',
    marketPrice: 1.09,
    avgPrice: 0.98
}, {
    type: 'Souvenir XM1014',
    name: 'Fallout Warning',
    quality: 'Factory New',
    marketPrice: 77.05,
    avgPrice: 87.51
}, {
    type: 'Souvenir XM1014',
    name: 'Fallout Warning',
    quality: 'Minimal Wear',
    marketPrice: 2.81,
    avgPrice: 2.32
}, {
    type: 'Souvenir XM1014',
    name: 'Fallout Warning',
    quality: 'Field-Tested',
    marketPrice: 1.27,
    avgPrice: 1.22
}, {
    type: 'Souvenir XM1014',
    name: 'Fallout Warning',
    quality: 'Well-Worn',
    marketPrice: 2.46,
    avgPrice: 1.48
}, {
    type: 'Souvenir XM1014',
    name: 'Fallout Warning',
    quality: 'Battle-Scarred',
    marketPrice: 1.51,
    avgPrice: 0.92
}, {
    type: 'XM1014',
    name: 'Grassland',
    quality: 'Factory New',
    marketPrice: 6.16,
    avgPrice: 5.71
}, {
    type: 'XM1014',
    name: 'Grassland',
    quality: 'Minimal Wear',
    marketPrice: 0.74,
    avgPrice: 0.64
}, {
    type: 'XM1014',
    name: 'Grassland',
    quality: 'Field-Tested',
    marketPrice: 0.24,
    avgPrice: 0.20
}, {
    type: 'XM1014',
    name: 'Grassland',
    quality: 'Well-Worn',
    marketPrice: 0.35,
    avgPrice: 0.28
}, {
    type: 'XM1014',
    name: 'Grassland',
    quality: 'Battle-Scarred',
    marketPrice: 0.27,
    avgPrice: 0.27
}, {
    type: 'XM1014',
    name: 'Heaven Guard',
    quality: 'Factory New',
    marketPrice: 1.63,
    avgPrice: 1.40
}, {
    type: 'XM1014',
    name: 'Heaven Guard',
    quality: 'Minimal Wear',
    marketPrice: 0.71,
    avgPrice: 0.67
}, {
    type: 'XM1014',
    name: 'Heaven Guard',
    quality: 'Field-Tested',
    marketPrice: 0.57,
    avgPrice: 0.54
}, {
    type: 'XM1014',
    name: 'Heaven Guard',
    quality: 'Well-Worn',
    marketPrice: 0.69,
    avgPrice: 0.69
}, {
    type: 'XM1014',
    name: 'Heaven Guard',
    quality: 'Battle-Scarred',
    marketPrice: 1.08,
    avgPrice: 0.98
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Factory New',
    marketPrice: 7.41,
    avgPrice: 6.66
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Minimal Wear',
    marketPrice: 2.79,
    avgPrice: 2.52
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Field-Tested',
    marketPrice: 1.73,
    avgPrice: 1.77
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Well-Worn',
    marketPrice: 1.89,
    avgPrice: 1.81
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Heaven Guard',
    quality: 'Battle-Scarred',
    marketPrice: 2.76,
    avgPrice: 2.04
}, {
    type: 'XM1014',
    name: 'Jungle',
    quality: 'Factory New',
    marketPrice: 3.70,
    avgPrice: 2.99
}, {
    type: 'XM1014',
    name: 'Jungle',
    quality: 'Minimal Wear',
    marketPrice: 0.54,
    avgPrice: 0.59
}, {
    type: 'XM1014',
    name: 'Jungle',
    quality: 'Field-Tested',
    marketPrice: 0.29,
    avgPrice: 0.30
}, {
    type: 'XM1014',
    name: 'Jungle',
    quality: 'Well-Worn',
    marketPrice: 0.70,
    avgPrice: 0.67
}, {
    type: 'XM1014',
    name: 'Jungle',
    quality: 'Battle-Scarred',
    marketPrice: 0.46,
    avgPrice: 0.31
}, {
    type: 'XM1014',
    name: 'Quicksilver',
    quality: 'Factory New',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'XM1014',
    name: 'Quicksilver',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.10
}, {
    type: 'XM1014',
    name: 'Quicksilver',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.09
}, {
    type: 'XM1014',
    name: 'Quicksilver',
    quality: 'Well-Worn',
    marketPrice: 0.24,
    avgPrice: 0.17
}, {
    type: 'XM1014',
    name: 'Quicksilver',
    quality: 'Battle-Scarred',
    marketPrice: 0.15,
    avgPrice: 0.12
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Quicksilver',
    quality: 'Factory New',
    marketPrice: 0.64,
    avgPrice: 0.62
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Quicksilver',
    quality: 'Minimal Wear',
    marketPrice: 0.38,
    avgPrice: 0.35
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Quicksilver',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.25
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Quicksilver',
    quality: 'Well-Worn',
    marketPrice: 0.27,
    avgPrice: 0.31
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Quicksilver',
    quality: 'Battle-Scarred',
    marketPrice: 0.38,
    avgPrice: 0.39
}, {
    type: 'XM1014',
    name: 'Red Leather',
    quality: 'Factory New',
    marketPrice: 3.83,
    avgPrice: 3.92
}, {
    type: 'XM1014',
    name: 'Red Leather',
    quality: 'Minimal Wear',
    marketPrice: 2.38,
    avgPrice: 2.22
}, {
    type: 'XM1014',
    name: 'Red Leather',
    quality: 'Field-Tested',
    marketPrice: 1.66,
    avgPrice: 1.75
}, {
    type: 'XM1014',
    name: 'Red Leather',
    quality: 'Well-Worn',
    marketPrice: 5.35,
    avgPrice: 3.94
}, {
    type: 'XM1014',
    name: 'Red Leather',
    quality: 'Battle-Scarred',
    marketPrice: 2.18,
    avgPrice: 1.87
}, {
    type: 'XM1014',
    name: 'Red Python',
    quality: 'Minimal Wear',
    marketPrice: 0.31,
    avgPrice: 0.35
}, {
    type: 'XM1014',
    name: 'Red Python',
    quality: 'Field-Tested',
    marketPrice: 0.16,
    avgPrice: 0.15
}, {
    type: 'XM1014',
    name: 'Red Python',
    quality: 'Well-Worn',
    marketPrice: 0.37,
    avgPrice: 0.26
}, {
    type: 'XM1014',
    name: 'Red Python',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.17
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Red Python',
    quality: 'Minimal Wear',
    marketPrice: 1.05,
    avgPrice: 1.10
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Red Python',
    quality: 'Field-Tested',
    marketPrice: 0.43,
    avgPrice: 0.44
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Red Python',
    quality: 'Well-Worn',
    marketPrice: 0.81,
    avgPrice: 0.62
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Red Python',
    quality: 'Battle-Scarred',
    marketPrice: 0.71,
    avgPrice: 0.56
}, {
    type: 'XM1014',
    name: 'Scumbria',
    quality: 'Factory New',
    marketPrice: 0.25,
    avgPrice: 0.22
}, {
    type: 'XM1014',
    name: 'Scumbria',
    quality: 'Minimal Wear',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'XM1014',
    name: 'Scumbria',
    quality: 'Field-Tested',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'XM1014',
    name: 'Scumbria',
    quality: 'Well-Worn',
    marketPrice: 0.10,
    avgPrice: 0.08
}, {
    type: 'XM1014',
    name: 'Scumbria',
    quality: 'Battle-Scarred',
    marketPrice: 0.11,
    avgPrice: 0.09
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Scumbria',
    quality: 'Factory New',
    marketPrice: 1.64,
    avgPrice: 1.31
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Scumbria',
    quality: 'Minimal Wear',
    marketPrice: 0.38,
    avgPrice: 0.36
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Scumbria',
    quality: 'Field-Tested',
    marketPrice: 0.25,
    avgPrice: 0.24
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Scumbria',
    quality: 'Well-Worn',
    marketPrice: 0.26,
    avgPrice: 0.23
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Scumbria',
    quality: 'Battle-Scarred',
    marketPrice: 0.25,
    avgPrice: 0.23
}, {
    type: 'XM1014',
    name: 'Teclu Burner',
    quality: 'Factory New',
    marketPrice: 1.66,
    avgPrice: 1.56
}, {
    type: 'XM1014',
    name: 'Teclu Burner',
    quality: 'Minimal Wear',
    marketPrice: 0.86,
    avgPrice: 0.87
}, {
    type: 'XM1014',
    name: 'Teclu Burner',
    quality: 'Field-Tested',
    marketPrice: 0.53,
    avgPrice: 0.52
}, {
    type: 'XM1014',
    name: 'Teclu Burner',
    quality: 'Well-Worn',
    marketPrice: 0.84,
    avgPrice: 0.79
}, {
    type: 'XM1014',
    name: 'Teclu Burner',
    quality: 'Battle-Scarred',
    marketPrice: 0.55,
    avgPrice: 0.53
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Teclu Burner',
    quality: 'Factory New',
    marketPrice: 6.38,
    avgPrice: 7.29
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Teclu Burner',
    quality: 'Minimal Wear',
    marketPrice: 4.44,
    avgPrice: 3.99
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Teclu Burner',
    quality: 'Field-Tested',
    marketPrice: 2.19,
    avgPrice: 2.10
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Teclu Burner',
    quality: 'Well-Worn',
    marketPrice: 2.83,
    avgPrice: 2.75
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Teclu Burner',
    quality: 'Battle-Scarred',
    marketPrice: 1.87,
    avgPrice: 2.18
}, {
    type: 'XM1014',
    name: 'Tranquility',
    quality: 'Factory New',
    marketPrice: 6.18,
    avgPrice: 6.19
}, {
    type: 'XM1014',
    name: 'Tranquility',
    quality: 'Minimal Wear',
    marketPrice: 2.96,
    avgPrice: 2.60
}, {
    type: 'XM1014',
    name: 'Tranquility',
    quality: 'Field-Tested',
    marketPrice: 1.90,
    avgPrice: 1.89
}, {
    type: 'XM1014',
    name: 'Tranquility',
    quality: 'Well-Worn',
    marketPrice: 3.13,
    avgPrice: 2.29
}, {
    type: 'XM1014',
    name: 'Tranquility',
    quality: 'Battle-Scarred',
    marketPrice: 2.50,
    avgPrice: 2.22
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Tranquility',
    quality: 'Factory New',
    marketPrice: 26.39,
    avgPrice: 25.07
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Tranquility',
    quality: 'Minimal Wear',
    marketPrice: 10.99,
    avgPrice: 10.22
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Tranquility',
    quality: 'Field-Tested',
    marketPrice: 7.90,
    avgPrice: 5.65
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Tranquility',
    quality: 'Well-Worn',
    marketPrice: 8.13,
    avgPrice: 7.11
}, {
    type: 'XM1014',
    statTrak: true,
    name: 'Tranquility',
    quality: 'Battle-Scarred',
    marketPrice: 11.50,
    avgPrice: 8.52
}, {
    type: 'XM1014',
    name: 'Urban Perforated',
    quality: 'Factory New',
    marketPrice: 3.71,
    avgPrice: 2.15
}, {
    type: 'XM1014',
    name: 'Urban Perforated',
    quality: 'Minimal Wear',
    marketPrice: 0.78,
    avgPrice: 0.66
}, {
    type: 'XM1014',
    name: 'Urban Perforated',
    quality: 'Field-Tested',
    marketPrice: 0.55,
    avgPrice: 0.53
}, {
    type: 'XM1014',
    name: 'Urban Perforated',
    quality: 'Well-Worn',
    marketPrice: 0.55,
    avgPrice: 0.51
}, {
    type: 'XM1014',
    name: 'Urban Perforated',
    quality: 'Battle-Scarred',
    marketPrice: 0.62,
    avgPrice: 3.20
}, {
    type: 'XM1014',
    name: 'VariCamo Blue',
    quality: 'Factory New',
    marketPrice: 3.64,
    avgPrice: 3.21
}, {
    type: 'XM1014',
    name: 'VariCamo Blue',
    quality: 'Minimal Wear',
    marketPrice: 2.34,
    avgPrice: 1.72
}, {
    type: 'XM1014',
    name: 'VariCamo Blue',
    quality: 'Field-Tested',
    marketPrice: 1.07,
    avgPrice: 1.09
}, {
    type: 'XM1014',
    name: 'VariCamo Blue',
    quality: 'Well-Worn',
    marketPrice: 1.27,
    avgPrice: 1.07
}, {
    type: 'XM1014',
    name: 'VariCamo Blue',
    quality: 'Battle-Scarred',
    marketPrice: 1.07,
    avgPrice: 0.95
}, {
    type: 'Souvenir XM1014',
    name: 'VariCamo Blue',
    quality: 'Factory New',
    marketPrice: 7.99,
    avgPrice: 6.37
}, {
    type: 'Souvenir XM1014',
    name: 'VariCamo Blue',
    quality: 'Minimal Wear',
    marketPrice: 3.00,
    avgPrice: 2.84
}, {
    type: 'Souvenir XM1014',
    name: 'VariCamo Blue',
    quality: 'Field-Tested',
    marketPrice: 2.45,
    avgPrice: 2.33
}, {
    type: 'Souvenir XM1014',
    name: 'VariCamo Blue',
    quality: 'Well-Worn',
    marketPrice: 7.05,
    avgPrice: 2.64
}, {
    type: 'Souvenir XM1014',
    name: 'VariCamo Blue',
    quality: 'Battle-Scarred',
    marketPrice: 9.96,
    avgPrice: 6.69
}, { //WorkShop Case Prices
    type: 'Sawed-Off',
    name: 'Cutaway',
    quality: 'Battle-Scarred',
    marketPrice: 0.8,
    avgPrice: 0.8
}, {
    type: 'Sawed-Off',
    name: 'Cutaway',
    quality: 'Well-Worn',
    marketPrice: 1.7,
    avgPrice: 1.7
}, {
    type: 'Sawed-Off',
    name: 'Cutaway',
    quality: 'Field-Tested',
    marketPrice: 2.2,
    avgPrice: 2.2
}, {
    type: 'Sawed-Off',
    name: 'Cutaway',
    quality: 'Minimal Wear',
    marketPrice: 3.5,
    avgPrice: 3.5
}, {
    type: 'Sawed-Off',
    name: 'Cutaway',
    quality: 'Factory New',
    marketPrice: 5.81,
    avgPrice: 5.81
}, {
    type: 'PP-Bizon',
    name: 'Nostromo',
    quality: 'Battle-Scarred',
    marketPrice: 2.3,
    avgPrice: 2.3
}, {
    type: 'PP-Bizon',
    name: 'Nostromo',
    quality: 'Well-Worn',
    marketPrice: 3.54,
    avgPrice: 3.54
}, {
    type: 'PP-Bizon',
    name: 'Nostromo',
    quality: 'Field-Tested',
    marketPrice: 5.21,
    avgPrice: 5.21
}, {
    type: 'PP-Bizon',
    name: 'Nostromo',
    quality: 'Minimal Wear',
    marketPrice: 6.15,
    avgPrice: 6.15
}, {
    type: 'PP-Bizon',
    name: 'Nostromo',
    quality: 'Factory New',
    marketPrice: 10.38,
    avgPrice: 10.38
}, {
    type: 'Five-Seven',
    name: 'Blot',
    quality: 'Battle-Scarred',
    marketPrice: 3.44,
    avgPrice: 3.44
}, {
    type: 'Five-Seven',
    name: 'Blot',
    quality: 'Well-Worn',
    marketPrice: 4.62,
    avgPrice: 4.62
}, {
    type: 'Five-Seven',
    name: 'Blot',
    quality: 'Field-Tested',
    marketPrice: 5.3,
    avgPrice: 5.3
}, {
    type: 'Five-Seven',
    name: 'Blot',
    quality: 'Minimal Wear',
    marketPrice: 6.84,
    avgPrice: 6.84
}, {
    type: 'Five-Seven',
    name: 'Blot',
    quality: 'Factory New',
    marketPrice: 8.95,
    avgPrice: 8.95
}, {
    type: 'SSG 08',
    name: 'King Cobra',
    quality: 'Battle-Scarred',
    marketPrice: 0.1,
    avgPrice: 0.1
}, {
    type: 'SSG 08',
    name: 'King Cobra',
    quality: 'Well-Worn',
    marketPrice: 0.3,
    avgPrice: 0.3
}, {
    type: 'SSG 08',
    name: 'King Cobra',
    quality: 'Field-Tested',
    marketPrice: 0.6,
    avgPrice: 0.6
}, {
    type: 'SSG 08',
    name: 'King Cobra',
    quality: 'Minimal Wear',
    marketPrice: 0.9,
    avgPrice: 0.9
}, {
    type: 'SSG 08',
    name: 'King Cobra',
    quality: 'Factory New',
    marketPrice: 1.6,
    avgPrice: 1.6
}, {
    type: 'MAC-10',
    name: 'Kinetics',
    quality: 'Battle-Scarred',
    marketPrice: 4.7,
    avgPrice: 4.7
}, {
    type: 'MAC-10',
    name: 'Kinetics',
    quality: 'Well-Worn',
    marketPrice: 6.5,
    avgPrice: 6.5
}, {
    type: 'MAC-10',
    name: 'Kinetics',
    quality: 'Field-Tested',
    marketPrice: 8.9,
    avgPrice: 8.9
}, {
    type: 'MAC-10',
    name: 'Kinetics',
    quality: 'Minimal Wear',
    marketPrice: 12.5,
    avgPrice: 12.5
}, {
    type: 'MAC-10',
    name: 'Kinetics',
    quality: 'Factory New',
    marketPrice: 15.7,
    avgPrice: 15.7
}, {
    type: 'M4A1-S',
    name: 'Never Fly',
    quality: 'Battle-Scarred',
    marketPrice: 4.9,
    avgPrice: 5.9
}, {
    type: 'M4A1-S',
    name: 'Never Fly',
    quality: 'Well-Worn',
    marketPrice: 8.4,
    avgPrice: 8.4
}, {
    type: 'M4A1-S',
    name: 'Never Fly',
    quality: 'Field-Tested',
    marketPrice: 12.1,
    avgPrice: 12.1
}, {
    type: 'M4A1-S',
    name: 'Never Fly',
    quality: 'Minimal Wear',
    marketPrice: 20.8,
    avgPrice: 3.8
}, {
    type: 'M4A1-S',
    name: 'Never Fly',
    quality: 'Factory New',
    marketPrice: 23.6,
    avgPrice: 23.6
}, {
    type: 'CZ75',
    name: 'Badass Comic',
    quality: 'Battle-Scarred',
    marketPrice: 10.1,
    avgPrice: 10.1
}, {
    type: 'CZ75',
    name: 'Badass Comic',
    quality: 'Well-Worn',
    marketPrice: 13.6,
    avgPrice: 13.6
}, {
    type: 'CZ75',
    name: 'Badass Comic',
    quality: 'Field-Tested',
    marketPrice: 17.6,
    avgPrice: 17.6
}, {
    type: 'CZ75',
    name: 'Badass Comic',
    quality: 'Minimal Wear',
    marketPrice: 23.2,
    avgPrice: 23.2
}, {
    type: 'CZ75',
    name: 'Badass Comic',
    quality: 'Factory New',
    marketPrice: 34.8,
    avgPrice: 34.8
}, {
    type: 'P250',
    name: 'N-Force',
    quality: 'Battle-Scarred',
    marketPrice: 7.0,
    avgPrice: 7.0
}, {
    type: 'P250',
    name: 'N-Force',
    quality: 'Well-Worn',
    marketPrice: 14.4,
    avgPrice: 14.4
}, {
    type: 'P250',
    name: 'N-Force',
    quality: 'Field-Tested',
    marketPrice: 19.9,
    avgPrice: 19.9
}, {
    type: 'P250',
    name: 'N-Force',
    quality: 'Minimal Wear',
    marketPrice: 27.8,
    avgPrice: 27.8
}, {
    type: 'P250',
    name: 'N-Force',
    quality: 'Factory New',
    marketPrice: 36.4,
    avgPrice: 36.4
}, {
    type: 'AWP',
    name: 'Phoenix',
    quality: 'Battle-Scarred',
    marketPrice: 9.5,
    avgPrice: 9.6
}, {
    type: 'AWP',
    name: 'Phoenix',
    quality: 'Well-Worn',
    marketPrice: 14.4,
    avgPrice: 14.5
}, {
    type: 'AWP',
    name: 'Phoenix',
    quality: 'Field-Tested',
    marketPrice: 22,
    avgPrice: 22
}, {
    type: 'AWP',
    name: 'Phoenix',
    quality: 'Minimal Wear',
    marketPrice: 37.9,
    avgPrice: 37.6
}, {
    type: 'AWP',
    name: 'Phoenix',
    quality: 'Factory New',
    marketPrice: 51.3,
    avgPrice: 51.3
}, {
    type: 'Desert Eagle',
    name: 'Gold',
    quality: 'Battle-Scarred',
    marketPrice: 7.5,
    avgPrice: 7.6
}, {
    type: 'Desert Eagle',
    name: 'Gold',
    quality: 'Well-Worn',
    marketPrice: 11.2,
    avgPrice: 11.2
}, {
    type: 'Desert Eagle',
    name: 'Gold',
    quality: 'Field-Tested',
    marketPrice: 27.4,
    avgPrice: 27.4
}, {
    type: 'Desert Eagle',
    name: 'Gold',
    quality: 'Minimal Wear',
    marketPrice: 54.2,
    avgPrice: 54.2
}, {
    type: 'Desert Eagle',
    name: 'Gold',
    quality: 'Factory New',
    marketPrice: 77.1,
    avgPrice: 77.1
}, {
    type: 'AK-47',
    name: 'Fluentem',
    quality: 'Battle-Scarred',
    marketPrice: 22.5,
    avgPrice: 22.6
}, {
    type: 'AK-47',
    name: 'Fluentem',
    quality: 'Well-Worn',
    marketPrice: 28.2,
    avgPrice: 28.2
}, {
    type: 'AK-47',
    name: 'Fluentem',
    quality: 'Field-Tested',
    marketPrice: 41.4,
    avgPrice: 41.4
}, {
    type: 'AK-47',
    name: 'Fluentem',
    quality: 'Minimal Wear',
    marketPrice: 68.2,
    avgPrice: 68.2
}, {
    type: 'AK-47',
    name: 'Fluentem',
    quality: 'Factory New',
    marketPrice: 97.1,
    avgPrice: 97.1
}, {
    type: 'USP-S',
    name: 'Draco',
    quality: 'Battle-Scarred',
    marketPrice: 10.5,
    avgPrice: 10.6
}, {
    type: 'USP-S',
    name: 'Draco',
    quality: 'Well-Worn',
    marketPrice: 16.2,
    avgPrice: 16.2
}, {
    type: 'USP-S',
    name: 'Draco',
    quality: 'Field-Tested',
    marketPrice: 28.4,
    avgPrice: 28.4
}, {
    type: 'USP-S',
    name: 'Draco',
    quality: 'Minimal Wear',
    marketPrice: 36.2,
    avgPrice: 36.2
}, {
    type: 'USP-S',
    name: 'Draco',
    quality: 'Factory New',
    marketPrice: 54.1,
    avgPrice: 54.1
}, {
    type: 'Gut Knife',
    name: 'Revenge in Sweet',
    quality: 'Battle-Scarred',
    marketPrice: 99,
    avgPrice: 99
}, {
    type: 'Gut Knife',
    name: 'Revenge in Sweet',
    quality: 'Well-Worn',
    marketPrice: 120,
    avgPrice: 120
}, {
    type: 'Gut Knife',
    name: 'Revenge in Sweet',
    quality: 'Field-Tested',
    marketPrice: 170,
    avgPrice: 170
}, {
    type: 'Gut Knife',
    name: 'Revenge in Sweet',
    quality: 'Minimal Wear',
    marketPrice: 210,
    avgPrice: 210
}, {
    type: 'Gut Knife',
    name: 'Revenge in Sweet',
    quality: 'Factory New',
    marketPrice: 300,
    avgPrice: 300
}, {
    type: 'Karambit',
    name: 'Purple Abstract',
    quality: 'Battle-Scarred',
    marketPrice: 158.3,
    avgPrice: 158
}, {
    type: 'Karambit',
    name: 'Purple Abstract',
    quality: 'Well-Worn',
    marketPrice: 193.6,
    avgPrice: 193.6
}, {
    type: 'Karambit',
    name: 'Purple Abstract',
    quality: 'Field-Tested',
    marketPrice: 230.1,
    avgPrice: 230.1
}, {
    type: 'Karambit',
    name: 'Purple Abstract',
    quality: 'Minimal Wear',
    marketPrice: 272.6,
    avgPrice: 272.6
}, {
    type: 'Karambit',
    name: 'Purple Abstract',
    quality: 'Factory New',
    marketPrice: 397.6,
    avgPrice: 397.6
}, { //WorkShop StatTrak Case Prices
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Cutaway',
    quality: 'Battle-Scarred',
    marketPrice: 1.96,
    avgPrice: 1.96
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Cutaway',
    quality: 'Well-Worn',
    marketPrice: 3.24,
    avgPrice: 3.24
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Cutaway',
    quality: 'Field-Tested',
    marketPrice: 5.41,
    avgPrice: 5.41
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Cutaway',
    quality: 'Minimal Wear',
    marketPrice: 7.22,
    avgPrice: 7.22
}, {
    type: 'Sawed-Off',
    statTrak: true,
    name: 'Cutaway',
    quality: 'Factory New',
    marketPrice: 9.44,
    avgPrice: 9.44
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Nostromo',
    quality: 'Battle-Scarred',
    marketPrice: 4.9,
    avgPrice: 4.9
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Nostromo',
    quality: 'Well-Worn',
    marketPrice: 6.3,
    avgPrice: 6.3
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Nostromo',
    quality: 'Field-Tested',
    marketPrice: 8.8,
    avgPrice: 8.8
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Nostromo',
    quality: 'Minimal Wear',
    marketPrice: 12.5,
    avgPrice: 12.5
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'Nostromo',
    quality: 'Factory New',
    marketPrice: 17.0,
    avgPrice: 17.0
}, {
    type: 'Five-Seven',
    statTrak: true,
    name: 'Blot',
    quality: 'Battle-Scarred',
    marketPrice: 4.8,
    avgPrice: 4.8
}, {
    type: 'Five-Seven',
    statTrak: true,
    name: 'Blot',
    quality: 'Well-Worn',
    marketPrice: 5.96,
    avgPrice: 5.96
}, {
    type: 'Five-Seven',
    statTrak: true,
    name: 'Blot',
    quality: 'Field-Tested',
    marketPrice: 7.8,
    avgPrice: 7.8
}, {
    type: 'Five-Seven',
    statTrak: true,
    name: 'Blot',
    quality: 'Minimal Wear',
    marketPrice: 9.7,
    avgPrice: 9.7
}, {
    type: 'Five-Seven',
    statTrak: true,
    name: 'Blot',
    quality: 'Factory New',
    marketPrice: 11.7,
    avgPrice: 11.7
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'King Cobra',
    quality: 'Battle-Scarred',
    marketPrice: 0.2,
    avgPrice: 0.2
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'King Cobra',
    quality: 'Well-Worn',
    marketPrice: 0.6,
    avgPrice: 0.6
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'King Cobra',
    quality: 'Field-Tested',
    marketPrice: 0.9,
    avgPrice: 0.9
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'King Cobra',
    quality: 'Minimal Wear',
    marketPrice: 1.3,
    avgPrice: 1.3
}, {
    type: 'SSG 08',
    statTrak: true,
    name: 'King Cobra',
    quality: 'Factory New',
    marketPrice: 1.9,
    avgPrice: 1.9
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Kinetics',
    quality: 'Battle-Scarred',
    marketPrice: 6.2,
    avgPrice: 6.2
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Kinetics',
    quality: 'Well-Worn',
    marketPrice: 7.9,
    avgPrice: 7.9
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Kinetics',
    quality: 'Field-Tested',
    marketPrice: 9.3,
    avgPrice: 9.3
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Kinetics',
    quality: 'Minimal Wear',
    marketPrice: 13,
    avgPrice: 13
}, {
    type: 'MAC-10',
    statTrak: true,
    name: 'Kinetics',
    quality: 'Factory New',
    marketPrice: 21,
    avgPrice: 21
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Never Fly',
    quality: 'Battle-Scarred',
    marketPrice: 8.8,
    avgPrice: 8.8
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Never Fly',
    quality: 'Well-Worn',
    marketPrice: 10.4,
    avgPrice: 10.4
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Never Fly',
    quality: 'Field-Tested',
    marketPrice: 14.8,
    avgPrice: 14.8
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Never Fly',
    quality: 'Minimal Wear',
    marketPrice: 21.8,
    avgPrice: 21.8
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'Never Fly',
    quality: 'Factory New',
    marketPrice: 30.1,
    avgPrice: 30.1
}, {
    type: 'CZ75',
    statTrak: true,
    name: 'Badass Comic',
    quality: 'Battle-Scarred',
    marketPrice: 12.7,
    avgPrice: 12.7
}, {
    type: 'CZ75',
    statTrak: true,
    name: 'Badass Comic',
    quality: 'Well-Worn',
    marketPrice: 19.1,
    avgPrice: 18.1
}, {
    type: 'CZ75',
    statTrak: true,
    name: 'Badass Comic',
    quality: 'Field-Tested',
    marketPrice: 24.9,
    avgPrice: 24.9
}, {
    type: 'CZ75',
    statTrak: true,
    name: 'Badass Comic',
    quality: 'Minimal Wear',
    marketPrice: 37.1,
    avgPrice: 37.1
}, {
    type: 'CZ75',
    statTrak: true,
    name: 'Badass Comic',
    quality: 'Factory New',
    marketPrice: 53.7,
    avgPrice: 53.7
}, {
    type: 'P250',
    statTrak: true,
    name: 'N-Force',
    quality: 'Battle-Scarred',
    marketPrice: 11.8,
    avgPrice: 11.8
}, {
    type: 'P250',
    statTrak: true,
    name: 'N-Force',
    quality: 'Well-Worn',
    marketPrice: 17.4,
    avgPrice: 17.4
}, {
    type: 'P250',
    statTrak: true,
    name: 'N-Force',
    quality: 'Field-Tested',
    marketPrice: 23.8,
    avgPrice: 23.9
}, {
    type: 'P250',
    statTrak: true,
    name: 'N-Force',
    quality: 'Minimal Wear',
    marketPrice: 37.7,
    avgPrice: 37.7
}, {
    type: 'P250',
    statTrak: true,
    name: 'N-Force',
    quality: 'Factory New',
    marketPrice: 58.8,
    avgPrice: 58.8
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phoenix',
    quality: 'Battle-Scarred',
    marketPrice: 14.9,
    avgPrice: 14.9
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phoenix',
    quality: 'Well-Worn',
    marketPrice: 18.6,
    avgPrice: 18.6
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phoenix',
    quality: 'Field-Tested',
    marketPrice: 29.3,
    avgPrice: 29.3
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phoenix',
    quality: 'Minimal Wear',
    marketPrice: 47.2,
    avgPrice: 47.6
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Phoenix',
    quality: 'Factory New',
    marketPrice: 82.1,
    avgPrice: 82.1
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Gold',
    quality: 'Battle-Scarred',
    marketPrice: 15.3,
    avgPrice: 15.6
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Gold',
    quality: 'Well-Worn',
    marketPrice: 23.2,
    avgPrice: 23.2
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Gold',
    quality: 'Field-Tested',
    marketPrice: 33.2,
    avgPrice: 33.2
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Gold',
    quality: 'Minimal Wear',
    marketPrice: 58.2,
    avgPrice: 58.2
}, {
    type: 'Desert Eagle',
    statTrak: true,
    name: 'Gold',
    quality: 'Factory New',
    marketPrice: 114.1,
    avgPrice: 114.1
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fluentem',
    quality: 'Battle-Scarred',
    marketPrice: 30.8,
    avgPrice: 30.8
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fluentem',
    quality: 'Well-Worn',
    marketPrice: 37.2,
    avgPrice: 37.2
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fluentem',
    quality: 'Field-Tested',
    marketPrice: 56.4,
    avgPrice: 56.4
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fluentem',
    quality: 'Minimal Wear',
    marketPrice: 89.2,
    avgPrice: 89.2
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Fluentem',
    quality: 'Factory New',
    marketPrice: 128.7,
    avgPrice: 128.7
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Draco',
    quality: 'Battle-Scarred',
    marketPrice: 17.2,
    avgPrice: 17.2
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Draco',
    quality: 'Well-Worn',
    marketPrice: 27.2,
    avgPrice: 27.2
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Draco',
    quality: 'Field-Tested',
    marketPrice: 40.9,
    avgPrice: 40.9
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Draco',
    quality: 'Minimal Wear',
    marketPrice: 52.5,
    avgPrice: 52.5
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Draco',
    quality: 'Factory New',
    marketPrice: 89.1,
    avgPrice: 89.1
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Revenge in Sweet',
    quality: 'Battle-Scarred',
    marketPrice: 147,
    avgPrice: 140
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Revenge in Sweet',
    quality: 'Well-Worn',
    marketPrice: 182.4,
    avgPrice: 180.5
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Revenge in Sweet',
    quality: 'Field-Tested',
    marketPrice: 232.9,
    avgPrice: 232.9
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Revenge in Sweet',
    quality: 'Minimal Wear',
    marketPrice: 294.1,
    avgPrice: 294.1
}, {
    type: 'Gut Knife',
    statTrak: true,
    name: 'Revenge in Sweet',
    quality: 'Factory New',
    marketPrice: 383.7,
    avgPrice: 383.7
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Purple Abstract',
    quality: 'Battle-Scarred',
    marketPrice: 195.3,
    avgPrice: 195
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Purple Abstract',
    quality: 'Well-Worn',
    marketPrice: 227.3,
    avgPrice: 227.3
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Purple Abstract',
    quality: 'Field-Tested',
    marketPrice: 260.2,
    avgPrice: 260.2
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Purple Abstract',
    quality: 'Minimal Wear',
    marketPrice: 301.2,
    avgPrice: 301.5
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Purple Abstract',
    quality: 'Factory New',
    marketPrice: 440.6,
    avgPrice: 440.6
}, { //WorkShop2 Case Prices
    type: 'Tec-9',
    name: 'Chemical smoke',
    quality: 'Battle-Scarred',
    marketPrice: 0.69,
    avgPrice: 0.69
}, {
    type: 'Tec-9',
    name: 'Chemical smoke',
    quality: 'Well-Worn',
    marketPrice: 0.99,
    avgPrice: 0.99
}, {
    type: 'Tec-9',
    name: 'Chemical smoke',
    quality: 'Field-Tested',
    marketPrice: 1.54,
    avgPrice: 1.54
}, {
    type: 'Tec-9',
    name: 'Chemical smoke',
    quality: 'Minimal Wear',
    marketPrice: 1.95,
    avgPrice: 1.95
}, {
    type: 'Tec-9',
    name: 'Chemical smoke',
    quality: 'Factory New',
    marketPrice: 2.92,
    avgPrice: 2.92
}, {
    type: 'PP-Bizon',
    name: 'TF2',
    quality: 'Battle-Scarred',
    marketPrice: 1.42,
    avgPrice: 1.42
}, {
    type: 'PP-Bizon',
    name: 'TF2',
    quality: 'Well-Worn',
    marketPrice: 2.04,
    avgPrice: 2.04
}, {
    type: 'PP-Bizon',
    name: 'TF2',
    quality: 'Field-Tested',
    marketPrice: 3.51,
    avgPrice: 3.51
}, {
    type: 'PP-Bizon',
    name: 'TF2',
    quality: 'Minimal Wear',
    marketPrice: 4.65,
    avgPrice: 4.65
}, {
    type: 'PP-Bizon',
    name: 'TF2',
    quality: 'Factory New',
    marketPrice: 8.79,
    avgPrice: 8.79
}, {
    type: 'USP-S',
    name: 'Dystopia',
    quality: 'Battle-Scarred',
    marketPrice: 2.22,
    avgPrice: 2.22
}, {
    type: 'USP-S',
    name: 'Dystopia',
    quality: 'Well-Worn',
    marketPrice: 3.31,
    avgPrice: 3.31
}, {
    type: 'USP-S',
    name: 'Dystopia',
    quality: 'Field-Tested',
    marketPrice: 3.74,
    avgPrice: 3.74
}, {
    type: 'USP-S',
    name: 'Dystopia',
    quality: 'Minimal Wear',
    marketPrice: 4.42,
    avgPrice: 4.42
}, {
    type: 'USP-S',
    name: 'Dystopia',
    quality: 'Factory New',
    marketPrice: 6.95,
    avgPrice: 6.95
}, {
    type: 'SG 553',
    name: 'Erlkoenig',
    quality: 'Battle-Scarred',
    marketPrice: 0.21,
    avgPrice: 0.21
}, {
    type: 'SG 553',
    name: 'Erlkoenig',
    quality: 'Well-Worn',
    marketPrice: 0.52,
    avgPrice: 0.52
}, {
    type: 'SG 553',
    name: 'Erlkoenig',
    quality: 'Field-Tested',
    marketPrice: 0.9,
    avgPrice: 0.9
}, {
    type: 'SG 553',
    name: 'Erlkoenig',
    quality: 'Minimal Wear',
    marketPrice: 1.45,
    avgPrice: 1.45
}, {
    type: 'SG 553',
    name: 'Erlkoenig',
    quality: 'Factory New',
    marketPrice: 2.36,
    avgPrice: 2.36
}, {
    type: 'M4A4',
    name: 'DeathWalker',
    quality: 'Battle-Scarred',
    marketPrice: 7.44,
    avgPrice: 7.44
}, {
    type: 'M4A4',
    name: 'DeathWalker',
    quality: 'Well-Worn',
    marketPrice: 9.07,
    avgPrice: 9.07
}, {
    type: 'M4A4',
    name: 'DeathWalker',
    quality: 'Field-Tested',
    marketPrice: 12,
    avgPrice: 12
}, {
    type: 'M4A4',
    name: 'DeathWalker',
    quality: 'Minimal Wear',
    marketPrice: 13.27,
    avgPrice: 13.27
}, {
    type: 'M4A4',
    name: 'DeathWalker',
    quality: 'Factory New',
    marketPrice: 15.7,
    avgPrice: 15.7
}, {
    type: 'UMP-45',
    name: 'Armamancer',
    quality: 'Battle-Scarred',
    marketPrice: 1.62,
    avgPrice: 1.62
}, {
    type: 'UMP-45',
    name: 'Armamancer',
    quality: 'Well-Worn',
    marketPrice: 2.04,
    avgPrice: 2.04
}, {
    type: 'UMP-45',
    name: 'Armamancer',
    quality: 'Field-Tested',
    marketPrice: 2.39,
    avgPrice: 2.39
}, {
    type: 'UMP-45',
    name: 'Armamancer',
    quality: 'Minimal Wear',
    marketPrice: 3.12,
    avgPrice: 3.12
}, {
    type: 'UMP-45',
    name: 'Armamancer',
    quality: 'Factory New',
    marketPrice: 6.27,
    avgPrice: 6.27
}, {
    type: 'MP7',
    name: 'Way of the Samurai',
    quality: 'Battle-Scarred',
    marketPrice: 6.45,
    avgPrice: 6.45
}, {
    type: 'MP7',
    name: 'Way of the Samurai',
    quality: 'Well-Worn',
    marketPrice: 6.96,
    avgPrice: 6.96
}, {
    type: 'MP7',
    name: 'Way of the Samurai',
    quality: 'Field-Tested',
    marketPrice: 8.12,
    avgPrice: 8.12
}, {
    type: 'MP7',
    name: 'Way of the Samurai',
    quality: 'Minimal Wear',
    marketPrice: 9.54,
    avgPrice: 9.54
}, {
    type: 'MP7',
    name: 'Way of the Samurai',
    quality: 'Factory New',
    marketPrice: 18.9,
    avgPrice: 18.9
}, {
    type: 'R8 Revolver',
    name: 'Kingdom of Dragons',
    quality: 'Battle-Scarred',
    marketPrice: 7.21,
    avgPrice: 7.21
}, {
    type: 'R8 Revolver',
    name: 'Kingdom of Dragons',
    quality: 'Well-Worn',
    marketPrice: 9.4,
    avgPrice: 9.4
}, {
    type: 'R8 Revolver',
    name: 'Kingdom of Dragons',
    quality: 'Field-Tested',
    marketPrice: 16.9,
    avgPrice: 16.9
}, {
    type: 'R8 Revolver',
    name: 'Kingdom of Dragons',
    quality: 'Minimal Wear',
    marketPrice: 19.8,
    avgPrice: 19.8
}, {
    type: 'R8 Revolver',
    name: 'Kingdom of Dragons',
    quality: 'Factory New',
    marketPrice: 21.4,
    avgPrice: 21.4
}, {
    type: 'FAMAS',
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 10.75,
    avgPrice: 10.75
}, {
    type: 'FAMAS',
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 13.33,
    avgPrice: 13.33
}, {
    type: 'FAMAS',
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 17.01,
    avgPrice: 17.01
}, {
    type: 'FAMAS',
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 22.94,
    avgPrice: 22.94
}, {
    type: 'FAMAS',
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 38.3,
    avgPrice: 38.3
}, {
    type: 'M4A1-S',
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 14.5,
    avgPrice: 14.6
}, {
    type: 'M4A1-S',
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 16.2,
    avgPrice: 16.2
}, {
    type: 'M4A1-S',
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 24.4,
    avgPrice: 24.4
}, {
    type: 'M4A1-S',
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 33.3,
    avgPrice: 33.3
}, {
    type: 'M4A1-S',
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 67.1,
    avgPrice: 67.1
}, {
    type: 'AWP',
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 21.5,
    avgPrice: 21.6
}, {
    type: 'AWP',
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 29.62,
    avgPrice: 28.2
}, {
    type: 'AWP',
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 38.33,
    avgPrice: 41.43
}, {
    type: 'AWP',
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 49.35,
    avgPrice: 68.2
}, {
    type: 'AWP',
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 86.75,
    avgPrice: 97.1
}, {
    type: 'Glock-18',
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 21.5,
    avgPrice: 21.6
}, {
    type: 'Glock-18',
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 27.2,
    avgPrice: 16.2
}, {
    type: 'Glock-18',
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 34.4,
    avgPrice: 28.4
}, {
    type: 'Glock-18',
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 46.2,
    avgPrice: 36.2
}, {
    type: 'Glock-18',
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 68.1,
    avgPrice: 54.1
}, {
    type: 'AK-47',
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 28.34,
    avgPrice: 28.6
}, {
    type: 'AK-47',
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 30.44,
    avgPrice: 16.2
}, {
    type: 'AK-47',
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 47.43,
    avgPrice: 28.4
}, {
    type: 'AK-47',
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 68.2,
    avgPrice: 36.2
}, {
    type: 'AK-47',
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 93.1,
    avgPrice: 54.1
}, {
    type: 'Karambit',
    name: 'Bloodline',
    quality: 'Battle-Scarred',
    marketPrice: 123.4,
    avgPrice: 99
}, {
    type: 'Karambit',
    name: 'Bloodline',
    quality: 'Well-Worn',
    marketPrice: 148.4,
    avgPrice: 120
}, {
    type: 'Karambit',
    name: 'Bloodline',
    quality: 'Field-Tested',
    marketPrice: 156.99,
    avgPrice: 170
}, {
    type: 'Karambit',
    name: 'Bloodline',
    quality: 'Minimal Wear',
    marketPrice: 208.52,
    avgPrice: 210
}, {
    type: 'Karambit',
    name: 'Bloodline',
    quality: 'Factory New',
    marketPrice: 399,
    avgPrice: 300
}, {
    type: 'Karambit',
    name: 'Scorpion',
    quality: 'Battle-Scarred',
    marketPrice: 210.3,
    avgPrice: 158
}, {
    type: 'Karambit',
    name: 'Scorpion',
    quality: 'Well-Worn',
    marketPrice: 285.6,
    avgPrice: 193.6
}, {
    type: 'Karambit',
    name: 'Scorpion',
    quality: 'Field-Tested',
    marketPrice: 347.1,
    avgPrice: 230.1
}, {
    type: 'Karambit',
    name: 'Scorpion',
    quality: 'Minimal Wear',
    marketPrice: 399.99,
    avgPrice: 272.6
}, {
    type: 'Karambit',
    name: 'Scorpion',
    quality: 'Factory New',
    marketPrice: 427.6,
    avgPrice: 397.6
}, { //WorkShop StatTrak Case Prices
    type: 'Tec-9',
    statTrak: true,
    name: 'Chemical smoke',
    quality: 'Battle-Scarred',
    marketPrice: 0.87,
    avgPrice: 1.96
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Chemical smoke',
    quality: 'Well-Worn',
    marketPrice: 1.24,
    avgPrice: 3.24
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Chemical smoke',
    quality: 'Field-Tested',
    marketPrice: 1.97,
    avgPrice: 5.41
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Chemical smoke',
    quality: 'Minimal Wear',
    marketPrice: 2.47,
    avgPrice: 7.22
}, {
    type: 'Tec-9',
    statTrak: true,
    name: 'Chemical smoke',
    quality: 'Factory New',
    marketPrice: 3.75,
    avgPrice: 9.44
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'TF2',
    quality: 'Battle-Scarred',
    marketPrice: 1.9,
    avgPrice: 4.9
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'TF2',
    quality: 'Well-Worn',
    marketPrice: 2.77,
    avgPrice: 6.3
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'TF2',
    quality: 'Field-Tested',
    marketPrice: 4.1,
    avgPrice: 8.8
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'TF2',
    quality: 'Minimal Wear',
    marketPrice: 5.5,
    avgPrice: 12.5
}, {
    type: 'PP-Bizon',
    statTrak: true,
    name: 'TF2',
    quality: 'Factory New',
    marketPrice: 13.7,
    avgPrice: 17.0
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Dystopia',
    quality: 'Battle-Scarred',
    marketPrice: 2.8,
    avgPrice: 4.8
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Dystopia',
    quality: 'Well-Worn',
    marketPrice: 3.85,
    avgPrice: 5.96
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Dystopia',
    quality: 'Field-Tested',
    marketPrice: 4.8,
    avgPrice: 7.8
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Dystopia',
    quality: 'Minimal Wear',
    marketPrice: 5.7,
    avgPrice: 9.7
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Dystopia',
    quality: 'Factory New',
    marketPrice: 8.75,
    avgPrice: 11.7
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Erlkoenig',
    quality: 'Battle-Scarred',
    marketPrice: 0.44,
    avgPrice: 0.2
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Erlkoenig',
    quality: 'Well-Worn',
    marketPrice: 0.76,
    avgPrice: 0.6
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Erlkoenig',
    quality: 'Field-Tested',
    marketPrice: 1.37,
    avgPrice: 0.9
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Erlkoenig',
    quality: 'Minimal Wear',
    marketPrice: 1.78,
    avgPrice: 1.3
}, {
    type: 'SG 553',
    statTrak: true,
    name: 'Erlkoenig',
    quality: 'Factory New',
    marketPrice: 3.2,
    avgPrice: 1.9
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'DeathWalker',
    quality: 'Battle-Scarred',
    marketPrice: 8.87,
    avgPrice: 6.2
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'DeathWalker',
    quality: 'Well-Worn',
    marketPrice: 11.9,
    avgPrice: 7.9
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'DeathWalker',
    quality: 'Field-Tested',
    marketPrice: 13.3,
    avgPrice: 9.3
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'DeathWalker',
    quality: 'Minimal Wear',
    marketPrice: 14.9,
    avgPrice: 13
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'DeathWalker',
    quality: 'Factory New',
    marketPrice: 18.7,
    avgPrice: 21
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Armamancer',
    quality: 'Battle-Scarred',
    marketPrice: 1.92,
    avgPrice: 1.62
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Armamancer',
    quality: 'Well-Worn',
    marketPrice: 2.84,
    avgPrice: 2.04
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Armamancer',
    quality: 'Field-Tested',
    marketPrice: 3.19,
    avgPrice: 2.39
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Armamancer',
    quality: 'Minimal Wear',
    marketPrice: 3.82,
    avgPrice: 3.12
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'Armamancer',
    quality: 'Factory New',
    marketPrice: 7.67,
    avgPrice: 6.27
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Way of the Samurai',
    quality: 'Battle-Scarred',
    marketPrice: 7.04,
    avgPrice: 6.45
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Way of the Samurai',
    quality: 'Well-Worn',
    marketPrice: 7.86,
    avgPrice: 6.96
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Way of the Samurai',
    quality: 'Field-Tested',
    marketPrice: 9,
    avgPrice: 8.12
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Way of the Samurai',
    quality: 'Minimal Wear',
    marketPrice: 10.13,
    avgPrice: 9.54
}, {
    type: 'MP7',
    statTrak: true,
    name: 'Way of the Samurai',
    quality: 'Factory New',
    marketPrice: 20.9,
    avgPrice: 18.9
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Kingdom of Dragons',
    quality: 'Battle-Scarred',
    marketPrice: 8.41,
    avgPrice: 7.21
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Kingdom of Dragons',
    quality: 'Well-Worn',
    marketPrice: 10.12,
    avgPrice: 9.4
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Kingdom of Dragons',
    quality: 'Field-Tested',
    marketPrice: 18.97,
    avgPrice: 16.9
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Kingdom of Dragons',
    quality: 'Minimal Wear',
    marketPrice: 21.12,
    avgPrice: 19.8
}, {
    type: 'R8 Revolver',
    statTrak: true,
    name: 'Kingdom of Dragons',
    quality: 'Factory New',
    marketPrice: 25.1,
    avgPrice: 21.4
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 11.1,
    avgPrice: 10.75
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 14.23,
    avgPrice: 13.33
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 18.31,
    avgPrice: 17.01
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 24.07,
    avgPrice: 22.94
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 42.77,
    avgPrice: 38.3
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 16.3,
    avgPrice: 14.6
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 19.44,
    avgPrice: 16.2
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 28.31,
    avgPrice: 24.4
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 47.47,
    avgPrice: 33.3
}, {
    type: 'M4A1-S',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 86.15,
    avgPrice: 67.1
}, {
    type: 'AWP',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 28.10,
    avgPrice: 21.6
}, {
    type: 'AWP',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 34.77,
    avgPrice: 28.2
}, {
    type: 'AWP',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 46.15,
    avgPrice: 41.43
}, {
    type: 'AWP',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 67.85,
    avgPrice: 68.2
}, {
    type: 'AWP',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 110.75,
    avgPrice: 97.1
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 23.5,
    avgPrice: 21.6
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 30.2,
    avgPrice: 16.2
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 37.44,
    avgPrice: 28.4
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 58.2,
    avgPrice: 36.2
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 87.1,
    avgPrice: 54.1
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Battle-Scarred',
    marketPrice: 34.34,
    avgPrice: 28.6
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Well-Worn',
    marketPrice: 39.44,
    avgPrice: 16.2
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Field-Tested',
    marketPrice: 57.43,
    avgPrice: 28.4
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Minimal Wear',
    marketPrice: 76.2,
    avgPrice: 36.2
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'BlueWolf',
    quality: 'Factory New',
    marketPrice: 113.1,
    avgPrice: 54.1
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Bloodline',
    quality: 'Battle-Scarred',
    marketPrice: 173.4,
    avgPrice: 99
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Bloodline',
    quality: 'Well-Worn',
    marketPrice: 197.4,
    avgPrice: 120
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Bloodline',
    quality: 'Field-Tested',
    marketPrice: 243.99,
    avgPrice: 170
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Bloodline',
    quality: 'Minimal Wear',
    marketPrice: 283.52,
    avgPrice: 210
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Bloodline',
    quality: 'Factory New',
    marketPrice: 490,
    avgPrice: 300
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorpion',
    quality: 'Battle-Scarred',
    marketPrice: 267.3,
    avgPrice: 158
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorpion',
    quality: 'Well-Worn',
    marketPrice: 386.6,
    avgPrice: 193.6
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorpion',
    quality: 'Field-Tested',
    marketPrice: 415.1,
    avgPrice: 230.1
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorpion',
    quality: 'Minimal Wear',
    marketPrice: 482.99,
    avgPrice: 272.6
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Scorpion',
    quality: 'Factory New',
    marketPrice: 596.6,
    avgPrice: 397.6
}, { //Steach Case
    type: 'Glock-18',
    name: 'Candy Racer',
    quality: 'Well-Worn',
    marketPrice: 0.23,
    avgPrice: 0.23
}, {
    type: 'Glock-18',
    name: 'Candy Racer',
    quality: 'Field-Tested',
    marketPrice: 0.1,
    avgPrice: 0.1
}, {
    type: 'Glock-18',
    name: 'Candy Racer',
    quality: 'Minimal Wear',
    marketPrice: 0.7,
    avgPrice: 0.7
}, {
    type: 'Glock-18',
    name: 'Candy Racer',
    quality: 'Factory New',
    marketPrice: 2,
    avgPrice: 2
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Candy Racer',
    quality: 'Well-Worn',
    marketPrice: 1,
    avgPrice: 1
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Candy Racer',
    quality: 'Field-Tested',
    marketPrice: 1.79,
    avgPrice: 1.79
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Candy Racer',
    quality: 'Minimal Wear',
    marketPrice: 1.2,
    avgPrice: 1.2
}, {
    type: 'Glock-18',
    statTrak: true,
    name: 'Candy Racer',
    quality: 'Factory New',
    marketPrice: 4,
    avgPrice: 4
}, {
    type: 'AWP',
    name: 'Animal',
    quality: 'Field-Tested',
    marketPrice: 5,
    avgPrice: 5
}, {
    type: 'AWP',
    name: 'Animal',
    quality: 'Minimal Wear',
    marketPrice: 4,
    avgPrice: 4
}, {
    type: 'AWP',
    name: 'Animal',
    quality: 'Factory New',
    marketPrice: 12,
    avgPrice: 12
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Animal',
    quality: 'Field-Tested',
    marketPrice: 14,
    avgPrice: 14
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Animal',
    quality: 'Minimal Wear',
    marketPrice: 15,
    avgPrice: 15
}, {
    type: 'AWP',
    statTrak: true,
    name: 'Animal',
    quality: 'Factory New',
    marketPrice: 38,
    avgPrice: 38
}, {
    type: 'FAMAS',
    name: 'Stinger',
    quality: 'Battle-Scarred',
    marketPrice: 4,
    avgPrice: 4
}, {
    type: 'FAMAS',
    name: 'Stinger',
    quality: 'Well-Worn',
    marketPrice: 2,
    avgPrice: 2
}, {
    type: 'FAMAS',
    name: 'Stinger',
    quality: 'Field-Tested',
    marketPrice: 3,
    avgPrice: 3
}, {
    type: 'FAMAS',
    name: 'Stinger',
    quality: 'Minimal Wear',
    marketPrice: 7,
    avgPrice: 7
}, {
    type: 'FAMAS',
    name: 'Stinger',
    quality: 'Factory New',
    marketPrice: 6,
    avgPrice: 6
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Stinger',
    quality: 'Battle-Scarred',
    marketPrice: 9,
    avgPrice: 9
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Stinger',
    quality: 'Well-Worn',
    marketPrice: 5,
    avgPrice: 5
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Stinger',
    quality: 'Field-Tested',
    marketPrice: 2,
    avgPrice: 2
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Stinger',
    quality: 'Minimal Wear',
    marketPrice: 13,
    avgPrice: 13
}, {
    type: 'FAMAS',
    statTrak: true,
    name: 'Stinger',
    quality: 'Factory New',
    marketPrice: 29,
    avgPrice: 26
}, {
    type: 'UMP-45',
    name: 'AGGRESSOR',
    quality: 'Battle-Scarred',
    marketPrice: 2,
    avgPrice: 2
}, {
    type: 'UMP-45',
    name: 'AGGRESSOR',
    quality: 'Well-Worn',
    marketPrice: 1.5,
    avgPrice: 1.5
}, {
    type: 'UMP-45',
    name: 'AGGRESSOR',
    quality: 'Field-Tested',
    marketPrice: 1,
    avgPrice: 1
}, {
    type: 'UMP-45',
    name: 'AGGRESSOR',
    quality: 'Minimal Wear',
    marketPrice: 3,
    avgPrice: 3
}, {
    type: 'UMP-45',
    name: 'AGGRESSOR',
    quality: 'Factory New',
    marketPrice: 5,
    avgPrice: 5
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'AGGRESSOR',
    quality: 'Battle-Scarred',
    marketPrice: 4,
    avgPrice: 4
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'AGGRESSOR',
    quality: 'Well-Worn',
    marketPrice: 3.94,
    avgPrice: 3.94
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'AGGRESSOR',
    quality: 'Field-Tested',
    marketPrice: 4.3,
    avgPrice: 4.3
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'AGGRESSOR',
    quality: 'Minimal Wear',
    marketPrice: 6,
    avgPrice: 6
}, {
    type: 'UMP-45',
    statTrak: true,
    name: 'AGGRESSOR',
    quality: 'Factory New',
    marketPrice: 10,
    avgPrice: 10
}, {
    type: 'USP-S',
    name: 'Banker',
    quality: 'Battle-Scarred',
    marketPrice: 0.47,
    avgPrice: 0.47
}, {
    type: 'USP-S',
    name: 'Banker',
    quality: 'Well-Worn',
    marketPrice: 1,
    avgPrice: 1
}, {
    type: 'USP-S',
    name: 'Banker',
    quality: 'Field-Tested',
    marketPrice: 0.2,
    avgPrice: 0.2
}, {
    type: 'USP-S',
    name: 'Banker',
    quality: 'Minimal Wear',
    marketPrice: 2,
    avgPrice: 2
}, {
    type: 'USP-S',
    name: 'Banker',
    quality: 'Factory New',
    marketPrice: 3,
    avgPrice: 3
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Banker',
    quality: 'Battle-Scarred',
    marketPrice: 1,
    avgPrice: 1
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Banker',
    quality: 'Well-Worn',
    marketPrice: 2,
    avgPrice: 2
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Banker',
    quality: 'Field-Tested',
    marketPrice: 1.1,
    avgPrice: 1.1
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Banker',
    quality: 'Minimal Wear',
    marketPrice: 3,
    avgPrice: 3
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Banker',
    quality: 'Factory New',
    marketPrice: 12,
    avgPrice: 12
}, {
    type: 'Desert Eagle',
    name: 'Crude',
    quality: 'Minimal Wear',
    marketPrice: 75,
    avgPrice: 75
}, {
    type: 'Desert Eagle',
    name: 'Crude',
    quality: 'Factory New',
    marketPrice: 77,
    avgPrice: 77
}, {
    type: 'M4A4',
    name: "Shark's Prey",
    quality: 'Battle-Scarred',
    marketPrice: 16,
    avgPrice: 16
}, {
    type: 'M4A4',
    name: "Shark's Prey",
    quality: 'Well-Worn',
    marketPrice: 15,
    avgPrice: 15
}, {
    type: 'M4A4',
    name: "Shark's Prey",
    quality: 'Field-Tested',
    marketPrice: 20,
    avgPrice: 20
}, {
    type: 'M4A4',
    name: "Shark's Prey",
    quality: 'Minimal Wear',
    marketPrice: 30,
    avgPrice: 30
}, {
    type: 'M4A4',
    name: "Shark's Prey",
    quality: 'Factory New',
    marketPrice: 45,
    avgPrice: 45
}, {
    type: 'M4A4',
    statTrak: true,
    name: "Shark's Prey",
    quality: 'Battle-Scarred',
    marketPrice: 28,
    avgPrice: 28
}, {
    type: 'M4A4',
    statTrak: true,
    name: "Shark's Prey",
    quality: 'Well-Worn',
    marketPrice: 36,
    avgPrice: 36
}, {
    type: 'M4A4',
    statTrak: true,
    name: "Shark's Prey",
    quality: 'Field-Tested',
    marketPrice: 48,
    avgPrice: 48
}, {
    type: 'M4A4',
    statTrak: true,
    name: "Shark's Prey",
    quality: 'Minimal Wear',
    marketPrice: 67,
    avgPrice: 67
}, {
    type: 'M4A4',
    statTrak: true,
    name: "Shark's Prey",
    quality: 'Factory New',
    marketPrice: 84,
    avgPrice: 45
}, {
    type: 'P90',
    name: 'Stone story',
    quality: 'Battle-Scarred',
    marketPrice: 4.07,
    avgPrice: 5.18
}, {
    type: 'P90',
    name: 'Stone story',
    quality: 'Well-Worn',
    marketPrice: 5.18,
    avgPrice: 1
}, {
    type: 'P90',
    name: 'Stone story',
    quality: 'Field-Tested',
    marketPrice: 4,
    avgPrice: 28
}, {
    type: 'P90',
    name: 'Stone story',
    quality: 'Minimal Wear',
    marketPrice: 8,
    avgPrice: 37
}, {
    type: 'P90',
    name: 'Stone story',
    quality: 'Factory New',
    marketPrice: 11,
    avgPrice: 45
}, {
    type: 'P90',
    statTrak: true,
    name: 'Stone story',
    quality: 'Battle-Scarred',
    marketPrice: 19,
    avgPrice: 28
}, {
    type: 'P90',
    statTrak: true,
    name: 'Stone story',
    quality: 'Well-Worn',
    marketPrice: 14.23,
    avgPrice: 36
}, {
    type: 'P90',
    statTrak: true,
    name: 'Stone story',
    quality: 'Field-Tested',
    marketPrice: 14.63,
    avgPrice: 48
}, {
    type: 'P90',
    statTrak: true,
    name: 'Stone story',
    quality: 'Minimal Wear',
    marketPrice: 23.7,
    avgPrice: 67
}, {
    type: 'P90',
    statTrak: true,
    name: 'Stone story',
    quality: 'Factory New',
    marketPrice: 44,
    avgPrice: 45
}, {
    type: 'USP-S',
    name: 'Apis',
    quality: 'Battle-Scarred',
    marketPrice: 34,
    avgPrice: 1
}, {
    type: 'USP-S',
    name: 'Apis',
    quality: 'Well-Worn',
    marketPrice: 54,
    avgPrice: 1
}, {
    type: 'USP-S',
    name: 'Apis',
    quality: 'Field-Tested',
    marketPrice: 76,
    avgPrice: 28
}, {
    type: 'USP-S',
    name: 'Apis',
    quality: 'Minimal Wear',
    marketPrice: 89,
    avgPrice: 37
}, {
    type: 'USP-S',
    name: 'Apis',
    quality: 'Factory New',
    marketPrice: 113,
    avgPrice: 45
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Apis',
    quality: 'Battle-Scarred',
    marketPrice: 45,
    avgPrice: 28
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Apis',
    quality: 'Well-Worn',
    marketPrice: 59,
    avgPrice: 36
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Apis',
    quality: 'Field-Tested',
    marketPrice: 84,
    avgPrice: 48
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Apis',
    quality: 'Minimal Wear',
    marketPrice: 107,
    avgPrice: 67
}, {
    type: 'USP-S',
    statTrak: true,
    name: 'Apis',
    quality: 'Factory New',
    marketPrice: 138,
    avgPrice: 45
}, {
    type: 'AK-47',
    name: 'Lawbreaker',
    quality: 'Battle-Scarred',
    marketPrice: 87,
    avgPrice: 1
}, {
    type: 'AK-47',
    name: 'Lawbreaker',
    quality: 'Well-Worn',
    marketPrice: 145,
    avgPrice: 1
}, {
    type: 'AK-47',
    name: 'Lawbreaker',
    quality: 'Field-Tested',
    marketPrice: 177,
    avgPrice: 28
}, {
    type: 'AK-47',
    name: 'Lawbreaker',
    quality: 'Minimal Wear',
    marketPrice: 230,
    avgPrice: 37
}, {
    type: 'AK-47',
    name: 'Lawbreaker',
    quality: 'Factory New',
    marketPrice: 228,
    avgPrice: 45
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Lawbreaker',
    quality: 'Battle-Scarred',
    marketPrice: 320,
    avgPrice: 28
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Lawbreaker',
    quality: 'Well-Worn',
    marketPrice: 430,
    avgPrice: 36
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Lawbreaker',
    quality: 'Field-Tested',
    marketPrice: 655,
    avgPrice: 48
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Lawbreaker',
    quality: 'Minimal Wear',
    marketPrice: 980,
    avgPrice: 67
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Lawbreaker',
    quality: 'Factory New',
    marketPrice: 670,
    avgPrice: 45
}, {    
    type: 'AK-47',
    name: 'Wolf Attack',
    quality: 'Battle-Scarred',
    marketPrice: 19,
    avgPrice: 1
}, {
    type: 'AK-47',
    name: 'Wolf Attack',
    quality: 'Well-Worn',
    marketPrice: 22,
    avgPrice: 1
}, {
    type: 'AK-47',
    name: 'Wolf Attack',
    quality: 'Field-Tested',
    marketPrice: 28,
    avgPrice: 28
}, {
    type: 'AK-47',
    name: 'Wolf Attack',
    quality: 'Minimal Wear',
    marketPrice: 37,
    avgPrice: 37
}, {
    type: 'AK-47',
    name: 'Wolf Attack',
    quality: 'Factory New',
    marketPrice: 73,
    avgPrice: 45
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wolf Attack',
    quality: 'Battle-Scarred',
    marketPrice: 34,
    avgPrice: 28
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wolf Attack',
    quality: 'Well-Worn',
    marketPrice: 53,
    avgPrice: 36
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wolf Attack',
    quality: 'Field-Tested',
    marketPrice: 74,
    avgPrice: 48
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wolf Attack',
    quality: 'Minimal Wear',
    marketPrice: 107,
    avgPrice: 67
}, {
    type: 'AK-47',
    statTrak: true,
    name: 'Wolf Attack',
    quality: 'Factory New',
    marketPrice: 207,
    avgPrice: 45
}, {
    type: 'M4A4',
    name: 'Howl (REMOVED)',
    quality: 'Field-Tested',
    marketPrice: 277,
    avgPrice: 28
}, {
    type: 'M4A4',
    name: 'Howl (REMOVED)',
    quality: 'Minimal Wear',
    marketPrice: 357,
    avgPrice: 37
}, {
    type: 'M4A4',
    name: 'Howl (REMOVED)',
    quality: 'Factory New',
    marketPrice: 415,
    avgPrice: 45
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Howl (REMOVED)',
    quality: 'Field-Tested',
    marketPrice: 475,
    avgPrice: 48
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Howl (REMOVED)',
    quality: 'Minimal Wear',
    marketPrice: 550,
    avgPrice: 67
}, {
    type: 'M4A4',
    statTrak: true,
    name: 'Howl (REMOVED)',
    quality: 'Factory New',
    marketPrice: 650,
    avgPrice: 45
}, {
    type: 'Karambit',
    name: 'Cosplay',
    quality: 'Battle-Scarred',
    marketPrice: 100,
    avgPrice: 1
}, {
    type: 'Karambit',
    name: 'Cosplay',
    quality: 'Well-Worn',
    marketPrice: 130,
    avgPrice: 1
}, {
    type: 'Karambit',
    name: 'Cosplay',
    quality: 'Field-Tested',
    marketPrice: 200,
    avgPrice: 28
}, {
    type: 'Karambit',
    name: 'Cosplay',
    quality: 'Minimal Wear',
    marketPrice: 350,
    avgPrice: 37
}, {
    type: 'Karambit',
    name: 'Cosplay',
    quality: 'Factory New',
    marketPrice: 600,
    avgPrice: 45
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Cosplay',
    quality: 'Battle-Scarred',
    marketPrice: 243,
    avgPrice: 28
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Cosplay',
    quality: 'Well-Worn',
    marketPrice: 311,
    avgPrice: 36
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Cosplay',
    quality: 'Field-Tested',
    marketPrice: 470,
    avgPrice: 48
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Cosplay',
    quality: 'Minimal Wear',
    marketPrice: 620,
    avgPrice: 67
}, {
    type: 'Karambit',
    statTrak: true,
    name: 'Cosplay',
    quality: 'Factory New',
    marketPrice: 933,
    avgPrice: 45
}, {
    type: 'M9 Bayonet',
    name: 'RedBlade',
    quality: 'Battle-Scarred',
    marketPrice: 135,
    avgPrice: 1
}, {
    type: 'M9 Bayonet',
    name: 'RedBlade',
    quality: 'Well-Worn',
    marketPrice: 185,
    avgPrice: 1
}, {
    type: 'M9 Bayonet',
    name: 'RedBlade',
    quality: 'Field-Tested',
    marketPrice: 299,
    avgPrice: 28
}, {
    type: 'M9 Bayonet',
    name: 'RedBlade',
    quality: 'Minimal Wear',
    marketPrice: 477,
    avgPrice: 37
}, {
    type: 'M9 Bayonet',
    name: 'RedBlade',
    quality: 'Factory New',
    marketPrice: 607,
    avgPrice: 45
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'RedBlade',
    quality: 'Battle-Scarred',
    marketPrice: 204,
    avgPrice: 28
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'RedBlade',
    quality: 'Well-Worn',
    marketPrice: 332,
    avgPrice: 36
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'RedBlade',
    quality: 'Field-Tested',
    marketPrice: 575,
    avgPrice: 48
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'RedBlade',
    quality: 'Minimal Wear',
    marketPrice: 602,
    avgPrice: 67
}, {
    type: 'M9 Bayonet',
    statTrak: true,
    name: 'RedBlade',
    quality: 'Factory New',
    marketPrice: 725,
    avgPrice: 45
}, ]
