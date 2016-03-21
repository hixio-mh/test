window.Weapon = window.Weapon || {};
Weapon.Melee = [{
		"name" : {
			"EN" : "Knife",
			"RU" : "Нож"
		},
		"image" : "../images/Weapon/Knife.png",
		"icon" : "../images/Weapon/Standard_T_knife.png",
		"class" : {
			"EN" : "Melee",
			"RU" : "Ближний бой"
		},
		"firingModes" : {
			"EN" : "Pricking<br>Cutting",
			"RU" : "Колющий<br>Режущий"
		},
		"usedBy" : ["T", "CT"],
		"rateOfFire" : "0.4 s (1)<br> 1 s (2)",
		"movementSpeed" : 250,
		"killAward" : {
			"Competitive" : 1500,
			"Casual" : 750
		},
		"armorPenetration" : 85,
		"features" : {
			"EN" : "Instantly kills a stab in the back.",
			"RU" : "Мгновенно убивает ударом в спину"
		},
		"console" : "weapon_knife",
	}, {
		"name" : {
			"EN" : "Zeus x27",
			"RU" : "Zeus x27"
		},
		"image" : "../images/Weapon/Zeuslogo.png",
		"icon" : "../images/Weapon/Zeus_x270.png",
		"altName" : {
			"EN" : "Taser<br>Stun gun",
			"RU" : "Зевс<br>Шокер<br>Электрошоковый пистолет"
		},
		"class" : {
			"EN" : "Melee",
			"RU" : "Ближний бой"
		},
		"usedBy" : ["T", "CT"],
		"price" : 200,
		"magazineCapacity" : "1/0",
		"movementSpeed" : 220,
		"killAward" : {
			"Competitive" : 0,
			"Casual" : 0
		},
		"hotkey" : "B-6-3",
		"console" : "weapon_taser",
	},
],
Weapon.Pistols = [{
		"name" : {
			"EN" : "CZ75-Auto",
			"RU" : "CZ75-Auto"
		},
		"image" : "../images/Weapon/Cz75-auto.png",
		"icon" : "../images/Weapon/C75a_hud_csgo-1.png",
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 500,
		"origin" : "Czech Republic",
		"caliber" : {
			"EN" : "9mm",
			"RU" : ""
		},
		"magazineCapacity" : "12/12",
		"rateOfFire" : "600",
		"reloadTime" : 2.7,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 100,
			"Casual" : 150
		},
		"damage" : 33,
		"recoilControl" : "17/26 (65%)",
		"accurateRange" : 16,
		"penetrationPower" : 100,
		"armorPenetration" : 77.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-1-4",
		"console" : "weapon_cz75a",
		"pattern" : "cz75a",
	}, {
		"name" : {
			"EN" : "Desert Eagle",
			"RU" : "Desert Eagle"
		},
		"image" : "../images/Weapon/Deagle.png",
		"icon" : "../images/Weapon/Desert_Eagle0.png",
		"altName" : {
			"EN" : "Deagle",
			"RU" : ""
		},
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 700,
		"origin" : "Israel",
		"caliber" : {
			"EN" : ".50 Action Express",
			"RU" : ""
		},
		"magazineCapacity" : "7/35",
		"rateOfFire" : "267",
		"reloadTime" : 2.2,
		"movementSpeed" : 230,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 63,
		"recoilControl" : "3/26 (12%)",
		"accurateRange" : 35,
		"penetrationPower" : 200,
		"armorPenetration" : 93,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-1-5",
		"console" : "weapon_deagle",
		"pattern" : "deagle",
	}, {
		"name" : {
			"EN" : "R8 Revolver",
			"RU" : "R8 Revolver"
		},
		"image" : "../images/Weapon/revolver.png",
		"altName" : {
			"EN" : "Smith & Wesson M&P R8",
			"RU" : ""
		},
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic<br>Fanning",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 850,
		"origin" : "United States",
		"caliber" : {
			"EN" : ".50 Action Express",
			"RU" : ""
		},
		"magazineCapacity" : "8/8",
		"reloadTime" : 2.3,
		"movementSpeed" : 220,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 86,
		"accurateRange" : 84,
		"penetrationPower" : 200,
		"armorPenetration" : 93,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-1-5",
		"console" : "weapon_revolver",
	}, {
		"name" : {
			"EN" : "Dual Berettas",
			"RU" : "Dual Berettas"
		},
		"image" : "../images/Weapon/2beretts.png",
		"icon" : "../images/Weapon/Dual_Berettas0.png",
		"altName" : {
			"EN" : ".40 Dual Elites",
			"RU" : ""
		},
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"counterpart" : "Five-SeveN",
		"price" : 500,
		"origin" : "Italy",
		"caliber" : {
			"EN" : "9mm",
			"RU" : ""
		},
		"magazineCapacity" : "30/120",
		"rateOfFire" : "500",
		"reloadTime" : 3.8,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 38,
		"recoilControl" : "18/26 (69%)",
		"accurateRange" : 24,
		"penetrationPower" : 100,
		"armorPenetration" : 57.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-1-2",
		"console" : "weapon_elite",
		"pattern" : "dualberettas",
	}, {
		"name" : {
			"EN" : "Five-SeveN",
			"RU" : "Five-SeveN"
		},
		"image" : "../images/Weapon/Fiveseven.png",
		"icon" : "../images/Weapon/Five-SeveN0.png",
		"altName" : {
			"EN" : "FN-57",
			"RU" : ""
		},
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "Tec-9",
		"price" : 500,
		"origin" : "Belgium",
		"caliber" : {
			"EN" : "5.7mm",
			"RU" : ""
		},
		"magazineCapacity" : "20/100",
		"rateOfFire" : "400",
		"reloadTime" : 2.2,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 32,
		"recoilControl" : "18/26 (69%)",
		"accurateRange" : 19,
		"penetrationPower" : 100,
		"armorPenetration" : 91,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-1-4",
		"console" : "weapon_fiveseven",
		"pattern" : "fiveseven",
	}, {
		"name" : {
			"EN" : "Glock-18",
			"RU" : "Glock-18"
		},
		"image" : "../images/Weapon/Glock.png",
		"icon" : "../images/Weapon/Glock-180.png",
		"altName" : {
			"EN" : "9×19mm Sidearm",
			"RU" : ""
		},
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic<br>3-round burst",
			"RU" : ""
		},
		"usedBy" : ["T"],
		"counterpart" : "P2000<br>USP-S",
		"price" : 200,
		"origin" : "Austria",
		"caliber" : {
			"EN" : "9mm",
			"RU" : ""
		},
		"magazineCapacity" : "20/120",
		"rateOfFire" : "400 (Semi auto) <br> 1200 (Burst fire)",
		"reloadTime" : 2.2,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 28,
		"recoilControl" : "22/26 (84%)",
		"accurateRange" : 28,
		"penetrationPower" : 100,
		"armorPenetration" : 47,
		"features" : {
			"EN" : "3-round burst",
			"RU" : "Очередь по 3 пули"
		},
		"hotkey" : "B-1-1",
		"console" : "weapon_glock",
		"pattern" : "glock",
	}, {
		"name" : {
			"EN" : "P250",
			"RU" : "P250"
		},
		"image" : "../images/Weapon/P250.png",
		"icon" : "../images/Weapon/P250_hud_csgo-1-.png",
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 300,
		"origin" : "Germany<br>Switzerland",
		"caliber" : {
			"EN" : ".357 SIG",
			"RU" : ""
		},
		"magazineCapacity" : "13/26",
		"rateOfFire" : "400",
		"reloadTime" : 2.2,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 35,
		"recoilControl" : "18/26 (69%)",
		"accurateRange" : 19,
		"penetrationPower" : 100,
		"armorPenetration" : 77.65,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-1-3",
		"console" : "weapon_p250",
		"pattern" : "p250",
	}, {
		"name" : {
			"EN" : "P2000",
			"RU" : "P2000"
		},
		"image" : "../images/Weapon/P2000.png",
		"icon" : "../images/Weapon/P20000.png",
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "Glock-18",
		"price" : 200,
		"origin" : "Germany",
		"caliber" : {
			"EN" : ".357 SIG",
			"RU" : ""
		},
		"magazineCapacity" : "13/52",
		"rateOfFire" : "352",
		"reloadTime" : 2.2,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 35,
		"recoilControl" : "19/26 (73%)",
		"accurateRange" : 31,
		"penetrationPower" : 100,
		"armorPenetration" : 50.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-1-1",
		"console" : "weapon_hkp2000",
		"pattern" : "p2000",
	}, {
		"name" : {
			"EN" : "Tec-9",
			"RU" : "Tec-9"
		},
		"image" : "../images/Weapon/Tec-9.png",
		"icon" : "../images/Weapon/Tec9_hud_csgo-1-.png",
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic",
			"RU" : ""
		},
		"usedBy" : ["T"],
		"counterpart" : "Five-SeveN",
		"price" : 500,
		"origin" : "United States<br>Sweden",
		"caliber" : {
			"EN" : "9mm",
			"RU" : ""
		},
		"magazineCapacity" : "24/120",
		"rateOfFire" : "500",
		"reloadTime" : 2.5,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 33,
		"recoilControl" : "17/26 (65%)",
		"accurateRange" : 19,
		"penetrationPower" : 100,
		"armorPenetration" : 90.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-1-4",
		"console" : "weapon_tec9",
		"pattern" : "tec9",
	}, {
		"name" : {
			"EN" : "USP-S",
			"RU" : "USP-S"
		},
		"image" : "../images/Weapon/Usp-s.png",
		"icon" : "../images/Weapon/USP-S0.png",
		"altName" : {
			"EN" : "H&K USP45 Tactical",
			"RU" : ""
		},
		"class" : {
			"EN" : "Pistols",
			"RU" : "Пистолеты"
		},
		"firingModes" : {
			"EN" : "Semi-automatic",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "Glock-18",
		"price" : 200,
		"origin" : "Germany",
		"caliber" : {
			"EN" : ".45 ACP",
			"RU" : ""
		},
		"magazineCapacity" : "12/24",
		"rateOfFire" : "352",
		"reloadTime" : 2.2,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 35,
		"recoilControl" : "18/26 (69%)",
		"accurateRange" : 29,
		"penetrationPower" : 100,
		"armorPenetration" : 50.5,
		"hotkey" : "B-1-1",
		"console" : "weapon_usp_silencer",
		"pattern" : "usps",
	},
],
Weapon.Shotguns = [{
		"name" : {
			"EN" : "MAG-7",
			"RU" : "MAG-7"
		},
		"image" : "../images/Weapon/Mag7.png",
		"icon" : "../images/Weapon/Mag7_hud_csgo-1-.png",
		"altName" : {
			"EN" : "MAG-7M1",
			"RU" : ""
		},
		"class" : {
			"EN" : "Shotguns",
			"RU" : "Дробовики"
		},
		"firingModes" : {
			"EN" : "Pump-action",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "Sawed-Off",
		"price" : 1800,
		"origin" : "South Africa",
		"caliber" : {
			"EN" : "12",
			"RU" : ""
		},
		"magazineCapacity" : "5/32",
		"rateOfFire" : "71",
		"reloadTime" : 2.4,
		"movementSpeed" : 225,
		"killAward" : {
			"Competitive" : 900,
			"Casual" : 450
		},
		"damage" : 240,
		"recoilControl" : "1/26 (4%)",
		"accurateRange" : 4.6,
		"penetrationPower" : 100,
		"armorPenetration" : 75,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-2-3",
		"console" : "weapon_mag7",
		"pattern" : "mag7",
	}, {
		"name" : {
			"EN" : "Nova",
			"RU" : "Nova"
		},
		"image" : "../images/Weapon/Nova.png",
		"icon" : "../images/Weapon/Nova_hud_csgo-1-.png",
		"class" : {
			"EN" : "Shotguns",
			"RU" : "Дробовики"
		},
		"firingModes" : {
			"EN" : "Pump-action",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 1200,
		"origin" : "Italy",
		"caliber" : {
			"EN" : "12",
			"RU" : ""
		},
		"magazineCapacity" : "8/32",
		"rateOfFire" : "68",
		"reloadTime" : 2.2,
		"movementSpeed" : 220,
		"killAward" : {
			"Competitive" : 900,
			"Casual" : 450
		},
		"damage" : 234,
		"recoilControl" : "1/26 (4%)",
		"accurateRange" : 4.6,
		"penetrationPower" : 0,
		"armorPenetration" : 50,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-2-1",
		"console" : "weapon_nova",
		"pattern" : "nova",
	}, {
		"name" : {
			"EN" : "Sawed-Off",
			"RU" : "Sawed-Off"
		},
		"image" : "../images/Weapon/Sawed-off.png",
		"icon" : "../images/Weapon/Sawedoff_hud_csgo-1-.png",
		"class" : {
			"EN" : "Shotguns",
			"RU" : "Дробовики"
		},
		"firingModes" : {
			"EN" : "Pump-action",
			"RU" : ""
		},
		"usedBy" : ["T"],
		"counterpart" : "MAG-7",
		"price" : 1200,
		"origin" : "United States",
		"caliber" : {
			"EN" : "12",
			"RU" : ""
		},
		"magazineCapacity" : "7/32",
		"rateOfFire" : "71",
		"reloadTime" : 2.2,
		"movementSpeed" : 210,
		"killAward" : {
			"Competitive" : 900,
			"Casual" : 450
		},
		"damage" : 256,
		"recoilControl" : "1/26 (3%)",
		"accurateRange" : 3.1,
		"penetrationPower" : 100,
		"armorPenetration" : 75,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-2-3",
		"console" : "weapon_sawedoff",
		"pattern" : "sawedoff",
	}, {
		"name" : {
			"EN" : "XM1014",
			"RU" : "XM1014"
		},
		"image" : "../images/Weapon/M1014-1-.png",
		"icon" : "../images/Weapon/XM10140.png",
		"class" : {
			"EN" : "Shotguns",
			"RU" : "Дробовики"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 2000,
		"origin" : "Italy",
		"caliber" : {
			"EN" : "12",
			"RU" : ""
		},
		"magazineCapacity" : "7/32",
		"rateOfFire" : "171",
		"reloadTime" : 2.8,
		"movementSpeed" : 215,
		"killAward" : {
			"Competitive" : 900,
			"Casual" : 450
		},
		"damage" : 120,
		"recoilControl" : "1/26 (4%)",
		"accurateRange" : 4.8,
		"penetrationPower" : 100,
		"armorPenetration" : 80,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-2-2",
		"console" : "weapon_xm1014",
		"pattern" : "xm1014",
	},
],
Weapon.SubmachineGuns = [{
		"name" : {
			"EN" : "MAC-10",
			"RU" : "MAC-10"
		},
		"image" : "../images/Weapon/Mac-10.png",
		"icon" : "../images/Weapon/MAC-100.png",
		"class" : {
			"EN" : "Submachine guns",
			"RU" : "Пистолеты-пулемёты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T"],
		"counterpart" : "MP9",
		"price" : 1050,
		"origin" : "United States",
		"caliber" : {
			"EN" : ".45 ACP",
			"RU" : ""
		},
		"magazineCapacity" : "30/100",
		"rateOfFire" : "800",
		"reloadTime" : 2.6,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 600,
			"Casual" : 300
		},
		"damage" : 29,
		"recoilControl" : "21/26 (80%)",
		"accurateRange" : 16,
		"penetrationPower" : 100,
		"armorPenetration" : 57.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-3-1",
		"console" : "weapon_mac10",
		"pattern" : "mac10",
	}, {
		"name" : {
			"EN" : "MP7",
			"RU" : "MP7"
		},
		"image" : "../images/Weapon/Mp7.png",
		"icon" : "../images/Weapon/Mp7_hud_csgo-1-.png",
		"class" : {
			"EN" : "Submachine guns",
			"RU" : "Пистолеты-пулемёты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 1700,
		"origin" : "Germany",
		"caliber" : {
			"EN" : "9mm",
			"RU" : ""
		},
		"magazineCapacity" : "30/120",
		"rateOfFire" : "800",
		"reloadTime" : 3.1,
		"killAward" : {
			"Competitive" : 600,
			"Casual" : 300
		},
		"damage" : 29,
		"recoilControl" : "22/26 (84%)",
		"accurateRange" : 20,
		"penetrationPower" : 100,
		"armorPenetration" : 62.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-3-2",
		"console" : "weapon_mp7",
		"pattern" : "mp7",
	}, {
		"name" : {
			"EN" : "MP9",
			"RU" : "MP9"
		},
		"image" : "../images/Weapon/Mp9.png",
		"icon" : "../images/Weapon/Mp9_hud_csgo-1-.png",
		"class" : {
			"EN" : "Submachine guns",
			"RU" : "Пистолеты-пулемёты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "MAC-10",
		"price" : 1250,
		"origin" : "Switzerland",
		"caliber" : {
			"EN" : "9mm",
			"RU" : ""
		},
		"magazineCapacity" : "30/120",
		"rateOfFire" : "857",
		"reloadTime" : 2.1,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 600,
			"Casual" : 300
		},
		"damage" : 26,
		"recoilControl" : "21/26 (80%)",
		"accurateRange" : 22,
		"penetrationPower" : 100,
		"armorPenetration" : 60,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-3-1",
		"console" : "weapon_mp9",
		"pattern" : "mp9",
	}, {
		"name" : {
			"EN" : "P90",
			"RU" : "P90"
		},
		"image" : "../images/Weapon/CSGO_base_weapon_p90.png",
		"icon" : "../images/Weapon/P900.png",
		"class" : {
			"EN" : "Submachine guns",
			"RU" : "Пистолеты-пулемёты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 2350,
		"origin" : "Belgium",
		"caliber" : {
			"EN" : "5.7mm",
			"RU" : ""
		},
		"magazineCapacity" : "50/100",
		"rateOfFire" : "857",
		"reloadTime" : 3.3,
		"movementSpeed" : 230,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 26,
		"recoilControl" : "22/26 (61%)",
		"accurateRange" : 15,
		"penetrationPower" : 100,
		"armorPenetration" : 69,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-3-4",
		"console" : "weapon_p90",
		"pattern" : "p90",
	}, {
		"name" : {
			"EN" : "PP-Bizon",
			"RU" : "PP-Bizon"
		},
		"image" : "../images/Weapon/bizon.png",
		"icon" : "../images/Weapon/Bizon_hud_csgo-1-.png",
		"altName" : {
			"EN" : "Bizon",
			"RU" : ""
		},
		"class" : {
			"EN" : "Submachine guns",
			"RU" : "Пистолеты-пулемёты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 1400,
		"origin" : "Russia",
		"caliber" : {
			"EN" : "9mm",
			"RU" : ""
		},
		"rateOfFire" : "750",
		"reloadTime" : 2.4,
		"movementSpeed" : 240,
		"killAward" : {
			"Competitive" : 600,
			"Casual" : 300
		},
		"damage" : 27,
		"recoilControl" : "21/26 (80%)",
		"accurateRange" : 14,
		"penetrationPower" : 100,
		"armorPenetration" : 57.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-3-5",
		"console" : "weapon_bizon",
		"pattern" : "bizon",
	}, {
		"name" : {
			"EN" : "UMP-45",
			"RU" : "UMP-45"
		},
		"image" : "../images/Weapon/Ump45go.png",
		"icon" : "../images/Weapon/UMP-450.png",
		"class" : {
			"EN" : "Submachine guns",
			"RU" : "Пистолеты-пулемёты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 1200,
		"origin" : "Germany",
		"caliber" : {
			"EN" : ".45 АСР",
			"RU" : ""
		},
		"magazineCapacity" : "25/100",
		"rateOfFire" : "666",
		"reloadTime" : 3.5,
		"damage" : 35,
		"recoilControl" : "20/26 (76%)",
		"accurateRange" : 15,
		"penetrationPower" : 100,
		"armorPenetration" : 65,
		"hotkey" : "B-3-3",
		"console" : "weapon_ump45",
		"pattern" : "ump45",
	},
],
Weapon.Rifles = [{
		"name" : {
			"EN" : "AK-47",
			"RU" : "AK-47"
		},
		"image" : "../images/Weapon/Image_255_(ak47.png).png",
		"icon" : "../images/Weapon/Ak47_hud_csgo-1-.png",
		"class" : {
			"EN" : "Rifles",
			"RU" : "Штурмовые винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T"],
		"counterpart" : "M4A1-S<br>M4A4",
		"price" : 2700,
		"origin" : "Soviet Union<br>Russia",
		"caliber" : {
			"EN" : "7.62mm",
			"RU" : ""
		},
		"magazineCapacity" : "30/90",
		"rateOfFire" : "600",
		"reloadTime" : 2.5,
		"movementSpeed" : 215,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 36,
		"recoilControl" : "18/26 (69%)",
		"accurateRange" : 31,
		"penetrationPower" : 200,
		"armorPenetration" : 77.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-4-2",
		"console" : "weapon_ak47",
		"pattern" : "ak47",
	}, {
		"name" : {
			"EN" : "AUG",
			"RU" : "AUG"
		},
		"image" : "../images/Weapon/Aug.png",
		"icon" : "../images/Weapon/AUG0.png",
		"class" : {
			"EN" : "Rifles",
			"RU" : "Штурмовые винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "SG 553",
		"price" : 3300,
		"origin" : "Austria",
		"caliber" : {
			"EN" : "5.56mm",
			"RU" : ""
		},
		"magazineCapacity" : "30/90",
		"rateOfFire" : "666",
		"reloadTime" : 3.8,
		"movementSpeed" : 220,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 28,
		"recoilControl" : "19/26 (73%)",
		"accurateRange" : 49,
		"penetrationPower" : 200,
		"armorPenetration" : 90,
		"features" : {
			"EN" : "Zoom",
			"RU" : ""
		},
		"hotkey" : "B-4-4",
		"console" : "weapon_aug",
		"pattern" : "aug",
	}, {
		"name" : {
			"EN" : "FAMAS",
			"RU" : "FAMAS"
		},
		"image" : "../images/Weapon/Famas.png",
		"icon" : "../images/Weapon/FAMAS0.png",
		"class" : {
			"EN" : "Rifles",
			"RU" : "Штурмовые винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic<br>3-round burst",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "Galil AR",
		"price" : 2250,
		"origin" : "France",
		"caliber" : {
			"EN" : "5.56mm",
			"RU" : ""
		},
		"magazineCapacity" : "25/90",
		"rateOfFire" : "666 (Auto) <br> 800 (Burst)",
		"reloadTime" : 3.3,
		"movementSpeed" : 220,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 30,
		"recoilControl" : "21/26 (80%)",
		"accurateRange" : 21,
		"penetrationPower" : 200,
		"armorPenetration" : 70,
		"features" : {
			"EN" : "3-round burst",
			"RU" : "Очередь по 3 пули"
		},
		"hotkey" : "B-4-1",
		"console" : "weapon_famas",
		"pattern" : "famas",
	}, {
		"name" : {
			"EN" : "Galil AR",
			"RU" : "Galil AR"
		},
		"image" : "../images/Weapon/Galillogo.png",
		"icon" : "../images/Weapon/Galil_AR0.png",
		"class" : {
			"EN" : "Rifles",
			"RU" : "Штурмовые винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T"],
		"counterpart" : "FAMAS",
		"price" : 2000,
		"origin" : "Israel",
		"caliber" : {
			"EN" : "5.56mm",
			"RU" : ""
		},
		"magazineCapacity" : "35/90",
		"rateOfFire" : "666",
		"reloadTime" : 3,
		"movementSpeed" : 215,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 30,
		"recoilControl" : "20/26 (76%)",
		"accurateRange" : 23,
		"penetrationPower" : 200,
		"armorPenetration" : 77.5,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-4-1",
		"console" : "weapon_galilar",
		"pattern" : "galil",
	}, {
		"name" : {
			"EN" : "M4A4",
			"RU" : "M4A4"
		},
		"image" : "../images/Weapon/M4a4.png",
		"icon" : "../images/Weapon/M4A40.png",
		"class" : {
			"EN" : "Rifles",
			"RU" : "Штурмовые винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "AK-47",
		"price" : 3100,
		"origin" : "United States",
		"caliber" : {
			"EN" : "5.56mm",
			"RU" : ""
		},
		"magazineCapacity" : "30/90",
		"rateOfFire" : "666",
		"reloadTime" : 3.1,
		"movementSpeed" : 225,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 33,
		"recoilControl" : "20/26 (76%)",
		"accurateRange" : 39,
		"penetrationPower" : 200,
		"armorPenetration" : 70,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-4-2",
		"console" : "weapon_m4a1",
		"pattern" : "m4a4",
	}, {
		"name" : {
			"EN" : "M4A1-S",
			"RU" : "M4A1-S"
		},
		"image" : "../images/Weapon/M4a1-s.png",
		"icon" : "../images/Weapon/M4A1-S0.png",
		"class" : {
			"EN" : "Rifles",
			"RU" : "Штурмовые винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "AK-47",
		"price" : 3100,
		"origin" : "United States",
		"caliber" : {
			"EN" : "5.56mm",
			"RU" : ""
		},
		"magazineCapacity" : "20/40",
		"rateOfFire" : "600",
		"reloadTime" : 3.1,
		"movementSpeed" : 225,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 33,
		"recoilControl" : "19/26 (73%)",
		"accurateRange" : 39,
		"penetrationPower" : 200,
		"armorPenetration" : 70,
		"hotkey" : "B-4-2",
		"console" : "weapon_m4a1_silencer",
		"pattern" : "m4a1s",
	}, {
		"name" : {
			"EN" : "SG 553",
			"RU" : "SG 553"
		},
		"image" : "../images/Weapon/Sg553.png",
		"icon" : "../images/Weapon/Sg556_hud_csgo-1-.png",
		"class" : {
			"EN" : "Rifles",
			"RU" : "Штурмовые винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T"],
		"counterpart" : "AUG",
		"price" : 3000,
		"origin" : "Switzerland",
		"caliber" : {
			"EN" : "5.56mm",
			"RU" : ""
		},
		"magazineCapacity" : "30/90",
		"rateOfFire" : "666",
		"reloadTime" : 2.8,
		"movementSpeed" : 210,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 30,
		"recoilControl" : "18/26 (69%)",
		"accurateRange" : 50,
		"penetrationPower" : 200,
		"armorPenetration" : 100,
		"features" : {
			"EN" : "Zoom",
			"RU" : ""
		},
		"hotkey" : "B-4-4",
		"console" : "weapon_sg556",
		"pattern" : "sg553",
	},
],
Weapon.SniperRifles = [{
		"name" : {
			"EN" : "AWP",
			"RU" : "AWP"
		},
		"image" : "../images/Weapon/Awp.png",
		"icon" : "../images/Weapon/AWP0.png",
		"class" : {
			"EN" : "Sniper rifles",
			"RU" : "Снайперские винтовки"
		},
		"firingModes" : {
			"EN" : "Bolt action",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 4750,
		"origin" : "United Kingdom",
		"caliber" : {
			"EN" : ".338 Lapua Magnum",
			"RU" : ""
		},
		"magazineCapacity" : "10/30",
		"rateOfFire" : "41",
		"reloadTime" : 3.6,
		"movementSpeed" : 200,
		"killAward" : {
			"Competitive" : 100,
			"Casual" : 50
		},
		"damage" : 115,
		"recoilControl" : "1/26 (3%)",
		"accurateRange" : 96,
		"penetrationPower" : 250,
		"armorPenetration" : 97.5,
		"features" : {
			"EN" : "2x Zoom",
			"RU" : ""
		},
		"hotkey" : "B-4-5",
		"console" : "weapon_awp",
		"pattern" : "awp",
	}, {
		"name" : {
			"EN" : "G3SG1",
			"RU" : "G3SG1"
		},
		"image" : "../images/Weapon/G3.png",
		"icon" : "../images/Weapon/G3SG10.png",
		"class" : {
			"EN" : "Sniper rifles",
			"RU" : "Снайперские винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T"],
		"counterpart" : "SCAR-20",
		"price" : 5000,
		"origin" : "Germany",
		"caliber" : {
			"EN" : "7.62mm",
			"RU" : ""
		},
		"magazineCapacity" : "20/90",
		"rateOfFire" : "240",
		"reloadTime" : 4.7,
		"movementSpeed" : 215,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 80,
		"recoilControl" : "17/26 (65%)",
		"accurateRange" : 92,
		"penetrationPower" : 250,
		"features" : {
			"EN" : "2x Zoom",
			"RU" : ""
		},
		"hotkey" : "B-4-6",
		"console" : "weapon_g3sg1",
		"pattern" : "g3sg1",
	}, {
		"name" : {
			"EN" : "SSG 08",
			"RU" : "SSG 08"
		},
		"image" : "../images/Weapon/Ssg08.png",
		"icon" : "../images/Weapon/Ssg08_hud_csgo-1-.png",
		"class" : {
			"EN" : "Sniper rifles",
			"RU" : "Снайперские винтовки"
		},
		"firingModes" : {
			"EN" : "Bolt action",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 1700,
		"origin" : "Austria",
		"caliber" : {
			"EN" : "7.62mm",
			"RU" : ""
		},
		"magazineCapacity" : "10/90",
		"rateOfFire" : "48",
		"reloadTime" : 3.7,
		"movementSpeed" : 230,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 88,
		"recoilControl" : "12/26 (46%)",
		"accurateRange" : 66,
		"penetrationPower" : 250,
		"armorPenetration" : 85,
		"features" : {
			"EN" : "2x Zoom",
			"RU" : ""
		},
		"hotkey" : "B-4-3",
		"console" : "weapon_ssg08",
		"pattern" : "ssg08",
	}, {
		"name" : {
			"EN" : "SCAR-20",
			"RU" : "SCAR-20"
		},
		"image" : "../images/Weapon/Scar-20.png",
		"icon" : "../images/Weapon/Scar20_hud_csgo-1-.png",
		"class" : {
			"EN" : "Sniper rifles",
			"RU" : "Снайперские винтовки"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["CT"],
		"counterpart" : "G3SG1",
		"price" : 5000,
		"origin" : "Belgium<br>United States",
		"caliber" : {
			"EN" : "7.62mm",
			"RU" : ""
		},
		"magazineCapacity" : "20/90",
		"rateOfFire" : "240",
		"reloadTime" : 3.1,
		"movementSpeed" : 215,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 80,
		"recoilControl" : "17/26 (65%)",
		"accurateRange" : 92,
		"penetrationPower" : 250,
		"features" : {
			"EN" : "2x Zoom",
			"RU" : ""
		},
		"hotkey" : "B-4-6",
		"console" : "weapon_scar20",
		"pattern" : "scar20",
	},
],
Weapon.MachineGuns = [{
		"name" : {
			"EN" : "M249",
			"RU" : "M249"
		},
		"image" : "../images/Weapon/M249.png",
		"icon" : "../images/Weapon/M2490.png",
		"altName" : {
			"EN" : "М249",
			"RU" : ""
		},
		"class" : {
			"EN" : "Machine guns",
			"RU" : "Пулемёты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 5200,
		"origin" : "Belgium",
		"caliber" : {
			"EN" : "5.56mm",
			"RU" : ""
		},
		"rateOfFire" : "750",
		"reloadTime" : 5.7,
		"movementSpeed" : 195,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 32,
		"recoilControl" : "29/26 (73%)",
		"accurateRange" : 22,
		"penetrationPower" : 200,
		"armorPenetration" : 80,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-2-4",
		"console" : "weapon_m249",
		"pattern" : "m249",
	}, {
		"name" : {
			"EN" : "Negev",
			"RU" : "Negev"
		},
		"image" : "../images/Weapon/Negev.png",
		"icon" : "../images/Weapon/Negev0.png",
		"class" : {
			"EN" : "Machine guns",
			"RU" : "Пулемёты"
		},
		"firingModes" : {
			"EN" : "Automatic",
			"RU" : ""
		},
		"usedBy" : ["T", "CT"],
		"price" : 5700,
		"origin" : "Israel",
		"caliber" : {
			"EN" : "5.56mm",
			"RU" : ""
		},
		"rateOfFire" : "1000",
		"reloadTime" : 5.7,
		"movementSpeed" : 195,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"damage" : 35,
		"recoilControl" : "20/26 (76%)",
		"accurateRange" : 18,
		"penetrationPower" : 200,
		"armorPenetration" : 75,
		"features" : {
			"EN" : "N/A",
			"RU" : ""
		},
		"hotkey" : "B-2-5",
		"console" : "weapon_negev",
		"pattern" : "negev",
	},
],
Weapon.Grenades = [{
		"name" : {
			"EN" : "HE grenade",
			"RU" : "Осколочная граната"
		},
		"image" : "../images/Weapon/he.png",
		"icon" : "../images/Weapon/HE_grenade0.png",
		"altName" : {
			"EN" : "HE<br>Nade<br>Grenade",
			"RU" : ""
		},
		"class" : {
			"EN" : "Grenades",
			"RU" : "Гранаты"
		},
		"usedBy" : ["T", "CT"],
		"price" : 300,
		"movementSpeed" : 245,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"hotkey" : "B-6-4",
		"console" : "weapon_hegrenade",
	}, {
		"name" : {
			"EN" : "Flashbang",
			"RU" : "Световая граната"
		},
		"image" : "../images/Weapon/flash.png",
		"icon" : "../images/Weapon/Flashbang.png",
		"class" : {
			"EN" : "Grenades",
			"RU" : "Гранаты"
		},
		"usedBy" : ["T", "CT"],
		"price" : 200,
		"movementSpeed" : 245,
		"killAward" : {
			"Competitive" : 300,
			"Casual" : 150
		},
		"armorPenetration" : 50,
		"hotkey" : "B-6-3",
		"console" : "weapon_flashbang",
	}, {
		"name" : {
			"EN" : "Smoke grenade",
			"RU" : "Дымовая граната"
		},
		"image" : "../images/Weapon/smoke.png",
		"icon" : "../images/Weapon/Smoke_grenade0.png",
		"class" : {
			"EN" : "Grenades",
			"RU" : "Гранаты"
		},
		"usedBy" : ["T", "CT"],
		"price" : 300,
		"movementSpeed" : 245,
		"console" : "weapon_smokegrenade",
	}, {
		"name" : {
			"EN" : "Decoy grenade",
			"RU" : "Ложная граната"
		},
		"image" : "../images/Weapon/decoy.png",
		"icon" : "../images/Weapon/Decoy0.png",
		"class" : {
			"EN" : "Grenades",
			"RU" : "Гранаты"
		},
		"usedBy" : ["T", "CT"],
		"price" : 50,
		"hotkey" : "B-6-2",
		"console" : "weapon_decoy",
	}, {
		"name" : {
			"EN" : "Incendiary grenade",
			"RU" : "Зажигательная граната"
		},
		"image" : "../images/Weapon/Incgrenade.png",
		"icon" : "../images/Weapon/Fire_grenade0.png",
		"class" : {
			"EN" : "Grenades",
			"RU" : "Гранаты"
		},
		"usedBy" : ["CT"],
		"counterpart" : "Molotov cocktail",
		"price" : 600,
		"movementSpeed" : 245,
		"hotkey" : "B-6-1",
		"console" : "weapon_incgrenade",
	}, {
		"name" : {
			"EN" : "Molotov cocktail",
			"RU" : "Коктейль Молотова"
		},
		"image" : "../images/Weapon/Molo.png",
		"icon" : "../images/Weapon/Molotov0.png",
		"class" : {
			"EN" : "Grenades",
			"RU" : "Гранаты"
		},
		"usedBy" : ["T"],
		"counterpart" : "Incendiary grenade",
		"price" : 400,
		"movementSpeed" : 245,
		"hotkey" : "B-6-1",
		"console" : "weapon_molotov",
	},
],
Weapon.Equipment = [{
		"name" : {
			"EN" : "C4",
			"RU" : "Взрывчатка C4"
		},
		"image" : "../images/Weapon/4ic.png",
		"class" : {
			"EN" : "Equipment",
			"RU" : "Снаряжение"
		},
		"usedBy" : ["T"],
		"console" : "weapon_c4",
	},
]
