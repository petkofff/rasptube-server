$(document).ready(function() {
	$("#search-button").click(function() {
		$.ajax({
			url: "/api/search/"+$("#main-input").val(),
			method: "GET",
			success: function(res) {
				console.log(res);
			}
		});
	});

	$("#queue-button").click(function() {
		$.ajax({
			url: "/api/queue/id/"+$("#main-input").val(),
			method: "GET"
		});
	});

	$("#next-button").click(function() {
		$.ajax({
			url: "/api/next",
			method: "GET"
		});
	});
});
