$(function () {
	var category = $(document.body).data('localization');
	localizate(category);
})

function localizate(category){
	if (category != 'none')
		for (var i = 0; i < Localization[category].length; i++) {
			if (typeof Localization[category][i].localization[Settings.language] != 'undefined')
				$(Localization[category][i].selector).html(Localization[category][i].localization[Settings.language]);
		}
	for (var i = 0; i < Localization['menu'].length; i++) {
		if (typeof Localization['menu'][i].localization[Settings.language] != 'undefined')
			$(Localization['menu'][i].selector).html(Localization['menu'][i].localization[Settings.language]);
	}
}
var Localization = [];
Localization.menu = [{
		"selector" : "#local-menu-case",
		"localization" : {
			"EN" : "Open case"
		}
	}, {
		"selector" : "#local-menu-games",
		"localization" : {
			"EN" : "Games"
		}
	}, {
		"selector" : "#local-menu-rulet",
		"localization" : {
			"EN" : "Jackpot"
		}
	}, {
		"selector" : "#local-menu-rps",
		"localization" : {
			"EN" : "Rock-Paper-Scissors"
		}
	}, {
		"selector" : "#local-menu-inventory",
		"localization" : {
			"RU" : "Мой инвентарь",
			"EN" : "My inventory"
		}
	}, {
		"selector" : "#local-menu-stat",
		"localization" : {
			"RU" : "Статистика",
			"EN" : "Statistic"
		}
	}, {
		"selector" : "#local-menu-news",
		"localization" : {
			"RU" : "Обновления",
			"EN" : "Updates"
		}
	}, {
		"selector" : "#local-menu-settings",
		"localization" : {
			"RU" : "Настройки",
			"EN" : "Settings"
		}
	}, {
		"selector" : "#local-menu-about",
		"localization" : {
			"RU" : "О программе",
			"EN" : "About"
		}
	}, {
		"selector" : "#local-menu-apps",
		"localization" : {
			"RU" : "Другие приложения",
			"EN" : "Other apps"
		}
	}
],
Localization.cases = [{
		"selector" : "#Default h1",
		"localization" : {
			"RU" : "Кейсы",
			"EN" : "Cases"
		}
	}, {
		"selector" : "#Collection h1",
		"localization" : {
			"RU" : "Коллекции",
			"EN" : "Collections"
		}
	}, {
		"selector" : "#Souvenir h1",
		"localization" : {
			"RU" : "Сувенирные коллекции",
			"EN" : "Souvenir collections"
		}
	}, {
		"selector" : "#Special h1",
		"localization" : {
			"RU" : "Особые",
			"EN" : "Special"
		}
	}, {
		"selector" : "#js-local-special-text",
		"localization" : {
			"RU" : "Чтобы открыть специальный кейс, откройте ещё",
			"EN" : "To open a special case, open"
		}
	}, {
		"selector" : "#js-local-special-text2",
		"localization" : {
			"RU" : "кейсов.",
			"EN" : "more cases."
		}
	}, {
		"selector" : "#js-local-special-text3",
		"localization" : {
			"RU" : "Или посмотрите рекламу.",
			"EN" : "Or watch the ads."
		}
	}, {
		"selector" : "#showVideoAd",
		"localization" : {
			"RU" : "Посмотреть рекламу",
			"EN" : "Watch the ads"
		}
	},
],
Localization.openCase = [{
		"selector" : "#win_youWon",
		"localization" : {
			"RU" : "Вы выиграли",
			"EN" : "You won"
		},
	}, {
		"selector" : ".openCase",
		"localization" : {
			"RU" : "Открыть кейс",
			"EN" : "Open case"
		}
	}, {
		"selector" : "#what-i-can-win-Button",
		"localization" : {
			"EN" : "What i can win?"
		}
	}, {
		"selector" : "#local-youCanWin",
		"localization" : {
			"RU" : "Вы можете выиграть один из данных предметов из коллекции",
			"EN" : "You can win one of those items from collection"
		}
	}, {
		"selector" : "#opened-text",
		"localization" : {
			"RU" : "Открыто: ",
			"EN" : "Opened: "
		}
	}
],
Localization.openCase2 = {
	"openCase" : {
		"RU" : "Открыть кейс",
		"EN" : "Open case"
	},
	"opening" : {
		"RU" : "Открываем кейс...",
		"EN" : "Opening..."
	},
	"tryAgain" : {
		"RU" : "Попробовать ещё раз",
		"EN" : "Try again"
	}
}
Localization.jackpot = [{
		"selector" : "#addItems",
		"localization" : {
			"RU" : "Внести предметы",
			"EN" : "Add items"
		}
	}, {
		"selector" : ".choseItems",
		"localization" : {
			"RU" : "Внести",
			"EN" : "Add selected items"
		}
	},
],
Localization.jackpot2 = {
	"sumText" : {
		"RU" : "Сумма: ",
		"EN" : "Cost: "
	},
	"playerInventory" : {
		"RU" : "Инвентарь пользователя <b>"+Player.nickname+"</b>",
		"EN" : "<b>"+Player.nickname+"</b> inventory"
	},
	"emptyInventory" : {
		"RU" : "Инвентарь пуст. Чтобы пополнить его, <a href='cases.html?from=jackpot'>откройте пару кейсов.</a>",
		"EN" : "Inventory is empty. <a href='cases.html?from=jackpot'>Open some cases to fill it.</a>"
	}
},
Localization.rps = [{
		'selector': ".status",
		'localization' : {
			"EN" : "Add weapon to start a game."
		}
	}, {
		'selector': ".your-score",
		'localization' : {
			"EN" : "You <span>0</span>"
		}
	}, {
		'selector': ".comp-score",
		'localization' : {
			"EN" : "Opponent <span>0</span>"
		} 
	}, {
		'selector': ".choice span",
		'localization' : {
			"EN" : "Choose Rock, Paper or Scissors."
		}
	}, {
		'selector': ".add-item",
		'localization' : {
			"EN" : "Add weapon"
		}
	}, {
		'selector': ".choseItems",
		'localization' : {
			"EN" : "Add selected weapon"
		}
	},
],
Localization.rps2 = {
	'youAdd' : {
		"EN" : "You added: ",
		"RU" : "Вы добавили: "
	},
	'opponentAdd' : {
		"EN" : "Opponent added: ",
		"RU" : "Противник добавил: "
	},
	'youWinRound' : {
		"EN" : "You win this round!",
		"RU" : "Вы победили в этом раунде!"
	},
	'youLostRound' : {
		"EN" : "You lost this round.",
		"RU" : "Вы проиграли в этом раунде."
	},
	'tie' : {
		"EN" : "Tie!",
		"RU" : "Ничья!"
	},
	'winGame' : {
		"EN" : "You win!",
		"RU" : "Вы победили!"
	},
	'lostGame' : {
		"EN" : "You lost.",
		"RU" : "Вы проиграли."
	}
},
Localization.inventory = [{
		"selector" : "#weaponInfoTable tr:nth-child(1) td:nth-child(1)",
		"localization" : {
			"RU" : "Цена",
			"EN" : "Price"
		}
	}, {
		"selector" : "#weaponInfoTable tr:nth-child(2) td:nth-child(1)",
		"localization" : {
			"RU" : "Качество",
			"EN" : "Quality"
		}
	}, {
		"selector" : ".button_startContract",
		"localization" : {
			"RU" : "Контракт обмена",
			"EN" : "Trade up contract"
		}
	}, {
		"selector" : ".button_resetContract",
		"localization" : {
			"RU" : "Закрыть контракт",
			"EN" : "Close contract"
		}
	}, {
		"selector" : ".button_contract",
		"localization" : {
			"RU" : "Обмен...",
			"EN" : "Proceed..."
		}
	}, {
		"selector" : "#stat-sum-text",
		"localization" : {
			"RU" : "Сумма:",
			"EN" : "Cost:"
		}
	}, {
		"selector" : "#stat-count-text",
		"localization" : {
			"RU" : "Предметов:",
			"EN" : "Count:"
		}
	},
],
Localization.statistic = [{
		"selector" : "#caseOpened-text",
		"localization" : {
			"EN" : "Total cases opened:"
		}
	}, {
		"selector" : "#white-text",
		"localization" : {
			"EN" : "White:"
		}
	}, {
		"selector" : "#industrial-text",
		"localization" : {
			"EN" : "Light-blue:"
		}
	}, {
		"selector" : "#blue-text",
		"localization" : {
			"EN" : "Blue:"
		}
	}, {
		"selector" : "#restricted-text",
		"localization" : {
			"EN" : "Purple:"
		}
	}, {
		"selector" : "#classified-text",
		"localization" : {
			"EN" : "Pink:"
		}
	}, {
		"selector" : "#covert-text",
		"localization" : {
			"EN" : "Red:"
		}
	}, {
		"selector" : "#knife-text",
		"localization" : {
			"EN" : "Knives:"
		}
	}, {
		"selector" : "#contract-text",
		"localization" : {
			"EN" : "Trade up contracts:"
		}
	}, {
		"selector" : "#rulet-text",
		"localization" : {
			"EN" : "Jackpots win/lose:"
		}
	}, {
		"selector" : "#rulet-max-win-text",
		"localization" : {
			"EN" : "Jackpot max money won:"
		}
	}, {
		"selector" : "#rps-text",
		"localization" : {
			"EN" : "Rock-Paper-Scissors win/lose:"
		}
	}
],
Localization.faq = [{
		"selector" : "#js-local-question-1",
		"localization" : {
			"EN" : "How to play jackpot?"
		}
	}, {
		"selector" : "#js-local-answer-1",
		"localization" : {
			"EN" : "The max number of weapons that you can add: 10.<br>Maximum price is unlimited.<br>The game will begin after 20 weapons are collected.<br>If you add weapons and close the roulette, weapons will disappear."
		}
	}, {
		"selector" : "#js-local-question-2",
		"localization" : {
			"EN" : "Why weapons price is $0?"
		}
	}, {
		"selector" : "#js-local-answer-2",
		"localization" : {
			"EN" : "Weapons prices are taken from the database. If there are no prices for current weapon, then price is taken from the Steam Market. If there is no price as well, it counts as $0. <br> When the weapon appears in market, open the weapon info in inventory, wait until the price is loaded, reopen inventory."
		}
	}, {
		"selector" : "#js-local-question-3",
		"localization" : {
			"EN" : "I found a bug what should I do?"
		}
	}, {
		"selector" : "#js-local-answer-3",
		"localization" : {
			"EN" : "You can contact me via email: <b>kurtukovvlad@gmail.com</ b>"
		}
	}
],
Localization.settings = [{
		"selector" : "#local-name",
		"localization" : {
			"EN" : "Your name:"
		}
	}, {
		"selector" : "#local-avatar",
		"localization" : {
			"EN" : "Avatar:"
		}
	}, {
		"selector" : "#local-language",
		"localization" : {
			"EN" : "Language:"
		}
	}, {
		"selector" : "#reset",
		"localization" : {
			"EN" : "Full reset"
		}
	}, {
		"selector" : "#reset-text",
		"localization" : {
			"EN" : "All weapons will be deleted. Statistics will be reset. Are you sure?"
		}
	}, {
		"selector" : "#resetConfirm",
		"localization" : {
			"EN" : "Yes"
		}
	}, {
		"selector" : "#submit",
		"localization" : {
			"EN" : "Save"
		}
	},
],
Localization.settings2 = {
	"saved" : {
		"RU" : "Сохранено",
		"EN" : "Saved"
	},
	"reset" : {
		"RU" : "Очищено",
		"EN" : "Done"
	}
}
Localization.about = [{
		"selector" : "#developer",
		"localization" : {
			"EN" : "Main developer"
		}
	}, {
		"selector" : "#local-1",
		"localization" : {
			"EN" : "If you found some bugs or you have a suggestion you can write me an email."
		}
	}, {
		"selector" : "#local-2",
		"localization" : {
			"EN" : "If you want to thank the developer you can send something in Steam :)"
		}
	}, {
		"selector" : "#local-3",
		"localization" : {
			"EN" : "Do not forget to rate the app in the Play Market ^_^"
		}
	}, {
		"selector" : "#special-thanks",
		"localization" : {
			"EN" : "Special Thanks"
		}
	}, {
		"selector" : "#copyright",
		"localization" : {
			"EN" : "Copyright"
		}
	}, {
		"selector" : "#local-4",
		"localization" : {
			"EN" : "All information is taken from public sources. If anything in the application infringes your copyright, please contact me."
		}
	},
],
Localization.apps = []