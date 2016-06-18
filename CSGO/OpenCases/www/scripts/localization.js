$(function () {
	var category = $(document.body).data('localization');

	localizate(category);
})

function localizate(category){
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
			"RU" : "Ножи:",
			"EN" : "Knives:"
		}
	}, {
		"selector" : "#contract-text",
		"localization" : {
			"RU" : "Контракты обмена:",
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
Localization.faq = [{
		"selector" : "#js-local-question-1",
		"localization" : {
			"EN" : "How to play jackpot?"
		}
	}, {
		"selector" : "#js-local-answer-1",
		"localization" : {
			"EN" : "The max number of weapons that you can add: 6.<br>Maximum price - is unlimited.<br>The game will begin after 20 weapons will be collected.<br>If you add weapons and close the roulette - weapons will disappear."
		}
	}, {
		"selector" : "#js-local-question-2",
		"localization" : {
			"EN" : "Why weapon price is $0?"
		}
	}, {
		"selector" : "#js-local-answer-2",
		"localization" : {
			"EN" : "Weapons prices is taken from the database. If there are no prices for current weapon, then price is taken from the Steam Market. If there no price too, then $0. <br> When the weapon appear in market, open the weapon info in inventory, wait until the price is loaded, reopen inventory."
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
		"selector" : "#reset",
		"localization" : {
			"RU" : "Полный сброс",
			"EN" : "Full reset"
		}
	}, {
		"selector" : "#reset-text",
		"localization" : {
			"RU" : "Вы уверены, что хотите очистить инвентарь и сбросить статистику?",
			"EN" : "All weapons will be deleted. Statistics will be reset. Are you sure?"
		}
	}, {
		"selector" : "#resetConfirm",
		"localization" : {
			"RU" : "Да",
			"EN" : "Yes"
		}
	}, {
		"selector" : "#submit",
		"localization" : {
			"RU" : "Сохранить",
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
			"RU" : "Главный разработчик",
			"EN" : "Main developer"
		}
	}, {
		"selector" : "#local-1",
		"localization" : {
			"RU" : "Если Вы обнаружили ошибки, или у Вас есть предложение, напишите на почту.",
			"EN" : "If you found some bugs or you have a suggestion you can write me an email."
		}
	}, {
		"selector" : "#local-2",
		"localization" : {
			"RU" : "Если хотите поблагодарить разработчика, можете подарить что-нибудь в стиме :)",
			"EN" : "If you want to thank the developer you can send something in Steam :)"
		}
	}, {
		"selector" : "#local-3",
		"localization" : {
			"RU" : "Не забудьте поставить оценку в маркете ^_^",
			"EN" : "Do not forget to rate the app in the Play Market ^_^"
		}
	}, {
		"selector" : "#copyright",
		"localization" : {
			"RU" : "Авторские права",
			"EN" : "Copyright"
		}
	}, {
		"selector" : "#local-4",
		"localization" : {
			"RU" : "Вся информация взята из открытых источников. Если что-либо в приложении нарушает ваши авторские права, свяжитесь со мной.",
			"EN" : "All information is taken from public sources. If anything in the application infringes your copyright, please contact me."
		}
	},
],
Localization.apps = []