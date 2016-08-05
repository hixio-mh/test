var Player = {
	"nickname" : "Player", 
	"avatar" : "24.jpg"
}
var Settings = {
	"language" : "EN",
	"sounds" : true,
	"drop" : false
}

if (typeof $.cookie("playerNickname") != "undefined")
	Player.nickname = $.cookie("playerNickname")
if (typeof $.cookie("playerAvatar") != "undefined" && $.cookie("playerAvatar") != "")
	Player.avatar = $.cookie("playerAvatar")
if (typeof $.cookie("settings_language") != "undefined")
	Settings.language = $.cookie("settings_language")
if (typeof $.cookie("settings_sounds") != "undefined")
	Settings.sounds = ($.cookie("settings_sounds") === 'true')
if (typeof $.cookie("settings_drop") != "undefined")
	Settings.drop = ($.cookie("settings_drop") === 'true')