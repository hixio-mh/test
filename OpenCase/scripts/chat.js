$(function() {
    /*$("#chat__new-message").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#chat__send-new-message").click();
        }
    });*/

    $("#chat__new-message").on('keydown paste', function(event) {
        if (event.keyCode == 13) {
            $("#chat__send-new-message").click();
        }
        if (this.innerHTML.length >= this.getAttribute("max") && event.keyCode != 8) {
            event.preventDefault();
        }
    });
});

var config = {
    apiKey: "AIzaSyBnT4uYoOgs0Gl6F5_AtzY-q9hhM8z__E4",
    authDomain: "admob-app-id-8282025074.firebaseapp.com",
    databaseURL: "https://admob-app-id-8282025074.firebaseio.com",
    storageBucket: "admob-app-id-8282025074.appspot.com",
    messagingSenderId: "917984410977"
};
firebase.initializeApp(config);
var testObject = {};
var chatRef = firebase.database().ref('globalChat');

function register() {
    var email = $("#email").val() || "";
    var password = $("#password").val() || "";
    if (email == "" || password == "") {
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("Error! ", error.message);
    })
}

chatRef.on('child_added', function(data) {
    newMsg(data.key, data.val().uid, data.val().img, data.val().username, data.val().time, data.val().text);
    $("html, body").animate({
        scrollTop: $(document).height()
    }, 200);
});

chatRef.on('child_removed', function(data) {
    removeMsg(data.key);
});

function login() {
    var email = $("#email").val() || "";
    var password = $("#password").val() || "";
    if (email == "" || password == "") {
        return false;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("Error! ", error.message);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    // Once authenticated, instantiate Firechat with the logged in user
    if (firebase.auth().currentUser != null) {
        $("#login").hide();
        $("#chat").show();
        //$(".chat__messages li").remove();
        //initChat();
    } else {
        $("#chat").hide();
        $("#login").show();
    }

});

function sendChatMessage(userName, text, img) {
    var time = new Date();
    time = "" + time;
    var uid = firebase.auth().currentUser.uid;
    chatRef.push({
        username: userName,
        uid: uid,
        text: text,
        time: time,
        img: img
    }, function(err) {
        console.log(err);
    });
}

function newMsg(key, uid, img, username, time, text) {
    var time = new Date(time);
    time = time.toLocaleString((Settings.language == 'RU') ? 'ru' : 'en-US', {
        hour: 'numeric',
        minute: 'numeric'
    });
    var myMessage = false;

    if (uid == firebase.auth().currentUser.uid)
        myMessage = true;

    text = XSSreplace(text);

    var msg = "<li class='animated bounceIn chat__message" + (myMessage ? " my_message" : "") + "' data-msgkey='" + key + "'>" +
        "<img src='" + img + "' data-userID='" + uid + "'>" +
        "<div class='message__info'>" +
        "<div class='message__info__from-time'>" +
        "<span class='message__from'>" + username + "</span>" +
        "<span class='message__time'>" + time + "</span>" +
        "</div>" +
        "<span class='message__text'>" + text + "</span>" +
        "</div></li>";
    $(".chat__messages").append(msg);
}

function removeMsg(key) {
    $("li[data-msgkey='" + key + "']").removeClass('bounceIn');
    $("li[data-msgkey='" + key + "']").addClass('zoomOut');
    setTimeout(function() {
        $('.zoomOut').remove();
    }, 1000);
}

function initChat() {
    return chatRef.once('value').then(function(snapshot) {
        messages = snapshot.val();
        for (key in messages) {
            newMsg(messages[key].uid, messages[key].img, messages[key].username, messages[key].time, messages[key].text);
        }
    });
}

function XSSreplace(text) {
    text = text.replace(/&/g, '&amp;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/>/g, '&gt;');
    text = text.replace(/"/g, '&quot;');
    text = text.replace(/'/g, '&#x27;');
    text = text.replace(/\//g, '&#x2F;');

    return text;
}

$(document).on('click', '#chat__send-new-message', function() {
    var msg = $('#chat__new-message').text();
    sendChatMessage(Player.nickname, msg, '../images/ava/' + Player.avatar);
    $('#chat__new-message').val('');
});
