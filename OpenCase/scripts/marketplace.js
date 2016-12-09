
var Sales = [],
    weaponsOnSale = 6,
    minPriceForSale = 15,
    discount = 15;

$(function() {
    $("#buy_count").change(function() {
        var count = $("#buy_count").val();
        count = count == "" ? "1" : count;
        count = parseInt(count.match(/(\d+)/g).toString().replace(/\,/g, ''));
        count = count <= 0 ? 1 : count > 100 ? 100 : count;
        $("#buy_count").val(count);
        var newPrice = $("#weaponPrice").text();
        newPrice = isNaN(parseInt(newPrice[0])) ? newPrice.substr(1, newPrice.length - 1) : newPrice;
        newPrice = parseFloat(newPrice) * 100 * count;
        $("#buy-double").html(newPrice.toFixed(0));
    });
});

$(document).ready(function() {
    $('.navigationBar').append('<span id="playerBalance">' + Player.doubleBalance + ' <i class="double-icon"></i></span>');

    var autocompleteTags = [];
    for (var i = 0; i < cases.length; i++)
        for (var z = 0; z < cases[i].weapons.length; z++) {
            var tp = cases[i].weapons[z].type;
            var name = getSkinName(cases[i].weapons[z].skinName, Settings.language);
			var canBuy = typeof cases[i].weapons[z].canBuy == 'undefined' ? true : cases[i].weapons[z].canBuy;
            if ($.inArray(tp + ' | ' + name, autocompleteTags) == -1 && canBuy) autocompleteTags.push(tp + ' | ' + name);
        }

    $("#search_text").autocomplete({
        source: autocompleteTags
    })

    var lastSalesUpdate = getStatistic('lastSalesUpdate', 0);
    var now = new Date();
    if (lastSalesUpdate == '0')
        lastSalesUpdate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    else
        lastSalesUpdate = new Date(lastSalesUpdate);

    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (parseInt(getStatistic("market-sales-count")) == 0 || lastSalesUpdate < today) {
        for (var i = 0; i < weaponsOnSale; i++) {
            var weapon = getRandomWeapon(1);
            var canBuy = typeof weapon.canBuy == 'undefined' ? true : weapon.canBuy;
            weapon.statTrak = ifStatTrak(weapon.type, weapon.name);
            weapon.quality = getItemQuality()[Settings.language == 'RU' ? 1 : 0];
            weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
            weapon.price = parseFloat(weapon.price * (100 - discount) / 100).toFixed(2);
            if (weapon.price > minPriceForSale && canBuy)
                Sales.push(weapon);
            else
                i--;
        }
    } else {
        for (var i = 0; i < parseInt(getStatistic("market-sales-count")); i++) {
            Sales.push(JSON.parse(getStatistic("market-sales-weapon-" + i)));
        }
    }

    if (Sales.length) {
        var SalesHTML = "";
        for (var i = 0; i < Sales.length; i++) {
            SalesHTML += "<div class='sales-weapon animated zoomIn " + (Sales[i].soldOut ? "sold-out" : "") + "' data-weapon-info-json='" + JSON.stringify(Sales[i]) + "' data-sales-id='" + i + "'><span class='sales-discount'>" + discount + "%</span><img src='" + getImgUrl(Sales[i].img, 1) + "'><span class='sales-weapon-name'>" + Sales[i].type + " | " + getSkinName(Sales[i].skinName, Settings.language) + "</span><div class='prices'><span class='prices_old-price'>$" + (Sales[i].price * (100 + discount) / 100).toFixed(2) + "</span> <span class='prices_new-price'>$" + Sales[i].price + "</span></div></div>";
            saveStatistic("market-sales-weapon-" + i, JSON.stringify(Sales[i]));
        }
        saveStatistic("lastSalesUpdate", '' + today);
        saveStatistic("market-sales-count", '' + Sales.length);
        $(".sales").html(SalesHTML);
    }
});

