var Spins = [{
    "name": {
        "RU": "Только не это",
        "EN": "Not this pls"
    },
    "description": {
        "RU": "Опустошает инвентарь",
        "EN": "Empties your inventory"
    },
    "img": "emptyInventory.png",
    "imgStyles": "height: 103%;margin:-1px;",
    "rarity": "covert",
    "chance": 0
}, {
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
    "chance": 20
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
    "rarity": "industrial",
    "code": "results.retry();",
    "chance": 18
}, {
    "name": {
        "RU": "Хоть что-то",
        "EN": "Better than nothing"
    },
    "description": {
        "RU": "1/2 вашей ставки",
        "EN": "Return half of your bet"
    },
    "img": "half.png",
    "imgStyles": "height: 90%;margin-top:5px;",
    "rarity": "rare",
    "code": "results.returnBet(0.5);",
    "chance": 16
}, {
    "name": {
        "RU": "Comeback",
        "EN": "Comeback"
    },
    "description": {
        "RU": "Возвращение ставки",
        "EN": "Return your bet"
    },
    "img": "betMultiply.png",
    "imgStyles": "height: 80%;margin-top:5px;",
    "rarity": "rare",
    "code": "results.returnBet(1);",
    "chance": 15
}, {
    "name": {
        "RU": "Double kill",
        "EN": "Double kill"
    },
    "description": {
        "RU": "Ваша ставка x2",
        "EN": "Return your bet x2"
    },
    "img": "betMultiply.png",
    "imgStyles": "height: 80%;margin-top:5px;",
    "xCounter": 2,
    "rarity": "rare",
    "code": "results.returnBet(2);",
    "chance": 11
}, {
    "name": {
        "RU": "Впечатляет",
        "EN": "Impressive"
    },
    "description": {
        "RU": "Ваша ставка x10",
        "EN": "Return your bet x10"
    },
    "img": "betMultiply.png",
    "imgStyles": "height: 80%;margin-top:5px;",
    "xCounter": 10,
    "rarity": "rare",
    "code": "results.returnBet(10);",
    "chance": 5
}, {
    "name": {
        "RU": "Ничего себе",
        "EN": "WOW"
    },
    "description": {
        "RU": "Ваша ставка x50",
        "EN": "Return your bet x50"
    },
    "img": "betMultiply.png",
    "imgStyles": "height: 80%;margin-top:5px;",
    "xCounter": 50,
    "rarity": "rare",
    "code": "results.returnBet(50);",
    "chance": 5
}, {
    "name": {
        "RU": "Я БОГАТ!",
        "EN": "I AM RICH!"
    },
    "description": {
        "RU": "Ваша ставка x100",
        "EN": "Return your bet x100"
    },
    "img": "rich.png",
    "imgStyles": "height: 80%;margin-top:5px;",
    "rarity": "rare",
    "code": "results.returnBet(100);",
    "chance": 2
}, {
    "name": {
        "RU": "Эко раунд",
        "EN": "Eco round"
    },
    "description": {
        "RU": "1 случайная вещь",
        "EN": "1 random weapon"
    },
    "img": "gun.png",
    "imgStyles": "height: 103%;margin:-1px;",
    "rarity": "restricted",
    "code": "results.randomItem(1, 'milspec');results.returnBet(1);",
    "chance": 13
}, {
    "name": {
        "RU": "Форс бай",
        "EN": "Force buy"
    },
    "description": {
        "RU": "5 случайных вещей",
        "EN": "5 random weapons"
    },
    "img": "gun.png",
    "imgStyles": "height: 103%;margin:-1px;",
    "xCounter": 5,
    "rarity": "restricted",
    "code": "results.randomItem(5);results.returnBet(1);",
    "chance": 3

}, {
    "name": {
        "RU": "Фулл бай",
        "EN": "Full buy"
    },
    "description": {
        "RU": "10 случайных вещей",
        "EN": "10 random weapons"
    },
    "img": "gun.png",
    "imgStyles": "height: 103%;margin:-1px;",
    "xCounter": 10,
    "rarity": "restricted",
    "code": "results.randomItem(5);results.returnBet(1);",
    "chance": 2
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
    "imgStyles": "height:70%;margin-top: 15px;",
    "rarity": "restricted",
    "code": "results.giveRandomKnive();",
    "chance": 1
}, {
    "name": {
        "RU": "Дракон",
        "EN": "Dragon"
    },
    "description": {
        "RU": "История о драконе",
        "EN": "AWP Dragon Lore"
    },
    "img": "dragon.png",
    "imgStyles": "height: 90%;margin-top: 8px;",
    "rarity": "covert",
    "code": "results.weapon('AWP', 'Dragon Lore', 'Cobblestone')",
    "chance": 1
}, ];
module.exports = Spins;
