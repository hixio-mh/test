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
    randomItem: function(count) {
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
            msg += `${weapon.type} | ${getSkinName(weapon.skinName, Settings.language)} (${weapon.quality})<br>`
            inventory.push(weapon);
            if (isAndroid())
                saveWeapon(weapon);
        }
        if (!isAndroid())
            saveInventory();
        Lobibox.alert("success", {
            title: "Random Knife",
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
