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
}, ];
module.exports = Spins;
