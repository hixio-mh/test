module.exports = {
    giveRandomKnive: function() {
        for (var i = 0; i < cases.length; i++) {
            if (cases[i].name == "Knife Case") {
                var weapon = cases[i].weapons[Math.rand(0, cases[i].weapons.length - 1)];
                break;
            }
        }
        weapon.statTrak = false;
        weapon.quality = getItemQuality()[0];
        weapon['new'] = true;
        weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
        if (weapon.price == 0) {
            spinking.results.giveRandomKnive();
            return false;
        }
        inventory.push(weapon);
        if (isAndroid())
            saveWeapon(weapon);
        else
            saveInventory();
        Lobibox.alert("success", {
            title: "Random Knife",
            iconSource: 'fontAwesome',
            msg: `${weapon.type} | ${getSkinName(weapon.skinName, Settings.language)} (${weapon.quality})`
        });
        checkInventoryForNotification();
    },
    randomItem: function(count, rarity) {
        rarity = rarity || "all";
        count = count || 1;
        var msg = "";
        for (var i = 0; i < count; i++) {
            var weapon = spinking.getRandomWeapon();
            weapon.statTrak = false;
            weapon.quality = getItemQuality()[0];
            weapon['new'] = true;
            weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
            if (weapon.price == 0 || weapon.type.indexOf("★") != -1) {
                i--;
                continue;
            }
            if (rarity != "all" && weapon.rarity != rarity) {
                i--;
                continue;
            }
            msg += `${weapon.type} | ${getSkinName(weapon.skinName, Settings.language)} (${weapon.quality})<br>`;
            inventory.push(weapon);
            if (isAndroid())
                saveWeapon(weapon);
        }
        if (!isAndroid())
            saveInventory();
        Lobibox.alert("success", {
            title: "Random Weapon",
            iconSource: 'fontAwesome',
            msg: msg
        });
        checkInventoryForNotification();
    },
    returnBet: function(multy) {
        multy = multy || 1;
        Player.doubleBalance += parseInt(spinking.getBet() * multy);
        $('#balance').text(Player.doubleBalance);
        saveStatistic('doubleBalance', Player.doubleBalance, 'Number');
    },
    weapon: function(type, skinName, collection) {
        for (var i = 0; i < cases.length; i++) {
            if (cases[i].name == collection) {
                for (var z = 0; z < cases[i].weapons.length; z++)
                    if (cases[i].weapons[z].type == type && getSkinName(cases[i].weapons[z].skinName) == getSkinName(skinName)) {
                        var weapon = cases[i].weapons[z];
                        break;
                    }
            }
        }
        if (typeof weapon == 'undefined')
            spinking.results.retry();

        weapon.statTrak = false;
        weapon.quality = getItemQuality()[0];
        weapon['new'] = true;
        weapon.price = getPrice(weapon.type, weapon.skinName, weapon.quality, weapon.statTrak);
        if (weapon.price == 0) {
            spinking.results.weapon(type, skinName, collection);
            return false;
        }
        var msg = `${weapon.type} | ${getSkinName(weapon.skinName, Settings.language)} (${weapon.quality})`;
        inventory.push(weapon);
        if (isAndroid())
            saveWeapon(weapon);
        else
            saveInventory();
        Lobibox.alert("success", {
            title: "Weapon",
            iconSource: 'fontAwesome',
            msg: msg
        });
        checkInventoryForNotification();
    },
    retry: function() {
        $(".casesCarusel").children(".weapon").addClass("animated fadeOutDown");
        $("#spin").prop("disabled", true);
        sleep(1000).then(() => {
            $(".casesCarusel").empty();
            spinking.newGame();
            spinking.spin();
        })
    },
};

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
exports.sleep = sleep;
