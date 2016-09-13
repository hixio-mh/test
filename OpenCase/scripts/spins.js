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
    "chance": 15
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
    "chance": 13
}, {
    "name": {
        "RU": "Хоть что-то",
        "EN": "Better than nothing"
    },
    "description": {
        "RU": "Возвращение половины ставки",
        "EN": "Return half of your bet"
    },
    "img": "half.png",
    "imgStyles": "height: 90%;margin-top:5px;",
    "rarity": "milspec",
    "code": "results.returnBet(0.5);",
    "chance": 10
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
    "rarity": "milspec",
    "code": "results.randomItem(1);",
    "chance": 8
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
    "rarity": "restricted",
    "code": "results.returnBet(1);",
    "chance": 8
}, {
    "name": {
        "RU": "Двойная удача",
        "EN": "Double kill"
    },
    "description": {
        "RU": "Ваша ставка x2",
        "EN": "Return your bet x2"
    },
    "img": "betMultiply.png",
    "imgStyles": "height: 80%;margin-top:5px;",
    "xCounter": 2,
    "rarity": "classified",
    "code": "results.returnBet(2);",
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
    "rarity": "covert",
    "code": "results.returnBet(3);",
    "chance": 4
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
    "code": "results.returnBet(100)",
    "chance": 1
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
}, ];
module.exports = Spins;
