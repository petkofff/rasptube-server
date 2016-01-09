$(document).ready(function() {
	$("#search-button").click(function() {
		//TO DO
	});

	$("#queue-button").click(function() {
		$.ajax({
			url: "/api/queue/id/"+$("#main-input").val(),
			method: "GET"
		});
	});

	$("#next-button").click(function() {
		//TO DO
	});
});
