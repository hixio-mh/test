loadScript("../../scripts/missionList.js", scrReady);

function scrReady() {
	var currentMission = $("h1:first").text();
	var missionID = 0;
	for(var i = 0; i < Missions.data.allMissions.length; i++){
		if(currentMission == Missions.data.allMissions[i].title){
			missionID = i;
			break;
		}
	}
	
	$(".back span").text(Missions.data.allMissions[missionID-1].title);
	$(".back").attr("id", missionID-1);
	if(missionID != 74) {
		$(".forward span").text(Missions.data.allMissions[missionID+1].title);
		$(".forward").attr("id", missionID+1);
	} else {
		$(".forward span").text(Missions.data.allMissions[0].title);
		$(".forward").attr("id", 0);
	}
	
	//Кнопка для перехода на страницу со всеми миссиями
	var div = document.createElement('div');
	div.className='missions';
	div.innerHTML = "<strong>Back to Missions list</strong>";
	div.id = 0;
	$(".forward").after(div);
};

$(function() {
	//$("table")[0].style="";
});

$(".back, .forward").on("click", function(){
	var id = $(this).attr("id");
	if(id < 75) {
		window.location = Missions.data.allMissions[id].file;
	}
});
$("body").on("click", ".missions", function() {
	var id = $(this).attr("id");
	window.location = Missions.data.allMissions[id].file;
})

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
	script.async = false;;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
$('a').live('click',function(e) { e.preventDefault(); window.location = $(this).attr('href'); });