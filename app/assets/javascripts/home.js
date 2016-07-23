// Timer vars
var t;
var seconds = 0;







// Timer functionality
function startTimer() {
	timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function add() {
	seconds++;
	$("#seconds").html(seconds);
	timer();
}


// New Task Modal

var step;
// When "New Task" button is clicked, this method is called
function show_task_modal() {
	console.log("AJAX CALL");
	$.ajax({ 
		type: "GET",
		url: "/tasks/new",  // Call tasks#new controller
	    data: {user_id: "<%= @cur_user %>"}, // testing

		success: function(data) { // if ajax message is successful 
		    console.log("AJAX SUCCESS");
		    console.log(data);
		    console.log("<%= @cur_user %>");
		    $("#new-task-modal").empty();
		    $("#new-task-modal").append(data); // insert the data returned from tasks#new (new task model partial) into modal-partial div
		    $("#new-task-modal").modal("show"); // call 'show' on bootstrap modal

		    step = 1
		    cur_step = "#step-1"
		    //ARTICLE IDEA - how to do unobtrusive js with ajax:
			//Unobtrusive JS. These items aren't available when form loads, unobtrusive js must be added here.
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

$(document).ready(function() {
	console.log("READY");
  	$('input[name="time-period-chk"]').change( function() {
  		alert($(this).val())
	})
});