$(document).on('click', '.item, .sales-weapon', function() {
    if ($(this).hasClass('sold-out')) return false;
    var saleId = -1;
    if (typeof $(this).data('weapon-info-json') != 'undefined') var weapon = $(this).data("weapon-info-json");
    if (typeof $(this).data('sales-id') != 'undefined') saleId = $(this).data("sales-id");

    if (weapon) {
        var name = weapon.skinName;
        var type = weapon.type;
        var img = weapon.img;
        var price = '' + weapon.price;
        var statTrak = weapon.statTrak;
        var quality = weapon.quality;
    } else {
        var name = $(this).data("name");
        var type = $(this).data("type");
        var img = $(this).data("img");
        var price = $($(this).children('.item__price')[0]).text();
        var statTrak = $(this).data("stattrak");
        var quality = $(this).data("quality");
    }
    if (price == '0$' || price == '$0') {
        $(this).addClass('animated flipOutX');

        setTimeout($.proxy(function() {
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
    if (saleId != -1)
        $("#weaponInfoContainer").data('sales-id', saleId);
    else
        $("#weaponInfoContainer").data('sales-id', "-1");

    $("#weaponInfoContainer").css("display", "block");
    $("#weaponImg").attr("src", getImgUrl(img, 1));
    $("#weaponName").html(st + type + " | " + getSkinName(name, Settings.language));
    $("#weaponPrice").html(price);
    $("#weaponQuality").html(quality);

    if (typeof price == 'string') {
        if (isNaN(parseFloat(price)))
            price = parseFloat(price.substr(1));
    }

    $("#buy_count").val(1);
    $('#buy-double').html((parseFloat(price) * 100).toFixed(0));
});

//var rowID = client.saveWeapon(weapon.type, weapon.skinName, weapon.img, weapon.quality, weapon.statTrak, weapon.rarity, weapon.price, weapon.new);

$(document).on('click', ".countChange", function() {
    var count = parseInt($("#buy_count").val());
    switch (this.id) {
        case 'plus':
            count++;
            break
        case 'minus':
            count--;
            break
    }
    count = count < 1 ? 1 : count > 100 ? 100 : count;
    $("#buy_count").val(count);
    $("#buy_count").trigger("change");
})

$(document).on('click', '#buy-double', function() {
    var rarity = getWeaponRarity($("#weaponInfoContainer").data('type'), $("#weaponInfoContainer").data('name'));
    var price = parseInt($("#buy-double").text());
    var count = parseInt($("#buy_count").val());
    var weapon = {
        type: $("#weaponInfoContainer").data('type'),
        skinName: $("#weaponInfoContainer").data('name'),
        img: $("#weaponInfoContainer").data('img'),
        quality: $("#weaponQuality").text(),
        statTrak: $("#weaponInfoContainer").data('stattrak'),
        rarity: rarity,
        price: parseFloat($("#weaponInfoContainer").data('price').replace(/\$/, '')),
        'new': true,
    }
    if (Player.doubleBalance < price) {
        $('#weaponPrice').addClass('animated flash');
        setTimeout(function() {
            $('#weaponPrice').removeClass('animated flash')
        }, 1000);
        return false;
    }
    if (isAndroid()) {
        for (var i = 0; i < count; i++)
            saveWeapon(weapon);
    } else {
        for (var i = 0; i < count; i++)
            inventory.push(weapon);
        saveInventory();
    }
    var saleId = parseInt($("#weaponInfoContainer").data('sales-id'));
    var soldOut = false;
    if (saleId != -1) {
        var wp = JSON.parse(getStatistic("market-sales-weapon-" + saleId));
        wp.soldOut = true;
        saveStatistic("market-sales-weapon-" + saleId, JSON.stringify(wp));
        soldOut = true;
    }
    Sound("buy", "play");
    Player.doubleBalance -= parseInt((price).toFixed(0));
    saveStatistic('doubleBalance', Player.doubleBalance);
    $("#playerBalance").html(Player.doubleBalance + ' <i class="double-icon"></i>');

    $("#buy-double").prop('disabled', true);
    $(".buy-animation").addClass("buy-animation-show", 500, hideBuyCheck);

    if (soldOut) {
        setTimeout(function() {
            $("#weaponInfoContainer").css('display', 'none');
            $("div[data-sales-id='" + saleId + "']").addClass("sold-out");
        }, 500);
    }

    checkInventoryForNotification();
});

function hideBuyCheck() {
    $(".buy-animation").addClass('animated zoomOut');
    setTimeout(function() {
        $(".buy-animation").removeClass("buy-animation-show");
        $(".buy-animation").removeClass("animated");
        $(".buy-animation").removeClass("zoomOut");
        $("#buy-double").prop('disabled', false);
    }, 800);
}

$(document).on('click', '#search_button', function() {
    if ($("#search_text").val().length);
    search($("#search_text").val());
})

function search(searchStr) {
    var info = [];
    if (searchStr.indexOf(' | ') != -1) {
        var wp = searchStr.split(' | ');
        if (wp[0] == "P2000" && wp[1] == "Лабиринт") wp[1] = "Pathfinder"
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
    $(".sales").css('display', 'none');
    var items = "";
    for (var i = 0; i < info.length; i++) {
        var st = info[i].statTrak == true ? 'StatTrak™ ' : '';
        var extraStyle = "regular";
        extraStyle = info[i].statTrak == true ? 'statTrak' : extraStyle;
        extraStyle = info[i].type.indexOf('★') != -1 ? 'knive' : extraStyle;
        extraStyle = info[i].type.match(/(?:Сувенир|Souvenir)/) != null ? 'souvenir' : extraStyle;

        var data = "data-type='" + info[i].type + "' data-name=\"" + info[i].skinName + "\" data-quality='" + info[i].quality + "' data-statTrak='" + info[i].statTrak + "' data-price='" + info[i].price + "' data-img='" + info[i].img + "'";

        items += "<tr class='item' " + data + "><td><img src='" + getImgUrl(info[i].img) + "' class='" + extraStyle + "_border'></td><td class='item__name-group " + extraStyle + "_color'><span class='item__type'>" + st + info[i].type + "</span> | <span class='item__name'>" + info[i].skinName + "</span> (<span class='item__quality'>" + info[i].quality + "</span>)</td><td class='item__price' data-price-for='" + st + info[i].type + ' | ' + info[i].skinName + " (" + info[i].quality + ")'>$" + info[i].price + "</td></tr>";
    }
    $('#search_result').addClass("animated fadeInDown");
    setTimeout(function() {
        $('#search_result').removeClass("animated fadeInDown");
    }, 1000);
    $('#search_result').html(items);
}

$(document).on("click", ".glassBlur, .fullWeaponInfo-close", function() {
    $("#weaponInfoContainer").css("display", "none");
})

function getAllWeaponInfo(type, name, loadPrices) {
    loadPrices = loadPrices || false;
    var info = [];
    var canBeStatTrak = false,
        canBeSouvenir = false,
        souvenir = false,
        statTrak = false,
        count = 2;
    var collect = getCollection(type, getSkinName(name))
    count = collect.type == 'Collection' ? 1 : count;
    if (typeof collect.canBeSouvenir != 'undefined' && collect.canBeSouvenir) {
        canBeSouvenir = true;
        count = 2;
    }

    var img = getWeaponImg(type, name);
    for (var z = 0; z < count; z++) {
        for (var i = 0; i < Quality.length; i++) {
            var quality = Settings.language == 'RUS' ? Quality[i].name[1] : Quality[i].name[0]
            var pr = getPriceIfExists((souvenir ? 'Souvenir ' + type : type), name, quality, statTrak);
            if (!pr) {
                var selector = '[data-price-for="' + (statTrak ? 'StatTrak™ ' : '') + (souvenir ? 'Souvenir ' : '') + type + ' | ' + name + " (" + quality + ')"]';
                getMarketPrice((souvenir ? 'Souvenir ' + type : type), name, quality, statTrak, selector, false);
            }
            if (pr || loadPrices)
                info.push({
                    'type': (souvenir ? 'Souvenir ' + type : type),
                    'skinName': name,
                    'quality': getQualityName(quality, Settings.language),
                    'statTrak': statTrak,
                    'price': pr,
                    'img': img
                });

        }
        if (!canBeSouvenir)
            statTrak = true;
        else if (canBeSouvenir)
            souvenir = true;
    }
    return info
}
