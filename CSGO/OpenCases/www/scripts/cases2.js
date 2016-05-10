//var prefix = "http://steamcommunity-a.akamaihd.net/economy/image/";
//var prefix = "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz"
var prefix = "http://steamcommunity-a.akamaihd.net/economy/image/"
var postfix = "/125fx125f";
var postfixBig = "/383fx383f";
	var cases = [{
			"name" : "Cobblestone",
			"img" : "Cobblestone.png",
			"weapons" : [{
					"id" : 1,
					"type" : "Сувенир MAG-7",
					"skinName" : "Серебро",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeTiDzZpTRfLDbZbTso2_Q_kHRg-6dVkUZmw8blXfV7mt9bPMLB6ZtFJFsLQU_GCM12p7UNr1qcPLJTbpCK5iCnqJC5UDMUocYuO"
				}, {
					"type" : "Сувенир Nova",
					"skinName" : "Зеленое яблоко",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51O_W0DyRoTQPQBKVQY_kz8wD4Nisz-sBmGtHg9elXeg3p54rGM-J-MdFMHcLWW_TTYlv07E5uh_VeLpfcqH_riyj3ejBd_Ytbnf8"
				}, {
					"type" : "Сувенир Sawed-Off",
					"skinName" : "Пыльник",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oNfSwNDhhdDvDEJ9NSPA_-DfgACA6_PhvVcWx8vUEegrs54KQMuV5ZtBPTpPXWP-HMAGv7E9sg6JVe8bd9CLt3CXqP24IRVO1rcqi3iQB"
				}, {
					"type" : "Сувенир USP-S",
					"skinName" : "Королевский синий",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhVOwF_QboACA919JwROi6_rwOPWOz5cCRZq54OdpNH5OFW_6EYAr67kxphaEILJeJoCzuiC7qOT9fXRLv-zhXkbODpPI11fwazqo1"
				}, {
					"type" : "Сувенир P2000",
					"skinName" : "Кольчуга",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TQXPPqNWXfw0-QnlBRg-4cBrQOi69qkBLBLtstfOZ7V5MNkeGZGGUqLVbgyvv0g80_dcKZ2KoH-52y_hOm8MXUW_5Ctaz2WBfqlw"
				}, {
					"type" : "Сувенир MP9",
					"skinName" : "Темный век",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLqKMTpYfwHWAKxhVfs29RHTBS414NNcWNak8L5IKAjmsorHZeIvYdtFTZTTXf6GYwipvkk61vdUeZyBqHy71S7obmoLDQ2rpDzIcv87gw"
				}, {
					"type" : "Сувенир CZ75-Auto",
					"skinName" : "Чаша",
					"rarity" : "restricted",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQhmfzvQDrlfUMo2_Q_kHRg-6dVkUZmwrr1RK1jn4YfFMbF6YdhJGMKBDqWENA766k44hqFVepCMpyq8iXy_JC5UDCVxCpEX"
				}, {
					"type" : "Сувенир Desert Eagle",
					"skinName" : "Пищаль",
					"rarity" : "restricted",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYcxX9CaFQWPY7-gbjBxg-4cBrQOi69qkBLBK6stfONON5YtpPHMeBXvSFMgv_7x9rgaZaLJGL8XzsiXvtOmgDXhvu5Ctaz0M6Ya91"
				}, {
					"type" : "M4A1-S",
					"skinName" : "Рыцарь",
					"rarity" : "classified",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_Q3ywXpHSY--_hvXdC-44QKKE644ZzHZuYtMd1JTMfRWPWCb1v_uxpt1alcKJfYo36-2nu7OzsMWUbq-W0GhqbZ7cEF2RPW"
				}, {
					"type" : "Сувенир AWP",
					"skinName" : "История о Драконе",
					"rarity" : "covert",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYfwHGCKVIXfkF8BrtDig818Z0ROi6_rwOPRK85oGUO7EqOI1JFpXZXKDSZQqovBoxhaZVLZWP8Si-jHi9Om0MDUDr5Ctaz_VyoP26"
				}
			]
		}, {
			"name" : "Overpass",
			"img" : "Overpass.png",
			"weapons" : [{
					"type" : "Сувенир MP7",
					"skinName" : "Пороховой дым",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLSKOC5YdQHOEaVQY_kz8wD4Nisz-sBmGtLnrr8CfwTn54DHYuUsOdwaSZPTXPKPMwH9vx4506ALL5yMqSvt2Hz3ejBdDjjwX7U"
				}, {
					"type" : "Сувенир Desert Eagle",
					"skinName" : "Пиксельный камуфляж «Город»",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5_MeKyPDJYeh39BaROXeEF4RruNis77893a9u35bwDZwzp5dTGYOIsZdhEG8nQDPfQNFj87Rpr1KAPJsaAqCPo1SrtPz0IWhD1ujVTzfiQSC4"
				}, {
					"type" : "Сувенир Glock-18",
					"skinName" : "Ночь",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2Owh0fTvMCKdWSMo2_Q_kHRg-6dVkUZmzou0DKAXt5oaUO-MtOdlITseGX6CCMw71408wg6JcLJ2NpXvvjym4JC5UDM2OjgLl"
				}, {
					"type" : "Сувенир P2000",
					"skinName" : "Цвет луга",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5zP_PnYGc3TRfNPqdMXeYp-AniDRg-4cBrQOi69qkBLBK8ttHOYOQlOdFKH5bVXaOHMw2ovxk5gqdce8PY9inv3Su8PGkIXhTs5Ctaz-z1qC5_"
				}, {
					"type" : "Сувенир XM1014",
					"skinName" : "Смешанный синий камуфляж",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5jObLlYWNYeh39F6FMVfY7-QfTCysn7fhrUdag7oQKKE644ZzPO7h4OYtKTMjSC_GBZA70vBo5hqJZL5Hd8Sjnji7qbG9cWEDtqG4HhqbZ7cas9KMn"
				}, {
					"type" : "Сувенир SSG 08",
					"skinName" : "Объезд",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oJ-TlaAhvazvREqcOBMo39RrnDDUN5M5kXMOJ-7oULlnxt4PON7UoY9BKGMaECfDSYQusvkpqhvReK5bcpizuiSThOW8MXxa9qHVExrFFd9cdiw"
				}, {
					"type" : "Сувенир CZ75-Auto",
					"skinName" : "Нитро",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz54LrTgMQh0fTvNE6FQW_AF9QvvDCkm-5VcWN6x_685JV2t49fYO7QoYoxKS8DRCaOBNQ_07kM-g6NafMDbpC692yi7Mj0NCEDv8z0GzPjH5OVY4WEqzg"
				}, {
					"type" : "Сувенир AWP",
					"skinName" : "Пиксельный камуфляж «Розовый»",
					"rarity" : "restricted",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKOC5YdgDSALRhTPw0_zfgACA6_PhvVcWx8vUHeQy94dCTYuQoNt8dGMHQXPaAZAn44kIwgvBceZ2PpSu8iyvvOTxZRVO1rS1FzD4D"
				}, {
					"type" : "Сувенир USP-S",
					"skinName" : "Следы асфальта",
					"rarity" : "restricted",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uJ_OKIz5rdwrBBLJhX-AF4Rv8NjQz5sNzVcez5b4CFlC249qCXOx9co8ZAciED_-GYV-ovklsgKFeKcCJ8yy83HvqOGhZWRPi-25RkOKBuLBs02gIAy_ncygcKNw"
				}, {
					"type" : "Сувенир M4A1-S",
					"skinName" : "Шедевр",
					"rarity" : "classified",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyRufgHMAqVMY_YvywW4CHZ_-_hwXduz-bgDFlG64NuDbt9wYZobSt7XXf7QMA776RlrhKIPJ8GMoCO83Xi_PmwMCBK9q2kAzOPVu7pq1GlCXTHu-qDNDQ_Q"
				}, {
					"type" : "AWP",
					"skinName" : "История о Драконе",
					"rarity" : "covert",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYfwHGCKVIXfkF8BrtDig818Z0ROi6_rwOPRK85oGUO7EqOI1JFpXZXKDSZQqovBoxhaZVLZWP8Si-jHi9Om0MDUDr5Ctaz_VyoP26"
				}
			]
		}, {
			"name" : "Nuke",
			"img" : "Nuke.png",
			"weapons" : [{
					"type" : "Сувенир P90",
					"skinName" : "Радиоактивные осадки",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rbbOKIydYfBHJBLNKTvwq8TfhCDU958lcWN6x_685JV2t49fYYLMlMd0ZGMLTCP6EZ1r9vks71vIMeZCJpivt1H_rOTgLXUG_rD0EzvjH5OVDrn_llg"
				}, {
					"type" : "Сувенир UMP-45",
					"skinName" : "Радиоактивные осадки",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5uOfPhZQh0YjvMFKtbT-Eo_RjpNioz-shsWui6_rwOPWOz5cCRZq4lMtFKGMWGXvLQZgr96R0_h_cJe5CMpinr1S_gPm8NU0a4rGkHzLSGpPI11ccI3AlO"
				}, {
					"type" : "Сувенир XM1014",
					"skinName" : "Радиоактивные осадки",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5jObLlYWNYYRT9D7VVWeYu5gH8DBg_6dVsW9mJ-7IBIUiA6NOEZOUyOIpKSZGDDPWGM1376k4_haFUecbY9ii81XzuPz8KX0Dp_GkNmuaE66wr3DjPDtvHaw"
				}, {
					"type" : "Сувенир M4A4",
					"skinName" : "Радиационная опасность",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52YOLkDyR3TQrXCqVNSOcz5A3TBjUz5sBma9u_8LMSFlC-9tWTLeR5YttFFsWFCfbUMg796Epr1qJefMSJqCO53HnhMmdcCRrpqzlVkeKZ-uw8yN00S9Q"
				}, {
					"type" : "Сувенир P250",
					"skinName" : "Ядерная угроза",
					"rarity" : "classified",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDyR3TQrXCqVNSOcz5A3TDjU37clcWN6x_685JV2t49fYM7klY41PGsKDDqXQbgr97ktp0fVaLpeApiK73SvvbGwMWxfo8zgGmvjH5OXW4s7sYw"
				}, {
					"type" : "Сувенир Tec-9",
					"skinName" : "Ядерная угроза",
					"rarity" : "classified",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5vMeDsDyR3TQrXCqVNSOcz5A3TDjU37clcQNK1roQKIFu38O2aYvJ7ZcZMH8bXWfWFYAv4uB05gfcLfpyK9C3v2Hm9b2sPWEHvqGlWzuDRsrA4nC9IFLzSAHff"
				}, {
					"type" : "AWP",
					"skinName" : "История о Драконе",
					"rarity" : "covert",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYfwHGCKVIXfkF8BrtDig818Z0ROi6_rwOPRK85oGUO7EqOI1JFpXZXKDSZQqovBoxhaZVLZWP8Si-jHi9Om0MDUDr5Ctaz_VyoP26"
				}
			]
		}, {
			"name" : "Winter Offensive",
			"img" : "winter_case.png",
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
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Tiger Tooth",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK5hSPw98RrTBjUz5sBma9u_8LMSFlC-9tWTLbQpOdgYHJHZXPCAZ1r4v0480fdeLZ2M83jt3irpPWlcCBXorm8MnrSZ-uw8-9ETQO4"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFfY_M78A3TBS414NNcWNak8L5IcQ3u4oqTO-F6Mo1MH8bXX6WGYg6s4xg51agLL5Hb8n_qjH68Mm1YWg2rpDz-PIrjNA"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Ночь",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMop-zfiACA6_PhuUdO_4rY5JV2t49fYO7V-ZdFJFsSBXPWAYwqp70s6gqRZfJyOqC_viSXtaGteXkG_8mxXmvjH5OVitTZMMg"
				}
			]
		}, {
			"name" : "Falchion Case",
			"img" : "falchion_case.png",
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
					"type" : "★ Фальшион",
					"skinName" : "Ночь",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhcwjBCalRUsop-zfiACA6_PhuUdO_4rY5JV2t49fYOrl4NtFNTpTSUvKPMgirvhltgqlfLsaPqHnt23vrP24CU0C9rmpQmPjH5OU_T7XgZQ"
				}, {
					"type" : "★ Фальшион",
					"skinName" : "Патина",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhcwjBCalRUso75TfqBjUx7cNcWN6x_685JV2t49fYMOIlON4YSZPTU_PTYA_97R851qFYecbdoXzsiCu7Mj0ICBG4-z0BkfjH5OUx1yeioQ"
				}, {
					"type" : "★ Фальшион",
					"skinName" : "Городская маскировка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhcwjBCalRUsop5Df4CDc319JxVta4yLYDLVWq6e2aYvJ7ZcZPG8HYWKXVbl2r6009hPdafJaKqX_o2CTubG4NWxXi-zgAkOWE77s9nC9IFBG64vUO"
				}
			]
		}, {
			"name" : "Operation Vanguard",
			"img" : "avangard_case.png",
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
					"type" : "★ Штык-нож",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Nfq6PjJzTQXTPq9XUPA-ywTlDi8m18tiRtCzueJUeQTpstfEYrF6Md8aS5HXXfaEMwmv7hhqiaQLK5DYqHvnji3pPW4UG028JI0XXjw"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AKFhWvQ-8TfgACA6_PhvVcWx8vVQLATm54DFNLAqZYkaTMPUD_GBZwqu6E081vUJeseApC7r2XzgaGgNRVO1rQU2Lej8"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY-8_9hrtNis77893a9u35bwDZwnqsITBZeIqNdxLGpTYWKWCYwuvuUI-galde5SJoXy5iSq8PWgLUhH1ujVTthpPV9Y"
				}
			]
		}, {
			"name" : "Operation Phoenix",
			"img" : "fenix_case.png",
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
					"type" : "Galil AR",
					"skinName" : "Sandstorm",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPrNfUvEp4Af-BBg-4cBrQOi69qkBLBLvtIrPMLcrMt8ZGMWCDP6CZl3_uE45gfVee52NqSm-3C-7PzteWUK45Ctaz0ith5CI"
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
					"type" : "★ Керамбит",
					"skinName" : "Пиксельный камуфляж «Лес»",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMoy7TfoDTcz_PhvXdC-44QKKE644ZzCYOUvZNgYGsnXC_eCbgirvE9r1PJUesbaqHnu2izuPmZeXxrp8mgGhqbZ7fQ9-fxZ"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywnhNj036tVia9qz87ITJGOz5cCRZq4rNotJSpTTXPeFZAD56UpshqULJ8GBoH681Su_ODwMCRft_mhQnLPTpPI11Y9Vd8RM"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY-8_9hrtNis77893a9u35bwDZwnqsITBZeIqNdxLGpTYWKWCYwuvuUI-galde5SJoXy5iSq8PWgLUhH1ujVTthpPV9Y"
				}
			]
		}, {
			"name" : "Huntsman Weapon",
			"img" : "ohotnichiy_case.png",
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
					"type" : "★ Охотничий нож",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMo7-Tf2DCUg6fhvXdC-44QKKE644ZzHMbkqZN9KS8PUDPfTYw7-4k46hPJVL53foyzq2CXta20CCkK9_DlShqbZ7Wmh-3NS"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMo79TfqCCM318tqU9-iyLcHO1u6qoSQMbEqM4sfSsSGDPeHYAv_7h0wgKhfL5XaqX_m3yW9aDhfWkDi-Doa2LjQL_jvEsc"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Сажа",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMop5DfoCDci5MJcWN6x_685JV2t49fYZbF5MopNG8fYWP-Pbw_-vxls1qgOJ5eL8ny823i_aD9YCBK-qWpXkPjH5OUC1jXlVA"
				}
			]
		}, {
			"name" : "Operation Breakout",
			"img" : "proriv_case.png",
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
					"type" : "★ Нож-бабочка",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF9QnTDyY27fhvXdC-44QKKE644ZyUMuF-NY4eHJWEWv6Hbgys6E0-g6JZfZONqCK-3ivtaDwJDRHp-j0MhqbZ7VLOXRkn"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF9RnTBi4-7cNcWdKy_q4LFlC-9tWTLbAvYdkfFpSFDv-GZQz14kM4hvVUfcHfoCu61C3qOGhYDRHpqzpSkLCZ-uw8KMc6tY0"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Патина",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF9RnTDygg68Jna9u_8LMSFlC-9tWTLbF5NdpOGsmGUqTSYFv-uUk8gvIIe8eL9Cq-1Srgb2dcCBLsqGxVmuWZ-uw8pT4tNB0"
				}
			]
		}, {
			"name" : "Chroma Case",
			"img" : "chroma_case.png",
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
					"skinName" : "Dragon King",
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
					"type" : "★ Керамбит",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfjACs37PhuUdO_4rY5JV2t49fYYLApNolKHJPTC6XTZAD76UM506lcJpLbpCPq1S27MjxZUhu9qGgCzPjH5OUcQbPO0g"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Doppler",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY_E15BjgDDUN-M9iR9LlyLcPLlSr296Xced5LotKFsiEX6KAN1uvu0I5hPVVL8GLqSi7j3_qOjhfCRDu-zoDnu7RubF1wjFBhWuhfm0"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF9QXTEyIw-sZcWN6x_685JV2t49fYO-YpZNpESciCUvCGYV316Us9ifJZe8OPoSK93iTgb2xcChbu-zlWnPjH5OXGTTUtRA"
				}
			]
		}, {
			"name" : "Chroma 2 Case",
			"img" : "chroma2_case.png",
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
					"type" : "★ Складной нож",
					"skinName" : "Волны",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY_E15BjgDDUN-M9iR9LiyLcPLlSr296Xced5LttNSZbQW_XUZ1v7ux4xgvILKcCN8yPo3S3ubjpbXhHuqGwDnu7R7uZ1wjFB8ZY2tGk"
				}, {
					"type" : "★ Штык-нож",
					"skinName" : "Волны",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Nfq6PjJzTQXPPqRRTOU28RrTGS8z-8Iwa9u_8LMSFlC-9tWTLbYsMIxESsSBCPCDZgD44x1p06NULMSPo3652i-6O2kCCkHu-W4CneeZ-uw8JM0c440"
				}
			]
		}, {
			"name" : "Shadow Case",
			"img" : "shadow.png",
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
					"type" : "★ Тычковые ножи",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD7eOwlYSOqPv9NLPF2G0Gu8Eo2bDApt-g0FXl-UU6NTuhI9SccVU3N1DXqFjsxua-g8W7tMvXiSw0K6R8VrQ"
				}, {
					"type" : "★ Тычковые ножи",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOskYKZlsj4OrzZgiVQuJxw3OrHptitigXk-RVkYzz7I4SXdFVtZlmE-lK7xeq6gJa-u53K1zI97VbkI_gt"
				}
			]
		}, {
			"name" : "CS:GO Weapon",
			"img" : "orujeiniy_case.png",
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
					"type" : "★ Складной нож",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqhHY-I_9hvTBCI24dJua9u35bwDZw_t5dDGNuN9Y4tOHpTTX_TQMwn740Jq1KRcKJKP9n-8iC-7PmZbDkD1ujVTXDtaQyI"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF_BHTHiIw-_hvXdC-44QKKE644ZzOZrN9M95KF5HYXPGONw2uv04-0qNbKJDapiq72ni6PD8NXhXj-GxVhqbZ7T7USzse"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Ночь",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9Eq9hUvw9_BzTBS414NNcWNak8L5ILFm8ttCUN7AoYdxPGZLWDvGCMAj0uUw60qlVeZKJoyLvjH_qOztfDg2rpDwy3z-Xlw"
				}
			]
		}, {
			"name" : "CS:GO Weapon #2",
			"img" : "orujeiniy2_case.png",
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
					"type" : "★ Керамбит",
					"skinName" : "Ультрафиолет",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMop-zf8HDUi5MJcWdKy_q4LFlC-9tWTLbl9NI0aSsjXC_eOMg35uEpt06JdesaB83zojCy9bDteUxTjqGsBnO6Z-uw8bSDJz_o"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Пиксельный камуфляж «Лес»",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF_BHTDSMi6dNcWN6x_685JV2t49fYNeUkN9wYH5HWDqSDMgj57ENrg_NYfZyA8ynv3n-_PWgCWBTu82hSzfjH5OVLJOs30w"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Вороненая сталь",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMo75TfuBTI37PhvXdC-44QKKE644ZzBYLQvOIpPTMfQU_WFMl39v01qiKFafpCPqSq-2iruaW0KXBrj_mhShqbZ7RsaTLqD"
				}
			]
		}, {
			"name" : "CS:GO Weapon #3",
			"img" : "orujeiniy3_case.png",
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
					"type" : "★ Керамбит",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfjACs37PhuUdO_4rY5JV2t49fYYLApNolKHJPTC6XTZAD76UM506lcJpLbpCPq1S27MjxZUhu9qGgCzPjH5OUcQbPO0g"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhlZxDWBLJYUOwF_BHTHiIw-_huUdO_4rY5JV2t49fYMuJ_NI0aGZHVX_KEMg6rvkswhaQIK8Pc8y3n1H-9PD9fX0Du-20GnPjH5OW7WRyALA"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Пиксельный камуфляж «Лес»",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhzcwfWCKNfUMoy7TfoDTcz_PhvXdC-44QKKE644ZzHM7kqON9EFsWEXfSBY1yv4ktuhPBaJ8OLoSi6jn-8aGYLCRC5rjhWhqbZ7f3T5ZL3"
				}
			]
		}, {
			"name" : "eSports 2013",
			"img" : "esports2013_case.png",
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
					"type" : "★ Керамбит",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfjACs37PhuUdO_4rY5JV2t49fYYLApNolKHJPTC6XTZAD76UM506lcJpLbpCPq1S27MjxZUhu9qGgCzPjH5OUcQbPO0g"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_oz-A3oNis77893a9u35bwDZw3rsYrPZ7R6M95KHMPQXv-Gbgv5vEg-1aYLKJCLoSPr2iW8OD1bCUf1ujVTxaDwZJQ"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Северный лес",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywD1NiE9-sJwQOi0-KkDKFCA6NuRa_RDbIkOSJXOWvGCNw6s401piKZYfpCO9Sy-iSzvb2ZbXRTj-G8BzuSE77U_hmlEEW_w87uLpmm_PQ"
				}
			]
		}, {
			"name" : "eSports 2013 Winter",
			"img" : "esportsw2013_case.png",
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
					"type" : "★ Штык-нож",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Nfq6PjJzTQXTPq9XUPA-ywTlDi8m18tiRtCzueJUeQTpstfEYrF6Md8aS5HXXfaEMwmv7hhqiaQLK5DYqHvnji3pPW4UG028JI0XXjw"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Пиксельный камуфляж «Лес»",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_oz-A3oNis77893a9u35bwDZw3rsYrPZ7R6M95KHMPQXv-Gbgv5vEg-1aYLKJCLoSPr2iW8OD1bCUf1ujVTxaDwZJQ"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK1hRvA45gnTBS414NNcWNak8L5IKg_osNTOZrctZttMH5XUWfOHNA_16hk-gqVbe8SPpC-73nm8a24LDw2rpDxc1kJY2A"
				}
			]
		}, {
			"name" : "eSports 2014 Summer",
			"img" : "esports2014_case.png",
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
					"skinName" : "Man-o'-war",
					"rarity" : "covert",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMTpYcxPSPqdSU-cjywTlDi8m18tiRtCzuehScVm-4YKQNuQoZIlEGcfRUv6Abgv77E8w1PVZLpyO8SPn3yTpM24UG028omRZCoA"
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
					"type" : "★ Керамбит",
					"skinName" : "Северный лес",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMoy7TfqBjU3-9NcVtik8roKFlG64NuDbt9wYZobSt6DWaCDNQms4hhriagMfsGO8yrp2SvubDwCCkfu_2pQkbWBvro412lCXTHu-vwNOTyx"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Marble Fade",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFTY_g75grgDBg06cNma9u_8LMSFlC-9tWTLbUrYdFFHJGCXPCFZFusuEw8gvUOJpPcqH-9iHm_M2YOXBC9q25WnO6Z-uw8Y8ANU94"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywD1NjA36tRcWdKy_q4LFlC-9tWTLeR4ZtsfFsHXDvGCZAn7404_hvNUesSJoSPnjC28OW0PCRO6_D1VnuWZ-uw8Gn75-BI"
				}
			]
		}, {
			"name" : "Knife Case",
			"img" : "knife.png",
			"specialClass" : "rare",
			"weapons" : [{
					"type" : "★ Нож Боуи",
					"skinName" : "Вороненая сталь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrulGdE7cFOhuDG_Zi7jAbgqENvNjv2cYHDJ1Q4ZAqB-Vi5l-u-1MXtucvIynJn63N3syzbnQv3308wj9M7Tg"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Северный лес",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLO6LukGRD7dZltevO54n0hGu4ohQ0J3f3J4_EdFRqYQ7Y8gO9kr--gpXou8iYwXZkviUgtH7cmUDjgE0fO7Zom7XAHgyvqmnm"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrumWJd7cFOhuDG_Zi73VDi-hdqNmn6INCXc1Q8NFDV_Qe-x7i8g5e-v8ydzSZi7HUr437UnAv3309ikmqnoA"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Пиксельный камуфляж «Лес»",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLO6Lukm9B6dFOhuDG_Zi73AW3rkI4Yz37Jo_HJlBrYlHY8lPvyershZK57Z-YwHZj7nEktyrVyQv3309AwMWh8A"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbujG5T-sROh-zF_Jn4xgfk_xJvYGqlI9OQJAc-YgzX81a4w-rpgsC16Mubz3Qxv3Zx4HqJmkSpwUYbBsqV8z8"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Патина",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrukGRD68B1teXI8oThxlC38kJsZDigJYGVdQY6YVmC_APrwO_s0Jft6p3Om3M17yIn4izUmhSpwUYbpuF0ilg"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Вороненая сталь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT0966gYWPqPrxN7LEm1Rd6dd2j6fF89Xxiway-ktuNW7wdoKUdA5raQ7SrlW5yejoh5G5tZvNwCdmuyYm-z-DyMBqk-Qb"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjVb08uzlpO0m_7zO6_ummpD78A_2LiW9Nuj0VGw-0JvYj2hJdKWI1NoZAnU-gPtyOzo0ZK4u52bm3Bh7j5iuyiVfFD71A"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT09O_mIWPqPv9NLPFqWdQ-sJ0xO-Qod2i2wOy_EdpYW_7LIDBclI6aVHV-Fm_lOe-gJG5vpvKyHYwv3M8pSGKIGsDSZw"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK1hRvA45gnTBS414NNcWNak8L5IKg_osNTOZrctZttMH5XUWfOHNA_16hk-gqVbe8SPpC-73nm8a24LDw2rpDxc1kJY2A"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Волны",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhgZxD9AK1hWPoq5ATpGxgi4MZwUYOJ-7IBIUiA6NOEZOUyZItNFsWGU6WDMlus60wwhaIIK8fb8XnmiCi9aW4JXBHi_WoByuTV7Kwr3DhWsXJSNg"
				}, {
					"type" : "★ Нож с лезвием-крюком",
					"skinName" : "Зуб тигра",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxM08i_k4WZqPjmMrXWk1Rd4cJ5ntbN9J7yjRrg_kpsN2qiLYCTdAdtZA3V_gDowuzngMXuvp7OyXVk7HMk5ivZlxPln1gSOddL0hWc"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywD1NjA36tRcWdKy_q4LFlC-9tWTLeR4ZtsfFsHXDvGCZAn7404_hvNUesSJoSPnjC28OW0PCRO6_D1VnuWZ-uw8Gn75-BI"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KlsjyMr_UqWdY781lteXA54vwxgLi-0FrNWqiI4CWIw5sYQnY81m3xLjs18LouZjNwXc3uCF27SuOy0SpwUYbghNKfR8"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Волны",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKvBmm5D19V5i_rEprP5gVO8vywwMiukcZicd1BtZFiG-gPqkLjm1JO56ZqYnXJl6SAhtHePm0G0g0lIO-VpjfHMVxzAUO3kMgPo"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjuNrnDl1Rd4cJ5ntbN9J7yjRrh-BVlZW3ydoTHdABsZ13Y_Qe5xue6gMC-vp-amntr6yQq4XfUzhTin1gSOZHog2Kf"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Doppler",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhqKzvAALlRUvAuywnhNiM9-NdvUcWJ57MHOlnt296fZOhoX4QdXZeFRPSOMAGuuE87haFaJ8OJpSPp3C68O2teXBa6qW8FzubUvbQ_12lHRSeu7bLbJUD0E9Y"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Африканская сетка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Yh8j5NqjZqX9Q5vp9g-7J4bP5iUazrl1tY2H6ItWSIQU-Y1DX_Vjsx-jnjZ657Z_LwCdm6HEl4nzbnBLlhxEfcKUx0rp-zgq-"
				}, {
					"type" : "★ Керамбит",
					"skinName" : "Зуб тигра",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo7-jf4ACA3-vhsRta48L45JVW47MbYYOQpYdEYGJSBW6CHY1v46U041alfKseO9CLt2yzrO25ZDhTq_W0Am_jH5OWLuQC7ZQ"
				}, {
					"type" : "★ Керамбит",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfjACs37PhuUdO_4rY5JV2t49fYYLApNolKHJPTC6XTZAD76UM506lcJpLbpCPq1S27MjxZUhu9qGgCzPjH5OUcQbPO0g"
				}, {
					"type" : "★ Керамбит",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NFOhujT8om70Azg_kQ6MTygdYKXJw9qMlnX_Fa3ye28gpC-vZSdynYxviZztyncmwv330_7Rx0jNA"
				}, {
					"type" : "★ Керамбит",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0gPL2IITck29Y_chOhujT8om7iwLn_Ec4NWrwdoDDIFNtZlHT-QW6xOzmgZ_t6pTNznUyvnQg7Crclwv330__CL9_dg"
				}, {
					"type" : "★ Керамбит",
					"skinName" : "Дамасская сталь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0k_b5MqjSg3hu5Mx2gv3--Y3nj1H6_0Q9ZG-lI46TIQc-NQuE8gS-kr-918C76J2fnyM26SkhsC7UlhO30AYMMLK-PHGgTA"
				}, {
					"type" : "★ Керамбит",
					"skinName" : "Африканская сетка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh5C0mvLnO4TFl2Vu5Mx2gv3--Y3nj1H6qkE4Zzqgco-cdwJsaF3XqVm_yL-70JG-7ZyamycyvXNz5SndzkG21wYMMLI7nV07EA"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GKqPH1N77ummJW4NFOhujT8om7igW1qUY6MWqmcIadcw47MFrW_FK9xbzpgZ607Z7PzSAxuXYg53-Llwv330-D9XTwcQ"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4iSqODxMajummJW4NFOhujT8om70FHnqkBqZWGiLICSelc6Mg3V_AO8x-nq1pC86JqcmnQyvSUk7X3azgv3309LA7AIOA"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqO3xManQqWdY781lteXA54vwxgyy_hduaz_7do6TcgFqaVvQ_1jtxbq5g5e07p7AwCdh7HEn4H6PzRGpwUYb-q86lXo"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Городская маскировка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5ObqOP1I77ug3lT6ctOhuDG_ZjKhFWmrBZyNzihIIXDdg5sNVqFqFPtyOnsgcW1vM_MzXph7CIg5yqMzhyy0k0ePPsv26IotkEDow"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Сажа",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5ObqPP1I6vdk1Rd4cJ5ntbN9J7yjRri-kJsMmDyco6Ve1U3aF7W81fokObo0Z-87pqcmHpr7yAh4niJn0Hhn1gSOTpeEaNS"
				}, {
					"type" : "★ Нож-бабочка",
					"skinName" : "Ночь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5OEqPn9NLPFqWdY781lteXA54vwxg2y-UZoZzrwIY6TdVc7ZViG-wW-kOu6gZK66JzJnXFm6CRwt3zfnxepwUYb2Pp00lU"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Зуб тигра",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4uOinYeOhcj7IbrfkW5u5Mx2gv3--Y3nj1H6_0dtMGmnJtXDdgQ5NVHQrAO-xue6jZTt6p2dyXVn6SFwsy6JnhbihQYMMLJJD10GFg"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Мраморный градиент",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eO7lZKJm_LLNbrVk1Rd4cJ5ntbN9J7yjRrh_BJlamqidoCTcQRsMArX_lPqkufp0J7p7sidn3trvichsy7YzRG_n1gSORYEYb_6"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD7eOwlYSOqPv9NLPFqWdQ-sJ0xLGQpIqtjQy1rUE5Y2n1I4PGcgI5MFGD-wS3l-7r18TpucyanHpg6CE8pSGKbZ02GvY"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD_eO5nYyOk8j4OrzZglRd6dd2j6eQodmt0VDgrUBqZWrwJIKccg48ZQ7T_AS5l-nqh5e1uJrBnHAw63J2-z-DyM8HtRGF"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Ночь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJR4-O4nYeDg8j4OrzZglRd6dd2j6fC8dqk2wDi-xE6Nz_7II6cewRrY12G-gC6xL--hsfuvZqbzyZnvHIk-z-DyFVtBt8T"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Сажа",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJR_OOylZCbm_LLP7LWnn9u5MRjjeyP84jzjVHl-hdtYm37co6Udw48N1zT8gLowLi705e7uZrIziFku3EisGGdwUJi_yOknw"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Вороненая сталь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlZG0lfvhNr_um25V4dB8teXA54vwxlexqkVpYT3xINOVegM4ZQvQqFDvleu8gJO9vZrLnyFj7yEn4XaMmRGpwUYbSTbvj7o"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Африканская сетка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJh5C0mvLnO4TFl2Vu5Mx2gv3--Y3nj1H6-EJoNjj1IYLGJlRvaAvZ-1Hvwuboh5K4vp_NzCZhuCYqtyrZnxHk1wYMMLI47XWL5Q"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJnJm0gPL2IITck29Y_chOhujT8om73QHlr0o_Njv6IIKde1M3YFmB8lm9w-nthp-6vcyYyXRqvXEmt37bmwv3308f4sOUEg"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlZG0mP74Nr_ummJW4NFOhujT8om7igDnr0I_Mm_zJ9CXIQA3Zl7U-lG_kOi9gMC-uMvLwXdl6yZ05S7bmgv330-Ff2dfAA"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Северный лес",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJnJm0kfjmNqjFqWle-sBwhtbN_Iv9nGu4qgE7NnehIoHBcVI_aFnQrlS5w-vt05S7u5nAmHc2uCcn5nrZzhKzhR8ZZrFsm7XAHnEvQoLM"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlYG0kfbwNoTdn2xZ_Pp9i_vG8MKjjgbl_UA_MDz3ctCUcwA8Y1yG8lG3w-7v1p_ptZ_BnSA17yFx7H2MgVXp1l4ye9bA"
				}, {
					"type" : "★ Тычковые ножи",
					"skinName" : "Вороненая сталь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD_eO0mJWOk8j4OrzZgiVUuMcjj-rF8In221K2-ENqZTqmd9fDd1Q8NVHT81Psl7vr0cTvuprN1zI97fJ4ylzC"
				}, {
					"type" : "★ Тычковые ножи",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD_eO5nYyOk8j5Nr_Yg2Zu5MRjjeyPpN72iVDlqEo_YD_2JNKRdVJtZw7V8li9xOq7h8DqvZqayXVmvCZ07GGdwULkTS1GEw"
				}, {
					"type" : "★ Тычковые ножи",
					"skinName" : "Градиент",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD7eOwlYSOqPv9NLPF2G0Gu8Eo2bDApt-g0FXl-UU6NTuhI9SccVU3N1DXqFjsxua-g8W7tMvXiSw0K6R8VrQ"
				}, {
					"type" : "★ Тычковые ножи",
					"skinName" : "Африканская сетка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJR_OO7kZODqOP1PYTdn2xZ_Itz3OuSrNz22wLh-RBuMTryd4aSdlVqY1uC-QLvyOzu18C1tJrJm3YxpGB8sjaSYMPt"
				}, {
					"type" : "★ Тычковые ножи",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOskYKZlsj4OrzZgiVQuJxw3OrHptitigXk-RVkYzz7I4SXdFVtZlmE-lK7xeq6gJa-u53K1zI97VbkI_gt"
				}, {
					"type" : "★ Тычковые ножи",
					"skinName" : "Патина",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD_eOwm5KIkvPLP7LWnn8fusZ0i-_E992l3FWyrhFoYz_6dteRIQFvZguD_gW7yO691pW6756dnWwj5He74Aez4A"
				}
			]
		}, {
			"name" : "Covert Case",
			"img" : "tainoe.png",
			"specialClass" : "covert",
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
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPqdfUPw2ywnuGyYh4chta9qz87ITJBLrs9TEO7d6MoxKGpaDU6CCMFyovhk81qdafpCJpSi9jyvhPGsCCUHi5CtazzBY6R44/"
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
			"specialClass" : "classified",
			"weapons" : [{
					"type" : "AK-47",
					"skinName" : "Cartel",
					"rarity" : "classified",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzZ2TQXJVfdhX_Qo4A3gNis77893a9u35bwDZw66s9CTOuYoY98eS5HTWvLQZFj6uUg_hKNbL8GApXu5i364M21cW0H1ujVTyBd8HaM"
				}, {
					"type" : "M4A4",
					"skinName" : "Dragon King",
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
			"name" : "Revolver Case",
			"img" : "revolver.png",
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
					"type" : "★ Складной нож",
					"skinName" : "Пиксельный камуфляж «Лес»",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFPY_oz-A3oNis77893a9u35bwDZw3rsYrPZ7R6M95KHMPQXv-Gbgv5vEg-1aYLKJCLoSPr2iW8OD1bCUf1ujVTxaDwZJQ"
				}, {
					"type" : "★ Охотничий нож",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlZG0mP74Nr_um25V4dB8xOyV8Nmk2gLnrRA5ZjjzJNCce1NsZ1_T_le9yO7qhJG96pzLynZlvig8pSGK0BpTrQ0"
				}, {
					"type" : "★ Керамбит",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NE_0rGVoNvzilG3qkduNmCnd4eSdAE3aVuD_Ve8wOe7hpLuuJuYmyRivj5iuyi_zJQcBA"
				}, {
					"type" : "★ Штык-нож M9",
					"skinName" : "Кровавая паутина",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWZU7Mxkh6fF8Yqmiw3l_BdrZ2vzIo-QdQBsaA2B-lC3yb_v0JW_uc_JmHQ16yYh-z-DyKLv5rKC"
				}
			]
		}, {
			"name" : "AWP Case",
			"img" : "awp.png",
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
			"name" : "AK-47 Case",
			"img" : "ak47.png",
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
			"name" : "M4A1-S Case",
			"img" : "m4a1-s.png",
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
			"name" : "Operation Wildfire",
			"img" : "wildfire.png",
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
					"type" : "★ Нож Боуи",
					"skinName" : "Вороненая сталь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrulGdE7cFOhuDG_Zi7jAbgqENvNjv2cYHDJ1Q4ZAqB-Vi5l-u-1MXtucvIynJn63N3syzbnQv3308wj9M7Tg"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Северный лес",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLO6LukGRD7dZltevO54n0hGu4ohQ0J3f3J4_EdFRqYQ7Y8gO9kr--gpXou8iYwXZkviUgtH7cmUDjgE0fO7Zom7XAHgyvqmnm"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrumWJd7cFOhuDG_Zi73VDi-hdqNmn6INCXc1Q8NFDV_Qe-x7i8g5e-v8ydzSZi7HUr437UnAv3309ikmqnoA"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Пиксельный камуфляж «Лес»",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLO6Lukm9B6dFOhuDG_Zi73AW3rkI4Yz37Jo_HJlBrYlHY8lPvyershZK57Z-YwHZj7nEktyrVyQv3309AwMWh8A"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Ночь",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLILTumGJW4NFOhuDG_Zi7jASw_RBuNmyiJo-TdAU_NwzQ_1K_wOntg5C_uJTAyXtmuiMitn2PnQv330_dJ3i8aA"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Сажа",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLIKvukmpB-Ml0teXI8oThxgDt-hBsZ2HwLIOWI1U5ZF7YqwS-lefn1Ja17pibmHQ2s3Il4HjZnhSpwUYbUxQp7R8"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Убийство",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbujG5T-sROh-zF_Jn4xgfk_xJvYGqlI9OQJAc-YgzX81a4w-rpgsC16Mubz3Qxv3Zx4HqJmkSpwUYbBsqV8z8"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Патина",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrukGRD68B1teXI8oThxlC38kJsZDigJYGVdQY6YVmC_APrwO_s0Jft6p3Om3M17yIn4izUmhSpwUYbpuF0ilg"
				}, {
					"type" : "★ Нож Боуи",
					"skinName" : "Городская маскировка",
					"rarity" : "rare",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLIKvugmpB7fpkmOvA-7P5gVO8v11kY2r7cITAJAVsZVnSrAK7wOvuhZC9uZ_BznJhuSArsS7fzhK2hBxJcKUx0sfXsL-_"
				}
			]
		}, {
			"name" : "Cache",
			"img" : "Cache.png",
			"weapons" : [{
					"type" : "Сувенир Negev",
					"skinName" : "Радиоактивные отходы",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz51MeSwJgh0YjvMFKNSWfQoyxjtHTM3-skwa9mz8L4QFlC249qCXOx9co8ZAcKEXqXSbw-r4xoxhKJbKMGN8yjt1CToOGsKDkHi-W4EnOWA7ro512kIAy_nOxRc_AM"
				}, {
					"type" : "Сувенир P250",
					"skinName" : "Заражение",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5rZrblDz9-TQrXAqxbXecF5wP5BSshvPhzBoLmyLcPLlSr296Xced5LtBPTceDWKPTMF_9vk1u1KEIKcGOqCq9iC3hO2sLWhK_-2INyeKB7rR1wjFB0mg8u4w"
				}, {
					"type" : "Сувенир AUG",
					"skinName" : "Радиационная опасность",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56IeSKIydYfBHJBLNKTvwq8TfjGyY878JcVcKxyLcPLlSr296Xced5LtxPH8nRWf7UMgyv4x49galbLZ3dpSvojC_uP2kOXEa48zgGmuaA7rF1wjFBHDjcwfM"
				}, {
					"type" : "Сувенир PP-Bizon",
					"skinName" : "Химический зеленый",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Pfm6Pgh0fTvFE6VHY_sv9wTpCDUN79VmUdmJ9bIcJlKA6NuRa_RDbIkOSJXOWvGEMwv4uEpu0aJZeZCJ9Hvs1SjpOW8KXxHvqGNWkeCOsrE41GkeR2_w87stmeRqTg"
				}, {
					"type" : "Сувенир Five-SeveN",
					"skinName" : "Лихач",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59PfWwIzJxdwr9Eq9hW-c_7TfiHCQ-7cZxa9ik9rUBLGO57cSTXPN5do0ScJyJDa7CCVWsqBxtnqALJpzYpCO9jCzoPWoLChDt-WMBzbCHs7Fv1mcWRXe2r-jYrZT7N_aohB5j7heSubo"
				}, {
					"type" : "Сувенир SG 553",
					"skinName" : "Радиоактивные осадки",
					"rarity" : "industrial",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5oM7bgZgh0YjvMFKtbT-Eo_RjpNioz-shsWuil8O5TemOz7dWed99wYZobSt7ZX_-PYFiouB9shvVZLJWB9C_o2nvtMm9fW0Ds-WkBmLKF6bpp0WgSXTHu-jogiFWe"
				}, {
					"type" : "Сувенир Glock-18",
					"skinName" : "Реактор",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58OOy2OwhmfzvMFKNSWfQoyxjtHTM3-skya9C6-LgNFlC249qCXOx9co8ZAcDRD_-HMgv06UttgKUJK5aLoS-9iH67M24OXxS5-D5WzbWG6eBj1mYIAy_nVXUIgeE"
				}, {
					"type" : "Сувенир MP9",
					"skinName" : "Закат",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52JLqKOC5YfBHBDaVfTsoq9Rz4DDU8uvhuRI6J-7IBIUiA6NOEZOUyZN0aHZLSU6WHYwv17B5phPJbLMbdpirv2yy9O24NWEa4_T4MnOaPvawr3DiitKx98g"
				}, {
					"type" : "Сувенир XM1014",
					"skinName" : "Костемолка",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5jObLlYWNYcwn9D7VdUPA75jf_AjI-5NQya8-7putXfWOz7dWed99wYZobSt7XW_DTbgv07Bg4h_VeepPdpXnmiyi_OG4MWxa4820EkLTV6LVj0T4XXTHu-svpTP_c"
				}, {
					"type" : "Сувенир MAC-10",
					"skinName" : "Ядерный сад",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz52NeDkYAhmfzvMFKNSWfQoyxvnHCs--5RcWda1pus5JVW47Mapb-FuZ41SS5bXXqTQY1qu7Eo7g6ELe8OIpynm33zgP2xZD0fr_z4CkbPWuLo-gHFWHSb91Ek2aQ"
				}, {
					"type" : "Сувенир Tec-9",
					"skinName" : "Токсичность",
					"rarity" : "milspec",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5vMeDsDz9-TQrXAqxbXecF5wP5BSshvfh3UdTvyLcPLlSr296Xced5LoxEHJTXDqOCNQj9vhlrhfcMepyLpXvrjn_sOW9ZChS68j9RzbCE7rN1wjFBGJ3vmzg"
				}, {
					"type" : "Сувенир FAMAS",
					"skinName" : "Стикс",
					"rarity" : "classified",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz59Ne60IwhmfzvMFKNSWfQoyxvnHCs--5VcUta79qg5JVW47Mapb-FuZ41SSpPZXfGCMAqv6Bo4g_dYK5SIoyjuiX-4PWcICRPurGoNmO-Bv7Zs0XFWHSanDUWgjg"
				}, {
					"type" : "Сувенир Galil AR",
					"skinName" : "Цербер",
					"rarity" : "classified",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz58Ne-8PDZ1TQfXPqNbTvco4RvTDiY-4ctcWN6x_685JV2t49fYNLYtMt1MScnVX6WAYFqvuEo4gKVdL8CL9nnu2SjgaTsNXxDp-mkMmvjH5OUJKTQR-g"
				}, {
					"type" : "AWP",
					"skinName" : "История о Драконе",
					"rarity" : "covert",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYfwHGCKVIXfkF8BrtDig818Z0ROi6_rwOPRK85oGUO7EqOI1JFpXZXKDSZQqovBoxhaZVLZWP8Si-jHi9Om0MDUDr5Ctaz_VyoP26"
				}
			]
		}, {
			"name" : "Operation Bravo",
			"img" : "bravo_case.png",
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
					"type" : "★ Керамбит",
					"skinName" : "Вороненая сталь",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo75TfuBTI37PhuUdO_4rY5JV2t49fYNbJ9YtlOSZTVW__SYgD74kI-hvVUepCKpCjn1H-9bjsNW0Dt8j0EyvjH5OVLma4hOg"
				}, {
					"type" : "★ Складной нож",
					"skinName" : "Tiger Tooth",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhhfg3SPqFQY-Ez8w3-Nigg6clkUei6_rwOPWOz5cCRZq4oNNkfH5TSCaCCZA6p40tu0qFaJsCBonu53XnpPWpZWkG9qz8Fm7ODpPI11e7G-Um7"
				}, {
					"type" : "★ Штык-нож",
					"skinName" : "Поверхностная закалка",
					"rarity" : "rare",
					"img" : "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz55Nfq6PjJzTQXTPq9XUPA-ywTlDi8m18tiRtCzueJUeQTpstfEYrF6Md8aS5HXXfaEMwmv7hhqiaQLK5DYqHvnji3pPW4UG028JI0XXjw"
				}
			]
		}, {
			"name" : "Dust",
			"img" : "Dust.png",
			"weapons" : [{
					"type" : "Сувенир Sawed-Off",
					"skinName" : "Змеиная кожа",
					"rarity" : "industrial",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3Yi19_9K3n4W0m_7zO6_ummpD78A_3-yXoI2m3QSy-EM9Mmz6JtLAcAU6N17T-wW7ley80Z-0tJ7BnyBn7z5iuyiXz1trIw"
				}, {
					"type" : "Сувенир AK-47",
					"skinName" : "Африканская сетка",
					"rarity" : "industrial",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zFdC5K08i3mr-HnvD8J4Tdl3lW7Ysh2b6T9Nnx2wOy_0RvMWCgcoPAcFNrYlqE-Ae7le3ph5K76p_NmHEypGB8sh8bMz38"
				}, {
					"type" : "Сувенир Five-SeveN",
					"skinName" : "Апельсиновая корка",
					"rarity" : "industrial",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTi5S08i3hIW0mOX1PbzUqWdY781lteXA54vwxlDj80c5MGmgLYSUcQBraA7TrFK9kr_vjJK4uMufzSQ2vHEjs3renxWpwUYbSPjL1mQ"
				}, {
					"type" : "Сувенир MAC-10",
					"skinName" : "Пальма",
					"rarity" : "industrial",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwOP3YTxO4eO6nYeDg8j4MqnWkyVTup0miejDo9Wn2VGx-kc4a2DzcYScJwJqY1vQ_VS8x7_ph5W0vZ_A1zI97QxuDbfS"
				}, {
					"type" : "Сувенир Tec-9",
					"skinName" : "Смешанный камуфляж",
					"rarity" : "industrial",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhoyszecC9L7927m7-HnvD8J4Tdl3lW7Yspi7GXpt-s2Few-xU_YW3wd4WTewFtYgzV_1C_wue7hpO5v8udnHJgpGB8sk8duAeH"
				}, {
					"type" : "Сувенир PP-Bizon",
					"skinName" : "Латунь",
					"rarity" : "milspec",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0uL3cy9D_8-JmImMn-PLP7rDkW4f6cNyiOvFpomm2VKw-EVsYz2ndoKQIAJvYQvU8gO4wuvv1MS7upyfwGwj5HeoW2JJ8g"
				}, {
					"type" : "Сувенир M4A1-S",
					"skinName" : "Смешанный камуфляж",
					"rarity" : "milspec",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-dluX9MLrcmVRd4cJ5ntbN9J7yjRrj8kdkY2qnddPGc1I4NV6DrlPtxem7jcO0uZ_JnXs1v3Yit36LzBTln1gSOVPvlQi-"
				}, {
					"type" : "Сувенир SG 553",
					"skinName" : "Дамасская сталь",
					"rarity" : "milspec",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0uL3dTxP7c-1gZO0hPChZujummJW4NFOhujT8om73QDn-EZpZWH0coaWewBvNVnQrwW8l-zohZPu75_NyyE2v3Z2sy2Omgv330-09DG6wA"
				}, {
					"type" : "Сувенир P2000",
					"skinName" : "Янтарный градиент",
					"rarity" : "restricted",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJcAJE7dizq42Og_b4P7LSqWdY781lteXA54vwxgyxrRdkYjr6d9CRegVvNQrWqAXoxObqhZ60vJ2fz3A3uXZx4n3enhWpwUYbzcrFVY8"
				}, {
					"type" : "R8 Revolver",
					"skinName" : "Янтарный градиент",
					"rarity" : "classified",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3cDx96t2ykb-GkuP1P7fYlVRD7dN-hv_E57P5gVO8vywwMiukcZjBdwBraVmG_1nsk-nug8fvus6YyHFj6HQm5HfdnUfliRFKbLE7habIVxzAUNH92sAX"
				}, {
					"type" : "Сувенир R8 Revolver",
					"skinName" : "Янтарный градиент",
					"rarity" : "classified",
					"img" : "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3cDx96t2ykb-GkuP1P7fYlVRD7dN-hv_E57P5gVO8vywwMiukcZjBdwBraVmG_1nsk-nug8fvus6YyHFj6HQm5HfdnUfliRFKbLE7habIVxzAUNH92sAX"
				}
			]
		},
	]