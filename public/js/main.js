var lastSearchResult = null;

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
		function onSearchSuccess(res) {
			lastSearchResult = res;
			
			$("#search-modal").modal("show");
			$("#search-table > tbody").empty();
			var i = 0;
			console.log(res);
			for (;i<res.items.length && i<10;i++) {
				var col = $('<tr></tr>');
				col.append($('<th scope="row"><span class="glyphicon glyphicon-play-circle" '+'onclick="onSearchModalResultClick(lastSearchResult, ' + i + ')"></span></th>'));
				col.append($('<td>'+res.items[i].snippet.title+'</td>'));
				$('#search-tbody').append(col);
			}
		}
		
		$.ajax({
			url: "/api/search/"+$("#main-input").val(),
			method: "GET",
			success: onSearchSuccess
		});
	});

	$("#queue-button").click(function() {
		$.ajax({
			url: "/api/queue/title/"+$("#main-input").val(),
			method: "GET"
		});
		
		$("#main-input").val("");
	});

	$("#next-button").click(function() {
		console.log("next button");
		$.ajax({
			url: "/api/next",
			method: "GET"
		});
	});
});

function onSearchModalResultClick(result, clicked) {
	console.log("pesho");
	
	$.ajax({
		url: "/api/queue/id/"+result.items[clicked].id.videoId,
		method: "GET"
	});
	
	$("#main-input").val("");
	
	$("#search-modal").modal("hide");;
}
