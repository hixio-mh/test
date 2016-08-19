var Ranks = [
	{
		name: 'Silver I',
		points: 0
	}, {
		name: 'Silver II',
		points: 20
	}, {
		name: 'Silver III',
		points: 40
	}, {
		name: 'Silver IV',
		points: 70
	}, {
		name: 'Silver Elite',
		points: 100
	}, 
]

function getRank(points) {
	for (var i = 0; i < Ranks.length; i++) {
		if (points < Ranks[i].points)
			return Ranks[i-1]
		if (i == Ranks.length)
			return Ranks[i]
	}
}