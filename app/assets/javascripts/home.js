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
			 		$('#task-form').submit(); //submit form
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

