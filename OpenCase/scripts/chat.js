$(function () {
    $("#chat__new-message").on('keydown paste', function (event) {
        if (event.keyCode == 13) {
            $("#chat__send-new-message").click();
            event.preventDefault();
        }
        if (this.innerHTML.length >= this.getAttribute("max") && event.keyCode != 8) {
            event.preventDefault();
        }
    });
    
    var goToChat = false;
    
    if (/chat-\w{2}$/.test(history.state)) {
        var goToChat = history.state.match(/chat-(\w{2})/)[1];
    } else {
        history.replaceState("chat-rooms", null, null);
    }
    
    var rooms = "";
    for (var i = 0; i < fbChat.rooms.length; i++) {
        rooms += "<div class='chat__rooms__room" + (Settings.language == fbChat.rooms[i].code ? ' playerLang' : '') + "' data-room=\"" + fbChat.rooms[i].code + "\">";
        rooms += "<img src=\"../images/flags/" + fbChat.rooms[i].flag + "\"><span>" + fbChat.rooms[i].name + "</span></div>";
    }
    $('.chat__rooms').html(rooms);
    firebase.auth().onAuthStateChanged(function (user) {
        // Once authenticated, instantiate Firechat with the logged in user
        if (firebase.auth().currentUser != null && !goToChat) {
            $("#login").hide();
            $("#chat").hide();
            $(".chat__rooms").show();
        } else if (firebase.auth().currentUser != null && goToChat != false) {
            fbChat.setChatRef(goToChat);
            $("#login").hide();
            $("#chat").show();
            $(".chat__rooms").hide();
            fbChat.initChat('.chat__messages');
        } else {
            $("#chat").hide();
            $(".chat__rooms").hide();
            $("#login").show();
        }
    });
    
    $(document).on('click', '.chat__rooms__room', function () {
        fbChat.setChatRef($(this).data('room'));
        $("#login").hide();
        $("#chat").show();
        $(".chat__rooms").hide();
        fbChat.initChat('.chat__messages');
        history.pushState('chat-'+$(this).data('room'), "Chat Room", 'chat.html?room='+$(this).data('room'))
    })
    $(document).on('click', '#login button', function () {
        $(".chat__messages").append('<li id="js-loading-inventory" data-from="1"><div class="cssload-container"><div class="cssload-speeding-wheel"></div></div></li>');
        setTimeout(function () {
            fbChat.initChat('.chat__messages');
        }, 2000);
    });
    $(document).on('click', '.chat__message img', function () {
        var uid = $(this).data('userid');
        if (typeof uid == 'undefined') return false;
        window.location = 'profile.html?uid=' + uid;
    })
    
    $(document).on('click', '#forgot-pass',function() {
        forgotPassword($("#email").val());
    })
});

window.addEventListener('popstate', function(e) {
    var prev = e.state;
    if (prev == 'chat-rooms') {
        $("#login").hide();
        $("#chat").hide();
        $(".chat__rooms").show();
    } else if (/chat-\w{2}/.test(prev)) {
        var room = prev.match(/chat-(\w{2})/)[1];
        fbChat.setChatRef($(this).data('room'));
        $("#login").hide();
        $("#chat").show();
        $(".chat__rooms").hide();
        fbChat.initChat('.chat__messages');
    }
}, false);
var fbChat = (function (module) {
    module.chatRef = '';
    module.chatRoomsRef = firebase.database().ref('chatRooms');
    module.rooms = [
        {
            name: "Русский"
            , flag: 'RU.svg'
            , code: 'RU'
        , }, {
            name: 'Polski'
            , flag: 'PL.svg'
            , code: 'PL'
        , }, {
            name: 'English'
            , flag: 'EN.svg'
            , code: 'EN'
        , }, {
            name: 'Deutsch'
            , flag: 'DE.svg'
            , code: 'DE'
        , }, {
            name: 'Français'
            , flag: 'FR.svg'
            , code: 'FR'
        , }
    ];
    module.setChatRef = function(ref) {
        module.chatRef = firebase.database().ref('chat/'+ref);
    }
    module.sendMsg = function (userName, text, img) {
        var time = new Date();
        time = "" + time;
        var uid = firebase.auth().currentUser.uid;
        fbChat.chatRef.push({
            username: userName
            , uid: uid
            , text: text
            , time: time
            , img: img
            , timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
    module.initChat = function (selector) {
        var newItems = false;
        $(selector + " li").remove();
        if (module.chatRef == '') return;
        module.chatRef.limitToLast(1).on('child_added', function (data) {
            if (!newItems) return;
            if ($("li[data-msgkey='" + data.key + "']").length == 0) {
                newMsg(data.key, data.val().uid, data.val().img, data.val().username, data.val().time, data.val().text);
                $("html, body").animate({
                    scrollTop: $(document).height()
                }, 200);
            }
        });
        
        module.chatRef.limitToLast(20).once('value').then(function (snapshot) {
            newItems = true;
            messages = snapshot.val();
            for (key in messages) {
                newMsg(key, messages[key].uid, messages[key].img, messages[key].username, messages[key].time, messages[key].text);
            }
            $("html, body").animate({
                    scrollTop: $(document).height()
            }, 500);
        })
        
        module.chatRef.on('child_removed', function (data) {
            removeMsg(data.key);
        });
    }
    return module;
}(fbChat || {}));

function newMsg(key, uid, img, username, time, text) {
    var time = new Date(time);
    time = time.toLocaleString((Settings.language == 'RU') ? 'ru' : 'en-US', {
        hour: 'numeric'
        , minute: 'numeric'
    });
    var myMessage = false;
    if (uid == firebase.auth().currentUser.uid) myMessage = true;
    text = fbProfile.XSSreplace(text);
    username = fbProfile.XSSreplace(username);
    var msg = "<li class='animated bounceIn chat__message" + (myMessage ? " my_message" : "") + "' data-msgkey='" + key + "'>" + "<img src='" + img + "' data-userID='" + uid + "'>" + "<div class='message__info'>" + "<div class='message__info__from-time'>" + "<span class='message__from'>" + username + "</span>" + "<span class='message__time'>" + time + "</span>" + "</div>" + "<span class='message__text'>" + text + "</span>" + "</div></li>";
    $(".chat__messages").append(msg);
}

function removeMsg(key) {
    try {
        $("li[data-msgkey='" + key + "']").removeClass('bounceIn');
        $("li[data-msgkey='" + key + "']").addClass('zoomOut');
        setTimeout(function () {
            $('.zoomOut').remove();
        }, 1000);
    }
    catch (e) {}
}
$(document).on('click', '#chat__send-new-message', function () {
    var msg = $('#chat__new-message').text();
    if (msg.length == 0) return false;
    fbChat.sendMsg(Player.nickname, msg, '../images/ava/' + Player.avatar);
    $('#chat__new-message').empty();
});