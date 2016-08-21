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
	"name" : ["Factory New", "Прямо с завода"],
	"chance" : 10
}];

function getQualityName(fil, lang) {
	var num = 0;
	if (typeof lang == 'undefined') lang = 'EN'
	if (lang == 'RU') num = 1
	var qua = Quality.filter(function(obj){
		return obj.name.indexOf(fil) != -1;
	})
	if (qua.length != 0) {
		return qua[0].name[num];
	} else {
		console.error("Wrong quality! '"+fil+"'");
		return "Wrong quality name";
	}
}

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

function ifStatTrak(type, name) {
	type = type || "";
	name = name || "";
	if (type != "") {
		if (type.indexOf("Сувенир") != -1) return false;
		if (type.indexOf("Souvenir") != -1) return false;
	}
	if (type != "" && name != "") {
		col = getCollection(type, name);
		if (col != "" && col.type == 'Collection') return false;
	}
	return (random = Math.random() > 0.8) ? true : false;
}