var Bot = {
"names" : ["Vanushka2004", "AdreNaline", "FreakStyle", "Z.I.P", "123", "ANONIM", "able", "qwerty", "chet ne ez", "Jko_O", "kkk", "JOHN CENA", "Portal", "Karrigan", "Sony", "Arhanvel", "Vovan", "SnuF1k", "Fekking Cat", "SMURF", "BANCH", "Jay_Jay", "Ariec", "Black pie", "PeaceDuck", "Silver III", "ALex", "Alpha", "AlexQ", ".!.", "evo", "bilbo", "Hippy", "hobit_", "hehe", "Kot", "Pirat", "Rumma", "Romch1k", "PhantomLord", "Pisos", "oceaN", "Bot Allu", "kDOT0"],
"images" : ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "38.jpg", "39.png", "40.jpg", "41.png", "42.jpg", "43.jpg", "44.jpg", "45.jpg", "46.jpg", "47.jpg", "48.jpg", "49.png", "50.png", "51.png", "52.jpg", "53.jpg", "54.jpg"]
}
function getRandomBotName() {
	return Bot.names[Math.rand(0, Bot.names.length-1)];
}
function getRandomBotImg() {
	return Bot.images[Math.rand(0, Bot.images.length-1)];
}