var Player = {
	"nickname" : "Player", 
	"avatar" : "24.jpg"
}
var Settings = {
	"language" : "RU"
}

if (typeof $.cookie("playerNickname") != "undefined")
	Player.nickname = $.cookie("playerNickname")

if (typeof $.cookie("playerAvatar") != "undefined")
	Player.avatar = $.cookie("playerAvatar")