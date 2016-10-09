$(function() {
    /*$("#chat__new-message").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#chat__send-new-message").click();
        }
    });*/

    $("#chat__new-message").on('keydown paste', function(event) {
        if (event.keyCode == 13) {
            $("#chat__send-new-message").click();
            event.preventDefault();
        }
        if (this.innerHTML.length >= this.getAttribute("max") && event.keyCode != 8) {
            event.preventDefault();
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {
        // Once authenticated, instantiate Firechat with the logged in user
        if (firebase.auth().currentUser != null) {
            $("#login").hide();
            $("#chat").show();
        } else {
            $("#chat").hide();
            $("#login").show();
        }

    });

    $(document).on('click', '#login button', function() {
        $(".chat__messages").append('<li id="js-loading-inventory" data-from="1"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
        setTimeout(function() {
            initChat();
        }, 2000);
    });

    $(document).on('click', '.chat__message img', function() {
        var uid = $(this).data('userid');
        if (typeof uid == 'undefined') return false;
        window.location = 'profile.html?uid=' + uid;
    })
});


var chatRef = firebase.database().ref('globalChat');

chatRef.on('child_added', function(data) {
    if ($("li[data-msgkey='" + data.key + "']").length == 0) {
        newMsg(data.key, data.val().uid, data.val().img, data.val().username, data.val().time, data.val().text);
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 100);
    }
});

chatRef.on('child_removed', function(data) {
    removeMsg(data.key);
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
    username = XSSreplace(username);

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
    $(".chat__messages li").remove();
    return chatRef.once('value').then(function(snapshot) {
        messages = snapshot.val();
        for (key in messages) {
            newMsg(key, messages[key].uid, messages[key].img, messages[key].username, messages[key].time, messages[key].text);
        }
    });
}

$(document).on('click', '#chat__send-new-message', function() {
    var msg = $('#chat__new-message').text();
    if (msg.length == 0) return false;
    sendChatMessage(Player.nickname, msg, '../images/ava/' + Player.avatar);
    $('#chat__new-message').empty();
});
