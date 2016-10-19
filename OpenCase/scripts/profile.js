$(document).on('click', '#registerButton', function () {
    if ($(this).hasClass('empty')) {
        $('#nickname').show();
        $(this).removeClass('empty');
        $('#loginButton').hide();
        $('#nickname').val(Player.nickname);
    }
    else {
        var nick = $("#nickname").val();
        if (nick != "" && fbProfile.ifValidNickname(nick)) {
            saveStatistic("playerNickname", nick)
        }
        else {
            $("#login-status").text(Localization.settings2.notValidNickname[Settings.language]);
            return false;
        }
        fbProfile.register();
    }
});
var fbProfile = (function (module) {
    'use strict';
    module = module || {};
    module.register = function () {
        var email = $("#email").val() || "";
        var password = $("#password").val() || "";
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#login-status").text(error.message);
        })
        setTimeout(function () {
            if (firebase.auth().currentUser != null) {
                var ava = Player.avatar;
                if (/^\d+\.\w{3}$/.test(ava)) ava = "../images/ava/" + ava;
                firebase.auth().currentUser.updateProfile({
                    displayName: Player.nickname
                    , photoURL: ava
                }).then(function () {
                    var userRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
                    var userSettingsRef = userRef.child('settings');
                    userSettingsRef.child('language').set(Settings.language);
                    userSettingsRef.child('sounds').set(Settings.sounds);
                    userSettingsRef.child('drop').set(Settings.drop);
                    var privateRef = userRef.child('private');
                    privateRef.child('double').set(Player.doubleBalance);
                    var publicRef = userRef.child('public');
                    publicRef.child('points').set(Player.points);
                    publicRef.child('nickname').set(Player.nickname);
                    publicRef.child('avatar').set(ava);
                    var rateRef = userRef.child('outside');
                    rateRef.child('rep').set(0);
                    var inventoryRef = firebase.database().ref('inventories/' + firebase.auth().currentUser.uid);
                    inventoryRef.child('inventory_count').set(inventory.length);
                }, function (error) {
                    $("#login-status").text(error.message);
                });
            }
        }, 2000);
    }
    module.ifAuth = function () {
        return firebase.auth().currentUser != null;
    }
    module.ifValidNickname = function (nick) {
        if(nick == "") return false;
        var illicitNick = /((a|а|о|o)(d|д)(m|м)(i|\||и|n)(n|и|н))/ig;
        var validation = /^[a-zA-Zа-яёА-ЯЁ0-9_ -]+$/;
        if (validation.test(nick) && !illicitNick.test(nick)) return true;
        else return false;
    }
    module.ifValidImg = function(url) {
        if (url == '') return false
        var validation = /(^[a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif)$)/i;
        return validation.test(url);
        
    }
    module.forgotPassword = function (email) {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email).then(function () {
            $("#login-status").text("Email send.");
        }, function (error) {
            $("#login-status").text(error.message);
        })
    }
    module.showProfile = function (uid, callback) {
        var userInfoRef = firebase.database().ref('users/' + uid + '/public');
        userInfoRef.once('value').then(function (snapshot) {
            var userInfo = snapshot.val();
            callback(userInfo);
        })
        if (isAndroid()) client.sendToAnalytics('Profile', 'Show profile', "User open profile", 'none');
    }
    module.showRep = function (uid, callback) {
        var userInfoRef = firebase.database().ref('users/' + uid + '/outside/rep');
        userInfoRef.once('value').then(function (snapshot) {
            var userInfo = snapshot.val();
            callback(userInfo);
        })
    }
    module.repVal = function (uid, callback) {
        var repRef = firebase.database().ref('users/' + uid + '/outside/rep');
        repRef.once('value').then(function (snapshot) {
            var rep = 0;
            var userRep = '0';
            var userUid = firebase.auth().currentUser.uid;
            snapshot.forEach(function (childSnapshot) {
                if (childSnapshot.val() == '+') {
                    rep++;
                    if (childSnapshot.key == userUid) userRep = '+';
                }
                else if (childSnapshot.val() == '-') {
                    rep--;
                    if (childSnapshot.key == userUid) userRep = '-';
                }
            })
            if (isAndroid()) client.sendToAnalytics('Profile', 'Change rep', "User changed reputation", userRep);
            callback(rep, userRep);
        })
    }
    module.saveAuthToPhone = function() {
        try {
            var i = 0;
            for (var key in localStorage) {
                if (/^firebase/.test(key)) {
                    saveStatistic('firebase-key ' + i, '' + key);
                    saveStatistic('firebase-value ' + i, '' + localStorage[key]);
                    i++;
                }
            }
        } catch(e) {}
    }
    module.setRep = function (uid, uidFrom, val) {
        var repRef = firebase.database().ref('users/' + uid + '/outside/rep');
        repRef.child(uidFrom).set(val);
    }
    module.loadPosts = function (uid, callback) {
        var userPostsRef = firebase.database().ref('users/' + uid + '/posts');
        userPostsRef.once('value').then(function (snapshot) {
            var userPosts = snapshot.val();
            callback(userPosts);
        })
    }
    module.deletePost = function (uid, key) {
        var postRef = firebase.database().ref('users/' + uid + '/posts');
        postRef.child(key).remove();
    }
    module.login = function () {
        var email = $("#email").val() || "";
        var password = $("#password").val() || "";
        if (email == "" || password == "") {
            return false;
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                $("#login-status").text(error.message);
            });
        
        module.saveAuthToPhone();
    }
    module.XSSreplace = function (text) {
        text = text.replace(/&/g, '&amp;');
        text = text.replace(/</g, '&lt;');
        text = text.replace(/>/g, '&gt;');
        text = text.replace(/"/g, '&quot;');
        text = text.replace(/'/g, '&#x27;');
        text = text.replace(/\//g, '&#x2F;');
        return text;
    }
    return module;
}(fbProfile || {}))