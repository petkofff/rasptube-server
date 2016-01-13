$(document).ready(function() {
	var socket = io();
	
	socket.on("queue changed or new connection", function(queue) {
		$("#queue-table > tbody").empty();
		var i = 0;
		console.log(queue);
		for (;i<queue.length;i++) {
			var col = $('<tr></tr>');
			col.append($('<th scope="row">'+(i+1)+'</th>'));
			col.append($('<td>'+queue[i].title+'</td>'));
			$('#queue-tbody').append(col);
		}
	});
	
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
