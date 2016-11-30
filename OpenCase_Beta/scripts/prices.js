var DEBUG = false;
function getPrice(item_id, opt) {
    var quality  = typeof opt.quality !== 'undefined' ? opt.quality : 0;
    var stattrak = typeof opt.stattrak !== 'undefined' ? opt.stattrak : false;
    var souvenir = typeof opt.souvenir !== 'undefined' ? opt.souvenir : false;
    var type     = typeof opt.type !== 'undefined' ? opt.type : "";
    var name     = typeof opt.name !== 'undefined' ? opt.name : "";
    
    var cat = stattrak == true ? 'stattrak' : souvenir == true ? 'souvenir' : 'default';
    var item = Prices[item_id];
    
    if (typeof item == 'undefined') {
        for (var key in Prices) {
            if (Prices[key].item_id == item_id || (Prices[key].type == type && Prices[key].skinName == name)) {
                item = Prices[key]
                break;
            }
        }
    }
    
    var prices = item.prices[cat][quality];
    var price = 0;
    if (typeof prices == 'undefined')
        return price;
    if (prices.market != -1)
        price = prices.market;
    else if (prices.analyst != -1)
        price = prices.analyst;
    else if (prices.opskins != -1)
        price = prices.opskins
        
    return price;
}

function getPriceWithNewQuality(item_id, opt, recurs) {
    recurs = recurs || false;
    var price = getPrice(item_id, opt);

    if (price == 0 || price == -1) {
        for (var i = 0; i < Quality.length; i++) {
            opt.quality = i;
            price = getPrice(item_id, opt);
            if (price != 0) break;
        }
    }
    return {price: price, quality: opt.quality};
}
var Prices = {
	"0" : {
		"item_id" : 0,
		"type" : "M249",
		"skinName" : "Jungle DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.17,
					"analyst" : 3.43,
					"opskins" : 29.99
				},
				3 : {
					"market" : 0.35,
					"analyst" : 0.37,
					"opskins" : 2
				},
				2 : {
					"market" : 0.37,
					"analyst" : 0.3,
					"opskins" : 0.38
				},
				1 : {
					"market" : 0.51,
					"analyst" : -1,
					"opskins" : 1.64
				},
				0 : {
					"market" : 0.85,
					"analyst" : 0.53,
					"opskins" : 37.68
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"1" : {
		"item_id" : 1,
		"type" : "Tec-9",
		"skinName" : "Tornado",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.15,
					"analyst" : 5.06,
					"opskins" : 4.65
				},
				3 : {
					"market" : 0.55,
					"analyst" : 0.53,
					"opskins" : 0.59
				},
				2 : {
					"market" : 1.46,
					"analyst" : 0.52,
					"opskins" : 9.99
				},
				1 : {
					"market" : 0.43,
					"analyst" : 0.6,
					"opskins" : 0.74
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.42,
					"opskins" : 0.4
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"2" : {
		"item_id" : 2,
		"type" : "MP9",
		"skinName" : "Dry Season",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.13,
					"analyst" : 3,
					"opskins" : 2.2
				},
				3 : {
					"market" : 0.39,
					"analyst" : 0.36,
					"opskins" : 0.4
				},
				2 : {
					"market" : 0.3,
					"analyst" : 0.29,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.4,
					"analyst" : 1.59,
					"opskins" : 0.77
				},
				0 : {
					"market" : 0.36,
					"analyst" : 1.53,
					"opskins" : 0.58
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"3" : {
		"item_id" : 3,
		"type" : "Five-SeveN",
		"skinName" : "Anodized Gunmetal",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.95,
					"analyst" : 1.2,
					"opskins" : 1.12
				},
				3 : {
					"market" : 1.05,
					"analyst" : 1.19,
					"opskins" : 1.1
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"4" : {
		"item_id" : 4,
		"type" : "XM1014",
		"skinName" : "Jungle",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.17,
					"analyst" : 2.6,
					"opskins" : 2.67
				},
				3 : {
					"market" : 0.4,
					"analyst" : 0.39,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.41,
					"analyst" : 0.29,
					"opskins" : 0.32
				},
				1 : {
					"market" : 0.59,
					"analyst" : 0.44,
					"opskins" : 1
				},
				0 : {
					"market" : 0.58,
					"analyst" : 0.51,
					"opskins" : 0.75
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"5" : {
		"item_id" : 5,
		"type" : "MP7",
		"skinName" : "Groundwater",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.91,
					"analyst" : 10.13,
					"opskins" : 6.93
				},
				3 : {
					"market" : 0.55,
					"analyst" : 0.44,
					"opskins" : 2.22
				},
				2 : {
					"market" : 0.38,
					"analyst" : 0.27,
					"opskins" : 0.49
				},
				1 : {
					"market" : 0.46,
					"analyst" : 0.59,
					"opskins" : 0.57
				},
				0 : {
					"market" : 0.93,
					"analyst" : 0.78,
					"opskins" : 3.98
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"6" : {
		"item_id" : 6,
		"type" : "Glock-18",
		"skinName" : "Sand Dune",
		"prices" : {
			"default" : {
				4 : {
					"market" : 17.11,
					"analyst" : 14.49,
					"opskins" : 15.75
				},
				3 : {
					"market" : 2.08,
					"analyst" : 1.52,
					"opskins" : 1.5
				},
				2 : {
					"market" : 0.51,
					"analyst" : 0.49,
					"opskins" : 1.99
				},
				1 : {
					"market" : 0.77,
					"analyst" : 0.75,
					"opskins" : 0.91
				},
				0 : {
					"market" : 0.83,
					"analyst" : 0.92,
					"opskins" : 1.09
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"7" : {
		"item_id" : 7,
		"type" : "SSG 08",
		"skinName" : "Mayan Dreams",
		"prices" : {
			"default" : {
				4 : {
					"market" : 19.06,
					"analyst" : 19.02,
					"opskins" : 18.8
				},
				3 : {
					"market" : 1.09,
					"analyst" : 1.26,
					"opskins" : 1.29
				},
				2 : {
					"market" : 0.46,
					"analyst" : 0.51,
					"opskins" : 0.46
				},
				1 : {
					"market" : 0.42,
					"analyst" : 0.5,
					"opskins" : 0.45
				},
				0 : {
					"market" : 0.7,
					"analyst" : 0.7,
					"opskins" : 0.56
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"8" : {
		"item_id" : 8,
		"type" : "Negev",
		"skinName" : "Palm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 17.67,
					"analyst" : 14.79,
					"opskins" : 44.44
				},
				3 : {
					"market" : 0.96,
					"analyst" : 1.42,
					"opskins" : 1.6
				},
				2 : {
					"market" : 0.5,
					"analyst" : 0.47,
					"opskins" : 0.4
				},
				1 : {
					"market" : 0.83,
					"analyst" : -1,
					"opskins" : 2.49
				},
				0 : {
					"market" : 0.75,
					"analyst" : 0.99,
					"opskins" : 0.95
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"9" : {
		"item_id" : 9,
		"type" : "Sawed-Off",
		"skinName" : "Mosaico",
		"prices" : {
			"default" : {
				4 : {
					"market" : 22.95,
					"analyst" : 18.72,
					"opskins" : 45
				},
				3 : {
					"market" : 1.08,
					"analyst" : 1.2,
					"opskins" : 1.24
				},
				2 : {
					"market" : 0.48,
					"analyst" : 0.45,
					"opskins" : 0.39
				},
				1 : {
					"market" : 0.57,
					"analyst" : 0.82,
					"opskins" : 2
				},
				0 : {
					"market" : 0.85,
					"analyst" : 1.76,
					"opskins" : 2.12
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"10" : {
		"item_id" : 10,
		"type" : "P250",
		"skinName" : "Facets",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.55,
					"analyst" : 9.15,
					"opskins" : 7.81
				},
				3 : {
					"market" : 1.41,
					"analyst" : 1.18,
					"opskins" : 1.02
				},
				2 : {
					"market" : 0.6,
					"analyst" : 0.54,
					"opskins" : 0.43
				},
				1 : {
					"market" : 1.06,
					"analyst" : 1.54,
					"opskins" : 164.89
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.44,
					"opskins" : 0.34
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"11" : {
		"item_id" : 11,
		"type" : "MAG-7",
		"skinName" : "Hazard",
		"prices" : {
			"default" : {
				4 : {
					"market" : 133.49,
					"analyst" : 88.61,
					"opskins" : 85.95
				},
				3 : {
					"market" : 4.2,
					"analyst" : 4.03,
					"opskins" : 3.78
				},
				2 : {
					"market" : 1.15,
					"analyst" : 1.21,
					"opskins" : 3.5
				},
				1 : {
					"market" : 57.21,
					"analyst" : 35.44,
					"opskins" : 8.95
				},
				0 : {
					"market" : 3.08,
					"analyst" : 5.34,
					"opskins" : 4.76
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"12" : {
		"item_id" : 12,
		"type" : "PP-Bizon",
		"skinName" : "Rust Coat",
		"prices" : {
			"default" : {
				4 : {
					"market" : 9.01,
					"analyst" : 10.73,
					"opskins" : 10.98
				},
				3 : {
					"market" : 3.23,
					"analyst" : 3.85,
					"opskins" : 3.32
				},
				2 : {
					"market" : 1.26,
					"analyst" : 1.73,
					"opskins" : 1.7
				},
				1 : {
					"market" : 1.35,
					"analyst" : 3.29,
					"opskins" : 5.65
				},
				0 : {
					"market" : 4.03,
					"analyst" : 3.84,
					"opskins" : 3.43
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"13" : {
		"item_id" : 13,
		"type" : "AUG",
		"skinName" : "Anodized Navy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.05,
					"analyst" : 5.68,
					"opskins" : 6.02
				},
				3 : {
					"market" : 5.17,
					"analyst" : 7.85,
					"opskins" : 7.9
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"14" : {
		"item_id" : 14,
		"type" : "FAMAS",
		"skinName" : "Spitfire",
		"prices" : {
			"default" : {
				4 : {
					"market" : 121.83,
					"analyst" : 101.68,
					"opskins" : 105
				},
				3 : {
					"market" : 16.63,
					"analyst" : 14.4,
					"opskins" : 13
				},
				2 : {
					"market" : 3.36,
					"analyst" : 2.9,
					"opskins" : 2.45
				},
				1 : {
					"market" : 4.18,
					"analyst" : 3.83,
					"opskins" : 3
				},
				0 : {
					"market" : 1.32,
					"analyst" : 1.44,
					"opskins" : 1.33
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"15" : {
		"item_id" : 15,
		"type" : "SCAR-20",
		"skinName" : "Emerald",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.85,
					"analyst" : 3.15,
					"opskins" : 3.08
				},
				3 : {
					"market" : 7.17,
					"analyst" : 7.07,
					"opskins" : 9.04
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"16" : {
		"item_id" : 16,
		"type" : "SG 553",
		"skinName" : "Tornado",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.07,
					"analyst" : 9.48,
					"opskins" : 6
				},
				3 : {
					"market" : 1.2,
					"analyst" : 1.13,
					"opskins" : 1.59
				},
				2 : {
					"market" : 1.06,
					"analyst" : 0.88,
					"opskins" : 1.89
				},
				1 : {
					"market" : 0.97,
					"analyst" : 0.97,
					"opskins" : 25
				},
				0 : {
					"market" : 1,
					"analyst" : 0.95,
					"opskins" : 0.89
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"17" : {
		"item_id" : 17,
		"type" : "UMP-45",
		"skinName" : "Caramel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.4,
					"analyst" : 6.74,
					"opskins" : 7.05
				},
				3 : {
					"market" : 1.77,
					"analyst" : 1.79,
					"opskins" : 1.69
				},
				2 : {
					"market" : 1.03,
					"analyst" : 0.95,
					"opskins" : 1.4
				},
				1 : {
					"market" : 1.04,
					"analyst" : 0.95,
					"opskins" : 0.87
				},
				0 : {
					"market" : 1.01,
					"analyst" : 0.92,
					"opskins" : 10
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"18" : {
		"item_id" : 18,
		"type" : "Five-SeveN",
		"skinName" : "Candy Apple",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.14,
					"analyst" : 7.76,
					"opskins" : 7.63
				},
				3 : {
					"market" : 7.55,
					"analyst" : 6.5,
					"opskins" : 6.2
				},
				2 : {
					"market" : 7.3,
					"analyst" : 6.45,
					"opskins" : 8.15
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"19" : {
		"item_id" : 19,
		"type" : "AUG",
		"skinName" : "Hot Rod",
		"prices" : {
			"default" : {
				4 : {
					"market" : 50,
					"analyst" : 50.14,
					"opskins" : 53.99
				},
				3 : {
					"market" : 54.92,
					"analyst" : 59.73,
					"opskins" : 70
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"20" : {
		"item_id" : 20,
		"type" : "Negev",
		"skinName" : "Anodized Navy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 58.65,
					"analyst" : 48.6,
					"opskins" : 44.44
				},
				3 : {
					"market" : 57.89,
					"analyst" : 73.9,
					"opskins" : 50
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"21" : {
		"item_id" : 21,
		"type" : "Glock-18",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 232.01,
					"analyst" : 227.6,
					"opskins" : 199.65
				},
				3 : {
					"market" : 261.32,
					"analyst" : 251.29,
					"opskins" : 222.22
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"22" : {
		"item_id" : 22,
		"type" : "MP9",
		"skinName" : "Bulldozer",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 434,
					"opskins" : 475
				},
				3 : {
					"market" : 18.53,
					"analyst" : 16.63,
					"opskins" : 14.95
				},
				2 : {
					"market" : 3.65,
					"analyst" : 3.16,
					"opskins" : 2.83
				},
				1 : {
					"market" : 8.53,
					"analyst" : 4.94,
					"opskins" : 15
				},
				0 : {
					"market" : 2.8,
					"analyst" : 2.91,
					"opskins" : 2.84
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"23" : {
		"item_id" : 23,
		"type" : "Nova",
		"skinName" : "Forest Leaves",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.79,
					"analyst" : 2.43,
					"opskins" : 2.59
				},
				3 : {
					"market" : 0.27,
					"analyst" : 0.34,
					"opskins" : 0.29
				},
				2 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.14
				},
				1 : {
					"market" : 0.5,
					"analyst" : 0.94,
					"opskins" : 0.96
				},
				0 : {
					"market" : 0.63,
					"analyst" : 0.2,
					"opskins" : 0.73
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"24" : {
		"item_id" : 24,
		"type" : "Five-SeveN",
		"skinName" : "Jungle",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.71,
					"analyst" : 2.68,
					"opskins" : 2.72
				},
				3 : {
					"market" : 0.37,
					"analyst" : 0.35,
					"opskins" : 0.31
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.27,
					"analyst" : 0.23,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.2
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"25" : {
		"item_id" : 25,
		"type" : "SSG 08",
		"skinName" : "Lichen Dashed",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.1,
					"analyst" : 3,
					"opskins" : 2.5
				},
				3 : {
					"market" : 0.3,
					"analyst" : 0.35,
					"opskins" : 0.32
				},
				2 : {
					"market" : 0.6,
					"analyst" : 0.18,
					"opskins" : 0.47
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.33
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.26,
					"opskins" : 1.59
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"26" : {
		"item_id" : 26,
		"type" : "AK-47",
		"skinName" : "Jungle Spray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 15.02,
					"analyst" : 15.56,
					"opskins" : 13.85
				},
				3 : {
					"market" : 1.7,
					"analyst" : 1.51,
					"opskins" : 1.53
				},
				2 : {
					"market" : 0.6,
					"analyst" : 0.57,
					"opskins" : 0.62
				},
				1 : {
					"market" : 1.32,
					"analyst" : 0.99,
					"opskins" : 0.99
				},
				0 : {
					"market" : 0.78,
					"analyst" : 0.79,
					"opskins" : 0.82
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"27" : {
		"item_id" : 27,
		"type" : "M4A4",
		"skinName" : "Jungle Tiger",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.2,
					"analyst" : 10.48,
					"opskins" : 9.9
				},
				3 : {
					"market" : 1.35,
					"analyst" : 1.36,
					"opskins" : 1.38
				},
				2 : {
					"market" : 0.65,
					"analyst" : 0.53,
					"opskins" : 1.71
				},
				1 : {
					"market" : 0.94,
					"analyst" : 0.67,
					"opskins" : 0.77
				},
				0 : {
					"market" : 0.66,
					"analyst" : 0.59,
					"opskins" : 0.65
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"28" : {
		"item_id" : 28,
		"type" : "Tec-9",
		"skinName" : "Ossified",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.5,
					"analyst" : 0.5,
					"opskins" : 0.42
				},
				3 : {
					"market" : 1.96,
					"analyst" : 1.8,
					"opskins" : 1.33
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"29" : {
		"item_id" : 29,
		"type" : "MP9",
		"skinName" : "Green Plaid",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.48,
					"analyst" : 0.44,
					"opskins" : 0.37
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.22,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.2,
					"opskins" : 0.25
				},
				1 : {
					"market" : 0.53,
					"analyst" : 0.87,
					"opskins" : 2
				},
				0 : {
					"market" : 1.39,
					"analyst" : 0.96,
					"opskins" : 0.68
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"30" : {
		"item_id" : 30,
		"type" : "CZ75-Auto",
		"skinName" : "Green Plaid",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.61,
					"analyst" : 0.6,
					"opskins" : 0.83
				},
				3 : {
					"market" : 0.28,
					"analyst" : 0.23,
					"opskins" : 0.22
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.23,
					"opskins" : 0.26
				},
				1 : {
					"market" : 1.05,
					"analyst" : 0.92,
					"opskins" : 1.2
				},
				0 : {
					"market" : 0.92,
					"analyst" : 0.82,
					"opskins" : 0.82
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"31" : {
		"item_id" : 31,
		"type" : "G3SG1",
		"skinName" : "Contractor",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.46,
					"analyst" : 1.92,
					"opskins" : 1.9
				},
				3 : {
					"market" : 0.32,
					"analyst" : 0.22,
					"opskins" : 0.3
				},
				2 : {
					"market" : 0.25,
					"analyst" : 0.22,
					"opskins" : 1.03
				},
				1 : {
					"market" : 0.32,
					"analyst" : 0.88,
					"opskins" : 4.98
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.23,
					"opskins" : 1.38
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"32" : {
		"item_id" : 32,
		"type" : "MP7",
		"skinName" : "Olive Plaid",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.48,
					"analyst" : 0.48,
					"opskins" : 4.97
				},
				3 : {
					"market" : 0.31,
					"analyst" : 0.26,
					"opskins" : 0.27
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.2,
					"opskins" : 0.69
				},
				1 : {
					"market" : 0.77,
					"analyst" : 1.31,
					"opskins" : 1.62
				},
				0 : {
					"market" : 2.22,
					"analyst" : 1.72,
					"opskins" : 8.5
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"33" : {
		"item_id" : 33,
		"type" : "SSG 08",
		"skinName" : "Sand Dune",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.1,
					"analyst" : 7.05,
					"opskins" : 17.63
				},
				3 : {
					"market" : 0.64,
					"analyst" : 0.56,
					"opskins" : 0.69
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.21,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.41,
					"analyst" : 0.45,
					"opskins" : 0.51
				},
				0 : {
					"market" : 0.38,
					"analyst" : 0.38,
					"opskins" : 0.35
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"34" : {
		"item_id" : 34,
		"type" : "MAC-10",
		"skinName" : "Commuter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.42,
					"analyst" : 2.49,
					"opskins" : 2.87
				},
				3 : {
					"market" : 0.76,
					"analyst" : 0.71,
					"opskins" : 0.59
				},
				2 : {
					"market" : 0.49,
					"analyst" : 0.34,
					"opskins" : 0.6
				},
				1 : {
					"market" : 0.57,
					"analyst" : 0.4,
					"opskins" : 500
				},
				0 : {
					"market" : 0.72,
					"analyst" : 0.45,
					"opskins" : 0.49
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"35" : {
		"item_id" : 35,
		"type" : "P2000",
		"skinName" : "Coach Class",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.66,
					"analyst" : 1.84,
					"opskins" : 2.39
				},
				3 : {
					"market" : 0.61,
					"analyst" : 0.62,
					"opskins" : 0.56
				},
				2 : {
					"market" : 0.4,
					"analyst" : 0.34,
					"opskins" : 0.45
				},
				1 : {
					"market" : 0.4,
					"analyst" : 0.37,
					"opskins" : 0.39
				},
				0 : {
					"market" : 0.48,
					"analyst" : 0.38,
					"opskins" : 0.33
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"36" : {
		"item_id" : 36,
		"type" : "P90",
		"skinName" : "Leather",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.98,
					"analyst" : 1.91,
					"opskins" : 1.86
				},
				3 : {
					"market" : 0.57,
					"analyst" : 0.57,
					"opskins" : 0.5
				},
				2 : {
					"market" : 0.37,
					"analyst" : 0.42,
					"opskins" : 0.34
				},
				1 : {
					"market" : 0.39,
					"analyst" : 0.4,
					"opskins" : 0.62
				},
				0 : {
					"market" : 0.58,
					"analyst" : 0.5,
					"opskins" : 0.46
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"37" : {
		"item_id" : 37,
		"type" : "SG 553",
		"skinName" : "Traveler",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2,
					"analyst" : 1.53,
					"opskins" : 1.33
				},
				3 : {
					"market" : 0.53,
					"analyst" : 0.53,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.4,
					"analyst" : 0.34,
					"opskins" : 0.37
				},
				1 : {
					"market" : 0.34,
					"analyst" : 0.34,
					"opskins" : 0.3
				},
				0 : {
					"market" : 0.66,
					"analyst" : 0.4,
					"opskins" : 0.34
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"38" : {
		"item_id" : 38,
		"type" : "USP-S",
		"skinName" : "Business Class",
		"prices" : {
			"default" : {
				4 : {
					"market" : 15.9,
					"analyst" : 15.65,
					"opskins" : 13.24
				},
				3 : {
					"market" : 5.4,
					"analyst" : 4.67,
					"opskins" : 5.17
				},
				2 : {
					"market" : 2.55,
					"analyst" : 2.38,
					"opskins" : 2.78
				},
				1 : {
					"market" : 2.92,
					"analyst" : 2.14,
					"opskins" : 2.49
				},
				0 : {
					"market" : 5.66,
					"analyst" : 5.48,
					"opskins" : 8.5
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"39" : {
		"item_id" : 39,
		"type" : "Sawed-Off",
		"skinName" : "First Class",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.15,
					"analyst" : 3.2,
					"opskins" : 3
				},
				3 : {
					"market" : 2.69,
					"analyst" : 2.25,
					"opskins" : 2.33
				},
				2 : {
					"market" : 2.96,
					"analyst" : 2.6,
					"opskins" : 7.73
				},
				1 : {
					"market" : 6.36,
					"analyst" : 14.31,
					"opskins" : 15.69
				},
				0 : {
					"market" : 3.03,
					"analyst" : 2.35,
					"opskins" : 3.17
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"40" : {
		"item_id" : 40,
		"type" : "XM1014",
		"skinName" : "Red Leather",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.26,
					"analyst" : 3.1,
					"opskins" : 3.5
				},
				3 : {
					"market" : 2.65,
					"analyst" : 2.19,
					"opskins" : 2.49
				},
				2 : {
					"market" : 2.66,
					"analyst" : 2.2,
					"opskins" : 4
				},
				1 : {
					"market" : 3.4,
					"analyst" : 2.56,
					"opskins" : 25
				},
				0 : {
					"market" : 3.58,
					"analyst" : 3.1,
					"opskins" : 5.06
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"41" : {
		"item_id" : 41,
		"type" : "Desert Eagle",
		"skinName" : "Pilot",
		"prices" : {
			"default" : {
				4 : {
					"market" : 38.96,
					"analyst" : 39.68,
					"opskins" : 35
				},
				3 : {
					"market" : 15.2,
					"analyst" : 15.64,
					"opskins" : 14
				},
				2 : {
					"market" : 10.66,
					"analyst" : 8.08,
					"opskins" : 8.92
				},
				1 : {
					"market" : 7.94,
					"analyst" : 7.35,
					"opskins" : 8.27
				},
				0 : {
					"market" : 9.79,
					"analyst" : 8.36,
					"opskins" : 10.94
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"42" : {
		"item_id" : 42,
		"type" : "MP7",
		"skinName" : "Forest DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.02
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"43" : {
		"item_id" : 43,
		"type" : "Tec-9",
		"skinName" : "Urban DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.12,
					"analyst" : 0.14,
					"opskins" : 0.12
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"44" : {
		"item_id" : 44,
		"type" : "Sawed-Off",
		"skinName" : "Forest DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.07,
					"analyst" : 0.06,
					"opskins" : 0.06
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.05
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"45" : {
		"item_id" : 45,
		"type" : "SG 553",
		"skinName" : "Army Sheen",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"46" : {
		"item_id" : 46,
		"type" : "Negev",
		"skinName" : "Army Sheen",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"47" : {
		"item_id" : 47,
		"type" : "Glock-18",
		"skinName" : "Death Rattle",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.06,
					"analyst" : 0.05,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.04
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.06,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.07,
					"analyst" : 0.06,
					"opskins" : 0.08
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"48" : {
		"item_id" : 48,
		"type" : "MAC-10",
		"skinName" : "Silver",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.09
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"49" : {
		"item_id" : 49,
		"type" : "Nova",
		"skinName" : "Caged Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"50" : {
		"item_id" : 50,
		"type" : "G3SG1",
		"skinName" : "Green Apple",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"51" : {
		"item_id" : 51,
		"type" : "UMP-45",
		"skinName" : "Carbon Fiber",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.04
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.22
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"52" : {
		"item_id" : 52,
		"type" : "Desert Eagle",
		"skinName" : "Meteorite",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.24
				},
				3 : {
					"market" : 0.2,
					"analyst" : 0.23,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.26,
					"opskins" : 0.24
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"53" : {
		"item_id" : 53,
		"type" : "Galil AR",
		"skinName" : "Tuxedo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.26,
					"analyst" : 0.3,
					"opskins" : 0.25
				},
				3 : {
					"market" : 0.13,
					"analyst" : 0.15,
					"opskins" : 0.12
				},
				2 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				1 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.08
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"54" : {
		"item_id" : 54,
		"type" : "CZ75-Auto",
		"skinName" : "Tuxedo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.22
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.09,
					"opskins" : 0.1
				},
				1 : {
					"market" : 0.18,
					"analyst" : 0.17,
					"opskins" : 0.13
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.09,
					"opskins" : 0.09
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"55" : {
		"item_id" : 55,
		"type" : "P250",
		"skinName" : "Franklin",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.93,
					"analyst" : 0.92,
					"opskins" : 0.75
				},
				3 : {
					"market" : 0.57,
					"analyst" : 0.63,
					"opskins" : 0.5
				},
				2 : {
					"market" : 0.39,
					"analyst" : 0.41,
					"opskins" : 0.37
				},
				1 : {
					"market" : 0.72,
					"analyst" : 0.65,
					"opskins" : 0.52
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"56" : {
		"item_id" : 56,
		"type" : "AUG",
		"skinName" : "Radiation Hazard",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.41,
					"analyst" : 0.44,
					"opskins" : 0.42
				},
				3 : {
					"market" : 0.27,
					"analyst" : 0.24,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.15,
					"opskins" : 0.15
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.24,
					"opskins" : 0.25
				},
				0 : {
					"market" : 0.14,
					"analyst" : 0.14,
					"opskins" : 4
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.16,
					"analyst" : 3.31,
					"opskins" : 2.45
				},
				3 : {
					"market" : 1.21,
					"analyst" : 1.41,
					"opskins" : 1.24
				},
				2 : {
					"market" : 0.74,
					"analyst" : 0.77,
					"opskins" : 0.65
				},
				1 : {
					"market" : 1.42,
					"analyst" : 1.21,
					"opskins" : 11.03
				},
				0 : {
					"market" : 1.05,
					"analyst" : 0.96,
					"opskins" : 1
				}
			}
		}
	},
	"57" : {
		"item_id" : 57,
		"type" : "Five-SeveN",
		"skinName" : "Hot Shot",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.22,
					"analyst" : 1.05,
					"opskins" : 0.9
				},
				3 : {
					"market" : 0.2,
					"analyst" : 0.25,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.14,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.13,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.08
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 10.85,
					"analyst" : 12.2,
					"opskins" : 12.66
				},
				3 : {
					"market" : 2.73,
					"analyst" : 2.7,
					"opskins" : 2.57
				},
				2 : {
					"market" : 0.73,
					"analyst" : 0.78,
					"opskins" : 0.66
				},
				1 : {
					"market" : 0.62,
					"analyst" : 0.71,
					"opskins" : 0.69
				},
				0 : {
					"market" : 0.64,
					"analyst" : 0.59,
					"opskins" : 0.51
				}
			}
		}
	},
	"58" : {
		"item_id" : 58,
		"type" : "SG 553",
		"skinName" : "Fallout Warning",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.55,
					"analyst" : 0.52,
					"opskins" : 0.42
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.2,
					"opskins" : 0.18
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.25,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.29
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.34,
					"analyst" : 3.25,
					"opskins" : 9.89
				},
				3 : {
					"market" : 0.85,
					"analyst" : 0.96,
					"opskins" : 0.87
				},
				2 : {
					"market" : 0.53,
					"analyst" : 0.52,
					"opskins" : 0.39
				},
				1 : {
					"market" : 1.32,
					"analyst" : 1.02,
					"opskins" : 1.39
				},
				0 : {
					"market" : 0.54,
					"analyst" : 0.51,
					"opskins" : 0.5
				}
			}
		}
	},
	"59" : {
		"item_id" : 59,
		"type" : "Negev",
		"skinName" : "Nuclear Waste",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.21,
					"analyst" : 0.24,
					"opskins" : 0.2
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.17
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.14,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.16
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 0.84,
					"analyst" : 0.9,
					"opskins" : 0.74
				},
				3 : {
					"market" : 0.51,
					"analyst" : 0.5,
					"opskins" : 0.41
				},
				2 : {
					"market" : 0.37,
					"analyst" : 0.34,
					"opskins" : 0.29
				},
				1 : {
					"market" : 1.23,
					"analyst" : 1.26,
					"opskins" : 1.06
				}
			}
		}
	},
	"60" : {
		"item_id" : 60,
		"type" : "P250",
		"skinName" : "Contamination",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.46,
					"analyst" : 0.46,
					"opskins" : 0.4
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.2,
					"opskins" : 0.14
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.15,
					"analyst" : 0.19,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.11
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.36,
					"analyst" : 3.45,
					"opskins" : 3.95
				},
				3 : {
					"market" : 0.89,
					"analyst" : 1,
					"opskins" : 0.96
				},
				2 : {
					"market" : 0.36,
					"analyst" : 0.39,
					"opskins" : 0.35
				},
				1 : {
					"market" : 0.96,
					"analyst" : 0.92,
					"opskins" : 0.95
				},
				0 : {
					"market" : 0.41,
					"analyst" : 0.42,
					"opskins" : 0.37
				}
			}
		}
	},
	"61" : {
		"item_id" : 61,
		"type" : "PP-Bizon",
		"skinName" : "Chemical Green",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.63,
					"analyst" : 0.63,
					"opskins" : 0.53
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.17
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.16,
					"analyst" : 0.14,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.12,
					"analyst" : 0.11,
					"opskins" : 0.11
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 4.86,
					"analyst" : 5.03,
					"opskins" : 6
				},
				3 : {
					"market" : 0.87,
					"analyst" : 0.88,
					"opskins" : 0.75
				},
				2 : {
					"market" : 0.37,
					"analyst" : 0.36,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.42,
					"analyst" : 0.35,
					"opskins" : 0.43
				},
				0 : {
					"market" : 0.3,
					"analyst" : 0.31,
					"opskins" : 0.27
				}
			}
		}
	},
	"62" : {
		"item_id" : 62,
		"type" : "XM1014",
		"skinName" : "Bone Machine",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.85,
					"analyst" : 1,
					"opskins" : 0.86
				},
				3 : {
					"market" : 0.69,
					"analyst" : 0.7,
					"opskins" : 0.64
				},
				2 : {
					"market" : 0.42,
					"analyst" : 0.45,
					"opskins" : 0.4
				},
				1 : {
					"market" : 0.53,
					"analyst" : 0.69,
					"opskins" : 0.59
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.31,
					"opskins" : 0.33
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 9.12,
					"analyst" : 9.08,
					"opskins" : 7.71
				},
				3 : {
					"market" : 3.58,
					"analyst" : 3.24,
					"opskins" : 3.1
				},
				2 : {
					"market" : 1.8,
					"analyst" : 1.68,
					"opskins" : 1.56
				},
				1 : {
					"market" : 4.26,
					"analyst" : 3.7,
					"opskins" : 3.4
				},
				0 : {
					"market" : 1.81,
					"analyst" : 1.85,
					"opskins" : 2.37
				}
			}
		}
	},
	"63" : {
		"item_id" : 63,
		"type" : "Tec-9",
		"skinName" : "Toxic",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.29,
					"analyst" : 3.53,
					"opskins" : 3
				},
				3 : {
					"market" : 1.96,
					"analyst" : 2.11,
					"opskins" : 1.8
				},
				2 : {
					"market" : 0.83,
					"analyst" : 0.97,
					"opskins" : 0.86
				},
				1 : {
					"market" : 1.43,
					"analyst" : 1.73,
					"opskins" : 1.52
				},
				0 : {
					"market" : 0.71,
					"analyst" : 0.78,
					"opskins" : 0.82
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 35,
					"analyst" : 29.71,
					"opskins" : 26.6
				},
				3 : {
					"market" : 12.19,
					"analyst" : 10.52,
					"opskins" : 10.04
				},
				2 : {
					"market" : 3.72,
					"analyst" : 4.21,
					"opskins" : 3.86
				},
				1 : {
					"market" : 8.48,
					"analyst" : 8.46,
					"opskins" : 7.99
				},
				0 : {
					"market" : 3.82,
					"analyst" : 3.33,
					"opskins" : 3.4
				}
			}
		}
	},
	"64" : {
		"item_id" : 64,
		"type" : "Glock-18",
		"skinName" : "Reactor",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.86,
					"analyst" : 3.75,
					"opskins" : 3.25
				},
				3 : {
					"market" : 2,
					"analyst" : 2.11,
					"opskins" : 1.83
				},
				2 : {
					"market" : 0.96,
					"analyst" : 1.13,
					"opskins" : 0.95
				},
				1 : {
					"market" : 1.07,
					"analyst" : 1.03,
					"opskins" : 0.91
				},
				0 : {
					"market" : 0.95,
					"analyst" : 0.92,
					"opskins" : 0.9
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 50.86,
					"analyst" : 52.86,
					"opskins" : 45
				},
				3 : {
					"market" : 10.49,
					"analyst" : 11.69,
					"opskins" : 10.99
				},
				2 : {
					"market" : 7.06,
					"analyst" : 7.16,
					"opskins" : 8
				},
				1 : {
					"market" : 5.31,
					"analyst" : 4.91,
					"opskins" : 4.85
				},
				0 : {
					"market" : 4.76,
					"analyst" : 4.11,
					"opskins" : 5.91
				}
			}
		}
	},
	"65" : {
		"item_id" : 65,
		"type" : "MAC-10",
		"skinName" : "Nuclear Garden",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.84,
					"analyst" : 0.89,
					"opskins" : 0.78
				},
				3 : {
					"market" : 0.63,
					"analyst" : 0.63,
					"opskins" : 0.58
				},
				2 : {
					"market" : 0.41,
					"analyst" : 0.4,
					"opskins" : 0.38
				},
				1 : {
					"market" : 0.53,
					"analyst" : 0.56,
					"opskins" : 0.56
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.28
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 7.09,
					"analyst" : 8.88,
					"opskins" : 7.87
				},
				3 : {
					"market" : 2.89,
					"analyst" : 2.91,
					"opskins" : 2.25
				},
				2 : {
					"market" : 1.3,
					"analyst" : 1.24,
					"opskins" : 2.16
				},
				1 : {
					"market" : 2.09,
					"analyst" : 2,
					"opskins" : 1.88
				},
				0 : {
					"market" : 1.49,
					"analyst" : 1.07,
					"opskins" : 2.5
				}
			}
		}
	},
	"66" : {
		"item_id" : 66,
		"type" : "MP9",
		"skinName" : "Setting Sun",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.99,
					"analyst" : 1.09,
					"opskins" : 0.92
				},
				3 : {
					"market" : 0.66,
					"analyst" : 0.67,
					"opskins" : 0.6
				},
				2 : {
					"market" : 0.4,
					"analyst" : 0.39,
					"opskins" : 0.41
				},
				1 : {
					"market" : 0.3,
					"analyst" : 0.32,
					"opskins" : 2
				},
				0 : {
					"market" : 0.26,
					"analyst" : 0.29,
					"opskins" : 0.47
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 21.36,
					"analyst" : 23.83,
					"opskins" : 27
				},
				3 : {
					"market" : 4.5,
					"analyst" : 4.06,
					"opskins" : 3.58
				},
				2 : {
					"market" : 1.7,
					"analyst" : 1.61,
					"opskins" : 2.48
				},
				1 : {
					"market" : 1.38,
					"analyst" : 1.32,
					"opskins" : 4.99
				},
				0 : {
					"market" : 0.85,
					"analyst" : 0.87,
					"opskins" : 0.89
				}
			}
		}
	},
	"67" : {
		"item_id" : 67,
		"type" : "FAMAS",
		"skinName" : "Styx",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.64,
					"analyst" : 3.31,
					"opskins" : 2.79
				},
				3 : {
					"market" : 1.69,
					"analyst" : 1.9,
					"opskins" : 1.66
				},
				2 : {
					"market" : 0.69,
					"analyst" : 0.67,
					"opskins" : 0.56
				},
				1 : {
					"market" : 1.03,
					"analyst" : 1.04,
					"opskins" : 0.92
				},
				0 : {
					"market" : 0.37,
					"analyst" : 0.43,
					"opskins" : 1.51
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 29.05,
					"analyst" : 31.52,
					"opskins" : 27
				},
				3 : {
					"market" : 8.65,
					"analyst" : 10.58,
					"opskins" : 11.1
				},
				2 : {
					"market" : 4.18,
					"analyst" : 4.29,
					"opskins" : 3.99
				},
				1 : {
					"market" : 7.96,
					"analyst" : 8.31,
					"opskins" : 18.54
				},
				0 : {
					"market" : 3.8,
					"analyst" : 3.97,
					"opskins" : 9
				}
			}
		}
	},
	"68" : {
		"item_id" : 68,
		"type" : "Galil AR",
		"skinName" : "Cerberus",
		"prices" : {
			"default" : {
				4 : {
					"market" : 9,
					"analyst" : 9.28,
					"opskins" : 8.62
				},
				3 : {
					"market" : 5.02,
					"analyst" : 5.56,
					"opskins" : 5.07
				},
				2 : {
					"market" : 2.03,
					"analyst" : 2.01,
					"opskins" : 1.67
				},
				1 : {
					"market" : 1.99,
					"analyst" : 1.71,
					"opskins" : 1.5
				},
				0 : {
					"market" : 0.88,
					"analyst" : 0.88,
					"opskins" : 0.93
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 361.36,
					"analyst" : 144.94,
					"opskins" : 149.88
				},
				3 : {
					"market" : 22.97,
					"analyst" : 21.81,
					"opskins" : 19.79
				},
				2 : {
					"market" : 8.4,
					"analyst" : 7.53,
					"opskins" : 6.26
				},
				1 : {
					"market" : 6.09,
					"analyst" : 5.87,
					"opskins" : 5.97
				},
				0 : {
					"market" : 5.31,
					"analyst" : 4.39,
					"opskins" : 3.72
				}
			}
		}
	},
	"69" : {
		"item_id" : 69,
		"type" : "M249",
		"skinName" : "Impact Drill",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.28,
					"analyst" : 0.3,
					"opskins" : 0.24
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				1 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				0 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.04
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"70" : {
		"item_id" : 70,
		"type" : "SCAR-20",
		"skinName" : "Army Sheen",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.21
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.07,
					"analyst" : 0.04,
					"opskins" : 0.17
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"71" : {
		"item_id" : 71,
		"type" : "MAG-7",
		"skinName" : "Seabird",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.29,
					"analyst" : 0.31,
					"opskins" : 0.32
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.05,
					"analyst" : 0.04,
					"opskins" : 0.09
				},
				1 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.25
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"72" : {
		"item_id" : 72,
		"type" : "CZ75-Auto",
		"skinName" : "Army Sheen",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.19
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.07,
					"analyst" : 0.06,
					"opskins" : 0.05
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"73" : {
		"item_id" : 73,
		"type" : "USP-S",
		"skinName" : "Para Green",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.79,
					"analyst" : 1.71,
					"opskins" : 1.54
				},
				3 : {
					"market" : 0.53,
					"analyst" : 0.49,
					"opskins" : 0.45
				},
				2 : {
					"market" : 0.25,
					"analyst" : 0.26,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.72,
					"analyst" : 0.47,
					"opskins" : 0.58
				},
				0 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.47
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"74" : {
		"item_id" : 74,
		"type" : "Desert Eagle",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : 9.74,
					"analyst" : 9,
					"opskins" : -1
				},
				3 : {
					"market" : 0.75,
					"analyst" : 0.81,
					"opskins" : 0.71
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.3
				},
				1 : {
					"market" : 0.31,
					"analyst" : 0.34,
					"opskins" : 0.29
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.25
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"75" : {
		"item_id" : 75,
		"type" : "Galil AR",
		"skinName" : "Urban Rubble",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.28,
					"analyst" : 1.32,
					"opskins" : 2.45
				},
				3 : {
					"market" : 0.54,
					"analyst" : 0.4,
					"opskins" : 0.4
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.23,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.29,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.28,
					"opskins" : 0.25
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"76" : {
		"item_id" : 76,
		"type" : "Five-SeveN",
		"skinName" : "Nitro",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.09,
					"analyst" : 6.96,
					"opskins" : 6.51
				},
				3 : {
					"market" : 0.88,
					"analyst" : 1.05,
					"opskins" : 0.9
				},
				2 : {
					"market" : 0.84,
					"analyst" : 0.76,
					"opskins" : 0.67
				},
				1 : {
					"market" : 0.8,
					"analyst" : 0.76,
					"opskins" : 0.69
				},
				0 : {
					"market" : 0.77,
					"analyst" : 0.68,
					"opskins" : 0.65
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"77" : {
		"item_id" : 77,
		"type" : "MAC-10",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.95,
					"analyst" : 2.28,
					"opskins" : 2.05
				},
				3 : {
					"market" : 4.5,
					"analyst" : 4.38,
					"opskins" : 5.44
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"78" : {
		"item_id" : 78,
		"type" : "MP7",
		"skinName" : "Full Stop",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.47,
					"analyst" : 1.56,
					"opskins" : 1.4
				},
				3 : {
					"market" : 0.89,
					"analyst" : 0.99,
					"opskins" : 0.83
				},
				2 : {
					"market" : 0.83,
					"analyst" : 0.74,
					"opskins" : 0.72
				},
				1 : {
					"market" : 0.87,
					"analyst" : 0.94,
					"opskins" : 1.07
				},
				0 : {
					"market" : 0.89,
					"analyst" : 0.83,
					"opskins" : 0.68
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"79" : {
		"item_id" : 79,
		"type" : "P250",
		"skinName" : "Whiteout",
		"prices" : {
			"default" : {
				4 : {
					"market" : 67.58,
					"analyst" : 61.67,
					"opskins" : 54
				},
				3 : {
					"market" : 5.94,
					"analyst" : 5.84,
					"opskins" : 5.33
				},
				2 : {
					"market" : 0.76,
					"analyst" : 0.88,
					"opskins" : 0.79
				},
				1 : {
					"market" : 1.09,
					"analyst" : 1.02,
					"opskins" : 1.19
				},
				0 : {
					"market" : 0.93,
					"analyst" : 0.83,
					"opskins" : 0.82
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"80" : {
		"item_id" : 80,
		"type" : "CZ75-Auto",
		"skinName" : "Emerald",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.31,
					"analyst" : 1.33,
					"opskins" : 1.17
				},
				3 : {
					"market" : 2.34,
					"analyst" : 2.48,
					"opskins" : 2.33
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"81" : {
		"item_id" : 81,
		"type" : "Dual Berettas",
		"skinName" : "Duelist",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.55,
					"analyst" : 10.3,
					"opskins" : 9.83
				},
				3 : {
					"market" : 8.35,
					"analyst" : 8.27,
					"opskins" : 7.24
				},
				2 : {
					"market" : 7.82,
					"analyst" : 6.38,
					"opskins" : 5.71
				},
				1 : {
					"market" : 7.87,
					"analyst" : 6.46,
					"opskins" : 5.79
				},
				0 : {
					"market" : 7.36,
					"analyst" : 6.21,
					"opskins" : 6.36
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"82" : {
		"item_id" : 82,
		"type" : "SG 553",
		"skinName" : "Bulldozer",
		"prices" : {
			"default" : {
				4 : {
					"market" : 17.48,
					"analyst" : 18.79,
					"opskins" : 15.83
				},
				3 : {
					"market" : 8.87,
					"analyst" : 7.86,
					"opskins" : 7
				},
				2 : {
					"market" : 6.36,
					"analyst" : 5.87,
					"opskins" : 5.65
				},
				1 : {
					"market" : 8.99,
					"analyst" : 6.94,
					"opskins" : 6.35
				},
				0 : {
					"market" : 8.45,
					"analyst" : 7.1,
					"opskins" : 6.89
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"83" : {
		"item_id" : 83,
		"type" : "Glock-18",
		"skinName" : "Twilight Galaxy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.32,
					"analyst" : 10.51,
					"opskins" : 9.95
				},
				3 : {
					"market" : 7.72,
					"analyst" : 8.52,
					"opskins" : 8.01
				},
				2 : {
					"market" : 8.93,
					"analyst" : 8.43,
					"opskins" : 8.47
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"84" : {
		"item_id" : 84,
		"type" : "UMP-45",
		"skinName" : "Indigo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.07,
					"analyst" : 1.17,
					"opskins" : 1.22
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.04
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.06,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.05
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 13.17,
					"analyst" : 12.3,
					"opskins" : 11.58
				},
				3 : {
					"market" : 1.93,
					"analyst" : 1.96,
					"opskins" : 1.75
				},
				2 : {
					"market" : 0.55,
					"analyst" : 0.52,
					"opskins" : 0.69
				},
				1 : {
					"market" : 0.81,
					"analyst" : 0.65,
					"opskins" : 0.6
				},
				0 : {
					"market" : 0.38,
					"analyst" : 0.35,
					"opskins" : 0.28
				}
			}
		}
	},
	"85" : {
		"item_id" : 85,
		"type" : "Dual Berettas",
		"skinName" : "Briar",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.25,
					"analyst" : 0.21,
					"opskins" : 0.23
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.11
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 0.36,
					"analyst" : 0.41,
					"opskins" : 0.29
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.27,
					"opskins" : 0.23
				}
			}
		}
	},
	"86" : {
		"item_id" : 86,
		"type" : "MAC-10",
		"skinName" : "Indigo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.62,
					"analyst" : 0.55,
					"opskins" : 0.78
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.08
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.06,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.07,
					"analyst" : 0.04,
					"opskins" : 0.09
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 2.87,
					"analyst" : 4.11,
					"opskins" : 4.2
				},
				3 : {
					"market" : 0.57,
					"analyst" : 0.66,
					"opskins" : 0.59
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.24,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.37,
					"analyst" : 0.37,
					"opskins" : 0.35
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.2
				}
			}
		}
	},
	"87" : {
		"item_id" : 87,
		"type" : "SCAR-20",
		"skinName" : "Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.38,
					"analyst" : 0.41,
					"opskins" : 0.39
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.04
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.06,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 1.49,
					"analyst" : 1.85,
					"opskins" : 1.44
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.19
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.14,
					"opskins" : 0.13
				},
				1 : {
					"market" : 0.18,
					"analyst" : 0.19,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.18,
					"analyst" : 0.17,
					"opskins" : 0.15
				}
			}
		}
	},
	"88" : {
		"item_id" : 88,
		"type" : "P90",
		"skinName" : "Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.43,
					"analyst" : 0.47,
					"opskins" : 0.43
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.1
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.07,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.1
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 2.6,
					"analyst" : 2.56,
					"opskins" : 2.73
				},
				3 : {
					"market" : 0.38,
					"analyst" : 0.37,
					"opskins" : 0.31
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.19,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.29,
					"analyst" : 0.27,
					"opskins" : 0.16
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.25,
					"opskins" : 0.25
				}
			}
		}
	},
	"89" : {
		"item_id" : 89,
		"type" : "USP-S",
		"skinName" : "Royal Blue",
		"prices" : {
			"default" : {
				4 : {
					"market" : 16.98,
					"analyst" : 17.5,
					"opskins" : 16.14
				},
				3 : {
					"market" : 1.97,
					"analyst" : 1.45,
					"opskins" : 1.68
				},
				2 : {
					"market" : 0.55,
					"analyst" : 0.35,
					"opskins" : 0.47
				},
				1 : {
					"market" : 0.8,
					"analyst" : 0.65,
					"opskins" : 0.68
				},
				0 : {
					"market" : 0.42,
					"analyst" : 0.37,
					"opskins" : 0.53
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 194.5,
					"analyst" : 191.63,
					"opskins" : 162
				},
				3 : {
					"market" : 14.43,
					"analyst" : 14.9,
					"opskins" : 14.47
				},
				2 : {
					"market" : 5.02,
					"analyst" : 4.13,
					"opskins" : 3.49
				},
				1 : {
					"market" : 6.03,
					"analyst" : 4.35,
					"opskins" : 4.24
				},
				0 : {
					"market" : 3.85,
					"analyst" : 2.76,
					"opskins" : 5.69
				}
			}
		}
	},
	"90" : {
		"item_id" : 90,
		"type" : "Sawed-Off",
		"skinName" : "Rust Coat",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.36,
					"analyst" : 0.37,
					"opskins" : 0.35
				},
				3 : {
					"market" : 0.34,
					"analyst" : 0.31,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.31,
					"analyst" : 0.31,
					"opskins" : 0.25
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.34,
					"opskins" : 995.8
				},
				0 : {
					"market" : 0.34,
					"analyst" : 0.3,
					"opskins" : 0.27
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 1.39,
					"analyst" : 1.31,
					"opskins" : 1.2
				},
				3 : {
					"market" : 0.31,
					"analyst" : 0.29,
					"opskins" : 0.47
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.27,
					"opskins" : 0.34
				},
				1 : {
					"market" : 0.57,
					"analyst" : 0.66,
					"opskins" : 10
				},
				0 : {
					"market" : 0.5,
					"analyst" : 0.53,
					"opskins" : 0.4
				}
			}
		}
	},
	"91" : {
		"item_id" : 91,
		"type" : "MAG-7",
		"skinName" : "Silver",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.35,
					"analyst" : 0.37,
					"opskins" : 0.28
				},
				3 : {
					"market" : 0.32,
					"analyst" : 0.38,
					"opskins" : 0.99
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 0.85,
					"analyst" : 0.92,
					"opskins" : 0.96
				},
				3 : {
					"market" : 1.93,
					"analyst" : 1.75,
					"opskins" : 2.3
				}
			}
		}
	},
	"92" : {
		"item_id" : 92,
		"type" : "Nova",
		"skinName" : "Green Apple",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.36,
					"analyst" : 0.35,
					"opskins" : 0.26
				},
				3 : {
					"market" : 0.34,
					"analyst" : 0.31,
					"opskins" : 0.25
				},
				2 : {
					"market" : 0.31,
					"analyst" : 0.31,
					"opskins" : 0.28
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 0.93,
					"analyst" : 1,
					"opskins" : 0.9
				},
				3 : {
					"market" : 0.49,
					"analyst" : 0.5,
					"opskins" : 0.37
				},
				2 : {
					"market" : 0.35,
					"analyst" : 0.39,
					"opskins" : 0.41
				}
			}
		}
	},
	"93" : {
		"item_id" : 93,
		"type" : "P2000",
		"skinName" : "Chainmail",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.37,
					"analyst" : 3.15,
					"opskins" : 3.06
				},
				3 : {
					"market" : 3.33,
					"analyst" : 3.03,
					"opskins" : 3.05
				},
				2 : {
					"market" : 3.29,
					"analyst" : 3.08,
					"opskins" : 3.05
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.15,
					"analyst" : 3.21,
					"opskins" : 3.1
				},
				3 : {
					"market" : 2.13,
					"analyst" : 2.37,
					"opskins" : 2.18
				},
				2 : {
					"market" : 2.39,
					"analyst" : 2.51,
					"opskins" : 4.95
				}
			}
		}
	},
	"94" : {
		"item_id" : 94,
		"type" : "MP9",
		"skinName" : "Dark Age",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.08,
					"analyst" : 3.22,
					"opskins" : 2.98
				},
				3 : {
					"market" : 3.17,
					"analyst" : 2.9,
					"opskins" : 3.12
				},
				2 : {
					"market" : 3.54,
					"analyst" : 3.42,
					"opskins" : 3.31
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 4.25,
					"analyst" : 3,
					"opskins" : 2.96
				},
				3 : {
					"market" : 2.12,
					"analyst" : 2.18,
					"opskins" : 2.2
				},
				2 : {
					"market" : 2.14,
					"analyst" : 2.23,
					"opskins" : 2.2
				}
			}
		}
	},
	"95" : {
		"item_id" : 95,
		"type" : "Desert Eagle",
		"skinName" : "Hand Cannon",
		"prices" : {
			"default" : {
				4 : {
					"market" : 31.93,
					"analyst" : 25.75,
					"opskins" : 24.99
				},
				3 : {
					"market" : 23.31,
					"analyst" : 23.08,
					"opskins" : 21.79
				},
				2 : {
					"market" : 24.16,
					"analyst" : 21.42,
					"opskins" : 20.99
				},
				1 : {
					"market" : 26.61,
					"analyst" : 23.33,
					"opskins" : 29
				},
				0 : {
					"market" : 26,
					"analyst" : 22.2,
					"opskins" : 32.94
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 400,
					"analyst" : 318.93,
					"opskins" : 339.99
				},
				3 : {
					"market" : 48.99,
					"analyst" : 46.8,
					"opskins" : 44
				},
				2 : {
					"market" : 29.23,
					"analyst" : 27.37,
					"opskins" : 38
				},
				1 : {
					"market" : 53.99,
					"analyst" : 33.55,
					"opskins" : 76.63
				},
				0 : {
					"market" : 30.45,
					"analyst" : 28.09,
					"opskins" : 37.56
				}
			}
		}
	},
	"96" : {
		"item_id" : 96,
		"type" : "CZ75-Auto",
		"skinName" : "Chalice",
		"prices" : {
			"default" : {
				4 : {
					"market" : 24.35,
					"analyst" : 24.01,
					"opskins" : 22
				},
				3 : {
					"market" : 28.52,
					"analyst" : 22.78,
					"opskins" : 24.5
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 17.04,
					"analyst" : 18.08,
					"opskins" : 19.9
				},
				3 : {
					"market" : 25.33,
					"analyst" : 27.61,
					"opskins" : 35
				}
			}
		}
	},
	"97" : {
		"item_id" : 97,
		"type" : "M4A1-S",
		"skinName" : "Knight",
		"prices" : {
			"default" : {
				4 : {
					"market" : 230.23,
					"analyst" : 231.94,
					"opskins" : 197
				},
				3 : {
					"market" : 268.03,
					"analyst" : 233.3,
					"opskins" : 200.88
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 394.35,
					"analyst" : 375,
					"opskins" : 367.63
				},
				3 : {
					"market" : 381.4,
					"analyst" : 395.86,
					"opskins" : 359.99
				}
			}
		}
	},
	"98" : {
		"item_id" : 98,
		"type" : "AK-47",
		"skinName" : "Predator",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.25,
					"analyst" : 6.78,
					"opskins" : 6.89
				},
				3 : {
					"market" : 1.32,
					"analyst" : 1.12,
					"opskins" : 1.11
				},
				2 : {
					"market" : 0.65,
					"analyst" : 0.6,
					"opskins" : 0.59
				},
				1 : {
					"market" : 1.2,
					"analyst" : 0.91,
					"opskins" : 0.99
				},
				0 : {
					"market" : 0.82,
					"analyst" : 0.68,
					"opskins" : 0.73
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"99" : {
		"item_id" : 99,
		"type" : "M4A4",
		"skinName" : "Desert Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.6,
					"analyst" : 5.93,
					"opskins" : 6.09
				},
				3 : {
					"market" : 1.09,
					"analyst" : 0.98,
					"opskins" : 0.94
				},
				2 : {
					"market" : 0.66,
					"analyst" : 0.52,
					"opskins" : 0.57
				},
				1 : {
					"market" : 0.87,
					"analyst" : 0.67,
					"opskins" : 0.79
				},
				0 : {
					"market" : 0.63,
					"analyst" : 0.6,
					"opskins" : 0.65
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"100" : {
		"item_id" : 100,
		"type" : "SCAR-20",
		"skinName" : "Palm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.16,
					"analyst" : 2.94,
					"opskins" : 2.93
				},
				3 : {
					"market" : 0.5,
					"analyst" : 0.59,
					"opskins" : 0.59
				},
				2 : {
					"market" : 0.53,
					"analyst" : 0.41,
					"opskins" : 0.59
				},
				1 : {
					"market" : 0.7,
					"analyst" : 0.53,
					"opskins" : 0.45
				},
				0 : {
					"market" : 0.57,
					"analyst" : 0.57,
					"opskins" : 0.42
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"101" : {
		"item_id" : 101,
		"type" : "AUG",
		"skinName" : "Copperhead",
		"prices" : {
			"default" : {
				3 : {
					"market" : 7.95,
					"analyst" : 6.01,
					"opskins" : 5.5
				},
				2 : {
					"market" : 4.21,
					"analyst" : 3.54,
					"opskins" : 5.99
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"102" : {
		"item_id" : 102,
		"type" : "Sawed-Off",
		"skinName" : "Copper",
		"prices" : {
			"default" : {
				4 : {
					"market" : 11.11,
					"analyst" : 8.22,
					"opskins" : 15
				},
				3 : {
					"market" : 7.42,
					"analyst" : 6.25,
					"opskins" : 6.9
				},
				2 : {
					"market" : 3.15,
					"analyst" : 3.11,
					"opskins" : 3.61
				},
				1 : {
					"market" : 4.56,
					"analyst" : 4.24,
					"opskins" : 4.67
				},
				0 : {
					"market" : 4.41,
					"analyst" : 4.67,
					"opskins" : 11.46
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"103" : {
		"item_id" : 103,
		"type" : "Desert Eagle",
		"skinName" : "Blaze",
		"prices" : {
			"default" : {
				4 : {
					"market" : 42.44,
					"analyst" : 46.1,
					"opskins" : 39.75
				},
				3 : {
					"market" : 51.3,
					"analyst" : 47.29,
					"opskins" : 42
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"104" : {
		"item_id" : 104,
		"type" : "Glock-18",
		"skinName" : "Brass",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.53,
					"analyst" : 9.25,
					"opskins" : 8.5
				},
				3 : {
					"market" : 3.31,
					"analyst" : 3.1,
					"opskins" : 2.74
				},
				2 : {
					"market" : 1.3,
					"analyst" : 1.43,
					"opskins" : 1.49
				},
				1 : {
					"market" : 1.68,
					"analyst" : 1.36,
					"opskins" : 1.63
				},
				0 : {
					"market" : 1.03,
					"analyst" : 1.18,
					"opskins" : 1.51
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"105" : {
		"item_id" : 105,
		"type" : "P2000",
		"skinName" : "Scorpion",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.94,
					"analyst" : 1.01,
					"opskins" : 0.87
				},
				3 : {
					"market" : 3,
					"analyst" : 2.83,
					"opskins" : 2.75
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"106" : {
		"item_id" : 106,
		"type" : "G3SG1",
		"skinName" : "Desert Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.04
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 8.48,
					"analyst" : 5.69,
					"opskins" : 6.95
				},
				3 : {
					"market" : 0.32,
					"analyst" : 0.29,
					"opskins" : 0.23
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.17
				}
			}
		}
	},
	"107" : {
		"item_id" : 107,
		"type" : "MP9",
		"skinName" : "Sand Dashed",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.86,
					"analyst" : 3.34,
					"opskins" : 2.89
				},
				3 : {
					"market" : 0.29,
					"analyst" : 0.35,
					"opskins" : 0.36
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.25,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.19
				}
			}
		}
	},
	"108" : {
		"item_id" : 108,
		"type" : "Nova",
		"skinName" : "Predator",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 2.5,
					"analyst" : 3.27,
					"opskins" : -1
				},
				3 : {
					"market" : 0.23,
					"analyst" : 0.26,
					"opskins" : 0.19
				},
				2 : {
					"market" : 0.13,
					"analyst" : 0.14,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.3,
					"analyst" : 0.32,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.18,
					"analyst" : 0.21,
					"opskins" : 0.18
				}
			}
		}
	},
	"109" : {
		"item_id" : 109,
		"type" : "P250",
		"skinName" : "Sand Dune",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.21,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.04
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 15,
					"analyst" : 15.21,
					"opskins" : 15.5
				},
				3 : {
					"market" : 1.05,
					"analyst" : 1.12,
					"opskins" : 1.12
				},
				2 : {
					"market" : 0.34,
					"analyst" : 0.35,
					"opskins" : 0.35
				},
				1 : {
					"market" : 0.46,
					"analyst" : 0.51,
					"opskins" : 0.47
				},
				0 : {
					"market" : 0.8,
					"analyst" : 0.74,
					"opskins" : 0.73
				}
			}
		}
	},
	"110" : {
		"item_id" : 110,
		"type" : "P90",
		"skinName" : "Sand Spray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.62,
					"analyst" : 3.95,
					"opskins" : 8.99
				},
				3 : {
					"market" : 0.37,
					"analyst" : 0.38,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.29,
					"analyst" : 0.33,
					"opskins" : 0.34
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.26,
					"opskins" : 0.19
				}
			}
		}
	},
	"111" : {
		"item_id" : 111,
		"type" : "SCAR-20",
		"skinName" : "Sand Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.04
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.35,
					"analyst" : 3.26,
					"opskins" : 3.43
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.24,
					"opskins" : 0.23
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.14,
					"opskins" : 0.14
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.19,
					"opskins" : 1.5
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.24,
					"opskins" : 0.2
				}
			}
		}
	},
	"112" : {
		"item_id" : 112,
		"type" : "AK-47",
		"skinName" : "Safari Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.69,
					"analyst" : 2,
					"opskins" : 1.79
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.09,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.14,
					"analyst" : 0.13,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.09
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 121.83,
					"analyst" : 108.1,
					"opskins" : 99.98
				},
				3 : {
					"market" : 10.18,
					"analyst" : 11.09,
					"opskins" : 10.82
				},
				2 : {
					"market" : 4.83,
					"analyst" : 5.19,
					"opskins" : 5.95
				},
				1 : {
					"market" : 5.21,
					"analyst" : 5.25,
					"opskins" : 5.39
				},
				0 : {
					"market" : 5.99,
					"analyst" : 5.18,
					"opskins" : 7
				}
			}
		}
	},
	"113" : {
		"item_id" : 113,
		"type" : "Five-SeveN",
		"skinName" : "Orange Peel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.34,
					"analyst" : 0.38,
					"opskins" : 0.31
				},
				3 : {
					"market" : 0.07,
					"analyst" : 0.06,
					"opskins" : 0.04
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 89.01,
					"analyst" : 104.76,
					"opskins" : 72.3
				},
				3 : {
					"market" : 2.39,
					"analyst" : 2.33,
					"opskins" : 2.28
				},
				2 : {
					"market" : 0.85,
					"analyst" : 0.83,
					"opskins" : 0.67
				},
				1 : {
					"market" : 0.99,
					"analyst" : 1.18,
					"opskins" : 9.94
				},
				0 : {
					"market" : 1.16,
					"analyst" : 0.79,
					"opskins" : 4.93
				}
			}
		}
	},
	"114" : {
		"item_id" : 114,
		"type" : "MAC-10",
		"skinName" : "Palm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.27,
					"analyst" : 0.25,
					"opskins" : 0.22
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 32.28,
					"analyst" : 28.99,
					"opskins" : 23.7
				},
				3 : {
					"market" : 0.96,
					"analyst" : 0.84,
					"opskins" : 2.99
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.5,
					"analyst" : 0.5,
					"opskins" : 0.78
				},
				0 : {
					"market" : 0.36,
					"analyst" : 0.37,
					"opskins" : 0.33
				}
			}
		}
	},
	"115" : {
		"item_id" : 115,
		"type" : "Tec-9",
		"skinName" : "VariCamo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.06,
					"analyst" : 0.05,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 2.41,
					"analyst" : 2.71,
					"opskins" : 4.9
				},
				3 : {
					"market" : 2.1,
					"analyst" : 1.61,
					"opskins" : 1.5
				},
				2 : {
					"market" : 1.12,
					"analyst" : 1.08,
					"opskins" : 0.9
				},
				1 : {
					"market" : 2.22,
					"analyst" : 2.12,
					"opskins" : 1.56
				},
				0 : {
					"market" : 1.55,
					"analyst" : 1.21,
					"opskins" : 1.22
				}
			}
		}
	},
	"116" : {
		"item_id" : 116,
		"type" : "Sawed-Off",
		"skinName" : "Snake Camo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 0.19
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 7.1,
					"analyst" : 5.92,
					"opskins" : 15.79
				},
				3 : {
					"market" : 0.38,
					"analyst" : 0.36,
					"opskins" : 0.39
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.31,
					"analyst" : 0.42,
					"opskins" : 1.14
				},
				0 : {
					"market" : 0.31,
					"analyst" : 0.3,
					"opskins" : 0.25
				}
			}
		}
	},
	"117" : {
		"item_id" : 117,
		"type" : "PP-Bizon",
		"skinName" : "Brass",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.36,
					"analyst" : 0.44,
					"opskins" : 0.4
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.11,
					"opskins" : 0.1
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 33.58,
					"analyst" : 25.41,
					"opskins" : 29.5
				},
				3 : {
					"market" : 3.68,
					"analyst" : 3.34,
					"opskins" : 3.36
				},
				2 : {
					"market" : 2.11,
					"analyst" : 1.63,
					"opskins" : 1.4
				},
				1 : {
					"market" : 1.8,
					"analyst" : 1.85,
					"opskins" : 2.22
				},
				0 : {
					"market" : 2.09,
					"analyst" : 1.62,
					"opskins" : 5.22
				}
			}
		}
	},
	"118" : {
		"item_id" : 118,
		"type" : "SG 553",
		"skinName" : "Damascus Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.27
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.1
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.09
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 28.98,
					"analyst" : 41.44,
					"opskins" : 31.19
				},
				3 : {
					"market" : 4.72,
					"analyst" : 3.99,
					"opskins" : 5
				},
				2 : {
					"market" : 1.91,
					"analyst" : 1.24,
					"opskins" : 1.3
				},
				1 : {
					"market" : 1.16,
					"analyst" : 1.24,
					"opskins" : 1
				},
				0 : {
					"market" : 0.99,
					"analyst" : 1.32,
					"opskins" : 1.59
				}
			}
		}
	},
	"119" : {
		"item_id" : 119,
		"type" : "P2000",
		"skinName" : "Amber Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.39,
					"analyst" : 0.44,
					"opskins" : 0.39
				},
				3 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.29,
					"analyst" : 0.27,
					"opskins" : 0.26
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 21.71,
					"analyst" : 19.38,
					"opskins" : 16.74
				},
				3 : {
					"market" : 7.83,
					"analyst" : 9.6,
					"opskins" : 7.5
				},
				2 : {
					"market" : 4.87,
					"analyst" : 4.64,
					"opskins" : 3.98
				},
				1 : {
					"market" : 18,
					"analyst" : 23.24,
					"opskins" : 23.87
				}
			}
		}
	},
	"121" : {
		"item_id" : 121,
		"type" : "AUG",
		"skinName" : "Daedalus",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.18
				},
				3 : {
					"market" : 0.16,
					"analyst" : 0.19,
					"opskins" : 0.15
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.14,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.16,
					"analyst" : 0.14,
					"opskins" : 0.12
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"122" : {
		"item_id" : 122,
		"type" : "Dual Berettas",
		"skinName" : "Moon in Libra",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.19,
					"analyst" : 0.23,
					"opskins" : 0.2
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.18
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.14,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.14
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.17,
					"opskins" : 0.17
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"123" : {
		"item_id" : 123,
		"type" : "Nova",
		"skinName" : "Moon in Libra",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.19
				},
				3 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.14,
					"opskins" : 0.13
				},
				1 : {
					"market" : 0.17,
					"analyst" : 0.17,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.17,
					"analyst" : 0.17,
					"opskins" : 0.2
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"124" : {
		"item_id" : 124,
		"type" : "MP7",
		"skinName" : "Asterion",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.25,
					"analyst" : 0.26,
					"opskins" : 0.21
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 1
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"125" : {
		"item_id" : 125,
		"type" : "AWP",
		"skinName" : "Sun in Leo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.14,
					"analyst" : 4.23,
					"opskins" : 3.65
				},
				3 : {
					"market" : 2.67,
					"analyst" : 2.8,
					"opskins" : 2.42
				},
				2 : {
					"market" : 1.52,
					"analyst" : 1.63,
					"opskins" : 1.35
				},
				1 : {
					"market" : 2.09,
					"analyst" : 2.12,
					"opskins" : 1.84
				},
				0 : {
					"market" : 1.8,
					"analyst" : 1.82,
					"opskins" : 1.53
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"126" : {
		"item_id" : 126,
		"type" : "Tec-9",
		"skinName" : "Hades",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.77,
					"analyst" : 0.87,
					"opskins" : 0.74
				},
				3 : {
					"market" : 0.51,
					"analyst" : 0.53,
					"opskins" : 0.47
				},
				2 : {
					"market" : 0.48,
					"analyst" : 0.49,
					"opskins" : 0.4
				},
				1 : {
					"market" : 0.51,
					"analyst" : 0.51,
					"opskins" : 0.45
				},
				0 : {
					"market" : 0.53,
					"analyst" : 0.51,
					"opskins" : 0.46
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"127" : {
		"item_id" : 127,
		"type" : "M249",
		"skinName" : "Shipping Forecast",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.51,
					"analyst" : 0.55,
					"opskins" : 0.46
				},
				3 : {
					"market" : 0.5,
					"analyst" : 0.5,
					"opskins" : 0.48
				},
				2 : {
					"market" : 0.5,
					"analyst" : 0.49,
					"opskins" : 0.46
				},
				1 : {
					"market" : 0.7,
					"analyst" : 0.52,
					"opskins" : 0.49
				},
				0 : {
					"market" : 0.58,
					"analyst" : 0.62,
					"opskins" : 0.47
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"128" : {
		"item_id" : 128,
		"type" : "P2000",
		"skinName" : "Pathfinder",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.57,
					"analyst" : 0.57,
					"opskins" : 0.53
				},
				3 : {
					"market" : 0.5,
					"analyst" : 0.49,
					"opskins" : 0.47
				},
				2 : {
					"market" : 0.51,
					"analyst" : 0.47,
					"opskins" : 0.48
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"129" : {
		"item_id" : 129,
		"type" : "UMP-45",
		"skinName" : "Minotaur's Labyrinth",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.37,
					"analyst" : 5.91,
					"opskins" : 5.27
				},
				3 : {
					"market" : 5.29,
					"analyst" : 5.42,
					"opskins" : 4.75
				},
				2 : {
					"market" : 4.71,
					"analyst" : 5.54,
					"opskins" : 5.22
				},
				1 : {
					"market" : 6.15,
					"analyst" : 6.15,
					"opskins" : 8.31
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"130" : {
		"item_id" : 130,
		"type" : "MP9",
		"skinName" : "Pandora's Box",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.24,
					"analyst" : 5.7,
					"opskins" : 5.1
				},
				3 : {
					"market" : 5.13,
					"analyst" : 5.41,
					"opskins" : 5.29
				},
				2 : {
					"market" : 5.91,
					"analyst" : 5.73,
					"opskins" : 5.09
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"131" : {
		"item_id" : 131,
		"type" : "G3SG1",
		"skinName" : "Chronos",
		"prices" : {
			"default" : {
				4 : {
					"market" : 18.83,
					"analyst" : 19.44,
					"opskins" : 17.99
				},
				3 : {
					"market" : 17.41,
					"analyst" : 16.07,
					"opskins" : 15.99
				},
				2 : {
					"market" : 19.06,
					"analyst" : 16.77,
					"opskins" : 14.25
				},
				1 : {
					"market" : 20.53,
					"analyst" : 17.89,
					"opskins" : 19.99
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"132" : {
		"item_id" : 132,
		"type" : "M4A4",
		"skinName" : "Poseidon",
		"prices" : {
			"default" : {
				4 : {
					"market" : 129.92,
					"analyst" : 133.12,
					"opskins" : 115.99
				},
				3 : {
					"market" : 95.36,
					"analyst" : 93.98,
					"opskins" : 77.49
				},
				2 : {
					"market" : 100.17,
					"analyst" : 85.09,
					"opskins" : 79.55
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"133" : {
		"item_id" : 133,
		"type" : "MAG-7",
		"skinName" : "Sand Dune",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.56,
					"analyst" : 7.52,
					"opskins" : 6.32
				},
				3 : {
					"market" : 0.23,
					"analyst" : 0.28,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.17,
					"opskins" : 0.15
				},
				0 : {
					"market" : 0.16,
					"analyst" : 0.18,
					"opskins" : 0.17
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 2.67,
					"analyst" : 2.03,
					"opskins" : 2.49
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.14
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.13
				}
			}
		}
	},
	"134" : {
		"item_id" : 134,
		"type" : "Nova",
		"skinName" : "Walnut",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.16,
					"analyst" : 2.46,
					"opskins" : 1.81
				},
				3 : {
					"market" : 0.35,
					"analyst" : 0.37,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.33
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.2
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 4.86,
					"analyst" : 7.95,
					"opskins" : 8
				},
				3 : {
					"market" : 0.41,
					"analyst" : 0.49,
					"opskins" : 0.35
				},
				2 : {
					"market" : 0.16,
					"analyst" : 0.19,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.31,
					"analyst" : 0.29,
					"opskins" : 0.23
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.2
				}
			}
		}
	},
	"135" : {
		"item_id" : 135,
		"type" : "M4A4",
		"skinName" : "Tornado",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.23,
					"analyst" : 11.87,
					"opskins" : 11
				},
				3 : {
					"market" : 1.63,
					"analyst" : 1.43,
					"opskins" : 1.48
				},
				2 : {
					"market" : 0.65,
					"analyst" : 0.51,
					"opskins" : 0.87
				},
				1 : {
					"market" : 0.86,
					"analyst" : 0.81,
					"opskins" : 0.85
				},
				0 : {
					"market" : 0.7,
					"analyst" : 0.62,
					"opskins" : 0.94
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 73.91,
					"analyst" : 54.59,
					"opskins" : 75
				},
				3 : {
					"market" : 4.92,
					"analyst" : 5.14,
					"opskins" : 4.5
				},
				2 : {
					"market" : 2.2,
					"analyst" : 2.18,
					"opskins" : 1.97
				},
				1 : {
					"market" : 2.76,
					"analyst" : 2.45,
					"opskins" : 3.99
				},
				0 : {
					"market" : 2.27,
					"analyst" : 2.27,
					"opskins" : 2.27
				}
			}
		}
	},
	"136" : {
		"item_id" : 136,
		"type" : "P250",
		"skinName" : "Gunsmoke",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.56,
					"analyst" : 8.66,
					"opskins" : 7.9
				},
				3 : {
					"market" : 0.53,
					"analyst" : 0.58,
					"opskins" : 0.52
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.17,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.26,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.26
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 31.55,
					"analyst" : 29.3,
					"opskins" : 32
				},
				3 : {
					"market" : 3,
					"analyst" : 2.95,
					"opskins" : 2.79
				},
				2 : {
					"market" : 0.72,
					"analyst" : 0.7,
					"opskins" : 0.69
				},
				1 : {
					"market" : 0.73,
					"analyst" : 0.8,
					"opskins" : 6.4
				},
				0 : {
					"market" : 0.55,
					"analyst" : 0.53,
					"opskins" : 2
				}
			}
		}
	},
	"137" : {
		"item_id" : 137,
		"type" : "Dual Berettas",
		"skinName" : "Anodized Navy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				3 : {
					"market" : 0.72,
					"analyst" : 0.71,
					"opskins" : 0.78
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 1.84,
					"analyst" : 1.79,
					"opskins" : 1.5
				},
				3 : {
					"market" : 9,
					"analyst" : 6.52,
					"opskins" : 5
				}
			}
		}
	},
	"138" : {
		"item_id" : 138,
		"type" : "Tec-9",
		"skinName" : "Brass",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.68,
					"analyst" : 5.94,
					"opskins" : 5.42
				},
				3 : {
					"market" : 0.96,
					"analyst" : 0.95,
					"opskins" : 0.87
				},
				2 : {
					"market" : 0.31,
					"analyst" : 0.35,
					"opskins" : 0.28
				},
				1 : {
					"market" : 0.32,
					"analyst" : 0.34,
					"opskins" : 0.33
				},
				0 : {
					"market" : 0.34,
					"analyst" : 0.32,
					"opskins" : 0.34
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 31.55,
					"analyst" : 39.98,
					"opskins" : 35
				},
				3 : {
					"market" : 6.87,
					"analyst" : 6.23,
					"opskins" : 6.73
				},
				2 : {
					"market" : 4.57,
					"analyst" : 4.24,
					"opskins" : 6
				},
				1 : {
					"market" : 3.5,
					"analyst" : 4.02,
					"opskins" : 3.66
				},
				0 : {
					"market" : 2.82,
					"analyst" : 2.65,
					"opskins" : 2.5
				}
			}
		}
	},
	"139" : {
		"item_id" : 139,
		"type" : "AUG",
		"skinName" : "Contractor",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.12
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 2.3,
					"analyst" : 10.15,
					"opskins" : 50
				},
				2 : {
					"market" : 1.18,
					"analyst" : 1.5,
					"opskins" : 1.22
				},
				1 : {
					"market" : 2.23,
					"analyst" : 3.89,
					"opskins" : 10
				},
				0 : {
					"market" : 1.61,
					"analyst" : 3.54,
					"opskins" : 7.1
				}
			}
		}
	},
	"140" : {
		"item_id" : 140,
		"type" : "FAMAS",
		"skinName" : "Colony",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 49.99,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 4,
					"analyst" : 6.4,
					"opskins" : 6.4
				},
				2 : {
					"market" : 1.38,
					"analyst" : 2.78,
					"opskins" : 1.3
				},
				1 : {
					"market" : 3.65,
					"analyst" : 6.69,
					"opskins" : 9.14
				},
				0 : {
					"market" : 1.19,
					"analyst" : 1.38,
					"opskins" : 2.6
				}
			}
		}
	},
	"141" : {
		"item_id" : 141,
		"type" : "Tec-9",
		"skinName" : "Groundwater",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.1,
					"opskins" : 0.08
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 400,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 10.83,
					"analyst" : 16.28,
					"opskins" : 11.96
				},
				2 : {
					"market" : 1.26,
					"analyst" : 1.66,
					"opskins" : 1.63
				},
				1 : {
					"market" : 2.44,
					"analyst" : 2.53,
					"opskins" : 2.26
				},
				0 : {
					"market" : 1.51,
					"analyst" : 3.01,
					"opskins" : 1.99
				}
			}
		}
	},
	"142" : {
		"item_id" : 142,
		"type" : "PP-Bizon",
		"skinName" : "Sand Dashed",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.06,
					"opskins" : 0.07
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 39.99,
					"analyst" : -1,
					"opskins" : 43.09
				},
				3 : {
					"market" : 2,
					"analyst" : 1.52,
					"opskins" : 11.63
				},
				2 : {
					"market" : 0.53,
					"analyst" : 0.7,
					"opskins" : 2.69
				},
				1 : {
					"market" : 5.41,
					"analyst" : 5.46,
					"opskins" : 9.98
				},
				0 : {
					"market" : 0.69,
					"analyst" : 2.62,
					"opskins" : 3.96
				}
			}
		}
	},
	"143" : {
		"item_id" : 143,
		"type" : "Nova",
		"skinName" : "Sand Dune",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.07,
					"analyst" : 0.07,
					"opskins" : 0.11
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 90.96,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 1.49,
					"analyst" : 3.04,
					"opskins" : 3.43
				},
				2 : {
					"market" : 0.5,
					"analyst" : 1.61,
					"opskins" : 1.55
				},
				1 : {
					"market" : 2.01,
					"analyst" : -1,
					"opskins" : 9.99
				},
				0 : {
					"market" : 1.2,
					"analyst" : 1.74,
					"opskins" : 1.54
				}
			}
		}
	},
	"144" : {
		"item_id" : 144,
		"type" : "M4A1-S",
		"skinName" : "Boreal Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.31,
					"analyst" : 2.09,
					"opskins" : 1.98
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.08
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 58.02,
					"analyst" : 38.14,
					"opskins" : 27.78
				},
				2 : {
					"market" : 14.46,
					"analyst" : 21.47,
					"opskins" : 17.12
				},
				1 : {
					"market" : 25,
					"analyst" : 14.95,
					"opskins" : 23.61
				},
				0 : {
					"market" : 30.85,
					"analyst" : 41.09,
					"opskins" : 48.64
				}
			}
		}
	},
	"145" : {
		"item_id" : 145,
		"type" : "Dual Berettas",
		"skinName" : "Stained",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.08
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 94.94,
					"analyst" : 92.49,
					"opskins" : -1
				},
				3 : {
					"market" : 19.25,
					"analyst" : 14.43,
					"opskins" : 13
				},
				2 : {
					"market" : 3.84,
					"analyst" : 7.58,
					"opskins" : 27.67
				},
				1 : {
					"market" : 4.49,
					"analyst" : 5.83,
					"opskins" : 9.99
				},
				0 : {
					"market" : 6.9,
					"analyst" : 7.66,
					"opskins" : 35
				}
			}
		}
	},
	"146" : {
		"item_id" : 146,
		"type" : "XM1014",
		"skinName" : "CaliCamo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.04
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 1
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 17.03,
					"analyst" : -1,
					"opskins" : 20
				},
				3 : {
					"market" : 4.63,
					"analyst" : 4.22,
					"opskins" : 12.74
				},
				2 : {
					"market" : 2.43,
					"analyst" : 3.57,
					"opskins" : 4.76
				},
				1 : {
					"market" : 21.92,
					"analyst" : -1,
					"opskins" : 16.7
				},
				0 : {
					"market" : 9.54,
					"analyst" : -1,
					"opskins" : 7.96
				}
			}
		}
	},
	"147" : {
		"item_id" : 147,
		"type" : "UMP-45",
		"skinName" : "Gunsmoke",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.62,
					"analyst" : 0.67,
					"opskins" : 0.57
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 21.27,
					"analyst" : 18.22,
					"opskins" : 45
				},
				2 : {
					"market" : 4.22,
					"analyst" : 5.14,
					"opskins" : 10.03
				},
				1 : {
					"market" : 21.01,
					"analyst" : -1,
					"opskins" : 39.52
				},
				0 : {
					"market" : 9.4,
					"analyst" : 5.58,
					"opskins" : 5.56
				}
			}
		}
	},
	"148" : {
		"item_id" : 148,
		"type" : "P2000",
		"skinName" : "Granite Marbleized",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.14
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 8.48,
					"analyst" : 25.48,
					"opskins" : 16.3
				},
				2 : {
					"market" : 7.43,
					"analyst" : 9.03,
					"opskins" : 32
				},
				1 : {
					"market" : 15.83,
					"analyst" : 27.93,
					"opskins" : 15.15
				},
				0 : {
					"market" : 5.59,
					"analyst" : 5.5,
					"opskins" : 5.26
				}
			}
		}
	},
	"149" : {
		"item_id" : 149,
		"type" : "Nova",
		"skinName" : "Candy Apple",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.06,
					"analyst" : 0.05,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 27.68,
					"analyst" : 28.73,
					"opskins" : 28.77
				},
				3 : {
					"market" : 8.3,
					"analyst" : 12.53,
					"opskins" : 12
				},
				2 : {
					"market" : 8.25,
					"analyst" : 16.96,
					"opskins" : 39.77
				}
			}
		}
	},
	"150" : {
		"item_id" : 150,
		"type" : "Sawed-Off",
		"skinName" : "Full Stop",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.14
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.1
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.13
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 172.5,
					"analyst" : 39.03,
					"opskins" : -1
				},
				3 : {
					"market" : 54.82,
					"analyst" : 45.74,
					"opskins" : 149.98
				},
				2 : {
					"market" : 9.2,
					"analyst" : 12.5,
					"opskins" : 13.02
				},
				1 : {
					"market" : 150,
					"analyst" : -1,
					"opskins" : -1
				},
				0 : {
					"market" : 80.5,
					"analyst" : -1,
					"opskins" : -1
				}
			}
		}
	},
	"151" : {
		"item_id" : 151,
		"type" : "MP7",
		"skinName" : "Anodized Navy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.13
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.28,
					"opskins" : 0.28
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 17.79,
					"analyst" : 28.57,
					"opskins" : 30
				},
				3 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				}
			}
		}
	},
	"152" : {
		"item_id" : 152,
		"type" : "Glock-18",
		"skinName" : "Candy Apple",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.41,
					"analyst" : 0.43,
					"opskins" : 0.33
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.22
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.26,
					"opskins" : 0.24
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 136.36,
					"analyst" : 70.57,
					"opskins" : 150
				},
				3 : {
					"market" : 45.56,
					"analyst" : 52.32,
					"opskins" : 40
				},
				2 : {
					"market" : 115.76,
					"analyst" : 56.55,
					"opskins" : 47.95
				}
			}
		}
	},
	"153" : {
		"item_id" : 153,
		"type" : "AWP",
		"skinName" : "Pit Viper",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.96,
					"analyst" : 1,
					"opskins" : 0.83
				},
				2 : {
					"market" : 0.63,
					"analyst" : 0.64,
					"opskins" : 0.56
				},
				1 : {
					"market" : 0.85,
					"analyst" : 0.86,
					"opskins" : 0.73
				},
				0 : {
					"market" : 0.88,
					"analyst" : 0.9,
					"opskins" : 0.81
				}
			},
			"stattrak" : {},
			"souvenir" : {
				3 : {
					"market" : 167.12,
					"analyst" : 71.52,
					"opskins" : 500
				},
				2 : {
					"market" : 60.18,
					"analyst" : 48.65,
					"opskins" : 200
				},
				1 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				0 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				}
			}
		}
	},
	"154" : {
		"item_id" : 154,
		"type" : "G3SG1",
		"skinName" : "Jungle Dashed",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 2785
				},
				3 : {
					"market" : 1.49,
					"analyst" : 3.68,
					"opskins" : 10
				},
				2 : {
					"market" : 0.59,
					"analyst" : 0.78,
					"opskins" : 2.99
				},
				1 : {
					"market" : 2.32,
					"analyst" : 2.7,
					"opskins" : 2.27
				},
				0 : {
					"market" : 12,
					"analyst" : 9.6,
					"opskins" : 100
				}
			}
		}
	},
	"155" : {
		"item_id" : 155,
		"type" : "SG 553",
		"skinName" : "Waves Perforated",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 1.31,
					"analyst" : 2.97,
					"opskins" : 4.05
				},
				2 : {
					"market" : 0.98,
					"analyst" : 2.29,
					"opskins" : 1.5
				},
				1 : {
					"market" : 2.35,
					"analyst" : 3.04,
					"opskins" : 5.55
				},
				0 : {
					"market" : 1.68,
					"analyst" : 1.71,
					"opskins" : 2.44
				}
			}
		}
	},
	"156" : {
		"item_id" : 156,
		"type" : "Galil AR",
		"skinName" : "Sage Spray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 377.5,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 8.48,
					"analyst" : 8.74,
					"opskins" : 8.41
				},
				2 : {
					"market" : 0.62,
					"analyst" : 2.16,
					"opskins" : 3
				},
				1 : {
					"market" : 1.2,
					"analyst" : 1.88,
					"opskins" : 1.96
				},
				0 : {
					"market" : 1.26,
					"analyst" : 2.34,
					"opskins" : 3.33
				}
			}
		}
	},
	"157" : {
		"item_id" : 157,
		"type" : "AUG",
		"skinName" : "Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.12,
					"opskins" : 0.12
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 132.88,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 1.32,
					"analyst" : 3.3,
					"opskins" : 2.67
				},
				2 : {
					"market" : 0.92,
					"analyst" : 1.69,
					"opskins" : 1.72
				},
				1 : {
					"market" : 3.08,
					"analyst" : 2.56,
					"opskins" : 2.79
				},
				0 : {
					"market" : 1.57,
					"analyst" : 3.95,
					"opskins" : 6
				}
			}
		}
	},
	"158" : {
		"item_id" : 158,
		"type" : "XM1014",
		"skinName" : "Blue Spruce",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.18
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 1.58,
					"analyst" : 2.48,
					"opskins" : 1.8
				},
				2 : {
					"market" : 0.83,
					"analyst" : 1.07,
					"opskins" : 5
				},
				1 : {
					"market" : 1.15,
					"analyst" : 2.35,
					"opskins" : 3.97
				},
				0 : {
					"market" : 1.32,
					"analyst" : 1.23,
					"opskins" : 10.36
				}
			}
		}
	},
	"159" : {
		"item_id" : 159,
		"type" : "P250",
		"skinName" : "Boreal Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 400,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 2.12,
					"analyst" : 13.21,
					"opskins" : 39.99
				},
				2 : {
					"market" : 1.3,
					"analyst" : 3.92,
					"opskins" : 4.18
				},
				1 : {
					"market" : 3.39,
					"analyst" : 3.54,
					"opskins" : 3.01
				},
				0 : {
					"market" : 0.73,
					"analyst" : 1.79,
					"opskins" : 3.99
				}
			}
		}
	},
	"160" : {
		"item_id" : 160,
		"type" : "XM1014",
		"skinName" : "Blue Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 80.5,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 16.86,
					"analyst" : 11.55,
					"opskins" : 11.24
				},
				2 : {
					"market" : 5.49,
					"analyst" : 6.61,
					"opskins" : 7.96
				},
				1 : {
					"market" : 4.85,
					"analyst" : 6.95,
					"opskins" : 8
				},
				0 : {
					"market" : 10.89,
					"analyst" : 12.41,
					"opskins" : 13.6
				}
			}
		}
	},
	"161" : {
		"item_id" : 161,
		"type" : "FAMAS",
		"skinName" : "Cyanospatter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.53,
					"analyst" : 0.49,
					"opskins" : 0.44
				},
				3 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 13.77,
					"analyst" : 23.33,
					"opskins" : 19.17
				},
				2 : {
					"market" : 3.34,
					"analyst" : 3.52,
					"opskins" : 7
				},
				1 : {
					"market" : 5.82,
					"analyst" : 5.05,
					"opskins" : 20
				},
				0 : {
					"market" : 7.42,
					"analyst" : 7.51,
					"opskins" : 35
				}
			}
		}
	},
	"162" : {
		"item_id" : 162,
		"type" : "PP-Bizon",
		"skinName" : "Night Ops",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.04
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 34.7,
					"analyst" : 19.38,
					"opskins" : 25
				},
				3 : {
					"market" : 5.17,
					"analyst" : 4.98,
					"opskins" : 6.08
				},
				2 : {
					"market" : 1.41,
					"analyst" : 2.44,
					"opskins" : 4.5
				},
				1 : {
					"market" : 161,
					"analyst" : -1,
					"opskins" : -1
				},
				0 : {
					"market" : 24.3,
					"analyst" : -1,
					"opskins" : 19.99
				}
			}
		}
	},
	"163" : {
		"item_id" : 163,
		"type" : "AWP",
		"skinName" : "Safari Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.74,
					"analyst" : 1.96,
					"opskins" : 1.66
				},
				3 : {
					"market" : 0.24,
					"analyst" : 0.26,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.09,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.34,
					"opskins" : 0.29
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 50.92,
					"analyst" : 38.09,
					"opskins" : 99
				},
				2 : {
					"market" : 18.56,
					"analyst" : 21.12,
					"opskins" : 33.33
				},
				1 : {
					"market" : 58.02,
					"analyst" : 35.73,
					"opskins" : -1
				},
				0 : {
					"market" : 39.1,
					"analyst" : 30.28,
					"opskins" : 100
				}
			}
		}
	},
	"164" : {
		"item_id" : 164,
		"type" : "Desert Eagle",
		"skinName" : "Mudder",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.34,
					"analyst" : 0.29,
					"opskins" : 0.27
				},
				3 : {
					"market" : 0.06,
					"analyst" : 0.05,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.07
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 21.85,
					"analyst" : 16.62,
					"opskins" : 11.98
				},
				2 : {
					"market" : 6.72,
					"analyst" : 8.09,
					"opskins" : 7.48
				},
				1 : {
					"market" : 85,
					"analyst" : 84.34,
					"opskins" : 55
				},
				0 : {
					"market" : 24.85,
					"analyst" : 29.15,
					"opskins" : 20
				}
			}
		}
	},
	"165" : {
		"item_id" : 165,
		"type" : "SG 553",
		"skinName" : "Anodized Navy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.23
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 32.2,
					"analyst" : 31.77,
					"opskins" : 34.19
				},
				3 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 33.35
				}
			}
		}
	},
	"166" : {
		"item_id" : 166,
		"type" : "P90",
		"skinName" : "Teardown",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.12
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.12,
					"analyst" : 0.11,
					"opskins" : 0.08
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.09
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 48.72,
					"analyst" : -1,
					"opskins" : 49.85
				},
				3 : {
					"market" : 35.9,
					"analyst" : 15.63,
					"opskins" : 16.66
				},
				2 : {
					"market" : 12.72,
					"analyst" : 14.4,
					"opskins" : 21.11
				},
				1 : {
					"market" : 379.99,
					"analyst" : -1,
					"opskins" : -1
				},
				0 : {
					"market" : 56.94,
					"analyst" : 38.45,
					"opskins" : 79.56
				}
			}
		}
	},
	"167" : {
		"item_id" : 167,
		"type" : "USP-S",
		"skinName" : "Night Ops",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.34,
					"analyst" : 0.33,
					"opskins" : 0.3
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.17,
					"opskins" : 0.16
				},
				2 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.1
				},
				1 : {
					"market" : 0.27,
					"analyst" : 0.23,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.13,
					"opskins" : 0.13
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 220.12,
					"analyst" : 284.78,
					"opskins" : 200
				},
				3 : {
					"market" : 104.89,
					"analyst" : -1,
					"opskins" : 89
				},
				2 : {
					"market" : 18.28,
					"analyst" : 43.65,
					"opskins" : 38.99
				},
				1 : {
					"market" : 40.11,
					"analyst" : -1,
					"opskins" : 22
				},
				0 : {
					"market" : 399.05,
					"analyst" : 25.94,
					"opskins" : -1
				}
			}
		}
	},
	"168" : {
		"item_id" : 168,
		"type" : "Dual Berettas",
		"skinName" : "Cobalt Quartz",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.19
				},
				3 : {
					"market" : 0.16,
					"analyst" : 0.18,
					"opskins" : 0.15
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.23,
					"opskins" : 0.21
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 132.94,
					"analyst" : 181.2,
					"opskins" : 250
				},
				3 : {
					"market" : 92,
					"analyst" : 156.42,
					"opskins" : 61
				},
				2 : {
					"market" : 31.79,
					"analyst" : 49.76,
					"opskins" : 39
				},
				1 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				}
			}
		}
	},
	"169" : {
		"item_id" : 169,
		"type" : "XM1014",
		"skinName" : "Grassland",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.49,
					"analyst" : 4.51,
					"opskins" : 7.33
				},
				3 : {
					"market" : 0.62,
					"analyst" : 0.44,
					"opskins" : 0.58
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.19,
					"opskins" : 1.2
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.2,
					"opskins" : 0.73
				},
				0 : {
					"market" : 0.18,
					"analyst" : 0.13,
					"opskins" : 0.24
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"170" : {
		"item_id" : 170,
		"type" : "MAC-10",
		"skinName" : "Tornado",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.95,
					"analyst" : 5.94,
					"opskins" : 25
				},
				3 : {
					"market" : 0.43,
					"analyst" : 0.37,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.18,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.96,
					"analyst" : 0.32,
					"opskins" : 249.99
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.18,
					"opskins" : 0.17
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"171" : {
		"item_id" : 171,
		"type" : "PP-Bizon",
		"skinName" : "Forest Leaves",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.82,
					"analyst" : 6.11,
					"opskins" : 6
				},
				3 : {
					"market" : 0.4,
					"analyst" : 0.4,
					"opskins" : 11.22
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.14
				},
				1 : {
					"market" : 0.38,
					"analyst" : 1.02,
					"opskins" : 169.99
				},
				0 : {
					"market" : 0.18,
					"analyst" : 0.18,
					"opskins" : 11.99
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"172" : {
		"item_id" : 172,
		"type" : "P2000",
		"skinName" : "Grassland Leaves",
		"prices" : {
			"default" : {
				4 : {
					"market" : 76.02,
					"analyst" : 50.17,
					"opskins" : 85
				},
				3 : {
					"market" : 3.04,
					"analyst" : 3.05,
					"opskins" : 2.66
				},
				2 : {
					"market" : 0.74,
					"analyst" : 0.63,
					"opskins" : 5.96
				},
				1 : {
					"market" : 0.8,
					"analyst" : -1,
					"opskins" : 3.25
				},
				0 : {
					"market" : 0.63,
					"analyst" : 2.28,
					"opskins" : 1.93
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"173" : {
		"item_id" : 173,
		"type" : "Nova",
		"skinName" : "Blaze Orange",
		"prices" : {
			"default" : {
				4 : {
					"market" : 131.7,
					"analyst" : 104.98,
					"opskins" : 105
				},
				3 : {
					"market" : 5,
					"analyst" : 4.9,
					"opskins" : 4.49
				},
				2 : {
					"market" : 1.67,
					"analyst" : 1.67,
					"opskins" : 1.48
				},
				1 : {
					"market" : 2.32,
					"analyst" : 4.09,
					"opskins" : 4.95
				},
				0 : {
					"market" : 1.87,
					"analyst" : 2.68,
					"opskins" : 2.17
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"174" : {
		"item_id" : 174,
		"type" : "P250",
		"skinName" : "Modern Hunter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 212.95,
					"analyst" : 339.18,
					"opskins" : 259.89
				},
				3 : {
					"market" : 7.83,
					"analyst" : 5.74,
					"opskins" : 9.99
				},
				2 : {
					"market" : 2.66,
					"analyst" : 1.87,
					"opskins" : 3
				},
				1 : {
					"market" : 2.67,
					"analyst" : 5.45,
					"opskins" : 4.89
				},
				0 : {
					"market" : 1.75,
					"analyst" : 2.34,
					"opskins" : 7.21
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"175" : {
		"item_id" : 175,
		"type" : "XM1014",
		"skinName" : "Blaze Orange",
		"prices" : {
			"default" : {
				4 : {
					"market" : 133.12,
					"analyst" : 52.25,
					"opskins" : 61
				},
				3 : {
					"market" : 5,
					"analyst" : 5.8,
					"opskins" : 5.04
				},
				2 : {
					"market" : 1.39,
					"analyst" : 1.35,
					"opskins" : 1.49
				},
				1 : {
					"market" : 2.94,
					"analyst" : 3.17,
					"opskins" : 4.17
				},
				0 : {
					"market" : 1.96,
					"analyst" : 6.73,
					"opskins" : 9.99
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"176" : {
		"item_id" : 176,
		"type" : "PP-Bizon",
		"skinName" : "Modern Hunter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 100.23,
					"analyst" : -1,
					"opskins" : 100
				},
				3 : {
					"market" : 8.76,
					"analyst" : 6.42,
					"opskins" : 10
				},
				2 : {
					"market" : 1.91,
					"analyst" : 1.73,
					"opskins" : 1.52
				},
				1 : {
					"market" : 3.92,
					"analyst" : 10.07,
					"opskins" : 12.03
				},
				0 : {
					"market" : 1.81,
					"analyst" : 3.69,
					"opskins" : 2.9
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"177" : {
		"item_id" : 177,
		"type" : "Nova",
		"skinName" : "Modern Hunter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 100.23,
					"analyst" : -1,
					"opskins" : 55.33
				},
				3 : {
					"market" : 6.51,
					"analyst" : 6.56,
					"opskins" : 5.3
				},
				2 : {
					"market" : 2.67,
					"analyst" : 2.46,
					"opskins" : 2
				},
				1 : {
					"market" : 5.55,
					"analyst" : 8.6,
					"opskins" : 6
				},
				0 : {
					"market" : 3.24,
					"analyst" : 4.72,
					"opskins" : 4.47
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"178" : {
		"item_id" : 178,
		"type" : "M4A4",
		"skinName" : "Modern Hunter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 131.01,
					"analyst" : 118.89,
					"opskins" : 100
				},
				3 : {
					"market" : 15.43,
					"analyst" : 17.85,
					"opskins" : 18.4
				},
				2 : {
					"market" : 4.92,
					"analyst" : 4.63,
					"opskins" : 4.9
				},
				1 : {
					"market" : 6.4,
					"analyst" : 5.25,
					"opskins" : 11
				},
				0 : {
					"market" : 9.4,
					"analyst" : 5.81,
					"opskins" : 5.64
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"179" : {
		"item_id" : 179,
		"type" : "SCAR-20",
		"skinName" : "Splash Jam",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 349.9
				},
				3 : {
					"market" : 8.53,
					"analyst" : 6.23,
					"opskins" : 5.3
				},
				2 : {
					"market" : 1.44,
					"analyst" : 1.59,
					"opskins" : 2.16
				},
				1 : {
					"market" : 2.55,
					"analyst" : 1.59,
					"opskins" : 1.88
				},
				0 : {
					"market" : 1.89,
					"analyst" : 1.62,
					"opskins" : 2.32
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"180" : {
		"item_id" : 180,
		"type" : "AUG",
		"skinName" : "Colony",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.04,
					"analyst" : 0.86,
					"opskins" : 0.8
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.14,
					"opskins" : 0.12
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.08
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.12,
					"analyst" : 0.11,
					"opskins" : 0.14
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 4,
					"analyst" : 5.27,
					"opskins" : 3.52
				},
				3 : {
					"market" : 0.53,
					"analyst" : 0.54,
					"opskins" : 0.46
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.25
				},
				1 : {
					"market" : 0.39,
					"analyst" : 0.4,
					"opskins" : 0.39
				},
				0 : {
					"market" : 0.41,
					"analyst" : 0.37,
					"opskins" : 0.28
				}
			}
		}
	},
	"181" : {
		"item_id" : 181,
		"type" : "G3SG1",
		"skinName" : "Safari Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.97,
					"analyst" : 1.06,
					"opskins" : 1.1
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.19,
					"opskins" : 0.15
				},
				0 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.09
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.17,
					"analyst" : 3.18,
					"opskins" : 4.99
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.2,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.13,
					"opskins" : 0.13
				},
				1 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.16
				}
			}
		}
	},
	"182" : {
		"item_id" : 182,
		"type" : "Galil AR",
		"skinName" : "Hunting Blind",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.27,
					"analyst" : 0.29,
					"opskins" : 0.27
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.08
				},
				1 : {
					"market" : 0.92,
					"analyst" : 2.57,
					"opskins" : 2.45
				},
				0 : {
					"market" : 0.12,
					"analyst" : 0.14,
					"opskins" : 0.11
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 1.17,
					"analyst" : 1.19,
					"opskins" : 1.09
				},
				3 : {
					"market" : 0.48,
					"analyst" : 0.53,
					"opskins" : 0.39
				},
				2 : {
					"market" : 0.29,
					"analyst" : 0.31,
					"opskins" : 0.3
				},
				1 : {
					"market" : 0.85,
					"analyst" : 0.77,
					"opskins" : 2.58
				},
				0 : {
					"market" : 0.59,
					"analyst" : 0.51,
					"opskins" : 0.59
				}
			}
		}
	},
	"183" : {
		"item_id" : 183,
		"type" : "Five-SeveN",
		"skinName" : "Contractor",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.46,
					"analyst" : 2.49,
					"opskins" : 1.87
				},
				3 : {
					"market" : 0.3,
					"analyst" : 0.3,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				1 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 0.14
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.14
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 8.6,
					"analyst" : 8.53,
					"opskins" : 7
				},
				3 : {
					"market" : 0.75,
					"analyst" : 0.73,
					"opskins" : 0.73
				},
				2 : {
					"market" : 0.3,
					"analyst" : 0.34,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.5,
					"analyst" : 0.55,
					"opskins" : 2.06
				},
				0 : {
					"market" : 0.36,
					"analyst" : 0.43,
					"opskins" : 0.37
				}
			}
		}
	},
	"184" : {
		"item_id" : 184,
		"type" : "P90",
		"skinName" : "Scorched",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.85,
					"analyst" : -1,
					"opskins" : 9.95
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.16
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.11,
					"analyst" : 0.09,
					"opskins" : 0.4
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 4.87,
					"analyst" : 4.1,
					"opskins" : 3.76
				},
				3 : {
					"market" : 0.41,
					"analyst" : 0.49,
					"opskins" : 0.3
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.27,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.28,
					"analyst" : 0.23,
					"opskins" : 0.23
				}
			}
		}
	},
	"185" : {
		"item_id" : 185,
		"type" : "P250",
		"skinName" : "Bone Mask",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.9,
					"analyst" : 6.25,
					"opskins" : 5.5
				},
				3 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.16
				},
				2 : {
					"market" : 0.07,
					"analyst" : 0.08,
					"opskins" : 0.47
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.26,
					"analyst" : 0.24,
					"opskins" : 0.22
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 4.07,
					"analyst" : 4.33,
					"opskins" : 25
				},
				3 : {
					"market" : 0.6,
					"analyst" : 0.63,
					"opskins" : 0.49
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.3,
					"opskins" : 0.33
				},
				1 : {
					"market" : 0.48,
					"analyst" : 0.43,
					"opskins" : 0.43
				},
				0 : {
					"market" : 0.37,
					"analyst" : 0.36,
					"opskins" : 0.33
				}
			}
		}
	},
	"186" : {
		"item_id" : 186,
		"type" : "SG 553",
		"skinName" : "Gator Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.73,
					"analyst" : 0.72,
					"opskins" : 0.6
				},
				3 : {
					"market" : 0.52,
					"analyst" : 0.56,
					"opskins" : 0.61
				},
				2 : {
					"market" : 0.47,
					"analyst" : 0.48,
					"opskins" : 0.54
				},
				1 : {
					"market" : 0.64,
					"analyst" : 0.63,
					"opskins" : 1.4
				},
				0 : {
					"market" : 1.51,
					"analyst" : 1.11,
					"opskins" : 3.33
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 2.16,
					"analyst" : 2.25,
					"opskins" : 1.68
				},
				3 : {
					"market" : 0.72,
					"analyst" : 0.8,
					"opskins" : 0.89
				},
				2 : {
					"market" : 0.48,
					"analyst" : 0.56,
					"opskins" : 0.48
				},
				1 : {
					"market" : 1.4,
					"analyst" : 1.43,
					"opskins" : 5.02
				},
				0 : {
					"market" : 0.84,
					"analyst" : 0.89,
					"opskins" : 0.79
				}
			}
		}
	},
	"187" : {
		"item_id" : 187,
		"type" : "MP7",
		"skinName" : "Orange Peel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.36,
					"analyst" : 2.79,
					"opskins" : 4.35
				},
				3 : {
					"market" : 0.66,
					"analyst" : 0.58,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.59,
					"analyst" : 0.5,
					"opskins" : 0.42
				},
				1 : {
					"market" : 1.08,
					"analyst" : 2.05,
					"opskins" : 2.49
				},
				0 : {
					"market" : 0.53,
					"analyst" : 0.85,
					"opskins" : 0.54
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 21.85,
					"analyst" : 21.3,
					"opskins" : 25
				},
				3 : {
					"market" : 2.12,
					"analyst" : 1.66,
					"opskins" : 5.2
				},
				2 : {
					"market" : 0.66,
					"analyst" : 0.74,
					"opskins" : 0.72
				},
				1 : {
					"market" : 1.1,
					"analyst" : 0.72,
					"opskins" : 3.6
				},
				0 : {
					"market" : 0.96,
					"analyst" : 1.17,
					"opskins" : 2
				}
			}
		}
	},
	"188" : {
		"item_id" : 188,
		"type" : "Glock-18",
		"skinName" : "Groundwater",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.75,
					"analyst" : 8.65,
					"opskins" : 8.6
				},
				3 : {
					"market" : 0.95,
					"analyst" : 0.89,
					"opskins" : 0.9
				},
				2 : {
					"market" : 0.49,
					"analyst" : 0.56,
					"opskins" : 0.74
				},
				1 : {
					"market" : 0.78,
					"analyst" : 0.58,
					"opskins" : 1.09
				},
				0 : {
					"market" : 0.6,
					"analyst" : 0.56,
					"opskins" : 0.89
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 40.79,
					"analyst" : 50.34,
					"opskins" : 125
				},
				3 : {
					"market" : 5.23,
					"analyst" : 4.94,
					"opskins" : 4.99
				},
				2 : {
					"market" : 2.04,
					"analyst" : 2.04,
					"opskins" : 1.81
				},
				1 : {
					"market" : 2.66,
					"analyst" : 2.25,
					"opskins" : 2.99
				},
				0 : {
					"market" : 2.01,
					"analyst" : 1.92,
					"opskins" : 2.1
				}
			}
		}
	},
	"189" : {
		"item_id" : 189,
		"type" : "Negev",
		"skinName" : "CaliCamo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.15,
					"analyst" : 0.72,
					"opskins" : 0.82
				},
				3 : {
					"market" : 0.48,
					"analyst" : 0.5,
					"opskins" : 0.53
				},
				2 : {
					"market" : 0.51,
					"analyst" : 0.48,
					"opskins" : 4.47
				},
				1 : {
					"market" : 0.6,
					"analyst" : 1.81,
					"opskins" : 1.38
				},
				0 : {
					"market" : 1.04,
					"analyst" : 1.46,
					"opskins" : 1.25
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 1.31,
					"analyst" : 1.24,
					"opskins" : 1.54
				},
				3 : {
					"market" : 0.4,
					"analyst" : 0.39,
					"opskins" : 0.34
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.31,
					"opskins" : 0.39
				},
				1 : {
					"market" : 0.43,
					"analyst" : 0.55,
					"opskins" : 4.09
				},
				0 : {
					"market" : 0.37,
					"analyst" : 0.51,
					"opskins" : 0.36
				}
			}
		}
	},
	"190" : {
		"item_id" : 190,
		"type" : "SSG 08",
		"skinName" : "Tropical Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.36,
					"analyst" : 7.17,
					"opskins" : 6.92
				},
				3 : {
					"market" : 0.66,
					"analyst" : 0.64,
					"opskins" : 0.67
				},
				2 : {
					"market" : 0.51,
					"analyst" : 0.5,
					"opskins" : 0.49
				},
				1 : {
					"market" : 0.66,
					"analyst" : 0.71,
					"opskins" : 0.86
				},
				0 : {
					"market" : 0.58,
					"analyst" : 0.54,
					"opskins" : 0.48
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 21.92,
					"analyst" : 50.8,
					"opskins" : 44.7
				},
				3 : {
					"market" : 5.47,
					"analyst" : 4.58,
					"opskins" : 4.45
				},
				2 : {
					"market" : 1.58,
					"analyst" : 1.6,
					"opskins" : 1.68
				},
				1 : {
					"market" : 1.86,
					"analyst" : 1.99,
					"opskins" : 2.73
				},
				0 : {
					"market" : 1.86,
					"analyst" : 1.83,
					"opskins" : 1.79
				}
			}
		}
	},
	"191" : {
		"item_id" : 191,
		"type" : "MP9",
		"skinName" : "Hot Rod",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.99,
					"analyst" : 4.04,
					"opskins" : 3.62
				},
				3 : {
					"market" : 5.37,
					"analyst" : 6.1,
					"opskins" : 5.89
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 11.5,
					"analyst" : 11.04,
					"opskins" : 11
				},
				3 : {
					"market" : 16.83,
					"analyst" : 13.93,
					"opskins" : 17
				}
			}
		}
	},
	"192" : {
		"item_id" : 192,
		"type" : "MAC-10",
		"skinName" : "Amber Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.54,
					"analyst" : 2.79,
					"opskins" : 4.9
				},
				3 : {
					"market" : 1.29,
					"analyst" : 1.12,
					"opskins" : 2.49
				},
				2 : {
					"market" : 1.11,
					"analyst" : 1.04,
					"opskins" : 3.5
				},
				1 : {
					"market" : 5.17,
					"analyst" : 3.19,
					"opskins" : 7.75
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 9.66,
					"analyst" : 7.42,
					"opskins" : 7.4
				},
				3 : {
					"market" : 4.1,
					"analyst" : 3.82,
					"opskins" : 3.02
				},
				2 : {
					"market" : 2.25,
					"analyst" : 1.9,
					"opskins" : 3.5
				},
				1 : {
					"market" : 7.3,
					"analyst" : 5.98,
					"opskins" : 4.5
				}
			}
		}
	},
	"193" : {
		"item_id" : 193,
		"type" : "UMP-45",
		"skinName" : "Blaze",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.41,
					"analyst" : 7.16,
					"opskins" : 6.73
				},
				3 : {
					"market" : 14.85,
					"analyst" : 12.58,
					"opskins" : 12.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 27.2,
					"analyst" : 26.5,
					"opskins" : 25.35
				},
				3 : {
					"market" : 33.36,
					"analyst" : 30.66,
					"opskins" : 35
				}
			}
		}
	},
	"194" : {
		"item_id" : 194,
		"type" : "MAG-7",
		"skinName" : "Bulldozer",
		"prices" : {
			"default" : {
				4 : {
					"market" : 42.98,
					"analyst" : 30.87,
					"opskins" : 27.91
				},
				3 : {
					"market" : 2.43,
					"analyst" : 2.9,
					"opskins" : 2.42
				},
				2 : {
					"market" : 0.37,
					"analyst" : 0.44,
					"opskins" : 0.34
				},
				1 : {
					"market" : 0.62,
					"analyst" : 0.66,
					"opskins" : 0.64
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.35,
					"opskins" : 0.3
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 21.19,
					"analyst" : 15.24,
					"opskins" : 14.5
				},
				2 : {
					"market" : 4.87,
					"analyst" : 3.85,
					"opskins" : 3.3
				},
				1 : {
					"market" : 3.17,
					"analyst" : 3.35,
					"opskins" : 3
				},
				0 : {
					"market" : 3.76,
					"analyst" : 3.2,
					"opskins" : 3.83
				}
			}
		}
	},
	"195" : {
		"item_id" : 195,
		"type" : "MAG-7",
		"skinName" : "Irradiated Alert",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.14,
					"analyst" : 3.17,
					"opskins" : 2.76
				},
				3 : {
					"market" : 0.41,
					"analyst" : 0.36,
					"opskins" : 0.3
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.19,
					"opskins" : 2
				},
				1 : {
					"market" : 0.53,
					"analyst" : 0.31,
					"opskins" : 0.24
				},
				0 : {
					"market" : 0.96,
					"analyst" : 0.95,
					"opskins" : 5
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 12.72,
					"analyst" : 13.41,
					"opskins" : 21.18
				},
				3 : {
					"market" : 0.88,
					"analyst" : 0.72,
					"opskins" : 0.65
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.21,
					"opskins" : 0.2
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.29,
					"opskins" : 0.3
				},
				0 : {
					"market" : 0.24,
					"analyst" : 0.23,
					"opskins" : 0.46
				}
			}
		}
	},
	"196" : {
		"item_id" : 196,
		"type" : "PP-Bizon",
		"skinName" : "Irradiated Alert",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.46,
					"analyst" : 3.47,
					"opskins" : 3.15
				},
				3 : {
					"market" : 0.36,
					"analyst" : 0.4,
					"opskins" : 0.41
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.19,
					"opskins" : 0.2
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.28,
					"opskins" : 0.8
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 20.14,
					"analyst" : 14.54,
					"opskins" : 16
				},
				3 : {
					"market" : 0.66,
					"analyst" : 0.72,
					"opskins" : 0.53
				},
				2 : {
					"market" : 0.25,
					"analyst" : 0.24,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.41,
					"opskins" : 2.5
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.29
				}
			}
		}
	},
	"197" : {
		"item_id" : 197,
		"type" : "Sawed-Off",
		"skinName" : "Irradiated Alert",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.36,
					"analyst" : 2.73,
					"opskins" : 3.94
				},
				3 : {
					"market" : 0.39,
					"analyst" : 0.4,
					"opskins" : 1.68
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.17,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.32,
					"analyst" : 0.33,
					"opskins" : 0.25
				},
				0 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.27
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 14.44,
					"analyst" : 17.36,
					"opskins" : 17.22
				},
				3 : {
					"market" : 0.32,
					"analyst" : 0.38,
					"opskins" : 0.49
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.2
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.3,
					"opskins" : 4.94
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.2,
					"opskins" : 0.2
				}
			}
		}
	},
	"198" : {
		"item_id" : 198,
		"type" : "P90",
		"skinName" : "Fallout Warning",
		"prices" : {
			"default" : {
				4 : {
					"market" : 16.42,
					"analyst" : 15.7,
					"opskins" : 20.6
				},
				3 : {
					"market" : 2.65,
					"analyst" : 2.45,
					"opskins" : 3.5
				},
				2 : {
					"market" : 1.06,
					"analyst" : 0.96,
					"opskins" : 0.84
				},
				1 : {
					"market" : 0.97,
					"analyst" : 0.85,
					"opskins" : 0.86
				},
				0 : {
					"market" : 1.05,
					"analyst" : 0.92,
					"opskins" : 1.18
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 239.2,
					"analyst" : 162.27,
					"opskins" : 115
				},
				3 : {
					"market" : 3.63,
					"analyst" : 4,
					"opskins" : 12
				},
				2 : {
					"market" : 1.49,
					"analyst" : 1.23,
					"opskins" : 2.34
				},
				1 : {
					"market" : 2.31,
					"analyst" : 2.05,
					"opskins" : 2.88
				},
				0 : {
					"market" : 1.28,
					"analyst" : 4.03,
					"opskins" : 1.99
				}
			}
		}
	},
	"199" : {
		"item_id" : 199,
		"type" : "UMP-45",
		"skinName" : "Fallout Warning",
		"prices" : {
			"default" : {
				4 : {
					"market" : 25.6,
					"analyst" : 23.47,
					"opskins" : 23.61
				},
				3 : {
					"market" : 3.19,
					"analyst" : 3.1,
					"opskins" : 2.9
				},
				2 : {
					"market" : 1.08,
					"analyst" : 1.06,
					"opskins" : 0.97
				},
				1 : {
					"market" : 0.98,
					"analyst" : 1.11,
					"opskins" : 1.09
				},
				0 : {
					"market" : 1.08,
					"analyst" : 1.03,
					"opskins" : 0.89
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 382.38,
					"analyst" : 138.95,
					"opskins" : 150
				},
				3 : {
					"market" : 7.99,
					"analyst" : 7.83,
					"opskins" : 18
				},
				2 : {
					"market" : 2.9,
					"analyst" : 2.58,
					"opskins" : 2.55
				},
				1 : {
					"market" : 3.47,
					"analyst" : 3.17,
					"opskins" : 4.2
				},
				0 : {
					"market" : 1.81,
					"analyst" : 2.93,
					"opskins" : 2.95
				}
			}
		}
	},
	"200" : {
		"item_id" : 200,
		"type" : "XM1014",
		"skinName" : "Fallout Warning",
		"prices" : {
			"default" : {
				4 : {
					"market" : 21.7,
					"analyst" : 21.18,
					"opskins" : 35
				},
				3 : {
					"market" : 3.4,
					"analyst" : 2.77,
					"opskins" : 2.58
				},
				2 : {
					"market" : 1.18,
					"analyst" : 0.96,
					"opskins" : 0.89
				},
				1 : {
					"market" : 1.09,
					"analyst" : 1.09,
					"opskins" : 1.74
				},
				0 : {
					"market" : 1.39,
					"analyst" : 3.97,
					"opskins" : 3.5
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 90.8,
					"analyst" : 93.54,
					"opskins" : 189.99
				},
				3 : {
					"market" : 2.08,
					"analyst" : 3.05,
					"opskins" : 3.95
				},
				2 : {
					"market" : 0.8,
					"analyst" : 0.97,
					"opskins" : 1
				},
				1 : {
					"market" : 1.16,
					"analyst" : 1.57,
					"opskins" : 2.95
				},
				0 : {
					"market" : 1.07,
					"analyst" : 1.24,
					"opskins" : 1.45
				}
			}
		}
	},
	"201" : {
		"item_id" : 201,
		"type" : "M4A4",
		"skinName" : "Radiation Hazard",
		"prices" : {
			"default" : {
				4 : {
					"market" : 170.46,
					"analyst" : 132.96,
					"opskins" : 109.99
				},
				3 : {
					"market" : 13.77,
					"analyst" : 16.14,
					"opskins" : 13.92
				},
				2 : {
					"market" : 3.99,
					"analyst" : 4.13,
					"opskins" : 4.27
				},
				1 : {
					"market" : 4.48,
					"analyst" : 3.82,
					"opskins" : 8.99
				},
				0 : {
					"market" : 3.85,
					"analyst" : 3.93,
					"opskins" : 7.25
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : 223.87,
					"opskins" : 420
				},
				3 : {
					"market" : 32.85,
					"analyst" : 37.13,
					"opskins" : 36.87
				},
				2 : {
					"market" : 9.93,
					"analyst" : 10.47,
					"opskins" : 10.3
				},
				1 : {
					"market" : 14.85,
					"analyst" : 16.52,
					"opskins" : 13.99
				},
				0 : {
					"market" : 8.05,
					"analyst" : 11.77,
					"opskins" : 22
				}
			}
		}
	},
	"202" : {
		"item_id" : 202,
		"type" : "P250",
		"skinName" : "Nuclear Threat",
		"prices" : {
			"default" : {
				4 : {
					"market" : 351.12,
					"analyst" : 252,
					"opskins" : 255
				},
				3 : {
					"market" : 21.68,
					"analyst" : 19.76,
					"opskins" : 17.99
				},
				2 : {
					"market" : 3.99,
					"analyst" : 4.54,
					"opskins" : 3.99
				},
				1 : {
					"market" : 4.97,
					"analyst" : 3.6,
					"opskins" : 4.71
				},
				0 : {
					"market" : 3.51,
					"analyst" : 2.15,
					"opskins" : 5
				}
			},
			"stattrak" : {},
			"souvenir" : {
				3 : {
					"market" : 303.88,
					"analyst" : 282.96,
					"opskins" : 225
				},
				2 : {
					"market" : 43.99,
					"analyst" : 40.86,
					"opskins" : 37.58
				},
				1 : {
					"market" : 58.59,
					"analyst" : 32.7,
					"opskins" : 26.29
				},
				0 : {
					"market" : 26.22,
					"analyst" : 25.53,
					"opskins" : 24.63
				}
			}
		}
	},
	"203" : {
		"item_id" : 203,
		"type" : "Tec-9",
		"skinName" : "Nuclear Threat",
		"prices" : {
			"default" : {
				4 : {
					"market" : 360.22,
					"analyst" : 252,
					"opskins" : 265
				},
				3 : {
					"market" : 31.55,
					"analyst" : 29.01,
					"opskins" : 25.29
				},
				2 : {
					"market" : 10.49,
					"analyst" : 10.29,
					"opskins" : 9.79
				},
				1 : {
					"market" : 10.52,
					"analyst" : 10.46,
					"opskins" : 9.66
				},
				0 : {
					"market" : 8.81,
					"analyst" : 9.36,
					"opskins" : 8.09
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 372.04,
					"analyst" : 293.39,
					"opskins" : 240
				},
				2 : {
					"market" : 77.16,
					"analyst" : 64.33,
					"opskins" : 68.89
				},
				1 : {
					"market" : 42.9,
					"analyst" : 46.51,
					"opskins" : 39.55
				},
				0 : {
					"market" : 40.09,
					"analyst" : 35.8,
					"opskins" : 46.99
				}
			}
		}
	},
	"204" : {
		"item_id" : 204,
		"type" : "FAMAS",
		"skinName" : "Contrast Spray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.64,
					"analyst" : 8.34,
					"opskins" : 11
				},
				3 : {
					"market" : 0.84,
					"analyst" : 0.84,
					"opskins" : 0.72
				},
				2 : {
					"market" : 0.32,
					"analyst" : 0.34,
					"opskins" : 0.29
				},
				1 : {
					"market" : 0.57,
					"analyst" : 1.33,
					"opskins" : 15
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.35,
					"opskins" : 0.3
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"205" : {
		"item_id" : 205,
		"type" : "Galil AR",
		"skinName" : "Winter Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 42.25,
					"analyst" : 30.72,
					"opskins" : 30
				},
				3 : {
					"market" : 2.18,
					"analyst" : 2.09,
					"opskins" : 2.41
				},
				2 : {
					"market" : 0.78,
					"analyst" : 0.67,
					"opskins" : 4.2
				},
				1 : {
					"market" : 1.07,
					"analyst" : 1.5,
					"opskins" : 2.01
				},
				0 : {
					"market" : 1.06,
					"analyst" : 0.95,
					"opskins" : 5
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"206" : {
		"item_id" : 206,
		"type" : "G3SG1",
		"skinName" : "Arctic Camo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 22.01,
					"analyst" : 27.77,
					"opskins" : 30
				},
				3 : {
					"market" : 2.31,
					"analyst" : 2.04,
					"opskins" : 10
				},
				2 : {
					"market" : 0.65,
					"analyst" : 0.73,
					"opskins" : 0.73
				},
				1 : {
					"market" : 3.39,
					"analyst" : 1.99,
					"opskins" : 1.5
				},
				0 : {
					"market" : 3.17,
					"analyst" : 5.09,
					"opskins" : 1.55
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"207" : {
		"item_id" : 207,
		"type" : "M249",
		"skinName" : "Blizzard Marbleized",
		"prices" : {
			"default" : {
				4 : {
					"market" : 34.7,
					"analyst" : 21.82,
					"opskins" : 27.9
				},
				3 : {
					"market" : 2.1,
					"analyst" : 2.46,
					"opskins" : 3.13
				},
				2 : {
					"market" : 0.7,
					"analyst" : 0.66,
					"opskins" : 0.69
				},
				1 : {
					"market" : 1.56,
					"analyst" : 2.15,
					"opskins" : 3.33
				},
				0 : {
					"market" : 2.78,
					"analyst" : 4.87,
					"opskins" : 3.88
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"208" : {
		"item_id" : 208,
		"type" : "P2000",
		"skinName" : "Silver",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.82,
					"analyst" : 0.86,
					"opskins" : 0.88
				},
				3 : {
					"market" : 4.92,
					"analyst" : 8.06,
					"opskins" : 11.27
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"209" : {
		"item_id" : 209,
		"type" : "MP7",
		"skinName" : "Whiteout",
		"prices" : {
			"default" : {
				4 : {
					"market" : 365.51,
					"analyst" : 366.03,
					"opskins" : 325
				},
				3 : {
					"market" : 19.6,
					"analyst" : 20.02,
					"opskins" : 18.02
				},
				2 : {
					"market" : 1.27,
					"analyst" : 1.34,
					"opskins" : 1.24
				},
				1 : {
					"market" : 2.23,
					"analyst" : 1.46,
					"opskins" : 2.14
				},
				0 : {
					"market" : 1.46,
					"analyst" : 1.5,
					"opskins" : 3.5
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"210" : {
		"item_id" : 210,
		"type" : "M249",
		"skinName" : "Contrast Spray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.49,
					"analyst" : 0.43,
					"opskins" : 0.34
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 6.5,
					"analyst" : 5.34,
					"opskins" : 6.8
				},
				3 : {
					"market" : 0.29,
					"analyst" : 0.31,
					"opskins" : 0.27
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.22,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.17
				}
			}
		}
	},
	"211" : {
		"item_id" : 211,
		"type" : "UMP-45",
		"skinName" : "Scorched",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.41,
					"analyst" : 0.43,
					"opskins" : 0.44
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.04,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.06,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 7.4,
					"analyst" : 5.81,
					"opskins" : 9.99
				},
				3 : {
					"market" : 0.71,
					"analyst" : 0.76,
					"opskins" : 0.78
				},
				2 : {
					"market" : 0.35,
					"analyst" : 0.33,
					"opskins" : 0.31
				},
				1 : {
					"market" : 0.42,
					"analyst" : 0.43,
					"opskins" : 0.55
				},
				0 : {
					"market" : 0.37,
					"analyst" : 0.38,
					"opskins" : 0.37
				}
			}
		}
	},
	"212" : {
		"item_id" : 212,
		"type" : "MAG-7",
		"skinName" : "Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.38,
					"analyst" : 0.49,
					"opskins" : 0.38
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.04,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.59,
					"analyst" : 4.35,
					"opskins" : 4.19
				},
				3 : {
					"market" : 0.24,
					"analyst" : 0.26,
					"opskins" : 0.69
				},
				2 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.19,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.24,
					"analyst" : 0.24,
					"opskins" : 0.2
				}
			}
		}
	},
	"213" : {
		"item_id" : 213,
		"type" : "MP9",
		"skinName" : "Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.47,
					"analyst" : 0.37,
					"opskins" : 0.38
				},
				3 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.1
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 5.76,
					"analyst" : 5.63,
					"opskins" : 4.89
				},
				3 : {
					"market" : 0.72,
					"analyst" : 0.66,
					"opskins" : 0.59
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.27,
					"opskins" : 0.25
				},
				1 : {
					"market" : 0.83,
					"analyst" : 0.35,
					"opskins" : 2
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.29,
					"opskins" : 0.3
				}
			}
		}
	},
	"214" : {
		"item_id" : 214,
		"type" : "Sawed-Off",
		"skinName" : "Sage Spray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.32,
					"analyst" : 0.39,
					"opskins" : 0.33
				},
				3 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.07,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.06,
					"opskins" : 0.05
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.23,
					"analyst" : 3.51,
					"opskins" : 2.74
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.15,
					"opskins" : 0.14
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.19,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.18,
					"opskins" : 0.17
				}
			}
		}
	},
	"215" : {
		"item_id" : 215,
		"type" : "MP7",
		"skinName" : "Gunsmoke",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.18,
					"analyst" : 3.07,
					"opskins" : 2.83
				},
				3 : {
					"market" : 0.41,
					"analyst" : 0.37,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.19,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.22,
					"opskins" : 0.3
				},
				0 : {
					"market" : 0.16,
					"analyst" : 0.17,
					"opskins" : 1.57
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 44.86,
					"analyst" : 54.9,
					"opskins" : 70
				},
				3 : {
					"market" : 4.6,
					"analyst" : 4.07,
					"opskins" : 5
				},
				2 : {
					"market" : 1.38,
					"analyst" : 1.42,
					"opskins" : 4.4
				},
				1 : {
					"market" : 1.81,
					"analyst" : 2.16,
					"opskins" : 2
				},
				0 : {
					"market" : 7.09,
					"analyst" : 1.04,
					"opskins" : 2
				}
			}
		}
	},
	"216" : {
		"item_id" : 216,
		"type" : "Desert Eagle",
		"skinName" : "Urban DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.36,
					"analyst" : 2.83,
					"opskins" : 2.84
				},
				3 : {
					"market" : 0.36,
					"analyst" : 0.37,
					"opskins" : 0.31
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.18,
					"analyst" : 0.19,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.18,
					"analyst" : 0.18,
					"opskins" : 0.18
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 78.77,
					"analyst" : 72.03,
					"opskins" : 80
				},
				3 : {
					"market" : 7.68,
					"analyst" : 7.08,
					"opskins" : 7.16
				},
				2 : {
					"market" : 3.16,
					"analyst" : 3.15,
					"opskins" : 3.4
				},
				1 : {
					"market" : 4,
					"analyst" : 3.85,
					"opskins" : 3.5
				},
				0 : {
					"market" : 3.62,
					"analyst" : 3.35,
					"opskins" : 5.73
				}
			}
		}
	},
	"217" : {
		"item_id" : 217,
		"type" : "Glock-18",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.9,
					"analyst" : 5.88,
					"opskins" : 6.72
				},
				3 : {
					"market" : 0.37,
					"analyst" : 0.42,
					"opskins" : 0.34
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.2,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.17,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.16
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 127.83,
					"analyst" : 157.63,
					"opskins" : 150
				},
				3 : {
					"market" : 7.94,
					"analyst" : 9.24,
					"opskins" : 10.17
				},
				2 : {
					"market" : 3.04,
					"analyst" : 3.17,
					"opskins" : 3.99
				},
				1 : {
					"market" : 3.84,
					"analyst" : 3.83,
					"opskins" : 7.52
				},
				0 : {
					"market" : 3.17,
					"analyst" : 2.99,
					"opskins" : 2.71
				}
			}
		}
	},
	"218" : {
		"item_id" : 218,
		"type" : "P2000",
		"skinName" : "Grassland",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.57,
					"analyst" : 1.92,
					"opskins" : 1.42
				},
				3 : {
					"market" : 0.27,
					"analyst" : 0.28,
					"opskins" : 0.25
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.19,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.17,
					"analyst" : 0.16,
					"opskins" : 0.14
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 32.25,
					"analyst" : 29.6,
					"opskins" : 30
				},
				3 : {
					"market" : 1.65,
					"analyst" : 1.71,
					"opskins" : 1.7
				},
				2 : {
					"market" : 0.59,
					"analyst" : 0.71,
					"opskins" : 0.7
				},
				1 : {
					"market" : 0.96,
					"analyst" : 0.93,
					"opskins" : 1.16
				},
				0 : {
					"market" : 0.93,
					"analyst" : 0.81,
					"opskins" : 3.38
				}
			}
		}
	},
	"219" : {
		"item_id" : 219,
		"type" : "CZ75-Auto",
		"skinName" : "Nitro",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.39,
					"analyst" : 7.25,
					"opskins" : 8
				},
				3 : {
					"market" : 1.89,
					"analyst" : 1.95,
					"opskins" : 1.95
				},
				2 : {
					"market" : 1.33,
					"analyst" : 1.48,
					"opskins" : 1.28
				},
				1 : {
					"market" : 1.46,
					"analyst" : 1.51,
					"opskins" : 1.35
				},
				0 : {
					"market" : 1.28,
					"analyst" : 1.42,
					"opskins" : 1.28
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 600
				},
				3 : {
					"market" : 14.81,
					"analyst" : 11.97,
					"opskins" : 11.99
				},
				2 : {
					"market" : 3.54,
					"analyst" : 3.39,
					"opskins" : 3.34
				},
				1 : {
					"market" : 5.2,
					"analyst" : 5.78,
					"opskins" : 30
				},
				0 : {
					"market" : 4.33,
					"analyst" : 4,
					"opskins" : 5.7
				}
			}
		}
	},
	"220" : {
		"item_id" : 220,
		"type" : "SSG 08",
		"skinName" : "Detour",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.14,
					"analyst" : 3.1,
					"opskins" : 2.96
				},
				3 : {
					"market" : 1.57,
					"analyst" : 1.85,
					"opskins" : 1.49
				},
				2 : {
					"market" : 1.31,
					"analyst" : 1.54,
					"opskins" : 1.3
				},
				1 : {
					"market" : 1.58,
					"analyst" : 1.44,
					"opskins" : 1.43
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 37.8,
					"analyst" : 40.36,
					"opskins" : 39.9
				},
				3 : {
					"market" : 21.5,
					"analyst" : 21.45,
					"opskins" : 20
				},
				2 : {
					"market" : 12.7,
					"analyst" : 12.59,
					"opskins" : 10.7
				},
				1 : {
					"market" : 19.95,
					"analyst" : 14.2,
					"opskins" : 49.99
				}
			}
		}
	},
	"221" : {
		"item_id" : 221,
		"type" : "XM1014",
		"skinName" : "VariCamo Blue",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.17,
					"analyst" : 3.24,
					"opskins" : 2.99
				},
				3 : {
					"market" : 2.32,
					"analyst" : 2.17,
					"opskins" : 1.65
				},
				2 : {
					"market" : 1.45,
					"analyst" : 1.47,
					"opskins" : 1.3
				},
				1 : {
					"market" : 1.98,
					"analyst" : 1.64,
					"opskins" : 1.2
				},
				0 : {
					"market" : 1.75,
					"analyst" : 1.43,
					"opskins" : 1.31
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 4.26,
					"analyst" : 5.34,
					"opskins" : 5
				},
				3 : {
					"market" : 4.43,
					"analyst" : 2.87,
					"opskins" : 5
				},
				2 : {
					"market" : 2.11,
					"analyst" : 1.97,
					"opskins" : 1.72
				},
				1 : {
					"market" : 4.14,
					"analyst" : 3.28,
					"opskins" : 2.59
				},
				0 : {
					"market" : 2.64,
					"analyst" : -1,
					"opskins" : 6.3
				}
			}
		}
	},
	"222" : {
		"item_id" : 222,
		"type" : "USP-S",
		"skinName" : "Road Rash",
		"prices" : {
			"default" : {
				4 : {
					"market" : 14.1,
					"analyst" : 14.64,
					"opskins" : 13.4
				},
				3 : {
					"market" : 9.12,
					"analyst" : 9.68,
					"opskins" : 8.5
				},
				2 : {
					"market" : 6.36,
					"analyst" : 6.94,
					"opskins" : 6.28
				},
				1 : {
					"market" : 5.95,
					"analyst" : 6.35,
					"opskins" : 5.9
				},
				0 : {
					"market" : 5.7,
					"analyst" : 5.86,
					"opskins" : 5.85
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 300
				},
				3 : {
					"market" : 149.99,
					"analyst" : 63.25,
					"opskins" : 400
				},
				2 : {
					"market" : 54.12,
					"analyst" : 46.86,
					"opskins" : 50
				},
				1 : {
					"market" : 36.03,
					"analyst" : 33.97,
					"opskins" : 40
				},
				0 : {
					"market" : 61.44,
					"analyst" : 45.4,
					"opskins" : 40
				}
			}
		}
	},
	"223" : {
		"item_id" : 223,
		"type" : "M4A1-S",
		"skinName" : "Master Piece",
		"prices" : {
			"default" : {
				4 : {
					"market" : 100.99,
					"analyst" : 89.8,
					"opskins" : 72.22
				},
				3 : {
					"market" : 39.64,
					"analyst" : 39.27,
					"opskins" : 34.23
				},
				2 : {
					"market" : 24.88,
					"analyst" : 25.31,
					"opskins" : 23.29
				},
				1 : {
					"market" : 18.1,
					"analyst" : 19.53,
					"opskins" : 17.36
				},
				0 : {
					"market" : 16.99,
					"analyst" : 17.34,
					"opskins" : 16.19
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 411.77,
					"analyst" : 1013,
					"opskins" : 631.58
				},
				2 : {
					"market" : 343.88,
					"analyst" : 198,
					"opskins" : 259
				},
				1 : {
					"market" : 211.89,
					"analyst" : 258.33,
					"opskins" : 179
				},
				0 : {
					"market" : 210.83,
					"analyst" : 206.95,
					"opskins" : 209.99
				}
			}
		}
	},
	"224" : {
		"item_id" : 224,
		"type" : "G3SG1",
		"skinName" : "Orange Kimono",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.24,
					"analyst" : 0.27,
					"opskins" : 0.2
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.05,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.09,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.04
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"225" : {
		"item_id" : 225,
		"type" : "Tec-9",
		"skinName" : "Bamboo Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.27,
					"analyst" : 0.31,
					"opskins" : 0.28
				},
				3 : {
					"market" : 0.14,
					"analyst" : 0.14,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.06,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.1
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.08
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"226" : {
		"item_id" : 226,
		"type" : "P250",
		"skinName" : "Mint Kimono",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.27,
					"analyst" : 0.29,
					"opskins" : 0.24
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.06
				},
				0 : {
					"market" : 0.07,
					"analyst" : 0.04,
					"opskins" : 0.04
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"227" : {
		"item_id" : 227,
		"type" : "PP-Bizon",
		"skinName" : "Bamboo Print",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.23
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.05
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"228" : {
		"item_id" : 228,
		"type" : "Sawed-Off",
		"skinName" : "Bamboo Shadow",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.18,
					"analyst" : 0.21,
					"opskins" : 0.19
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.1
				},
				1 : {
					"market" : 0.29,
					"analyst" : 0.3,
					"opskins" : 0.6
				},
				0 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.3
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"229" : {
		"item_id" : 229,
		"type" : "Desert Eagle",
		"skinName" : "Midnight Storm",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.65,
					"analyst" : 2.66,
					"opskins" : 2.21
				},
				3 : {
					"market" : 1.31,
					"analyst" : 1.4,
					"opskins" : 1.17
				},
				2 : {
					"market" : 0.29,
					"analyst" : 0.31,
					"opskins" : 0.28
				},
				1 : {
					"market" : 0.76,
					"analyst" : 0.88,
					"opskins" : 0.86
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.29,
					"opskins" : 0.28
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"230" : {
		"item_id" : 230,
		"type" : "P250",
		"skinName" : "Crimson Kimono",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.74,
					"analyst" : 0.75,
					"opskins" : 0.62
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.29,
					"opskins" : 0.26
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.28,
					"analyst" : 0.25,
					"opskins" : 0.36
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.23,
					"opskins" : 0.21
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"231" : {
		"item_id" : 231,
		"type" : "Tec-9",
		"skinName" : "Terrace",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.61,
					"analyst" : 4.96,
					"opskins" : 4.57
				},
				3 : {
					"market" : 2.11,
					"analyst" : 2.32,
					"opskins" : 2.28
				},
				2 : {
					"market" : 2.13,
					"analyst" : 2.08,
					"opskins" : 1.92
				},
				1 : {
					"market" : 2,
					"analyst" : 1.83,
					"opskins" : 1.99
				},
				0 : {
					"market" : 2,
					"analyst" : 1.53,
					"opskins" : 2.29
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"232" : {
		"item_id" : 232,
		"type" : "Galil AR",
		"skinName" : "Aqua Terrace",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.47,
					"analyst" : 3.31,
					"opskins" : 3.08
				},
				3 : {
					"market" : 2.15,
					"analyst" : 2.26,
					"opskins" : 2.22
				},
				2 : {
					"market" : 2.1,
					"analyst" : 2.11,
					"opskins" : 1.89
				},
				1 : {
					"market" : 2.16,
					"analyst" : 2.07,
					"opskins" : 1.87
				},
				0 : {
					"market" : 2.13,
					"analyst" : 1.99,
					"opskins" : 1.79
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"233" : {
		"item_id" : 233,
		"type" : "MAG-7",
		"skinName" : "Counter Terrace",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.77,
					"analyst" : 3.05,
					"opskins" : 2.8
				},
				3 : {
					"market" : 2.31,
					"analyst" : 2.27,
					"opskins" : 2.2
				},
				2 : {
					"market" : 2.1,
					"analyst" : 2.04,
					"opskins" : 1.92
				},
				1 : {
					"market" : 2.27,
					"analyst" : 3.9,
					"opskins" : 1.87
				},
				0 : {
					"market" : 59.54,
					"analyst" : 3.04,
					"opskins" : 50
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"234" : {
		"item_id" : 234,
		"type" : "M4A4",
		"skinName" : "Daybreak",
		"prices" : {
			"default" : {
				4 : {
					"market" : 11.87,
					"analyst" : 12.81,
					"opskins" : 11.45
				},
				3 : {
					"market" : 9.7,
					"analyst" : 10.07,
					"opskins" : 8.96
				},
				2 : {
					"market" : 7.97,
					"analyst" : 7,
					"opskins" : 6.28
				},
				1 : {
					"market" : 19.49,
					"analyst" : 6.35,
					"opskins" : 5.5
				},
				0 : {
					"market" : 7.07,
					"analyst" : 6.35,
					"opskins" : 6.35
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"235" : {
		"item_id" : 235,
		"type" : "Desert Eagle",
		"skinName" : "Sunset Storm 壱",
		"prices" : {
			"default" : {
				4 : {
					"market" : 13.8,
					"analyst" : 14.01,
					"opskins" : -1
				},
				3 : {
					"market" : 12.19,
					"analyst" : 11.03,
					"opskins" : -1
				},
				2 : {
					"market" : 8.31,
					"analyst" : 6.85,
					"opskins" : -1
				},
				1 : {
					"market" : 7.42,
					"analyst" : 8.09,
					"opskins" : -1
				},
				0 : {
					"market" : 7.3,
					"analyst" : 8.44,
					"opskins" : -1
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"236" : {
		"item_id" : 236,
		"type" : "Desert Eagle",
		"skinName" : "Sunset Storm 弐",
		"prices" : {
			"default" : {
				4 : {
					"market" : 13.4,
					"analyst" : 13.2,
					"opskins" : -1
				},
				3 : {
					"market" : 11.09,
					"analyst" : 11,
					"opskins" : -1
				},
				2 : {
					"market" : 8.39,
					"analyst" : 7.19,
					"opskins" : -1
				},
				1 : {
					"market" : 10.39,
					"analyst" : 13.85,
					"opskins" : -1
				},
				0 : {
					"market" : 8.1,
					"analyst" : 7.1,
					"opskins" : -1
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"237" : {
		"item_id" : 237,
		"type" : "Five-SeveN",
		"skinName" : "Neon Kimono",
		"prices" : {
			"default" : {
				4 : {
					"market" : 13.8,
					"analyst" : 12.52,
					"opskins" : 10.99
				},
				3 : {
					"market" : 10.07,
					"analyst" : 11.67,
					"opskins" : 10.99
				},
				2 : {
					"market" : 7.71,
					"analyst" : 7,
					"opskins" : 6.19
				},
				1 : {
					"market" : 9.2,
					"analyst" : 7.14,
					"opskins" : 10
				},
				0 : {
					"market" : 7.87,
					"analyst" : 5.59,
					"opskins" : 6.99
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"238" : {
		"item_id" : 238,
		"type" : "MP7",
		"skinName" : "Army Recon",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.3
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 49.99,
					"analyst" : -1,
					"opskins" : 27.78
				},
				3 : {
					"market" : 2.77,
					"analyst" : 2.86,
					"opskins" : 3.5
				},
				2 : {
					"market" : 1.12,
					"analyst" : 1.36,
					"opskins" : 1.23
				},
				1 : {
					"market" : 2.3,
					"analyst" : 3.35,
					"opskins" : 5.12
				},
				0 : {
					"market" : 1.54,
					"analyst" : 1.44,
					"opskins" : 6
				}
			}
		}
	},
	"239" : {
		"item_id" : 239,
		"type" : "Tec-9",
		"skinName" : "Army Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 4.68,
					"analyst" : 5.59,
					"opskins" : 5.13
				},
				3 : {
					"market" : 2.54,
					"analyst" : 5.47,
					"opskins" : 9.24
				},
				2 : {
					"market" : 1.39,
					"analyst" : 5.33,
					"opskins" : 4.53
				},
				1 : {
					"market" : 2.43,
					"analyst" : 9.97,
					"opskins" : 8
				},
				0 : {
					"market" : 1.24,
					"analyst" : 12.16,
					"opskins" : 11.11
				}
			}
		}
	},
	"240" : {
		"item_id" : 240,
		"type" : "SSG 08",
		"skinName" : "Blue Spruce",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.18,
					"analyst" : 0.18,
					"opskins" : 0.17
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 80,
					"analyst" : -1,
					"opskins" : 90
				},
				3 : {
					"market" : 3.39,
					"analyst" : 7.57,
					"opskins" : 7
				},
				2 : {
					"market" : 1.26,
					"analyst" : 2.73,
					"opskins" : 1.99
				},
				1 : {
					"market" : 3.02,
					"analyst" : 3.93,
					"opskins" : 2.83
				},
				0 : {
					"market" : 2.62,
					"analyst" : 2.9,
					"opskins" : 30
				}
			}
		}
	},
	"241" : {
		"item_id" : 241,
		"type" : "SCAR-20",
		"skinName" : "Contractor",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.11
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 1.5,
					"analyst" : 1.95,
					"opskins" : 3
				},
				2 : {
					"market" : 0.53,
					"analyst" : 0.58,
					"opskins" : 3.99
				},
				1 : {
					"market" : 2.13,
					"analyst" : 1.95,
					"opskins" : 3
				},
				0 : {
					"market" : 2.15,
					"analyst" : 2.29,
					"opskins" : 2.43
				}
			}
		}
	},
	"242" : {
		"item_id" : 242,
		"type" : "Dual Berettas",
		"skinName" : "Contractor",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.08
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 31.79,
					"analyst" : 29.88,
					"opskins" : 14.38
				},
				3 : {
					"market" : 1.93,
					"analyst" : 3.2,
					"opskins" : 2.24
				},
				2 : {
					"market" : 0.8,
					"analyst" : 2.12,
					"opskins" : 2.27
				},
				1 : {
					"market" : 2.13,
					"analyst" : 2.17,
					"opskins" : 2.11
				},
				0 : {
					"market" : 1.17,
					"analyst" : 1.55,
					"opskins" : 1.26
				}
			}
		}
	},
	"243" : {
		"item_id" : 243,
		"type" : "MP9",
		"skinName" : "Orange Peel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.25,
					"analyst" : 0.23,
					"opskins" : 0.17
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 2.73,
					"analyst" : 10.64,
					"opskins" : 19
				},
				2 : {
					"market" : 2,
					"analyst" : 2.84,
					"opskins" : 10
				},
				1 : {
					"market" : 100.23,
					"analyst" : -1,
					"opskins" : 9.63
				},
				0 : {
					"market" : 11.57,
					"analyst" : -1,
					"opskins" : 5.56
				}
			}
		}
	},
	"244" : {
		"item_id" : 244,
		"type" : "AUG",
		"skinName" : "Condemned",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.65,
					"analyst" : 0.68,
					"opskins" : 0.76
				},
				3 : {
					"market" : 0.06,
					"analyst" : 0.05,
					"opskins" : 0.04
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 23.61,
					"analyst" : 23.77,
					"opskins" : 40.9
				},
				2 : {
					"market" : 5.06,
					"analyst" : 5.49,
					"opskins" : 6
				},
				1 : {
					"market" : 14.58,
					"analyst" : 11.97,
					"opskins" : 11
				},
				0 : {
					"market" : 20.98,
					"analyst" : 7.88,
					"opskins" : 9.62
				}
			}
		}
	},
	"245" : {
		"item_id" : 245,
		"type" : "USP-S",
		"skinName" : "Forest Leaves",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.61,
					"analyst" : 0.56,
					"opskins" : 0.51
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.04
				},
				1 : {
					"market" : 0.06,
					"analyst" : 0.05,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.07,
					"analyst" : 0.05,
					"opskins" : 0.05
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 18.98,
					"analyst" : 33.61,
					"opskins" : 33.61
				},
				2 : {
					"market" : 8.85,
					"analyst" : 11.9,
					"opskins" : 16.43
				},
				1 : {
					"market" : 18.28,
					"analyst" : 20.6,
					"opskins" : -1
				},
				0 : {
					"market" : 28.1,
					"analyst" : 21.24,
					"opskins" : 19.6
				}
			}
		}
	},
	"246" : {
		"item_id" : 246,
		"type" : "Galil AR",
		"skinName" : "VariCamo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 63.59,
					"analyst" : 32.86,
					"opskins" : 38
				},
				3 : {
					"market" : 8.57,
					"analyst" : 8.05,
					"opskins" : 6.95
				},
				2 : {
					"market" : 2.13,
					"analyst" : 3.33,
					"opskins" : 2.05
				},
				1 : {
					"market" : 64.46,
					"analyst" : -1,
					"opskins" : 50
				},
				0 : {
					"market" : 12.43,
					"analyst" : -1,
					"opskins" : 30
				}
			}
		}
	},
	"247" : {
		"item_id" : 247,
		"type" : "M249",
		"skinName" : "Gator Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 16.46,
					"analyst" : 19.41,
					"opskins" : 14.13
				},
				3 : {
					"market" : 4.64,
					"analyst" : 5.18,
					"opskins" : 4.6
				},
				2 : {
					"market" : 2.73,
					"analyst" : 3.1,
					"opskins" : 32
				},
				1 : {
					"market" : 108.02,
					"analyst" : -1,
					"opskins" : -1
				},
				0 : {
					"market" : 11.57,
					"analyst" : 16.88,
					"opskins" : 35
				}
			}
		}
	},
	"248" : {
		"item_id" : 248,
		"type" : "G3SG1",
		"skinName" : "VariCamo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 40.76,
					"analyst" : 39.32,
					"opskins" : 28
				},
				3 : {
					"market" : 5.3,
					"analyst" : 4.57,
					"opskins" : 3.5
				},
				2 : {
					"market" : 4,
					"analyst" : 7.44,
					"opskins" : 7.31
				},
				1 : {
					"market" : 397.52,
					"analyst" : 26.55,
					"opskins" : -1
				},
				0 : {
					"market" : 9.03,
					"analyst" : 5.21,
					"opskins" : 52
				}
			}
		}
	},
	"249" : {
		"item_id" : 249,
		"type" : "FAMAS",
		"skinName" : "Teardown",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.26,
					"analyst" : 0.3,
					"opskins" : 0.23
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.14
				},
				2 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				1 : {
					"market" : 0.12,
					"analyst" : 0.14,
					"opskins" : 0.11
				},
				0 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.1
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 248,
					"analyst" : 41.33,
					"opskins" : 69.99
				},
				3 : {
					"market" : 15.87,
					"analyst" : 27.83,
					"opskins" : 27.52
				},
				2 : {
					"market" : 6.63,
					"analyst" : 9.48,
					"opskins" : 6.23
				},
				1 : {
					"market" : 34,
					"analyst" : -1,
					"opskins" : 21.01
				},
				0 : {
					"market" : 400,
					"analyst" : 17.5,
					"opskins" : -1
				}
			}
		}
	},
	"250" : {
		"item_id" : 250,
		"type" : "SSG 08",
		"skinName" : "Acid Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.34,
					"analyst" : 0.38,
					"opskins" : 0.35
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 46,
					"analyst" : 43.37,
					"opskins" : 60
				}
			}
		}
	},
	"251" : {
		"item_id" : 251,
		"type" : "M4A1-S",
		"skinName" : "Nitro",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.06,
					"analyst" : 3.39,
					"opskins" : 2.84
				},
				3 : {
					"market" : 1.69,
					"analyst" : 1.76,
					"opskins" : 1.43
				},
				2 : {
					"market" : 0.92,
					"analyst" : 1.03,
					"opskins" : 0.85
				},
				1 : {
					"market" : 1.16,
					"analyst" : 1.24,
					"opskins" : 1.1
				},
				0 : {
					"market" : 0.93,
					"analyst" : 0.99,
					"opskins" : 0.85
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 145.55,
					"analyst" : -1,
					"opskins" : 202
				},
				2 : {
					"market" : 76.7,
					"analyst" : 86.79,
					"opskins" : 199
				},
				1 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				0 : {
					"market" : 132.43,
					"analyst" : -1,
					"opskins" : 120
				}
			}
		}
	},
	"252" : {
		"item_id" : 252,
		"type" : "PP-Bizon",
		"skinName" : "Urban Dashed",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.09
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 6,
					"analyst" : 4.84,
					"opskins" : 3.33
				},
				3 : {
					"market" : 0.3,
					"analyst" : 0.33,
					"opskins" : 0.27
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.23,
					"opskins" : 0.19
				}
			}
		}
	},
	"253" : {
		"item_id" : 253,
		"type" : "Nova",
		"skinName" : "Polar Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.08
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 6.34,
					"analyst" : 7.32,
					"opskins" : 4.21
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.24,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.14,
					"opskins" : 0.14
				},
				1 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.18,
					"analyst" : 0.16,
					"opskins" : 0.15
				}
			}
		}
	},
	"254" : {
		"item_id" : 254,
		"type" : "Five-SeveN",
		"skinName" : "Forest Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.13,
					"analyst" : 0.13,
					"opskins" : 0.11
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 20.7,
					"analyst" : 14.93,
					"opskins" : 17.99
				},
				3 : {
					"market" : 0.89,
					"analyst" : 0.94,
					"opskins" : 0.96
				},
				2 : {
					"market" : 0.32,
					"analyst" : 0.37,
					"opskins" : 0.32
				},
				1 : {
					"market" : 0.58,
					"analyst" : 0.51,
					"opskins" : 0.51
				},
				0 : {
					"market" : 0.34,
					"analyst" : 0.4,
					"opskins" : 0.4
				}
			}
		}
	},
	"255" : {
		"item_id" : 255,
		"type" : "G3SG1",
		"skinName" : "Polar Camo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.08
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.06
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.05
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 16.95,
					"analyst" : 13.04,
					"opskins" : 15.65
				},
				3 : {
					"market" : 0.62,
					"analyst" : 0.66,
					"opskins" : 1.93
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.19,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.23,
					"opskins" : 0.23
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.23,
					"opskins" : 0.22
				}
			}
		}
	},
	"256" : {
		"item_id" : 256,
		"type" : "Dual Berettas",
		"skinName" : "Colony",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.02
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.69,
					"analyst" : 5.01,
					"opskins" : 3.69
				},
				3 : {
					"market" : 0.29,
					"analyst" : 0.26,
					"opskins" : 0.26
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.17,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.3,
					"analyst" : 0.24,
					"opskins" : 0.35
				},
				0 : {
					"market" : 0.24,
					"analyst" : 0.24,
					"opskins" : 0.23
				}
			}
		}
	},
	"257" : {
		"item_id" : 257,
		"type" : "UMP-45",
		"skinName" : "Urban DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				2 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				0 : {
					"market" : 0.03,
					"analyst" : 0.03,
					"opskins" : 0.02
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 8.62,
					"analyst" : 10.89,
					"opskins" : 13
				},
				3 : {
					"market" : 1.2,
					"analyst" : 1.26,
					"opskins" : 8
				},
				2 : {
					"market" : 0.42,
					"analyst" : 0.39,
					"opskins" : 0.39
				},
				1 : {
					"market" : 0.64,
					"analyst" : 0.58,
					"opskins" : 0.5
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.39,
					"opskins" : 0.43
				}
			}
		}
	},
	"258" : {
		"item_id" : 258,
		"type" : "M4A4",
		"skinName" : "Urban DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.21,
					"analyst" : 2.22,
					"opskins" : 2.34
				},
				3 : {
					"market" : 0.32,
					"analyst" : 0.33,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.07,
					"analyst" : 0.06,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.14,
					"analyst" : 0.13,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.07,
					"analyst" : 0.06,
					"opskins" : 0.09
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 71.81,
					"analyst" : 78.43,
					"opskins" : 110
				},
				3 : {
					"market" : 8.6,
					"analyst" : 8.63,
					"opskins" : 7.89
				},
				2 : {
					"market" : 2.76,
					"analyst" : 2.99,
					"opskins" : 2.71
				},
				1 : {
					"market" : 2.92,
					"analyst" : 3.46,
					"opskins" : 3.43
				},
				0 : {
					"market" : 2.77,
					"analyst" : 2.65,
					"opskins" : 2.3
				}
			}
		}
	},
	"259" : {
		"item_id" : 259,
		"type" : "MAC-10",
		"skinName" : "Candy Apple",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 3.31,
					"analyst" : 3,
					"opskins" : 2.89
				},
				3 : {
					"market" : 1.34,
					"analyst" : 1.46,
					"opskins" : 1.4
				},
				2 : {
					"market" : 1.53,
					"analyst" : 1.2,
					"opskins" : 0.98
				}
			}
		}
	},
	"260" : {
		"item_id" : 260,
		"type" : "P90",
		"skinName" : "Ash Wood",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.04
				},
				3 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				2 : {
					"market" : 0.04,
					"analyst" : 0.03,
					"opskins" : 0.02
				},
				1 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 1.99,
					"analyst" : 2.24,
					"opskins" : 2
				},
				3 : {
					"market" : 1.81,
					"analyst" : 1.2,
					"opskins" : 1.08
				},
				2 : {
					"market" : 0.69,
					"analyst" : 0.71,
					"opskins" : 0.51
				},
				1 : {
					"market" : 1.24,
					"analyst" : 1.77,
					"opskins" : 2.05
				}
			}
		}
	},
	"261" : {
		"item_id" : 261,
		"type" : "SCAR-20",
		"skinName" : "Carbon Fiber",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 1.18,
					"analyst" : 1.28,
					"opskins" : 0.9
				},
				3 : {
					"market" : 1.38,
					"analyst" : 1.51,
					"opskins" : 1.06
				}
			}
		}
	},
	"262" : {
		"item_id" : 262,
		"type" : "MAG-7",
		"skinName" : "Metallic DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.03,
					"opskins" : 0.03
				},
				3 : {
					"market" : 0.06,
					"analyst" : 0.04,
					"opskins" : 0.04
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 0.59,
					"analyst" : 0.67,
					"opskins" : 0.56
				},
				3 : {
					"market" : 3.91,
					"analyst" : 2.87,
					"opskins" : 4.25
				}
			}
		}
	},
	"263" : {
		"item_id" : 263,
		"type" : "P250",
		"skinName" : "Metallic DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.05,
					"analyst" : 0.04,
					"opskins" : 0.04
				},
				3 : {
					"market" : 0.07,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 2.54,
					"analyst" : 2.45,
					"opskins" : 1.95
				},
				3 : {
					"market" : 5.89,
					"analyst" : 6.59,
					"opskins" : 6.45
				}
			}
		}
	},
	"264" : {
		"item_id" : 264,
		"type" : "Five-SeveN",
		"skinName" : "Silver Quartz",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.23
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				2 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.2,
					"opskins" : 0.23
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 89.99,
					"analyst" : 74.81,
					"opskins" : 63
				},
				3 : {
					"market" : 55.62,
					"analyst" : 34.25,
					"opskins" : -1
				},
				2 : {
					"market" : 17.79,
					"analyst" : 14.83,
					"opskins" : 10.5
				},
				1 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				}
			}
		}
	},
	"265" : {
		"item_id" : 265,
		"type" : "Sawed-Off",
		"skinName" : "Amber Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.12,
					"opskins" : 0.11
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.14
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.15
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 2,
					"analyst" : 2.8,
					"opskins" : 2.4
				},
				3 : {
					"market" : 0.96,
					"analyst" : 1.32,
					"opskins" : 0.92
				},
				2 : {
					"market" : 0.63,
					"analyst" : 0.7,
					"opskins" : 0.5
				},
				1 : {
					"market" : 2.39,
					"analyst" : 3.85,
					"opskins" : 4.88
				}
			}
		}
	},
	"266" : {
		"item_id" : 266,
		"type" : "Desert Eagle",
		"skinName" : "Urban Rubble",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.09,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 0.23
				},
				0 : {
					"market" : 0.13,
					"analyst" : 0.14,
					"opskins" : 0.21
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 8.05,
					"analyst" : 8.79,
					"opskins" : 8
				},
				3 : {
					"market" : 6.22,
					"analyst" : 4.53,
					"opskins" : 3.8
				},
				2 : {
					"market" : 4.46,
					"analyst" : 3.26,
					"opskins" : 3.18
				},
				1 : {
					"market" : 5.31,
					"analyst" : 5.1,
					"opskins" : 6.5
				},
				0 : {
					"market" : 4.84,
					"analyst" : 6.74,
					"opskins" : 150
				}
			}
		}
	},
	"267" : {
		"item_id" : 267,
		"type" : "Tec-9",
		"skinName" : "Red Quartz",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.19
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.17
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.14
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.2
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 21,
					"analyst" : 21.08,
					"opskins" : 18.89
				},
				3 : {
					"market" : 11.07,
					"analyst" : 11.77,
					"opskins" : 15.98
				},
				2 : {
					"market" : 6.9,
					"analyst" : 5.65,
					"opskins" : 6.99
				},
				1 : {
					"market" : 19.51,
					"analyst" : -1,
					"opskins" : 38.2
				}
			}
		}
	},
	"268" : {
		"item_id" : 268,
		"type" : "XM1014",
		"skinName" : "Urban Perforated",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.69,
					"analyst" : 3.3,
					"opskins" : 15
				},
				3 : {
					"market" : 0.46,
					"analyst" : 0.45,
					"opskins" : 0.39
				},
				2 : {
					"market" : 0.36,
					"analyst" : 0.38,
					"opskins" : 0.6
				},
				1 : {
					"market" : 0.41,
					"analyst" : 0.43,
					"opskins" : 0.34
				},
				0 : {
					"market" : 0.41,
					"analyst" : 0.5,
					"opskins" : 0.58
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"269" : {
		"item_id" : 269,
		"type" : "MAC-10",
		"skinName" : "Urban DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.6,
					"analyst" : 2.96,
					"opskins" : 3.3
				},
				3 : {
					"market" : 0.46,
					"analyst" : 0.46,
					"opskins" : 0.5
				},
				2 : {
					"market" : 0.36,
					"analyst" : 0.37,
					"opskins" : 1.45
				},
				1 : {
					"market" : 1.58,
					"analyst" : 2.9,
					"opskins" : 2.8
				},
				0 : {
					"market" : 0.42,
					"analyst" : 0.44,
					"opskins" : 1.57
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"270" : {
		"item_id" : 270,
		"type" : "PP-Bizon",
		"skinName" : "Carbon Fiber",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.77,
					"analyst" : 4.21,
					"opskins" : 4.03
				},
				3 : {
					"market" : 3.53,
					"analyst" : 3.22,
					"opskins" : 3.77
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"271" : {
		"item_id" : 271,
		"type" : "P90",
		"skinName" : "Glacier Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.02,
					"analyst" : 10.22,
					"opskins" : 10.81
				},
				3 : {
					"market" : 1.32,
					"analyst" : 1.31,
					"opskins" : 1.48
				},
				2 : {
					"market" : 0.78,
					"analyst" : 0.85,
					"opskins" : 0.91
				},
				1 : {
					"market" : 7.47,
					"analyst" : 2.57,
					"opskins" : 1.54
				},
				0 : {
					"market" : 3.6,
					"analyst" : -1,
					"opskins" : 6
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"272" : {
		"item_id" : 272,
		"type" : "AK-47",
		"skinName" : "Black Laminate",
		"prices" : {
			"default" : {
				4 : {
					"market" : 123.44,
					"analyst" : 128.41,
					"opskins" : 109
				},
				3 : {
					"market" : 6.36,
					"analyst" : 6.59,
					"opskins" : 6.19
				},
				2 : {
					"market" : 5.46,
					"analyst" : 5.57,
					"opskins" : 5.4
				},
				1 : {
					"market" : 5.67,
					"analyst" : 5.54,
					"opskins" : 5.53
				},
				0 : {
					"market" : 6.21,
					"analyst" : 5.67,
					"opskins" : 5.5
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"273" : {
		"item_id" : 273,
		"type" : "Dual Berettas",
		"skinName" : "Demolition",
		"prices" : {
			"default" : {
				2 : {
					"market" : 1.08,
					"analyst" : 1.06,
					"opskins" : 1.05
				},
				1 : {
					"market" : 1.15,
					"analyst" : 0.93,
					"opskins" : 0.94
				},
				0 : {
					"market" : 3.38,
					"analyst" : 1.33,
					"opskins" : 4.5
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"274" : {
		"item_id" : 274,
		"type" : "XM1014",
		"skinName" : "Slipstream",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.15
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.07,
					"analyst" : 1.07,
					"opskins" : 0.85
				},
				3 : {
					"market" : 0.49,
					"analyst" : 0.5,
					"opskins" : 0.41
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.28,
					"analyst" : 0.23,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.21,
					"opskins" : 0.2
				}
			},
			"souvenir" : {}
		}
	},
	"275" : {
		"item_id" : 275,
		"type" : "UMP-45",
		"skinName" : "Briefing",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.96,
					"analyst" : 0.95,
					"opskins" : 0.83
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.13
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.03
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.03
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 5.86,
					"analyst" : 5.61,
					"opskins" : 4.89
				},
				3 : {
					"market" : 1.24,
					"analyst" : 1.27,
					"opskins" : 1.01
				},
				2 : {
					"market" : 0.73,
					"analyst" : 0.63,
					"opskins" : 0.5
				},
				1 : {
					"market" : 0.39,
					"analyst" : 0.42,
					"opskins" : 0.37
				},
				0 : {
					"market" : 0.36,
					"analyst" : 0.32,
					"opskins" : 0.27
				}
			},
			"souvenir" : {}
		}
	},
	"276" : {
		"item_id" : 276,
		"type" : "P90",
		"skinName" : "Grim",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.06,
					"analyst" : 1.15,
					"opskins" : 1
				},
				3 : {
					"market" : 0.49,
					"analyst" : 0.51,
					"opskins" : 0.42
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.21
				},
				1 : {
					"market" : 0.46,
					"analyst" : 0.45,
					"opskins" : 0.36
				},
				0 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.16
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.26,
					"analyst" : 5.01,
					"opskins" : 4.6
				},
				3 : {
					"market" : 2.02,
					"analyst" : 1.91,
					"opskins" : 1.63
				},
				2 : {
					"market" : 1.03,
					"analyst" : 0.99,
					"opskins" : 0.8
				},
				1 : {
					"market" : 1.69,
					"analyst" : 1.73,
					"opskins" : 1.44
				},
				0 : {
					"market" : 0.87,
					"analyst" : 0.92,
					"opskins" : 0.75
				}
			},
			"souvenir" : {}
		}
	},
	"277" : {
		"item_id" : 277,
		"type" : "Negev",
		"skinName" : "Dazzle",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.14,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.06,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				3 : {
					"market" : 1.05,
					"analyst" : 0.89,
					"opskins" : 0.75
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.23,
					"opskins" : 0.29
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.17
				}
			},
			"souvenir" : {}
		}
	},
	"278" : {
		"item_id" : 278,
		"type" : "G3SG1",
		"skinName" : "Ventilator",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.18,
					"analyst" : 0.17,
					"opskins" : 0.14
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1,
					"analyst" : 1.05,
					"opskins" : 0.85
				},
				3 : {
					"market" : 0.48,
					"analyst" : 0.47,
					"opskins" : 0.38
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.25,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.32,
					"analyst" : 0.34,
					"opskins" : 0.28
				}
			},
			"souvenir" : {}
		}
	},
	"279" : {
		"item_id" : 279,
		"type" : "Five-SeveN",
		"skinName" : "Scumbria",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.23,
					"analyst" : 0.28,
					"opskins" : 0.22
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.75,
					"analyst" : 1.9,
					"opskins" : 1.58
				},
				3 : {
					"market" : 0.63,
					"analyst" : 0.65,
					"opskins" : 0.53
				},
				2 : {
					"market" : 0.47,
					"analyst" : 0.47,
					"opskins" : 0.4
				},
				1 : {
					"market" : 0.43,
					"analyst" : 0.46,
					"opskins" : 0.37
				},
				0 : {
					"market" : 0.46,
					"analyst" : 0.46,
					"opskins" : 0.39
				}
			},
			"souvenir" : {}
		}
	},
	"280" : {
		"item_id" : 280,
		"type" : "CZ75-Auto",
		"skinName" : "Imprint",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.09,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.5,
					"analyst" : 1.49,
					"opskins" : 1.33
				},
				3 : {
					"market" : 0.47,
					"analyst" : 0.46,
					"opskins" : 0.36
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.16
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.2,
					"opskins" : 0.17
				}
			},
			"souvenir" : {}
		}
	},
	"281" : {
		"item_id" : 281,
		"type" : "SG 553",
		"skinName" : "Triarch",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.96,
					"analyst" : 1.06,
					"opskins" : 0.88
				},
				3 : {
					"market" : 0.32,
					"analyst" : 0.35,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.19
				}
			},
			"stattrak" : {
				4 : {
					"market" : 6.98,
					"analyst" : 8.09,
					"opskins" : 8
				},
				3 : {
					"market" : 1.81,
					"analyst" : 1.79,
					"opskins" : 1.46
				},
				2 : {
					"market" : 0.7,
					"analyst" : 0.76,
					"opskins" : 0.63
				},
				1 : {
					"market" : 0.72,
					"analyst" : 0.73,
					"opskins" : 0.56
				},
				0 : {
					"market" : 0.59,
					"analyst" : 0.68,
					"opskins" : 0.58
				}
			},
			"souvenir" : {}
		}
	},
	"282" : {
		"item_id" : 282,
		"type" : "SCAR-20",
		"skinName" : "Powercore",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.96,
					"analyst" : 0.88,
					"opskins" : 0.71
				},
				3 : {
					"market" : 0.37,
					"analyst" : 0.35,
					"opskins" : 0.29
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.19
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.39,
					"analyst" : 3.37,
					"opskins" : 3.1
				},
				3 : {
					"market" : 1.4,
					"analyst" : 1.47,
					"opskins" : 1.99
				},
				2 : {
					"market" : 0.65,
					"analyst" : 0.78,
					"opskins" : 0.65
				},
				1 : {
					"market" : 0.77,
					"analyst" : 0.76,
					"opskins" : 0.59
				},
				0 : {
					"market" : 0.72,
					"analyst" : 0.69,
					"opskins" : 0.62
				}
			},
			"souvenir" : {}
		}
	},
	"283" : {
		"item_id" : 283,
		"type" : "MAG-7",
		"skinName" : "Petroglyph",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.64,
					"analyst" : 0.61,
					"opskins" : 0.53
				},
				3 : {
					"market" : 0.34,
					"analyst" : 0.33,
					"opskins" : 0.29
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.24,
					"opskins" : 0.21
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.38,
					"analyst" : 2.66,
					"opskins" : 2.67
				},
				3 : {
					"market" : 1.28,
					"analyst" : 1.29,
					"opskins" : 1.15
				},
				2 : {
					"market" : 0.71,
					"analyst" : 0.75,
					"opskins" : 0.63
				},
				1 : {
					"market" : 0.89,
					"analyst" : 0.82,
					"opskins" : 0.67
				}
			},
			"souvenir" : {}
		}
	},
	"284" : {
		"item_id" : 284,
		"type" : "Glock-18",
		"skinName" : "Weasel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.72,
					"analyst" : 3.97,
					"opskins" : 3.35
				},
				3 : {
					"market" : 1.64,
					"analyst" : 1.83,
					"opskins" : 1.51
				},
				2 : {
					"market" : 1,
					"analyst" : 1.06,
					"opskins" : 0.84
				},
				1 : {
					"market" : 0.88,
					"analyst" : 0.94,
					"opskins" : 0.77
				},
				0 : {
					"market" : 0.84,
					"analyst" : 0.88,
					"opskins" : 0.76
				}
			},
			"stattrak" : {
				4 : {
					"market" : 18.59,
					"analyst" : 19.4,
					"opskins" : 16.78
				},
				3 : {
					"market" : 8.18,
					"analyst" : 7.97,
					"opskins" : 6.99
				},
				2 : {
					"market" : 4.89,
					"analyst" : 4.96,
					"opskins" : 4.35
				},
				1 : {
					"market" : 4.04,
					"analyst" : 4.14,
					"opskins" : 3.59
				},
				0 : {
					"market" : 3.86,
					"analyst" : 3.88,
					"opskins" : 3.49
				}
			},
			"souvenir" : {}
		}
	},
	"285" : {
		"item_id" : 285,
		"type" : "Desert Eagle",
		"skinName" : "Directive",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.87,
					"analyst" : 7.84,
					"opskins" : 6.7
				},
				3 : {
					"market" : 1.35,
					"analyst" : 1.66,
					"opskins" : 1.57
				},
				2 : {
					"market" : 0.47,
					"analyst" : 0.54,
					"opskins" : 0.43
				},
				1 : {
					"market" : 0.59,
					"analyst" : 0.54,
					"opskins" : 0.43
				},
				0 : {
					"market" : 0.37,
					"analyst" : 0.41,
					"opskins" : 0.34
				}
			},
			"stattrak" : {
				4 : {
					"market" : 70.03,
					"analyst" : 56.24,
					"opskins" : 54.84
				},
				3 : {
					"market" : 9.94,
					"analyst" : 9.57,
					"opskins" : 8.7
				},
				2 : {
					"market" : 2.76,
					"analyst" : 2.92,
					"opskins" : 2.53
				},
				1 : {
					"market" : 2.68,
					"analyst" : 2.73,
					"opskins" : 2.38
				},
				0 : {
					"market" : 2.3,
					"analyst" : 2.31,
					"opskins" : 1.99
				}
			},
			"souvenir" : {}
		}
	},
	"286" : {
		"item_id" : 286,
		"type" : "Tec-9",
		"skinName" : "Fuel Injector",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.47,
					"analyst" : 9.32,
					"opskins" : 8.3
				},
				3 : {
					"market" : 4.6,
					"analyst" : 4.44,
					"opskins" : 3.9
				},
				2 : {
					"market" : 2.99,
					"analyst" : 3.03,
					"opskins" : 2.5
				},
				1 : {
					"market" : 2.34,
					"analyst" : 2.65,
					"opskins" : 2.28
				},
				0 : {
					"market" : 2.34,
					"analyst" : 2.43,
					"opskins" : 2.2
				}
			},
			"stattrak" : {
				4 : {
					"market" : 46,
					"analyst" : 45.21,
					"opskins" : 44
				},
				3 : {
					"market" : 21.35,
					"analyst" : 17.97,
					"opskins" : 16.15
				},
				2 : {
					"market" : 12.65,
					"analyst" : 12.06,
					"opskins" : 11.11
				},
				1 : {
					"market" : 9.4,
					"analyst" : 9.25,
					"opskins" : 9.11
				},
				0 : {
					"market" : 8.9,
					"analyst" : 8.94,
					"opskins" : 8.62
				}
			},
			"souvenir" : {}
		}
	},
	"287" : {
		"item_id" : 287,
		"type" : "MP9",
		"skinName" : "Airlock",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5,
					"analyst" : 5.67,
					"opskins" : 5.35
				},
				3 : {
					"market" : 3.23,
					"analyst" : 3.19,
					"opskins" : 2.72
				},
				2 : {
					"market" : 2.15,
					"analyst" : 1.97,
					"opskins" : 1.62
				},
				1 : {
					"market" : 1.79,
					"analyst" : 1.79,
					"opskins" : 1.49
				},
				0 : {
					"market" : 1.77,
					"analyst" : 1.67,
					"opskins" : 1.47
				}
			},
			"stattrak" : {
				4 : {
					"market" : 20.44,
					"analyst" : 20.58,
					"opskins" : 19.99
				},
				3 : {
					"market" : 14.21,
					"analyst" : 11.19,
					"opskins" : 9.68
				},
				2 : {
					"market" : 5.58,
					"analyst" : 5.54,
					"opskins" : 5.49
				},
				1 : {
					"market" : 5.1,
					"analyst" : 4.89,
					"opskins" : 4.39
				},
				0 : {
					"market" : 5.83,
					"analyst" : 4.79,
					"opskins" : 4.31
				}
			},
			"souvenir" : {}
		}
	},
	"288" : {
		"item_id" : 288,
		"type" : "AUG",
		"skinName" : "Syd Mead",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.15,
					"analyst" : 5.65,
					"opskins" : 5.04
				},
				3 : {
					"market" : 3.33,
					"analyst" : 3.21,
					"opskins" : 2.99
				},
				2 : {
					"market" : 2.09,
					"analyst" : 1.94,
					"opskins" : 1.61
				},
				1 : {
					"market" : 2,
					"analyst" : 1.97,
					"opskins" : 1.8
				},
				0 : {
					"market" : 1.79,
					"analyst" : 1.77,
					"opskins" : 1.5
				}
			},
			"stattrak" : {
				4 : {
					"market" : 20.6,
					"analyst" : 20.64,
					"opskins" : 20.5
				},
				3 : {
					"market" : 11.91,
					"analyst" : 12.93,
					"opskins" : 11.06
				},
				2 : {
					"market" : 6.24,
					"analyst" : 5.75,
					"opskins" : 5.13
				},
				1 : {
					"market" : 14.85,
					"analyst" : 6.9,
					"opskins" : 7
				},
				0 : {
					"market" : 5.15,
					"analyst" : 4.67,
					"opskins" : 3.9
				}
			},
			"souvenir" : {}
		}
	},
	"289" : {
		"item_id" : 289,
		"type" : "FAMAS",
		"skinName" : "Roll Cage",
		"prices" : {
			"default" : {
				4 : {
					"market" : 19.92,
					"analyst" : 20.61,
					"opskins" : 19.24
				},
				3 : {
					"market" : 9.4,
					"analyst" : 9.66,
					"opskins" : 8.98
				},
				2 : {
					"market" : 6.18,
					"analyst" : 6.03,
					"opskins" : 5.49
				},
				1 : {
					"market" : 4.72,
					"analyst" : 4.97,
					"opskins" : 4.56
				},
				0 : {
					"market" : 4.37,
					"analyst" : 4.45,
					"opskins" : 4.19
				}
			},
			"stattrak" : {
				4 : {
					"market" : 199.02,
					"analyst" : 113.4,
					"opskins" : 99.89
				},
				3 : {
					"market" : 29.13,
					"analyst" : 28.86,
					"opskins" : 29.99
				},
				2 : {
					"market" : 25,
					"analyst" : 19.63,
					"opskins" : 19.6
				},
				1 : {
					"market" : 16.92,
					"analyst" : 14.77,
					"opskins" : 15.6
				},
				0 : {
					"market" : 12.19,
					"analyst" : 12.84,
					"opskins" : 12.25
				}
			},
			"souvenir" : {}
		}
	},
	"290" : {
		"item_id" : 290,
		"type" : "AK-47",
		"skinName" : "Neon Revolution",
		"prices" : {
			"default" : {
				4 : {
					"market" : 78.39,
					"analyst" : 71.38,
					"opskins" : 60.3
				},
				3 : {
					"market" : 38.93,
					"analyst" : 42.24,
					"opskins" : 39.79
				},
				2 : {
					"market" : 29.68,
					"analyst" : 29.26,
					"opskins" : 27
				},
				1 : {
					"market" : 34.3,
					"analyst" : 31.92,
					"opskins" : 27.99
				},
				0 : {
					"market" : 20.64,
					"analyst" : 23.01,
					"opskins" : 21
				}
			},
			"stattrak" : {
				4 : {
					"market" : 321.55,
					"analyst" : 358.28,
					"opskins" : 320.65
				},
				3 : {
					"market" : 148.32,
					"analyst" : 132.83,
					"opskins" : 130
				},
				2 : {
					"market" : 91,
					"analyst" : 83.59,
					"opskins" : 71.79
				},
				1 : {
					"market" : 101.03,
					"analyst" : 96.33,
					"opskins" : 81.99
				},
				0 : {
					"market" : 63.59,
					"analyst" : 56.29,
					"opskins" : 54.99
				}
			},
			"souvenir" : {}
		}
	},
	"291" : {
		"item_id" : 291,
		"type" : "SG 553",
		"skinName" : "Aerial",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.19
				},
				3 : {
					"market" : 0.14,
					"analyst" : 0.14,
					"opskins" : 0.12
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.11,
					"opskins" : 0.1
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.5,
					"analyst" : 1.6,
					"opskins" : 1.26
				},
				3 : {
					"market" : 0.73,
					"analyst" : 0.76,
					"opskins" : 0.62
				},
				2 : {
					"market" : 0.32,
					"analyst" : 0.34,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.57,
					"analyst" : 0.63,
					"opskins" : 0.52
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.35,
					"opskins" : 0.29
				}
			},
			"souvenir" : {}
		}
	},
	"292" : {
		"item_id" : 292,
		"type" : "Tec-9",
		"skinName" : "Ice Cap",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.21
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.17,
					"opskins" : 0.13
				},
				2 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.11,
					"analyst" : 0.12,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.11,
					"analyst" : 0.09,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.76,
					"analyst" : 1.97,
					"opskins" : 1.66
				},
				3 : {
					"market" : 1.26,
					"analyst" : 1.26,
					"opskins" : 1.07
				},
				2 : {
					"market" : 0.6,
					"analyst" : 0.62,
					"opskins" : 0.51
				},
				1 : {
					"market" : 0.74,
					"analyst" : 0.8,
					"opskins" : 0.63
				},
				0 : {
					"market" : 0.53,
					"analyst" : 0.52,
					"opskins" : 0.46
				}
			},
			"souvenir" : {}
		}
	},
	"293" : {
		"item_id" : 293,
		"type" : "PP-Bizon",
		"skinName" : "Harvester",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.18,
					"analyst" : 0.18,
					"opskins" : 0.16
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.03,
					"analyst" : 1.03,
					"opskins" : 0.81
				},
				3 : {
					"market" : 0.39,
					"analyst" : 0.41,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.27,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.22,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.24,
					"analyst" : 0.22,
					"opskins" : 0.19
				}
			},
			"souvenir" : {}
		}
	},
	"294" : {
		"item_id" : 294,
		"type" : "P250",
		"skinName" : "Iron Clad",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.27,
					"analyst" : 0.27,
					"opskins" : 0.23
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.56,
					"analyst" : 2.27,
					"opskins" : 1.88
				},
				3 : {
					"market" : 0.48,
					"analyst" : 0.46,
					"opskins" : 0.4
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.29,
					"opskins" : 0.25
				},
				1 : {
					"market" : 0.29,
					"analyst" : 0.33,
					"opskins" : 0.29
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.3,
					"opskins" : 0.22
				}
			},
			"souvenir" : {}
		}
	},
	"295" : {
		"item_id" : 295,
		"type" : "Nova",
		"skinName" : "Exo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.13
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.73,
					"analyst" : 0.76,
					"opskins" : 0.65
				},
				3 : {
					"market" : 0.43,
					"analyst" : 0.45,
					"opskins" : 0.35
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.29,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.3,
					"analyst" : 0.31,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.3,
					"opskins" : 0.25
				}
			},
			"souvenir" : {}
		}
	},
	"296" : {
		"item_id" : 296,
		"type" : "MAC-10",
		"skinName" : "Carnivore",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.21,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.08,
					"analyst" : 1.15,
					"opskins" : 1.06
				},
				3 : {
					"market" : 0.39,
					"analyst" : 0.42,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.25,
					"analyst" : 0.28,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.24,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.2
				}
			},
			"souvenir" : {}
		}
	},
	"297" : {
		"item_id" : 297,
		"type" : "Five-SeveN",
		"skinName" : "Violent Daimyo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.62,
					"analyst" : 0.71,
					"opskins" : 0.57
				},
				3 : {
					"market" : 0.3,
					"analyst" : 0.34,
					"opskins" : 0.27
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.2,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.34,
					"opskins" : 0.27
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.14
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.21,
					"analyst" : 3.74,
					"opskins" : 3.22
				},
				3 : {
					"market" : 1.8,
					"analyst" : 1.8,
					"opskins" : 1.44
				},
				2 : {
					"market" : 0.88,
					"analyst" : 0.96,
					"opskins" : 0.73
				},
				1 : {
					"market" : 1.44,
					"analyst" : 1.46,
					"opskins" : 1.23
				},
				0 : {
					"market" : 0.93,
					"analyst" : 0.97,
					"opskins" : 0.78
				}
			},
			"souvenir" : {}
		}
	},
	"298" : {
		"item_id" : 298,
		"type" : "R8 Revolver",
		"skinName" : "Reboot",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.8,
					"analyst" : 1.63,
					"opskins" : 1.39
				},
				3 : {
					"market" : 0.66,
					"analyst" : 0.74,
					"opskins" : 0.56
				},
				2 : {
					"market" : 0.48,
					"analyst" : 0.53,
					"opskins" : 0.44
				},
				1 : {
					"market" : 0.46,
					"analyst" : 0.46,
					"opskins" : 0.41
				},
				0 : {
					"market" : 0.46,
					"analyst" : 0.45,
					"opskins" : 0.41
				}
			},
			"stattrak" : {
				4 : {
					"market" : 13.8,
					"analyst" : 11.34,
					"opskins" : 10.44
				},
				3 : {
					"market" : 3.04,
					"analyst" : 2.96,
					"opskins" : 2.48
				},
				2 : {
					"market" : 1.75,
					"analyst" : 1.74,
					"opskins" : 1.53
				},
				1 : {
					"market" : 1.35,
					"analyst" : 1.3,
					"opskins" : 1.15
				},
				0 : {
					"market" : 1.29,
					"analyst" : 1.27,
					"opskins" : 1.04
				}
			},
			"souvenir" : {}
		}
	},
	"299" : {
		"item_id" : 299,
		"type" : "Sawed-Off",
		"skinName" : "Limelight",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.4,
					"analyst" : 1.44,
					"opskins" : 1.26
				},
				3 : {
					"market" : 0.66,
					"analyst" : 0.72,
					"opskins" : 0.58
				},
				2 : {
					"market" : 0.46,
					"analyst" : 0.52,
					"opskins" : 0.42
				},
				1 : {
					"market" : 0.48,
					"analyst" : 0.47,
					"opskins" : 0.39
				},
				0 : {
					"market" : 0.42,
					"analyst" : 0.44,
					"opskins" : 0.39
				}
			},
			"stattrak" : {
				4 : {
					"market" : 6.18,
					"analyst" : 6.14,
					"opskins" : 5.19
				},
				3 : {
					"market" : 2.34,
					"analyst" : 2.71,
					"opskins" : 2.3
				},
				2 : {
					"market" : 1.45,
					"analyst" : 1.64,
					"opskins" : 1.43
				},
				1 : {
					"market" : 1.34,
					"analyst" : 1.28,
					"opskins" : 1.12
				},
				0 : {
					"market" : 1.27,
					"analyst" : 1.21,
					"opskins" : 1.14
				}
			},
			"souvenir" : {}
		}
	},
	"300" : {
		"item_id" : 300,
		"type" : "P90",
		"skinName" : "Chopper",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.38,
					"analyst" : 1.44,
					"opskins" : 1.23
				},
				3 : {
					"market" : 0.85,
					"analyst" : 0.76,
					"opskins" : 0.61
				},
				2 : {
					"market" : 0.52,
					"analyst" : 0.54,
					"opskins" : 0.44
				},
				1 : {
					"market" : 0.64,
					"analyst" : 0.65,
					"opskins" : 0.57
				},
				0 : {
					"market" : 0.5,
					"analyst" : 0.52,
					"opskins" : 0.45
				}
			},
			"stattrak" : {
				4 : {
					"market" : 6.15,
					"analyst" : 6,
					"opskins" : 5.09
				},
				3 : {
					"market" : 3.13,
					"analyst" : 3.14,
					"opskins" : 2.59
				},
				2 : {
					"market" : 1.79,
					"analyst" : 1.84,
					"opskins" : 1.47
				},
				1 : {
					"market" : 2.42,
					"analyst" : 2.52,
					"opskins" : 2.24
				},
				0 : {
					"market" : 1.68,
					"analyst" : 1.73,
					"opskins" : 1.5
				}
			},
			"souvenir" : {}
		}
	},
	"301" : {
		"item_id" : 301,
		"type" : "AUG",
		"skinName" : "Aristocrat",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.32,
					"analyst" : 1.39,
					"opskins" : 1.19
				},
				3 : {
					"market" : 0.71,
					"analyst" : 0.72,
					"opskins" : 0.59
				},
				2 : {
					"market" : 0.43,
					"analyst" : 0.53,
					"opskins" : 0.42
				},
				1 : {
					"market" : 0.58,
					"analyst" : 0.57,
					"opskins" : 0.48
				},
				0 : {
					"market" : 0.49,
					"analyst" : 0.47,
					"opskins" : 0.41
				}
			},
			"stattrak" : {
				4 : {
					"market" : 5.61,
					"analyst" : 5.45,
					"opskins" : 4.85
				},
				3 : {
					"market" : 2.67,
					"analyst" : 2.76,
					"opskins" : 2.37
				},
				2 : {
					"market" : 1.55,
					"analyst" : 1.7,
					"opskins" : 1.45
				},
				1 : {
					"market" : 2.43,
					"analyst" : 1.96,
					"opskins" : 1.81
				},
				0 : {
					"market" : 1.57,
					"analyst" : 1.65,
					"opskins" : 1.44
				}
			},
			"souvenir" : {}
		}
	},
	"302" : {
		"item_id" : 302,
		"type" : "AWP",
		"skinName" : "Phobos",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.8,
					"analyst" : 3.01,
					"opskins" : 2.64
				},
				3 : {
					"market" : 2.3,
					"analyst" : 2.24,
					"opskins" : 1.87
				},
				2 : {
					"market" : 1.97,
					"analyst" : 2.04,
					"opskins" : 1.68
				},
				1 : {
					"market" : 2.65,
					"analyst" : 2.81,
					"opskins" : 2.73
				}
			},
			"stattrak" : {
				4 : {
					"market" : 10.96,
					"analyst" : 11.98,
					"opskins" : 10.69
				},
				3 : {
					"market" : 8.89,
					"analyst" : 8.89,
					"opskins" : 8.03
				},
				2 : {
					"market" : 7.31,
					"analyst" : 7.71,
					"opskins" : 6.78
				},
				1 : {
					"market" : 11.18,
					"analyst" : 10.43,
					"opskins" : 10.5
				}
			},
			"souvenir" : {}
		}
	},
	"303" : {
		"item_id" : 303,
		"type" : "P2000",
		"skinName" : "Imperial Dragon",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.11,
					"analyst" : 3.56,
					"opskins" : 3.09
				},
				3 : {
					"market" : 1.81,
					"analyst" : 2.04,
					"opskins" : 1.67
				},
				2 : {
					"market" : 1.41,
					"analyst" : 1.43,
					"opskins" : 1.21
				},
				1 : {
					"market" : 1.45,
					"analyst" : 1.65,
					"opskins" : 1.4
				},
				0 : {
					"market" : 1.49,
					"analyst" : 1.52,
					"opskins" : 1.36
				}
			},
			"stattrak" : {
				4 : {
					"market" : 18.87,
					"analyst" : 18.12,
					"opskins" : 15.45
				},
				3 : {
					"market" : 9.74,
					"analyst" : 9.54,
					"opskins" : 8.59
				},
				2 : {
					"market" : 6.09,
					"analyst" : 6.05,
					"opskins" : 5.29
				},
				1 : {
					"market" : 6.67,
					"analyst" : 7.4,
					"opskins" : 6.63
				},
				0 : {
					"market" : 8.53,
					"analyst" : 8.72,
					"opskins" : 7.45
				}
			},
			"souvenir" : {}
		}
	},
	"304" : {
		"item_id" : 304,
		"type" : "SCAR-20",
		"skinName" : "Bloodsport",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.53,
					"analyst" : 2.49,
					"opskins" : 2.15
				},
				3 : {
					"market" : 1.81,
					"analyst" : 1.76,
					"opskins" : 1.44
				},
				2 : {
					"market" : 1.39,
					"analyst" : 1.4,
					"opskins" : 1.27
				},
				1 : {
					"market" : 1.76,
					"analyst" : 1.46,
					"opskins" : 1.28
				}
			},
			"stattrak" : {
				4 : {
					"market" : 12.72,
					"analyst" : 11.52,
					"opskins" : 10.99
				},
				3 : {
					"market" : 6.93,
					"analyst" : 6.16,
					"opskins" : 5.8
				},
				2 : {
					"market" : 4.32,
					"analyst" : 4.54,
					"opskins" : 4.71
				},
				1 : {
					"market" : 4.77,
					"analyst" : 5.38,
					"opskins" : 4.64
				}
			},
			"souvenir" : {}
		}
	},
	"305" : {
		"item_id" : 305,
		"type" : "M4A4",
		"skinName" : "Desolate Space",
		"prices" : {
			"default" : {
				4 : {
					"market" : 31.79,
					"analyst" : 33.18,
					"opskins" : 30.3
				},
				3 : {
					"market" : 15.1,
					"analyst" : 16.42,
					"opskins" : 14.44
				},
				2 : {
					"market" : 11.73,
					"analyst" : 12.42,
					"opskins" : 11
				},
				1 : {
					"market" : 9.75,
					"analyst" : 10.57,
					"opskins" : 9.71
				},
				0 : {
					"market" : 7.95,
					"analyst" : 9.02,
					"opskins" : 7.97
				}
			},
			"stattrak" : {
				4 : {
					"market" : 121.75,
					"analyst" : 117.01,
					"opskins" : 117
				},
				3 : {
					"market" : 52.99,
					"analyst" : 52.95,
					"opskins" : 47.5
				},
				2 : {
					"market" : 40.32,
					"analyst" : 39.69,
					"opskins" : 33.5
				},
				1 : {
					"market" : 30.19,
					"analyst" : 29.48,
					"opskins" : 27.79
				},
				0 : {
					"market" : 21.71,
					"analyst" : 24.76,
					"opskins" : 23.88
				}
			},
			"souvenir" : {}
		}
	},
	"306" : {
		"item_id" : 306,
		"type" : "M4A1-S",
		"skinName" : "Mecha Industries",
		"prices" : {
			"default" : {
				4 : {
					"market" : 35.15,
					"analyst" : 34.3,
					"opskins" : 28.8
				},
				3 : {
					"market" : 21.17,
					"analyst" : 21.43,
					"opskins" : 19.74
				},
				2 : {
					"market" : 15.43,
					"analyst" : 14.68,
					"opskins" : 13.22
				},
				1 : {
					"market" : 16.97,
					"analyst" : 16.58,
					"opskins" : 15.5
				},
				0 : {
					"market" : 11.77,
					"analyst" : 12.14,
					"opskins" : 10.8
				}
			},
			"stattrak" : {
				4 : {
					"market" : 177.34,
					"analyst" : 182.89,
					"opskins" : 149.99
				},
				3 : {
					"market" : 91.95,
					"analyst" : 91.42,
					"opskins" : 79.15
				},
				2 : {
					"market" : 48.72,
					"analyst" : 49.97,
					"opskins" : 45.1
				},
				1 : {
					"market" : 57.5,
					"analyst" : 50.05,
					"opskins" : 44
				},
				0 : {
					"market" : 35,
					"analyst" : 37.75,
					"opskins" : 38
				}
			},
			"souvenir" : {}
		}
	},
	"307" : {
		"item_id" : 307,
		"type" : "Glock-18",
		"skinName" : "Wasteland Rebel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 14.85,
					"analyst" : 14.66,
					"opskins" : 13.79
				},
				3 : {
					"market" : 10.36,
					"analyst" : 11.8,
					"opskins" : 10.69
				},
				2 : {
					"market" : 9.5,
					"analyst" : 9.71,
					"opskins" : 8.25
				},
				1 : {
					"market" : 9.96,
					"analyst" : 9.58,
					"opskins" : 8.9
				},
				0 : {
					"market" : 6.24,
					"analyst" : 6.68,
					"opskins" : 6.94
				}
			},
			"stattrak" : {
				4 : {
					"market" : 53.24,
					"analyst" : 63.36,
					"opskins" : 54.45
				},
				3 : {
					"market" : 55.4,
					"analyst" : 45.84,
					"opskins" : 45.37
				},
				2 : {
					"market" : 30.45,
					"analyst" : 32.34,
					"opskins" : 27.49
				},
				1 : {
					"market" : 24.53,
					"analyst" : 35.88,
					"opskins" : 30
				},
				0 : {
					"market" : 24.49,
					"analyst" : 24.62,
					"opskins" : 23.19
				}
			},
			"souvenir" : {}
		}
	},
	"308" : {
		"item_id" : 308,
		"type" : "SG 553",
		"skinName" : "Atlas",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.06,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.45,
					"analyst" : 1.55,
					"opskins" : 1.3
				},
				3 : {
					"market" : 0.43,
					"analyst" : 0.5,
					"opskins" : 0.45
				},
				2 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.32,
					"analyst" : 0.38,
					"opskins" : 0.38
				},
				0 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.24
				}
			},
			"souvenir" : {}
		}
	},
	"309" : {
		"item_id" : 309,
		"type" : "Sawed-Off",
		"skinName" : "Fubar",
		"prices" : {
			"default" : {
				1 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.06,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				1 : {
					"market" : 0.4,
					"analyst" : 0.41,
					"opskins" : 0.36
				},
				0 : {
					"market" : 0.19,
					"analyst" : 0.19,
					"opskins" : 0.16
				}
			},
			"souvenir" : {}
		}
	},
	"310" : {
		"item_id" : 310,
		"type" : "P2000",
		"skinName" : "Oceanic",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.16
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.14,
					"analyst" : 0.14,
					"opskins" : 0.1
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.2,
					"analyst" : 1.19,
					"opskins" : 1
				},
				3 : {
					"market" : 0.7,
					"analyst" : 0.71,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.31,
					"analyst" : 0.33,
					"opskins" : 0.27
				},
				1 : {
					"market" : 0.63,
					"analyst" : 0.63,
					"opskins" : 0.53
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.32,
					"opskins" : 0.28
				}
			},
			"souvenir" : {}
		}
	},
	"311" : {
		"item_id" : 311,
		"type" : "MP9",
		"skinName" : "Bioleak",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.16
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.13,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.15,
					"analyst" : 0.14,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.14,
					"analyst" : 0.12,
					"opskins" : 0.09
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.87,
					"analyst" : 0.94,
					"opskins" : 0.81
				},
				3 : {
					"market" : 0.64,
					"analyst" : 0.66,
					"opskins" : 0.51
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.31,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.49,
					"analyst" : 0.5,
					"opskins" : 0.42
				},
				0 : {
					"market" : 0.28,
					"analyst" : 0.28,
					"opskins" : 0.27
				}
			},
			"souvenir" : {}
		}
	},
	"312" : {
		"item_id" : 312,
		"type" : "M249",
		"skinName" : "Spectre",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				0 : {
					"market" : 0.13,
					"analyst" : 0.1,
					"opskins" : 0.09
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.72,
					"analyst" : 0.76,
					"opskins" : 0.61
				},
				3 : {
					"market" : 0.42,
					"analyst" : 0.41,
					"opskins" : 0.32
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.22,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.19,
					"opskins" : 0.2
				}
			},
			"souvenir" : {}
		}
	},
	"313" : {
		"item_id" : 313,
		"type" : "G3SG1",
		"skinName" : "Orange Crash",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.14,
					"analyst" : 0.13,
					"opskins" : 0.11
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.83,
					"analyst" : 0.82,
					"opskins" : 0.66
				},
				3 : {
					"market" : 0.54,
					"analyst" : 0.47,
					"opskins" : 0.38
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.24,
					"opskins" : 0.2
				},
				1 : {
					"market" : 0.53,
					"analyst" : 0.36,
					"opskins" : 0.31
				},
				0 : {
					"market" : 0.26,
					"analyst" : 0.3,
					"opskins" : 0.25
				}
			},
			"souvenir" : {}
		}
	},
	"314" : {
		"item_id" : 314,
		"type" : "Dual Berettas",
		"skinName" : "Ventilators",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.13,
					"analyst" : 0.13,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.88,
					"analyst" : 0.9,
					"opskins" : 0.79
				},
				3 : {
					"market" : 0.55,
					"analyst" : 0.58,
					"opskins" : 0.43
				},
				2 : {
					"market" : 0.29,
					"analyst" : 0.28,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.43,
					"analyst" : 0.43,
					"opskins" : 0.36
				}
			},
			"souvenir" : {}
		}
	},
	"315" : {
		"item_id" : 315,
		"type" : "XM1014",
		"skinName" : "Black Tie",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.99,
					"analyst" : 1.01,
					"opskins" : 0.84
				},
				3 : {
					"market" : 0.48,
					"analyst" : 0.55,
					"opskins" : 0.51
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.28,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.32,
					"analyst" : 0.32,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.26,
					"opskins" : 0.28
				}
			},
			"stattrak" : {
				4 : {
					"market" : 5.92,
					"analyst" : 5.45,
					"opskins" : 4.71
				},
				3 : {
					"market" : 2.67,
					"analyst" : 2.44,
					"opskins" : 2.1
				},
				2 : {
					"market" : 1.07,
					"analyst" : 1.02,
					"opskins" : 0.9
				},
				1 : {
					"market" : 1.76,
					"analyst" : 1.33,
					"opskins" : 1.56
				},
				0 : {
					"market" : 0.88,
					"analyst" : 0.86,
					"opskins" : 0.71
				}
			},
			"souvenir" : {}
		}
	},
	"316" : {
		"item_id" : 316,
		"type" : "Tec-9",
		"skinName" : "Re-Entry",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.06,
					"analyst" : 1.01,
					"opskins" : 0.82
				},
				3 : {
					"market" : 0.52,
					"analyst" : 0.56,
					"opskins" : 0.45
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.3,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.4,
					"analyst" : 0.48,
					"opskins" : 0.39
				}
			},
			"stattrak" : {
				4 : {
					"market" : 5.59,
					"analyst" : 5.94,
					"opskins" : 5.56
				},
				3 : {
					"market" : 3.14,
					"analyst" : 3.79,
					"opskins" : 3.2
				},
				2 : {
					"market" : 1.77,
					"analyst" : 1.86,
					"opskins" : 1.55
				},
				1 : {
					"market" : 2.3,
					"analyst" : 2.13,
					"opskins" : 1.69
				}
			},
			"souvenir" : {}
		}
	},
	"317" : {
		"item_id" : 317,
		"type" : "SSG 08",
		"skinName" : "Ghost Crusader",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.5,
					"analyst" : 2.61,
					"opskins" : 2.22
				},
				3 : {
					"market" : 0.92,
					"analyst" : 0.95,
					"opskins" : 0.81
				},
				2 : {
					"market" : 0.34,
					"analyst" : 0.39,
					"opskins" : 0.29
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.3,
					"opskins" : 0.23
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.27,
					"opskins" : 0.23
				}
			},
			"stattrak" : {
				4 : {
					"market" : 18.4,
					"analyst" : 18.63,
					"opskins" : 16.9
				},
				3 : {
					"market" : 5.92,
					"analyst" : 5.51,
					"opskins" : 4.8
				},
				2 : {
					"market" : 2.92,
					"analyst" : 2.76,
					"opskins" : 2.29
				},
				1 : {
					"market" : 2.07,
					"analyst" : 2.06,
					"opskins" : 1.72
				},
				0 : {
					"market" : 2.12,
					"analyst" : 1.87,
					"opskins" : 1.52
				}
			},
			"souvenir" : {}
		}
	},
	"318" : {
		"item_id" : 318,
		"type" : "Galil AR",
		"skinName" : "Firefight",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.23,
					"analyst" : 1.34,
					"opskins" : 1.24
				},
				3 : {
					"market" : 0.54,
					"analyst" : 0.55,
					"opskins" : 0.47
				},
				2 : {
					"market" : 0.25,
					"analyst" : 0.28,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.28,
					"analyst" : 0.26,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.25,
					"opskins" : 0.23
				}
			},
			"stattrak" : {
				4 : {
					"market" : 5.71,
					"analyst" : 6.48,
					"opskins" : 5.75
				},
				3 : {
					"market" : 2.43,
					"analyst" : 2.63,
					"opskins" : 2.22
				},
				2 : {
					"market" : 1.22,
					"analyst" : 1.1,
					"opskins" : 0.89
				},
				1 : {
					"market" : 1.45,
					"analyst" : 0.91,
					"opskins" : 0.72
				},
				0 : {
					"market" : 0.85,
					"analyst" : 0.85,
					"opskins" : 0.7
				}
			},
			"souvenir" : {}
		}
	},
	"319" : {
		"item_id" : 319,
		"type" : "CZ75-Auto",
		"skinName" : "Red Astor",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.98,
					"analyst" : 1.1,
					"opskins" : 0.98
				},
				3 : {
					"market" : 0.53,
					"analyst" : 0.55,
					"opskins" : 0.46
				},
				2 : {
					"market" : 0.29,
					"analyst" : 0.28,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.25,
					"opskins" : 0.22
				}
			},
			"stattrak" : {
				4 : {
					"market" : 7.59,
					"analyst" : 7.83,
					"opskins" : 6.95
				},
				3 : {
					"market" : 2.33,
					"analyst" : 2.52,
					"opskins" : 2.21
				},
				2 : {
					"market" : 1,
					"analyst" : 1.04,
					"opskins" : 0.89
				},
				1 : {
					"market" : 0.94,
					"analyst" : 0.89,
					"opskins" : 0.74
				},
				0 : {
					"market" : 0.92,
					"analyst" : 0.83,
					"opskins" : 0.7
				}
			},
			"souvenir" : {}
		}
	},
	"320" : {
		"item_id" : 320,
		"type" : "UMP-45",
		"skinName" : "Primal Saber",
		"prices" : {
			"default" : {
				4 : {
					"market" : 11.08,
					"analyst" : 11.08,
					"opskins" : 10.43
				},
				3 : {
					"market" : 6.34,
					"analyst" : 6.25,
					"opskins" : 5.55
				},
				2 : {
					"market" : 3.61,
					"analyst" : 3.85,
					"opskins" : 3.2
				},
				1 : {
					"market" : 3.92,
					"analyst" : 4.12,
					"opskins" : 3.7
				},
				0 : {
					"market" : 2.42,
					"analyst" : 2.51,
					"opskins" : 2.15
				}
			},
			"stattrak" : {
				4 : {
					"market" : 55.57,
					"analyst" : 59.25,
					"opskins" : 52.95
				},
				3 : {
					"market" : 24.35,
					"analyst" : 25.31,
					"opskins" : 22.9
				},
				2 : {
					"market" : 14.23,
					"analyst" : 12.84,
					"opskins" : 11.72
				},
				1 : {
					"market" : 17.74,
					"analyst" : 16.5,
					"opskins" : 14.49
				},
				0 : {
					"market" : 10.92,
					"analyst" : 9.8,
					"opskins" : 9.5
				}
			},
			"souvenir" : {}
		}
	},
	"321" : {
		"item_id" : 321,
		"type" : "P250",
		"skinName" : "Asiimov",
		"prices" : {
			"default" : {
				3 : {
					"market" : 19.06,
					"analyst" : 18.81,
					"opskins" : 17.33
				},
				2 : {
					"market" : 3.64,
					"analyst" : 3.97,
					"opskins" : 3.35
				},
				1 : {
					"market" : 3.73,
					"analyst" : 3.51,
					"opskins" : 3.05
				},
				0 : {
					"market" : 1.85,
					"analyst" : 1.85,
					"opskins" : 1.56
				}
			},
			"stattrak" : {
				3 : {
					"market" : 90.57,
					"analyst" : 94.28,
					"opskins" : 78.85
				},
				2 : {
					"market" : 15,
					"analyst" : 16.81,
					"opskins" : 14.74
				},
				1 : {
					"market" : 14.8,
					"analyst" : 14.06,
					"opskins" : 12.79
				},
				0 : {
					"market" : 6.02,
					"analyst" : 6.88,
					"opskins" : 6
				}
			},
			"souvenir" : {}
		}
	},
	"322" : {
		"item_id" : 322,
		"type" : "AUG",
		"skinName" : "Fleet Flock",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.98,
					"analyst" : 4.29,
					"opskins" : 3.92
				},
				3 : {
					"market" : 1.98,
					"analyst" : 2.03,
					"opskins" : 1.75
				},
				2 : {
					"market" : 1.15,
					"analyst" : 1.23,
					"opskins" : 1
				},
				1 : {
					"market" : 1,
					"analyst" : 1.2,
					"opskins" : 1.03
				},
				0 : {
					"market" : 1.03,
					"analyst" : 1.11,
					"opskins" : 1.03
				}
			},
			"stattrak" : {
				4 : {
					"market" : 45.88,
					"analyst" : 31.92,
					"opskins" : 29.77
				},
				3 : {
					"market" : 8.4,
					"analyst" : 8.98,
					"opskins" : 7.22
				},
				2 : {
					"market" : 4.45,
					"analyst" : 4.08,
					"opskins" : 3.89
				},
				1 : {
					"market" : 3.24,
					"analyst" : 3.05,
					"opskins" : 2.69
				},
				0 : {
					"market" : 3.34,
					"analyst" : 3.09,
					"opskins" : 2.82
				}
			},
			"souvenir" : {}
		}
	},
	"323" : {
		"item_id" : 323,
		"type" : "M4A1-S",
		"skinName" : "Chantico's Fire",
		"prices" : {
			"default" : {
				4 : {
					"market" : 52.25,
					"analyst" : 55.17,
					"opskins" : 49.75
				},
				3 : {
					"market" : 26.8,
					"analyst" : 26.78,
					"opskins" : 24.62
				},
				2 : {
					"market" : 18.88,
					"analyst" : 18.53,
					"opskins" : 17.43
				},
				1 : {
					"market" : 14.31,
					"analyst" : 14.71,
					"opskins" : 13.9
				},
				0 : {
					"market" : 10.96,
					"analyst" : 11.48,
					"opskins" : 10.72
				}
			},
			"stattrak" : {
				4 : {
					"market" : 381.35,
					"analyst" : 349.38,
					"opskins" : 324.99
				},
				3 : {
					"market" : 104.53,
					"analyst" : 98.48,
					"opskins" : 87.99
				},
				2 : {
					"market" : 52.96,
					"analyst" : 52.04,
					"opskins" : 45
				},
				1 : {
					"market" : 40.8,
					"analyst" : 41.46,
					"opskins" : 45.78
				},
				0 : {
					"market" : 26.5,
					"analyst" : 30.91,
					"opskins" : 31
				}
			},
			"souvenir" : {}
		}
	},
	"324" : {
		"item_id" : 324,
		"type" : "PP-Bizon",
		"skinName" : "Judgement of Anubis",
		"prices" : {
			"default" : {
				4 : {
					"market" : 9.71,
					"analyst" : 8.88,
					"opskins" : 8.15
				},
				3 : {
					"market" : 5.93,
					"analyst" : 6.44,
					"opskins" : 6.19
				},
				2 : {
					"market" : 3.92,
					"analyst" : 4.23,
					"opskins" : 3.81
				},
				1 : {
					"market" : 4.1,
					"analyst" : 4.27,
					"opskins" : 4.2
				},
				0 : {
					"market" : 4,
					"analyst" : 3.64,
					"opskins" : 3.6
				}
			},
			"stattrak" : {
				4 : {
					"market" : 41.4,
					"analyst" : 36.34,
					"opskins" : 33.92
				},
				3 : {
					"market" : 26.8,
					"analyst" : 25.65,
					"opskins" : 21.5
				},
				2 : {
					"market" : 12.19,
					"analyst" : 11.93,
					"opskins" : 10.9
				},
				1 : {
					"market" : 14.03,
					"analyst" : 13.82,
					"opskins" : 13.49
				},
				0 : {
					"market" : 13.7,
					"analyst" : 13.01,
					"opskins" : 16
				}
			},
			"souvenir" : {}
		}
	},
	"325" : {
		"item_id" : 325,
		"type" : "AK-47",
		"skinName" : "Elite Build",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.92,
					"analyst" : 1.83,
					"opskins" : 1.67
				},
				3 : {
					"market" : 0.69,
					"analyst" : 0.53,
					"opskins" : 0.58
				},
				2 : {
					"market" : 0.42,
					"analyst" : 0.28,
					"opskins" : 0.35
				},
				1 : {
					"market" : 0.36,
					"analyst" : 0.21,
					"opskins" : 0.34
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.2,
					"opskins" : 0.33
				}
			},
			"stattrak" : {
				4 : {
					"market" : 9.82,
					"analyst" : 10.21,
					"opskins" : 9.23
				},
				3 : {
					"market" : 3.16,
					"analyst" : 3.36,
					"opskins" : 2.9
				},
				2 : {
					"market" : 2.19,
					"analyst" : 2.3,
					"opskins" : 1.92
				},
				1 : {
					"market" : 2,
					"analyst" : 1.99,
					"opskins" : 1.69
				},
				0 : {
					"market" : 1.97,
					"analyst" : 1.94,
					"opskins" : 1.73
				}
			},
			"souvenir" : {}
		}
	},
	"326" : {
		"item_id" : 326,
		"type" : "MP7",
		"skinName" : "Armor Core",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.43,
					"analyst" : 0.44,
					"opskins" : 0.39
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.25,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.26,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.28,
					"analyst" : 0.27,
					"opskins" : 0.2
				}
			},
			"souvenir" : {}
		}
	},
	"327" : {
		"item_id" : 327,
		"type" : "Desert Eagle",
		"skinName" : "Bronze Deco",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.14,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.16,
					"opskins" : 0.16
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.07,
					"analyst" : 1.06,
					"opskins" : 0.89
				},
				3 : {
					"market" : 0.73,
					"analyst" : 0.72,
					"opskins" : 0.62
				},
				2 : {
					"market" : 0.48,
					"analyst" : 0.48,
					"opskins" : 0.42
				},
				1 : {
					"market" : 0.69,
					"analyst" : 0.64,
					"opskins" : 0.58
				},
				0 : {
					"market" : 1.26,
					"analyst" : 1.09,
					"opskins" : 1.21
				}
			},
			"souvenir" : {}
		}
	},
	"328" : {
		"item_id" : 328,
		"type" : "P250",
		"skinName" : "Valence",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.29,
					"analyst" : 0.28,
					"opskins" : 0.24
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.1
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.61,
					"analyst" : 1.64,
					"opskins" : 1.36
				},
				3 : {
					"market" : 0.5,
					"analyst" : 0.56,
					"opskins" : 0.47
				},
				2 : {
					"market" : 0.3,
					"analyst" : 0.32,
					"opskins" : 0.25
				},
				1 : {
					"market" : 0.72,
					"analyst" : 0.71,
					"opskins" : 0.57
				},
				0 : {
					"market" : 0.31,
					"analyst" : 0.31,
					"opskins" : 0.26
				}
			},
			"souvenir" : {}
		}
	},
	"329" : {
		"item_id" : 329,
		"type" : "Negev",
		"skinName" : "Man-o'-war",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				3 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.17
				}
			},
			"souvenir" : {}
		}
	},
	"330" : {
		"item_id" : 330,
		"type" : "Sawed-Off",
		"skinName" : "Origami",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.1,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.42,
					"analyst" : 0.43,
					"opskins" : 0.37
				},
				3 : {
					"market" : 0.23,
					"analyst" : 0.24,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.23,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.17
				}
			},
			"souvenir" : {}
		}
	},
	"331" : {
		"item_id" : 331,
		"type" : "AWP",
		"skinName" : "Worm God",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.08,
					"analyst" : 1.13,
					"opskins" : 0.94
				},
				3 : {
					"market" : 0.66,
					"analyst" : 0.74,
					"opskins" : 0.6
				},
				2 : {
					"market" : 0.64,
					"analyst" : 0.68,
					"opskins" : 0.56
				},
				1 : {
					"market" : 0.83,
					"analyst" : 0.87,
					"opskins" : 0.76
				}
			},
			"stattrak" : {
				4 : {
					"market" : 5.17,
					"analyst" : 5.33,
					"opskins" : 4.75
				},
				3 : {
					"market" : 3.8,
					"analyst" : 3.86,
					"opskins" : 3.37
				},
				2 : {
					"market" : 3.48,
					"analyst" : 3.61,
					"opskins" : 3.16
				},
				1 : {
					"market" : 4.65,
					"analyst" : 4.4,
					"opskins" : 3.97
				}
			},
			"souvenir" : {}
		}
	},
	"332" : {
		"item_id" : 332,
		"type" : "MAG-7",
		"skinName" : "Heat",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.74,
					"analyst" : 0.76,
					"opskins" : 0.68
				},
				3 : {
					"market" : 0.23,
					"analyst" : 0.24,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.18
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.3,
					"analyst" : 3.7,
					"opskins" : 3.5
				},
				3 : {
					"market" : 1.03,
					"analyst" : 1,
					"opskins" : 0.85
				},
				2 : {
					"market" : 0.53,
					"analyst" : 0.55,
					"opskins" : 0.49
				},
				1 : {
					"market" : 0.48,
					"analyst" : 0.54,
					"opskins" : 0.49
				},
				0 : {
					"market" : 0.52,
					"analyst" : 0.54,
					"opskins" : 0.49
				}
			},
			"souvenir" : {}
		}
	},
	"333" : {
		"item_id" : 333,
		"type" : "CZ75-Auto",
		"skinName" : "Pole Position",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.38,
					"analyst" : 0.43,
					"opskins" : 0.36
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.19
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.24
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.17
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.03,
					"analyst" : 2.09,
					"opskins" : 1.81
				},
				3 : {
					"market" : 0.81,
					"analyst" : 0.91,
					"opskins" : 0.74
				},
				2 : {
					"market" : 0.53,
					"analyst" : 0.55,
					"opskins" : 0.46
				},
				1 : {
					"market" : 0.51,
					"analyst" : 0.58,
					"opskins" : 0.53
				},
				0 : {
					"market" : 0.49,
					"analyst" : 0.53,
					"opskins" : 0.44
				}
			},
			"souvenir" : {}
		}
	},
	"334" : {
		"item_id" : 334,
		"type" : "UMP-45",
		"skinName" : "Grand Prix",
		"prices" : {
			"default" : {
				2 : {
					"market" : 0.19,
					"analyst" : 0.21,
					"opskins" : 0.17
				}
			},
			"stattrak" : {
				2 : {
					"market" : 0.54,
					"analyst" : 0.57,
					"opskins" : 0.46
				}
			},
			"souvenir" : {}
		}
	},
	"335" : {
		"item_id" : 335,
		"type" : "Five-SeveN",
		"skinName" : "Monkey Business",
		"prices" : {
			"default" : {
				3 : {
					"market" : 5.4,
					"analyst" : 5.55,
					"opskins" : 4.9
				},
				2 : {
					"market" : 1.08,
					"analyst" : 1.09,
					"opskins" : 0.9
				},
				1 : {
					"market" : 1.04,
					"analyst" : 1.07,
					"opskins" : 0.91
				},
				0 : {
					"market" : 1.49,
					"analyst" : 1.16,
					"opskins" : 1.42
				}
			},
			"stattrak" : {
				3 : {
					"market" : 22.17,
					"analyst" : 20.11,
					"opskins" : 17.2
				},
				2 : {
					"market" : 3.7,
					"analyst" : 4.02,
					"opskins" : 3.35
				},
				1 : {
					"market" : 3.18,
					"analyst" : 3.48,
					"opskins" : 2.99
				},
				0 : {
					"market" : 2.6,
					"analyst" : 2.68,
					"opskins" : 2.29
				}
			},
			"souvenir" : {}
		}
	},
	"336" : {
		"item_id" : 336,
		"type" : "FAMAS",
		"skinName" : "Djinn",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.95,
					"analyst" : 2.87,
					"opskins" : 2.43
				},
				3 : {
					"market" : 1.2,
					"analyst" : 1.3,
					"opskins" : 1.15
				},
				2 : {
					"market" : 0.95,
					"analyst" : 1,
					"opskins" : 0.83
				},
				1 : {
					"market" : 0.93,
					"analyst" : 0.98,
					"opskins" : 0.83
				},
				0 : {
					"market" : 0.89,
					"analyst" : 0.98,
					"opskins" : 0.85
				}
			},
			"stattrak" : {
				4 : {
					"market" : 14.77,
					"analyst" : 13.98,
					"opskins" : 15
				},
				3 : {
					"market" : 4.33,
					"analyst" : 4.25,
					"opskins" : 4.18
				},
				2 : {
					"market" : 2.38,
					"analyst" : 2.54,
					"opskins" : 2.21
				},
				1 : {
					"market" : 2.3,
					"analyst" : 2.55,
					"opskins" : 2.2
				},
				0 : {
					"market" : 2.21,
					"analyst" : 2.49,
					"opskins" : 2.41
				}
			},
			"souvenir" : {}
		}
	},
	"337" : {
		"item_id" : 337,
		"type" : "★ Flip Knife",
		"skinName" : "Doppler",
		"prices" : {
			"default" : {
				4 : {
					"market" : 98.69,
					"analyst" : 107.71,
					"opskins" : 89.5
				},
				3 : {
					"market" : 120.77,
					"analyst" : 119.05,
					"opskins" : 99.59
				}
			},
			"stattrak" : {
				4 : {
					"market" : 142.57,
					"analyst" : 148.7,
					"opskins" : 129.4
				},
				3 : {
					"market" : 196.02,
					"analyst" : 213.82,
					"opskins" : 209.45
				}
			},
			"souvenir" : {}
		}
	},
	"338" : {
		"item_id" : 338,
		"type" : "★ Bayonet",
		"skinName" : "Doppler",
		"prices" : {
			"default" : {
				4 : {
					"market" : 158.93,
					"analyst" : 161.64,
					"opskins" : 129.45
				},
				3 : {
					"market" : 172.75,
					"analyst" : 178.6,
					"opskins" : 149.94
				}
			},
			"stattrak" : {
				4 : {
					"market" : 214.01,
					"analyst" : 208.51,
					"opskins" : 174.94
				},
				3 : {
					"market" : 286.66,
					"analyst" : 283,
					"opskins" : 297
				}
			},
			"souvenir" : {}
		}
	},
	"339" : {
		"item_id" : 339,
		"type" : "Glock-18",
		"skinName" : "Catacombs",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.23,
					"analyst" : 0.19,
					"opskins" : 0.2
				},
				3 : {
					"market" : 0.14,
					"analyst" : 0.13,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.11,
					"opskins" : 0.12
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.16,
					"opskins" : 0.26
				},
				0 : {
					"market" : 0.19,
					"analyst" : 0.17,
					"opskins" : 0.2
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.2,
					"analyst" : 1.11,
					"opskins" : 0.95
				},
				3 : {
					"market" : 0.65,
					"analyst" : 0.67,
					"opskins" : 0.62
				},
				2 : {
					"market" : 0.54,
					"analyst" : 0.54,
					"opskins" : 0.35
				},
				1 : {
					"market" : 0.93,
					"analyst" : 0.88,
					"opskins" : 0.78
				},
				0 : {
					"market" : 0.85,
					"analyst" : 0.8,
					"opskins" : 0.76
				}
			},
			"souvenir" : {}
		}
	},
	"340" : {
		"item_id" : 340,
		"type" : "M249",
		"skinName" : "System Lock",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.19,
					"analyst" : 0.18,
					"opskins" : 0.17
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.15
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.78,
					"analyst" : 0.76,
					"opskins" : 0.71
				},
				3 : {
					"market" : 0.27,
					"analyst" : 0.26,
					"opskins" : 0.23
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.24
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.18
				}
			},
			"souvenir" : {}
		}
	},
	"341" : {
		"item_id" : 341,
		"type" : "MP9",
		"skinName" : "Deadly Poison",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.38,
					"analyst" : 0.41,
					"opskins" : 0.38
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.86,
					"analyst" : 1.88,
					"opskins" : 1.66
				},
				3 : {
					"market" : 0.38,
					"analyst" : 0.41,
					"opskins" : 0.31
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.21
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.19
				}
			},
			"souvenir" : {}
		}
	},
	"342" : {
		"item_id" : 342,
		"type" : "SCAR-20",
		"skinName" : "Grotto",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.13,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.14,
					"opskins" : 0.11
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.48,
					"analyst" : 0.54,
					"opskins" : 0.47
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.32,
					"analyst" : 0.3,
					"opskins" : 0.25
				},
				0 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.26
				}
			},
			"souvenir" : {}
		}
	},
	"343" : {
		"item_id" : 343,
		"type" : "XM1014",
		"skinName" : "Quicksilver",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.11,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				0 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.43,
					"analyst" : 0.46,
					"opskins" : 0.41
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.23,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.24,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.28,
					"opskins" : 0.28
				}
			},
			"souvenir" : {}
		}
	},
	"344" : {
		"item_id" : 344,
		"type" : "Dual Berettas",
		"skinName" : "Urban Shock",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.51,
					"analyst" : 0.55,
					"opskins" : 0.47
				},
				3 : {
					"market" : 0.38,
					"analyst" : 0.36,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.28,
					"opskins" : 0.28
				},
				1 : {
					"market" : 0.47,
					"analyst" : 0.42,
					"opskins" : 0.39
				},
				0 : {
					"market" : 0.43,
					"analyst" : 0.37,
					"opskins" : 1.13
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.41,
					"analyst" : 2.41,
					"opskins" : 2.15
				},
				3 : {
					"market" : 1.49,
					"analyst" : 1.41,
					"opskins" : 1.26
				},
				2 : {
					"market" : 0.97,
					"analyst" : 1.01,
					"opskins" : 0.83
				},
				1 : {
					"market" : 1.07,
					"analyst" : 0.93,
					"opskins" : 1.08
				},
				0 : {
					"market" : 1.28,
					"analyst" : 1.3,
					"opskins" : 2.67
				}
			},
			"souvenir" : {}
		}
	},
	"345" : {
		"item_id" : 345,
		"type" : "Desert Eagle",
		"skinName" : "Naga",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.46,
					"analyst" : 1.43,
					"opskins" : 1.28
				},
				3 : {
					"market" : 0.46,
					"analyst" : 0.49,
					"opskins" : 0.51
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.29,
					"opskins" : 0.27
				},
				1 : {
					"market" : 0.31,
					"analyst" : 0.32,
					"opskins" : 0.31
				},
				0 : {
					"market" : 0.31,
					"analyst" : 0.3,
					"opskins" : 0.33
				}
			},
			"stattrak" : {
				4 : {
					"market" : 8.87,
					"analyst" : 7.85,
					"opskins" : 8.22
				},
				3 : {
					"market" : 2.31,
					"analyst" : 2.26,
					"opskins" : 1.96
				},
				2 : {
					"market" : 1.43,
					"analyst" : 1.41,
					"opskins" : 1.29
				},
				1 : {
					"market" : 1.45,
					"analyst" : 1.44,
					"opskins" : 1.27
				},
				0 : {
					"market" : 1.56,
					"analyst" : 1.38,
					"opskins" : 1.28
				}
			},
			"souvenir" : {}
		}
	},
	"346" : {
		"item_id" : 346,
		"type" : "MAC-10",
		"skinName" : "Malachite",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.59,
					"analyst" : 0.62,
					"opskins" : 0.52
				},
				3 : {
					"market" : 0.4,
					"analyst" : 0.39,
					"opskins" : 0.32
				},
				2 : {
					"market" : 0.29,
					"analyst" : 0.3,
					"opskins" : 0.28
				},
				1 : {
					"market" : 0.66,
					"analyst" : 0.58,
					"opskins" : 0.47
				},
				0 : {
					"market" : 0.39,
					"analyst" : 0.35,
					"opskins" : 0.3
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.18,
					"analyst" : 2.42,
					"opskins" : 2.05
				},
				3 : {
					"market" : 1.34,
					"analyst" : 1.44,
					"opskins" : 1.29
				},
				2 : {
					"market" : 0.99,
					"analyst" : 1.04,
					"opskins" : 0.86
				},
				1 : {
					"market" : 1.21,
					"analyst" : 1.09,
					"opskins" : 1.17
				},
				0 : {
					"market" : 1.08,
					"analyst" : 1.17,
					"opskins" : 0.91
				}
			},
			"souvenir" : {}
		}
	},
	"347" : {
		"item_id" : 347,
		"type" : "Sawed-Off",
		"skinName" : "Serenity",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.58,
					"analyst" : 0.56,
					"opskins" : 0.46
				},
				3 : {
					"market" : 0.39,
					"analyst" : 0.37,
					"opskins" : 0.3
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.28,
					"opskins" : 0.28
				},
				1 : {
					"market" : 0.39,
					"analyst" : 0.35,
					"opskins" : 0.42
				},
				0 : {
					"market" : 0.46,
					"analyst" : 0.34,
					"opskins" : 0.41
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.36,
					"analyst" : 2.36,
					"opskins" : 2.05
				},
				3 : {
					"market" : 1.42,
					"analyst" : 1.4,
					"opskins" : 1.24
				},
				2 : {
					"market" : 0.96,
					"analyst" : 0.95,
					"opskins" : 0.82
				},
				1 : {
					"market" : 2.73,
					"analyst" : 1.16,
					"opskins" : 4.44
				},
				0 : {
					"market" : 1,
					"analyst" : 1.1,
					"opskins" : 0.93
				}
			},
			"souvenir" : {}
		}
	},
	"348" : {
		"item_id" : 348,
		"type" : "Galil AR",
		"skinName" : "Chatterbox",
		"prices" : {
			"default" : {
				2 : {
					"market" : 10.92,
					"analyst" : 9.63,
					"opskins" : 9.3
				},
				1 : {
					"market" : 2.08,
					"analyst" : 2.12,
					"opskins" : 2.04
				},
				0 : {
					"market" : 1.15,
					"analyst" : 1.25,
					"opskins" : 1.07
				}
			},
			"stattrak" : {
				2 : {
					"market" : 78.7,
					"analyst" : 63.47,
					"opskins" : 60
				},
				1 : {
					"market" : 11,
					"analyst" : 11.77,
					"opskins" : 10.85
				},
				0 : {
					"market" : 5.48,
					"analyst" : 5.13,
					"opskins" : 4.98
				}
			},
			"souvenir" : {}
		}
	},
	"350" : {
		"item_id" : 350,
		"type" : "★ Butterfly Knife",
		"skinName" : "Slaughter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 176.72,
					"analyst" : 178.96,
					"opskins" : 148.38
				},
				3 : {
					"market" : 149.38,
					"analyst" : 146.07,
					"opskins" : 122.78
				},
				2 : {
					"market" : 127,
					"analyst" : 132.74,
					"opskins" : 119.9
				}
			},
			"stattrak" : {
				4 : {
					"market" : 329.76,
					"analyst" : 351.31,
					"opskins" : 268
				},
				3 : {
					"market" : 205.79,
					"analyst" : 219.19,
					"opskins" : 189.99
				},
				2 : {
					"market" : 223.02,
					"analyst" : 245.06,
					"opskins" : 177.75
				}
			},
			"souvenir" : {}
		}
	},
	"351" : {
		"item_id" : 351,
		"type" : "R8 Revolver",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.75,
					"analyst" : 1.81,
					"opskins" : 1.6
				},
				3 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.16
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.08
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 14,
					"analyst" : 19.88,
					"opskins" : 19.29
				},
				3 : {
					"market" : 1.12,
					"analyst" : 1.11,
					"opskins" : 0.91
				},
				2 : {
					"market" : 0.34,
					"analyst" : 0.34,
					"opskins" : 0.28
				},
				1 : {
					"market" : 0.54,
					"analyst" : 0.5,
					"opskins" : 0.41
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.35,
					"opskins" : 0.31
				}
			},
			"souvenir" : {}
		}
	},
	"352" : {
		"item_id" : 352,
		"type" : "AUG",
		"skinName" : "Ricochet",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.63,
					"analyst" : 0.66,
					"opskins" : 0.55
				},
				3 : {
					"market" : 0.28,
					"analyst" : 0.26,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.24,
					"opskins" : 0.26
				},
				0 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.09
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.36,
					"analyst" : 3.03,
					"opskins" : 2.64
				},
				3 : {
					"market" : 1.18,
					"analyst" : 1.17,
					"opskins" : 1.01
				},
				2 : {
					"market" : 0.77,
					"analyst" : 0.71,
					"opskins" : 0.64
				},
				1 : {
					"market" : 1.09,
					"analyst" : 1.08,
					"opskins" : 1.04
				},
				0 : {
					"market" : 0.71,
					"analyst" : 0.65,
					"opskins" : 0.69
				}
			},
			"souvenir" : {}
		}
	},
	"353" : {
		"item_id" : 353,
		"type" : "Desert Eagle",
		"skinName" : "Corinthian",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.42,
					"analyst" : 0.43,
					"opskins" : 0.43
				},
				3 : {
					"market" : 0.29,
					"analyst" : 0.29,
					"opskins" : 0.27
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.23,
					"opskins" : 0.21
				},
				1 : {
					"market" : 0.42,
					"analyst" : 0.35,
					"opskins" : 0.4
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.06,
					"analyst" : 2.97,
					"opskins" : 2.6
				},
				3 : {
					"market" : 1.95,
					"analyst" : 1.96,
					"opskins" : 1.61
				},
				2 : {
					"market" : 1.43,
					"analyst" : 1.43,
					"opskins" : 1.28
				},
				1 : {
					"market" : 2.19,
					"analyst" : 1.95,
					"opskins" : 1.93
				}
			},
			"souvenir" : {}
		}
	},
	"354" : {
		"item_id" : 354,
		"type" : "P2000",
		"skinName" : "Imperial",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.21,
					"analyst" : 0.25,
					"opskins" : 0.2
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.12
				},
				2 : {
					"market" : 0.13,
					"analyst" : 0.14,
					"opskins" : 0.12
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1,
					"analyst" : 1.06,
					"opskins" : 0.91
				},
				3 : {
					"market" : 0.84,
					"analyst" : 0.85,
					"opskins" : 0.67
				},
				2 : {
					"market" : 0.59,
					"analyst" : 0.62,
					"opskins" : 0.57
				}
			},
			"souvenir" : {}
		}
	},
	"355" : {
		"item_id" : 355,
		"type" : "Sawed-Off",
		"skinName" : "Yorick",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.35,
					"analyst" : 0.33,
					"opskins" : 0.26
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.1
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.15
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.8,
					"analyst" : 1.61,
					"opskins" : 1.69
				},
				3 : {
					"market" : 0.61,
					"analyst" : 0.59,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.24,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.19
				}
			},
			"souvenir" : {}
		}
	},
	"356" : {
		"item_id" : 356,
		"type" : "SCAR-20",
		"skinName" : "Outbreak",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.16
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.13,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.12,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				0 : {
					"market" : 0.11,
					"analyst" : 0.09,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1,
					"analyst" : 1.07,
					"opskins" : 0.96
				},
				3 : {
					"market" : 0.62,
					"analyst" : 0.61,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.3,
					"analyst" : 0.29,
					"opskins" : 0.25
				},
				1 : {
					"market" : 0.28,
					"analyst" : 0.27,
					"opskins" : 0.24
				},
				0 : {
					"market" : 0.28,
					"analyst" : 0.27,
					"opskins" : 0.48
				}
			},
			"souvenir" : {}
		}
	},
	"357" : {
		"item_id" : 357,
		"type" : "PP-Bizon",
		"skinName" : "Fuel Rod",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.69,
					"analyst" : 1.65,
					"opskins" : 1.42
				},
				3 : {
					"market" : 0.72,
					"analyst" : 0.78,
					"opskins" : 0.68
				},
				2 : {
					"market" : 0.39,
					"analyst" : 0.41,
					"opskins" : 0.33
				},
				1 : {
					"market" : 0.39,
					"analyst" : 0.4,
					"opskins" : 0.35
				},
				0 : {
					"market" : 0.41,
					"analyst" : 0.38,
					"opskins" : 0.4
				}
			},
			"stattrak" : {
				4 : {
					"market" : 9.12,
					"analyst" : 10.2,
					"opskins" : 9.4
				},
				3 : {
					"market" : 3.5,
					"analyst" : 3.85,
					"opskins" : 3.72
				},
				2 : {
					"market" : 1.35,
					"analyst" : 1.42,
					"opskins" : 1.3
				},
				1 : {
					"market" : 1.33,
					"analyst" : 1.3,
					"opskins" : 1.13
				},
				0 : {
					"market" : 1.15,
					"analyst" : 1.21,
					"opskins" : 1.1
				}
			},
			"souvenir" : {}
		}
	},
	"358" : {
		"item_id" : 358,
		"type" : "Five-SeveN",
		"skinName" : "Retrobution",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.36,
					"analyst" : 2.17,
					"opskins" : 2.02
				},
				3 : {
					"market" : 0.76,
					"analyst" : 0.88,
					"opskins" : 0.78
				},
				2 : {
					"market" : 0.37,
					"analyst" : 0.41,
					"opskins" : 0.38
				},
				1 : {
					"market" : 0.4,
					"analyst" : 0.46,
					"opskins" : 0.38
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.4,
					"opskins" : 0.39
				}
			},
			"stattrak" : {
				4 : {
					"market" : 14.73,
					"analyst" : 14.97,
					"opskins" : 14
				},
				3 : {
					"market" : 5.82,
					"analyst" : 5.44,
					"opskins" : 4.69
				},
				2 : {
					"market" : 2.11,
					"analyst" : 1.93,
					"opskins" : 1.7
				},
				1 : {
					"market" : 1.55,
					"analyst" : 1.44,
					"opskins" : 1.25
				},
				0 : {
					"market" : 1.23,
					"analyst" : 1.19,
					"opskins" : 1.07
				}
			},
			"souvenir" : {}
		}
	},
	"359" : {
		"item_id" : 359,
		"type" : "Negev",
		"skinName" : "Power Loader",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.8,
					"analyst" : 1.79,
					"opskins" : 1.54
				},
				3 : {
					"market" : 0.8,
					"analyst" : 0.83,
					"opskins" : 0.64
				},
				2 : {
					"market" : 0.4,
					"analyst" : 0.43,
					"opskins" : 0.34
				},
				1 : {
					"market" : 0.42,
					"analyst" : 0.43,
					"opskins" : 0.39
				},
				0 : {
					"market" : 0.47,
					"analyst" : 0.44,
					"opskins" : 0.45
				}
			},
			"stattrak" : {
				4 : {
					"market" : 10.03,
					"analyst" : 8.54,
					"opskins" : 7.17
				},
				3 : {
					"market" : 3.76,
					"analyst" : 3.82,
					"opskins" : 2.96
				},
				2 : {
					"market" : 1.57,
					"analyst" : 1.42,
					"opskins" : 1.25
				},
				1 : {
					"market" : 1.09,
					"analyst" : 1.22,
					"opskins" : 1.01
				},
				0 : {
					"market" : 1.24,
					"analyst" : 1.19,
					"opskins" : 0.96
				}
			},
			"souvenir" : {}
		}
	},
	"360" : {
		"item_id" : 360,
		"type" : "SG 553",
		"skinName" : "Tiger Moth",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.66,
					"analyst" : 1.83,
					"opskins" : 1.64
				},
				3 : {
					"market" : 0.74,
					"analyst" : 0.82,
					"opskins" : 0.63
				},
				2 : {
					"market" : 0.38,
					"analyst" : 0.41,
					"opskins" : 0.35
				},
				1 : {
					"market" : 0.46,
					"analyst" : 0.45,
					"opskins" : 0.38
				},
				0 : {
					"market" : 0.4,
					"analyst" : 0.4,
					"opskins" : 0.32
				}
			},
			"stattrak" : {
				4 : {
					"market" : 13,
					"analyst" : 12.33,
					"opskins" : 11.36
				},
				3 : {
					"market" : 4.26,
					"analyst" : 4.53,
					"opskins" : 4.27
				},
				2 : {
					"market" : 2.13,
					"analyst" : 2.16,
					"opskins" : 1.81
				},
				1 : {
					"market" : 1.77,
					"analyst" : 1.78,
					"opskins" : 1.59
				},
				0 : {
					"market" : 1.56,
					"analyst" : 1.62,
					"opskins" : 1.52
				}
			},
			"souvenir" : {}
		}
	},
	"361" : {
		"item_id" : 361,
		"type" : "Tec-9",
		"skinName" : "Avalanche",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.4,
					"analyst" : 3.53,
					"opskins" : 3.03
				},
				3 : {
					"market" : 1.31,
					"analyst" : 1.41,
					"opskins" : 1.2
				},
				2 : {
					"market" : 0.55,
					"analyst" : 0.58,
					"opskins" : 0.47
				},
				1 : {
					"market" : 0.49,
					"analyst" : 0.49,
					"opskins" : 0.42
				},
				0 : {
					"market" : 0.38,
					"analyst" : 0.42,
					"opskins" : 0.33
				}
			},
			"stattrak" : {
				4 : {
					"market" : 16.45,
					"analyst" : 16.63,
					"opskins" : 15
				},
				3 : {
					"market" : 8.69,
					"analyst" : 8.21,
					"opskins" : 7
				},
				2 : {
					"market" : 3.38,
					"analyst" : 3.91,
					"opskins" : 3.27
				},
				1 : {
					"market" : 3.1,
					"analyst" : 3.01,
					"opskins" : 2.63
				},
				0 : {
					"market" : 2.42,
					"analyst" : 2.39,
					"opskins" : 2.15
				}
			},
			"souvenir" : {}
		}
	},
	"362" : {
		"item_id" : 362,
		"type" : "XM1014",
		"skinName" : "Teclu Burner",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.1,
					"analyst" : 1.3,
					"opskins" : 1.19
				},
				3 : {
					"market" : 0.74,
					"analyst" : 0.76,
					"opskins" : 0.63
				},
				2 : {
					"market" : 0.39,
					"analyst" : 0.41,
					"opskins" : 0.32
				},
				1 : {
					"market" : 0.58,
					"analyst" : 0.6,
					"opskins" : 0.51
				},
				0 : {
					"market" : 0.41,
					"analyst" : 0.41,
					"opskins" : 0.34
				}
			},
			"stattrak" : {
				4 : {
					"market" : 6.44,
					"analyst" : 6.31,
					"opskins" : 5.81
				},
				3 : {
					"market" : 3.71,
					"analyst" : 3.43,
					"opskins" : 2.96
				},
				2 : {
					"market" : 1.42,
					"analyst" : 1.54,
					"opskins" : 1.34
				},
				1 : {
					"market" : 2.35,
					"analyst" : 2.5,
					"opskins" : 2.6
				},
				0 : {
					"market" : 1.15,
					"analyst" : 1.29,
					"opskins" : 1.44
				}
			},
			"souvenir" : {}
		}
	},
	"363" : {
		"item_id" : 363,
		"type" : "G3SG1",
		"skinName" : "The Executioner",
		"prices" : {
			"default" : {
				3 : {
					"market" : 12.23,
					"analyst" : 11.62,
					"opskins" : 11.13
				},
				2 : {
					"market" : 0.92,
					"analyst" : 1,
					"opskins" : 0.81
				},
				1 : {
					"market" : 1.1,
					"analyst" : 0.99,
					"opskins" : 0.89
				},
				0 : {
					"market" : 1.03,
					"analyst" : 0.99,
					"opskins" : 0.82
				}
			},
			"stattrak" : {
				3 : {
					"market" : 350,
					"analyst" : 124.25,
					"opskins" : 125
				},
				2 : {
					"market" : 3.39,
					"analyst" : 4.15,
					"opskins" : 3.67
				},
				1 : {
					"market" : 3.56,
					"analyst" : 3.41,
					"opskins" : 3
				},
				0 : {
					"market" : 3.14,
					"analyst" : 3.27,
					"opskins" : 2.91
				}
			},
			"souvenir" : {}
		}
	},
	"364" : {
		"item_id" : 364,
		"type" : "P90",
		"skinName" : "Shapewood",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.55,
					"analyst" : 4.71,
					"opskins" : 3.89
				},
				3 : {
					"market" : 1.32,
					"analyst" : 1.54,
					"opskins" : 1.27
				},
				2 : {
					"market" : 0.96,
					"analyst" : 1.02,
					"opskins" : 0.83
				},
				1 : {
					"market" : 1.16,
					"analyst" : 1.03,
					"opskins" : 0.86
				},
				0 : {
					"market" : 1.08,
					"analyst" : 1.02,
					"opskins" : 0.86
				}
			},
			"stattrak" : {
				4 : {
					"market" : 26.8,
					"analyst" : 26.87,
					"opskins" : 27.43
				},
				3 : {
					"market" : 7.42,
					"analyst" : 6.17,
					"opskins" : 6.15
				},
				2 : {
					"market" : 3.93,
					"analyst" : 3.55,
					"opskins" : 2.97
				},
				1 : {
					"market" : 3.15,
					"analyst" : 3.15,
					"opskins" : 2.9
				},
				0 : {
					"market" : 3.46,
					"analyst" : 3.31,
					"opskins" : 2.79
				}
			},
			"souvenir" : {}
		}
	},
	"365" : {
		"item_id" : 365,
		"type" : "M4A4",
		"skinName" : "Royal Paladin",
		"prices" : {
			"default" : {
				4 : {
					"market" : 37.64,
					"analyst" : 41.76,
					"opskins" : 35.95
				},
				3 : {
					"market" : 13.71,
					"analyst" : 12.92,
					"opskins" : 11.49
				},
				2 : {
					"market" : 4.77,
					"analyst" : 4.91,
					"opskins" : 4.64
				},
				1 : {
					"market" : 7.95,
					"analyst" : 7.65,
					"opskins" : 7.2
				},
				0 : {
					"market" : 3.82,
					"analyst" : 4.02,
					"opskins" : 3.88
				}
			},
			"stattrak" : {
				4 : {
					"market" : 275,
					"analyst" : 265.84,
					"opskins" : 374.99
				},
				3 : {
					"market" : 73.06,
					"analyst" : 60.2,
					"opskins" : 51.25
				},
				2 : {
					"market" : 25.42,
					"analyst" : 25.43,
					"opskins" : 23
				},
				1 : {
					"market" : 34.43,
					"analyst" : 36.07,
					"opskins" : 35.12
				},
				0 : {
					"market" : 20.53,
					"analyst" : 19.66,
					"opskins" : 17.24
				}
			},
			"souvenir" : {}
		}
	},
	"366" : {
		"item_id" : 366,
		"type" : "R8 Revolver",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.66,
					"analyst" : 7.83,
					"opskins" : 7.97
				},
				3 : {
					"market" : 2.81,
					"analyst" : 2.76,
					"opskins" : 2.67
				},
				2 : {
					"market" : 1.7,
					"analyst" : 1.84,
					"opskins" : 1.8
				},
				1 : {
					"market" : 4.87,
					"analyst" : 3.33,
					"opskins" : 3.45
				}
			},
			"stattrak" : {
				4 : {
					"market" : 28.75,
					"analyst" : 24.93,
					"opskins" : 26.49
				},
				3 : {
					"market" : 13.89,
					"analyst" : 13.7,
					"opskins" : 13.3
				},
				2 : {
					"market" : 7.79,
					"analyst" : 8.26,
					"opskins" : 12.99
				},
				1 : {
					"market" : 100.32,
					"analyst" : 34.19,
					"opskins" : 37.89
				}
			},
			"souvenir" : {}
		}
	},
	"367" : {
		"item_id" : 367,
		"type" : "★ Huntsman Knife",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 157.41,
					"analyst" : 133.94,
					"opskins" : 122.28
				},
				3 : {
					"market" : 75.52,
					"analyst" : 79.45,
					"opskins" : 81
				},
				2 : {
					"market" : 70.15,
					"analyst" : 69.86,
					"opskins" : 63.5
				},
				1 : {
					"market" : 63.59,
					"analyst" : 67.93,
					"opskins" : 57.94
				},
				0 : {
					"market" : 68.1,
					"analyst" : 65.47,
					"opskins" : 57.1
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 500,
					"opskins" : 500
				},
				3 : {
					"market" : 150.82,
					"analyst" : 157.29,
					"opskins" : 139.31
				},
				2 : {
					"market" : 116.15,
					"analyst" : 128.07,
					"opskins" : 103.98
				},
				1 : {
					"market" : 121.95,
					"analyst" : 113.68,
					"opskins" : 110
				},
				0 : {
					"market" : 101.7,
					"analyst" : 94.76,
					"opskins" : 96
				}
			},
			"souvenir" : {}
		}
	},
	"368" : {
		"item_id" : 368,
		"type" : "★ Karambit",
		"skinName" : "Slaughter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 295.45,
					"analyst" : 316.51,
					"opskins" : 255
				},
				3 : {
					"market" : 246,
					"analyst" : 253.45,
					"opskins" : 207.69
				},
				2 : {
					"market" : 211.54,
					"analyst" : 222.6,
					"opskins" : 190
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 335,
					"opskins" : 365.99
				},
				3 : {
					"market" : 361.39,
					"analyst" : 377.58,
					"opskins" : 301
				},
				2 : {
					"market" : 341.13,
					"analyst" : 329.19,
					"opskins" : 269
				}
			},
			"souvenir" : {}
		}
	},
	"369" : {
		"item_id" : 369,
		"type" : "★ M9 Bayonet",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 3660,
					"opskins" : 2921.31
				},
				3 : {
					"market" : 400,
					"analyst" : 336,
					"opskins" : 333.99
				},
				2 : {
					"market" : 114.22,
					"analyst" : 120.1,
					"opskins" : 100.95
				},
				1 : {
					"market" : 110.19,
					"analyst" : 106.76,
					"opskins" : 95.84
				},
				0 : {
					"market" : 85.12,
					"analyst" : 95.08,
					"opskins" : 84.91
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 5023,
					"opskins" : -1
				},
				3 : {
					"market" : -1,
					"analyst" : 475,
					"opskins" : 507.89
				},
				2 : {
					"market" : 190.76,
					"analyst" : 182.79,
					"opskins" : 143.99
				},
				1 : {
					"market" : 227.79,
					"analyst" : 187.54,
					"opskins" : 150.44
				},
				0 : {
					"market" : 141.45,
					"analyst" : 138.29,
					"opskins" : 138
				}
			},
			"souvenir" : {}
		}
	},
	"370" : {
		"item_id" : 370,
		"type" : "Galil AR",
		"skinName" : "Sandstorm",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.25,
					"analyst" : 0.29,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.29,
					"opskins" : 0.23
				},
				0 : {
					"market" : 0.15,
					"analyst" : 0.17,
					"opskins" : 0.18
				}
			},
			"stattrak" : {
				3 : {
					"market" : 0.62,
					"analyst" : 0.73,
					"opskins" : 0.6
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.37,
					"analyst" : 0.43,
					"opskins" : 0.42
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.26,
					"opskins" : 0.23
				}
			},
			"souvenir" : {}
		}
	},
	"371" : {
		"item_id" : 371,
		"type" : "Five-SeveN",
		"skinName" : "Kami",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.32,
					"analyst" : 0.35,
					"opskins" : 0.28
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.27
				},
				2 : {
					"market" : 0.25,
					"analyst" : 0.25,
					"opskins" : 0.23
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.01,
					"analyst" : 1.1,
					"opskins" : 0.91
				},
				3 : {
					"market" : 0.72,
					"analyst" : 0.8,
					"opskins" : 0.7
				},
				2 : {
					"market" : 0.73,
					"analyst" : 0.79,
					"opskins" : 0.69
				}
			},
			"souvenir" : {}
		}
	},
	"372" : {
		"item_id" : 372,
		"type" : "M249",
		"skinName" : "Magma",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.24
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.12,
					"opskins" : 0.42
				},
				2 : {
					"market" : 0.1,
					"analyst" : 0.1,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.25,
					"opskins" : 0.36
				},
				0 : {
					"market" : 0.1,
					"analyst" : 0.13,
					"opskins" : 0.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.76,
					"analyst" : 0.82,
					"opskins" : 0.83
				},
				3 : {
					"market" : 0.39,
					"analyst" : 0.4,
					"opskins" : 0.36
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.27,
					"analyst" : 0.22,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.28,
					"analyst" : 0.24,
					"opskins" : 0.25
				}
			},
			"souvenir" : {}
		}
	},
	"373" : {
		"item_id" : 373,
		"type" : "PP-Bizon",
		"skinName" : "Cobalt Halftone",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.46,
					"analyst" : 0.51,
					"opskins" : 0.47
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.15
				},
				1 : {
					"market" : 0.17,
					"analyst" : 0.18,
					"opskins" : 0.2
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.74,
					"analyst" : 1.67,
					"opskins" : 1.53
				},
				3 : {
					"market" : 0.39,
					"analyst" : 0.41,
					"opskins" : 0.31
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.25,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.24
				}
			},
			"souvenir" : {}
		}
	},
	"374" : {
		"item_id" : 374,
		"type" : "FAMAS",
		"skinName" : "Pulse",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.31,
					"analyst" : 1.3,
					"opskins" : 1.22
				},
				3 : {
					"market" : 0.94,
					"analyst" : 0.97,
					"opskins" : 0.89
				},
				2 : {
					"market" : 1.04,
					"analyst" : 0.92,
					"opskins" : 0.78
				},
				1 : {
					"market" : 1.87,
					"analyst" : 1.31,
					"opskins" : 2.03
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.14,
					"analyst" : 4.54,
					"opskins" : 3.9
				},
				3 : {
					"market" : 2.84,
					"analyst" : 2.96,
					"opskins" : 2.5
				},
				2 : {
					"market" : 2.12,
					"analyst" : 2.18,
					"opskins" : 1.97
				},
				1 : {
					"market" : 3.06,
					"analyst" : 3.29,
					"opskins" : 3.61
				}
			},
			"souvenir" : {}
		}
	},
	"375" : {
		"item_id" : 375,
		"type" : "Dual Berettas",
		"skinName" : "Marina",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.49,
					"analyst" : 3.32,
					"opskins" : 2.74
				},
				3 : {
					"market" : 0.86,
					"analyst" : 0.84,
					"opskins" : 0.76
				},
				2 : {
					"market" : 0.77,
					"analyst" : 0.76,
					"opskins" : 0.69
				},
				1 : {
					"market" : 1.2,
					"analyst" : 0.92,
					"opskins" : 0.85
				},
				0 : {
					"market" : 1.2,
					"analyst" : 1.59,
					"opskins" : 1.36
				}
			},
			"stattrak" : {
				4 : {
					"market" : 21.43,
					"analyst" : 19.01,
					"opskins" : 17.5
				},
				3 : {
					"market" : 2.67,
					"analyst" : 2.79,
					"opskins" : 2.6
				},
				2 : {
					"market" : 1.81,
					"analyst" : 1.96,
					"opskins" : 1.72
				},
				1 : {
					"market" : 1.96,
					"analyst" : 2.11,
					"opskins" : 1.84
				},
				0 : {
					"market" : 1.97,
					"analyst" : 2.03,
					"opskins" : 2.32
				}
			},
			"souvenir" : {}
		}
	},
	"376" : {
		"item_id" : 376,
		"type" : "MP9",
		"skinName" : "Rose Iron",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.45,
					"analyst" : 1.47,
					"opskins" : 1.28
				},
				3 : {
					"market" : 1.16,
					"analyst" : 1.22,
					"opskins" : 1.15
				},
				2 : {
					"market" : 1.03,
					"analyst" : 1.07,
					"opskins" : 1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.87,
					"analyst" : 5.02,
					"opskins" : 5
				},
				3 : {
					"market" : 3.04,
					"analyst" : 3.18,
					"opskins" : 2.79
				},
				2 : {
					"market" : 2.56,
					"analyst" : 2.45,
					"opskins" : 2.16
				}
			},
			"souvenir" : {}
		}
	},
	"377" : {
		"item_id" : 377,
		"type" : "Nova",
		"skinName" : "Rising Skull",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.3,
					"analyst" : 1.13,
					"opskins" : 1.01
				},
				3 : {
					"market" : 1.09,
					"analyst" : 0.88,
					"opskins" : 0.72
				},
				2 : {
					"market" : 0.89,
					"analyst" : 0.8,
					"opskins" : 0.69
				},
				1 : {
					"market" : 1.21,
					"analyst" : 0.91,
					"opskins" : 0.79
				},
				0 : {
					"market" : 0.71,
					"analyst" : 1.89,
					"opskins" : 1.63
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.03,
					"analyst" : 4.26,
					"opskins" : 3.72
				},
				3 : {
					"market" : 2.78,
					"analyst" : 2.73,
					"opskins" : 2.35
				},
				2 : {
					"market" : 1.92,
					"analyst" : 1.72,
					"opskins" : 1.63
				},
				1 : {
					"market" : 1.95,
					"analyst" : 2.76,
					"opskins" : 2.21
				},
				0 : {
					"market" : 2.1,
					"analyst" : 2.17,
					"opskins" : 1.7
				}
			},
			"souvenir" : {}
		}
	},
	"378" : {
		"item_id" : 378,
		"type" : "M4A1-S",
		"skinName" : "Guardian",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.23,
					"analyst" : 5.9,
					"opskins" : 5.19
				},
				3 : {
					"market" : 4.25,
					"analyst" : 4.83,
					"opskins" : 4.3
				},
				2 : {
					"market" : 4.04,
					"analyst" : 4.23,
					"opskins" : 3.65
				},
				1 : {
					"market" : 4.31,
					"analyst" : 4.76,
					"opskins" : 4.07
				},
				0 : {
					"market" : 4.26,
					"analyst" : 4.48,
					"opskins" : 4
				}
			},
			"stattrak" : {
				4 : {
					"market" : 30.17,
					"analyst" : 29.26,
					"opskins" : 26
				},
				3 : {
					"market" : 18.05,
					"analyst" : 19.07,
					"opskins" : 17.27
				},
				2 : {
					"market" : 12.57,
					"analyst" : 13.35,
					"opskins" : 12.29
				},
				1 : {
					"market" : 16.3,
					"analyst" : 14.9,
					"opskins" : 13.85
				},
				0 : {
					"market" : 14.76,
					"analyst" : 15.17,
					"opskins" : 12.94
				}
			},
			"souvenir" : {}
		}
	},
	"379" : {
		"item_id" : 379,
		"type" : "P250",
		"skinName" : "Mehndi",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.83,
					"analyst" : 6.97,
					"opskins" : 6.28
				},
				3 : {
					"market" : 3.17,
					"analyst" : 3.59,
					"opskins" : 3.11
				},
				2 : {
					"market" : 2.67,
					"analyst" : 3.11,
					"opskins" : 2.75
				},
				1 : {
					"market" : 2.78,
					"analyst" : 2.91,
					"opskins" : 2.7
				},
				0 : {
					"market" : 2.64,
					"analyst" : 2.77,
					"opskins" : 3.14
				}
			},
			"stattrak" : {
				4 : {
					"market" : 43.7,
					"analyst" : 43.21,
					"opskins" : 37.77
				},
				3 : {
					"market" : 17.48,
					"analyst" : 17.59,
					"opskins" : 16
				},
				2 : {
					"market" : 10.27,
					"analyst" : 10.36,
					"opskins" : 8.99
				},
				1 : {
					"market" : 8.47,
					"analyst" : 8.24,
					"opskins" : 7.34
				},
				0 : {
					"market" : 7.29,
					"analyst" : 6.58,
					"opskins" : 6.23
				}
			},
			"souvenir" : {}
		}
	},
	"380" : {
		"item_id" : 380,
		"type" : "Sawed-Off",
		"skinName" : "The Kraken",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.11,
					"analyst" : 4.03,
					"opskins" : 3.72
				},
				3 : {
					"market" : 2.34,
					"analyst" : 2.74,
					"opskins" : 2.5
				},
				2 : {
					"market" : 2.22,
					"analyst" : 2.18,
					"opskins" : 2.15
				},
				1 : {
					"market" : 3.99,
					"analyst" : 3.99,
					"opskins" : 3.67
				}
			},
			"stattrak" : {
				4 : {
					"market" : 25.44,
					"analyst" : 25.6,
					"opskins" : 23.01
				},
				3 : {
					"market" : 12.19,
					"analyst" : 13.97,
					"opskins" : 20.56
				},
				2 : {
					"market" : 7.71,
					"analyst" : 7.75,
					"opskins" : 7.8
				},
				1 : {
					"market" : 11.57,
					"analyst" : 16.67,
					"opskins" : 49.99
				}
			},
			"souvenir" : {}
		}
	},
	"381" : {
		"item_id" : 381,
		"type" : "★ Gut Knife",
		"skinName" : "Tiger Tooth",
		"prices" : {
			"default" : {
				4 : {
					"market" : 65.18,
					"analyst" : 67.08,
					"opskins" : 59.99
				},
				3 : {
					"market" : 80,
					"analyst" : 77.58,
					"opskins" : 65.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : 97.6,
					"analyst" : 94.6,
					"opskins" : 80.94
				},
				3 : {
					"market" : 159.18,
					"analyst" : 108.44,
					"opskins" : 500
				}
			},
			"souvenir" : {}
		}
	},
	"382" : {
		"item_id" : 382,
		"type" : "★ Flip Knife",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 121.83,
					"analyst" : 116.41,
					"opskins" : 103.25
				},
				3 : {
					"market" : 116.54,
					"analyst" : 170.5,
					"opskins" : 163.92
				}
			},
			"stattrak" : {
				4 : {
					"market" : 191.48,
					"analyst" : 180.04,
					"opskins" : 144.89
				},
				3 : {
					"market" : 306.93,
					"analyst" : -1,
					"opskins" : 219.99
				}
			},
			"souvenir" : {}
		}
	},
	"383" : {
		"item_id" : 383,
		"type" : "★ Huntsman Knife",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 424,
					"opskins" : 499.99
				},
				3 : {
					"market" : 84.04,
					"analyst" : 83.03,
					"opskins" : 72.93
				},
				2 : {
					"market" : 55.97,
					"analyst" : 52.6,
					"opskins" : 45.88
				},
				1 : {
					"market" : 62,
					"analyst" : 56.26,
					"opskins" : 49.34
				},
				0 : {
					"market" : 55.72,
					"analyst" : 49.95,
					"opskins" : 43.45
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 2007,
					"opskins" : 1889
				},
				3 : {
					"market" : 169.53,
					"analyst" : 174.06,
					"opskins" : 160
				},
				2 : {
					"market" : 78.08,
					"analyst" : 76.5,
					"opskins" : 74.94
				},
				1 : {
					"market" : 249.98,
					"analyst" : 82.73,
					"opskins" : 99.95
				},
				0 : {
					"market" : 71,
					"analyst" : 70.54,
					"opskins" : 99.99
				}
			},
			"souvenir" : {}
		}
	},
	"384" : {
		"item_id" : 384,
		"type" : "Galil AR",
		"skinName" : "Rocket Pop",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.62,
					"analyst" : 0.6,
					"opskins" : 0.61
				},
				3 : {
					"market" : 0.14,
					"analyst" : 0.14,
					"opskins" : 0.13
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.11,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.93,
					"analyst" : 2.99,
					"opskins" : 2.69
				},
				3 : {
					"market" : 0.53,
					"analyst" : 0.58,
					"opskins" : 0.5
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.24,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.19
				}
			},
			"souvenir" : {}
		}
	},
	"385" : {
		"item_id" : 385,
		"type" : "Glock-18",
		"skinName" : "Bunsen Burner",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.43,
					"analyst" : 0.41,
					"opskins" : 0.34
				},
				3 : {
					"market" : 0.18,
					"analyst" : 0.17,
					"opskins" : 0.16
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.12,
					"opskins" : 0.15
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.22,
					"opskins" : 0.22
				},
				0 : {
					"market" : 0.14,
					"analyst" : 0.12,
					"opskins" : 0.11
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.58,
					"analyst" : 2.47,
					"opskins" : 2.14
				},
				3 : {
					"market" : 0.8,
					"analyst" : 0.95,
					"opskins" : 0.81
				},
				2 : {
					"market" : 0.58,
					"analyst" : 0.61,
					"opskins" : 0.56
				},
				1 : {
					"market" : 1.22,
					"analyst" : 1.19,
					"opskins" : 1.13
				},
				0 : {
					"market" : 0.66,
					"analyst" : 0.66,
					"opskins" : 0.55
				}
			},
			"souvenir" : {}
		}
	},
	"386" : {
		"item_id" : 386,
		"type" : "Nova",
		"skinName" : "Ranger",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.18,
					"analyst" : 0.17,
					"opskins" : 0.14
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.8,
					"analyst" : 0.87,
					"opskins" : 0.76
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.28,
					"opskins" : 0.25
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.16
				}
			},
			"souvenir" : {}
		}
	},
	"387" : {
		"item_id" : 387,
		"type" : "P90",
		"skinName" : "Elite Build",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.49,
					"analyst" : 0.59,
					"opskins" : 0.57
				},
				3 : {
					"market" : 0.14,
					"analyst" : 0.16,
					"opskins" : 0.13
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.08
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.47,
					"analyst" : 3.78,
					"opskins" : 3.54
				},
				3 : {
					"market" : 0.75,
					"analyst" : 0.85,
					"opskins" : 0.69
				},
				2 : {
					"market" : 0.48,
					"analyst" : 0.49,
					"opskins" : 0.42
				},
				1 : {
					"market" : 0.38,
					"analyst" : 0.43,
					"opskins" : 0.39
				},
				0 : {
					"market" : 0.38,
					"analyst" : 0.42,
					"opskins" : 0.38
				}
			},
			"souvenir" : {}
		}
	},
	"388" : {
		"item_id" : 388,
		"type" : "UMP-45",
		"skinName" : "Riot",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.19,
					"analyst" : 0.18,
					"opskins" : 0.17
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.16,
					"analyst" : 0.09,
					"opskins" : 0.11
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.28,
					"analyst" : 1.33,
					"opskins" : 1.13
				},
				3 : {
					"market" : 0.47,
					"analyst" : 0.45,
					"opskins" : 0.4
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.2
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.4,
					"opskins" : 0.4
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.21,
					"opskins" : 0.19
				}
			},
			"souvenir" : {}
		}
	},
	"389" : {
		"item_id" : 389,
		"type" : "USP-S",
		"skinName" : "Torque",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.64,
					"analyst" : 0.47,
					"opskins" : 0.6
				},
				3 : {
					"market" : 0.5,
					"analyst" : 0.29,
					"opskins" : 0.41
				},
				2 : {
					"market" : 0.35,
					"analyst" : 0.17,
					"opskins" : 0.34
				},
				1 : {
					"market" : 0.43,
					"analyst" : 0.23,
					"opskins" : 0.35
				},
				0 : {
					"market" : 0.39,
					"analyst" : 0.43,
					"opskins" : 0.4
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.55,
					"analyst" : 2.59,
					"opskins" : 2.25
				},
				3 : {
					"market" : 1.87,
					"analyst" : 1.85,
					"opskins" : 1.62
				},
				2 : {
					"market" : 1.18,
					"analyst" : 1.18,
					"opskins" : 1.12
				},
				1 : {
					"market" : 1.55,
					"analyst" : 1.39,
					"opskins" : 1.39
				},
				0 : {
					"market" : 2.01,
					"analyst" : 1.49,
					"opskins" : 10
				}
			},
			"souvenir" : {}
		}
	},
	"390" : {
		"item_id" : 390,
		"type" : "FAMAS",
		"skinName" : "Neural Net",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.43,
					"analyst" : 0.47,
					"opskins" : 0.38
				},
				3 : {
					"market" : 0.28,
					"analyst" : 0.29,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.26,
					"opskins" : 0.27
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.23,
					"opskins" : 0.2
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.19,
					"analyst" : 2.27,
					"opskins" : 2
				},
				3 : {
					"market" : 1.2,
					"analyst" : 1.25,
					"opskins" : 1.05
				},
				2 : {
					"market" : 0.64,
					"analyst" : 0.68,
					"opskins" : 0.58
				},
				1 : {
					"market" : 1.03,
					"analyst" : 0.87,
					"opskins" : 0.68
				},
				0 : {
					"market" : 0.61,
					"analyst" : 0.64,
					"opskins" : 0.62
				}
			},
			"souvenir" : {}
		}
	},
	"391" : {
		"item_id" : 391,
		"type" : "M4A4",
		"skinName" : "Evil Daimyo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2,
					"analyst" : 1.99,
					"opskins" : 1.8
				},
				3 : {
					"market" : 1.2,
					"analyst" : 1.24,
					"opskins" : 1.09
				},
				2 : {
					"market" : 0.92,
					"analyst" : 0.84,
					"opskins" : 0.82
				},
				1 : {
					"market" : 1.16,
					"analyst" : 1.02,
					"opskins" : 0.99
				},
				0 : {
					"market" : 0.92,
					"analyst" : 0.76,
					"opskins" : 0.83
				}
			},
			"stattrak" : {
				4 : {
					"market" : 8.79,
					"analyst" : 8.97,
					"opskins" : 8.02
				},
				3 : {
					"market" : 6.04,
					"analyst" : 5.85,
					"opskins" : 5.14
				},
				2 : {
					"market" : 3.72,
					"analyst" : 3.7,
					"opskins" : 3.48
				},
				1 : {
					"market" : 4.03,
					"analyst" : 4.2,
					"opskins" : 3.65
				},
				0 : {
					"market" : 4.23,
					"analyst" : 3.76,
					"opskins" : 3.42
				}
			},
			"souvenir" : {}
		}
	},
	"392" : {
		"item_id" : 392,
		"type" : "MP9",
		"skinName" : "Ruby Poison Dart",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.38,
					"analyst" : 0.46,
					"opskins" : 0.42
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.27,
					"analyst" : 0.3,
					"opskins" : 0.25
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.28,
					"opskins" : 0.24
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.44,
					"analyst" : 2.27,
					"opskins" : 2.08
				},
				3 : {
					"market" : 1.3,
					"analyst" : 1.3,
					"opskins" : 1.14
				},
				2 : {
					"market" : 0.73,
					"analyst" : 0.7,
					"opskins" : 0.58
				},
				1 : {
					"market" : 0.88,
					"analyst" : 0.89,
					"opskins" : 0.82
				},
				0 : {
					"market" : 1.05,
					"analyst" : 0.85,
					"opskins" : 0.82
				}
			},
			"souvenir" : {}
		}
	},
	"393" : {
		"item_id" : 393,
		"type" : "Negev",
		"skinName" : "Loudmouth",
		"prices" : {
			"default" : {
				3 : {
					"market" : 1.49,
					"analyst" : 1.47,
					"opskins" : 1.36
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.23
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.2
				}
			},
			"stattrak" : {
				3 : {
					"market" : 16.1,
					"analyst" : 6.85,
					"opskins" : 12.57
				},
				2 : {
					"market" : 0.6,
					"analyst" : 0.61,
					"opskins" : 0.51
				},
				1 : {
					"market" : 0.82,
					"analyst" : 0.78,
					"opskins" : 0.58
				},
				0 : {
					"market" : 0.6,
					"analyst" : 0.53,
					"opskins" : 0.53
				}
			},
			"souvenir" : {}
		}
	},
	"394" : {
		"item_id" : 394,
		"type" : "P2000",
		"skinName" : "Handgun",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.04,
					"analyst" : 1.09,
					"opskins" : 0.93
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.29,
					"opskins" : 0.25
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.22,
					"opskins" : 0.21
				}
			},
			"stattrak" : {
				4 : {
					"market" : 6.5,
					"analyst" : 7.85,
					"opskins" : 6.75
				},
				3 : {
					"market" : 1.78,
					"analyst" : 1.84,
					"opskins" : 1.52
				},
				2 : {
					"market" : 0.73,
					"analyst" : 0.8,
					"opskins" : 0.67
				},
				1 : {
					"market" : 0.62,
					"analyst" : 0.71,
					"opskins" : 0.58
				},
				0 : {
					"market" : 0.61,
					"analyst" : 0.67,
					"opskins" : 0.56
				}
			},
			"souvenir" : {}
		}
	},
	"395" : {
		"item_id" : 395,
		"type" : "CZ75-Auto",
		"skinName" : "Yellow Jacket",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.32,
					"analyst" : 4.33,
					"opskins" : 3.8
				},
				3 : {
					"market" : 2.16,
					"analyst" : 2.38,
					"opskins" : 2.08
				},
				2 : {
					"market" : 1.58,
					"analyst" : 1.59,
					"opskins" : 1.41
				},
				1 : {
					"market" : 1.53,
					"analyst" : 1.57,
					"opskins" : 1.37
				},
				0 : {
					"market" : 1.53,
					"analyst" : 1.47,
					"opskins" : 1.35
				}
			},
			"stattrak" : {
				4 : {
					"market" : 21.3,
					"analyst" : 18.89,
					"opskins" : 18.4
				},
				3 : {
					"market" : 7.7,
					"analyst" : 8.08,
					"opskins" : 7.49
				},
				2 : {
					"market" : 4.72,
					"analyst" : 5.09,
					"opskins" : 4.41
				},
				1 : {
					"market" : 4.06,
					"analyst" : 4.12,
					"opskins" : 3.99
				},
				0 : {
					"market" : 4.25,
					"analyst" : 3.91,
					"opskins" : 7.79
				}
			},
			"souvenir" : {}
		}
	},
	"396" : {
		"item_id" : 396,
		"type" : "MP7",
		"skinName" : "Nemesis",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.39,
					"analyst" : 3.68,
					"opskins" : 3.05
				},
				3 : {
					"market" : 2.11,
					"analyst" : 2.44,
					"opskins" : 2.13
				},
				2 : {
					"market" : 2.13,
					"analyst" : 2.12,
					"opskins" : 1.8
				}
			},
			"stattrak" : {
				4 : {
					"market" : 18.01,
					"analyst" : 17.77,
					"opskins" : 15.49
				},
				3 : {
					"market" : 9.32,
					"analyst" : 8.87,
					"opskins" : 8
				},
				2 : {
					"market" : 6.39,
					"analyst" : 7.06,
					"opskins" : 6.62
				}
			},
			"souvenir" : {}
		}
	},
	"397" : {
		"item_id" : 397,
		"type" : "SG 553",
		"skinName" : "Cyrex",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.2,
					"analyst" : 5.08,
					"opskins" : 4.49
				},
				3 : {
					"market" : 2.18,
					"analyst" : 2.4,
					"opskins" : 1.99
				},
				2 : {
					"market" : 1.46,
					"analyst" : 1.63,
					"opskins" : 1.35
				},
				1 : {
					"market" : 1.57,
					"analyst" : 1.57,
					"opskins" : 1.33
				},
				0 : {
					"market" : 1.57,
					"analyst" : 1.51,
					"opskins" : 1.41
				}
			},
			"stattrak" : {
				4 : {
					"market" : 25.76,
					"analyst" : 27.13,
					"opskins" : 24.5
				},
				3 : {
					"market" : 9.37,
					"analyst" : 10.01,
					"opskins" : 9.68
				},
				2 : {
					"market" : 5.22,
					"analyst" : 5.44,
					"opskins" : 4.9
				},
				1 : {
					"market" : 4.62,
					"analyst" : 4.52,
					"opskins" : 4.17
				},
				0 : {
					"market" : 4.56,
					"analyst" : 4.26,
					"opskins" : 4.1
				}
			},
			"souvenir" : {}
		}
	},
	"398" : {
		"item_id" : 398,
		"type" : "★ Falchion Knife",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : 412.63,
					"analyst" : 362.52,
					"opskins" : 289.99
				},
				3 : {
					"market" : 52,
					"analyst" : 54.89,
					"opskins" : 45.99
				},
				2 : {
					"market" : 40.8,
					"analyst" : 39.55,
					"opskins" : 33.73
				},
				1 : {
					"market" : 38.41,
					"analyst" : 40.43,
					"opskins" : 35.29
				},
				0 : {
					"market" : 34.5,
					"analyst" : 33.64,
					"opskins" : 30.25
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 114.19,
					"analyst" : 112.08,
					"opskins" : 98.7
				},
				2 : {
					"market" : 52.98,
					"analyst" : 58.24,
					"opskins" : 55.55
				},
				1 : {
					"market" : 70.17,
					"analyst" : 50.91,
					"opskins" : 69.98
				},
				0 : {
					"market" : 65.6,
					"analyst" : 50.65,
					"opskins" : 39.99
				}
			},
			"souvenir" : {}
		}
	},
	"399" : {
		"item_id" : 399,
		"type" : "★ Falchion Knife",
		"skinName" : "Stained",
		"prices" : {
			"default" : {
				4 : {
					"market" : 61.71,
					"analyst" : 66.16,
					"opskins" : 53.95
				},
				3 : {
					"market" : 35.95,
					"analyst" : 36.25,
					"opskins" : 31.95
				},
				2 : {
					"market" : 34.4,
					"analyst" : 33.95,
					"opskins" : 30.65
				},
				1 : {
					"market" : 34.5,
					"analyst" : 32.84,
					"opskins" : 30.13
				},
				0 : {
					"market" : 32.2,
					"analyst" : 32.38,
					"opskins" : 29.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : 138,
					"analyst" : -1,
					"opskins" : 110
				},
				3 : {
					"market" : 67.54,
					"analyst" : 50.41,
					"opskins" : 45.5
				},
				2 : {
					"market" : 49.95,
					"analyst" : 50.6,
					"opskins" : 42.98
				},
				1 : {
					"market" : 49.54,
					"analyst" : 50.56,
					"opskins" : 45
				},
				0 : {
					"market" : 54.76,
					"analyst" : 49.76,
					"opskins" : 44.94
				}
			},
			"souvenir" : {}
		}
	},
	"400" : {
		"item_id" : 400,
		"type" : "★ Falchion Knife",
		"skinName" : "Urban Masked",
		"prices" : {
			"default" : {
				4 : {
					"market" : 114.66,
					"analyst" : 78.87,
					"opskins" : 62
				},
				3 : {
					"market" : 33.9,
					"analyst" : 35.97,
					"opskins" : 31.29
				},
				2 : {
					"market" : 30.45,
					"analyst" : 32.1,
					"opskins" : 28.62
				},
				1 : {
					"market" : 32.32,
					"analyst" : 32.14,
					"opskins" : 29.14
				},
				0 : {
					"market" : 31.93,
					"analyst" : 31.18,
					"opskins" : 35
				}
			},
			"stattrak" : {
				4 : {
					"market" : 248.53,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 53.22,
					"analyst" : 62.1,
					"opskins" : 47.96
				},
				2 : {
					"market" : 44.71,
					"analyst" : 55.18,
					"opskins" : 50.83
				},
				1 : {
					"market" : 39.79,
					"analyst" : 40.74,
					"opskins" : 63.99
				},
				0 : {
					"market" : 41.32,
					"analyst" : 39.26,
					"opskins" : 39.95
				}
			},
			"souvenir" : {}
		}
	},
	"401" : {
		"item_id" : 401,
		"type" : "G3SG1",
		"skinName" : "Murky",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.19,
					"analyst" : 0.21,
					"opskins" : 0.2
				},
				3 : {
					"market" : 0.17,
					"analyst" : 0.17,
					"opskins" : 0.16
				},
				2 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.14
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.94,
					"analyst" : 0.87,
					"opskins" : 0.92
				},
				3 : {
					"market" : 0.52,
					"analyst" : 0.52,
					"opskins" : 0.5
				},
				2 : {
					"market" : 0.47,
					"analyst" : 0.47,
					"opskins" : 0.44
				}
			},
			"souvenir" : {}
		}
	},
	"402" : {
		"item_id" : 402,
		"type" : "MAG-7",
		"skinName" : "Firestarter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.83,
					"analyst" : 0.88,
					"opskins" : 0.82
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.14
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.15,
					"analyst" : 0.18,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.21
				}
			},
			"stattrak" : {
				4 : {
					"market" : 6.9,
					"analyst" : 3.46,
					"opskins" : 5.5
				},
				3 : {
					"market" : 0.55,
					"analyst" : 0.52,
					"opskins" : 0.49
				},
				2 : {
					"market" : 0.42,
					"analyst" : 0.41,
					"opskins" : 0.42
				},
				1 : {
					"market" : 0.54,
					"analyst" : 0.45,
					"opskins" : 0.46
				},
				0 : {
					"market" : 0.52,
					"analyst" : 0.53,
					"opskins" : 3
				}
			},
			"souvenir" : {}
		}
	},
	"403" : {
		"item_id" : 403,
		"type" : "MP9",
		"skinName" : "Dart",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.24,
					"analyst" : 0.27,
					"opskins" : 0.22
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.25
				},
				0 : {
					"market" : 1.15,
					"analyst" : 1.55,
					"opskins" : 2
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.1,
					"analyst" : 0.91,
					"opskins" : 0.87
				},
				3 : {
					"market" : 0.46,
					"analyst" : 0.57,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.39,
					"analyst" : 0.42,
					"opskins" : 0.39
				},
				1 : {
					"market" : 0.52,
					"analyst" : 0.46,
					"opskins" : 0.45
				},
				0 : {
					"market" : 2.13,
					"analyst" : 1.46,
					"opskins" : 1.9
				}
			},
			"souvenir" : {}
		}
	},
	"404" : {
		"item_id" : 404,
		"type" : "Five-SeveN",
		"skinName" : "Urban Hazard",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.43,
					"analyst" : 0.5,
					"opskins" : 0.42
				},
				3 : {
					"market" : 0.32,
					"analyst" : 0.39,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.3,
					"analyst" : 0.33,
					"opskins" : 0.28
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.86,
					"analyst" : 1.91,
					"opskins" : 1.58
				},
				3 : {
					"market" : 1.33,
					"analyst" : 1.38,
					"opskins" : 1.14
				},
				2 : {
					"market" : 1.01,
					"analyst" : 1.14,
					"opskins" : 1
				}
			},
			"souvenir" : {}
		}
	},
	"405" : {
		"item_id" : 405,
		"type" : "UMP-45",
		"skinName" : "Delusion",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.51,
					"analyst" : 1.31,
					"opskins" : 1.35
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.14
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 5.64,
					"analyst" : 5.08,
					"opskins" : 5.12
				},
				3 : {
					"market" : 0.74,
					"analyst" : 0.67,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.42,
					"analyst" : 0.43,
					"opskins" : 0.35
				}
			},
			"souvenir" : {}
		}
	},
	"406" : {
		"item_id" : 406,
		"type" : "Glock-18",
		"skinName" : "Grinder",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.57,
					"analyst" : 0.61,
					"opskins" : 0.5
				},
				3 : {
					"market" : 0.43,
					"analyst" : 0.45,
					"opskins" : 0.42
				},
				2 : {
					"market" : 0.53,
					"analyst" : 0.53,
					"opskins" : 0.48
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.6,
					"analyst" : 3.64,
					"opskins" : 3.01
				},
				3 : {
					"market" : 2.43,
					"analyst" : 2.52,
					"opskins" : 2.14
				},
				2 : {
					"market" : 2.42,
					"analyst" : 2.59,
					"opskins" : 2.2
				}
			},
			"souvenir" : {}
		}
	},
	"407" : {
		"item_id" : 407,
		"type" : "M4A1-S",
		"skinName" : "Basilisk",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.43,
					"analyst" : 2.7,
					"opskins" : 2.38
				},
				3 : {
					"market" : 1.29,
					"analyst" : 1.43,
					"opskins" : 1.22
				},
				2 : {
					"market" : 1.16,
					"analyst" : 1.15,
					"opskins" : 1.04
				},
				1 : {
					"market" : 1.87,
					"analyst" : 1.85,
					"opskins" : 1.8
				},
				0 : {
					"market" : 1.15,
					"analyst" : 1.18,
					"opskins" : 1.04
				}
			},
			"stattrak" : {
				4 : {
					"market" : 10.03,
					"analyst" : 11.21,
					"opskins" : 10.17
				},
				3 : {
					"market" : 6.33,
					"analyst" : 6.68,
					"opskins" : 5.88
				},
				2 : {
					"market" : 5.35,
					"analyst" : 5.89,
					"opskins" : 5.22
				},
				1 : {
					"market" : 6.56,
					"analyst" : 6.82,
					"opskins" : 6.24
				},
				0 : {
					"market" : 5.83,
					"analyst" : 6.37,
					"opskins" : 5.56
				}
			},
			"souvenir" : {}
		}
	},
	"408" : {
		"item_id" : 408,
		"type" : "M4A4",
		"skinName" : "Griffin",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.61,
					"analyst" : 3.43,
					"opskins" : 3.31
				},
				3 : {
					"market" : 1.63,
					"analyst" : 1.52,
					"opskins" : 1.46
				},
				2 : {
					"market" : 1.15,
					"analyst" : 1.07,
					"opskins" : 1.1
				},
				1 : {
					"market" : 2.22,
					"analyst" : 1.88,
					"opskins" : 1.95
				},
				0 : {
					"market" : 1.18,
					"analyst" : 0.98,
					"opskins" : 1.11
				}
			},
			"stattrak" : {
				4 : {
					"market" : 14.85,
					"analyst" : 14.88,
					"opskins" : 14.9
				},
				3 : {
					"market" : 6.36,
					"analyst" : 6.27,
					"opskins" : 5.83
				},
				2 : {
					"market" : 4.15,
					"analyst" : 4.24,
					"opskins" : 3.6
				},
				1 : {
					"market" : 5.93,
					"analyst" : 6.08,
					"opskins" : 5.75
				},
				0 : {
					"market" : 4.34,
					"analyst" : 4.05,
					"opskins" : 3.78
				}
			},
			"souvenir" : {}
		}
	},
	"409" : {
		"item_id" : 409,
		"type" : "Sawed-Off",
		"skinName" : "Highwayman",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.72,
					"analyst" : 0.72,
					"opskins" : 0.69
				},
				3 : {
					"market" : 0.29,
					"analyst" : 0.31,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.28,
					"opskins" : 0.46
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.26,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.28,
					"analyst" : 0.29,
					"opskins" : 0.29
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.1,
					"analyst" : 4.07,
					"opskins" : 3.76
				},
				3 : {
					"market" : 1.18,
					"analyst" : 1.19,
					"opskins" : 1.16
				},
				2 : {
					"market" : 0.65,
					"analyst" : 0.67,
					"opskins" : 0.62
				},
				1 : {
					"market" : 0.59,
					"analyst" : 0.65,
					"opskins" : 0.62
				},
				0 : {
					"market" : 0.83,
					"analyst" : 0.73,
					"opskins" : 0.59
				}
			},
			"souvenir" : {}
		}
	},
	"410" : {
		"item_id" : 410,
		"type" : "P250",
		"skinName" : "Cartel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.3,
					"analyst" : 5.35,
					"opskins" : 4.78
				},
				3 : {
					"market" : 1.93,
					"analyst" : 2.04,
					"opskins" : 1.82
				},
				2 : {
					"market" : 1.51,
					"analyst" : 1.56,
					"opskins" : 1.39
				},
				1 : {
					"market" : 2.04,
					"analyst" : 1.93,
					"opskins" : 1.77
				},
				0 : {
					"market" : 1.85,
					"analyst" : 1.62,
					"opskins" : 1.47
				}
			},
			"stattrak" : {
				4 : {
					"market" : 28.81,
					"analyst" : 26.6,
					"opskins" : 24.49
				},
				3 : {
					"market" : 10.39,
					"analyst" : 9.16,
					"opskins" : 8.32
				},
				2 : {
					"market" : 5.6,
					"analyst" : 5.83,
					"opskins" : 5.25
				},
				1 : {
					"market" : 6.4,
					"analyst" : 7.04,
					"opskins" : 6.57
				},
				0 : {
					"market" : 5.64,
					"analyst" : 5.9,
					"opskins" : 5.37
				}
			},
			"souvenir" : {}
		}
	},
	"411" : {
		"item_id" : 411,
		"type" : "SCAR-20",
		"skinName" : "Cardiac",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5,
					"analyst" : 5.48,
					"opskins" : 4.82
				},
				3 : {
					"market" : 1.66,
					"analyst" : 1.88,
					"opskins" : 1.55
				},
				2 : {
					"market" : 1.39,
					"analyst" : 1.41,
					"opskins" : 1.34
				},
				1 : {
					"market" : 1.28,
					"analyst" : 1.36,
					"opskins" : 1.43
				},
				0 : {
					"market" : 1.88,
					"analyst" : 1.81,
					"opskins" : 1.76
				}
			},
			"stattrak" : {
				4 : {
					"market" : 38,
					"analyst" : 33.49,
					"opskins" : 31
				},
				3 : {
					"market" : 8.37,
					"analyst" : 7.84,
					"opskins" : 6.92
				},
				2 : {
					"market" : 5.43,
					"analyst" : 5.12,
					"opskins" : 4.77
				},
				1 : {
					"market" : 7.29,
					"analyst" : 6.6,
					"opskins" : 5.99
				},
				0 : {
					"market" : 5.42,
					"analyst" : 4.9,
					"opskins" : 4.19
				}
			},
			"souvenir" : {}
		}
	},
	"412" : {
		"item_id" : 412,
		"type" : "XM1014",
		"skinName" : "Tranquility",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.44,
					"analyst" : 4.79,
					"opskins" : 4.01
				},
				3 : {
					"market" : 1.72,
					"analyst" : 1.9,
					"opskins" : 1.59
				},
				2 : {
					"market" : 1.55,
					"analyst" : 1.68,
					"opskins" : 1.44
				},
				1 : {
					"market" : 1.74,
					"analyst" : 1.83,
					"opskins" : 1.97
				},
				0 : {
					"market" : 2.88,
					"analyst" : 1.98,
					"opskins" : 6
				}
			},
			"stattrak" : {
				4 : {
					"market" : 23.19,
					"analyst" : 21.57,
					"opskins" : 19.88
				},
				3 : {
					"market" : 10.59,
					"analyst" : 8.47,
					"opskins" : 7.29
				},
				2 : {
					"market" : 6.68,
					"analyst" : 5.39,
					"opskins" : 5.2
				},
				1 : {
					"market" : 5.98,
					"analyst" : 7.34,
					"opskins" : 7.36
				},
				0 : {
					"market" : 10.6,
					"analyst" : 13.93,
					"opskins" : 45
				}
			},
			"souvenir" : {}
		}
	},
	"413" : {
		"item_id" : 413,
		"type" : "★ Gut Knife",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 68.88,
					"analyst" : 67.88,
					"opskins" : 63.75
				},
				3 : {
					"market" : 80.54,
					"analyst" : 81.54,
					"opskins" : 120.53
				}
			},
			"stattrak" : {
				4 : {
					"market" : 94.24,
					"analyst" : 103.74,
					"opskins" : 82
				},
				3 : {
					"market" : 172.19,
					"analyst" : 141,
					"opskins" : 220
				}
			},
			"souvenir" : {}
		}
	},
	"414" : {
		"item_id" : 414,
		"type" : "UMP-45",
		"skinName" : "Corporal",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.3,
					"analyst" : 0.29,
					"opskins" : 0.27
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.1
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.99,
					"analyst" : 1.49,
					"opskins" : 1.51
				},
				3 : {
					"market" : 0.24,
					"analyst" : 0.27,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.17
				}
			},
			"souvenir" : {}
		}
	},
	"415" : {
		"item_id" : 415,
		"type" : "Negev",
		"skinName" : "Terrain",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.08
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.41,
					"analyst" : 0.42,
					"opskins" : 0.37
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.26
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.19,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.19
				}
			},
			"souvenir" : {}
		}
	},
	"416" : {
		"item_id" : 416,
		"type" : "Tec-9",
		"skinName" : "Sandstorm",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.2,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.17,
					"analyst" : 0.13,
					"opskins" : 0.14
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.11
				}
			},
			"stattrak" : {
				3 : {
					"market" : 1.07,
					"analyst" : 1.13,
					"opskins" : 0.9
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.25,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.47,
					"analyst" : 0.51,
					"opskins" : 0.42
				},
				0 : {
					"market" : 0.24,
					"analyst" : 0.24,
					"opskins" : 0.21
				}
			},
			"souvenir" : {}
		}
	},
	"417" : {
		"item_id" : 417,
		"type" : "MAG-7",
		"skinName" : "Heaven Guard",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.07,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.47,
					"analyst" : 0.46,
					"opskins" : 0.4
				},
				3 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.34,
					"opskins" : 0.3
				}
			},
			"souvenir" : {}
		}
	},
	"418" : {
		"item_id" : 418,
		"type" : "MAC-10",
		"skinName" : "Heat",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.96,
					"analyst" : 1,
					"opskins" : 0.94
				},
				3 : {
					"market" : 0.63,
					"analyst" : 0.62,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.32,
					"analyst" : 0.32,
					"opskins" : 0.32
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.33,
					"opskins" : 0.46
				},
				0 : {
					"market" : 0.31,
					"analyst" : 0.31,
					"opskins" : 0.31
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.98,
					"analyst" : 4.28,
					"opskins" : 4.55
				},
				3 : {
					"market" : 3.17,
					"analyst" : 2.67,
					"opskins" : 2.46
				},
				2 : {
					"market" : 1.07,
					"analyst" : 1.11,
					"opskins" : 0.91
				},
				1 : {
					"market" : 0.86,
					"analyst" : 0.99,
					"opskins" : 0.88
				},
				0 : {
					"market" : 0.93,
					"analyst" : 0.93,
					"opskins" : 0.84
				}
			},
			"souvenir" : {}
		}
	},
	"419" : {
		"item_id" : 419,
		"type" : "SG 553",
		"skinName" : "Pulse",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.74,
					"analyst" : 0.81,
					"opskins" : 0.68
				},
				2 : {
					"market" : 0.31,
					"analyst" : 0.33,
					"opskins" : 0.27
				},
				1 : {
					"market" : 0.71,
					"analyst" : 0.55,
					"opskins" : 0.49
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.34,
					"opskins" : 0.31
				}
			},
			"stattrak" : {
				3 : {
					"market" : 3.39,
					"analyst" : 3.35,
					"opskins" : 3.43
				},
				2 : {
					"market" : 0.94,
					"analyst" : 0.99,
					"opskins" : 0.82
				},
				1 : {
					"market" : 1.38,
					"analyst" : 1.43,
					"opskins" : 1.33
				},
				0 : {
					"market" : 0.99,
					"analyst" : 0.94,
					"opskins" : 0.8
				}
			},
			"souvenir" : {}
		}
	},
	"420" : {
		"item_id" : 420,
		"type" : "FAMAS",
		"skinName" : "Sergeant",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.81,
					"analyst" : 0.77,
					"opskins" : 0.69
				},
				2 : {
					"market" : 0.3,
					"analyst" : 0.31,
					"opskins" : 0.27
				},
				1 : {
					"market" : 0.32,
					"analyst" : 0.32,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.3,
					"analyst" : 0.29,
					"opskins" : 0.4
				}
			},
			"stattrak" : {
				3 : {
					"market" : 4.44,
					"analyst" : 3.15,
					"opskins" : 3.03
				},
				2 : {
					"market" : 0.89,
					"analyst" : 0.98,
					"opskins" : 0.89
				},
				1 : {
					"market" : 0.84,
					"analyst" : 0.89,
					"opskins" : 0.78
				},
				0 : {
					"market" : 0.72,
					"analyst" : 0.74,
					"opskins" : 0.61
				}
			},
			"souvenir" : {}
		}
	},
	"421" : {
		"item_id" : 421,
		"type" : "USP-S",
		"skinName" : "Guardian",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.06,
					"analyst" : 0.99,
					"opskins" : 0.89
				},
				3 : {
					"market" : 0.74,
					"analyst" : 0.73,
					"opskins" : 0.68
				},
				2 : {
					"market" : 0.59,
					"analyst" : 0.49,
					"opskins" : 0.57
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.75,
					"analyst" : 4.65,
					"opskins" : 4.37
				},
				3 : {
					"market" : 3.13,
					"analyst" : 3.26,
					"opskins" : 2.89
				},
				2 : {
					"market" : 2.22,
					"analyst" : 2.28,
					"opskins" : 2.25
				}
			},
			"souvenir" : {}
		}
	},
	"422" : {
		"item_id" : 422,
		"type" : "Nova",
		"skinName" : "Antique",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.77,
					"analyst" : 2.73,
					"opskins" : 2.49
				},
				3 : {
					"market" : 2.19,
					"analyst" : 2.27,
					"opskins" : 1.97
				},
				2 : {
					"market" : 2.65,
					"analyst" : 2.4,
					"opskins" : 2.1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 10.16,
					"analyst" : 8.24,
					"opskins" : 7.99
				},
				3 : {
					"market" : 4.85,
					"analyst" : 4.93,
					"opskins" : 5.14
				},
				2 : {
					"market" : 6.03,
					"analyst" : 5.94,
					"opskins" : 6.2
				}
			},
			"souvenir" : {}
		}
	},
	"423" : {
		"item_id" : 423,
		"type" : "AUG",
		"skinName" : "Chameleon",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.95,
					"analyst" : 2.01,
					"opskins" : 1.81
				},
				3 : {
					"market" : 1.2,
					"analyst" : 1.34,
					"opskins" : 1.25
				},
				2 : {
					"market" : 1.08,
					"analyst" : 1.16,
					"opskins" : 1.08
				},
				1 : {
					"market" : 1.43,
					"analyst" : 1.34,
					"opskins" : 1.19
				},
				0 : {
					"market" : 1.35,
					"analyst" : 1.18,
					"opskins" : 1.17
				}
			},
			"stattrak" : {
				4 : {
					"market" : 11.5,
					"analyst" : 10.1,
					"opskins" : 9.5
				},
				3 : {
					"market" : 5.6,
					"analyst" : 5.97,
					"opskins" : 5.22
				},
				2 : {
					"market" : 3.83,
					"analyst" : 3.95,
					"opskins" : 3.58
				},
				1 : {
					"market" : 4.77,
					"analyst" : 4.5,
					"opskins" : 6.51
				},
				0 : {
					"market" : 4.98,
					"analyst" : 5.05,
					"opskins" : 6.98
				}
			},
			"souvenir" : {}
		}
	},
	"424" : {
		"item_id" : 424,
		"type" : "★ Karambit",
		"skinName" : "Forest DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 264.86,
					"analyst" : -1,
					"opskins" : 249
				},
				3 : {
					"market" : 110.95,
					"analyst" : 106.49,
					"opskins" : 88.9
				},
				2 : {
					"market" : 92,
					"analyst" : 89.76,
					"opskins" : 77
				},
				1 : {
					"market" : 95.36,
					"analyst" : 87.82,
					"opskins" : 81.35
				},
				0 : {
					"market" : 91,
					"analyst" : 94.92,
					"opskins" : 78.89
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 154.99,
					"analyst" : 176.77,
					"opskins" : 139.99
				},
				2 : {
					"market" : 121.83,
					"analyst" : 116.76,
					"opskins" : 98.48
				},
				1 : {
					"market" : 181.82,
					"analyst" : 139,
					"opskins" : 111.87
				},
				0 : {
					"market" : 158.93,
					"analyst" : 121.78,
					"opskins" : 113
				}
			},
			"souvenir" : {}
		}
	},
	"425" : {
		"item_id" : 425,
		"type" : "★ M9 Bayonet",
		"skinName" : "Slaughter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 222.48,
					"analyst" : 252.62,
					"opskins" : 205
				},
				3 : {
					"market" : 192.98,
					"analyst" : 188.29,
					"opskins" : 162
				},
				2 : {
					"market" : 189.11,
					"analyst" : 169.08,
					"opskins" : 137
				}
			},
			"stattrak" : {
				4 : {
					"market" : 408.11,
					"analyst" : 307,
					"opskins" : 319.99
				},
				3 : {
					"market" : 267,
					"analyst" : 250.91,
					"opskins" : 210.91
				},
				2 : {
					"market" : 209.65,
					"analyst" : 198.69,
					"opskins" : 177.99
				}
			},
			"souvenir" : {}
		}
	},
	"426" : {
		"item_id" : 426,
		"type" : "★ Flip Knife",
		"skinName" : "Slaughter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 98.59,
					"analyst" : 101.51,
					"opskins" : 88.7
				},
				3 : {
					"market" : 91.42,
					"analyst" : 92.96,
					"opskins" : 79.28
				},
				2 : {
					"market" : 88,
					"analyst" : 85.71,
					"opskins" : 80.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 276,
					"analyst" : 156.97,
					"opskins" : 127.78
				},
				3 : {
					"market" : 148.32,
					"analyst" : 143.3,
					"opskins" : 118.98
				},
				2 : {
					"market" : 100.65,
					"analyst" : 136.45,
					"opskins" : 112.89
				}
			},
			"souvenir" : {}
		}
	},
	"427" : {
		"item_id" : 427,
		"type" : "Tec-9",
		"skinName" : "Isaac",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.19,
					"analyst" : 2.22,
					"opskins" : 1.97
				},
				3 : {
					"market" : 0.54,
					"analyst" : 0.57,
					"opskins" : 0.53
				},
				2 : {
					"market" : 0.29,
					"analyst" : 0.32,
					"opskins" : 0.28
				},
				1 : {
					"market" : 0.27,
					"analyst" : 0.26,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.21,
					"opskins" : 0.5
				}
			},
			"stattrak" : {
				4 : {
					"market" : 8.42,
					"analyst" : 9.05,
					"opskins" : 8.7
				},
				3 : {
					"market" : 1.95,
					"analyst" : 1.99,
					"opskins" : 1.57
				},
				2 : {
					"market" : 0.93,
					"analyst" : 1.03,
					"opskins" : 0.86
				},
				1 : {
					"market" : 0.69,
					"analyst" : 0.77,
					"opskins" : 0.64
				},
				0 : {
					"market" : 0.6,
					"analyst" : 0.68,
					"opskins" : 0.6
				}
			},
			"souvenir" : {}
		}
	},
	"428" : {
		"item_id" : 428,
		"type" : "SSG 08",
		"skinName" : "Slashed",
		"prices" : {
			"default" : {
				2 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.17,
					"analyst" : 0.16,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.14,
					"analyst" : 0.12,
					"opskins" : 0.14
				}
			},
			"stattrak" : {
				2 : {
					"market" : 0.51,
					"analyst" : 0.54,
					"opskins" : 0.54
				},
				1 : {
					"market" : 0.41,
					"analyst" : 0.45,
					"opskins" : 0.43
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.37,
					"opskins" : 0.32
				}
			},
			"souvenir" : {}
		}
	},
	"429" : {
		"item_id" : 429,
		"type" : "Galil AR",
		"skinName" : "Kami",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.18,
					"analyst" : 0.19,
					"opskins" : 0.2
				},
				3 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.12
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.08
				},
				1 : {
					"market" : 0.14,
					"analyst" : 0.13,
					"opskins" : 0.23
				},
				0 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.08
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.85,
					"analyst" : 0.93,
					"opskins" : 0.8
				},
				3 : {
					"market" : 0.43,
					"analyst" : 0.4,
					"opskins" : 0.38
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.24,
					"opskins" : 0.21
				},
				1 : {
					"market" : 0.36,
					"analyst" : 0.37,
					"opskins" : 0.34
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.27,
					"opskins" : 0.23
				}
			},
			"souvenir" : {}
		}
	},
	"430" : {
		"item_id" : 430,
		"type" : "CZ75-Auto",
		"skinName" : "Twist",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.28,
					"analyst" : 0.33,
					"opskins" : 0.31
				},
				3 : {
					"market" : 0.07,
					"analyst" : 0.09,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.08
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.01,
					"analyst" : 1.24,
					"opskins" : 1.05
				},
				3 : {
					"market" : 0.31,
					"analyst" : 0.34,
					"opskins" : 0.3
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.18
				}
			},
			"souvenir" : {}
		}
	},
	"431" : {
		"item_id" : 431,
		"type" : "P90",
		"skinName" : "Module",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.39,
					"analyst" : 0.43,
					"opskins" : 0.37
				},
				3 : {
					"market" : 0.29,
					"analyst" : 0.34,
					"opskins" : 0.29
				},
				2 : {
					"market" : 0.43,
					"analyst" : 0.4,
					"opskins" : 0.51
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.49,
					"analyst" : 1.54,
					"opskins" : 1.3
				},
				3 : {
					"market" : 0.83,
					"analyst" : 0.94,
					"opskins" : 0.79
				},
				2 : {
					"market" : 0.83,
					"analyst" : 0.9,
					"opskins" : 0.77
				}
			},
			"souvenir" : {}
		}
	},
	"432" : {
		"item_id" : 432,
		"type" : "P2000",
		"skinName" : "Pulse",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.23,
					"analyst" : 0.25,
					"opskins" : 0.22
				},
				3 : {
					"market" : 0.14,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.12,
					"analyst" : 1.16,
					"opskins" : 0.98
				},
				3 : {
					"market" : 0.5,
					"analyst" : 0.56,
					"opskins" : 0.46
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.28,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.53,
					"analyst" : 0.6,
					"opskins" : 0.51
				},
				0 : {
					"market" : 0.24,
					"analyst" : 0.29,
					"opskins" : 0.26
				}
			},
			"souvenir" : {}
		}
	},
	"433" : {
		"item_id" : 433,
		"type" : "AUG",
		"skinName" : "Torque",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.89,
					"analyst" : 0.97,
					"opskins" : 0.9
				},
				3 : {
					"market" : 0.58,
					"analyst" : 0.59,
					"opskins" : 0.6
				},
				2 : {
					"market" : 0.48,
					"analyst" : 0.48,
					"opskins" : 0.41
				},
				1 : {
					"market" : 0.7,
					"analyst" : 0.61,
					"opskins" : 0.48
				},
				0 : {
					"market" : 0.97,
					"analyst" : 0.96,
					"opskins" : 0.79
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.49,
					"analyst" : 3.73,
					"opskins" : 3.26
				},
				3 : {
					"market" : 2.58,
					"analyst" : 2.31,
					"opskins" : 2.01
				},
				2 : {
					"market" : 1.44,
					"analyst" : 1.63,
					"opskins" : 1.43
				},
				1 : {
					"market" : 1.86,
					"analyst" : 1.78,
					"opskins" : 1.75
				},
				0 : {
					"market" : 2.41,
					"analyst" : 2.43,
					"opskins" : 2.02
				}
			},
			"souvenir" : {}
		}
	},
	"434" : {
		"item_id" : 434,
		"type" : "PP-Bizon",
		"skinName" : "Antique",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.85,
					"analyst" : 0.95,
					"opskins" : 0.85
				},
				3 : {
					"market" : 0.5,
					"analyst" : 0.57,
					"opskins" : 0.49
				},
				2 : {
					"market" : 0.47,
					"analyst" : 0.47,
					"opskins" : 0.46
				},
				1 : {
					"market" : 0.57,
					"analyst" : 0.57,
					"opskins" : 0.55
				},
				0 : {
					"market" : 0.8,
					"analyst" : 0.94,
					"opskins" : 1.58
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.64,
					"analyst" : 3.73,
					"opskins" : 3.45
				},
				3 : {
					"market" : 2.11,
					"analyst" : 2.29,
					"opskins" : 2.06
				},
				2 : {
					"market" : 1.77,
					"analyst" : 1.45,
					"opskins" : 1.27
				},
				1 : {
					"market" : 1.96,
					"analyst" : 1.96,
					"opskins" : 2.02
				},
				0 : {
					"market" : 1.9,
					"analyst" : 2.53,
					"opskins" : 2.46
				}
			},
			"souvenir" : {}
		}
	},
	"435" : {
		"item_id" : 435,
		"type" : "XM1014",
		"skinName" : "Heaven Guard",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1,
					"analyst" : 1.11,
					"opskins" : 0.96
				},
				3 : {
					"market" : 0.54,
					"analyst" : 0.57,
					"opskins" : 0.47
				},
				2 : {
					"market" : 0.46,
					"analyst" : 0.44,
					"opskins" : 0.43
				},
				1 : {
					"market" : 0.69,
					"analyst" : 0.5,
					"opskins" : 0.61
				},
				0 : {
					"market" : 0.71,
					"analyst" : 1.16,
					"opskins" : 0.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.74,
					"analyst" : 4.78,
					"opskins" : 4.58
				},
				3 : {
					"market" : 2.07,
					"analyst" : 2.28,
					"opskins" : 2.06
				},
				2 : {
					"market" : 1.65,
					"analyst" : 1.45,
					"opskins" : 1.25
				},
				1 : {
					"market" : 1.43,
					"analyst" : 1.81,
					"opskins" : 3
				},
				0 : {
					"market" : 1.52,
					"analyst" : 1.91,
					"opskins" : 1.42
				}
			},
			"souvenir" : {}
		}
	},
	"436" : {
		"item_id" : 436,
		"type" : "MAC-10",
		"skinName" : "Tatter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.18,
					"analyst" : 1.08,
					"opskins" : 0.87
				},
				3 : {
					"market" : 0.48,
					"analyst" : 0.57,
					"opskins" : 0.48
				},
				2 : {
					"market" : 0.47,
					"analyst" : 0.47,
					"opskins" : 0.83
				},
				1 : {
					"market" : 0.66,
					"analyst" : 0.64,
					"opskins" : 0.53
				},
				0 : {
					"market" : 1.21,
					"analyst" : 1.23,
					"opskins" : 1.62
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.5,
					"analyst" : 3.94,
					"opskins" : 3.47
				},
				3 : {
					"market" : 2.3,
					"analyst" : 2.37,
					"opskins" : 2.07
				},
				2 : {
					"market" : 1.76,
					"analyst" : 1.42,
					"opskins" : 1.29
				},
				1 : {
					"market" : 1.55,
					"analyst" : 1.76,
					"opskins" : 1.63
				},
				0 : {
					"market" : 2.19,
					"analyst" : 2.83,
					"opskins" : 2.47
				}
			},
			"souvenir" : {}
		}
	},
	"437" : {
		"item_id" : 437,
		"type" : "SCAR-20",
		"skinName" : "Cyrex",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.85,
					"analyst" : 3.64,
					"opskins" : 3.13
				},
				3 : {
					"market" : 2.6,
					"analyst" : 2.38,
					"opskins" : 2.48
				},
				2 : {
					"market" : 2.6,
					"analyst" : 2.14,
					"opskins" : 2.89
				},
				1 : {
					"market" : 3.05,
					"analyst" : 2.52,
					"opskins" : 2.53
				},
				0 : {
					"market" : 3.45,
					"analyst" : 3.43,
					"opskins" : 3.66
				}
			},
			"stattrak" : {
				4 : {
					"market" : 20.38,
					"analyst" : 17.66,
					"opskins" : 16.5
				},
				3 : {
					"market" : 10.87,
					"analyst" : 10.91,
					"opskins" : 10.5
				},
				2 : {
					"market" : 7.54,
					"analyst" : 7.3,
					"opskins" : 6.58
				},
				1 : {
					"market" : 10.6,
					"analyst" : 8,
					"opskins" : 6.84
				},
				0 : {
					"market" : 6.36,
					"analyst" : 7.14,
					"opskins" : 6.99
				}
			},
			"souvenir" : {}
		}
	},
	"438" : {
		"item_id" : 438,
		"type" : "USP-S",
		"skinName" : "Caiman",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.31,
					"analyst" : 5.32,
					"opskins" : 4.72
				},
				3 : {
					"market" : 4.15,
					"analyst" : 3.85,
					"opskins" : 3.45
				},
				2 : {
					"market" : 3.49,
					"analyst" : 3.28,
					"opskins" : 3.03
				},
				1 : {
					"market" : 3.86,
					"analyst" : 3.67,
					"opskins" : 3.71
				}
			},
			"stattrak" : {
				4 : {
					"market" : 18.54,
					"analyst" : 18.99,
					"opskins" : 17
				},
				3 : {
					"market" : 12.54,
					"analyst" : 12.93,
					"opskins" : 13.99
				},
				2 : {
					"market" : 8.37,
					"analyst" : 8.54,
					"opskins" : 7.79
				},
				1 : {
					"market" : 19,
					"analyst" : 11.59,
					"opskins" : 11.11
				}
			},
			"souvenir" : {}
		}
	},
	"439" : {
		"item_id" : 439,
		"type" : "M4A4",
		"skinName" : "Desert-Strike",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.68,
					"analyst" : 4.87,
					"opskins" : 4.63
				},
				3 : {
					"market" : 2.65,
					"analyst" : 2.83,
					"opskins" : 2.7
				},
				2 : {
					"market" : 1.69,
					"analyst" : 1.72,
					"opskins" : 1.71
				},
				1 : {
					"market" : 2.39,
					"analyst" : 2.24,
					"opskins" : 2.26
				},
				0 : {
					"market" : 1.67,
					"analyst" : 1.57,
					"opskins" : 3.67
				}
			},
			"stattrak" : {
				4 : {
					"market" : 28.61,
					"analyst" : 28.41,
					"opskins" : 25.97
				},
				3 : {
					"market" : 13.86,
					"analyst" : 14.09,
					"opskins" : 13.44
				},
				2 : {
					"market" : 6.9,
					"analyst" : 7.3,
					"opskins" : 6.79
				},
				1 : {
					"market" : 13.91,
					"analyst" : 11.41,
					"opskins" : 10.22
				},
				0 : {
					"market" : 6.79,
					"analyst" : 7.28,
					"opskins" : 6.79
				}
			},
			"souvenir" : {}
		}
	},
	"440" : {
		"item_id" : 440,
		"type" : "★ Huntsman Knife",
		"skinName" : "Slaughter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 133.51,
					"analyst" : 141.43,
					"opskins" : 120.98
				},
				3 : {
					"market" : 112.95,
					"analyst" : 109.89,
					"opskins" : 94.5
				},
				2 : {
					"market" : 89.5,
					"analyst" : 89.43,
					"opskins" : 79.87
				}
			},
			"stattrak" : {
				4 : {
					"market" : 249.98,
					"analyst" : 332.65,
					"opskins" : 263
				},
				3 : {
					"market" : 211.89,
					"analyst" : 204.82,
					"opskins" : 166
				},
				2 : {
					"market" : 127.14,
					"analyst" : 200.59,
					"opskins" : 207.91
				}
			},
			"souvenir" : {}
		}
	},
	"441" : {
		"item_id" : 441,
		"type" : "★ Huntsman Knife",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 115,
					"analyst" : 126.58,
					"opskins" : 109.95
				},
				3 : {
					"market" : 169.53,
					"analyst" : 150.92,
					"opskins" : 125
				}
			},
			"stattrak" : {
				4 : {
					"market" : 235,
					"analyst" : 232.2,
					"opskins" : 200
				},
				3 : {
					"market" : 296.65,
					"analyst" : 302.68,
					"opskins" : 239.99
				}
			},
			"souvenir" : {}
		}
	},
	"442" : {
		"item_id" : 442,
		"type" : "★ Huntsman Knife",
		"skinName" : "Scorched",
		"prices" : {
			"default" : {
				4 : {
					"market" : 167.98,
					"analyst" : -1,
					"opskins" : 130
				},
				3 : {
					"market" : 50,
					"analyst" : 48.58,
					"opskins" : 42.56
				},
				2 : {
					"market" : 39.07,
					"analyst" : 39.45,
					"opskins" : 33.99
				},
				1 : {
					"market" : 39.19,
					"analyst" : 39.04,
					"opskins" : 36.78
				},
				0 : {
					"market" : 38.99,
					"analyst" : 37.19,
					"opskins" : 33
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 160,
					"opskins" : -1
				},
				3 : {
					"market" : 90.48,
					"analyst" : 92.7,
					"opskins" : 78.97
				},
				2 : {
					"market" : 60,
					"analyst" : 58.77,
					"opskins" : 53.91
				},
				1 : {
					"market" : 69.4,
					"analyst" : 63.75,
					"opskins" : 59.21
				},
				0 : {
					"market" : 73.09,
					"analyst" : 59.57,
					"opskins" : 55.73
				}
			},
			"souvenir" : {}
		}
	},
	"443" : {
		"item_id" : 443,
		"type" : "MP7",
		"skinName" : "Urban Hazard",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.13,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				3 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.1
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.1,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.9
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.78,
					"analyst" : 0.72,
					"opskins" : 0.63
				},
				3 : {
					"market" : 0.36,
					"analyst" : 0.36,
					"opskins" : 0.32
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.2
				},
				1 : {
					"market" : 0.31,
					"analyst" : 0.34,
					"opskins" : 0.3
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.31,
					"opskins" : 0.25
				}
			},
			"souvenir" : {}
		}
	},
	"444" : {
		"item_id" : 444,
		"type" : "Negev",
		"skinName" : "Desert-Strike",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.06,
					"opskins" : 0.14
				},
				1 : {
					"market" : 0.1,
					"analyst" : 0.07,
					"opskins" : 0.35
				},
				0 : {
					"market" : 0.11,
					"analyst" : 0.08,
					"opskins" : 0.08
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.42,
					"analyst" : 0.39,
					"opskins" : 0.37
				},
				3 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.18
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.19,
					"opskins" : 0.15
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.18
				}
			},
			"souvenir" : {}
		}
	},
	"445" : {
		"item_id" : 445,
		"type" : "P2000",
		"skinName" : "Ivory",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.16
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.1
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.89,
					"analyst" : 0.92,
					"opskins" : 0.78
				},
				3 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.18,
					"analyst" : 0.2,
					"opskins" : 0.15
				}
			},
			"souvenir" : {}
		}
	},
	"446" : {
		"item_id" : 446,
		"type" : "SSG 08",
		"skinName" : "Abyss",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.06,
					"analyst" : 0.95,
					"opskins" : 0.92
				},
				3 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				2 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.09
				},
				1 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.08
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.89,
					"analyst" : 4.86,
					"opskins" : 4.62
				},
				3 : {
					"market" : 0.89,
					"analyst" : 0.96,
					"opskins" : 0.76
				},
				2 : {
					"market" : 0.37,
					"analyst" : 0.4,
					"opskins" : 0.31
				},
				1 : {
					"market" : 0.29,
					"analyst" : 0.33,
					"opskins" : 0.26
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.31,
					"opskins" : 0.28
				}
			},
			"souvenir" : {}
		}
	},
	"447" : {
		"item_id" : 447,
		"type" : "UMP-45",
		"skinName" : "Labyrinth",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.09
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.11,
					"analyst" : 0.12,
					"opskins" : 0.11
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.46,
					"analyst" : 0.43,
					"opskins" : 0.4
				},
				3 : {
					"market" : 0.23,
					"analyst" : 0.24,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.6,
					"analyst" : 0.35,
					"opskins" : 0.42
				}
			},
			"souvenir" : {}
		}
	},
	"448" : {
		"item_id" : 448,
		"type" : "PP-Bizon",
		"skinName" : "Osiris",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.39,
					"analyst" : 0.42,
					"opskins" : 0.31
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.22
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.34,
					"analyst" : 0.31,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.28,
					"opskins" : 0.27
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.77,
					"analyst" : 2.11,
					"opskins" : 1.73
				},
				3 : {
					"market" : 0.96,
					"analyst" : 1.04,
					"opskins" : 0.85
				},
				2 : {
					"market" : 0.65,
					"analyst" : 0.7,
					"opskins" : 0.63
				},
				1 : {
					"market" : 0.76,
					"analyst" : 0.79,
					"opskins" : 0.81
				},
				0 : {
					"market" : 0.72,
					"analyst" : 0.69,
					"opskins" : 0.6
				}
			},
			"souvenir" : {}
		}
	},
	"449" : {
		"item_id" : 449,
		"type" : "CZ75-Auto",
		"skinName" : "Tigris",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.83,
					"analyst" : 0.77,
					"opskins" : 0.66
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.23
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.2
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.21,
					"opskins" : 0.19
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.24,
					"analyst" : 3.7,
					"opskins" : 3.19
				},
				3 : {
					"market" : 1.15,
					"analyst" : 1.15,
					"opskins" : 1
				},
				2 : {
					"market" : 0.69,
					"analyst" : 0.71,
					"opskins" : 0.57
				},
				1 : {
					"market" : 0.64,
					"analyst" : 0.67,
					"opskins" : 0.55
				},
				0 : {
					"market" : 0.65,
					"analyst" : 0.64,
					"opskins" : 0.58
				}
			},
			"souvenir" : {}
		}
	},
	"450" : {
		"item_id" : 450,
		"type" : "Nova",
		"skinName" : "Koi",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.4,
					"analyst" : 0.42,
					"opskins" : 0.35
				},
				3 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.26,
					"opskins" : 0.23
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.87,
					"analyst" : 1.92,
					"opskins" : 1.74
				},
				3 : {
					"market" : 0.95,
					"analyst" : 0.99,
					"opskins" : 0.82
				},
				2 : {
					"market" : 0.72,
					"analyst" : 0.8,
					"opskins" : 0.65
				}
			},
			"souvenir" : {}
		}
	},
	"451" : {
		"item_id" : 451,
		"type" : "P250",
		"skinName" : "Supernova",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.43,
					"analyst" : 0.44,
					"opskins" : 0.39
				},
				3 : {
					"market" : 0.27,
					"analyst" : 0.28,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.24,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.39,
					"analyst" : 0.42,
					"opskins" : 0.38
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.18,
					"analyst" : 2.34,
					"opskins" : 2.02
				},
				3 : {
					"market" : 1.11,
					"analyst" : 1.32,
					"opskins" : 1.13
				},
				2 : {
					"market" : 0.88,
					"analyst" : 0.94,
					"opskins" : 0.8
				},
				1 : {
					"market" : 2.31,
					"analyst" : 1.59,
					"opskins" : 1.4
				}
			},
			"souvenir" : {}
		}
	},
	"452" : {
		"item_id" : 452,
		"type" : "Desert Eagle",
		"skinName" : "Conspiracy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.99,
					"analyst" : 2.18,
					"opskins" : 1.8
				},
				3 : {
					"market" : 1.61,
					"analyst" : 1.69,
					"opskins" : 1.43
				},
				2 : {
					"market" : 1.45,
					"analyst" : 1.57,
					"opskins" : 1.43
				}
			},
			"stattrak" : {
				4 : {
					"market" : 12.51,
					"analyst" : 12.42,
					"opskins" : 11.32
				},
				3 : {
					"market" : 7.68,
					"analyst" : 7.86,
					"opskins" : 7.07
				},
				2 : {
					"market" : 6,
					"analyst" : 6.13,
					"opskins" : 5.81
				}
			},
			"souvenir" : {}
		}
	},
	"453" : {
		"item_id" : 453,
		"type" : "Five-SeveN",
		"skinName" : "Fowl Play",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.21,
					"analyst" : 2.33,
					"opskins" : 1.99
				},
				3 : {
					"market" : 1.34,
					"analyst" : 1.32,
					"opskins" : 1.31
				},
				2 : {
					"market" : 0.92,
					"analyst" : 1,
					"opskins" : 0.83
				},
				1 : {
					"market" : 1.06,
					"analyst" : 1.01,
					"opskins" : 0.91
				},
				0 : {
					"market" : 1.05,
					"analyst" : 1.02,
					"opskins" : 0.91
				}
			},
			"stattrak" : {
				4 : {
					"market" : 9.94,
					"analyst" : 10.74,
					"opskins" : 10.41
				},
				3 : {
					"market" : 3.64,
					"analyst" : 4.47,
					"opskins" : 3.9
				},
				2 : {
					"market" : 2.91,
					"analyst" : 2.82,
					"opskins" : 2.36
				},
				1 : {
					"market" : 2.9,
					"analyst" : 2.6,
					"opskins" : 2.2
				},
				0 : {
					"market" : 2.42,
					"analyst" : 2.59,
					"opskins" : 2.32
				}
			},
			"souvenir" : {}
		}
	},
	"454" : {
		"item_id" : 454,
		"type" : "★ Butterfly Knife",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 180.95,
					"analyst" : 180.04,
					"opskins" : 149.99
				},
				3 : {
					"market" : 234.16,
					"analyst" : 242.64,
					"opskins" : 199.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : 281.18,
					"analyst" : 304.02,
					"opskins" : 240
				},
				3 : {
					"market" : 389.45,
					"analyst" : 388,
					"opskins" : 315.25
				}
			},
			"souvenir" : {}
		}
	},
	"455" : {
		"item_id" : 455,
		"type" : "★ Butterfly Knife",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 211.89,
					"analyst" : 185.86,
					"opskins" : 149.88
				},
				3 : {
					"market" : 110,
					"analyst" : 107.23,
					"opskins" : 91.89
				},
				2 : {
					"market" : 90,
					"analyst" : 89.15,
					"opskins" : 76.15
				},
				1 : {
					"market" : 81.77,
					"analyst" : 84.43,
					"opskins" : 73.04
				},
				0 : {
					"market" : 82.49,
					"analyst" : 80.26,
					"opskins" : 68
				}
			},
			"stattrak" : {
				4 : {
					"market" : 399.05,
					"analyst" : 520,
					"opskins" : 495
				},
				3 : {
					"market" : 177.46,
					"analyst" : 196.17,
					"opskins" : 151.47
				},
				2 : {
					"market" : 152.56,
					"analyst" : 148.45,
					"opskins" : 119.99
				},
				1 : {
					"market" : 140,
					"analyst" : 138.25,
					"opskins" : 112.75
				},
				0 : {
					"market" : 155.74,
					"analyst" : 134.39,
					"opskins" : 103.99
				}
			},
			"souvenir" : {}
		}
	},
	"456" : {
		"item_id" : 456,
		"type" : "★ Butterfly Knife",
		"skinName" : "Stained",
		"prices" : {
			"default" : {
				4 : {
					"market" : 150,
					"analyst" : 108.59,
					"opskins" : 89.88
				},
				3 : {
					"market" : 73.3,
					"analyst" : 70.68,
					"opskins" : 61.18
				},
				2 : {
					"market" : 60.79,
					"analyst" : 65.61,
					"opskins" : 53.83
				},
				1 : {
					"market" : 67.8,
					"analyst" : 64.31,
					"opskins" : 53.74
				},
				0 : {
					"market" : 65.8,
					"analyst" : 61.8,
					"opskins" : 54.31
				}
			},
			"stattrak" : {
				4 : {
					"market" : 397.92,
					"analyst" : -1,
					"opskins" : 520
				},
				3 : {
					"market" : 114.51,
					"analyst" : 104.44,
					"opskins" : 81.13
				},
				2 : {
					"market" : 100.65,
					"analyst" : 96.55,
					"opskins" : 81.18
				},
				1 : {
					"market" : 93.23,
					"analyst" : 98.99,
					"opskins" : 85
				},
				0 : {
					"market" : 105.95,
					"analyst" : 100.01,
					"opskins" : 86
				}
			},
			"souvenir" : {}
		}
	},
	"457" : {
		"item_id" : 457,
		"type" : "FAMAS",
		"skinName" : "Survivor Z",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.2,
					"analyst" : 0.22,
					"opskins" : 0.2
				},
				3 : {
					"market" : 0.12,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.08
				},
				1 : {
					"market" : 0.12,
					"analyst" : 0.12,
					"opskins" : 0.11
				},
				0 : {
					"market" : 0.1,
					"analyst" : 0.08,
					"opskins" : 0.08
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.04,
					"analyst" : 1.04,
					"opskins" : 0.87
				},
				3 : {
					"market" : 0.5,
					"analyst" : 0.61,
					"opskins" : 0.48
				},
				2 : {
					"market" : 0.34,
					"analyst" : 0.4,
					"opskins" : 0.35
				},
				1 : {
					"market" : 0.73,
					"analyst" : 0.63,
					"opskins" : 0.48
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.42,
					"opskins" : 0.34
				}
			},
			"souvenir" : {}
		}
	},
	"458" : {
		"item_id" : 458,
		"type" : "XM1014",
		"skinName" : "Scumbria",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.17,
					"analyst" : 0.17,
					"opskins" : 0.15
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.8,
					"analyst" : 0.82,
					"opskins" : 0.78
				},
				3 : {
					"market" : 0.23,
					"analyst" : 0.24,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.17
				}
			},
			"souvenir" : {}
		}
	},
	"459" : {
		"item_id" : 459,
		"type" : "MAC-10",
		"skinName" : "Rangeen",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.13,
					"analyst" : 0.14,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.36
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.58,
					"analyst" : 0.65,
					"opskins" : 0.56
				},
				3 : {
					"market" : 0.32,
					"analyst" : 0.35,
					"opskins" : 0.3
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.28,
					"analyst" : 0.25,
					"opskins" : 0.43
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.23,
					"opskins" : 1.31
				}
			},
			"souvenir" : {}
		}
	},
	"460" : {
		"item_id" : 460,
		"type" : "SCAR-20",
		"skinName" : "Green Marine",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.14,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.08
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.73,
					"analyst" : 0.71,
					"opskins" : 0.61
				},
				3 : {
					"market" : 0.37,
					"analyst" : 0.32,
					"opskins" : 0.31
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.26,
					"analyst" : 0.24,
					"opskins" : 0.29
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.2,
					"opskins" : 0.21
				}
			},
			"souvenir" : {}
		}
	},
	"461" : {
		"item_id" : 461,
		"type" : "MAG-7",
		"skinName" : "Cobalt Core",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.14,
					"analyst" : 0.13,
					"opskins" : 0.12
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.2
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.61,
					"analyst" : 0.61,
					"opskins" : 0.47
				},
				3 : {
					"market" : 0.3,
					"analyst" : 0.32,
					"opskins" : 0.26
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.18
				}
			},
			"souvenir" : {}
		}
	},
	"462" : {
		"item_id" : 462,
		"type" : "Glock-18",
		"skinName" : "Wraiths",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.34,
					"analyst" : 0.34,
					"opskins" : 0.34
				},
				3 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.1,
					"analyst" : 0.09,
					"opskins" : 0.09
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				0 : {
					"market" : 0.12,
					"analyst" : 0.1,
					"opskins" : 0.1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.32,
					"analyst" : 2.42,
					"opskins" : 1.98
				},
				3 : {
					"market" : 0.73,
					"analyst" : 0.89,
					"opskins" : 0.74
				},
				2 : {
					"market" : 0.55,
					"analyst" : 0.58,
					"opskins" : 0.51
				},
				1 : {
					"market" : 1.11,
					"analyst" : 1.21,
					"opskins" : 1.01
				},
				0 : {
					"market" : 0.58,
					"analyst" : 0.63,
					"opskins" : 0.52
				}
			},
			"souvenir" : {}
		}
	},
	"463" : {
		"item_id" : 463,
		"type" : "Dual Berettas",
		"skinName" : "Dualing Dragons",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.53,
					"analyst" : 0.56,
					"opskins" : 0.5
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.1
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.15,
					"analyst" : 3.29,
					"opskins" : 2.8
				},
				3 : {
					"market" : 0.53,
					"analyst" : 0.59,
					"opskins" : 0.47
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.29,
					"opskins" : 0.23
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.27,
					"opskins" : 0.23
				},
				0 : {
					"market" : 0.25,
					"analyst" : 0.28,
					"opskins" : 0.24
				}
			},
			"souvenir" : {}
		}
	},
	"464" : {
		"item_id" : 464,
		"type" : "M249",
		"skinName" : "Nebula Crusader",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.18,
					"analyst" : 1.13,
					"opskins" : 0.94
				},
				3 : {
					"market" : 0.53,
					"analyst" : 0.53,
					"opskins" : 0.48
				},
				2 : {
					"market" : 0.35,
					"analyst" : 0.37,
					"opskins" : 0.33
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.36,
					"opskins" : 0.47
				},
				0 : {
					"market" : 0.34,
					"analyst" : 0.34,
					"opskins" : 0.3
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.2,
					"analyst" : 4.71,
					"opskins" : 4.53
				},
				3 : {
					"market" : 1.5,
					"analyst" : 1.56,
					"opskins" : 1.35
				},
				2 : {
					"market" : 1.11,
					"analyst" : 1.02,
					"opskins" : 0.89
				},
				1 : {
					"market" : 0.99,
					"analyst" : 0.94,
					"opskins" : 0.78
				},
				0 : {
					"market" : 0.83,
					"analyst" : 0.84,
					"opskins" : 0.74
				}
			},
			"souvenir" : {}
		}
	},
	"465" : {
		"item_id" : 465,
		"type" : "Galil AR",
		"skinName" : "Stone Cold",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.38,
					"analyst" : 1.5,
					"opskins" : 1.25
				},
				3 : {
					"market" : 0.51,
					"analyst" : 0.56,
					"opskins" : 0.46
				},
				2 : {
					"market" : 0.34,
					"analyst" : 0.38,
					"opskins" : 0.35
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.38,
					"opskins" : 0.32
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.36,
					"opskins" : 0.34
				}
			},
			"stattrak" : {
				4 : {
					"market" : 6.8,
					"analyst" : 6.89,
					"opskins" : 6.15
				},
				3 : {
					"market" : 1.77,
					"analyst" : 2,
					"opskins" : 1.63
				},
				2 : {
					"market" : 1.12,
					"analyst" : 1.08,
					"opskins" : 0.87
				},
				1 : {
					"market" : 1.18,
					"analyst" : 1.02,
					"opskins" : 1.06
				},
				0 : {
					"market" : 1.16,
					"analyst" : 0.91,
					"opskins" : 0.75
				}
			},
			"souvenir" : {}
		}
	},
	"466" : {
		"item_id" : 466,
		"type" : "MP7",
		"skinName" : "Special Delivery",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.05,
					"analyst" : 0.9,
					"opskins" : 0.79
				},
				3 : {
					"market" : 0.52,
					"analyst" : 0.53,
					"opskins" : 0.43
				},
				2 : {
					"market" : 0.32,
					"analyst" : 0.37,
					"opskins" : 0.31
				},
				1 : {
					"market" : 0.41,
					"analyst" : 0.41,
					"opskins" : 0.35
				},
				0 : {
					"market" : 0.32,
					"analyst" : 0.35,
					"opskins" : 0.33
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.63,
					"analyst" : 3.62,
					"opskins" : 3.34
				},
				3 : {
					"market" : 1.58,
					"analyst" : 1.74,
					"opskins" : 1.5
				},
				2 : {
					"market" : 1.15,
					"analyst" : 1.03,
					"opskins" : 0.85
				},
				1 : {
					"market" : 1,
					"analyst" : 1.05,
					"opskins" : 0.97
				},
				0 : {
					"market" : 1,
					"analyst" : 0.88,
					"opskins" : 0.76
				}
			},
			"souvenir" : {}
		}
	},
	"467" : {
		"item_id" : 467,
		"type" : "P250",
		"skinName" : "Wingshot",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.57,
					"analyst" : 1.69,
					"opskins" : 1.61
				},
				3 : {
					"market" : 0.57,
					"analyst" : 0.63,
					"opskins" : 0.52
				},
				2 : {
					"market" : 0.36,
					"analyst" : 0.39,
					"opskins" : 0.31
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.4,
					"opskins" : 0.33
				},
				0 : {
					"market" : 0.34,
					"analyst" : 0.37,
					"opskins" : 0.3
				}
			},
			"stattrak" : {
				4 : {
					"market" : 6.55,
					"analyst" : 6.86,
					"opskins" : 7
				},
				3 : {
					"market" : 2.22,
					"analyst" : 2.33,
					"opskins" : 2.04
				},
				2 : {
					"market" : 1.17,
					"analyst" : 1.3,
					"opskins" : 1.08
				},
				1 : {
					"market" : 1.35,
					"analyst" : 1.45,
					"opskins" : 1.23
				},
				0 : {
					"market" : 1.11,
					"analyst" : 1.19,
					"opskins" : 1.03
				}
			},
			"souvenir" : {}
		}
	},
	"468" : {
		"item_id" : 468,
		"type" : "G3SG1",
		"skinName" : "Flux",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.56,
					"analyst" : 5.03,
					"opskins" : 4.35
				},
				3 : {
					"market" : 2.32,
					"analyst" : 2.71,
					"opskins" : 2.33
				},
				2 : {
					"market" : 1.96,
					"analyst" : 1.81,
					"opskins" : 1.48
				},
				1 : {
					"market" : 1.92,
					"analyst" : 1.82,
					"opskins" : 1.52
				},
				0 : {
					"market" : 1.81,
					"analyst" : 1.73,
					"opskins" : 1.46
				}
			},
			"stattrak" : {
				4 : {
					"market" : 29.1,
					"analyst" : 27.44,
					"opskins" : 23.5
				},
				3 : {
					"market" : 13.18,
					"analyst" : 10.74,
					"opskins" : 9.99
				},
				2 : {
					"market" : 6.26,
					"analyst" : 5.45,
					"opskins" : 5.4
				},
				1 : {
					"market" : 6.09,
					"analyst" : 5.11,
					"opskins" : 4.79
				},
				0 : {
					"market" : 6.09,
					"analyst" : 4.72,
					"opskins" : 4.87
				}
			},
			"souvenir" : {}
		}
	},
	"469" : {
		"item_id" : 469,
		"type" : "SSG 08",
		"skinName" : "Big Iron",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.4,
					"analyst" : 4.33,
					"opskins" : 3.7
				},
				3 : {
					"market" : 2.56,
					"analyst" : 2.84,
					"opskins" : 2.35
				},
				2 : {
					"market" : 2.03,
					"analyst" : 2,
					"opskins" : 1.64
				},
				1 : {
					"market" : 2.04,
					"analyst" : 2.11,
					"opskins" : 1.72
				},
				0 : {
					"market" : 1.58,
					"analyst" : 1.86,
					"opskins" : 1.65
				}
			},
			"stattrak" : {
				4 : {
					"market" : 25.3,
					"analyst" : 19.62,
					"opskins" : 25
				},
				3 : {
					"market" : 11.5,
					"analyst" : 10.99,
					"opskins" : 10.4
				},
				2 : {
					"market" : 5.57,
					"analyst" : 5.9,
					"opskins" : 5.2
				},
				0 : {
					"market" : 5.11,
					"analyst" : 5.55,
					"opskins" : 4.94
				},
				1 : {
					"market" : 6.85,
					"analyst" : 5.1,
					"opskins" : 5.75
				}
			},
			"souvenir" : {}
		}
	},
	"470" : {
		"item_id" : 470,
		"type" : "USP-S",
		"skinName" : "Kill Confirmed",
		"prices" : {
			"default" : {
				4 : {
					"market" : 51.38,
					"analyst" : 50.29,
					"opskins" : 43
				},
				3 : {
					"market" : 27.41,
					"analyst" : 28.19,
					"opskins" : 24.99
				},
				2 : {
					"market" : 19.17,
					"analyst" : 20.81,
					"opskins" : 18.45
				},
				1 : {
					"market" : 18.01,
					"analyst" : 18.23,
					"opskins" : 16.45
				},
				0 : {
					"market" : 16.11,
					"analyst" : 16.88,
					"opskins" : 15.37
				}
			},
			"stattrak" : {
				4 : {
					"market" : 263.99,
					"analyst" : 242.28,
					"opskins" : 200
				},
				3 : {
					"market" : 109.25,
					"analyst" : 110.5,
					"opskins" : 99
				},
				2 : {
					"market" : 81.02,
					"analyst" : 79.35,
					"opskins" : 65.95
				},
				1 : {
					"market" : 65.67,
					"analyst" : 63.19,
					"opskins" : 57
				},
				0 : {
					"market" : 57.15,
					"analyst" : 57.14,
					"opskins" : 52.88
				}
			},
			"souvenir" : {}
		}
	},
	"471" : {
		"item_id" : 471,
		"type" : "MP7",
		"skinName" : "Skulls",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.74,
					"analyst" : 0.76,
					"opskins" : 0.75
				},
				2 : {
					"market" : 0.58,
					"analyst" : 0.61,
					"opskins" : 0.6
				}
			},
			"stattrak" : {
				3 : {
					"market" : 2.25,
					"analyst" : 2.13,
					"opskins" : 1.73
				},
				2 : {
					"market" : 1.44,
					"analyst" : 1.49,
					"opskins" : 1.35
				}
			},
			"souvenir" : {}
		}
	},
	"472" : {
		"item_id" : 472,
		"type" : "AUG",
		"skinName" : "Wings",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.75,
					"analyst" : 0.7,
					"opskins" : 0.68
				},
				3 : {
					"market" : 0.77,
					"analyst" : 0.72,
					"opskins" : 0.68
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.95,
					"analyst" : 1.98,
					"opskins" : 1.76
				},
				3 : {
					"market" : 1.92,
					"analyst" : 1.95,
					"opskins" : 1.67
				}
			},
			"souvenir" : {}
		}
	},
	"473" : {
		"item_id" : 473,
		"type" : "SG 553",
		"skinName" : "Ultraviolet",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.31,
					"analyst" : 6.35,
					"opskins" : 5.5
				},
				3 : {
					"market" : 0.73,
					"analyst" : 0.85,
					"opskins" : 0.75
				},
				2 : {
					"market" : 0.73,
					"analyst" : 0.62,
					"opskins" : 0.6
				},
				1 : {
					"market" : 0.73,
					"analyst" : 0.69,
					"opskins" : 0.79
				},
				0 : {
					"market" : 0.73,
					"analyst" : 0.59,
					"opskins" : 1.42
				}
			},
			"stattrak" : {
				4 : {
					"market" : 40.8,
					"analyst" : 28.65,
					"opskins" : 31.99
				},
				3 : {
					"market" : 2.53,
					"analyst" : 2.29,
					"opskins" : 2.03
				},
				2 : {
					"market" : 1.56,
					"analyst" : 1.44,
					"opskins" : 1.28
				},
				1 : {
					"market" : 1.46,
					"analyst" : 1.55,
					"opskins" : 1.3
				},
				0 : {
					"market" : 1.49,
					"analyst" : 1.38,
					"opskins" : 1.29
				}
			},
			"souvenir" : {}
		}
	},
	"474" : {
		"item_id" : 474,
		"type" : "Glock-18",
		"skinName" : "Dragon Tattoo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.41,
					"analyst" : 5.74,
					"opskins" : 5.39
				},
				3 : {
					"market" : 6.57,
					"analyst" : 6.02,
					"opskins" : 6.48
				}
			},
			"stattrak" : {
				4 : {
					"market" : 19.09,
					"analyst" : 19.5,
					"opskins" : 16.99
				},
				3 : {
					"market" : 24.38,
					"analyst" : 20.88,
					"opskins" : 18.13
				}
			},
			"souvenir" : {}
		}
	},
	"475" : {
		"item_id" : 475,
		"type" : "USP-S",
		"skinName" : "Dark Water",
		"prices" : {
			"default" : {
				3 : {
					"market" : 6,
					"analyst" : 5.46,
					"opskins" : 5.45
				},
				2 : {
					"market" : 5.64,
					"analyst" : 5.05,
					"opskins" : 4.8
				}
			},
			"stattrak" : {
				3 : {
					"market" : 19.72,
					"analyst" : 16.32,
					"opskins" : 15.59
				},
				2 : {
					"market" : 15.18,
					"analyst" : 12.34,
					"opskins" : 17.1
				}
			},
			"souvenir" : {}
		}
	},
	"476" : {
		"item_id" : 476,
		"type" : "M4A1-S",
		"skinName" : "Dark Water",
		"prices" : {
			"default" : {
				3 : {
					"market" : 5.06,
					"analyst" : 5.41,
					"opskins" : 5.22
				},
				2 : {
					"market" : 5.54,
					"analyst" : 5.01,
					"opskins" : 4.98
				}
			},
			"stattrak" : {
				3 : {
					"market" : 14.78,
					"analyst" : 15.39,
					"opskins" : 13.31
				},
				2 : {
					"market" : 12,
					"analyst" : 12.67,
					"opskins" : 11.8
				}
			},
			"souvenir" : {}
		}
	},
	"477" : {
		"item_id" : 477,
		"type" : "★ Flip Knife",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 483,
					"opskins" : 875
				},
				3 : {
					"market" : 158.93,
					"analyst" : 144.55,
					"opskins" : 117
				},
				2 : {
					"market" : 72.86,
					"analyst" : 76.68,
					"opskins" : 62.68
				},
				1 : {
					"market" : 65.09,
					"analyst" : 67.51,
					"opskins" : 59.67
				},
				0 : {
					"market" : 52.99,
					"analyst" : 52.37,
					"opskins" : 49.89
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 237.16,
					"analyst" : 204,
					"opskins" : 251.99
				},
				2 : {
					"market" : 102,
					"analyst" : 101.7,
					"opskins" : 84.89
				},
				1 : {
					"market" : 92.17,
					"analyst" : 112.62,
					"opskins" : 90
				},
				0 : {
					"market" : 343.86,
					"analyst" : 84.6,
					"opskins" : 84
				}
			},
			"souvenir" : {}
		}
	},
	"478" : {
		"item_id" : 478,
		"type" : "★ Butterfly Knife",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 773,
					"opskins" : 782.5
				},
				3 : {
					"market" : 190,
					"analyst" : 184.5,
					"opskins" : 149.75
				},
				2 : {
					"market" : 91.2,
					"analyst" : 94.3,
					"opskins" : 82.5
				},
				1 : {
					"market" : 97.45,
					"analyst" : 98.3,
					"opskins" : 78.38
				},
				0 : {
					"market" : 68.44,
					"analyst" : 73.35,
					"opskins" : 63.89
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 2899
				},
				3 : {
					"market" : 407.39,
					"analyst" : 376.27,
					"opskins" : 298.89
				},
				2 : {
					"market" : 157.98,
					"analyst" : 170.55,
					"opskins" : 132.45
				},
				1 : {
					"market" : 143.52,
					"analyst" : 174.9,
					"opskins" : 139.98
				},
				0 : {
					"market" : 101.1,
					"analyst" : 119.02,
					"opskins" : 98.22
				}
			},
			"souvenir" : {}
		}
	},
	"479" : {
		"item_id" : 479,
		"type" : "★ Gut Knife",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : 240,
					"analyst" : 128.63,
					"opskins" : 160
				},
				3 : {
					"market" : 53.91,
					"analyst" : 50.94,
					"opskins" : 44.24
				},
				2 : {
					"market" : 33.64,
					"analyst" : 33.33,
					"opskins" : 30.48
				},
				1 : {
					"market" : 36.5,
					"analyst" : 34.38,
					"opskins" : 32
				},
				0 : {
					"market" : 33,
					"analyst" : 33.74,
					"opskins" : 32
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 81.96,
					"analyst" : 76.68,
					"opskins" : 63.35
				},
				2 : {
					"market" : 45.83,
					"analyst" : 46.86,
					"opskins" : 42.99
				},
				1 : {
					"market" : 115,
					"analyst" : 111.79,
					"opskins" : 88.68
				},
				0 : {
					"market" : 47.68,
					"analyst" : 47.5,
					"opskins" : 40.27
				}
			},
			"souvenir" : {}
		}
	},
	"480" : {
		"item_id" : 480,
		"type" : "Tec-9",
		"skinName" : "Blue Titanium",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.83,
					"analyst" : 0.87,
					"opskins" : 0.83
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.48,
					"analyst" : 2.61,
					"opskins" : 2.77
				}
			},
			"souvenir" : {}
		}
	},
	"481" : {
		"item_id" : 481,
		"type" : "M4A1-S",
		"skinName" : "Blood Tiger",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.04,
					"analyst" : 2.07,
					"opskins" : 1.88
				},
				3 : {
					"market" : 1.52,
					"analyst" : 1.52,
					"opskins" : 1.44
				},
				2 : {
					"market" : 1.31,
					"analyst" : 1.45,
					"opskins" : 1.46
				}
			},
			"stattrak" : {
				4 : {
					"market" : 8.29,
					"analyst" : 9.59,
					"opskins" : 8.25
				},
				3 : {
					"market" : 6.22,
					"analyst" : 6.98,
					"opskins" : 6.19
				},
				2 : {
					"market" : 6.69,
					"analyst" : 6.9,
					"opskins" : 6.21
				}
			},
			"souvenir" : {}
		}
	},
	"482" : {
		"item_id" : 482,
		"type" : "FAMAS",
		"skinName" : "Hexane",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.86,
					"analyst" : 0.91,
					"opskins" : 0.82
				},
				3 : {
					"market" : 0.75,
					"analyst" : 0.7,
					"opskins" : 0.75
				},
				2 : {
					"market" : 0.62,
					"analyst" : 0.54,
					"opskins" : 0.68
				},
				1 : {
					"market" : 0.82,
					"analyst" : 0.79,
					"opskins" : 0.79
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.71,
					"analyst" : 2.86,
					"opskins" : 2.74
				},
				3 : {
					"market" : 1.74,
					"analyst" : 1.58,
					"opskins" : 1.4
				},
				2 : {
					"market" : 1.95,
					"analyst" : 1.1,
					"opskins" : 2.8
				},
				1 : {
					"market" : 2.42,
					"analyst" : 2.57,
					"opskins" : 3
				}
			},
			"souvenir" : {}
		}
	},
	"483" : {
		"item_id" : 483,
		"type" : "P250",
		"skinName" : "Hive",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.83,
					"analyst" : 0.92,
					"opskins" : 0.74
				},
				3 : {
					"market" : 0.71,
					"analyst" : 0.7,
					"opskins" : 0.68
				},
				2 : {
					"market" : 0.7,
					"analyst" : 0.66,
					"opskins" : 0.68
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.91,
					"analyst" : 3.04,
					"opskins" : 2.75
				},
				3 : {
					"market" : 1.69,
					"analyst" : 1.7,
					"opskins" : 1.4
				},
				2 : {
					"market" : 2,
					"analyst" : 1.46,
					"opskins" : 1.31
				}
			},
			"souvenir" : {}
		}
	},
	"484" : {
		"item_id" : 484,
		"type" : "SCAR-20",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.03,
					"analyst" : 3.16,
					"opskins" : 2.9
				},
				3 : {
					"market" : 0.71,
					"analyst" : 0.74,
					"opskins" : 0.66
				},
				2 : {
					"market" : 0.55,
					"analyst" : 0.55,
					"opskins" : 0.48
				},
				1 : {
					"market" : 0.62,
					"analyst" : 0.51,
					"opskins" : 0.45
				},
				0 : {
					"market" : 0.53,
					"analyst" : 0.44,
					"opskins" : 0.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 21.4,
					"analyst" : 23.5,
					"opskins" : 25
				},
				3 : {
					"market" : 1.7,
					"analyst" : 1.83,
					"opskins" : 1.59
				},
				2 : {
					"market" : 0.89,
					"analyst" : 0.97,
					"opskins" : 1
				},
				1 : {
					"market" : 1.11,
					"analyst" : 1.12,
					"opskins" : 1.37
				},
				0 : {
					"market" : 1.21,
					"analyst" : 0.86,
					"opskins" : 1.93
				}
			},
			"souvenir" : {}
		}
	},
	"485" : {
		"item_id" : 485,
		"type" : "Five-SeveN",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.05,
					"analyst" : 9.86,
					"opskins" : 9
				},
				3 : {
					"market" : 3.73,
					"analyst" : 4.26,
					"opskins" : 3.63
				},
				2 : {
					"market" : 2.45,
					"analyst" : 2.6,
					"opskins" : 2.26
				},
				1 : {
					"market" : 2.22,
					"analyst" : 2.31,
					"opskins" : 2.01
				},
				0 : {
					"market" : 2,
					"analyst" : 2.16,
					"opskins" : 2.16
				}
			},
			"stattrak" : {
				4 : {
					"market" : 39.99,
					"analyst" : 42.65,
					"opskins" : 36.7
				},
				3 : {
					"market" : 19.98,
					"analyst" : 20.51,
					"opskins" : 17.93
				},
				2 : {
					"market" : 9.11,
					"analyst" : 9.51,
					"opskins" : 9.9
				},
				1 : {
					"market" : 8.87,
					"analyst" : 9.34,
					"opskins" : 7.96
				},
				0 : {
					"market" : 7.3,
					"analyst" : 7.33,
					"opskins" : 6.54
				}
			},
			"souvenir" : {}
		}
	},
	"486" : {
		"item_id" : 486,
		"type" : "MP9",
		"skinName" : "Hypnotic",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.85,
					"analyst" : 0.96,
					"opskins" : 0.83
				},
				3 : {
					"market" : 2.57,
					"analyst" : 2.32,
					"opskins" : 2.16
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.72,
					"analyst" : 3.86,
					"opskins" : 3.33
				},
				3 : {
					"market" : 6.07,
					"analyst" : 6,
					"opskins" : 11.5
				}
			},
			"souvenir" : {}
		}
	},
	"487" : {
		"item_id" : 487,
		"type" : "Nova",
		"skinName" : "Graphite",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.81,
					"analyst" : 0.77,
					"opskins" : 0.67
				},
				3 : {
					"market" : 0.92,
					"analyst" : 0.75,
					"opskins" : 0.65
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.81,
					"analyst" : 3.21,
					"opskins" : 3
				},
				3 : {
					"market" : 3.24,
					"analyst" : 2.93,
					"opskins" : 2.7
				}
			},
			"souvenir" : {}
		}
	},
	"488" : {
		"item_id" : 488,
		"type" : "Dual Berettas",
		"skinName" : "Hemoglobin",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.84,
					"analyst" : 0.88,
					"opskins" : 0.71
				},
				3 : {
					"market" : 0.86,
					"analyst" : 0.82,
					"opskins" : 0.68
				},
				2 : {
					"market" : 0.78,
					"analyst" : 0.75,
					"opskins" : 0.6
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.45,
					"analyst" : 4.62,
					"opskins" : 4.1
				},
				3 : {
					"market" : 3.06,
					"analyst" : 3.19,
					"opskins" : 2.63
				},
				2 : {
					"market" : 3.82,
					"analyst" : 3.2,
					"opskins" : 2.73
				}
			},
			"souvenir" : {}
		}
	},
	"489" : {
		"item_id" : 489,
		"type" : "P90",
		"skinName" : "Cold Blooded",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.17,
					"analyst" : 4.37,
					"opskins" : 3.88
				},
				3 : {
					"market" : 5.14,
					"analyst" : 5.02,
					"opskins" : 4.69
				}
			},
			"stattrak" : {
				4 : {
					"market" : 21.08,
					"analyst" : 19.65,
					"opskins" : 22.95
				},
				3 : {
					"market" : 23,
					"analyst" : 22.18,
					"opskins" : 19.85
				}
			},
			"souvenir" : {}
		}
	},
	"490" : {
		"item_id" : 490,
		"type" : "USP-S",
		"skinName" : "Serum",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.69,
					"analyst" : 6.43,
					"opskins" : 6.74
				},
				3 : {
					"market" : 6.11,
					"analyst" : 5.28,
					"opskins" : 5.5
				},
				2 : {
					"market" : 6.95,
					"analyst" : 4.88,
					"opskins" : 6
				}
			},
			"stattrak" : {
				4 : {
					"market" : 28.26,
					"analyst" : 27.7,
					"opskins" : 25.9
				},
				3 : {
					"market" : 22,
					"analyst" : 20.66,
					"opskins" : 17.43
				},
				2 : {
					"market" : 19.85,
					"analyst" : 17.33,
					"opskins" : 14.99
				}
			},
			"souvenir" : {}
		}
	},
	"491" : {
		"item_id" : 491,
		"type" : "★ Karambit",
		"skinName" : "Ultraviolet",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 950,
					"opskins" : 787
				},
				3 : {
					"market" : 183.97,
					"analyst" : 189.77,
					"opskins" : 159.99
				},
				2 : {
					"market" : 144.71,
					"analyst" : 135.3,
					"opskins" : 110.79
				},
				1 : {
					"market" : 134.98,
					"analyst" : 144.69,
					"opskins" : 114.95
				},
				0 : {
					"market" : 115,
					"analyst" : 117.98,
					"opskins" : 99.48
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 370.36,
					"analyst" : 330.58,
					"opskins" : 263.99
				},
				2 : {
					"market" : 178.88,
					"analyst" : 190.57,
					"opskins" : 147.95
				},
				1 : {
					"market" : 180.1,
					"analyst" : 197.29,
					"opskins" : 158.98
				},
				0 : {
					"market" : 165,
					"analyst" : 161.75,
					"opskins" : 129.99
				}
			},
			"souvenir" : {}
		}
	},
	"492" : {
		"item_id" : 492,
		"type" : "★ Butterfly Knife",
		"skinName" : "Forest DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 174.38,
					"analyst" : 121.44,
					"opskins" : 107.39
				},
				3 : {
					"market" : 62.01,
					"analyst" : 65.73,
					"opskins" : 56.49
				},
				2 : {
					"market" : 47.07,
					"analyst" : 53.85,
					"opskins" : 45.5
				},
				1 : {
					"market" : 54.41,
					"analyst" : 54.79,
					"opskins" : 47.85
				},
				0 : {
					"market" : 48.72,
					"analyst" : 51.23,
					"opskins" : 46.67
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 703,
					"opskins" : 900
				},
				3 : {
					"market" : 99.95,
					"analyst" : 102.55,
					"opskins" : 85
				},
				2 : {
					"market" : 57.5,
					"analyst" : 71.4,
					"opskins" : 61.97
				},
				1 : {
					"market" : 107.22,
					"analyst" : 84.36,
					"opskins" : 96.1
				},
				0 : {
					"market" : 72.42,
					"analyst" : 65.33,
					"opskins" : 59.17
				}
			},
			"souvenir" : {}
		}
	},
	"493" : {
		"item_id" : 493,
		"type" : "★ Huntsman Knife",
		"skinName" : "Blue Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 87.6,
					"analyst" : 125.59,
					"opskins" : 110.01
				},
				3 : {
					"market" : 74.6,
					"analyst" : 72.26,
					"opskins" : 61
				},
				2 : {
					"market" : 58.27,
					"analyst" : 60.1,
					"opskins" : 55
				},
				1 : {
					"market" : 55.01,
					"analyst" : 57.02,
					"opskins" : 51.28
				},
				0 : {
					"market" : 59,
					"analyst" : 55.35,
					"opskins" : 51
				}
			},
			"stattrak" : {
				4 : {
					"market" : 369.28,
					"analyst" : 331,
					"opskins" : -1
				},
				3 : {
					"market" : 118.58,
					"analyst" : 118.83,
					"opskins" : 111.11
				},
				2 : {
					"market" : 85.82,
					"analyst" : 93.33,
					"opskins" : 76.95
				},
				1 : {
					"market" : 94.9,
					"analyst" : 101.21,
					"opskins" : 83.99
				},
				0 : {
					"market" : 104.89,
					"analyst" : 99.3,
					"opskins" : 109
				}
			},
			"souvenir" : {}
		}
	},
	"494" : {
		"item_id" : 494,
		"type" : "CZ75-Auto",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.36,
					"analyst" : 6.26,
					"opskins" : 6
				},
				3 : {
					"market" : 0.49,
					"analyst" : 0.48,
					"opskins" : 0.42
				},
				2 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.2,
					"analyst" : 0.22,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.17,
					"analyst" : 0.17,
					"opskins" : 0.21
				}
			},
			"stattrak" : {
				4 : {
					"market" : 75,
					"analyst" : 56.6,
					"opskins" : 52
				},
				3 : {
					"market" : 2.67,
					"analyst" : 2.72,
					"opskins" : 2.65
				},
				2 : {
					"market" : 0.48,
					"analyst" : 0.53,
					"opskins" : 0.42
				},
				1 : {
					"market" : 0.62,
					"analyst" : 0.6,
					"opskins" : 0.55
				},
				0 : {
					"market" : 0.42,
					"analyst" : 0.47,
					"opskins" : 0.45
				}
			},
			"souvenir" : {}
		}
	},
	"495" : {
		"item_id" : 495,
		"type" : "P2000",
		"skinName" : "Red FragCam",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.46,
					"analyst" : 0.46,
					"opskins" : 0.39
				},
				3 : {
					"market" : 0.15,
					"analyst" : 0.16,
					"opskins" : 0.14
				},
				2 : {
					"market" : 0.11,
					"analyst" : 0.11,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.25,
					"analyst" : 0.16,
					"opskins" : 0.5
				},
				0 : {
					"market" : 0.16,
					"analyst" : 0.15,
					"opskins" : 1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.99,
					"analyst" : 2.59,
					"opskins" : 2.14
				},
				3 : {
					"market" : 0.7,
					"analyst" : 0.72,
					"opskins" : 0.69
				},
				2 : {
					"market" : 0.4,
					"analyst" : 0.46,
					"opskins" : 0.42
				},
				1 : {
					"market" : 0.58,
					"analyst" : 0.6,
					"opskins" : 0.66
				},
				0 : {
					"market" : 0.48,
					"analyst" : 0.59,
					"opskins" : 0.57
				}
			},
			"souvenir" : {}
		}
	},
	"496" : {
		"item_id" : 496,
		"type" : "Dual Berettas",
		"skinName" : "Panther",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.71,
					"analyst" : 0.77,
					"opskins" : 0.64
				},
				3 : {
					"market" : 0.38,
					"analyst" : 0.33,
					"opskins" : 0.25
				},
				2 : {
					"market" : 0.13,
					"analyst" : 0.12,
					"opskins" : 0.18
				},
				1 : {
					"market" : 0.49,
					"analyst" : 0.44,
					"opskins" : 0.46
				},
				0 : {
					"market" : 0.43,
					"analyst" : 0.23,
					"opskins" : 0.22
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.66,
					"analyst" : 3.05,
					"opskins" : 2.56
				},
				3 : {
					"market" : 1.73,
					"analyst" : 1.39,
					"opskins" : 1.15
				},
				2 : {
					"market" : 0.43,
					"analyst" : 0.5,
					"opskins" : 0.4
				},
				1 : {
					"market" : 0.86,
					"analyst" : 0.93,
					"opskins" : 0.9
				},
				0 : {
					"market" : 0.42,
					"analyst" : 0.41,
					"opskins" : 0.68
				}
			},
			"souvenir" : {}
		}
	},
	"497" : {
		"item_id" : 497,
		"type" : "USP-S",
		"skinName" : "Stainless",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.29,
					"analyst" : 4.51,
					"opskins" : 5
				},
				3 : {
					"market" : 2,
					"analyst" : 1.84,
					"opskins" : 1.95
				},
				2 : {
					"market" : 1.12,
					"analyst" : 0.92,
					"opskins" : 1.12
				},
				1 : {
					"market" : 2.11,
					"analyst" : 1.59,
					"opskins" : 2.96
				},
				0 : {
					"market" : 1.26,
					"analyst" : 1,
					"opskins" : 1.18
				}
			},
			"stattrak" : {
				4 : {
					"market" : 28.93,
					"analyst" : 27.59,
					"opskins" : 25.95
				},
				3 : {
					"market" : 8.79,
					"analyst" : 8.56,
					"opskins" : 8.69
				},
				2 : {
					"market" : 5.69,
					"analyst" : 4.88,
					"opskins" : 4.86
				},
				1 : {
					"market" : 7.85,
					"analyst" : 6.9,
					"opskins" : 7.19
				},
				0 : {
					"market" : 5.14,
					"analyst" : 4.53,
					"opskins" : 4.53
				}
			},
			"souvenir" : {}
		}
	},
	"498" : {
		"item_id" : 498,
		"type" : "Glock-18",
		"skinName" : "Blue Fissure",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.84,
					"analyst" : 4.08,
					"opskins" : 3.89
				},
				3 : {
					"market" : 0.59,
					"analyst" : 0.69,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.38,
					"analyst" : 0.38,
					"opskins" : 0.31
				},
				1 : {
					"market" : 0.63,
					"analyst" : 0.71,
					"opskins" : 0.63
				},
				0 : {
					"market" : 0.49,
					"analyst" : 0.44,
					"opskins" : 0.41
				}
			},
			"stattrak" : {
				4 : {
					"market" : 26.05,
					"analyst" : 21.44,
					"opskins" : 26.2
				},
				3 : {
					"market" : 4.2,
					"analyst" : 4.06,
					"opskins" : 3.55
				},
				2 : {
					"market" : 2.14,
					"analyst" : 2.14,
					"opskins" : 1.79
				},
				1 : {
					"market" : 3.51,
					"analyst" : 3.47,
					"opskins" : 3.17
				},
				0 : {
					"market" : 2.22,
					"analyst" : 1.99,
					"opskins" : 1.7
				}
			},
			"souvenir" : {}
		}
	},
	"499" : {
		"item_id" : 499,
		"type" : "CZ75-Auto",
		"skinName" : "Tread Plate",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.41,
					"analyst" : 0.48,
					"opskins" : 0.41
				},
				3 : {
					"market" : 0.49,
					"analyst" : 0.36,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.51,
					"analyst" : 0.56,
					"opskins" : 3.76
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.16,
					"analyst" : 2.22,
					"opskins" : 2.16
				},
				3 : {
					"market" : 1.98,
					"analyst" : 1.81,
					"opskins" : 1.66
				},
				2 : {
					"market" : 1.86,
					"analyst" : 1.92,
					"opskins" : 3.29
				}
			},
			"souvenir" : {}
		}
	},
	"500" : {
		"item_id" : 500,
		"type" : "Tec-9",
		"skinName" : "Titanium Bit",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.43,
					"analyst" : 0.49,
					"opskins" : 0.45
				},
				3 : {
					"market" : 0.37,
					"analyst" : 0.45,
					"opskins" : 0.43
				},
				2 : {
					"market" : 0.63,
					"analyst" : 0.64,
					"opskins" : 0.62
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.17,
					"analyst" : 3.31,
					"opskins" : 2.99
				},
				3 : {
					"market" : 2.39,
					"analyst" : 2.25,
					"opskins" : 1.91
				},
				2 : {
					"market" : 2.37,
					"analyst" : 2.3,
					"opskins" : 2.03
				}
			},
			"souvenir" : {}
		}
	},
	"501" : {
		"item_id" : 501,
		"type" : "Desert Eagle",
		"skinName" : "Heirloom",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.92,
					"analyst" : 3.29,
					"opskins" : 3.3
				},
				3 : {
					"market" : 0.96,
					"analyst" : 0.96,
					"opskins" : 0.86
				},
				2 : {
					"market" : 0.49,
					"analyst" : 0.56,
					"opskins" : 0.49
				},
				1 : {
					"market" : 1.66,
					"analyst" : 1.41,
					"opskins" : 1.73
				},
				0 : {
					"market" : 0.87,
					"analyst" : 0.89,
					"opskins" : 0.89
				}
			},
			"stattrak" : {
				4 : {
					"market" : 25.46,
					"analyst" : 24.69,
					"opskins" : 23.25
				},
				3 : {
					"market" : 6.72,
					"analyst" : 6.8,
					"opskins" : 7
				},
				2 : {
					"market" : 3.61,
					"analyst" : 3.84,
					"opskins" : 3.48
				},
				1 : {
					"market" : 7.65,
					"analyst" : 9.11,
					"opskins" : 6.99
				},
				0 : {
					"market" : 3.84,
					"analyst" : 3.93,
					"opskins" : 4.04
				}
			},
			"souvenir" : {}
		}
	},
	"502" : {
		"item_id" : 502,
		"type" : "Five-SeveN",
		"skinName" : "Copper Galaxy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.99,
					"analyst" : 1.15,
					"opskins" : 0.98
				},
				3 : {
					"market" : 1.08,
					"analyst" : 1.11,
					"opskins" : 1.05
				},
				2 : {
					"market" : 0.76,
					"analyst" : 0.76,
					"opskins" : 0.67
				}
			},
			"stattrak" : {
				4 : {
					"market" : 8.02,
					"analyst" : 8.32,
					"opskins" : 7.4
				},
				3 : {
					"market" : 6.87,
					"analyst" : 6.04,
					"opskins" : 5.28
				},
				2 : {
					"market" : 3.39,
					"analyst" : 3.5,
					"opskins" : 3.52
				}
			},
			"souvenir" : {}
		}
	},
	"503" : {
		"item_id" : 503,
		"type" : "CZ75-Auto",
		"skinName" : "The Fuschia Is Now",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.55,
					"analyst" : 2.6,
					"opskins" : 2.25
				},
				3 : {
					"market" : 2.3,
					"analyst" : 1.69,
					"opskins" : 1.74
				},
				2 : {
					"market" : 1.46,
					"analyst" : 1.47,
					"opskins" : 1.61
				},
				1 : {
					"market" : 2.02,
					"analyst" : 6.84,
					"opskins" : 1.98
				}
			},
			"stattrak" : {
				4 : {
					"market" : 14.53,
					"analyst" : 13.83,
					"opskins" : 11.99
				},
				3 : {
					"market" : 10.93,
					"analyst" : 10.42,
					"opskins" : 8.94
				},
				2 : {
					"market" : 6.74,
					"analyst" : 5.28,
					"opskins" : 4.5
				},
				1 : {
					"market" : 62.19,
					"analyst" : 32,
					"opskins" : 37.5
				}
			},
			"souvenir" : {}
		}
	},
	"504" : {
		"item_id" : 504,
		"type" : "P250",
		"skinName" : "Undertow",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.89,
					"analyst" : 3.07,
					"opskins" : 2.57
				},
				3 : {
					"market" : 2.53,
					"analyst" : 2.67,
					"opskins" : 2.3
				},
				2 : {
					"market" : 2.3,
					"analyst" : 2.7,
					"opskins" : 2.39
				}
			},
			"stattrak" : {
				4 : {
					"market" : 14.92,
					"analyst" : 18.97,
					"opskins" : 17.49
				},
				3 : {
					"market" : 12.72,
					"analyst" : 12.8,
					"opskins" : 12
				},
				2 : {
					"market" : 7.24,
					"analyst" : 7.47,
					"opskins" : 6.49
				}
			},
			"souvenir" : {}
		}
	},
	"506" : {
		"item_id" : 506,
		"type" : "★ Huntsman Knife",
		"skinName" : "Forest DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 90.13,
					"analyst" : 82.03,
					"opskins" : 88.88
				},
				3 : {
					"market" : 51.64,
					"analyst" : 49.11,
					"opskins" : 45
				},
				2 : {
					"market" : 38.08,
					"analyst" : 38.79,
					"opskins" : 33.1
				},
				1 : {
					"market" : 40.66,
					"analyst" : 40.45,
					"opskins" : 34.39
				},
				0 : {
					"market" : 38.68,
					"analyst" : 38.81,
					"opskins" : 33.38
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 93,
					"analyst" : 87.43,
					"opskins" : 92
				},
				2 : {
					"market" : 60.91,
					"analyst" : 57.36,
					"opskins" : 47.52
				},
				1 : {
					"market" : 97.46,
					"analyst" : 86.11,
					"opskins" : 75
				},
				0 : {
					"market" : 109.64,
					"analyst" : 59.54,
					"opskins" : 55.55
				}
			},
			"souvenir" : {}
		}
	},
	"507" : {
		"item_id" : 507,
		"type" : "M4A4",
		"skinName" : "Faded Zebra",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.93,
					"analyst" : 3.9,
					"opskins" : 3.9
				},
				3 : {
					"market" : 1,
					"analyst" : 0.87,
					"opskins" : 0.95
				},
				2 : {
					"market" : 0.77,
					"analyst" : 0.62,
					"opskins" : 0.8
				},
				1 : {
					"market" : 0.69,
					"analyst" : 0.68,
					"opskins" : 1.29
				},
				0 : {
					"market" : 0.69,
					"analyst" : 0.61,
					"opskins" : 1.08
				}
			},
			"stattrak" : {
				4 : {
					"market" : 21.18,
					"analyst" : 19.67,
					"opskins" : 23.5
				},
				3 : {
					"market" : 3.73,
					"analyst" : 3.86,
					"opskins" : 3.86
				},
				2 : {
					"market" : 2.89,
					"analyst" : 2.75,
					"opskins" : 2.86
				},
				1 : {
					"market" : 3.14,
					"analyst" : 3.07,
					"opskins" : 3.11
				},
				0 : {
					"market" : 3.6,
					"analyst" : 3.35,
					"opskins" : 3.21
				}
			},
			"souvenir" : {}
		}
	},
	"508" : {
		"item_id" : 508,
		"type" : "MAG-7",
		"skinName" : "Memento",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.92,
					"analyst" : 0.95,
					"opskins" : 0.81
				},
				3 : {
					"market" : 0.55,
					"analyst" : 0.54,
					"opskins" : 0.48
				},
				2 : {
					"market" : 0.66,
					"analyst" : 0.67,
					"opskins" : 0.87
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.77,
					"analyst" : 4.42,
					"opskins" : 4.15
				},
				3 : {
					"market" : 1,
					"analyst" : 1,
					"opskins" : 0.79
				},
				2 : {
					"market" : 0.96,
					"analyst" : 0.99,
					"opskins" : 1.52
				}
			},
			"souvenir" : {}
		}
	},
	"509" : {
		"item_id" : 509,
		"type" : "FAMAS",
		"skinName" : "Doomkitty",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.53,
					"analyst" : 0.53,
					"opskins" : 0.89
				},
				2 : {
					"market" : 0.54,
					"analyst" : 0.52,
					"opskins" : 0.48
				}
			},
			"stattrak" : {
				3 : {
					"market" : 1,
					"analyst" : 1.07,
					"opskins" : 0.93
				},
				2 : {
					"market" : 0.94,
					"analyst" : 1.02,
					"opskins" : 0.89
				}
			},
			"souvenir" : {}
		}
	},
	"510" : {
		"item_id" : 510,
		"type" : "Galil AR",
		"skinName" : "Orange DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 11.1,
					"analyst" : 12.52,
					"opskins" : 12.73
				},
				3 : {
					"market" : 2.21,
					"analyst" : 2.39,
					"opskins" : 2.2
				},
				2 : {
					"market" : 2.03,
					"analyst" : 2.02,
					"opskins" : 1.92
				},
				1 : {
					"market" : 2.27,
					"analyst" : 2.1,
					"opskins" : 6.29
				},
				0 : {
					"market" : 2.38,
					"analyst" : 2.13,
					"opskins" : 2.34
				}
			},
			"stattrak" : {
				4 : {
					"market" : 230,
					"analyst" : 147.76,
					"opskins" : 114.49
				},
				3 : {
					"market" : 6.99,
					"analyst" : 7.91,
					"opskins" : 6.79
				},
				2 : {
					"market" : 4.09,
					"analyst" : 4.3,
					"opskins" : 3.94
				},
				1 : {
					"market" : 4.5,
					"analyst" : 4.62,
					"opskins" : 5
				},
				0 : {
					"market" : 4.94,
					"analyst" : 4.23,
					"opskins" : 4.2
				}
			},
			"souvenir" : {}
		}
	},
	"511" : {
		"item_id" : 511,
		"type" : "Sawed-Off",
		"skinName" : "Orange DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 12.73,
					"analyst" : 11.43,
					"opskins" : 11.5
				},
				3 : {
					"market" : 2.92,
					"analyst" : 2.68,
					"opskins" : 2.7
				},
				2 : {
					"market" : 1.91,
					"analyst" : 2.04,
					"opskins" : 1.77
				},
				1 : {
					"market" : 3.54,
					"analyst" : 3.88,
					"opskins" : 2.95
				},
				0 : {
					"market" : 2.13,
					"analyst" : 1.99,
					"opskins" : 3
				}
			},
			"stattrak" : {
				4 : {
					"market" : 91.16,
					"analyst" : 68.79,
					"opskins" : 89
				},
				3 : {
					"market" : 5.82,
					"analyst" : 5.81,
					"opskins" : 5.95
				},
				2 : {
					"market" : 4.65,
					"analyst" : 4.36,
					"opskins" : 4.46
				},
				1 : {
					"market" : 4.5,
					"analyst" : 4.38,
					"opskins" : 4.19
				},
				0 : {
					"market" : 4.87,
					"analyst" : 4.32,
					"opskins" : 3.7
				}
			},
			"souvenir" : {}
		}
	},
	"512" : {
		"item_id" : 512,
		"type" : "P250",
		"skinName" : "Splash",
		"prices" : {
			"default" : {
				4 : {
					"market" : 9.75,
					"analyst" : 10.03,
					"opskins" : 9.19
				},
				3 : {
					"market" : 2.35,
					"analyst" : 2.86,
					"opskins" : 2.47
				},
				2 : {
					"market" : 3.96,
					"analyst" : 3.11,
					"opskins" : 5.09
				}
			},
			"stattrak" : {
				4 : {
					"market" : 36,
					"analyst" : 30.18,
					"opskins" : 32.79
				},
				3 : {
					"market" : 9.31,
					"analyst" : 8.85,
					"opskins" : 7.7
				},
				2 : {
					"market" : 11.68,
					"analyst" : 11.09,
					"opskins" : 9.99
				}
			},
			"souvenir" : {}
		}
	},
	"513" : {
		"item_id" : 513,
		"type" : "AWP",
		"skinName" : "BOOM",
		"prices" : {
			"default" : {
				4 : {
					"market" : 64.6,
					"analyst" : 68.54,
					"opskins" : 59
				},
				3 : {
					"market" : 16.37,
					"analyst" : 17.61,
					"opskins" : 16.21
				},
				2 : {
					"market" : 13.95,
					"analyst" : 13.96,
					"opskins" : 12.5
				}
			},
			"stattrak" : {
				4 : {
					"market" : 400,
					"analyst" : 263,
					"opskins" : 305.99
				},
				3 : {
					"market" : 54.57,
					"analyst" : 62.61,
					"opskins" : 54
				},
				2 : {
					"market" : 40.1,
					"analyst" : 41.75,
					"opskins" : 37.38
				}
			},
			"souvenir" : {}
		}
	},
	"514" : {
		"item_id" : 514,
		"type" : "★ Karambit",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 400,
					"analyst" : 362,
					"opskins" : 312
				},
				3 : {
					"market" : 216.49,
					"analyst" : 204.59,
					"opskins" : 170.26
				},
				2 : {
					"market" : 164.23,
					"analyst" : 177.51,
					"opskins" : 142.5
				},
				1 : {
					"market" : 169.9,
					"analyst" : 164.49,
					"opskins" : 141.46
				},
				0 : {
					"market" : 172.5,
					"analyst" : 178.68,
					"opskins" : 140
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 868,
					"opskins" : 560
				},
				3 : {
					"market" : 370.82,
					"analyst" : 369.75,
					"opskins" : 282
				},
				2 : {
					"market" : 287.97,
					"analyst" : 320.39,
					"opskins" : 289
				},
				1 : {
					"market" : 345.84,
					"analyst" : 350.72,
					"opskins" : 280.17
				},
				0 : {
					"market" : 373.36,
					"analyst" : -1,
					"opskins" : 279.99
				}
			},
			"souvenir" : {}
		}
	},
	"515" : {
		"item_id" : 515,
		"type" : "★ Flip Knife",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 137.82,
					"analyst" : 94.24,
					"opskins" : 80.96
				},
				3 : {
					"market" : 72.99,
					"analyst" : 71.44,
					"opskins" : 60.23
				},
				2 : {
					"market" : 54.82,
					"analyst" : 60.36,
					"opskins" : 53.5
				},
				1 : {
					"market" : 59.89,
					"analyst" : 57.63,
					"opskins" : 50.69
				},
				0 : {
					"market" : 56.04,
					"analyst" : 58.8,
					"opskins" : 50.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 381.4,
					"analyst" : -1,
					"opskins" : 249.95
				},
				3 : {
					"market" : 103.05,
					"analyst" : 110.42,
					"opskins" : 117
				},
				2 : {
					"market" : 96.91,
					"analyst" : 92.61,
					"opskins" : 79.99
				},
				1 : {
					"market" : 92,
					"analyst" : 88.99,
					"opskins" : 77.06
				},
				0 : {
					"market" : 95,
					"analyst" : 93.5,
					"opskins" : 76.99
				}
			},
			"souvenir" : {}
		}
	},
	"516" : {
		"item_id" : 516,
		"type" : "★ M9 Bayonet",
		"skinName" : "Boreal Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 293.45,
					"analyst" : 287.31,
					"opskins" : 279
				},
				3 : {
					"market" : 81.62,
					"analyst" : 82.57,
					"opskins" : 72.72
				},
				2 : {
					"market" : 62.14,
					"analyst" : 64.53,
					"opskins" : 55.45
				},
				1 : {
					"market" : 58.27,
					"analyst" : 60.51,
					"opskins" : 54.5
				},
				0 : {
					"market" : 65.16,
					"analyst" : 58.53,
					"opskins" : 53.17
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 167.38,
					"analyst" : 131.47,
					"opskins" : 103.91
				},
				2 : {
					"market" : 83,
					"analyst" : 82.77,
					"opskins" : 70
				},
				1 : {
					"market" : 102.21,
					"analyst" : 114.73,
					"opskins" : 99.79
				},
				0 : {
					"market" : 113.85,
					"analyst" : 67.45,
					"opskins" : 67.96
				}
			},
			"souvenir" : {}
		}
	},
	"517" : {
		"item_id" : 517,
		"type" : "Galil AR",
		"skinName" : "Blue Titanium",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.23,
					"analyst" : 0.25,
					"opskins" : 0.2
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.94,
					"analyst" : 1.09,
					"opskins" : 0.91
				}
			},
			"souvenir" : {}
		}
	},
	"518" : {
		"item_id" : 518,
		"type" : "Five-SeveN",
		"skinName" : "Nightshade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.39,
					"analyst" : 0.37,
					"opskins" : 0.33
				},
				3 : {
					"market" : 0.36,
					"analyst" : 0.34,
					"opskins" : 0.29
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.34
				},
				1 : {
					"market" : 0.31,
					"analyst" : 0.25,
					"opskins" : 0.51
				},
				0 : {
					"market" : 0.41,
					"analyst" : 0.47,
					"opskins" : 2
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.23,
					"analyst" : 1.48,
					"opskins" : 1.32
				},
				3 : {
					"market" : 0.88,
					"analyst" : 0.92,
					"opskins" : 0.8
				},
				2 : {
					"market" : 0.59,
					"analyst" : 0.63,
					"opskins" : 0.54
				},
				1 : {
					"market" : 0.72,
					"analyst" : 0.73,
					"opskins" : 0.63
				},
				0 : {
					"market" : 0.88,
					"analyst" : 0.62,
					"opskins" : 0.7
				}
			},
			"souvenir" : {}
		}
	},
	"519" : {
		"item_id" : 519,
		"type" : "PP-Bizon",
		"skinName" : "Water Sigil",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.27,
					"analyst" : 0.27,
					"opskins" : 0.24
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.59
				},
				2 : {
					"market" : 0.16,
					"analyst" : 0.17,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.26
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.52,
					"opskins" : 0.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.96,
					"analyst" : 0.96,
					"opskins" : 0.85
				},
				3 : {
					"market" : 0.8,
					"analyst" : 0.72,
					"opskins" : 0.73
				},
				2 : {
					"market" : 0.52,
					"analyst" : 0.55,
					"opskins" : 0.51
				},
				1 : {
					"market" : 0.58,
					"analyst" : 0.67,
					"opskins" : 0.56
				},
				0 : {
					"market" : 0.63,
					"analyst" : 2.33,
					"opskins" : 2.79
				}
			},
			"souvenir" : {}
		}
	},
	"520" : {
		"item_id" : 520,
		"type" : "Nova",
		"skinName" : "Ghost Camo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.25,
					"analyst" : 0.25,
					"opskins" : 0.22
				},
				3 : {
					"market" : 0.19,
					"analyst" : 0.2,
					"opskins" : 0.18
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.2,
					"opskins" : 2
				},
				1 : {
					"market" : 0.6,
					"analyst" : 2.37,
					"opskins" : 0.52
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.97,
					"analyst" : 0.89,
					"opskins" : 0.74
				},
				3 : {
					"market" : 0.78,
					"analyst" : 0.72,
					"opskins" : 0.65
				},
				2 : {
					"market" : 0.63,
					"analyst" : 0.6,
					"opskins" : 0.52
				},
				1 : {
					"market" : 1.5,
					"analyst" : 1.36,
					"opskins" : 1.51
				}
			},
			"souvenir" : {}
		}
	},
	"521" : {
		"item_id" : 521,
		"type" : "G3SG1",
		"skinName" : "Azure Zebra",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.23,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				3 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.69
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.89,
					"analyst" : 0.92,
					"opskins" : 0.73
				},
				3 : {
					"market" : 0.59,
					"analyst" : 0.71,
					"opskins" : 0.6
				},
				2 : {
					"market" : 0.53,
					"analyst" : 0.54,
					"opskins" : 0.5
				}
			},
			"souvenir" : {}
		}
	},
	"522" : {
		"item_id" : 522,
		"type" : "P250",
		"skinName" : "Steel Disruption",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.38,
					"analyst" : 0.27,
					"opskins" : 0.69
				},
				3 : {
					"market" : 0.24,
					"analyst" : 0.26,
					"opskins" : 0.65
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.28,
					"opskins" : 1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.92,
					"analyst" : 1,
					"opskins" : 0.9
				},
				3 : {
					"market" : 0.78,
					"analyst" : 0.84,
					"opskins" : 0.68
				},
				2 : {
					"market" : 0.87,
					"analyst" : 0.88,
					"opskins" : 0.73
				}
			},
			"souvenir" : {}
		}
	},
	"523" : {
		"item_id" : 523,
		"type" : "AK-47",
		"skinName" : "Blue Laminate",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.69,
					"analyst" : 2.6,
					"opskins" : 2.38
				},
				3 : {
					"market" : 2.1,
					"analyst" : 1.98,
					"opskins" : 1.74
				},
				2 : {
					"market" : 1.81,
					"analyst" : 1.87,
					"opskins" : 1.7
				},
				1 : {
					"market" : 3.35,
					"analyst" : 3.5,
					"opskins" : 3.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 11.88,
					"analyst" : 12.67,
					"opskins" : 11.79
				},
				3 : {
					"market" : 9.13,
					"analyst" : 9.46,
					"opskins" : 8.2
				},
				2 : {
					"market" : 8.37,
					"analyst" : 8.66,
					"opskins" : 7.9
				},
				1 : {
					"market" : 10.01,
					"analyst" : 11.01,
					"opskins" : 10.84
				}
			},
			"souvenir" : {}
		}
	},
	"524" : {
		"item_id" : 524,
		"type" : "P90",
		"skinName" : "Blind Spot",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.73,
					"analyst" : 0.78,
					"opskins" : 0.64
				},
				3 : {
					"market" : 0.7,
					"analyst" : 0.69,
					"opskins" : 0.59
				},
				2 : {
					"market" : 0.7,
					"analyst" : 0.64,
					"opskins" : 0.59
				},
				1 : {
					"market" : 0.77,
					"analyst" : 0.82,
					"opskins" : 0.71
				},
				0 : {
					"market" : 0.66,
					"analyst" : 0.81,
					"opskins" : 1.56
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.84,
					"analyst" : 2.84,
					"opskins" : 2.47
				},
				3 : {
					"market" : 2,
					"analyst" : 2.2,
					"opskins" : 1.82
				},
				2 : {
					"market" : 1.8,
					"analyst" : 1.87,
					"opskins" : 1.54
				},
				1 : {
					"market" : 2.11,
					"analyst" : 2.09,
					"opskins" : 2.15
				},
				0 : {
					"market" : 2.25,
					"analyst" : 2.18,
					"opskins" : 2.03
				}
			},
			"souvenir" : {}
		}
	},
	"525" : {
		"item_id" : 525,
		"type" : "AWP",
		"skinName" : "Electric Hive",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.92,
					"analyst" : 11.58,
					"opskins" : 10.17
				},
				3 : {
					"market" : 9.69,
					"analyst" : 10.04,
					"opskins" : 9.02
				},
				2 : {
					"market" : 7.72,
					"analyst" : 7.78,
					"opskins" : 7.14
				},
				1 : {
					"market" : 8.87,
					"analyst" : 9.83,
					"opskins" : 9.52
				}
			},
			"stattrak" : {
				4 : {
					"market" : 44.33,
					"analyst" : 44.53,
					"opskins" : 39.74
				},
				3 : {
					"market" : 31.69,
					"analyst" : 31.86,
					"opskins" : 29.51
				},
				2 : {
					"market" : 21.19,
					"analyst" : 22.96,
					"opskins" : 20.98
				},
				1 : {
					"market" : 26.99,
					"analyst" : 31.34,
					"opskins" : 27.86
				}
			},
			"souvenir" : {}
		}
	},
	"526" : {
		"item_id" : 526,
		"type" : "Desert Eagle",
		"skinName" : "Cobalt Disruption",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5,
					"analyst" : 5.15,
					"opskins" : 4.62
				},
				3 : {
					"market" : 4.56,
					"analyst" : 4.6,
					"opskins" : 4.27
				},
				2 : {
					"market" : 6.17,
					"analyst" : 4.86,
					"opskins" : 5.75
				}
			},
			"stattrak" : {
				4 : {
					"market" : 24.35,
					"analyst" : 25.98,
					"opskins" : 23.3
				},
				3 : {
					"market" : 20.49,
					"analyst" : 19.73,
					"opskins" : 19
				},
				2 : {
					"market" : 16.85,
					"analyst" : 14.71,
					"opskins" : 14.6
				}
			},
			"souvenir" : {}
		}
	},
	"527" : {
		"item_id" : 527,
		"type" : "★ Flip Knife",
		"skinName" : "Forest DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 105.95,
					"analyst" : 113.61,
					"opskins" : 115
				},
				3 : {
					"market" : 42.39,
					"analyst" : 45.58,
					"opskins" : 39.77
				},
				2 : {
					"market" : 38.35,
					"analyst" : 38.15,
					"opskins" : 32.89
				},
				1 : {
					"market" : 37.97,
					"analyst" : 38.01,
					"opskins" : 33.89
				},
				0 : {
					"market" : 38.13,
					"analyst" : 36.26,
					"opskins" : 33.74
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 91.15,
					"analyst" : 65.99,
					"opskins" : 102.06
				},
				2 : {
					"market" : 54.8,
					"analyst" : 51.94,
					"opskins" : 45.99
				},
				1 : {
					"market" : 81.59,
					"analyst" : 67.85,
					"opskins" : 53.97
				},
				0 : {
					"market" : 56.28,
					"analyst" : 54.6,
					"opskins" : 53.28
				}
			},
			"souvenir" : {}
		}
	},
	"528" : {
		"item_id" : 528,
		"type" : "SSG 08",
		"skinName" : "Dark Water",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.28,
					"analyst" : 0.25,
					"opskins" : 0.22
				},
				2 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.15
				}
			},
			"stattrak" : {
				3 : {
					"market" : 1,
					"analyst" : 1.02,
					"opskins" : 0.86
				},
				2 : {
					"market" : 0.5,
					"analyst" : 0.52,
					"opskins" : 0.5
				}
			},
			"souvenir" : {}
		}
	},
	"529" : {
		"item_id" : 529,
		"type" : "MAC-10",
		"skinName" : "Ultraviolet",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.96,
					"analyst" : 1.93,
					"opskins" : 1.86
				},
				3 : {
					"market" : 0.3,
					"analyst" : 0.32,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.12,
					"analyst" : 0.11,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.19
				},
				0 : {
					"market" : 0.14,
					"analyst" : 0.12,
					"opskins" : 0.1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 11,
					"analyst" : 9.3,
					"opskins" : 9.2
				},
				3 : {
					"market" : 1.06,
					"analyst" : 0.88,
					"opskins" : 0.77
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.28,
					"opskins" : 0.25
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.33,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.28,
					"opskins" : 0.34
				}
			},
			"souvenir" : {}
		}
	},
	"530" : {
		"item_id" : 530,
		"type" : "USP-S",
		"skinName" : "Blood Tiger",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.72,
					"analyst" : 0.71,
					"opskins" : 0.69
				},
				3 : {
					"market" : 0.57,
					"analyst" : 0.41,
					"opskins" : 0.53
				},
				2 : {
					"market" : 0.46,
					"analyst" : 0.36,
					"opskins" : 0.68
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.22,
					"analyst" : 3.8,
					"opskins" : 3.64
				},
				3 : {
					"market" : 1.8,
					"analyst" : 1.74,
					"opskins" : 1.71
				},
				2 : {
					"market" : 1.61,
					"analyst" : 1.54,
					"opskins" : 1.46
				}
			},
			"souvenir" : {}
		}
	},
	"531" : {
		"item_id" : 531,
		"type" : "CZ75-Auto",
		"skinName" : "Hexane",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.63,
					"analyst" : 0.6,
					"opskins" : 0.5
				},
				3 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.2
				},
				2 : {
					"market" : 0.14,
					"analyst" : 0.15,
					"opskins" : 0.11
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.29
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.95,
					"analyst" : 3.56,
					"opskins" : 3.11
				},
				3 : {
					"market" : 0.64,
					"analyst" : 0.67,
					"opskins" : 0.55
				},
				2 : {
					"market" : 0.32,
					"analyst" : 0.36,
					"opskins" : 0.33
				},
				1 : {
					"market" : 0.47,
					"analyst" : 0.53,
					"opskins" : 2.6
				}
			},
			"souvenir" : {}
		}
	},
	"532" : {
		"item_id" : 532,
		"type" : "Negev",
		"skinName" : "Bratatat",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.85,
					"analyst" : 1.02,
					"opskins" : 1.2
				},
				3 : {
					"market" : 0.23,
					"analyst" : 0.26,
					"opskins" : 0.21
				},
				2 : {
					"market" : 0.18,
					"analyst" : 0.17,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.15,
					"analyst" : 0.15,
					"opskins" : 0.13
				},
				0 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.28
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.6,
					"analyst" : 4.24,
					"opskins" : 4.74
				},
				3 : {
					"market" : 0.63,
					"analyst" : 0.75,
					"opskins" : 0.64
				},
				2 : {
					"market" : 0.3,
					"analyst" : 0.34,
					"opskins" : 0.3
				},
				1 : {
					"market" : 0.27,
					"analyst" : 0.29,
					"opskins" : 0.28
				},
				0 : {
					"market" : 0.26,
					"analyst" : 0.3,
					"opskins" : 0.27
				}
			},
			"souvenir" : {}
		}
	},
	"533" : {
		"item_id" : 533,
		"type" : "XM1014",
		"skinName" : "Red Python",
		"prices" : {
			"default" : {
				3 : {
					"market" : 0.19,
					"analyst" : 0.21,
					"opskins" : 0.18
				},
				2 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.1
				},
				1 : {
					"market" : 0.19,
					"analyst" : 0.17,
					"opskins" : 0.39
				},
				0 : {
					"market" : 0.28,
					"analyst" : 0.22,
					"opskins" : 0.22
				}
			},
			"stattrak" : {
				3 : {
					"market" : 0.72,
					"analyst" : 0.78,
					"opskins" : 0.67
				},
				2 : {
					"market" : 0.24,
					"analyst" : 0.3,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.42,
					"analyst" : 0.37,
					"opskins" : 0.29
				},
				0 : {
					"market" : 0.72,
					"analyst" : 0.7,
					"opskins" : 0.5
				}
			},
			"souvenir" : {}
		}
	},
	"534" : {
		"item_id" : 534,
		"type" : "PP-Bizon",
		"skinName" : "Blue Streak",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.78,
					"analyst" : 4.1,
					"opskins" : 4.07
				},
				3 : {
					"market" : 0.72,
					"analyst" : 0.71,
					"opskins" : 1.26
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.32,
					"opskins" : 0.26
				},
				1 : {
					"market" : 0.42,
					"analyst" : 0.41,
					"opskins" : 0.35
				},
				0 : {
					"market" : 0.66,
					"analyst" : 0.41,
					"opskins" : 0.62
				}
			},
			"stattrak" : {
				4 : {
					"market" : 38.43,
					"analyst" : 35.59,
					"opskins" : 32.89
				},
				3 : {
					"market" : 1.97,
					"analyst" : 1.85,
					"opskins" : 1.68
				},
				2 : {
					"market" : 1.06,
					"analyst" : 0.81,
					"opskins" : 0.7
				},
				1 : {
					"market" : 1.32,
					"analyst" : 1.03,
					"opskins" : 0.89
				},
				0 : {
					"market" : 1.06,
					"analyst" : 0.98,
					"opskins" : 0.69
				}
			},
			"souvenir" : {}
		}
	},
	"535" : {
		"item_id" : 535,
		"type" : "P90",
		"skinName" : "Virus",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.7,
					"analyst" : 2.53,
					"opskins" : 2.77
				},
				3 : {
					"market" : 0.46,
					"analyst" : 0.53,
					"opskins" : 0.45
				},
				2 : {
					"market" : 0.28,
					"analyst" : 0.3,
					"opskins" : 0.27
				},
				1 : {
					"market" : 0.35,
					"analyst" : 0.41,
					"opskins" : 0.36
				},
				0 : {
					"market" : 0.43,
					"analyst" : 0.43,
					"opskins" : 0.93
				}
			},
			"stattrak" : {
				4 : {
					"market" : 15.7,
					"analyst" : 29.43,
					"opskins" : 31
				},
				3 : {
					"market" : 1.52,
					"analyst" : 1.71,
					"opskins" : 1.53
				},
				2 : {
					"market" : 0.8,
					"analyst" : 0.87,
					"opskins" : 0.7
				},
				1 : {
					"market" : 1.16,
					"analyst" : 1.27,
					"opskins" : 1.06
				},
				0 : {
					"market" : 0.87,
					"analyst" : 0.85,
					"opskins" : 0.69
				}
			},
			"souvenir" : {}
		}
	},
	"536" : {
		"item_id" : 536,
		"type" : "MP7",
		"skinName" : "Ocean Foam",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.85,
					"analyst" : 0.86,
					"opskins" : 0.73
				},
				3 : {
					"market" : 1.81,
					"analyst" : 1.42,
					"opskins" : 1.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.23,
					"analyst" : 3.22,
					"opskins" : 2.97
				},
				3 : {
					"market" : 10.13,
					"analyst" : 4.44,
					"opskins" : 3.93
				}
			},
			"souvenir" : {}
		}
	},
	"537" : {
		"item_id" : 537,
		"type" : "Glock-18",
		"skinName" : "Steel Disruption",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.73,
					"analyst" : 0.86,
					"opskins" : 0.94
				},
				3 : {
					"market" : 0.76,
					"analyst" : 0.72,
					"opskins" : 0.78
				},
				2 : {
					"market" : 0.64,
					"analyst" : 0.77,
					"opskins" : 0.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.42,
					"analyst" : 3.23,
					"opskins" : 2.97
				},
				3 : {
					"market" : 2.13,
					"analyst" : 2.26,
					"opskins" : 1.95
				},
				2 : {
					"market" : 2.42,
					"analyst" : 2.46,
					"opskins" : 2.22
				}
			},
			"souvenir" : {}
		}
	},
	"538" : {
		"item_id" : 538,
		"type" : "Desert Eagle",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : 24.81,
					"analyst" : 23.22,
					"opskins" : 22.7
				},
				3 : {
					"market" : 3.96,
					"analyst" : 3.76,
					"opskins" : 3.45
				},
				2 : {
					"market" : 0.92,
					"analyst" : 0.82,
					"opskins" : 0.89
				},
				1 : {
					"market" : 1.43,
					"analyst" : 1.17,
					"opskins" : 1.17
				},
				0 : {
					"market" : 0.94,
					"analyst" : 0.72,
					"opskins" : 1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 303.98,
					"analyst" : 324.55,
					"opskins" : 260
				},
				3 : {
					"market" : 17.37,
					"analyst" : 18.96,
					"opskins" : 18
				},
				2 : {
					"market" : 3.95,
					"analyst" : 3.95,
					"opskins" : 3.4
				},
				1 : {
					"market" : 5.3,
					"analyst" : 4.6,
					"opskins" : 5.14
				},
				0 : {
					"market" : 3.22,
					"analyst" : 3.08,
					"opskins" : 2.95
				}
			},
			"souvenir" : {}
		}
	},
	"539" : {
		"item_id" : 539,
		"type" : "Nova",
		"skinName" : "Bloomstick",
		"prices" : {
			"default" : {
				4 : {
					"market" : 12.72,
					"analyst" : 13.01,
					"opskins" : 12
				},
				3 : {
					"market" : 2.07,
					"analyst" : 1.93,
					"opskins" : 1.64
				},
				2 : {
					"market" : 1.39,
					"analyst" : 1.24,
					"opskins" : 1.07
				},
				1 : {
					"market" : 2.72,
					"analyst" : 1.79,
					"opskins" : 1.43
				},
				0 : {
					"market" : 1.79,
					"analyst" : 1.59,
					"opskins" : 1.32
				}
			},
			"stattrak" : {
				4 : {
					"market" : 49.95,
					"analyst" : 49.32,
					"opskins" : 44.95
				},
				3 : {
					"market" : 10.96,
					"analyst" : 9.15,
					"opskins" : 9
				},
				2 : {
					"market" : 4.71,
					"analyst" : 4.36,
					"opskins" : 3.78
				},
				1 : {
					"market" : 4.86,
					"analyst" : 5.18,
					"opskins" : 6.42
				},
				0 : {
					"market" : 5.52,
					"analyst" : 4.54,
					"opskins" : 3.72
				}
			},
			"souvenir" : {}
		}
	},
	"540" : {
		"item_id" : 540,
		"type" : "AWP",
		"skinName" : "Corticera",
		"prices" : {
			"default" : {
				4 : {
					"market" : 8.53,
					"analyst" : 9.12,
					"opskins" : 8.68
				},
				3 : {
					"market" : 4.45,
					"analyst" : 4.69,
					"opskins" : 4.17
				},
				2 : {
					"market" : 4.11,
					"analyst" : 4.43,
					"opskins" : 4.01
				}
			},
			"stattrak" : {
				4 : {
					"market" : 36.8,
					"analyst" : 33.93,
					"opskins" : 31.63
				},
				3 : {
					"market" : 16.18,
					"analyst" : 17.11,
					"opskins" : 15.54
				},
				2 : {
					"market" : 13.77,
					"analyst" : 14.89,
					"opskins" : 13.25
				}
			},
			"souvenir" : {}
		}
	},
	"541" : {
		"item_id" : 541,
		"type" : "M4A4",
		"skinName" : "Bullet Rain",
		"prices" : {
			"default" : {
				4 : {
					"market" : 11.2,
					"analyst" : 12.47,
					"opskins" : 11.27
				},
				3 : {
					"market" : 6,
					"analyst" : 6.52,
					"opskins" : 5.88
				},
				2 : {
					"market" : 4.14,
					"analyst" : 4.5,
					"opskins" : 4.14
				},
				1 : {
					"market" : 4.33,
					"analyst" : 4.98,
					"opskins" : 5.21
				},
				0 : {
					"market" : 6.7,
					"analyst" : 6.76,
					"opskins" : 6.85
				}
			},
			"stattrak" : {
				4 : {
					"market" : 65,
					"analyst" : 65.48,
					"opskins" : 56.24
				},
				3 : {
					"market" : 39.25,
					"analyst" : 31.95,
					"opskins" : 27
				},
				2 : {
					"market" : 14.62,
					"analyst" : 15.11,
					"opskins" : 15.67
				},
				1 : {
					"market" : 34.82,
					"analyst" : 17.72,
					"opskins" : 23.34
				},
				0 : {
					"market" : 48.33,
					"analyst" : 31.48,
					"opskins" : 45
				}
			},
			"souvenir" : {}
		}
	},
	"542" : {
		"item_id" : 542,
		"type" : "AK-47",
		"skinName" : "Jaguar",
		"prices" : {
			"default" : {
				4 : {
					"market" : 29.24,
					"analyst" : 28.26,
					"opskins" : 24
				},
				3 : {
					"market" : 11.8,
					"analyst" : 12.16,
					"opskins" : 10.75
				},
				2 : {
					"market" : 8.98,
					"analyst" : 8.86,
					"opskins" : 7.97
				},
				1 : {
					"market" : 7.68,
					"analyst" : 8.3,
					"opskins" : 7.54
				},
				0 : {
					"market" : 6.7,
					"analyst" : 7.03,
					"opskins" : 6.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : 237.17,
					"analyst" : 221.29,
					"opskins" : 175.99
				},
				3 : {
					"market" : 63.05,
					"analyst" : 57.68,
					"opskins" : 57.6
				},
				2 : {
					"market" : 38.35,
					"analyst" : 38.27,
					"opskins" : 35.12
				},
				1 : {
					"market" : 30.2,
					"analyst" : 31.68,
					"opskins" : 27.49
				},
				0 : {
					"market" : 27.85,
					"analyst" : 27.51,
					"opskins" : 26
				}
			},
			"souvenir" : {}
		}
	},
	"543" : {
		"item_id" : 543,
		"type" : "★ Karambit",
		"skinName" : "Boreal Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 381.4,
					"analyst" : 296,
					"opskins" : 280
				},
				3 : {
					"market" : 109.64,
					"analyst" : 119.04,
					"opskins" : 97.8
				},
				2 : {
					"market" : 90.06,
					"analyst" : 93.25,
					"opskins" : 79.45
				},
				1 : {
					"market" : 89.59,
					"analyst" : 98.84,
					"opskins" : 82.26
				},
				0 : {
					"market" : 89.9,
					"analyst" : 84.52,
					"opskins" : 76.88
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 800,
					"opskins" : -1
				},
				3 : {
					"market" : 164.97,
					"analyst" : 162.85,
					"opskins" : 139.99
				},
				2 : {
					"market" : 110,
					"analyst" : 121.07,
					"opskins" : 99.87
				},
				1 : {
					"market" : 304.58,
					"analyst" : 161.65,
					"opskins" : 144.99
				},
				0 : {
					"market" : 140,
					"analyst" : 184.16,
					"opskins" : 159.99
				}
			},
			"souvenir" : {}
		}
	},
	"545" : {
		"item_id" : 545,
		"type" : "PP-Bizon",
		"skinName" : "Photic Zone",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.38,
					"analyst" : 0.38,
					"opskins" : 0.33
				},
				3 : {
					"market" : 0.11,
					"analyst" : 0.1,
					"opskins" : 0.08
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.99,
					"analyst" : 2.09,
					"opskins" : 1.69
				},
				3 : {
					"market" : 0.52,
					"analyst" : 0.55,
					"opskins" : 0.45
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.25,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.23,
					"analyst" : 0.23,
					"opskins" : 0.22
				}
			},
			"souvenir" : {}
		}
	},
	"546" : {
		"item_id" : 546,
		"type" : "USP-S",
		"skinName" : "Lead Conduit",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.07,
					"analyst" : 1,
					"opskins" : 0.85
				},
				3 : {
					"market" : 0.28,
					"analyst" : 0.28,
					"opskins" : 0.24
				},
				2 : {
					"market" : 0.16,
					"analyst" : 0.16,
					"opskins" : 0.15
				},
				1 : {
					"market" : 0.13,
					"analyst" : 0.14,
					"opskins" : 0.13
				},
				0 : {
					"market" : 0.13,
					"analyst" : 0.13,
					"opskins" : 0.13
				}
			},
			"stattrak" : {
				4 : {
					"market" : 5.55,
					"analyst" : 5.87,
					"opskins" : 5.56
				},
				3 : {
					"market" : 1.67,
					"analyst" : 1.78,
					"opskins" : 1.45
				},
				2 : {
					"market" : 1.22,
					"analyst" : 1.25,
					"opskins" : 1.03
				},
				1 : {
					"market" : 1.06,
					"analyst" : 1.12,
					"opskins" : 0.98
				},
				0 : {
					"market" : 1.11,
					"analyst" : 1.09,
					"opskins" : 0.99
				}
			},
			"souvenir" : {}
		}
	},
	"547" : {
		"item_id" : 547,
		"type" : "Dual Berettas",
		"skinName" : "Cartel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.19,
					"analyst" : 0.19,
					"opskins" : 0.24
				},
				3 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 1.39,
					"analyst" : 1.54,
					"opskins" : 1.32
				},
				3 : {
					"market" : 0.35,
					"analyst" : 0.35,
					"opskins" : 0.29
				},
				2 : {
					"market" : 0.2,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				1 : {
					"market" : 0.21,
					"analyst" : 0.21,
					"opskins" : 0.17
				},
				0 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.15
				}
			},
			"souvenir" : {}
		}
	},
	"548" : {
		"item_id" : 548,
		"type" : "Tec-9",
		"skinName" : "Jambiya",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.27,
					"analyst" : 0.31,
					"opskins" : 0.25
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 2.92,
					"analyst" : 2.95,
					"opskins" : 2.48
				},
				3 : {
					"market" : 0.59,
					"analyst" : 0.66,
					"opskins" : 0.53
				},
				2 : {
					"market" : 0.35,
					"analyst" : 0.36,
					"opskins" : 0.3
				},
				1 : {
					"market" : 0.3,
					"analyst" : 0.31,
					"opskins" : 0.24
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.31,
					"opskins" : 0.25
				}
			},
			"souvenir" : {}
		}
	},
	"549" : {
		"item_id" : 549,
		"type" : "SSG 08",
		"skinName" : "Necropos",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.84,
					"analyst" : 0.76,
					"opskins" : 0.62
				},
				3 : {
					"market" : 0.13,
					"analyst" : 0.14,
					"opskins" : 0.11
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.08,
					"opskins" : 0.07
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				0 : {
					"market" : 0.09,
					"analyst" : 0.07,
					"opskins" : 0.06
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.98,
					"analyst" : 5.07,
					"opskins" : 5.05
				},
				3 : {
					"market" : 0.94,
					"analyst" : 0.99,
					"opskins" : 0.77
				},
				2 : {
					"market" : 0.39,
					"analyst" : 0.45,
					"opskins" : 0.35
				},
				1 : {
					"market" : 0.34,
					"analyst" : 0.36,
					"opskins" : 0.29
				},
				0 : {
					"market" : 0.3,
					"analyst" : 0.32,
					"opskins" : 0.27
				}
			},
			"souvenir" : {}
		}
	},
	"550" : {
		"item_id" : 550,
		"type" : "MAC-10",
		"skinName" : "Lapis Gator",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.13,
					"analyst" : 0.13,
					"opskins" : 0.1
				},
				3 : {
					"market" : 0.09,
					"analyst" : 0.08,
					"opskins" : 0.04
				},
				2 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.05
				},
				1 : {
					"market" : 0.08,
					"analyst" : 0.07,
					"opskins" : 0.07
				},
				0 : {
					"market" : 0.17,
					"analyst" : 0.1,
					"opskins" : 0.1
				}
			},
			"stattrak" : {
				4 : {
					"market" : 0.65,
					"analyst" : 0.75,
					"opskins" : 0.61
				},
				3 : {
					"market" : 0.35,
					"analyst" : 0.4,
					"opskins" : 0.3
				},
				2 : {
					"market" : 0.21,
					"analyst" : 0.22,
					"opskins" : 0.19
				},
				1 : {
					"market" : 0.24,
					"analyst" : 0.26,
					"opskins" : 0.21
				},
				0 : {
					"market" : 0.24,
					"analyst" : 0.21,
					"opskins" : 0.31
				}
			},
			"souvenir" : {}
		}
	},
	"551" : {
		"item_id" : 551,
		"type" : "Glock-18",
		"skinName" : "Royal Legion",
		"prices" : {
			"default" : {
				4 : {
					"market" : 1.9,
					"analyst" : 1.95,
					"opskins" : 1.66
				},
				3 : {
					"market" : 0.6,
					"analyst" : 0.71,
					"opskins" : 0.63
				},
				2 : {
					"market" : 0.27,
					"analyst" : 0.33,
					"opskins" : 0.28
				},
				1 : {
					"market" : 0.28,
					"analyst" : 0.32,
					"opskins" : 0.26
				},
				0 : {
					"market" : 0.27,
					"analyst" : 0.31,
					"opskins" : 0.27
				}
			},
			"stattrak" : {
				4 : {
					"market" : 12.58,
					"analyst" : 11.67,
					"opskins" : 10.39
				},
				3 : {
					"market" : 3.88,
					"analyst" : 3.8,
					"opskins" : 3.34
				},
				2 : {
					"market" : 2.19,
					"analyst" : 2.24,
					"opskins" : 1.86
				},
				1 : {
					"market" : 1.97,
					"analyst" : 1.96,
					"opskins" : 1.65
				},
				0 : {
					"market" : 1.41,
					"analyst" : 1.79,
					"opskins" : 1.56
				}
			},
			"souvenir" : {}
		}
	},
	"552" : {
		"item_id" : 552,
		"type" : "MP7",
		"skinName" : "Impire",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.73,
					"analyst" : 0.73,
					"opskins" : 0.59
				},
				3 : {
					"market" : 0.4,
					"analyst" : 0.42,
					"opskins" : 0.34
				},
				2 : {
					"market" : 0.29,
					"analyst" : 0.29,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.78,
					"analyst" : 0.69,
					"opskins" : 0.54
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.22,
					"analyst" : 3.74,
					"opskins" : 3.18
				},
				3 : {
					"market" : 2.15,
					"analyst" : 2.07,
					"opskins" : 1.71
				},
				2 : {
					"market" : 1.18,
					"analyst" : 1.17,
					"opskins" : 1.02
				},
				1 : {
					"market" : 1.77,
					"analyst" : 1.85,
					"opskins" : 1.64
				}
			},
			"souvenir" : {}
		}
	},
	"553" : {
		"item_id" : 553,
		"type" : "Five-SeveN",
		"skinName" : "Triumvirate",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.73,
					"analyst" : 0.72,
					"opskins" : 0.58
				},
				3 : {
					"market" : 0.37,
					"analyst" : 0.4,
					"opskins" : 0.33
				},
				2 : {
					"market" : 0.23,
					"analyst" : 0.28,
					"opskins" : 0.22
				},
				1 : {
					"market" : 0.3,
					"analyst" : 0.31,
					"opskins" : 0.27
				},
				0 : {
					"market" : 0.29,
					"analyst" : 0.28,
					"opskins" : 0.25
				}
			},
			"stattrak" : {
				4 : {
					"market" : 4.05,
					"analyst" : 4.58,
					"opskins" : 4.19
				},
				3 : {
					"market" : 2.31,
					"analyst" : 2.48,
					"opskins" : 2.1
				},
				2 : {
					"market" : 1.1,
					"analyst" : 1.16,
					"opskins" : 0.95
				},
				1 : {
					"market" : 2.31,
					"analyst" : 1.52,
					"opskins" : 1.55
				},
				0 : {
					"market" : 0.97,
					"analyst" : 1.09,
					"opskins" : 0.92
				}
			},
			"souvenir" : {}
		}
	},
	"554" : {
		"item_id" : 554,
		"type" : "FAMAS",
		"skinName" : "Valence",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.24,
					"analyst" : 2.53,
					"opskins" : 2.11
				},
				3 : {
					"market" : 0.85,
					"analyst" : 0.89,
					"opskins" : 0.7
				},
				2 : {
					"market" : 0.38,
					"analyst" : 0.45,
					"opskins" : 0.38
				},
				1 : {
					"market" : 0.78,
					"analyst" : 0.88,
					"opskins" : 0.7
				},
				0 : {
					"market" : 0.35,
					"analyst" : 0.39,
					"opskins" : 0.35
				}
			},
			"stattrak" : {
				4 : {
					"market" : 13.07,
					"analyst" : 12.23,
					"opskins" : 11.28
				},
				3 : {
					"market" : 3.85,
					"analyst" : 3.84,
					"opskins" : 3.2
				},
				2 : {
					"market" : 1.87,
					"analyst" : 1.9,
					"opskins" : 1.62
				},
				1 : {
					"market" : 3.19,
					"analyst" : 2.9,
					"opskins" : 2.39
				},
				0 : {
					"market" : 1.46,
					"analyst" : 1.57,
					"opskins" : 1.4
				}
			},
			"souvenir" : {}
		}
	},
	"555" : {
		"item_id" : 555,
		"type" : "MAG-7",
		"skinName" : "Praetorian",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.71,
					"analyst" : 0.71,
					"opskins" : 0.61
				},
				3 : {
					"market" : 0.4,
					"analyst" : 0.39,
					"opskins" : 0.32
				},
				2 : {
					"market" : 0.26,
					"analyst" : 0.27,
					"opskins" : 0.24
				},
				1 : {
					"market" : 0.29,
					"analyst" : 0.3,
					"opskins" : 0.27
				}
			},
			"stattrak" : {
				4 : {
					"market" : 3.39,
					"analyst" : 3.22,
					"opskins" : 2.78
				},
				3 : {
					"market" : 1.88,
					"analyst" : 1.78,
					"opskins" : 1.44
				},
				2 : {
					"market" : 1.22,
					"analyst" : 1.09,
					"opskins" : 0.96
				},
				1 : {
					"market" : 1.16,
					"analyst" : 1.13,
					"opskins" : 1.46
				}
			},
			"souvenir" : {}
		}
	},
	"556" : {
		"item_id" : 556,
		"type" : "Desert Eagle",
		"skinName" : "Kumicho Dragon",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.3,
					"analyst" : 8.21,
					"opskins" : 7.27
				},
				3 : {
					"market" : 4.03,
					"analyst" : 4.29,
					"opskins" : 3.84
				},
				2 : {
					"market" : 2.72,
					"analyst" : 2.83,
					"opskins" : 2.34
				},
				1 : {
					"market" : 3.97,
					"analyst" : 3.94,
					"opskins" : 3.47
				},
				0 : {
					"market" : 2.34,
					"analyst" : 2.41,
					"opskins" : 2.09
				}
			},
			"stattrak" : {
				4 : {
					"market" : 42.64,
					"analyst" : 40.12,
					"opskins" : 34.99
				},
				3 : {
					"market" : 21.2,
					"analyst" : 21.64,
					"opskins" : 19.59
				},
				2 : {
					"market" : 12.93,
					"analyst" : 13.14,
					"opskins" : 11.55
				},
				1 : {
					"market" : 22.72,
					"analyst" : 19.92,
					"opskins" : 15.71
				},
				0 : {
					"market" : 9.8,
					"analyst" : 11.39,
					"opskins" : 10.51
				}
			},
			"souvenir" : {}
		}
	},
	"557" : {
		"item_id" : 557,
		"type" : "Nova",
		"skinName" : "Hyper Beast",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.72,
					"analyst" : 4.09,
					"opskins" : 3.4
				},
				3 : {
					"market" : 2.13,
					"analyst" : 2.38,
					"opskins" : 2.02
				},
				2 : {
					"market" : 1.61,
					"analyst" : 1.8,
					"opskins" : 1.59
				},
				1 : {
					"market" : 2.3,
					"analyst" : 1.81,
					"opskins" : 1.62
				},
				0 : {
					"market" : 1.55,
					"analyst" : 1.64,
					"opskins" : 1.6
				}
			},
			"stattrak" : {
				4 : {
					"market" : 14.49,
					"analyst" : 17.55,
					"opskins" : 16
				},
				3 : {
					"market" : 13.47,
					"analyst" : 9.78,
					"opskins" : 8.32
				},
				2 : {
					"market" : 4.96,
					"analyst" : 5.5,
					"opskins" : 4.9
				},
				1 : {
					"market" : 7.42,
					"analyst" : 7.23,
					"opskins" : 6.02
				},
				0 : {
					"market" : 5.29,
					"analyst" : 5.08,
					"opskins" : 4.42
				}
			},
			"souvenir" : {}
		}
	},
	"558" : {
		"item_id" : 558,
		"type" : "AWP",
		"skinName" : "Elite Build",
		"prices" : {
			"default" : {
				4 : {
					"market" : 9.37,
					"analyst" : 9.64,
					"opskins" : 8.47
				},
				3 : {
					"market" : 4.77,
					"analyst" : 5.21,
					"opskins" : 4.6
				},
				2 : {
					"market" : 2.69,
					"analyst" : 3.07,
					"opskins" : 2.55
				},
				1 : {
					"market" : 2.56,
					"analyst" : 2.75,
					"opskins" : 2.34
				},
				0 : {
					"market" : 2.3,
					"analyst" : 2.35,
					"opskins" : 2.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 42.74,
					"analyst" : 47.06,
					"opskins" : 41.05
				},
				3 : {
					"market" : 18.53,
					"analyst" : 20.98,
					"opskins" : 19.02
				},
				2 : {
					"market" : 14.3,
					"analyst" : 12.56,
					"opskins" : 11.19
				},
				1 : {
					"market" : 11.84,
					"analyst" : 11.24,
					"opskins" : 10.19
				},
				0 : {
					"market" : 9.97,
					"analyst" : 10.58,
					"opskins" : 9.77
				}
			},
			"souvenir" : {}
		}
	},
	"559" : {
		"item_id" : 559,
		"type" : "AK-47",
		"skinName" : "Fuel Injector",
		"prices" : {
			"default" : {
				4 : {
					"market" : 55,
					"analyst" : 59.74,
					"opskins" : 52.59
				},
				3 : {
					"market" : 31.62,
					"analyst" : 30.68,
					"opskins" : 27
				},
				2 : {
					"market" : 23.74,
					"analyst" : 23.02,
					"opskins" : 21.76
				},
				1 : {
					"market" : 19.34,
					"analyst" : 19.4,
					"opskins" : 17.91
				},
				0 : {
					"market" : 17.29,
					"analyst" : 16.94,
					"opskins" : 15.81
				}
			},
			"stattrak" : {
				4 : {
					"market" : 308,
					"analyst" : 271.16,
					"opskins" : 233
				},
				3 : {
					"market" : 121.83,
					"analyst" : 116.07,
					"opskins" : 99.79
				},
				2 : {
					"market" : 78.8,
					"analyst" : 76.24,
					"opskins" : 62.9
				},
				1 : {
					"market" : 63.59,
					"analyst" : 59.53,
					"opskins" : 51
				},
				0 : {
					"market" : 50.5,
					"analyst" : 50.17,
					"opskins" : 47
				}
			},
			"souvenir" : {}
		}
	},
	"560" : {
		"item_id" : 560,
		"type" : "M4A4",
		"skinName" : "The Battlestar",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.68,
					"analyst" : 7.38,
					"opskins" : 6.58
				},
				3 : {
					"market" : 4.25,
					"analyst" : 4.95,
					"opskins" : 4.44
				},
				2 : {
					"market" : 2.92,
					"analyst" : 2.96,
					"opskins" : 2.53
				},
				1 : {
					"market" : 3.45,
					"analyst" : 3.77,
					"opskins" : 3.68
				},
				0 : {
					"market" : 2.37,
					"analyst" : 2.71,
					"opskins" : 2.51
				}
			},
			"stattrak" : {
				4 : {
					"market" : 43.83,
					"analyst" : 48.69,
					"opskins" : 40.99
				},
				3 : {
					"market" : 22.89,
					"analyst" : 24.4,
					"opskins" : 22.22
				},
				2 : {
					"market" : 13.43,
					"analyst" : 13.79,
					"opskins" : 14.2
				},
				1 : {
					"market" : 27.57,
					"analyst" : 23.57,
					"opskins" : 35
				},
				0 : {
					"market" : 13.24,
					"analyst" : 13.15,
					"opskins" : 20.85
				}
			},
			"souvenir" : {}
		}
	},
	"561" : {
		"item_id" : 561,
		"type" : "★ Bowie Knife",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : 298.94,
					"analyst" : 414,
					"opskins" : 414.99
				},
				3 : {
					"market" : 104.89,
					"analyst" : 101.63,
					"opskins" : 88.68
				},
				2 : {
					"market" : 64.4,
					"analyst" : 64.7,
					"opskins" : 54.69
				},
				1 : {
					"market" : 56.26,
					"analyst" : 59.57,
					"opskins" : 52.91
				},
				0 : {
					"market" : 58.8,
					"analyst" : 51.76,
					"opskins" : 48.34
				}
			},
			"stattrak" : {
				3 : {
					"market" : 245,
					"analyst" : 275.46,
					"opskins" : 239.99
				},
				2 : {
					"market" : 101.9,
					"analyst" : 104.14,
					"opskins" : 84.32
				},
				1 : {
					"market" : 136.1,
					"analyst" : 127.22,
					"opskins" : 105
				},
				0 : {
					"market" : 90.06,
					"analyst" : 104.86,
					"opskins" : 127.93
				}
			},
			"souvenir" : {}
		}
	},
	"562" : {
		"item_id" : 562,
		"type" : "★ Bowie Knife",
		"skinName" : "Scorched",
		"prices" : {
			"default" : {
				3 : {
					"market" : 49.79,
					"analyst" : 49.79,
					"opskins" : 41.75
				},
				2 : {
					"market" : 40.75,
					"analyst" : 40.07,
					"opskins" : 35.09
				},
				1 : {
					"market" : 42.03,
					"analyst" : 43.23,
					"opskins" : 36.68
				},
				4 : {
					"market" : 165,
					"analyst" : 210,
					"opskins" : -1
				},
				0 : {
					"market" : 44.18,
					"analyst" : 42.64,
					"opskins" : 36.96
				}
			},
			"stattrak" : {
				3 : {
					"market" : 82.52,
					"analyst" : 83.63,
					"opskins" : 68.69
				},
				2 : {
					"market" : 55.81,
					"analyst" : 52.59,
					"opskins" : 50.49
				},
				1 : {
					"market" : 154.3,
					"analyst" : 55.83,
					"opskins" : 71.2
				},
				0 : {
					"market" : 71.02,
					"analyst" : 70.41,
					"opskins" : 66.26
				}
			},
			"souvenir" : {}
		}
	},
	"563" : {
		"item_id" : 563,
		"type" : "★ Bowie Knife",
		"skinName" : "Urban Masked",
		"prices" : {
			"default" : {
				4 : {
					"market" : 230,
					"analyst" : 381,
					"opskins" : 388
				},
				3 : {
					"market" : 50.87,
					"analyst" : 51.77,
					"opskins" : 46.24
				},
				2 : {
					"market" : 38.99,
					"analyst" : 39.8,
					"opskins" : 35.74
				},
				1 : {
					"market" : 41.95,
					"analyst" : 42.06,
					"opskins" : 37
				},
				0 : {
					"market" : 49.81,
					"analyst" : 42.07,
					"opskins" : 38.28
				}
			},
			"stattrak" : {
				3 : {
					"market" : 248.88,
					"analyst" : 90.97,
					"opskins" : 86
				},
				2 : {
					"market" : 55.98,
					"analyst" : 54,
					"opskins" : 49.99
				},
				1 : {
					"market" : 56.69,
					"analyst" : 48.56,
					"opskins" : 52.13
				},
				0 : {
					"market" : 73.09,
					"analyst" : 68.47,
					"opskins" : 56.99
				}
			},
			"souvenir" : {}
		}
	},
	"564" : {
		"item_id" : 564,
		"type" : "SG 553",
		"skinName" : "Wave Spray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.95,
					"analyst" : 2.98,
					"opskins" : 2.9
				},
				3 : {
					"market" : 0.74,
					"analyst" : 0.63,
					"opskins" : 7.98
				},
				2 : {
					"market" : 0.61,
					"analyst" : 0.47,
					"opskins" : 0.53
				},
				1 : {
					"market" : 0.64,
					"analyst" : 0.53,
					"opskins" : 0.53
				},
				0 : {
					"market" : 0.59,
					"analyst" : 0.45,
					"opskins" : 0.55
				}
			},
			"stattrak" : {
				4 : {
					"market" : 13.3,
					"analyst" : 24.83,
					"opskins" : 24
				},
				3 : {
					"market" : 1.87,
					"analyst" : 1.72,
					"opskins" : 1.63
				},
				2 : {
					"market" : 1.09,
					"analyst" : 1.1,
					"opskins" : 1.15
				},
				1 : {
					"market" : 1.18,
					"analyst" : 1.26,
					"opskins" : 3
				},
				0 : {
					"market" : 1.18,
					"analyst" : 1.16,
					"opskins" : 1.23
				}
			},
			"souvenir" : {}
		}
	},
	"565" : {
		"item_id" : 565,
		"type" : "Dual Berettas",
		"skinName" : "Black Limba",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.7,
					"analyst" : 3.15,
					"opskins" : 2.69
				},
				3 : {
					"market" : 0.71,
					"analyst" : 0.63,
					"opskins" : 0.67
				},
				2 : {
					"market" : 0.63,
					"analyst" : 0.5,
					"opskins" : 0.49
				},
				1 : {
					"market" : 0.55,
					"analyst" : 0.5,
					"opskins" : 1.06
				},
				0 : {
					"market" : 0.74,
					"analyst" : 0.7,
					"opskins" : 15.37
				}
			},
			"stattrak" : {
				4 : {
					"market" : 23.64,
					"analyst" : 32.7,
					"opskins" : 29.85
				},
				3 : {
					"market" : 1.8,
					"analyst" : 1.72,
					"opskins" : 1.72
				},
				2 : {
					"market" : 1.07,
					"analyst" : 1.11,
					"opskins" : 1.01
				},
				1 : {
					"market" : 4.83,
					"analyst" : 3.85,
					"opskins" : 50
				},
				0 : {
					"market" : 1.28,
					"analyst" : 1.18,
					"opskins" : 3.99
				}
			},
			"souvenir" : {}
		}
	},
	"566" : {
		"item_id" : 566,
		"type" : "Nova",
		"skinName" : "Tempest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.67,
					"analyst" : 2.98,
					"opskins" : 2.3
				},
				3 : {
					"market" : 0.74,
					"analyst" : 0.67,
					"opskins" : 0.58
				},
				2 : {
					"market" : 0.73,
					"analyst" : 0.58,
					"opskins" : 0.56
				}
			},
			"stattrak" : {
				4 : {
					"market" : 7.3,
					"analyst" : 11.49,
					"opskins" : 13.46
				},
				3 : {
					"market" : 1.67,
					"analyst" : 1.62,
					"opskins" : 1.37
				},
				2 : {
					"market" : 1.95,
					"analyst" : 1.5,
					"opskins" : 1.18
				}
			},
			"souvenir" : {}
		}
	},
	"567" : {
		"item_id" : 567,
		"type" : "Galil AR",
		"skinName" : "Shattered",
		"prices" : {
			"default" : {
				4 : {
					"market" : 3.14,
					"analyst" : 3.34,
					"opskins" : 3.03
				},
				3 : {
					"market" : 0.74,
					"analyst" : 0.68,
					"opskins" : 1.14
				},
				2 : {
					"market" : 0.69,
					"analyst" : 0.48,
					"opskins" : 2.39
				},
				1 : {
					"market" : 0.65,
					"analyst" : 0.59,
					"opskins" : 8
				},
				0 : {
					"market" : 0.62,
					"analyst" : 0.58,
					"opskins" : 7.76
				}
			},
			"stattrak" : {
				4 : {
					"market" : 26,
					"analyst" : 27.21,
					"opskins" : 27.98
				},
				3 : {
					"market" : 2.76,
					"analyst" : 1.81,
					"opskins" : 1.99
				},
				2 : {
					"market" : 1.29,
					"analyst" : 1.18,
					"opskins" : 1.3
				},
				1 : {
					"market" : 1.19,
					"analyst" : 1.09,
					"opskins" : 1.39
				},
				0 : {
					"market" : 1.12,
					"analyst" : 1.36,
					"opskins" : 1.91
				}
			},
			"souvenir" : {}
		}
	},
	"568" : {
		"item_id" : 568,
		"type" : "UMP-45",
		"skinName" : "Bone Pile",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.8,
					"analyst" : 3.65,
					"opskins" : 3.42
				},
				3 : {
					"market" : 0.71,
					"analyst" : 0.63,
					"opskins" : 0.74
				},
				2 : {
					"market" : 0.62,
					"analyst" : 0.51,
					"opskins" : 0.75
				}
			},
			"stattrak" : {
				4 : {
					"market" : 13.13,
					"analyst" : 15.86,
					"opskins" : 15.7
				},
				3 : {
					"market" : 1.57,
					"analyst" : 1.79,
					"opskins" : 1.79
				},
				2 : {
					"market" : 1.35,
					"analyst" : 1.23,
					"opskins" : 1.09
				}
			},
			"souvenir" : {}
		}
	},
	"569" : {
		"item_id" : 569,
		"type" : "G3SG1",
		"skinName" : "Demeter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.69,
					"analyst" : 3.51,
					"opskins" : 3.31
				},
				3 : {
					"market" : 0.93,
					"analyst" : 0.65,
					"opskins" : 0.98
				},
				2 : {
					"market" : 0.61,
					"analyst" : 0.51,
					"opskins" : 0.56
				},
				1 : {
					"market" : 0.66,
					"analyst" : 0.55,
					"opskins" : 0.62
				},
				0 : {
					"market" : 0.55,
					"analyst" : 0.5,
					"opskins" : 1.01
				}
			},
			"stattrak" : {
				4 : {
					"market" : 16,
					"analyst" : 19.42,
					"opskins" : 20
				},
				3 : {
					"market" : 2.32,
					"analyst" : 1.7,
					"opskins" : 1.45
				},
				2 : {
					"market" : 1.21,
					"analyst" : 1.14,
					"opskins" : 1.02
				},
				1 : {
					"market" : 1.12,
					"analyst" : 1.17,
					"opskins" : 0.91
				},
				0 : {
					"market" : 1.08,
					"analyst" : 0.94,
					"opskins" : 1.07
				}
			},
			"souvenir" : {}
		}
	},
	"570" : {
		"item_id" : 570,
		"type" : "USP-S",
		"skinName" : "Overgrowth",
		"prices" : {
			"default" : {
				4 : {
					"market" : 26.73,
					"analyst" : 27.16,
					"opskins" : 27.37
				},
				3 : {
					"market" : 6.46,
					"analyst" : 5.96,
					"opskins" : 5.85
				},
				2 : {
					"market" : 3.82,
					"analyst" : 3.65,
					"opskins" : 3.5
				},
				1 : {
					"market" : 3.99,
					"analyst" : 3.62,
					"opskins" : 3.65
				},
				0 : {
					"market" : 3.54,
					"analyst" : 3.18,
					"opskins" : 3.65
				}
			},
			"stattrak" : {
				4 : {
					"market" : 400,
					"analyst" : 324.83,
					"opskins" : 284.32
				},
				3 : {
					"market" : 32.95,
					"analyst" : 29.83,
					"opskins" : 26.85
				},
				2 : {
					"market" : 10.15,
					"analyst" : 10.95,
					"opskins" : 9.98
				},
				1 : {
					"market" : 11.42,
					"analyst" : 11.09,
					"opskins" : 20.19
				},
				0 : {
					"market" : 17.19,
					"analyst" : 13.64,
					"opskins" : 14.69
				}
			},
			"souvenir" : {}
		}
	},
	"571" : {
		"item_id" : 571,
		"type" : "M4A4",
		"skinName" : "Zirka",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.9,
					"analyst" : 10.16,
					"opskins" : 9.85
				},
				3 : {
					"market" : 3,
					"analyst" : 3.57,
					"opskins" : 3.28
				},
				2 : {
					"market" : 2.95,
					"analyst" : 3.14,
					"opskins" : 3.05
				},
				1 : {
					"market" : 4.07,
					"analyst" : 3.6,
					"opskins" : 3.25
				}
			},
			"stattrak" : {
				4 : {
					"market" : 79.01,
					"analyst" : 73.89,
					"opskins" : 72
				},
				3 : {
					"market" : 12.99,
					"analyst" : 12.77,
					"opskins" : 11.25
				},
				2 : {
					"market" : 9.27,
					"analyst" : 10.28,
					"opskins" : 10
				},
				1 : {
					"market" : 10.07,
					"analyst" : 10.86,
					"opskins" : 12.73
				}
			},
			"souvenir" : {}
		}
	},
	"572" : {
		"item_id" : 572,
		"type" : "MAC-10",
		"skinName" : "Graven",
		"prices" : {
			"default" : {
				4 : {
					"market" : 12.16,
					"analyst" : 13.68,
					"opskins" : 12.16
				},
				3 : {
					"market" : 4,
					"analyst" : 3.9,
					"opskins" : 7.82
				},
				2 : {
					"market" : 3.08,
					"analyst" : 3.04,
					"opskins" : 4
				},
				1 : {
					"market" : 3.45,
					"analyst" : 3.12,
					"opskins" : 2.9
				},
				0 : {
					"market" : 3.49,
					"analyst" : 3.27,
					"opskins" : 2.81
				}
			},
			"stattrak" : {
				4 : {
					"market" : 70,
					"analyst" : 69.24,
					"opskins" : 72.5
				},
				3 : {
					"market" : 11.98,
					"analyst" : 10.87,
					"opskins" : 10.1
				},
				2 : {
					"market" : 9.85,
					"analyst" : 10.12,
					"opskins" : 8.6
				},
				1 : {
					"market" : 11.92,
					"analyst" : 10.73,
					"opskins" : 9.17
				},
				0 : {
					"market" : 11.13,
					"analyst" : 8.63,
					"opskins" : 12.44
				}
			},
			"souvenir" : {}
		}
	},
	"573" : {
		"item_id" : 573,
		"type" : "M4A1-S",
		"skinName" : "Bright Water",
		"prices" : {
			"default" : {
				3 : {
					"market" : 3.23,
					"analyst" : 3.57,
					"opskins" : 3.14
				},
				2 : {
					"market" : 3.18,
					"analyst" : 3.43,
					"opskins" : 3.2
				}
			},
			"stattrak" : {
				3 : {
					"market" : 13.45,
					"analyst" : 12.2,
					"opskins" : 11.58
				},
				2 : {
					"market" : 10.35,
					"analyst" : 11.12,
					"opskins" : 12
				}
			},
			"souvenir" : {}
		}
	},
	"574" : {
		"item_id" : 574,
		"type" : "P90",
		"skinName" : "Emerald Dragon",
		"prices" : {
			"default" : {
				4 : {
					"market" : 60.91,
					"analyst" : 79.78,
					"opskins" : 68
				},
				3 : {
					"market" : 21.91,
					"analyst" : 21.99,
					"opskins" : 20.22
				},
				2 : {
					"market" : 18.12,
					"analyst" : 18.73,
					"opskins" : 16.85
				},
				1 : {
					"market" : 18.83,
					"analyst" : 19.43,
					"opskins" : 17.89
				},
				0 : {
					"market" : 22.5,
					"analyst" : 20.16,
					"opskins" : 23.23
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 987,
					"opskins" : 999.98
				},
				3 : {
					"market" : 83.38,
					"analyst" : 74.12,
					"opskins" : 64.95
				},
				2 : {
					"market" : 56.6,
					"analyst" : 50.41,
					"opskins" : 42.48
				},
				1 : {
					"market" : 304.58,
					"analyst" : 72.95,
					"opskins" : 100
				},
				0 : {
					"market" : 170.9,
					"analyst" : 50.67,
					"opskins" : 77
				}
			},
			"souvenir" : {}
		}
	},
	"575" : {
		"item_id" : 575,
		"type" : "P2000",
		"skinName" : "Ocean Foam",
		"prices" : {
			"default" : {
				4 : {
					"market" : 23,
					"analyst" : 24.67,
					"opskins" : 21.15
				},
				3 : {
					"market" : 30.86,
					"analyst" : 26.69,
					"opskins" : 29.47
				}
			},
			"stattrak" : {
				4 : {
					"market" : 86.86,
					"analyst" : 90.84,
					"opskins" : 88
				},
				3 : {
					"market" : 94.9,
					"analyst" : 78.09,
					"opskins" : 68.76
				}
			},
			"souvenir" : {}
		}
	},
	"576" : {
		"item_id" : 576,
		"type" : "Desert Eagle",
		"skinName" : "Golden Koi",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.27,
					"analyst" : 10.11,
					"opskins" : 9.97
				},
				3 : {
					"market" : 10.2,
					"analyst" : 10.83,
					"opskins" : 10.5
				}
			},
			"stattrak" : {
				4 : {
					"market" : 75.4,
					"analyst" : 76.69,
					"opskins" : 61.16
				},
				3 : {
					"market" : 98.56,
					"analyst" : 91.83,
					"opskins" : 85
				}
			},
			"souvenir" : {}
		}
	},
	"577" : {
		"item_id" : 577,
		"type" : "★ Karambit",
		"skinName" : "Blue Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 292.4,
					"analyst" : 244.6,
					"opskins" : 215.55
				},
				3 : {
					"market" : 153.61,
					"analyst" : 166.21,
					"opskins" : 142.99
				},
				2 : {
					"market" : 146.2,
					"analyst" : 147.63,
					"opskins" : 125.6
				},
				1 : {
					"market" : 138.8,
					"analyst" : 137.07,
					"opskins" : 121.98
				},
				0 : {
					"market" : 137.72,
					"analyst" : 138.89,
					"opskins" : 116.65
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 508,
					"opskins" : 690
				},
				3 : {
					"market" : 230,
					"analyst" : 273.13,
					"opskins" : 210
				},
				2 : {
					"market" : 230,
					"analyst" : 209.63,
					"opskins" : 167.99
				},
				1 : {
					"market" : 400,
					"analyst" : 253.66,
					"opskins" : 198.98
				},
				0 : {
					"market" : 206.6,
					"analyst" : 203.55,
					"opskins" : 172.98
				}
			},
			"souvenir" : {}
		}
	},
	"578" : {
		"item_id" : 578,
		"type" : "★ Bayonet",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 196.99,
					"analyst" : 176.18,
					"opskins" : 177
				},
				3 : {
					"market" : 108.06,
					"analyst" : 107.73,
					"opskins" : 93.67
				},
				2 : {
					"market" : 92.63,
					"analyst" : 96.28,
					"opskins" : 80.69
				},
				1 : {
					"market" : 90.19,
					"analyst" : 86.65,
					"opskins" : 76.5
				},
				0 : {
					"market" : 88.15,
					"analyst" : 79.84,
					"opskins" : 76.59
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 351,
					"opskins" : 474
				},
				3 : {
					"market" : 217,
					"analyst" : 170.47,
					"opskins" : 169.98
				},
				2 : {
					"market" : 161.49,
					"analyst" : 141.72,
					"opskins" : 117.98
				},
				1 : {
					"market" : 129.15,
					"analyst" : 138.32,
					"opskins" : 117.81
				},
				0 : {
					"market" : 190.69,
					"analyst" : 146.28,
					"opskins" : 143.84
				}
			},
			"souvenir" : {}
		}
	},
	"579" : {
		"item_id" : 579,
		"type" : "★ Bowie Knife",
		"skinName" : "Blue Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 289.4,
					"analyst" : 222.82,
					"opskins" : 190
				},
				3 : {
					"market" : 76.27,
					"analyst" : 74.82,
					"opskins" : 65
				},
				2 : {
					"market" : 70.01,
					"analyst" : 64.34,
					"opskins" : 56.95
				},
				1 : {
					"market" : 66.74,
					"analyst" : 62.3,
					"opskins" : 54.75
				},
				0 : {
					"market" : 69.43,
					"analyst" : 64.01,
					"opskins" : 55.48
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 399
				},
				3 : {
					"market" : 146.2,
					"analyst" : 144.14,
					"opskins" : 126.32
				},
				2 : {
					"market" : 120,
					"analyst" : 108.36,
					"opskins" : 94.73
				},
				1 : {
					"market" : 122.38,
					"analyst" : 108.94,
					"opskins" : 93.95
				},
				0 : {
					"market" : 113,
					"analyst" : 160.81,
					"opskins" : 138.37
				}
			},
			"souvenir" : {}
		}
	},
	"580" : {
		"item_id" : 580,
		"type" : "★ Bowie Knife",
		"skinName" : "Boreal Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 149.99,
					"analyst" : 148.45,
					"opskins" : 142.94
				},
				3 : {
					"market" : 62.61,
					"analyst" : 53.74,
					"opskins" : 50.98
				},
				2 : {
					"market" : 42.25,
					"analyst" : 45.11,
					"opskins" : 39.99
				},
				1 : {
					"market" : 47.88,
					"analyst" : 44.62,
					"opskins" : 44.72
				},
				0 : {
					"market" : 42.38,
					"analyst" : 42.94,
					"opskins" : 36.12
				}
			},
			"stattrak" : {
				3 : {
					"market" : 124.49,
					"analyst" : 97.78,
					"opskins" : 86.99
				},
				2 : {
					"market" : 80.41,
					"analyst" : 68.44,
					"opskins" : 57.49
				},
				1 : {
					"market" : 60,
					"analyst" : 100,
					"opskins" : 96.14
				},
				0 : {
					"market" : 60,
					"analyst" : 56.39,
					"opskins" : 43.99
				}
			},
			"souvenir" : {}
		}
	},
	"581" : {
		"item_id" : 581,
		"type" : "★ Bowie Knife",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 201.3,
					"analyst" : 200.71,
					"opskins" : 185.97
				},
				3 : {
					"market" : 95.83,
					"analyst" : 97.44,
					"opskins" : 79.66
				},
				2 : {
					"market" : 84.5,
					"analyst" : 86.89,
					"opskins" : 73.34
				},
				1 : {
					"market" : 79.5,
					"analyst" : 77.43,
					"opskins" : 66.98
				},
				0 : {
					"market" : 79.46,
					"analyst" : 74.08,
					"opskins" : 62.19
				}
			},
			"stattrak" : {
				4 : {
					"market" : 399.62,
					"analyst" : 582,
					"opskins" : 499.99
				},
				3 : {
					"market" : 324.07,
					"analyst" : 238,
					"opskins" : 269
				},
				2 : {
					"market" : 142.09,
					"analyst" : 158.78,
					"opskins" : 143
				},
				1 : {
					"market" : 158.9,
					"analyst" : 143.19,
					"opskins" : 111.84
				},
				0 : {
					"market" : 127.14,
					"analyst" : 137.23,
					"opskins" : 128.5
				}
			},
			"souvenir" : {}
		}
	},
	"582" : {
		"item_id" : 582,
		"type" : "★ Bowie Knife",
		"skinName" : "Forest DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 134.01,
					"analyst" : 299,
					"opskins" : 200
				},
				3 : {
					"market" : 56,
					"analyst" : 53.96,
					"opskins" : 46.94
				},
				2 : {
					"market" : 40.56,
					"analyst" : 43.23,
					"opskins" : 36.63
				},
				1 : {
					"market" : 45.55,
					"analyst" : 41.97,
					"opskins" : 37.78
				},
				0 : {
					"market" : 42.96,
					"analyst" : 44.96,
					"opskins" : 45
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 121.83,
					"analyst" : 106.63,
					"opskins" : 88.95
				},
				2 : {
					"market" : 72.05,
					"analyst" : 67.72,
					"opskins" : 62.1
				},
				1 : {
					"market" : 266.19,
					"analyst" : 71,
					"opskins" : 70
				},
				0 : {
					"market" : 74.17,
					"analyst" : 60.26,
					"opskins" : 50
				}
			},
			"souvenir" : {}
		}
	},
	"583" : {
		"item_id" : 583,
		"type" : "★ Bowie Knife",
		"skinName" : "Slaughter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 161.49,
					"analyst" : 162.99,
					"opskins" : 144.5
				},
				3 : {
					"market" : 132.43,
					"analyst" : 137.54,
					"opskins" : 118.9
				},
				2 : {
					"market" : 122.78,
					"analyst" : 134.33,
					"opskins" : 108.11
				}
			},
			"stattrak" : {
				4 : {
					"market" : 347.3,
					"analyst" : 317.66,
					"opskins" : 265.99
				},
				3 : {
					"market" : 227.79,
					"analyst" : 217.46,
					"opskins" : 197
				},
				2 : {
					"market" : 306.18,
					"analyst" : 181,
					"opskins" : 164.99
				}
			},
			"souvenir" : {}
		}
	},
	"584" : {
		"item_id" : 584,
		"type" : "★ Bowie Knife",
		"skinName" : "Stained",
		"prices" : {
			"default" : {
				4 : {
					"market" : 118.71,
					"analyst" : 115.92,
					"opskins" : 93.96
				},
				3 : {
					"market" : 67.89,
					"analyst" : 62.08,
					"opskins" : 56.3
				},
				2 : {
					"market" : 55,
					"analyst" : 56.46,
					"opskins" : 56.45
				},
				1 : {
					"market" : 56.51,
					"analyst" : 54.54,
					"opskins" : 55
				},
				0 : {
					"market" : 54.55,
					"analyst" : 52.12,
					"opskins" : 46.93
				}
			},
			"stattrak" : {
				4 : {
					"market" : 371.6,
					"analyst" : 344,
					"opskins" : 388.89
				},
				3 : {
					"market" : 130.3,
					"analyst" : 156.51,
					"opskins" : 115
				},
				2 : {
					"market" : 83.69,
					"analyst" : 83.69,
					"opskins" : 83.84
				},
				1 : {
					"market" : 79.55,
					"analyst" : 60.44,
					"opskins" : 74.8
				},
				0 : {
					"market" : 121.83,
					"analyst" : 94.47,
					"opskins" : 76.89
				}
			},
			"souvenir" : {}
		}
	},
	"585" : {
		"item_id" : 585,
		"type" : "★ Gut Knife",
		"skinName" : "Blue Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 59,
					"analyst" : 61.35,
					"opskins" : 58
				},
				3 : {
					"market" : 42.94,
					"analyst" : 41.84,
					"opskins" : 37.15
				},
				2 : {
					"market" : 37.03,
					"analyst" : 39.73,
					"opskins" : 36.78
				},
				1 : {
					"market" : 36.23,
					"analyst" : 38.76,
					"opskins" : 35.31
				},
				0 : {
					"market" : 41.37,
					"analyst" : 36.65,
					"opskins" : 33.8
				}
			},
			"stattrak" : {
				4 : {
					"market" : 154,
					"analyst" : 165.64,
					"opskins" : 172.67
				},
				3 : {
					"market" : 63.27,
					"analyst" : 62.8,
					"opskins" : 59.99
				},
				2 : {
					"market" : 50.69,
					"analyst" : 58.24,
					"opskins" : 51.45
				},
				1 : {
					"market" : 63.57,
					"analyst" : 58.62,
					"opskins" : 70
				},
				0 : {
					"market" : 52,
					"analyst" : 56.38,
					"opskins" : 55
				}
			},
			"souvenir" : {}
		}
	},
	"586" : {
		"item_id" : 586,
		"type" : "★ Gut Knife",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : 347.61,
					"analyst" : 330,
					"opskins" : 314.99
				},
				3 : {
					"market" : 57.67,
					"analyst" : 66.87,
					"opskins" : 57.39
				},
				2 : {
					"market" : 40.26,
					"analyst" : 41.35,
					"opskins" : 36.6
				},
				1 : {
					"market" : 47.42,
					"analyst" : 44.29,
					"opskins" : 40.5
				},
				0 : {
					"market" : 40.42,
					"analyst" : 38.81,
					"opskins" : 36.09
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 137.68,
					"analyst" : 105.82,
					"opskins" : 97
				},
				2 : {
					"market" : 56.96,
					"analyst" : 52.02,
					"opskins" : 53
				},
				1 : {
					"market" : 74.4,
					"analyst" : 72.98,
					"opskins" : 65
				},
				0 : {
					"market" : 61.7,
					"analyst" : 60.54,
					"opskins" : 54.4
				}
			},
			"souvenir" : {}
		}
	},
	"587" : {
		"item_id" : 587,
		"type" : "★ Gut Knife",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 80.47,
					"analyst" : 96.04,
					"opskins" : 80
				},
				3 : {
					"market" : 53.65,
					"analyst" : 53.28,
					"opskins" : 45
				},
				2 : {
					"market" : 46.99,
					"analyst" : 46.31,
					"opskins" : 42.67
				},
				1 : {
					"market" : 46,
					"analyst" : 46.39,
					"opskins" : 41.22
				},
				0 : {
					"market" : 45.6,
					"analyst" : 44.44,
					"opskins" : 39.69
				}
			},
			"stattrak" : {
				4 : {
					"market" : 407.21,
					"analyst" : 190,
					"opskins" : -1
				},
				3 : {
					"market" : 90.06,
					"analyst" : 89.19,
					"opskins" : 84
				},
				2 : {
					"market" : 81.11,
					"analyst" : 73.44,
					"opskins" : 61.99
				},
				1 : {
					"market" : 73.09,
					"analyst" : 62.89,
					"opskins" : 70
				},
				0 : {
					"market" : 70.66,
					"analyst" : 65.14,
					"opskins" : 58.57
				}
			},
			"souvenir" : {}
		}
	},
	"588" : {
		"item_id" : 588,
		"type" : "★ Gut Knife",
		"skinName" : "Slaughter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 58,
					"analyst" : 64.4,
					"opskins" : 55.98
				},
				3 : {
					"market" : 55.03,
					"analyst" : 56.72,
					"opskins" : 50.26
				},
				2 : {
					"market" : 48.69,
					"analyst" : 46.78,
					"opskins" : 46.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : 97.3,
					"analyst" : 106.78,
					"opskins" : 89.99
				},
				3 : {
					"market" : 75.99,
					"analyst" : 81.39,
					"opskins" : 64.99
				},
				2 : {
					"market" : 74.19,
					"analyst" : 70.11,
					"opskins" : 63.16
				}
			},
			"souvenir" : {}
		}
	},
	"589" : {
		"item_id" : 589,
		"type" : "★ Gut Knife",
		"skinName" : "Doppler",
		"prices" : {
			"default" : {
				4 : {
					"market" : 57.21,
					"analyst" : 60.38,
					"opskins" : 52.79
				},
				3 : {
					"market" : 65.05,
					"analyst" : 63.1,
					"opskins" : 54.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : 85.7,
					"analyst" : 82.32,
					"opskins" : 70.59
				},
				3 : {
					"market" : 115.28,
					"analyst" : 115.76,
					"opskins" : 129
				}
			},
			"souvenir" : {}
		}
	},
	"591" : {
		"item_id" : 591,
		"type" : "★ M9 Bayonet",
		"skinName" : "Autotronic",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 456,
					"opskins" : 550
				},
				3 : {
					"market" : 333.21,
					"analyst" : 347.37,
					"opskins" : 280
				},
				2 : {
					"market" : 255.46,
					"analyst" : 225.7,
					"opskins" : 215
				},
				1 : {
					"market" : 300.73,
					"analyst" : 249.13,
					"opskins" : 209.98
				},
				0 : {
					"market" : 207.65,
					"analyst" : 210.11,
					"opskins" : 188.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 1199
				},
				3 : {
					"market" : -1,
					"analyst" : 492,
					"opskins" : 519.49
				},
				2 : {
					"market" : 389,
					"analyst" : 376.51,
					"opskins" : 299.99
				},
				1 : {
					"market" : 322.17,
					"analyst" : -1,
					"opskins" : 259
				},
				0 : {
					"market" : 335.85,
					"analyst" : 309.02,
					"opskins" : 256.99
				}
			},
			"souvenir" : {}
		}
	},
	"592" : {
		"item_id" : 592,
		"type" : "★ M9 Bayonet",
		"skinName" : "Bright Water",
		"prices" : {
			"default" : {
				4 : {
					"market" : 154.99,
					"analyst" : 145.87,
					"opskins" : 120
				},
				3 : {
					"market" : 135.7,
					"analyst" : 117.73,
					"opskins" : 100.92
				},
				2 : {
					"market" : 93.33,
					"analyst" : 92.78,
					"opskins" : 85
				},
				1 : {
					"market" : 92.42,
					"analyst" : 91.7,
					"opskins" : 84.44
				},
				0 : {
					"market" : 90.06,
					"analyst" : 79.31,
					"opskins" : 74.78
				}
			},
			"stattrak" : {
				4 : {
					"market" : 304.58,
					"analyst" : 330.66,
					"opskins" : 255.99
				},
				3 : {
					"market" : 184,
					"analyst" : 187,
					"opskins" : 168.42
				},
				2 : {
					"market" : 118.69,
					"analyst" : 113.03,
					"opskins" : 98.42
				},
				1 : {
					"market" : 213.14,
					"analyst" : 96.69,
					"opskins" : 100
				},
				0 : {
					"market" : 345,
					"analyst" : -1,
					"opskins" : -1
				}
			},
			"souvenir" : {}
		}
	},
	"593" : {
		"item_id" : 593,
		"type" : "★ M9 Bayonet",
		"skinName" : "Black Laminate",
		"prices" : {
			"default" : {
				4 : {
					"market" : 381.4,
					"analyst" : 360,
					"opskins" : 374.99
				},
				3 : {
					"market" : 180,
					"analyst" : 160.11,
					"opskins" : 149.72
				},
				2 : {
					"market" : 146.2,
					"analyst" : 153.85,
					"opskins" : 146
				},
				1 : {
					"market" : 148.97,
					"analyst" : 140.4,
					"opskins" : 140
				},
				0 : {
					"market" : 149.34,
					"analyst" : 141.99,
					"opskins" : 129.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 365.51,
					"analyst" : 291.84,
					"opskins" : 238.48
				},
				2 : {
					"market" : 259.25,
					"analyst" : 203.42,
					"opskins" : 188.8
				},
				1 : {
					"market" : 194.94,
					"analyst" : 174.04,
					"opskins" : 150
				},
				0 : {
					"market" : 223,
					"analyst" : 230.94,
					"opskins" : 191.49
				}
			},
			"souvenir" : {}
		}
	},
	"594" : {
		"item_id" : 594,
		"type" : "★ M9 Bayonet",
		"skinName" : "Lore",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 901,
					"opskins" : 839.99
				},
				3 : {
					"market" : -1,
					"analyst" : 594,
					"opskins" : 592
				},
				2 : {
					"market" : 334.07,
					"analyst" : 345,
					"opskins" : 335.61
				},
				1 : {
					"market" : 302.99,
					"analyst" : 276.67,
					"opskins" : 218
				},
				0 : {
					"market" : 170.57,
					"analyst" : 180.78,
					"opskins" : 156.84
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 2499
				},
				3 : {
					"market" : -1,
					"analyst" : 766,
					"opskins" : 699
				},
				2 : {
					"market" : -1,
					"analyst" : 418,
					"opskins" : 424.8
				}
			},
			"souvenir" : {}
		}
	},
	"595" : {
		"item_id" : 595,
		"type" : "★ M9 Bayonet",
		"skinName" : "Freehand",
		"prices" : {
			"default" : {
				4 : {
					"market" : 291.35,
					"analyst" : 273.08,
					"opskins" : 225.97
				},
				3 : {
					"market" : 213.86,
					"analyst" : 209.83,
					"opskins" : 186.99
				},
				2 : {
					"market" : 156.68,
					"analyst" : 139.15,
					"opskins" : 124.98
				},
				1 : {
					"market" : 194.94,
					"analyst" : 125.09,
					"opskins" : 181.14
				},
				0 : {
					"market" : 122.76,
					"analyst" : 128.02,
					"opskins" : 109.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : 381.4,
					"analyst" : 335.5,
					"opskins" : 339.99
				},
				3 : {
					"market" : 309.29,
					"analyst" : 319.15,
					"opskins" : 254.99
				},
				2 : {
					"market" : 200.26,
					"analyst" : 165.98,
					"opskins" : 155
				},
				1 : {
					"market" : 137.34,
					"analyst" : 132.82,
					"opskins" : -1
				},
				0 : {
					"market" : 84.8,
					"analyst" : 172.15,
					"opskins" : -1
				}
			},
			"souvenir" : {}
		}
	},
	"596" : {
		"item_id" : 596,
		"type" : "★ M9 Bayonet",
		"skinName" : "Gamma Doppler",
		"prices" : {
			"default" : {
				4 : {
					"market" : 400,
					"analyst" : 382,
					"opskins" : 356
				},
				3 : {
					"market" : 400,
					"analyst" : 334,
					"opskins" : 349
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 533,
					"opskins" : 522
				}
			},
			"souvenir" : {}
		}
	},
	"597" : {
		"item_id" : 597,
		"type" : "★ M9 Bayonet",
		"skinName" : "Doppler",
		"prices" : {
			"default" : {
				4 : {
					"market" : 201.3,
					"analyst" : 205.47,
					"opskins" : 174
				},
				3 : {
					"market" : 224.17,
					"analyst" : 229.86,
					"opskins" : 190.98
				}
			},
			"stattrak" : {
				4 : {
					"market" : 292.94,
					"analyst" : 295.06,
					"opskins" : 242
				},
				3 : {
					"market" : 345,
					"analyst" : 330.71,
					"opskins" : 310.56
				}
			},
			"souvenir" : {}
		}
	},
	"598" : {
		"item_id" : 598,
		"type" : "★ M9 Bayonet",
		"skinName" : "Rust Coat",
		"prices" : {
			"default" : {
				1 : {
					"market" : 97.45,
					"analyst" : 101.21,
					"opskins" : 85.69
				},
				0 : {
					"market" : 81.95,
					"analyst" : 77.4,
					"opskins" : 76.5
				}
			},
			"stattrak" : {
				1 : {
					"market" : 282.23,
					"analyst" : -1,
					"opskins" : 199.98
				},
				0 : {
					"market" : 113.23,
					"analyst" : 112.11,
					"opskins" : 94.29
				}
			},
			"souvenir" : {}
		}
	},
	"599" : {
		"item_id" : 599,
		"type" : "★ M9 Bayonet",
		"skinName" : "Marble Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 381.4,
					"analyst" : 320,
					"opskins" : 323
				},
				3 : {
					"market" : 381.39,
					"analyst" : 388.27,
					"opskins" : 338.84
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 419,
					"opskins" : 410
				},
				3 : {
					"market" : -1,
					"analyst" : 371,
					"opskins" : 699
				}
			},
			"souvenir" : {}
		}
	},
	"600" : {
		"item_id" : 600,
		"type" : "★ M9 Bayonet",
		"skinName" : "Damascus Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 124.23,
					"analyst" : 129.76,
					"opskins" : 105
				},
				3 : {
					"market" : 111.87,
					"analyst" : 117.43,
					"opskins" : 100
				},
				2 : {
					"market" : 108.99,
					"analyst" : 105.93,
					"opskins" : 89.89
				},
				1 : {
					"market" : 105.51,
					"analyst" : 109.77,
					"opskins" : 94.8
				},
				0 : {
					"market" : 115.09,
					"analyst" : 108.83,
					"opskins" : 95.89
				}
			},
			"stattrak" : {
				4 : {
					"market" : 337.15,
					"analyst" : 261.64,
					"opskins" : 244.64
				},
				3 : {
					"market" : 181.53,
					"analyst" : 185.23,
					"opskins" : 144.97
				},
				2 : {
					"market" : 157.87,
					"analyst" : 145.36,
					"opskins" : 149.99
				},
				1 : {
					"market" : 159,
					"analyst" : 165.54,
					"opskins" : 145
				},
				0 : {
					"market" : 342.2,
					"analyst" : -1,
					"opskins" : 162.99
				}
			},
			"souvenir" : {}
		}
	},
	"601" : {
		"item_id" : 601,
		"type" : "★ M9 Bayonet",
		"skinName" : "Tiger Tooth",
		"prices" : {
			"default" : {
				4 : {
					"market" : 252.79,
					"analyst" : 258.33,
					"opskins" : 214.75
				},
				3 : {
					"market" : 316.77,
					"analyst" : 288.55,
					"opskins" : 280
				}
			},
			"stattrak" : {
				4 : {
					"market" : 367,
					"analyst" : 374.64,
					"opskins" : 305.11
				},
				3 : {
					"market" : -1,
					"analyst" : 401,
					"opskins" : -1
				}
			},
			"souvenir" : {}
		}
	},
	"602" : {
		"item_id" : 602,
		"type" : "★ M9 Bayonet",
		"skinName" : "Ultraviolet",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 750,
					"opskins" : 569
				},
				3 : {
					"market" : 147.25,
					"analyst" : 135.79,
					"opskins" : 115.99
				},
				2 : {
					"market" : 82.58,
					"analyst" : 83.54,
					"opskins" : 70.15
				},
				1 : {
					"market" : 80.47,
					"analyst" : 77.51,
					"opskins" : 69
				},
				0 : {
					"market" : 68.88,
					"analyst" : 65.36,
					"opskins" : 60.94
				}
			},
			"stattrak" : {
				3 : {
					"market" : 249.95,
					"analyst" : 246.36,
					"opskins" : 210
				},
				2 : {
					"market" : 105.59,
					"analyst" : 116.51,
					"opskins" : 89.87
				},
				1 : {
					"market" : 103.76,
					"analyst" : 108.5,
					"opskins" : 94.42
				},
				0 : {
					"market" : 96.42,
					"analyst" : 92.7,
					"opskins" : 77
				}
			},
			"souvenir" : {}
		}
	},
	"603" : {
		"item_id" : 603,
		"type" : "★ M9 Bayonet",
		"skinName" : "Urban Masked",
		"prices" : {
			"default" : {
				4 : {
					"market" : 193.5,
					"analyst" : 227.91,
					"opskins" : 146.98
				},
				3 : {
					"market" : 78,
					"analyst" : 77.93,
					"opskins" : 69.69
				},
				2 : {
					"market" : 56.78,
					"analyst" : 60.68,
					"opskins" : 51.92
				},
				1 : {
					"market" : 63.43,
					"analyst" : 56.27,
					"opskins" : 51.99
				},
				0 : {
					"market" : 64.97,
					"analyst" : 62.36,
					"opskins" : 55.2
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 103.64,
					"analyst" : 114.39,
					"opskins" : 110
				},
				2 : {
					"market" : 75.24,
					"analyst" : 78.56,
					"opskins" : 65.61
				},
				1 : {
					"market" : 85.79,
					"analyst" : 73.22,
					"opskins" : 63.3
				},
				0 : {
					"market" : 89.37,
					"analyst" : 78.66,
					"opskins" : 94.94
				}
			},
			"souvenir" : {}
		}
	},
	"604" : {
		"item_id" : 604,
		"type" : "★ M9 Bayonet",
		"skinName" : "Stained",
		"prices" : {
			"default" : {
				4 : {
					"market" : 119.73,
					"analyst" : 125.61,
					"opskins" : 104.84
				},
				3 : {
					"market" : 85.28,
					"analyst" : 84.14,
					"opskins" : 70.96
				},
				2 : {
					"market" : 81.37,
					"analyst" : 78.48,
					"opskins" : 67.8
				},
				1 : {
					"market" : 64.57,
					"analyst" : 74.73,
					"opskins" : 66.7
				},
				0 : {
					"market" : 75.98,
					"analyst" : 71.95,
					"opskins" : 63.83
				}
			},
			"stattrak" : {
				4 : {
					"market" : 212.79,
					"analyst" : 191.18,
					"opskins" : 164.99
				},
				3 : {
					"market" : 126.04,
					"analyst" : 142.56,
					"opskins" : 112.49
				},
				2 : {
					"market" : 111.24,
					"analyst" : 101.86,
					"opskins" : 83.15
				},
				1 : {
					"market" : 116,
					"analyst" : 97.9,
					"opskins" : 79.99
				},
				0 : {
					"market" : 105.98,
					"analyst" : 97.81,
					"opskins" : 81.37
				}
			},
			"souvenir" : {}
		}
	},
	"606" : {
		"item_id" : 606,
		"type" : "★ M9 Bayonet",
		"skinName" : "Scorched",
		"prices" : {
			"default" : {
				4 : {
					"market" : 385.77,
					"analyst" : -1,
					"opskins" : 152
				},
				3 : {
					"market" : 65,
					"analyst" : 73.58,
					"opskins" : 62.29
				},
				2 : {
					"market" : 55.09,
					"analyst" : 58.37,
					"opskins" : 51.11
				},
				1 : {
					"market" : 61.2,
					"analyst" : 58.45,
					"opskins" : 51.46
				},
				0 : {
					"market" : 62.99,
					"analyst" : 61.61,
					"opskins" : 51
				}
			},
			"stattrak" : {
				3 : {
					"market" : 102,
					"analyst" : 117.92,
					"opskins" : 95.99
				},
				2 : {
					"market" : 77.34,
					"analyst" : 72.17,
					"opskins" : 62
				},
				1 : {
					"market" : 77.23,
					"analyst" : 81.27,
					"opskins" : 90
				},
				0 : {
					"market" : 120.75,
					"analyst" : 90.25,
					"opskins" : 71.98
				}
			},
			"souvenir" : {}
		}
	},
	"607" : {
		"item_id" : 607,
		"type" : "★ M9 Bayonet",
		"skinName" : "Safari Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 173.65,
					"analyst" : -1,
					"opskins" : 149.95
				},
				3 : {
					"market" : 71.3,
					"analyst" : 68.88,
					"opskins" : 60.28
				},
				2 : {
					"market" : 57.16,
					"analyst" : 56.94,
					"opskins" : 50.14
				},
				1 : {
					"market" : 58.57,
					"analyst" : 54.56,
					"opskins" : 52.5
				},
				0 : {
					"market" : 64.05,
					"analyst" : 59.36,
					"opskins" : 52.88
				}
			},
			"stattrak" : {
				3 : {
					"market" : 105.8,
					"analyst" : 95.97,
					"opskins" : 83.99
				},
				2 : {
					"market" : 73.09,
					"analyst" : 74.68,
					"opskins" : 62.69
				},
				1 : {
					"market" : 96.42,
					"analyst" : 100.21,
					"opskins" : 89
				},
				0 : {
					"market" : 81.31,
					"analyst" : 82.8,
					"opskins" : 80
				}
			},
			"souvenir" : {}
		}
	},
	"608" : {
		"item_id" : 608,
		"type" : "★ M9 Bayonet",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 681,
					"opskins" : 698.99
				},
				3 : {
					"market" : 143.01,
					"analyst" : 141.82,
					"opskins" : 115
				},
				2 : {
					"market" : 77.87,
					"analyst" : 79.82,
					"opskins" : 70.49
				},
				1 : {
					"market" : 75.56,
					"analyst" : 77.81,
					"opskins" : 65.91
				},
				0 : {
					"market" : 63.59,
					"analyst" : 66.83,
					"opskins" : 61.79
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 4000
				},
				3 : {
					"market" : 254.27,
					"analyst" : 258.43,
					"opskins" : 211.97
				},
				2 : {
					"market" : 110.87,
					"analyst" : 114.93,
					"opskins" : 96.5
				},
				1 : {
					"market" : 239.2,
					"analyst" : 207.46,
					"opskins" : 144.98
				},
				0 : {
					"market" : 101.15,
					"analyst" : 117.96,
					"opskins" : 107.75
				}
			},
			"souvenir" : {}
		}
	},
	"609" : {
		"item_id" : 609,
		"type" : "★ M9 Bayonet",
		"skinName" : "Forest DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 353.74,
					"analyst" : -1,
					"opskins" : 292
				},
				3 : {
					"market" : 80.52,
					"analyst" : 75.63,
					"opskins" : 64.98
				},
				2 : {
					"market" : 62.4,
					"analyst" : 60.63,
					"opskins" : 53.38
				},
				1 : {
					"market" : 72.05,
					"analyst" : 60.88,
					"opskins" : 53.94
				},
				0 : {
					"market" : 60.4,
					"analyst" : 60.83,
					"opskins" : 53.24
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 150,
					"analyst" : 152.67,
					"opskins" : 136
				},
				2 : {
					"market" : 82.98,
					"analyst" : 82.4,
					"opskins" : 94
				},
				1 : {
					"market" : 95.36,
					"analyst" : 82.86,
					"opskins" : 74.99
				},
				0 : {
					"market" : 114.19,
					"analyst" : 89.44,
					"opskins" : 80.45
				}
			},
			"souvenir" : {}
		}
	},
	"610" : {
		"item_id" : 610,
		"type" : "★ M9 Bayonet",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 210.77,
					"analyst" : 211.8,
					"opskins" : 180
				},
				3 : {
					"market" : 225.87,
					"analyst" : 259.34,
					"opskins" : 227.5
				}
			},
			"stattrak" : {
				4 : {
					"market" : 324.07,
					"analyst" : 357.7,
					"opskins" : 279
				},
				3 : {
					"market" : 310.5,
					"analyst" : 500,
					"opskins" : 395.01
				}
			},
			"souvenir" : {}
		}
	},
	"612" : {
		"item_id" : 612,
		"type" : "★ M9 Bayonet",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 182.75,
					"analyst" : 187.62,
					"opskins" : 179.98
				},
				3 : {
					"market" : 124.98,
					"analyst" : 124.77,
					"opskins" : 102.95
				},
				2 : {
					"market" : 112.31,
					"analyst" : 112.55,
					"opskins" : 91.79
				},
				1 : {
					"market" : 109.64,
					"analyst" : 104.86,
					"opskins" : 87.94
				},
				0 : {
					"market" : 102.62,
					"analyst" : 100.79,
					"opskins" : 87.21
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 500,
					"opskins" : 399.99
				},
				3 : {
					"market" : 237.15,
					"analyst" : 225.97,
					"opskins" : 171.51
				},
				2 : {
					"market" : 162,
					"analyst" : 170.73,
					"opskins" : 158.95
				},
				1 : {
					"market" : 158.87,
					"analyst" : 154.97,
					"opskins" : 130
				},
				0 : {
					"market" : 160,
					"analyst" : 149.82,
					"opskins" : 126.11
				}
			},
			"souvenir" : {}
		}
	},
	"614" : {
		"item_id" : 614,
		"type" : "★ M9 Bayonet",
		"skinName" : "Blue Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 169.53,
					"analyst" : 180.19,
					"opskins" : 157.5
				},
				3 : {
					"market" : 116,
					"analyst" : 115.92,
					"opskins" : 97.76
				},
				2 : {
					"market" : 98.53,
					"analyst" : 102.82,
					"opskins" : 92.39
				},
				1 : {
					"market" : 99.85,
					"analyst" : 100.24,
					"opskins" : 86.98
				},
				0 : {
					"market" : 107.24,
					"analyst" : 103.42,
					"opskins" : 89.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 525,
					"opskins" : 500
				},
				3 : {
					"market" : 208.93,
					"analyst" : 192.58,
					"opskins" : 154.9
				},
				2 : {
					"market" : 128.65,
					"analyst" : 138.68,
					"opskins" : 109.99
				},
				1 : {
					"market" : 128.3,
					"analyst" : 158.77,
					"opskins" : 118.5
				},
				0 : {
					"market" : 183.63,
					"analyst" : 127.48,
					"opskins" : 110.1
				}
			},
			"souvenir" : {}
		}
	},
	"617" : {
		"item_id" : 617,
		"type" : "★ Karambit",
		"skinName" : "Bright Water",
		"prices" : {
			"default" : {
				4 : {
					"market" : 203.43,
					"analyst" : 191.56,
					"opskins" : 165
				},
				3 : {
					"market" : 185.42,
					"analyst" : 162.92,
					"opskins" : 140.34
				},
				2 : {
					"market" : 143.9,
					"analyst" : 134.56,
					"opskins" : 124.55
				},
				1 : {
					"market" : 138,
					"analyst" : 137.16,
					"opskins" : 135
				},
				0 : {
					"market" : 149.43,
					"analyst" : 116.95,
					"opskins" : 121.07
				}
			},
			"stattrak" : {
				4 : {
					"market" : 300,
					"analyst" : 341,
					"opskins" : 300
				},
				3 : {
					"market" : 307.25,
					"analyst" : 269.28,
					"opskins" : 221.98
				},
				2 : {
					"market" : 171.37,
					"analyst" : 162.15,
					"opskins" : 154.49
				},
				1 : {
					"market" : 197.42,
					"analyst" : 134,
					"opskins" : 146.84
				}
			},
			"souvenir" : {}
		}
	},
	"618" : {
		"item_id" : 618,
		"type" : "★ Karambit",
		"skinName" : "Autotronic",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 563,
					"opskins" : 670
				},
				3 : {
					"market" : 381.4,
					"analyst" : 387,
					"opskins" : 388.42
				},
				2 : {
					"market" : 329.75,
					"analyst" : 319.07,
					"opskins" : 275
				},
				1 : {
					"market" : 345,
					"analyst" : 271,
					"opskins" : 290
				},
				0 : {
					"market" : 280.22,
					"analyst" : 270.54,
					"opskins" : 228.6
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : -1,
					"analyst" : 422,
					"opskins" : 410
				},
				2 : {
					"market" : 408.13,
					"analyst" : 334,
					"opskins" : 355
				},
				1 : {
					"market" : 386,
					"analyst" : -1,
					"opskins" : 319
				},
				0 : {
					"market" : 388.02,
					"analyst" : 372.13,
					"opskins" : 372
				}
			},
			"souvenir" : {}
		}
	},
	"619" : {
		"item_id" : 619,
		"type" : "★ Karambit",
		"skinName" : "Black Laminate",
		"prices" : {
			"default" : {
				4 : {
					"market" : 386,
					"analyst" : 368,
					"opskins" : 379.94
				},
				3 : {
					"market" : 261.93,
					"analyst" : 267.39,
					"opskins" : 229.99
				},
				2 : {
					"market" : 201.3,
					"analyst" : 211.88,
					"opskins" : 185.88
				},
				1 : {
					"market" : 209.19,
					"analyst" : 191.09,
					"opskins" : 174.95
				},
				0 : {
					"market" : 211.89,
					"analyst" : 203.92,
					"opskins" : 172.88
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 999
				},
				3 : {
					"market" : 350.37,
					"analyst" : 341,
					"opskins" : 380
				},
				2 : {
					"market" : 337.3,
					"analyst" : 291,
					"opskins" : 299
				},
				1 : {
					"market" : 296.5,
					"analyst" : 290.59,
					"opskins" : 269.8
				},
				0 : {
					"market" : 299.99,
					"analyst" : 219,
					"opskins" : 229
				}
			},
			"souvenir" : {}
		}
	},
	"620" : {
		"item_id" : 620,
		"type" : "★ Karambit",
		"skinName" : "Lore",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 915,
					"opskins" : 960
				},
				3 : {
					"market" : -1,
					"analyst" : 570,
					"opskins" : 588.88
				},
				2 : {
					"market" : 378.29,
					"analyst" : 346,
					"opskins" : 354
				},
				1 : {
					"market" : 354.28,
					"analyst" : 365.38,
					"opskins" : 334.89
				},
				0 : {
					"market" : 269.25,
					"analyst" : 266.47,
					"opskins" : 220.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 189.6,
					"opskins" : 1329.99
				},
				3 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 714.89
				},
				2 : {
					"market" : -1,
					"analyst" : 475,
					"opskins" : 465
				},
				0 : {
					"market" : 373,
					"analyst" : -1,
					"opskins" : 289.78
				},
				1 : {
					"market" : 399,
					"analyst" : -1,
					"opskins" : -1
				}
			},
			"souvenir" : {}
		}
	},
	"621" : {
		"item_id" : 621,
		"type" : "★ Karambit",
		"skinName" : "Freehand",
		"prices" : {
			"default" : {
				4 : {
					"market" : 336.29,
					"analyst" : 366.87,
					"opskins" : 289
				},
				3 : {
					"market" : 294,
					"analyst" : 290.52,
					"opskins" : 248
				},
				2 : {
					"market" : 229.83,
					"analyst" : 215.61,
					"opskins" : 187.76
				},
				1 : {
					"market" : 230,
					"analyst" : 222.86,
					"opskins" : 195
				},
				0 : {
					"market" : 341.6,
					"analyst" : 203.87,
					"opskins" : 187.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : 347.61,
					"analyst" : -1,
					"opskins" : 415
				},
				3 : {
					"market" : 402.19,
					"analyst" : 345,
					"opskins" : 345.8
				},
				2 : {
					"market" : 291.9,
					"analyst" : 338.71,
					"opskins" : 300
				},
				1 : {
					"market" : 395.45,
					"analyst" : -1,
					"opskins" : 273.68
				}
			},
			"souvenir" : {}
		}
	},
	"622" : {
		"item_id" : 622,
		"type" : "★ Karambit",
		"skinName" : "Gamma Doppler",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 508,
					"opskins" : 465
				},
				3 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 500
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 764,
					"opskins" : 838
				},
				3 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 569.99
				}
			},
			"souvenir" : {}
		}
	},
	"623" : {
		"item_id" : 623,
		"type" : "★ Karambit",
		"skinName" : "Doppler",
		"prices" : {
			"default" : {
				4 : {
					"market" : 266.27,
					"analyst" : 287.59,
					"opskins" : 236
				},
				3 : {
					"market" : 310.31,
					"analyst" : 284.6,
					"opskins" : 248.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : 407.39,
					"analyst" : 337,
					"opskins" : 318.99
				},
				3 : {
					"market" : 412.43,
					"analyst" : 292,
					"opskins" : 1999.99
				}
			},
			"souvenir" : {}
		}
	},
	"624" : {
		"item_id" : 624,
		"type" : "★ Karambit",
		"skinName" : "Rust Coat",
		"prices" : {
			"default" : {
				1 : {
					"market" : 139.15,
					"analyst" : 138.73,
					"opskins" : 115
				},
				0 : {
					"market" : 117.77,
					"analyst" : 116.71,
					"opskins" : 105
				}
			},
			"stattrak" : {
				1 : {
					"market" : 400,
					"analyst" : 303,
					"opskins" : 499
				},
				0 : {
					"market" : 174.99,
					"analyst" : 163.47,
					"opskins" : 137.48
				}
			},
			"souvenir" : {}
		}
	},
	"625" : {
		"item_id" : 625,
		"type" : "★ Karambit",
		"skinName" : "Marble Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 360,
					"analyst" : 384,
					"opskins" : 385
				},
				3 : {
					"market" : 379.45,
					"analyst" : 348,
					"opskins" : 364.99
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 603,
					"opskins" : 462.99
				},
				3 : {
					"market" : -1,
					"analyst" : 453,
					"opskins" : 469
				}
			},
			"souvenir" : {}
		}
	},
	"626" : {
		"item_id" : 626,
		"type" : "★ Karambit",
		"skinName" : "Damascus Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 225,
					"analyst" : 231.79,
					"opskins" : 184.99
				},
				3 : {
					"market" : 197.06,
					"analyst" : 190.56,
					"opskins" : 155
				},
				2 : {
					"market" : 157.87,
					"analyst" : 162.95,
					"opskins" : 138.5
				},
				1 : {
					"market" : 174.81,
					"analyst" : 172.9,
					"opskins" : 141.79
				},
				0 : {
					"market" : 166.34,
					"analyst" : 167.41,
					"opskins" : 138
				}
			},
			"stattrak" : {
				4 : {
					"market" : 381.36,
					"analyst" : 397.75,
					"opskins" : 299.99
				},
				3 : {
					"market" : 282.94,
					"analyst" : 308.73,
					"opskins" : 237.69
				},
				2 : {
					"market" : 183.04,
					"analyst" : 212.08,
					"opskins" : 164.99
				},
				1 : {
					"market" : 305,
					"analyst" : 276.76,
					"opskins" : 257.99
				},
				0 : {
					"market" : 378.99,
					"analyst" : 243,
					"opskins" : -1
				}
			},
			"souvenir" : {}
		}
	},
	"627" : {
		"item_id" : 627,
		"type" : "★ Karambit",
		"skinName" : "Tiger Tooth",
		"prices" : {
			"default" : {
				4 : {
					"market" : 381.31,
					"analyst" : 328,
					"opskins" : 323
				},
				3 : {
					"market" : 400.23,
					"analyst" : 316,
					"opskins" : 336
				}
			},
			"stattrak" : {
				4 : {
					"market" : 404.46,
					"analyst" : 403,
					"opskins" : 405
				},
				3 : {
					"market" : -1,
					"analyst" : 528,
					"opskins" : 597.5
				}
			},
			"souvenir" : {}
		}
	},
	"629" : {
		"item_id" : 629,
		"type" : "★ Karambit",
		"skinName" : "Urban Masked",
		"prices" : {
			"default" : {
				4 : {
					"market" : 399,
					"analyst" : 332,
					"opskins" : -1
				},
				3 : {
					"market" : 110.65,
					"analyst" : 116.12,
					"opskins" : 100
				},
				2 : {
					"market" : 91,
					"analyst" : 91.01,
					"opskins" : 81.59
				},
				1 : {
					"market" : 92,
					"analyst" : 94.33,
					"opskins" : 81.89
				},
				0 : {
					"market" : 92,
					"analyst" : 85.48,
					"opskins" : 76.75
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 290.56,
					"analyst" : 217.49,
					"opskins" : 175.91
				},
				2 : {
					"market" : 124.96,
					"analyst" : 126.48,
					"opskins" : 110
				},
				1 : {
					"market" : 146.3,
					"analyst" : 175.74,
					"opskins" : 134.99
				},
				0 : {
					"market" : 156.53,
					"analyst" : 112.01,
					"opskins" : 98.81
				}
			},
			"souvenir" : {}
		}
	},
	"630" : {
		"item_id" : 630,
		"type" : "★ Karambit",
		"skinName" : "Stained",
		"prices" : {
			"default" : {
				4 : {
					"market" : 256.72,
					"analyst" : 244.47,
					"opskins" : 238.99
				},
				3 : {
					"market" : 134,
					"analyst" : 146.12,
					"opskins" : 122.39
				},
				2 : {
					"market" : 130.31,
					"analyst" : 131.36,
					"opskins" : 109.97
				},
				1 : {
					"market" : 126.7,
					"analyst" : 129.66,
					"opskins" : 106.94
				},
				0 : {
					"market" : 126.51,
					"analyst" : 115.04,
					"opskins" : 97.5
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 573,
					"opskins" : 484.99
				},
				3 : {
					"market" : 200,
					"analyst" : 186.09,
					"opskins" : 183.93
				},
				2 : {
					"market" : 217.19,
					"analyst" : 166.92,
					"opskins" : 130
				},
				1 : {
					"market" : 176.93,
					"analyst" : 164.14,
					"opskins" : 131.99
				},
				0 : {
					"market" : 166.37,
					"analyst" : 148.01,
					"opskins" : 141.8
				}
			},
			"souvenir" : {}
		}
	},
	"632" : {
		"item_id" : 632,
		"type" : "★ Karambit",
		"skinName" : "Scorched",
		"prices" : {
			"default" : {
				4 : {
					"market" : 413.01,
					"analyst" : 261,
					"opskins" : 299
				},
				3 : {
					"market" : 108.5,
					"analyst" : 103.38,
					"opskins" : 90.25
				},
				2 : {
					"market" : 89.7,
					"analyst" : 87.1,
					"opskins" : 76.69
				},
				1 : {
					"market" : 90.06,
					"analyst" : 91.3,
					"opskins" : 79.09
				},
				0 : {
					"market" : 87.82,
					"analyst" : 84.2,
					"opskins" : 74.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 187.52,
					"analyst" : 182.36,
					"opskins" : 137
				},
				2 : {
					"market" : 126.04,
					"analyst" : 118.83,
					"opskins" : 99.97
				},
				1 : {
					"market" : 182.75,
					"analyst" : 130.73,
					"opskins" : 117.6
				},
				0 : {
					"market" : 132.97,
					"analyst" : 124.09,
					"opskins" : 99.99
				}
			},
			"souvenir" : {}
		}
	},
	"633" : {
		"item_id" : 633,
		"type" : "★ Karambit",
		"skinName" : "Safari Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 292.28,
					"analyst" : 273.09,
					"opskins" : 245
				},
				3 : {
					"market" : 109.14,
					"analyst" : 96.52,
					"opskins" : 81.55
				},
				2 : {
					"market" : 86.18,
					"analyst" : 84.36,
					"opskins" : 72.5
				},
				1 : {
					"market" : 87.95,
					"analyst" : 85.57,
					"opskins" : 75.99
				},
				0 : {
					"market" : 86.59,
					"analyst" : 83.11,
					"opskins" : 75.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 147.9,
					"analyst" : 118.49,
					"opskins" : 118.49
				},
				2 : {
					"market" : 105,
					"analyst" : 105.03,
					"opskins" : 95
				},
				1 : {
					"market" : 233.95,
					"analyst" : -1,
					"opskins" : 111.84
				},
				0 : {
					"market" : 140.44,
					"analyst" : 109.23,
					"opskins" : 136.31
				}
			},
			"souvenir" : {}
		}
	},
	"634" : {
		"item_id" : 634,
		"type" : "★ Karambit",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 794,
					"opskins" : 1400
				},
				3 : {
					"market" : 184.97,
					"analyst" : 180.82,
					"opskins" : 154.39
				},
				2 : {
					"market" : 125,
					"analyst" : 128.33,
					"opskins" : 106.97
				},
				1 : {
					"market" : 127.14,
					"analyst" : 132.04,
					"opskins" : 107
				},
				0 : {
					"market" : 126.5,
					"analyst" : 116.73,
					"opskins" : 99.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 345.01,
					"analyst" : 288.32,
					"opskins" : 239.99
				},
				2 : {
					"market" : 185.18,
					"analyst" : 177.21,
					"opskins" : 142.96
				},
				1 : {
					"market" : 240.86,
					"analyst" : 219.44,
					"opskins" : 188.99
				},
				0 : {
					"market" : 169.53,
					"analyst" : 163.49,
					"opskins" : 140
				}
			},
			"souvenir" : {}
		}
	},
	"636" : {
		"item_id" : 636,
		"type" : "★ Karambit",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 402.19,
					"analyst" : 366,
					"opskins" : 355
				},
				3 : {
					"market" : 365.64,
					"analyst" : 335,
					"opskins" : 352
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 527,
					"opskins" : 459
				},
				3 : {
					"market" : -1,
					"analyst" : 490,
					"opskins" : 310
				}
			},
			"souvenir" : {}
		}
	},
	"637" : {
		"item_id" : 637,
		"type" : "★ Karambit",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 1231,
					"opskins" : 1473.68
				},
				3 : {
					"market" : 394.36,
					"analyst" : 340,
					"opskins" : 338.99
				},
				2 : {
					"market" : 200.76,
					"analyst" : 196.81,
					"opskins" : 158.93
				},
				1 : {
					"market" : 186.95,
					"analyst" : 201.84,
					"opskins" : 159.98
				},
				0 : {
					"market" : 132.43,
					"analyst" : 145.37,
					"opskins" : 116.94
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : -1,
					"analyst" : 372,
					"opskins" : 499
				},
				2 : {
					"market" : 309.7,
					"analyst" : 303.36,
					"opskins" : 232.99
				},
				1 : {
					"market" : 300,
					"analyst" : 212,
					"opskins" : 279.99
				},
				0 : {
					"market" : 264.86,
					"analyst" : 207.72,
					"opskins" : 211.07
				}
			},
			"souvenir" : {}
		}
	},
	"645" : {
		"item_id" : 645,
		"type" : "★ Butterfly Knife",
		"skinName" : "Urban Masked",
		"prices" : {
			"default" : {
				4 : {
					"market" : 226,
					"analyst" : 180.77,
					"opskins" : 124.98
				},
				3 : {
					"market" : 71.5,
					"analyst" : 68.42,
					"opskins" : 59.18
				},
				2 : {
					"market" : 54.05,
					"analyst" : 54.5,
					"opskins" : 48.29
				},
				1 : {
					"market" : 54.97,
					"analyst" : 54.95,
					"opskins" : 48.3
				},
				0 : {
					"market" : 51.17,
					"analyst" : 51.28,
					"opskins" : 47
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 117.25,
					"analyst" : 112.36,
					"opskins" : 93.23
				},
				2 : {
					"market" : 85.28,
					"analyst" : 74.69,
					"opskins" : 64
				},
				1 : {
					"market" : 77.19,
					"analyst" : 73.05,
					"opskins" : 66.99
				},
				0 : {
					"market" : 70.99,
					"analyst" : 75.61,
					"opskins" : 57.44
				}
			},
			"souvenir" : {}
		}
	},
	"646" : {
		"item_id" : 646,
		"type" : "★ Butterfly Knife",
		"skinName" : "Scorched",
		"prices" : {
			"default" : {
				4 : {
					"market" : 217.05,
					"analyst" : 179.15,
					"opskins" : 144.44
				},
				3 : {
					"market" : 68.17,
					"analyst" : 66.96,
					"opskins" : 59.5
				},
				2 : {
					"market" : 53.04,
					"analyst" : 53.3,
					"opskins" : 45.5
				},
				1 : {
					"market" : 64.34,
					"analyst" : 56.2,
					"opskins" : 48.39
				},
				0 : {
					"market" : 54.01,
					"analyst" : 49.38,
					"opskins" : 45.4
				}
			},
			"stattrak" : {
				4 : {
					"market" : 353.6,
					"analyst" : 410,
					"opskins" : 299.99
				},
				3 : {
					"market" : 114.94,
					"analyst" : 115.41,
					"opskins" : 87.95
				},
				2 : {
					"market" : 82.24,
					"analyst" : 71.25,
					"opskins" : 62
				},
				1 : {
					"market" : 90,
					"analyst" : 94.22,
					"opskins" : 82.99
				},
				0 : {
					"market" : 81.6,
					"analyst" : 73.13,
					"opskins" : 64.89
				}
			},
			"souvenir" : {}
		}
	},
	"647" : {
		"item_id" : 647,
		"type" : "★ Butterfly Knife",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 360,
					"opskins" : 388
				},
				3 : {
					"market" : 113,
					"analyst" : 112.64,
					"opskins" : 97.79
				},
				2 : {
					"market" : 68.27,
					"analyst" : 71.62,
					"opskins" : 62.98
				},
				1 : {
					"market" : 70,
					"analyst" : 69.29,
					"opskins" : 59.98
				},
				0 : {
					"market" : 57.93,
					"analyst" : 57.88,
					"opskins" : 50.78
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 209.5,
					"analyst" : 200.88,
					"opskins" : 163
				},
				2 : {
					"market" : 103.69,
					"analyst" : 96.71,
					"opskins" : 94.9
				},
				1 : {
					"market" : 116.5,
					"analyst" : 113.02,
					"opskins" : 89
				},
				0 : {
					"market" : 100.05,
					"analyst" : 89.47,
					"opskins" : 129.49
				}
			},
			"souvenir" : {}
		}
	},
	"648" : {
		"item_id" : 648,
		"type" : "★ Flip Knife",
		"skinName" : "Bright Water",
		"prices" : {
			"default" : {
				4 : {
					"market" : 73.21,
					"analyst" : 71.46,
					"opskins" : 69.99
				},
				3 : {
					"market" : 63.59,
					"analyst" : 64.38,
					"opskins" : 56
				},
				2 : {
					"market" : 60.98,
					"analyst" : 56.3,
					"opskins" : 50.99
				},
				1 : {
					"market" : 60.23,
					"analyst" : 58.77,
					"opskins" : 71.5
				},
				0 : {
					"market" : 72.45,
					"analyst" : 49.27,
					"opskins" : 55
				}
			},
			"stattrak" : {
				4 : {
					"market" : 143.01,
					"analyst" : 116.9,
					"opskins" : 130
				},
				3 : {
					"market" : 105.95,
					"analyst" : 87.38,
					"opskins" : 85.89
				},
				2 : {
					"market" : 70.99,
					"analyst" : 71,
					"opskins" : 63
				}
			},
			"souvenir" : {}
		}
	},
	"649" : {
		"item_id" : 649,
		"type" : "★ Flip Knife",
		"skinName" : "Autotronic",
		"prices" : {
			"default" : {
				4 : {
					"market" : 179.69,
					"analyst" : 180.23,
					"opskins" : 179
				},
				3 : {
					"market" : 129.65,
					"analyst" : 131.57,
					"opskins" : 120
				},
				2 : {
					"market" : 101.24,
					"analyst" : 99.95,
					"opskins" : 109.99
				},
				1 : {
					"market" : 97.46,
					"analyst" : 101.88,
					"opskins" : 133.99
				},
				0 : {
					"market" : 117.61,
					"analyst" : 87.63,
					"opskins" : 74.43
				}
			},
			"stattrak" : {
				4 : {
					"market" : 400,
					"analyst" : -1,
					"opskins" : 380
				},
				3 : {
					"market" : 243.66,
					"analyst" : 185.23,
					"opskins" : 175.79
				},
				2 : {
					"market" : 128.8,
					"analyst" : 122.26,
					"opskins" : 120.49
				},
				1 : {
					"market" : 255.67,
					"analyst" : -1,
					"opskins" : 200
				},
				0 : {
					"market" : 114.88,
					"analyst" : 124.68,
					"opskins" : 109.9
				}
			},
			"souvenir" : {}
		}
	},
	"650" : {
		"item_id" : 650,
		"type" : "★ Flip Knife",
		"skinName" : "Black Laminate",
		"prices" : {
			"default" : {
				4 : {
					"market" : 153.61,
					"analyst" : 111.65,
					"opskins" : 158
				},
				3 : {
					"market" : 71.61,
					"analyst" : 67.44,
					"opskins" : 61.22
				},
				2 : {
					"market" : 62.47,
					"analyst" : 62.24,
					"opskins" : 55.38
				},
				1 : {
					"market" : 59.22,
					"analyst" : 61.9,
					"opskins" : 56.66
				},
				0 : {
					"market" : 60.97,
					"analyst" : 57.57,
					"opskins" : 54.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 412.98,
					"analyst" : -1,
					"opskins" : 349.99
				},
				3 : {
					"market" : 120,
					"analyst" : 128.72,
					"opskins" : 128
				},
				2 : {
					"market" : 90.06,
					"analyst" : 90.74,
					"opskins" : 78.45
				},
				1 : {
					"market" : 88.94,
					"analyst" : 92.69,
					"opskins" : 110
				},
				0 : {
					"market" : 126.21,
					"analyst" : 81.37,
					"opskins" : 145.5
				}
			},
			"souvenir" : {}
		}
	},
	"651" : {
		"item_id" : 651,
		"type" : "★ Flip Knife",
		"skinName" : "Lore",
		"prices" : {
			"default" : {
				4 : {
					"market" : 322.38,
					"analyst" : 305.02,
					"opskins" : 258
				},
				3 : {
					"market" : 229.1,
					"analyst" : 184.75,
					"opskins" : 174
				},
				2 : {
					"market" : 146.2,
					"analyst" : 141.09,
					"opskins" : 127.37
				},
				1 : {
					"market" : 147.15,
					"analyst" : 138.82,
					"opskins" : 126.32
				},
				0 : {
					"market" : 101.4,
					"analyst" : 97.15,
					"opskins" : 100
				}
			},
			"stattrak" : {
				4 : {
					"market" : 389.28,
					"analyst" : 402,
					"opskins" : 399.94
				},
				3 : {
					"market" : 261.56,
					"analyst" : 258.99,
					"opskins" : 255.56
				},
				2 : {
					"market" : 207.12,
					"analyst" : 233.4,
					"opskins" : 182.95
				},
				0 : {
					"market" : 240.31,
					"analyst" : -1,
					"opskins" : 160
				}
			},
			"souvenir" : {}
		}
	},
	"652" : {
		"item_id" : 652,
		"type" : "★ Flip Knife",
		"skinName" : "Freehand",
		"prices" : {
			"default" : {
				4 : {
					"market" : 105.94,
					"analyst" : 95.43,
					"opskins" : 90.69
				},
				3 : {
					"market" : 97.83,
					"analyst" : 93.12,
					"opskins" : 83.18
				},
				2 : {
					"market" : 84.98,
					"analyst" : 81.37,
					"opskins" : 74
				},
				1 : {
					"market" : 90,
					"analyst" : 83.64,
					"opskins" : 75.94
				},
				0 : {
					"market" : 116.54,
					"analyst" : 71.97,
					"opskins" : 73
				}
			},
			"stattrak" : {
				4 : {
					"market" : 155.62,
					"analyst" : 194,
					"opskins" : 165.5
				},
				3 : {
					"market" : 119.4,
					"analyst" : 127,
					"opskins" : 144
				},
				2 : {
					"market" : 118.64,
					"analyst" : 109.58,
					"opskins" : 94.99
				},
				1 : {
					"market" : 86.25,
					"analyst" : -1,
					"opskins" : -1
				}
			},
			"souvenir" : {}
		}
	},
	"653" : {
		"item_id" : 653,
		"type" : "★ Flip Knife",
		"skinName" : "Gamma Doppler",
		"prices" : {
			"default" : {
				4 : {
					"market" : 165.18,
					"analyst" : 164.64,
					"opskins" : 144.69
				},
				3 : {
					"market" : 261.3,
					"analyst" : 252.45,
					"opskins" : 240
				}
			},
			"stattrak" : {
				4 : {
					"market" : 298.96,
					"analyst" : 327.41,
					"opskins" : 295
				},
				3 : {
					"market" : 379.99,
					"analyst" : -1,
					"opskins" : 255
				}
			},
			"souvenir" : {}
		}
	},
	"655" : {
		"item_id" : 655,
		"type" : "★ Flip Knife",
		"skinName" : "Rust Coat",
		"prices" : {
			"default" : {
				1 : {
					"market" : 52.03,
					"analyst" : 55.18,
					"opskins" : 55.15
				},
				0 : {
					"market" : 43.59,
					"analyst" : 44.24,
					"opskins" : 36.23
				}
			},
			"stattrak" : {
				1 : {
					"market" : 231.52,
					"analyst" : 132.55,
					"opskins" : 221.99
				},
				0 : {
					"market" : 60,
					"analyst" : 60.43,
					"opskins" : 54.99
				}
			},
			"souvenir" : {}
		}
	},
	"656" : {
		"item_id" : 656,
		"type" : "★ Flip Knife",
		"skinName" : "Marble Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 147.43,
					"analyst" : 145.72,
					"opskins" : 125
				},
				3 : {
					"market" : 180,
					"analyst" : 218.86,
					"opskins" : 161.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 232.24,
					"analyst" : 229.84,
					"opskins" : 185.84
				},
				3 : {
					"market" : 232.96,
					"analyst" : 284,
					"opskins" : -1
				}
			},
			"souvenir" : {}
		}
	},
	"657" : {
		"item_id" : 657,
		"type" : "★ Flip Knife",
		"skinName" : "Damascus Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 63.59,
					"analyst" : 62.86,
					"opskins" : 55.94
				},
				3 : {
					"market" : 60.9,
					"analyst" : 60.05,
					"opskins" : 52.89
				},
				2 : {
					"market" : 48.3,
					"analyst" : 51.12,
					"opskins" : 43.85
				},
				1 : {
					"market" : 51.4,
					"analyst" : 55.99,
					"opskins" : 55
				},
				0 : {
					"market" : 59.96,
					"analyst" : 52.09,
					"opskins" : 44.08
				}
			},
			"stattrak" : {
				4 : {
					"market" : 110,
					"analyst" : 116.42,
					"opskins" : 101.96
				},
				3 : {
					"market" : 92.97,
					"analyst" : 89.76,
					"opskins" : 78.99
				},
				2 : {
					"market" : 67.11,
					"analyst" : 86.53,
					"opskins" : 80.16
				},
				1 : {
					"market" : 92,
					"analyst" : 75.4,
					"opskins" : 64.44
				},
				0 : {
					"market" : 243.66,
					"analyst" : 85.05,
					"opskins" : 70
				}
			},
			"souvenir" : {}
		}
	},
	"658" : {
		"item_id" : 658,
		"type" : "★ Flip Knife",
		"skinName" : "Tiger Tooth",
		"prices" : {
			"default" : {
				4 : {
					"market" : 117.56,
					"analyst" : 117.83,
					"opskins" : 101
				},
				3 : {
					"market" : 143.01,
					"analyst" : 150.21,
					"opskins" : 119.95
				}
			},
			"stattrak" : {
				4 : {
					"market" : 178.6,
					"analyst" : 167.7,
					"opskins" : 139.99
				},
				3 : {
					"market" : 379.99,
					"analyst" : -1,
					"opskins" : 320.5
				}
			},
			"souvenir" : {}
		}
	},
	"659" : {
		"item_id" : 659,
		"type" : "★ Flip Knife",
		"skinName" : "Ultraviolet",
		"prices" : {
			"default" : {
				4 : {
					"market" : 304.58,
					"analyst" : 305.65,
					"opskins" : 235
				},
				3 : {
					"market" : 78.31,
					"analyst" : 83.96,
					"opskins" : 69.94
				},
				2 : {
					"market" : 51.44,
					"analyst" : 51.81,
					"opskins" : 44.44
				},
				1 : {
					"market" : 65.68,
					"analyst" : 53.49,
					"opskins" : 44.49
				},
				0 : {
					"market" : 42.56,
					"analyst" : 43.98,
					"opskins" : 41.88
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 153.61,
					"analyst" : 144.66,
					"opskins" : 123.76
				},
				2 : {
					"market" : 78.94,
					"analyst" : 81.29,
					"opskins" : 67.95
				},
				1 : {
					"market" : 138,
					"analyst" : 95.79,
					"opskins" : 79.92
				},
				0 : {
					"market" : 67.23,
					"analyst" : 62.1,
					"opskins" : 55.59
				}
			},
			"souvenir" : {}
		}
	},
	"660" : {
		"item_id" : 660,
		"type" : "★ Flip Knife",
		"skinName" : "Urban Masked",
		"prices" : {
			"default" : {
				4 : {
					"market" : 182.75,
					"analyst" : -1,
					"opskins" : 100.23
				},
				3 : {
					"market" : 46.6,
					"analyst" : 44.1,
					"opskins" : 40.1
				},
				2 : {
					"market" : 38.14,
					"analyst" : 38.33,
					"opskins" : 33.93
				},
				1 : {
					"market" : 41.31,
					"analyst" : 41.25,
					"opskins" : 36.89
				},
				0 : {
					"market" : 38,
					"analyst" : 37.27,
					"opskins" : 38.93
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 96,
					"opskins" : -1
				},
				3 : {
					"market" : 68.79,
					"analyst" : 69.12,
					"opskins" : 62.25
				},
				2 : {
					"market" : 53.08,
					"analyst" : 49.65,
					"opskins" : 42.84
				},
				1 : {
					"market" : 69.99,
					"analyst" : 66.8,
					"opskins" : 56
				},
				0 : {
					"market" : 54.57,
					"analyst" : 54.14,
					"opskins" : 48.85
				}
			},
			"souvenir" : {}
		}
	},
	"661" : {
		"item_id" : 661,
		"type" : "★ Flip Knife",
		"skinName" : "Stained",
		"prices" : {
			"default" : {
				4 : {
					"market" : 77.24,
					"analyst" : 72.65,
					"opskins" : 99
				},
				3 : {
					"market" : 49.45,
					"analyst" : 48.65,
					"opskins" : 41.95
				},
				2 : {
					"market" : 39.93,
					"analyst" : 43.76,
					"opskins" : 37.76
				},
				1 : {
					"market" : 42.25,
					"analyst" : 43.31,
					"opskins" : 36.89
				},
				0 : {
					"market" : 43.97,
					"analyst" : 42.04,
					"opskins" : 36.28
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 100,
					"opskins" : 480
				},
				3 : {
					"market" : 110,
					"analyst" : 64.23,
					"opskins" : 85
				},
				2 : {
					"market" : 79.81,
					"analyst" : 69.14,
					"opskins" : 57.99
				},
				1 : {
					"market" : 72.07,
					"analyst" : 90.18,
					"opskins" : 60
				},
				0 : {
					"market" : 57.41,
					"analyst" : 56.09,
					"opskins" : 55.47
				}
			},
			"souvenir" : {}
		}
	},
	"663" : {
		"item_id" : 663,
		"type" : "★ Flip Knife",
		"skinName" : "Scorched",
		"prices" : {
			"default" : {
				4 : {
					"market" : 210,
					"analyst" : 134.44,
					"opskins" : 129.89
				},
				3 : {
					"market" : 42,
					"analyst" : 41.78,
					"opskins" : 36
				},
				2 : {
					"market" : 38.65,
					"analyst" : 36.46,
					"opskins" : 32.64
				},
				1 : {
					"market" : 37.08,
					"analyst" : 42.53,
					"opskins" : 35.81
				},
				0 : {
					"market" : 37.5,
					"analyst" : 36.05,
					"opskins" : 32.28
				}
			},
			"stattrak" : {
				4 : {
					"market" : 400,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 83.29,
					"analyst" : 70.33,
					"opskins" : 74.85
				},
				2 : {
					"market" : 54.37,
					"analyst" : 49.94,
					"opskins" : 44.44
				},
				1 : {
					"market" : 61.7,
					"analyst" : 62.93,
					"opskins" : 49
				},
				0 : {
					"market" : 54.67,
					"analyst" : 53.24,
					"opskins" : 47
				}
			},
			"souvenir" : {}
		}
	},
	"664" : {
		"item_id" : 664,
		"type" : "★ Flip Knife",
		"skinName" : "Safari Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 108.45,
					"analyst" : 77.3,
					"opskins" : 199
				},
				3 : {
					"market" : 40.27,
					"analyst" : 38.85,
					"opskins" : 34.24
				},
				2 : {
					"market" : 37.62,
					"analyst" : 35.55,
					"opskins" : 31.59
				},
				1 : {
					"market" : 38.32,
					"analyst" : 36.76,
					"opskins" : 32.93
				},
				0 : {
					"market" : 35.8,
					"analyst" : 34.7,
					"opskins" : 32.79
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 59.8,
					"analyst" : 68.07,
					"opskins" : 55.66
				},
				2 : {
					"market" : 44.98,
					"analyst" : 48.28,
					"opskins" : 46.95
				},
				1 : {
					"market" : 86.08,
					"analyst" : 54.35,
					"opskins" : 46
				},
				0 : {
					"market" : 50.76,
					"analyst" : 48.17,
					"opskins" : 45
				}
			},
			"souvenir" : {}
		}
	},
	"665" : {
		"item_id" : 665,
		"type" : "★ Flip Knife",
		"skinName" : "Night",
		"prices" : {
			"default" : {
				4 : {
					"market" : 407.39,
					"analyst" : 282,
					"opskins" : -1
				},
				3 : {
					"market" : 80,
					"analyst" : 76.27,
					"opskins" : 64.59
				},
				2 : {
					"market" : 44.42,
					"analyst" : 48.27,
					"opskins" : 43.43
				},
				1 : {
					"market" : 46.62,
					"analyst" : 45.72,
					"opskins" : 40.94
				},
				0 : {
					"market" : 40.48,
					"analyst" : 40.01,
					"opskins" : 36.29
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 1722,
					"opskins" : -1
				},
				3 : {
					"market" : 113.5,
					"analyst" : 123.37,
					"opskins" : 97.45
				},
				2 : {
					"market" : 73.02,
					"analyst" : 69.85,
					"opskins" : 59.88
				},
				1 : {
					"market" : 146.2,
					"analyst" : 87.43,
					"opskins" : 73
				},
				0 : {
					"market" : 63.66,
					"analyst" : 71.76,
					"opskins" : 63.99
				}
			},
			"souvenir" : {}
		}
	},
	"670" : {
		"item_id" : 670,
		"type" : "★ Flip Knife",
		"skinName" : "Boreal Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 95.35,
					"analyst" : 78.22,
					"opskins" : 80.89
				},
				3 : {
					"market" : 44.25,
					"analyst" : 43.45,
					"opskins" : 39.76
				},
				2 : {
					"market" : 35.71,
					"analyst" : 38.25,
					"opskins" : 32
				},
				1 : {
					"market" : 45.79,
					"analyst" : 40.99,
					"opskins" : 35.4
				},
				0 : {
					"market" : 35.33,
					"analyst" : 36.02,
					"opskins" : 31.4
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 64.9,
					"analyst" : 61.81,
					"opskins" : 73.89
				},
				2 : {
					"market" : 55.75,
					"analyst" : 52.24,
					"opskins" : 53.59
				},
				1 : {
					"market" : 61.45,
					"analyst" : 54.28,
					"opskins" : 48
				},
				0 : {
					"market" : 63.59,
					"analyst" : 46.31,
					"opskins" : 84.99
				}
			},
			"souvenir" : {}
		}
	},
	"671" : {
		"item_id" : 671,
		"type" : "★ Flip Knife",
		"skinName" : "Blue Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 111.24,
					"analyst" : 85.5,
					"opskins" : 74.95
				},
				3 : {
					"market" : 53.49,
					"analyst" : 53.89,
					"opskins" : 46.52
				},
				2 : {
					"market" : 49.03,
					"analyst" : 48.9,
					"opskins" : 42.45
				},
				1 : {
					"market" : 49,
					"analyst" : 47.97,
					"opskins" : 41.89
				},
				0 : {
					"market" : 48.19,
					"analyst" : 50.77,
					"opskins" : 43.3
				}
			},
			"stattrak" : {
				4 : {
					"market" : 210.46,
					"analyst" : -1,
					"opskins" : 146
				},
				3 : {
					"market" : 92.59,
					"analyst" : 87.15,
					"opskins" : 77
				},
				2 : {
					"market" : 82.04,
					"analyst" : 85.25,
					"opskins" : 72.46
				},
				1 : {
					"market" : 79.44,
					"analyst" : 68.44,
					"opskins" : 59.95
				},
				0 : {
					"market" : 78.52,
					"analyst" : 75.32,
					"opskins" : 63.96
				}
			},
			"souvenir" : {}
		}
	},
	"674" : {
		"item_id" : 674,
		"type" : "★ Huntsman Knife",
		"skinName" : "Safari Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 126.08,
					"analyst" : 117.37,
					"opskins" : 122.07
				},
				3 : {
					"market" : 48.18,
					"analyst" : 44.71,
					"opskins" : 38.15
				},
				2 : {
					"market" : 36.98,
					"analyst" : 37.52,
					"opskins" : 32.95
				},
				1 : {
					"market" : 38.43,
					"analyst" : 38.64,
					"opskins" : 33.58
				},
				0 : {
					"market" : 35.81,
					"analyst" : 37.65,
					"opskins" : 32.8
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 105.95,
					"analyst" : 77.95,
					"opskins" : 76.67
				},
				2 : {
					"market" : 61.72,
					"analyst" : 57.18,
					"opskins" : 48.4
				},
				1 : {
					"market" : 63.59,
					"analyst" : 55.28,
					"opskins" : 48.08
				},
				0 : {
					"market" : 57.29,
					"analyst" : 60.27,
					"opskins" : 55
				}
			},
			"souvenir" : {}
		}
	},
	"675" : {
		"item_id" : 675,
		"type" : "★ Huntsman Knife",
		"skinName" : "Crimson Web",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 492,
					"opskins" : 559.99
				},
				3 : {
					"market" : 155.4,
					"analyst" : 140.53,
					"opskins" : 115.85
				},
				2 : {
					"market" : 68.82,
					"analyst" : 71.87,
					"opskins" : 62.55
				},
				1 : {
					"market" : 70.15,
					"analyst" : 78.48,
					"opskins" : 63.57
				},
				0 : {
					"market" : 58.48,
					"analyst" : 60.84,
					"opskins" : 57.3
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 344.95,
					"analyst" : 366.91,
					"opskins" : 294.99
				},
				2 : {
					"market" : 107.45,
					"analyst" : 100.31,
					"opskins" : 94.7
				},
				1 : {
					"market" : 258.75,
					"analyst" : 113.56,
					"opskins" : 94.94
				},
				0 : {
					"market" : 242.67,
					"analyst" : 76.61,
					"opskins" : 88.88
				}
			},
			"souvenir" : {}
		}
	},
	"677" : {
		"item_id" : 677,
		"type" : "★ Huntsman Knife",
		"skinName" : "Boreal Forest",
		"prices" : {
			"default" : {
				4 : {
					"market" : 168.06,
					"analyst" : 162.91,
					"opskins" : 136.03
				},
				3 : {
					"market" : 50.5,
					"analyst" : 51.07,
					"opskins" : 45.5
				},
				2 : {
					"market" : 37.62,
					"analyst" : 40.13,
					"opskins" : 34.99
				},
				1 : {
					"market" : 41.55,
					"analyst" : 40.04,
					"opskins" : 36.64
				},
				0 : {
					"market" : 38.99,
					"analyst" : 38.24,
					"opskins" : 36.11
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 700,
					"opskins" : -1
				},
				3 : {
					"market" : 98.76,
					"analyst" : 96.85,
					"opskins" : 93.99
				},
				2 : {
					"market" : 57.2,
					"analyst" : 53.29,
					"opskins" : 49.89
				},
				1 : {
					"market" : 74.68,
					"analyst" : 63.53,
					"opskins" : 58.22
				},
				0 : {
					"market" : 46.29,
					"analyst" : 66.91,
					"opskins" : 51
				}
			},
			"souvenir" : {}
		}
	},
	"679" : {
		"item_id" : 679,
		"type" : "★ Shadow Daggers",
		"skinName" : "Blue Steel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 97.46,
					"analyst" : 79.63,
					"opskins" : 69.43
				},
				3 : {
					"market" : 46.55,
					"analyst" : 44.07,
					"opskins" : 38.75
				},
				2 : {
					"market" : 42.87,
					"analyst" : 39.42,
					"opskins" : 34.5
				},
				1 : {
					"market" : 41.32,
					"analyst" : 39.18,
					"opskins" : 34.95
				},
				0 : {
					"market" : 41.65,
					"analyst" : 38.7,
					"opskins" : 35.9
				}
			},
			"stattrak" : {
				4 : {
					"market" : 407.39,
					"analyst" : 295,
					"opskins" : 268
				},
				3 : {
					"market" : 95.35,
					"analyst" : 82.13,
					"opskins" : 78.88
				},
				2 : {
					"market" : 58,
					"analyst" : 57.61,
					"opskins" : 52.21
				},
				1 : {
					"market" : 65.16,
					"analyst" : 64.07,
					"opskins" : 61.62
				},
				0 : {
					"market" : 55.89,
					"analyst" : 65.13,
					"opskins" : 65.31
				}
			},
			"souvenir" : {}
		}
	},
	"680" : {
		"item_id" : 680,
		"type" : "★ Shadow Daggers",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 96.14,
					"analyst" : 105.39,
					"opskins" : 89.85
				},
				3 : {
					"market" : 53.5,
					"analyst" : 57.21,
					"opskins" : 50.27
				},
				2 : {
					"market" : 50.4,
					"analyst" : 48.94,
					"opskins" : 41.94
				},
				1 : {
					"market" : 48.94,
					"analyst" : 46.22,
					"opskins" : 38.98
				},
				0 : {
					"market" : 46.38,
					"analyst" : 44.27,
					"opskins" : 41.65
				}
			},
			"stattrak" : {
				4 : {
					"market" : 347.82,
					"analyst" : -1,
					"opskins" : 234.49
				},
				3 : {
					"market" : 100.65,
					"analyst" : 119.97,
					"opskins" : 94.99
				},
				2 : {
					"market" : 86.87,
					"analyst" : 85.73,
					"opskins" : 101.99
				},
				1 : {
					"market" : 100.65,
					"analyst" : 82.88,
					"opskins" : 80
				},
				0 : {
					"market" : 112.43,
					"analyst" : 81.17,
					"opskins" : 111.33
				}
			},
			"souvenir" : {}
		}
	},
	"681" : {
		"item_id" : 681,
		"type" : "★ Shadow Daggers",
		"skinName" : "Fade",
		"prices" : {
			"default" : {
				4 : {
					"market" : 84.77,
					"analyst" : 90.11,
					"opskins" : 78.78
				},
				3 : {
					"market" : 124.11,
					"analyst" : 104.47,
					"opskins" : 91.05
				}
			},
			"stattrak" : {
				4 : {
					"market" : 181.5,
					"analyst" : 162.17,
					"opskins" : 143.72
				},
				3 : {
					"market" : 387.34,
					"analyst" : -1,
					"opskins" : 279.99
				}
			},
			"souvenir" : {}
		}
	},
	"682" : {
		"item_id" : 682,
		"type" : "★ Shadow Daggers",
		"skinName" : "Safari Mesh",
		"prices" : {
			"default" : {
				4 : {
					"market" : 137.46,
					"analyst" : -1,
					"opskins" : 100
				},
				3 : {
					"market" : 33.99,
					"analyst" : 33.6,
					"opskins" : 30.5
				},
				2 : {
					"market" : 30.72,
					"analyst" : 30.98,
					"opskins" : 27.5
				},
				1 : {
					"market" : 32.24,
					"analyst" : 30.72,
					"opskins" : 27.99
				},
				0 : {
					"market" : 31.25,
					"analyst" : 30.11,
					"opskins" : 29.56
				}
			},
			"stattrak" : {
				4 : {
					"market" : 345,
					"analyst" : 183,
					"opskins" : -1
				},
				3 : {
					"market" : 103.01,
					"analyst" : 58.99,
					"opskins" : 61.79
				},
				2 : {
					"market" : 44.51,
					"analyst" : 43.16,
					"opskins" : 39.9
				},
				1 : {
					"market" : 60.06,
					"analyst" : 59.34,
					"opskins" : 52.98
				},
				0 : {
					"market" : 48.87,
					"analyst" : 50.68,
					"opskins" : 47.26
				}
			},
			"souvenir" : {}
		}
	},
	"683" : {
		"item_id" : 683,
		"type" : "★ Shadow Daggers",
		"skinName" : "Slaughter",
		"prices" : {
			"default" : {
				4 : {
					"market" : 73.09,
					"analyst" : 77.75,
					"opskins" : 65.89
				},
				3 : {
					"market" : 66.36,
					"analyst" : 68.82,
					"opskins" : 60.3
				},
				2 : {
					"market" : 63.27,
					"analyst" : 62.03,
					"opskins" : 59.8
				}
			},
			"stattrak" : {
				4 : {
					"market" : 173.62,
					"analyst" : 136.64,
					"opskins" : 107.88
				},
				3 : {
					"market" : 106.91,
					"analyst" : 116.78,
					"opskins" : 93.49
				},
				2 : {
					"market" : 116.54,
					"analyst" : 152.81,
					"opskins" : 99
				}
			},
			"souvenir" : {}
		}
	},
	"684" : {
		"item_id" : 684,
		"type" : "★ Shadow Daggers",
		"skinName" : "Stained",
		"prices" : {
			"default" : {
				4 : {
					"market" : 69.36,
					"analyst" : 78.68,
					"opskins" : 94.9
				},
				3 : {
					"market" : 38.41,
					"analyst" : 37.69,
					"opskins" : 32.99
				},
				2 : {
					"market" : 37.42,
					"analyst" : 36.65,
					"opskins" : 32.89
				},
				1 : {
					"market" : 35.48,
					"analyst" : 35.27,
					"opskins" : 31.54
				},
				0 : {
					"market" : 36.17,
					"analyst" : 34.4,
					"opskins" : 30.88
				}
			},
			"stattrak" : {
				4 : {
					"market" : 402.93,
					"analyst" : -1,
					"opskins" : 285
				},
				3 : {
					"market" : 71.69,
					"analyst" : 74.36,
					"opskins" : 59.99
				},
				2 : {
					"market" : 59.95,
					"analyst" : 59.32,
					"opskins" : 63.83
				},
				1 : {
					"market" : 66.52,
					"analyst" : 54.42,
					"opskins" : 53
				},
				0 : {
					"market" : 57.11,
					"analyst" : 50.91,
					"opskins" : 61.45
				}
			},
			"souvenir" : {}
		}
	},
	"685" : {
		"item_id" : 685,
		"type" : "M4A1-S",
		"skinName" : "Hyper Beast",
		"prices" : {
			"default" : {
				4 : {
					"market" : 32.11,
					"analyst" : 32.79,
					"opskins" : 30
				},
				3 : {
					"market" : 12.72,
					"analyst" : 13.81,
					"opskins" : 12.36
				},
				2 : {
					"market" : 8.78,
					"analyst" : 9.01,
					"opskins" : 7.83
				},
				1 : {
					"market" : 6.5,
					"analyst" : 7.32,
					"opskins" : 6.39
				},
				0 : {
					"market" : 6.13,
					"analyst" : 6.24,
					"opskins" : 5.49
				}
			},
			"stattrak" : {
				4 : {
					"market" : 176.66,
					"analyst" : 165.22,
					"opskins" : 139.99
				},
				3 : {
					"market" : 38.66,
					"analyst" : 43.02,
					"opskins" : 38.99
				},
				2 : {
					"market" : 23.52,
					"analyst" : 24.36,
					"opskins" : 21.3
				},
				1 : {
					"market" : 17.04,
					"analyst" : 18.81,
					"opskins" : 17.8
				},
				0 : {
					"market" : 14.77,
					"analyst" : 15.82,
					"opskins" : 15.37
				}
			},
			"souvenir" : {}
		}
	},
	"686" : {
		"item_id" : 686,
		"type" : "AK-47",
		"skinName" : "Aquamarine Revenge",
		"prices" : {
			"default" : {
				4 : {
					"market" : 23.85,
					"analyst" : 25.5,
					"opskins" : 23.3
				},
				3 : {
					"market" : 16.44,
					"analyst" : 16.94,
					"opskins" : 15.11
				},
				2 : {
					"market" : 11.98,
					"analyst" : 12.34,
					"opskins" : 10.58
				},
				1 : {
					"market" : 9.74,
					"analyst" : 10.22,
					"opskins" : 9.25
				},
				0 : {
					"market" : 7.91,
					"analyst" : 7.83,
					"opskins" : 6.98
				}
			},
			"stattrak" : {
				4 : {
					"market" : 122.79,
					"analyst" : 121.38,
					"opskins" : 101.85
				},
				3 : {
					"market" : 60.89,
					"analyst" : 59.87,
					"opskins" : 50
				},
				2 : {
					"market" : 40.2,
					"analyst" : 41.58,
					"opskins" : 36.87
				},
				1 : {
					"market" : 29.99,
					"analyst" : 28.46,
					"opskins" : 27.1
				},
				0 : {
					"market" : 19,
					"analyst" : 20.56,
					"opskins" : 19.37
				}
			},
			"souvenir" : {}
		}
	},
	"687" : {
		"item_id" : 687,
		"type" : "M4A4",
		"skinName" : "Asiimov",
		"prices" : {
			"default" : {
				2 : {
					"market" : 29.23,
					"analyst" : 30.55,
					"opskins" : 27
				},
				1 : {
					"market" : 22.58,
					"analyst" : 22.67,
					"opskins" : 20.53
				},
				0 : {
					"market" : 11.69,
					"analyst" : 11.77,
					"opskins" : 10.99
				}
			},
			"stattrak" : {
				2 : {
					"market" : 160.79,
					"analyst" : 161.14,
					"opskins" : 130
				},
				1 : {
					"market" : 91.93,
					"analyst" : 100.61,
					"opskins" : 90
				},
				0 : {
					"market" : 44.46,
					"analyst" : 41.83,
					"opskins" : 40.95
				}
			},
			"souvenir" : {}
		}
	},
	"688" : {
		"item_id" : 688,
		"type" : "M4A1-S",
		"skinName" : "Cyrex",
		"prices" : {
			"default" : {
				4 : {
					"market" : 10.75,
					"analyst" : 11.11,
					"opskins" : 10.06
				},
				3 : {
					"market" : 7.54,
					"analyst" : 8.54,
					"opskins" : 7.69
				},
				2 : {
					"market" : 5.93,
					"analyst" : 6.34,
					"opskins" : 5.75
				},
				1 : {
					"market" : 6.36,
					"analyst" : 6.73,
					"opskins" : 5.99
				},
				0 : {
					"market" : 5.99,
					"analyst" : 5.82,
					"opskins" : 5.8
				}
			},
			"stattrak" : {
				4 : {
					"market" : 47.68,
					"analyst" : 52.1,
					"opskins" : 43.49
				},
				3 : {
					"market" : 29.81,
					"analyst" : 33.76,
					"opskins" : 30.74
				},
				2 : {
					"market" : 18.47,
					"analyst" : 20.15,
					"opskins" : 18.25
				},
				1 : {
					"market" : 21.32,
					"analyst" : 20.79,
					"opskins" : 19.81
				},
				0 : {
					"market" : 18.28,
					"analyst" : 19.3,
					"opskins" : 18.4
				}
			},
			"souvenir" : {}
		}
	},
	"689" : {
		"item_id" : 689,
		"type" : "AK-47",
		"skinName" : "Fire Serpent",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 566,
					"opskins" : 569
				},
				3 : {
					"market" : 214.93,
					"analyst" : 234.46,
					"opskins" : 190
				},
				2 : {
					"market" : 155.74,
					"analyst" : 147.88,
					"opskins" : 129
				},
				1 : {
					"market" : 159.73,
					"analyst" : 143.08,
					"opskins" : 118
				},
				0 : {
					"market" : 88.03,
					"analyst" : 88.15,
					"opskins" : 85
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 2445,
					"opskins" : 2699
				},
				3 : {
					"market" : -1,
					"analyst" : 867,
					"opskins" : 869
				},
				2 : {
					"market" : -1,
					"analyst" : 560,
					"opskins" : 539
				},
				1 : {
					"market" : -1,
					"analyst" : 361,
					"opskins" : 423.98
				},
				0 : {
					"market" : 400,
					"analyst" : 376.73,
					"opskins" : 361.13
				}
			},
			"souvenir" : {}
		}
	},
	"690" : {
		"item_id" : 690,
		"type" : "P90",
		"skinName" : "Asiimov",
		"prices" : {
			"default" : {
				4 : {
					"market" : 12.49,
					"analyst" : 13.42,
					"opskins" : 12.25
				},
				3 : {
					"market" : 6.39,
					"analyst" : 6.46,
					"opskins" : 5.66
				},
				2 : {
					"market" : 3.59,
					"analyst" : 3.98,
					"opskins" : 3.48
				},
				1 : {
					"market" : 3.4,
					"analyst" : 3.6,
					"opskins" : 3.34
				},
				0 : {
					"market" : 2.34,
					"analyst" : 2.42,
					"opskins" : 2.14
				}
			},
			"stattrak" : {
				4 : {
					"market" : 85.7,
					"analyst" : 78.14,
					"opskins" : 62.97
				},
				3 : {
					"market" : 23.03,
					"analyst" : 26.76,
					"opskins" : 25.46
				},
				2 : {
					"market" : 13.7,
					"analyst" : 12.86,
					"opskins" : 11.4
				},
				1 : {
					"market" : 10.38,
					"analyst" : 10.52,
					"opskins" : 9.95
				},
				0 : {
					"market" : 6.03,
					"analyst" : 6.44,
					"opskins" : 6.11
				}
			},
			"souvenir" : {}
		}
	},
	"691" : {
		"item_id" : 691,
		"type" : "M4A4",
		"skinName" : "X-Ray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.23,
					"analyst" : 5.75,
					"opskins" : 5.45
				},
				3 : {
					"market" : 4.25,
					"analyst" : 4.46,
					"opskins" : 4.12
				},
				2 : {
					"market" : 3.68,
					"analyst" : 3.82,
					"opskins" : 3.75
				}
			},
			"stattrak" : {
				4 : {
					"market" : 35.88,
					"analyst" : 38.05,
					"opskins" : 32.87
				},
				3 : {
					"market" : 20.14,
					"analyst" : 20.9,
					"opskins" : 18.6
				},
				2 : {
					"market" : 15.8,
					"analyst" : 14.73,
					"opskins" : 13.84
				}
			},
			"souvenir" : {}
		}
	},
	"692" : {
		"item_id" : 692,
		"type" : "P90",
		"skinName" : "Death by Kitty",
		"prices" : {
			"default" : {
				3 : {
					"market" : 26.5,
					"analyst" : 26.47,
					"opskins" : 26.78
				},
				2 : {
					"market" : 14.85,
					"analyst" : 16.7,
					"opskins" : 15.9
				}
			},
			"stattrak" : {
				3 : {
					"market" : 127.69,
					"analyst" : 150,
					"opskins" : 119.99
				},
				2 : {
					"market" : 57,
					"analyst" : 69.92,
					"opskins" : 56.88
				}
			},
			"souvenir" : {}
		}
	},
	"693" : {
		"item_id" : 693,
		"type" : "AK-47",
		"skinName" : "Vulcan",
		"prices" : {
			"default" : {
				4 : {
					"market" : 43.85,
					"analyst" : 46.26,
					"opskins" : 41.98
				},
				3 : {
					"market" : 26.49,
					"analyst" : 28.84,
					"opskins" : 25.58
				},
				2 : {
					"market" : 17.82,
					"analyst" : 18.09,
					"opskins" : 16.2
				},
				1 : {
					"market" : 14.97,
					"analyst" : 14.99,
					"opskins" : 13.5
				},
				0 : {
					"market" : 8.64,
					"analyst" : 8.85,
					"opskins" : 8.33
				}
			},
			"stattrak" : {
				4 : {
					"market" : 364.46,
					"analyst" : 339.06,
					"opskins" : 275
				},
				3 : {
					"market" : 135.76,
					"analyst" : 134.41,
					"opskins" : 117
				},
				2 : {
					"market" : 63.17,
					"analyst" : 64.63,
					"opskins" : 54.47
				},
				1 : {
					"market" : 45.56,
					"analyst" : 51.99,
					"opskins" : 46.55
				},
				0 : {
					"market" : 23.23,
					"analyst" : 23.81,
					"opskins" : 25.61
				}
			},
			"souvenir" : {}
		}
	},
	"694" : {
		"item_id" : 694,
		"type" : "SSG 08",
		"skinName" : "Blood in the Water",
		"prices" : {
			"default" : {
				4 : {
					"market" : 26.38,
					"analyst" : 28.3,
					"opskins" : 25.15
				},
				3 : {
					"market" : 20.87,
					"analyst" : 19.87,
					"opskins" : 17.79
				},
				2 : {
					"market" : 21.3,
					"analyst" : 19.26,
					"opskins" : 17.63
				}
			},
			"stattrak" : {
				4 : {
					"market" : 255.38,
					"analyst" : 236.01,
					"opskins" : 199
				},
				3 : {
					"market" : 90.99,
					"analyst" : 85,
					"opskins" : 74.87
				},
				2 : {
					"market" : 79.47,
					"analyst" : 76.46,
					"opskins" : 70
				}
			},
			"souvenir" : {}
		}
	},
	"695" : {
		"item_id" : 695,
		"type" : "CZ75-Auto",
		"skinName" : "Victoria",
		"prices" : {
			"default" : {
				4 : {
					"market" : 6.52,
					"analyst" : 7.12,
					"opskins" : 7
				},
				3 : {
					"market" : 3.27,
					"analyst" : 3.5,
					"opskins" : 3.36
				},
				2 : {
					"market" : 2.09,
					"analyst" : 2.15,
					"opskins" : 1.95
				},
				1 : {
					"market" : 3.16,
					"analyst" : 3,
					"opskins" : 2.59
				},
				0 : {
					"market" : 2.27,
					"analyst" : 2.07,
					"opskins" : 1.89
				}
			},
			"stattrak" : {
				4 : {
					"market" : 95.61,
					"analyst" : 100.12,
					"opskins" : 85
				},
				3 : {
					"market" : 50.11,
					"analyst" : 34.46,
					"opskins" : 30.99
				},
				2 : {
					"market" : 19.79,
					"analyst" : 16.45,
					"opskins" : 15
				},
				1 : {
					"market" : 26.5,
					"analyst" : 40.79,
					"opskins" : 34.44
				},
				0 : {
					"market" : 16.07,
					"analyst" : 14.87,
					"opskins" : 50
				}
			},
			"souvenir" : {}
		}
	},
	"697" : {
		"item_id" : 697,
		"type" : "AUG",
		"skinName" : "Akihabara Accept",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 552,
					"opskins" : 525
				},
				3 : {
					"market" : 192.47,
					"analyst" : 158.84,
					"opskins" : 133
				},
				2 : {
					"market" : 57.42,
					"analyst" : 52.39,
					"opskins" : 47.69
				},
				1 : {
					"market" : 35.44,
					"analyst" : 33.63,
					"opskins" : 36
				},
				0 : {
					"market" : 23,
					"analyst" : 24.39,
					"opskins" : 65
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"699" : {
		"item_id" : 699,
		"type" : "P2000",
		"skinName" : "Fire Elemental",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.66,
					"analyst" : 8.51,
					"opskins" : 7.81
				},
				3 : {
					"market" : 5.29,
					"analyst" : 5.49,
					"opskins" : 5.04
				},
				2 : {
					"market" : 3.76,
					"analyst" : 4.28,
					"opskins" : 3.86
				},
				1 : {
					"market" : 5.06,
					"analyst" : 4.95,
					"opskins" : 5.09
				},
				0 : {
					"market" : 3.63,
					"analyst" : 4.01,
					"opskins" : 4.12
				}
			},
			"stattrak" : {
				4 : {
					"market" : 78.94,
					"analyst" : 79.19,
					"opskins" : 68.88
				},
				3 : {
					"market" : 30.3,
					"analyst" : 31.62,
					"opskins" : 28
				},
				2 : {
					"market" : 21.19,
					"analyst" : 24.13,
					"opskins" : 22.75
				},
				1 : {
					"market" : 26,
					"analyst" : 27.5,
					"opskins" : 24.74
				},
				0 : {
					"market" : 24.29,
					"analyst" : 23.14,
					"opskins" : 20.25
				}
			},
			"souvenir" : {}
		}
	},
	"700" : {
		"item_id" : 700,
		"type" : "MAC-10",
		"skinName" : "Neon Rider",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.62,
					"analyst" : 4.51,
					"opskins" : 4.03
				},
				3 : {
					"market" : 2.62,
					"analyst" : 2.7,
					"opskins" : 2.45
				},
				2 : {
					"market" : 1.74,
					"analyst" : 1.67,
					"opskins" : 1.46
				},
				1 : {
					"market" : 1.86,
					"analyst" : 1.73,
					"opskins" : 1.74
				}
			},
			"stattrak" : {
				4 : {
					"market" : 15.73,
					"analyst" : 17.38,
					"opskins" : 15.6
				},
				3 : {
					"market" : 9.68,
					"analyst" : 9.26,
					"opskins" : 8.86
				},
				2 : {
					"market" : 4.4,
					"analyst" : 4.43,
					"opskins" : 4.05
				},
				1 : {
					"market" : 5.32,
					"analyst" : 4.78,
					"opskins" : 5.02
				}
			},
			"souvenir" : {}
		}
	},
	"701" : {
		"item_id" : 701,
		"type" : "AK-47",
		"skinName" : "Wasteland Rebel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 79,
					"analyst" : 73.31,
					"opskins" : 64.28
				},
				3 : {
					"market" : 19.28,
					"analyst" : 20.85,
					"opskins" : 18.76
				},
				2 : {
					"market" : 14.12,
					"analyst" : 14.32,
					"opskins" : 12.75
				},
				1 : {
					"market" : 16.85,
					"analyst" : 16.46,
					"opskins" : 15.12
				},
				0 : {
					"market" : 12.42,
					"analyst" : 12.68,
					"opskins" : 12.03
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 415,
					"opskins" : 459
				},
				3 : {
					"market" : 93.22,
					"analyst" : 96.85,
					"opskins" : 86.69
				},
				2 : {
					"market" : 49.93,
					"analyst" : 50.55,
					"opskins" : 45.99
				},
				1 : {
					"market" : 65.63,
					"analyst" : 64.89,
					"opskins" : 56.95
				},
				0 : {
					"market" : 46.62,
					"analyst" : 46.17,
					"opskins" : 44.59
				}
			},
			"souvenir" : {}
		}
	},
	"702" : {
		"item_id" : 702,
		"type" : "M4A4",
		"skinName" : "Howl",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 664,
					"opskins" : 649.99
				},
				3 : {
					"market" : 405.62,
					"analyst" : 462,
					"opskins" : 467
				},
				2 : {
					"market" : 379.45,
					"analyst" : 424,
					"opskins" : 417
				},
				1 : {
					"market" : -1,
					"analyst" : 388,
					"opskins" : -1
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 1801,
					"opskins" : 1554.99
				},
				3 : {
					"market" : -1,
					"analyst" : 1085,
					"opskins" : 1172.99
				},
				2 : {
					"market" : -1,
					"analyst" : 784,
					"opskins" : 804.49
				},
				1 : {
					"market" : -1,
					"analyst" : 796,
					"opskins" : 793
				}
			},
			"souvenir" : {}
		}
	},
	"703" : {
		"item_id" : 703,
		"type" : "AWP",
		"skinName" : "Hyper Beast",
		"prices" : {
			"default" : {
				4 : {
					"market" : 38.36,
					"analyst" : 40.87,
					"opskins" : 34.99
				},
				3 : {
					"market" : 25.44,
					"analyst" : 26.43,
					"opskins" : 23.97
				},
				2 : {
					"market" : 16.27,
					"analyst" : 18.01,
					"opskins" : 16.11
				},
				1 : {
					"market" : 14.2,
					"analyst" : 14.68,
					"opskins" : 13.2
				},
				0 : {
					"market" : 8.88,
					"analyst" : 9.46,
					"opskins" : 8.85
				}
			},
			"stattrak" : {
				4 : {
					"market" : 183.27,
					"analyst" : 183.77,
					"opskins" : 149
				},
				3 : {
					"market" : 81.79,
					"analyst" : 86.23,
					"opskins" : 73
				},
				2 : {
					"market" : 39.8,
					"analyst" : 50.18,
					"opskins" : 43
				},
				1 : {
					"market" : 34.5,
					"analyst" : 35.6,
					"opskins" : 33.54
				},
				0 : {
					"market" : 25.27,
					"analyst" : 25.35,
					"opskins" : 25
				}
			},
			"souvenir" : {}
		}
	},
	"704" : {
		"item_id" : 704,
		"type" : "AWP",
		"skinName" : "Lightning Strike",
		"prices" : {
			"default" : {
				4 : {
					"market" : 43.43,
					"analyst" : 44.35,
					"opskins" : 38.97
				},
				3 : {
					"market" : 42.33,
					"analyst" : 45.88,
					"opskins" : 41.11
				}
			},
			"stattrak" : {
				4 : {
					"market" : 181.21,
					"analyst" : 179.54,
					"opskins" : 146.99
				},
				3 : {
					"market" : 195.5,
					"analyst" : 188.43,
					"opskins" : 149.99
				}
			},
			"souvenir" : {}
		}
	},
	"705" : {
		"item_id" : 705,
		"type" : "AWP",
		"skinName" : "Asiimov",
		"prices" : {
			"default" : {
				2 : {
					"market" : 24.99,
					"analyst" : 25.71,
					"opskins" : 23.13
				},
				1 : {
					"market" : 18.64,
					"analyst" : 21.27,
					"opskins" : 19.4
				},
				0 : {
					"market" : 16.94,
					"analyst" : 17.28,
					"opskins" : 15.53
				}
			},
			"stattrak" : {
				2 : {
					"market" : 73.09,
					"analyst" : 77.77,
					"opskins" : 64.99
				},
				1 : {
					"market" : 53.52,
					"analyst" : 61.59,
					"opskins" : 53.39
				},
				0 : {
					"market" : 43.85,
					"analyst" : 43.65,
					"opskins" : 37.89
				}
			},
			"souvenir" : {}
		}
	},
	"706" : {
		"item_id" : 706,
		"type" : "AWP",
		"skinName" : "Man-o'-war",
		"prices" : {
			"default" : {
				3 : {
					"market" : 7.32,
					"analyst" : 7.89,
					"opskins" : 6.98
				},
				2 : {
					"market" : 7.02,
					"analyst" : 7.51,
					"opskins" : 7.04
				}
			},
			"stattrak" : {
				3 : {
					"market" : 25.11,
					"analyst" : 25.88,
					"opskins" : 23.88
				},
				2 : {
					"market" : 23.46,
					"analyst" : 24.83,
					"opskins" : 21.95
				}
			},
			"souvenir" : {}
		}
	},
	"707" : {
		"item_id" : 707,
		"type" : "AK-47",
		"skinName" : "Cartel",
		"prices" : {
			"default" : {
				4 : {
					"market" : 4.87,
					"analyst" : 4.47,
					"opskins" : 4.69
				},
				3 : {
					"market" : 2.34,
					"analyst" : 2.21,
					"opskins" : 1.98
				},
				2 : {
					"market" : 1.88,
					"analyst" : 1.85,
					"opskins" : 1.71
				},
				1 : {
					"market" : 3.17,
					"analyst" : 2.94,
					"opskins" : 3.06
				},
				0 : {
					"market" : 2.22,
					"analyst" : 2,
					"opskins" : 1.83
				}
			},
			"stattrak" : {
				4 : {
					"market" : 18.4,
					"analyst" : 19.89,
					"opskins" : 17.3
				},
				3 : {
					"market" : 10.35,
					"analyst" : 11.73,
					"opskins" : 10.5
				},
				2 : {
					"market" : 9.05,
					"analyst" : 8.92,
					"opskins" : 7.55
				},
				1 : {
					"market" : 11.4,
					"analyst" : 11.63,
					"opskins" : 10.4
				},
				0 : {
					"market" : 9.26,
					"analyst" : 9.17,
					"opskins" : 7.98
				}
			},
			"souvenir" : {}
		}
	},
	"709" : {
		"item_id" : 709,
		"type" : "AK-47",
		"skinName" : "Red Laminate",
		"prices" : {
			"default" : {
				4 : {
					"market" : 84.77,
					"analyst" : 78.77,
					"opskins" : 81.4
				},
				3 : {
					"market" : 7.95,
					"analyst" : 9.43,
					"opskins" : 8.73
				},
				2 : {
					"market" : 5.19,
					"analyst" : 5.81,
					"opskins" : 5.49
				},
				1 : {
					"market" : 6.81,
					"analyst" : 6.33,
					"opskins" : 5.86
				},
				0 : {
					"market" : 5.31,
					"analyst" : 5.75,
					"opskins" : 5.62
				}
			},
			"stattrak" : {
				4 : {
					"market" : -1,
					"analyst" : 643,
					"opskins" : 569.98
				},
				3 : {
					"market" : 72.17,
					"analyst" : 51.76,
					"opskins" : 43
				},
				2 : {
					"market" : 25.5,
					"analyst" : 27.54,
					"opskins" : 27.96
				},
				1 : {
					"market" : 28.4,
					"analyst" : 28.27,
					"opskins" : 25.9
				},
				0 : {
					"market" : 28.09,
					"analyst" : 26.61,
					"opskins" : 22.99
				}
			},
			"souvenir" : {}
		}
	},
	"710" : {
		"item_id" : 710,
		"type" : "AWP",
		"skinName" : "Redline",
		"prices" : {
			"default" : {
				3 : {
					"market" : 10.23,
					"analyst" : 11.68,
					"opskins" : 10.44
				},
				2 : {
					"market" : 7.07,
					"analyst" : 7.59,
					"opskins" : 6.77
				},
				1 : {
					"market" : 10.02,
					"analyst" : 10.28,
					"opskins" : 9.84
				}
			},
			"stattrak" : {
				3 : {
					"market" : 40.26,
					"analyst" : 41.14,
					"opskins" : 35.99
				},
				2 : {
					"market" : 22.68,
					"analyst" : 24.12,
					"opskins" : 21.9
				},
				1 : {
					"market" : 31.36,
					"analyst" : 27.51,
					"opskins" : 24.95
				}
			},
			"souvenir" : {}
		}
	},
	"711" : {
		"item_id" : 711,
		"type" : "M4A1-S",
		"skinName" : "Atomic Alloy",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.72,
					"analyst" : 8.55,
					"opskins" : 7.85
				},
				3 : {
					"market" : 3.91,
					"analyst" : 4.19,
					"opskins" : 3.66
				},
				2 : {
					"market" : 2.46,
					"analyst" : 2.52,
					"opskins" : 2.24
				},
				1 : {
					"market" : 2.67,
					"analyst" : 2.77,
					"opskins" : 2.54
				},
				0 : {
					"market" : 2.44,
					"analyst" : 2.49,
					"opskins" : 2.57
				}
			},
			"stattrak" : {
				4 : {
					"market" : 33.19,
					"analyst" : 32.3,
					"opskins" : 28
				},
				3 : {
					"market" : 13.5,
					"analyst" : 14.24,
					"opskins" : 12.79
				},
				2 : {
					"market" : 8.11,
					"analyst" : 8.35,
					"opskins" : 7.53
				},
				1 : {
					"market" : 7.56,
					"analyst" : 8.7,
					"opskins" : 7.65
				},
				0 : {
					"market" : 7.51,
					"analyst" : 7.39,
					"opskins" : 6.85
				}
			},
			"souvenir" : {}
		}
	},
	"712" : {
		"item_id" : 712,
		"type" : "AWP",
		"skinName" : "Graphite",
		"prices" : {
			"default" : {
				4 : {
					"market" : 28.01,
					"analyst" : 29.41,
					"opskins" : 25.71
				},
				3 : {
					"market" : 29.64,
					"analyst" : 29.41,
					"opskins" : 26.54
				}
			},
			"stattrak" : {
				4 : {
					"market" : 121,
					"analyst" : 115.42,
					"opskins" : 99.98
				},
				3 : {
					"market" : 103.76,
					"analyst" : 95.81,
					"opskins" : 86.91
				}
			},
			"souvenir" : {}
		}
	},
	"713" : {
		"item_id" : 713,
		"type" : "AK-47",
		"skinName" : "Redline",
		"prices" : {
			"default" : {
				3 : {
					"market" : 14.61,
					"analyst" : 15.62,
					"opskins" : 14.3
				},
				2 : {
					"market" : 4.8,
					"analyst" : 4.8,
					"opskins" : 4.4
				},
				1 : {
					"market" : 5.31,
					"analyst" : 5.1,
					"opskins" : 4.93
				},
				0 : {
					"market" : 3.23,
					"analyst" : 2.93,
					"opskins" : 3.01
				}
			},
			"stattrak" : {
				3 : {
					"market" : 83.91,
					"analyst" : 90.48,
					"opskins" : 79.99
				},
				2 : {
					"market" : 17.75,
					"analyst" : 17.92,
					"opskins" : 15.65
				},
				1 : {
					"market" : 14.03,
					"analyst" : 15.33,
					"opskins" : 14.53
				},
				0 : {
					"market" : 9.56,
					"analyst" : 8.75,
					"opskins" : 8.48
				}
			},
			"souvenir" : {}
		}
	},
	"714" : {
		"item_id" : 714,
		"type" : "AUG",
		"skinName" : "Bengal Tiger",
		"prices" : {
			"default" : {
				4 : {
					"market" : 15.27,
					"analyst" : 14.09,
					"opskins" : 12.5
				},
				3 : {
					"market" : 2.09,
					"analyst" : 2.21,
					"opskins" : 1.86
				},
				2 : {
					"market" : 1.21,
					"analyst" : 1.22,
					"opskins" : 1.18
				},
				1 : {
					"market" : 1.73,
					"analyst" : 1.56,
					"opskins" : 1.59
				},
				0 : {
					"market" : 1.69,
					"analyst" : 1.43,
					"opskins" : 1.41
				}
			},
			"stattrak" : {
				4 : {
					"market" : 59.7,
					"analyst" : 61.27,
					"opskins" : 66.06
				},
				3 : {
					"market" : 12.15,
					"analyst" : 10.38,
					"opskins" : 9.45
				},
				2 : {
					"market" : 4.54,
					"analyst" : 4.18,
					"opskins" : 3.98
				},
				1 : {
					"market" : 5.9,
					"analyst" : 5.09,
					"opskins" : 5.04
				},
				0 : {
					"market" : 4.6,
					"analyst" : 4.7,
					"opskins" : 4.4
				}
			},
			"souvenir" : {}
		}
	},
	"715" : {
		"item_id" : 715,
		"type" : "AK-47",
		"skinName" : "Case Hardened",
		"prices" : {
			"default" : {
				4 : {
					"market" : 40.1,
					"analyst" : 39.98,
					"opskins" : 34.79
				},
				3 : {
					"market" : 21.32,
					"analyst" : 24.21,
					"opskins" : 22.62
				},
				2 : {
					"market" : 18.54,
					"analyst" : 19.67,
					"opskins" : 17.99
				},
				1 : {
					"market" : 16.97,
					"analyst" : 18.41,
					"opskins" : 16.85
				},
				0 : {
					"market" : 16.19,
					"analyst" : 16.28,
					"opskins" : 14.7
				}
			},
			"stattrak" : {
				4 : {
					"market" : 225.3,
					"analyst" : 228.13,
					"opskins" : 215.88
				},
				3 : {
					"market" : 95.82,
					"analyst" : 94.03,
					"opskins" : 82.99
				},
				2 : {
					"market" : 64.03,
					"analyst" : 65.47,
					"opskins" : 58.98
				},
				1 : {
					"market" : 74.95,
					"analyst" : 70.62,
					"opskins" : 55.47
				},
				0 : {
					"market" : 52.26,
					"analyst" : 54.36,
					"opskins" : 48.75
				}
			},
			"souvenir" : {}
		}
	},
	"716" : {
		"item_id" : 716,
		"type" : "Desert Eagle",
		"skinName" : "Hypnotic",
		"prices" : {
			"default" : {
				4 : {
					"market" : 7.01,
					"analyst" : 7.06,
					"opskins" : 6.7
				},
				3 : {
					"market" : 10.92,
					"analyst" : 13.04,
					"opskins" : 12.38
				}
			},
			"stattrak" : {
				4 : {
					"market" : 25.72,
					"analyst" : 27.12,
					"opskins" : 25.5
				},
				3 : {
					"market" : 38.98,
					"analyst" : 39.41,
					"opskins" : 45
				}
			},
			"souvenir" : {}
		}
	},
	"717" : {
		"item_id" : 717,
		"type" : "Glock-18",
		"skinName" : "Water Elemental",
		"prices" : {
			"default" : {
				4 : {
					"market" : 5.18,
					"analyst" : 5.28,
					"opskins" : 4.78
				},
				3 : {
					"market" : 2.94,
					"analyst" : 3.2,
					"opskins" : 2.75
				},
				2 : {
					"market" : 2.22,
					"analyst" : 2.32,
					"opskins" : 2.01
				},
				1 : {
					"market" : 2.7,
					"analyst" : 2.88,
					"opskins" : 2.54
				},
				0 : {
					"market" : 1.88,
					"analyst" : 1.97,
					"opskins" : 1.77
				}
			},
			"stattrak" : {
				4 : {
					"market" : 19.6,
					"analyst" : 21.67,
					"opskins" : 19.98
				},
				3 : {
					"market" : 13.25,
					"analyst" : 13.64,
					"opskins" : 12.55
				},
				2 : {
					"market" : 7.87,
					"analyst" : 8.31,
					"opskins" : 7.49
				},
				1 : {
					"market" : 10.21,
					"analyst" : 9.79,
					"opskins" : 9.58
				},
				0 : {
					"market" : 6.26,
					"analyst" : 6.45,
					"opskins" : 5.79
				}
			},
			"souvenir" : {}
		}
	},
	"718" : {
		"item_id" : 718,
		"type" : "P250",
		"skinName" : "Muertos",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.71,
					"analyst" : 2.67,
					"opskins" : 2.34
				},
				3 : {
					"market" : 1.4,
					"analyst" : 1.6,
					"opskins" : 1.41
				},
				2 : {
					"market" : 1.28,
					"analyst" : 1.43,
					"opskins" : 1.28
				},
				1 : {
					"market" : 2.2,
					"analyst" : 1.91,
					"opskins" : 1.63
				},
				0 : {
					"market" : 1.33,
					"analyst" : 1.44,
					"opskins" : 1.4
				}
			},
			"stattrak" : {
				4 : {
					"market" : 11.66,
					"analyst" : 12.76,
					"opskins" : 11
				},
				3 : {
					"market" : 6.79,
					"analyst" : 7.25,
					"opskins" : 6.47
				},
				2 : {
					"market" : 5.31,
					"analyst" : 5.35,
					"opskins" : 4.69
				},
				1 : {
					"market" : 7.55,
					"analyst" : 7.33,
					"opskins" : 6.29
				},
				0 : {
					"market" : 5.41,
					"analyst" : 5.16,
					"opskins" : 5.04
				}
			},
			"souvenir" : {}
		}
	},
	"719" : {
		"item_id" : 719,
		"type" : "FAMAS",
		"skinName" : "Afterimage",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.56,
					"analyst" : 3.21,
					"opskins" : 2.9
				},
				3 : {
					"market" : 1.7,
					"analyst" : 1.84,
					"opskins" : 1.66
				},
				2 : {
					"market" : 1.47,
					"analyst" : 1.57,
					"opskins" : 1.45
				},
				1 : {
					"market" : 3.37,
					"analyst" : 3.26,
					"opskins" : 2.79
				}
			},
			"stattrak" : {
				4 : {
					"market" : 11.87,
					"analyst" : 11.48,
					"opskins" : 10.15
				},
				3 : {
					"market" : 5.42,
					"analyst" : 5.46,
					"opskins" : 5.18
				},
				2 : {
					"market" : 4.42,
					"analyst" : 4.51,
					"opskins" : 4.27
				},
				1 : {
					"market" : 11.16,
					"analyst" : 14.97,
					"opskins" : 19.2
				}
			},
			"souvenir" : {}
		}
	},
	"720" : {
		"item_id" : 720,
		"type" : "P90",
		"skinName" : "Trigon",
		"prices" : {
			"default" : {
				3 : {
					"market" : 2.57,
					"analyst" : 2.7,
					"opskins" : 2.34
				},
				2 : {
					"market" : 1.75,
					"analyst" : 1.92,
					"opskins" : 1.67
				},
				1 : {
					"market" : 1.96,
					"analyst" : 1.98,
					"opskins" : 1.92
				},
				0 : {
					"market" : 1.8,
					"analyst" : 1.9,
					"opskins" : 1.59
				}
			},
			"stattrak" : {
				3 : {
					"market" : 8.08,
					"analyst" : 8.7,
					"opskins" : 7.89
				},
				2 : {
					"market" : 4.45,
					"analyst" : 4.78,
					"opskins" : 4.28
				},
				1 : {
					"market" : 6.99,
					"analyst" : 6.26,
					"opskins" : 5.78
				},
				0 : {
					"market" : 3.74,
					"analyst" : 4.03,
					"opskins" : 3.99
				}
			},
			"souvenir" : {}
		}
	},
	"721" : {
		"item_id" : 721,
		"type" : "Galil AR",
		"skinName" : "Eco",
		"prices" : {
			"default" : {
				3 : {
					"market" : 2.96,
					"analyst" : 3.16,
					"opskins" : 2.68
				},
				2 : {
					"market" : 0.89,
					"analyst" : 0.99,
					"opskins" : 0.79
				},
				1 : {
					"market" : 0.99,
					"analyst" : 0.99,
					"opskins" : 0.87
				},
				0 : {
					"market" : 0.96,
					"analyst" : 0.97,
					"opskins" : 0.88
				}
			},
			"stattrak" : {
				3 : {
					"market" : 12.01,
					"analyst" : 10.8,
					"opskins" : 10.29
				},
				2 : {
					"market" : 2.66,
					"analyst" : 2.68,
					"opskins" : 2.29
				},
				1 : {
					"market" : 2.49,
					"analyst" : 2.6,
					"opskins" : 2.25
				},
				0 : {
					"market" : 2.15,
					"analyst" : 2.32,
					"opskins" : 2.15
				}
			},
			"souvenir" : {}
		}
	},
	"722" : {
		"item_id" : 722,
		"type" : "P2000",
		"skinName" : "Corticera",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.67,
					"analyst" : 2.96,
					"opskins" : 2.45
				},
				3 : {
					"market" : 1.28,
					"analyst" : 1.44,
					"opskins" : 1.47
				},
				2 : {
					"market" : 1.61,
					"analyst" : 1.64,
					"opskins" : 1.66
				}
			},
			"stattrak" : {
				4 : {
					"market" : 17.25,
					"analyst" : 18.14,
					"opskins" : 16.72
				},
				3 : {
					"market" : 6.59,
					"analyst" : 5.9,
					"opskins" : 5.16
				},
				2 : {
					"market" : 4.37,
					"analyst" : 4.55,
					"opskins" : 4
				}
			},
			"souvenir" : {}
		}
	},
	"725" : {
		"item_id" : 725,
		"type" : "AWP",
		"skinName" : "Snake Camo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 46,
					"analyst" : 34.11,
					"opskins" : 29
				},
				3 : {
					"market" : 5.8,
					"analyst" : 5.14,
					"opskins" : 5.22
				},
				2 : {
					"market" : 3.94,
					"analyst" : 3.6,
					"opskins" : 3.75
				},
				1 : {
					"market" : 3.82,
					"analyst" : 4.27,
					"opskins" : 4.4
				},
				0 : {
					"market" : 4.52,
					"analyst" : 3.79,
					"opskins" : 9.95
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"728" : {
		"item_id" : 728,
		"type" : "AWP",
		"skinName" : "Pink DDPAT",
		"prices" : {
			"default" : {
				4 : {
					"market" : 54.05,
					"analyst" : 50.67,
					"opskins" : 44.94
				},
				3 : {
					"market" : 15.34,
					"analyst" : 14.86,
					"opskins" : 14.3
				},
				2 : {
					"market" : 8.91,
					"analyst" : 9.42,
					"opskins" : 8.84
				},
				1 : {
					"market" : 9.63,
					"analyst" : 9.37,
					"opskins" : 8.84
				},
				0 : {
					"market" : 8,
					"analyst" : 7.91,
					"opskins" : 7.75
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				3 : {
					"market" : 369.27,
					"analyst" : 287.02,
					"opskins" : 230
				},
				2 : {
					"market" : 73.09,
					"analyst" : 106.04,
					"opskins" : 85
				},
				1 : {
					"market" : 185.42,
					"analyst" : 85.17,
					"opskins" : 199
				},
				0 : {
					"market" : 71.14,
					"analyst" : 59.72,
					"opskins" : 150
				}
			}
		}
	},
	"736" : {
		"item_id" : 736,
		"type" : "AWP",
		"skinName" : "Medusa",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 992,
					"opskins" : 969.99
				},
				3 : {
					"market" : -1,
					"analyst" : 497,
					"opskins" : 500
				},
				2 : {
					"market" : 409.13,
					"analyst" : 437,
					"opskins" : 428
				},
				1 : {
					"market" : 400,
					"analyst" : 361,
					"opskins" : 370
				},
				0 : {
					"market" : 381.4,
					"analyst" : 354,
					"opskins" : 400
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"739" : {
		"item_id" : 739,
		"type" : "AWP",
		"skinName" : "Dragon Lore",
		"prices" : {
			"default" : {
				4 : {
					"market" : -1,
					"analyst" : 1170,
					"opskins" : 1182.1
				},
				3 : {
					"market" : -1,
					"analyst" : 890,
					"opskins" : 908.99
				},
				2 : {
					"market" : -1,
					"analyst" : 677,
					"opskins" : 670
				},
				1 : {
					"market" : -1,
					"analyst" : 535,
					"opskins" : -1
				},
				0 : {
					"market" : -1,
					"analyst" : 507,
					"opskins" : 508.89
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : -1,
					"analyst" : 11000,
					"opskins" : -1
				},
				3 : {
					"market" : -1,
					"analyst" : 7425,
					"opskins" : 4599
				},
				2 : {
					"market" : -1,
					"analyst" : 2413,
					"opskins" : 2199
				},
				1 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : -1
				},
				0 : {
					"market" : -1,
					"analyst" : -1,
					"opskins" : 1800
				}
			}
		}
	},
	"741" : {
		"item_id" : 741,
		"type" : "M4A1-S",
		"skinName" : "VariCamo",
		"prices" : {
			"default" : {
				4 : {
					"market" : 0.66,
					"analyst" : 0.79,
					"opskins" : 0.7
				},
				3 : {
					"market" : 0.3,
					"analyst" : 0.33,
					"opskins" : 0.28
				},
				2 : {
					"market" : 0.17,
					"analyst" : 0.19,
					"opskins" : 0.16
				},
				1 : {
					"market" : 0.66,
					"analyst" : 0.62,
					"opskins" : 0.58
				},
				0 : {
					"market" : 0.24,
					"analyst" : 0.24,
					"opskins" : 0.22
				}
			},
			"stattrak" : {},
			"souvenir" : {
				4 : {
					"market" : 24.68,
					"analyst" : 23.11,
					"opskins" : 49
				},
				3 : {
					"market" : 14.84,
					"analyst" : 15.51,
					"opskins" : 17
				},
				2 : {
					"market" : 7.68,
					"analyst" : 7.78,
					"opskins" : 7.08
				},
				1 : {
					"market" : 10.64,
					"analyst" : 10.44,
					"opskins" : 12.35
				},
				0 : {
					"market" : 9.84,
					"analyst" : 12.65,
					"opskins" : 15
				}
			}
		}
	},
	"747" : {
		"item_id" : 747,
		"type" : "M4A1-S",
		"skinName" : "Icarus Fell",
		"prices" : {
			"default" : {
				4 : {
					"market" : 46.92,
					"analyst" : 47.27,
					"opskins" : 41.19
				},
				3 : {
					"market" : 47.81,
					"analyst" : 46.14,
					"opskins" : 42.47
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"749" : {
		"item_id" : 749,
		"type" : "M4A1-S",
		"skinName" : "Hot Rod",
		"prices" : {
			"default" : {
				4 : {
					"market" : 55.54,
					"analyst" : 65.47,
					"opskins" : 54.99
				},
				3 : {
					"market" : 67,
					"analyst" : 62.71,
					"opskins" : 59.99
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"754" : {
		"item_id" : 754,
		"type" : "M4A1-S",
		"skinName" : "Golden Coil",
		"prices" : {
			"default" : {
				4 : {
					"market" : 29.68,
					"analyst" : 30.91,
					"opskins" : 28.06
				},
				3 : {
					"market" : 17.18,
					"analyst" : 18.15,
					"opskins" : 15.97
				},
				2 : {
					"market" : 10.66,
					"analyst" : 11.79,
					"opskins" : 10.49
				},
				1 : {
					"market" : 9.85,
					"analyst" : 10.59,
					"opskins" : 9.75
				},
				0 : {
					"market" : 8.99,
					"analyst" : 8.91,
					"opskins" : 8.03
				}
			},
			"stattrak" : {
				4 : {
					"market" : 126.08,
					"analyst" : 124.89,
					"opskins" : 107.29
				},
				3 : {
					"market" : 55.62,
					"analyst" : 63.7,
					"opskins" : 53.98
				},
				2 : {
					"market" : 41.26,
					"analyst" : 36.68,
					"opskins" : 33.68
				},
				1 : {
					"market" : 29.73,
					"analyst" : 28.91,
					"opskins" : 28.97
				},
				0 : {
					"market" : 24.35,
					"analyst" : 25.24,
					"opskins" : 23
				}
			},
			"souvenir" : {}
		}
	},
	"762" : {
		"item_id" : 762,
		"type" : "AK-47",
		"skinName" : "Emerald Pinstripe",
		"prices" : {
			"default" : {
				4 : {
					"market" : 2.31,
					"analyst" : 2.6,
					"opskins" : 2.28
				},
				3 : {
					"market" : 1.27,
					"analyst" : 1.35,
					"opskins" : 1.25
				},
				2 : {
					"market" : 0.93,
					"analyst" : 0.96,
					"opskins" : 0.83
				},
				1 : {
					"market" : 0.86,
					"analyst" : 0.93,
					"opskins" : 0.84
				},
				0 : {
					"market" : 0.88,
					"analyst" : 0.92,
					"opskins" : 0.83
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"763" : {
		"item_id" : 763,
		"type" : "AK-47",
		"skinName" : "First Class",
		"prices" : {
			"default" : {
				4 : {
					"market" : 23.31,
					"analyst" : 21.61,
					"opskins" : 19
				},
				3 : {
					"market" : 12.19,
					"analyst" : 11.53,
					"opskins" : 11.08
				},
				2 : {
					"market" : 8.45,
					"analyst" : 7.46,
					"opskins" : 7.74
				},
				1 : {
					"market" : 8.01,
					"analyst" : 7.05,
					"opskins" : 7.7
				},
				0 : {
					"market" : 8.51,
					"analyst" : 6.46,
					"opskins" : 8.47
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"764" : {
		"item_id" : 764,
		"type" : "AK-47",
		"skinName" : "Hydroponic",
		"prices" : {
			"default" : {
				4 : {
					"market" : 95.36,
					"analyst" : 99.33,
					"opskins" : 85.98
				},
				3 : {
					"market" : 72.5,
					"analyst" : 69.33,
					"opskins" : 60.6
				},
				2 : {
					"market" : 32.38,
					"analyst" : 32.61,
					"opskins" : 28
				},
				1 : {
					"market" : 33.71,
					"analyst" : 38.17,
					"opskins" : 32.42
				},
				0 : {
					"market" : 16.62,
					"analyst" : 16.94,
					"opskins" : 15.45
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"765" : {
		"item_id" : 765,
		"type" : "AK-47",
		"skinName" : "Jet Set",
		"prices" : {
			"default" : {
				4 : {
					"market" : 121.22,
					"analyst" : 118.63,
					"opskins" : 107.99
				},
				3 : {
					"market" : 32.2,
					"analyst" : 36.16,
					"opskins" : 31.09
				},
				2 : {
					"market" : 27.77,
					"analyst" : 27.57,
					"opskins" : 25.2
				},
				1 : {
					"market" : 23.2,
					"analyst" : 22.59,
					"opskins" : 21.79
				},
				0 : {
					"market" : 24.01,
					"analyst" : 22.4,
					"opskins" : 20.68
				}
			},
			"stattrak" : {},
			"souvenir" : {}
		}
	},
	"766" : {
		"item_id" : 766,
		"type" : "AK-47",
		"skinName" : "Frontside Misty",
		"prices" : {
			"default" : {
				4 : {
					"market" : 18.6,
					"analyst" : 19.32,
					"opskins" : 17.35
				},
				3 : {
					"market" : 9.46,
					"analyst" : 10.39,
					"opskins" : 9.32
				},
				2 : {
					"market" : 6.69,
					"analyst" : 7.28,
					"opskins" : 6.28
				},
				1 : {
					"market" : 6.85,
					"analyst" : 6.96,
					"opskins" : 6.16
				},
				0 : {
					"market" : 4.86,
					"analyst" : 4.91,
					"opskins" : 4.4
				}
			},
			"stattrak" : {
				4 : {
					"market" : 76.67,
					"analyst" : 69.38,
					"opskins" : 58.28
				},
				3 : {
					"market" : 29.68,
					"analyst" : 30.59,
					"opskins" : 26.65
				},
				2 : {
					"market" : 19.43,
					"analyst" : 19.59,
					"opskins" : 17.45
				},
				1 : {
					"market" : 17.41,
					"analyst" : 18.63,
					"opskins" : 16.72
				},
				0 : {
					"market" : 13.07,
					"analyst" : 13.14,
					"opskins" : 11.89
				}
			},
			"souvenir" : {}
		}
	},
	"767" : {
		"item_id" : 767,
		"type" : "AK-47",
		"skinName" : "Point Disarray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 19.56,
					"analyst" : 19.11,
					"opskins" : 17.14
				},
				3 : {
					"market" : 11.97,
					"analyst" : 12.15,
					"opskins" : 10.89
				},
				2 : {
					"market" : 7.97,
					"analyst" : 8.51,
					"opskins" : 7.3
				},
				1 : {
					"market" : 9.61,
					"analyst" : 9.94,
					"opskins" : 9.21
				},
				0 : {
					"market" : 6.12,
					"analyst" : 6.11,
					"opskins" : 5.68
				}
			},
			"stattrak" : {
				4 : {
					"market" : 61.44,
					"analyst" : 63.07,
					"opskins" : 54.73
				},
				3 : {
					"market" : 36.54,
					"analyst" : 37.79,
					"opskins" : 33.44
				},
				2 : {
					"market" : 24.34,
					"analyst" : 24.73,
					"opskins" : 22.3
				},
				1 : {
					"market" : 31.66,
					"analyst" : 29.72,
					"opskins" : 25.49
				},
				0 : {
					"market" : 16.79,
					"analyst" : 18.32,
					"opskins" : 19.48
				}
			},
			"souvenir" : {}
		}
	},
	"768" : {
		"item_id" : 768,
		"type" : "AK-47",
		"skinName" : "Point Disarray",
		"prices" : {
			"default" : {
				4 : {
					"market" : 19.56,
					"analyst" : 19.11,
					"opskins" : 17.14
				},
				3 : {
					"market" : 11.97,
					"analyst" : 12.15,
					"opskins" : 10.89
				},
				2 : {
					"market" : 7.97,
					"analyst" : 8.51,
					"opskins" : 7.3
				},
				1 : {
					"market" : 9.61,
					"analyst" : 9.94,
					"opskins" : 9.21
				},
				0 : {
					"market" : 6.12,
					"analyst" : 6.11,
					"opskins" : 5.68
				}
			},
			"stattrak" : {
				4 : {
					"market" : 61.44,
					"analyst" : 63.07,
					"opskins" : 54.73
				},
				3 : {
					"market" : 36.54,
					"analyst" : 37.79,
					"opskins" : 33.44
				},
				2 : {
					"market" : 24.34,
					"analyst" : 24.73,
					"opskins" : 22.3
				},
				1 : {
					"market" : 31.66,
					"analyst" : 29.72,
					"opskins" : 25.49
				},
				0 : {
					"market" : 16.79,
					"analyst" : 18.32,
					"opskins" : 19.48
				}
			},
			"souvenir" : {}
		}
	}
}
