//var prefix = "https://steamcommunity-a.akamaihd.net/economy/image/";
//var prefix = "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz"
var prefix = "https://steamcommunity-a.akamaihd.net/economy/image/"
	var postfix = "/125fx125f";
var postfixBig = "/383fx383f";
var cases = [{
		"name" : "Cobblestone",
		"img" : "Cobblestone.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'UMP-45',
				'skinName' : 'Индиго',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwPz3eDNG5du5q4GFk8jzIb7IqWZU7Mxkh6eW842tjQawqkU6Mm2ldtecdlA7NwrZ-gftw-fvhsK46JSdzXRkvHQh-z-DyNBCEWOJ'
			}, {
				'type' : 'Dual Berettas',
				'skinName' : 'Терн',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf2-r3ZzRM6c-JmYWPnuL5feOIxD5Qv5Al2L3FpY3wiw21qBA-N2qhIIXEdVI5M1vU8wXtxL-7gJCi_MOe_3Qy_VQ'
			}, {
				'type' : 'MAC-10',
				'skinName' : 'Индиго',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwPz3eDNG5du5q4GFk8jzIb7IqWZU7Mxkh6eZrdz32FK1rUppNzr6cISUdFU_aV_T-AW6ye7uhcC-tcjOzXFl7nV0-z-DyL4k_fgB'
			}, {
				'type' : 'SCAR-20',
				'skinName' : 'Гроза',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7ODHTi5W4867kpKEmePLPr7Vn35cpsdwi-_Hoo-g2wOx-0NoYW31LITAdAU9YA3Z-lnvkO_vjcLptcybwXV9-n51LW6fRVs'
			}, {
				'type' : 'P90',
				'skinName' : 'Гроза',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FBRv7ODcfi9P6s65mpS0mvLwOq7c2GoB650g2eiR94qs2Q3m_0M5YmqgcY6Scgc7ZQuCrli5kLq71sfv7snXiSw0T9wLGPo'
			}, {
				'type' : 'USP-S',
				'skinName' : 'Королевский синий',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09Svq4mFk_7zPITEhXtu4MBwnPCPpdX2jQyx_0prY2HxctKcI1A3NAzZ_Fa8wezv0cW1uZSYnCRj7HFx4GGdwULF8u3CAA'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Пыльник',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cCx9_8izkYy0mvLwOq7c2DwI65Ep2L2Q9N6l3QLjqRdrNWymLNWSJg44YV7Z-FnoxLi60JG76J_XiSw0L_5zRr8'
			}, {
				'type' : 'MAG-7',
				'skinName' : 'Серебро',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhh3czbeDFU6c6JmImMn-O6Nb3Txz9TsZZ107qR84qs3Q3m-0prZzyncIGdIVA4M1vRqFW2l7vrhoj84soh4IEyPw'
			}, {
				'type' : 'Nova',
				'skinName' : 'Зеленое яблоко',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhz3MzPYzhH4uO6nYeDg7nyZbmDxzgAvsYp2rnD992s2Abm_UJuNm2hLYCQJAFqYlnSr1nrxbjqm9bi6-wzwI-Q'
			}, {
				'type' : 'P2000',
				'skinName' : 'Кольчуга',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJfAJB5N2_mo2KnvvLP7LWnn8fupN00u2U8NykigK1rUs4MGH2dtOWdlVoYF7Y-VHrl-jtjZa9upufnWwj5HdqMVWH_w'
			}, {
				'type' : 'MP9',
				'skinName' : 'Темный век',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZt7P7NZTxO09W4mIGSqPv9NLPF2GoFsZMp2-_Dpo2m0Vaw-ERkY2zycNKXcFBoaA7Z8lnolebshMK4vcvXiSw0RlUWR70'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Пищаль',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjVD4ti1lY6FmPnLPr7Vn35cpsR33bmW9I2niQLj_kA9MG2mcNLGdlU7ZQ2F_FG8levohJa96J_Kz3J9-n51SNwWmb4'
			}, {
				'type' : 'CZ75-Auto',
				'skinName' : 'Чаша',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0v73YzJb7dCJmImMn-O6NeLXwWlVsMAk2buQ842l3QPmqhc_YTv0I4aQcgA-aQ3V_1a-krq-04j84sqdvOTuGQ'
			}, {
				'type' : 'M4A1-S',
				'skinName' : 'Рыцарь',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mb-GkuP1P6jummJW4NE_2-zHpN2g3Vfj-kFvZ2ChJtfEJ1M2YF_Sq1LqkOm515fpup-cyHFluD5iuyj8q1fJzg'
			}, {
				'type' : 'AWP',
				'skinName' : 'История о драконе',
				'rarity' : 'covert',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMu9zw3g2yrkVtZ2r6IoSVdAU-ZVrY_lS6lb_ogsDqu57NmCQ27iJx53nD30vgUTXWscs'
			},

		]
	}, {
		"name" : "Overpass",
		"img" : "Overpass.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'M249',
				'skinName' : 'Контрастные цвета',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhzw8zbYS9D9eO-kYGdjrnyMOjTkGkCuJYh3-qUrN-i3Ay3qEo6MGmiJYPGdwI9NVrZqVjsl-y7m9bi66ggGMLw'
			}, {
				'type' : 'UMP-45',
				'skinName' : 'Сажа',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwOP3dTxS_NCzq42Ok_7hPvWAlzsGv5Jy27rDo4r22lG1qhFvazv7IIPAelU2YguG-wC2w7vn08W8ot2XnjjPeAaD'
			}, {
				'type' : 'MAG-7',
				'skinName' : 'Гроза',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhz3MzbZTJQ4dqkm46fqPrxN7LEmyUEup1127nEoN6l3lfm-EZrMj3xIYGTJAU2Ml7Yrlftxui6hJe46pqc1zI97WswWNrq'
			}, {
				'type' : 'MP9',
				'skinName' : 'Гроза',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FBRv7ODcfi9P6s65mpS0mvLwOq7c2GoG65wnib6Q9tXz3VLkqBVpZ2rzIdfGd1c7ZVzU8gK8xuy-0Ja86svXiSw038eOvP4'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Белое напыление',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3Yi19_8yklZm0k_LnNqnFqXhQ78BOguzA45W72AWxqERpMmzwLNeTeg82MlDW-gK4k73tg8K4uszBmnM1vyZzsCrVnwv3309qRyEFCw'
			}, {
				'type' : 'MP7',
				'skinName' : 'Пороховой дым',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFA957PTNfS1H4uO7kYSCgvq6ZbnXwW5UuJ0nju3D8NSs31KwrhdsYmnyd9eSIwVtaQqF_lfswry-gYj84sqn5btZoA'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Пиксельный камуфляж «Город»',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PvRTjlG_N2iq5WZlcj5Nr_Yg2YfscQo3r3H9Nuki1HsrkdlMGuncoCcJAc9ZF_Q_1Dqk-zrhJDqvZ7Jymwj5HeAXIDD2Q'
			}, {
				'type' : 'Glock-18',
				'skinName' : 'Ночь',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxfwPz3fzRF5MiJmYWPnuL5fb7TxG0D7cYk27zCotin2Fay8kA_NmzwI4WTcwZvYwzY_lntwbzv08Oi_MOe5mNtCOI'
			}, {
				'type' : 'P2000',
				'skinName' : 'Цвет луга',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zbfgJF_t2lh4yKmfPLPr7Vn35cppQj3rqS9oit3gyx-UdlYm_wIIaQdg84YAvU_lm9lee9hcO-78zBnCF9-n51xIPJ5Oo'
			}, {
				'type' : 'CZ75-Auto',
				'skinName' : 'Нитро',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZfwPz3fi9D4tuzq4GIlPL6J6iDqWZU7Mxkh6eSo9Wm0FW3_hJrajinJtXDcg82MgnY-lS3leq8gJS56ZXOnCRh6yN2-z-DyFmfHqmu'
			}, {
				'type' : 'SSG 08',
				'skinName' : 'Объезд',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f2-r3Yi5FvISJmYGZnPLmDLbUkmJE5Ysm37-Vpoj32wXs-EJrNmumLNDAclI6Z1zX_Vjqxb29hcO878nPmyRlpGB8sq1srR54'
			}, {
				'type' : 'XM1014',
				'skinName' : 'Смешанный синий камуфляж',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PvRTitD_tW1lY2EqPX4Jr7um25V4dB8xOyXoI7w2gayrUZoYj32IdPAdgY7ZAvV-ljvwevtgJe_6pScyicx7CM8pSGKFSQfI94'
			}, {
				'type' : 'USP-S',
				'skinName' : 'Следы асфальта',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jnMrXVhmpB7dd0jtbJ8I3jkRrk-kA6amCgd9edcg9qaA7YrgLrxeu60JG87prMy3dquCB2tHaJzkHmn1gSOSGslERB'
			}, {
				'type' : 'AWP',
				'skinName' : 'Пиксельный камуфляж «Розовый»',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957PfMYTxW08y_mou0mvLwOq7c2DxUscQkiO2S8I-h2gTm-hA4NTyhdoDDcVU3MwzV_1G4xb_uhpPo6Z7XiSw03MaHlHE'
			}, {
				'type' : 'M4A1-S',
				'skinName' : 'Шедевр',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alfqjuhWJd7ctyj9bM8Ij8nVn6_ERkNT_0IoXHIQI9M1CE_1G3ku6605K-us7InyNhvnQnt37VnkOx1QYMMLJOVeO32Q'
			},
		]
	}, {
		"name" : "Assault",
		"img" : "assault.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'SG 553',
				'skinName' : 'Смерч',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFfwPz3ZTJQ4t2ym7-DkvbiKvWEwT9X7ZAp2riRo46i2lHj8xFrNjynctXBJAY_YQqG81W6le68h8Duot2XnjGENDPp'
			}, {
				'type' : 'UMP-45',
				'skinName' : 'Карамель',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwPz3cjxQ7dGzmL-DkvbiKvXTkjJV7JMp2uzCrIn0jlHhrUBvMjvxIYHAe1U3NQ2E8wftlebv18O7ot2XnuNTwZ3r'
			}, {
				'type' : 'Five-SeveN',
				'skinName' : 'Карамельное яблоко',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5N086zkL-HnvD8J_WDz2pUv8cj2L-V94iniQft-xY_NWzydYOUcA89NVqD-FO-w7i70Me1ot2XnkOsbUS5'
			}, {
				'type' : 'AUG',
				'skinName' : 'Хот-род',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAZu7OHNdQJO5du-gM7SlvP2a-KFkDsD6cN33b6Z84rz0QXs8xJuZzymdYfDclU2M17W_Fm7366x0jzU3_8y'
			}, {
				'type' : 'Negev',
				'skinName' : 'Анодированная синева',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf0v33fzxU9eO6nYeDg7mhN7rXlTgDuMQi3-vCpdjw2Ae2qRZsMG2mINSUIAQ3YlvZ8gW_k7q-m9bi60E-BDow'
			}, {
				'type' : 'Glock-18',
				'skinName' : 'Градиент',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0vL3dzxG6eO6nYeDg7miYr7VlWgHscN32LyT8dmm31XgrxdtZzvzJYDGIFM2Y16D-FfvlOu9m9bi66Oq9HyE'
			}, {
				'type' : 'MP9',
				'skinName' : 'Бульдозер',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FBRv7OrNfTFN--O-kYGdjrmnNb7Qkm4G7cZ3i7nH8I-n3gXl-0duZDqiJdfDelVqZVzW_1Xowe_om9bi66Howf2G'
			},

		]
	}, {
		"name" : "Nuke",
		"img" : "Nuke.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'MAG-7',
				'skinName' : 'Радиоактивная опасность',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhzw8zGZDZH_8iknZCOqPXmPKzfqWZU7Mxkh6fDo932iVHm_xBsZm6gIoHEIQI7ZFHW_FHqx-jn15Hq75TKziZnuSMr-z-DyCCeIKrx'
			}, {
				'type' : 'PP-Bizon',
				'skinName' : 'Радиоактивная опасность',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlfwOP3fyhJ6c-ihombksj2IbTGmFRc7cF4n-SP8dys3FfgqRI4ZD_6d9eQIQNvMAnS_lm7w-y70ZG_vJqbzyFhvCR35mGdwUKuhR019A'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Радиоактивная опасность',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3Yi194sm9kZOfhf7kNoTThGRG5vp8j-3I4IG7ig2y_0ZsMGn2do6QJA4_NQ7Z-VO8xry5hMTvuM7Lm3Iw6XEgsHaMzAv33088hDSHPw'
			}, {
				'type' : 'P90',
				'skinName' : 'Радиоактивные осадки',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FBRw7P3dejhR-M6_hIW0mvbmPLTfqWZU7Mxkh6fHo4rz0Ve2-0U_azvyIIadJAA8aQyC_Vm4w-bn1pXouJnPnSM26XYq-z-DyFErgtK5'
			}, {
				'type' : 'UMP-45',
				'skinName' : 'Радиоактивные осадки',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwOP3fyhJ6c-ihombksj5MqnemWVu5Mx2gv2PrN6s3gPhrUdoNWnwJIXDdQFoNQzV_1e9xebtjJK9u5WcmiRhuXRw5GGdwUKpyEqAXg'
			}, {
				'type' : 'XM1014',
				'skinName' : 'Радиоактивные осадки',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07ODYTjNX59mlgJKCh_LLPrrDmWRf18l4jeHVu9T33lK1qBVvYzynIoaQdQM-aA6Dqwe8kua-gpPtvJmay3RhsyIi5i7D30vgm-UlNbc'
			}, {
				'type' : 'M4A4',
				'skinName' : 'Радиационная опасность',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhzw8zGZDZH_8iknZCOqPjmMrXWk1Rc7cF4n-SP9o6h2gfjrhY-Z2-lcYWde1NsNAmC-APok-zm0Z-_vMvBz3tq7yEmsWGdwUJ6nxi7Dw'
			}, {
				'type' : 'P250',
				'skinName' : 'Ядерная угроза',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhzw8zGZDZH_8iknZCOqPDmNr7fqWNU6dNoxLmQrdX031DhrRY5YGmgLNDBIQU5NFDT_gS-ybi5gp_uu5iayyc2uyM8pSGKb7DLmmE'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Ядерная угроза',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhzw8zGZDZH_8iknZCOqPDmNr7fqX9U65xOguzA45W7ilfm_EVqYWvyIdSRJ1Q_YVzT8lC6wu3vjZW-uc-YwHUwvHZ05Hvaygv330_9fYlOZg'
			},
		]
	}, {
		"name" : "Gamma 2",
		"img" : "gamma2.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "XM1014",
				"skinName" : "Slipstream",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PvRTiVPvYznwL-Nhfb3J7rdqWld_cBOhuDG_Zi7jQ3j-UM6MW6hIY-XelJsaQqDrFa3lejtjZO87cvMmyRnvSVw7CqOmgv3309KvhYMug"
			}, {
				"type" : "UMP-45",
				"skinName" : "Briefing",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3ZDBSuImJmYWfhf7gNqnQqWdY781lxL2X9I-h2wzsqkpqZmigIYOQJ1U4aVzZ-VS2k-bq05C87ZXOmnFhsnQ8pSGKJGHF3CM"
			}, {
				"type" : "P90",
				"skinName" : "Grim",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17OORIQJF_tW7mb-HnvD8J_WEzz4AvMEmiLyV89qm31Ln-kdvYWChdoXDJ1A_Ml-GrAW_k-_qhsTtot2Xnl5g8bQH"
			}, {
				"type" : "Negev",
				"skinName" : "Dazzle",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf2-r3fzhF6cqJkIGRjfvxDLfYkWNFppYk37HE9omniQPk-UZuNzqidY7AIw9rYlrU_1K3kLvu1JLq75ybmnJ9-n51ZvItZMo"
			}, {
				"type" : "G3SG1",
				"skinName" : "Ventilator",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf1OD3dm5R642JgoWFg_74Mq_ehFRd4cJ5nqeU9oim3gDnr0c4ajqnJIOce1M8ZAnR-VG8lOnnjZC9vc-dwCNjuiIh-z-DyLXb1QOb"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Scumbria",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTjxT09q_goW0hPLiNrXuhWhE5cdjg-j--YXygED6qRBsZj-gIoKWd1Q2ZV3S_wC-kLzugZbu75rLnHJguHEr7SuMzRK2gQYMMLImO8cY6g"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Imprint",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf1OD3cicVueOihoWKk8j4OrzZgiUJ65cm3O3Dot-lilbn-EdrZDiidYOXJAFvY1vY-FTow-fq0Je4v5vN1zI97U0IONk-"
			}, {
				"type" : "SG 553",
				"skinName" : "Triarch",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuYqJgJKCluX3O4Tdn2xZ_Isij-iWoY7wiQHn-xI4NzjyJIbBcAM3YFnT_VPtkO3uhsPttZTNzHEypGB8snpeMLkS"
			}, {
				"type" : "SCAR-20",
				"skinName" : "Powercore",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PTbTi5B7c7kxL-bmODxIbjehG5u5Mx2gv2Potj3i1Di_hFtMm2iIYTBJgU3Zg2Er1TvkOvm1566vM6YzSFgsikh7GGdwUIxojBz1A"
			}, {
				"type" : "MAG-7",
				"skinName" : "Petroglyph",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhjxszFcDoV08iknYKKm8j4OrzZgiVSupcn3buZ9Iqh3AOy-0RkY2GmdYOcdwJrM1GB-FW7w-bvjJTotZrL1zI97ch2lL8S"
			}, {
				"type" : "Glock-18",
				"skinName" : "Weasel",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79fnzL-ckvbnNrfummJW4NE_j7mT8Nrw3QXt_RY-NzymIIHGdw87ZlHZrAe-wO-70ZC4uZzNzndjvz5iuyhP0kvddA"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Directive",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH_9mkgL-OlvD4NoTSmWVC_MRzhuz--YXygED6rRFuNWv1I4XBJgU3aF-B-FDsl7jmhJS16Z2dyydhsyRx5XzdlhDiiQYMMLJVFcMKgw"
			}, {
				"type" : "Tec-9",
				"skinName" : "Fuel Injector",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhnwMzcdD4b08-jhIWZlP_1IbzUklRd4cJ5nqfEpon3iwbkrUJsNjimJISSewZoNFHV_VG9k-jvjJ_t786YyCZisiAr-z-DyHMz0KNe"
			}, {
				"type" : "MP9",
				"skinName" : "Airlock",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAR17P7YKAJM7c61nZO0m_7zO6-flT0C7cR32e_A99T23gGxqEA9MWvxcNedcAY7MgqF-QK7wO3pg8K77YOJlyX5QzWtUg"
			}, {
				"type" : "AUG",
				"skinName" : "Syd Mead",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFABz7PLddgJR9diJmYWKk8j4OrzZgiUCu5Yk077Epdmg3QLn8hVpN270IYKUIQU4YgnZqAO9ybrmgJa5ucvK1zI97Wf9hRPh"
			}, {
				"type" : "FAMAS",
				"skinName" : "Roll Cage",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf1OD3dzxP7c-JhoGHm-7LP7LWnn8fvZYpiOjE8NihjVbj_EE4NmD2JIScJwI8Z1-Fq1jtxe_uhZfu7s7AzWwj5HcX23zPaA"
			}, {
				"type" : "AK-47",
				"skinName" : "Neon Revolution",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV0924lZKIn-7LP7LWnn9u5MRjjeyPo4ms0FLkqEU6MDv7JdfEJ1VvYVuD_1frlLrpjZ-6vsvMySFq73Yr4WGdwUIt-GQI9g"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Autotronic",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJk5O0nPbmMrbul35F59FjhefI9rP9jVWisiwwMiukcZiccQBtZVyF_lW7kLzvg8Xvup7Lz3Qx6CUj5iqLnBzhhxkZabBshKaaVxzAUIJQ4Np6"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Lore",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbummRD7fp9g-7J4bP5iUazrl1rY2DzddPEdwFsYgnSqwPqyey6hZ_qvM6dm3pnunFx4n2LmxTj1x9PcKUx0uHhTF2B"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Gamma Doppler",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kvrxIbrdklRc6ddzhuzI74nxt1i9rBsoDDWiZtHAbFBoMgyGrlLsw-_ohsXv6JvMz3Ix6yF2t3mLnBDm1R4faLdvhvyYTVmAR_seWA9jz4E"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Autotronic",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-MhMj5aoTTl3Ju6dBlhf3T-oL8i2u4ohQ0JwavdcTCJxhoaVmG_Fnoxua9hcS4vJrIznRjuHZx7XeLmRflhUxLP7NsgfPNTV-eGeUXSwZKyJQd"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Lore",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Igsj5aoTTl3Ju5Mpjj9bJ8I3jkWu4qgE7NnfyIoDGdg4_YwrYqAS8xrvthcK6vMyfyXBnsiFzti2Pyxe0g0tKbeFrm7XAHjZ37Nzu"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Freehand",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Kmsj5Mqnak29u_dVO07n--InxgUG5lB89IT6mOtXAIwE4YlnW8lW7yebp05Tpv5rJmCQ26Scl7HfanBfjhkkaZrNph_GACQLJ_Utp8Mc"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Gamma Doppler",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjxPr7Dl2dV18hwmOvN8IXvjVCLpxo7Oy2ceNfXJVMgZAyB_lDqlL--15G97Z7AyyZividw5i6MyUeygBpEPLM90PDPHArKBrsJQvdXl_RMjw"
			},
		]
	}, {
		"name" : "Gamma",
		"img" : "gamma.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "SG 553",
				"skinName" : "Aerial",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-JlYWZnvb4DLfYkWNF18lwmO7Eu42k2gfs_EdsamyiLYDEewRvMAmDrlHox-q-gcDp6pjNnyNnvyV37X3D30vg15lPbYY"
			}, {
				"type" : "Tec-9",
				"skinName" : "Ice Cap",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhh3szcdD59teOlkYG0hPb4J4Tdn2xZ_Pp9i_vG8MKi2gKy_Es6N2H0JtfEcFVtNwuBqFjvwevu15Luu5SaynNn7iUitHuIgVXp1hWR0d90"
			}, {
				"type" : "PP-Bizon",
				"skinName" : "Harvester",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf1OD3YS197tWsm460n_bmJb7Cgm5D18l4jeHVyoD0mlOx5UVpZz3xItKRcVI5NFzV8lLvwbu70JPpvMiYzyAxvCkl7XrVmRy_1UtSLrs45ecDBro"
			}, {
				"type" : "P250",
				"skinName" : "Iron Clad",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhnwMzYI2gS09GzgIGHqOf1Pb7dhVRd4cJ5ntbN9J7yjRq1-kNoMDzyJtOQclBvY1zX-1C5webojZTpucnOm3Bg7yFwti3ayxTln1gSOY0jANDF"
			}, {
				"type" : "Nova",
				"skinName" : "Exo",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhhwszGfitD08-1nb-Nnsj4OrzZglRd6dd2j6eY9oqn3gzs-kU_Mj32dtLHJwU9MwzUrlDqlb26hMPutJyfwHJmuyYm-z-DyCU-Nwd1"
			}, {
				"type" : "MAC-10",
				"skinName" : "Carnivore",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0uL3fDxB043mq4GHnvL6DLjQm2Ru5Mx2gv3--Y3nj1H6_ko5Yz2md4TAdAQ5NFGFr1Lsl-vmgMC76smfySE16CIhs3eOmBzhgQYMMLJwa5DPVA"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Violent Daimyo",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goW0hPLiNrXukmpY5dx-teXI8oTht1i1uRQ5fT3wLYKWew5tMA3R81a5xOrpjZ67vZnMnSE1vHEm7Xbfyxfi1RpFP7RxxavJIr0mSF0"
			}, {
				"type" : "R8 Revolver",
				"skinName" : "Reboot",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3cih9_oSJl5mJkuXnI7TDglRd4cJ5ntbN9J7yjRqw_hY-a2v0co-cIwI-YFHR_wO2wuno0MLtu8_ByCNj6HMrti6Im0fhn1gSOcqlDG5e"
			}, {
				"type" : "Sawed-Off",
				"skinName" : "Limelight",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cih9_92hkYS0mPHyDLfYm25u5Mx2gv3--Y3nj1H680Q6MTumJYOcdVNvYVyB_1DsxOi5hsS86pqayiQwvHEnsynbmhC00gYMMLL5vqM2Eg"
			}, {
				"type" : "P90",
				"skinName" : "Chopper",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FABz7OORIQJE-dC6q5SDhfjgJ7fUqWdY781lteXA54vwxgPkrhVqaz30JICUdVNsYlnYr1Pql-7q0Ja16prByXZnsnEjty6Ln0GpwUYb2X3XyHA"
			}, {
				"type" : "AUG",
				"skinName" : "Aristocrat",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFABz7PLddgJD_tWlgI-IhfbgDLfYkWNF18lwmO7Eu9il2ACwqRFuYzrzJ9KUIwQ_YQ6G8wC3yefpjcLo7p_MyCA37HR2tnnD30vglNIOKno"
			}, {
				"type" : "AWP",
				"skinName" : "Phobos",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6_ummpD78A_jOrArNqki1ft8hBrY22lJI_GdgJrZw3Y-FK5yersgcPqvMjLy3JrvT5iuyisReGAWQ"
			}, {
				"type" : "P2000",
				"skinName" : "Imperial Dragon",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zPYgJSvozmxL-CmufxIbLQmlRV-sR2hef--YXygECLpxIuNDztd9WdcFRtZ1vV-QC-lOa80J-6v8vPm3IxvCAi7H_YyxHj0htLPLNr1OveFwurwpmPNg"
			}, {
				"type" : "SCAR-20",
				"skinName" : "Bloodsport",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PTbTi5B7c7kxL-Jm_j7N6jBmXlF18l4jeHVyoD0mlOx5Rc4amClcdXGIAU_NVqFqVO3x7y80ZC-vMybnXprv3UksyrYn0GzhU1SLrs42O1g5dc"
			}, {
				"type" : "M4A4",
				"skinName" : "Desolate Space",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09izh4-HluPxDKjBl2hU18l4jeHVyoD0mlOx5UI6MDunIdOUcAJvNF-D_1Xtl-_t0JDqu5uazXFi7yYk4n6MmBa_hR1SLrs43QiD0nI"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Mecha Industries",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOxh7-Gw_alDLbUlWNQ18x_jvzS4Z78jUeLpxo7Oy2ceNfXJVMgY1HX-QLoxL2-jMK9uZTLnXRlvyJws37Zzka_iEofOu1qjPbKTQqeVrsJQvdPcVsWZg"
			}, {
				"type" : "Glock-18",
				"skinName" : "Wasteland Rebel",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJg4GYg_L4MrXVqXlU6sB9teXI8oTht1i1uRQ5fWv7II6ce1dsYl2F_wC8yL3p0MLuupmbyyM1uykmtiqInhzmgU0YZuxxxavJ__KWVeE"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Autotronic",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJk5O0nPbmMrbul35F59FjhefI9rP9jVWisiwwMiukcZiccQBtZVyF_lW7kLzvg8Xvup7Lz3Qx6CUj5iqLnBzhhxkZabBshKaaVxzAUIJQ4Np6"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Lore",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbummRD7fp9g-7J4bP5iUazrl1rY2DzddPEdwFsYgnSqwPqyey6hZ_qvM6dm3pnunFx4n2LmxTj1x9PcKUx0uHhTF2B"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Gamma Doppler",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kvrxIbrdklRc6ddzhuzI74nxt1i9rBsoDDWiZtHAbFBoMgyGrlLsw-_ohsXv6JvMz3Ix6yF2t3mLnBDm1R4faLdvhvyYTVmAR_seWA9jz4E"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Autotronic",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-MhMj5aoTTl3Ju6dBlhf3T-oL8i2u4ohQ0JwavdcTCJxhoaVmG_Fnoxua9hcS4vJrIznRjuHZx7XeLmRflhUxLP7NsgfPNTV-eGeUXSwZKyJQd"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Lore",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Igsj5aoTTl3Ju5Mpjj9bJ8I3jkWu4qgE7NnfyIoDGdg4_YwrYqAS8xrvthcK6vMyfyXBnsiFzti2Pyxe0g0tKbeFrm7XAHjZ37Nzu"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Freehand",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Kmsj5Mqnak29u_dVO07n--InxgUG5lB89IT6mOtXAIwE4YlnW8lW7yebp05Tpv5rJmCQ26Scl7HfanBfjhkkaZrNph_GACQLJ_Utp8Mc"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Gamma Doppler",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjxPr7Dl2dV18hwmOvN8IXvjVCLpxo7Oy2ceNfXJVMgZAyB_lDqlL--15G97Z7AyyZividw5i6MyUeygBpEPLM90PDPHArKBrsJQvdXl_RMjw"
			},
		]
	}, {
		"name" : "Chroma 3",
		"img" : "chroma3.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "SG 553",
				"skinName" : "Atlas",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-JlZSHluTLP7LWnn9u5MRjjeyPoN-j2gXsrUttZWn3LIPDIw88Zg3R8wfvwei50MLt6ZnKnXswuiR342GdwULx076BRw"
			}, {
				"type" : "Sawed-Off",
				"skinName" : "Fubar",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3di59_92hkYSEkfHLNa7Tl3lu5cB1g_zMyoD0mlOx5UdoNzyiIIPHd1U2NV3QqFm9yL3s0ZO675jNmyRkvyIg53mOlxThgRlSLrs4e6p2_yc"
			}, {
				"type" : "P2000",
				"skinName" : "Oceanic",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zAaAJSvozmxL-ElPL1PbLummJW4NFOhujT8om70FLi_0VpZzr2LYCRewE7MlDV-FG_k--718To6pqbwSQ163Il43ePygv330-1I2r84w"
			}, {
				"type" : "MP9",
				"skinName" : "Bioleak",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZt7P7YKAJA5dO6kYGAqPv9NLPFqWdQ-sJ0xO2Y99zx2FHtrRY9YWjzII6Sc1M-ZFnQqAW5weq908e8v86dnXRjvyY8pSGK5bVi9vE"
			}, {
				"type" : "M249",
				"skinName" : "Spectre",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhjxszFI2kb08-mkYOfhfLLP7LWnn9u5MRjjeyP99z02ge3_0c5Zm_wLYbHdlRsNQvSqVK2yOfuhMC6787Lm3Zh7nEhsWGdwUJ2Zq7hgA"
			}, {
				"type" : "G3SG1",
				"skinName" : "Orange Crash",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZfwOP3dm5R642JmYmHnuP9MrTDl2VW7fp9g-7J4bP5iUazrl1uYmynIYLBd1U2Z1nY_wS4wLrpgJC1uJXAwCA1uiIrs3mInxK30kkecKUx0niP4_PE"
			}, {
				"type" : "Dual Berettas",
				"skinName" : "Ventilators",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf1OD3dShD4N6zhoWfg_bnDK3UmH9Y5MRlhfvSyoD8j1yglB89IT6mOoKQIVQ_Nw6E-FTqlO-60ZPutZ2bmHNjvnIjs3eIn0S_1EpOO7dtgPCACQLJsAlt72A"
			}, {
				"type" : "XM1014",
				"skinName" : "Black Tie",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PDdTiVPvYznwL-Yh_L3J6nEm1Rd4cJ5ntbN9J7yjRri-EJkNjz2JdWRcgNoM12F8gC6wb-60cDvv8nAwSZmuSB04nfUzhDln1gSOamXNP31"
			}, {
				"type" : "Tec-9",
				"skinName" : "Re-Entry",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhh3szcdD4b086zkIKHluTgDLfYkWNF18lwmO7Eu9zz0FCx_EZrYG6gd4WQI1U_NVnUqQe5xeftgZ6_tMmYzSZk63Iq4XbD30vg4jvN4E0"
			}, {
				"type" : "SSG 08",
				"skinName" : "Ghost Crusader",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f1OD3Yi5FvISJlZKGlvT7Ib7ummJW4NFOhujT8om72ADn-Edua2_6d4CRJwdvYVDR-la-xOu-gcO97p7KyyM3s3Ml43yOnwv330-AaacpqQ"
			}, {
				"type" : "Galil AR",
				"skinName" : "Firefight",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczPYgJF7dC_mIGZqP76ML7fk3lQ_MpjteXI8oTht1i1uRQ5fW_1LY-Vc1Q2ZVrT_FDsxejuhZ7v6cnJmHdmv3Yn4HjYlxa-1RhFbbBxxavJuP_di1g"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Red Astor",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf1OD3cicVud2JhoWPluTgPKnummJW4NFOhujT8om7jQTkrkVka2D7ItWQcg45ZgnR-lLolOjp0ZG86smfyCQwuyNwtyrVzQv3308yHtCojQ"
			}, {
				"type" : "UMP-45",
				"skinName" : "Primal Saber",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3ZDBSuImJhJKCmvb4ILrTk3lu5Mx2gv3--Y3nj1H6_UQ-Nj_6JdeRcQE9ZQzW_1W7wOi5g5PvuJ_BwXViu3Ig4HiJnRWziAYMMLJag8KlOQ"
			}, {
				"type" : "P250",
				"skinName" : "Asiimov",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS092lnYmGmOHLP7LWnn9u5MRjjeyPoo_2jgDi_hVrNzr2IdKXJg84YVzW_wW6weq8hJbv7s7BmnZnuHN3sGGdwUIcgRyEsg"
			}, {
				"type" : "AUG",
				"skinName" : "Fleet Flock",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLddgJR-926mI-chMj4OrzZglRd6dd2j6eZpdz02wDlrhFuMjz2INLGcgBoMlCE8gTsxbro0cLuvM7Mn3NgsyR0-z-DyLrumJEn"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Chantico's Fire",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygECLpxIuNDztIoOSIFM9YFrYrgK8l-rnjJPpuZzJnCFiviQqt3nay0SxgRBFabdqgeveFwuw6cQQkw"
			}, {
				"type" : "PP-Bizon",
				"skinName" : "Judgement of Anubis",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0Ob3czRY49KJl5WZhPLLP7LWnn9u5MRjjeyP9t2si1Lh80c4YDzxLNLHdg8_ZQzR_1S3krrsjZG1tZTNzHVqviR27WGdwUJIurA39A"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Tiger Tooth",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK5hSPw98RrTBjUz5sBma9u_8LMSFlC-9tWTLbQpOdgYHJHZXPCAZ1r4v0480fdeLZ2M83jt3irpPWlcCBXorm8MnrSZ-uw8-9ETQO4"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFfY_M78A3TBS414NNcWNak8L5IcQ3u4oqTO-F6Mo1MH8bXX6WGYg6s4xg51agLL5Hb8n_qjH68Mm1YWg2rpDz-PIrjNA"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Ночь",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMop-zfiACA6_PhuUdO_4rY5JV2t49fYO7V-ZdFJFsSBXPWAYwqp70s6gqRZfJyOqC_viSXtaGteXkG_8mxXmvjH5OVitTZMMg"
			}
		]
	}, {
		"name" : "Chroma 2",
		"img" : "chroma2_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "AK-47",
				"skinName" : "Элитное снаряжение",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhUfQp4A3-EBg_7cNqQdqJ-7oULlnx4IbPZ7YkNN9IGMnSC6KBYQ_4v0kw1PdZJ5KNqS--2Hy4aWgPWRPq_XVExrEYKUC6xQ"
			}, {
				"type" : "MP7",
				"skinName" : "Броня",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLSKMSZYfxSVPrVSSOc7-QfoDDU818tqU9-iyLcHO1u6qofFNrF5MdFOGZXUC_-DbwCp608x06VUK5TYqCzv3nvtO2oJDUXi82Ia2LjQjcMi_PQ"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Бронзовая декорация",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcwn9A7JRUu8_yxv8CDU55MJcWdKy_q4LFlC-9tWTLbIrN9hIHMfQW_7SNV__4hg9g6JUJpba8yjo2yy9OjxZWxLq_mkNy-KZ-uw8pmry-JI"
			}, {
				"type" : "P250",
				"skinName" : "Валентность",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDzZ2TRSQVPBhX_o04Af5Gxg_7cNqQdqJ-7oULlnxvNeTYbgkZt5JGcTTWKWFNQD84h861qZdK8bYo37v1S_qbG4PWkHs8nVExrFKJNMnjg"
			}, {
				"type" : "Negev",
				"skinName" : "Боец",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51MeSwJghmfzvMBKdbSso9-Af-EBg-4cBrQOi69qkBLBLutdeUYeUpMt0ZFsKCDvbXYw-pvk9sg_BaKJyM8SnujC3oMmwJCULs5Ctaz7ibAjCv"
			}, {
				"type" : "Sawed-Off",
				"skinName" : "Оригами",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oNfSwNDhhdDvBFJ9NXeI_8AfqDxg9-s5kVdq_yLcPLlSr296Xced5Lt0aHpLTCaPQYF3460Nr1PBbJsHY8Xy7iXngaGxZWRfrq2kNy7CH6eF1wjFBAh5S4Mo"
			}, {
				"type" : "AWP",
				"skinName" : "Бог червей",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMSZYcxPSPrRJVfs_ywTlDi8m18tiRtCzub1ffgq8sIOUO-YlN9AYHZLYDveFYQr5vEo81qdYJ5OAqCi71SjgbG8UG028p6V0PDo"
			}, {
				"type" : "MAG-7",
				"skinName" : "Жар",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeTiDzRyTQnDBvdhTvA-_Af4Nio37M52Wei69qkBLBLovYDAZuIpNItFGMOCXvXUYA34uEs-1fAJfJaPqS68jC24bjhbUxDj5Ctaz0CuSGif"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Поул-позиция",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhkZzvBG_cLY-Uo8QvlGi495vhvXdC-44QKKE644ZyXM-QsZYlFS8nSDKCPNQz-7xhq1PAMJsaJp3vujCTsa2sLUxK68mlWhqbZ7RHTLq9k"
			}, {
				"type" : "UMP-45",
				"skinName" : "Гран-при",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uOfPhZQhmfzvXDLBhTvQ58RrTBCI24dJua9u35bwDZw675daVO7glZt1FG5PYD_WGbwCsu01rifNUfZGP8Xjn23y9PGYKWUL1ujVTGwldwdc"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Обезьянье дело",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59PfWwIzJxdwr9ArVhWvws8RvpHyI818ViWta49oQLLFi28d-pb-FuZ41SH8nTC6LSZQCvvxg70vBUJ5WL9HvsjyzhaWtfCRLt_DoMmuaGvbBu1HFWHSawKQYvKQ"
			}, {
				"type" : "Galil AR",
				"skinName" : "Эко",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPqdfUPw2yw3vBhg_7cNqQdqJ-7oULlnxsdeUMrMpZNodSseEWKDVYVz6uB841vNUK52Aonnn3S3oPGkPWRPor3VExrHwzwdDoA"
			}, {
				"type" : "FAMAS",
				"skinName" : "Джинн",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhmYzvEAK1fT8ow_QbiNio37M52Wei69qkBLBLvsNTCO7koMI1OTpLXX6PTMg377Bo6gfIIKpeL8S-52yzrPGZcWxrt5CtazzU75Wol"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Скоростной зверь",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHYN4N5zUcWJ9b4HOkiA6deSavVxX4QdXZeFRPPQYlivuB1u1KFeJ52AoS7q1SjgbGdbWRG_-ToHzrCO7Odph2xCEXGu7bLbJHLl5no"
			}, {
				"type" : "MAC-10",
				"skinName" : "Неоновый Гонщик",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeDkYAhkZzvPAKMPDMo08QfiGy427dVcWN6x_685JV2t49fYZrElZI1MH8KFXaWEMl-o6ho6hPMJfcaMpny5iyXgOjtZXxa6-j8CyvjH5OWd_Q3jAQ"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Волны",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK1hWPoq5ATpGxgi4MZwUYOJ-7IBIUiA6NOEZOUyZItNFsWGU6WDMlus60wwhaIIK8fb8XnmiCi9aW4JXBHi_WoByuTV7Kwr3DhWsXJSNg"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Волны",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY_E15BjgDDUN-M9iR9LiyLcPLlSr296Xced5LttNSZbQW_XUZ1v7ux4xgvILKcCN8yPo3S3ubjpbXhHuqGwDnu7R7uZ1wjFB8ZY2tGk"
			}, {
				"type" : "★ Bayonet",
				"skinName" : "Волны",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Nfq6PjJzTQXPPqRRTOU28RrTGS8z-8Iwa9u_8LMSFlC-9tWTLbYsMIxESsSBCPCDZgD44x1p06NULMSPo3652i-6O2kCCkHu-W4CneeZ-uw8JM0c440"
			}
		]
	}, {
		"name" : "Chroma",
		"img" : "chroma_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "Glock-18",
				"skinName" : "Catacombs",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhkZzvFDa9dV8o-8Qn4ATM95MtcWN6x_685JV2t49fYYOZ_Y94dHsfQWfHXZQqvuBk9gqUOfpSBpSy83Sq6bGkMD0e6_m8NzPjH5OVwKWjZhQ"
			}, {
				"type" : "M249",
				"skinName" : "System Lock",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52ZrfsDzRyTQmQVflhT_Ax4Af-Nis77893a9u35bwDZ1_msYWTNLB_Nt1KH8LUCPTVZg__vExp1qNdLJTYpyy8jy66Mm1cWkD1ujVTVFVP0W0"
			}, {
				"type" : "MP9",
				"skinName" : "Deadly Poison",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLqKMyJYfxSbPqRbXfE27Tf8Bi4h58lcWN6x_685JV2t49fYM7crNtFLGZXXWv_TNQ6v70s71PVaepGO8iK81CvrOW0CXRLuqG5QyfjH5OVWTbGSlQ"
			}, {
				"type" : "SCAR-20",
				"skinName" : "Grotto",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oN-KnYmdYcxX9EqNfTqdqywTpCCwN5M5kXMOJ-7oULlnxtISUOrIvMd5PF5KBWfKBMwD8uU0_gfQOeZfaoSnp2SrsPmkDXxvi-XVExrGSZo1ewA"
			}, {
				"type" : "XM1014",
				"skinName" : "Quicksilver",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5jObLlYWNYcxX9Ga0PDKRuyxvlDisz18tqU9-iyLcHO1u6qoXHYLEkMIsYHJLYCKLTNw6p6hk5gagMfZfbqX7q2SrgOD0PWkHoqzoa2LjQ78kjYhs"
			}, {
				"type" : "Dual Berettas",
				"skinName" : "Urban Shock",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5-OOqhNQhkZzvHDalKWeYF4RruCCkh_MhxWei6_rwOPWOz5cCRZq54M9sfFpSEXPOCZQ2p4hkx1qUIKMeMoCPti366ODsKXELj_W9RnuSCpPI11fqKGsLr"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Naga",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcxX9BaVfW_k_ywbtDiYN5M5kXMOJ-7oULlnx5obHM-F4ONtJTcHYU_LXYg317Ew-0fRdKpyJpSLp3yThazgICEHo-XVExrHsEocDmg"
			}, {
				"type" : "MAC-10",
				"skinName" : "Malachite",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeDkYAhmfzvPAKMPDMo39QTtCi87_MJcWN6x_685JV2t49fYOrh4Y9pPGcjSWPPTZ1qs7xhtgqZfKJaJ9nvs33zgOGlZDRHo_TlWy_jH5OWEIq_jLA"
			}, {
				"type" : "Sawed-Off",
				"skinName" : "Serenity",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oNfSwNDhhdDvBFJ9NXeI_8AfqDxg27dFia9u_8LMSFlC-9tWTLbl6ZowZH8SGWKCGbgupuR48iaMPLcPYpn_t2C2_PGdcXhDjq24EyuOZ-uw8CazJ5C8"
			}, {
				"type" : "AK-47",
				"skinName" : "Cartel",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzZ2TQXJVfdhX_Qo4A3gNis77893a9u35bwDZw66s9CTOuYoY98eS5HTWvLQZFj6uUg_hKNbL8GApXu5i364M21cW0H1ujVTyBd8HaM"
			}, {
				"type" : "M4A4",
				"skinName" : "龍王 (Dragon King)",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTQmWAPRhXfs58Rv4GyY-18tqU9-iyLcHO1u6qtGUZ7krM9pKF8mGXvTUYViouUI50vUPJpSPpnjuiHjtO2oDXBe4qGwa2LjQ-8EAblc"
			}, {
				"type" : "P250",
				"skinName" : "Muertos",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDzRyTRSQVPBhUfQ08AngCBg-4cBrQOi69qkBLBLv5dGUNrEoNtwfS8fSXPKFNQ-s6x1t1vALJ5KKpijn1Xi7PzoKWUXs5Ctaz4FQJ-4V"
			}, {
				"type" : "AWP",
				"skinName" : "Man-o'-war",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYcxPSPqdSU-cjywTlDi8m18tiRtCzuehScVm-4YKQNuQoZIlEGcfRUv6Abgv77E8w1PVZLpyO8SPn3yTpM24UG028omRZCoA"
			}, {
				"type" : "Galil AR",
				"skinName" : "Chatterbox",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPqdfUPw2ywnuGyYh4chta9qz87ITJGOz5cCRZq4oN45OF8eGWKKAY1-u4x081vQIe8eN9izojCjpP2xYCRXj_G4MyrSOpPI11eqEdWL_"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfjACs37PhuUdO_4rY5JV2t49fYYLApNolKHJPTC6XTZAD76UM506lcJpLbpCPq1S27MjxZUhu9qGgCzPjH5OUcQbPO0g"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Doppler",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY_E15BjgDDUN-M9iR9LlyLcPLlSr296Xced5LotKFsiEX6KAN1uvu0I5hPVVL8GLqSi7j3_qOjhfCRDu-zoDnu7RubF1wjFBhWuhfm0"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF9QXTEyIw-sZcWN6x_685JV2t49fYO-YpZNpESciCUvCGYV316Us9ifJZe8OPoSK93iTgb2xcChbu-zlWnPjH5OXGTTUtRA"
			}
		]
	}, {
		"name" : "Revolver Case",
		"img" : "revolver.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "R8 Revolver",
				"skinName" : "Кровавая паутина",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3eSR9-9m0h7-GkvP9JrafwjsHvsQmjrmUrI_00FHg_EY-YzzycNeSe1JsZw7R-QS6kry5hMDu6oOJlyWSzPI-Lg"
			}, {
				"type" : "AUG",
				"skinName" : "Ricochet",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAZt7PLddgJI-dG0mIW0m_7zO6-fkjMHsZUgi72T896m0VCwqEBlMD31IIPBcFc_ZlrY-1m2wLi6hpHouYOJlyUksb3lzA"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Corinthian",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH7du6kb-ImOX9Pa_Zn2pf18h0juDU-MKm2ley-kE6MGGnJIOXclA2ZQ7Vr1Lrlem8gpfvuMzOySBjsyd3s3vUgVXp1hBYWgPe"
			}, {
				"type" : "P2000",
				"skinName" : "Imperial",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJfAJSvozmxL-CmufxIbLQmlRD7cFOhuDG_Zi7iwDjrkFsZGrzI4GXd1NqYA7Zr1ntl-i7hJK7tMmbnyZgvyIhtniMmAv3308P9JxMBw"
			}, {
				"type" : "Sawed-Off",
				"skinName" : "Yorick",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3di59_92hkYSEkfHLPb7ShGRc6ctyj_v--YXygED68xA5Mj3xIYHEJFJoMA7VqFm7w7_phMK-v5jBmCNg7HIq4SuIyR2xgQYMMLK-nAIxoA"
			}, {
				"type" : "SCAR-20",
				"skinName" : "Outbreak",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PvRTi5B7c7kxL-BgvnzP77DqWdY781lxL3Ho9il2lK1qEY_Mmn3JdfEJwFqM1nXqFO_xbvq1sDouZjIzXswviQ8pSGKZe0NLy8"
			}, {
				"type" : "PP-Bizon",
				"skinName" : "Fuel Rod",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0Ob3czRY49KJmo-TnvjhIITdn2xZ_It1ibrA89mijlXk-UdoZ2GhJoLAdlJqM1DY-Vnvwb_shp_v6cjNzyE2pGB8st2-4asr"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Retrobution",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goWYkuHxPYTDk39D58dknuDO-7P5gVO8v11rNj_3doSVIA5taAmFrlXqx-rphJ66vc7AnXtg6Cgj43zdyRPm0h9NcKUx0kOQhc3i"
			}, {
				"type" : "Negev",
				"skinName" : "Power Loader",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf0Ob3fzhF6cqJnY2blvTgDLfYkWNFppYi27zHo96i2lftqRFrammlLYCScQc4ZVvS-VO-wea9gcS075rLwHR9-n51CuXQpfM"
			}, {
				"type" : "SG 553",
				"skinName" : "Tiger Moth",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf1OD3YjoXuY-JgImMkuXLPrTFnlRd4cJ5nqeQrYjw2FHhrkNuam73JdeTdQU9YVjT8gS4xei51MS9uZTPnyE17ygq-z-DyOkB2OsD"
			}, {
				"type" : "Tec-9",
				"skinName" : "Avalanche",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf1OD3YjoXuY-JgImMkuXLPrTFnlRd4cJ5nqeQrYjw2FHhrkNuam73JdeTdQU9YVjT8gS4xei51MS9uZTPnyE17ygq-z-DyOkB2OsD"
			}, {
				"type" : "XM1014",
				"skinName" : "Teclu Burner",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhjxszcdD4b092glYyKmfT8NoTdn2xZ_It0iL-Wp9r02gDk80c-NWylJ9WdIQ5tZliDrlnrkO3ogZS57ZrJwSdgpGB8sqmt10R9"
			}, {
				"type" : "AK-47",
				"skinName" : "Point Disarray",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08y5nY6fqPP9ILrDhGpI18h0juDU-MLx2gKy8xFqMDr2IIORcAU6MlnS_Vjtxu7rhcK-u5-cyXZqsiEg7HnUgVXp1kpd_x09"
			}, {
				"type" : "G3SG1",
				"skinName" : "The Executioner",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf0Ob3dm5R642JkZiOlOLgOrTfk3lu5cB1g_zMu9ili1Kw_kY5YTqndo-SJwc4Z1yG_ge2lb27h5C_vJzJySBrvCMntnnD30vg20AigU4"
			}, {
				"type" : "P90",
				"skinName" : "Shapewood",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17OORIQJR5N2mkZeEmPPLP7LWnn8f7ZIm3r2Zodz20A22-hFkYDumLITBcFA4ZQqFqFTvx-nujMW4u8-dymwj5HeKrOWJ7A"
			}, {
				"type" : "M4A4",
				"skinName" : "Royal Paladin",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW0865jYGHqOTlJrLDk1Rc7cF4n-SP8dSm2gHk-UtoZGv7I9DBcVM5ZV_XqFe_lervhsS76sjIyCBhviYg52GdwUI8s6PzHQ"
			}, {
				"type" : "R8 Revolver",
				"skinName" : "Градиент",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3cDx96t2ykb-ZkuH7P63UhFRd4cJ5nqfA89uiiVGx8hVkYWDwItOSdwc-M1DZr1bowb3u18Tqus-fmCM17CQn-z-DyMgtirei"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Пиксельный камуфляж «Лес»",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_oz-A3oNis77893a9u35bwDZw3rsYrPZ7R6M95KHMPQXv-Gbgv5vEg-1aYLKJCLoSPr2iW8OD1bCUf1ujVTxaDwZJQ"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlZG0mP74Nr_um25V4dB8xOyV8Nmk2gLnrRA5ZjjzJNCce1NsZ1_T_le9yO7qhJG96pzLynZlvig8pSGK0BpTrQ0"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NE_0rGVoNvzilG3qkduNmCnd4eSdAE3aVuD_Ve8wOe7hpLuuJuYmyRivj5iuyi_zJQcBA"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Кровавая паутина",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWZU7Mxkh6fF8Yqmiw3l_BdrZ2vzIo-QdQBsaA2B-lC3yb_v0JW_uc_JmHQ16yYh-z-DyKLv5rKC"
			}
		]
	}, {
		"name" : "Winter Offensive",
		"img" : "winter_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "Galil AR",
				"skinName" : "Sandstorm",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPrNfUvEp4Af-BBg-4cBrQOi69qkBLBLvtIrPMLcrMt8ZGMWCDP6CZl3_uE45gfVee52NqSm-3C-7PzteWUK45Ctaz0ith5CI"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Kami",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59PfWwIzJxdwr9CblhV_Q3_TfgACA6_PhvVcWx8vUFLAjmt4uQZrQtYttMTMbRXvXQYgH64kwx0aRaepHfpXzt3yq8Mm8LRVO1rSl_NBek"
			}, {
				"type" : "M249",
				"skinName" : "Magma",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52ZrfsDzZ2TQvAEqlaVfQ0ywTlDi8m18tiRtCzubheKA_n54vFNrR_Mo5IGsPRDPaOZguouxo8ifIMfpyBpyK9j3vgbzoUG028nK1bRDI"
			}, {
				"type" : "PP-Bizon",
				"skinName" : "Cobalt Halftone",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Pfm6PghmfzvWFLJPU_wp8TfkCCs0_MhtUei6_rwOPWOz5cCRZq55M9wYTMSCC6SEMAipu00-0qFZfcGL9Cm8jHm7P28JWBq4r2MFzuLTpPI11aeG_vDx"
			}, {
				"type" : "FAMAS",
				"skinName" : "Pulse",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhkZzvEAK1fT8oq4QT_DBg-4cBrQOi69qkBLBK55dbDZ-Z_ZN8eH5ODDKOAYwyu7Rg7iaFee5WAoSvr3STpPmcPUka45Ctaz43kx0xd"
			}, {
				"type" : "Dual Berettas",
				"skinName" : "Marina",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5-OOqhNQhvazvPALJXUvQF5x3iGy4h7fhvXdC-44QKKE644ZyUYOR6M9kaGpGGXqeDNACvvx060vNde5CKoyzo3Ci4OT8KXxPsqGIGhqbZ7cfEGYZ8"
			}, {
				"type" : "MP9",
				"skinName" : "Rose Iron",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLqKMTpYZgzNE65HY-c15w3TBDdr18tqU9-iyLcHO1u6qtPHO7d6MdtIH8SFCKePYF2o7Ek61qUOJpHcqC_v2iW_aG8CDxu__Tga2LjQTMcg99M"
			}, {
				"type" : "Nova",
				"skinName" : "Rising Skull",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0DzRyTRfJFKxSY_s14gnTBS414NNcWNak8L5IfAnn4IbEN7IoYYwYTsiDCfWFbgqv6k5shaJVJ8OOpSLs2n_pPTtcCg2rpDz3X_s53g"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Guardian",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHZ_-_hmWNKx9rUSFlC249qCXOx9co8ZAcGBCaTUZgn76k08iKFULsTapSntiXjvMj1cDxTp-jkDybKOsrJuhGsIAy_nGTrvCT4"
			}, {
				"type" : "P250",
				"skinName" : "Mehndi",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDzRyTRSQVPBhTvA8_QbpDRg-4cBrQOi69qkBLBLm4NPFO-J_Nd5NTcbVXfCDYwyv60w4gPRUepSJ9H69jijrM2cOCBXs5Ctaz0X8rQo8"
			}, {
				"type" : "AWP",
				"skinName" : "Redline",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqNRXuc7ywTlDi8m18tiRtCzubgAewy84YSXYLEtNdkeG5HTWqKONwH56kM51fJZLJKK83i5jHnta2oUG028bEnLGFg"
			}, {
				"type" : "M4A4",
				"skinName" : "Asiimov",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTQmWPqFNVfg14jfhDCM7_cpcWNak8L5IK1nu4NOSMbB_MotLS8KGDqXQYQj7vE871fddJpeL8n_vjyy8PmxZDw2rpDwJTGGyIQ"
			}, {
				"type" : "Sawed-Off",
				"skinName" : "The Kraken",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oNfSwNDhhdDvBFJ9NXeI_8AfqDxg969NsRMK754QKIFu38O2aYvJ7ZcZLGcGEDPOPZwiovBg-0ahbL5OI8y293im8Pm9bWUW9_D5XnufSv7o5nC9IFJFCr8KS"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Tiger Tooth",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK5hSPw98RrTBjUz5sBma9u_8LMSFlC-9tWTLbQpOdgYHJHZXPCAZ1r4v0480fdeLZ2M83jt3irpPWlcCBXorm8MnrSZ-uw8-9ETQO4"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFfY_M78A3TBS414NNcWNak8L5IcQ3u4oqTO-F6Mo1MH8bXX6WGYg6s4xg51agLL5Hb8n_qjH68Mm1YWg2rpDz-PIrjNA"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Ночь",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMop-zfiACA6_PhuUdO_4rY5JV2t49fYO7V-ZdFJFsSBXPWAYwqp70s6gqRZfJyOqC_viSXtaGteXkG_8mxXmvjH5OVitTZMMg"
			}
		]
	}, {
		"name" : "Falchion Case",
		"img" : "falchion_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "Galil AR",
				"skinName" : "Леденец",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPqdfUPw29RrTGSYg_M5gWNKlyLYDLVWq6e2aYvJ7ZcYeSZOEXaCCbgH_6x0x1akMepLao3jp2yq9b20DWRHt_T0EzLLS67c_nC9IFLYL1mrZ"
			}, {
				"type" : "Glock-18",
				"skinName" : "Горелка Бунзена",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhmYzvFDa9dV6Riyw7gCCo3-_hhWMKzyLcPLlSr296Xced5Lt0aSpTSWaKDNwr_7UI706NYJpSN9X-91CS7PmtcWkLpqGtXyu_TvOF1wjFBmRSH7Cw"
			}, {
				"type" : "Nova",
				"skinName" : "Лесничий",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0DzRyTQrNF6FhTvQ08w3-Nis77893a9u35bwDZ1ns4YuSMOQoN4xJGMDXWv-EZAv-u0k-iPQLKpzY9Hjq3n68PWgIXBv1ujVTb3I2RPc"
			}, {
				"type" : "P90",
				"skinName" : "Элитное снаряжение",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMyJYYl2SPq1fT-E_5hHTBS414NNcWNak8L5ILwnn4tTCO7l_OdoaSZHYCfDTYlr56EM5hPMMe5WI8ynq33m_Oj9YXQ2rpDwHd5SOPQ"
			}, {
				"type" : "UMP-45",
				"skinName" : "Бунт",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uOfPhZQhkZzvXDLAKCcov5BrjCDUN5M5kXMOJ-7oULlnxtIaVZ7goM9pMTMTTXfbUNVyp609pg6hVJseJ9Svr3H6_bGgNDkDj8nVExrHq5qP_Iw"
			}, {
				"type" : "USP-S",
				"skinName" : "Закрученный",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhX-AF4Rv8Njcg58BxUcSl_q05JVW47Mapb-FuZ41SFsGDDqOBbgiuvktriKRdLcfb8njp23vqPT1ZXEXqqDpSmreGuuFrh3FWHSaeZn8kMg"
			}, {
				"type" : "FAMAS",
				"skinName" : "Нейронная сеть",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhmfzvEAK1fT8o--xz_Nis77893a9u35bwDZ1i8stTHOrIrOIodTMXSD6eGYFv1v0g9h6cLfpaLpCzt2XvrbGYICRf1ujVTMR8h6dA"
			}, {
				"type" : "M4A4",
				"skinName" : "Злобный дайме",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTQmWAPRhWeMz-DfoCC4_8chcWN6x_685JV2t49fYYLIsOIodHcXSCfbSbgD96Bhp0ahaLMSPoy68j3u4M2oPXhPjq2wFnvjH5OWQSzhsMQ"
			}, {
				"type" : "MP9",
				"skinName" : "Рубиновый ядовитый дротик",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLqKMTpYfxSbPq5XSOc18w3iNis77893a9u35bwDZw--tNDDYrd_ZNtNTseDDKKDMAmp40tqifBdfpTd8ny8iX_vPmxZCEL1ujVT23-_sLM"
			}, {
				"type" : "Negev",
				"skinName" : "Крикун",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51MeSwJghkZzvMBKdbSso7-gblAS4-6dNsRui6_rwOPWOz5cCRZq4oMtlMHMnTX_HVNVuvuRkx0vBcK5CP83u-3Hi9OD9fXxvp8zkBnO-CpPI11SU0272-"
			}, {
				"type" : "P2000",
				"skinName" : "Пистолет",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQXTPrAMDKVqywrjBioN5M5kXMOJ-7oULlnxt4uQM7F-MIpEGZLXU_PUM1j47Eg4gKVeLcPc83y9iyTqPm8PDkbu8nVExrGZVdfHFg"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Желтый жакет",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhkZzvBG_cLXco5_An_HS4o7dVcWN6x_685JV2t49fYZ7MuM9wfGMHSCfXVZg_1ux9q0vcJKpKIqHnr2yW6PWkCDRHo_2pQzPjH5OV2yXnMiA"
			}, {
				"type" : "MP7",
				"skinName" : "Заклятый враг",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLSKMyJYfxSVPq5bUeYz5zfgACA6_PhvVcWx8vVRewzosNfBMuEuN9BOGJbUW6LVY137vE45gfVfeZWJo3nujyvpbmZbRVO1rQV_0bh4"
			}, {
				"type" : "SG 553",
				"skinName" : "Сайрекс",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oM7bgZghkZzvRBvULD8o57RrpERg-4cBrQOi69qkBLBK64oCQYbF5NIxEF5XYD6SBNQmovB45gvRfLJTYpy3sjnzoPWcIChe_5Ctaz3AB5wK9"
			}, {
				"type" : "AK-47",
				"skinName" : "Аквамариновая месть",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhX_ov5gnrDBgz5NNcWN6x_685JV2t49fYMbd5NI1LS8PYDqWENVz-7B1u1albfcGP9Xnp2HnvbGsIXhTu-z5VyfjH5OUN6wKZjw"
			}, {
				"type" : "AWP",
				"skinName" : "Скоростной зверь",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqhHTPAoywrpCDQm18pmUN6j-oQKKE644ZyVO-IsMdFJG8DZXKWBZVj67ExugfNVe8CJoivr3Su_PmlYCBrrqz0HhqbZ7W1KaKdj"
			}, {
				"type" : "★ Falchion Knife",
				"skinName" : "Ночь",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhcwjBCalRUsop-zfiACA6_PhuUdO_4rY5JV2t49fYOrl4NtFNTpTSUvKPMgirvhltgqlfLsaPqHnt23vrP24CU0C9rmpQmPjH5OU_T7XgZQ"
			}, {
				"type" : "★ Falchion Knife",
				"skinName" : "Патина",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhcwjBCalRUso75TfqBjUx7cNcWN6x_685JV2t49fYMOIlON4YSZPTU_PTYA_97R851qFYecbdoXzsiCu7Mj0ICBG4-z0BkfjH5OUx1yeioQ"
			}, {
				"type" : "★ Falchion Knife",
				"skinName" : "Городская маскировка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhcwjBCalRUsop5Df4CDc319JxVta4yLYDLVWq6e2aYvJ7ZcZPG8HYWKXVbl2r6009hPdafJaKqX_o2CTubG4NWxXi-zgAkOWE77s9nC9IFBG64vUO"
			}
		]
	}, {
		"name" : "Operation Vanguard",
		"img" : "avangard_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "G3SG1",
				"skinName" : "Murky",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Z_CyYQhmfzvFUrNZDco34RrnEBg-4cBrQOi69qkBLBK954aTO-QsZd9MS8LZX_SDYQ-p7xgxhqRee8SOoXzt3H-6OmxYUxLr5Ctaz2ByeXjz"
			}, {
				"type" : "MAG-7",
				"skinName" : "Firestarter",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeTiDyR3TQnDBvdhWvwo8QrlHTM35vhvXdC-44QKKE644ZzAN7B9ZtoZS5LVWKeBMAj66k06gPRcKJDd9Hu-2HvsaTgNXRDo-G5WhqbZ7eH05by4"
			}, {
				"type" : "MP9",
				"skinName" : "Dart",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLqKMyJYfxSbPqNWWeMo-wbTBS414NNcWNak8L5IfwXn5dDDO7MpM98ZHJWEXqSBYA_8vkhu0_daKsfcpii53X69bD9YUg2rpDwPQXfqow"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Urban Hazard",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59PfWwIzJxdwr9ArVhWvws8RvpHyI819JxVta4yLMHM12t4O2aaud0dLcQToKHD-iCYw_07E1sgqILfsOIoCnrjijoaGYLWBO5_ToDmOSOvuM9gmcRQ3O2s6zS_pb-hwV-"
			}, {
				"type" : "UMP-45",
				"skinName" : "Delusion",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uOfPhZQh0YjvXDLAKCco-uR7lGi495tRcWN6x_685JV2t49fYMLN9Zd8ZFpXYCKCEYlyo40xuhPdee5bc9Svu3njsO2kCWULs_21SyfjH5OWma4QvFA"
			}, {
				"type" : "Glock-18",
				"skinName" : "Grinder",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhmYzvFDa9dV8o5-wHgDCMN5M5kXMOJ-7oULlnxvYDDMbAtNIlNS8aGUv-HYFyv601ugvMPJ5HY8yLs2nvpPWcMWEDtqXVExrF-qWWg-A"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Basilisk",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_QrywW4CHYh18ViR966_qgNFlC249qCXOx9co8ZAcHYWfGGMg_470w9gKFeKJPcoSnojiq_PDwKXEDsrz8AnrWO7uE41G0IAy_nDZWl0i0"
			}, {
				"type" : "M4A4",
				"skinName" : "Griffin",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTQmWAPRhW-cz8g7lBxg-4cBrQOi69qkBLBK-5dDBYLB4MtgZS5HQCKeEMg_840sxhKMJfJaMqSq5iCXvPWxeXRDt5Ctaz9MW9lnQ"
			}, {
				"type" : "Sawed-Off",
				"skinName" : "Highwayman",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oNfSwNDhhdDvDEJ9NXeI_8AfqDxgw5MZgX9C5-785JVW47Mapb-FuZ41SG5HYCfXXZA6u7UM406MMKsDao3_rjyvvMmgOUhu_qT4Am-_Tv-NsgXFWHSZ8v7z9Aw"
			}, {
				"type" : "P250",
				"skinName" : "Cartel",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDzZ2TRSQVPBhX_Qo4A3gNis77893a9u35bwDZ1jpt9eXMrErOdtITpPYDP_XYgmsvB44gqYLfpHYoS7s1Xm7aG8NXBT1ujVTX8t-hgs"
			}, {
				"type" : "SCAR-20",
				"skinName" : "Cardiac",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oN-KnYmdYcRH9EqNfTqdqywHiHSIg_sJtQN65-YQKIFu38O2aYvJ7ZcZFGZTZC_SANVqs7Eo_gqFaLZWB8SLs23ntOGpeXRTtqDhWmrXSueBinC9IFNKrHl9C"
			}, {
				"type" : "XM1014",
				"skinName" : "Tranquility",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5jObLlYWNYcRH9Ga0PDKRuywvtGy4m6dRcWN6x_685JV2t49fYM7YsZd5PGMiGX6SDN1v7vBg9g_Bfe8eNpSu53nnvMjwCWxDorGgEnPjH5OUhOLJtjw"
			}, {
				"type" : "AK-47",
				"skinName" : "Wasteland Rebel",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTRDQCKJLSPAF9QO4Xhg-4cBrQOi69qkBLBK5tIqTM7F5Y9lMFpTQU6SEN1_96Es51PJeLMGKoSK5jyzuODwDCEe65Ctaz8HGPHc9"
			}, {
				"type" : "P2000",
				"skinName" : "Fire Elemental",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQfXPrAMDKVqyw7lGyIN7ctmWdK447oKFlC249qCXOx9co8ZAcGFX_HSYl30vEprhaAIKZSK8yvm3y7qPWlbChburDpWnLSH6-Bq0DwIAy_n77aVEso"
			}, {
				"type" : "★ Bayonet",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Nfq6PjJzTQXTPq9XUPA-ywTlDi8m18tiRtCzueJUeQTpstfEYrF6Md8aS5HXXfaEMwmv7hhqiaQLK5DYqHvnji3pPW4UG028JI0XXjw"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AKFhWvQ-8TfgACA6_PhvVcWx8vVQLATm54DFNLAqZYkaTMPUD_GBZwqu6E081vUJeseApC7r2XzgaGgNRVO1rQU2Lej8"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY-8_9hrtNis77893a9u35bwDZwnqsITBZeIqNdxLGpTYWKWCYwuvuUI-galde5SJoXy5iSq8PWgLUhH1ujVTthpPV9Y"
			}
		]
	}, {
		"name" : "Operation Phoenix",
		"img" : "fenix_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "UMP-45",
				"skinName" : "Corporal",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uOfPhZQhkZzvXDLBhX_oo5Af-CCsN5M5kXMOJ-7oULlnxsIuUNOZ-NokaHsPQCaOFNA-ovhps1fJYLMTfoS3t3XnsOToPCUDp_XVExrF5MWgaMQ"
			}, {
				"type" : "Negev",
				"skinName" : "Terrain",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51MeSwJgh0YjvMBKdbSsou4Rr9NjM3-tViXdmJ-7IBIUiA6NOEZOUyOYtKTMbXUqSGMw-vuUI8ifJdKZ2B9im63H6_OWdZChTor2tVnOLW76wr3DjKUnQWFg"
			}, {
				"type" : "Tec-9",
				"skinName" : "Sandstorm",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhjxszcdD4b08-3moSYg_jmPoTdn2xZ_Pp9i_vG8MLw2wy2-xc9MjqhJ9fEd1I2N17Z-AC7lLvvgMfouM-ayXprvygi7SyJgVXp1mC692Rx"
			}, {
				"type" : "MAG-7",
				"skinName" : "Heaven Guard",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeTiDzRyTQnDBvdhVPA74g3iNis77893a9u35bwDZ1m-tILEZuF9MY5FF8SFWPGOMAz0u0I7hPIMJpWIpnzv3iW9OmgLWRP1ujVTn5gDvZ0"
			}, {
				"type" : "MAC-10",
				"skinName" : "Heat",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeDkYAhkZzvPAKMPDMoo8QzkBjMN5M5kXMOJ-7oULlnxsdPBYuIuYdpFHcKECPeFZgz17hg60_MILpCN9Sm81S3tazpZCkbqrnVExrE60SBKWw"
			}, {
				"type" : "SG 553",
				"skinName" : "Pulse",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oM7bgZghkZzvRBvULD8oq4QT_DBg-4cBrQOi69qkBLBK7sYTCOrAsZNhJS5bQD6OHMlj66Uxr1PRbLpGN9Xjq2Hu4OWgMUxe95Ctazza3vale"
			}, {
				"type" : "FAMAS",
				"skinName" : "Sergeant",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhmfDvEAK1fT8op8xzTBS414NNcWNak8L5IfF3mtobHZ7QtYdsfHMWBWaDUNAv9ux5q0_VfLZeMo3vpjCXsbGkIDQ2rpDzWyUyVMA"
			}, {
				"type" : "USP-S",
				"skinName" : "Guardian",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhX-AF4Rv8NiI-7cBiWsOJ-7IBIUiA6NOEZOUyNNlKScbQXaXVY1-svxk9gvMIL8OLon_ujyThPmsKWBrqrG8BmrfUuKwr3DioatWxnA"
			}, {
				"type" : "AK-47",
				"skinName" : "Redline",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhX_o45gnTBS414NNcWNak8L5IfgjmsNCQZ-YoON1JSZTUD_DXZF2vvkIwg_QJL8SLpCm81S28bGYJWw2rpDzip-2Q0g"
			}, {
				"type" : "P90",
				"skinName" : "Trigon",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMyJYYl2SPrRMVfI1-jfgACA6_PhvVcWx8vVfLwXs4orDOuZ5MYxMHJSGCaPSYAuo70lrhPIMfZaA8X_tiyW4MzgJRVO1rfbRisl0"
			}, {
				"type" : "Nova",
				"skinName" : "Antique",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0DzRyTQrNF6FhXfsu_Rn5DBg-4cBrQOi69qkBLBLst4vHZrIsYo5KFpTRC_CFZliv6k49gfcJL8aL9nvu1Cu9OmwCDhfv5Ctaz1mn-C4j"
			}, {
				"type" : "AWP",
				"skinName" : "Asiimov",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqFNVfg14jfhDCM7_cpcWNak8L5ILF3ot4SXMeMtY95MTcDZCPbSNACpuUo6hvNYfJCLoS3vjn_taDtZUw2rpDytVfjhQg"
			}, {
				"type" : "AUG",
				"skinName" : "Chameleon",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56IeSKMyJYcxHFPqNWXfg_-A3jByY7-sJcWN6x_685JV2t49fYYuQtZNoaGcKEW_KOZwD-6x8w1aNeepXY8iq5j3ntb2lbXRLq-W5Sn_jH5OV5Tktu2Q"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Пиксельный камуфляж «Лес»",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMoy7TfoDTcz_PhvXdC-44QKKE644ZzCYOUvZNgYGsnXC_eCbgirvE9r1PJUesbaqHnu2izuPmZeXxrp8mgGhqbZ7fQ9-fxZ"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywnhNj036tVia9qz87ITJGOz5cCRZq4rNotJSpTTXPeFZAD56UpshqULJ8GBoH681Su_ODwMCRft_mhQnLPTpPI11Y9Vd8RM"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY-8_9hrtNis77893a9u35bwDZwnqsITBZeIqNdxLGpTYWKWCYwuvuUI-galde5SJoXy5iSq8PWgLUhH1ujVTthpPV9Y"
			}
		]
	}, {
		"name" : "Huntsman Weapon",
		"img" : "ohotnichiy_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "Tec-9",
				"skinName" : "Isaac",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5vMeDsDzRyTRDHAvlhXeYz_QXjHxg-4cBrQOi69qkBLBLm5YaQYbl-Yo5KScDRWPaPNAGrvkht1vcIe8SI9X-8i37ob2tbUkLo5CtazzD0Wa_w"
			}, {
				"type" : "SSG 08",
				"skinName" : "Slashed",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oJ-TlaAhkZzvREqcOBMoz-QXjGzMz5PhuUdO_4rY5JV2t49fYO-V5ZYlJSpWGDqOEbgGp7Bpr0vULKpCO8Xi81H7qa2kOXEHr-mNQyvjH5OW0Ya_3zg"
			}, {
				"type" : "Galil AR",
				"skinName" : "Kami",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQzbPqdfUPw2ywPtBC4N5M5kXMOJ-7oULlnx4oPBO7MrMtkeGsPRUqPXYwivuRk_iKhdfcOA837v3SXtazhZDxC--XVExrGeCLbGcQ"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Twist",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhmfzvFGLJfSPAF-AHrATMN5MZxU9L4rusAcAvssouXNLkqOd0dGJaECaSAZQqs4xgx0agIKpPfoiO-3Si9P3BKBURxmw6Iiw"
			}, {
				"type" : "P90",
				"skinName" : "Module",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMTlYYAvbAKxcUPA_8DfgACA6_PhvVcWx8vVTcVi55obONrElMNAYGMiDWffTZAn47kw_h6hefpOLoCPt3irqPTpYRVO1rWm4_UXk"
			}, {
				"type" : "P2000",
				"skinName" : "Pulse",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQfXPrAMDKVqyxj5BTQ318tqU9-iyLcHO1u6qtPBOuZ_ZosYGsnSWvSCbwz47Uhp0vcJe8aI9S3p3yq7b2gICRe--zga2LjQEwt0vE4"
			}, {
				"type" : "AUG",
				"skinName" : "Torque",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56IeSKMyJYcxHFPrBMU_Io8Rv_ADEN5M5kXMOJ-7oULlnx4oXHMeJ9ZtFOGsOCDvWDYVr66xo5haNYe8TapSu63i3rM2ZZUhbo_3VExrFoxWsz9A"
			}, {
				"type" : "PP-Bizon",
				"skinName" : "Antique",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Pfm6PghkZzvACLpRUso7-hzlGDI318tqU9-iyLcHO1u6qoLAN7YrMd9JGsHRU_GAMlio7kk5ifRUfMeL9nnnjH_rOjpcW0bt_2ga2LjQydTIqSk"
			}, {
				"type" : "XM1014",
				"skinName" : "Heaven Guard",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5jObLlYWNYcRH9Ga0PDKRuywDpCDE35vhkQdak84QKIFu38O2aYvJ7ZcYfGJbTDP6OZwyr4xhp0ahfe8TYpXy5iCnqM24CUxO4-20EnrCD67pqnC9IFE-N-xNJ"
			}, {
				"type" : "MAC-10",
				"skinName" : "Tatter",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeDkYAhkZzvJDrJLTOEF-AHrATMN5MZxU9L48epWLQXrs4OVO7IqZNpJHMCGCKXUNQH9vk091aJdfJCKonvq1X_sPXBKBUS5NmffOw"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Atomic Alloy",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_Q3ywW4CHZ_-_hiWNu57oQJO12x49epb-l7aJwjQ5GSDaOYbguvvkk_gvVdLZCP9ivoiH_hPG4IUkLjrmoAmefUvudu0DkUESK5_vLM95cjMz2U1Q"
			}, {
				"type" : "SCAR-20",
				"skinName" : "Cyrex",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oN-KnYmdYcRH9EqNfTso57RrpERg-4cBrQOi69qkBLBLpsYCQYrAkZIseG8fWCKTXMFr-70pt1aYLep2JqSu63CS7PW5eDxLt5Ctaz6ReUTeC"
			}, {
				"type" : "USP-S",
				"skinName" : "Caiman",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhX-AF_wnlBCY818tqU9-iyLcHO1u6qoqTZ7EqONxLF5XTWvDUMgr16BoxgPALfZTbpyu-iSS_PWsPWkHo_mka2LjQogR8FS4"
			}, {
				"type" : "AK-47",
				"skinName" : "Vulcan",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhTuA49g3-Nis77893a9u35bwDZwnnt4SVMLh4M9hPGJHVC_fQbwmrvB9riPJUe5XbqS7s2yq6a2ZfDUf1ujVT14JGn7I"
			}, {
				"type" : "M4A4",
				"skinName" : "Desert-Strike",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTRDLFaFQT-E15gXTBS414NNcWNak8L5IKA3ptdSQNeV9MtsdScKEU6TUMlr9u0w9h_dYLpOK9nvujHnhPT8JWw2rpDxQlljW_A"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMo7-Tf2DCUg6fhvXdC-44QKKE644ZzHMbkqZN9KS8PUDPfTYw7-4k46hPJVL53foyzq2CXta20CCkK9_DlShqbZ7Wmh-3NS"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMo79TfqCCM318tqU9-iyLcHO1u6qoSQMbEqM4sfSsSGDPeHYAv_7h0wgKhfL5XaqX_m3yW9aDhfWkDi-Doa2LjQL_jvEsc"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Сажа",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMop5DfoCDci5MJcWN6x_685JV2t49fYZbF5MopNG8fYWP-Pbw_-vxls1qgOJ5eL8ny823i_aD9YCBK-qWpXkPjH5OUC1jXlVA"
			}
		]
	}, {
		"name" : "Operation Breakout",
		"img" : "proriv_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "MP7",
				"skinName" : "Urban Hazard",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLSKMyJYfxSVTKNRUfg7-gzpGxg-4cBrQOi69qkBLBLtsoKSMOYuN95JTMjTDPGDM1ipuxg90fMJKcDfpCvn2ni4OD0IWxvi5CtazxCLTIoO"
			}, {
				"type" : "Negev",
				"skinName" : "Desert-Strike",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51MeSwJghkZzvMBKdbSsou_RztBzQm59Vua9u_8LMSFlC-9tWTLeV-N4odS5PXX6PVNFv8uE9r1PdeKsff8i_s3SXhPW0LCUG--2pXyuaZ-uw8UAQJFkg"
			}, {
				"type" : "P2000",
				"skinName" : "Ivory",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQfXPrAMDKVqywH6BjUr18tqU9-iyLcHO1u6qoCXN7d-MdweGsmDD_GPYAD47EI9iPIILpba8izv2yzuO2oCDRTs-2oa2LjQxpZttMo"
			}, {
				"type" : "SSG 08",
				"skinName" : "Abyss",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oJ-TlaAhmYzvOBLZXXeEy9QbTBS414NNcWNak8L5IeVjv59fCMbV-NdtLG8bUWKKGMgiruB1sgPJdesaPoy66jyXsPW5cCQ2rpDx0zn4ssg"
			}, {
				"type" : "UMP-45",
				"skinName" : "Labyrinth",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uOfPhZQhvazvOCK5bT8o15gniDiIN5M5kXMOJ-7oULlnx4ILGN-V9M9BFHcPWD_DQNwypu0lugKRYKsTbpXjs2i_qaDpcWBW_-3VExrHui8poXg"
			}, {
				"type" : "PP-Bizon",
				"skinName" : "Osiris",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Pfm6PghkZzvACLpRUrg15wH-ADQN5M5kXMOJ-7oULlnxtoTPZrAvZdkdS8XZUqSBYFipuEMwhKZdK8aN9i7niSrrPzxfCRa9qXVExrECS2z-2w"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Tigris",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhkZzvBVvVfEeEz8w3-Nis77893a9u35bwDZ17osYaUNuErM4tEScKCWPaBbw3_vxk4hKcIecHb9C68jHm8OmoPWhD1ujVToYhPwzE"
			}, {
				"type" : "Nova",
				"skinName" : "Koi",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0DzRyTQrNF6FhV_ozywTlDi8m18tiRtCzueleKg-54YLFZbcvNopIF5SFD_eGMwio4kNth6YMfJWLoSntiX67a2gUG028humfMw0"
			}, {
				"type" : "P250",
				"skinName" : "Supernova",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDzRyTQbLFbRbTuYt8Q34Nis77893a9u35bwDZwTs59bCO7kqOIxLFsTRWKOGNV__6Eg70qkILp2PoCi5iy_uM25bDxf1ujVTlZEMO3Y"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Conspiracy",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcRH9BaVfW_k_ywn5GyIn-_hvXdC-44QKKE644ZzBZeErNthJGJOCWvPQZFqsuEM6ifMIK5GB9ivt3Xy8P2oKXBLurmtRhqbZ7Tllk6hd"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Fowl Play",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59PfWwIzJxdwr9ALFhCaIF8g3tHS83-tRcWN6x_685JV2t49fYYuElNNoaHciEX6DSbg_17E870qRZfcSJ8ynu2irpOToCCRXq_2wBnPjH5OWhSCyC7g"
			}, {
				"type" : "Glock-18",
				"skinName" : "Water Elemental",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhkZzvFDa9dV7g2_Rn5DDQx7cl3a9u_8LMSFlC-9tWTLbEpMY1FGsSFDvLXM1__4hhr06RYe5Xa8S692S64PToDXRfvrGgCybWZ-uw8dna1jag"
			}, {
				"type" : "P90",
				"skinName" : "Asiimov",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMyJYYl2STKFNVfw3-x7TBS414NNcWNak8L5IeV--s9TBZeMsM9ofFsiDX6XVYwn7uRhs1ahffZaK9S_n3iu4Mj8CUw2rpDw1YXWUJg"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Cyrex",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHYh18R6RtKuyLcPLlSr296Xced5LtlIG5LUWvOFM1v66Rk80aVaeZ2IoiK6j3_pb2YKU0fjr2kMzuPVs-F1wjFBLhxWp7I"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF9QnTDyY27fhvXdC-44QKKE644ZyUMuF-NY4eHJWEWv6Hbgys6E0-g6JZfZONqCK-3ivtaDwJDRHp-j0MhqbZ7VLOXRkn"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF9RnTBi4-7cNcWdKy_q4LFlC-9tWTLbAvYdkfFpSFDv-GZQz14kM4hvVUfcHfoCu61C3qOGhYDRHpqzpSkLCZ-uw8KMc6tY0"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Патина",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF9RnTDygg68Jna9u_8LMSFlC-9tWTLbF5NdpOGsmGUqTSYFv-uUk8gvIIe8eL9Cq-1Srgb2dcCBLsqGxVmuWZ-uw8pT4tNB0"
			}
		]
	}, {
		"name" : "Shadow Case",
		"img" : "shadow.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "FAMAS",
				"skinName" : "Выживший",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0Ob3dzxP7c-JmIWFg_bLP7LWnn8fv8Rz37mZ9Nil31Hh_RI-Zm3ycNfAcwQ5NA7VrAK4xbjvjMC67cjJwWwj5HfemqCEuw"
			}, {
				"type" : "XM1014",
				"skinName" : "Скумбрия",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PLZTiVPvYznwL-YlOL5ManYl1RZ7cRnk6fAoNyljQTh-BVvNmGmdoDDJlU8MwmFqFO6ybvnhMK1uJ6cziZj6yIn-z-DyORWjMSs"
			}, {
				"type" : "MAC-10",
				"skinName" : "Хроматика",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0Ob3fDxBvYyJlYyOnP_tMoTVg2Ru5Mx2gv2PrdvxigTs80VpMj-nIoLHIABqZV-G_Fi7l7jog8e97p_Iy3JquSIgs2GdwULIC3Uk8A"
			}, {
				"type" : "SCAR-20",
				"skinName" : "Зеленый морпех",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PTbTi5B7c7kxL-bkvb3NrbQnW5DuJZOguzA45W72VXm_EtsazzzJ4LHew9oYVvZ-1Lqxe7mgcXtv5zOmnsx6XEktymIyQv3309GIEFkOw"
			}, {
				"type" : "MAG-7",
				"skinName" : "Ядро кобальта",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhjxszFcDoV09GvhoOOmfLLP7LWnn8fv8Z12uzFrdXxigO1qBA_Z22nJ4Sde1A3N1nV-Fjrwb_ogMC4upnKnGwj5Hd-M-D3zQ"
			}, {
				"type" : "Glock-18",
				"skinName" : "Призраки",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf1OD3djFN79fnzL-chfbgO6LCqWZU7Mxkh6eT9o6gi1fn-0duMG2gdoDDcAE_aA6FrwS5xevs1Mft6cvOySdh6SQr-z-DyMHeYcY1"
			}, {
				"type" : "Dual Berettas",
				"skinName" : "Драконий Дуэт",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf0Ob3dShD4N6zhpKOg-P1DL_Dl2xe5tZOh-zF_Jn4xgHh_UY6YWv7cNPHcFBtYguD-Fbsx-rsh5e-upXIyXE3vydwtC3dykOpwUYb4qDnZ3s"
			}, {
				"type" : "M249",
				"skinName" : "Nebula Crusader",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhnwMzFI2kb09KzlpWHlsj3Ia7Cl29U-vp8j-3I4IG7iwft_EdsYWH3cYSTewNtYwrT_AW2yOrq0Me86p6cyHYyuyIisXbUmQv330_sWCKJ8w"
			}, {
				"type" : "Galil AR",
				"skinName" : "Невозмутимость",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczPYgJF7dC_mL-FnvD8J6zYmGxu5cB1g_zMu9-iiwG28xE5Y2D1dtfDcFQ8Yl_Q8lm4x72515_v6Z6dn3ZrviUr7X_D30vg_fm3OKI"
			}, {
				"type" : "MP7",
				"skinName" : "Особая доставка",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFAR17P7YJgJB4N2lh4mNnvLwDLPUl31IpsEl3OuT842nigbs_EVpZmCmJdOXJFVrNFqB-1C6xO_vgMW66M6bm3N9-n5113IxsB4"
			}, {
				"type" : "P250",
				"skinName" : "Wingshot",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhoyszYI2gS09-klYOAhP_7J4Tck29Y_cg_3-yXrdij3FDm_ko_N2GhJISWJwZvMl6F-1a5xu7mgcDq7Z3IzXdg7z5iuyj5ZGFXzw"
			}, {
				"type" : "G3SG1",
				"skinName" : "Поток",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf1OD3dm5R642Jkoyej8jkJqnBmm5u5cB1g_zMu4qn0VbtrkFqY232JoaQJAA-MwqBqQLvwujmgp7o7cjPmCAwvSJ353zD30vgKnwwj7U"
			}, {
				"type" : "SSG 08",
				"skinName" : "Большая пушка",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f0Ob3Yi5FvISJgIWIn_n9MLrdn39I18h0juDU-MKsjlaxrkFramyhdoDBJ1c_ZVnQ-1G8w7zmhZe4u5_MyXNivCchtHiJgVXp1kzLClVg"
			}, {
				"type" : "AK-47",
				"skinName" : "Снежный вихрь",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08u_mpSOhcjnI7TDglRc7cF4n-SPpI-iigLg80ZvZzryd4_GI1Q6Yg3VqFe4w-y90JLo753NzXtmsnEl4mGdwUIuRPhSEw"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Золотая спираль",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOxh7-Gw_alIITCmGpa7cd4nuz-8oP5jGu5rhc1JjTtLIfEdVQ-YA6G-FbqwOzs05Tp6smdzHdiuCUi5y7YnRG1gB9OOLE50OveFwutvS5J8A"
			}, {
				"type" : "USP-S",
				"skinName" : "Подтвержденное убийство",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWhe5sN4mOTE8bP4jVC9vh5yYGr7IoWVdABrYQ3Y-1m8xezp0ZTtvpjNmHpguCAhtnndzRW10x9KOvsv26KUE4Zjjg"
			}, {
				"type" : "★ Shadow Daggers",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD7eOwlYSOqPv9NLPF2G0Gu8Eo2bDApt-g0FXl-UU6NTuhI9SccVU3N1DXqFjsxua-g8W7tMvXiSw0K6R8VrQ"
			}, {
				"type" : "★ Shadow Daggers",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOskYKZlsj4OrzZgiVQuJxw3OrHptitigXk-RVkYzz7I4SXdFVtZlmE-lK7xeq6gJa-u53K1zI97VbkI_gt"
			}
		]
	}, {
		"name" : "CS:GO Weapon",
		"img" : "orujeiniy_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "MP7",
				"skinName" : "Skulls",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLSKOC5YYQ_XDaxNY_kz8wD4Nisz-sBmGoSzpONfeA694NCTYrh9MopMHJLRXv_TYAj0vEJugaVcepCN9nu8i3n3ejBdd2J7H1Q"
			}, {
				"type" : "AUG",
				"skinName" : "Wings",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56IeSKOC5YdAHDFahbTuYF9R3rNis77893a9u35bwDZ1nusIPPYbUuYdsYS5TUCKPSYwr_4h08g6kIfpDd9Xvv2n_paD8IXxv1ujVTB2wI0Vs"
			}, {
				"type" : "SG 553",
				"skinName" : "Ultraviolet",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oM7bgZgh0fTvSFLJOUPAF-AHrATMN5MZxU9L4o-9ScQ_ssYSUMLMoNN5KTpOCXKOBbgj970xsiPdUKcSOo3m93irvbHBKBUQk4p5o-Q"
			}, {
				"type" : "Glock-18",
				"skinName" : "Dragon Tattoo",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhmfzvGE6FZU_sF8wTjCiwN5M5kXMOJ-7oULlnx4YbEYrcuYdlFTsLSWf_VbwD_70w70qlVLpKAqCPojHvqPT0NDRvv83VExrH0fQSUtQ"
			}, {
				"type" : "USP-S",
				"skinName" : "Dark Water",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhXfgF7g3uGyYN7MZxX-i6_rwOPWOz5cCRZq59ZIxLH8mCWKPUYAH-4k471qhYL53d9Hzmji_rP24JDxS-rDkNkeSCpPI11czPZI_J"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Dark Water",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_Q3yxLpCzUz18NiRtyJ-7IBIUiA6NOEZOUyZtxEG8PWUqeCYQGr7x44gvVcfZzdpX_t1SzvOWsODUbs-m4BmOXRuawr3Dgdxl9FpQ"
			}, {
				"type" : "AK-47",
				"skinName" : "Case Hardened",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzZ2TQvLDaVaY_kz8wD4Nisz-sBmGo7k9OMCeA7q4YaTNrQrNdAYHMeFU_KAYgD76kg41agMLp2Boym92CX3ejBdMGIcS0s"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Hypnotic",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcwX9F6VMSPw9-zfgACA6_PhvVcWx8vVefF3ustfCYeZ-OIpNTJPWWf-FNVj4vktrhvVefpTcpn_p3S_qOWwJRVO1rdQNtFZ2"
			}, {
				"type" : "AWP",
				"skinName" : "Lightning Strike",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYfg3FCbRQVfs9ywn7GRg-4cBrQOi69qkBLBLss4THO7koMdhPSpXQDKPVbwmsvE89iahfJ5OKpSPs3n-4OGlfWBW_5Ctaz7zg_DXL"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Кровавая паутина",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqhHY-I_9hvTBCI24dJua9u35bwDZw_t5dDGNuN9Y4tOHpTTX_TQMwn740Jq1KRcKJKP9n-8iC-7PmZbDkD1ujVTXDtaQyI"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Кровавая паутина",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF_BHTHiIw-_hvXdC-44QKKE644ZzOZrN9M95KF5HYXPGONw2uv04-0qNbKJDapiq72ni6PD8NXhXj-GxVhqbZ7T7USzse"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Ночь",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9Eq9hUvw9_BzTBS414NNcWNak8L5ILFm8ttCUN7AoYdxPGZLWDvGCMAj0uUw60qlVeZKJoyLvjH_qOztfDg2rpDwy3z-Xlw"
			}
		]
	}, {
		"name" : "CS:GO Weapon #2",
		"img" : "orujeiniy2_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "Tec-9",
				"skinName" : "Blue Titanium",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5vMeDsDzZpTRDLFaFQVeA3p1j6Nis77893a9u35bwDZwvptIXOM7YpMttJTsnZXKLQbgj17hk-iKVcKpzd9n-62ni_aToPWBP1ujVTzFIM_QA"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Blood Tiger",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_0jyxrpDTM778Jxa9u_8LMSFlC-9tWTLbB-NNgdGsGCWvaEZl-s60wwgfUJfZKKpiK63n_qMz0KWBHt-TkGzLKZ-uw8KAp2jYo"
			}, {
				"type" : "FAMAS",
				"skinName" : "Hexane",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhvazvADbVbVPAiywTlDi8m18tiRtCzub0DcQvosoGUMLN5YdBFGcODDP6BMwCv4h1sh_NUfcPaqSru2XnuPmkUG028Pg7_kVo"
			}, {
				"type" : "P250",
				"skinName" : "Hive",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDz9-TRbHBahbRMo2_Q_kHRg-6dVkUZnmruJWcA6859TDNbQvOYpFHcKCX_eDYACuv0M_1qMLJpWB8Xi8jizgJC5UDNXUXX5X"
			}, {
				"type" : "SCAR-20",
				"skinName" : "Crimson Web",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oN-KnYmdYeh39FqVcT8o-9RrnDDUN5M5kXMOJ-7oULlnxvNfGNeUkN9AfHcKCUvTVYFuv60s8hfdfKcCI8ni83CTrPDhbDkC9-HVExrH48MN72A"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Case Hardened",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59PfWwIzJxdwr9ALFhU_w28QzTBS414NNcWNak8L5IL1i-5YLPNrQpM9FKGpLSCKOPZV_1uxoxgPAIK5OA9CPt23u4aWpfXA2rpDxx136i6g"
			}, {
				"type" : "MP9",
				"skinName" : "Hypnotic",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLqKMTZYZAHQFalZU8o2_Q_kHRg-6dVkUZniprpReAXq4YKXNeJ9NNwfHZaDXPLSYA2vvx44hqJYK5GN8iq82CvgJC5UDGBuEjX3"
			}, {
				"type" : "Nova",
				"skinName" : "Graphite",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0DzZqTQfQFK1OUPAF-AHrATMN5MZxU9L48u9QK129tNaVO-YkZo1NH5LYWaWHblyp4x0x1KhUK5CKpSjo1Sy4bHBKBUR7i1qU_w"
			}, {
				"type" : "Dual Berettas",
				"skinName" : "Hemoglobin",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5-OOqhNQhmfzvNErNXWuwF5g3oNis77893a9u35bwDZwW75YDHZ7N4Y98eGcTZX_TSbgz-4kowgKZYeZCLpHvmiCm6OzpcDxD1ujVTAYAgDmg"
			}, {
				"type" : "P90",
				"skinName" : "Cold Blooded",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMTpYYQjLFahbTsoqrVjTBS414NNcWNak8L5IfATs5YvGYLYqON1ETJbQCaWEZgv46R861qUML8fcoSvp1Xi4bjxZCg2rpDz6aELJ1A"
			}, {
				"type" : "USP-S",
				"skinName" : "Serum",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhXfgF8QTpCjMg4cRcRtKyyLcPLlSr296Xced5Lo0aF8DQX6TTNFj67k89iPcMfcfcqHzp2ym8OjwIWhO5-D5Sm7eHurV1wjFB-kug79g"
			}, {
				"type" : "SSG 08",
				"skinName" : "Blood in the Water",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oJ-TlaAhkZzvRCaFMV8o2_Q_kHRg-6dVkUZnmp-NXe1_ttNPOOrYkNN9MHsOCWqeEbwj-u0o-hvdbfcSLoiq-3yjhJC5UDOugWvow"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Ультрафиолет",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMop-zf8HDUi5MJcWdKy_q4LFlC-9tWTLbl9NI0aSsjXC_eOMg35uEpt06JdesaB83zojCy9bDteUxTjqGsBnO6Z-uw8bSDJz_o"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Пиксельный камуфляж «Лес»",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF_BHTDSMi6dNcWN6x_685JV2t49fYNeUkN9wYH5HWDqSDMgj57ENrg_NYfZyA8ynv3n-_PWgCWBTu82hSzfjH5OVLJOs30w"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Вороненая сталь",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMo75TfuBTI37PhvXdC-44QKKE644ZzBYLQvOIpPTMfQU_WFMl39v01qiKFafpCPqSq-2iruaW0KXBrj_mhShqbZ7RsaTLqD"
			}
		]
	}, {
		"name" : "CS:GO Weapon #3",
		"img" : "orujeiniy3_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "CZ75-Auto",
				"skinName" : "Crimson Web",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhvazvVBKJNY_kz8wD4Nisz-sBmGoXmrugEfQ--4dSXO7J5Zd5LHsODXvGEZQH5vxo6iKILe8GNpHzv3y73ejBdsUDqtWc"
			}, {
				"type" : "P2000",
				"skinName" : "Red FragCam",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQzbPrBRUOwF9wnhBhg-4cBrQOi69qkBLBK6sNHANrcqZdhNHcnXXqTXYAmo7B9q06ZdecCM837ujny6aW0KWxLq5Ctaz3-OvRb0"
			}, {
				"type" : "Dual Berettas",
				"skinName" : "Panther",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5-OOqhNQh0fTvSAK5KVPAoywTlDi8m18tiRtCzuetXcAjstdDFZeN9MdAeH8LXDvaBMFz_4x841fRafcOBqH652ijsPWgUG028Tp8ML_c"
			}, {
				"type" : "USP-S",
				"skinName" : "Stainless",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhXeQF4Rv8NjQm6c5tWNKl5IQKIFu38O2aYvJ7ZcZPScaFDqSOM1up7ko7iKZZLZCJpCLq1Hjpbm1fXEDu-zoGm7WEs-Y5nC9IFKT_zQ0L"
			}, {
				"type" : "Glock-18",
				"skinName" : "Blue Fissure",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhvazvBE6FPSfA24RrpNis77893a9u35bwDZwS6vYWTYbErYdhNSsfTCfKBNwH04kw-iKQJKJGJ8inr2Xy8aGxZCRv1ujVT4aqOE_A"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Tread Plate",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhmfzvGCKFTU_s-yxjgCDM318tqU9-iyLcHO1u6qteQN7IpY9BOTZGFX6KPYQivvk5tgfRUfJCN8iO8iS-_M2cIDhe--20a2LjQBlnfwm8"
			}, {
				"type" : "Tec-9",
				"skinName" : "Titanium Bit",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5vMeDsDzZqTQLOFLRbWMou8Qu1Nis77893a9u35bwDZ1655obDM7YtNdgdGcfVCPSCMgr87UNuhKRaKpWO9Hjt1C3qOWgODxX1ujVTmjkUQO0"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Heirloom",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcxX9BK5ZTvQs8QzTDSIz78tma9u_8LMSFlC-9tWTLbgsNIlNTsDRC_SPNF_16k0_g_NaLJzfo3-93y_pOGkIChXj-WMFkeWZ-uw8nESEsTc"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Copper Galaxy",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59PfWwIzJxdwr9AK1hX_oq5A3-NiE-7cRoR-i6_rwOPWOz5cCRZq54MokaF8HUCPGAYQ_-4kM4hKZdfcaOoCnmiSjsPGdfCRTvqGkCkeGPpPI11V_wyrEq"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "The Fuschia Is Now",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhmfzvEFLNdVPw7ywTlDi8m18tiRtCzueIFKAjttYrOMLUoMt4fGMnRXv6ENwqp7Rhrg_NdL8GJoHnm2CW9Pm4UG028S55Y5Kg"
			}, {
				"type" : "P250",
				"skinName" : "Undertow",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDzZqTRSQVPBhXvA78A3oNjcz4cl3a9u_8LMSFlC-9tWTLbJ4ZIxNS8SCXKLSYF-s6EswgqFdLp2Jonvp3Xy6bD8DD0K5q2wGmrKZ-uw8EE8iuMc"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Victoria",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhmYzvHFaNWWfEF9xK7XBg-4cBrQOi69qkBLBLq4tPBZrR6Nd5KH8CFDKPXNVyv40JpiaVVfJPf8S-7ji7vPmZbWEHi5Ctaz0bS9aXa"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfjACs37PhuUdO_4rY5JV2t49fYYLApNolKHJPTC6XTZAD76UM506lcJpLbpCPq1S27MjxZUhu9qGgCzPjH5OUcQbPO0g"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Кровавая паутина",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF_BHTHiIw-_huUdO_4rY5JV2t49fYMuJ_NI0aGZHVX_KEMg6rvkswhaQIK8Pc8y3n1H-9PD9fX0Du-20GnPjH5OW7WRyALA"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Пиксельный камуфляж «Лес»",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMoy7TfoDTcz_PhvXdC-44QKKE644ZzHM7kqON9EFsWEXfSBY1yv4ktuhPBaJ8OLoSi6jn-8aGYLCRC5rjhWhqbZ7f3T5ZL3"
			}
		]
	}, {
		"name" : "eSports 2013",
		"img" : "esports2013_case.png",
		"type" : "eSports",
		"weapons" : [{
				"type" : "M4A4",
				"skinName" : "Faded Zebra",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyR3TR7HA7JfX_Q3ywr7Nis77893a9u35bwDZ1i6tIqTZbJ9NoxLGsLUD_COZAj84hht1qQJLpeIoi682CzsPDpcChv1ujVTIoV6sFw"
			}, {
				"type" : "MAG-7",
				"skinName" : "Memento",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeTiDz9-TQ3BDrNfVPA-5gfiNis77893a9u35bwDZ1ro4dPOYON9MIpIF5HQXvCFMgn17Uxp1qgOJpHcp3zq2XnpbG9eXBr1ujVTTtIwBl4"
			}, {
				"type" : "FAMAS",
				"skinName" : "Doomkitty",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhvazvGDq9TV_wu4BHTBS414NNcWNak8L5IKgW74IWUO-Z-MYlIG5TVXP-HYAH5uxpthKFbe5aPoC7s3ijsOmoMUw2rpDyn8pvVug"
			}, {
				"type" : "Galil AR",
				"skinName" : "Orange DDPAT",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQzbPqRaTPQuywf-CCk17fhvXdC-44QKKE644ZzON7klYdhOHJXWW6CAMgqr7R84g6FcLZCLoS7t33-8bj9fD0ftqWlWhqbZ7SzXnitr"
			}, {
				"type" : "Sawed-Off",
				"skinName" : "Orange DDPAT",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oNfSwNDhhdDvKGJ9aWOU74DfjGyY878JcWN6x_685JV2t49fYM7R6ZdlKHMjXWqfSYAyo60xsiPRZe8GApCrs3CXpbzoJCBa6-GoMzPjH5OWpE4eCng"
			}, {
				"type" : "P250",
				"skinName" : "Splash",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDyR3TRfSDaFNVMoqpl28Nis77893a9u35bwDZwXts4KSO-QtNItPFpGFDP6FYgn6vxo9gPRYLsOJ9Xjn1H7oPWwMWEf1ujVTbzPp70w"
			}, {
				"type" : "AK-47",
				"skinName" : "Red Laminate",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDz9-TQXJVfdSXfgF-AHrATMN5MZxU9L4puJffw7v4YrGO7UrOd5PFsLWXqXQYQz-vks-haFaLZTbpHi83HvqPXBKBUQbZsOMyg"
			}, {
				"type" : "AWP",
				"skinName" : "BOOM",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKOC5YcAjDDJ9NVfgq-A3TBS414NNcWNak8L5ILFjutYbPN7coONkZH8PWXKSENV2o6kI60akJe8TapH7o3yjpPWkPCQ2rpDzhF3nw7A"
			}, {
				"type" : "P90",
				"skinName" : "Death by Kitty",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMyJYcQXWEqtLUPkpyxi1WRg-4cBrQOi69qkBLBLv4tTEYLV_NdsdGcnRD_SOMlz96Bhsh_NZL8CKqS-72C69Mj0MUxHt5CtazyMJYE6_"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfjACs37PhuUdO_4rY5JV2t49fYYLApNolKHJPTC6XTZAD76UM506lcJpLbpCPq1S27MjxZUhu9qGgCzPjH5OUcQbPO0g"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_oz-A3oNis77893a9u35bwDZw3rsYrPZ7R6M95KHMPQXv-Gbgv5vEg-1aYLKJCLoSPr2iW8OD1bCUf1ujVTxaDwZJQ"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Северный лес",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywD1NiE9-sJwQOi0-KkDKFCA6NuRa_RDbIkOSJXOWvGCNw6s401piKZYfpCO9Sy-iSzvb2ZbXRTj-G8BzuSE77U_hmlEEW_w87uLpmm_PQ"
			}
		]
	}, {
		"name" : "eSports 2013 Winter",
		"img" : "esportsw2013_case.png",
		"type" : "eSports",
		"weapons" : [{
				"type" : "Galil AR",
				"skinName" : "Blue Titanium",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQXMPrRXSPQ0_R3hWnck18tqU9-iyLcHO1u6qobENbR5OI0fHpOFDqSFNFqo6UppiKgOJpaN8yzs3X-9P2heXxvrqWoa2LjQVdphTEM"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Nightshade",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59PfWwIzJxdwr9CblhWvk14w3-Ghg-4cBrQOi69qkBLBLr4ovCZuR6NokfH8PSCfeDMFypux1phvMMLsOLpCjqjCm6a2ZYD0a_5Ctaz9U_2XtO"
			}, {
				"type" : "PP-Bizon",
				"skinName" : "Water Sigil",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Pfm6PghvazvVALRbTso55g3_HRg-4cBrQOi69qkBLBK8sNbGYuF4OYseF8fYXfbQbg2r6Uw4ifcLLMeB9Xm81Hu8PmYDDxvi5Ctazyi3Rjk3"
			}, {
				"type" : "Nova",
				"skinName" : "Ghost Camo",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0DyR3TQfDDK9hS_o18DfuBTI318tqU9-iyLcHO1u6qtbAMOUsNolPF5WGWf-ANwD57x9t1vVafJTY9CO7jCS7a2kDDUbt-j8a2LjQUmD0stw"
			}, {
				"type" : "G3SG1",
				"skinName" : "Azure Zebra",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Z_CyYQh0YjvYBKJMXfY7-TfuBTI318tqU9-iyLcHO1u6qobEMrklZtEfG5PQCKKHMF_0vE4-ifVbepKKpCK82H68bjgOXRDrrG4a2LjQFSpjlZ4"
			}, {
				"type" : "P250",
				"skinName" : "Steel Disruption",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDzZqTQDGEaFKWPA05w3TGi4-_sJxa9u_8LMSFlC-9tWTLbMqMtpMTcPYXvaPb1yp7EprgvNUfcSPpHu51STgaGYDWUbvq29Xne6Z-uw8bAJFJOs"
			}, {
				"type" : "AK-47",
				"skinName" : "Blue Laminate",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDz9-TQXJVfdSXfgF9gT5DBg-4cBrQOi69qkBLBLm4oqTYLUtMNsZSZHVCPHXZlv-40ox0aBefZHd9S3niCy7bmgLWULr5Ctaz976J8rK"
			}, {
				"type" : "P90",
				"skinName" : "Blind Spot",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKOC5YfwvGErBRSOYF-AHrATMN5MZxU9L49uxWe17n4teXZbB5Mt1KF5XWWqPQNAusuEw6gqlcJseJpSjuiHztaHBKBURqttZgyg"
			}, {
				"type" : "FAMAS",
				"skinName" : "Afterimage",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhkZzvAE69VWfsF5An4ARg06cpiR-i6_rwOPWOz5cCRZq4pZNxJGsPZXfWDMgH-4h1u1fcJLZONpi2-1X7uPGlYXBLj-mxXn-6CpPI11ZK_4Z1K"
			}, {
				"type" : "AWP",
				"skinName" : "Electric Hive",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKOC5Yeg3UBJ9SVfIy4DfgCDU17YkxBY_vru5eLA6-4tPEYLYlY44fS5TYWvGHZA2u6Ewx0aEIKZGMpijqw223bcT044Vo"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Cobalt Disruption",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcwn9BaROXeE-8Qb_DBgi7cZgW9S9yLcPLlSr296Xced5LolIF8aECPWHYAmvuR9r1qcPfJDYoX7n3CrgaWoPW0Hr-D0CmuaGv7N1wjFBG4zK3W4"
			}, {
				"type" : "M4A4",
				"skinName" : "X-Ray",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTRzQALlhUaEF-AHrATMN5MZxU9L48uJUcF69t4vPO-R6NNFMHZPSCKKAMA-ruBk_h6QOesaJpyvq2CW7a3BKBUQFWGseyw"
			}, {
				"type" : "★ Bayonet",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Nfq6PjJzTQXTPq9XUPA-ywTlDi8m18tiRtCzueJUeQTpstfEYrF6Md8aS5HXXfaEMwmv7hhqiaQLK5DYqHvnji3pPW4UG028JI0XXjw"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Пиксельный камуфляж «Лес»",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_oz-A3oNis77893a9u35bwDZw3rsYrPZ7R6M95KHMPQXv-Gbgv5vEg-1aYLKJCLoSPr2iW8OD1bCUf1ujVTxaDwZJQ"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK1hRvA45gnTBS414NNcWNak8L5IKg_osNTOZrctZttMH5XUWfOHNA_16hk-gqVbe8SPpC-73nm8a24LDw2rpDxc1kJY2A"
			}
		]
	}, {
		"name" : "eSports 2014 Summer",
		"img" : "esports2014_case.png",
		"type" : "eSports",
		"weapons" : [{
				"type" : "SSG 08",
				"skinName" : "Dark Water",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oJ-TlaAhmfzvYBKJMXco-9RrnNis77893a9u35bwDZwnpt4TFNLEqOd4ZSpXTWKKPNwqo70Mw1vdefZGL9iy93i7uPWheUhr1ujVTcziKRL4"
			}, {
				"type" : "MAC-10",
				"skinName" : "Ultraviolet",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeDkYAh0fTvSFLJOUPAF-AHrATMN5MZxU9L4oO9WewTu5taSMrMsOd5IFsmGXvKDYl357k1sgKdaL5aO8i_m3y-7PXBKBUQ5ngn3pA"
			}, {
				"type" : "USP-S",
				"skinName" : "Blood Tiger",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhVOwF5g3oHS417dVcWN6x_685JV2t49fYNuQrN9AaGcDTWqLTYgD_401ug6VUL52IpyLuiSXtbzgIWha68zkNmPjH5OV4NRwZqw"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Hexane",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhvazvADbVbVPAiywTlDi8m18tiRtCzuetVe1nr5oLPOrkkM9gdG8WEXfKFb1397R1p1fdbKceBoiPmjCzpPzgUG028e5rmkFI"
			}, {
				"type" : "Negev",
				"skinName" : "Bratatat",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51MeSwJghkZzvAE6FKXeE74DfiDCA3_vhvXdC-44QKKE644ZyUNLUkOYtPHMWGCPGGYA-p70hqgalUKMCJoCq53S7obm0LXRXv-z4ChqbZ7TkAVlPV"
			}, {
				"type" : "XM1014",
				"skinName" : "Red Python",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5jObLlYWNYeh39Eq5fV_Ap_wHiNjU37PhvXdC-44QKKE644ZySM7ElYdpJSsHQDKODZV__vx9ugqhYJ8PboyjtjijgPGwLCkG4_j9RhqbZ7Q5-_3PB"
			}, {
				"type" : "PP-Bizon",
				"skinName" : "Blue Streak",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Pfm6PghvazvREaxfSOE_5jfgACA6_PhvVcWx8vVRKAvrtYWSOrUoON0fSpLSW_KONF2p6R86gqlfLpyKoC3v1S-8a2ZbRVO1rfg44WyZ"
			}, {
				"type" : "P90",
				"skinName" : "Virus",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKOC5YaAvPA6lbY_kz8wD4Nisz-sBmGoCwoe0Eegy6sovGMeF5N99OHZLXU_OHMF367k8-0fRaepzboyLn3Xj3ejBd3WA8gZ8"
			}, {
				"type" : "MP7",
				"skinName" : "Ocean Foam",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLSKMTpYfRfRCKZHY_c24Q3TBS414NNcWNak8L5IKw68tIXBYuZ_MtsYS5LUUvWOZw__40o9haZcLJ2Ipn69iy3gbDwCXw2rpDzl3kMWhw"
			}, {
				"type" : "Glock-18",
				"skinName" : "Steel Disruption",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhmfzvGBbBfSPE_-hvpNjQ75NFmRui6_rwOPWOz5cCRZq4oZNBPTMCBWqSPYwGvuEo91qdUK8aOoC7o1CTvbz1fXhq9_jlRmOPWpPI11VgXmgp7"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Crimson Web",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYeh39FqVcT8o-9RrnDDUN5M5kXMOJ-7oULlnxs9DPYOItOYodTMXSD6TTYVr54x470fMJeceJ8y7v3Xi4OGsIDUa98nVExrEBa25J_A"
			}, {
				"type" : "AUG",
				"skinName" : "Bengal Tiger",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56IeSKOC5YZg3FBLJhUPw9_BzTBSYg78ItUIWw8uJTfljsvYLFZ-MpN99FG8DTD6KHNQD4408_1aBVecSO9Sy5iTOpZDnMe7RhPA"
			}, {
				"type" : "Nova",
				"skinName" : "Bloomstick",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0DzRyTRfSE6lQW8o0-x7tNis77893a9u35bwDZwy94YvDYrAtZIxJG5LVXf-Hbg_57E9sgKReLMaMoSPqi3u7O2pbU0X1ujVTSqeRL14"
			}, {
				"type" : "AWP",
				"skinName" : "Corticera",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6_ummpD78A_3rqTrI-l3AOxqkJkamClJ46RdFc_MFDR_1K3k7_t1JS7upvMmHdn7z5iuygrdWg_VA"
			}, {
				"type" : "P2000",
				"skinName" : "Corticera",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQfXPqZfSvA29Tf8W3diuPhvXdC-44QKKE644ZyVYLQsZIpIS8XQXv7VYV2puR1qhaNbK5fdqS_riCToPm4KDhbi-GIEhqbZ7RAAKX2k"
			}, {
				"type" : "M4A4",
				"skinName" : "Bullet Rain",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTQbXDaxbSMoo9QHiNipm6ZZcWN6x_685JV2t49fYN-IvNdFPF8eCUqfUNV2v6hptiaNcLJHb8Sq53yzpPD0OWxa_82kGmvjH5OXima9UFQ"
			}, {
				"type" : "AK-47",
				"skinName" : "Jaguar",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTRTDD7RWWecF9QO4Xhg-4cBrQOi69qkBLBLp5oWVO7IsONseGpaCCPGHYAr8ux8_iadcfsaIpS7siSy_aWxbXkC_5Ctaz1HySfSj"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Северный лес",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMoy7TfqBjU3-9NcVtik8roKFlG64NuDbt9wYZobSt6DWaCDNQms4hhriagMfsGO8yrp2SvubDwCCkfu_2pQkbWBvro412lCXTHu-vwNOTyx"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Marble Fade",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY_g75grgDBg06cNma9u_8LMSFlC-9tWTLbUrYdFFHJGCXPCFZFusuEw8gvUOJpPcqH-9iHm_M2YOXBC9q25WnO6Z-uw8Y8ANU94"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Кровавая паутина",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywD1NjA36tRcWdKy_q4LFlC-9tWTLeR4ZtsfFsHXDvGCZAn7404_hvNUesSJoSPnjC28OW0PCRO6_D1VnuWZ-uw8Gn75-BI"
			}
		]
	}, {
		"name" : "Operation Wildfire",
		"img" : "wildfire.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "PP-Bizon",
				"skinName" : "Photic Zone",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0Ob3czRY49KJl4mfnu3xPYTck29Y_cg_iL_F9t6m3wOw-xE4YGz1doGWewE6Y1CF-le7xL28hMO-6svIwCdk6z5iuyjW2C7Erw"
			}, {
				"type" : "USP-S",
				"skinName" : "Lead Conduit",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09ulq5WYh8jiPLfFl2xU18h0juDU-MKljgLjqRVuaj-gLIKUdQdtMgvS-VK_wrvpgZ7quM_Im3Qw6Cdz4CzZgVXp1o7eGVz_"
			}, {
				"type" : "Dual Berettas",
				"skinName" : "Картель",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf0uL3dShD4N6zhoWfg_bnDLjQhH9U5Pp8j-3I4IG7ilfj_RBrZDzyJoOdcgI9aVvWqAToxe3mg8Tv78zLynAw6CMl4XzYyQv330_FBz5Big"
			}, {
				"type" : "Tec-9",
				"skinName" : "Jambiya",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhnwMzcdD4b09a3mYKCjvbLPr7Vn35cppFw3LiW94n02A21_EZrYWz6J4aRIw86aAnW_1Doxe--hMW9tJSYyXt9-n51XLgSqKg"
			}, {
				"type" : "SSG 08",
				"skinName" : "Necropos",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f0Ob3Yi5FvISJmoWIhfjkPKjum25V4dB8xLqZ89vx2Vbm-kc-Zm31JIfDIAZqZFjQqFa4xOi9hJ-678udwXJmuyI8pSGKHJ6NlhM"
			}, {
				"type" : "MAC-10",
				"skinName" : "Lapis Gator",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0v73fDxBvYyJkYyOlOPmOrjYgnJu5cB1g_zMu9_x21Xi_hJkYj3xJoOQdlU8MwnU81XtlLu51J696pqan3U3uCcgsynD30vg17el3Nc"
			}, {
				"type" : "Glock-18",
				"skinName" : "Royal Legion",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf1OD3djFN79fnzL-KgPbmN4Tck29Y_cg_2e2W9orx2gPh_UE5ZmindYWddwI3aVnT_VG-krvph57p6sjAyyY17D5iuyi-oMCxlg"
			}, {
				"type" : "MP7",
				"skinName" : "Impire",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFBRw7P7YJgJL4cy_hoW0mvLwOq7c2D1VvpYki73HotT0iVDg_hFrZj_1LY-RegU3YVnT-Vnowe_rjZ_v6pXXiSw0kXssCIY"
			}, {
				"type" : "Five-SeveN",
				"skinName" : "Triumvirate",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goWYkuHxPYTQg2xc7ctlj-3--InxgUG55RE-a22hLIbEIwY-NFrT_gPqwunsg5C66cnOwXVnuCUk7H3el0O2hh1SLrs4pbUXKjo"
			}, {
				"type" : "FAMAS",
				"skinName" : "Валентность",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0uL3dzxP7c-Jl4-Fg_jhIYTck29Y_cg_0rrEodik0FC38kU5NmqnJICddlc4aAnX-AO3lL2-08C4vp7Ayns1vD5iuygKw238fw"
			}, {
				"type" : "MAG-7",
				"skinName" : "Praetorian",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhnwMzFcDoV08yklYWfmOX9MrXum25V4dB8xL6Y89333AzgrhFoYm36INSVcVU8Yw3X-1O6xLrmhce76J3Am3dn7Cg8pSGK25lWOzo"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Kumicho Dragon",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH_9mkgIWKkPvxDLDEm2JS4Mp1mOjG-oLKhVGwogYxfTyncteSd1BtYwvY-AO6lei5g5fo7snOyCZivCd24nbczEewghFIOLBxxavJWhp7hGw"
			}, {
				"type" : "Nova",
				"skinName" : "Скоростной зверь",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhjxszGfitD09SvhIWZlfL1IK_um25V4dB8xLnApor33FK2qkBtYWvwIYaXdlM-NFrYqQK7kLvogsS5tJSdyncwvCU8pSGKT_oyuxQ"
			}, {
				"type" : "AWP",
				"skinName" : "Элитное снаряжение",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJP7c-ikZKSqPrxN7LEmyVTsZV33OiT9tys2AG1_UJlZ2HxJ47EIAI_N1CErAe_lOzsgMO66syd1zI97a8kXc4r"
			}, {
				"type" : "AK-47",
				"skinName" : "Fuel Injector",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV08-jhIWZlP_1IbzUklRc7cF4n-SPpIr33gS1rkJqYGD7J4GQcQY5aFCG-lHrlO650JLv6ZzMziA2vXMgtmGdwULg8tCd0w"
			}, {
				"type" : "M4A4",
				"skinName" : "The Battlestar",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW08y_m46OkuXLPr7Vn35cpp0m2b-Xo92s3Ffj_Epkazzzd4KcelRvYlzQ-lC8x-q8gsDvu5-fnSZ9-n51hKpk1bE"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Вороненая сталь",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrulGdE7cFOhuDG_Zi7jAbgqENvNjv2cYHDJ1Q4ZAqB-Vi5l-u-1MXtucvIynJn63N3syzbnQv3308wj9M7Tg"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Северный лес",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLO6LukGRD7dZltevO54n0hGu4ohQ0J3f3J4_EdFRqYQ7Y8gO9kr--gpXou8iYwXZkviUgtH7cmUDjgE0fO7Zom7XAHgyvqmnm"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrumWJd7cFOhuDG_Zi73VDi-hdqNmn6INCXc1Q8NFDV_Qe-x7i8g5e-v8ydzSZi7HUr437UnAv3309ikmqnoA"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Пиксельный камуфляж «Лес»",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLO6Lukm9B6dFOhuDG_Zi73AW3rkI4Yz37Jo_HJlBrYlHY8lPvyershZK57Z-YwHZj7nEktyrVyQv3309AwMWh8A"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Ночь",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLILTumGJW4NFOhuDG_Zi7jASw_RBuNmyiJo-TdAU_NwzQ_1K_wOntg5C_uJTAyXtmuiMitn2PnQv330_dJ3i8aA"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Сажа",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLIKvukmpB-Ml0teXI8oThxgDt-hBsZ2HwLIOWI1U5ZF7YqwS-lefn1Ja17pibmHQ2s3Il4HjZnhSpwUYbUxQp7R8"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbujG5T-sROh-zF_Jn4xgfk_xJvYGqlI9OQJAc-YgzX81a4w-rpgsC16Mubz3Qxv3Zx4HqJmkSpwUYbBsqV8z8"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Патина",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrukGRD68B1teXI8oThxlC38kJsZDigJYGVdQY6YVmC_APrwO_s0Jft6p3Om3M17yIn4izUmhSpwUYbpuF0ilg"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Городская маскировка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLIKvugmpB7fpkmOvA-7P5gVO8v11kY2r7cITAJAVsZVnSrAK7wOvuhZC9uZ_BznJhuSArsS7fzhK2hBxJcKUx0sfXsL-_"
			}
		]
	}, {
		"name" : "Cache",
		"img" : "Cache.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'AUG',
				'skinName' : 'Радиационная опасность',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRw7P3dejhR-M6_hIW0mOX1PbzUqWpE7_p9g-7J4cKh2wTt-kBkMT32do_Adwc2Z1rYrlS_xr_tgpO7uJqcmnswuCIi4ivegVXp1vNtKNLo'
			}, {
				'type' : 'Five-SeveN',
				'skinName' : 'Лихач',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5N09ukkZm0meL3P77QhFRe-sR_jez-84XjjWunrgU5PQavfdHNNhg_N1HZq1W3k7_uhJG4vczKz3Frv3V05Xbem0G_gR5KaOdr0fHKS1mZGeUXSy0Rtb_k'
			}, {
				'type' : 'SG 553',
				'skinName' : 'Радиоактивные осадки',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFfwOP3fyhJ6c-ihombksj5MqnemWVu-8Ik37r--YXygED68kZlam-icdTBJgBqZVvQ8gW7xum5gZ696Z2aznFhvyB25yzVnUawhQYMMLKoKiteww'
			}, {
				'type' : 'Negev',
				'skinName' : 'Радиоактивные отходы',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFfwOP3fyhB4Nm3hr-bluPgNqnfxVRf7cJ0nNbN_Iv9nBrmr0c_N2D1co_EewI9Z1-E_gK8w-fmhJS5vMibwHFmuiQh4ivVzUCxn1gSOZtaCfWE'
			}, {
				'type' : 'P250',
				'skinName' : 'Заражение',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhoyszGZD5O6d2kq5OAgvv4IO_uhjkEuPp9g-7J4cKt21bjqEE5Nj-lJNKTJFI-NF6E_Vm-k7vvjZe5vZzInXNqs3Em4yvbgVXp1h42q_cG'
			}, {
				'type' : 'PP-Bizon',
				'skinName' : 'Химический зеленый',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlfwPz3di9H9eO4gYOHkvbmDLzDk25f18d4kObPyoD8j1yg5UNrYTzxIdSUJFc9ZQ7V-gXvwubqhZW9vJnLzSBr6Ckk7HfezEOxiRxSLrs41lh6pmw'
			}, {
				'type' : 'XM1014',
				'skinName' : 'Костемолка',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PLFTjNX79CzlZK0hPzhP7fCx1RJ5ZQh273--YXygED6_EJqNmHxLYDGcgFqYg3WrlTtyLjq05S8up3Mmntluihwty3al0bmgAYMMLKwoJ4rnA'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Токсичность',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszGZD5O6d2kq5OAgvv4IO7ugm5Ssfp9g-7J4cLx0Aew_Bc5ZzryJNLHIQNoMA3Z-FTvxb29gJW978zOmHo373V05ivcgVXp1mJNZYNi'
			}, {
				'type' : 'Glock-18',
				'skinName' : 'Реактор',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73fyhB4Nm3hr-bluPgNqnfx1RW5MpygdbJ8I3jkRrm_xA4a2v6d4LGc1M2YQqFrgO5lea5hJW4uM7LyHtl6CchtHzVyRWxn1gSOQY07qpC'
			}, {
				'type' : 'MAC-10',
				'skinName' : 'Ядерный сад',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0v73fyhB4Nm3hr-YnOL4P6iCqWZQ65QhteTE8YXghRrn_xBvZj-gdYaXIAM9ZA2Bq1G9krq7hpa4uZ7Bn3ExvyEnsH7alhXhn1gSOXsb08Wt'
			}, {
				'type' : 'MP9',
				'skinName' : 'Закат',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FA957P3dcjFH7c6JhIGfg_LmPenum3sI18h0juDU-MKljAbi-UM4MDrycNTAdFRoNQzZ-1a9yOy60JK96pnIwHZnuiNw5X_bgVXp1qKBy7Rx'
			}, {
				'type' : 'FAMAS',
				'skinName' : 'Стикс',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0v73fyhB4Nm3hr-YnOL4P6iDqW1Q5cRiteHE9JrsxgWx-ERkZ2r0cdDHd1M_MF_R-FS6l7-81MK0vZzLyyRi7HMjsyrUyxCpwUYbBN7dJDM'
			}, {
				'type' : 'Galil AR',
				'skinName' : 'Цербер',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczLZAJB6c60hpWYqPD1P7LdqWNU6dNoxLGWoI2liwG18hZsZW2hcY6cIFNvMAvS_Ffrye-6h8e4uJqbwHpnsyA8pSGK_cSp9dA'
			},
		]
	}, {
		"name" : "Operation Bravo",
		"img" : "bravo_case.png",
		"type" : "Default",
		"weapons" : [{
				"type" : "SG 553",
				"skinName" : "Wave Spray",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oM7bgZgh0YjvREbJfRcot9R7pGhgw-sZ1W-i6_rwOPWOz5cCRZq4pZNwZH5XTU_GBNF_0vEpu0akJe5SMpyy92CjuPDwOWRru_m1Ske7TpPI11Wf5Cc_N"
			}, {
				"type" : "Dual Berettas",
				"skinName" : "Black Limba",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5-OOqhNQhkZzvRBKFNU_sF8QTlHSIh18VxVcG5yLcPLlSr296Xced5LthPTcWGXqfQNVurvBkwgPdaLMbcoCrmiXzrPm5cX0K6-28BnbWGv-R1wjFBMAyMc9k"
			}, {
				"type" : "Nova",
				"skinName" : "Tempest",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0Dz9-TRfHALNXWPAF9hrtHygN5M5kXMOJ-7oULlnx5tOSMrN-Yt5LSsbXD6OGZFv64klphaZZLJKP9HzqiCq8PjhcXBXtrnVExrF218wRmg"
			}, {
				"type" : "Galil AR",
				"skinName" : "Shattered",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQzbPqNMSfgq-A3TCzUz_shcWN6x_685JV2t49fYZeN6Mt1EHceDWqPQbgGvuxg_1aQPL5CPp3-8iSi4PTpYDkbr-2wNmfjH5OXb7GiByw"
			}, {
				"type" : "UMP-45",
				"skinName" : "Bone Pile",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwOP3YjZX4NCJkImKkOX1PoTThGpH5_p9g-7J4bP5iUazrl06YDulIYCWJABrYVrX_ge7xO3ogsO46sjJzXBhsyAn4HfbzhbjgBEecKUx0mY3Obru"
			}, {
				"type" : "G3SG1",
				"skinName" : "Demeter",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Z_CyYQhvazvADbVbTPo27Q_jBxgw-sZ1W-i6_rwOPWOz5cCRZq4qNttEGcLTC_KPYQD460lq0qFZJ8PYoii51Hi6OmhbXkDq-2wGy-HSpPI11Uvtms_a"
			}, {
				"type" : "USP-S",
				"skinName" : "Overgrowth",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhVOwF5wHpDiIN6tViQtiJ-7IBIUiA6NOEZOUyNdlLTcjZD_GONF-o4hlp1KYOfpTY8XjoiHm_OzoKWULu_DkGzLeFvKwr3Dg07JikZA"
			}, {
				"type" : "M4A4",
				"skinName" : "Zirka",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyR3TRfWALJhXuc74gfTBS414NNcWNak8L5ILQi-sYSXYeUkON0dHpHQWaPXZw7-u01p0fQPK8OIoHi8iH7va25ZWQ2rpDyVvfC7sQ"
			}, {
				"type" : "MAC-10",
				"skinName" : "Graven",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeDkYAhmYzvHFaNWWfEF-QnvWHcN6tViQtiJ-7IBIUiA6NOEZOUyNdFNSZOCCaPXbgD-7E471PAMKpeL8nvm1H_sb25fU0e-_mxQnOKFuawr3Dhc3LxHWw"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Bright Water",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_0jywfvDCY818VxVcG5yLcPLlSr296Xced5Lt8dFsTSXvKPbwv76047haZYLZOA8Xzu2inuOW1fD0DsqD5QnbDW7-B1wjFBV4zgU1c"
			}, {
				"type" : "P90",
				"skinName" : "Emerald Dragon",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMyJYdhbDBq9QY-VjpDfuGyYk5_hvXdC-44QKKE644ZzEM7B5Zt1NHJGFWP_XMw7770pp1KILLJTcpiK92H_oMmgIXBru_WlShqbZ7aDCcRhz"
			}, {
				"type" : "P2000",
				"skinName" : "Ocean Foam",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQXPPq9NT_w87TfuBTI319cxBIfmyLkUKEqw296fZOhoX4QdXZeFRP-HMAv_7007hfdaepHYqSLpjyjob24DCUG6-2sCy7eB67Y51GhCESOu7bLbIx9TbPM"
			}, {
				"type" : "AWP",
				"skinName" : "Graphite",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYcRbXDLBSWco45gn6Bhg-4cBrQOi69qkBLBLq4ofPZ-UuMt8YHcjQDPXVZVv-4x1p1aYIK5zY8yvr3i7qMj1bXkHp5Ctaz8vYRbYi"
			}, {
				"type" : "AK-47",
				"skinName" : "Fire Serpent",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQLLE6VNWecq8Qb4NiY5vJBcVsW34bQ5JVW47Mapb-FuZ41SFsPZWqOBMF3940pt0akML5GKpHy73yztOTsKCkC9-j8BzOfV6OFihXFWHSb0S-ZgUA"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Golden Koi",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcwn9EqNfUPApywr-CDE918tqU9-iyLcHO1u6qoSVYeEoNt5FGpXXXqeONFyo40g61fBUL8bc8SjriCztPD1YDkXur2wa2LjQNvU8OSA"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Вороненая сталь",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfuBTI37PhuUdO_4rY5JV2t49fYNbJ9YtlOSZTVW__SYgD74kI-hvVUepCKpCjn1H-9bjsNW0Dt8j0EyvjH5OVLma4hOg"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Tiger Tooth",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFQY-Ez8w3-Nigg6clkUei6_rwOPWOz5cCRZq4oNNkfH5TSCaCCZA6p40tu0qFaJsCBonu53XnpPWpZWkG9qz8Fm7ODpPI11e7G-Um7"
			}, {
				"type" : "★ Bayonet",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Nfq6PjJzTQXTPq9XUPA-ywTlDi8m18tiRtCzueJUeQTpstfEYrF6Md8aS5HXXfaEMwmv7hhqiaQLK5DYqHvnji3pPW4UG028JI0XXjw"
			}
		]
	}, {
		"name" : "Dust II",
		"img" : "dust2.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'G3SG1',
				'skinName' : 'Песчаная буря',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf2-r3dThR6c6iq4yCkP_gfe_Uwz4HuZ0p3u-Q9oiijgyw_UpqZjv6d4GcewdoaVGB_VG8k-nt15Ki_MOekXjyVoE'
			}, {
				'type' : 'MP9',
				'skinName' : 'Песчаная штриховка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FBRw7OfJYTh9_9S5hpS0hPb6N4Tdn2xZ_Isp07rFpY70i1Lk-ERpY233LNXAJAJsNFmG_FW3xOfu15-6vp_AyXU2pGB8suBC9uz5'
			}, {
				'type' : 'Nova',
				'skinName' : 'Хищник',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhzw8zSdD9Q7d-3mb-DkvbiKvXSwDMEsJci0u_Fooii31Ky8kE-ZzzwJoCTcQA4NV_Zq1bolOzogsDpot2Xno1tLOyh'
			}, {
				'type' : 'P250',
				'skinName' : 'Песчаные дюны',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzbcDNG09C_k4if2fSjZLmGwDkBsZZz3r6Zo4mliwTj-0BtZDz1dYSUcAdtYw3XqFXtyejxxcjrr8fSJ40'
			}, {
				'type' : 'P90',
				'skinName' : 'Песчаное напыление',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FBRw7ODYYzxb08-3moS0mvLwOq7c2GlUuZR0ibiRpNqs2VXi-kI5Mm2hd4GdIQM9NwrW-Va5xObmjJK-uczXiSw0I3Bdoc4'
			}, {
				'type' : 'SCAR-20',
				'skinName' : 'Песчаная сетка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7ODYTjBH_9SJh4GFk8j5Nr_Yg2Yf6ZEl3O3D99mm2gTkrUBsYzj0LIWWcwRtYgvU-1K7w-7tg5fv75TPnWwj5HeMNR9tGQ'
			}, {
				'type' : 'AK-47',
				'skinName' : 'Африканская сетка',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zFdC5K08i3mr-HnvD8J_WBxTwD6ZB12b7Hodumig23rUY5YTymJ4TBcFA7NVvW-FW5l-zr1JXtot2XnkNBBWuK'
			}, {
				'type' : 'Five-SeveN',
				'skinName' : 'Апельсиновая корка',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5S08i3hIW0mOX1PbzUqWdY781lxO2WrdjwiwS38kFtYG-mLdCWJAU9MgnQ81W6xbi5gcDpuszIn3dguiA8pSGKjf2ztEE'
			}, {
				'type' : 'MAC-10',
				'skinName' : 'Пальма',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwOP3YTxO4eO6nYeDg7n2YeOGlWpTvpwj2-zEpNjx0A3krkFlNm2nJoWVdQM8ZwnW-FK2wOzmm9bi64Jdj8z-'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Смешанный камуфляж',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszecC9L7927m7-HnvD8J_WJlzMHu5Yo2urFpYr22gDnqEBqam6gJ9KQdwc_YlGE-VS7wri70Ja_ot2Xnk_reDFK'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Змеиная кожа',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3Yi19_9K3n4W0m_7zO6-fw24HvcQi37nHptz0iQHt-Rc5YWr3coCWc1I7NVqDrli2ye3n08S46YOJlyXnI7k0UA'
			}, {
				'type' : 'PP-Bizon',
				'skinName' : 'Латунь',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0uL3cy9D_8-JnIWKge66YrrQwGpTsZ0m27rF8NqjjVCwqUA4NziiIYHBJAQ_ZwyC_VDtw7-6h4j84sq1nvST4w'
			}, {
				'type' : 'SG 553',
				'skinName' : 'Дамасская сталь',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0uL3dTxP7c-1gZO0hPChZujummJW4NE_372Sptmg3gzjrUNvam-icIeVJ1I8N1rX-lTskuzrh8XpucudnyAwvz5iuygR9uL9aQ'
			}, {
				'type' : 'M4A1-S',
				'skinName' : 'Смешанный камуфляж',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-dluX9MLrcmVRd4cJ5nqeWrNit2AewqhY_Yj31cIDGJgRtZV-E8gS2xOzv0Z_qucvJm3M16SFw-z-DyBeWkcOk'
			}, {
				'type' : 'P2000',
				'skinName' : 'Янтарный градиент',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJcAJE7dizq42Og_b4P7LSqWZU7Mxkh6fErN_22VbkqRBrZmn3cIOTewdqZAqE8lm_xO7ngsW_vM6YzndjuSEm-z-DyNwC_Q0C'
			}, {
				'type' : 'R8',
				'skinName' : 'Янтарный градиент',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3cDx96t2ykb-GkuP1P7fYlVRD7dN-hv_E57P5gVO8vywwMiukcZjBdwBraVmG_1nsk-nug8fvus6YyHFj6HQm5HfdnUfliRFKbLE7habIVxzAUNH92sAX'
			},
		]
	}, {
		"name" : "Mirage",
		"img" : "mirage.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'AUG',
				'skinName' : 'Колония',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRv7ODYcD5H09G3homFksj5Nr_Yg2Yfu8Yk3eySodyj2wHn-RVoaz3zdo7BelA_MFrT-lLokOjn18W4uJuYymwj5HdT1XK3KQ'
			}, {
				'type' : 'G3SG1',
				'skinName' : 'Африканская сетка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZfwOP3fDhR5OOilY60m_7zO6-fxzJQ68Z02OiQpdyl2FXmqENvNWGlLI_BIQU3Nw7Rqwe9lOa81Je1uYOJlyWUbIPIHw'
			}, {
				'type' : 'Galil AR',
				'skinName' : 'Охотничья будка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczbYQJP6c--q5OHluT8Nqjunm5Q_tw_ieyVod322w3l_hdvNjugctOUegU7NAmBqwToku3ogcXu6ciam3UwuT5iuyio602etQ'
			}, {
				'type' : 'Five-SeveN',
				'skinName' : 'Наемник',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5N08y7l7-HnvD8J_XUlD1QuJ113rGW89-h2gew8kZqa2D7dtfAdVQ2ZVzT-QO_l-rp0ZS5ot2Xngcmh8ed'
			}, {
				'type' : 'P90',
				'skinName' : 'Сажа',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FBRw7PfJYS1O6eO-kYGdjrnwa-7QxDlT68F33rjEpNuijgayr0VpamjyJ47AIwdqZ13Qrlm6wey9m9bi6yqeJsBm'
			}, {
				'type' : 'P250',
				'skinName' : 'Костяная маска',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhzw8zccC1H09C_k4if2a_xML6Dxj8GupIoibmUod-n3Vbkr0FqYGv2IY_BJwc6ZAuFrFS8xb_xxcjr7uv4usk'
			}, {
				'type' : 'SG 553',
				'skinName' : 'Крокодиловая сетка',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFfwOP3fDhR5OOmjZSDmPnLP7LWnn8f7cAmi7uSoN_z3A3trRBuYWGlLI7EI1c3aAqE_QDtxbrm08fvvZ_Mzmwj5HcvKiIfXQ'
			}, {
				'type' : 'MP7',
				'skinName' : 'Апельсиновая корка',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFBRw7OfJYTh94863moeOqPv9NLPF2D4Jv5V12e2TpNj23VbgqBdlYWqnIo7Gdlc-YF6C_VO7yOjnhZ7o7pzXiSw0U0YXXNA'
			}, {
				'type' : 'Glock-18',
				'skinName' : 'Грунтовая вода',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxfwPz3fjFL-tmJmImMn-O6YrrXxWoJvJMp2euQ892n21DkqRBtZGryLdKUdg85aAqG_QC_w-_ugIj84sq2hgy4GQ'
			}, {
				'type' : 'Negev',
				'skinName' : 'Калифорнийский камуфляж',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf2-r3ZzxQ5d-3mY-0k_LnNqnFqWdY781lxLiXrI7x31e38ktqNTz7doWRcwdtYw7YrgK6yeq71MK46cjAnyQ1vSE8pSGKUNGnClk'
			}, {
				'type' : 'SSG 08',
				'skinName' : 'Тропическая гроза',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19fwOP3YTxO4eOlnIGPmODLP7LWnn8f7scj3uuU8IiniQTnqkBpMmjxcoPAJwE_Z16CqVW7yb-9gcfpu5qczmwj5Hf46J1P4Q'
			}, {
				'type' : 'MP9',
				'skinName' : 'Хот-род',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZu7OHNdQJO5du-gM7bwqb2MeuClTsCv8Ek2LiZ9t2giwa28hVlZGD0doSUIANqYV_U_gC2366x0j0WoURS'
			}, {
				'type' : 'MAC-10',
				'skinName' : 'Янтарный градиент',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0vL3dzxG6eO7kZSKm_v9MITdn2xZ_It13rzC9Nqj21DsqEs6ZWyiLI7AcVdsMl3W_1W7kr3vhJHotZzLnXFgpGB8sjEeQG_x'
			}, {
				'type' : 'UMP-45',
				'skinName' : 'Пламя',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0vL3dzFD4dmlq4yCkP_gfeuCxTMG7pFw2uiV9I-jjlHi-0dvZDygLY-dJw89NQ3QqFK3lOe9jcSi_MOeUg1XNk4'
			}, {
				'type' : 'MAG-7',
				'skinName' : 'Бульдозер',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhz3MzRdDFO48uJnIWKge66ZeuHzjMEu8Yk3LyUo4mijgDn_RVrZzumddPGcVJoZAzQr1jsw-65hoj84sp82E9QXw'
			},
		]
	}, {
		"name" : "Inferno",
		"img" : "inferno.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'MAG-7',
				'skinName' : 'Песчаные дюны',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhz3MzbcDNG09GzkImemrmtMe2CzmhQ6sR0j7zC89ig3VCyrktqNmqiJYOXdAQ8YQzWr1Ptlejmm9bi60MVxb_X'
			}, {
				'type' : 'Nova',
				'skinName' : 'Грецкий орех',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhjxszfcDFM-ciJmo-dlsj5Nr_Yg2YfuJIn2O2Wo92m2gXh-Bdramr1ItKUJlM3YFiC-Ae2kOi7hpbu7cydn2wj5HdE8usZbQ'
			}, {
				'type' : 'M4A4',
				'skinName' : 'Смерч',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz3Mzcfi9M7di5q42Ok_7hPvXTlG5X6cYh3-3E89Sk0AfnrkBkY2mhJIfEcwM4M1CDqVfsyem5gsW4ot2Xnj287ZlO'
			}, {
				'type' : 'P250',
				'skinName' : 'Пороховой дым',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhoyszPdDFS6dKJmYWPnuL5fb6AxG5XvcZ1i72UotWg3Ae1rUBoMm6gcYbDJ1dtZwvW_lC7xbrsh5Ki_MOeZVXbyKM'
			}, {
				'type' : 'Dual Berettas',
				'skinName' : 'Анодированная синева',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf0v33fzxU9eO6nYeDg7msZOKIz2hS7ZEki7mS89Tw0Ae3-Us4MWD7LIGRegc-MF2D81i-ku_vm9bi644LgQp9'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Латунь',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhhwszKYzxR_-O7kYSCgvq6ZLnXlThXu8QhiLuR89-hiwex_EA-MG_wcIfGdlQ3ZwrWqwK3kOy914j84spCpFtqYA'
			},
		]
	}, {
		"name" : "Dust",
		"img" : "Dust.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'AK-47',
				'skinName' : 'Хищник',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zSdD9Q7d-3mb-HnvD8J_WEkDoE65x03rjDrI322QfhqUtrMD2icNSRcgFtaFDX-AS9wL3u05S1ot2Xnn9ZGujG'
			}, {
				'type' : 'M4A4',
				'skinName' : 'Песчаная буря',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhoyszMdC5H_siJmImMn-O6YOvVx24C7MZy2rrD9I_00FDgqkA6YWvxdoXHegM_MAzR-AK5xunmjIj84sqcbwbCfw'
			}, {
				'type' : 'SCAR-20',
				'skinName' : 'Пальма',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7ODYTi1D4NGJmImMn-O6Nr-IxT5VsZYj3biQrNqk3gThqEA-Y2qhLI-TdwA-N1yFqAfryebphIj84spWYPOlFA'
			}, {
				'type' : 'AWP',
				'skinName' : 'Змеиная кожа',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FBRw7ODGcDZH09GzkImemrmsY-PUxmgAv5Up2rnFrdmijlXgqUA_ZjzzIIKQcQA7Y1uE_Fbtlefum9bi68KPYhsE'
			}, {
				'type' : 'AUG',
				'skinName' : 'Медянка',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFA957PDHYS1H_tSzlYS0m_7zO6-fxz0H7sEk37zDpdyi3VKxqUVla277J4-ce1I3YV6D_lS8yLrt0ZC_vYOJlyXik3twsg'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Медь',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cCx979OmhIWZqPrxN7LEmyUJ6ZBz07CUoYjz2lCx-kFpazr6JoaTe1U8Yl_V_gLtyOntgJe975qa1zI97eqxrstO'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Пламя',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLJTjtO7dGzh7-HnvD8J_XVkjoFuMYiiLqUrI-k3le3r0s5amj7d9eTI1I-M1rW-Fm_xO-50Jfvot2XnhS4_w8U'
			}, {
				'type' : 'Glock-18',
				'skinName' : 'Латунь',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0uL3cy9D_8-JnIWKge66YOLTlT8IvJcgibjEoYn331Cx-kI4N2CgJdKXIQJvYV2Eq1S3k-281oj84sq0SysHHg'
			}, {
				'type' : 'P2000',
				'skinName' : 'Скорпион',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJfAJR79OkhImEmcjkYeuBxlRd4cJ5nqeZo9-m21Xh8kY-MG-gIoeWe1c6NFDU_VK6lOi6156078nKyiZg7yEm-z-DyIv3UiOT'
			},
		]
	}, {
		"name" : "Baggage",
		"img" : "baggage.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'MP9',
				'skinName' : 'Зеленая клетка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FA957OPEcDRGvuO-kYGdjrmkMOrVxDhTupdw3b6T8dzz2AbjqUNuNzr3I4SWcgI3aVvU-Qe2wr-6m9bi6ztN_cUk'
			}, {
				'type' : 'CZ75-Auto',
				'skinName' : 'Зеленая клетка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf2-r3YTFD5djkq4iOluHtfeqAx29X7MN33u_H8I_wjgHhr0M-N2v6d4OWdgA3NF-FqFi5kOu5gsKi_MOeUYTvLOo'
			}, {
				'type' : 'G3SG1',
				'skinName' : 'Наемник',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZfwPz3YTBB09C_k4if2aKiYL-IwjgAvcQki7_HoNul2w23qBc6Zjv1I4THJAA7NV7Q8gK2wOfxxcjrGqjj_1M'
			}, {
				'type' : 'MP7',
				'skinName' : 'Оливковая клетка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFA957OPEcDRGveO7kYSCgvq6auLVzmlX6pcmj7GU9I_w0QywqUNsMG3wIYCWegA-ZVGE_VS_x7y6h4j84soz3jvt3w'
			}, {
				'type' : 'SSG 08',
				'skinName' : 'Песчаные дюны',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19fwPz3YjxM6OO6nYeDg7mjYrjTwzxTsZx0j7CU9NWn2wXkqUc6ZmynI4GVe1RtZA7VqQK8xOu6m9bi6zNHnIHx'
			}, {
				'type' : 'MAC-10',
				'skinName' : 'Пассажир',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0Ob3fShF692xkb-GlvSlY4TZk2pH8Yty37GTrYj2iwaw-kVlMTj3dtCRJFc9MluB-FG2kuq9h5S7vJTNzHYypGB8srnlEt5q'
			}, {
				'type' : 'P2000',
				'skinName' : 'Эконом-класс',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zLZAJO-duxlYeOqOemY-uBqWdY781lxL_F84_wiQPnqhVkMmqgcoKXcgI8NwrX_wPrx-fsgZPv6pjMy3dgvic8pSGKGYo2X-E'
			}, {
				'type' : 'P90',
				'skinName' : 'Кожа',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PHafipM09CzlZSDkuXLI-KBqWNU6dNoxOqSpI_z3wbt-xBqYjjxd9CTdVBrNAvV-FbrwLi8hce56JvPyHZguSM8pSGKiqmG55o'
			}, {
				'type' : 'SG 553',
				'skinName' : 'Странник',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3fShF692xkb-YkKKhYITck29Y_cg_37iSotjw2gDl_0JvZWqlJdSSdgA7YljQqVfvl73mg5O-usvIzXFj7D5iuygYr35g1g'
			}, {
				'type' : 'USP-S',
				'skinName' : 'Бизнес-класс',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq4yekPD1NL7ug3hBpdZOhuDG_Zi721WwqBJvMGH2coPEJwRsYVDT_lm3kO_vgJ_pvZ_MzXZivXZ04nyOlwv330_YPZS7Gw'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Первый класс',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cih9686zkY60m_L1J7PUhFRC6dJ0jubH87P4jVC9vh5yNWyhdYLEIFc6aFiGrwC2yLi6gsK-6M7KyHIwuyJwsXbVnhW0hxpFaPsv26Ju1DZk9g'
			}, {
				'type' : 'XM1014',
				'skinName' : 'Красная кожа',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PDdTjFH7ci-kZK0j_qlY-qFqWdY781lxL3Dp4qjjgOwrUQ4Y2qlJNTDIAQ5YAzRrlG4kufrjcTutM6dmiBj6SA8pSGKXAbUj-c'
			}, {
				'type' : 'AK-47',
				'skinName' : 'Первый класс',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszPYzhH4uO6kYGfn_LmDLrawjxu5cB1g_zMu9rw0Fbl-kJuY2r3cI-RIVI-MlzTr1foxOe6hcC-6ZvPnCFquChz5XjD30vgHKsTYF0'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Пилот',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTi1L4NOiq4SOlvD4NoTck29Y_cg_3bzHptWg2AK1qEs4NmqhcYeWelc6ZFiD-1G6wejmh8K9u5nIz3Zhvj5iuyh1BFVufw'
			}, {
				'type' : 'AK-47',
				'skinName' : 'Путешественник',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszfdDFO08iklZaOm_LwDLrawjxu5Mx2gv2PotytiQHnqhBoZGqnI9XBcgQ-Yl_Y_Vfvyey9g8S4753JzSA1s3Eh5GGdwUIoc5a5cw'
			},
		]
	}, {
		"name" : "Bank",
		"img" : "bank.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'MP7',
				'skinName' : 'Пиксельный камуфляж «Лес»',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFA957PfMYTxW09C_k4if2aemY-zXlD5X7ZVw2-yTpI_xjFXm8xZsY2ylI4-TclA8NQvU_VO2k-fxxcjrEfavWb4'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Пиксельный камуфляж «Город»',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszMdS1D-OOjhoK0mvLwOq7c2D4B6pwijLiXpt6s3lDkrkJvZG-hLI7Ee1M7YVmC8gO-kunrjZK1tJXXiSw0uDynv1g'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Пиксельный камуфляж «Лес»',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3eSR96NimlZS0m_7zO6-fkzhXvJIniL6Xrdqs21Xk_0Vlam2iLYbAcFdtMFjU_wW9w-e6g5-5u4OJlyXfj1l0Bw'
			}, {
				'type' : 'SG 553',
				'skinName' : 'Армейский блеск',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0v73cC9P9eOlnImFksj4OrzZgiVQuJJw077FoIr3iQPnqhY5MD-gIdXGewU4ZQ3QrlW9lerojZ--v5rK1zI97cHouWKJ'
			}, {
				'type' : 'Negev',
				'skinName' : 'Армейский блеск',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf0v73cC9P9eOlnImFksj5Nr_Yg2YfvcQnjLGVrNn0jgGxqhJqYTunctWRdQE8YlCE-lS4lbzsjZTovp3AmGwj5HdxpNpfKQ'
			}, {
				'type' : 'Glock-18',
				'skinName' : 'Гремучая смерть',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf2-r3fzhQ49i_lb-HnvD8J_WEwjsBvpJ33bmS94qiigTm-xdkNTynctXGdAU8Y13S-QDsxerm0ZC0ot2Xnjdfx6Ff'
			}, {
				'type' : 'MAC-10',
				'skinName' : 'Серебро',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0v33YjRO-tmkq4yCkP_gfbqEkmpQvpYg2u2Ro9yl3gS1_xE_ZmqnJteTdgc7YgmEq1m7lLq61pWi_MOeTf6eBqg'
			}, {
				'type' : 'Nova',
				'skinName' : 'Клетчатая сталь',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhh3szHZzxO09SzjL-HnvD8J_WGwD0AuZ0o07nDptun3gLl_BY4ZWvzJ9Ocd1dsMl_R_lC5lby7hZO7ot2XnnibtMPm'
			}, {
				'type' : 'G3SG1',
				'skinName' : 'Зеленое яблоко',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZfwPz3di9H6dKJmImMn-O6YePSwm4GupIk3evEo9ii3wG3-kJtYjigJNOScwI8MFnU_QLvkrzm1oj84srJ8w6n6Q'
			}, {
				'type' : 'UMP-45',
				'skinName' : 'Углепластик',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0v73cjxQ7tO4q4aClfLmDLfYkWNFpscj37nDrdqlilax_RVrMm_7LYKRelVtZV-C_ADtw-vrh5Hpv8nBzXp9-n517oYZno4'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Метеорит',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTj5Q9c-ilYyHnu3xN4TVl3la18l4jeHVu97x31Dj_kA9a2DwcdWWJAZvZV_Qqwe3x-fv1Me6uMmanCE3vSEm4ynD30vgrmdJqGM'
			}, {
				'type' : 'Galil AR',
				'skinName' : 'Смокинг',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczbfgJN_t-3q4yCkP_gfe7VlDwJv5Up3r-V8Nym2Vfi80U9NmumI4WVJw83Zg3Q-1S8x7_o0Mei_MOe7tXEvoo'
			}, {
				'type' : 'CZ75-Auto',
				'skinName' : 'Смокинг',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZfwPz3fi9B7eO6nYeDg7msZ-KBzj0E7cdw2b_CpdX2i1Dj_hJlMWilLYWRdgNoN1qF8we8k-a5m9bi6-1tbAt1'
			}, {
				'type' : 'AK-47',
				'skinName' : 'Изумрудные завитки',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszYeDNR-M6_hIW0lvygZITZk2pH8Yt33byV8N-ii1Dn8kVqMWv0IYGQIQ47YQvS_FG4k-i6h8Tq6pjBznBqpGB8snmEYrAC'
			}, {
				'type' : 'P250',
				'skinName' : 'Франклин',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszFfjNH9eO7kYSCgvq6Z-mHwjIFu8Yl3-3Hotr03QC28ktkYmGnIoXAdARoZVzZ_VW7yeu7jIj84sqiLuLNUw'
			},
		]
	}, {
		"name" : "Chop Shop",
		"img" : "chopshop.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'M249',
				'skinName' : 'Ударная дрель',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhz3MzDdCRB49C5hpO0n_L1JaKfwDpTsJF1ib3C99ymiwyw_UtvYjqiJNPHJFU4Zw2BrlC9w-fvjZLt6YOJlyVhnYj89A'
			}, {
				'type' : 'SCAR-20',
				'skinName' : 'Армейский блеск',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PLFTjxQ4cWJh4iCmfLLPr7Vn35cppV02LuXrYmgilG3-kJsZzvycdLDdQFraVyE8wO2l-_p0Z-56sjBzid9-n51ZugYOhk'
			}, {
				'type' : 'MAG-7',
				'skinName' : 'Чайка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhz3MzJYChD09SzlZaS2aL3ZL3TwjIHsJImjuiYo4mg3lC3rkY5Z2DycYfGdVM3aFjXrlS-wuvxxcjrKyci_ww'
			}, {
				'type' : 'CZ75-Auto',
				'skinName' : 'Армейский блеск',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0v73cC9P9eOlnImFksj5Nr_Yg2Yfv5dwiLjHpdyjjgS18kZlNW2gcdCSIQQ8ZF7SqQLtl7vp18C97ZvNwGwj5He_r99Vaw'
			}, {
				'type' : 'USP-S',
				'skinName' : 'Едва зеленый',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ08-5q4uDlvz9DLzDk25f1810i__Yu42g2lLm8kA4N26md9fBcgE2ZlvZ8gW9wey-jZC16pudz3Jjsicg5CrD30vgwzvxu2M'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Ночь',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7ODHTjNL69Siq4iOluHtfeqIk29XvMcn2LmTrN-sjVW280E-Ym3yIo-WI1I-ZwqC_lK5l728hZei_MOe7MNzwV8'
			}, {
				'type' : 'Galil AR',
				'skinName' : 'Городской щебень',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczAaAJU7c6_l4GGmMjhIbnQmFRZ7cRnk6eVpd2k3Qyx_UNpY2ymI4aQcVVoY1iDrAO2kOjshJPtus_NzCNq6HUl-z-DyJA6J-Hc'
			}, {
				'type' : 'Five-SeveN',
				'skinName' : 'Нитро',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5N09OklY6Mksj1MLjUmH9C1810i__Yu9um2w22qkJkZ2-hctCWJ1I2NQ2E81G8x7q505G9vczAznRjuSQn4C3D30vgF3v-5zk'
			}, {
				'type' : 'MAC-10',
				'skinName' : 'Градиент',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0vL3dzxG6eO6nYeDg7miZbqDxj8B7Z0n2-3E94mjjQTirRI9MTjyIIWQeg84Y1DS_lm3wOfom9bi6-g13CfU'
			}, {
				'type' : 'MP7',
				'skinName' : 'Полная остановка',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFA957OXJYzRB7dG5q5KOk8j8NrrHjyVXupIg2biQptSt3gPlrUZlNmmhcNWSIFI5M1rT_ATtybjmhce06pqb1zI97QxO8B3s'
			}, {
				'type' : 'P250',
				'skinName' : 'Снежная мгла',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzfeTRW6dOjgL-DkvbiKvWElTII6ZIhj--Sp433jgXj-UduMGr2JIbBJ1dsaQ6DrwC8xL_n0Jbuot2XnjwhZrR8'
			}, {
				'type' : 'CZ75-Auto',
				'skinName' : 'Изумруд',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0v33dDBH_t26kL-HnvD8J_WElT8Gu5Eg27iVotv00Azg80ZtMDimIo-ceg45YAuCrFbtyenv1sW6ot2Xntd6B4y4'
			}, {
				'type' : 'Dual Berettas',
				'skinName' : 'Дуэлист',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf1OD3fDJW5Nmkq4-NqOfxMqndqW5d4dF0teTE8YXghRq1-UM5Nj_yIYKQewFrY1rR_1i-x-u61MXouMmdzHc37yEmsH7ayRO3n1gSOdhIizzL'
			}, {
				'type' : 'SG 553',
				'skinName' : 'Бульдозер',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFfwPz3aDhO4NOhq4iOluHtfbqClG0JvMQp2rmVod_z3w3n8hE5YGmncoSddgE9aV6ErFS3kufvgMCi_MOeujbJjuM'
			}, {
				'type' : 'Glock-18',
				'skinName' : 'Сумеречная галактика',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73cCxX7eOwmIWInOTLP7LWnn8f7ZJ13rjC8NjxilLkqBduaj_ycdSWJldvZAuF-gPsxuvs1MTovZTJymwj5Hd3abH-_Q'
			}, {
				'type' : 'M4A1-S',
				'skinName' : 'Хот-род',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ'
			},

		]
	}, {
		"name" : "Gods & Monsters",
		"img" : "godsmonsters.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'AUG',
				'skinName' : 'Дедал',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRw7P_JcyRQ5dKinNO0mvLwOq7c2DJTv51zjrnE8NygiQzh_kc-a2iiLNSSdlc3aQnUrwDolb-80MLv7pnXiSw0HmqdeSU'
			}, {
				'type' : 'Dual Berettas',
				'skinName' : 'Луна в знаке Весов',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf2-r3azJG5d21xb-GkvP9JrafkjkA7cYn2--TrY7z0QTk-hE-MD-lJITHegI9ZV3Vq1Xvx7jvgJG5tIOJlyWrNM96nA'
			}, {
				'type' : 'Nova',
				'skinName' : 'Луна в знаке Весов',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhoyszSfjlL7d_nq4iOluHtfbiEwDlQ65Up0rCQptXxjle1-hZlMWvzLIecewZqM1vV_AW-ye651sKi_MOegT0cVm4'
			}, {
				'type' : 'MP7',
				'skinName' : 'Астерион',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFBRw7P_JcyRQ5dKinL-GkvP9JraflD8JsJ0p076Y99Sl0A3j-RA-azv2cYaScQ89Y1iE-QTskri-hpHq7oOJlyWB9kL-pA'
			}, {
				'type' : 'AWP',
				'skinName' : 'Солнце в знаке Льва',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957OnHdTRD746JnIWKge66ZezUkjNX7Jwp2rnCpo2t2Qfk8xJpMTqld47DdlI_ZgqCqQLsxbvmgIj84sqMMdFayA'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Аид',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszAcDlH_-O-kYGdjrmnY7rSkD9VvcFwib7A8Nrx2w3srkA-NW3wLdCRdVU9Mg7X-FS4l-7mm9bi68L8E_3E'
			}, {
				'type' : 'M249',
				'skinName' : 'Приморский прогноз',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhoyszSfjlL7d_lq4iOluHtfevTxm8J6Z0m3uyUp96li1K1-BFrazz7IteRdFQ4aFnWqQTrwrrnhJ-i_MOedcIbTZY'
			}, {
				'type' : 'P2000',
				'skinName' : 'Лабиринт',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zbYQJO7d6vhomFg_-mDLbUkmJE5Ysn37GQ9Nuh3QHm8hBvZmmiJNDBewM3M1vXrAC_xOm90MLt7svLwSNqpGB8sm38TgsC'
			}, {
				'type' : 'UMP-45',
				'skinName' : 'Лабиринт минотавра',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3fTxA9c6_mpSDqPrxN7LEmyVU7p0o3-iU8Y-k3QS2qEU9ZT_6d9Sdew46MgqE_QO7lLrog8C47ZuY1zI97d-e9afQ'
			}, {
				'type' : 'MP9',
				'skinName' : 'Ящик Пандоры',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZh7OPJfzlN_t2JmYWPnuL5fevTlz0F7pIgieqUrYitiQWy-hdrNWumddfAcVU_NF3Zr1jvxbvu1sWi_MOepgbcjQQ'
			}, {
				'type' : 'M4A1-S',
				'skinName' : 'Падение Икара',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-ClPbmJqjummJW4NE_3ujHpY2sigXl-UFoZGj7JYCXdgQ4YVnQ-1Lqxenn1MLpuszJz3tk6D5iuyjCqdNpmA'
			}, {
				'type' : 'G3SG1',
				'skinName' : 'Хронос',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf0Ob3cjVQ49K5h7-MxOTzYoTck29Y_cg_3-3A8Nqj2VLl_Bc4YT32IIWRcQJsaV_Y-1Lskr2-15G4up6bm3Ayuz5iuyjiZUxvZw'
			}, {
				'type' : 'M4A4',
				'skinName' : 'Посейдон',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszYfi5H5di5mr-GkvP9JrafwDtV7cAl2uiYpoqt3Q3n-kNkZWCmINTHe1I_YgrV-wS8xb-91p_vuoOJlyUlgXdlZw'
			}, {
				'type' : 'AWP',
				'skinName' : 'Медуза',
				'rarity' : 'covert',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdShR7eO3g5C0mvLwOq7c2DkAvJQg27iT9NWm2VK3rkU6YmmiI4SVJAQ9MljUr1O5ku7ug8K1usnXiSw07gvX0uU'
			},
		]
	}, {
		"name" : "Italy",
		"img" : "italy.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'AUG',
				'skinName' : 'Наемник',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRv7OPFcgJO5du-gM6OxfakZbnQw28H65Eg2L2RrYin3ADjrkJqYWz0Jo6UdVNrYV3SqAW9366x0l1OAhlP'
			}, {
				'type' : 'FAMAS',
				'skinName' : 'Колония',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRfwPz3Yi1D79mJmYGZnvnxDLfYkWNFpsdy2uiQpNyt2FftqUA-ZmmgJYXBJlRrZQmGq1Lox7jmg5W9vcucmnZ9-n51AJPKCtE'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Грунтовая вода',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhz3MzHfTRU6eO-kYGdjrmjau-EzzkGvcEnibjDotqiilKyrUY-MGDwJYOVIwNoYg7V-le8yLztm9bi63kWu9PZ'
			}, {
				'type' : 'PP-Bizon',
				'skinName' : 'Песчаная штриховка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlfwOP3ZTxS6eOlnI-Zg8jnMrXVqWdY781lxO3C89Wk21Xnqkc6MD33JoeVcwQ6aVqF8gK_krzqgMK8ucnAwXBr7Ck8pSGKKT36elM'
			}, {
				'type' : 'Nova',
				'skinName' : 'Песчаные дюны',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhz3MzbcDNG09C_k4if2aSna-6FwzsJu5Ypj-uVrdyk2wzkqEQ4ZD3wJo7DcAQ2ZAmE-QC5xejxxcjrmUdg9dQ'
			}, {
				'type' : 'M4A1-S',
				'skinName' : 'Северный лес',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-NmOXxIK_ulGRD7cR9teHE9JrsxlGy_EdvMGGmI9LAewNvaFrY-VG5wLy9jcXov8nOmHMx6ygl4XePlxGpwUYbs3f5UC8'
			}, {
				'type' : 'Dual Berettas',
				'skinName' : 'Патина',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf0uL3dzJQ79myq4yCkP_gfbiHwz8DvZMn27rEpdSs21bl_RE5YW6iI4CXc1NtZV7Zq1e9kOfmgJOi_MOekFRFcA0'
			}, {
				'type' : 'XM1014',
				'skinName' : 'Калифорнийский камуфляж',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PvRTitD_tW1lY2EqPPxIL7DglRd4cJ5nqeZrN-ki1ayrUE9MmrxLY-Xeg85ZlzS-gW-xOjug8S_vJucm3IysyF0-z-DyLOku5tY'
			}, {
				'type' : 'UMP-45',
				'skinName' : 'Пороховой дым',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf2-r3djhO_Nm4q42Ok_7hPvWHwDkJu8Ao3uzA9I-kigbk-0Q5ZWGidYGddg84ZVDT_Vfrk-no0Je7ot2XnjSEoaSR'
			}, {
				'type' : 'P2000',
				'skinName' : 'Мраморный гранит',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zAaAJF_t24nZSOqP_xMq3I2DtTucNz3rmQpt2sjAew-kpqNTj6cI6UI1dsMwmF-gS_x-q8hZTvtJTXiSw0GvFmxcU'
			}, {
				'type' : 'Nova',
				'skinName' : 'Карамельное яблоко',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhz3MzadDl94dmynZWG2aega-7TkjtQuMMgj7iR9NugiQft-RJtNm-ndoCRIwVvM1jSrwK9kO_xxcjr6R38t40'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Полная остановка',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3eSR9-t2knYOKmvjLIb7VqWdY781lxLHF99il0Ffg-EJrNmj6dtDBJA5vNQvWqVK_ye3sh5G0upvNy3FnviU8pSGKve7IyHk'
			}, {
				'type' : 'MP7',
				'skinName' : 'Анодированная синева',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFAZu7P3JZyR94NWxnJTFwPWjY-6CxT1Su8B03r6T8Y6s2wft-EJpam6lJNfHcw8_Y1nXqFLqkvCv28FJ8mUtyA'
			}, {
				'type' : 'Glock-18',
				'skinName' : 'Карамельное яблоко',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxfwPz3YzhG09C_k4if2aajMeqJlzgF6ZF10r2RrNyg3Qzjrkptazj7IYaVdwE4NFHRqFHtk-fxxcjr1j3fJ1k'
			}, {
				'type' : 'AWP',
				'skinName' : 'Гадюка',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957ODGcDZH_9e_mr-DkvbiKvWFxDhTvMMi3ryWrNyj0Qbi8kQ4Nz3xI9CWJgQ8Nw3Vr1i_wem5hJ-9ot2XnjzZQCBr'
			},
		]
	}, {
		"name" : "Rising Sun",
		"img" : "risingsun.png",
		"type" : "Collection",
		"weapons" : [{
				'type' : 'G3SG1',
				'skinName' : 'Оранжевое кимоно',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf2-r3ejRP49K5q4SClvr7Pb_CqWRD6ct2j9bJ8I3jkRrnqEI9Njv2ddKWIQE3YQ7T_lPtwuvr1sS675zKmyQwuXYk43zcn0bmn1gSOQyGRkl0'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Бамбуковые заросли',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszKcDBA49OJnpWFkPvxDLPUl31IppEijOvFrdr0iwzirRA4Ymqnco_HcAc-NFCD_VK9l7_njJDtuczAynR9-n51oajK6Us'
			}, {
				'type' : 'P250',
				'skinName' : 'Кимоно цвета мяты',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhzw8zDeDBN4tOJkImKmvj6N6junm5Q_tw_372R9N333QPs_hJlZGjyIIHEJwJsZQ2G_ATtxO2-jZG5uc7Nn3M2sz5iuygclVPvsA'
			}, {
				'type' : 'PP-Bizon',
				'skinName' : 'Бамбук',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf2-r3czxP7tO5q4qemfD4NoTYmGBu4MBwnPCP8dSj2Vbi_hJtZGCmJtKQJlBtZlnV8wC6l-bphMS0vpWYzHRmviQh52GdwUImyimesA'
			}, {
				'type' : 'Sawed-Off',
				'skinName' : 'Тень бамбука',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3eSR97t27lo-EqP3hPbzdk1RT5MRygdbJ8I3jkRrgqEpqN2D2LY6XJFA_N1rV_ljrx--8g8W97ZrPnSY1syh0tCmInRy-n1gSOTvdU3xS'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Ночная буря',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTi5H7c-im5KGqP_xMq3I2DID7pZw2b6UpY6hjQTj_0ZkNz_xcdOXdgA2aV_S8gXqk7jqg5G-v53XiSw0vau75Eg'
			}, {
				'type' : 'P250',
				'skinName' : 'Малиновое кимоно',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhoyszDeDBN4tOJkImKmvj6N6juhG5V1810i__Yu4it0QHm-ks_YWn1IIXEcFI2Yl_U8gDtkObvhpa4vMicm3RjsiBz5yrD30vggAIcFk0'
			}, {
				'type' : 'Tec-9',
				'skinName' : 'Терраса',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszPdDJP6ciknYO0hOPxI6juj25d5MpmteTE8YXghRq2rhE6NzyiI4adIFU_ZFmCq1Dqle_thce0upjBz3IxuSIrsXaOnhHin1gSOam774aE'
			}, {
				'type' : 'Galil AR',
				'skinName' : 'Водная терраса',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczJfAJF6dO7kZSZnvTLIK_Uhnhu4MBwnPCPoI_2iVK1_RVrMGz2IYKRdVdrMF6E_wW_w-bqhZbpu5rIz3Ni6Cgms2GdwUJTK7A28Q'
			}, {
				'type' : 'MAG-7',
				'skinName' : 'Антитерраса',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhoyszPdDJP6ciknYO0hOPxI6jukXlU7ctOguzA45W72Q3k_hdpYm-iIYSddQc-YVyD-lK7l-3v1p-56MiYz3RquCV2sHvfzQv330-hLT2elw'
			}, {
				'type' : 'M4A4',
				'skinName' : 'Рассвет',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhh3szDeDBN4tOJh5WFhf7nNoTZk2pH8Ysii7uYo4r221DkqkdvZm37LYecdlQ8YgrSrgK3kOzu05C-u53AyXI1pGB8suJlCAfZ'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Буря на закате 壱',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTi5H7c-im5KGqPX4PLTVqWZU7Mxkh6eYoNug0Qzn80Y9ZTyncNPAJlJvMF2EqFi6wOa-gpC47pmYz3Zk6XF2-z-DyOzAiWG4'
			}, {
				'type' : 'Desert Eagle',
				'skinName' : 'Буря на закате 弐',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTi5H7c-im5KGqOT8PLHeqWNU6dNoxLHEoY6n2VXiqEdpazulddOWIAdtZFGF8lnol7_uh5K_upybnHs3vCc8pSGKn-HkWew'
			}, {
				'type' : 'Five-SeveN',
				'skinName' : 'Неоновое кимоно',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTjVb09e_mY-FmMjwOrrcmWVV-_p8j-3I4IG70AHk-xZqMm2iItWQcgc-MwzT_Fm3xubqjJe87p7KzydmvyMg4H3ayQv3309niA2tcQ'
			}, {
				'type' : 'AK-47',
				'skinName' : 'Гидропоника',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh3szKcDBA49OJnpWFkPvxDLfYkWNFppwpie2Rp9_w0VDm-UNrMj30IoPHdAY-M1rY-1K7w7291pO8vJTJzHN9-n51xLwwH8g'
			}, {
				'type' : 'AUG',
				'skinName' : 'Акихабара',
				'rarity' : 'covert',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLGeDBH092jk7-HnvD8J_XXxj8IuJIkib-VoNSi2VGx_UQ-Yzv3I4SQcVA7aAvS_FC6wru51pK1ot2XnmtK7ev7'
			},
		]
	}, {
		"name" : "Dust II",
		"img" : "dust2.png",
		"type" : "Souvenir",
		"weapons" : [{
				'type' : 'Сувенир G3SG1',
				'skinName' : 'Песчаная буря',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf2-r3dThR6c6iq4yCkP_gfe_Uwz4HuZ0p3u-Q9oiijgyw_UpqZjv6d4GcewdoaVGB_VG8k-nt15Ki_MOekXjyVoE'
			}, {
				'type' : 'Сувенир MP9',
				'skinName' : 'Песчаная штриховка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FBRw7OfJYTh9_9S5hpS0hPb6N4Tdn2xZ_Isp07rFpY70i1Lk-ERpY233LNXAJAJsNFmG_FW3xOfu15-6vp_AyXU2pGB8suBC9uz5'
			}, {
				'type' : 'Сувенир Nova',
				'skinName' : 'Хищник',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhzw8zSdD9Q7d-3mb-DkvbiKvXSwDMEsJci0u_Fooii31Ky8kE-ZzzwJoCTcQA4NV_Zq1bolOzogsDpot2Xno1tLOyh'
			}, {
				'type' : 'Сувенир P250',
				'skinName' : 'Песчаные дюны',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzbcDNG09C_k4if2fSjZLmGwDkBsZZz3r6Zo4mliwTj-0BtZDz1dYSUcAdtYw3XqFXtyejxxcjrr8fSJ40'
			}, {
				'type' : 'Сувенир P90',
				'skinName' : 'Песчаное напыление',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FBRw7ODYYzxb08-3moS0mvLwOq7c2GlUuZR0ibiRpNqs2VXi-kI5Mm2hd4GdIQM9NwrW-Va5xObmjJK-uczXiSw0I3Bdoc4'
			}, {
				'type' : 'Сувенир SCAR-20',
				'skinName' : 'Песчаная сетка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7ODYTjBH_9SJh4GFk8j5Nr_Yg2Yf6ZEl3O3D99mm2gTkrUBsYzj0LIWWcwRtYgvU-1K7w-7tg5fv75TPnWwj5HeMNR9tGQ'
			}, {
				'type' : 'Сувенир AK-47',
				'skinName' : 'Африканская сетка',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zFdC5K08i3mr-HnvD8J_WBxTwD6ZB12b7Hodumig23rUY5YTymJ4TBcFA7NVvW-FW5l-zr1JXtot2XnkNBBWuK'
			}, {
				'type' : 'Сувенир Five-SeveN',
				'skinName' : 'Апельсиновая корка',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5S08i3hIW0mOX1PbzUqWdY781lxO2WrdjwiwS38kFtYG-mLdCWJAU9MgnQ81W6xbi5gcDpuszIn3dguiA8pSGKjf2ztEE'
			}, {
				'type' : 'Сувенир MAC-10',
				'skinName' : 'Пальма',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwOP3YTxO4eO6nYeDg7n2YeOGlWpTvpwj2-zEpNjx0A3krkFlNm2nJoWVdQM8ZwnW-FK2wOzmm9bi64Jdj8z-'
			}, {
				'type' : 'Сувенир Tec-9',
				'skinName' : 'Смешанный камуфляж',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszecC9L7927m7-HnvD8J_WJlzMHu5Yo2urFpYr22gDnqEBqam6gJ9KQdwc_YlGE-VS7wri70Ja_ot2Xnk_reDFK'
			}, {
				'type' : 'Сувенир Sawed-Off',
				'skinName' : 'Змеиная кожа',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3Yi19_9K3n4W0m_7zO6-fw24HvcQi37nHptz0iQHt-Rc5YWr3coCWc1I7NVqDrli2ye3n08S46YOJlyXnI7k0UA'
			}, {
				'type' : 'Сувенир PP-Bizon',
				'skinName' : 'Латунь',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0uL3cy9D_8-JnIWKge66YrrQwGpTsZ0m27rF8NqjjVCwqUA4NziiIYHBJAQ_ZwyC_VDtw7-6h4j84sq1nvST4w'
			}, {
				'type' : 'Сувенир SG 553',
				'skinName' : 'Дамасская сталь',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0uL3dTxP7c-1gZO0hPChZujummJW4NE_372Sptmg3gzjrUNvam-icIeVJ1I8N1rX-lTskuzrh8XpucudnyAwvz5iuygR9uL9aQ'
			}, {
				'type' : 'Сувенир M4A1-S',
				'skinName' : 'Смешанный камуфляж',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-dluX9MLrcmVRd4cJ5nqeWrNit2AewqhY_Yj31cIDGJgRtZV-E8gS2xOzv0Z_qucvJm3M16SFw-z-DyBeWkcOk'
			}, {
				'type' : 'Сувенир P2000',
				'skinName' : 'Янтарный градиент',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJcAJE7dizq42Og_b4P7LSqWZU7Mxkh6fErN_22VbkqRBrZmn3cIOTewdqZAqE8lm_xO7ngsW_vM6YzndjuSEm-z-DyNwC_Q0C'
			}, {
				'type' : 'Сувенир R8',
				'skinName' : 'Янтарный градиент',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3cDx96t2ykb-GkuP1P7fYlVRD7dN-hv_E57P5gVO8vywwMiukcZjBdwBraVmG_1nsk-nug8fvus6YyHFj6HQm5HfdnUfliRFKbLE7habIVxzAUNH92sAX'
			},
		]
	}, {
		"name" : "Mirage",
		"img" : "mirage.png",
		"type" : "Souvenir",
		"weapons" : [{
				'type' : 'Сувенир AUG',
				'skinName' : 'Колония',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRv7ODYcD5H09G3homFksj5Nr_Yg2Yfu8Yk3eySodyj2wHn-RVoaz3zdo7BelA_MFrT-lLokOjn18W4uJuYymwj5HdT1XK3KQ'
			}, {
				'type' : 'Сувенир G3SG1',
				'skinName' : 'Африканская сетка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZfwOP3fDhR5OOilY60m_7zO6-fxzJQ68Z02OiQpdyl2FXmqENvNWGlLI_BIQU3Nw7Rqwe9lOa81Je1uYOJlyWUbIPIHw'
			}, {
				'type' : 'Сувенир Galil AR',
				'skinName' : 'Охотничья будка',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczbYQJP6c--q5OHluT8Nqjunm5Q_tw_ieyVod322w3l_hdvNjugctOUegU7NAmBqwToku3ogcXu6ciam3UwuT5iuyio602etQ'
			}, {
				'type' : 'Сувенир Five-SeveN',
				'skinName' : 'Наемник',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5N08y7l7-HnvD8J_XUlD1QuJ113rGW89-h2gew8kZqa2D7dtfAdVQ2ZVzT-QO_l-rp0ZS5ot2Xngcmh8ed'
			}, {
				'type' : 'Сувенир P90',
				'skinName' : 'Сажа',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FBRw7PfJYS1O6eO-kYGdjrnwa-7QxDlT68F33rjEpNuijgayr0VpamjyJ47AIwdqZ13Qrlm6wey9m9bi6yqeJsBm'
			}, {
				'type' : 'Сувенир P250',
				'skinName' : 'Костяная маска',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhzw8zccC1H09C_k4if2a_xML6Dxj8GupIoibmUod-n3Vbkr0FqYGv2IY_BJwc6ZAuFrFS8xb_xxcjr7uv4usk'
			}, {
				'type' : 'Сувенир SG 553',
				'skinName' : 'Крокодиловая сетка',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFfwOP3fDhR5OOmjZSDmPnLP7LWnn8f7cAmi7uSoN_z3A3trRBuYWGlLI7EI1c3aAqE_QDtxbrm08fvvZ_Mzmwj5HcvKiIfXQ'
			}, {
				'type' : 'Сувенир MP7',
				'skinName' : 'Апельсиновая корка',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFBRw7OfJYTh94863moeOqPv9NLPF2D4Jv5V12e2TpNj23VbgqBdlYWqnIo7Gdlc-YF6C_VO7yOjnhZ7o7pzXiSw0U0YXXNA'
			}, {
				'type' : 'Сувенир Glock-18',
				'skinName' : 'Грунтовая вода',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxfwPz3fjFL-tmJmImMn-O6YrrXxWoJvJMp2euQ892n21DkqRBtZGryLdKUdg85aAqG_QC_w-_ugIj84sq2hgy4GQ'
			}, {
				'type' : 'Сувенир Negev',
				'skinName' : 'Калифорнийский камуфляж',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf2-r3ZzxQ5d-3mY-0k_LnNqnFqWdY781lxLiXrI7x31e38ktqNTz7doWRcwdtYw7YrgK6yeq71MK46cjAnyQ1vSE8pSGKUNGnClk'
			}, {
				'type' : 'Сувенир SSG 08',
				'skinName' : 'Тропическая гроза',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19fwOP3YTxO4eOlnIGPmODLP7LWnn8f7scj3uuU8IiniQTnqkBpMmjxcoPAJwE_Z16CqVW7yb-9gcfpu5qczmwj5Hf46J1P4Q'
			}, {
				'type' : 'Сувенир MP9',
				'skinName' : 'Хот-род',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZu7OHNdQJO5du-gM7bwqb2MeuClTsCv8Ek2LiZ9t2giwa28hVlZGD0doSUIANqYV_U_gC2366x0j0WoURS'
			}, {
				'type' : 'Сувенир MAC-10',
				'skinName' : 'Янтарный градиент',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0vL3dzxG6eO7kZSKm_v9MITdn2xZ_It13rzC9Nqj21DsqEs6ZWyiLI7AcVdsMl3W_1W7kr3vhJHotZzLnXFgpGB8sjEeQG_x'
			}, {
				'type' : 'Сувенир UMP-45',
				'skinName' : 'Пламя',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0vL3dzFD4dmlq4yCkP_gfeuCxTMG7pFw2uiV9I-jjlHi-0dvZDygLY-dJw89NQ3QqFK3lOe9jcSi_MOeUg1XNk4'
			}, {
				'type' : 'Сувенир MAG-7',
				'skinName' : 'Бульдозер',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhz3MzRdDFO48uJnIWKge66ZeuHzjMEu8Yk3LyUo4mijgDn_RVrZzumddPGcVJoZAzQr1jsw-65hoj84sp82E9QXw'
			},
		]
	}, {
		"name" : "Inferno",
		"img" : "inferno.png",
		"type" : "Souvenir",
		"weapons" : [{
				'type' : 'Сувенир MAG-7',
				'skinName' : 'Песчаные дюны',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhz3MzbcDNG09GzkImemrmtMe2CzmhQ6sR0j7zC89ig3VCyrktqNmqiJYOXdAQ8YQzWr1Ptlejmm9bi60MVxb_X'
			}, {
				'type' : 'Сувенир Nova',
				'skinName' : 'Грецкий орех',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhjxszfcDFM-ciJmo-dlsj5Nr_Yg2YfuJIn2O2Wo92m2gXh-Bdramr1ItKUJlM3YFiC-Ae2kOi7hpbu7cydn2wj5HdE8usZbQ'
			}, {
				'type' : 'Сувенир M4A4',
				'skinName' : 'Смерч',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz3Mzcfi9M7di5q42Ok_7hPvXTlG5X6cYh3-3E89Sk0AfnrkBkY2mhJIfEcwM4M1CDqVfsyem5gsW4ot2Xnj287ZlO'
			}, {
				'type' : 'Сувенир P250',
				'skinName' : 'Пороховой дым',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhoyszPdDFS6dKJmYWPnuL5fb6AxG5XvcZ1i72UotWg3Ae1rUBoMm6gcYbDJ1dtZwvW_lC7xbrsh5Ki_MOeZVXbyKM'
			}, {
				'type' : 'Сувенир Dual Berettas',
				'skinName' : 'Анодированная синева',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf0v33fzxU9eO6nYeDg7msZOKIz2hS7ZEki7mS89Tw0Ae3-Us4MWD7LIGRegc-MF2D81i-ku_vm9bi644LgQp9'
			}, {
				'type' : 'Сувенир Tec-9',
				'skinName' : 'Латунь',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhhwszKYzxR_-O7kYSCgvq6ZLnXlThXu8QhiLuR89-hiwex_EA-MG_wcIfGdlQ3ZwrWqwK3kOy914j84spCpFtqYA'
			},
		]
	}, {
		"name" : "Cache",
		"img" : "Cache.png",
		"type" : "Souvenir",
		"weapons" : [{
				'type' : 'Сувенир AUG',
				'skinName' : 'Радиационная опасность',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRw7P3dejhR-M6_hIW0mOX1PbzUqWpE7_p9g-7J4cKh2wTt-kBkMT32do_Adwc2Z1rYrlS_xr_tgpO7uJqcmnswuCIi4ivegVXp1vNtKNLo'
			}, {
				'type' : 'Сувенир Five-SeveN',
				'skinName' : 'Лихач',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5N09ukkZm0meL3P77QhFRe-sR_jez-84XjjWunrgU5PQavfdHNNhg_N1HZq1W3k7_uhJG4vczKz3Frv3V05Xbem0G_gR5KaOdr0fHKS1mZGeUXSy0Rtb_k'
			}, {
				'type' : 'Сувенир SG 553',
				'skinName' : 'Радиоактивные осадки',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFfwOP3fyhJ6c-ihombksj5MqnemWVu-8Ik37r--YXygED68kZlam-icdTBJgBqZVvQ8gW7xum5gZ696Z2aznFhvyB25yzVnUawhQYMMLKoKiteww'
			}, {
				'type' : 'Сувенир Negev',
				'skinName' : 'Радиоактивные отходы',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFfwOP3fyhB4Nm3hr-bluPgNqnfxVRf7cJ0nNbN_Iv9nBrmr0c_N2D1co_EewI9Z1-E_gK8w-fmhJS5vMibwHFmuiQh4ivVzUCxn1gSOZtaCfWE'
			}, {
				'type' : 'Сувенир P250',
				'skinName' : 'Заражение',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhoyszGZD5O6d2kq5OAgvv4IO_uhjkEuPp9g-7J4cKt21bjqEE5Nj-lJNKTJFI-NF6E_Vm-k7vvjZe5vZzInXNqs3Em4yvbgVXp1h42q_cG'
			}, {
				'type' : 'Сувенир PP-Bizon',
				'skinName' : 'Химический зеленый',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlfwPz3di9H9eO4gYOHkvbmDLzDk25f18d4kObPyoD8j1yg5UNrYTzxIdSUJFc9ZQ7V-gXvwubqhZW9vJnLzSBr6Ckk7HfezEOxiRxSLrs41lh6pmw'
			}, {
				'type' : 'Сувенир XM1014',
				'skinName' : 'Костемолка',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PLFTjNX79CzlZK0hPzhP7fCx1RJ5ZQh273--YXygED6_EJqNmHxLYDGcgFqYg3WrlTtyLjq05S8up3Mmntluihwty3al0bmgAYMMLKwoJ4rnA'
			}, {
				'type' : 'Сувенир Tec-9',
				'skinName' : 'Токсичность',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszGZD5O6d2kq5OAgvv4IO7ugm5Ssfp9g-7J4cLx0Aew_Bc5ZzryJNLHIQNoMA3Z-FTvxb29gJW978zOmHo373V05ivcgVXp1mJNZYNi'
			}, {
				'type' : 'Сувенир Glock-18',
				'skinName' : 'Реактор',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73fyhB4Nm3hr-bluPgNqnfx1RW5MpygdbJ8I3jkRrm_xA4a2v6d4LGc1M2YQqFrgO5lea5hJW4uM7LyHtl6CchtHzVyRWxn1gSOQY07qpC'
			}, {
				'type' : 'Сувенир MAC-10',
				'skinName' : 'Ядерный сад',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0v73fyhB4Nm3hr-YnOL4P6iCqWZQ65QhteTE8YXghRrn_xBvZj-gdYaXIAM9ZA2Bq1G9krq7hpa4uZ7Bn3ExvyEnsH7alhXhn1gSOXsb08Wt'
			}, {
				'type' : 'Сувенир MP9',
				'skinName' : 'Закат',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FA957P3dcjFH7c6JhIGfg_LmPenum3sI18h0juDU-MKljAbi-UM4MDrycNTAdFRoNQzZ-1a9yOy60JK96pnIwHZnuiNw5X_bgVXp1qKBy7Rx'
			}, {
				'type' : 'Сувенир FAMAS',
				'skinName' : 'Стикс',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0v73fyhB4Nm3hr-YnOL4P6iDqW1Q5cRiteHE9JrsxgWx-ERkZ2r0cdDHd1M_MF_R-FS6l7-81MK0vZzLyyRi7HMjsyrUyxCpwUYbBN7dJDM'
			}, {
				'type' : 'Сувенир Galil AR',
				'skinName' : 'Цербер',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczLZAJB6c60hpWYqPD1P7LdqWNU6dNoxLGWoI2liwG18hZsZW2hcY6cIFNvMAvS_Ffrye-6h8e4uJqbwHpnsyA8pSGK_cSp9dA'
			},
		]
	}, {
		"name" : "Cobblestone",
		"img" : "Cobblestone.png",
		"type" : "Souvenir",
		"weapons" : [{
				'type' : 'Сувенир UMP-45',
				'skinName' : 'Индиго',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwPz3eDNG5du5q4GFk8jzIb7IqWZU7Mxkh6eW842tjQawqkU6Mm2ldtecdlA7NwrZ-gftw-fvhsK46JSdzXRkvHQh-z-DyNBCEWOJ'
			}, {
				'type' : 'Сувенир Dual Berettas',
				'skinName' : 'Терн',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf2-r3ZzRM6c-JmYWPnuL5feOIxD5Qv5Al2L3FpY3wiw21qBA-N2qhIIXEdVI5M1vU8wXtxL-7gJCi_MOe_3Qy_VQ'
			}, {
				'type' : 'Сувенир MAC-10',
				'skinName' : 'Индиго',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwPz3eDNG5du5q4GFk8jzIb7IqWZU7Mxkh6eZrdz32FK1rUppNzr6cISUdFU_aV_T-AW6ye7uhcC-tcjOzXFl7nV0-z-DyL4k_fgB'
			}, {
				'type' : 'Сувенир SCAR-20',
				'skinName' : 'Гроза',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7ODHTi5W4867kpKEmePLPr7Vn35cpsdwi-_Hoo-g2wOx-0NoYW31LITAdAU9YA3Z-lnvkO_vjcLptcybwXV9-n51LW6fRVs'
			}, {
				'type' : 'Сувенир P90',
				'skinName' : 'Гроза',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FBRv7ODcfi9P6s65mpS0mvLwOq7c2GoB650g2eiR94qs2Q3m_0M5YmqgcY6Scgc7ZQuCrli5kLq71sfv7snXiSw0T9wLGPo'
			}, {
				'type' : 'Сувенир USP-S',
				'skinName' : 'Королевский синий',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09Svq4mFk_7zPITEhXtu4MBwnPCPpdX2jQyx_0prY2HxctKcI1A3NAzZ_Fa8wezv0cW1uZSYnCRj7HFx4GGdwULF8u3CAA'
			}, {
				'type' : 'Сувенир Sawed-Off',
				'skinName' : 'Пыльник',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cCx9_8izkYy0mvLwOq7c2DwI65Ep2L2Q9N6l3QLjqRdrNWymLNWSJg44YV7Z-FnoxLi60JG76J_XiSw0L_5zRr8'
			}, {
				'type' : 'Сувенир MAG-7',
				'skinName' : 'Серебро',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhh3czbeDFU6c6JmImMn-O6Nb3Txz9TsZZ107qR84qs3Q3m-0prZzyncIGdIVA4M1vRqFW2l7vrhoj84soh4IEyPw'
			}, {
				'type' : 'Сувенир Nova',
				'skinName' : 'Зеленое яблоко',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhz3MzPYzhH4uO6nYeDg7nyZbmDxzgAvsYp2rnD992s2Abm_UJuNm2hLYCQJAFqYlnSr1nrxbjqm9bi6-wzwI-Q'
			}, {
				'type' : 'Сувенир P2000',
				'skinName' : 'Кольчуга',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJfAJB5N2_mo2KnvvLP7LWnn8fupN00u2U8NykigK1rUs4MGH2dtOWdlVoYF7Y-VHrl-jtjZa9upufnWwj5HdqMVWH_w'
			}, {
				'type' : 'Сувенир MP9',
				'skinName' : 'Темный век',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZt7P7NZTxO09W4mIGSqPv9NLPF2GoFsZMp2-_Dpo2m0Vaw-ERkY2zycNKXcFBoaA7Z8lnolebshMK4vcvXiSw0RlUWR70'
			}, {
				'type' : 'Сувенир Desert Eagle',
				'skinName' : 'Пищаль',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjVD4ti1lY6FmPnLPr7Vn35cpsR33bmW9I2niQLj_kA9MG2mcNLGdlU7ZQ2F_FG8levohJa96J_Kz3J9-n51SNwWmb4'
			}, {
				'type' : 'Сувенир CZ75-Auto',
				'skinName' : 'Чаша',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0v73YzJb7dCJmImMn-O6NeLXwWlVsMAk2buQ842l3QPmqhc_YTv0I4aQcgA-aQ3V_1a-krq-04j84sqdvOTuGQ'
			}, {
				'type' : 'Сувенир M4A1-S',
				'skinName' : 'Рыцарь',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mb-GkuP1P6jummJW4NE_2-zHpN2g3Vfj-kFvZ2ChJtfEJ1M2YF_Sq1LqkOm515fpup-cyHFluD5iuyj8q1fJzg'
			}, {
				'type' : 'Сувенир AWP',
				'skinName' : 'История о драконе',
				'rarity' : 'covert',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMu9zw3g2yrkVtZ2r6IoSVdAU-ZVrY_lS6lb_ogsDqu57NmCQ27iJx53nD30vgUTXWscs'
			},

		]
	}, {
		"name" : "Overpass",
		"img" : "Overpass.png",
		"type" : "Souvenir",
		"weapons" : [{
				'type' : 'Сувенир M249',
				'skinName' : 'Контрастные цвета',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhzw8zbYS9D9eO-kYGdjrnyMOjTkGkCuJYh3-qUrN-i3Ay3qEo6MGmiJYPGdwI9NVrZqVjsl-y7m9bi66ggGMLw'
			}, {
				'type' : 'Сувенир UMP-45',
				'skinName' : 'Сажа',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwOP3dTxS_NCzq42Ok_7hPvWAlzsGv5Jy27rDo4r22lG1qhFvazv7IIPAelU2YguG-wC2w7vn08W8ot2XnjjPeAaD'
			}, {
				'type' : 'Сувенир MAG-7',
				'skinName' : 'Гроза',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhz3MzbZTJQ4dqkm46fqPrxN7LEmyUEup1127nEoN6l3lfm-EZrMj3xIYGTJAU2Ml7Yrlftxui6hJe46pqc1zI97WswWNrq'
			}, {
				'type' : 'Сувенир MP9',
				'skinName' : 'Гроза',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FBRv7ODcfi9P6s65mpS0mvLwOq7c2GoG65wnib6Q9tXz3VLkqBVpZ2rzIdfGd1c7ZVzU8gK8xuy-0Ja86svXiSw038eOvP4'
			}, {
				'type' : 'Сувенир Sawed-Off',
				'skinName' : 'Белое напыление',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3Yi19_8yklZm0k_LnNqnFqXhQ78BOguzA45W72AWxqERpMmzwLNeTeg82MlDW-gK4k73tg8K4uszBmnM1vyZzsCrVnwv3309qRyEFCw'
			}, {
				'type' : 'Сувенир MP7',
				'skinName' : 'Пороховой дым',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFA957PTNfS1H4uO7kYSCgvq6ZbnXwW5UuJ0nju3D8NSs31KwrhdsYmnyd9eSIwVtaQqF_lfswry-gYj84sqn5btZoA'
			}, {
				'type' : 'Сувенир Desert Eagle',
				'skinName' : 'Пиксельный камуфляж «Город»',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PvRTjlG_N2iq5WZlcj5Nr_Yg2YfscQo3r3H9Nuki1HsrkdlMGuncoCcJAc9ZF_Q_1Dqk-zrhJDqvZ7Jymwj5HeAXIDD2Q'
			}, {
				'type' : 'Сувенир Glock-18',
				'skinName' : 'Ночь',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxfwPz3fzRF5MiJmYWPnuL5fb7TxG0D7cYk27zCotin2Fay8kA_NmzwI4WTcwZvYwzY_lntwbzv08Oi_MOe5mNtCOI'
			}, {
				'type' : 'Сувенир P2000',
				'skinName' : 'Цвет луга',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zbfgJF_t2lh4yKmfPLPr7Vn35cppQj3rqS9oit3gyx-UdlYm_wIIaQdg84YAvU_lm9lee9hcO-78zBnCF9-n51xIPJ5Oo'
			}, {
				'type' : 'Сувенир CZ75-Auto',
				'skinName' : 'Нитро',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZfwPz3fi9D4tuzq4GIlPL6J6iDqWZU7Mxkh6eSo9Wm0FW3_hJrajinJtXDcg82MgnY-lS3leq8gJS56ZXOnCRh6yN2-z-DyFmfHqmu'
			}, {
				'type' : 'Сувенир SSG 08',
				'skinName' : 'Объезд',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f2-r3Yi5FvISJmYGZnPLmDLbUkmJE5Ysm37-Vpoj32wXs-EJrNmumLNDAclI6Z1zX_Vjqxb29hcO878nPmyRlpGB8sq1srR54'
			}, {
				'type' : 'Сувенир XM1014',
				'skinName' : 'Смешанный синий камуфляж',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PvRTitD_tW1lY2EqPX4Jr7um25V4dB8xOyXoI7w2gayrUZoYj32IdPAdgY7ZAvV-ljvwevtgJe_6pScyicx7CM8pSGKFSQfI94'
			}, {
				'type' : 'Сувенир USP-S',
				'skinName' : 'Следы асфальта',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jnMrXVhmpB7dd0jtbJ8I3jkRrk-kA6amCgd9edcg9qaA7YrgLrxeu60JG87prMy3dquCB2tHaJzkHmn1gSOSGslERB'
			}, {
				'type' : 'Сувенир AWP',
				'skinName' : 'Пиксельный камуфляж «Розовый»',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957PfMYTxW08y_mou0mvLwOq7c2DxUscQkiO2S8I-h2gTm-hA4NTyhdoDDcVU3MwzV_1G4xb_uhpPo6Z7XiSw03MaHlHE'
			}, {
				'type' : 'Сувенир M4A1-S',
				'skinName' : 'Шедевр',
				'rarity' : 'classified',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alfqjuhWJd7ctyj9bM8Ij8nVn6_ERkNT_0IoXHIQI9M1CE_1G3ku6605K-us7InyNhvnQnt37VnkOx1QYMMLJOVeO32Q'
			},
		]
	}, {
		"name" : "Nuke",
		"img" : "Nuke.png",
		"type" : "Souvenir",
		"weapons" : [{
				'type' : 'Сувенир MAG-7',
				'skinName' : 'Радиоактивная опасность',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhzw8zGZDZH_8iknZCOqPXmPKzfqWZU7Mxkh6fDo932iVHm_xBsZm6gIoHEIQI7ZFHW_FHqx-jn15Hq75TKziZnuSMr-z-DyCCeIKrx'
			}, {
				'type' : 'Сувенир PP-Bizon',
				'skinName' : 'Радиоактивная опасность',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlfwOP3fyhJ6c-ihombksj2IbTGmFRc7cF4n-SP8dys3FfgqRI4ZD_6d9eQIQNvMAnS_lm7w-y70ZG_vJqbzyFhvCR35mGdwUKuhR019A'
			}, {
				'type' : 'Сувенир Sawed-Off',
				'skinName' : 'Радиоактивная опасность',
				'rarity' : 'consumer',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3Yi194sm9kZOfhf7kNoTThGRG5vp8j-3I4IG7ig2y_0ZsMGn2do6QJA4_NQ7Z-VO8xry5hMTvuM7Lm3Iw6XEgsHaMzAv33088hDSHPw'
			}, {
				'type' : 'Сувенир P90',
				'skinName' : 'Радиоактивные осадки',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FBRw7P3dejhR-M6_hIW0mvbmPLTfqWZU7Mxkh6fHo4rz0Ve2-0U_azvyIIadJAA8aQyC_Vm4w-bn1pXouJnPnSM26XYq-z-DyFErgtK5'
			}, {
				'type' : 'Сувенир UMP-45',
				'skinName' : 'Радиоактивные осадки',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwOP3fyhJ6c-ihombksj5MqnemWVu5Mx2gv2PrN6s3gPhrUdoNWnwJIXDdQFoNQzV_1e9xebtjJK9u5WcmiRhuXRw5GGdwUKpyEqAXg'
			}, {
				'type' : 'Сувенир XM1014',
				'skinName' : 'Радиоактивные осадки',
				'rarity' : 'industrial',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07ODYTjNX59mlgJKCh_LLPrrDmWRf18l4jeHVu9T33lK1qBVvYzynIoaQdQM-aA6Dqwe8kua-gpPtvJmay3RhsyIi5i7D30vgm-UlNbc'
			}, {
				'type' : 'Сувенир M4A4',
				'skinName' : 'Радиационная опасность',
				'rarity' : 'milspec',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhzw8zGZDZH_8iknZCOqPjmMrXWk1Rc7cF4n-SP9o6h2gfjrhY-Z2-lcYWde1NsNAmC-APok-zm0Z-_vMvBz3tq7yEmsWGdwUJ6nxi7Dw'
			}, {
				'type' : 'Сувенир P250',
				'skinName' : 'Ядерная угроза',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhzw8zGZDZH_8iknZCOqPDmNr7fqWNU6dNoxLmQrdX031DhrRY5YGmgLNDBIQU5NFDT_gS-ybi5gp_uu5iayyc2uyM8pSGKb7DLmmE'
			}, {
				'type' : 'Сувенир Tec-9',
				'skinName' : 'Ядерная угроза',
				'rarity' : 'restricted',
				'img' : '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhzw8zGZDZH_8iknZCOqPDmNr7fqX9U65xOguzA45W7ilfm_EVqYWvyIdSRJ1Q_YVzT8lC6wu3vjZW-uc-YwHUwvHZ05Hvaygv330_9fYlOZg'
			},
		]
	}, {
		"name" : "Knife Case",
		"img" : "knife.png",
		"type" : "Special",
		"minRank" : "Legendary Eagle Master",
		"specialClass" : "rare",
		"casesToOpen" : 200,
		"weapons" : [{
				"type" : "★ Bowie Knife",
				"skinName" : "Вороненая сталь",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrulGdE7cFOhuDG_Zi7jAbgqENvNjv2cYHDJ1Q4ZAqB-Vi5l-u-1MXtucvIynJn63N3syzbnQv3308wj9M7Tg"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Северный лес",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLO6LukGRD7dZltevO54n0hGu4ohQ0J3f3J4_EdFRqYQ7Y8gO9kr--gpXou8iYwXZkviUgtH7cmUDjgE0fO7Zom7XAHgyvqmnm"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrumWJd7cFOhuDG_Zi73VDi-hdqNmn6INCXc1Q8NFDV_Qe-x7i8g5e-v8ydzSZi7HUr437UnAv3309ikmqnoA"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Пиксельный камуфляж «Лес»",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLO6Lukm9B6dFOhuDG_Zi73AW3rkI4Yz37Jo_HJlBrYlHY8lPvyershZK57Z-YwHZj7nEktyrVyQv3309AwMWh8A"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbujG5T-sROh-zF_Jn4xgfk_xJvYGqlI9OQJAc-YgzX81a4w-rpgsC16Mubz3Qxv3Zx4HqJmkSpwUYbBsqV8z8"
			}, {
				"type" : "★ Bowie Knife",
				"skinName" : "Патина",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrukGRD68B1teXI8oThxlC38kJsZDigJYGVdQY6YVmC_APrwO_s0Jft6p3Om3M17yIn4izUmhSpwUYbpuF0ilg"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Вороненая сталь",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT0966gYWPqPrxN7LEm1Rd6dd2j6fF89Xxiway-ktuNW7wdoKUdA5raQ7SrlW5yejoh5G5tZvNwCdmuyYm-z-DyMBqk-Qb"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Кровавая паутина",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjVb08uzlpO0m_7zO6_ummpD78A_2LiW9Nuj0VGw-0JvYj2hJdKWI1NoZAnU-gPtyOzo0ZK4u52bm3Bh7j5iuyiVfFD71A"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT09O_mIWPqPv9NLPFqWdQ-sJ0xO-Qod2i2wOy_EdpYW_7LIDBclI6aVHV-Fm_lOe-gJG5vpvKyHYwv3M8pSGKIGsDSZw"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK1hRvA45gnTBS414NNcWNak8L5IKg_osNTOZrctZttMH5XUWfOHNA_16hk-gqVbe8SPpC-73nm8a24LDw2rpDxc1kJY2A"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Волны",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK1hWPoq5ATpGxgi4MZwUYOJ-7IBIUiA6NOEZOUyZItNFsWGU6WDMlus60wwhaIIK8fb8XnmiCi9aW4JXBHi_WoByuTV7Kwr3DhWsXJSNg"
			}, {
				"type" : "★ Gut Knife",
				"skinName" : "Зуб тигра",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxM08i_k4WZqPjmMrXWk1Rd4cJ5ntbN9J7yjRrg_kpsN2qiLYCTdAdtZA3V_gDowuzngMXuvp7OyXVk7HMk5ivZlxPln1gSOddL0hWc"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Autotronic",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-MhMj5aoTTl3Ju6dBlhf3T-oL8i2u4ohQ0JwavdcTCJxhoaVmG_Fnoxua9hcS4vJrIznRjuHZx7XeLmRflhUxLP7NsgfPNTV-eGeUXSwZKyJQd"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Bright Water",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Djsj7ML7QmFRa5sx3j9aYpbP4jVC9vh4DPzixc9OLIwVsZwzSrlK5wOu9jMPvuMzJwCZjunN0tHrbykSzg0kYabZmh_OWGkLeWfITTUunnw"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Black Laminate",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Igsj5aoTTl3Ju-9F-hOzW9J_9t1i9rBsoDDWiZtHAbFdqNQ2Crge8kO-615e_6ZnJnyRkuyAgsHiMlhS_1RlNaONqhvGfTQ6AR_seYQFe0Lg"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Lore",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Igsj5aoTTl3Ju5Mpjj9bJ8I3jkWu4qgE7NnfyIoDGdg4_YwrYqAS8xrvthcK6vMyfyXBnsiFzti2Pyxe0g0tKbeFrm7XAHjZ37Nzu"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Freehand",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Kmsj5Mqnak29u_dVO07n--InxgUG5lB89IT6mOtXAIwE4YlnW8lW7yebp05Tpv5rJmCQ26Scl7HfanBfjhkkaZrNph_GACQLJ_Utp8Mc"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Gamma Doppler",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjxPr7Dl2dV18hwmOvN8IXvjVCLpxo7Oy2ceNfXJVMgZAyB_lDqlL--15G97Z7AyyZividw5i6MyUeygBpEPLM90PDPHArKBrsJQvdXl_RMjw"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Doppler",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywnhNiM9-NdvUcWJ57MHOlns296fZOhoX4QdXZeFRP-DMFr46h040vUMeZzYpS-62ny9OmhZWxC68jkAzOWF67Y-gmkeRyOu7bLbz4tHjC8"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Rust Coat",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywn9NjQm7cJva9y4_r0DFlG64NuDbt9wYZobSt7SWvHSNVuo4ho-iaULLceOqCzoiCq4bmcMWxvo_WhVzLPW7uRu0T4TXTHu-ivWhSeB"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Marble Fade",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywnhNioz-sVvUeiw9r8DFlC249qCLbcvMopOTMCFWaWEbw707ENr0_JdfJLc83663SnqMj9YUhrurGIDmuaZ-uw8ipOzogw"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Damascus Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywn9NiMz5cZwV8KlyOJWFlC249qCXOx9co8ZAZPYX_eGNQ-o6kg506dce5zaoXnt2S_objgJCRrq-GoGneODveY4imwIAy_n_4o6DWQ"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Tiger Tooth",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywniNjM778Jxa9ik9rUBLGOz7dWed64oOYxJTpaCXKKBMAj6uRk40qJVK8fcoS7u23zgP20JUxfq-2wAybWCpPI11SAedH7w"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Ultraviolet",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuyxvjNjcn-tdvUei6_rwOPWOz5cCRZq4pY4lEHMOBCPOHNA6s40w61KgPKsfbpy3m337hMmcPXELt8zgAyuLUpPI11X67t9n9"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Urban Masked",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuyxv8NjMz-MJcQcW09rU5JVW47Mapb-FuZ41STcnUWqKPMlj8401piagJecSIoHzv1XzhMz0MDxHj_mhWne6DvuQ-1HFWHSboOSh3gQ"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Stained",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywn9NiE9-sRmUOi6_rwOPWOz5cCRZq55NNhFTcHYXvOEZgr9vEht1vBZLpSOqHjr3iTsP2heXUXr_GxSyeOFpPI11TekLEVH"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Slaughter",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywnhNj036tVia9u_8LMSFlC-9tWTLbUvZtFKG8GCWKSAYFv770M_1qZaJsCM9ijt3366M2ZbXxvv8mJVmbOZ-uw8T4Gi0hg"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Scorched",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuyxv8NiMz-NdvUei6_rwOPWOz5cCRZq5-ONlMSZWGXvCCbwD740w-gKcLeZfapyru3iThOmtYDkHs8m9XnbfSpPI11XcQHFlR"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Safari Mesh",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuyxv8Nio3-89cQNa4yLcPLlSr296Xced5LtlMF8nWCfHVZQn_4kw_ifNbKZ2BqC--3y_gb2tYChTs-W0Hn7SBs-F1wjFBDsjagn4"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Night",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuyxvjNik77893a9u_8LMSFlC-9tWTLbV9Y4oeSpPUXqeHZFj-vk5thaJVJpXap3vtiCjhaz9cUxC6r2kMn-eZ-uw8rMzTcjo"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Forest DDPAT",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywD1NiM2-MZ3a9u_8LMSFlC-9tWTLbF6NdlNSsTWU_6HNw78vhg-h_AIfJeAoC6-iyi6PT8JUke-_2kGnu6Z-uw8FmO3LEw"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Fade",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywntNiEz7MJcWN6x_685JV2t49fYNbYsMt8aHJHXXPXXblv9u0MxiKhYeZbb9H7q2CnhPzoIWkfjrjhQyfjH5OUJpqnFow"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Crimson Web",
				"rarity" : "rare",
				"img" : "H4Yg36hHfHzMR9WintNQ3afK6m7sN3I8GIkGuHo1GHrWjRck8Vs6bmyeyVy4swxTv82xKeUocjgeggGqeyMPcNnPAy7gXz1nfO_NVrv5H0K72_oxoX08IRKDMLI6Lwp66I1eFORfMWRm1d5sveUyVKrc7UG6cTo5CcMJ7jYiWCmOhAN451wsOGuGklXk-QkRqYerL-QtaDQc2FnqZXFdLoDUSTvoWQ=="
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Case Hardened",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywn9Nig75MJna9u_8LMSFlC-9tWTLbcpYo4ZTJbYD_-GYQqu6k5q0aNcLZCIqCLmjyW9PmcCUxq982sCnu-Z-uw8NABrhGY"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Boreal Forest",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywD1NiE9-sJwQOi0-KkDKFCA6NuRa_RDbIkOSJXOWvGCNw6s401piKZYfpCO9Sy-iSzvb2ZbXRTj-G8BzuSE77U_hmlEEW_w87uLpmm_PQ"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Blue Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywn9NiU-_cJna9u_8LMSFlC-9tWTLeN6MY0dSsWCWqKCZFr9uUk-hfQIKJLY9H68iSzrOmlfCULsq2NVnLSZ-uw8_unZThQ"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Blue Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEgznuShMhtupD_OfDd8Xntsl6p5GliFukBF0Oty-Pj5hdzvPWJ9cXew1-g34R3YzvZIyBI6zp7hecQvmttfDZ7UqZYlMG5SDW6CAYQ-o7k9uifUIfJeX4HS4j3Ti6UA"
			}, {
				"type" : "★ M9 Bayonet",
				"skinName" : "Африканская сетка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Yh8j5NqjZqX9Q5vp9g-7J4bP5iUazrl1tY2H6ItWSIQU-Y1DX_Vjsx-jnjZ657Z_LwCdm6HEl4nzbnBLlhxEfcKUx0rp-zgq-"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Bright Water",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0mPTxMrXunWVY7sBOh-zF_Jn4t1i1uRQ5fTryLIbBegRqaFzWqwLtl-7t1pTvv5_Jmyc3uycqtH3enh20hhwaZrBxxavJey8mJTk"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Autotronic",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJk5O0nPbmMrbul35F59FjhefI9rP9jVWisiwwMiukcZiccQBtZVyF_lW7kLzvg8Xvup7Lz3Qx6CUj5iqLnBzhhxkZabBshKaaVxzAUIJQ4Np6"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Black Laminate",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbuhX9e5sBmi_rJyoD8j1yglB89IT6mOteRd1JoMl-EqFS5we28h5Xp6p6czHVguXZxtnuMmEe10BEeOOM7gvaACQLJ8ajP6XE"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Lore",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbummRD7fp9g-7J4bP5iUazrl1rY2DzddPEdwFsYgnSqwPqyey6hZ_qvM6dm3pnunFx4n2LmxTj1x9PcKUx0uHhTF2B"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Freehand",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20mvbmOL7VqX5B18N4hOz--YXygECLpxIuNDztLI6Udlc9aQmGq1O9ye3rjZ_tu5_KyXNq7HMrsHmImxbhgRpNOOVrguveFwu3UI9Gug"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Gamma Doppler",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kvrxIbrdklRc6ddzhuzI74nxt1i9rBsoDDWiZtHAbFBoMgyGrlLsw-_ohsXv6JvMz3Ix6yF2t3mLnBDm1R4faLdvhvyYTVmAR_seWA9jz4E"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Doppler",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo7-TfoBjci5MJxa8e-9qgDeGOz7dWed64tNotMF8HZWvSON1_440Nqh6ZfJ5eP8yi9jivuP2kLWULqrm5VzuWApPI11QoHL2Zy"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Rust Coat",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75Tf_HSI35PhoWt6w8oQLLFi28d-pb-FuZ41SG8OBU6KBMg344h0wgfReKpHf9Cq83Xy_Mm9eXRW6rz4FzeTUveM_hnFWHSaOGLKzXQ"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Marble Fade",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo7-TfhCDUw5MJcUtay8oQKIFu38JyTNuQsZtxLHpODXqfXMgGpvh8-1fUIK5eA8Xy61X69ODoCW0DqqT0GhqbZ7U3rlwo1"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Damascus Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfoCCoz-8R2R-i6_rwOPWOz5cCRZq4oN4lLGZbXUvDVZwmpuR8w1aEOfsfb9i273Xu_aztZUhC-q2INnubWpPI11VyGQ9DQ"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Tiger Tooth",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo7-jf4ACA3-vhsRta48L45JVW47MbYYOQpYdEYGJSBW6CHY1v46U041alfKseO9CLt2yzrO25ZDhTq_W0Am_jH5OWLuQC7ZQ"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Ultraviolet",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMop-zf8HDUi5MJcWN6x_685JV2t49fYYLMsZN4fGcGFU6PVZFz16kNqiKVYe5CApHvp3Ci8PmgIWEfu_D5RnfjH5OVFYzsL6Q"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Urban Masked",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMop5Df4CDc319JxVta4yLcPLlSr296Xced5LoxPGZTRCaCOZwH_6RpsgKVbLMSNony53nzhbmdYWkK9rG8NmebWvbF1wjFBWafnDHI"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Stained",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfqBjUx7cNcWN6x_685JV2t49fYNrQkZtlNScjYCaLXb136vh86iaBYfcGMo37u2njqO2deWRu6_GtRzPjH5OWh0rdYxA"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Slaughter",
				"rarity" : "rare",
				"img" : "6FZQXKBwu39SUSLmAbr98lAamu3kALU_hp_x_OVctVUhXWen-Wz9bfKIPhgn2qF8SB3Bqu0ftTuAlPbu5EqiXy4fc63oaPpk4vk6EiSQsm1MC4qyqUr7IoyVx_alRqdVH1t2uu9k7WHi-TwaFY-lbkoPsfG3SPImzZn9rahMolF1CSf_tj7rPPSXbRIvwvE5WwyI--ob_zTQyqr7_h-iCCUeZ6bp"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Scorched",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMop5DfoCDci5MJcWN6x_685JV2t49fYO7h9ZI5JHpKDUqKDZVyruUtsiPJdK5SIpHi73S69OWYCDhPrrmlWkPjH5OUGS-1aRQ"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Safari Mesh",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMop5DfhDDQ619NiWui6_rwOPWOz5cCRZq59MoxITJOGU_-DYlv070xriKBUfsHcpyi-3H67bz8NCELrrGtVzOfRpPI11aVlXOou"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Night",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMop-zfiACA6_PhvXdC-44QKKE644ZzCMbcoONweF8LWUvHUb1yv6E9tg6lcLZDfpX--1HjgMm0CXxS9_GNShqbZ7QXcaW5k"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Forest DDPAT",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMoy7TfoDTcz_PhvXdC-44QKKE644ZzCYOUvZNgYGsnXC_eCbgirvE9r1PJUesbaqHnu2izuPmZeXxrp8mgGhqbZ7fQ9-fxZ"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Fade",
				"rarity" : "rare",
				"img" : "hy71GAP3ufb8R-ppRUkn3z9iP6lHh7e2KIk5c6Gvb3hOJcLjWuv_5Fye9pdjKXtRJ2Vk7k6Yt7Iugj5hoLl4ckFn1ulL7_jtTO_ynWBjaEAjcy_2Cs35qyKDD3nhtX14cCPT_kzj7-hM7_SZUWB7RTJJJ7AawOz1L9RgIey_fi1LKoS5Se26tQmFo5w9MSwYM3B84E2e_Lgu1WImvrkqewE43Os="
			}, {
				"type" : "★ Karambit",
				"skinName" : "Crimson Web",
				"rarity" : "rare",
				"img" : "5DJI8C6QkPeBTzKNlwBr1Vx-gkFq4J63VYHhl3PmI3ItOX8Ld4zW5SGWLnOxYDdbRHnZBmP_nrNTiuaFcvA0eCJ7awFmiNHsMecqebIqJEpAb5IeJ6rQql-L150z_DFyEz9uFmGExukx5yVlgzgzSUdVmlg3p8X0B9C7lz6mZCd1MGoBZtqXtSPZLyu9KWZOUDvBAGirge8J0-yQafczI2IkYQM="
			}, {
				"type" : "★ Karambit",
				"skinName" : "Case Hardened",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfjACs37PhvXdC-44QKKE644ZzDMeYlMtpFS8LZXPbQYwz47RowiaIMJpza8yzo1HvoO2YLCRfjrmIMhqbZ7XVFxf-F"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Boreal Forest",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMoy7TfqBjU3-9NcVtik8roKFlC249qCXOx9co8ZAciCD_-PNACv70g6h6RZKZbc83u83SS9OmYKWBbiqz0HneSB6bY-im4IAy_nZrgln78"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Blue Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfuBTI37PhvXdC-44QKKE644ZzHN-UlMtAfS5WED_-HNwn4u08_hqRbfcaI8S7o3X69P28PCRq__WgBhqbZ7SjpJGyH"
			}, {
				"type" : "★ Karambit",
				"skinName" : "Blue Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEgznuShMhtupD_OfDd8Xntsl6p5GliFukBF0Oty-Pj5hdzvJALJfUfcz4Ea0C3NrucU2DIa3o7lfKgu9sYDPO7ArMdxOGpbSCPSPNwr0u0lpgaMLMdXX9w2bEeEd"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GKqPH1N77ummJW4NFOhujT8om7igW1qUY6MWqmcIadcw47MFrW_FK9xbzpgZ607Z7PzSAxuXYg53-Llwv330-D9XTwcQ"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Кровавая паутина",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4iSqODxMajummJW4NFOhujT8om70FHnqkBqZWGiLICSelc6Mg3V_AO8x-nq1pC86JqcmnQyvSUk7X3azgv3309LA7AIOA"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqO3xManQqWdY781lteXA54vwxgyy_hduaz_7do6TcgFqaVvQ_1jtxbq5g5e07p7AwCdh7HEn4H6PzRGpwUYb-q86lXo"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Городская маскировка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5ObqOP1I77ug3lT6ctOhuDG_ZjKhFWmrBZyNzihIIXDdg5sNVqFqFPtyOnsgcW1vM_MzXph7CIg5yqMzhyy0k0ePPsv26IotkEDow"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Сажа",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5ObqPP1I6vdk1Rd4cJ5ntbN9J7yjRri-kJsMmDyco6Ve1U3aF7W81fokObo0Z-87pqcmHpr7yAh4niJn0Hhn1gSOTpeEaNS"
			}, {
				"type" : "★ Butterfly Knife",
				"skinName" : "Ночь",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5OEqPn9NLPFqWdY781lteXA54vwxg2y-UZoZzrwIY6TdVc7ZViG-wW-kOu6gZK66JzJnXFm6CRwt3zfnxepwUYb2Pp00lU"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Bright Water",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJK9eO5l4WKmcj_PbLXk1Rd4cJ5ntbN9J7yjRrir0BpNWChd47BcldsYwyB_VC_w-_qgMXqv5qcn3VruHUn4X2IyRa2n1gSOZ6lSNoc"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Autotronic",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJF_-OwmImbqPbhJ7TFhGRf4cZOhuDG_ZjKhFWmrBZya2HxcIaUcFNoYA3X_1ntyLvsh5Xo6Jidz3BjuHMm7CmPyh2-hU1Ma_sv26IF0j6FwQ"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Black Laminate",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJB-eOwmImbqOTgPLXUgWpC4Pp9g-7J4bP5iUazrl05ZT_0JdKUewVqY1HW_wO6xe260cO7vJzMwHNi7HV3sSmIzhPihElEcKUx0oH2X3dW"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Lore",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJB-eOwmImbqPv7Ib7um25V4dB8teXA54vwxlHjqkBta2vyIdOTIQM_YVmG_lfox7rtgMe_tJvMn3Awsykn7X7YnkSpwUYbImluMl8"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Freehand",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eO7lZKAkvPLJqvummJW4NFOhujT8om73gDm-0dvaz_yLYWVIQE8N1GBrwS_l7zp0ZTpvcjNyHBgsnNzs3zZnwv330_U-q7jVg"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Gamma Doppler",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOzmYWZlvvwDLbQhGld7cxrj-3--YXygECLpxIuNDztJoWcdA5vZV7Q_VfoxOfuh5Dv7s-ayiA3syUrtizfnxzj0kkZa7BogeveFwsRjj-vBQ"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Doppler",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOym5Cbm_LmDKvZl3hUu_p9g-7J4bP5iUazrl0_ZWD7cIPBdFdsMwnZ-1Xqye67h5--6M-bynI173Ih4H6MmBO_1xtPcKUx0uQwW0b2"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Rust Coat",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY-Yu8Q3gNiw84cFma9qz87ITJGOz5cCRZq4pMo1MHZPUXqOCMlz0vB44hqJYfMbY8iq52SzobGpbWhXi82NXy-KCpPI11bIb1hbd"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Marble Fade",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY_g75grgDBg06cNma9u_8LMSFlC-9tWTLbUrYdFFHJGCXPCFZFusuEw8gvUOJpPcqH-9iHm_M2YOXBC9q25WnO6Z-uw8Y8ANU94"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Damascus Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_E7-Qn_CjIh18tqU9-iyLcHO1u6qouUM7h-Y9tMHcTZC_KFZ131vxo4iKUJfsOO9CO5jn_hbj8PDhO--2Ia2LjQI41o9KY"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Tiger Tooth",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFQY-Ez8w3-Nigg6clkUei6_rwOPWOz5cCRZq4oNNkfH5TSCaCCZA6p40tu0qFaJsCBonu53XnpPWpZWkG9qz8Fm7ODpPI11e7G-Um7"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Ultraviolet",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPrNRY-Uv5hjgDBg-4cBrQOi69qkBLBLp5YXAYeIpMIwYHJWCDPeDNF307hhrhfRde5aA9Hu53im7OmwIXBO95CtazzhCH8L6"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Urban Masked",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPrNOY-E75A3THDUw6clcWN6x_685JV2t49fYYeQtY9hIHMnVD6eGZA2suRkwhqIMfMePoiK9iH6_PWlfD0fvr29RyvjH5OXG2hpQHA"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Stained",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_M15gvpDRg-4cBrQOi69qkBLBK6vdPANrcqYdFOF5HRW6DVZQ766xk7gKMLLcePpi_s1Hm7OGdYXhPo5Ctaz043bOns"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Slaughter",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY-8_9hrtNis77893a9u35bwDZwnqsITBZeIqNdxLGpTYWKWCYwuvuUI-galde5SJoXy5iSq8PWgLUhH1ujVTthpPV9Y"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Scorched",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPrNOY_E75BjgDBg-4cBrQOi69qkBLBK54NSTZrEtZNlNG8iGUveDbgur7kgw0_dcecHfoS3q2izuaWkLChO-5Ctaz-iUruLD"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Safari Mesh",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPrNOY_g_5wDTHSY818tqU9-iyLcHO1u6qoHAMuMkNN4dTMeCCaODZwur7Us_h_ULJ8eB8n7p33m4Mm0CDkG--D4a2LjQKGuiy1Y"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Night",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPrNRY_sz8wD4Nis77893a9u35bwDZ1-7soPFN7YsYo4YScjUUv-PZFz_7x040aVYfsSK8Xju2n_vbmoMCRX1ujVT7gNIytI"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Forest DDPAT",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqhHY_E-5An4Nis77893a9u35bwDZwTnttbHMrIsZd8ZGsXYU_CPZwv840s61KdcJ8HYqCq91SXoOmtZWEL1ujVTYfKVD1U"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Fade",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFfY_M78A3TBS414NNcWNak8L5IcQ3u4oqTO-F6Mo1MH8bXX6WGYg6s4xg51agLL5Hb8n_qjH68Mm1YWg2rpDz-PIrjNA"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Crimson Web",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqhHY-I_9hvTBS414NNcWNak8L5ILAy959HPZrF4MNhITZaGWqfQZg6suBg7hPBbL5zapizq2SXqPz1fXQ2rpDxTuFR6rw"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Case Hardened",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_oz-A3oNis77893a9u35bwDZw3rsYrPZ7R6M95KHMPQXv-Gbgv5vEg-1aYLKJCLoSPr2iW8OD1bCUf1ujVTxaDwZJQ"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Boreal Forest",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqhHY_M15g3_HRgw59VmVduJ-7IBIUiA6NOEZOUyZNxEGMjYX_eDZg6s7E8xgqQOfZSIoCrvj3u9azwPXkC6rzkHzeaA6awr3DgaDfI7XQ"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Blue Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_c24Q3oNis77893a9u35bwDZwjmsdeQYLYlMo4YTMXVW_WFZ1z56kw-iaZcKpfdqSK81CTpOGkICBD1ujVTzVntbj4"
			}, {
				"type" : "★ Flip Knife",
				"skinName" : "Blue Steel",
				"rarity" : "rare",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEgznuShMhtupD_OfDd8Xntsl6p5GliFukBF0Oty-Pj5hdzvEDalOEvA48gu8WXBhvZA6BtXn8ulffQu9t4KXMLItYdhLHcHVDqfTblqovx8mwP8KZWGkNYw"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Вороненая сталь",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlZG0lfvhNr_um25V4dB8teXA54vwxlexqkVpYT3xINOVegM4ZQvQqFDvleu8gJO9vZrLnyFj7yEn4XaMmRGpwUYbSTbvj7o"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Африканская сетка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJh5C0mvLnO4TFl2Vu5Mx2gv3--Y3nj1H6-EJoNjj1IYLGJlRvaAvZ-1Hvwuboh5K4vp_NzCZhuCYqtyrZnxHk1wYMMLI47XWL5Q"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Кровавая паутина",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJnJm0gPL2IITck29Y_chOhujT8om73QHlr0o_Njv6IIKde1M3YFmB8lm9w-nthp-6vcyYyXRqvXEmt37bmwv3308f4sOUEg"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlZG0mP74Nr_ummJW4NFOhujT8om7igDnr0I_Mm_zJ9CXIQA3Zl7U-lG_kOi9gMC-uMvLwXdl6yZ05S7bmgv330-Ff2dfAA"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Северный лес",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJnJm0kfjmNqjFqWle-sBwhtbN_Iv9nGu4qgE7NnehIoHBcVI_aFnQrlS5w-vt05S7u5nAmHc2uCcn5nrZzhKzhR8ZZrFsm7XAHnEvQoLM"
			}, {
				"type" : "★ Huntsman Knife",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlYG0kfbwNoTdn2xZ_Pp9i_vG8MKjjgbl_UA_MDz3ctCUcwA8Y1yG8lG3w-7v1p_ptZ_BnSA17yFx7H2MgVXp1l4ye9bA"
			}, {
				"type" : "★ Shadow Daggers",
				"skinName" : "Вороненая сталь",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD_eO0mJWOk8j4OrzZgiVUuMcjj-rF8In221K2-ENqZTqmd9fDd1Q8NVHT81Psl7vr0cTvuprN1zI97fJ4ylzC"
			}, {
				"type" : "★ Shadow Daggers",
				"skinName" : "Поверхностная закалка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD_eO5nYyOk8j5Nr_Yg2Zu5MRjjeyPpN72iVDlqEo_YD_2JNKRdVJtZw7V8li9xOq7h8DqvZqayXVmvCZ07GGdwULkTS1GEw"
			}, {
				"type" : "★ Shadow Daggers",
				"skinName" : "Градиент",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD7eOwlYSOqPv9NLPF2G0Gu8Eo2bDApt-g0FXl-UU6NTuhI9SccVU3N1DXqFjsxua-g8W7tMvXiSw0K6R8VrQ"
			}, {
				"type" : "★ Shadow Daggers",
				"skinName" : "Африканская сетка",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJR_OO7kZODqOP1PYTdn2xZ_Itz3OuSrNz22wLh-RBuMTryd4aSdlVqY1uC-QLvyOzu18C1tJrJm3YxpGB8sjaSYMPt"
			}, {
				"type" : "★ Shadow Daggers",
				"skinName" : "Убийство",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOskYKZlsj4OrzZgiVQuJxw3OrHptitigXk-RVkYzz7I4SXdFVtZlmE-lK7xeq6gJa-u53K1zI97VbkI_gt"
			}, {
				"type" : "★ Shadow Daggers",
				"skinName" : "Патина",
				"rarity" : "rare",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD_eOwm5KIkvPLP7LWnn8fusZ0i-_E992l3FWyrhFoYz_6dteRIQFvZguD_gW7yO691pW6756dnWwj5He74Aez4A"
			}
		]
	}, {
		"name" : "Covert Case",
		"img" : "tainoe.png",
		"type" : "Special",
		"minRank" : "Master Guardian Elite",
		"specialClass" : "covert",
		"casesToOpen" : 170,
		"weapons" : [{
				"type" : "M4A1-S",
				"skinName" : "Скоростной зверь",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHYN4N5zUcWJ9b4HOkiA6deSavVxX4QdXZeFRPPQYlivuB1u1KFeJ52AoS7q1SjgbGdbWRG_-ToHzrCO7Odph2xCEXGu7bLbJHLl5no"
			}, {
				"type" : "AK-47",
				"skinName" : "Аквамариновая месть",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhX_ov5gnrDBgz5NNcWN6x_685JV2t49fYMbd5NI1LS8PYDqWENVz-7B1u1albfcGP9Xnp2HnvbGsIXhTu-z5VyfjH5OUN6wKZjw"
			}, {
				"type" : "M4A4",
				"skinName" : "Asiimov",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTQmWPqFNVfg14jfhDCM7_cpcWNak8L5IK1nu4NOSMbB_MotLS8KGDqXQYQj7vE871fddJpeL8n_vjyy8PmxZDw2rpDwJTGGyIQ"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Cyrex",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHYh18R6RtKuyLcPLlSr296Xced5LtlIG5LUWvOFM1v66Rk80aVaeZ2IoiK6j3_pb2YKU0fjr2kMzuPVs-F1wjFBLhxWp7I"
			}, {
				"type" : "AK-47",
				"skinName" : "Fire Serpent",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQLLE6VNWecq8Qb4NiY5vJBcVsW34bQ5JVW47Mapb-FuZ41SFsPZWqOBMF3940pt0akML5GKpHy73yztOTsKCkC9-j8BzOfV6OFihXFWHSb0S-ZgUA"
			}, {
				"type" : "P90",
				"skinName" : "Asiimov",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMyJYYl2STKFNVfw3-x7TBS414NNcWNak8L5IeV--s9TBZeMsM9ofFsiDX6XVYwn7uRhs1ahffZaK9S_n3iu4Mj8CUw2rpDw1YXWUJg"
			}, {
				"type" : "M4A4",
				"skinName" : "X-Ray",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTRzQALlhUaEF-AHrATMN5MZxU9L48uJUcF69t4vPO-R6NNFMHZPSCKKAMA-ruBk_h6QOesaJpyvq2CW7a3BKBUQFWGseyw"
			}, {
				"type" : "P90",
				"skinName" : "Death by Kitty",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMyJYcQXWEqtLUPkpyxi1WRg-4cBrQOi69qkBLBLv4tTEYLV_NdsdGcnRD_SOMlz96Bhsh_NZL8CKqS-72C69Mj0MUxHt5CtazyMJYE6_"
			}, {
				"type" : "AK-47",
				"skinName" : "Vulcan",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhTuA49g3-Nis77893a9u35bwDZwnnt4SVMLh4M9hPGJHVC_fQbwmrvB9riPJUe5XbqS7s2yq6a2ZfDUf1ujVT14JGn7I"
			}, {
				"type" : "SSG 08",
				"skinName" : "Blood in the Water",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oJ-TlaAhkZzvRCaFMV8o2_Q_kHRg-6dVkUZnmp-NXe1_ttNPOOrYkNN9MHsOCWqeEbwj-u0o-hvdbfcSLoiq-3yjhJC5UDOugWvow"
			}, {
				"type" : "CZ75-Auto",
				"skinName" : "Victoria",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhmYzvHFaNWWfEF9xK7XBg-4cBrQOi69qkBLBLq4tPBZrR6Nd5KH8CFDKPXNVyv40JpiaVVfJPf8S-7ji7vPmZbWEHi5Ctaz0bS9aXa"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Золотой Карп",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcwn9EqNfUPApywr-CDE918tqU9-iue0FK13rsoTPNuUrNIlETZWFU_WEM1j06hht0aNZepSNpnm9iHvsb2kUG028EEUdd1E"
			}, {
				"type" : "AUG",
				"skinName" : "Акихабара",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLGeDBH092jk7-HnvD8J_XXxj8IuJIkib-VoNSi2VGx_UQ-Yzv3I4SQcVA7aAvS_FC6wru51pK1ot2XnmtK7ev7"
			}, {
				"type" : "Galil AR",
				"skinName" : "Щелкунчик",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPqdfUPw2ywnuGyYh4chta9qz87ITJBLrs9TEO7d6MoxKGpaDU6CCMFyovhk81qdafpCJpSi9jyvhPGsCCUHi5CtazzBY6R44"
			}, {
				"type" : "P2000",
				"skinName" : "Fire Elemental",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQfXPrAMDKVqyw7lGyIN7ctmWdK447oKFlC249qCXOx9co8ZAcGFX_HSYl30vEprhaAIKZSK8yvm3y7qPWlbChburDpWnLSH6-Bq0DwIAy_n77aVEso"
			}, {
				"type" : "MAC-10",
				"skinName" : "Неоновый Гонщик",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeDkYAhkZzvPAKMPDMo08QfiGy427dVcWN6x_685JV2t49fYZrElZI1MH8KFXaWEMl-o6ho6hPMJfcaMpny5iyXgOjtZXxa6-j8CyvjH5OWd_Q3jAQ"
			}, {
				"type" : "AK-47",
				"skinName" : "Wasteland Rebel",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTRDQCKJLSPAF9QO4Xhg-4cBrQOi69qkBLBK5tIqTM7F5Y9lMFpTQU6SEN1_96Es51PJeLMGKoSK5jyzuODwDCEe65Ctaz8HGPHc9"
			}, {
				"type" : "M4A4",
				"skinName" : "Вой",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLPr7Vn35cppYo0riZp4-t3Q2x_UVpYGr6LIXHJABrYVGB_QS5k72905S_75ycm3t9-n51e4WtYjg"
			}, {
				"type" : "AWP",
				"skinName" : "Скоростной зверь",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqhHTPAoywrpCDQm18pmUN6j-oQKKE644ZyVO-IsMdFJG8DZXKWBZVj67ExugfNVe8CJoivr3Su_PmlYCBrrqz0HhqbZ7W1KaKdj"
			}, {
				"type" : "AWP",
				"skinName" : "Lightning Strike",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYfg3FCbRQVfs9ywn7GRg-4cBrQOi69qkBLBLss4THO7koMdhPSpXQDKPVbwmsvE89iahfJ5OKpSPs3n-4OGlfWBW_5Ctaz7zg_DXL"
			}, {
				"type" : "AWP",
				"skinName" : "Asiimov",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqFNVfg14jfhDCM7_cpcWNak8L5ILF3ot4SXMeMtY95MTcDZCPbSNACpuUo6hvNYfJCLoS3vjn_taDtZUw2rpDytVfjhQg"
			}, {
				"type" : "AWP",
				"skinName" : "Man-o'-war",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYcxPSPqdSU-cjywTlDi8m18tiRtCzuehScVm-4YKQNuQoZIlEGcfRUv6Abgv77E8w1PVZLpyO8SPn3yTpM24UG028omRZCoA"
			}, {
				"type" : "AWP",
				"skinName" : "Медуза",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdShR7eO3g5C0mvLwOq7c2DkAvJQg27iT9NWm2VK3rkU6YmmiI4SVJAQ9MljUr1O5ku7ug8K1usnXiSw07gvX0uU"
			}, {
				"type" : "AWP",
				"skinName" : "История о Драконе",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMu9zw3g2yrkVtZ2r6IoSVdAU-ZVrY_lS6lb_ogsDqu57NmCQ27iJx53nD30vgUTXWscs"
			}
		]
	}, {
		"name" : "Classified Case",
		"img" : "secret.png",
		"type" : "Special",
		"minRank" : "Gold Nova III",
		"specialClass" : "classified",
		"casesToOpen" : 125,
		"weapons" : [{
				"type" : "AK-47",
				"skinName" : "Cartel",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzZ2TQXJVfdhX_Qo4A3gNis77893a9u35bwDZw66s9CTOuYoY98eS5HTWvLQZFj6uUg_hKNbL8GApXu5i364M21cW0H1ujVTyBd8HaM"
			}, {
				"type" : "M4A4",
				"skinName" : "龍王 (Dragon King)",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDzRyTQmWAPRhXfs58Rv4GyY-18tqU9-iyLcHO1u6qtGUZ7krM9pKF8mGXvTUYViouUI50vUPJpSPpnjuiHjtO2oDXBe4qGwa2LjQ-8EAblc"
			}, {
				"type" : "AK-47",
				"skinName" : "Red Laminate",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDz9-TQXJVfdSXfgF-AHrATMN5MZxU9L4puJffw7v4YrGO7UrOd5PFsLWXqXQYQz-vks-haFaLZTbpHi83HvqPXBKBUQbZsOMyg"
			}, {
				"type" : "AWP",
				"skinName" : "Redline",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqNRXuc7ywTlDi8m18tiRtCzubgAewy84YSXYLEtNdkeG5HTWqKONwH56kM51fJZLJKK83i5jHnta2oUG028bEnLGFg"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Atomic Alloy",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_Q3ywW4CHZ_-_hiWNu57oQJO12x49epb-l7aJwjQ5GSDaOYbguvvkk_gvVdLZCP9ivoiH_hPG4IUkLjrmoAmefUvudu0DkUESK5_vLM95cjMz2U1Q"
			}, {
				"type" : "AWP",
				"skinName" : "Graphite",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYcRbXDLBSWco45gn6Bhg-4cBrQOi69qkBLBLq4ofPZ-UuMt8YHcjQDPXVZVv-4x1p1aYIK5zY8yvr3i7qMj1bXkHp5Ctaz8vYRbYi"
			}, {
				"type" : "AK-47",
				"skinName" : "Redline",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhX_o45gnTBS414NNcWNak8L5IfgjmsNCQZ-YoON1JSZTUD_DXZF2vvkIwg_QJL8SLpCm81S28bGYJWw2rpDzip-2Q0g"
			}, {
				"type" : "AUG",
				"skinName" : "Bengal Tiger",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56IeSKOC5YZg3FBLJhUPw9_BzTBSYg78ItUIWw8uJTfljsvYLFZ-MpN99FG8DTD6KHNQD4408_1aBVecSO9Sy5iTOpZDnMe7RhPA"
			}, {
				"type" : "AK-47",
				"skinName" : "Case Hardened",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzZ2TQvLDaVaY_kz8wD4Nisz-sBmGo7k9OMCeA7q4YaTNrQrNdAYHMeFU_KAYgD76kg41agMLp2Boym92CX3ejBdMGIcS0s"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Рыцарь",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_Q3ywXpHSY--_hvXdC-44QKKE644ZzHZuYtMd1JTMfRWPWCb1v_uxpt1alcKJfYo36-2nu7OzsMWUbq-W0GhqbZ7cEF2RPW"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Шедевр",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHZ_-_hwXduz-bgDFlG64NuDbt9wYZobSt7XXf7QMA776RlrhKIPJ8GMoCO83Xi_PmwMCBK9q2kAzOPVu7pq1GlCXTHu-qDNDQ_Q"
			}, {
				"type" : "Desert Eagle",
				"skinName" : "Hypnotic",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcwX9F6VMSPw9-zfgACA6_PhvVcWx8vVefF3ustfCYeZ-OIpNTJPWWf-FNVj4vktrhvVefpTcpn_p3S_qOWwJRVO1rdQNtFZ2"
			}, {
				"type" : "Glock-18",
				"skinName" : "Water Elemental",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhkZzvFDa9dV7g2_Rn5DDQx7cl3a9u_8LMSFlC-9tWTLbEpMY1FGsSFDvLXM1__4hhr06RYe5Xa8S692S64PToDXRfvrGgCybWZ-uw8dna1jag"
			}, {
				"type" : "P250",
				"skinName" : "Muertos",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDzRyTRSQVPBhUfQ08AngCBg-4cBrQOi69qkBLBLv5dGUNrEoNtwfS8fSXPKFNQ-s6x1t1vALJ5KKpijn1Xi7PzoKWUXs5Ctaz4FQJ-4V"
			}, {
				"type" : "FAMAS",
				"skinName" : "Afterimage",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhkZzvAE69VWfsF5An4ARg06cpiR-i6_rwOPWOz5cCRZq4pZNxJGsPZXfWDMgH-4h1u1fcJLZONpi2-1X7uPGlYXBLj-mxXn-6CpPI11ZK_4Z1K"
			}, {
				"type" : "P90",
				"skinName" : "Trigon",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKMyJYYl2SPrRMVfI1-jfgACA6_PhvVcWx8vVfLwXs4orDOuZ5MYxMHJSGCaPSYAuo70lrhPIMfZaA8X_tiyW4MzgJRVO1rfbRisl0"
			}, {
				"type" : "Galil AR",
				"skinName" : "Эко",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPqdfUPw2yw3vBhg_7cNqQdqJ-7oULlnxsdeUMrMpZNodSseEWKDVYVz6uB841vNUK52Aonnn3S3oPGkPWRPor3VExrHwzwdDoA"
			}, {
				"type" : "P2000",
				"skinName" : "Corticera",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQfXPqZfSvA29Tf8W3diuPhvXdC-44QKKE644ZyVYLQsZIpIS8XQXv7VYV2puR1qhaNbK5fdqS_riCToPm4KDhbi-GIEhqbZ7RAAKX2k"
			}
		]
	}, {
		"name" : "AWP Case",
		"img" : "awp.png",
		"type" : "Special",
		"minRank" : "Silver Elite Master",
		"specialClass" : "AWP",
		"casesToOpen" : 100,
		"weapons" : [{
				"type" : "AWP",
				"skinName" : "Солнце в знаке Льва",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957OnHdTRD746JmImMn-O6ZezVlz4CvJYj2LqXpNmj0Vaw8kVvZG_7LNSScgJsZF_S-VO7w-e51Ij84srJoVgQJg"
			}, {
				"type" : "AWP",
				"skinName" : "Африканская сетка",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FBRw7P7NYjV9-N24q4iOluHtfemJxzkCv5V3ibCToN33igXj_hdqZTv6IIWWdwZoNQzT-1O7xO3tgJai_MOeifog2Vk"
			}, {
				"type" : "AWP",
				"skinName" : "Змеиная кожа",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FBRw7ODGcDZH09GzkImemrmsY-PUxmgAv5Up2rnFrdmijlXgqUA_ZjzzIIKQcQA7Y1uE_Fbtlefum9bi68KPYhsE"
			}, {
				"type" : "AWP",
				"skinName" : "Бог Червей",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMSZYcxPSPrRJVfs_ywXpDS4n5YkxUoDv8esAegu8ttSTYLMlZI4dH5TXDPCGNFz-uE8_hvddJpbb9Czrw223bfuxyJYu"
			}, {
				"type" : "AWP",
				"skinName" : "Гадюка",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957ODGcDZH_9e_mr-GkvP9JrbummpD78A_0-iZrI702le1qkQ4ZGClLdOSJwE-NF3Y_lHtw7q5gZK6vpnBznsw6z5iuyixL7hzgA"
			}, {
				"type" : "AWP",
				"skinName" : "Пиксельный камуфляж «Розовый»",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957PfMYTxW08y_mou0mvLwOq7c2DxUscQkiO2S8I-h2gTm-hA4NTyhdoDDcVU3MwzV_1G4xb_uhpPo6Z7XiSw03MaHlHE"
			}, {
				"type" : "AWP",
				"skinName" : "Кортисейра",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYdAXUBKxfY_Qt5DfhDCM7_cotA4Lhr7lSLQ_tt4GVYrl4MY1IGJOGX_fTYF-p6E1u0qJVL5GB8S-9jDOpZDknDIyvzQ"
			}, {
				"type" : "AWP",
				"skinName" : "Графит",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYcRbXDLBSWco45gn6Bhg-4cBrQJnj8e5fLVnttoWSMbgsZtsfHJLTU6DXMw6o7kJp06BZLJaKqHm-2H_rJC5UDIW53w6s"
			}, {
				"type" : "AWP",
				"skinName" : "Красная линия",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqNRXuc7ywXpDS4n5Yk1DIHv9OxRKg7psNeUNbQrNI5ETsjQC6OEZFqru0o61fBbJpDfqC7pw223bdl877LM"
			}, {
				"type" : "AWP",
				"skinName" : "Электрический улей",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKOC5Yeg3UBJ9TWfEz4QWiUXJl6cY2UNLl9e4HcVm-tobFOuIvMNBPF8TRDv6DZ1v84ks91aJae4vJ_n0-dvDrog"
			}, {
				"type" : "AWP",
				"skinName" : "БАХ",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKOC5YcAjDDJ9NVfgq-A3TBCI24dJuGoPlo-JUeQS84NGSMuQvOdBISpKBU6TUMwqruxo50fdcfcaAqHnpj3z3ejBdzQVSDJ4"
			}, {
				"type" : "AWP",
				"skinName" : "Удар молнии",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYfg3FCbRQVfs9ywn7GRg-4cBrQJnloO1XcQXrtYLFZuUsZo0fFsCBDPKDbwD_4k07haheLMfYoi263iu9JC5UDNIZmW0F"
			}, {
				"type" : "AWP",
				"skinName" : "Азимов",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqFNVfg14jfhDCM7_cotUNTkp-gAKF3otIfBOuUoNdBIHMCDX_SCZF_9uR8w0fJUfpyPpC7n3jOpZDl_eS2fcg"
			}, {
				"type" : "AWP",
				"skinName" : "Медуза",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdShR7eO3g5C0mvLwOq7c2DkAvJQg27iT9NWm2VK3rkU6YmmiI4SVJAQ9MljUr1O5ku7ug8K1usnXiSw07gvX0uU"
			}, {
				"type" : "AWP",
				"skinName" : "Скоростной зверь",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYcxPSPqhHTPAoywrpCDQm18pmUN6j-vUDeFi-4IbHNrcoNolIGMXRUvXVNwz_4khpgadefZzc9Hjmjny8bzxeRVO1rf9MwH3s"
			}, {
				"type" : "AWP",
				"skinName" : "Боец",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYcxPSPqdSU-cjywXpDS4n5Yk0AIfvr-pVcQ2-toCUZrApY9pJTpHWCKDQMgD070o71aFcLJaA8S_nw223bVCT4Jfk"
			}, {
				"type" : "AWP",
				"skinName" : "История о Драконе",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMu9zw3g2yrkVtZ2r6IoSVdAU-ZVrY_lS6lb_ogsDqu57NmCQ27iJx53nD30vgUTXWscs"
			}
		]
	}, {
		"name" : "M4A1-S Case",
		"img" : "m4a1-s.png",
		"type" : "Special",
		"minRank" : "Silver III",
		"specialClass" : "M4A1-S",
		"casesToOpen" : 75,
		"weapons" : [{
				"type" : "M4A1-S",
				"skinName" : "Северный Лес",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-NmOXxIK_ulGRD7cR9teHE9JrsxlGy_EdvMGGmI9LAewNvaFrY-VG5wLy9jcXov8nOmHMx6ygl4XePlxGpwUYbs3f5UC8"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Смешанный камуфляж",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-dluX9MLrcmVRd4cJ5nqeWrNit2AewqhY_Yj31cIDGJgRtZV-E8gS2xOzv0Z_qucvJm3M16SFw-z-DyBeWkcOk"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Кровавый тигр",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_0jyxrpDTM778Jxa9qz87ITJBLq5dbCYrctM9wfSsOBCaLSYQ3-vE5p1qFbKZeKpSLujnm4PmZeWRri5CtazyA3u5I_"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Чистая вода",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_0jywfvDCY818VxVcG5yLYDLVWq6ZyTO7l5YtFJTsGDW_KEbgj-6R0x06RfLsGKo37niCm6OG8JXEDs_zkEhqbZ7bA1w3g4"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Нитро",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOlm7-Ehfb6NL7ul2hS7ctlmdbJ8I3jkRriqktuMD_0IoDDegNsMlmCrFm3wO_t08K4tZ_PzHY27HYr4HrUnEewn1gSObfcx9Ky"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Темная вода",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_Q3yxLpCzUz18NiRtyJ-r4CIEmyqobAZbEqOIpITsjTX_-AYVyo7hppiKVeepaMoy2-jCToPTwIWBDu-2ga2LjQk56IhGg"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Василиск",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_QrywW4CHYh18ViR966_qgNFlG64NuDbq4pMIsZS8LRDPfXZw2p6kJqgqUMJ8GN9Xzq3CnqOjgLWRDiqDoBkeSCpPI11RIKMHez"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Падение Икара",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-ClPbmJqjummJW4NE_3ujHpY2sigXl-UFoZGj7JYCXdgQ4YVnQ-1Lqxenn1MLpuszJz3tk6D5iuyjCqdNpmA"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Атомный сплав",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_Q3ywW4CHZ_-_hiWNu57oQJO12x49epbuV4aZ0RAcLWX6OGZA2puB1pgqUMLpWBoC671XngOD1ZCEG_rmMAkbDWvORp1mcIAy_njWgGDWs"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Хот-род",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2P8I-g0VHtqUNlNmimLdCRdFdoYFCErwC4xLu6jJbpuc-dnydq73Jw5GGdwULhEbgmIQ"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Рыцарь",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_Q3ywXpHSY--_hvXdC-44QKKE644ZzHZuYtMd1JTMfRWPWCb1v_uxpt1alcKJfYo36-2nu7OzsMWUbq-W0GhqbZ7cEF2RPW"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Шедевр",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHZ_-_hwXduz-bgDFlG64NuDbt9wYZobSt7XXf7QMA776RlrhKIPJ8GMoCO83Xi_PmwMCBK9q2kAzOPVu7pq1GlCXTHu-qDNDQ_Q"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Страж",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHZ_-_hmWNKx9rUSFlG64NuDbq4qN4seF8jZWvXSYgqru0g-hKlfJpKNp3npiym6aDtZUxa_rmIMmeXWpPI11YiABWgk"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Скоростной зверь",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHYN4N5zUcWJ9b4HOkiA6deSavVxLt0aG5GCCKDQMgn-4kMxgaVYJ5CA9iO-3y-9OT8JDUXirD4GneXT6LJ1wjFBrFMBOCI"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Золотая спираль",
				"rarity" : "covert",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOxh7-Gw_alIITCmGpa7cd4nuz-8oP5jGu5rhc1JjTtLIfEdVQ-YA6G-FbqwOzs05Tp6smdzHdiuCUi5y7YnRG1gB9OOLE50OveFwutvS5J8A"
			}, {
				"type" : "M4A1-S",
				"skinName" : "Сайрекс",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHYh18R6RtKuyLYDLVWq6ZzFZrUqMItNHpbRUqCOYg-rvEMx1qdcLseIpy253Cy4Mz9fUxDi-ToHhqbZ7WBrCDQm"
			}
		]
	}, {
		"name" : "AK-47 Case",
		"img" : "ak47.png",
		"type" : "Special",
		"minRank" : "Silver II",
		"specialClass" : "AK-47",
		"casesToOpen" : 50,
		"weapons" : [{
				"type" : "AK-47",
				"skinName" : "Африканская сетка",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zFdC5K08i3mr-HnvD8J_WBxTwD6ZB12b7Hodumig23rUY5YTymJ4TBcFA7NVvW-FW5l-zr1JXtot2XnkNBBWuK"
			}, {
				"type" : "AK-47",
				"skinName" : "Хищник",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zSdD9Q7d-3mb-HnvD8J_WEkDoE65x03rjDrI322QfhqUtrMD2icNSRcgFtaFDX-AS9wL3u05S1ot2Xnn9ZGujG"
			}, {
				"type" : "AK-47",
				"skinName" : "Цвет джунглей",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zbYS9D9eO8gY6Mm_LLP7LWnn8f6cMk2L3E9NqkilHm8hI-a2inctSWcAc8Zl-C81nvw-_uhpW06MjKzmwj5Hd9a9y0Zw"
			}, {
				"type" : "AK-47",
				"skinName" : "Черный глянец",
				"rarity" : "milspec",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhoyszJemkV4N27q4KcqPrxN7LEmyUDsJIh27-YpYmmiVDm_UFuZ2vzJYPDJlRsYw2C8lC5w-fu0Je_6ZrB1zI97TOUU9Z0"
			}, {
				"type" : "AK-47",
				"skinName" : "Элитное снаряжение",
				"rarity" : "milspec",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhUfQp4A3-EBg_7cNqQdr48-9fLQrnsIXCNLkuYYxLGMbVD_SOMl_54kw8iaQMKsTY8yzq3y3oPXBKBUT7Bt81Vg"
			}, {
				"type" : "AK-47",
				"skinName" : "Синий глянец",
				"rarity" : "restricted",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDz9-TQXJVfdSXfgF9gT5DBg_7cNqQdr4oL5WLAnm5YbBN7B5MthISZPZCaTUbwys6khqiKFdKpWB9iLm2iu9MnBKBUT3mim8qA"
			}, {
				"type" : "AK-47",
				"skinName" : "Изумрудные завитки",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszYeDNR-M6_hIW0lvygZITZk2pH8Yt33byV8N-ii1Dn8kVqMWv0IYGQIQ47YQvS_FG4k-i6h8Tq6pjBznBqpGB8snmEYrAC"
			}, {
				"type" : "AK-47",
				"skinName" : "Первый класс",
				"rarity" : "restricted",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszPYzhH4uO6kYGfn_LmDLrawjxu5cB1g_zMu9rw0Fbl-kJuY2r3cI-RIVI-MlzTr1foxOe6hcC-6ZvPnCFquChz5XjD30vgHKsTYF0"
			}, {
				"type" : "AK-47",
				"skinName" : "Гидропоника",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh3szKcDBA49OJnpWFkPvxDLfYkWNFppwpie2Rp9_w0VDm-UNrMj30IoPHdAY-M1rY-1K7w7291pO8vJTJzHN9-n51xLwwH8g"
			}, {
				"type" : "AK-47",
				"skinName" : "Путешественник",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszfdDFO08iklZaOm_LwDLrawjxu5Mx2gv2PotytiQHnqhBoZGqnI9XBcgQ-Yl_Y_Vfvyey9g8S4753JzSA1s3Eh5GGdwUIoc5a5cw"
			}, {
				"type" : "AK-47",
				"skinName" : "Снежный вихрь",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08u_mpSOhcjnI7TDglRc7cF4n-SPpI-iigLg80ZvZzryd4_GI1Q6Yg3VqFe4w-y90JLo753NzXtmsnEl4mGdwUIuRPhSEw"
			}, {
				"type" : "AK-47",
				"skinName" : "Point Disarray",
				"rarity" : "classified",
				"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08y5nY6fqPP9ILrDhGpI18h0juDU-MLx2gKy8xFqMDr2IIORcAU6MlnS_Vjtxu7rhcK-u5-cyXZqsiEg7HnUgVXp1kpd_x09"
			}, {
				"type" : "AK-47",
				"skinName" : "Картель",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzZ2TQXJVfdhX_Qo4A3gNio37M52WZmz9e0ALAjttYKVN7QvZtxEG8nXCPXSYwD970huiKgLK8Daoim-ji7oJC5UDGS-VkfD"
			}, {
				"type" : "AK-47",
				"skinName" : "Красный глянец",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDz9-TQXJVfdSXfgF-Q3oADI_ppdnDdK18e4CLQ_v5YeQMuYkMtEdHpLYWP7XMw6v60xpiKhfJpWBpCrxnXO-X5QNkco"
			}, {
				"type" : "AK-47",
				"skinName" : "Красная линия",
				"rarity" : "classified",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhX_o45gnTBCI24dJuGtay8-MEew_n4YCTNOMuNNhLF8GDU6KDNFipvEg-gfRfLp2PpXi82Hz3ejBdOj7r2Ww"
			}, {
				"type" : "AK-47",
				"skinName" : "Аквамариновая месть",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhX_ov5gnrDBgz5NNcWdKy_q4LZwm5toDOYrAuYdgYTcSEU_XQYAD84khqh6kLKsCAoy7r2nnoaGgLWhf1ujVTz27JTVE"
			}, {
				"type" : "AK-47",
				"skinName" : "Ягуар",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTRTDD7RWWecF9QO4Xhg_7cNqQdr49esEKA7us9bHO7J-MdBLTJTSWfKGZAypuUs-iPNaKJSM8Xm7i3jqaHBKBUSMHsVe9Q"
			}, {
				"type" : "AK-47",
				"skinName" : "Огненный змей",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQLLE6VNWecq8Qb4NiY5vJBcVsW34bQ5JFm77cebLbB-Zt4fGsDVW_DUZV31uR9sh_AJfsbcoXjpiy24OWZZX0C_-WkAyrWZ-uw81vin62w"
			}, {
				"type" : "AK-47",
				"skinName" : "Вулкан",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTQXJVfdhTuA49g3-Nio37M52WZnjpepeeQrm5YDBYOUlOIlJSsXQXv6FMA_4uEpriKFcfZ3a9irr2SjhJC5UDBM24vTE"
			}, {
				"type" : "AK-47",
				"skinName" : "Пустынный повстанец",
				"rarity" : "covert",
				"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTRDQCKJLSPAF9QO4Xhg_7cNqQdr4ou8Ffw-7s4GUM7IlYdAdH8bRUqSCblyv6Rg6hKcOKJSKqSq-1SrsPHBKBUSRoheuWQ"
			}
		]
	}, {
		"name" : "Workshop",
		"img" : "Workshop.png",
		"type" : "Workshop",
		"specialClass" : "workshop",
		"casesToOpen" : 50,
		"weapons" : [{
				"type" : "Sawed-Off",
				"skinName" : "Cutaway",
				"rarity" : "milspec",
				"img" : "Workshop/Sawed-Off-Cutaway.png"
		}, {
				"type" : "PP-Bizon",
				"skinName" : "Nostromo",
				"rarity" : "milspec",
				"img" : "Workshop/PP-Bizon-Nostromo.png"
		}, {
				"type" : "Five-Seven",
				"skinName" : "Blot",
				"rarity" : "milspec",
				"img" : "Workshop/Five-Seven-Blot.png"
		}, {
				"type" : "SSG 08",
				"skinName" : "King Cobra",
				"rarity" : "milspec",
				"img" : "Workshop/SSG-08-King-Cobra.png"
		}, {
				"type" : "MAC-10",
				"skinName" : "Kinetics",
				"rarity" : "restricted",
				"img" : "Workshop/MAC-10-Kinetics.png"
		}, {
				"type" : "M4A1-S",
				"skinName" : "Never Fly",
				"rarity" : "restricted",
				"img" : "Workshop/M4A1-S-Never-Fly.png"
		}, {
				"type" : "CZ75",
				"skinName" : "Badass Comic",
				"rarity" : "restricted",
				"img" : "Workshop/CZ75-Badass-Comic.png"
		}, {
				"type" : "P250",
				"skinName" : "N-Force",
				"rarity" : "restricted",
				"img" : "Workshop/P250-N-Force-R.png"
		}, {
				"type" : "AWP",
				"skinName" : "Phoenix",
				"rarity" : "classified",
				"img" : "Workshop/AWP-Phoenix.png"
		}, {
				"type" : "Desert Eagle",
				"skinName" : "Gold",
				"rarity" : "classified",
				"img" : "Workshop/Deagle-Gold.png"
		}, {
				"type" : "AK-47",
				"skinName" : "Fluentem",
				"rarity" : "covert",
				"img" : "Workshop/AK-47-Fluentem.png"
		},  {
				"type" : "USP-S",
				"skinName" : "Draco",
				"rarity" : "covert",
				"img" : "Workshop/USP-S-Draco.png"
		}, {
				"type" : "★ Gut Knife",
				"skinName" : "Revenge in Sweet",
				"rarity" : "rare",
				"img" : "Workshop/Gut-Knife-Revenge-is-Sweet.png"
		}, {
				"type" : "★ Karambit",
				"skinName" : "Purple Abstract",
				"rarity" : "rare",
				"img" : "Workshop/Karambit-Purple-Abstract.png"
		}, 
		]
	},
]
