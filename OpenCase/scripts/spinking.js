var Spins = [{
		"name" : {
			"RU" : "N0thing",
			"EN" : "N0thing"
		},
		"description" : {
			"RU" : "Бывает, попробуй еще",
			"EN" : "Try again"
		},
		"img": "nothing.png",
		"rarity" : "industrial",
		"weight" : 7
	}, {
		"name" : {
			"RU" : "Повтор",
			"EN" : "Re-spin"
		},
		"description" : {
			"RU" : "Давай еще раз",
			"EN" : "One more time"
		},
		"img": "respin.png",
		"rarity" : "milspec",
		"code" : "startSpin()",
		"weight" : 6
	}, {
		"name" : {
			"RU" : "Comeback",
			"EN" : "Comeback"
		},
		"description" : {
			"RU" : "Возвращение ставки",
			"EN" : "Return your bet"
		},
		"img": "comeback.png",
		"imgStyles": "height: 90%;margin-top:3px;",
		"rarity" : "milspec",
		"code" : "",
		"weight" : 6
	}, {
		"name" : {
			"RU" : "Тройная удача",
			"EN" : "Triple kill"
		},
		"description" : {
			"RU" : "Ваша ставка x3",
			"EN" : "Return your bet x3"
		},
		"img": "betMultiply.png",
		"imgStyles": "height: 80%;margin-top:5px;",
		"xCounter": 3,
		"rarity" : "milspec",
		"code" : "",
		"weight" : 6
	}, {
		"name" : {
			"RU" : "НОЖ!!!",
			"EN" : "KNIFE!!!"
		},
		"description" : {
			"RU" : "Случайный нож!",
			"EN" : "Random knife!"
		},
		"img": "knife.png",
		"rarity" : "rare",
		"code" : "",
		"weight" : 1
	},
]
$(function() {
	fillItems();
})

function fillCarusel() {

}

function fillItems() {
	var allItems = "";
	for (var i = 0; i < Spins.length; i++) {
		allItems += "<li class='weapon spinking bg-"+Spins[i].rarity+"'><div class='img-holder'><img src='../images/spinking/"+Spins[i].img+"' " + (typeof Spins[i].imgStyles != "undefined" ? "style='"+Spins[i].imgStyles+"'" : "")+"></div>"+(typeof Spins[i].xCounter != "undefined" ?
		"<span class='xCounter'>x"+Spins[i].xCounter+"</span>" : "")+
		"<div class='weaponInfo'><span class='spinking-item-name'>"+Spins[i].name[Settings.language]+"</span><span class='spinking-item-descr'>"+Spins[i].description[Settings.language]+"</span></div></li>";
	}
	$(".winList").html(allItems);
}
