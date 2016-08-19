
// ===== PROGRAM SETTINGS =====
var DAILY_REWARD_POINTS = 5,
	OPEN_CASE_REWARD_POINTS = 1,
	GAME_WIN_REWARD_POINTS = 2;

// ===== PLAYER SETTINGS =====
var Player = {
	"nickname" : "Player", 
	"avatar" : "0.jpg",
	"points" : 0,
	'doubleBalance' : 0
}
var Settings = {
	"language" : "EN",
	"sounds" : true,
	"drop" : false
}
	if (isAndroid()) fromCookieToAndroid();

	Player.nickname = getStatistic("playerNickname", 'Player');
	Player.avatar = getStatistic("playerAvatar", '0.jpg');
	Player.points = parseInt(getStatistic('playerPoints', 0));
	Player.doubleBalance = parseInt(getStatistic('doubleBalance', 0));

	Settings.language = getStatistic("settings_language", 'EN');
	Settings.sounds = getStatistic("settings_sounds", 'true') === 'true';
	Settings.drop = getStatistic("settings_drop", 'false') === 'true';


function fromCookieToAndroid() {
	cookieList = ["playerNickname", "playerAvatar", "settings_language", "settings_sounds", "settings_drop"];
	
	if (isAndroid())
		for (var i = 0; i < cookieList.length; i++) {
			cookie = $.cookie(cookieList[i]);
			if (cookie) {
				saveStatistic(cookieList[i], cookie);
				$.removeCookie(cookieList[i]);
			}
		}
	
}

// ===== RANKS =====
var Ranks = [
	{
		name: 'Silver I',
		points: 0,
		doubleBonus: 50
	}, {
		name: 'Silver II',
		points: 15,
		doubleBonus: 100
	}, {
		name: 'Silver III',
		points: 25,
		doubleBonus: 150
	}, {
		name: 'Silver IV',
		points: 50,
		doubleBonus: 200
	}, {
		name: 'Silver Elite',
		points: 80,
		doubleBonus: 250
	}, {
		name: 'Silver Elite Master',
		points: 110,
		doubleBonus: 300
	}, {
		name: 'Gold Nova I',
		points: 140,
		doubleBonus: 350
	}, {
		name: 'Gold Nova II',
		points: 190,
		doubleBonus: 400
	}, {
		name: 'Gold Nova III',
		points: 240,
		doubleBonus: 450
	}, {
		name: 'Gold Nova Master',
		points: 290,
		doubleBonus: 500
	}, {
		name: 'Master Guardian I',
		points: 360,
		doubleBonus: 550
	}, {
		name: 'Master Guardian II',
		points: 450,
		doubleBonus: 600
	}, {
		name: 'Master Guardian Elite',
		points: 520,
		doubleBonus: 650
	}, {
		name: 'Distinguished Master Guardian',
		points: 600,
		doubleBonus: 700
	}, {
		name: 'Legendary Eagle',
		points: 700,
		doubleBonus: 750
	}, {
		name: 'Legendary Eagle Master',
		points: 800,
		doubleBonus: 800
	}, {
		name: 'Supreme Master First Class',
		points: 910,
		doubleBonus: 850
	}, {
		name: 'The Global Elite',
		points: 1020,
		doubleBonus: 900
	}, 
];

for (var i = 0; i < Ranks.length; i++) {
	Ranks[i].id = i;
	var img = Ranks[i].name.toLowerCase().replace(/ /g, '');
	Ranks[i].img = '../images/ranks/'+img+'.png';
}

function getRank(points) {
	points = points || Player.points;
	for (var i = 0; i < Ranks.length; i++) {
		if (points < Ranks[i].points) {
			return Ranks[i-1];
			break
		}
		if (i == Ranks.length-1) {
			return Ranks[i];
			break
		}
	}
}

function getNextRank(points) {
	points = points || Player.points;
	var getRank = {};
	for (var i = 0; i < Ranks.length; i++) {
		if (points < Ranks[i].points || i == Ranks.length - 1) {
			return Ranks[i];
			break
		}
	}
}

function getRankByName(name) {
	for (var i = 0; i < Ranks.length; i++)
		if (Ranks[i].name == name) {
			return Ranks[i];
		}
}

function changePoints(val) {
	if (typeof val == "number" && val != 0) {
		var currRankName = getRank().name;
		Player.points += val;
		Player.points = (Player.points < 0) ? 0 : Player.points;
		saveStatistic('playerPoints', Player.points);
		var percent = ((Player.points - getRank().points) * 100) / (getNextRank().points - getRank().points);
		if (getNextRank().points - getRank().points == 0) percent = 100;
		$("#player-rank-progress").css('width', percent+'%');
		
		
		if (currRankName != getRank().name) {
			$("#left-rank").attr('src', getRank().img);
			$("#right-rank").attr('src', getNextRank().img);
			try {
				if (isAndroid()) {
					client.sendToAnalytics("Rank", "Rank", "Ranked up to "+getRank().name, "cases.html");
				}
			}catch (e) {
				//ERROR
			}
		}
	}
}