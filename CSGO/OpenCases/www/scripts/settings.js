var Player = {
	"nickname" : "Player", 
	"avatar" : "24.jpg"
}
var Settings = {
	"language" : "EN"
}

if (typeof $.cookie("playerNickname") != "undefined")
	Player.nickname = $.cookie("playerNickname")

if (typeof $.cookie("playerAvatar") != "undefined")
	Player.avatar = $.cookie("playerAvatar")

if (typeof $.cookie("settings_language") != "undefined")
	Settings.language = $.cookie("settings_language")