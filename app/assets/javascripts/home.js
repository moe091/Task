//_____________FORM____________\\
function submit_new_task(user_id) {
	//Adding a comment so I can commit this file
	console.log("SUBMIT NEW TASK");
	console.log($("#task_name").data("user-id"));
	console.log("NAME:" + $("#task_name").val());
	console.log("DESCRIPTION: " + $("#task_description").val());
	console.log("GOAL: " + (parseInt($("#task_hours").val()) * 60 + parseInt($("#task_minutes").val())));
	console.log(getDate());
	var description = $("#task_description").val();
	var name = $("#task_name").val();
	var has_goal = $("#task_has_goal").is(":checked");
	var goalMins = parseInt($("#task_hours").val()) * 60 + parseInt($("#task_minutes").val()) * 60;
	var end_date = getDate();
	var hasDueDate = $("#task_has_due_date").is(":checked");
	var isTimed = $("#task_timed").is(":checked");
	var hasGoal = $("#task_has_goal").is(":checked");
	$.ajax({
	  type: "POST",
	  url: "/tasks",
	  datatype: "json",
	  data: {name: name, description: description, goal: goalMins, isTimed: isTimed, end_date: end_date, hasDueDate: hasDueDate, hasGoal: hasGoal, user_id: user_id },
	  success: function(data) {
	  	console.log("SUCCESS");
	  	console.log(data);
	  }
	}); 
	
}
function goal_clicked() {
	console.log("goal-clicked");
	if ($("#task_has_goal").is(":checked")) {
		console.log("checked");
		$(".create-task-goal-div").show();
	} else {
		console.log("unckecked");
		$(".create-task-goal-div").hide();
	}
}

function timed_clicked() {
	if ($("#task_timed").is(":checked")) {
		$("#task_has_goal").show();
		$("#has-goal-span").show();
		$("#has-goal-span").css("display", "inline-block");
	} else {
		$("#task_has_goal").hide();
		$("#has-goal-span").hide();
		$("#task_has_goal").attr("checked", false);
		goal_clicked();
	}
}

function due_date_clicked() {
	if ($("#task_has_due_date").is(":checked")) {
		console.log('checked');
		$("#datetimepicker").show();
	} else {
		console.log('unckecked');
		$("#datetimepicker").hide();
		getDate();
	}
}

function getDate() {
	var date = $("#datetimepicker").data("datetimepicker").getLocalDate();

	console.log(date.getTime());
	return date.getTime() / 1000;
}

function pickDate() {
	console.log("PICK");
	$(function() {
		$('#datetimepicker').datetimepicker({
	  		maskInput: true,
	  		language: 'en',
	  		pick12HourFormat: true
		});
	});
}






//_____________TIMER___________\\
var seconds = 0;
var timing = false;
var startTime = null;
var endTime = null;
var running = false;
var task_id;

function reset_timer() {
	console.log("reset_timer");
	seconds = 0;
	timing = false;
	startTime = null;
	endTime = null;
	$("#session-clock").html(seconds_in_time(seconds));
	console.log(seconds_in_time(seconds));
}


function start_timer() {
	if (startTime == null)
		startTime = new Date();
	console.log(startTime);
	timing = true;
	timer();
}


function timer() {
    t = setTimeout(add, 1000);
}


function add() {
	if (timing) {
		seconds++;
		$("#session-clock").html(seconds_in_time(seconds));
		timer();
	}
}




function end_session() {
	timing = false;
	$.ajax({
		type: "POST",
		url: "/home/end_session",
		datatype: "json",
		data: {duration: seconds, start: Number(startTime) / 1000, end: Number(endTime) / 1000, task_id: task_id},
		success: function(data) {
			console.log(data);
			if (data.task.goal > 0) {
				$(".percent-front-" + task_id.toString()).width(data.percent.toString() + "%");
				$(".percentage-text-" + task_id.toString()).html(data.percent.toString() + "%");
				$(".completed-detail-" + task_id.toString()).html("Completed: " + format_time(data.task.completed) + " / " + format_time(data.task.goal));
			} else {
				$(".completed-detail-" + task_id.toString()).html("Completed " + format_time(data.task.completed));
			}
		}
	});

	$("#session-modal").modal("hide");
}




function edit_task(task) {
	console.log(task);
	console.log("Edit Task");
	$("#session-modal").modal("show");
}


