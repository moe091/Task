/** 
var seconds = 0;
var timing = false;
var startTime = null;
var endTime = null;
var task_id;
function reset_timer() {
	seconds = 0;
	timing = false;
	startTime = null;
	endTime = null;
}



function stopTimer(task) {
	task_id = task;
	timing = false;
	endTime = new Date();
	$.ajax({
		type: "POST",
		url: "/tasks/stop_timer",
		datatype: "json",
		data: {duration: seconds, start: Number(startTime) / 1000, end: Number(endTime) / 1000, task_id: task}
	})
	endTime = new Date();
	console.log("stopped");
	console.log(Number(startTime) / 1000);
}

function show_new_session() {
	$("#new-ses-btn").hide();
	$("#new-session").slideDown(400);

}

function save_new() {
  	console.log("not timeing");
  	if (!timing) {
  		console.log("save click");
      	$.ajax({
			type: "POST",
			url: "/tasks/create_session",
			datatype: "json",
			data: {duration: seconds, start: Number(startTime) / 1000, end: Number(endTime) / 1000, task_id: task_id, note: $("#note-text-new").val()}
		})
  	}
    
    return false;
}

//ON LOAD


          

//HELPERS

function seconds_in_time(seconds) {
	var hours = 0, mins = 1, secs = 2;
	var time = [];

	time[hours] = Math.floor(seconds / 3600);
	time[mins] = Math.floor((seconds / 60)) % 60;
	time[secs] = seconds % 60;

	for(var i = 0; i <= 2; i++)
		if (time[i] < 10)
			time[i] = "0" + time[i];


	return time[hours] + ":" + time[mins] + ":" + time[secs];
}
**/