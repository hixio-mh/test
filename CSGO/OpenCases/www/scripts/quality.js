var Quality = [
{
	"name" : ["Battle-Scarred", "Закалённое в боях"],
	"chance" : 50
}, {
	"name" : ["Well-Worn", "Поношенное"],
	"chance" : 40
}, {
	"name" : ["Field-Tested", "После полевых испытаний"],
	"chance" : 30
}, {
	"name" : ["Minimal Wear", "Немного поношенное"],
	"chance" : 20
}, {
	"name" : ["Factory new", "Прямо с завода"],
	"chance" : 10
}];

function getItemQuality() {
	var sumChanses = 0;
	var sumWeights = 0;
	var random = Math.random();
	
	for(var i = 0; i < Quality.length; i++) {
		sumChanses += Quality[i].chance;
	}
	for(var i = 0; i < Quality.length; i++) {
		var weight = Quality[i].chance / sumChanses;
		Quality[i].weight = weight;
	}
	for(var i = 0; i < Quality.length; i++) {
		sumWeights += Quality[i].weight;
	}
	var cursor = 0;
	for(var i = 0; i < Quality.length; i++) {
		cursor += Quality[i].weight / sumWeights;
		if (cursor >= random) {
			return Quality[i].name;
		}
	}
}

function ifStatTrak() {
	return (random = Math.random() > 0.8) ? true : false;
}