//MODAL BUTTONS
function new_session(id, name, description) {
	$("#session-modal").modal("show");
	task_id = id;
	$("#session-modal h1").html(name);
	$("#session-modal p").html(description);
	reset_timer();
}


function start_session() {
	if (!timing) {
		$("#ses-stop-btn").removeClass("hidden");
		$("#ses-start-btn").addClass("hidden");

		$("#ses-close-btn").prop("disabled", true);
		start_timer();
	}

}


function pause_session() {
	timing = false;
	endTime = new Date();
	$("#ses-start-btn").removeClass("hidden");
	$("#ses-stop-btn").addClass("hidden");
	$("#ses-close-btn").prop("disabled", false);
}






//helper methods
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


function format_time(secs) {
	var m = Math.floor(secs / 60);
	var s = secs % 60;
	if (m < 10)
		m = "0" + m.toString();
	else
		m = m.toString();

	if (s < 10)
		s = "0" + s.toString();
	else
		s = s.toString();

	return m + ":" + s;
}






















//OLD - Saving in case I need to reuse any code during redesign

// New Task Modal

var step;
// When "New Task" button is clicked, this method is called
function show_task_modal() {
	console.log("AJAX CALL");
	$.ajax({ 
		type: "GET",
		url: "/tasks/new",  // Call tasks#new controller
	    data: {user_id: "<%= @cur_user %>"}, // testing

		success: function(data) { 
		    console.log("AJAX SUCCESS");
		    console.log(data);
		    console.log("<%= @cur_user %>");
		    $("#new-task-modal").empty();
		    $("#new-task-modal").append(data); // insert the data returned from tasks#new (new task model partial) into modal-partial div
		    $("#new-task-modal").modal("show"); 

		    step = 1
		    cur_step = "#step-1"
				//because submit button for new task form is outside of form, I must manually submit form when it's clicked:
			 	$('#submit-task').on('click', function() { //when "#submit-task" button is clicked
			 		next_step();
			 	});
		}
	});
}

function next_step() {
	$(cur_step).addClass('hidden');
	console.log('next_step() called');
	if (step == 1) { //on first step
		if ($('#period-true').is(':checked')) { //if user wants to set time period
			console.log('period checked');
			step = 2;
			cur_step = "#step-2";
			$(cur_step).removeClass('hidden');
		} else { // if user doesn't want to set time period...
			if ($('#goal-true').is(':checked')) { // but does want to set goal, then skip to step 3
				step = 3;
				cur_step = "#step-3";
				$(cur_step).removeClass('hidden');
			} else { //FINISH - if user doesn't want to set period or goal then submit the form and close modal
				submit_modal();
			}
		} 
	} else if (step == 2) { // if user is on step 2(period step)..
		console.log("step 2");
		if ($('#goal-true').is(':checked')) { // if they want to set a goal, move on to step 3
			step = 3
			cur_step = "#step-3";
			$(cur_step).removeClass('hidden');
		} else { //FINISH - if they don't want to set a goal then sumbit the form and close modal
			console.log("goal not checked");
			submit_modal();
		}
	} else { //FINISH
		console.log("ELSE - submit");
		submit_modal();
	}

}

function submit_modal() { //close modal and submit form
	console.log("SUBMIT MODAL");
	$("#new-task-modal").modal("hide");
	$('#task-form').submit();
}


function time_goal_click(val) {
	console.log("PERIOD CLICK");
	console.log(val);
	if (val) { //TRUE 
		$(".goal-wrap").show();
		$(".goal-wrap").css("display", "inline-block");
	} else { //FALSE
		$(".goal-wrap").hide();
	}
}

function time_period_click(val) {
	console.log("GOAL CLICK");
	console.log(val);
	if (val) { //TRUE 
		$(".time-period-wrap").show();
		$(".time-period-wrap").css("display", "inline-block");
	} else { //FALSE
		$(".time-period-wrap").hide();
	}
}

var timedVal = 1;

$(document).ready(function() {
	console.log("READY");
  	$('input[name="time-period-chk"]').change( function() {
  		alert($(this).val())
	})

	$('.create-task-timing-div').click(function() {
		timedVal = $("#timed-slider")[0].value;
		console.log(timedVal);
		console.log("SLIDER");
		console.log($("#timed-slider")[0].value);
	});


});



