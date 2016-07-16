// Timer vars
var t;
var seconds = 0;




// NOTE: change to unobtrusive javascript
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

		    //ARTICLE IDEA - how to do unobtrusive js with ajax:
			//Unobtrusive JS. These items aren't available when form loads, unobtrusive js must be added here.
				//because submit button for new task form is outside of form, I must manually submit form when it's clicked:
			 	$('#submit-task').on('click', function() { //when "#submit-task" button is clicked
			 		$('#task-form').submit(); //submit form (to tasks#create)
			 	});
		}
	});
}


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



