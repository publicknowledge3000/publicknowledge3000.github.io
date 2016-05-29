var socket = io();

var main = function() {
	$(".button").each(function() {
		socket.emit("request user amount", $(this).html());
	});
	$(".button").click(function() {
		localStorage.setItem("pkChat", $(this).html());
		window.location.href = "chat.html";
	});
};

socket.on("send user amount", function(chatdata) {
	split = chatdata.split(":");
	console.log(chatdata);
	split[0] = split[0].replace(/\s+/g, '');	
	$("#" + split[0] + "users").html($("#" + split[0] + "users").html() + "<span style='color: black'>" + split[1] + "</span>");
});

socket.on(".txt", function(files) {
	$("body").append($("<h1>").html(files));
});

$(document).ready(main);