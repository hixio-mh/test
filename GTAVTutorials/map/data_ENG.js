var cats = {
        1: 1,
    };
window.GtaMap = window.GtaMap || {};
GtaMap.data = {
	"allCategories": [{
        "id": 1,
        "title": "Peyote",
        "icon": "peyote",
        "order": 30,
        "enabled": 1,
        "trackable": 1,
        "group": "collectible"
    }, {
        "id": 2,
        "title": "Clothing",
        "icon": "clothing",
        "order": 30,
        "enabled": 1,
        "trackable": 1,
        "group": "place"
    },
	],
    "categories": {
        "1": {
            "id": 1,
            "title": "Peyote",
            "icon": "peyote",
            "order": 30,
            "enabled": 1,
            "trackable": 1,
            "group": "collectible",
            "locations": [{
                "id": 1,
                "category_id": 1,
                "title": "Peyote",
                "image": "",
                "description": "<img src='../images/Peyote/01.jpg' width=300px>",
                "latitude": "79.37580587107902",
				"longitude": "-10.9423828125",
                "created_by": 1
            }, {
                "id": 2,
                "category_id": 1,
                "title": "Peyote",
                "image": "",
                "description": "<img src='../images/Peyote/02.jpg' width=300px>",
                "latitude": "77.91566898632584",
				"longitude": "-37.96875",
                "created_by": 1
            },]
        },
        "71": {
            "id": 71,
            "title": "Holotape",
            "icon": "holotape",
            "order": 0,
            "enabled": 1,
            "trackable": 1,
            "group": "collectible",
            "locations": [{
                "id": 83,
                "category_id": 71,
                "title": "Red Menace - Holotape Game",
                "image": "",
                "description": "<b>Location:</b> Vault 111.",
                "latitude": "82.5406",
                "longitude": "-106.1718",
                "created_by": 1
            }]
        }
    },
    "locations": {},
    "trackableCategories": [4, 71, 69]
};