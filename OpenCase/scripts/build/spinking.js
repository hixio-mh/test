var spinking =
webpackJsonp_name_([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var results = __webpack_require__(1);
	exports.results = results;
	var caseOpening = false;
	var Spins = [{
	    "name": {
	        "RU": "N0thing",
	        "EN": "N0thing"
	    },
	    "description": {
	        "RU": "Бывает, попробуй еще",
	        "EN": "Try again"
	    },
	    "img": "nothing.png",
	    "rarity": "industrial",
	    "chance": 8
	}, {
	    "name": {
	        "RU": "Повтор",
	        "EN": "Re-spin"
	    },
	    "description": {
	        "RU": "Давай еще раз",
	        "EN": "One more time"
	    },
	    "img": "respin.png",
	    "rarity": "milspec",
	    "code": "results.retry();",
	    "chance": 7
	}, {
	    "name": {
	        "RU": "Comeback",
	        "EN": "Comeback"
	    },
	    "description": {
	        "RU": "Возвращение ставки",
	        "EN": "Return your bet"
	    },
	    "img": "comeback.png",
	    "imgStyles": "height: 90%;margin-top:3px;",
	    "rarity": "milspec",
	    "code": "",
	    "chance": 6
	}, {
	    "name": {
	        "RU": "Тройная удача",
	        "EN": "Triple kill"
	    },
	    "description": {
	        "RU": "Ваша ставка x3",
	        "EN": "Return your bet x3"
	    },
	    "img": "betMultiply.png",
	    "imgStyles": "height: 80%;margin-top:5px;",
	    "xCounter": 3,
	    "rarity": "milspec",
	    "code": "",
	    "chance": 4
	}, {
	    "name": {
	        "RU": "НОЖ!!!",
	        "EN": "KNIFE!!!"
	    },
	    "description": {
	        "RU": "Случайный нож!",
	        "EN": "Random knife!"
	    },
	    "img": "knife.png",
	    "rarity": "rare",
	    "code": "results.giveRandomKnive()",
	    "chance": 1
	}];
	$(function () {
	    for (var i = 0; i < Spins.length; i++) {
	        Spins[i].id = i;
	    }fillCarusel();
	    fillItems();
	});
	
	function newGame() {
	    fillCarusel();
	}
	exports.newGame = newGame;
	
	function fillCarusel() {
	    $(".casesCarusel").empty();
	    var arr = [];
	    for (var key in Spins) {
	        arr[key] = Spins[key];
	    }
	    while (arr.length < winNumber + 3) {
	        arr = arr.concat(arr.shuffle());
	    }
	    if (arr.length > winNumber + 3) arr.splice(winNumber + 3, arr.length - (winNumber + 3));
	
	    var carusel = "";
	    arr.forEach(function (item, i) {
	        var img = "../images/spinking/icons/" + arr[i].img;
	        var bg = "bg-" + arr[i].rarity;
	        var style = typeof arr[i].imgStyles != "undefined" ? "style='" + arr[i].imgStyles + "'" : "";
	
	        carusel += "<div class='weapon spinking " + bg + " animated fadeInDown' data-id=" + arr[i].id + ">" + "<div class='img-holder'><img src='" + img + "' " + style + "></div>" + (typeof arr[i].xCounter != "undefined" ? "<span class='xCounter'>x" + arr[i].xCounter + "</span>" : "") + "<div class='weaponInfo'><span class='spinking-item-name'>" + arr[i].name[Settings.language] + "</span><span class='spinking-item-descr'>" + arr[i].description[Settings.language] + "</span></div></div>";
	    });
	
	    $(".casesCarusel").html(carusel);
	    $(".casesCarusel").css("margin-left", "0px");
	}
	
	function spin() {
	    var win = getResult();
	    console.log(win.name.RU);
	    $($(".casesCarusel").children(".weapon")[winNumber]).replaceWith(resultToHTML(win));
	    var a = 127 * winNumber;
	    var l = 131;
	    var d = 0,
	        s = 0;
	    var progress_animate = 0;
	    $(".casesCarusel").animate({
	        marginLeft: -1 * Math.rand(a - 48, a + 75)
	    }, {
	        duration: 8000,
	        easing: 'easeOutCubic',
	        start: function start() {},
	        progress: function progress(e, t) {
	            if (Settings.sounds) {
	                progress_animate = Math.round(100 * t), s = parseInt(parseInt($(".casesCarusel").css("marginLeft").replace(/[^0-9.]/g, "") - l / 2) / l), s > d && (Sound("scroll", "play"), d++);
	            }
	        },
	        complete: function complete() {
	            //$(".win").slideDown("fast");
	            caseOpening = false;
	            if (win.code != "") eval(win.code);
	            $("#spin").attr("onclick", "spinking.results.retry();");
	            //$(".openCase").attr("disabled", null);
	            //$(".weapons").scrollTop(185);
	
	            //Statistic
	            //changePoints(1);
	        },
	        always: function always() {
	            // $(".openCase").attr("disabled", null);
	            caseOpening = false;
	        }
	    });
	}
	exports.spin = spin;
	
	//exports.retry = retry;
	
	function resultToHTML(result) {
	    var style = typeof result.imgStyles != "undefined" ? "style='" + result.imgStyles + "'" : "";
	    var html = "<div class='weapon spinking bg-" + result.rarity + "' data-id=" + result.id + ">" + "<div class='img-holder'><img src='../images/spinking/icons/" + result.img + "' " + style + "></div>" + (typeof result.xCounter != "undefined" ? "<span class='xCounter'>x" + result.xCounter + "</span>" : "") + "<div class='weaponInfo'><span class='spinking-item-name'>" + result.name[Settings.language] + "</span><span class='spinking-item-descr'>" + result.description[Settings.language] + "</span></div></div>";
	    return html;
	}
	
	function getResult() {
	    var sumChances = 0;
	    for (var i = 0; i < Spins.length; i++) {
	        sumChances += Spins[i].chance;
	    }for (var i = 0; i < Spins.length; i++) {
	        var weight = Spins[i].chance / sumChances;
	        Spins[i].weight = weight;
	    }
	
	    var sumWeights = 0;
	    for (var i = 0; i < Spins.length; i++) {
	        sumWeights += Spins[i].weight;
	    }var cursor = 0;
	    var random = Math.random();
	    for (var i = 0; i < Spins.length; i++) {
	        cursor += Spins[i].weight / sumWeights;
	        if (cursor >= random) return Spins[i];
	    }
	}
	
	function fillItems() {
	    var allItems = "";
	    for (var i = 0; i < Spins.length; i++) {
	        allItems += "<li class='weapon spinking bg-" + Spins[i].rarity + " animated fadeInDown'><div class='img-holder'><img src='../images/spinking/icons/" + Spins[i].img + "' " + (typeof Spins[i].imgStyles != "undefined" ? "style='" + Spins[i].imgStyles + "'" : "") + "></div>" + (typeof Spins[i].xCounter != "undefined" ? "<span class='xCounter'>x" + Spins[i].xCounter + "</span>" : "") + "<div class='weaponInfo'><span class='spinking-item-name'>" + Spins[i].name[Settings.language] + "</span><span class='spinking-item-descr'>" + Spins[i].description[Settings.language] + "</span></div></li>";
	    }
	    $(".winList").html(allItems);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	    giveRandomKnive: function giveRandomKnive() {},
	
	    retry: function retry() {
	        $(".casesCarusel").children(".weapon").addClass("animated fadeOutDown");
	        sleep(1000).then(function () {
	            $(".casesCarusel").empty();
	            spinking.newGame();
	            spinking.spin();
	        });
	    }
	};
	
	function sleep(time) {
	    return new Promise(function (resolve) {
	        return setTimeout(resolve, time);
	    });
	}

/***/ }
]);
//# sourceMappingURL=spinking.js.map