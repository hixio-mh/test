var weapon_proto_FB = {
    item_id: 0,
    quality: 0,
    souvenir: false,
    stattrak: false
}
function Weapon_FB(item_id, quality, stattrak, souvenir) {
    if (item_id) this.item_id = item_id;
    if (quality) this.quality = quality;
    if (stattrak) this.stattrak = stattrak;
    if (souvenir) this.souvenir = souvenir;
    
    this.toLi = function() {
        var weapon = fbInventory.reverseConvert(this);
        var wp = "<img src=\"" + getImgUrl(weapon.img) + "\"><div class='weaponInfo " + weapon.rarity + "'><span class='type'>"+(this.stattrak == true ? "StatTrak™ " : "") + weapon.type + "<br>" + getSkinName(weapon.skinName, Settings.language) + "</span></div>";
        return wp;
    }
    
    this.__proto__ = weapon_proto_FB;
}

Weapon.prototype.toLi = function() {
    var weapon = fbInventory.reverseConvert(this);
    var wp = "<img src=\"" + getImgUrl(weapon.img) + "\"><div class='weaponInfo " + weapon.rarity + "'><span class='type'>"+(this.stattrak == true ? "StatTrak™ " : "") + weapon.type + "<br>" + getSkinName(weapon.skinName, Settings.language) + "</span></div>";
    return wp;
}

var fbInventory = (function (module) {
    'use strict';
    module = module || {};
    /*module.convertInventory = function (inventory) {
        var convertedInventory = [];
        for (var i = 0; i < inventory.length; i++) {
            if (/^(?:deagle)$/i.test(inventory[i].type)) inventory[i].type = inventory[i].type.replace(/(deagle)/i, 'Desert Eagle')
            convertedInventory[i] = {
                item_id: module.getWeaponId(inventory[i].type.replace(/(souvenir |сувенир )/i, ''), getSkinName(inventory[i].skinName))
                , custom_name: null
                , stickers: null
                , quality: getQualityNum(inventory[i].quality)
                , stattrak: inventory[i].statTrak
                , souvenir: /(souvenir|сувенир)/i.test(inventory[i].type)
            }
            if (typeof convertedInventory[i].item_id == 'undefined') convertedInventory[i].item_id = 0;
            if (typeof convertedInventory[i].stattrak == 'undefined') convertedInventory[i].stattrak = false;
            if (typeof convertedInventory[i].quality == 'undefined') convertedInventory[i].quality = 0;
        }
        return convertedInventory;
    };*/
    

    /*function getQualityNum(quality) {
        var num = 0;
        if (/(factory|прямо)/i.test(quality)) num = 4;
        else if (/(minimal|немного)/i.test(quality)) num = 3;
        else if (/(field|после)/i.test(quality)) num = 2;
        else if (/(Well|Поношенное)/.test(quality)) num = 1;
        return num;
    }*/
    module.setInventory = function (uid, inventory, callback) {
        callback = callback || false;
        try {
            if (typeof inventory == 'undefined' || inventory == null || inventory.length == 0) return false;
            var inventoryRef = firebase.database().ref('inventories/' + uid);
            inventoryRef.child('inventory_count').set(inventory.length);
            inventoryRef.child('weapons').set(inventory);
            if (callback) callback({
                success: true
            });
        }
        catch (e) {
            if (callback) callback({
                success: false
                , error: e
            });
        }
    };
    module.pushToInventory = function (uid, inventory, callback) {
        callback = callback || false;
        if (typeof inventory == 'undefined' || inventory == null || inventory.length == 0) return false;
        try {
            var inventoryRef = firebase.database().ref('inventories/' + uid + '/weapons');
            inventoryRef.limitToLast(1).once('value', function (lastItem) {
                    var startID = parseInt(Object.keys(lastItem.val())[0]) + 1;
                    if (isNaN(startID)) startID = 0;
                    for (var i = 0; i < inventory.length; i++) {
                        inventoryRef.child(startID).set(inventory[i]);
                        startID++;
                    }
                    module.getInventoryCount(uid, function (count) {
                        firebase.database().ref('inventories/' + uid).child('inventory_count').set(count + inventory.length);
                    })
                })
                //var inventoryRef = firebase.database().ref('inventories/'+uid);
                //inventoryRef.child('weapons').push(inventory);
        }
        catch (e) {
            if (callback) callback({
                success: false
                , error: e
            })
        }
    };
    module.getInventoryCount = function (uid, callback) {
        firebase.database().ref('inventories/' + uid + '/inventory_count').once('value', function (snapshot) {
            callback(snapshot.val());
        })
    }
    module.getFullInventory = function (uid, callback) {
        callback = callback || false;
        try {
            var inventory = [];
            var inventoryRef = firebase.database().ref('inventories/' + uid).once('value', function (snapshot) {
                callback(snapshot.val())
            });
        }
        catch (e) {
            callback({
                success: false
                , error: e
            })
        }
    };
    module.getWeaponById = function (id) {
        var wp = $.extend({}, weapons[id]);
        if (wp.id != id) {
            for (var i = 0; i < weapons.length; i++)
                if (weapons[i].id === id) {
                    wp = weapons[i];
                    break;
                }
        }
        return wp;
    };
    module.getWeaponId = function (type, name) {
        name = getSkinName(name).toLowerCase();
        for (var i = 0; i < weapons.length; i++) {
            if (weapons[i].type == type && weapons[i].skinName.toLowerCase() == name) {
                return weapons[i].id;
                break;
            }
        }
    };
    module.convertWeapon = function (weapon) {
        var testSouvenir = /^(souvenir |сувенир )/i;
        var convertedWeapon = {};
        convertedWeapon['stattrak'] = weapon.statTrak == true ? true : weapon.statTrak == 1 ? true : false;
        convertedWeapon['souvenir'] = convertedWeapon['stattrak'] == true ? false : testSouvenir.test(weapon.type) ? true : false;
        weapon.type = weapon.type.replace(testSouvenir, '');
        weapon.type = weapon.type.replace(/^(stattrak™ )/gi, '');
        convertedWeapon['item_id'] = module.getWeaponId(weapon.type, weapon.skinName);
        convertedWeapon['custom_name'] = null;
        convertedWeapon['stickers'] = null;
        convertedWeapon['quality'] = getQualityNum(weapon.quality);
        return convertedWeapon;
        
        if (typeof convertedWeapon.item_id == 'undefined') convertedWeapon.item_id = 0;
        if (typeof convertedWeapon.stattrak == 'undefined') convertedWeapon.stattrak = false;
        if (typeof convertedWeapon.quality == 'undefined') convertedWeapon.quality = 0;
    };
    module.checkForTradesWeapons = function() {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref('tradeList/'+uid).once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function() {
                    
                })
            })
        })
    }
    module.reverseConvert = function (weapon) {
        weapon.item_id = weapon.item_id || 0;
        var convertedWeapon = module.getWeaponById(weapon.item_id);
        weapon.quality = weapon.quality || 0;
        convertedWeapon.statTrak = weapon.stattrak || false;
        convertedWeapon.souvenir = weapon.souvenir || false;
        convertedWeapon.quality  = getQualityName(weapon.quality);
        if (weapon.souvenir) convertedWeapon.type = Localization.getString('other.souvenir')+' '+convertedWeapon.type;
        try {
            convertedWeapon.skinName = getSkinName(convertedWeapon.skinName, Settings.language);
            convertedWeapon.price = getPrice(convertedWeapon.type, convertedWeapon.skinName, convertedWeapon.quality, convertedWeapon.stattrek);
        } catch(e){}
        return convertedWeapon;
    }
    return module;
}(fbInventory || {}))