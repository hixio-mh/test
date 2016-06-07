$(function () {
	var category = $(document.body).data('localization');

	for (var i = 0; i < Localization[category].length; i++) {
		$(Localization[category][i].selector).text(Localization[category][i].localization[Settings.language]);
	}
	for (var i = 0; i < Localization['menu'].length; i++) {
		$(Localization['menu'][i].selector).text(Localization['menu'][i].localization[Settings.language]);
	}
})
var Localization = [];
Localization.menu = [{
		"selector" : "#local-menu-case",
		"localization" : {
			"RU" : "Открыть кейсы",
			"EN" : "Open case"
		}
	}, {
		"selector" : "#local-menu-rulet",
		"localization" : {
			"RU" : "Рулетка",
			"EN" : "Jackpot"
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
	},
],
Localization.openCase = [{
		"selector" : "#youWon",
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
		"selector" : "#local-youCanWin",
		"localization" : {
			"RU" : "Вы можете выиграть один из данных предметов из коллекции",
			"EN" : "You can win one of those items from collection"
		}
	}
],
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
			"RU" : "Количество открытых кейсов:",
			"EN" : "Total cases opened:"
		}
	}, {
		"selector" : "#white-text",
		"localization" : {
			"RU" : "Белые:",
			"EN" : "White:"
		}
	}, {
		"selector" : "#industrial-text",
		"localization" : {
			"RU" : "Светло-синие:",
			"EN" : "Light-blue:"
		}
	}, {
		"selector" : "#blue-text",
		"localization" : {
			"RU" : "Синие:",
			"EN" : "Blue:"
		}
	}, {
		"selector" : "#restricted-text",
		"localization" : {
			"RU" : "Фиолетовые:",
			"EN" : "Purple:"
		}
	}, {
		"selector" : "#classified-text",
		"localization" : {
			"RU" : "Розовые:",
			"EN" : "Pink:"
		}
	}, {
		"selector" : "#covert-text",
		"localization" : {
			"RU" : "Красные:",
			"EN" : "Red:"
		}
	}, {
		"selector" : "#knife-text",
		"localization" : {
			"RU" : "Красные:",
			"EN" : "Knives:"
		}
	}, {
		"selector" : "#contract-text",
		"localization" : {
			"RU" : "Контакрты обмена:",
			"EN" : "Trade up contracts:"
		}
	}, {
		"selector" : "#rulet-text",
		"localization" : {
			"RU" : "Рулетка выиграно/проиграно:",
			"EN" : "Jackpots won/lose:"
		}
	}, {
		"selector" : "#rulet-max-win-text",
		"localization" : {
			"RU" : "Максимальный выигрыш в рулетке:",
			"EN" : "Jackpot max money won:"
		}
	}
],
Localization.settings = [{
		"selector" : "#local-name",
		"localization" : {
			"RU" : "Ваше имя:",
			"EN" : "Your name:"
		}
	}, {
		"selector" : "#local-avatar",
		"localization" : {
			"RU" : "Аватарка:",
			"EN" : "Avatar:"
		}
	}, {
		"selector" : "#local-language",
		"localization" : {
			"RU" : "Язык:",
			"EN" : "Language:"
		}
	}, {
		"selector" : ".saveButton",
		"localization" : {
			"RU" : "Сохранить",
			"EN" : "Save"
		}
	},
]
